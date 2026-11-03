/** Địa chỉ gốc của website, dùng cho sitemap, canonical và dữ liệu có cấu trúc. Đặt SITE_URL khi đổi tên miền. */
export const SITE_URL = (process.env.SITE_URL || "https://hanin.maxmin.vn").replace(/\/+$/, "");

export const LOCALES = ["vi", "zh", "ko"] as const;

export const absUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
