/**
 * Chốt nội dung CMS theo Company Profile 11126: xoá bài viết ngoài profile, bỏ hãng không có trong profile khỏi mô tả sản phẩm.
 *   npm run db:chot-profile            (chỉ liệt kê, không ghi)
 *   npm run db:chot-profile -- --chot  (thực hiện; chạy tay, deploy KHÔNG tự chạy)
 * Xoá qua deleteRecord của CMS nên mỗi bản ghi để lại bản sao trong bảng revisions và khôi phục được ở Admin > Đã xoá.
 * Idempotent: bản ghi đã xoá hoặc đã sửa thì bỏ qua.
 */
import { all } from "../src/server/db";
import { deleteRecord, updateRecord } from "../src/server/cms/crud";
import { getResource } from "../src/server/cms/resources";

const chot = process.argv.includes("--chot");
const USER = "chot-profile-11126";

// Bài ngoài phạm vi profile (số liệu/tiêu chuẩn không có trong profile: ISO/IEC 17025, giảm 40% chu kỳ, anodizing Type III, đoàn B2B, đào tạo kỹ sư...).
const POST_SLUGS_TO_DELETE = [
  "ung-dung-cong-nghe-ma-niken-hoa-hoc-enp-trong-che-tao-banh-rang-robot",
  "quy-trinh-do-do-day-lop-ma-xrf",
  "van-hanh-he-thong-be-ma-tu-dong-hoa",
  "hanin-don-tiep-phai-doan-b2b",
  "xu-ly-be-mat-nhom-anodizing-cung",
  "khu-hydro-sau-ma-bulong-cuong-do-cao",
  "dao-tao-ky-su-cong-nghe-ma-luyen-kim",
];

const posts = getResource("posts")!;
let deleted = 0;
for (const slug of POST_SLUGS_TO_DELETE) {
  for (const r of all<{ id: number; title: string }>("SELECT id, title FROM posts WHERE slug = ?", slug)) {
    console.log(`${chot ? "Xoá" : "[sẽ xoá]"} bài #${r.id}: ${slug}`);
    if (chot && deleteRecord(posts, r.id, USER)) deleted++;
  }
}

// Profile (trang 3) chỉ có tủ lạnh Hitachi, LG, Panasonic; không có Samsung.
const products = getResource("products")!;
let edited = 0;
for (const r of all<{ id: number; slug: string; description: string }>("SELECT id, slug, description FROM products")) {
  const d = JSON.parse(r.description || "{}") as Record<string, string>;
  const next: Record<string, string> = { ...d };
  next.vi = d.vi?.replace("Panasonic, Samsung;", "Panasonic;");
  next.zh = d.zh?.replace("松下、三星冰箱", "松下冰箱");
  next.ko = d.ko?.replace("Panasonic, Samsung 냉장고", "Panasonic 냉장고");
  if (JSON.stringify(next) === JSON.stringify(d)) continue;
  console.log(`${chot ? "Sửa" : "[sẽ sửa]"} sản phẩm #${r.id} (${r.slug}): bỏ Samsung`);
  if (chot) {
    updateRecord(products, r.id, { description: next }, USER);
    edited++;
  }
}
console.log(chot ? `Đã xoá ${deleted} bài, sửa ${edited} sản phẩm.` : "Chạy lại với -- --chot để thực hiện.");
