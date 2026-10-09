import { useTranslations } from "next-intl";
import { getProductDetailContent } from "@/lib/products-data";
import Icon from "@/components/ui/Icon";

export default function ProductOverview() {
  const tp = useTranslations("SanPham");
  const t = useTranslations("SanPham.ProductOverview");
  const { overviewParagraphs, achievements, specSheet } = getProductDetailContent(tp);

  return (
    <section className="w-full bg-slate-50 py-space-xl border-b border-slate-200">
      <div className="mx-auto px-margin">
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
                  <Icon name="check_circle" className="text-steel-600 text-[20px] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-title-md text-slate-900 font-semibold">{item.title}</span>
                    <span className="text-body-md text-slate-600">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
            <div className="p-space-sm bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-label-technical uppercase tracking-wider text-slate-900">
                <Icon name="fact_check" className="text-steel-600 text-[18px]" />
                <span>{t("specSheetTitle")}</span>
              </div>
            </div>
            <dl className="divide-y divide-slate-100">
              {specSheet.slice(0, 6).map((row) => (
                <div key={row.label} className="p-space-sm flex flex-col gap-1">
                  <dt className="text-steel-600 text-label-sm uppercase font-semibold">{row.label}</dt>
                  <dd
                    className={
                      row.accent
                        ? "text-body-md text-steel-600 font-semibold"
                        : row.technical
                        ? "text-body-md text-steel-700 font-semibold"
                        : "text-body-md text-slate-900 font-semibold"
                    }
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
