// Bản chụp nội dung tĩnh cũ của website, chỉ dùng cho scripts/seed.ts để nạp dữ liệu ban đầu vào CMS.
// Website đang chạy KHÔNG import file này.
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
      "/images/factory/ma-treo-3.jpg",
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
        "/images/factory/phan-tich-2.jpg",
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
        "/images/factory/ma-treo-2.jpg",
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
        "/images/factory/qc-4.jpg",
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
        "/images/factory/ma-treo-5.jpg",
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
        "/images/factory/ma-quay-4.jpg",
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
        "/images/factory/qc-8.jpg",
      imageAlt: t("articles.5.imageAlt"),
    },
  ];
}
