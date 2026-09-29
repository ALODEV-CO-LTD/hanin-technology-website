import type { useTranslations } from "next-intl";

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

type TinTucTranslator = ReturnType<typeof useTranslations<"TinTuc">>;

export function getNewsCategories(t: TinTucTranslator): NewsCategory[] {
  return [
    { key: "all", label: t("categories.all"), count: 48 },
    { key: "cong-ty", label: t("categories.congTy") },
    { key: "cong-nghe", label: t("categories.congNghe") },
    { key: "san-xuat", label: t("categories.sanXuat") },
    { key: "chat-luong", label: t("categories.chatLuong") },
    { key: "tuyen-dung", label: t("categories.tuyenDung") },
  ];
}

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

export function getFeaturedArticle(t: TinTucTranslator): FeaturedArticle {
  return {
    tag: t("featured.tag"),
    standard: "ISO 4527 & ASTM B733",
    category: t("featured.category"),
    date: t("featured.date"),
    readTime: t("featured.readTime"),
    title: t("featured.title"),
    excerpt: t("featured.excerpt"),
    metrics: [
      { label: t("featured.metrics.0.label"), value: "±0.2 µm", highlight: true },
      { label: t("featured.metrics.1.label"), value: "950-1050 HV" },
      { label: t("featured.metrics.2.label"), value: ">1000 " + t("featured.metrics.2.unit") },
    ],
    location: t("featured.location"),
    liveLabel: t("featured.liveLabel"),
    author: t("featured.author"),
    authorRole: t("featured.authorRole"),
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhX4kXHxNu8E7pwwyDoJN5zcHMhJuVelmrKFBpo1y53IuwSNL71VyhOtk3n4G7nlZbcMb_Z3HXueC2ox7m69XRMz07aEq_jsrcYKwAw5M-8MNfROgneDvt8L9UKfeaDVJgPY2DmnUpyoVmNvwjHz-lDGTmIN4kpp6IVJFqWyLq1IvRO6dk9ySx6InLZvJqZiPvTnESB_Z8aw5Au2qFq3coW7mbmQrOQnFD7sdb4xCiw6ElUKigUDGRQw",
    imageAlt: t("featured.imageAlt"),
  };
}

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

export function getNewsArticles(t: TinTucTranslator): NewsArticle[] {
  return [
    {
      id: "quy-trinh-do-do-day-lop-ma-xrf",
      categoryKey: "chat-luong",
      categoryLabel: t("articles.0.categoryLabel"),
      categoryColorClass: "text-sky-700",
      techBadge: "ISO/IEC 17025",
      date: "12/04/2026",
      readTime: t("articles.0.readTime"),
      title: t("articles.0.title"),
      excerpt: t("articles.0.excerpt"),
      author: t("articles.0.author"),
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC1M9JUtQcU5xkLWgadOanVFBaQ0z3A_r7TxT9VRtU0OzlbzVbTd2z6abGtPqZVeJgzvDCJjoBK_Du5zV-G3vUohrcGdzm5geHGpGYcAJOFaMQQLcAAj-jzWG4E_MCwpZg1BuS4fshXU0Pscd8IRMpGpRIpxYgmBH36M9S7V67dnfRmb1Paxn0itU15uXFwEVVUccm3jhkqXSZkCxz3JXyH8QLHJwz4ThOgJFNbH3I2d7Vzj8OZl8KWvA",
      imageAlt: t("articles.0.imageAlt"),
    },
    {
      id: "van-hanh-he-thong-be-ma-tu-dong-hoa",
      categoryKey: "san-xuat",
      categoryLabel: t("articles.1.categoryLabel"),
      categoryColorClass: "text-orange-600",
      techBadge: "SCADA AUTOMATION",
      date: "05/04/2026",
      readTime: t("articles.1.readTime"),
      title: t("articles.1.title"),
      excerpt: t("articles.1.excerpt"),
      author: t("articles.1.author"),
      image:
        "https://lh3.googleusercontent.com/aida/AEtjO1XR8eUMfOZGDr9RuE4RnvLp2eOYNn8pDNRpB9ImyJNTx-Pm8AwNNe8bnrvBrZ8kX3MBN5MY7K6vYliPNARqxnlAlGE3i4qI8JZhLH5jFDLAGkdMFT8fLbzccjkMXbfHxvphpNUcGreqCiTLZ19BYACdLybzKQrF2KPaJz0DLt82BxV7T6mZ5rxEhyF1J1ostA-4UolUZfhb_of6m0emNCsdQ5CH4UElbdLhXpIC3UdiOhvgAra1LIkzlttW",
      imageAlt: t("articles.1.imageAlt"),
    },
    {
      id: "hanin-don-tiep-phai-doan-b2b",
      categoryKey: "cong-ty",
      categoryLabel: t("articles.2.categoryLabel"),
      categoryColorClass: "text-slate-900",
      techBadge: "B2B GLOBAL PARTNERS",
      date: "28/03/2026",
      readTime: t("articles.2.readTime"),
      title: t("articles.2.title"),
      excerpt: t("articles.2.excerpt"),
      author: t("articles.2.author"),
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCJOnGyoftM7RjZ3HMHWs9k5mYNzlrmClmrCp3s7-XxBvoBGkX38TieBXeNLad7EjHIrW9LCjJ8q5M8NzpqqASIt698uAFNofC650cNGFVBUpvGPH9CPkxA-78rCdKvDZXi-mjL3K7ner-V3hPGTLuvp_ktXSiq80l1e_7xRfuACgkCIAMGzo6HRdCNOzUClpLJuNxqQmrvpgXfzfIvly9HC2YFSciJxuTnPgOq1eHLkdZs4eUM0ckEMA",
      imageAlt: t("articles.2.imageAlt"),
    },
    {
      id: "xu-ly-be-mat-nhom-anodizing-cung",
      categoryKey: "cong-nghe",
      categoryLabel: t("articles.3.categoryLabel"),
      categoryColorClass: "text-orange-600",
      techBadge: "MIL-A-8625 TYPE III",
      date: "19/03/2026",
      readTime: t("articles.3.readTime"),
      title: t("articles.3.title"),
      excerpt: t("articles.3.excerpt"),
      author: t("articles.3.author"),
      image:
        "https://lh3.googleusercontent.com/aida/AEtjO1UWgJo5W-iy1qtI0hDXNtB154nO9InICMRHEzKu0z9JWnaUURnoQjUEKpfvzzp6aq96abusNRx-lvMHrNYSleAl-P-qUOQJEvrLPIlpyTGDgQI__Gh8TMmEUa_qipHu-I6CDHjW5JgHiOdMw94NkUEVnHJOsHQT8fGbCv5G_QAyICO8zvyLIsDCIjEbhrHzhPT8byXODSUc5Flo2FWUUFYdROC92Urw0I5aHl1LcoP1O0J6C24x8AmISc0X",
      imageAlt: t("articles.3.imageAlt"),
    },
    {
      id: "khu-hydro-sau-ma-bulong-cuong-do-cao",
      categoryKey: "san-xuat",
      categoryLabel: t("articles.4.categoryLabel"),
      categoryColorClass: "text-orange-600",
      techBadge: "HEAT TREATMENT",
      date: "10/03/2026",
      readTime: t("articles.4.readTime"),
      title: t("articles.4.title"),
      excerpt: t("articles.4.excerpt"),
      author: t("articles.4.author"),
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDcGz7L8SFD4wLIvy9QIhixH61k79i8D1Ut_tZaBq0UoC4ignRfCPeeIDakoVrgPTrAbO8xkOhqnc_peEwxckN-LkcCvF-iL4thFnoFdWZrYEAu7uTCqymVZEPrQlC1bzyjIhHK9kPy1h--9F2sPhA6zJqRAhNSIXTUFKuRBbq9lG45DNbmLKgAvT_dNomDITEOEYRw3jOHpFpdvd6Tm2wvz3FJMbnMMfN6VfxV7EcR5gHhkwn5ny8jUA",
      imageAlt: t("articles.4.imageAlt"),
    },
    {
      id: "dao-tao-ky-su-cong-nghe-ma-luyen-kim",
      categoryKey: "tuyen-dung",
      categoryLabel: t("articles.5.categoryLabel"),
      categoryColorClass: "text-slate-500",
      techBadge: "CAREERS & TRAINING",
      date: "02/03/2026",
      readTime: t("articles.5.readTime"),
      title: t("articles.5.title"),
      excerpt: t("articles.5.excerpt"),
      author: t("articles.5.author"),
      image:
        "https://lh3.googleusercontent.com/aida/AEtjO1UdfdaLwzP9XT5-60YQ9es599eNzAIX42SVyS3CXlSkHdfsMQ_KxNw4ASCcInuyFSpXEaL09lizAAveA8Yrp0AZZnAiHNN1WsSzx_9DlYmx5QOXPwyXusZlvwAPzm11neNuQwz3-PAx42bEQ9gWwQkcEmt4lDP_5KZ8qzOKw3UlABf6WxO2wSS0kANb1gSqd1_XfUIjGOOuxssWwVEvBiGJeiGo22PQjEddnQQqbNCY8iVG825PbnmVm32b",
      imageAlt: t("articles.5.imageAlt"),
    },
  ];
}
