import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function NewsBanner() {
  const tb = useTranslations("TinTuc.NewsBreadcrumb");
  const banner = getBanner("tin-tuc", useLocale(), "/images/factory/phan-tich-1.jpg");
  const t = useTranslations("TinTuc.NewsIntro");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-900 border-b border-slate-200 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label={banner.alt || t("titlePrefix")}
        style={{
          backgroundImage:
            `url('${banner.image}')`,
        }}
      />

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
        <h1 className="text-display-hero-mobile lg:text-display-hero text-white uppercase tracking-tight font-bold max-w-3xl">
          {t("titlePrefix")} <span>{t("titleHighlight")}</span>{" "}
          {t("titleSuffix")}
        </h1>
        <p className="text-body-lg text-white max-w-2xl mt-space-xs">{t("description")}</p>
      </div>
    </section>
  );
}
