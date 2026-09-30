import { siteImg } from "@/server/site-images";
import { useTranslations } from "next-intl";
import { getSettings, isSafeMapEmbed } from "@/server/settings";

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
  const { mapsUrl, mapEmbedUrl } = getSettings();
  const embedUrl = mapEmbedUrl && isSafeMapEmbed(mapEmbedUrl) ? mapEmbedUrl : "";

  return (
    <section className="w-full bg-white py-space-xl scroll-mt-20" id="map-section">
      <div className="mx-auto px-margin">
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
                href={mapsUrl || "https://maps.google.com"}
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

          {/* Bản đồ nhúng khi CMS có link nhúng; nếu chưa có thì dùng ảnh minh họa. */}
          <div className="lg:col-span-7 rounded overflow-hidden shadow-sm relative min-h-[420px] bg-slate-200">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={t("heading")}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
            <div
              className="w-full h-full min-h-[420px] bg-cover bg-center relative"
              style={{
                backgroundImage:
                  `url('${siteImg("lien-he/LocationMap#1", "https://lh3.googleusercontent.com/aida-public/AB6AXuA85UYKWjtcuwrKepapp5MGDdkuAw_EkrbJcdYP0KEnhARjTxjDM6ysANOszfzGcmxjpiJvoxblg_GtRL2Y8qq3iM1754kBL6Xq_JW7mPT73PyXm5o9XleM1MYjMsmnLm-2tx8E8Ox6DbCkMhmmHJmz7Dv_jETW5jbr1bSSlnlsdXmR2vEqY2jq4fQmZ74s_TN3e4J_PUPdounLmttBxaKQrk7ngZiFBp1WnAjkOuzD1awXA3q2ZfyQfQ")}')`,
              }}
              role="img"
              aria-label={t("satelliteImageAlt")}
            />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
