import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function CoreStrengths() {
  const t = useTranslations("GioiThieu.CoreStrengths");

  const STRENGTHS = [
    { key: "production", index: "01", icon: "precision_manufacturing", metricClass: "text-steel-700" },
    { key: "technology", index: "02", icon: "memory", metricClass: "text-steel-700" },
    { key: "quality", index: "03", icon: "verified", metricClass: "text-steel-700" },
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
              className="p-space-md sm:p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-space-sm mb-space-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-steel-50 border border-steel-200 text-label-technical font-bold text-steel-600 group-hover:bg-steel-600 group-hover:border-steel-600 group-hover:text-white transition-colors">
                    {item.index}
                  </span>
                  <Icon name={item.icon} className="shrink-0 text-slate-400 group-hover:text-steel-600 transition-colors" />
                </div>
                <h3 className="text-headline-sm text-slate-900 uppercase font-bold mb-space-xs">{t(`${item.key}.title`)}</h3>
                <p className="text-body-md text-slate-600 leading-relaxed">{t(`${item.key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
