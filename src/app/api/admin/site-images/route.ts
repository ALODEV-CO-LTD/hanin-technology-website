import { HttpError } from "@/server/auth";
import { readJson, route } from "@/server/api";
import { run } from "@/server/db";
import { getImageOverrides } from "@/server/site-images";
import slots from "@/server/site-images.generated.json";
import { revalidateSite } from "@/server/revalidate";

export const GET = route(async () => ({ slots, overrides: getImageOverrides() }));

/** Body {key, url}: đặt ảnh thay thế; url rỗng/null = khôi phục ảnh gốc. */
export const PUT = route(async (request) => {
  const body = await readJson(request);
  if (body.resetAll) {
    const result = run("DELETE FROM image_overrides");
    revalidateSite();
    return { ok: true, reset: Number(result.changes) };
  }
  const key = String(body.key ?? "");
  const url = typeof body.url === "string" ? body.url.trim() : "";
  if (!slots.some((s) => s.key === key)) throw new HttpError(404, "Không có vị trí ảnh này");
  if (!url) {
    run("DELETE FROM image_overrides WHERE key = ?", key);
  } else {
    if (!(/^https?:\/\//i.test(url) || (url.startsWith("/") && !url.startsWith("//"))) || url.length > 2000) {
      throw new HttpError(422, "Đường dẫn ảnh không hợp lệ");
    }
    run(
      `INSERT INTO image_overrides (key, url) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET url = excluded.url, updated_at = datetime('now')`,
      key,
      url,
    );
  }
  revalidateSite();
  return { ok: true };
});
