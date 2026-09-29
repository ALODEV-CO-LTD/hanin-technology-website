"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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
      <div className="flex items-center gap-space-xs pt-space-sm border-t border-slate-200 mt-space-sm">
        <span className="text-label-technical text-slate-400 uppercase pr-space-xs">{t("label")}:</span>
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            className={`px-2.5 py-1 rounded text-label-technical uppercase transition-colors ${
              loc === locale
                ? "bg-steel-600 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
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
        className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 text-slate-600 text-label-technical uppercase transition-colors duration-200 hover:border-steel-300 hover:text-steel-600"
      >
        <span className="material-symbols-outlined text-[16px]">language</span>
        {LOCALE_LABELS[locale]}
        <span
          className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-36 rounded border border-slate-200 bg-white shadow-lg overflow-hidden z-50 reveal reveal-in"
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={loc === locale}
              onClick={() => switchTo(loc)}
              className={`w-full text-left px-space-md py-space-sm text-body-sm transition-colors ${
                loc === locale
                  ? "bg-steel-50 text-steel-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {LOCALE_LABELS[loc]}
              <span className="block text-[10px] text-slate-400">{t(loc)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
