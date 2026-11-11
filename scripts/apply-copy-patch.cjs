/**
 * Áp bản vá nội dung website: node scripts/apply-copy-patch.cjs [--check] <tệp-vá.json>...
 * Tệp vá: { "ns": "dich-vu", "vi": { "DichVu.x.y": "..." }, "en": {...}, "zh": {...}, "ko": {...} }
 * Khoá viết đầy đủ từ gốc tệp messages/<locale>/<ns>.json (có thể nhiều tệp: dùng "files": { "home": { vi: {...}, ... } }).
 * --check: chỉ kiểm tra (khoá tồn tại, giữ nguyên chỗ giữ chỗ {x} và token {{x}}, không chữ sáo rỗng), không ghi.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "../messages");
const args = process.argv.slice(2);
const check = args.includes("--check");
const patches = args.filter((a) => !a.startsWith("--"));
const LOCALES = ["vi", "en", "zh", "ko"];
const BANNED = [
  [/ \/\/ /, "dấu // trang trí"], [/\[[^\]\n]{2,}\]/, "ngoặc [ ]"], [/STATUS:|PORTAL|SPEC:|SLA |REV-|CMS /, "nhãn giả hệ thống"],
  [/tuyệt đối|hoàn hảo|đỉnh cao|vượt trội|hàng đầu|toàn diện|hệ sinh thái|kiến tạo|đột phá|tiên phong|đẳng cấp|loại bỏ hoàn toàn|không ngừng|cam kết tuyệt/i, "từ quảng cáo rỗng"],
  [/giải pháp (toàn diện|tối ưu|đột phá)|mang đến|đồng hành cùng|không chỉ .{3,40} mà còn|nâng tầm|bứt phá|chinh phục|cất cánh/i, "cụm sáo rỗng"],
  [/!(\s|$)/, "dấu chấm than"], [/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, "emoji"],
];
const holders = (s) => [...s.replace(/\{\{\w+(?::\w+)?\}\}/g, "").matchAll(/\{\w+\}/g)].map((m) => m[0]).sort().join("|"); // chỗ giữ chỗ ICU {x}
const TOKENS = new Set(["area", "waste", "staff", "founded", "customers", "lot", "apc", "hqLot", "hqStaff", "hqFounded", "auto", "hang", "rot", "rotPcs"]);
const tokensOf = (s) => [...s.matchAll(/\{\{(\w+)(?::(\w+))?\}\}/g)].map((m) => m[1]);
let errors = 0;
const err = (m) => { errors++; console.log("✗ " + m); };

function get(o, p) { return p.split(".").reduce((a, k) => (a == null ? undefined : a[k]), o); }
function set(o, p, v) { const ks = p.split("."); const last = ks.pop(); const t = ks.reduce((a, k) => a[k], o); t[last] = v; }

for (const pf of patches) {
  const patch = JSON.parse(fs.readFileSync(pf, "utf8"));
  const files = patch.files ?? { [patch.ns]: { vi: patch.vi, en: patch.en, zh: patch.zh, ko: patch.ko } };
  let n = 0;
  for (const [ns, perLocale] of Object.entries(files)) {
    const data = {};
    for (const l of LOCALES) data[l] = JSON.parse(fs.readFileSync(path.join(ROOT, l, ns + ".json"), "utf8"));
    const keys = new Set([...Object.keys(perLocale.vi ?? {}), ...Object.keys(perLocale.en ?? {}), ...Object.keys(perLocale.zh ?? {}), ...Object.keys(perLocale.ko ?? {})]);
    for (const key of keys) {
      for (const l of LOCALES) {
        const v = perLocale[l]?.[key];
        if (v === undefined && perLocale.__partial) continue;
        if (v === undefined) { err(`${pf} ${ns}:${key}: thiếu bản ${l} (mỗi khoá sửa phải có đủ vi/en/zh/ko)`); continue; }
        const old = get(data[l], key);
        if (typeof old !== "string") { err(`${pf} ${ns}:${key} (${l}): khoá không tồn tại hoặc không phải chuỗi`); continue; }
        if (typeof v !== "string") { err(`${pf} ${ns}:${key} (${l}): giá trị phải là chuỗi`); continue; }
        for (const t of tokensOf(v)) if (!TOKENS.has(t)) err(`${pf} ${ns}:${key} (${l}): token {{${t}}} không tồn tại`);
        if (holders(old) !== holders(v)) err(`${pf} ${ns}:${key} (${l}): chỗ giữ chỗ/token khác bản gốc: ${holders(old)} -> ${holders(v)}`);
        if (l === "vi") for (const [re, why] of BANNED) if (re.test(v)) err(`${pf} ${ns}:${key} (vi): ${why}: "${v.slice(0, 70)}"`);
        if (l !== "vi" && /[ăâđêôơưĂÂĐÊÔƠƯ]|[ạảãấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/.test(v)) err(`${pf} ${ns}:${key} (${l}): lọt chữ tiếng Việt`);
        if (!check) set(data[l], key, v);
        n++;
      }
    }
    if (!check) for (const l of LOCALES) fs.writeFileSync(path.join(ROOT, l, ns + ".json"), JSON.stringify(data[l], null, 2) + "\n");
  }
  console.log(`${check ? "kiểm tra" : "đã áp"} ${pf}: ${n} giá trị`);
}
console.log(errors ? `${errors} lỗi` : "Sạch");
process.exit(errors ? 1 : 0);
