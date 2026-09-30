import { all, get } from "./db";

/**
 * Ảnh minh hoạ nằm trong các khối của website (không thuộc mục Dịch vụ/Sản phẩm/Tin tức/Banner).
 * Mỗi vị trí có KHOÁ riêng dạng "<thư-mục>/<Component>#<số>". Component gọi:
 *     siteImg("nang-luc/FactoryGallery#1", "https://ảnh-mặc-định")
 * BÊN TRONG hàm render (không gọi ở phạm vi module, vì giá trị sẽ bị đóng băng).
 * CMS ghi đè URL theo khoá; danh sách vị trí sinh tự động bởi `npm run images:scan`.
 */
let version = "";
let cache = new Map<string, string>();

function load(): Map<string, string> {
  const meta = get<{ n: number; m: string | null }>("SELECT COUNT(*) AS n, MAX(updated_at) AS m FROM image_overrides");
  const v = `${meta?.n ?? 0}:${meta?.m ?? ""}`;
  if (v !== version) {
    cache = new Map(all<{ key: string; url: string }>("SELECT key, url FROM image_overrides").map((r) => [r.key, r.url]));
    version = v;
  }
  return cache;
}

export function siteImg(key: string, fallback: string): string {
  return load().get(key) || fallback;
}

export function getImageOverrides(): Record<string, string> {
  return Object.fromEntries(load());
}
