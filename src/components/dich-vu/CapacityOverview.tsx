import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function CapacityOverview() {
  const t = useTranslations("DichVu.CapacityOverview");

  const CAPABILITIES = [
    { key: "scada", icon: "precision_manufacturing", iconBg: "bg-steel-100", iconColor: "text-steel-600", statRightColor: "text-steel-600" },
    { key: "complex", icon: "science", iconBg: "bg-sky-100", iconColor: "text-sky-700", statRightColor: "text-sky-700" },
    { key: "wastewater", icon: "water_ec", iconBg: "bg-slate-200", iconColor: "text-slate-700", statRightColor: "text-slate-900" },
  ] as const;

  return (
    <section className="w-full mb-space-xl scroll-mt-[86px]" id="capacity-overview">
      <div className="bg-white border border-slate-200 rounded p-space-md lg:p-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">
              {t("heading")}
            </h2>
          </div>
          <p className="text-body-md text-slate-600 max-w-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {CAPABILITIES.map((item) => (
            <div key={item.key} className="bg-white border border-slate-200 p-space-md rounded shadow-sm">
              <div className={`w-10 h-10 rounded ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-space-sm`}>
                <Icon name={item.icon} className="text-[24px]" />
              </div>
              <h3 className="text-title-md text-slate-900 font-bold mb-1">{t(`${item.key}.title`)}</h3>
              <p className="text-body-md text-slate-600">{t(`${item.key}.desc`)}</p>
              <div className="mt-space-sm pt-space-xs text-label-sm text-slate-500 uppercase flex items-center justify-between">
                <span>{t(`${item.key}.statLeft`)}</span>
                <span className={`font-bold ${item.statRightColor}`}>{t(`${item.key}.statRight`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
