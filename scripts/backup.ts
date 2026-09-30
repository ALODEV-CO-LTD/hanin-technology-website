/**
 * Sao lưu CMS: snapshot SQLite nhất quán (VACUUM INTO) + nén ảnh/tệp tải lên.
 *   npm run db:backup            # ghi vào $DATA_DIR/backups, giữ 14 bản gần nhất
 * Khuyến nghị chạy hằng đêm bằng cron và copy thư mục backups ra nơi khác.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { DATA_DIR, getDb } from "../src/server/db";

const KEEP = 14;
const dir = path.join(DATA_DIR, "backups");
fs.mkdirSync(dir, { recursive: true, mode: 0o700 });

const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 13).replace("T", "-");
const dbFile = path.join(dir, `hanin-${stamp}.db`);
if (fs.existsSync(dbFile)) fs.rmSync(dbFile);
getDb().exec(`VACUUM INTO '${dbFile.replace(/'/g, "''")}'`);
console.log(`DB: ${dbFile}`);

const folders = ["uploads", "private"].filter((name) => fs.existsSync(path.join(DATA_DIR, name)));
if (folders.length) {
  const archive = path.join(dir, `files-${stamp}.tar.gz`);
  execFileSync("tar", ["-czf", archive, "-C", DATA_DIR, ...folders]);
  console.log(`Files: ${archive}`);
}

for (const prefix of ["hanin-", "files-"]) {
  const old = fs.readdirSync(dir).filter((f) => f.startsWith(prefix)).sort().slice(0, -KEEP);
  for (const f of old) fs.rmSync(path.join(dir, f));
}
