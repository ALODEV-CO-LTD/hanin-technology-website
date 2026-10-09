# Tự động cập nhật website khi `git push`

Cài một lần, sau đó mỗi lần push lên GitHub, server `khanh-dev` tự build và chạy bản mới trong 1–3 phút.

## Cài đặt (một lần)
Kho hiện dùng: `https://github.com/trancongthangvn/hanin-technology-website` (công khai nên server clone bằng HTTPS, không cần khoá). Chỉ cần chạy một lệnh:
```bash
bash deploy/setup-auto-deploy.sh
```
Phần dưới là cách làm với kho riêng tư.

1. Tạo repo trên GitHub (nên để Private), chưa cần có nội dung.
2. Chạy trên máy bạn, từ thư mục `website`:
   ```bash
   bash deploy/setup-auto-deploy.sh git@github.com:TEN/REPO.git
   ```
3. Khi script in ra khoá công khai, vào GitHub: repo → Settings → Deploy keys → Add deploy key (KHÔNG tick "Allow write access"), dán khoá, rồi nhấn Enter ở terminal.

## Sau đó
```bash
git add -A && git commit -m "..." && git push
```
Xem nhật ký: `ssh khanh-dev 'tail -f /var/log/hanin-autodeploy.log'`

## Cơ chế
- Container có bộ hẹn giờ systemd (`hanin-autodeploy.timer`) chạy `/usr/local/bin/hanin-autodeploy` mỗi phút.
- Có commit mới thì build vào thư mục release riêng (`/opt/hanin-releases/<ngày>-<sha>`), build xong mới đổi liên kết `/opt/hanin-website` và khởi động lại pm2.
- Build lỗi hoặc bản mới không lên (HTTP khác 200 sau 30 giây) thì giữ/quay về bản cũ; giữ 3 bản gần nhất.
- Dữ liệu CMS (`/var/lib/hanin-website`: cơ sở dữ liệu, ảnh tải lên, tệp khách gửi) nằm ngoài code, không bị đụng.
- Sau khi bật, KHÔNG chạy `deploy/deploy.sh` nữa (script sẽ tự dừng). Deploy tay khi cần: `ssh khanh-dev 'FORCE=1 /usr/local/bin/hanin-autodeploy'`.
- Dữ liệu chỉnh trong CMS trên máy bạn không tự lên server (vẫn như trước): sửa trực tiếp trong trang quản trị trên server.
