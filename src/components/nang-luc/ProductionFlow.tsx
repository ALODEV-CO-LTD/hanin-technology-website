import { useTranslations } from "next-intl";

const STEPS = [
  { key: "receiving", step: "STEP // 01" },
  { key: "surfacePrep", step: "STEP // 02" },
  { key: "mainPlating", step: "STEP // 03" },
  { key: "inspection", step: "STEP // 04" },
  { key: "finishing", step: "STEP // 05" },
  { key: "packaging", step: "STEP // 06" },
] as const;

export default function ProductionFlow() {
  const t = useTranslations("NangLuc.ProductionFlow");

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="max-w-2xl mb-space-xl">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight mb-space-xs">
            {t("sectionTitle")}
          </h2>
          <p className="text-body-md text-slate-600">{t("sectionDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {STEPS.map((s) => (
            <div
              key={s.key}
              className="p-space-lg bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-space-sm mb-space-sm">
                  <span className="text-label-technical text-steel-600 font-bold">{s.step}</span>
                  <span className="w-2 h-2 rounded-full bg-steel-600" />
                </div>
                <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">
                  {t(`items.${s.key}.title`)}
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{t(`items.${s.key}.desc`)}</p>
              </div>
              <div className="mt-space-md pt-space-xs text-slate-500 text-label-sm border-t border-slate-200/60">
                {t(`items.${s.key}.standard`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
