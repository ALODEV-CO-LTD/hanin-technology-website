import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import HeroImage from "@/components/ui/HeroImage";
import CountUp from "@/components/ui/CountUp";
import HeroStatBar from "@/components/ui/HeroStatBar";

const STATS = [
  { key: "equipment" },
  { key: "lines" },
  { key: "zones", padStart: 2 },
  { key: "precision", decimals: 1 },
] as const;

export default function CapabilityHero() {
  const t = useTranslations("NangLuc.CapabilityHero");
  const ts = useTranslations("NangLuc.CapabilityOverviewStats");
  const num = (key: string) => {
    const n = Number(ts(key));
    return Number.isFinite(n) ? n : 0;
  };
  const banner = getBanner("nang-luc", useLocale(), "/images/factory/ma-quay-5.jpg");

  return (
    <section className="relative w-full min-h-[calc(100svh-var(--header-h))] overflow-hidden bg-slate-900 border-b border-slate-200 flex flex-col">
      <HeroImage src={banner.image} alt={banner.alt} />

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative px-margin w-full flex-1 flex flex-col justify-center py-space-xl">
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
            <h1 className="banner-title font-bold text-white tracking-tight uppercase mb-space-sm">
              {t("title")}
            </h1>
            <p className="banner-lead text-white leading-relaxed">{t("description")}</p>
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

      <HeroStatBar
        items={STATS.map((stat) => ({
          key: stat.key,
          label: ts(`items.${stat.key}.label`),
          value: (
            <>
              <CountUp
                end={num(`items.${stat.key}.end`)}
                prefix={ts(`items.${stat.key}.prefix`)}
                suffix={ts(`items.${stat.key}.suffix`)}
                decimals={"decimals" in stat ? stat.decimals : 0}
                padStart={"padStart" in stat ? stat.padStart : 0}
              />
              {ts(`items.${stat.key}.unit`) && <span className="text-headline-sm font-normal">{ts(`items.${stat.key}.unit`)}</span>}
            </>
          ),
        }))}
      />
    </section>
  );
}
