import { useTranslations } from "next-intl";

export default function QualityStandardsPreview() {
  const t = useTranslations("GioiThieu.QualityStandardsPreview");

  const CERTIFICATES = [
    { key: "iso9001", icon: "workspace_premium" },
    { key: "iso14001", icon: "eco" },
    { key: "rohs", icon: "fact_check" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-xl border-t border-slate-200">
      <div className="mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
          </div>
          <p className="text-body-sm text-slate-500 max-w-md">{t("subtitle")}</p>
        </div>

        {/* 3 Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.key}
              className="p-space-lg rounded bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-slate-300 shadow-sm transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="text-[11px] text-steel-600 font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-steel-100/70 border border-steel-200">
                    {t(`${cert.key}.tag`)}
                  </span>
                  <span className="material-symbols-outlined text-slate-500">{cert.icon}</span>
                </div>
                <h3 className="text-title-md text-slate-900 font-semibold mb-2">{t(`${cert.key}.title`)}</h3>
                <p className="text-body-sm text-slate-600">{t(`${cert.key}.desc`)}</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{t(`${cert.key}.standard`)}</span>
                <span className="text-sky-700 font-semibold">{t(`${cert.key}.status`)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-space-sm text-label-technical text-steel-600 hover:text-slate-900 transition-colors uppercase tracking-widest font-bold"
            href="#"
          >
            {t("cta")}
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
