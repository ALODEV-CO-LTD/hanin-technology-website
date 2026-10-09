import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/CountUp";

export default function CompanySnapshot() {
  const t = useTranslations("Home.CompanySnapshot");

  // Số liệu chính thức do Bên A cung cấp (khách hàng: "hơn 100"; nhân sự 58; mặt bằng xưởng 2.230 m²; thành lập 28/03/2023).
  const STATS = [
    { key: "partners", separator: "" },
    { key: "staff", separator: "" },
    { key: "area", separator: "." },
    { key: "founded", separator: "" },
  ] as const;
  // Giá trị số và hậu tố lấy từ messages để chủ site sửa được trong CMS.
  const num = (key: string) => {
    const n = Number(t(key));
    return Number.isFinite(n) ? n : 0;
  };

  return (
    <section className="w-full bg-white py-space-lg border-y border-slate-200 scroll-mt-[var(--header-h)]" id="company-snapshot">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center justify-center gap-space-xs px-space-md py-space-lg text-center border-slate-200 max-lg:odd:border-r max-lg:nth-[-n+2]:border-b lg:border-r lg:last:border-r-0">
              <CountUp
                end={num(`${stat.key}.end`)}
                suffix={t(`${stat.key}.suffix`)}
                thousandsSeparator={stat.separator}
                className="text-display-hero-mobile lg:text-display-hero text-steel-600 font-bold tabular-nums"
              />
              <span className="text-label-technical text-slate-600 uppercase tracking-wider font-semibold">
                {t(`${stat.key}.label1`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
