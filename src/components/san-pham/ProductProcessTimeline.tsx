import { useTranslations } from "next-intl";
import { getProductDetailContent } from "@/lib/products-data";

export default function ProductProcessTimeline() {
  const tp = useTranslations("SanPham");
  const t = useTranslations("SanPham.ProductProcessTimeline");
  const { process } = getProductDetailContent(tp);

  return (
    <section className="w-full bg-white py-space-xl border-b border-slate-200">
      <div className="mx-auto px-margin">
        <div className="mb-space-lg">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter relative">
          {process.map((item, index) => (
            <div
              key={item.step}
              className="p-space-md bg-white border border-slate-200 rounded flex flex-col justify-between gap-space-md relative group hover:border-steel-600 hover:shadow-md transition-all shadow-sm"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-headline-lg text-steel-600 font-bold leading-none">
                    {item.step}
                  </span>
                  <span
                    className={
                      index === process.length - 1
                        ? "w-3 h-3 rounded-full bg-steel-600"
                        : "w-3 h-3 rounded-full bg-steel-600"
                    }
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-headline-sm text-slate-900 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-body-md text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
