import { useTranslations } from "next-intl";

export default function NangLucFinalCta() {
  const t = useTranslations("NangLuc.NangLucFinalCta");

  return (
    <section className="w-full py-space-xl bg-slate-100 border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="bg-white border border-slate-200 rounded-lg p-space-xl md:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-steel-50 to-transparent pointer-events-none" />
          <div className="max-w-2xl relative z-10">
            <h2 className="text-headline-xl text-slate-900 uppercase tracking-tight mb-space-sm">{t("title")}</h2>
            <p className="text-body-lg text-slate-600 leading-relaxed mb-space-xl">{t("description")}</p>
            <div className="flex flex-wrap items-center gap-space-md mb-space-lg">
              <a
                className="inline-flex items-center justify-center px-space-xl py-space-md bg-steel-600 hover:bg-steel-700 text-white text-headline-sm font-semibold uppercase rounded transition-all active:scale-[0.99] shadow-sm"
                href="#"
              >
                {t("ctaContact")}
              </a>
              <a
                className="inline-flex items-center justify-center px-space-xl py-space-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-headline-sm font-semibold uppercase rounded transition-all shadow-sm"
                href="#"
              >
                {t("ctaQuote")}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-space-lg pt-space-md text-label-technical text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-steel-600">phone_in_talk</span>
                <span>
                  {t("hotlineLabel")} <strong className="text-slate-900">024 3818 6868</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-steel-600">schedule</span>
                <span>
                  {t("responseLabel")} <strong className="text-slate-900">{t("responseValue")}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
