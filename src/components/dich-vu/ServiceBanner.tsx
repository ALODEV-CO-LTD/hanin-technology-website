import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import HeroImage from "@/components/ui/HeroImage";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function ServiceBanner() {
  const t = useTranslations("DichVu.CategoryHero");
  const banner = getBanner("dich-vu", useLocale(), "/images/factory/ma-quay-6.jpg");
  const tNav = useTranslations("Nav");

  return (
    <section className="relative w-full min-h-[calc(100svh-var(--header-h))] bg-slate-900 overflow-hidden flex items-center border-b border-slate-200">
      {/* Banner Background Image */}
      <HeroImage src={banner.image} alt={banner.alt || t("imageAlt")} />

      {/* Content Container */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full px-margin banner-text">
        <PageBreadcrumb
          className="mb-space-sm"
          variant="dark"
          items={[
            { label: tNav("trangChu"), href: "/" },
            { label: t("title") },
          ]}
        />

        <h1 className="banner-title text-white uppercase tracking-tight max-w-5xl mb-space-sm font-bold">
          {t("title")}
        </h1>

        <p className="banner-lead text-white leading-relaxed">{t("subtitle")}</p>

        <div className="flex flex-wrap items-center gap-space-md pt-space-md">
          <a
            href="#rfq-form"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#capacity-overview"
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150 banner-text"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
