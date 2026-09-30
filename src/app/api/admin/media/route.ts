import { HttpError } from "@/server/auth";
import { route } from "@/server/api";
import { all, get, run } from "@/server/db";
import { saveMedia } from "@/server/uploads";

export const GET = route(async (request) => {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const pageSize = 48;
  const total = Number(get<{ n: number }>("SELECT COUNT(*) AS n FROM media")?.n ?? 0);
  const items = all(
    "SELECT id, path, original, mime, size, created_at AS createdAt FROM media ORDER BY id DESC LIMIT ? OFFSET ?",
    pageSize,
    (page - 1) * pageSize,
  );
  return { items, total, page, pageSize };
});

export const POST = route(async (request) => {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) throw new HttpError(400, "Chưa chọn tệp");
  const stored = await saveMedia(file);
  const result = run("INSERT INTO media (path, original, mime, size) VALUES (?, ?, ?, ?)", stored.path, stored.original, stored.mime, stored.size);
  return Response.json({ id: Number(result.lastInsertRowid), ...stored }, { status: 201 });
});
