import { useLocale, useTranslations } from "next-intl";
import BannerH1 from "@/components/ui/BannerH1";
import { getBanner } from "@/server/public";
import Icon from "@/components/ui/Icon";
import HeroImage from "@/components/ui/HeroImage";
import CountUp from "@/components/ui/CountUp";
import HeroStatBar from "@/components/ui/HeroStatBar";

// Số liệu chính thức do Bên A cung cấp (khách hàng: "hơn 100"; nhân sự 58; mặt bằng xưởng 2.230 m²). Ô cuối là chứng nhận ISO 9001 (chữ, không đếm số).
const STATS = [
  { key: "partners", separator: "", icon: "handshake" },
  { key: "staff", separator: "", icon: "engineering" },
  { key: "area", separator: ".", icon: "factory" },
] as const;

export default function Hero() {
  const t = useTranslations("Home.Hero");
  const ts = useTranslations("Home.CompanySnapshot");
  const num = (key: string) => {
    const n = Number(ts(key));
    return Number.isFinite(n) ? n : 0;
  };
  const banner = getBanner("home-hero", useLocale(), "/images/factory/ma-treo-2.jpg");

  return (
    <section className="relative w-full hero-screen flex flex-col overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0">
        <HeroImage src={banner.image} alt={banner.alt || t("imageAlt")} />
      </div>

      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-full lg:w-3/4 banner-scrim" />
      {/* Lệch lên khoảng 50px so với tâm vùng giữa header và dải số liệu: đáy đệm lớn hơn đỉnh 100px trở lên. */}
      <div className="relative z-10 w-full flex-1 px-margin pt-space-lg pb-space-xl sm:pt-space-md sm:pb-[116px] flex flex-col justify-center">
        <div className="max-w-3xl flex flex-col">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-amber-400">
            <Icon name="location_on" className="text-[16px]" />
            {t("badge")}
          </span>

          <div className="banner-text">
            <BannerH1 className="text-white uppercase tracking-tight font-bold">
              {t("titlePrefix")} <span>{t("titleHighlight")}</span>
            </BannerH1>
          </div>

          <p className="banner-lead mt-space-md max-w-xl text-gray-200 leading-relaxed banner-text">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-lg">
            <a
              href="#nang-luc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-transparent bg-[#E5A93C] hover:bg-[#D4962A] text-[#0F172A] text-title-md font-semibold uppercase tracking-wider rounded transition-all duration-150"
            >
              {t("ctaPrimary")}
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/80 bg-white/5 text-white hover:bg-white hover:text-slate-900 text-title-md font-semibold uppercase tracking-wider rounded transition-all duration-150"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </div>

      <HeroStatBar
        id="company-snapshot"
        variant="left"
        items={[
          ...STATS.map((stat) => ({
            key: stat.key,
            icon: stat.icon,
            label: t(`stats.${stat.key}`),
            value: <CountUp end={num(`${stat.key}.end`)} suffix={ts(`${stat.key}.suffix`)} thousandsSeparator={stat.separator} />,
          })),
          { key: "quality", icon: "verified", label: t("stats.quality"), value: t("stats.qualityValue") },
        ]}
      />
    </section>
  );
}
