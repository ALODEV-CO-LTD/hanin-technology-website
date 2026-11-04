import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import BannerFrame from "@/components/ui/BannerFrame";

export default function CategoryHero() {
  const t = useTranslations("SanPham.CategoryHero");
  const banner = getBanner("san-pham", useLocale(), "/images/factory/qc-1.jpg");

  return (
    <BannerFrame image={banner.image} alt={banner.alt || t("imageAlt")}>
      <div className="w-full px-margin py-space-lg flex flex-col gap-space-sm">
        <PageBreadcrumb variant="dark"
         
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />
        <BannerH1 className="uppercase tracking-tight text-white mt-space-xs font-bold">
          {t("title")}
        </BannerH1>
        <p className="banner-lead text-white leading-relaxed mt-space-xs">
          {t("description")}
        </p>
      </div>
    </BannerFrame>
  );
}
