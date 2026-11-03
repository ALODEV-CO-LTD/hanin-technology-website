import type { Metadata } from "next";
import { LOCALES, absUrl } from "@/lib/site-url";

const DEFAULT_LOCALE = "vi";
const SITE_NAME = "HANIN Plating";
const DEFAULT_IMAGE = "/hanin-logo.png";
const OG_LOCALE: Record<string, string> = { vi: "vi_VN", zh: "zh_CN", ko: "ko_KR" };

/** Đường dẫn công khai theo ngôn ngữ (localePrefix "as-needed": tiếng Việt không có tiền tố). */
export function localizedPath(locale: string, path: string) {
  const p = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return p || "/";
  return `/${locale}${p}`;
}

type PageMetadataInput = {
  locale: string;
  /** Đường dẫn không có tiền tố ngôn ngữ, ví dụ "/gioi-thieu" hoặc "/tin-tuc/ten-bai". */
  path: string;
  title: string;
  description: string;
  /** Đường dẫn tương đối (/images/...) hoặc URL tuyệt đối. */
  image?: string | null;
  type?: "website" | "article";
};

export function pageMetadata({ locale, path, title, description, image, type = "website" }: PageMetadataInput): Metadata {
  const url = absUrl(localizedPath(locale, path));
  const img = image ? (/^https?:\/\//.test(image) ? image : absUrl(image)) : absUrl(DEFAULT_IMAGE);
  const languages: Record<string, string> = Object.fromEntries(LOCALES.map((l) => [l, absUrl(localizedPath(l, path))]));
  languages["x-default"] = absUrl(localizedPath(DEFAULT_LOCALE, path));
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? OG_LOCALE[DEFAULT_LOCALE],
      type,
      images: [{ url: img, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}
