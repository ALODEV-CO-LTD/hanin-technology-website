import Link from "next/link";
import { useTranslations } from "next-intl";

const ARTICLE_KEYS = ["0", "1", "2"] as const;
const YEARS: Record<(typeof ARTICLE_KEYS)[number], string> = {
  "0": "2025",
  "1": "2025",
  "2": "2025",
};

export default function NewsUpdates() {
  const t = useTranslations("Home.NewsUpdates");

  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <h2 className="text-headline-xl text-slate-900 font-bold">{t("title")}</h2>
          </div>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-wider text-slate-600 hover:text-steel-600 transition-colors font-semibold"
          >
            <span>{t("ctaAll")}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {ARTICLE_KEYS.map((key) => (
            <article
              key={key}
              className="p-space-lg bg-white border border-slate-200 rounded shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-steel-50 text-steel-700 uppercase font-semibold">
                    {t(`articles.${key}.tag`)}
                  </span>
                  <span className="text-xs font-mono">{YEARS[key]}</span>
                </div>
                <h3 className="text-title-md text-slate-900 font-bold group-hover:text-steel-600 transition-colors leading-snug">
                  {t(`articles.${key}.title`)}
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{t(`articles.${key}.excerpt`)}</p>
              </div>
              <div className="pt-space-md flex items-center gap-2 text-steel-600 text-[11px] uppercase tracking-wider font-semibold">
                <span>{t("readMore")}</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
