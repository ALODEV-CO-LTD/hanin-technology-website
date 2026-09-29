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

export const PRODUCTS: Product[] = [
  {
    slug: "banh-rang-truc-vit-ma-niken-hoa-hoc",
    title: "Bánh Răng Trục Vít & Chi Tiết Cơ Khí Đo Micrometer",
    category: "Chi tiết cơ khí chính xác",
    categorySlug: "co-khi-chinh-xac",
    lot: "HN-PRD-882",
    description:
      "Gia công mạ Niken kỹ thuật cao kiểm soát dung sai độ dày ±0.2 µm, chống ma sát trượt và tăng độ cứng chịu tải trọng lớn cho cơ cấu truyền động vi mô.",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1V_tTw69cPLPuAIAklw62bUMsvgXOHLbVZUqyKCJdQn_gFGTqySCY3U3wnUcewgUsnu71oBcRfurU-p9d1aZg1Iz5LfLhHjHQLMTxR21uxzTofv3GPACm5PiDfyiCcmdors7PXFhyxKIo0DTYVyDsJucARefAbj47sUOowsSJbw5y3BF5XkoqhD6i82G8UOZb7-RmquUuqzpzx8eLMdX76f84CKrLZ4KIY1tELUBoroCSjAwSniyEr7qQL-",
    imageAlt: "Bánh răng và chi tiết cơ khí được đo kiểm bằng panme (ảnh minh họa)",
    imageBadge: "DỰ ÁN 01 // CƠ KHÍ CHÍNH XÁC",
    specChips: [
      { label: "LỚP MẠ HOÀN THIỆN", value: "Ni-P" },
      { label: "ĐỘ DÀY", value: "15 µm" },
      { label: "DUNG SAI", value: "±0.2 µm" },
    ],
    showInGrid: true,
    featured: true,
  },
  {
    slug: "truc-piston-ty-ben-thuy-luc-o-to",
    title: "Trục Piston & Cụm Ty Ben Thủy Lực Ô Tô",
    category: "Linh kiện phụ tùng ô tô xe máy",
    categorySlug: "phu-tung-o-to-xe-may",
    lot: "HN-PRD-741",
    description:
      "Lớp mạ Crom cứng bề mặt vi mô chống trầy xước và ăn mòn sương muối vượt 720h chuẩn ASTM B117 khắt khe cho môi trường chịu áp suất cao.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-L99Nt8jdj5_ENTBVcnfW_xELEOl54Te4hFTL3Hg6RGpY7gw48eslCBcc7f42S3SBdQwThs9AFZAsIwhkTFrtBiEMKq8_kAgWh-3WxLUZwWUvn9xmsAkjd_gpAGF20T-KAGL323XIqWikrSDizkWjE4KBjEMaM7OOJ46O-D4MeGUrxI29q4hfCHxvJYVWvyH26Gz3Epu32JxKkL-ZDMCkrI4eLJEPoihSYFrIL8Vom_LGoPbC8e_jng",
    imageAlt: "Trục piston và ty ben thủy lực ô tô mạ crom cứng (ảnh minh họa)",
    imageBadge: "DỰ ÁN 02 // PHỤ TÙNG Ô TÔ & XE MÁY",
    specChips: [{ label: "CROM CỨNG", value: "THỬ NGHIỆM MUỐI: 720H" }],
    showInGrid: true,
  },
  {
    slug: "thanh-busbar-dong-ma-thiec-dan-dien",
    title: "Thanh Busbar Đồng Mạ Thiếc Dẫn Điện Cực Cốt",
    category: "Đầu cosse thiết bị điện",
    categorySlug: "dau-cosse-thiet-bi-dien",
    lot: "HN-PRD-903",
    description:
      "Mạ thiếc bảo vệ thanh dẫn đồng công nghiệp trạm biến áp, ngăn oxy hóa và giữ điện trở tiếp xúc siêu thấp trong dải tải cao tần.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBm5dDTGIUSE8Igv663hzCgH3rH-kKI1euza2OEGnRSXOtzqW8FnTsFaxjSVP6_CwpXb3uJqVD8Fr6yOyRiOkl1gTQukK5EIxPU5O-BD1LXPyf_RkI38kVOjROWZRa9HeKrVrRrQPPiiFE4JNSWq3-wKdqlg84bADk-dINOWi7hLmkmw8947Cdh-ggqkheZDtMWQdzEor2Q9tuHEVbD3UdfvCbvD2htkJJO1IG8qr3Y-wMTWLy8h7F4Q",
    imageAlt: "Thanh busbar đồng mạ thiếc trong tủ điện cao thế (ảnh minh họa)",
    imageBadge: "DỰ ÁN 03 // ĐẦU COSSE & THIẾT BỊ ĐIỆN",
    specChips: [{ label: "MẠ THIẾC NGUYÊN CHẤT", value: "ĐỘ TINH KHIẾT: 99.9%" }],
    showInGrid: true,
  },
  {
    slug: "bu-long-chot-dinh-vi-khoi-be-hoa-chat",
    title: "Bu-lông & Chốt Định Vị Khối Bể Hóa Chất",
    category: "Linh kiện xử lý Anodizing",
    categorySlug: "anodizing",
    lot: "HN-PRD-655",
    description:
      "Mạ kẽm niken thụ động hóa 3 valence đáp ứng tiêu chuẩn kháng kiềm và acid nhẹ công nghiệp, bảo đảm bước ren không kẹt rỉ.",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1W3z8rS6tU8vW0xY2zApU1e4wY3g0o7P3zZcR9tQ8vW2mB6xY1uK9tF5rQ2xX8gV4w-zT1qA3sD6fG8hJ9kL0mN2pQ4rS6tU8vW0xY2",
    imageAlt: "Bu-lông và chốt định vị khối bể hóa chất mạ kẽm niken (ảnh minh họa)",
    imageBadge: "DỰ ÁN 04 // THỦY LỰC & KHỐI VAN",
    specChips: [{ label: "LỚP MẠ: KẼM-NIKEN", value: "TIÊU CHUẨN ISO 4042" }],
    showInGrid: true,
  },
  {
    slug: "ong-lot-truc-ren-co-khi-chiu-mai-mon",
    title: "Ống Lót & Trục Ren Cơ Khí Chịu Mài Mòn",
    category: "Chi tiết cơ khí chính xác",
    categorySlug: "co-khi-chinh-xac",
    lot: "HN-PRD-812",
    description:
      "Mạ kẽm đen kỹ thuật chống lóa và bảo vệ ren ống chính xác không gây nghẹt bavia trong quá trình lắp ráp robot tự động.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaWVqo-1eqEwLAWZ_EDs7np1tYr5MJm0hn8Yd9y4fQBodJSw8_5kxMIVFxMv-ct7rfv427BO2DA2tEkPoySHifyDiLCl50Sa4zcWiOeokB5cFb2klLOeGpHeIP_ghPVAm_J53wdQIeMnyfig2ld9dOTdhn31OIkpOILjptSUmpYVH4LotNx4bq7yr9UsxJKzWpQw1iYAV72KcouUur1rgswqoJ-cF0wlgEBhQT8K7d3_rKFUqkdkI25Q",
    imageAlt: "Ống lót và trục ren cơ khí chịu mài mòn sau mạ kẽm đen (ảnh minh họa)",
    imageBadge: "DỰ ÁN 05 // CHI TIẾT CƠ KHÍ CHÍNH XÁC",
    specChips: [{ label: "MẠ KẼM ĐEN", value: "BƯỚC REN: M12-M48" }],
    showInGrid: true,
  },
  {
    slug: "cum-linh-kien-khung-vo-banh-rang-b2b",
    title: "Dự Án Gia Công Cụm Linh Kiện Khung Vỏ & Bánh Răng Cho Tập Đoàn Chế Tạo Máy B2B",
    category: "Dự án điển hình",
    categorySlug: "co-khi-chinh-xac",
    lot: "HN-PLC-04",
    description:
      "Triển khai quy trình mạ điện phân tự động kết hợp thụ động hóa đa lớp cho hơn 500.000 chi tiết cơ khí mỗi tháng, đảm bảo 100% linh kiện đạt chứng chỉ kiểm tra huỳnh quang tia X (XRF) và thử nghiệm sương muối 500 giờ.",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1W3z8rS6tU8vW0xY2zApU1e4wY3g0o7P3zZcR9tQ8vW2mB6xY1uK9tF5rQ2xX8gV4w-zT1qA3sD6fG8hJ9kL0mN2pQ4rS6tU8vW0xY2",
    imageAlt: "Dây chuyền mạ điện phân tự động PLC tại nhà máy Bắc Ninh (ảnh minh họa)",
    imageBadge: "NHÀ MÁY: BẮC NINH // DÂY CHUYỀN 04",
    specChips: [
      { label: "NGÀNH ỨNG DỤNG", value: "Chế tạo cơ khí chính xác & Robot" },
      { label: "CÔNG NGHỆ GIA CÔNG", value: "Mạ Niken & Mạ Kẽm đa sắc PLC" },
      { label: "SẢN PHẨM CHI TIẾT", value: "Bánh răng, trục định vị, khớp then" },
      { label: "TIÊU CHUẨN CHẤT LƯỢNG", value: "ISO 9001, RoHS, ASTM B117" },
    ],
    showInGrid: false,
  },
];

export const CATEGORY_TABS: { label: string; value: "all" | ProductCategory }[] = [
  { label: "Tất cả sản phẩm", value: "all" },
  { label: "Chi tiết cơ khí chính xác", value: "co-khi-chinh-xac" },
  { label: "Linh kiện phụ tùng ô tô xe máy", value: "phu-tung-o-to-xe-may" },
  { label: "Đầu cosse thiết bị điện", value: "dau-cosse-thiet-bi-dien" },
  { label: "Linh kiện xử lý Anodizing", value: "anodizing" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getGridProducts(): Product[] {
  return PRODUCTS.filter((product) => product.showInGrid);
}

export function getSpotlightProject(): Product {
  return PRODUCTS.find((p) => p.slug === "cum-linh-kien-khung-vo-banh-rang-b2b") ?? PRODUCTS[0];
}

/**
 * Nội dung chi tiết kỹ thuật đầy đủ — hiện tại chỉ có 1 bộ nội dung mẫu
 * (dựa theo file thiết kế chi tiết sản phẩm/dự án nguồn). Trang chi tiết
 * dùng chung bộ nội dung này cho mọi slug, chỉ thay các trường định danh
 * (tiêu đề, breadcrumb, badge) theo đúng sản phẩm tương ứng.
 */
export const PRODUCT_DETAIL_CONTENT = {
  specEyebrow: "SPEC: ISO 9001 & ASTM B117 // MICRON-PRECISION",
  heroStats: [
    { label: "Độ dày lớp mạ", value: "10 – 25 µm", note: "Tùy biến bản vẽ" },
    { label: "Chống phun muối", value: "500h+", note: "Chuẩn ASTM B117" },
    { label: "Dung sai kiểm soát", value: "±0.2 µm", note: "Đo kiểm quang học" },
  ],
  heroDescription:
    "Gia công hoàn thiện lớp phủ bề mặt mạ Niken hóa học không điện (Electroless Nickel Plating - High Phosphorus) ứng dụng cho cụm bánh răng xoắn, trục vít và cơ cấu vi sai robot công nghiệp. Đáp ứng dung sai lắp ghép khắt khe đến micromet, phân bổ bề mặt phủ đồng nhất 100% trong toàn bộ chân răng và rãnh then hoa mà không làm biến dạng bước ren.",
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJeNDLUaBDEs48vil6OqvXjZ4KzCFrJ3fWyv2HG-s8rj9cRdF8tQlS1wNHMpNyyBXS5YYZSDS5U7Eeukr51Tqh8CUbTo2xMyOl_DXzAysjWQKW-6EUO-7RXxMz0OYdrp20tb5HolXN_KrVibRxUQeh4jc8vQVJaYZn5FWeNDvpU3CFiCxWGEWlERIK_D_KSf2THFY3rBd6M1c9Gi62iaMBzFkHmvlSN6XjhuVDEuSll3LRExy8ROphDQ",
  heroImageAlt:
    "Bánh răng thép chính xác được đo dung sai bằng thước panme kỹ thuật số trên bàn đá granite (ảnh minh họa)",
  gallery: [
    {
      id: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQf1X78lIBHCSSK-QTIU-1rQfqODRdlc0CrQizfhoXmWAJXae06wqmjuyxlhMS4kAVsPfZvH0aI8iUcAd5mB-36FhKva4FwkKLU953EQQhX5RP8cZpV0Eoy_y_-rPc7U8WHUP96plDdRXYmOIBkEFSgMHM2uYCWNrFLVOynZ02dIw1hOa3hHb21KAsATPXaZAl_Mjwe7DrnQ-V4bYxABALU_CgrHWqzM-08zjzAAUORk69ofOWK82T9A",
      alt: "Cận cảnh bề mặt răng và ren sau mạ Niken hóa học (ảnh minh họa)",
      thumbLabel: "01 // Bề mặt răng & ren",
      caption: "Cận cảnh lớp mạ bánh răng & mặt ren siêu vi với độ đồng đều phân bố 100%",
    },
    {
      id: 2,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAgYMLFKLnFOAHBnQqBQvuiw6MjXcHNyYLgQ1LFWOLmfH0RMggYnvMbk_23VMB5GHxAs8nsqXbfBCnwoNBPxPME9_ure9QxHrUgkYHrE5p3MLIMiAKuh5vdNRhFhKfevNs5g6xfgAQ3uf_t9Eteimb2rM50vcE2aDIivFvuvK5is2nHv4mTVtfRTe2EDpZOfTACexNLlUNRyS2WsZL3llnZwq8BDq7HlY3woRcix3T9E6N5CHNVr4K_Og",
      alt: "Kiểm tra dung sai bằng thước panme kỹ thuật số tại phòng đo lường QC (ảnh minh họa)",
      thumbLabel: "02 // Thước Panme Mitutoyo",
      caption: "Kiểm tra dung sai bằng thước panme kỹ thuật số Mitutoyo phòng đo lường QC",
    },
    {
      id: 3,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAWkZDChzTqGFvmOkP3p-eeHYdymByt9FprAYAwO-3dglLaqfl6yGQmRmt4oqhgrSDX2GDhNKFCXDhRZP59U6t2NnfhzoKhoEQf-_QwAhze4zVwl-dkh1Ff6IU059pYuRRw7p2M8H-hRUh-s4Hdn8VIuY8p7Dmpg0z64xXPruZQOURdRitekeIhiir0RWjj6U9JgLllQ03NH3uKZyT9OEYMGI2V36Yla6ipxRNOQotl5Ch53SeljoafhQ",
      alt: "Gá jig titan trong dây chuyền mạ tự động PLC (ảnh minh họa)",
      thumbLabel: "03 // Gá Jig Dây Chuyền PLC",
      caption: "Chi tiết treo trên gá jig titan trong bể mạ tự động kiểm soát nồng độ hóa chất",
    },
    {
      id: 4,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDVuy2C0hnhH3BKQmfxLoHMs5DDjb8OMIDyWxvZzDXeQ2RpxgHTW-Gwr-8tuvpFkqp-18dXdkha-exxhFIsYfjj0ov06G3nWt0RTRqR5L3p4udIo6FwdTOg49auJCu0QXuIoeko5vM052YuS78OuAB78O7dKJO0UqzbAXTPrmZZDjUZBwP2qmPm2NNsOqBidnCtyqAXFwsD2qqMY2RMXzRqfnjRK7RVf6zEgq9hokxFeBpMcHCFGL-0Gw",
      alt: "Buồng thử nghiệm ăn mòn phun sương muối ASTM B117 (ảnh minh họa)",
      thumbLabel: "04 // Thử Nghiệm ASTM B117",
      caption: "Thử nghiệm ăn mòn buồng phun sương muối gia tốc ASTM B117 vượt mốc 720 giờ",
    },
  ],
  overviewParagraphs: [
    "Dự án đòi hỏi giải pháp mạ phủ chống mài mòn cho toàn bộ dòng bánh răng côn xoắn và trục then hoa bằng thép hợp kim SCM440 dùng cho hộp số giảm tốc tự động. Thách thức cốt lõi nằm ở kết cấu hình học phức tạp với các hốc rãnh ren trong sâu, nơi các công nghệ mạ điện phân thông thường dễ gây ra hiện tượng tích tụ điện tích ở đỉnh ren (edge buildup) và thiếu hụt độ dày ở đáy rãnh.",
    "Kỹ sư luyện kim của HANIN TECHNOLOGY đã phát triển quy trình Mạ Niken Hóa Học Không Điện (ENP) với hàm lượng Photpho cao (10.5% – 12% P). Phản ứng khử xúc tác tự động cho phép lớp mạ phát triển hoàn toàn đồng trục với phôi ban đầu, đảm bảo sai số độ dày toàn diện không vượt quá ±0.5 µm trên toàn bộ biên dạng răng.",
    "Sau công đoạn mạ, toàn bộ lô sản phẩm được đưa vào lò nung xử lý nhiệt khử Hydro ở nhiệt độ 400°C trong 1 giờ. Quá trình này biến tính pha kết tinh Ni3P phân tán, đẩy độ cứng tế vi của chi tiết từ 500 HV lên tới 920 HV, tương đương với crom cứng nhưng có hệ số ma sát trượt thấp hơn 30%.",
  ],
  achievements: [
    {
      title: "Phân bố bề mặt đồng nhất tuyệt đối",
      description:
        "Lớp mạ phân bổ hoàn hảo 100% trên toàn bộ góc cạnh, hốc ren mù và các hốc sâu phức tạp không cần điện cực phụ.",
    },
    {
      title: "Tăng cứng vi mô 850 – 950 HV sau ủ nhiệt",
      description:
        "Khử giòn hydro triệt để, ngăn nứt gãy mỏi do ứng suất trong các cơ cấu truyền động tải nặng chu kỳ cao.",
    },
    {
      title: "Kháng ăn mòn vượt ngưỡng 720 Giờ ASTM B117",
      description:
        "Cấu trúc vô định hình không có ranh giới hạt kim loại, ngăn chặn hoàn toàn sự xâm thực của hơi ẩm và dầu bôi trơn axit.",
    },
  ],
  specSheet: [
    { label: "SẢN PHẨM", value: "Bánh răng trục vít, trục then hoa, khớp nối chính xác" },
    { label: "NGÀNH ỨNG DỤNG", value: "Chế tạo robot, máy công cụ CNC, phụ tùng truyền động ô tô" },
    {
      label: "QUY TRÌNH MẠ",
      value: "Mạ Niken hóa học không điện (Electroless Nickel - ENP High Phos) + Xử lý nhiệt 400°C",
      accent: true,
    },
    { label: "VẬT LIỆU NỀN (SUBSTRATE)", value: "Thép hợp kim SCM440, Thép carbon S45C, Đồng thau C3604" },
    { label: "YÊU CẦU ĐẶC BIỆT", value: "Dung sai ren < ±0.5 µm, không để lại ba-via, độ bóng quang học Ra 0.2" },
    { label: "TIÊU CHUẨN ĐO KIỂM", value: "ISO 9001:2015, ASTM B733, AMS 2404, RoHS & REACH Compliant" },
    {
      label: "PHÒNG KIỂM NGHIỆM ĐO ĐẠC",
      value: "Máy đo huỳnh quang tia X (XRF Fischer), Máy đo độ cứng Vickers Matsuzawa",
      technical: true,
    },
  ],
  process: [
    {
      step: "01",
      title: "Tiếp nhận bản vẽ & tính toán kỹ thuật",
      description:
        "Rà soát file 2D/3D (STEP, DWG), tính diện tích bề mặt tiếp xúc dm², lập thông số dòng điện/hóa chất và thiết kế đồ gá chuyên dụng (Titanium Jig).",
      phase: "GIAI ĐOẠN: KỸ THUẬT R&D",
    },
    {
      step: "02",
      title: "Tiền xử lý & tẩy dầu siêu âm",
      description:
        "Làm sạch bề mặt phôi qua hệ thống 4 bể hóa chất siêu âm đa tần số, tẩy gỉ vi mô, kích hoạt bề mặt kim loại nền và rửa nước DI khử ion hoàn toàn.",
      phase: "GIAI ĐOẠN: LÀM SẠCH BỀ MẶT",
    },
    {
      step: "03",
      title: "Mạ điện phân / hóa học tự động",
      description:
        "Vận hành trong bể dung dịch nhiệt độ ổn định kiểm soát bằng PLC tự động, bổ sung ion kim loại liên tục và giám sát mật độ dòng theo thời gian thực.",
      phase: "GIAI ĐOẠN: GIA CÔNG PHỦ MẠ",
    },
    {
      step: "04",
      title: "Đo kiểm XRF & cấp chứng nhận COA",
      description:
        "Đo độ dày lớp mạ bằng phổ tia X huỳnh quang XRF, test bám dính cắt ô (cross-hatch), cấp chứng thư xuất xưởng COA và đóng gói VCI hút chân không.",
      phase: "GIAI ĐOẠN: QC & BÀN GIAO",
    },
  ],
  relatedServices: [
    {
      icon: "shield_with_heart",
      code: "SRV-01",
      title: "Dịch Vụ Mạ Kẽm & Niken Kỹ Thuật Cao",
      description:
        "Giải pháp mạ hợp kim Kẽm-Niken (Zn-Ni 12-15%) chuyên dùng cho phụ tùng gầm ô tô, bu-lông chống rỉ với khả năng chịu phun muối lên tới 1000h+.",
      cta: "TÌM HIỂU DỊCH VỤ MẠ KẼM",
    },
    {
      icon: "construction",
      code: "SRV-02",
      title: "Dịch Vụ Mạ Crom Cứng Chống Mài Mòn",
      description:
        "Gia tăng độ cứng trục cán, ty ben xi-lanh thủy lực lên tới 68 HRC (1000 HV), bề mặt bóng gương siêu chịu lực và chống trầy xước ăn mòn cực đoan.",
      cta: "TÌM HIỂU DỊCH VỤ MẠ CROM",
    },
    {
      icon: "layers",
      code: "SRV-03",
      title: "Dịch Vụ Anodizing Nhôm Kỹ Thuật Số",
      description:
        "Oxy hóa anod cứng chuẩn quân sự Type III (MIL-A-8625), cách điện bề mặt, kháng nhiệt tuyệt đối cho vỏ hợp kim nhôm thiết bị điện tử và hàng không.",
      cta: "TÌM HIỂU DỊCH VỤ ANODIZE",
    },
  ],
};
