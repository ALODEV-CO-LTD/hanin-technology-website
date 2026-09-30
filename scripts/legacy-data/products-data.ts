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
        "https://lh3.googleusercontent.com/aida/AEtjO1V_tTw69cPLPuAIAklw62bUMsvgXOHLbVZUqyKCJdQn_gFGTqySCY3U3wnUcewgUsnu71oBcRfurU-p9d1aZg1Iz5LfLhHjHQLMTxR21uxzTofv3GPACm5PiDfyiCcmdors7PXFhyxKIo0DTYVyDsJucARefAbj47sUOowsSJbw5y3BF5XkoqhD6i82G8UOZb7-RmquUuqzpzx8eLMdX76f84CKrLZ4KIY1tELUBoroCSjAwSniyEr7qQL-",
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
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB-L99Nt8jdj5_ENTBVcnfW_xELEOl54Te4hFTL3Hg6RGpY7gw48eslCBcc7f42S3SBdQwThs9AFZAsIwhkTFrtBiEMKq8_kAgWh-3WxLUZwWUvn9xmsAkjd_gpAGF20T-KAGL323XIqWikrSDizkWjE4KBjEMaM7OOJ46O-D4MeGUrxI29q4hfCHxvJYVWvyH26Gz3Epu32JxKkL-ZDMCkrI4eLJEPoihSYFrIL8Vom_LGoPbC8e_jng",
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
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDBm5dDTGIUSE8Igv663hzCgH3rH-kKI1euza2OEGnRSXOtzqW8FnTsFaxjSVP6_CwpXb3uJqVD8Fr6yOyRiOkl1gTQukK5EIxPU5O-BD1LXPyf_RkI38kVOjROWZRa9HeKrVrRrQPPiiFE4JNSWq3-wKdqlg84bADk-dINOWi7hLmkmw8947Cdh-ggqkheZDtMWQdzEor2Q9tuHEVbD3UdfvCbvD2htkJJO1IG8qr3Y-wMTWLy8h7F4Q",
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
        "https://lh3.googleusercontent.com/aida/AEtjO1W3z8rS6tU8vW0xY2zApU1e4wY3g0o7P3zZcR9tQ8vW2mB6xY1uK9tF5rQ2xX8gV4w-zT1qA3sD6fG8hJ9kL0mN2pQ4rS6tU8vW0xY2",
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
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCaWVqo-1eqEwLAWZ_EDs7np1tYr5MJm0hn8Yd9y4fQBodJSw8_5kxMIVFxMv-ct7rfv427BO2DA2tEkPoySHifyDiLCl50Sa4zcWiOeokB5cFb2klLOeGpHeIP_ghPVAm_J53wdQIeMnyfig2ld9dOTdhn31OIkpOILjptSUmpYVH4LotNx4bq7yr9UsxJKzWpQw1iYAV72KcouUur1rgswqoJ-cF0wlgEBhQT8K7d3_rKFUqkdkI25Q",
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
        "https://lh3.googleusercontent.com/aida/AEtjO1W3z8rS6tU8vW0xY2zApU1e4wY3g0o7P3zZcR9tQ8vW2mB6xY1uK9tF5rQ2xX8gV4w-zT1qA3sD6fG8hJ9kL0mN2pQ4rS6tU8vW0xY2",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJeNDLUaBDEs48vil6OqvXjZ4KzCFrJ3fWyv2HG-s8rj9cRdF8tQlS1wNHMpNyyBXS5YYZSDS5U7Eeukr51Tqh8CUbTo2xMyOl_DXzAysjWQKW-6EUO-7RXxMz0OYdrp20tb5HolXN_KrVibRxUQeh4jc8vQVJaYZn5FWeNDvpU3CFiCxWGEWlERIK_D_KSf2THFY3rBd6M1c9Gi62iaMBzFkHmvlSN6XjhuVDEuSll3LRExy8ROphDQ",
    heroImageAlt: t("detail.heroImageAlt"),
    gallery: [
      {
        id: 1,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDQf1X78lIBHCSSK-QTIU-1rQfqODRdlc0CrQizfhoXmWAJXae06wqmjuyxlhMS4kAVsPfZvH0aI8iUcAd5mB-36FhKva4FwkKLU953EQQhX5RP8cZpV0Eoy_y_-rPc7U8WHUP96plDdRXYmOIBkEFSgMHM2uYCWNrFLVOynZ02dIw1hOa3hHb21KAsATPXaZAl_Mjwe7DrnQ-V4bYxABALU_CgrHWqzM-08zjzAAUORk69ofOWK82T9A",
        alt: t("detail.gallery.item1.alt"),
        thumbLabel: t("detail.gallery.item1.thumbLabel"),
        caption: t("detail.gallery.item1.caption"),
      },
      {
        id: 2,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAgYMLFKLnFOAHBnQqBQvuiw6MjXcHNyYLgQ1LFWOLmfH0RMggYnvMbk_23VMB5GHxAs8nsqXbfBCnwoNBPxPME9_ure9QxHrUgkYHrE5p3MLIMiAKuh5vdNRhFhKfevNs5g6xfgAQ3uf_t9Eteimb2rM50vcE2aDIivFvuvK5is2nHv4mTVtfRTe2EDpZOfTACexNLlUNRyS2WsZL3llnZwq8BDq7HlY3woRcix3T9E6N5CHNVr4K_Og",
        alt: t("detail.gallery.item2.alt"),
        thumbLabel: t("detail.gallery.item2.thumbLabel"),
        caption: t("detail.gallery.item2.caption"),
      },
      {
        id: 3,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAWkZDChzTqGFvmOkP3p-eeHYdymByt9FprAYAwO-3dglLaqfl6yGQmRmt4oqhgrSDX2GDhNKFCXDhRZP59U6t2NnfhzoKhoEQf-_QwAhze4zVwl-dkh1Ff6IU059pYuRRw7p2M8H-hRUh-s4Hdn8VIuY8p7Dmpg0z64xXPruZQOURdRitekeIhiir0RWjj6U9JgLllQ03NH3uKZyT9OEYMGI2V36Yla6ipxRNOQotl5Ch53SeljoafhQ",
        alt: t("detail.gallery.item3.alt"),
        thumbLabel: t("detail.gallery.item3.thumbLabel"),
        caption: t("detail.gallery.item3.caption"),
      },
      {
        id: 4,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDVuy2C0hnhH3BKQmfxLoHMs5DDjb8OMIDyWxvZzDXeQ2RpxgHTW-Gwr-8tuvpFkqp-18dXdkha-exxhFIsYfjj0ov06G3nWt0RTRqR5L3p4udIo6FwdTOg49auJCu0QXuIoeko5vM052YuS78OuAB78O7dKJO0UqzbAXTPrmZZDjUZBwP2qmPm2NNsOqBidnCtyqAXFwsD2qqMY2RMXzRqfnjRK7RVf6zEgq9hokxFeBpMcHCFGL-0Gw",
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
