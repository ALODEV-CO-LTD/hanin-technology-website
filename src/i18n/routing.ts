import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "zh", "ko"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  // Ngôn ngữ do ĐƯỜNG DẪN quyết định (/ = tiếng Việt, /zh, /ko). Tắt phát hiện theo cookie và Accept-Language:
  // cookie NEXT_LOCALE cũ (zh/ko) từng kéo người dùng đã đổi về tiếng Việt quay lại /zh khi bấm sang trang khác.
  localeDetection: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
