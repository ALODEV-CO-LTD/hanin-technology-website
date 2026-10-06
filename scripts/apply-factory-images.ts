/**
 * Thay TOÀN BỘ ảnh trong CMS (banner, dịch vụ, sản phẩm, tin tức, ghi đè vị trí ảnh, thư viện) bằng ảnh thật
 * của nhà máy trong public/images/factory/. Chạy trên máy dev và trên server sau khi deploy:
 *   npm run db:factory-images
 * Ảnh tải lên cũ (thư viện) được chuyển vào DATA_DIR/uploads-old/ để có thể khôi phục, không còn hiển thị trên website.
 */
import fs from "node:fs";
import path from "node:path";
import { DATA_DIR, all, run, transaction } from "../src/server/db";
import { BANNER_IMAGES, POST_IMAGES, PRODUCT_IMAGES, SERVICE_IMAGES } from "./factory-images";

const byOrder = (table: string, images: string[]) => {
  const rows = all<{ id: number }>(`SELECT id FROM ${table} ORDER BY id`);
  rows.forEach((row, i) => {
    run(`UPDATE ${table} SET image = ? WHERE id = ?`, images[i % images.length], row.id);
  });
  return rows.length;
};

const counts = transaction(() => {
  const banners = all<{ id: number; placement: string }>("SELECT id, placement FROM banners");
  banners.forEach((b) => run("UPDATE banners SET image = ? WHERE id = ?", BANNER_IMAGES[b.placement] ?? BANNER_IMAGES["home-hero"], b.id));
  const services = byOrder("services", SERVICE_IMAGES);
  const products = byOrder("products", PRODUCT_IMAGES);
  const posts = byOrder("posts", POST_IMAGES);
  run("DELETE FROM image_overrides");

  // Thư viện: đưa tệp cũ ra khỏi vùng phục vụ công khai rồi xoá bản ghi.
  const media = all<{ id: number; path: string }>("SELECT id, path FROM media");
  const oldDir = path.join(DATA_DIR, "uploads-old");
  for (const m of media) {
    const from = path.join(DATA_DIR, m.path.replace(/^\//, ""));
    if (fs.existsSync(from)) {
      fs.mkdirSync(oldDir, { recursive: true });
      fs.renameSync(from, path.join(oldDir, `${m.id}-${path.basename(from)}`));
    }
  }
  run("DELETE FROM media");
  return { banners: banners.length, services, products, posts, media: media.length };
});

console.log("Đã thay ảnh:", counts);
