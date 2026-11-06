/**
 * Xuất toàn bộ thư viện ảnh ra thư mục, xếp theo "<trang lớn>/<khối>/", để tải về một lần.
 *   node --import tsx scripts/export-media.ts <thư-mục-đích>
 */
import fs from "node:fs";
import path from "node:path";
import { all } from "../src/server/db";
import { getMediaUsage } from "../src/server/media-usage";
import { PAGES, PAGE_ORDER, SECTIONS, humanize } from "../src/components/admin/image-labels";

const out = process.argv[2];
if (!out) throw new Error("Thiếu thư mục đích");
const clean = (s: string) => s.normalize("NFC").replace(/[\\/:*?"<>|]+/g, "-").trim();
const usage = getMediaUsage();
const rows = all<{ path: string; original: string }>("SELECT path, original FROM media ORDER BY id");
const used = new Set<string>();
let n = 0;
let missing = 0;
for (const r of rows) {
  const u = usage.get(r.path) ?? [];
  const page = u.map((x) => x.page).sort((a, b) => (PAGE_ORDER.indexOf(a) + 1 || 99) - (PAGE_ORDER.indexOf(b) + 1 || 99))[0] ?? "chua-gan";
  const section = u.find((x) => x.page === page)?.section ?? "chua-gan/chua-gan";
  const idx = String(Math.max(PAGE_ORDER.indexOf(page), 0) + 1).padStart(2, "0");
  const dir = path.join(out, `${idx} ${clean(PAGES[page] ?? page)}`, clean(SECTIONS[section] ?? humanize(section.split("/")[1])));
  const src = r.path.startsWith("/uploads/") ? path.join(process.env.DATA_DIR ?? "data", r.path) : path.join("public", r.path);
  if (!fs.existsSync(src)) { missing += 1; continue; }
  fs.mkdirSync(dir, { recursive: true });
  let name = path.basename(r.path);
  if (used.has(path.join(dir, name))) name = `${n}-${name}`;
  used.add(path.join(dir, name));
  fs.copyFileSync(src, path.join(dir, name));
  n += 1;
}
console.log(`Đã xuất ${n} ảnh, thiếu tệp ${missing}.`);
