/**
 * Đồng bộ dữ liệu CMS với Company Profile mới nhất của Bên A (11/2026).
 *   npm run db:profile-sync                 (CHỈ XEM: liệt kê bản ghi sẽ bị ghi, không ghi gì)
 *   npm run db:profile-sync -- --ghi-de     (ghi thật; tự sao lưu DB trước, tệp chỉ chủ sở hữu đọc được)
 *   thêm --ep-buoc để ghi cả những bản ghi đã được sửa trong CMS sau lần đồng bộ trước (mặc định bị bỏ qua để không mất chỉnh sửa)
 * Chống mất/lộ dữ liệu: mặc định không ghi; cài đặt liên hệ đang có giá trị khác thì không đè; không in email/số điện thoại ra màn hình.
 * - Thông tin liên hệ: hotline, email, Zalo.
 * - Dịch vụ: lấy chữ từ messages/<locale>/dich-vu.json (DichVu.services.*) ghi vào bảng services (3 ngôn ngữ). Không đổi ảnh/slug.
 * - Sản phẩm: lấy chữ từ messages/<locale>/san-pham.json (SanPham.products.*) ghi vào bảng products, kèm ảnh trong public/images/profile-lib (chạy db:profile-media trước). Không đổi slug.
 * - Khách hàng: KHÔNG xử lý ở đây (đã chuyển sang npm run db:client-logos, tránh tạo bản ghi trùng tên viết hoa/thường).
 * Ảnh do người dùng tự tải trong CMS không bị đụng tới.
 */
import fs from "node:fs";
import path from "node:path";
import { all, get, run, transaction } from "../src/server/db";

const WRITE = process.argv.includes("--ghi-de");
const FORCE = process.argv.includes("--ep-buoc");
const skipped: string[] = [];

const LOCALES = ["vi", "en", "zh", "ko"] as const;
type Msg = Record<string, unknown>;
const messages: Record<string, { dichVu: Msg; sanPham: Msg }> = {};
for (const l of LOCALES) {
  const read = (ns: string) => JSON.parse(fs.readFileSync(path.join(process.cwd(), "messages", l, `${ns}.json`), "utf8")) as Msg;
  messages[l] = { dichVu: (read("dich-vu").DichVu as Msg) ?? {}, sanPham: (read("san-pham").SanPham as Msg) ?? {} };
}
const dig = (o: unknown, ...keys: string[]): string => {
  let cur: unknown = o;
  for (const k of keys) cur = cur && typeof cur === "object" ? (cur as Msg)[k] : undefined;
  return typeof cur === "string" ? cur : "";
};
const i18n = (get: (l: (typeof LOCALES)[number]) => string) => JSON.stringify(Object.fromEntries(LOCALES.map((l) => [l, get(l)])));

/* ---------- 1. Liên hệ ---------- */
const SETTINGS: Record<string, string> = {
  hotline: "0978240827,0945170982,0964067199",
  engineerHotline: "",
  hrHotline: "0978240827",
  salesEmail: "huyvinh82@gmail.com",
  engineeringEmail: "huyvinh82@gmail.com",
  hrEmail: "huyvinh82@gmail.com",
  inquiryNotifyEmail: "huyvinh82@gmail.com",
  zaloUrl: "https://zalo.me/0978240827",
};

/* ---------- 2. Dịch vụ: slug -> khoá trong messages ---------- */
const SERVICES: Record<string, { key: string; titleEn: string }> = {
  "tien-xu-ly-be-mat": { key: "tienXuLy", titleEn: "Surface pre-treatment" },
  "ma-crom-cung-cong-nghiep": { key: "hardChrome", titleEn: "Nickel-chrome plating on ABS plastic" },
  "ma-niken-hoa-hoc-enp": { key: "electrolessNickel", titleEn: "Nickel plating on metal" },
  "ma-kem-hop-kim-kem-niken": { key: "kemNiken", titleEn: "Zinc, copper, tin and black phosphate plating" },
  "day-chuyen-son-ma-ket-hop": { key: "sonMaKetHop", titleEn: "Spray painting, printing and laser" },
  "xu-ly-nhom-ma-kim-loai-khac": { key: "xuLyNhom", titleEn: "PVD vacuum coating" },
};

/* ---------- 3. Sản phẩm: slug -> khoá trong messages (SanPham.products.<key>) ---------- */
const PRODUCTS: Record<string, { key: string; category: string; image: string }> = {
  "banh-rang-truc-vit-ma-niken-hoa-hoc": { key: "kimLoaiMa", category: "co-khi-chinh-xac", image: "/images/profile-lib/hang-truc-chot-ngu-kim-xep-khay.jpg" },
  "truc-piston-ty-ben-thuy-luc-o-to": { key: "phuTungOTo", category: "phu-tung-o-to-xe-may", image: "/images/profile-lib/chi-tiet-vien-den-oto-ma-crom.jpg" },
  "thanh-busbar-dong-ma-thiec-dan-dien": { key: "smartHome", category: "dau-cosse-thiet-bi-dien", image: "/images/profile-lib/khung-vien-cong-tac-ma-crom.jpg" },
  "bu-long-chot-dinh-vi-khoi-be-hoa-chat": { key: "veSinhNhaBep", category: "anodizing", image: "/images/profile-lib/tay-gat-sen-tam-ma-crom.jpg" },
  "ong-lot-truc-ren-co-khi-chiu-mai-mon": { key: "satinAbs", category: "co-khi-chinh-xac", image: "/images/profile-lib/nap-nut-tron-ma-crom-xuoc-tam.jpg" },
  "cum-linh-kien-khung-vo-banh-rang-b2b": { key: "cromDenHairLine", category: "co-khi-chinh-xac", image: "/images/profile-lib/nhom-chi-tiet-den-bong-num-vong-tay-nam.jpg" },
  "chi-tiet-kim-loai-ma-treo-day-chuyen-tu-dong": { key: "giaDung", category: "dau-cosse-thiet-bi-dien", image: "/images/profile-lib/num-van-ma-crom-satin.jpg" },
};

let nSet = 0, nSvc = 0, nProd = 0;
const lastSync = get<{ value: string }>("SELECT value FROM settings WHERE key = 'profileSyncAt'")?.value ?? "";
/** Bản ghi đã sửa trong CMS sau lần đồng bộ trước thì giữ nguyên (trừ khi --ep-buoc). */
const editedSince = (table: string, slug: string) => {
  if (FORCE || !lastSync) return false;
  const r = get<{ u: string }>(`SELECT updated_at AS u FROM ${table} WHERE slug = ?`, slug);
  return !!r && r.u > lastSync.replace("T", " ").slice(0, 19);
};
if (WRITE) {
  const dir = path.join(process.env.DATA_DIR || path.join(process.cwd(), "data"), "backups");
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const file = path.join(dir, `hanin-${new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12)}-truoc-profile-sync.db`);
  run("VACUUM INTO ?", file);
  fs.chmodSync(file, 0o600);
  console.log(`Đã sao lưu DB: ${path.basename(file)}`);
}
transaction(() => {
  for (const [key, value] of Object.entries(SETTINGS)) {
    const cur = get<{ value: string }>("SELECT value FROM settings WHERE key = ?", key)?.value;
    if (cur && cur !== value && !FORCE) {
      skipped.push(`cài đặt ${key}`);
      continue;
    }
    if (!WRITE) { nSet++; continue; }
    run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", key, value);
    nSet++;
  }
  for (const [slug, { key, titleEn }] of Object.entries(SERVICES)) {
    if (!get("SELECT id FROM services WHERE slug = ?", slug)) continue;
    const f = (field: string) => i18n((l) => dig(messages[l].dichVu, "services", key, field));
    const title = f("title");
    if (!dig(messages.vi.dichVu, "services", key, "title")) continue;
    if (editedSince("services", slug)) { skipped.push(`dịch vụ ${slug}`); continue; }
    if (!WRITE) { nSvc++; continue; }
    run(
      "UPDATE services SET title = ?, title_en = ?, description = ?, application_label = ?, application_text = ?, stat_label = ?, image_alt = ?, badge = ?, updated_at = datetime('now') WHERE slug = ?",
      title, titleEn, f("description"), f("applicationLabel"), f("applicationText"), f("statLabel"), f("imageAlt"),
      i18n(() => ""), slug,
    );
    nSvc++;
  }
  for (const [slug, { key, category, image }] of Object.entries(PRODUCTS)) {
    if (!get("SELECT id FROM products WHERE slug = ?", slug)) continue;
    if (!dig(messages.vi.sanPham, "products", key, "title")) continue;
    if (editedSince("products", slug)) { skipped.push(`sản phẩm ${slug}`); continue; }
    const f = (field: string) => i18n((l) => dig(messages[l].sanPham, "products", key, field));
    if (!WRITE) { nProd++; continue; }
    run(
      "UPDATE products SET title = ?, description = ?, image_badge = ?, image_alt = ?, image = ?, category_slug = ?, spec_chips = '[]', lot = '', updated_at = datetime('now') WHERE slug = ?",
      f("title"), f("description"), f("imageBadge"), f("imageAlt"), image, category, slug,
    );
    nProd++;
  }
  if (WRITE) run("INSERT INTO settings (key, value) VALUES ('profileSyncAt', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", new Date().toISOString());
});
if (skipped.length) console.log(`Bỏ qua (đã sửa trong CMS, hoặc khác giá trị hiện có): ${skipped.join(", ")}. Dùng --ep-buoc để ghi đè.`);
console.log(`${WRITE ? "Đã cập nhật" : "[CHỈ XEM] Sẽ cập nhật"}: ${nSet} cài đặt, ${nSvc} dịch vụ, ${nProd} sản phẩm.`);
