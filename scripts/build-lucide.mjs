/**
 * Dựng src/components/ui/lucide.generated.ts từ các file SVG Lucide trong src/assets/lucide/*.svg
 *   node scripts/build-lucide.mjs
 * Thêm icon: tải file về src/assets/lucide/<tên>.svg (https://unpkg.com/lucide-static@1.69.0/icons/<tên>.svg, giấy phép ISC),
 * chạy lại script, rồi khai tên trong MAP của src/components/ui/Icon.tsx.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "src/assets/lucide");
const OUT = path.join(process.cwd(), "src/components/ui/lucide.generated.ts");
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const icons = {};
for (const f of fs.readdirSync(DIR).filter((n) => n.endsWith(".svg")).sort()) {
  const svg = fs.readFileSync(path.join(DIR, f), "utf8");
  const body = svg.slice(svg.indexOf(">", svg.indexOf("<svg")) + 1, svg.lastIndexOf("</svg>"));
  const nodes = [];
  for (const m of body.matchAll(/<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)\/?>/g)) {
    const attrs = {};
    for (const a of m[2].matchAll(/([a-zA-Z-:]+)="([^"]*)"/g)) attrs[camel(a[1])] = a[2];
    nodes.push([m[1], attrs]);
  }
  if (!nodes.length) throw new Error(`${f}: không đọc được phần tử SVG`);
  icons[f.replace(/\.svg$/, "")] = nodes;
}
const header = "// TẠO TỰ ĐỘNG bởi scripts/build-lucide.mjs từ src/assets/lucide/*.svg (Lucide, giấy phép ISC). Không sửa tay.\n";
const type = "export type IconNode = [tag: string, attrs: Record<string, string>][];\n";
fs.writeFileSync(OUT, `${header}${type}export const LUCIDE: Record<string, IconNode> = ${JSON.stringify(icons, null, 1)};\n`);
console.log(`Đã dựng ${Object.keys(icons).length} icon -> ${path.relative(process.cwd(), OUT)}`);
