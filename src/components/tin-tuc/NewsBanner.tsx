import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function NewsBanner() {
  const tb = useTranslations("TinTuc.NewsBreadcrumb");
  const banner = getBanner("tin-tuc", useLocale(), "https://images.unsplash.com/photo-1654703680007-d5d9699cddfd?w=1920&q=80&fm=jpg&fit=crop");
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

      <div className="relative z-10 w-full px-margin [text-shadow:0_2px_6px_rgba(2,6,23,0.85),0_4px_20px_rgba(2,6,23,0.6)]">
        <PageBreadcrumb
          className="mb-space-md"
          variant="dark"
          items={[
            { label: tb("home"), href: "/" },
            { label: tb("news") },
          ]}
        />
        <h1 className="text-display-hero-mobile lg:text-display-hero text-banner-orange uppercase tracking-tight font-bold max-w-3xl">
          {t("titlePrefix")} <span className="text-banner-orange">{t("titleHighlight")}</span>{" "}
          {t("titleSuffix")}
        </h1>
        <p className="text-body-lg text-banner-orange max-w-2xl mt-space-xs">{t("description")}</p>
      </div>
    </section>
  );
}
