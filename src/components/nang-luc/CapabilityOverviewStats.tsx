import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  {
    key: "equipment",
    end: 42,
    suffix: "+",
    unit: "",
    accent: false,
  },
  {
    key: "lines",
    end: 16,
    suffix: "",
    unit: "",
    accent: false,
  },
  {
    key: "zones",
    end: 5,
    suffix: "",
    padStart: 2,
    unit: "",
    accent: false,
  },
  {
    key: "precision",
    end: 0.2,
    prefix: "±",
    decimals: 1,
    suffix: "",
    unit: "µm",
    accent: true,
  },
] as const;

export default function CapabilityOverviewStats() {
  const t = useTranslations("NangLuc.CapabilityOverviewStats");

  return (
    <section className="w-full bg-white border-b border-slate-200 py-space-xl">
      <div className="mx-auto px-margin w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {STATS.map((stat) => (
            <div key={stat.key} className="p-space-md lg:p-space-lg">
              <div className="text-label-technical text-steel-600 tracking-widest uppercase mb-1">
                {t(`items.${stat.key}.label`)}
              </div>
              <div
                className={`text-headline-xl font-bold tracking-tight ${
                  stat.accent ? "text-steel-600" : "text-slate-900"
                }`}
              >
                <CountUp
                  end={stat.end}
                  prefix={"prefix" in stat ? stat.prefix : ""}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                  padStart={"padStart" in stat ? stat.padStart : 0}
                />
                {stat.unit && <span className="text-headline-md font-normal text-slate-500">{stat.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
