/**
 * Danh sách kênh liên hệ / mạng xã hội hiển thị trên website.
 * Thêm kênh mới: thêm 1 dòng ở đây + 1 ô cấu hình cùng `settingKey` trong src/server/settings.ts + icon trong ui/Icon.tsx.
 * Chỉ kênh nào đã dán link trong CMS (/admin → Liên kết & mạng xã hội) mới hiện ra.
 */
export interface SocialChannel {
  key: string;
  label: string;
  /** Khoá trong bảng cài đặt CMS. */
  settingKey: string;
  /** Tên icon trong ui/Icon.tsx. */
  icon: string;
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  { key: "zalo", label: "Zalo", settingKey: "zaloUrl", icon: "zalo" },
  { key: "facebook", label: "Facebook", settingKey: "facebookUrl", icon: "facebook" },
  { key: "youtube", label: "YouTube", settingKey: "youtubeUrl", icon: "youtube" },
  { key: "linkedin", label: "LinkedIn", settingKey: "linkedinUrl", icon: "linkedin" },
  { key: "instagram", label: "Instagram", settingKey: "instagramUrl", icon: "instagram" },
];

/** Cho phép nhập link thiếu giao thức hoặc chỉ số điện thoại (Zalo) rồi chuẩn hoá thành URL dùng được. */
export function normalizeSocialUrl(key: string, raw: string): string {
  const v = raw.trim();
  if (!v) return "";
  if (key === "zalo" && /^\+?[\d\s.]{8,15}$/.test(v)) return `https://zalo.me/${v.replace(/\D/g, "")}`;
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v.replace(/^\/+/, "")}`;
}
