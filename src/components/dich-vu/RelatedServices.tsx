import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getRelatedServices } from "@/server/public";
import Icon from "@/components/ui/Icon";

export default function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const locale = useLocale();
  const tr = useTranslations("DichVu.RelatedServices");
  const related = getRelatedServices(currentSlug, locale, 3);

  return (
    <section className="w-full bg-slate-50 mb-space-lg">
      <div className="flex items-center justify-between pb-space-sm mb-space-md flex-wrap gap-space-sm">
        <div>
          <h3 className="text-headline-sm text-slate-900 tracking-tight uppercase font-bold">{tr("heading")}</h3>
        </div>
        <Link
          href="/dich-vu-gia-cong-ma"
          className="text-label-technical text-steel-600 uppercase font-semibold flex items-center gap-1 hover:underline"
        >
          <span>{tr("viewAll")}</span>
          <Icon name="chevron_right" className="text-[16px]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {related.map((service) => (
          <Link
            key={service.slug}
            href={`/dich-vu-gia-cong-ma/${service.slug}`}
            className="group bg-white border border-slate-200 p-space-md rounded shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-label-sm text-steel-600 uppercase font-semibold">{service.code}</span>
                <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform text-[20px]" />
              </div>
              <h4 className="text-title-md text-slate-900 uppercase group-hover:text-steel-600 transition-colors font-bold">
                {service.title}
              </h4>
              <p className="text-body-md text-slate-600 mt-2">{service.description}</p>
            </div>
            <div className="mt-space-md pt-space-xs text-label-sm text-slate-500">{service.statLabel}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
