export const PAGES: Record<string, string> = {
  home: "Trang chủ",
  "gioi-thieu": "Giới thiệu",
  "dich-vu": "Dịch vụ gia công mạ",
  "san-pham": "Sản phẩm & Dự án",
  "nang-luc": "Năng lực sản xuất",
  "tin-tuc": "Tin tức",
  "tuyen-dung": "Tuyển dụng",
  "lien-he": "Liên hệ",
  layout: "Logo (đầu trang & chân trang)",
  banner: "Banner đầu trang",
  "khach-hang": "Khách hàng",
  "chua-gan": "Chưa gán vào vị trí nào",
  "dung-chung": "Ảnh dùng chung",
};

/** Tên khối (trang nhỏ) theo khoá "<trang>/<khối>". Khoá không có ở đây hiển thị theo tên gốc. */
export const SECTIONS: Record<string, string> = {
  "home/AboutHanin": "Giới thiệu HANIN",
  "home/FactoryZones": "Các khu vực nhà máy",
  "home/ManufacturingCapability": "Năng lực sản xuất",
  "gioi-thieu/CompanyIntroduction": "Giới thiệu công ty",
  "gioi-thieu/FactoryOverview": "Tổng quan nhà máy",
  "gioi-thieu/QualityStandardsPreview": "Tiêu chuẩn chất lượng",
  "gioi-thieu/the-manh": "Năng lực sản xuất và kiểm tra",
  "dich-vu/cong-doan": "Các công đoạn gia công mạ",
  "dich-vu/quy-trinh": "Quy trình của từng dịch vụ",
  "dich-vu/ung-dung": "Sản phẩm ứng dụng của từng dịch vụ",
  "san-pham/dich-vu-lien-quan": "Dịch vụ liên quan",
  "san-pham/thu-vien": "Thư viện ảnh từng sản phẩm",
  "nang-luc/AutomatedVsManual": "Tự động và thủ công",
  "nang-luc/EquipmentGrid": "Thiết bị",
  "nang-luc/FactoryGallery": "Ảnh nhà máy",
  "nang-luc/FactoryOverview": "Tổng quan nhà máy",
  "nang-luc/ProductionLines": "Dây chuyền sản xuất",
  "nang-luc/TestingAnalysis": "Kiểm tra và phân tích",
  "nang-luc/chung-nhan": "Chứng nhận, môi trường và kiểm tra",
  "nang-luc/cong-doan-quy-trinh": "Quy trình công đoạn",
  "nang-luc/quy-trinh-san-xuat": "Quy trình sản xuất 6 bước",
  "tuyen-dung/WorkEnvironment": "Môi trường làm việc",
  "lien-he/LocationMap": "Bản đồ",
  "lien-he/RfqForm": "Biểu mẫu yêu cầu báo giá",
  "layout/Logo": "Logo",
  "banner/banner": "Banner",
  "dich-vu/anh-dai-dien": "Ảnh đại diện dịch vụ",
  "san-pham/anh-dai-dien": "Ảnh đại diện sản phẩm",
  "tin-tuc/anh-bai-viet": "Ảnh bài viết",
  "khach-hang/logo": "Logo khách hàng",
  "chua-gan/chua-gan": "Ảnh chưa dùng",
};
export const PAGE_ORDER = ["home", "gioi-thieu", "dich-vu", "san-pham", "nang-luc", "tuyen-dung", "lien-he", "layout", "banner", "tin-tuc", "khach-hang", "dung-chung", "chua-gan"];

export const humanize = (v: string) => {
  const t = v.replace(/-/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
  return t.charAt(0).toUpperCase() + t.slice(1);
};

export interface Parsed {
  page: string;
  section: string;
  sub: string;
  label: string;
}

/** Tách khoá thành trang lớn / khối (trang nhỏ) / nhóm con / tên vị trí. */
export function parseSlotKey(key: string): Parsed {
  const [page, second, ...rest] = key.split("/");
  const [comp, num] = second.split("#");
  const section = `${page}/${comp}`;
  if (num !== undefined) return { page, section, sub: "", label: `Ảnh ${num}` };
  if (rest.length >= 2) return { page, section, sub: rest[0], label: rest.slice(1).join("/") };
  return { page, section, sub: "", label: rest.join("/") };
}

