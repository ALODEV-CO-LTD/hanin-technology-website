import Link from "next/link";
import { useTranslations } from "next-intl";

const SERVICE_KEYS = ["0", "1", "2", "3"] as const;
const INDEXES = ["01", "02", "03", "04"] as const;

export default function PlatingServices() {
  const t = useTranslations("Home.PlatingServices");

  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-headline-lg text-slate-900 font-bold">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/dich-vu-gia-cong-ma"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-wider text-slate-600 hover:text-steel-600 transition-colors whitespace-nowrap"
          >
            <span>{t("ctaAll")}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {SERVICE_KEYS.map((key, i) => (
            <Link
              key={key}
              href="/dich-vu-gia-cong-ma"
              className="flex flex-col justify-between p-space-lg bg-slate-50 border border-slate-200 rounded hover:border-steel-300 hover:shadow-lg hover:bg-white transition-all duration-200 group"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-headline-lg text-steel-600 font-bold">{INDEXES[i]}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 uppercase font-semibold">
                    {t(`services.${key}.tag`)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-headline-sm text-slate-900 font-semibold group-hover:text-steel-600 transition-colors">
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="text-body-sm text-slate-600 leading-relaxed">{t(`services.${key}.desc`)}</p>
                </div>
              </div>
              <div className="pt-space-lg flex items-center justify-between text-slate-500 group-hover:text-steel-600 transition-colors">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {t("detailLabel")}
                </span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
