import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { isHiddenKey, keyExists, listEntries, listNamespaces, saveChanges, type ContentChange } from "@/server/content";
import { isLocale } from "@/server/i18n";
import { revalidateSite } from "@/server/revalidate";

export const GET = route(async (request) => {
  const namespace = new URL(request.url).searchParams.get("namespace");
  if (!namespace) return { namespaces: listNamespaces() };
  return { entries: listEntries(namespace) };
});

export const PUT = route(async (request) => {
  const body = await readJson(request);
  const raw = Array.isArray(body.changes) ? body.changes : [];
  if (raw.length === 0 || raw.length > 500) throw new HttpError(400, "Danh sách thay đổi không hợp lệ");

  const changes: ContentChange[] = raw.map((item: Record<string, unknown>) => {
    const locale = String(item.locale ?? "");
    const key = String(item.key ?? "");
    const value = item.value === null ? null : String(item.value ?? "");
    if (!isLocale(locale) || !keyExists(key, locale) || isHiddenKey(key)) {
      throw new HttpError(400, `Khoá nội dung không hợp lệ: ${key}`);
    }
    if (value !== null && value.length > 5000) throw new HttpError(400, `Nội dung quá dài: ${key}`);
    return { locale, key, value };
  });

  saveChanges(changes);
  revalidateSite();
  return { ok: true, saved: changes.length };
});
