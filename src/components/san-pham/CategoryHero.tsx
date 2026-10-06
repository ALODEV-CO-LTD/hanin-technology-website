import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function CategoryHero() {
  const t = useTranslations("SanPham.CategoryHero");
  const banner = getBanner("san-pham", useLocale(), "/images/factory/qc-1.jpg");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-900 border-b border-slate-200 flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={banner.alt || t("imageAlt")}
          className="w-full h-full object-cover"
          src={banner.image}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full px-margin flex flex-col gap-space-sm banner-text">
        <PageBreadcrumb
          variant="dark"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />
        <h1 className="text-display-hero-mobile lg:text-display-hero uppercase tracking-tight text-white mt-space-xs font-bold">
          {t("title")}
        </h1>
        <p className="text-body-lg text-white max-w-3xl leading-relaxed mt-space-xs">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
