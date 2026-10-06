import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/CountUp";

export default function CapabilitySnapshot() {
  const t = useTranslations("GioiThieu.CapabilitySnapshot");

  const SNAPSHOT_STATS = [
    { key: "equipment", end: 50, suffix: "+", padStart: 0, thousandsSeparator: "" },
    { key: "lines", end: 6, suffix: "+", padStart: 2, thousandsSeparator: "" },
    { key: "zones", end: 4, suffix: "", padStart: 2, thousandsSeparator: "" },
    { key: "capacity", end: 1200, suffix: "+", padStart: 0, thousandsSeparator: "." },
  ] as const;

  return (
    <section className="w-full bg-white py-space-lg border-b border-slate-200">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {SNAPSHOT_STATS.map((stat) => (
            <div key={stat.key} className="flex flex-col p-space-sm md:p-space-md">
              <span className="text-xs text-steel-600 uppercase tracking-widest mb-1 font-bold">
                {t(`${stat.key}.label`)}
              </span>
              <div className="text-headline-xl md:text-display-hero text-slate-900 font-bold tracking-tight font-mono">
                <CountUp
                  end={stat.end}
                  padStart={stat.padStart}
                  thousandsSeparator={stat.thousandsSeparator}
                />
                <span className="text-steel-600">{stat.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
