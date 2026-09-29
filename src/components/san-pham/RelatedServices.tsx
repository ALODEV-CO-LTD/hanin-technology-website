import { useTranslations } from "next-intl";
import { getProductDetailContent } from "@/lib/products-data";

export default function RelatedServices() {
  const tp = useTranslations("SanPham");
  const t = useTranslations("SanPham.RelatedServices");
  const { relatedServices } = getProductDetailContent(tp);

  return (
    <section className="w-full bg-white py-space-xl border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
              {t("title")}
            </h2>
            <p className="text-body-md text-slate-600 mt-1">{t("description")}</p>
          </div>
          <a
            className="inline-flex items-center gap-space-xs text-label-technical text-steel-600 hover:text-steel-700 transition-colors shrink-0 uppercase tracking-wider font-semibold"
            href="#"
          >
            <span>{t("ctaViewAll")}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {relatedServices.map((service) => (
            <div
              key={service.code}
              className="p-space-md bg-slate-50 border border-slate-200 rounded flex flex-col justify-between gap-space-md hover:border-steel-500 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-steel-600 text-[28px]">
                    {service.icon}
                  </span>
                  <span className="font-mono text-label-sm text-slate-500 font-medium">
                    {service.code}
                  </span>
                </div>
                <h3 className="text-headline-sm text-slate-900 group-hover:text-steel-600 transition-colors uppercase">
                  {service.title}
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{service.description}</p>
              </div>
              <a
                className="inline-flex items-center gap-1 text-label-sm text-steel-600 hover:text-steel-700 font-semibold transition-colors"
                href="#"
              >
                <span>{service.cta}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
