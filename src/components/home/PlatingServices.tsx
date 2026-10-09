import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getServices } from "@/server/public";
import Icon from "@/components/ui/Icon";

export default function PlatingServices() {
  const t = useTranslations("Home.PlatingServices");
  const locale = useLocale();
  const services = getServices(locale, 4);

  if (services.length === 0) return null;

  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-headline-lg text-slate-900 font-bold">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/dich-vu-gia-cong-ma"
            className="inline-flex items-center gap-2 py-3 -my-3 text-label-technical uppercase tracking-wider text-slate-600 hover:text-steel-600 font-semibold transition-colors whitespace-nowrap"
          >
            <span>{t("ctaAll")}</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/dich-vu-gia-cong-ma/${service.slug}`}
              className="relative overflow-hidden flex flex-col justify-between p-space-lg pt-[calc(var(--spacing-space-lg)+4px)] bg-white border border-slate-200 rounded shadow-md hover:shadow-xl hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-steel-600 transition-all duration-200 group before:absolute before:inset-x-0 before:top-0 before:h-1 before:[background:var(--color-steel-600)] before:content-['']"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-headline-lg text-steel-600 font-bold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs px-2 py-1 rounded bg-steel-100 text-steel-700 uppercase font-semibold">
                    {service.code}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-headline-sm text-slate-900 font-bold group-hover:text-steel-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="pt-space-lg mt-space-md border-t border-slate-200 flex items-center justify-between text-steel-600 transition-colors">
                <span className="text-xs uppercase tracking-wider font-semibold">
                  {t("detailLabel")}
                </span>
                <Icon name="east" className="text-[20px] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
