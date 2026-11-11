/**
 * Đưa ảnh tách từ Company Profile 11126 (public/images/hanin) vào CMS.
 *   npm run db:hanin-images        (idempotent)
 * - Xóa ghi đè ảnh vị trí (image_overrides) đang trỏ nhầm vào ảnh hero hoặc vào vị trí đã bỏ, để ảnh mặc định trong code có hiệu lực.
 * - Dịch vụ: gán ảnh chụp thật độ phân giải cao (dùng cả làm banner chi tiết), thay ảnh hero nhầm.
 * Ảnh do quản trị tự tải lên (không nằm trong /images/ và không phải ảnh hero nhầm) không bị ghi đè.
 */
import { all, run, transaction } from "../src/server/db";

const HERO_MISTAKE = "/uploads/2026/10/9aba27ef-09c9-4d1f-81b1-e88797abb4e8-tu-nhien.jpg";
const H = (name: string) => `/images/hanin/${name}.webp`;

// Ảnh dịch vụ còn là ảnh banner toàn màn hình ở trang chi tiết nên dùng ảnh chụp thật độ phân giải cao (3200 px), không dùng ảnh cắt nhỏ từ slide.
const SERVICE_IMAGES: Record<string, string> = {
  "tien-xu-ly-be-mat": "/images/factory/ma-quay-1.jpg",
  "ma-crom-cung-cong-nghiep": "/images/factory/ma-treo-3.jpg",
  "ma-niken-hoa-hoc-enp": "/images/factory/ma-quay-5.jpg",
  "ma-kem-hop-kim-kem-niken": "/images/factory/ma-quay-7.jpg",
  "day-chuyen-son-ma-ket-hop": "/images/factory/ma-treo-2.jpg",
  "xu-ly-nhom-ma-kim-loai-khac": "/images/factory/ma-quay-6.jpg",
};
const POST_IMAGES: Record<string, string> = {
  "van-hanh-he-thong-be-ma-tu-dong-hoa": H("slide04-khu-vuc-be-ma"),
};

let overrides = 0;
let rows = 0;
transaction(() => {
  for (const o of all<{ key: string; url: string }>("SELECT key, url FROM image_overrides")) {
    if (o.url === HERO_MISTAKE || o.key === "home/FactoryShowcase#2") {
      run("DELETE FROM image_overrides WHERE key = ?", o.key);
      overrides++;
    }
  }
  const replaceable = (img: string) => !img || img === HERO_MISTAKE || img.startsWith("/images/factory/") || img.startsWith("/images/hanin/");
  for (const [slug, image] of Object.entries(SERVICE_IMAGES)) {
    for (const r of all<{ id: number; image: string }>("SELECT id, image FROM services WHERE slug = ?", slug)) {
      if (replaceable(r.image) && r.image !== image) {
        run("UPDATE services SET image = ?, updated_at = datetime('now') WHERE id = ?", image, r.id);
        rows++;
      }
    }
  }
  for (const [slug, image] of Object.entries(POST_IMAGES)) {
    for (const r of all<{ id: number; image: string }>("SELECT id, image FROM posts WHERE slug = ?", slug)) {
      if (replaceable(r.image) && r.image !== image) {
        run("UPDATE posts SET image = ?, updated_at = datetime('now') WHERE id = ?", image, r.id);
        rows++;
      }
    }
  }
});
// Sửa số liệu PVD cho đúng profile 11126 (chỉ có 2 máy PVD, không nêu "dây chuyền PVD"); chỉ thay khi bản ghi còn đúng văn bản cũ.
const PVD_FIX = {
  slug: "xu-ly-nhom-ma-kim-loai-khac",
  description: {
    vi: "Mạ chân không PVD với 2 máy, cho bề mặt có tính thẩm mỹ cao và độ bền tốt.",
    zh: "配有 2 台 PVD 设备，镀层外观美观、耐用性好。",
    ko: "PVD 장비 2대로 미관이 뛰어나고 내구성이 좋은 진공 도금을 제공합니다.",
  },
  statLabel: { vi: "2 máy PVD", zh: "2 台 PVD 设备", ko: "PVD 장비 2대" },
};
transaction(() => {
  for (const r of all<{ id: number; description: string; stat_label: string }>("SELECT id, description, stat_label FROM services WHERE slug = ?", PVD_FIX.slug)) {
    const d = JSON.parse(r.description || "{}");
    const l = JSON.parse(r.stat_label || "{}");
    if (/dây chuyền|条生产线|라인 2개/.test(`${d.vi ?? ""}${d.zh ?? ""}${d.ko ?? ""}`)) {
      run("UPDATE services SET description = ?, stat_label = ?, updated_at = datetime('now') WHERE id = ?", JSON.stringify({ ...d, ...PVD_FIX.description }), JSON.stringify({ ...l, ...PVD_FIX.statLabel }), r.id);
      rows++;
    }
  }
});
// Đổi ảnh theo bảng gợi ý ảnh (11/2026): chỉ đổi hàng còn đang dùng ảnh cũ, không ghi đè ảnh người dùng đã chọn trong CMS.
const PHOTO_SWAPS: { table: "banners" | "services"; where: string; arg: string; col: string; oldLike: string; image: string }[] = [
  { table: "banners", where: "placement", arg: "san-pham", col: "image", oldLike: "%qc-1.jpg", image: "/images/profile-lib/nhom-chi-tiet-den-bong-num-vong-tay-nam.jpg" },
  { table: "banners", where: "placement", arg: "nang-luc", col: "image", oldLike: "%ma-quay-5.jpg", image: "/images/profile-lib/nha-xuong-ma-treo-be-ma.jpg" },
  { table: "services", where: "slug", arg: "ma-crom-cung-cong-nghiep", col: "image", oldLike: "%ma-treo-3.jpg", image: "/images/profile-lib/chu-noi-logo-vinfast-ma-crom.jpg" },
  { table: "services", where: "slug", arg: "ma-niken-hoa-hoc-enp", col: "image", oldLike: "%ma-quay-5.jpg", image: "/images/profile-lib/dia-tron-xuoc-dong-tam-niken-satin.jpg" },
  { table: "services", where: "slug", arg: "ma-kem-hop-kim-kem-niken", col: "image", oldLike: "%ma-quay-7.jpg", image: "/images/profile-lib/nhom-chi-tiet-tru-ren-ma-kem-nen-xanh.jpg" },
  { table: "services", where: "slug", arg: "day-chuyen-son-ma-ket-hop", col: "image", oldLike: "%ma-treo-2.jpg", image: "/images/profile-lib/dan-phun-son-tu-dong-bang-tai.jpg" },
  { table: "services", where: "slug", arg: "xu-ly-nhom-ma-kim-loai-khac", col: "image", oldLike: "%ma-quay-6.jpg", image: "/images/profile-lib/hai-may-pvd-phong-sach.jpg" },
  { table: "services", where: "slug", arg: "tien-xu-ly-be-mat", col: "image", oldLike: "%ma-quay-1.jpg", image: "/images/profile-lib/cong-nhan-kiem-tra-gia-treo-ma.jpg" },
];
let swapped = 0;
transaction(() => {
  for (const w of PHOTO_SWAPS) {
    swapped += Number(run(`UPDATE ${w.table} SET ${w.col} = ?, updated_at = datetime('now') WHERE ${w.where} = ? AND ${w.col} LIKE ?`, w.image, w.arg, w.oldLike).changes);
  }
});
console.log(`Đã đổi ${swapped} vị trí ảnh theo bảng gợi ý.`);
// Thư viện ảnh: thêm ảnh mới và cập nhật kích thước các ảnh đã thay bản nét hơn (chỉ ảnh trong public/images, chạy lại an toàn).
import fs from "node:fs";
import path from "node:path";
const NEW_MEDIA = [
  { path: "/images/process/ky-thuat-nhan-vien-kiem-tra-gia-treo.jpg", original: "Kỹ thuật – nhân viên kiểm tra chi tiết mạ trên giá treo (ky-thuat-nhan-vien-kiem-tra-gia-treo).jpg" },
];
transaction(() => {
  for (const m of NEW_MEDIA) {
    const abs = path.join(process.cwd(), "public", m.path);
    if (!fs.existsSync(abs)) continue;
    run("INSERT OR IGNORE INTO media (path, original, mime, size) VALUES (?, ?, 'image/jpeg', ?)", m.path, m.original, fs.statSync(abs).size);
  }
  for (const r of all<{ id: number; path: string; size: number }>("SELECT id, path, size FROM media WHERE path LIKE '/images/%'")) {
    const abs = path.join(process.cwd(), "public", r.path);
    if (!fs.existsSync(abs)) continue;
    const size = fs.statSync(abs).size;
    if (size !== r.size) run("UPDATE media SET size = ? WHERE id = ?", size, r.id);
  }
});
console.log(`Đã bỏ ${overrides} ghi đè ảnh vị trí sai, cập nhật ảnh cho ${rows} bản ghi dịch vụ/bài viết.`);
