import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import HeroImage from "@/components/ui/HeroImage";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function NewsBanner() {
  const tb = useTranslations("TinTuc.NewsBreadcrumb");
  const banner = getBanner("tin-tuc", useLocale(), "/images/factory/phan-tich-1.jpg");
  const t = useTranslations("TinTuc.NewsIntro");

  return (
    <section className="relative w-full min-h-[min(calc(100svh-var(--header-h)),560px)] sm:min-h-[calc(100svh-var(--header-h))] overflow-hidden bg-slate-900 flex items-center">
      <HeroImage src={banner.image} alt={banner.alt || t("titlePrefix")} />

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full px-margin banner-text">
        <PageBreadcrumb
          className="mb-space-md"
          variant="dark"
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
    </section>
  );
}
