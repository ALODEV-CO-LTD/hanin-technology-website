import { useTranslations } from "next-intl";

export default function CapabilitySnapshot() {
  const t = useTranslations("GioiThieu.CapabilitySnapshot");

  const SNAPSHOT_STATS = [
    { key: "equipment", value: "50", suffix: "+" },
    { key: "lines", value: "06", suffix: "+" },
    { key: "zones", value: "04", suffix: "" },
    { key: "capacity", value: "1.200", suffix: "+" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-lg border-b border-slate-200">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {SNAPSHOT_STATS.map((stat) => (
            <div key={stat.key} className="flex flex-col p-space-sm md:p-space-md">
              <span className="text-[10px] text-steel-600 uppercase tracking-widest mb-1 font-bold">
                {t(`${stat.key}.label`)}
              </span>
              <div className="text-headline-xl md:text-display-hero text-slate-900 font-bold tracking-tight font-mono">
                {stat.value}
                <span className="text-steel-600">{stat.suffix}</span>
              </div>
              <span className="text-body-sm text-slate-600 mt-1">{t(`${stat.key}.desc`)}</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">{t(`${stat.key}.note`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
