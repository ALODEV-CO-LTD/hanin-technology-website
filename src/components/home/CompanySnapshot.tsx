import { useTranslations } from "next-intl";
import CountUp from "@/components/ui/CountUp";

export default function CompanySnapshot() {
  const t = useTranslations("Home.CompanySnapshot");

  const STATS = [
    { key: "partners", end: 150, suffix: "+" },
    { key: "projects", end: 320, suffix: "+" },
    { key: "lines", end: 24, suffix: "+" },
    { key: "capacity", end: 850, suffix: "+" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-lg border-y border-slate-200" id="company-snapshot">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="flex flex-col gap-1 p-space-md bg-slate-50 border border-slate-200/80 rounded transition-colors hover:border-steel-200 hover:bg-steel-50/30"
            >
              <div className="flex items-baseline gap-1">
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  className="text-headline-xl text-steel-600 font-bold"
                />
                <span className="text-xs text-slate-500 uppercase font-semibold">
                  {t(`${stat.key}.label1`)}
                </span>
              </div>
              <span className="text-label-technical text-slate-600 uppercase tracking-wider">
                {t(`${stat.key}.label2`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
