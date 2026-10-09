import { useTranslations } from "next-intl";

const STEPS = [
  { key: "receiving", step: "01" },
  { key: "surfacePrep", step: "02" },
  { key: "mainPlating", step: "03" },
  { key: "inspection", step: "04" },
  { key: "finishing", step: "05" },
  { key: "packaging", step: "06" },
] as const;

export default function ProductionFlow() {
  const t = useTranslations("NangLuc.ProductionFlow");

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="mx-auto px-margin w-full">
        <div className="max-w-2xl mb-space-xl">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight mb-space-xs">
            {t("sectionTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {STEPS.map((s) => (
            <div
              key={s.key}
              className="p-space-md sm:p-space-lg bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 hover:shadow-md transition-all flex flex-col justify-between"
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
            </div>
          ))}
        </div>

        <a
          href="#quy-trinh-cong-doan"
          className="mt-space-lg inline-flex min-h-11 items-center gap-2 text-label-technical font-semibold uppercase tracking-wider text-steel-600 hover:underline"
        >
          {t("viewDetail")} →
        </a>
      </div>
    </section>
  );
}
