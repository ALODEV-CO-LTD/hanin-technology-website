import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function IntroHero() {
  const t = useTranslations("GioiThieu.IntroHero");
  const banner = getBanner("gioi-thieu", useLocale(), "/images/factory/kho-6.jpg");

  return (
    <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden flex items-center border-b border-slate-200">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label={banner.alt || t("imageAlt")}
        style={{
          backgroundImage:
            `url('${banner.image}')`,
        }}
      />

      {/* Content Container */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full px-margin banner-text">
        <PageBreadcrumb
          className="mb-space-sm"
          variant="dark"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />

        {/* Main Heading */}
        <h1 className="text-headline-xl-mobile md:text-display-hero text-white uppercase tracking-tight max-w-3xl mb-space-sm font-bold">
          {t("title")}
        </h1>

        {/* Supporting Deck */}
        <p className="text-body-md md:text-body-lg text-white max-w-2xl leading-relaxed">{t("subtitle")}</p>
      </div>
    </section>
  );
}
