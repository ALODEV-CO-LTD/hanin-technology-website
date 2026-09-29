import { useTranslations } from "next-intl";

const DISTANCE_KEYS = ["airport", "seaport", "industrialParks"] as const;
const DISTANCE_META: Record<
  (typeof DISTANCE_KEYS)[number],
  { icon: string; color: string }
> = {
  airport: { icon: "flight_takeoff", color: "text-steel-600" },
  seaport: { icon: "directions_boat", color: "text-sky-700" },
  industrialParks: { icon: "precision_manufacturing", color: "text-slate-600" },
};

export default function LocationMap() {
  const t = useTranslations("LienHe.LocationMap");

  return (
    <section className="w-full bg-slate-50 py-space-xl" id="map-section">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          {/* Map info & logistics instructions */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 p-space-xl rounded shadow-sm">
            <div>
              <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight mb-space-md">
                {t("heading")}
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed mb-space-lg">
                {t("description")}
              </p>

              <div className="flex flex-col gap-space-sm mb-space-xl">
                {DISTANCE_KEYS.map((key) => {
                  const meta = DISTANCE_META[key];
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between p-space-sm bg-slate-50 rounded"
                    >
                      <span className="text-slate-900 font-semibold flex items-center gap-2 text-body-sm">
                        <span className={`material-symbols-outlined text-[20px] ${meta.color}`}>
                          {meta.icon}
                        </span>
                        <span>{t(`distances.${key}.label`)}</span>
                      </span>
                      <span className="text-steel-600 font-bold text-body-sm">
                        {t(`distances.${key}.value`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-space-sm pt-space-md bg-slate-50 -mx-space-xl -mb-space-xl p-space-lg">
              <a
                className="flex-1 py-space-sm px-space-md bg-steel-600 hover:bg-steel-700 text-white rounded text-label-md uppercase tracking-wider font-bold text-center transition-colors flex items-center justify-center gap-2"
                href="https://maps.google.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>{t("openMapsCta")}</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
              <a
                className="py-space-sm px-space-md bg-white border border-slate-200 text-slate-900 hover:bg-slate-100 rounded text-label-md uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2"
                href="#rfq-form"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>{t("downloadMapCta")}</span>
              </a>
            </div>
          </div>

          {/* Static map visual (placeholder, chưa nối Google Maps API thật) */}
          <div className="lg:col-span-7 rounded overflow-hidden shadow-sm relative min-h-[420px] bg-slate-200">
            <div
              className="w-full h-full min-h-[420px] bg-cover bg-center relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA85UYKWjtcuwrKepapp5MGDdkuAw_EkrbJcdYP0KEnhARjTxjDM6ysANOszfzGcmxjpiJvoxblg_GtRL2Y8qq3iM1754kBL6Xq_JW7mPT73PyXm5o9XleM1MYjMsmnLm-2tx8E8Ox6DbCkMhmmHJmz7Dv_jETW5jbr1bSSlnlsdXmR2vEqY2jq4fQmZ74s_TN3e4J_PUPdounLmttBxaKQrk7ngZiFBp1WnAjkOuzD1awXA3q2ZfyQfQ')",
              }}
              role="img"
              aria-label={t("satelliteImageAlt")}
            >
              <div className="absolute top-4 left-4 bg-slate-900/90 text-white p-space-md rounded backdrop-blur-md max-w-xs shadow-md">
                <div className="flex items-center gap-2 text-steel-500 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-steel-500 animate-pulse" />
                  <span className="text-label-sm uppercase tracking-wider font-bold">
                    {t("gateLabel")}
                  </span>
                </div>
                <p className="text-title-md font-bold text-white">{t("plotLabel")}</p>
                <p className="text-label-sm text-slate-300 mt-1">{t("securityNote")}</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 p-space-sm rounded text-slate-900 shadow-sm text-label-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-steel-600 text-[20px]">
                  explore
                </span>
                <div>
                  <span className="block font-bold">{t("gridLabel")}</span>
                  <span className="text-slate-500 text-[10px]">{t("elevationLabel")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
