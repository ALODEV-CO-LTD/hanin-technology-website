import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import Icon from "@/components/ui/Icon";

export default function Hero() {
  const t = useTranslations("Home.Hero");
  const banner = getBanner("home-hero", useLocale(), "/images/factory/ma-treo-2.jpg");

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={banner.alt || t("imageAlt")}
          className="w-full h-full object-cover object-center"
          src={banner.image}
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full px-margin py-space-xl flex flex-col justify-center h-full">
        <div className="max-w-3xl flex flex-col gap-space-md">
          <div className="flex flex-col gap-2 banner-text">
            <h1 className="text-display-hero-mobile xl:text-display-hero text-white uppercase tracking-tight font-bold">
              {t("titlePrefix")} <span>{t("titleHighlight")}</span>
            </h1>
            <p className="text-headline-md text-white font-semibold tracking-tight">
              {t("subtitle")}
            </p>
          </div>

          <p className="text-body-lg text-white max-w-2xl leading-relaxed banner-text">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <a
              href="#nang-luc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
            >
              {t("ctaPrimary")}
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150 banner-text"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
