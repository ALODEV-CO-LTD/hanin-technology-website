import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Photo from "@/components/ui/Photo";

export default function EquipmentGrid() {
  const t = useTranslations("NangLuc.EquipmentGrid");

  const MACHINES = [
    {
      key: "rectifier",
      image: siteImg("nang-luc/EquipmentGrid#1", "/images/factory/phan-tich-3.jpg"),
    },
    {
      key: "ultrasonic",
      image: siteImg("nang-luc/EquipmentGrid#2", "/images/factory/phan-tich-2.jpg"),
    },
    {
      key: "hoist",
      image: siteImg("nang-luc/EquipmentGrid#3", "/images/factory/ma-treo-4.jpg"),
    },
    {
      key: "deEmbrittlement",
      image: siteImg("nang-luc/EquipmentGrid#4", "/images/factory/ma-quay-4.jpg"),
    },
  ] as const;

  const specs = (key: (typeof MACHINES)[number]["key"]): { label: string; value: string }[] => {
    const v = (k: string) => t(`items.${key}.${k}`);
    switch (key) {
      case "rectifier":
        return [
          { label: v("specLoad"), value: v("specLoadValue") },
          { label: v("specStability"), value: v("specStabilityValue") },
          { label: v("specControl"), value: v("specControlValue") },
        ];
      case "ultrasonic":
        return [
          { label: v("specFrequency"), value: v("specFrequencyValue") },
          { label: v("specHeating"), value: v("specHeatingValue") },
          { label: v("specVolume"), value: v("specVolumeValue") },
        ];
      case "hoist":
        return [
          { label: v("specLoad"), value: `${v("specLoadValue")} ${v("specLoadUnit")}` },
          { label: v("specSpeed"), value: `${v("specSpeedValue")} PLC` },
          { label: v("specSensor"), value: v("specSensorValue") },
        ];
      default:
        return [
          { label: v("specMaxTemp"), value: v("specMaxTempValue") },
          { label: v("specSensor"), value: v("specSensorValue") },
          { label: v("specStandard"), value: v("specStandardValue") },
        ];
    }
  };

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {MACHINES.map((m) => (
            <div
              key={m.key}
              className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:border-steel-300 hover:shadow-md transition-all"
            >
              <div className="relative h-44 bg-slate-200 overflow-hidden">
                <Photo className="w-full h-full object-cover" alt={t(`items.${m.key}.alt`)} src={m.image} />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-title-md text-slate-900 uppercase mb-space-xs font-semibold">
                    {t(`items.${m.key}.title`)}
                  </h3>
                  <p className="text-body-sm text-slate-600 mb-space-md">{t(`items.${m.key}.desc`)}</p>
                </div>
                <dl className="divide-y divide-slate-200 rounded border border-slate-200 bg-white px-space-sm text-label-sm">
                  {specs(m.key).map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-space-sm py-1.5">
                      <dt className="text-slate-600">{row.label.replace(/:\s*$/, "")}</dt>
                      <dd className="text-right font-semibold text-slate-900">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
