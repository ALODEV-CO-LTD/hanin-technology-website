/**
 * Đồng bộ bảng "Khách hàng tiêu biểu" của CMS theo Company Profile (trang "Một số Khách hàng tiêu biểu").
 *   npm run db:client-logos            (idempotent; deploy tự chạy)
 *   npm run db:client-logos -- --chot  (thêm: ẩn các khách hàng không có trong profile, chạy tay 1 lần)
 * Logo gốc là bản trên Trang chủ: public/images/clients/profile-<slug>.png. Trang chủ và trang Giới thiệu
 * cùng đọc bảng clients, nên quản trị sửa/tải logo trong CMS thì cả hai trang đổi theo.
 * Logo do người quản trị tự tải lên (không nằm trong /images/clients/) không bị ghi đè.
 */
import { all, get, run, transaction } from "../src/server/db";

/** name: tên hiển thị (đúng profile); alias: tên cũ trong DB để nhận lại bản ghi; slug: file logo. */
const PROFILE_CLIENTS: { name: string; slug: string; alias?: string[] }[] = [
  { name: "LG Electronics", slug: "lg", alias: ["LG ELECTRONICS"] },
  { name: "D&M Global", slug: "dm-global", alias: ["D&M GLOBAL"] },
  { name: "World Co.", slug: "world-co", alias: ["WORLD CO."] },
  { name: "Dong Kwang Vina", slug: "dong-kwang-vina", alias: ["DONG KWANG VINA"] },
  { name: "Troy Hardware Việt Nam", slug: "troy-hardware", alias: ["TROY HARDWARE"] },
  { name: "Camex Việt Nam", slug: "camex", alias: ["CAMEX"] },
  { name: "Anam Electronics", slug: "anam-electronics", alias: ["ANAM ELECTRONICS"] },
  { name: "SEGI Việt Nam", slug: "segi", alias: ["SEGI"] },
  { name: "Skylink", slug: "skylink", alias: ["SKYLINK"] },
  { name: "Panasonic Việt Nam", slug: "panasonic", alias: ["PANASONIC"] },
  { name: "Safety Hardware Việt Nam (Inlead)", slug: "safety-hardware", alias: ["SAFETY HARDWARE"] },
  { name: "Kaijai Việt Nam", slug: "kaijai", alias: ["KAIJAI"] },
  { name: "Takagi Việt Nam", slug: "takagi", alias: ["TAKAGI"] },
  { name: "TKR Việt Nam", slug: "tkr", alias: ["TKR"] },
  { name: "Mizuho", slug: "mizuho", alias: ["MIZUHO"] },
  { name: "MITAC Việt Nam", slug: "mitac", alias: ["MITAC"] },
  { name: "Viglacera", slug: "viglacera", alias: ["VIGLACERA"] },
  { name: "Kim loại Ngũ kim Tin Ping Việt Nam", slug: "tin-ping", alias: ["TIN PING"] },
  { name: "VinFast", slug: "vinfast", alias: ["VINFAST"] },
  { name: "WMA Việt Nam", slug: "wma", alias: ["WMA"] },
  { name: "KYOEI Việt Nam", slug: "kyoei", alias: ["KYOEI"] },
  { name: "Innotek", slug: "innotek", alias: ["INNOTEK"] },
  { name: "World Honor Việt Nam", slug: "world-honor", alias: ["WORLD HONOR"] },
  { name: "Quốc tế QJT Việt Nam", slug: "qjt", alias: ["QJT"] },
  { name: "Fuzukaku Việt Nam", slug: "fuzukaku", alias: ["FUZUKAKU"] },
  { name: "An Phú Việt", slug: "an-phu-viet", alias: ["AN PHÚ VIỆT"] },
  { name: "Uniden Việt Nam", slug: "uniden", alias: ["UNIDEN"] },
  { name: "Yu-Won NRT", slug: "yuwon", alias: ["YUWON"] },
  { name: "VTC Tech", slug: "vtc-tech", alias: ["VTC TECH"] },
  { name: "Fa Yang Lighting (FAYANG)", slug: "fayang", alias: ["FAYANG"] },
];

const chot = process.argv.includes("--chot");
let inserted = 0;
let updated = 0;
let hidden = 0;

transaction(() => {
  const keep = new Set<number>();
  PROFILE_CLIENTS.forEach((c, index) => {
    const logo = `/images/clients/profile-${c.slug}.png`;
    const names = [c.name, ...(c.alias ?? [])];
    const row = get<{ id: number; logo: string }>(
      `SELECT id, logo FROM clients WHERE name IN (${names.map(() => "?").join(",")}) ORDER BY id LIMIT 1`,
      ...names,
    );
    if (!row) {
      const r = run("INSERT INTO clients (name, legal_name, logo, sort, active) VALUES (?, '', ?, ?, 1)", c.name, logo, index);
      keep.add(Number(r.lastInsertRowid));
      inserted++;
      return;
    }
    keep.add(row.id);
    const ownLogo = row.logo && !row.logo.startsWith("/images/clients/");
    run(
      "UPDATE clients SET name = ?, logo = ?, sort = ?, active = 1, updated_at = datetime('now') WHERE id = ?",
      c.name,
      ownLogo ? row.logo : logo,
      index,
      row.id,
    );
    updated++;
  });
  if (chot) {
    for (const row of all<{ id: number }>("SELECT id FROM clients WHERE active = 1")) {
      if (keep.has(row.id)) continue;
      run("UPDATE clients SET active = 0, updated_at = datetime('now') WHERE id = ?", row.id);
      hidden++;
    }
  }
});
console.log(`Khách hàng theo profile: thêm ${inserted}, cập nhật ${updated}${chot ? `, ẩn ${hidden} khách hàng không có trong profile` : ""}.`);
