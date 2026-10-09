import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getServices } from "@/server/public";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

export default function ServiceCategories() {
  const locale = useLocale();
  const tc = useTranslations("DichVu.ServiceCategories");
  const services = getServices(locale);

  return (
    <section className="w-full bg-slate-50 mb-space-xl">
      <div className="flex items-center justify-between mb-space-md">
        <div>
          <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">
            {tc("heading")}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {services.map((service) => (
          <div
            key={service.slug}
            className="relative bg-white border border-slate-200 rounded overflow-hidden shadow-sm flex flex-col group hover:-translate-y-1 hover:shadow-md focus-within:border-steel-600 transition-all"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <Photo
                alt={service.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={service.image}
              />
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
              <div>
                <h3 className="text-title-md text-slate-900 font-bold">{service.title}</h3>
                <p className="text-label-sm text-slate-600 font-medium uppercase mb-2">{service.titleEn}</p>
                <p className="text-body-md text-slate-600">{service.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-label-sm text-steel-600 font-bold">{service.statLabel}</span>
                <Link
                  href={`/dich-vu-gia-cong-ma/${service.slug}`}
                  className="text-steel-600 text-label-technical font-bold uppercase inline-flex min-h-11 items-center gap-1 hover:underline after:absolute after:inset-0 after:content-['']"
                >
                  {tc("detailLink")} <Icon name="arrow_forward" className="text-[14px]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
