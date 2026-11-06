/**
 * Quét mã nguồn tìm mọi lời gọi siteImg("khoá", "url-mặc-định") và ghi danh sách vị trí ảnh
 * vào src/server/site-images.generated.json cho trang "Hình ảnh trang" của CMS.
 *   npm run images:scan   (tự chạy trước `npm run build`)
 */
import fs from "node:fs";
import path from "node:path";
import * as BLOCKS from "../src/lib/block-images-data";

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

/** Ảnh các khối lấy từ src/lib/block-images-data.ts: khoá dạng "<nhóm>/<tên>/…" (khớp src/lib/block-images.ts). */
const PREFIX: Record<string, string> = {
  SERVICE_APPLICATION_IMAGES: "dich-vu/ung-dung",
  SERVICE_PROCESS_IMAGES: "dich-vu/quy-trinh",
  SERVICE_FLOW_IMAGES: "dich-vu/cong-doan",
  CERT_IMAGES: "nang-luc/chung-nhan",
  RELATED_SERVICE_IMAGES: "san-pham/dich-vu-lien-quan",
  PRODUCT_PROFILE_GALLERY: "san-pham/thu-vien",
  PRODUCTION_FLOW_IMAGES: "nang-luc/quy-trinh-san-xuat",
  CORE_STRENGTH_IMAGES: "gioi-thieu/the-manh",
  PROCESS_STAGE_IMAGES: "nang-luc/cong-doan-quy-trinh",
};
function addBlock(prefix: string, value: unknown) {
  if (typeof value === "string") slots.set(prefix, value);
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) addBlock(`${prefix}/${k}`, v);
}
for (const [name, prefix] of Object.entries(PREFIX)) addBlock(prefix, (BLOCKS as Record<string, unknown>)[name]);

const list = [...slots].map(([key, url]) => ({ key, url })).sort((a, b) => a.key.localeCompare(b.key, "en", { numeric: true }));
fs.writeFileSync("src/server/site-images.generated.json", JSON.stringify(list, null, 2) + "\n");
console.log(`Đã ghi ${list.length} vị trí ảnh.`);

/**
 * Ảnh cố định trong mã/nội dung (không đi qua siteImg): quét đường dẫn "/images/…" trong src và messages,
 * cùng các lời gọi f("tên")/p("tên") của factory-pool.ts. Ghi src/server/media-refs.generated.json cho trang Thư viện ảnh
 * để biết mỗi ảnh đang nằm ở trang lớn / khối nào. Trang suy từ thư mục của tệp chứa đường dẫn.
 */
const PAGE_DIRS = ["home", "gioi-thieu", "dich-vu", "san-pham", "nang-luc", "tin-tuc", "tuyen-dung", "lien-he", "layout"];
const refs = new Map<string, Map<string, { page: string; section: string }>>();
function addRef(img: string, page: string, stem: string) {
  const m = refs.get(img) ?? new Map();
  m.set(`${page}/${stem}`, { page, section: `${page}/${stem}` });
  refs.set(img, m);
}
function pageFor(file: string): string {
  const parts = file.split(path.sep);
  for (const d of PAGE_DIRS) if (parts.includes(d)) return d;
  const msg = /messages\/[a-z]{2}\/([\w-]+)\.json$/.exec(file.split(path.sep).join("/"));
  if (msg) {
    const n = msg[1];
    const hit = PAGE_DIRS.find((d) => n === d || n.startsWith(d)) ?? (n.startsWith("home") ? "home" : n === "quy-trinh" ? "nang-luc" : "");
    if (hit) return hit;
  }
  if (parts.includes("app")) {
    const hit = PAGE_DIRS.find((d) => parts.some((x) => x.startsWith(d === "dich-vu" ? "dich-vu" : d === "nang-luc" ? "nang-luc" : d)));
    if (hit) return hit;
  }
  return "dung-chung";
}
const BY_STEM = new Map<string, string[]>();
(function indexImages(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) indexImages(full);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name) && entry.name.includes("-")) {
      const stem = entry.name.replace(/\.[^.]+$/, "");
      BY_STEM.set(stem, [...(BY_STEM.get(stem) ?? []), "/" + path.relative("public", full).split(path.sep).join("/")]);
    }
  }
})("public/images");
function walkRefs(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "admin" && entry.name !== "ct999") walkRefs(full);
    } else if (/\.(tsx?|json)$/.test(entry.name) && !entry.name.endsWith(".generated.json") && entry.name !== "block-images.ts") {
      const text = fs.readFileSync(full, "utf8");
      const stem = entry.name.replace(/\.(tsx?|json)$/, "");
      const pageName = pageFor(full);
      for (const m of text.matchAll(/\/images\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp|svg|avif)/g)) addRef(m[0], pageName, stem);
      // Tên trần ("may-do-tia-uv") ghép đường dẫn lúc chạy: khớp với tên tệp ảnh có trong public/images.
      for (const m of text.matchAll(/["'`]([a-z0-9]+(?:-[a-z0-9]+)+)["'`]/g)) {
        for (const img of BY_STEM.get(m[1]) ?? []) addRef(img, pageName, stem);
      }
    }
  }
}
["src/components", "src/app", "src/lib", "messages"].forEach(walkRefs);
const refOut: Record<string, { page: string; section: string }[]> = {};
for (const [img, m] of [...refs].sort((a, b) => a[0].localeCompare(b[0]))) refOut[img] = [...m.values()];
fs.writeFileSync("src/server/media-refs.generated.json", JSON.stringify(refOut, null, 1) + "\n");
console.log(`Đã ghi ${Object.keys(refOut).length} ảnh có vị trí cố định.`);
