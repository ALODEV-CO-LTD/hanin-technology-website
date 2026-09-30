import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function PageHero() {
  const t = useTranslations("TuyenDung.PageHero");

  return (
    <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex items-center border-b border-slate-200">
      {/* Banner Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label={t("imageAlt")}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528953030358-b0c7de371f1f?w=1920&q=80&fm=jpg&fit=crop')",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-margin">
        <div className="[text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
          <PageBreadcrumb
            className="mb-space-sm"
            variant="dark"
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />

          <h1 className="text-display-hero-mobile md:text-display-hero text-banner-orange tracking-tight uppercase mb-space-sm font-bold">
            {t("titlePrefix")} <span className="text-banner-orange">{t("titleHighlight")}</span>
          </h1>
          <p className="text-body-lg text-banner-orange max-w-2xl leading-relaxed">
            <strong className="text-banner-orange font-semibold">{t("companyName")}</strong> {t("description")}
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-title-md uppercase tracking-wider rounded backdrop-blur-sm transition-all duration-150 shadow-sm"
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm max-w-2xl pt-space-md">
          <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
            <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("standardLabel")}</span>
            <span className="text-title-md text-slate-900">{t("standardValue")}</span>
          </div>
          <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
            <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("benefitsLabel")}</span>
            <span className="text-title-md text-slate-900">{t("benefitsValue")}</span>
          </div>
          <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
            <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("developmentLabel")}</span>
            <span className="text-title-md text-slate-900">{t("developmentValue")}</span>
          </div>
          <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
            <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("factoryLabel")}</span>
            <span className="text-title-md text-slate-900">{t("factoryValue")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
