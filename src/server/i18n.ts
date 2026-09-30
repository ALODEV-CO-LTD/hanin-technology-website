/** Trường đa ngôn ngữ: khoá là mã locale, vi là ngôn ngữ gốc/fallback. */
export const LOCALES = ["vi", "zh", "ko"] as const;
export type Locale = (typeof LOCALES)[number];
export type I18nText = Partial<Record<Locale, string>>;

export const LOCALE_LABELS: Record<Locale, string> = {
  vi: "Tiếng Việt",
  zh: "中文",
  ko: "한국어",
};

export function emptyI18n(): I18nText {
  return { vi: "", zh: "", ko: "" };
}

export function parseI18n(raw: unknown): I18nText {
  if (raw && typeof raw === "object") return raw as I18nText;
  if (typeof raw !== "string" || !raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as I18nText) : {};
  } catch {
    return {};
  }
}

/** Lấy chuỗi theo locale, thiếu thì fallback về tiếng Việt. */
export function pick(value: I18nText | undefined | null, locale: string): string {
  if (!value) return "";
  return (value[locale as Locale] || value.vi || "").toString();
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
