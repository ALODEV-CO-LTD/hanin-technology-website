export type ProductCategory =
  | "co-khi-chinh-xac"
  | "phu-tung-o-to-xe-may"
  | "dau-cosse-thiet-bi-dien"
  | "anodizing"
  | "thuy-luc-khoi-van";

export interface ProductSpecChip {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  /** Hiển thị trong lưới danh mục / card liên quan */
  title: string;
  /** Nhãn ngành ứng dụng ngắn dùng cho badge & breadcrumb */
  category: string;
  categorySlug: ProductCategory;
  /** Mã lô sản xuất kỹ thuật, ví dụ HN-PRD-882 */
  lot: string;
  /** Mô tả ngắn dùng cho card danh mục */
  description: string;
  /** Ảnh đại diện (giữ nguyên link nguồn) */
  image: string;
  imageAlt: string;
  /** Nhãn góc trên ảnh, ví dụ "DỰ ÁN 01 // CƠ KHÍ CHÍNH XÁC" */
  imageBadge: string;
  /** Các chip thông số kỹ thuật hiển thị trên card */
  specChips: ProductSpecChip[];
  /** true = xuất hiện trong lưới danh mục chính */
  showInGrid: boolean;
  /** true = card lớn (featured) trong lưới danh mục */
  featured?: boolean;
}

/**
 * Bản dịch trỏ tới namespace "SanPham" (dùng `useTranslations("SanPham")`
 * hoặc `getTranslations("SanPham")`, cả client lẫn server component).
 */
export type ProductsTranslator = (key: string, values?: Record<string, string | number | Date>) => string;

export function getCategoryTabs(
  t: ProductsTranslator,
): { label: string; value: "all" | ProductCategory }[] {
  return [
    { label: t("categoryTabs.all"), value: "all" },
    { label: t("categoryTabs.coKhiChinhXac"), value: "co-khi-chinh-xac" },
    { label: t("categoryTabs.phuTungOToXeMay"), value: "phu-tung-o-to-xe-may" },
    { label: t("categoryTabs.dauCosseThietBiDien"), value: "dau-cosse-thiet-bi-dien" },
    { label: t("categoryTabs.anodizing"), value: "anodizing" },
  ];
}

/**
 * Nội dung chi tiết kỹ thuật đầy đủ: hiện tại chỉ có 1 bộ nội dung mẫu
 * (dựa theo file thiết kế chi tiết sản phẩm/dự án nguồn). Trang chi tiết
 * dùng chung bộ nội dung này cho mọi slug, chỉ thay các trường định danh
 * (tiêu đề, breadcrumb, badge) theo đúng sản phẩm tương ứng.
 */
export function getProductDetailContent(t: ProductsTranslator) {
  return {
    specEyebrow: t("detail.specEyebrow"),
    heroStats: [
      { label: t("detail.heroStats.coatingThickness.label"), value: "10 – 25 µm", note: t("detail.heroStats.coatingThickness.note") },
      { label: t("detail.heroStats.saltSpray.label"), value: "500h+", note: t("detail.heroStats.saltSpray.note") },
      { label: t("detail.heroStats.tolerance.label"), value: "±0.2 µm", note: t("detail.heroStats.tolerance.note") },
    ],
    heroDescription: t("detail.heroDescription"),
    heroImageAlt: t("detail.heroImageAlt"),
    gallery: [
      {
        id: 1,
        alt: t("detail.gallery.item1.alt"),
        thumbLabel: t("detail.gallery.item1.thumbLabel"),
        caption: t("detail.gallery.item1.caption"),
      },
      {
        id: 2,
        alt: t("detail.gallery.item2.alt"),
        thumbLabel: t("detail.gallery.item2.thumbLabel"),
        caption: t("detail.gallery.item2.caption"),
      },
      {
        id: 3,
        alt: t("detail.gallery.item3.alt"),
        thumbLabel: t("detail.gallery.item3.thumbLabel"),
        caption: t("detail.gallery.item3.caption"),
      },
      {
        id: 4,
        alt: t("detail.gallery.item4.alt"),
        thumbLabel: t("detail.gallery.item4.thumbLabel"),
        caption: t("detail.gallery.item4.caption"),
      },
    ],
    overviewParagraphs: [
      t("detail.overviewParagraphs.p1"),
      t("detail.overviewParagraphs.p2"),
      t("detail.overviewParagraphs.p3"),
    ],
    achievements: [
      {
        title: t("detail.achievements.item1.title"),
        description: t("detail.achievements.item1.description"),
      },
      {
        title: t("detail.achievements.item2.title"),
        description: t("detail.achievements.item2.description"),
      },
      {
        title: t("detail.achievements.item3.title"),
        description: t("detail.achievements.item3.description"),
      },
    ],
    specSheet: [
      { label: t("detail.specSheet.product.label"), value: t("detail.specSheet.product.value") },
      { label: t("detail.specSheet.application.label"), value: t("detail.specSheet.application.value") },
      {
        label: t("detail.specSheet.process.label"),
        value: t("detail.specSheet.process.value"),
        accent: true,
      },
      { label: t("detail.specSheet.substrate.label"), value: t("detail.specSheet.substrate.value") },
      { label: t("detail.specSheet.requirement.label"), value: t("detail.specSheet.requirement.value") },
      { label: t("detail.specSheet.standard.label"), value: t("detail.specSheet.standard.value") },
      {
        label: t("detail.specSheet.lab.label"),
        value: t("detail.specSheet.lab.value"),
        technical: true,
      },
    ],
    process: [
      {
        step: "01",
        title: t("detail.process.step1.title"),
        description: t("detail.process.step1.description"),
        phase: t("detail.process.step1.phase"),
      },
      {
        step: "02",
        title: t("detail.process.step2.title"),
        description: t("detail.process.step2.description"),
        phase: t("detail.process.step2.phase"),
      },
      {
        step: "03",
        title: t("detail.process.step3.title"),
        description: t("detail.process.step3.description"),
        phase: t("detail.process.step3.phase"),
      },
      {
        step: "04",
        title: t("detail.process.step4.title"),
        description: t("detail.process.step4.description"),
        phase: t("detail.process.step4.phase"),
      },
    ],
    relatedServices: [
      {
        icon: "shield_with_heart",
        code: "SRV-01",
        href: "/dich-vu-gia-cong-ma/ma-kem-hop-kim-kem-niken",
        title: t("detail.relatedServices.item1.title"),
        description: t("detail.relatedServices.item1.description"),
        cta: t("detail.relatedServices.item1.cta"),
      },
      {
        icon: "construction",
        code: "SRV-02",
        href: "/dich-vu-gia-cong-ma/ma-crom-cung-cong-nghiep",
        title: t("detail.relatedServices.item2.title"),
        description: t("detail.relatedServices.item2.description"),
        cta: t("detail.relatedServices.item2.cta"),
      },
      {
        icon: "layers",
        code: "SRV-03",
        href: "/dich-vu-gia-cong-ma/xu-ly-nhom-ma-kim-loai-khac",
        title: t("detail.relatedServices.item3.title"),
        description: t("detail.relatedServices.item3.description"),
        cta: t("detail.relatedServices.item3.cta"),
      },
    ],
  };
}

export type ProductDetailContent = ReturnType<typeof getProductDetailContent>;
