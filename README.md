# HANIN website + CMS

Website công ty (Next.js 16, đa ngôn ngữ vi/zh/ko) kèm **CMS quản trị nội dung** tại `/admin`.
Back-end nằm ngay trong app Next (route handlers + SQLite), không cần dịch vụ/database ngoài.

## Chạy nhanh

```bash
npm ci
npm run db:seed        # tạo data/hanin.db, nạp nội dung sẵn có + tài khoản quản trị đầu tiên
npm run build && npm run start
```

- `db:seed` an toàn chạy lại: chỉ nạp vào bảng **đang trống**, không ghi đè nội dung đã sửa trong CMS.
  `npm run db:seed -- --reset` xoá dịch vụ/sản phẩm/tin/tuyển dụng/banner rồi nạp lại nội dung gốc.
- Tài khoản đầu tiên lấy từ `ADMIN_EMAIL` / `ADMIN_PASSWORD` (xem `.env.example`). Không đặt mật khẩu thì script tự sinh và ghi vào
  `data/initial-admin.txt` — đăng nhập, đổi mật khẩu, rồi xoá file đó.
- Yêu cầu Node ≥ 22.13 (dùng `node:sqlite` có sẵn, không cần build native).
- Máy dev bị giới hạn sandbox cần `SWC_NATIVE_BINDING_CACHE=<thư mục tuyệt đối>` khi chạy `next build/dev`.

## CMS quản trị (`/admin`)

| Mục | Nội dung quản lý |
|---|---|
| Banner | Ảnh banner đầu trang của 8 trang (chọn ảnh từ thư viện / tải lên), bật-tắt, thứ tự |
| Dịch vụ gia công mạ | Thẻ dịch vụ + phần đầu trang chi tiết (tên, mô tả, ảnh, mã, nhãn) |
| Sản phẩm & Dự án | Sản phẩm/dự án, danh mục, thông số nổi bật, thẻ lớn, dự án tiêu biểu |
| Tin tức | Bài viết (nháp/đã đăng), chuyên mục, ảnh, nội dung, bài tiêu điểm + chỉ số kỹ thuật |
| Tuyển dụng | Vị trí tuyển dụng (bộ phận, hình thức, lương, hạn nộp, mô tả/yêu cầu/quyền lợi) |
| Liên hệ & Ứng tuyển | Hộp thư: yêu cầu báo giá + hồ sơ ứng tuyển từ website, trạng thái, ghi chú, tải tệp đính kèm |
| Nội dung trang | Sửa mọi văn bản cố định của website (tiêu đề, mô tả, nút, footer, tiêu đề/mô tả SEO, chính sách & điều khoản…) theo từng ngôn ngữ, có nút khôi phục bản gốc. Ô "Phạm vi" cho sửa riêng nội dung chi tiết của từng dịch vụ / sản phẩm |
| Thư viện ảnh | Tải/xoá ảnh, PDF |
| Liên kết & mạng xã hội | Hotline/email dùng chung toàn site, Zalo, Facebook, YouTube, LinkedIn, Google Maps (link + bản đồ nhúng) |
| Tài khoản quản trị | (chỉ admin) thêm/khoá/đổi vai trò/đặt lại mật khẩu; vai trò `admin` và `editor` |

Nội dung đa ngôn ngữ: mỗi trường chữ có 3 bản vi/zh/ko. Ô zh/ko để trống thì website tự dùng tiếng Việt.
Sau mỗi lần lưu website cập nhật ngay (các trang đều render động, không cần build lại).

## Kiến trúc

```
src/server/            lớp back-end (chỉ chạy trên server)
  db.ts, schema.ts     kết nối SQLite (WAL) + schema tạo tự động khi mở DB
  auth.ts              scrypt + phiên đăng nhập (cookie httpOnly, băm token trong DB), chặn CSRF theo Origin
  cms/resources.ts     ĐỊNH NGHĨA các loại nội dung (trường, nhãn, tuỳ chọn) — thêm trường tại đây
  cms/crud.ts          CRUD + kiểm tra dữ liệu chung cho mọi loại nội dung
  content.ts           ghi đè văn bản (bảng content_overrides) lên messages/*.json
  public.ts            hàm đọc dữ liệu cho website công khai (trả về đúng kiểu cũ của src/lib/*-data.ts)
  uploads.ts           lưu ảnh (công khai) và tệp khách gửi (riêng tư), kiểm tra chữ ký tệp
src/app/api/admin/**   REST API cho CMS (yêu cầu đăng nhập)
src/app/api/inquiries  API công khai nhận form báo giá / liên hệ / ứng tuyển
src/app/uploads/**     phục vụ ảnh đã tải lên
src/app/admin/**       giao diện CMS
scripts/seed.ts        nạp dữ liệu ban đầu (nguồn: scripts/legacy-data/* + messages/*)
scripts/backup.ts      sao lưu DB + tệp tải lên
```

### API

Tất cả `/api/admin/*` cần cookie đăng nhập; request đổi dữ liệu kiểm tra `Origin`. Lỗi trả JSON `{ error, errors? }`.

- `POST /api/admin/login|logout`, `GET /api/admin/me`, `PUT /api/admin/password`
- `GET|POST /api/admin/{banners|services|products|posts|jobs}` — danh sách (`?q=&page=&pageSize=`) / tạo
- `GET|PUT|DELETE /api/admin/{resource}/{id}` — PUT nhận cập nhật từng phần
- `GET /api/admin/inquiries`, `PATCH|DELETE /api/admin/inquiries/{id}`, `GET /api/admin/inquiries/{id}/files/{n}`
- `GET|PUT /api/admin/content` (`?namespace=`), `GET|PUT /api/admin/settings`
- `GET|POST /api/admin/media`, `DELETE /api/admin/media/{id}`, `GET|POST /api/admin/users`, `PUT|DELETE /api/admin/users/{id}`
- Công khai: `POST /api/inquiries` (multipart: `kind` rfq|contact|application, `fullName`, `email`, `phone?`, `company?`, `projectName?`,
  `platingService?`, `volume?`, `message?`, `files[]`). Giới hạn 6 yêu cầu/10 phút/IP, ô ẩn `website` chống bot, tối đa 5 tệp × 50MB.

### Bảo mật

- Mật khẩu băm scrypt; đăng nhập giới hạn 10 lần/15 phút/IP; token phiên chỉ lưu dạng băm; phiên 7 ngày.
- Tệp khách gửi (bản vẽ theo NDA) lưu ở `DATA_DIR/private`, **không** truy cập công khai — chỉ tải qua API admin.
- Ảnh tải lên được kiểm tra chữ ký tệp, phục vụ với `nosniff` + CSP sandbox; không nhận SVG.
- Nội dung bài viết render bằng bộ dựng an toàn (không HTML thô).

## Sao lưu

```bash
npm run db:backup   # ghi vào $DATA_DIR/backups, giữ 14 bản gần nhất
```

Nên đặt cron hằng đêm trên server, ví dụ: `0 2 * * * cd /opt/hanin-website && DATA_DIR=/var/lib/hanin-website npm run db:backup`
và copy `backups/` ra nơi khác.

## Triển khai

`bash deploy/deploy.sh` (xem đầu file): rsync code (bỏ qua `data/`, `.env*`), `npm ci`, `db:seed`, build, restart pm2, cấu hình nginx
(`client_max_body_size` cho tệp đính kèm). Dữ liệu CMS nằm ở `/var/lib/hanin-website`, không bị ghi đè khi deploy.

## Phạm vi & giới hạn hiện tại

- Trang chi tiết dịch vụ/sản phẩm: phần đầu (tên, mô tả, ảnh, mã) theo từng mục trong CMS; các mục kỹ thuật bên dưới (quy trình, bảng QA,
  năng lực…) mặc định là nội dung mẫu dùng chung và có thể ghi đè riêng cho từng mục ở “Nội dung trang” → ô “Phạm vi”.
- Chỉ sửa được nội dung có sẵn; **chưa thêm/xoá được các khối lặp** (câu hỏi thường gặp, mốc thời gian, thẻ thế mạnh…) vì số lượng khối cố định trong code.
- Chưa gửi email thông báo khi có yêu cầu mới (cần SMTP/dịch vụ mail của Bên A); hiện xem trong CMS, có badge số yêu cầu mới.
- Bài viết tin tức chưa có nội dung thân bài (nguồn gốc chỉ có tiêu đề + tóm tắt); nhập thân bài trong CMS khi Bên A cung cấp.
