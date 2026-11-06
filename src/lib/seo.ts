import type { Metadata } from "next";
import { LOCALES, absUrl } from "@/lib/site-url";

const DEFAULT_LOCALE = "vi";
const SITE_NAME = "HANIN Plating";
const DEFAULT_IMAGE = "/hanin-logo.png";
const OG_LOCALE: Record<string, string> = { vi: "vi_VN", en: "en_US", zh: "zh_CN", ko: "ko_KR" };

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

/** Mô tả meta dài quá ~160 đơn vị bị cắt trên trang kết quả tìm kiếm (chữ Hán/Hàn tính 2 đơn vị): cắt ở ranh giới từ hoặc câu. */
const charWidth = (c: string) => (/[\u1100-\u11ff\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(c) ? 2 : 1);
function clampDescription(text: string, max = 160): string {
  const t = text.replace(/\s+/g, " ").trim();
  let width = 0;
  let end = 0;
  for (const c of t) {
    if (width + charWidth(c) > max - 1) break;
    width += charWidth(c);
    end += c.length;
  }
  if (end >= t.length) return t;
  const cut = t.slice(0, end);
  const at = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf("。"), cut.lastIndexOf(". "));
  return `${(at > end * 0.6 ? cut.slice(0, at) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

export function pageMetadata({ locale, path, title, description: rawDescription, image, type = "website" }: PageMetadataInput): Metadata {
  const description = clampDescription(rawDescription);
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
