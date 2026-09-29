import { useTranslations } from "next-intl";

const MACHINES = [
  {
    key: "rectifier",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKGTdP7NCpJen2W2AWofNyibQ2wIMiSgAMPLTZ7v1k2-E5EtoeAH9vZtpvsEr4crGT4XSmIqRWNVogW99y-bgGoHB9e5vLSR1AvQyULKom4uVFuLouy_f5b5cb3_d3F3oAfwB9FuVXRr-F7scaCDinOmslbX3pMGCMHcxkdMSEj-WTZh7ntncyO8VUeEwAaqfaAQ9iaaBVqHWN0cxcf0-0xBm5cqCj2rF84_fazB80AOiXSd3vUXf5ng",
  },
  {
    key: "ultrasonic",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
  },
  {
    key: "hoist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Rp9iUGeqni3A6u4Y3C-JoRdlsiZ3JPcevdQQ-JcImbiNSnXcvpd1_n9lbSPFdOtkXGmXJ8Yx311AAoAwa_C_Q1axzJc1TJSpiEZxnREJYdzd4qo0KJVN59JJcefB_TNtV2r_9v-9QQ7BzHkT0ZT6D4CUyOVaOPhuwRt7CgEeHBj7GH-QtFAgQ0kmBD1iFwD_6QkgwWS5IebEzVgCvo8z_6zf-OsY0N_7HWZ10e9pJsP0oIlTC1SNmg",
  },
  {
    key: "deEmbrittlement",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg",
  },
] as const;

export default function EquipmentGrid() {
  const t = useTranslations("NangLuc.EquipmentGrid");

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
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
                <span className="absolute bottom-2 left-2 px-space-xs py-0.5 bg-white/90 border border-slate-200 text-steel-600 font-semibold rounded text-label-sm shadow-sm">
                  {t(`items.${m.key}.badge`)}
                </span>
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
                      {t("items.rectifier.specLoad")} <span className="text-slate-900 font-semibold">12,000A</span>
                      <br />
                      {t("items.rectifier.specStability")}{" "}
                      <span className="text-slate-900 font-semibold">[±1%]</span>
                      {" // "}
                      {t("items.rectifier.specControl")}{" "}
                      <span className="text-steel-600 font-semibold">[PLC]</span>
                    </>
                  )}
                  {m.key === "ultrasonic" && (
                    <>
                      {t("items.ultrasonic.specFrequency")}{" "}
                      <span className="text-slate-900 font-semibold">[28 - 40 kHz]</span>
                      <br />
                      {t("items.ultrasonic.specHeating")}{" "}
                      <span className="text-slate-900 font-semibold">[{t("items.ultrasonic.specHeatingValue")}]</span>
                      {" // "}
                      {t("items.ultrasonic.specVolume")}{" "}
                      <span className="text-steel-600 font-semibold">850 m³</span>
                    </>
                  )}
                  {m.key === "hoist" && (
                    <>
                      {t("items.hoist.specLoad")}{" "}
                      <span className="text-slate-900 font-semibold">25 {t("items.hoist.specLoadUnit")}</span>
                      <br />
                      {t("items.hoist.specSpeed")}{" "}
                      <span className="text-slate-900 font-semibold">[{t("items.hoist.specSpeedValue")} PLC]</span>
                      {" // "}
                      {t("items.hoist.specSensor")}{" "}
                      <span className="text-steel-600 font-semibold">[Laser]</span>
                    </>
                  )}
                  {m.key === "deEmbrittlement" && (
                    <>
                      {t("items.deEmbrittlement.specMaxTemp")}{" "}
                      <span className="text-slate-900 font-semibold">[300°C - 500°C]</span>
                      <br />
                      {t("items.deEmbrittlement.specSensor")}{" "}
                      <span className="text-slate-900 font-semibold">[PID Digital]</span>
                      {" // "}
                      {t("items.deEmbrittlement.specStandard")}{" "}
                      <span className="text-steel-600 font-semibold">[ASTM F519]</span>
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
