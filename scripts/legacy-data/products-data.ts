// Bản chụp nội dung tĩnh cũ của website, chỉ dùng cho scripts/seed.ts để nạp dữ liệu ban đầu vào CMS.
// Website đang chạy KHÔNG import file này.
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

/** Danh sách slug cố định (không phụ thuộc bản dịch), dùng cho generateStaticParams. */
export const PRODUCT_SLUGS = [
  "banh-rang-truc-vit-ma-niken-hoa-hoc",
  "truc-piston-ty-ben-thuy-luc-o-to",
  "thanh-busbar-dong-ma-thiec-dan-dien",
  "bu-long-chot-dinh-vi-khoi-be-hoa-chat",
  "ong-lot-truc-ren-co-khi-chiu-mai-mon",
  "cum-linh-kien-khung-vo-banh-rang-b2b",
] as const;

export function getProducts(t: ProductsTranslator): Product[] {
  return [
    {
      slug: "banh-rang-truc-vit-ma-niken-hoa-hoc",
      title: t("products.banhRang.title"),
      category: t("products.banhRang.category"),
      categorySlug: "co-khi-chinh-xac",
      lot: "HN-PRD-882",
      description: t("products.banhRang.description"),
      image:
        "/images/factory/qc-7.jpg",
      imageAlt: t("products.banhRang.imageAlt"),
      imageBadge: t("products.banhRang.imageBadge"),
      specChips: [
        { label: t("products.banhRang.chips.coating.label"), value: "Ni-P" },
        { label: t("products.banhRang.chips.thickness.label"), value: "15 µm" },
        { label: t("products.banhRang.chips.tolerance.label"), value: "±0.2 µm" },
      ],
      showInGrid: true,
      featured: true,
    },
    {
      slug: "truc-piston-ty-ben-thuy-luc-o-to",
      title: t("products.pistonTruc.title"),
      category: t("products.pistonTruc.category"),
      categorySlug: "phu-tung-o-to-xe-may",
      lot: "HN-PRD-741",
      description: t("products.pistonTruc.description"),
      image:
        "/images/factory/qc-2.jpg",
      imageAlt: t("products.pistonTruc.imageAlt"),
      imageBadge: t("products.pistonTruc.imageBadge"),
      specChips: [
        {
          label: t("products.pistonTruc.chips.hardChrome.label"),
          value: t("products.pistonTruc.chips.hardChrome.value"),
        },
      ],
      showInGrid: true,
    },
    {
      slug: "thanh-busbar-dong-ma-thiec-dan-dien",
      title: t("products.busbar.title"),
      category: t("products.busbar.category"),
      categorySlug: "dau-cosse-thiet-bi-dien",
      lot: "HN-PRD-903",
      description: t("products.busbar.description"),
      image:
        "/images/factory/qc-3.jpg",
      imageAlt: t("products.busbar.imageAlt"),
      imageBadge: t("products.busbar.imageBadge"),
      specChips: [
        {
          label: t("products.busbar.chips.tin.label"),
          value: t("products.busbar.chips.tin.value"),
        },
      ],
      showInGrid: true,
    },
    {
      slug: "bu-long-chot-dinh-vi-khoi-be-hoa-chat",
      title: t("products.buLong.title"),
      category: t("products.buLong.category"),
      categorySlug: "anodizing",
      lot: "HN-PRD-655",
      description: t("products.buLong.description"),
      image:
        "/images/factory/kho-2.jpg",
      imageAlt: t("products.buLong.imageAlt"),
      imageBadge: t("products.buLong.imageBadge"),
      specChips: [
        {
          label: t("products.buLong.chips.zincNickel.label"),
          value: t("products.buLong.chips.zincNickel.value"),
        },
      ],
      showInGrid: true,
    },
    {
      slug: "ong-lot-truc-ren-co-khi-chiu-mai-mon",
      title: t("products.ongLot.title"),
      category: t("products.ongLot.category"),
      categorySlug: "co-khi-chinh-xac",
      lot: "HN-PRD-812",
      description: t("products.ongLot.description"),
      image:
        "/images/factory/qc-5.jpg",
      imageAlt: t("products.ongLot.imageAlt"),
      imageBadge: t("products.ongLot.imageBadge"),
      specChips: [
        {
          label: t("products.ongLot.chips.blackZinc.label"),
          value: t("products.ongLot.chips.blackZinc.value"),
        },
      ],
      showInGrid: true,
    },
    {
      slug: "cum-linh-kien-khung-vo-banh-rang-b2b",
      title: t("products.cumLinhKien.title"),
      category: t("products.cumLinhKien.category"),
      categorySlug: "co-khi-chinh-xac",
      lot: "HN-PLC-04",
      description: t("products.cumLinhKien.description"),
      image:
        "/images/factory/kho-5.jpg",
      imageAlt: t("products.cumLinhKien.imageAlt"),
      imageBadge: t("products.cumLinhKien.imageBadge"),
      specChips: [
        {
          label: t("products.cumLinhKien.chips.industry.label"),
          value: t("products.cumLinhKien.chips.industry.value"),
        },
        {
          label: t("products.cumLinhKien.chips.technology.label"),
          value: t("products.cumLinhKien.chips.technology.value"),
        },
        {
          label: t("products.cumLinhKien.chips.detail.label"),
          value: t("products.cumLinhKien.chips.detail.value"),
        },
        {
          label: t("products.cumLinhKien.chips.standard.label"),
          value: t("products.cumLinhKien.chips.standard.value"),
        },
      ],
      showInGrid: false,
    },
  ];
}

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

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getGridProducts(products: Product[]): Product[] {
  return products.filter((product) => product.showInGrid);
}

export function getSpotlightProject(products: Product[]): Product {
  return products.find((p) => p.slug === "cum-linh-kien-khung-vo-banh-rang-b2b") ?? products[0];
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
    heroImage:
      "/images/factory/qc-1.jpg",
    heroImageAlt: t("detail.heroImageAlt"),
    gallery: [
      {
        id: 1,
        image:
          "/images/factory/qc-2.jpg",
        alt: t("detail.gallery.item1.alt"),
        thumbLabel: t("detail.gallery.item1.thumbLabel"),
        caption: t("detail.gallery.item1.caption"),
      },
      {
        id: 2,
        image:
          "/images/factory/qc-3.jpg",
        alt: t("detail.gallery.item2.alt"),
        thumbLabel: t("detail.gallery.item2.thumbLabel"),
        caption: t("detail.gallery.item2.caption"),
      },
      {
        id: 3,
        image:
          "/images/factory/qc-7.jpg",
        alt: t("detail.gallery.item3.alt"),
        thumbLabel: t("detail.gallery.item3.thumbLabel"),
        caption: t("detail.gallery.item3.caption"),
      },
      {
        id: 4,
        image:
          "/images/factory/kho-4.jpg",
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
        title: t("detail.relatedServices.item1.title"),
        description: t("detail.relatedServices.item1.description"),
        cta: t("detail.relatedServices.item1.cta"),
      },
      {
        icon: "construction",
        code: "SRV-02",
        title: t("detail.relatedServices.item2.title"),
        description: t("detail.relatedServices.item2.description"),
        cta: t("detail.relatedServices.item2.cta"),
      },
      {
        icon: "layers",
        code: "SRV-03",
        title: t("detail.relatedServices.item3.title"),
        description: t("detail.relatedServices.item3.description"),
        cta: t("detail.relatedServices.item3.cta"),
      },
    ],
  };
}

export type ProductDetailContent = ReturnType<typeof getProductDetailContent>;
