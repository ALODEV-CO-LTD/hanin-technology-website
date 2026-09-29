import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "zh", "ko"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
