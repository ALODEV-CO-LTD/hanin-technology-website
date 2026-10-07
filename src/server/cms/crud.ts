import { all, get, run, transaction } from "../db";
import { LOCALES, parseI18n, type I18nText } from "../i18n";
import type { CmsRecord, FieldDef, RecordValue, ResourceDef } from "./fields";

export class ValidationError extends Error {
  constructor(public errors: Record<string, string>) {
    super("Dữ liệu không hợp lệ");
  }
}

export class ConflictError extends Error {}

const snake = (name: string) => name.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isSafeImageUrl(url: string): boolean {
  if (/^https?:\/\//i.test(url)) return true;
  return url.startsWith("/") && !url.startsWith("//");
}

/* ---------- Đọc: dòng DB -> bản ghi API ---------- */

function parseList(raw: unknown): Record<string, unknown>[] {
  if (typeof raw !== "string" || !raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function rowToRecord(resource: ResourceDef, row: Record<string, unknown>): CmsRecord {
  const record: CmsRecord = { id: Number(row.id) };
  for (const field of resource.fields) {
    const value = row[snake(field.name)];
    record[field.name] = deserialize(field, value);
  }
  record.createdAt = String(row.created_at ?? "");
  record.updatedAt = String(row.updated_at ?? "");
  return record;
}

function deserialize(field: FieldDef, value: unknown): RecordValue {
  switch (field.type) {
    case "i18n-text":
    case "i18n-textarea":
      return parseI18n(value);
    case "list":
      return parseList(value) as RecordValue;
    case "boolean":
      return Boolean(value);
    case "number":
      return Number(value ?? 0);
    default:
      return (value ?? "") as string;
  }
}

/* ---------- Ghi: kiểm tra + chuẩn hoá đầu vào ---------- */

function cleanI18n(field: FieldDef, value: unknown, errors: Record<string, string>, path: string): I18nText {
  const out: I18nText = {};
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  for (const locale of LOCALES) {
    const text = typeof source[locale] === "string" ? (source[locale] as string).trim() : "";
    const max = field.maxLength ?? (field.type === "i18n-textarea" ? 20000 : 500);
    if (text.length > max) errors[path] = `${field.label} (${locale}) tối đa ${max} ký tự`;
    out[locale] = text;
  }
  return out;
}

function cleanValue(
  field: FieldDef,
  value: unknown,
  errors: Record<string, string>,
  path: string,
): string | number | I18nText | Record<string, unknown>[] {
  switch (field.type) {
    case "text":
    case "textarea": {
      const text = typeof value === "string" ? value.trim() : "";
      const max = field.maxLength ?? (field.type === "textarea" ? 20000 : 500);
      if (text.length > max) errors[path] = `${field.label} tối đa ${max} ký tự`;
      return text;
    }
    case "i18n-text":
    case "i18n-textarea":
      return cleanI18n(field, value, errors, path);
    case "image": {
      const url = typeof value === "string" ? value.trim() : "";
      if (url && !isSafeImageUrl(url)) errors[path] = `${field.label} phải là đường dẫn ảnh hợp lệ`;
      if (url.length > 2000) errors[path] = `${field.label} quá dài`;
      return url;
    }
    case "select": {
      const text = typeof value === "string" ? value : "";
      if (text && !field.options?.some((o) => o.value === text)) errors[path] = `${field.label} không hợp lệ`;
      return text;
    }
    case "boolean":
      return value === true || value === 1 || value === "1" ? 1 : 0;
    case "number": {
      const n = Number(value);
      if (!Number.isFinite(n)) {
        errors[path] = `${field.label} phải là số`;
        return 0;
      }
      const min = field.min ?? 0;
      const max = field.max ?? 9999;
      if (n < min || n > max) {
        errors[path] = `${field.label} phải từ ${min} đến ${max}`;
        return Math.min(Math.max(Math.trunc(n), min), max);
      }
      return Math.trunc(n);
    }
    case "date": {
      const text = typeof value === "string" ? value.trim() : "";
      if (text && !DATE_RE.test(text)) errors[path] = `${field.label} phải có dạng YYYY-MM-DD`;
      return text;
    }
    case "list": {
      const items = Array.isArray(value) ? value : [];
      const max = field.maxItems ?? 30;
      if (items.length > max) errors[path] = `${field.label} tối đa ${max} mục`;
      const out: Record<string, unknown>[] = [];
      items.slice(0, max).forEach((item, index) => {
        const source = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
        const cleaned: Record<string, unknown> = {};
        let hasContent = false;
        for (const sub of field.itemFields ?? []) {
          const subValue = cleanValue(sub, source[sub.name], errors, `${path}.${index}.${sub.name}`);
          cleaned[sub.name] = subValue;
          if (typeof subValue === "string" ? subValue : Object.values(subValue as I18nText).some(Boolean)) {
            hasContent = true;
          }
        }
        if (hasContent) out.push(cleaned);
      });
      return out;
    }
  }
}

function hasContent(field: FieldDef, value: unknown): boolean {
  if (field.type === "i18n-text" || field.type === "i18n-textarea") return Boolean((value as I18nText).vi);
  if (field.type === "list") return (value as unknown[]).length > 0;
  if (field.type === "boolean" || field.type === "number") return true;
  return value !== "" && value != null;
}

export function validateInput(
  resource: ResourceDef,
  input: Record<string, unknown>,
  mode: "create" | "update",
): Record<string, string | number> {
  const errors: Record<string, string> = {};
  const columns: Record<string, string | number> = {};

  for (const field of resource.fields) {
    // Khi cập nhật, trường không gửi lên thì giữ nguyên.
    if (mode === "update" && !(field.name in input)) continue;

    let raw = input[field.name];
    if (raw === undefined && mode === "create" && field.defaultValue !== undefined) raw = field.defaultValue;
    let value = cleanValue(field, raw, errors, field.name);

    if (field.slugOf && field.type === "text" && !value) {
      const source = input[field.slugOf];
      const vi =
        source && typeof source === "object" ? String((source as I18nText).vi ?? "") : String(source ?? "");
      value = slugify(vi);
    }
    if (field.name === "slug" && value && !SLUG_RE.test(String(value))) {
      errors[field.name] = "Slug chỉ gồm chữ thường, số và dấu gạch ngang";
    }
    if (field.required && !hasContent(field, value)) {
      errors[field.name] = `${field.label} là bắt buộc${
        field.type.startsWith("i18n") ? " (bản tiếng Việt)" : ""
      }`;
    }

    columns[snake(field.name)] =
      typeof value === "object" ? JSON.stringify(value) : (value as string | number);
  }

  if (Object.keys(errors).length) throw new ValidationError(errors);
  return columns;
}

/* ---------- CRUD ---------- */

export interface ListParams {
  q?: string;
  page?: number;
  pageSize?: number;
  filters?: Record<string, string>;
}

export function listRecords(resource: ResourceDef, params: ListParams = {}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));
  const where: string[] = [];
  const args: unknown[] = [];

  const q = params.q?.trim();
  if (q && resource.searchFields?.length) {
    where.push(`(${resource.searchFields.map((f) => `${snake(f)} LIKE ?`).join(" OR ")})`);
    for (let i = 0; i < resource.searchFields.length; i++) args.push(`%${q}%`);
  }
  for (const [name, value] of Object.entries(params.filters ?? {})) {
    const field = resource.fields.find((f) => f.name === name && f.type === "select");
    if (field && value) {
      where.push(`${snake(name)} = ?`);
      args.push(value);
    }
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = Number(
    get<{ n: number }>(`SELECT COUNT(*) AS n FROM ${resource.table} ${whereSql}`, ...args)?.n ?? 0,
  );
  const rows = all(
    `SELECT * FROM ${resource.table} ${whereSql} ORDER BY ${resource.orderBy} LIMIT ? OFFSET ?`,
    ...args,
    pageSize,
    (page - 1) * pageSize,
  );
  return { items: rows.map((r) => rowToRecord(resource, r)), total, page, pageSize };
}

export function getRecord(resource: ResourceDef, id: number): CmsRecord | null {
  const row = get(`SELECT * FROM ${resource.table} WHERE id = ?`, id);
  return row ? rowToRecord(resource, row) : null;
}

function assertUnique(err: unknown): never {
  if (err instanceof Error && /UNIQUE constraint failed: \w+\.slug/.test(err.message)) {
    throw new ValidationError({ slug: "Slug đã tồn tại, hãy chọn slug khác" });
  }
  throw err;
}

export function createRecord(resource: ResourceDef, input: Record<string, unknown>): CmsRecord {
  const columns = validateInput(resource, input, "create");
  const names = Object.keys(columns);
  try {
    const result = run(
      `INSERT INTO ${resource.table} (${names.join(", ")}) VALUES (${names.map(() => "?").join(", ")})`,
      ...Object.values(columns),
    );
    return getRecord(resource, Number(result.lastInsertRowid))!;
  } catch (err) {
    assertUnique(err);
  }
}

/* ---------- Lịch sử phiên bản (để khôi phục) ---------- */

const MAX_REVISIONS_PER_RECORD = 30;

function snapshotOf(resource: ResourceDef, record: CmsRecord): Record<string, unknown> {
  return Object.fromEntries(resource.fields.map((f) => [f.name, record[f.name]]));
}

function changedFieldLabels(resource: ResourceDef, snapshot: Record<string, unknown>, current: CmsRecord | null): string[] {
  if (!current) return [];
  return resource.fields
    .filter((f) => JSON.stringify(snapshot[f.name] ?? null) !== JSON.stringify(current[f.name] ?? null))
    .map((f) => f.label);
}

function saveRevision(resource: ResourceDef, record: CmsRecord, action: "update" | "delete", userEmail: string) {
  run(
    "INSERT INTO revisions (resource, record_id, action, snapshot, user_email) VALUES (?, ?, ?, ?, ?)",
    resource.key,
    record.id,
    action,
    JSON.stringify(snapshotOf(resource, record)),
    userEmail,
  );
  run(
    `DELETE FROM revisions WHERE resource = ? AND record_id = ? AND id NOT IN
       (SELECT id FROM revisions WHERE resource = ? AND record_id = ? ORDER BY id DESC LIMIT ?)`,
    resource.key,
    record.id,
    resource.key,
    record.id,
    MAX_REVISIONS_PER_RECORD,
  );
}

export interface RevisionInfo {
  id: number;
  createdAt: string;
  userEmail: string;
  /** Tên các trường sẽ thay đổi nếu khôi phục phiên bản này. */
  changed: string[];
}

/** Các phiên bản cũ của một bản ghi (mới nhất trước). */
export function listRevisions(resource: ResourceDef, recordId: number): RevisionInfo[] {
  const current = getRecord(resource, recordId);
  return all<{ id: number; snapshot: string; user_email: string; created_at: string }>(
    "SELECT id, snapshot, user_email, created_at FROM revisions WHERE resource = ? AND record_id = ? AND action = 'update' ORDER BY id DESC",
    resource.key,
    recordId,
  ).map((r) => ({
    id: Number(r.id),
    createdAt: r.created_at,
    userEmail: r.user_email,
    changed: changedFieldLabels(resource, JSON.parse(r.snapshot), current),
  }));
}

/** Khôi phục bản ghi về một phiên bản cũ (phiên bản hiện tại được lưu lại, nên có thể hoàn tác tiếp). */
export function restoreRevision(resource: ResourceDef, recordId: number, revisionId: number, userEmail: string): CmsRecord | null {
  const row = get<{ snapshot: string }>(
    "SELECT snapshot FROM revisions WHERE id = ? AND resource = ? AND record_id = ? AND action = 'update'",
    revisionId,
    resource.key,
    recordId,
  );
  if (!row) return null;
  return updateRecord(resource, recordId, JSON.parse(row.snapshot), userEmail);
}

export interface DeletedInfo {
  id: number;
  title: string;
  deletedAt: string;
  userEmail: string;
}

/** Các bản ghi đã xoá gần đây và chưa được khôi phục. */
export function listDeleted(resource: ResourceDef): DeletedInfo[] {
  return all<{ id: number; snapshot: string; user_email: string; created_at: string; record_id: number }>(
    `SELECT id, record_id, snapshot, user_email, created_at FROM revisions
      WHERE resource = ? AND action = 'delete' AND restored = 0 ORDER BY id DESC LIMIT 30`,
    resource.key,
  ).map((r) => {
    const snap = JSON.parse(r.snapshot) as Record<string, unknown>;
    const t = snap[resource.titleField];
    const title = typeof t === "object" && t ? String((t as { vi?: string }).vi ?? "") : String(t ?? "");
    return { id: Number(r.id), title: title || `#${r.record_id}`, deletedAt: r.created_at, userEmail: r.user_email };
  });
}

export function restoreDeleted(resource: ResourceDef, revisionId: number): CmsRecord | null {
  const row = get<{ snapshot: string; record_id: number }>(
    "SELECT snapshot, record_id FROM revisions WHERE id = ? AND resource = ? AND action = 'delete' AND restored = 0",
    revisionId,
    resource.key,
  );
  if (!row) return null;
  const columns = validateInput(resource, JSON.parse(row.snapshot), "create");
  if (!get(`SELECT 1 FROM ${resource.table} WHERE id = ?`, row.record_id)) columns.id = row.record_id;
  const names = Object.keys(columns);
  try {
    const result = run(
      `INSERT INTO ${resource.table} (${names.join(", ")}) VALUES (${names.map(() => "?").join(", ")})`,
      ...Object.values(columns),
    );
    run("UPDATE revisions SET restored = 1 WHERE id = ?", revisionId);
    return getRecord(resource, Number(columns.id ?? result.lastInsertRowid));
  } catch (err) {
    assertUnique(err);
  }
}

export function updateRecord(resource: ResourceDef, id: number, input: Record<string, unknown>, userEmail = ""): CmsRecord | null {
  const before = getRecord(resource, id);
  if (!before) return null;
  const columns = validateInput(resource, input, "update");
  const names = Object.keys(columns);
  if (names.length) {
    try {
      run(
        `UPDATE ${resource.table} SET ${names.map((n) => `${n} = ?`).join(", ")}, updated_at = datetime('now') WHERE id = ?`,
        ...Object.values(columns),
        id,
      );
    } catch (err) {
      assertUnique(err);
    }
  }
  const after = getRecord(resource, id);
  if (after && changedFieldLabels(resource, snapshotOf(resource, before), after).length > 0) {
    saveRevision(resource, before, "update", userEmail);
  }
  return after;
}

export function deleteRecord(resource: ResourceDef, id: number, userEmail = ""): boolean {
  return transaction(() => {
    const before = getRecord(resource, id);
    if (!before) return false;
    saveRevision(resource, before, "delete", userEmail);
    return run(`DELETE FROM ${resource.table} WHERE id = ?`, id).changes > 0;
  });
}
