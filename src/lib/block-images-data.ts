/**
 * Ảnh cho các khối nội dung vốn chỉ có icon và chữ: thẻ "Sản phẩm ứng dụng" và các bước quy trình
 * của từng dịch vụ, quy trình sản xuất, khối chứng nhận. Ảnh từ Company Profile nằm ở /images/profile-lib,
 * ảnh chụp thật trong nhà máy nằm ở /images/process. Khoá bước/thẻ trùng khoá trong messages (a1.., s1..).
 * Khối nào chưa có ảnh đã xác nhận thì để trống, không gán ảnh đoán.
 */
const pl = (name: string) => `/images/profile-lib/${name}.jpg`;
const pr = (name: string) => `/images/process/${name}.jpg`;

export const SERVICE_APPLICATION_IMAGES: Record<string, Record<string, string>> = {
  "tien-xu-ly-be-mat": {
    a1: pl("nut-engine-start-stop-vien-crom"),
    a2: pl("num-van-ma-crom-satin"),
    a3: pl("tay-gat-sen-tam-ma-crom"),
    a4: pl("bu-long-dac-biet-ma-niken-sang"),
  },
  "ma-crom-cung-cong-nghiep": {
    a1: pl("logo-crom-vinfast"),
    a2: pl("nap-che-mat-cat-ma-crom-co-chu"),
    a3: pl("voi-nuoc-ma-crom"),
    a4: pl("thiet-bi-vinsmart-minh-hoa"),
  },
  "ma-niken-hoa-hoc-enp": {
    a1: pl("banh-rang-xich-niken-hoa"),
    a2: pl("gia-do-uon-niken-satin"),
    a3: pl("tay-nam-ma-crom-dang-giot"),
    a4: pl("tam-inox-satin-xuoc"),
  },
  "ma-kem-hop-kim-kem-niken": {
    a1: pl("vit-long-den-ren-thua-phot-phat-den"),
    a2: pl("chi-tiet-kep-dap-ma-trang"),
    a3: pl("ong-lot-ren-ma-kem"),
    a4: pl("dau-cos-dap-ma-trang"),
  },
  "day-chuyen-son-ma-ket-hop": {
    a1: pl("linh-kien-den-holder-nhua-truoc-sau-xu-ly"),
    a2: pl("khung-man-hinh-nhua-son-den"),
    a3: pl("bang-dieu-khien-in-chu-xuoc-kim-loai"),
  },
  "xu-ly-nhom-ma-kim-loai-khac": {
    a1: pl("chi-tiet-op-mat-na-ma-crom"),
    a2: pl("nut-dieu-khien-tron-vien-crom"),
    a3: pl("voi-nuoc-ma-crom"),
  },
};

export const SERVICE_PROCESS_IMAGES: Record<string, Record<string, string>> = {
  "tien-xu-ly-be-mat": { s1: pr("q-21"), s2: pr("t-2"), s3: pr("t-24"), s4: pr("t-10"), s5: pr("t-7") },
  "ma-crom-cung-cong-nghiep": { s1: pr("t-14"), s2: pr("t-2"), s3: pr("t-20"), s4: pr("t-25"), s5: pr("t-22"), s6: pr("t-7") },
  "ma-niken-hoa-hoc-enp": { s1: pr("q-18"), s2: pr("t-29"), s3: pr("t-10"), s4: pr("t-7"), s5: pr("q-17"), s6: pr("q-3") },
  "ma-kem-hop-kim-kem-niken": { s1: pr("q-4"), s2: pr("t-10"), s3: pr("q-12"), s4: pl("bu-long-chu-t-phot-phat-den"), s5: pr("q-17"), s6: pr("q-2") },
  "day-chuyen-son-ma-ket-hop": {
    s1: pl("buong-phun-son-inox"),
    s2: pl("dan-phun-son-tu-dong-bang-tai"),
    s3: pl("bang-dieu-khien-in-chu-xuoc-kim-loai"),
    s4: pl("may-thu-mai-mon-rca-tester"),
  },
  "xu-ly-nhom-ma-kim-loai-khac": {
    s1: pr("q-21"),
    s2: pl("may-pvd-buong-chan-khong"),
    s3: pl("hai-may-pvd-phong-sach"),
    s4: pl("may-do-do-day-cam-tay-thickness-measure"),
  },
};

/** Trang Năng lực sản xuất, "Quy trình sản xuất" 6 bước (ảnh chụp thật). */
export const PRODUCTION_FLOW_IMAGES: Record<string, string> = {
  receiving: pr("q-21"),
  surfacePrep: pr("t-2"),
  mainPlating: pr("t-7"),
  thickness: pr("q-2"),
  finalCheck: pr("t-17"),
  packaging: pr("t-18"),
};

/** Trang Dịch vụ, "Các công đoạn gia công mạ" 5 bước (ảnh chụp thật). */
export const SERVICE_FLOW_IMAGES: Record<string, string> = {
  s1: pr("t-2"),
  s2: pr("t-7"),
  s3: pr("t-3"),
  s4: pr("q-3"),
  s5: pr("t-18"),
};

/** Khối chứng nhận, môi trường và kiểm tra ở các trang. */
export const CERT_IMAGES = {
  iso: "/images/certificates/iso-9001-2015.jpg",
  wastewaterTank: pl("be-nhua-xanh-xu-ly-nuoc-thai"),
  wastewaterSettling: pl("be-lang-nuoc-thai"),
  wastewaterPress: pl("may-ep-bun-xu-ly-nuoc-thai"),
  wastewaterControl: pl("tu-dieu-khien-be-chua-xu-ly-nuoc-thai"),
  lab: pl("phong-phan-tich-toan-canh"),
  labBench: pl("ban-thi-nghiem-phan-tich-dung-dich"),
  thickness: pl("may-do-do-day-lop-ma-apc-100"),
  autoLine: pl("day-chuyen-ma-tu-dong-cau-truc-cam"),
  rotaryLine: pl("bo-ma-quay-nhin-tu-tren"),
};

/** Thư viện ảnh trang chi tiết sản phẩm: 4 ảnh cùng họ vật liệu với sản phẩm (ảnh đại diện nằm ở DB). */
export const PRODUCT_PROFILE_GALLERY: Record<string, string[]> = {
  "banh-rang-truc-vit-ma-niken-hoa-hoc": ["tam-chi-tiet-may-niken-hoa", "dia-tron-xuoc-dong-tam-niken-satin", "chot-vong-tron-ma-niken", "bu-long-dac-biet-ma-niken-sang"].map(pl),
  "truc-piston-ty-ben-thuy-luc-o-to": ["thanh-tru-inox-satin", "chi-tiet-ong-con-ma-crom", "chot-truc-bac-ma-sang", "tay-nam-ma-crom-dang-giot"].map(pl),
  "thanh-busbar-dong-ma-thiec-dan-dien": ["dau-cos-dap-ma-trang", "dau-cos-ong-satin", "thanh-uon-dap-bong-ma-sang", "tam-chu-nhat-ma-kem-trang"].map(pl),
  "bu-long-chot-dinh-vi-khoi-be-hoa-chat": ["chot-chu-t-ren-ma-kem", "vit-dau-tron-ma-kem", "nhom-chi-tiet-nho-mau-trang-bac", "nhom-chi-tiet-tru-ren-ma-kem-nen-xanh"].map(pl),
  "ong-lot-truc-ren-co-khi-chiu-mai-mon": ["ong-tru-dai-ma-kem", "bu-long-chu-t-phot-phat-den", "vit-long-den-ren-thua-phot-phat-den", "vit-tu-ren-phot-phat-den"].map(pl),
  "cum-linh-kien-khung-vo-banh-rang-b2b": ["ba-chi-tiet-tru-vo-ma-crom", "chi-tiet-vanh-khuyen-mau-xam-den", "khoi-kim-loai-be-mat-den-van-nham", "tam-dep-va-khoi-chu-t-mau-toi"].map(pl),
  "chi-tiet-kim-loai-ma-treo-day-chuyen-tu-dong": ["gia-treo-chi-tiet-den-khung-xanh", "nha-xuong-ma-treo-be-ma", "gia-do-uon-ma-sang", "cong-nhan-kiem-tra-gia-treo-ma"].map(pl),
};

/** Trang chi tiết sản phẩm, "Dịch vụ liên quan" (item1..item6 theo thứ tự trong messages). */
export const RELATED_SERVICE_IMAGES: Record<string, string> = {
  item1: pl("nha-xuong-ma-treo-be-ma"),
  item2: pl("logo-crom-vinfast"),
  item3: pl("banh-rang-xich-niken-hoa"),
  item4: pl("vit-dau-tron-ma-kem"),
  item5: pl("khung-man-hinh-nhua-son-den"),
  item6: pl("may-pvd-buong-chan-khong"),
};

/** Trang Giới thiệu, "Năng lực sản xuất và kiểm tra". */
export const CORE_STRENGTH_IMAGES: Record<string, string> = {
  production: pl("day-chuyen-ma-tu-dong-cau-truc-cam"),
  technology: pl("may-pvd-buong-chan-khong"),
  quality: pl("phong-phan-tich-toan-canh"),
  support: pr("ky-thuat-nhan-vien-kiem-tra-gia-treo"),
};

/** Trang Năng lực, "Quy trình công đoạn": ảnh thật đầu mỗi giai đoạn theo họ dây chuyền. */
export const PROCESS_STAGE_IMAGES: Record<"quay" | "treo", Record<"prep" | "plate" | "finish" | "qc", string>> = {
  quay: { prep: pr("q-4"), plate: pr("q-10"), finish: pr("q-17"), qc: pr("q-2") },
  treo: { prep: pr("t-2"), plate: pr("t-7"), finish: pr("t-12"), qc: pr("q-3") },
};
