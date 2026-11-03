# Kế hoạch loạt bài "Kiến thức kỹ thuật mạ" cho website HANIN

Mục đích: giúp kỹ sư mua hàng và bộ phận chất lượng của khách tra cứu đúng chủ đề khi chọn nhà gia công mạ. Học cấu trúc từ loạt bài kỹ thuật của sdragon.vn nhưng bổ sung điều họ thiếu: bảng thông số và dữ liệu thật từ dây chuyền.

## Quy tắc chung cho mọi bài
- Một thẻ H1; mục đánh số 1., 2., 2.1.; mô tả meta riêng 140–160 ký tự; breadcrumb; JSON-LD `Article` và `BreadcrumbList`.
- Mỗi bài có ít nhất một bảng (thông số, lỗi và nguyên nhân, hoặc so sánh) và một khung "Áp dụng tại HANIN" lấy từ profile.
- Giọng kỹ thuật, không quảng bá. Đủ 3 ngôn ngữ vi, zh, ko (chạy `node scripts/check-messages.cjs`).
- Chỉ nêu số liệu có trong profile 11126 (xem `FACTS.md`). Con số công nghệ chung (chiều dày, thời gian ngâm…) phải ghi rõ "tham khảo" và được HANIN xác nhận trước khi đăng.
- Không nêu chứng nhận, thiết bị hoặc tiêu chuẩn mà profile không có (ISO 14001, RoHS, ASTM B117, XRF…).
- Mỗi bài kết bằng liên kết tới trang dịch vụ liên quan và form báo giá.

## Danh sách 10 bài

| # | Slug đề xuất | Tiêu đề | Ý định tìm kiếm | Liên kết tới |
|---|---|---|---|---|
| 1 | `ma-nhua-abs-la-gi` | Mạ trên nhựa ABS và ABS/PC: nguyên lý và các lớp mạ | "mạ nhựa ABS là gì" | Dịch vụ mạ nhựa ABS |
| 2 | `quy-trinh-ma-treo-nhua-abs` | Quy trình mạ treo nhựa ABS từng công đoạn | "quy trình mạ nhựa" | Dây chuyền mạ tự động |
| 3 | `tien-xu-ly-be-mat-truoc-khi-ma` | Tiền xử lý bề mặt trước khi mạ: tẩy dầu, hoạt hóa, rửa | "tiền xử lý trước khi mạ" | Tiền xử lý bề mặt |
| 4 | `ma-niken-dien-phan-va-niken-hoa-hoc` | Niken điện phân và niken hóa: khác nhau thế nào, chọn khi nào | "niken hóa là gì" | Mạ niken trên kim loại |
| 5 | `ma-crom-3-va-crom-6` | Mạ crom 3+ và 6+ trên nhựa: khác biệt và lựa chọn | "mạ crom 3+ 6+" | Mạ nhựa ABS |
| 6 | `phot-phat-mangan-den` | Phốt phát mangan đen: chống gỉ, bám dính và màu | "phốt phát đen là gì" | Mạ kẽm, phốt phát |
| 7 | `ma-ke-ma-dong-ma-thiec` | Mạ kẽm, mạ đồng, mạ thiếc: ứng dụng cho bu lông, đầu cos, ốp | "mạ kẽm khác mạ thiếc" | Mạ kẽm, niken |
| 8 | `loi-thuong-gap-khi-ma-nhua` | Lỗi thường gặp ở lớp mạ: bong, rỗ, cháy, đổi màu, và cách phòng ngừa | "lỗi mạ crom nhựa" | Trang năng lực kiểm tra |
| 9 | `kiem-tra-lop-ma-phun-muoi-do-day` | Kiểm tra lớp mạ: đo độ dày, phun muối NSS và CASS, thử Hull cell | "thử phun muối là gì" | Phòng phân tích, thiết bị |
| 10 | `ma-pvd-chan-khong` | Mạ chân không PVD: nguyên lý và ứng dụng trang trí | "PVD là gì" | Dịch vụ PVD |

Bài ưu tiên viết trước (nhu cầu tìm kiếm cao và HANIN có dữ liệu thật): 1, 4, 8, 9.

## Dàn ý và dữ liệu cho từng bài

### 1. Mạ trên nhựa ABS và ABS/PC
- Dàn ý: 1. Vì sao mạ nhựa; 2. Cấu trúc lớp mạ (đồng, niken, crom) và vai trò từng lớp; 3. Các hệ mạ: Niken Crom 3+, 6+, Niken Satin, Niken Crom đen, Hair Line; 4. Yêu cầu với chi tiết nhựa và khuôn; 5. Ứng dụng.
- Dữ liệu HANIN: danh mục dịch vụ mạ nhựa ABS, ABS/PC; ảnh viền crom ô tô, nút, logo.
- Cần xác nhận: thứ tự và chiều dày các lớp tại HANIN.

### 2. Quy trình mạ treo nhựa ABS
- Dàn ý: 1. Tổng quan; 2. Móc treo; 3. Tẩy dầu; 4. Ngâm; 5. Xâm thực; 6. Thu hồi; 7. Sóng rung; 8. Trung hòa; 9. Hoạt hóa HCl và Paradi; 10. Tẩy nhựa; 11. Kiểm tra.
- Dữ liệu HANIN: danh sách công đoạn đã có trong profile; dây chuyền tự động 30–50 nghìn sản phẩm/ngày.
- Bảng: công đoạn, mục đích, lỗi nếu bỏ qua.

### 3. Tiền xử lý bề mặt
- Dàn ý: 1. Vì sao tiền xử lý quyết định độ bám; 2. Nhập hàng và lưu kho; 3. Tẩy dầu siêu âm; 4. Bể HCl; 5. Hoạt hóa; 6. Rửa nước giữa các bước.
- Dữ liệu HANIN: quy trình tiền xử lý từ ảnh nhà máy.

### 4. Niken điện phân và niken hóa
- Dàn ý: 1. Nguyên lý; 2. Bảng so sánh (độ đồng đều lớp, độ cứng, chống mài mòn, chịu nhiệt, chi phí); 3. Chi tiết nên chọn; 4. Lưu ý thiết kế (góc, lỗ sâu).
- Dữ liệu HANIN: niken điện phân sáng bóng bền; niken hóa độ cứng cao, chống mài mòn, chịu nhiệt tốt; ví dụ bánh răng, chốt, trục.
- Không nêu giá trị độ cứng HV hoặc chiều dày chuẩn nếu chưa được xác nhận.

### 5. Crom 3+ và crom 6+
- Dàn ý: 1. Khái niệm; 2. So sánh màu sắc, độ bền, môi trường; 3. Yêu cầu của khách và thị trường; 4. Khi nào chọn loại nào.
- Cần xác nhận: tiêu chí chọn hệ crom của HANIN; không viết cam kết pháp lý nếu chưa kiểm chứng.

### 6. Phốt phát mangan đen
- Dàn ý: 1. Lớp phốt phát là gì; 2. Chức năng (chống gỉ, tăng bám dính, bền màu); 3. Chi tiết điển hình: vít, bu lông, nắp che, bản mã; 4. Lưu ý sau xử lý (dầu, sấy).
- Dữ liệu HANIN: ứng dụng nêu trong profile.

### 7. Mạ kẽm, đồng, thiếc
- Dàn ý: 1. Mục đích từng lớp; 2. Bảng so sánh; 3. Ví dụ: kẽm (tấm, ống lót, chốt trục), thiếc (bu lông, đai ốc, đầu cos), đồng (lớp lót); 4. Mạ quay và mạ treo cho chi tiết nhỏ.
- Dữ liệu HANIN: dây chuyền mạ quay 3.000–5.000 kg/ngày (10.000–30.000 sản phẩm/ngày), mạ treo 10.000–20.000 pcs/ngày.

### 8. Lỗi thường gặp ở lớp mạ
- Bảng chính: hiện tượng, nguyên nhân thường gặp, công đoạn liên quan, cách phòng ngừa.
- Dàn ý: 1. Bong tróc; 2. Rỗ, xước; 3. Cháy mép; 4. Đổi màu, ố; 5. Rỉ sau phun muối; 6. Lỗi do khuôn và bề mặt nhựa.
- Cần HANIN xác nhận: danh sách lỗi thật gặp trong sản xuất, tỷ lệ và biện pháp. Bài này có giá trị nhất khi dùng kinh nghiệm thật của xưởng.

### 9. Kiểm tra lớp mạ
- Dàn ý: 1. Đo độ dày (APC-100); 2. Phun muối trung tính NSS; 3. Phun muối axit CASS; 4. Hull cell để kiểm soát bể; 5. Phòng phân tích; 6. Thiết bị test sau sơn (10 loại).
- Dữ liệu HANIN: danh sách thiết bị thật; ảnh phòng phân tích và thiết bị test.
- Chỉ ghi "phun muối NSS/CASS"; không ghi tiêu chuẩn ASTM.

### 10. Mạ chân không PVD
- Dàn ý: 1. Nguyên lý; 2. So sánh PVD với mạ điện phân; 3. Ứng dụng trang trí; 4. Yêu cầu chi tiết đầu vào.
- Dữ liệu HANIN: 2 máy PVD, 2 dây chuyền PVD; ảnh buồng chân không.

## Cách triển khai trong website
- Mục mới "Kiến thức kỹ thuật" (hoặc tách khỏi Tin tức). Dùng bảng CMS tin tức hiện có thêm thể loại, hoặc bảng riêng nếu cần trường bảng thông số.
- Trang liệt kê có lọc theo chủ đề (nhựa, kim loại, kiểm tra, lỗi).
- Mỗi bài gắn liên kết hai chiều với trang dịch vụ.
- Thứ tự làm: bài 1, 4, 8, 9 trước; sau đó 2, 3, 5, 6, 7, 10.

## Câu hỏi cần HANIN trả lời trước khi viết
1. Chiều dày và thứ tự các lớp mạ nhựa ABS, và chiều dày tiêu chuẩn mạ niken, kẽm, thiếc của xưởng.
2. Danh sách lỗi mạ thường gặp và cách xưởng xử lý.
3. Có được nêu tên khách hàng làm ví dụ ứng dụng không.
4. Có tiêu chí nghiệm thu chung (phun muối bao nhiêu giờ) không, hay tùy từng khách.
