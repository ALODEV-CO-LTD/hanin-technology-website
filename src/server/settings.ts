import { all, run, transaction } from "./db";

export interface SettingDef {
  key: string;
  label: string;
  help?: string;
  group: "Mạng xã hội & liên kết" | "Bản đồ" | "Liên hệ";
}

export const SETTING_DEFS: SettingDef[] = [
  { key: "zaloUrl", label: "Zalo (link chat)", group: "Mạng xã hội & liên kết", help: "Ví dụ https://zalo.me/0988123456" },
  { key: "facebookUrl", label: "Facebook", group: "Mạng xã hội & liên kết" },
  { key: "youtubeUrl", label: "YouTube", group: "Mạng xã hội & liên kết" },
  { key: "linkedinUrl", label: "LinkedIn", group: "Mạng xã hội & liên kết" },
  { key: "mapsUrl", label: "Link Google Maps chỉ đường", group: "Bản đồ" },
  { key: "mapEmbedUrl", label: "Link nhúng bản đồ (iframe src)", group: "Bản đồ", help: "Lấy từ Google Maps → Chia sẻ → Nhúng bản đồ." },
  { key: "inquiryNotifyEmail", label: "Email nhận thông báo yêu cầu mới", group: "Liên hệ", help: "Lưu sẵn để dùng khi cấu hình SMTP; hiện yêu cầu mới xem trong CMS." },
];

const KEYS = new Set(SETTING_DEFS.map((d) => d.key));

export function getSettings(): Record<string, string> {
  const out: Record<string, string> = Object.fromEntries(SETTING_DEFS.map((d) => [d.key, ""]));
  for (const row of all<{ key: string; value: string }>("SELECT key, value FROM settings")) {
    if (KEYS.has(row.key)) out[row.key] = row.value;
  }
  return out;
}

export function isSafeLink(value: string): boolean {
  return value === "" || /^https?:\/\//i.test(value) || /^mailto:/i.test(value);
}

/** Chỉ cho nhúng bản đồ từ Google Maps (dùng làm iframe src). */
export function isSafeMapEmbed(value: string): boolean {
  return value === "" || /^https:\/\/(www\.google\.com|maps\.google\.com)\/maps\//.test(value);
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
