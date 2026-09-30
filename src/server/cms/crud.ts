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

export function updateRecord(resource: ResourceDef, id: number, input: Record<string, unknown>): CmsRecord | null {
  if (!getRecord(resource, id)) return null;
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
  return getRecord(resource, id);
}

export function deleteRecord(resource: ResourceDef, id: number): boolean {
  return transaction(() => run(`DELETE FROM ${resource.table} WHERE id = ?`, id).changes > 0);
}
