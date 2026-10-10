import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PUBLIC_UPLOAD_DIR, resolveInside } from "@/server/uploads";

/**
 * Ảnh mờ thu nhỏ (khoảng 24px, vài trăm byte) dạng data URL cho ảnh cục bộ, dùng làm nền tạm cho banner:
 * khi chuyển trang, banner hiện ngay hình mờ đúng ảnh thay vì nền đen chờ ảnh thật tải xong.
 * Kết quả giữ trong bộ nhớ theo đường dẫn ảnh (ảnh tải lên CMS luôn có tên mới nên không bị cũ). Ảnh ngoài/lỗi trả null.
 */
const cache = new Map<string, string | null>();

function fileFor(src: string): string | null {
  const clean = src.split("?")[0];
  if (clean.startsWith("/images/")) return resolveInside(path.join(process.cwd(), "public"), clean.slice(1));
  if (clean.startsWith("/uploads/")) return resolveInside(PUBLIC_UPLOAD_DIR, clean.slice("/uploads/".length));
  return null;
}

export async function lqip(src: string): Promise<string | null> {
  if (cache.has(src)) return cache.get(src) ?? null;
  let result: string | null = null;
  try {
    const file = fileFor(src);
    if (file && fs.existsSync(file)) {
      const buf = await sharp(file).resize(24).jpeg({ quality: 45 }).toBuffer();
      result = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }
  } catch {
    result = null;
  }
  cache.set(src, result);
  return result;
}
