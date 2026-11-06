import fs from "node:fs";
import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { getMediaUsage } from "@/server/media-usage";
import { all, get, run } from "@/server/db";
import { PUBLIC_UPLOAD_DIR, resolveInside, saveMedia } from "@/server/uploads";

/** Toàn bộ thư viện kèm các vị trí đang dùng từng ảnh (để CMS xếp theo trang lớn / trang nhỏ). */
export const GET = route(async () => {
  const usage = getMediaUsage();
  const rows = all<{ id: number; path: string; original: string; mime: string; size: number; createdAt: string }>(
    "SELECT id, path, original, mime, size, created_at AS createdAt FROM media ORDER BY id DESC LIMIT 2000",
  );
  const items = rows.map((r) => ({ ...r, usage: usage.get(r.path) ?? [] }));
  return { items, total: items.length };
});

/** Body {ids: number[]}: xoá nhiều ảnh cùng lúc (xoá cả tệp trong uploads). */
export const DELETE = route(async (request) => {
  const body = await readJson(request);
  const ids = Array.isArray(body.ids) ? [...new Set(body.ids.map(Number).filter((n) => Number.isInteger(n) && n > 0))] : [];
  if (ids.length === 0) throw new HttpError(400, "Chưa chọn ảnh nào");
  if (ids.length > 500) throw new HttpError(400, "Tối đa 500 ảnh mỗi lần");
  let deleted = 0;
  for (const id of ids) {
    const row = get<{ path: string }>("SELECT path FROM media WHERE id = ?", id);
    if (!row) continue;
    const abs = resolveInside(PUBLIC_UPLOAD_DIR, row.path.replace(/^\/uploads\//, ""));
    if (abs && fs.existsSync(abs)) fs.rmSync(abs);
    run("DELETE FROM media WHERE id = ?", id);
    deleted += 1;
  }
  return { ok: true, deleted };
});

export const POST = route(async (request) => {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) throw new HttpError(400, "Chưa chọn tệp");
  const stored = await saveMedia(file);
  const result = run("INSERT INTO media (path, original, mime, size) VALUES (?, ?, ?, ?)", stored.path, stored.original, stored.mime, stored.size);
  return Response.json({ id: Number(result.lastInsertRowid), ...stored }, { status: 201 });
});
