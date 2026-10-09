/**
 * Gắn logo trong public/images/clients/<slug>.(png|svg|webp|jpg) vào bảng "Khách hàng tiêu biểu" của CMS.
 *   npm run db:client-logos        (idempotent; deploy.sh tự chạy sau khi seed)
 * Chỉ điền khi khách hàng CHƯA có logo hoặc đang dùng logo mặc định trong /images/clients/ —
 * logo do người quản trị tự tải lên qua CMS không bao giờ bị ghi đè.
 */
import fs from "node:fs";
import path from "node:path";
import { all, run, transaction } from "../src/server/db";
import { FEATURED_CLIENTS } from "./legacy-data/clients-data";

const EXTS = ["png", "svg", "webp", "jpg", "jpeg"];
let updated = 0;
transaction(() => {
  for (const c of FEATURED_CLIENTS) {
    const ext = EXTS.find((e) => fs.existsSync(path.join(process.cwd(), "public", "images", "clients", `${c.slug}.${e}`)));
    if (!ext) continue;
    const logo = `/images/clients/${c.slug}.${ext}`;
    for (const row of all<{ id: number; logo: string }>("SELECT id, logo FROM clients WHERE name = ?", c.brand)) {
      if ((!row.logo || row.logo.startsWith("/images/clients/")) && row.logo !== logo) {
        run("UPDATE clients SET logo = ?, updated_at = datetime('now') WHERE id = ?", logo, row.id);
        updated++;
      }
    }
  }
});
console.log(`Đã gắn/cập nhật logo cho ${updated} khách hàng.`);
