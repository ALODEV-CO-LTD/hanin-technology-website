/**
 * Lớp đọc dữ liệu CMS cho website công khai (Server Components).
 * Trả về đúng các kiểu đã dùng trong src/lib/*-data.ts để component ít phải đổi.
 */
import { all, get } from "./db";
import { parseI18n, pick } from "./i18n";
import type { PlatingService } from "@/lib/services-data";
import type { Product, ProductCategory } from "@/lib/products-data";
import type { FeaturedArticle, NewsArticle, NewsCategoryKey } from "@/lib/news-data";
import type { Job, JobDepartment, JobLocation, JobType } from "@/lib/jobs-data";

export type Translate = (key: string) => string;
type Row = Record<string, unknown>;

const str = (v: unknown) => String(v ?? "");
const list = (v: unknown): Row[] => {
  try {
    const parsed = JSON.parse(str(v) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const INTL_LOCALE: Record<string, string> = { vi: "vi-VN", zh: "zh-CN", ko: "ko-KR" };

export function formatDate(iso: string, locale: string, style: "short" | "long" = "short"): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(INTL_LOCALE[locale] ?? "vi-VN", {
    timeZone: "UTC",
    year: "numeric",
    month: style === "long" ? "long" : "2-digit",
    day: style === "long" ? "numeric" : "2-digit",
  }).format(date);
}

/* ---------- Banner ---------- */

export interface BannerData {
  image: string;
  alt: string;
  link: string;
}

export function getBanner(placement: string, locale: string, fallbackImage = ""): BannerData {
  const row = get<Row>(
    "SELECT image, image_alt, link FROM banners WHERE placement = ? AND active = 1 AND image != '' ORDER BY sort ASC, id ASC LIMIT 1",
    placement,
  );
  if (!row) return { image: fallbackImage, alt: "", link: "" };
  return { image: str(row.image), alt: pick(parseI18n(row.image_alt), locale), link: str(row.link) };
}

/* ---------- Dịch vụ ---------- */

function toService(row: Row, locale: string): PlatingService {
  const badge = pick(parseI18n(row.badge), locale);
  return {
    slug: str(row.slug),
    code: str(row.code),
    badge: badge || undefined,
    title: pick(parseI18n(row.title), locale),
    titleEn: str(row.title_en),
    description: pick(parseI18n(row.description), locale),
    applicationLabel: pick(parseI18n(row.application_label), locale),
    applicationText: pick(parseI18n(row.application_text), locale),
    statLabel: pick(parseI18n(row.stat_label), locale),
    image: str(row.image),
    imageAlt: pick(parseI18n(row.image_alt), locale),
  };
}

export function getServices(locale: string, limit?: number): PlatingService[] {
  const rows = all("SELECT * FROM services WHERE active = 1 ORDER BY sort ASC, id ASC" + (limit ? ` LIMIT ${Math.trunc(limit)}` : ""));
  return rows.map((r) => toService(r, locale));
}

export function getServiceBySlug(slug: string, locale: string): PlatingService | undefined {
  const row = get("SELECT * FROM services WHERE slug = ? AND active = 1", slug);
  return row ? toService(row, locale) : undefined;
}

export function getRelatedServices(currentSlug: string, locale: string, limit = 3): PlatingService[] {
  return all("SELECT * FROM services WHERE active = 1 AND slug != ? ORDER BY sort ASC, id ASC LIMIT ?", currentSlug, limit).map((r) => toService(r, locale));
}

/* ---------- Sản phẩm & dự án ---------- */

const CATEGORY_LABEL_KEYS: Record<ProductCategory, string> = {
  "co-khi-chinh-xac": "categoryTabs.coKhiChinhXac",
  "phu-tung-o-to-xe-may": "categoryTabs.phuTungOToXeMay",
  "dau-cosse-thiet-bi-dien": "categoryTabs.dauCosseThietBiDien",
  anodizing: "categoryTabs.anodizing",
  "thuy-luc-khoi-van": "categoryTabs.anodizing",
};

function toProduct(row: Row, locale: string, tSanPham: Translate): Product {
  const category = str(row.category_slug) as ProductCategory;
  return {
    slug: str(row.slug),
    title: pick(parseI18n(row.title), locale),
    category: CATEGORY_LABEL_KEYS[category] ? tSanPham(CATEGORY_LABEL_KEYS[category]) : "",
    categorySlug: category,
    lot: str(row.lot),
    description: pick(parseI18n(row.description), locale),
    image: str(row.image),
    imageAlt: pick(parseI18n(row.image_alt), locale),
    imageBadge: pick(parseI18n(row.image_badge), locale),
    specChips: list(row.spec_chips).map((c) => ({
      label: pick(parseI18n(c.label), locale),
      value: pick(parseI18n(c.value), locale),
    })),
    showInGrid: Boolean(row.show_in_grid),
    featured: Boolean(row.featured),
  };
}

export function getProducts(locale: string, tSanPham: Translate): Product[] {
  return all("SELECT * FROM products WHERE active = 1 ORDER BY sort ASC, id ASC").map((r) => toProduct(r, locale, tSanPham));
}

export function getProductBySlug(slug: string, locale: string, tSanPham: Translate): Product | undefined {
  const row = get("SELECT * FROM products WHERE slug = ? AND active = 1", slug);
  return row ? toProduct(row, locale, tSanPham) : undefined;
}

export function getSpotlightProduct(locale: string, tSanPham: Translate): Product | undefined {
  const row = get("SELECT * FROM products WHERE active = 1 ORDER BY spotlight DESC, sort ASC, id ASC LIMIT 1");
  return row ? toProduct(row, locale, tSanPham) : undefined;
}

export function getProductSlugs(): string[] {
  return all<{ slug: string }>("SELECT slug FROM products WHERE active = 1").map((r) => r.slug);
}

/* ---------- Tin tức ---------- */

const NEWS_COLOR: Record<NewsCategoryKey, string> = {
  all: "text-slate-900",
  "cong-ty": "text-slate-900",
  "cong-nghe": "text-orange-600",
  "san-xuat": "text-orange-600",
  "chat-luong": "text-sky-700",
  "tuyen-dung": "text-slate-500",
};
const NEWS_LABEL_KEY: Record<string, string> = {
  "cong-ty": "categories.congTy",
  "cong-nghe": "categories.congNghe",
  "san-xuat": "categories.sanXuat",
  "chat-luong": "categories.chatLuong",
  "tuyen-dung": "categories.tuyenDung",
};

export interface PostDetail extends NewsArticle {
  body: string;
  isoDate: string;
}

function toPost(row: Row, locale: string, tTinTuc: Translate): PostDetail {
  const key = str(row.category_key) as NewsCategoryKey;
  return {
    id: str(row.slug),
    categoryKey: key,
    categoryLabel: NEWS_LABEL_KEY[key] ? tTinTuc(NEWS_LABEL_KEY[key]) : key,
    categoryColorClass: NEWS_COLOR[key] ?? "text-slate-900",
    techBadge: str(row.tech_badge),
    date: formatDate(str(row.published_at), locale),
    isoDate: str(row.published_at),
    readTime: pick(parseI18n(row.read_time), locale),
    title: pick(parseI18n(row.title), locale),
    excerpt: pick(parseI18n(row.excerpt), locale),
    body: pick(parseI18n(row.body), locale),
    author: pick(parseI18n(row.author), locale),
    image: str(row.image),
    imageAlt: pick(parseI18n(row.image_alt), locale),
  };
}

export function getPosts(locale: string, tTinTuc: Translate, opts: { limit?: number; excludeFeatured?: boolean } = {}): PostDetail[] {
  const where = opts.excludeFeatured ? "AND featured = 0" : "";
  const sql = `SELECT * FROM posts WHERE status = 'published' ${where} ORDER BY published_at DESC, id DESC` + (opts.limit ? ` LIMIT ${Math.trunc(opts.limit)}` : "");
  return all(sql).map((r) => toPost(r, locale, tTinTuc));
}

export function getPostBySlug(slug: string, locale: string, tTinTuc: Translate): PostDetail | undefined {
  const row = get("SELECT * FROM posts WHERE slug = ? AND status = 'published'", slug);
  return row ? toPost(row, locale, tTinTuc) : undefined;
}

export function getPostSlugs(): string[] {
  return all<{ slug: string }>("SELECT slug FROM posts WHERE status = 'published'").map((r) => r.slug);
}

export function getFeaturedPost(locale: string, tTinTuc: Translate): (FeaturedArticle & { slug: string }) | undefined {
  const row = get("SELECT * FROM posts WHERE status = 'published' AND featured = 1 ORDER BY published_at DESC, id DESC LIMIT 1");
  if (!row) return undefined;
  const post = toPost(row, locale, tTinTuc);
  return {
    slug: post.id,
    tag: post.techBadge,
    standard: post.techBadge,
    category: post.categoryLabel,
    date: formatDate(post.isoDate, locale, "long"),
    readTime: post.readTime,
    title: post.title,
    excerpt: post.excerpt,
    metrics: list(row.metrics).map((m, i) => ({
      label: pick(parseI18n(m.label), locale),
      value: pick(parseI18n(m.value), locale),
      highlight: i === 0,
    })),
    location: "",
    liveLabel: "",
    author: post.author,
    authorRole: pick(parseI18n(row.author_role), locale),
    image: post.image,
    imageAlt: post.imageAlt,
  };
}

/** Đếm bài đã đăng theo chuyên mục (dùng cho thanh lọc). */
export function getPostCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  let total = 0;
  for (const r of all<{ category_key: string; n: number }>("SELECT category_key, COUNT(*) AS n FROM posts WHERE status = 'published' GROUP BY category_key")) {
    counts[r.category_key] = Number(r.n);
    total += Number(r.n);
  }
  counts.all = total;
  return counts;
}

/* ---------- Tuyển dụng ---------- */

const JOB_BADGE: Record<JobDepartment, string> = {
  engineering: "bg-orange-100 text-orange-700",
  production: "bg-orange-100 text-orange-700",
  sales: "bg-orange-100 text-orange-700",
  qc: "bg-slate-200 text-slate-700",
  maintenance: "bg-slate-100 text-slate-600",
};

export function getJobs(locale: string, tTuyenDung: Translate): Job[] {
  return all("SELECT * FROM jobs WHERE active = 1 ORDER BY sort ASC, id ASC").map((row) => {
    const department = str(row.department) as JobDepartment;
    const type = str(row.job_type) as JobType;
    const location = str(row.location) as JobLocation;
    return {
      id: str(row.slug),
      title: pick(parseI18n(row.title), locale),
      departmentLabel: tTuyenDung(`departmentOptions.${department}`),
      department,
      typeLabel: tTuyenDung(`typeOptions.${type}`),
      type,
      locationLabel: tTuyenDung(`locationOptions.${location}`),
      location,
      salary: pick(parseI18n(row.salary), locale),
      tags: list(row.tags).map((t) => pick(parseI18n(t.text), locale)).filter(Boolean),
      deadline: pick(parseI18n(row.deadline), locale),
      badgeClassName: JOB_BADGE[department] ?? "bg-slate-100 text-slate-600",
    };
  });
}

export function countActiveJobs(): number {
  return Number(get<{ n: number }>("SELECT COUNT(*) AS n FROM jobs WHERE active = 1")?.n ?? 0);
}
