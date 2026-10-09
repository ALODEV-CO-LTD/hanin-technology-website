import { useTranslations } from "next-intl";

export default function CompanyJourney() {
  const t = useTranslations("GioiThieu.CompanyJourney");

  const MILESTONES = ["m1", "m2", "m3", "m4"] as const;

  return (
    <section className="w-full bg-slate-50 py-space-xl border-y border-slate-200">
      <div className="mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
          </div>
        </div>

        {/* Engineering Timeline Layout */}
        <div className="relative pt-6">
          {/* Connecting Technical Ruler Line */}
          <div className="hidden lg:block absolute top-10 left-6 right-6 h-px bg-slate-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-steel-600/30 to-transparent" />
          </div>

          {/* 4 Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {MILESTONES.map((key, i) => (
              <div
                key={key}
                className="relative flex flex-col p-space-md rounded bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="w-8 h-8 rounded bg-steel-50 border border-steel-200 flex items-center justify-center text-label-technical text-steel-600 font-bold group-hover:bg-steel-600 group-hover:border-steel-600 group-hover:text-white transition-colors">
                    {`0${i + 1}`}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-600 px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                    {t(`${key}.yearTag`)}
                  </span>
                </div>
                <h3 className="text-title-md text-slate-900 font-semibold mb-2 group-hover:text-steel-600 transition-colors">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{t(`${key}.desc`)}</p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
