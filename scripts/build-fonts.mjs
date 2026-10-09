/**
 * Nén font SVN Gilroy: cắt tập ký tự (Latin + tiếng Việt + dấu câu/ký hiệu kỹ thuật) rồi xuất WOFF2.
 *   node scripts/build-fonts.mjs      (chạy lại khi thay file .otf nguồn)
 * Chữ Trung/Hàn không có trong Gilroy nên vẫn dùng font hệ thống như trước.
 */
import fs from "node:fs";
import path from "node:path";
import subsetFont from "subset-font";

const DIR = "src/fonts";
const ranges = [
  [0x20, 0x7e], // Basic Latin
  [0xa0, 0x24f], // Latin-1 + Latin Extended-A/B
  [0x300, 0x30f], // dấu kết hợp
  [0x1e00, 0x1eff], // Latin Extended Additional (tiếng Việt)
  [0x2010, 0x2027], // gạch ngang, nháy, dấu chấm lửng, bullet
  [0x2030, 0x203a],
  [0x2070, 0x209f], // chỉ số trên/dưới (m², ³…)
  [0x20ab, 0x20ac], // ₫ €
  [0x2122, 0x2122],
  [0x2190, 0x2193], // mũi tên
  [0x2212, 0x2212],
  [0x2264, 0x2265],
  [0x00b5, 0x00b5],
];
let text = "";
for (const [a, b] of ranges) for (let c = a; c <= b; c++) text += String.fromCodePoint(c);

let before = 0;
let after = 0;
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".otf"))) {
  const src = fs.readFileSync(path.join(DIR, file));
  const out = await subsetFont(src, text, { targetFormat: "woff2" });
  fs.writeFileSync(path.join(DIR, file.replace(/\.otf$/, ".woff2")), out);
  before += src.length;
  after += out.length;
  console.log(file, Math.round(src.length / 1024) + "KB →", Math.round(out.length / 1024) + "KB");
}
console.log(`Tổng: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`);
