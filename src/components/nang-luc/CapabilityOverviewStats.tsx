import { useTranslations } from "next-intl";

const STATS = [
  {
    key: "equipment",
    value: "42+",
    unit: "",
    accent: false,
  },
  {
    key: "lines",
    value: "16",
    unit: "",
    accent: false,
  },
  {
    key: "zones",
    value: "05",
    unit: "",
    accent: false,
  },
  {
    key: "precision",
    value: "±0.2",
    unit: "µm",
    accent: true,
  },
] as const;

export default function CapabilityOverviewStats() {
  const t = useTranslations("NangLuc.CapabilityOverviewStats");

  return (
    <section className="w-full bg-white border-b border-slate-200 py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="p-space-lg bg-slate-50 border border-slate-200/80 rounded-lg shadow-sm hover:border-steel-300 hover:bg-steel-50/20 transition-all"
            >
              <div className="text-label-technical text-steel-600 tracking-widest uppercase mb-1">
                {t(`items.${stat.key}.label`)}
              </div>
              <div
                className={`text-headline-xl font-bold tracking-tight ${
                  stat.accent ? "text-steel-600" : "text-slate-900"
                }`}
              >
                {stat.value}
                {stat.unit && <span className="text-headline-md font-normal text-slate-500">{stat.unit}</span>}
              </div>
              <div className="text-body-sm text-slate-500 mt-1">{t(`items.${stat.key}.desc`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
