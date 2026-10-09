/**
 * Kiểm tra file nội dung website (messages/{vi,zh,ko}/<tên>.json).
 *   node scripts/check-messages.cjs home gioi-thieu     # kiểm tra các file chỉ định (mặc định: tất cả)
 * - JSON hợp lệ, khoá của 3 ngôn ngữ trùng nhau, giữ nguyên các chỗ giữ chỗ như {count}.
 * - Báo các mẫu "chất AI"/thiếu chuyên nghiệp còn sót (xem skill hanin-website-ui mục 4b).
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "../messages");
const ALL = ["common", "home", "gioi-thieu", "dich-vu", "san-pham", "nang-luc", "tin-tuc", "lien-he", "tuyen-dung", "phap-ly", "quy-trinh"];
const files = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

const flat = (o, p = "", out = {}) => { for (const [k, v] of Object.entries(o)) { if (v && typeof v === "object") flat(v, p + k + ".", out); else out[p + k] = v; } return out; };
const BANNED_VI = [
  [/ \/\/ /, "dấu // trang trí"], [/\[[^\]\n]{2,}\]/, "ngoặc [ ] quanh chữ"], [/STATUS:|PORTAL|SPEC:|SLA |REV-|CMS /, "nhãn giả hệ thống"],
  [/tuyệt đối|hoàn hảo|đỉnh cao|vượt trội|hàng đầu|toàn diện|hệ sinh thái|kiến tạo|đột phá|tiên phong|đẳng cấp|loại bỏ hoàn toàn|không ngừng|cam kết tuyệt/i, "từ quảng cáo rỗng"],
  [/giải pháp (toàn diện|tối ưu|đột phá)|mang đến|đồng hành cùng|không chỉ .{3,40} mà còn|nâng tầm|bứt phá|chinh phục|cất cánh/i, "cụm sáo rỗng"],
  [/!(\s|$)/, "dấu chấm than"], [/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, "emoji/ký hiệu"],
];
let problems = 0;
for (const f of files) {
  let data = {};
  for (const l of ["vi", "zh", "ko"]) {
    try { data[l] = flat(JSON.parse(fs.readFileSync(path.join(ROOT, l, f + ".json"), "utf8"))); }
    catch (e) { console.log(`✗ ${l}/${f}.json: JSON lỗi: ${e.message}`); problems++; }
  }
  if (!data.vi || !data.zh || !data.ko) continue;
  const keys = new Set(Object.keys(data.vi));
  for (const l of ["zh", "ko"]) {
    const other = new Set(Object.keys(data[l]));
    const miss = [...keys].filter((k) => !other.has(k)), extra = [...other].filter((k) => !keys.has(k));
    if (miss.length || extra.length) { console.log(`✗ ${f}: ${l} lệch khoá (thiếu ${miss.length}, thừa ${extra.length}) ${[...miss, ...extra].slice(0, 4).join(", ")}`); problems++; }
    for (const k of keys) {
      const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
      if (data[l][k] !== undefined && ph(data.vi[k]) !== ph(data[l][k])) { console.log(`✗ ${f}.${k} (${l}): chỗ giữ chỗ {…} không khớp`); problems++; }
    }
  }
  for (const [k, v] of Object.entries(data.vi)) {
    if (typeof v !== "string") continue;
    for (const [re, why] of BANNED_VI) if (re.test(v)) { console.log(`! ${f}.${k}: ${why}: "${v.slice(0, 70)}"`); problems++; break; }
  }
}
console.log(problems ? `\n${problems} vấn đề` : "\nSạch: khoá khớp 3 ngôn ngữ, không còn mẫu cấm");
process.exit(problems ? 1 : 0);
