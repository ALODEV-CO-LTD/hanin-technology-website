import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import HeroImage from "@/components/ui/HeroImage";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CountUp from "@/components/ui/CountUp";
import HeroStatBar from "@/components/ui/HeroStatBar";

const STATS = [
  { key: "equipment", padStart: 0, thousandsSeparator: "" },
  { key: "lines", padStart: 2, thousandsSeparator: "" },
  { key: "zones", padStart: 2, thousandsSeparator: "" },
  { key: "capacity", padStart: 0, thousandsSeparator: "." },
] as const;

export default function IntroHero() {
  const t = useTranslations("GioiThieu.IntroHero");
  const ts = useTranslations("GioiThieu.CapabilitySnapshot");
  const num = (key: string) => {
    const n = Number(ts(key));
    return Number.isFinite(n) ? n : 0;
  };
  const banner = getBanner("gioi-thieu", useLocale(), "/images/factory/kho-6.jpg");

  return (
    <section className="relative w-full min-h-[min(calc(100svh-var(--header-h)),560px)] sm:min-h-[calc(100svh-var(--header-h))] bg-slate-900 overflow-hidden flex flex-col">
      {/* Hero Background Image */}
      <HeroImage src={banner.image} alt={banner.alt || t("imageAlt")} />

      {/* Content Container */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-margin py-space-xl banner-text">
        <PageBreadcrumb
          className="mb-space-sm"
          variant="dark"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />

        {/* Main Heading */}
        <BannerH1 className="text-white uppercase tracking-tight mb-space-sm font-bold">
          {t("title")}
        </BannerH1>

        {/* Supporting Deck */}
        <p className="banner-lead text-white leading-relaxed">{t("subtitle")}</p>
      </div>

      <HeroStatBar
        items={STATS.map((stat) => ({
          key: stat.key,
          label: ts(`${stat.key}.label`),
          value: (
            <>
              <CountUp end={num(`${stat.key}.end`)} padStart={stat.padStart} thousandsSeparator={stat.thousandsSeparator} />
              {ts(`${stat.key}.suffix`)}
            </>
          ),
        }))}
      />
    </section>
  );
}
