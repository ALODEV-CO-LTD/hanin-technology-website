import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import BannerFrame from "@/components/ui/BannerFrame";
import CountUp from "@/components/ui/CountUp";
import HeroStatBar from "@/components/ui/HeroStatBar";

const STATS = [
  { key: "lines", padStart: 2 },
  { key: "pvd", padStart: 2 },
  { key: "wastewater" },
  { key: "staff" },
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
    <BannerFrame image={banner.image} alt={banner.alt}
      bar={<HeroStatBar
            items={STATS.map((stat) => ({
              key: stat.key,
              label: ts(`items.${stat.key}.label`),
              value: (
                <>
                  <CountUp
                    end={num(`items.${stat.key}.end`)}
                    prefix={ts(`items.${stat.key}.prefix`)}
                    suffix={ts(`items.${stat.key}.suffix`)}
                                    padStart={"padStart" in stat ? stat.padStart : 0}
                  />
                  {ts(`items.${stat.key}.unit`) && <span className="text-headline-sm font-normal">{ts(`items.${stat.key}.unit`)}</span>}
                </>
              ),
            }))}
          />}
    >
      <div className="w-full px-margin py-space-lg">
        <div className="">
          <PageBreadcrumb variant="dark"
            className="pb-6"
           
            items={[
              { label: t("breadcrumbHome"), href: "/" },
              { label: t("breadcrumbCurrent") },
            ]}
          />

          <div className="max-w-3xl pt-4">
            <BannerH1 className="font-bold text-white tracking-tight uppercase mb-space-sm">
              {t("title")}
            </BannerH1>
            <p className="banner-lead text-white leading-relaxed">{t("description")}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-md pt-8">
          <a
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 "
            href="#he-thong-nha-may"
          >
            {t("ctaExplore")}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150"
            href="#day-chuyen"
          >
            {t("ctaLines")}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150"
            href="#kiem-nghiem"
          >
            {t("ctaQa")}
          </a>
        </div>
      </div>
    </BannerFrame>
  );
}
