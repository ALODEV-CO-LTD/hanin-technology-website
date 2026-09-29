export type NewsCategoryKey =
  | "all"
  | "cong-ty"
  | "cong-nghe"
  | "san-xuat"
  | "chat-luong"
  | "tuyen-dung";

export interface NewsCategory {
  key: NewsCategoryKey;
  label: string;
  count?: number;
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  { key: "all", label: "Tất cả", count: 48 },
  { key: "cong-ty", label: "Công ty" },
  { key: "cong-nghe", label: "Công nghệ" },
  { key: "san-xuat", label: "Sản xuất" },
  { key: "chat-luong", label: "Chất lượng" },
  { key: "tuyen-dung", label: "Tuyển dụng" },
];

export interface FeaturedArticle {
  tag: string;
  standard: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  location: string;
  liveLabel: string;
  author: string;
  authorRole: string;
  image: string;
  imageAlt: string;
}

export const FEATURED_ARTICLE: FeaturedArticle = {
  tag: "TIÊU ĐIỂM // CÔNG NGHỆ MẠ",
  standard: "ISO 4527 & ASTM B733",
  category: "CÔNG NGHỆ",
  date: "18 Tháng 4, 2026",
  readTime: "5 phút đọc",
  title:
    "Ứng Dụng Công Nghệ Mạ Niken Hóa Học (ENP) Trong Chế Tạo Linh Kiện Bánh Răng & Robot Công Nghiệp Tải Trọng Cao",
  excerpt:
    "Phân tích giải pháp kiểm soát độ dày màng mạ đồng nhất trong rãnh ren sâu với dung sai ngặt nghèo ±0.2 µm, tối ưu khả năng chống mài mòn và loại bỏ hiện tượng giòn hydro theo tiêu chuẩn ASTM B733.",
  metrics: [
    { label: "Dung sai độ dày", value: "±0.2 µm", highlight: true },
    { label: "Độ cứng Vickers", value: "950-1050 HV" },
    { label: "Thử nghiệm muối", value: ">1000 Giờ" },
  ],
  location: "Dây chuyền mạ tự động Line 4 // KCN Quang Minh",
  liveLabel: "Phòng R&D HANIN",
  author: "Ban Kỹ thuật R&D",
  authorRole: "Hanin Technology VN",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAhX4kXHxNu8E7pwwyDoJN5zcHMhJuVelmrKFBpo1y53IuwSNL71VyhOtk3n4G7nlZbcMb_Z3HXueC2ox7m69XRMz07aEq_jsrcYKwAw5M-8MNfROgneDvt8L9UKfeaDVJgPY2DmnUpyoVmNvwjHz-lDGTmIN4kpp6IVJFqWyLq1IvRO6dk9ySx6InLZvJqZiPvTnESB_Z8aw5Au2qFq3coW7mbmQrOQnFD7sdb4xCiw6ElUKigUDGRQw",
  imageAlt:
    "Dây chuyền mạ điện tự động hóa trong nhà máy hiện đại, bể hóa chất ánh xanh ngọc, cẩu trục robot nâng hạ chi tiết khung gầm ô tô (ảnh minh họa)",
};

export interface NewsArticle {
  id: string;
  categoryKey: NewsCategoryKey;
  categoryLabel: string;
  categoryColorClass: string;
  techBadge: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  image: string;
  imageAlt: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "quy-trinh-do-do-day-lop-ma-xrf",
    categoryKey: "chat-luong",
    categoryLabel: "CHẤT LƯỢNG",
    categoryColorClass: "text-sky-700",
    techBadge: "ISO/IEC 17025",
    date: "12/04/2026",
    readTime: "4 phút đọc",
    title:
      "Quy Trình Đo Độ Dày Lớp Mạ Bằng Quang Phổ Huỳnh Quang Tia X (XRF) Đạt Tiêu Chuẩn ISO/IEC 17025",
    excerpt:
      "Kỹ thuật phân tích không phá hủy (NDT) hỗ trợ xác định chính xác độ dày và tỷ lệ phần trăm hợp kim niken-phốt pho trên phôi phức tạp với sai số dưới 0.05 µm.",
    author: "R&D QA Team",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1M9JUtQcU5xkLWgadOanVFBaQ0z3A_r7TxT9VRtU0OzlbzVbTd2z6abGtPqZVeJgzvDCJjoBK_Du5zV-G3vUohrcGdzm5geHGpGYcAJOFaMQQLcAAj-jzWG4E_MCwpZg1BuS4fshXU0Pscd8IRMpGpRIpxYgmBH36M9S7V67dnfRmb1Paxn0itU15uXFwEVVUccm3jhkqXSZkCxz3JXyH8QLHJwz4ThOgJFNbH3I2d7Vzj8OZl8KWvA",
    imageAlt:
      "Thước cặp điện tử đo bánh răng vi cơ khí có độ chính xác cao, chi tiết thép gia công đặt trên bàn kiểm định trong phòng thí nghiệm chất lượng (ảnh minh họa)",
  },
  {
    id: "van-hanh-he-thong-be-ma-tu-dong-hoa",
    categoryKey: "san-xuat",
    categoryLabel: "SẢN XUẤT",
    categoryColorClass: "text-orange-600",
    techBadge: "SCADA AUTOMATION",
    date: "05/04/2026",
    readTime: "6 phút đọc",
    title:
      "Vận Hành Hệ Thống Bể Mạ Kẽm - Niken Tự Động Hóa PLC Giảm Thiểu 40% Thời Gian Chu Kỳ Tại KCN Quang Minh",
    excerpt:
      "Cải tiến đồng bộ dây chuyền xử lý bề mặt bằng cánh tay robot hành trình kép, tự động cân bằng nồng độ bể điện phân và kiểm soát dòng điện xung kỹ thuật số.",
    author: "Phòng Vận Hành",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1XR8eUMfOZGDr9RuE4RnvLp2eOYNn8pDNRpB9ImyJNTx-Pm8AwNNe8bnrvBrZ8kX3MBN5MY7K6vYliPNARqxnlAlGE3i4qI8JZhLH5jFDLAGkdMFT8fLbzccjkMXbfHxvphpNUcGreqCiTLZ19BYACdLybzKQrF2KPaJz0DLt82BxV7T6mZ5rxEhyF1J1ostA-4UolUZfhb_of6m0emNCsdQ5CH4UElbdLhXpIC3UdiOhvgAra1LIkzlttW",
    imageAlt:
      "Bể mạ kẽm-niken tự động hóa PLC tại dây chuyền sản xuất công nghiệp (ảnh minh họa)",
  },
  {
    id: "hanin-don-tiep-phai-doan-b2b",
    categoryKey: "cong-ty",
    categoryLabel: "CÔNG TY",
    categoryColorClass: "text-slate-900",
    techBadge: "B2B GLOBAL PARTNERS",
    date: "28/03/2026",
    readTime: "3 phút đọc",
    title:
      "HANIN Đón Tiếp Phái Đoàn Doanh Nghiệp Chế Tạo B2B Nhật Bản & Hàn Quốc Thăm Quan Cơ Sở Sản Xuất",
    excerpt:
      "Đánh giá năng lực chuỗi cung ứng linh kiện ô tô và thiết bị bán dẫn, củng cố cam kết xuất khẩu các giải pháp mạ niken và xi mạ điện phân đạt chuẩn ASTM quốc tế.",
    author: "Ban Đối Ngoại",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJOnGyoftM7RjZ3HMHWs9k5mYNzlrmClmrCp3s7-XxBvoBGkX38TieBXeNLad7EjHIrW9LCjJ8q5M8NzpqqASIt698uAFNofC650cNGFVBUpvGPH9CPkxA-78rCdKvDZXi-mjL3K7ner-V3hPGTLuvp_ktXSiq80l1e_7xRfuACgkCIAMGzo6HRdCNOzUClpLJuNxqQmrvpgXfzfIvly9HC2YFSciJxuTnPgOq1eHLkdZs4eUM0ckEMA",
    imageAlt:
      "Mặt tiền kính hiện đại của trụ sở Hanin Technology tại Việt Nam, khách tham quan doanh nghiệp B2B (ảnh minh họa)",
  },
  {
    id: "xu-ly-be-mat-nhom-anodizing-cung",
    categoryKey: "cong-nghe",
    categoryLabel: "CÔNG NGHỆ",
    categoryColorClass: "text-orange-600",
    techBadge: "MIL-A-8625 TYPE III",
    date: "19/03/2026",
    readTime: "7 phút đọc",
    title:
      "Xử Lý Bề Mặt Nhôm Bằng Công Nghệ Anodizing Cứng Type III Chuẩn Quân Sự Phục Vụ Thiết Bị Hàng Không",
    excerpt:
      "Kỹ thuật điện phân nhiệt độ âm tạo lớp oxide nhôm có độ cứng trên 65 HRC, khả năng cách điện cao và chống chịu môi trường sương muối biển khắc nghiệt.",
    author: "R&D Lab Tech",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1UWgJo5W-iy1qtI0hDXNtB154nO9InICMRHEzKu0z9JWnaUURnoQjUEKpfvzzp6aq96abusNRx-lvMHrNYSleAl-P-qUOQJEvrLPIlpyTGDgQI__Gh8TMmEUa_qipHu-I6CDHjW5JgHiOdMw94NkUEVnHJOsHQT8fGbCv5G_QAyICO8zvyLIsDCIjEbhrHzhPT8byXODSUc5Flo2FWUUFYdROC92Urw0I5aHl1LcoP1O0J6C24x8AmISc0X",
    imageAlt:
      "Công nghệ anodizing cứng xử lý bề mặt nhôm cho linh kiện hàng không (ảnh minh họa)",
  },
  {
    id: "khu-hydro-sau-ma-bulong-cuong-do-cao",
    categoryKey: "san-xuat",
    categoryLabel: "SẢN XUẤT",
    categoryColorClass: "text-orange-600",
    techBadge: "HEAT TREATMENT",
    date: "10/03/2026",
    readTime: "5 phút đọc",
    title:
      "Giải Pháp Khử Hydro Sau Mạ (De-Embrittlement) Đảm Bảo Độ Bền Mỏi Cho Bu-lông Cường Độ Cao",
    excerpt:
      "Gia nhiệt cưỡng bức trong lò ủ kín kiểm soát nhiệt độ nghiêm ngặt ở 200°C ± 5°C liên tục 4-24 giờ nhằm ngăn ngừa triệt để sự gãy nứt giòn do hydro xâm nhập.",
    author: "Bộ Phận Xử Lý Nhiệt",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcGz7L8SFD4wLIvy9QIhixH61k79i8D1Ut_tZaBq0UoC4ignRfCPeeIDakoVrgPTrAbO8xkOhqnc_peEwxckN-LkcCvF-iL4thFnoFdWZrYEAu7uTCqymVZEPrQlC1bzyjIhHK9kPy1h--9F2sPhA6zJqRAhNSIXTUFKuRBbq9lG45DNbmLKgAvT_dNomDITEOEYRw3jOHpFpdvd6Tm2wvz3FJMbnMMfN6VfxV7EcR5gHhkwn5ny8jUA",
    imageAlt:
      "Kỹ thuật viên nữ mặc đồ bảo hộ kiểm tra chi tiết mạ điện phân treo trên bể hóa chất trong nhà máy (ảnh minh họa)",
  },
  {
    id: "dao-tao-ky-su-cong-nghe-ma-luyen-kim",
    categoryKey: "tuyen-dung",
    categoryLabel: "TUYỂN DỤNG",
    categoryColorClass: "text-slate-500",
    techBadge: "CAREERS & TRAINING",
    date: "02/03/2026",
    readTime: "3 phút đọc",
    title:
      "Chương Trình Đào Tạo Kỹ Sư Công Nghệ Mạ & Luyện Kim Trẻ Khóa Q2/2026 Tại Nhà Máy HANIN",
    excerpt:
      "Cơ hội tiếp cận phòng thí nghiệm hiện đại, học hỏi từ chuyên gia hàng đầu về mạ điện phân chính xác cao và lộ trình phát triển kỹ sư phụ trách dây chuyền.",
    author: "Phòng Nhân Sự HR",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1UdfdaLwzP9XT5-60YQ9es599eNzAIX42SVyS3CXlSkHdfsMQ_KxNw4ASCcInuyFSpXEaL09lizAAveA8Yrp0AZZnAiHNN1WsSzx_9DlYmx5QOXPwyXusZlvwAPzm11neNuQwz3-PAx42bEQ9gWwQkcEmt4lDP_5KZ8qzOKw3UlABf6WxO2wSS0kANb1gSqd1_XfUIjGOOuxssWwVEvBiGJeiGo22PQjEddnQQqbNCY8iVG825PbnmVm32b",
    imageAlt:
      "Chương trình đào tạo kỹ sư trẻ ngành công nghệ mạ và luyện kim tại nhà máy HANIN (ảnh minh họa)",
  },
];
