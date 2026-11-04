import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import BannerFrame from "@/components/ui/BannerFrame";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function ServiceBanner() {
  const t = useTranslations("DichVu.CategoryHero");
  const banner = getBanner("dich-vu", useLocale(), "/images/factory/ma-quay-6.jpg");
  const tNav = useTranslations("Nav");

  return (
    <BannerFrame image={banner.image} alt={banner.alt || t("imageAlt")}>
      <div className="w-full px-margin py-space-lg">
        <PageBreadcrumb variant="dark"
          className="mb-space-sm"
         
          items={[
            { label: tNav("trangChu"), href: "/" },
            { label: t("title") },
          ]}
        />

        <BannerH1 className="text-white uppercase tracking-tight mb-space-sm font-bold">
          {t("title")}
        </BannerH1>

        <p className="banner-lead text-white leading-relaxed">{t("subtitle")}</p>

        <div className="flex flex-wrap items-center gap-space-md pt-space-md">
          <a
            href="#rfq-form"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 "
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#capacity-overview"
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </BannerFrame>
  );
}
