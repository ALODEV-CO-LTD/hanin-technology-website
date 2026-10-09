import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import HeroImage from "@/components/ui/HeroImage";
import { Link } from "@/i18n/navigation";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function PageHero() {
  const t = useTranslations("TuyenDung.PageHero");
  const banner = getBanner("tuyen-dung", useLocale(), "/images/factory/qc-5.jpg");

  return (
    <section className="relative w-full min-h-[calc(100svh-var(--header-h))] bg-slate-900 overflow-hidden flex items-center">
      {/* Banner Background Image */}
      <HeroImage src={banner.image} alt={banner.alt || t("imageAlt")} />

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

          <BannerH1 className="text-white tracking-tight uppercase mb-space-sm font-bold">
            {t("titlePrefix")} <span>{t("titleHighlight")}</span>
          </BannerH1>
          <p className="banner-lead text-white leading-relaxed">
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
      </div>
    </section>
  );
}
