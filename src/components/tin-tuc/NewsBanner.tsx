import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import BannerFrame from "@/components/ui/BannerFrame";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function NewsBanner() {
  const tb = useTranslations("TinTuc.NewsBreadcrumb");
  const banner = getBanner("tin-tuc", useLocale(), "/images/factory/phan-tich-1.jpg");
  const t = useTranslations("TinTuc.NewsIntro");

  return (
    <BannerFrame image={banner.image} alt={banner.alt || t("titlePrefix")}>
      <div className="w-full px-margin py-space-lg">
        <PageBreadcrumb variant="dark"
          className="mb-space-md"
         
          items={[
            { label: tb("home"), href: "/" },
            { label: tb("news") },
          ]}
        />
        <BannerH1 className="text-white uppercase tracking-tight font-bold">
          {t("titlePrefix")} <span>{t("titleHighlight")}</span>{" "}
          {t("titleSuffix")}
        </BannerH1>
        <p className="banner-lead text-white mt-space-xs">{t("description")}</p>
      </div>
    </BannerFrame>
  );
}
