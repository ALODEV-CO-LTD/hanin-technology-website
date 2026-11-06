/**
 * Thêm bản tiếng Anh cho nội dung CMS (bảng posts, jobs, banners, services, products).
 *   npm run db:add-en   (idempotent; deploy tự chạy)
 * Chỉ thêm khoá "en" khi còn trống: KHÔNG ghi đè bản tiếng Anh đã nhập trong CMS và không đụng vi/zh/ko.
 * Nguồn bản dịch, ưu tiên: scripts/data/en-db.json (theo bảng/id/cột), rồi khớp nguyên văn tiếng Việt với messages/vi -> messages/en.
 */
import fs from "node:fs";
import path from "node:path";
import { all, run, transaction } from "../src/server/db";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
const flat = (o: Json, prefix = "", out: Record<string, string> = {}) => {
  if (typeof o === "string") out[prefix] = o;
  else if (Array.isArray(o)) o.forEach((v, i) => flat(v, `${prefix}.${i}`, out));
  else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) flat(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
};
const MSG = path.join(process.cwd(), "messages");
const viToEn = new Map<string, string>();
for (const f of fs.readdirSync(path.join(MSG, "vi")).filter((n) => n.endsWith(".json"))) {
  try {
    const vi = flat(JSON.parse(fs.readFileSync(path.join(MSG, "vi", f), "utf8")) as Json);
    const en = flat(JSON.parse(fs.readFileSync(path.join(MSG, "en", f), "utf8")) as Json);
    for (const [k, v] of Object.entries(vi)) if (v && en[k] && en[k] !== v && !viToEn.has(v)) viToEn.set(v, en[k]);
  } catch {
    /* thiếu file thì bỏ qua */
  }
}
const explicit = JSON.parse(fs.readFileSync(path.join(process.cwd(), "scripts/data/en-db.json"), "utf8")) as Record<string, Record<string, Record<string, string>>>;

const TABLES = ["posts", "jobs", "banners", "services", "products"];
let added = 0;
transaction(() => {
  for (const t of TABLES) {
    const hasUpdated = all<{ name: string }>(`PRAGMA table_info(${t})`).some((c) => c.name === "updated_at");
    for (const row of all<Record<string, unknown>>(`SELECT * FROM ${t}`)) {
      const sets: string[] = [];
      const args: unknown[] = [];
      for (const [col, raw] of Object.entries(row)) {
        if (typeof raw !== "string" || !raw.startsWith('{"vi"')) continue;
        let d: Record<string, string>;
        try {
          d = JSON.parse(raw);
        } catch {
          continue;
        }
        if (!d.vi || (d.en && d.en.trim())) continue;
        const en = explicit[t]?.[String(row.id)]?.[col] ?? viToEn.get(d.vi);
        if (!en) continue;
        sets.push(`${col} = ?`);
        args.push(JSON.stringify({ ...d, en }));
        added++;
      }
      if (sets.length) run(`UPDATE ${t} SET ${sets.join(", ")}${hasUpdated ? ", updated_at = datetime('now')" : ""} WHERE id = ?`, ...args, row.id);
    }
  }
});
console.log(`Đã thêm ${added} trường tiếng Anh cho nội dung CMS.`);
