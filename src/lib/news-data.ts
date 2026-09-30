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

type Translate = (key: string) => string;

export function getNewsCategories(t: Translate): NewsCategory[] {
  return [
    { key: "all", label: t("categories.all") },
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
  location?: string;
  liveLabel?: string;
  author: string;
  authorRole: string;
  image: string;
  imageAlt: string;
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
