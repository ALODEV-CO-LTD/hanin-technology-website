/**
 * Bản đồ ảnh thật của nhà máy (public/images/factory/*) cho từng vị trí trên website.
 * Dùng chung cho: ảnh mặc định trong code, dữ liệu seed và script `db:factory-images`.
 */
const f = (name: string) => `/images/factory/${name}.jpg`;

/** Vị trí ảnh nằm trong các khối của website (khoá giống siteImg). */
export const SITE_IMAGE_MAP: Record<string, string> = {
  "gioi-thieu/CompanyIntroduction#1": f("ma-quay-5"),
  "gioi-thieu/FactoryOverview#1": f("ma-quay-1"),
  "gioi-thieu/FactoryOverview#2": f("ma-treo-2"),
  "gioi-thieu/FactoryOverview#3": f("phan-tich-1"),
  "gioi-thieu/FactoryOverview#4": f("kho-5"),
  "home/AboutHanin#1": f("ma-quay-2"),
  "home/FactoryShowcase#1": "/images/factory/hd/showcase-kho.jpg",
  "home/FactoryShowcase#2": "/images/factory/hd/showcase-treo.jpg",
  "home/FactoryShowcase#3": "/images/factory/hd/showcase-lab.jpg",
  "home/FactoryShowcase#4": "/images/factory/hd/showcase-may.jpg",
  "home/ManufacturingCapability#1": f("ma-treo-3"),
  "lien-he/LocationMap#1": f("kho-6"),
  "nang-luc/AutomatedVsManual#1": f("ma-treo-2"),
  "nang-luc/AutomatedVsManual#2": f("ma-quay-5"),
  "nang-luc/EquipmentGrid#1": f("phan-tich-2"),
  "nang-luc/EquipmentGrid#2": f("ma-quay-7"),
  "nang-luc/EquipmentGrid#3": f("ma-treo-3"),
  "nang-luc/EquipmentGrid#4": f("ma-treo-4"),
  "nang-luc/FactoryGallery#1": f("ma-quay-6"),
  "nang-luc/FactoryGallery#2": f("kho-6"),
  "nang-luc/FactoryGallery#3": f("ma-treo-3"),
  "nang-luc/FactoryGallery#4": f("qc-4"),
  "nang-luc/FactoryGallery#5": f("ma-quay-7"),
  "nang-luc/FactoryOverview#1": f("ma-quay-7"),
  "nang-luc/ProductionLines#1": f("ma-quay-6"),
  "nang-luc/ProductionLines#2": f("ma-quay-6"),
  "nang-luc/ProductionLines#3": f("ma-treo-3"),
  "nang-luc/TestingAnalysis#1": f("phan-tich-1"),
  "lien-he/RfqForm#1": f("ma-quay-6"),
  "tuyen-dung/WorkEnvironment#1": f("ma-treo-2"),
  "tuyen-dung/WorkEnvironment#2": f("qc-7"),
  "tuyen-dung/WorkEnvironment#3": f("phan-tich-1"),
};

/** Banner đầu trang theo placement. */
export const BANNER_IMAGES: Record<string, string> = {
  "home-hero": f("ma-treo-2"),
  "gioi-thieu": f("kho-6"),
  "dich-vu": f("ma-quay-6"),
  "san-pham": f("qc-1"),
  "nang-luc": f("ma-quay-5"),
  "tin-tuc": f("phan-tich-1"),
  "tuyen-dung": f("qc-5"),
  "lien-he": f("qc-6"),
};

/** Dịch vụ theo thứ tự trong CMS/seed (id 1→6). */
export const SERVICE_IMAGES: string[] = [
  f("ma-quay-1"), f("ma-treo-2"), f("ma-quay-5"), f("ma-quay-7"), f("ma-treo-3"), f("ma-quay-6"),
];

/** Sản phẩm/dự án theo thứ tự (id 1→6). */
export const PRODUCT_IMAGES: string[] = [
  f("qc-7"), f("qc-2"), f("qc-3"), f("kho-2"), f("qc-5"), f("kho-5"),
];

/** Bài viết theo thứ tự (id 1→7: bài tiêu điểm trước, rồi 6 bài còn lại). */
export const POST_IMAGES: string[] = [
  f("ma-treo-3"), f("phan-tich-2"), f("ma-treo-2"), f("qc-4"), f("phan-tich-4"), f("ma-quay-4"), f("qc-8"),
];

export const ADMIN_LOGIN_IMAGE = f("ma-treo-2");
