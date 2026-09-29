import { useTranslations } from "next-intl";

export default function DevelopmentDirection() {
  const t = useTranslations("GioiThieu.DevelopmentDirection");

  const CORE_VALUES = [
    { key: "precision", icon: "straighten", index: "/ 01" },
    { key: "stability", icon: "cyclone", index: "/ 02" },
    { key: "partnership", icon: "handshake", index: "/ 03" },
  ] as const;

  return (
    <section className="w-full bg-[#f8fafc] py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Layout: Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-xl">
          <div className="lg:col-span-5">
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-body-md md:text-body-lg text-slate-600 leading-relaxed">{t("subtitle")}</p>
          </div>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {CORE_VALUES.map((value) => (
            <div
              key={value.key}
              className="p-space-lg rounded bg-white border border-slate-200 hover:border-steel-600/60 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded bg-steel-50 border border-steel-100 flex items-center justify-center mb-space-md text-steel-600">
                <span className="material-symbols-outlined">{value.icon}</span>
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs font-bold flex items-center gap-2">
                {t(`${value.key}.title`)}
                <span className="font-mono text-xs text-steel-600 font-normal">{value.index}</span>
              </h3>
              <p className="text-body-md text-slate-600 leading-relaxed">{t(`${value.key}.desc`)}</p>
              <div className="mt-space-md pt-space-sm border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                {t(`${value.key}.note`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
