import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/CountUp";

export default function CapabilitySnapshot() {
  const t = useTranslations("GioiThieu.CapabilitySnapshot");

  const SNAPSHOT_STATS = [
    { key: "equipment", padStart: 0, thousandsSeparator: "" },
    { key: "lines", padStart: 2, thousandsSeparator: "" },
    { key: "zones", padStart: 2, thousandsSeparator: "" },
    { key: "capacity", padStart: 0, thousandsSeparator: "." },
  ] as const;
  // Giá trị số và hậu tố lấy từ messages để chủ site sửa được trong CMS.
  const num = (key: string) => {
    const n = Number(t(key));
    return Number.isFinite(n) ? n : 0;
  };

  return (
    <section className="w-full bg-white py-space-lg border-b border-slate-200">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {SNAPSHOT_STATS.map((stat) => (
            <div key={stat.key} className="flex flex-col p-space-sm md:p-space-md">
              <span className="text-xs text-steel-600 uppercase tracking-wider mb-1 font-bold">
                {t(`${stat.key}.label`)}
              </span>
              <div className="text-headline-xl md:text-display-hero text-slate-900 font-bold tracking-tight">
                <CountUp
                  end={num(`${stat.key}.end`)}
                  padStart={stat.padStart}
                  thousandsSeparator={stat.thousandsSeparator}
                />
                <span className="text-steel-600">{t(`${stat.key}.suffix`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
