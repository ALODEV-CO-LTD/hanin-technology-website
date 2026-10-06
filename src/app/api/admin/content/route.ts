import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { all, get } from "@/server/db";
import {
  SCOPE_SEP,
  isHiddenKey,
  isInScope,
  keyExists,
  listEntries,
  listNamespaces,
  saveChanges,
  type ContentChange,
} from "@/server/content";
import { isLocale, parseI18n } from "@/server/i18n";
import { revalidateSite } from "@/server/revalidate";

/** Danh sách phạm vi: nội dung chung + từng dịch vụ / sản phẩm (nội dung riêng trang chi tiết). */
function listScopes() {
  const services = all<{ slug: string; title: string }>("SELECT slug, title FROM services ORDER BY sort, id").map((r) => ({
    id: `svc:${r.slug}`,
    label: `Dịch vụ › ${parseI18n(r.title).vi || r.slug}`,
    namespace: "DichVu",
  }));
  const products = all<{ slug: string; title: string }>("SELECT slug, title FROM products ORDER BY sort, id").map((r) => ({
    id: `prd:${r.slug}`,
    label: `Sản phẩm › ${parseI18n(r.title).vi || r.slug}`,
    namespace: "SanPham",
  }));
  return [...services, ...products];
}

function assertScope(scope: string) {
  const [kind, slug] = scope.split(":");
  const table = kind === "svc" ? "services" : kind === "prd" ? "products" : "";
  if (!table || !slug || !get(`SELECT 1 FROM ${table} WHERE slug = ?`, slug)) throw new HttpError(400, "Phạm vi nội dung không hợp lệ");
}

export const GET = route(async (request) => {
  const url = new URL(request.url);
  const namespace = url.searchParams.get("namespace");
  const scope = url.searchParams.get("scope") ?? "";
  if (scope) assertScope(scope);
  if (!namespace) return { namespaces: listNamespaces(), scopes: listScopes() };
  return { entries: listEntries(namespace, scope) };
});

export const PUT = route(async (request) => {
  const body = await readJson(request);
  const raw = Array.isArray(body.changes) ? body.changes : [];
  if (raw.length === 0 || raw.length > 500) throw new HttpError(400, "Danh sách thay đổi không hợp lệ");

  const changes: ContentChange[] = raw.map((item: Record<string, unknown>) => {
    const locale = String(item.locale ?? "");
    const key = String(item.key ?? "");
    const scope = String(item.scope ?? "");
    const value = item.value === null ? null : String(item.value ?? "");
    if (!isLocale(locale) || !keyExists(key, locale) || isHiddenKey(key)) {
      throw new HttpError(400, `Khoá nội dung không hợp lệ: ${key}`);
    }
    if (scope) {
      assertScope(scope);
      if (!isInScope(scope, key)) throw new HttpError(400, `Khoá không thuộc nội dung riêng của mục: ${key}`);
    }
    if (value !== null && value.length > 5000) throw new HttpError(400, `Nội dung quá dài: ${key}`);
    return { locale, key: scope ? `${scope}${SCOPE_SEP}${key}` : key, value };
  });

  saveChanges(changes);
  revalidateSite();
  return { ok: true, saved: changes.length };
});
