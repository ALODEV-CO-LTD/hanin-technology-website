/** Nhãn tiếng Việt cho trang "Nội dung trang": gom nhóm văn bản theo trang lớn → khối (trang nhỏ) → từng ô. */

/** Trang lớn → các nhóm văn bản (namespace) thuộc trang đó. */
export const CONTENT_PAGES: { id: string; label: string; path: string; namespaces: string[] }[] = [
  { id: "home", label: "Trang chủ", path: "/", namespaces: ["Home", "HomeAbout", "HomeServices", "HomeProducts", "HomeZones", "HomeTrust", "HomeContact"] },
  { id: "gioi-thieu", label: "Giới thiệu", path: "/gioi-thieu", namespaces: ["GioiThieu"] },
  { id: "dich-vu", label: "Dịch vụ gia công mạ", path: "/dich-vu-gia-cong-ma", namespaces: ["DichVu"] },
  { id: "san-pham", label: "Sản phẩm & Dự án", path: "/san-pham-du-an", namespaces: ["SanPham"] },
  { id: "nang-luc", label: "Năng lực sản xuất", path: "/nang-luc-san-xuat", namespaces: ["NangLuc", "QuyTrinh"] },
  { id: "tin-tuc", label: "Tin tức", path: "/tin-tuc", namespaces: ["TinTuc"] },
  { id: "tuyen-dung", label: "Tuyển dụng", path: "/tuyen-dung", namespaces: ["TuyenDung"] },
  { id: "lien-he", label: "Liên hệ", path: "/lien-he", namespaces: ["LienHe"] },
  { id: "chung", label: "Menu, chân trang, dùng chung", path: "/", namespaces: ["Nav", "LanguageSwitcher", "Footer", "Common", "AttachField", "StickyContact"] },
  { id: "phap-ly", label: "Chính sách & Điều khoản", path: "/chinh-sach-bao-mat", namespaces: ["Legal"] },
  { id: "seo", label: "Tiêu đề & mô tả SEO", path: "/", namespaces: ["Meta"] },
];

export const pageOfNamespace = (ns: string) => CONTENT_PAGES.find((p) => p.namespaces.includes(ns))?.id ?? "chung";

/** Tên khối theo "<Nhóm>.<Khối>". Không có ở đây thì hiển thị tên gốc tách chữ. */
export const SECTION_LABELS: Record<string, string> = {
  Nav: "Menu điều hướng",
  LanguageSwitcher: "Chọn ngôn ngữ",
  Footer: "Chân trang",
  "Footer.companyLinks": "Chân trang › Liên kết công ty",
  "Footer.serviceLinks": "Chân trang › Liên kết dịch vụ",
  Common: "Văn bản chung",
  AttachField: "Ô đính kèm tệp",
  StickyContact: "Nút liên hệ nổi",
  "Home.CompanySnapshot": "Dải số liệu công ty",
  "Home.Hero": "Banner đầu trang",
  "Home.AboutHanin": "Giới thiệu HANIN",
  "Home.PlatingServices": "Dịch vụ mạ",
  "Home.ManufacturingCapability": "Năng lực sản xuất",
  "Home.FactoryShowcase": "Trưng bày nhà máy",
  "Home.ProductsProjects": "Sản phẩm và dự án",
  "Home.QualityCertification": "Chất lượng và chứng nhận",
  "Home.NewsUpdates": "Tin tức mới",
  "Home.RecruitmentBanner": "Banner tuyển dụng",
  "Home.FinalCta": "Kêu gọi hành động cuối trang",
  HomeAbout: "Giới thiệu HANIN (phần mở đầu)",
  "HomeAbout.stats": "Giới thiệu › Số liệu",
  "HomeAbout.milestones": "Giới thiệu › Cột mốc",
  HomeServices: "Dịch vụ (tiêu đề khối)",
  "HomeServices.pillars": "Dịch vụ › Các thẻ dịch vụ",
  HomeProducts: "Sản phẩm (tiêu đề khối)",
  "HomeProducts.badges": "Sản phẩm › Nhãn",
  "HomeZones.zones": "Các khu vực nhà máy",
  HomeZones: "Khu vực nhà máy (tiêu đề khối)",
  "HomeTrust.iso": "Chứng nhận ISO",
  "HomeTrust.clients": "Khách hàng tin tưởng",
  "HomeContact.Direct": "Liên hệ trực tiếp",
  "HomeContact.Social": "Mạng xã hội",
  "GioiThieu.IntroHero": "Banner đầu trang",
  "GioiThieu.CompanyIntroduction": "Giới thiệu công ty",
  "GioiThieu.CompanyJourney": "Hành trình phát triển",
  "GioiThieu.ContactCta": "Kêu gọi liên hệ",
  "GioiThieu.CoreStrengths": "Năng lực sản xuất và kiểm tra",
  "GioiThieu.DevelopmentDirection": "Nguyên tắc làm việc",
  "GioiThieu.FactoryOverview": "Tổng quan nhà máy",
  "GioiThieu.ProfileDownloadCta": "Tải hồ sơ năng lực",
  "GioiThieu.QualityStandardsPreview": "Tiêu chuẩn chất lượng",
  "GioiThieu.CapabilitySnapshot": "Số liệu năng lực",
  "GioiThieu.FeaturedClients": "Khách hàng tiêu biểu",
  "DichVu.ServiceCategories": "Các nhóm dịch vụ",
  "DichVu.RelatedServices": "Dịch vụ liên quan",
  "DichVu.CapacityOverview": "Dây chuyền và hệ thống mạ",
  "DichVu.CategoryHero": "Banner trang dịch vụ",
  "DichVu.DetailHero": "Chi tiết dịch vụ › Banner đầu trang",
  "DichVu.DetailOverview": "Chi tiết dịch vụ › Tổng quan",
  "DichVu.DetailProcess": "Chi tiết dịch vụ › Quy trình (mẫu chung)",
  "DichVu.DetailCapability": "Chi tiết dịch vụ › Năng lực",
  "DichVu.DetailApplications": "Chi tiết dịch vụ › Sản phẩm ứng dụng",
  "DichVu.DetailQaTable": "Chi tiết dịch vụ › Bảng kiểm tra chất lượng",
  "DichVu.DetailGallery": "Chi tiết dịch vụ › Thư viện ảnh",
  "DichVu.RfqFormDetail": "Chi tiết dịch vụ › Biểu mẫu báo giá",
  "DichVu.ProcessFlow": "Các công đoạn gia công mạ",
  "DichVu.QualityMetrology": "Chất lượng và đo lường",
  "DichVu.RfqFormCategory": "Biểu mẫu báo giá (trang dịch vụ)",
  DichVu: "Văn bản chung trang dịch vụ",
  "DichVu.HeroSummary": "Tóm tắt banner",
  "SanPham.CategoryHero": "Banner trang sản phẩm",
  "SanPham.FeaturedProjectSpotlight": "Dự án tiêu biểu",
  "SanPham.ProductBreadcrumbBar": "Đường dẫn trang sản phẩm",
  "SanPham.ProductCatalog": "Danh mục sản phẩm",
  "SanPham.ProductGallery": "Thư viện ảnh sản phẩm",
  "SanPham.ProductHero": "Banner chi tiết sản phẩm",
  "SanPham.ProductOverview": "Tổng quan sản phẩm",
  "SanPham.ProductProcessTimeline": "Quy trình sản phẩm",
  "SanPham.ProductQuoteCta": "Kêu gọi báo giá sản phẩm",
  "SanPham.ProductsCta": "Kêu gọi cuối trang",
  "SanPham.RelatedProjects": "Dự án liên quan",
  "SanPham.RelatedServices": "Dịch vụ liên quan",
  "SanPham.SpecTrustNote": "Ghi chú thông số",
  "SanPham.categoryTabs": "Thẻ lọc danh mục",
  "SanPham.detail": "Chi tiết sản phẩm (mẫu chung)",
  "NangLuc.AutomatedVsManual": "Tự động và thủ công",
  "NangLuc.CapabilityHero": "Banner đầu trang",
  "NangLuc.CapabilityOverviewStats": "Số liệu năng lực",
  "NangLuc.CompanyProfileCta": "Tải hồ sơ năng lực",
  "NangLuc.EquipmentGrid": "Thiết bị",
  "NangLuc.FactoryGallery": "Ảnh nhà máy",
  "NangLuc.FactoryOverview": "Tổng quan nhà máy",
  "NangLuc.NangLucFinalCta": "Kêu gọi hành động cuối trang",
  "NangLuc.ProductionFlow": "Quy trình sản xuất 6 bước",
  "NangLuc.ProductionLines": "Dây chuyền sản xuất",
  "NangLuc.QualityStandards": "Chứng nhận, môi trường và kiểm tra",
  "NangLuc.TestingAnalysis": "Kiểm tra và phân tích",
  QuyTrinh: "Quy trình công đoạn (văn bản chung)",
  "QuyTrinh.howTo": "Quy trình › Hướng dẫn xem",
  "QuyTrinh.stages": "Quy trình › Giai đoạn",
  "QuyTrinh.families": "Quy trình › Họ dây chuyền",
  "QuyTrinh.processes": "Quy trình › Từng quy trình",
  "QuyTrinh.steps": "Quy trình › Từng bước",
  "TinTuc.FeaturedArticle": "Bài viết nổi bật",
  "TinTuc.NewsBreadcrumb": "Đường dẫn trang",
  "TinTuc.NewsFilterBar": "Thanh lọc",
  "TinTuc.NewsGrid": "Lưới bài viết",
  "TinTuc.NewsInquiryCta": "Kêu gọi liên hệ",
  "TinTuc.NewsIntro": "Giới thiệu đầu trang",
  "TinTuc.NewsPagination": "Phân trang",
  "TinTuc.categories": "Tên chuyên mục",
  "TinTuc.PostDetail": "Chi tiết bài viết",
  "LienHe.BottomCta": "Kêu gọi hành động cuối trang",
  "LienHe.ContactChannels": "Kênh liên hệ",
  "LienHe.ContactFaq": "Câu hỏi thường gặp",
  "LienHe.ContactHero": "Banner đầu trang",
  "LienHe.DirectChannels": "Liên hệ trực tiếp",
  "LienHe.LocationMap": "Bản đồ và địa chỉ",
  "LienHe.RfqForm": "Biểu mẫu yêu cầu báo giá",
  "TuyenDung.PageHero": "Banner đầu trang",
  "TuyenDung.WhyHanin": "Làm việc tại HANIN",
  "TuyenDung.JobBoard": "Danh sách vị trí tuyển dụng",
  "TuyenDung.WorkEnvironment": "Môi trường làm việc",
  "TuyenDung.ApplicationCta": "Gửi hồ sơ ứng tuyển",
  "TuyenDung.departmentOptions": "Tuỳ chọn phòng ban",
  "TuyenDung.typeOptions": "Tuỳ chọn loại hình",
  "TuyenDung.locationOptions": "Tuỳ chọn địa điểm",
  "Legal.privacy": "Chính sách bảo mật",
  "Legal.terms": "Điều khoản dịch vụ",
  "Legal.operator": "Đơn vị vận hành",
  "Meta.site": "SEO › Toàn website",
  "Meta.home": "SEO › Trang chủ",
  "Meta.gioiThieu": "SEO › Giới thiệu",
  "Meta.dichVu": "SEO › Dịch vụ",
  "Meta.sanPham": "SEO › Sản phẩm",
  "Meta.nangLuc": "SEO › Năng lực",
  "Meta.tinTuc": "SEO › Tin tức",
  "Meta.tuyenDung": "SEO › Tuyển dụng",
  "Meta.lienHe": "SEO › Liên hệ",
  "Meta.chinhSachBaoMat": "SEO › Chính sách bảo mật",
  "Meta.dieuKhoan": "SEO › Điều khoản",
};

/** Tên từng ô theo đoạn cuối của khoá. */
export const FIELD_LABELS: Record<string, string> = {
  title: "Tiêu đề",
  heading: "Tiêu đề khối",
  subtitle: "Phụ đề",
  subheading: "Phụ đề",
  desc: "Mô tả",
  description: "Mô tả",
  body: "Nội dung",
  text: "Nội dung",
  eyebrow: "Nhãn nhỏ phía trên",
  badge: "Nhãn",
  label: "Nhãn",
  value: "Giá trị",
  note: "Ghi chú",
  imageAlt: "Mô tả ảnh (alt)",
  alt: "Mô tả ảnh (alt)",
  cta: "Nút bấm",
  ctaPrimary: "Nút chính",
  ctaSecondary: "Nút phụ",
  placeholder: "Gợi ý trong ô nhập",
  submit: "Nút gửi",
  name: "Tên",
  phone: "Số điện thoại",
  email: "Email",
  address: "Địa chỉ",
  hotline: "Hotline",
  suffix: "Hậu tố số liệu",
  end: "Số liệu",
  stepLabel: "Chữ “Bước”",
  breadcrumbHome: "Đường dẫn: Trang chủ",
  breadcrumbCurrent: "Đường dẫn: trang hiện tại",
  metricLabel: "Nhãn chỉ số",
  metricValue: "Giá trị chỉ số",
};

const WORDS: Record<string, string> = {
  title: "tiêu đề", desc: "mô tả", description: "mô tả", label: "nhãn", value: "giá trị", badge: "nhãn", scale: "quy mô", area: "diện tích",
  strong: "in đậm", rest: "phần còn lại", paragraph: "đoạn", image: "ảnh", alt: "mô tả ảnh", cta: "nút", button: "nút", link: "liên kết",
  heading: "tiêu đề khối", subtitle: "phụ đề", eyebrow: "nhãn nhỏ", note: "ghi chú", placeholder: "gợi ý", phone: "điện thoại", address: "địa chỉ",
  name: "tên", text: "chữ", unit: "đơn vị", stat: "chỉ số", step: "bước", field: "lĩnh vực", audience: "đối tượng", location: "vị trí", metric: "chỉ số",
  primary: "chính", secondary: "phụ", home: "trang chủ", current: "trang hiện tại", breadcrumb: "đường dẫn", email: "email", hotline: "hotline",
  intro: "giới thiệu", summary: "tóm tắt", body: "nội dung", content: "nội dung", caption: "chú thích", tag: "thẻ", tab: "thẻ", filter: "lọc",
  search: "tìm kiếm", submit: "gửi", cancel: "huỷ", next: "sau", prev: "trước", previous: "trước", all: "tất cả", more: "xem thêm", read: "đọc",
  top: "trên", bottom: "dưới", left: "trái", right: "phải", first: "đầu", last: "cuối", main: "chính", sub: "phụ", short: "ngắn", long: "dài",
};

/** Tên ô từ khoá camelCase: dịch từng từ nếu biết hết, nếu không giữ tên gốc tách chữ. */
export function fieldLabel(key: string) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  const words = key.replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s_-]+/);
  const mapped = words.map((w) => (/^\d+$/.test(w) ? w : WORDS[w.toLowerCase()]));
  if (mapped.every(Boolean)) {
    // Tiếng Việt đặt danh từ chính trước: "scale badge" → "nhãn quy mô".
    const head = new Set(["badge", "label", "title", "desc", "description", "button", "link", "note", "caption", "placeholder", "value", "cta"]);
    const lastWord = words[words.length - 1].toLowerCase();
    if (words.length > 1 && head.has(lastWord)) mapped.unshift(mapped.pop() as string);
    const t = mapped.join(" ");
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  return humanizeKey(key);
}

export function humanizeKey(v: string) {
  const t = v.replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Đoạn khoá dạng s1, a2, item3, 0… → "Bước 1", "Ứng dụng 2", "Mục 3". */
export function segmentLabel(v: string) {
  let m = /^s(\d+)$/.exec(v);
  if (m) return `Bước ${m[1]}`;
  m = /^a(\d+)$/.exec(v);
  if (m) return `Ứng dụng ${m[1]}`;
  m = /^(?:item|row|r|c|q|p)(\d+)$/.exec(v);
  if (m) return `Mục ${m[1]}`;
  m = /^stat(\d+)$/i.exec(v);
  if (m) return `Chỉ số ${m[1]}`;
  m = /^col(\d+)$/i.exec(v);
  if (m) return `Cột ${m[1]}`;
  if (/^\d+$/.test(v)) return `Mục ${Number(v) + 1}`;
  return humanizeKey(v);
}

export interface ParsedKey {
  page: string;
  section: string;
  sectionLabel: string;
  sub: string;
  field: string;
}

/** Tách khoá "Nhóm.Khối.[nhóm con.]ô" thành trang lớn / khối / nhóm con / tên ô. */
export function parseContentKey(key: string): ParsedKey {
  const parts = key.split(".");
  const ns = parts[0];
  const page = pageOfNamespace(ns);
  const last = parts[parts.length - 1];
  const field = fieldLabel(last);
  if (parts.length <= 2) {
    return { page, section: ns, sectionLabel: SECTION_LABELS[ns] ?? humanizeKey(ns), sub: "", field };
  }
  // Nội dung riêng từng dịch vụ: DichVu.ServiceDetail.<slug>.<Khối>... → khối = dịch vụ, nhóm con = khối con.
  if (ns === "DichVu" && parts[1] === "ServiceDetail" && parts.length >= 5) {
    const slug = parts[2];
    const comp = parts[3];
    const rest = parts.slice(4, -1);
    return {
      page,
      section: `${ns}.ServiceDetail.${slug}`,
      sectionLabel: `Nội dung riêng › ${humanizeKey(slug)}`,
      sub: [SECTION_LABELS[`DichVu.${comp}`]?.replace(/^Chi tiết dịch vụ › /, "") ?? humanizeKey(comp), ...rest.map(segmentLabel)].join(" › "),
      field,
    };
  }
  const section = `${ns}.${parts[1]}`;
  const rest = parts.slice(2, -1);
  return {
    page,
    section,
    sectionLabel: SECTION_LABELS[section] ?? humanizeKey(parts[1]),
    sub: rest.map(segmentLabel).join(" › "),
    field,
  };
}
