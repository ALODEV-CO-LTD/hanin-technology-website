import { useServiceNs } from "@/lib/service-ns";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function DetailApplications({ slug }: { slug: string }) {
  const t = useTranslations(useServiceNs(slug, "DetailApplications"));

  const APPLICATIONS = [
    { key: "oilGas", icon: "valve" },
    { key: "mold", icon: "precision_manufacturing" },
    { key: "electronics", icon: "sensors" },
    { key: "automotive", icon: "directions_car" },
  ] as const;

  return (
    <section className="w-full mb-space-xl">
      <div className="bg-slate-50 border border-slate-200 p-space-md sm:p-space-lg rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-md mb-space-md gap-space-sm">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {APPLICATIONS.map((item) => (
            <div key={item.key} className="bg-white border border-slate-200 p-space-md rounded flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-steel-600 mb-space-sm">
                  <Icon name={item.icon} className="text-[24px]" />
                </div>
                <span className="text-label-sm text-steel-600 uppercase font-semibold">{t(`${item.key}.tag`)}</span>
                <h3 className="text-title-md text-slate-900 uppercase mt-1 mb-2 font-bold">{t(`${item.key}.title`)}</h3>
                <p className="text-body-md text-slate-600">{t(`${item.key}.desc`)}</p>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-slate-200 text-sm text-slate-600">{t(`${item.key}.thickness`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
