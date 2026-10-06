import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function CapabilityHero() {
  const t = useTranslations("NangLuc.CapabilityHero");
  const banner = getBanner("nang-luc", useLocale(), "/images/factory/ma-quay-5.jpg");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-900 border-b border-slate-200 flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url('${banner.image}')`,
        }}
      />

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative px-margin w-full">
        <div className="banner-text">
          <PageBreadcrumb
            className="pb-6"
            variant="dark"
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />

          <div className="max-w-3xl pt-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-white max-w-2xl leading-relaxed">{t("description")}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-md pt-8">
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
            href="#he-thong-nha-may"
          >
            {t("ctaExplore")}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150 banner-text"
            href="#day-chuyen"
          >
            {t("ctaLines")}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150 banner-text"
            href="#kiem-nghiem"
          >
            {t("ctaQa")}
          </a>
        </div>
      </div>
    </section>
  );
}
