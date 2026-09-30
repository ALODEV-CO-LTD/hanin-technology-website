import { useTranslations } from "next-intl";

export default function DetailCapability() {
  const t = useTranslations("DichVu.DetailCapability");

  const FEATURES = [
    { key: "dosing", icon: "tune" },
    { key: "crane", icon: "cyclone" },
    { key: "filtration", icon: "filter_alt" },
  ] as const;

  return (
    <section className="w-full mb-space-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-6 flex flex-col gap-space-sm">
          <div className="w-full h-80 rounded overflow-hidden shadow-sm relative bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t("imageAlt")}
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
            />
          </div>
          <div className="p-space-md bg-white border border-slate-200 rounded shadow-sm flex items-center justify-between gap-space-sm">
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">{t("lineCapacityLabel")}</span>
              <span className="text-title-md text-slate-900 font-bold">{t("lineCapacityValue")}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-label-sm text-slate-500 uppercase">{t("tankSizeLabel")}</span>
              <span className="text-title-md text-steel-600 font-bold">1800 x 900 x 1200 mm</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center bg-white border border-slate-200 p-space-lg rounded shadow-sm">
          <h2 className="text-headline-md text-slate-900 tracking-tight uppercase mb-space-sm font-bold">
            {t("heading")}
          </h2>
          <p className="text-body-lg text-slate-600 mb-space-md">{t("subtitle")}</p>
          <div className="space-y-space-sm text-body-md text-slate-600">
            {FEATURES.map((feature) => (
              <div key={feature.key} className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-steel-600 text-[20px] mt-0.5">{feature.icon}</span>
                <div>
                  <strong className="text-slate-900 font-semibold">{t(`${feature.key}.title`)}</strong>{" "}
                  {t(`${feature.key}.desc`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
