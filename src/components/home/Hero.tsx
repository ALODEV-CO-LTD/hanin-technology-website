import { useLocale, useTranslations } from "next-intl";
import { getBanner } from "@/server/public";
import Icon from "@/components/ui/Icon";
import HeroImage from "@/components/ui/HeroImage";
import CountUp from "@/components/ui/CountUp";
import HeroStatBar from "@/components/ui/HeroStatBar";

// Số liệu chính thức do Bên A cung cấp (khách hàng: "hơn 100"; nhân sự 58; mặt bằng xưởng 2.230 m²; thành lập 28/03/2023).
const STATS = [
  { key: "partners", separator: "" },
  { key: "staff", separator: "" },
  { key: "area", separator: "." },
  { key: "founded", separator: "" },
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
    <section className="relative w-full min-h-[calc(100svh-var(--header-h))] flex flex-col overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <HeroImage src={banner.image} alt={banner.alt || t("imageAlt")} />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35" />
      <div className="relative z-10 w-full flex-1 px-margin py-space-xl flex flex-col justify-center">
        <div className="max-w-3xl flex flex-col gap-space-md">
          <div className="flex flex-col gap-2 banner-text">
            <h1 className="banner-title text-white uppercase tracking-tight font-bold">
              {t("titlePrefix")} <span>{t("titleHighlight")}</span>
            </h1>
            <p className="text-headline-md text-white font-semibold tracking-tight">
              {t("subtitle")}
            </p>
          </div>

          <p className="banner-lead text-white leading-relaxed banner-text">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <a
              href="#nang-luc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
            >
              {t("ctaPrimary")}
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center gap-2 py-3.5 text-white hover:text-white text-title-md uppercase tracking-wider underline-offset-8 decoration-2 hover:underline transition-colors duration-150 banner-text"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </div>

      <HeroStatBar
        id="company-snapshot"
        items={STATS.map((stat) => ({
          key: stat.key,
          label: ts(`${stat.key}.label1`),
          value: <CountUp end={num(`${stat.key}.end`)} suffix={ts(`${stat.key}.suffix`)} thousandsSeparator={stat.separator} />,
        }))}
      />
    </section>
  );
}
