import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";

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

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
          </div>
          <p className="text-body-sm text-slate-600 max-w-md">{t("sectionDescription")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {MACHINES.map((m) => (
            <div
              key={m.key}
              className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:border-steel-300 hover:shadow-md transition-all"
            >
              <div className="relative h-44 bg-slate-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" alt={t(`items.${m.key}.alt`)} src={m.image} />
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-title-md text-slate-900 uppercase mb-space-xs font-semibold">
                    {t(`items.${m.key}.title`)}
                  </h4>
                  <p className="text-body-sm text-slate-600 mb-space-md">{t(`items.${m.key}.desc`)}</p>
                </div>
                <div className="pt-space-sm bg-white border border-slate-200 p-space-xs rounded text-label-sm text-slate-600">
                  {m.key === "rectifier" && (
                    <>
                      {t("items.rectifier.specLoad")} <span className="text-slate-900 font-semibold">{t("items.rectifier.specLoadValue")}</span>
                      <br />
                      {t("items.rectifier.specStability")}{" "}
                      <span className="text-slate-900 font-semibold">{t("items.rectifier.specStabilityValue")}</span>
                      {" // "}
                      {t("items.rectifier.specControl")}{" "}
                      <span className="text-steel-600 font-semibold">{t("items.rectifier.specControlValue")}</span>
                    </>
                  )}
                  {m.key === "ultrasonic" && (
                    <>
                      {t("items.ultrasonic.specFrequency")}{" "}
                      <span className="text-slate-900 font-semibold">{t("items.ultrasonic.specFrequencyValue")}</span>
                      <br />
                      {t("items.ultrasonic.specHeating")}{" "}
                      <span className="text-slate-900 font-semibold">[{t("items.ultrasonic.specHeatingValue")}]</span>
                      {" // "}
                      {t("items.ultrasonic.specVolume")}{" "}
                      <span className="text-steel-600 font-semibold">{t("items.ultrasonic.specVolumeValue")}</span>
                    </>
                  )}
                  {m.key === "hoist" && (
                    <>
                      {t("items.hoist.specLoad")}{" "}
                      <span className="text-slate-900 font-semibold">{t("items.hoist.specLoadValue")} {t("items.hoist.specLoadUnit")}</span>
                      <br />
                      {t("items.hoist.specSpeed")}{" "}
                      <span className="text-slate-900 font-semibold">[{t("items.hoist.specSpeedValue")} PLC]</span>
                      {" // "}
                      {t("items.hoist.specSensor")}{" "}
                      <span className="text-steel-600 font-semibold">{t("items.hoist.specSensorValue")}</span>
                    </>
                  )}
                  {m.key === "deEmbrittlement" && (
                    <>
                      {t("items.deEmbrittlement.specMaxTemp")}{" "}
                      <span className="text-slate-900 font-semibold">{t("items.deEmbrittlement.specMaxTempValue")}</span>
                      <br />
                      {t("items.deEmbrittlement.specSensor")}{" "}
                      <span className="text-slate-900 font-semibold">{t("items.deEmbrittlement.specSensorValue")}</span>
                      {" // "}
                      {t("items.deEmbrittlement.specStandard")}{" "}
                      <span className="text-steel-600 font-semibold">{t("items.deEmbrittlement.specStandardValue")}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
