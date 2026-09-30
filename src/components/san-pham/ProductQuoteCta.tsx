import { useTranslations } from "next-intl";

export default function ProductQuoteCta() {
  const t = useTranslations("SanPham.ProductQuoteCta");

  return (
    <section className="w-full bg-slate-50 py-space-xl scroll-mt-20" id="quote-form">
      <div className="mx-auto px-margin">
        <div className="p-space-xl bg-white border border-slate-200 rounded relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-space-md">
            <svg className="text-steel-600" fill="currentColor" height="400" viewBox="0 0 100 100" width="400">
              <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="4 2" strokeWidth="2" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" fill="currentColor" r="20" />
            </svg>
          </div>
          <div className="relative z-10 max-w-[840px] flex flex-col gap-space-md">
            <h2 className="text-headline-xl-mobile lg:text-headline-xl text-slate-900 uppercase tracking-tight">
              {t("title")}
            </h2>
            <p className="text-body-lg text-slate-600 leading-relaxed">
              {t("descriptionPrefix")}{" "}
              <span className="text-steel-600 font-semibold">{t("descriptionHighlight")}</span>.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-steel-600 text-white text-label-technical uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-md"
                href="#"
              >
                <span>{t("ctaSendQuote")}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <div className="flex flex-col text-label-sm text-slate-500">
                <span>{t("ndaNote")}</span>
                <span className="text-slate-800 font-medium">{t("responseTime")}</span>
              </div>
            </div>
            <div className="pt-space-md border-t border-slate-200 flex flex-wrap items-center gap-space-lg text-label-technical text-slate-500">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-steel-600 text-[20px]">call</span>
                <span>
                  {t("hotlineLabel")}{" "}
                  <strong className="text-slate-900 tracking-wider font-mono">
                    (+84) 24 3818 6688
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-steel-600 text-[20px]">
                  mark_email_unread
                </span>
                <span>
                  {t("emailLabel")}{" "}
                  <strong className="text-slate-900 tracking-wider font-mono">
                    sales@hanintech.vn
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
