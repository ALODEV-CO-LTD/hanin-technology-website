/**
 * Quét mã nguồn tìm mọi lời gọi siteImg("khoá", "url-mặc-định") và ghi danh sách vị trí ảnh
 * vào src/server/site-images.generated.json cho trang "Hình ảnh trang" của CMS.
 *   npm run images:scan   (tự chạy trước `npm run build`)
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["src/components", "src/app"];
const RE = /siteImg\(\s*["'`]([^"'`]+)["'`]\s*,\s*["'`]([^"'`]+)["'`]/g;
const slots = new Map<string, string>();

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "admin") walk(full);
    } else if (/\.tsx?$/.test(entry.name)) {
      const text = fs.readFileSync(full, "utf8");
      for (const m of text.matchAll(RE)) slots.set(m[1], m[2]);
    }
  }
}
ROOTS.forEach(walk);

const list = [...slots].map(([key, url]) => ({ key, url })).sort((a, b) => a.key.localeCompare(b.key, "en", { numeric: true }));
fs.writeFileSync("src/server/site-images.generated.json", JSON.stringify(list, null, 2) + "\n");
console.log(`Đã ghi ${list.length} vị trí ảnh.`);
