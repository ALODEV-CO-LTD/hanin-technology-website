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
  [0xa0, 0xff], // Latin-1
  [0x102, 0x103], [0x110, 0x111], [0x128, 0x129], [0x168, 0x169], [0x1a0, 0x1a1], [0x1af, 0x1b0], // chữ cái riêng của tiếng Việt (Ă đ Ĩ Ũ Ơ Ư)
  [0x300, 0x30f], // dấu kết hợp
  [0x1ea0, 0x1ef9], // Latin Extended Additional: chữ có dấu tiếng Việt
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
