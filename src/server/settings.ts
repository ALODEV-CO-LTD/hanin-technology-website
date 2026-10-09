import { all, run, transaction } from "./db";

export interface SettingDef {
  key: string;
  label: string;
  help?: string;
  group: "Thông tin liên hệ chung" | "Mạng xã hội & liên kết" | "Bản đồ" | "Liên hệ" | "Tải xuống";
  /** Cách kiểm tra giá trị khi lưu (mặc định: link http/https/mailto). */
  kind?: "email" | "phone";
  /** Giá trị hiển thị khi CMS chưa lưu gì (= nội dung website hiện có). */
  defaultValue?: string;
}

export const SETTING_DEFS: SettingDef[] = [
  { key: "hotline", label: "Hotline chính", group: "Thông tin liên hệ chung", kind: "phone", defaultValue: "0975080648", help: "Nhập một hoặc nhiều số (gõ số rồi bấm Enter hoặc dấu phẩy). Số đầu tiên là số gọi chính; tất cả hiện ở trang chủ, Liên hệ, Tin tức, Sản phẩm, Dịch vụ, chân trang. Mỗi số đúng 10 chữ số, ví dụ 0975080648." },
  { key: "engineerHotline", label: "Hotline kỹ sư", group: "Thông tin liên hệ chung", kind: "phone", help: "Một hoặc nhiều số, để trống nếu không dùng." },
  { key: "hrHotline", label: "Điện thoại tuyển dụng", group: "Thông tin liên hệ chung", kind: "phone", help: "Một hoặc nhiều số, hiện ở trang Tuyển dụng. Để trống thì trang đó dùng hotline chính." },
  { key: "salesEmail", label: "Email kinh doanh / báo giá", group: "Thông tin liên hệ chung", kind: "email", defaultValue: "Haninplating@gmail.com" },
  { key: "engineeringEmail", label: "Email kỹ thuật", group: "Thông tin liên hệ chung", kind: "email", defaultValue: "Haninplating@gmail.com" },
  { key: "hrEmail", label: "Email tuyển dụng", group: "Thông tin liên hệ chung", kind: "email", defaultValue: "tuyendung@hanintech.vn" },
  { key: "zaloUrl", label: "Zalo (link chat)", group: "Mạng xã hội & liên kết", help: "Ví dụ https://zalo.me/0988123456" },
  { key: "facebookUrl", label: "Facebook", group: "Mạng xã hội & liên kết" },
  { key: "youtubeUrl", label: "YouTube", group: "Mạng xã hội & liên kết" },
  { key: "linkedinUrl", label: "LinkedIn", group: "Mạng xã hội & liên kết" },
  { key: "instagramUrl", label: "Instagram", group: "Mạng xã hội & liên kết" },
  { key: "mapsUrl", label: "Link Google Maps chỉ đường", group: "Bản đồ" , defaultValue: "https://www.google.com/maps?q=21.207361,105.754028" },
  { key: "mapEmbedUrl", label: "Link nhúng bản đồ (iframe src)", group: "Bản đồ", help: "Lấy từ Google Maps → Chia sẻ → Nhúng bản đồ." },
  { key: "profileUrl", label: "Link tải Hồ sơ năng lực (PDF)", group: "Tải xuống", help: "Tải PDF lên Thư viện ảnh rồi dán đường dẫn /uploads/... vào đây. Để trống thì nút tải sẽ dẫn tới form liên hệ." },
  { key: "inquiryNotifyEmail", label: "Email nhận thông báo yêu cầu mới", group: "Liên hệ", defaultValue: "Haninplating@gmail.com", help: "Lưu sẵn để dùng khi cấu hình SMTP; hiện yêu cầu mới xem trong CMS." },
];

const KEYS = new Set(SETTING_DEFS.map((d) => d.key));

export function getSettings(): Record<string, string> {
  const out: Record<string, string> = Object.fromEntries(SETTING_DEFS.map((d) => [d.key, d.defaultValue ?? ""]));
  for (const row of all<{ key: string; value: string }>("SELECT key, value FROM settings")) {
    if (KEYS.has(row.key)) out[row.key] = row.value;
  }
  return out;
}

/* ---------- Số điện thoại (mỗi ô cho phép nhiều số, lưu cách nhau bằng dấu phẩy) ---------- */

export interface Phone {
  number: string;
  role: "main" | "engineer" | "hr";
}

/** Định dạng hợp lệ: đúng 10 chữ số, bắt đầu bằng 0 (ví dụ 0975080648). */
export const PHONE_RE = /^0\d{9}$/;
export const MAX_PHONES_PER_FIELD = 20;

/** Tách chuỗi nhiều số ("0975080648, 0912345678") thành mảng (không kiểm tra). */
export function splitPhones(raw: string): string[] {
  return (raw ?? "").split(/[\s,;]+/).filter(Boolean);
}

/** Kiểm tra + chuẩn hoá: trả chuỗi "a,b,c" hoặc null nếu có số sai/trùng/quá nhiều. */
export function normalizePhones(raw: string): string | null {
  const list = splitPhones(raw);
  if (list.length > MAX_PHONES_PER_FIELD) return null;
  if (list.some((n) => !PHONE_RE.test(n)) || new Set(list).size !== list.length) return null;
  return list.join(",");
}

/** Số điện thoại đang dùng trên website. */
export function getPhones(): { all: Phone[]; general: Phone[]; hr: Phone[]; main: string } {
  const st = getSettings();
  const pick = (raw: string, role: Phone["role"]): Phone[] => splitPhones(raw).filter((n) => PHONE_RE.test(n)).map((number) => ({ number, role }));
  const seen = new Set<string>();
  const unique = (list: Phone[]) => list.filter((p) => (seen.has(p.number) ? false : (seen.add(p.number), true)));
  const general = unique([...pick(st.hotline, "main"), ...pick(st.engineerHotline, "engineer")]);
  const hr = pick(st.hrHotline, "hr");
  return { all: [...general, ...hr], general, hr, main: (general[0] ?? hr[0])?.number ?? "" };
}

/** Số điện thoại → chuỗi dùng cho tel: (giữ dấu + đầu, bỏ ký tự khác và phần máy lẻ). */
export function telHref(phone: string): string {
  const main = phone.replace(/\(?\s*ext[^)]*\)?/i, "");
  const digits = main.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export function isSafeLink(value: string): boolean {
  return value === "" || /^https?:\/\//i.test(value) || /^mailto:/i.test(value);
}

/** Chỉ cho nhúng bản đồ từ Google Maps (dùng làm iframe src). */
export function isSafeMapEmbed(value: string): boolean {
  return value === "" || /^https:\/\/(www\.google\.com|maps\.google\.com)\/maps[\/?]/.test(value);
}

export function saveSettings(values: Record<string, string>) {
  transaction(() => {
    for (const [key, value] of Object.entries(values)) {
      if (!KEYS.has(key)) continue;
      run(
        `INSERT INTO settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
        key,
        value.trim().slice(0, 2000),
      );
    }
  });
}
