import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import BannerFrame from "@/components/ui/BannerFrame";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CountUp from "@/components/ui/CountUp";
import HeroStatBar from "@/components/ui/HeroStatBar";

const STATS = [
  { key: "lines", padStart: 2, thousandsSeparator: "" },
  { key: "pvd", padStart: 2, thousandsSeparator: "" },
  { key: "wastewater", padStart: 0, thousandsSeparator: "" },
  { key: "staff", padStart: 0, thousandsSeparator: "" },
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
    <BannerFrame image={banner.image} alt={banner.alt || t("imageAlt")}
      bar={<HeroStatBar
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
          />}
    >
      <div className="w-full px-margin py-space-lg">
        <PageBreadcrumb variant="dark"
          className="mb-space-sm"
         
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
    </BannerFrame>
  );
}
