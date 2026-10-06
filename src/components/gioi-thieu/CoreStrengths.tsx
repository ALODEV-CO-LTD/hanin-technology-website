import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function CoreStrengths() {
  const t = useTranslations("GioiThieu.CoreStrengths");

  const STRENGTHS = [
    { key: "production", index: "01", icon: "precision_manufacturing", metricClass: "text-sky-700" },
    { key: "technology", index: "02", icon: "memory", metricClass: "text-sky-700" },
    { key: "quality", index: "03", icon: "verified", metricClass: "text-sky-700" },
    { key: "support", index: "04", icon: "support_agent", metricClass: "text-steel-600 font-bold" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-xl">
      <div className="mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col mb-space-xl">
          <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
            {t("heading")}
          </h2>
        </div>

        {/* Grid of 4 Structured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {STRENGTHS.map((item) => (
            <div
              key={item.key}
              className="p-space-lg rounded bg-slate-50 border border-slate-200 hover:border-steel-600/60 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                  <h3 className="text-headline-sm text-slate-900 uppercase font-bold">
                    {item.index} {t(`${item.key}.title`)}
                  </h3>
                  <Icon name={item.icon} className="shrink-0 text-slate-400 group-hover:text-steel-600 transition-colors" />
                </div>
                <p className="text-body-md text-slate-600 leading-relaxed">{t(`${item.key}.desc`)}</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>{t(`${item.key}.metricLabel`)}</span>
                <span className={item.metricClass}>{t(`${item.key}.metricValue`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
