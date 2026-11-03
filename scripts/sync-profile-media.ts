/**
 * Đưa ảnh trích từ Company Profile (đã nâng chất lượng) vào Thư viện ảnh admin.
 * Nguồn: scripts/profile-media-catalog.json (nhãn, alt, chú thích vi/zh/ko, vị trí gợi ý).
 * Ảnh nằm ở public/images/profile/web/imageN_MM.jpg (không đưa lên git), được sao sang
 * public/images/profile-lib/<slug>.jpg để triển khai. Chạy lại an toàn.
 *   npm run db:profile-media
 */
import fs from "node:fs";
import path from "node:path";
import { all, run, transaction } from "../src/server/db";

type Entry = { image: string; slug: string; label: string; placements?: unknown[] };
const catalog: Entry[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "scripts/profile-media-catalog.json"), "utf8"));
const SRC = path.join(process.cwd(), "public/images/profile/web");
const DST = path.join(process.cwd(), "public/images/profile-lib");
fs.mkdirSync(DST, { recursive: true });

const result = transaction(() => {
  let added = 0;
  let updated = 0;
  let skipped = 0;
  for (const e of catalog) {
    if (!e.placements?.length) { skipped++; continue; }
    const from = path.join(SRC, `${e.image}.jpg`);
    const to = path.join(DST, `${e.slug}.jpg`);
    if (!fs.existsSync(to)) {
      if (!fs.existsSync(from)) { skipped++; continue; }
      fs.copyFileSync(from, to);
    }
    const webPath = `/images/profile-lib/${e.slug}.jpg`;
    const original = `${e.label} (${e.slug}).jpg`;
    const size = fs.statSync(to).size;
    const existing = all<{ id: number }>("SELECT id FROM media WHERE path = ?", webPath)[0];
    if (existing) {
      run("UPDATE media SET original = ?, size = ? WHERE id = ?", original, size, existing.id);
      updated++;
    } else {
      run("INSERT INTO media (path, original, mime, size) VALUES (?, ?, 'image/jpeg', ?)", webPath, original, size);
      added++;
    }
  }
  return { added, updated, skipped };
});
console.log("Thư viện ảnh admin (ảnh profile):", result);
