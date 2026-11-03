/**
 * Đồng bộ dữ liệu CMS với Company Profile mới nhất của Bên A (11/2026).
 *   npm run db:profile-sync        (an toàn chạy lại; sao lưu trước bằng npm run db:backup)
 * - Thông tin liên hệ: hotline, email, Zalo.
 * - Dịch vụ: lấy chữ từ messages/<locale>/dich-vu.json (DichVu.services.*) ghi vào bảng services (3 ngôn ngữ). Không đổi ảnh/slug.
 * - Sản phẩm: lấy chữ từ messages/<locale>/san-pham.json (SanPham.products.*) ghi vào bảng products. Không đổi ảnh/slug.
 * - Khách hàng: thêm các khách hàng có trong profile (ẩn sẵn, chưa có logo). Vào CMS tải logo rồi bật hiển thị.
 * Ảnh do người dùng tự tải trong CMS không bị đụng tới.
 */
import fs from "node:fs";
import path from "node:path";
import { all, get, run, transaction } from "../src/server/db";

const LOCALES = ["vi", "zh", "ko"] as const;
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
const PRODUCTS: Record<string, { key: string; category: string }> = {
  "banh-rang-truc-vit-ma-niken-hoa-hoc": { key: "kimLoaiMa", category: "co-khi-chinh-xac" },
  "truc-piston-ty-ben-thuy-luc-o-to": { key: "phuTungOTo", category: "phu-tung-o-to-xe-may" },
  "thanh-busbar-dong-ma-thiec-dan-dien": { key: "smartHome", category: "dau-cosse-thiet-bi-dien" },
  "bu-long-chot-dinh-vi-khoi-be-hoa-chat": { key: "veSinhNhaBep", category: "anodizing" },
  "ong-lot-truc-ren-co-khi-chiu-mai-mon": { key: "satinAbs", category: "co-khi-chinh-xac" },
  "cum-linh-kien-khung-vo-banh-rang-b2b": { key: "cromDenHairLine", category: "co-khi-chinh-xac" },
  "chi-tiet-kim-loai-ma-treo-day-chuyen-tu-dong": { key: "giaDung", category: "dau-cosse-thiet-bi-dien" },
};

/* ---------- 4. Khách hàng trong profile (tên hiển thị) ---------- */
const CLIENTS = [
  "LG ELECTRONICS", "D&M GLOBAL", "WORLD CO.", "DONG KWANG VINA", "ANAM ELECTRONICS", "SEGI", "SKYLINK", "PANASONIC",
  "TAKAGI", "TKR", "MIZUHO", "MITAC", "VINFAST", "WMA", "KYOEI", "INNOTEK", "FUZUKAKU", "AN PHÚ VIỆT", "UNIDEN",
];

let nSet = 0, nSvc = 0, nProd = 0, nCli = 0;
transaction(() => {
  for (const [key, value] of Object.entries(SETTINGS)) {
    run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", key, value);
    nSet++;
  }
  for (const [slug, { key, titleEn }] of Object.entries(SERVICES)) {
    if (!get("SELECT id FROM services WHERE slug = ?", slug)) continue;
    const f = (field: string) => i18n((l) => dig(messages[l].dichVu, "services", key, field));
    const title = f("title");
    if (!dig(messages.vi.dichVu, "services", key, "title")) continue;
    run(
      "UPDATE services SET title = ?, title_en = ?, description = ?, application_label = ?, application_text = ?, stat_label = ?, image_alt = ?, badge = ?, updated_at = datetime('now') WHERE slug = ?",
      title, titleEn, f("description"), f("applicationLabel"), f("applicationText"), f("statLabel"), f("imageAlt"),
      i18n(() => ""), slug,
    );
    nSvc++;
  }
  for (const [slug, { key, category }] of Object.entries(PRODUCTS)) {
    if (!get("SELECT id FROM products WHERE slug = ?", slug)) continue;
    if (!dig(messages.vi.sanPham, "products", key, "title")) continue;
    const f = (field: string) => i18n((l) => dig(messages[l].sanPham, "products", key, field));
    run(
      "UPDATE products SET title = ?, description = ?, image_badge = ?, image_alt = ?, category_slug = ?, spec_chips = '[]', lot = '', updated_at = datetime('now') WHERE slug = ?",
      f("title"), f("description"), f("imageBadge"), f("imageAlt"), category, slug,
    );
    nProd++;
  }
  const maxSort = (get<{ m: number }>("SELECT COALESCE(MAX(sort), 0) AS m FROM clients")?.m ?? 0) as number;
  let sort = maxSort;
  for (const name of CLIENTS) {
    if (all("SELECT id FROM clients WHERE name = ?", name).length) continue;
    run("INSERT INTO clients (name, legal_name, logo, sort, active) VALUES (?, '', '', ?, 0)", name, ++sort);
    nCli++;
  }
});
console.log(`Đã cập nhật: ${nSet} cài đặt, ${nSvc} dịch vụ, ${nProd} sản phẩm; thêm ${nCli} khách hàng (đang ẩn, chờ logo).`);
