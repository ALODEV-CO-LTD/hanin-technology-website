import { useTranslations } from "next-intl";
import { getProductDetailContent } from "@/lib/products-data";

export default function ProductOverview() {
  const tp = useTranslations("SanPham");
  const t = useTranslations("SanPham.ProductOverview");
  const { overviewParagraphs, achievements, specSheet } = getProductDetailContent(tp);

  return (
    <section className="w-full bg-white py-space-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-space-lg">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="space-y-space-md text-body-md text-slate-600 leading-relaxed">
              {overviewParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-col gap-space-sm pt-space-sm">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-space-sm p-space-sm bg-slate-50 border border-slate-200 rounded"
                >
                  <span className="material-symbols-outlined text-steel-600 text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div className="flex flex-col">
                    <span className="text-title-md text-slate-900 font-semibold">{item.title}</span>
                    <span className="text-body-sm text-slate-600">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
            <div className="p-space-sm bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-label-technical uppercase tracking-wider text-slate-900">
                <span className="material-symbols-outlined text-steel-600 text-[18px]">terminal</span>
                <span>{t("specSheetTitle")}</span>
              </div>
              <span className="font-mono text-label-sm text-sky-700 font-semibold">{t("specSheetRevision")}</span>
            </div>
            <div className="divide-y divide-slate-100 text-label-technical">
              {specSheet.map((row) => (
                <div key={row.label} className="p-space-sm flex flex-col gap-1">
                  <span className="text-slate-400 text-label-sm uppercase">{row.label}:</span>
                  <span
                    className={
                      row.accent
                        ? "text-steel-600 font-semibold"
                        : row.technical
                        ? "text-sky-700 font-semibold"
                        : "text-slate-900 font-semibold"
                    }
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-space-sm bg-slate-50 border-t border-slate-200 flex items-center justify-between text-label-sm">
              <span className="text-slate-500">{t("batchStatusLabel")}</span>
              <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-700 font-mono font-semibold rounded">
                {t("batchStatusValue")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
