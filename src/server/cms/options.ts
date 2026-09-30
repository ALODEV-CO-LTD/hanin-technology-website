import type { SelectOption } from "./fields";

export const PRODUCT_CATEGORIES: SelectOption[] = [
  { value: "co-khi-chinh-xac", label: "Chi tiết cơ khí chính xác" },
  { value: "phu-tung-o-to-xe-may", label: "Linh kiện phụ tùng ô tô xe máy" },
  { value: "dau-cosse-thiet-bi-dien", label: "Đầu cosse thiết bị điện" },
  { value: "anodizing", label: "Linh kiện xử lý Anodizing" },
];

export const NEWS_CATEGORIES: SelectOption[] = [
  { value: "cong-ty", label: "Công ty" },
  { value: "cong-nghe", label: "Công nghệ" },
  { value: "san-xuat", label: "Sản xuất" },
  { value: "chat-luong", label: "Chất lượng" },
  { value: "tuyen-dung", label: "Tuyển dụng" },
];

export const JOB_DEPARTMENTS: SelectOption[] = [
  { value: "engineering", label: "Kỹ thuật" },
  { value: "production", label: "Sản xuất" },
  { value: "qc", label: "QA/QC" },
  { value: "maintenance", label: "Bảo trì" },
  { value: "sales", label: "Kinh doanh" },
];

export const JOB_TYPES: SelectOption[] = [
  { value: "fulltime", label: "Toàn thời gian" },
  { value: "shift", label: "Làm theo ca" },
  { value: "intern", label: "Thực tập" },
];

export const JOB_LOCATIONS: SelectOption[] = [
  { value: "factory", label: "Nhà máy" },
  { value: "office", label: "Văn phòng" },
];

export const BANNER_PLACEMENTS: SelectOption[] = [
  { value: "home-hero", label: "Trang chủ - Banner đầu trang" },
  { value: "gioi-thieu", label: "Giới thiệu - Banner đầu trang" },
  { value: "dich-vu", label: "Dịch vụ gia công mạ - Banner đầu trang" },
  { value: "san-pham", label: "Sản phẩm & Dự án - Banner đầu trang" },
  { value: "nang-luc", label: "Năng lực sản xuất - Banner đầu trang" },
  { value: "tin-tuc", label: "Tin tức - Banner đầu trang" },
  { value: "tuyen-dung", label: "Tuyển dụng - Banner đầu trang" },
  { value: "lien-he", label: "Liên hệ - Banner đầu trang" },
];

export const INQUIRY_STATUSES: SelectOption[] = [
  { value: "new", label: "Mới" },
  { value: "processing", label: "Đang xử lý" },
  { value: "done", label: "Đã xử lý" },
  { value: "spam", label: "Spam" },
];
