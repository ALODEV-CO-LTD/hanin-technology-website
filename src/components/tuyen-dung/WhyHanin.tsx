import { useTranslations } from "next-intl";

export default function WhyHanin() {
  const t = useTranslations("TuyenDung.WhyHanin");

  const PILLARS = [
    {
      key: "pillar1",
      icon: "health_and_safety",
    },
    {
      key: "pillar2",
      icon: "trending_up",
    },
    {
      key: "pillar3",
      icon: "model_training",
    },
    {
      key: "pillar4",
      icon: "card_giftcard",
    },
  ] as const;

  return (
    <section className="w-full py-space-xl bg-white">
      <div className="mx-auto px-margin">
        <div className="flex flex-col gap-2 max-w-3xl mb-space-xl">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
            {t("title")}
          </h2>
          <p className="text-body-lg text-slate-600">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.key}
              className="group p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:border-steel-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-space-md">
                <div className="w-12 h-12 rounded bg-white flex items-center justify-center text-steel-600 group-hover:bg-steel-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">{pillar.icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label-sm font-semibold text-steel-600 uppercase tracking-widest">
                    {t(`${pillar.key}.tag`)}
                  </span>
                  <h3 className="text-title-md text-slate-900 uppercase font-semibold">{t(`${pillar.key}.title`)}</h3>
                </div>
                <p className="text-body-sm text-slate-600 leading-relaxed">{t(`${pillar.key}.desc`)}</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-slate-200 flex items-center justify-between text-label-sm text-slate-500">
                <span>{t(`${pillar.key}.metricLabel`)}</span>
                <span className="text-slate-900 font-semibold">{t(`${pillar.key}.metricValue`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
