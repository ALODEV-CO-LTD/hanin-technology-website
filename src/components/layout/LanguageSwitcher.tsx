"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Icon from "@/components/ui/Icon";

const LOCALE_LABELS: Record<string, string> = {
  vi: "VI",
  zh: "中文",
  ko: "한국어",
};

export default function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const switchTo = (nextLocale: string) => {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  if (variant === "mobile") {
    return (
      <div className="flex flex-wrap items-center gap-space-xs pt-space-sm border-t border-slate-200 mt-space-sm">
        <span className="text-label-technical text-slate-600 uppercase pr-space-xs">{t("label")}:</span>
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            className={`min-h-11 min-w-11 px-3 rounded text-label-technical uppercase transition-colors ${
              loc === locale
                ? "bg-steel-600 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            aria-pressed={loc === locale}
            lang={loc}
          >
            {LOCALE_LABELS[loc]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t("label")}: ${t(locale)}`}
        className="flex min-h-11 items-center gap-1 px-3 py-1.5 rounded border border-slate-200 text-slate-600 text-label-technical uppercase transition-colors duration-200 hover:border-steel-300 hover:text-steel-600"
      >
        <Icon name="language" className="text-[16px]" />
        {LOCALE_LABELS[locale]}
        <Icon name="expand_more" className={`text-[16px] transition-transform duration-200 ${open ? "rotate-180" : "" }`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-36 rounded border border-slate-200 bg-white shadow-[0_10px_28px_-8px_rgba(15,23,42,0.22)] overflow-hidden z-50 reveal reveal-in"
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={loc === locale}
              lang={loc}
              onClick={() => switchTo(loc)}
              className={`w-full min-h-11 text-left px-space-md py-space-sm text-body-sm transition-colors ${
                loc === locale
                  ? "bg-steel-50 text-steel-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {LOCALE_LABELS[loc]}
              <span className="block text-xs text-slate-600">{t(loc)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
