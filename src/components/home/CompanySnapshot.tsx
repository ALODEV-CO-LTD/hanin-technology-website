import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/CountUp";

export default function CompanySnapshot() {
  const t = useTranslations("Home.CompanySnapshot");

  // Số liệu chính thức do Bên A cung cấp (khách hàng: "hơn 100"; nhân sự 58; mặt bằng xưởng 2.230 m²; thành lập 28/03/2023).
  const STATS = [
    { key: "partners", end: 100, suffix: "+", separator: "" },
    { key: "staff", end: 58, suffix: "", separator: "" },
    { key: "area", end: 2230, suffix: " m²", separator: "." },
    { key: "founded", end: 2023, suffix: "", separator: "" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-lg border-y border-slate-200 scroll-mt-[86px]" id="company-snapshot">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {STATS.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center justify-center gap-space-xs px-space-md py-space-lg text-center">
              <CountUp
                end={stat.end}
                suffix={stat.suffix}
                thousandsSeparator={stat.separator}
                className="text-display-hero-mobile lg:text-display-hero text-steel-600 font-bold tabular-nums"
              />
              <span className="text-label-technical text-slate-500 uppercase tracking-wider font-semibold">
                {t(`${stat.key}.label1`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
