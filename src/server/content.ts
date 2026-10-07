import fs from "node:fs";
import path from "node:path";
import { all, get, run, transaction } from "./db";
import { LOCALES, type Locale } from "./i18n";

/** Các file dịch trong /messages/<locale>/<name>.json (gộp thành 1 object khi chạy). */
export const NAMESPACE_FILES = [
  "common",
  "home",
  "gioi-thieu",
  "dich-vu",
  "san-pham",
  "nang-luc",
  "tin-tuc",
  "lien-he",
  "tuyen-dung",
  "phap-ly",
  "quy-trinh",
];

/**
 * Các nhóm khoá đã được quản lý bằng module riêng (Dịch vụ, Sản phẩm, Tin tức, Tuyển dụng)
 * nên ẩn khỏi trình sửa "Nội dung trang" để tránh sửa nhầm chỗ không còn được website dùng.
 */
export const HIDDEN_PREFIXES = [
  "DichVu.services",
  "SanPham.products",
  "TinTuc.articles",
  "TinTuc.featured",
  "TuyenDung.jobs",
];

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Tree = { [key: string]: Json };

const MESSAGES_DIR = path.join(process.cwd(), "messages");

export function loadBaseMessages(locale: Locale): Tree {
  const merged: Tree = {};
  for (const name of NAMESPACE_FILES) {
    const file = path.join(MESSAGES_DIR, locale, `${name}.json`);
    try {
      Object.assign(merged, JSON.parse(fs.readFileSync(file, "utf8")));
    } catch {
      /* file thiếu thì bỏ qua */
    }
  }
  return merged;
}

/** Duỗi cây JSON thành map "A.b.0.c" -> chuỗi (chỉ lấy lá kiểu string). */
export function flatten(tree: Json, prefix = "", out: Record<string, string> = {}): Record<string, string> {
  if (typeof tree === "string") {
    out[prefix] = tree;
  } else if (Array.isArray(tree)) {
    tree.forEach((item, i) => flatten(item, prefix ? `${prefix}.${i}` : String(i), out));
  } else if (tree && typeof tree === "object") {
    for (const [k, v] of Object.entries(tree)) flatten(v as Json, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

export function isHiddenKey(key: string): boolean {
  return HIDDEN_PREFIXES.some((p) => key === p || key.startsWith(`${p}.`));
}

function setByPath(tree: Tree, key: string, value: string) {
  const parts = key.split(".");
  let node: Json = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    const next: Json | undefined = (node as Record<string, Json>)[parts[i]];
    if (next === undefined || typeof next !== "object" || next === null) return; // đường dẫn không tồn tại: bỏ qua
    node = next;
  }
  const last = parts[parts.length - 1];
  if (typeof (node as Record<string, Json>)[last] === "string") (node as Record<string, Json>)[last] = value;
}

/* ---------- Cache theo phiên bản (đếm + updated_at lớn nhất) ---------- */

let cacheVersion = "";
let cacheData: Record<string, Record<string, string>> = {};

function loadOverrides(): Record<string, Record<string, string>> {
  const meta = get<{ n: number; m: string | null }>("SELECT COUNT(*) AS n, MAX(updated_at) AS m FROM content_overrides");
  const version = `${meta?.n ?? 0}:${meta?.m ?? ""}`;
  if (version === cacheVersion) return cacheData;
  const rows = all<{ locale: string; key: string; value: string }>("SELECT locale, key, value FROM content_overrides");
  const byLocale: Record<string, Record<string, string>> = {};
  for (const r of rows) (byLocale[r.locale] ??= {})[r.key] = r.value;
  cacheVersion = version;
  cacheData = byLocale;
  return byLocale;
}

/* ---------- Phạm vi riêng cho từng dịch vụ / sản phẩm ---------- */

/**
 * Trang chi tiết dịch vụ/sản phẩm dùng chung một bộ nội dung mẫu. Mỗi mục có thể ghi đè riêng
 * một số khoá: lưu trong content_overrides với khoá "<scope>::<khoá>" (scope = "svc:<slug>" | "prd:<slug>").
 */
export const SCOPE_PREFIXES: Record<"svc" | "prd", string[]> = {
  svc: [
    "DichVu.DetailHero",
    "DichVu.DetailOverview",
    "DichVu.DetailProcess",
    "DichVu.DetailCapability",
    "DichVu.DetailApplications",
    "DichVu.DetailQaTable",
    "DichVu.DetailGallery",
    "DichVu.RfqFormDetail",
  ],
  prd: [
    "SanPham.detail",
    "SanPham.ProductHero",
    "SanPham.ProductOverview",
    "SanPham.ProductProcessTimeline",
    "SanPham.ProductGallery",
    "SanPham.RelatedServices",
  ],
};

export const SCOPE_SEP = "::";

export function scopeFromPath(pathname: string): string {
  const path = pathname.replace(/^\/(vi|zh|ko)(?=\/|$)/, "");
  const svc = path.match(/^\/dich-vu-gia-cong-ma\/([^/]+)\/?$/);
  if (svc) return `svc:${decodeURIComponent(svc[1])}`;
  const prd = path.match(/^\/san-pham-du-an\/([^/]+)\/?$/);
  if (prd) return `prd:${decodeURIComponent(prd[1])}`;
  return "";
}

export function isInScope(scope: string, key: string): boolean {
  const kind = scope.split(":")[0] as "svc" | "prd";
  return (SCOPE_PREFIXES[kind] ?? []).some((p) => key === p || key.startsWith(`${p}.`));
}

/** Áp các chỉnh sửa từ CMS lên bản dịch gốc (dùng trong src/i18n/request.ts). */
export function applyOverrides<T extends Tree>(messages: T, locale: string, scope = ""): T {
  const overrides = loadOverrides()[locale];
  if (!overrides) return messages;
  const copy = structuredClone(messages) as Tree;
  const scoped: [string, string][] = [];
  for (const [key, value] of Object.entries(overrides)) {
    if (!key.includes(SCOPE_SEP)) setByPath(copy, key, value);
    else if (scope && key.startsWith(scope + SCOPE_SEP)) scoped.push([key.slice(scope.length + SCOPE_SEP.length), value]);
  }
  for (const [key, value] of scoped) setByPath(copy, key, value); // nội dung riêng của mục thắng nội dung chung
  return copy as T;
}

export interface ContentEntry {
  key: string;
  values: Record<Locale, string>;
  overridden: Record<Locale, boolean>;
}

export function listNamespaces(): { name: string; count: number; overrides: number }[] {
  const base = flatten(loadBaseMessages("vi"));
  const overrides = loadOverrides();
  const counts = new Map<string, { count: number; overrides: number }>();
  for (const key of Object.keys(base)) {
    if (isHiddenKey(key)) continue;
    const ns = key.split(".")[0];
    const entry = counts.get(ns) ?? { count: 0, overrides: 0 };
    entry.count++;
    counts.set(ns, entry);
  }
  for (const locale of LOCALES) {
    for (const key of Object.keys(overrides[locale] ?? {}).filter((k) => !k.includes(SCOPE_SEP))) {
      const entry = counts.get(key.split(".")[0]);
      if (entry) entry.overrides++;
    }
  }
  return [...counts].map(([name, v]) => ({ name, ...v }));
}

export function listEntries(namespace: string, scope = ""): ContentEntry[] {
  const bases = Object.fromEntries(LOCALES.map((l) => [l, flatten(loadBaseMessages(l))])) as Record<Locale, Record<string, string>>;
  const overrides = loadOverrides();
  return Object.keys(bases.vi)
    .filter((key) => key.split(".")[0] === namespace && !isHiddenKey(key) && (!scope || isInScope(scope, key)))
    .map((key) => {
      const values = {} as Record<Locale, string>;
      const overridden = {} as Record<Locale, boolean>;
      for (const l of LOCALES) {
        const own = scope ? overrides[l]?.[scope + SCOPE_SEP + key] : undefined;
        const o = own ?? overrides[l]?.[key];
        overridden[l] = scope ? own !== undefined : overrides[l]?.[key] !== undefined;
        values[l] = o ?? bases[l][key] ?? "";
      }
      return { key, values, overridden };
    });
}

export function keyExists(key: string, locale: Locale): boolean {
  return key in flatten(loadBaseMessages(locale));
}

export interface ContentChange {
  locale: Locale;
  key: string;
  /** null = xoá chỉnh sửa, quay về bản gốc */
  value: string | null;
}

export function saveChanges(changes: ContentChange[]) {
  transaction(() => {
    for (const c of changes) {
      if (c.value === null) {
        run("DELETE FROM content_overrides WHERE locale = ? AND key = ?", c.locale, c.key);
      } else {
        run(
          `INSERT INTO content_overrides (locale, key, value) VALUES (?, ?, ?)
           ON CONFLICT(locale, key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
          c.locale,
          c.key,
          c.value,
        );
      }
    }
  });
}

/** Tìm trong TOÀN BỘ văn bản website (khoá hoặc nội dung ở bất kỳ ngôn ngữ nào). */
export function searchEntries(query: string, limit = 80): ContentEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const bases = Object.fromEntries(LOCALES.map((l) => [l, flatten(loadBaseMessages(l))])) as Record<Locale, Record<string, string>>;
  const overrides = loadOverrides();
  const results: ContentEntry[] = [];
  for (const key of Object.keys(bases.vi)) {
    if (isHiddenKey(key)) continue;
    const values = {} as Record<Locale, string>;
    const overridden = {} as Record<Locale, boolean>;
    for (const l of LOCALES) {
      const o = overrides[l]?.[key];
      overridden[l] = o !== undefined;
      values[l] = o ?? bases[l][key] ?? "";
    }
    if (key.toLowerCase().includes(q) || LOCALES.some((l) => values[l].toLowerCase().includes(q))) {
      results.push({ key, values, overridden });
      if (results.length >= limit) break;
    }
  }
  return results;
}

/** Mọi mục văn bản đã được chỉnh sửa (nội dung chung), mới nhất trước. */
export function listChanged(limit = 300): ContentEntry[] {
  const overrides = loadOverrides();
  const keys = new Set<string>();
  for (const l of LOCALES) for (const k of Object.keys(overrides[l] ?? {})) if (!k.includes(SCOPE_SEP) && !isHiddenKey(k)) keys.add(k);
  const bases = Object.fromEntries(LOCALES.map((l) => [l, flatten(loadBaseMessages(l))])) as Record<Locale, Record<string, string>>;
  return [...keys].slice(0, limit).map((key) => {
    const values = {} as Record<Locale, string>;
    const overridden = {} as Record<Locale, boolean>;
    for (const l of LOCALES) {
      const o = overrides[l]?.[key];
      overridden[l] = o !== undefined;
      values[l] = o ?? bases[l][key] ?? "";
    }
    return { key, values, overridden };
  });
}

/** Khôi phục hàng loạt về nội dung gốc. Trả về số mục đã khôi phục. */
export function resetOverrides(opts: { namespace?: string; scope?: string; all?: boolean }): number {
  let result: { changes: number | bigint };
  if (opts.scope) {
    const prefix = `${opts.scope}${SCOPE_SEP}`;
    result = run("DELETE FROM content_overrides WHERE substr(key, 1, ?) = ?", prefix.length, prefix);
  } else if (opts.namespace) {
    const prefix = `${opts.namespace}.`;
    result = run("DELETE FROM content_overrides WHERE instr(key, ?) = 0 AND substr(key, 1, ?) = ?", SCOPE_SEP, prefix.length, prefix);
  } else if (opts.all) {
    result = run("DELETE FROM content_overrides WHERE instr(key, ?) = 0", SCOPE_SEP);
  } else {
    return 0;
  }
  return Number(result.changes);
}
