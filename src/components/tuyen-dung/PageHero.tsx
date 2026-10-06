import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import { Link } from "@/i18n/navigation";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function PageHero() {
  const t = useTranslations("TuyenDung.PageHero");
  const banner = getBanner("tuyen-dung", useLocale(), "/images/factory/qc-5.jpg");

  return (
    <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex items-center border-b border-slate-200">
      {/* Banner Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label={banner.alt || t("imageAlt")}
        style={{
          backgroundImage:
            `url('${banner.image}')`,
        }}
      />

      {/* Content Container */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full px-margin">
        <div className="banner-text">
          <PageBreadcrumb
            className="mb-space-sm"
            variant="dark"
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />

          <h1 className="text-display-hero-mobile md:text-display-hero text-white tracking-tight uppercase mb-space-sm font-bold">
            {t("titlePrefix")} <span>{t("titleHighlight")}</span>
          </h1>
          <p className="text-body-lg text-white max-w-2xl leading-relaxed">
            <strong className="text-white font-semibold">{t("companyName")}</strong> {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-md pt-space-md">
          <a
            href="#open-positions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
          >
            {t("ctaPrimary")}
          </a>
          <Link
            href="/lien-he"
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150 banner-text"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm max-w-2xl pt-space-md banner-text">
          <div className="pl-space-sm border-l-2 border-white/50 flex flex-col gap-1">
            <span className="text-label-sm text-white uppercase tracking-wider">{t("standardLabel")}</span>
            <span className="text-title-md text-white">{t("standardValue")}</span>
          </div>
          <div className="pl-space-sm border-l-2 border-white/50 flex flex-col gap-1">
            <span className="text-label-sm text-white uppercase tracking-wider">{t("benefitsLabel")}</span>
            <span className="text-title-md text-white">{t("benefitsValue")}</span>
          </div>
          <div className="pl-space-sm border-l-2 border-white/50 flex flex-col gap-1">
            <span className="text-label-sm text-white uppercase tracking-wider">{t("developmentLabel")}</span>
            <span className="text-title-md text-white">{t("developmentValue")}</span>
          </div>
          <div className="pl-space-sm border-l-2 border-white/50 flex flex-col gap-1">
            <span className="text-label-sm text-white uppercase tracking-wider">{t("factoryLabel")}</span>
            <span className="text-title-md text-white">{t("factoryValue")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
