import { useTranslations } from "next-intl";

export default function BottomCta() {
  const t = useTranslations("LienHe.BottomCta");

  return (
    <section className="w-full bg-slate-900 text-white py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-headline-md font-bold text-white tracking-tight uppercase">
            {t("heading")}
          </h2>
          <p className="text-body-md text-slate-300 max-w-2xl">{t("description")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-space-md shrink-0">
          <a
            href="#rfq-form"
            className="px-space-lg py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-label-md uppercase tracking-wider font-bold rounded shadow-md transition-all"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="tel:02438186868"
            className="px-space-lg py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-label-md uppercase tracking-wider font-bold rounded transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>(+84) 24 3818 6868</span>
          </a>
        </div>
      </div>
    </section>
  );
}
