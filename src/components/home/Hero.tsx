import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Home.Hero");

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t("imageAlt")}
          className="w-full h-full object-cover object-center"
          src="https://images.unsplash.com/photo-1716191299945-4c5b89703971?w=1920&q=80&fm=jpg&fit=crop"
        />
      </div>

      <div className="relative z-10 w-full px-margin py-space-xl flex flex-col justify-center h-full">
        <div className="max-w-3xl flex flex-col gap-space-md">
          <div className="flex flex-col gap-2 [text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
            <h1 className="text-display-hero-mobile xl:text-display-hero text-orange-400 uppercase tracking-tight font-bold">
              {t("titlePrefix")} <span className="text-orange-500">{t("titleHighlight")}</span>
            </h1>
            <p className="text-headline-md text-orange-300 font-semibold tracking-tight">
              {t("subtitle")}
            </p>
          </div>

          <p className="text-body-lg text-orange-200 max-w-2xl leading-relaxed [text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <a
              href="#nang-luc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
            >
              {t("ctaPrimary")}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-title-md uppercase tracking-wider rounded backdrop-blur-sm transition-all duration-150 shadow-sm"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
