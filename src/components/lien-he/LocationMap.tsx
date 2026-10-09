import { siteImg } from "@/server/site-images";
import { useTranslations } from "next-intl";
import { getSettings, isSafeMapEmbed } from "@/server/settings";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";
import { IndustrialParkIcon, PortIcon } from "@/components/ui/CustomIcons";

const DISTANCE_KEYS = ["airport", "seaport", "industrialParks"] as const;
const DISTANCE_META: Record<(typeof DISTANCE_KEYS)[number], { icon: string }> = {
  airport: { icon: "flight_takeoff" },
  seaport: { icon: "directions_boat" },
  industrialParks: { icon: "factory" },
};

export default function LocationMap() {
  const t = useTranslations("LienHe.LocationMap");
  const { mapsUrl, mapEmbedUrl } = getSettings();
  const embedUrl = mapEmbedUrl && isSafeMapEmbed(mapEmbedUrl) ? mapEmbedUrl : "";

  return (
    <section className="w-full bg-white py-space-xl scroll-mt-[var(--header-h)]" id="map-section">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          {/* Map info & logistics instructions */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 p-space-lg rounded shadow-sm">
            <div>
              <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight mb-space-md">
                {t("heading")}
              </h2>

              <div className="flex flex-col gap-space-sm mb-space-lg">
                {DISTANCE_KEYS.map((key) => {
                  const meta = DISTANCE_META[key];
                  return (
                    <div key={key} className="flex items-center gap-3 p-space-sm bg-slate-50 rounded">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-steel-50 text-steel-600">
                        {key === "seaport" ? (
                          <PortIcon className="h-6 w-6" />
                        ) : key === "industrialParks" ? (
                          <IndustrialParkIcon className="h-6 w-6" />
                        ) : (
                          <Icon name={meta.icon} className="text-[22px]" />
                        )}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-slate-900 font-semibold text-body-sm leading-snug">{t(`distances.${key}.label`)}</span>
                        <span className="text-steel-600 font-bold text-body-sm">{t(`distances.${key}.value`)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-space-sm pt-space-md bg-slate-50 -mx-space-lg -mb-space-lg p-space-md">
              <a
                className="flex-1 py-space-sm px-space-md bg-steel-600 hover:bg-steel-700 text-white rounded text-label-md uppercase tracking-wider font-bold text-center transition-colors flex items-center justify-center gap-2"
                href={mapsUrl || "https://maps.google.com"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>{t("openMapsCta")}</span>
                <Icon name="open_in_new" className="text-[16px]" />
              </a>
              <a
                className="py-space-sm px-space-md bg-white border border-slate-200 text-slate-900 hover:bg-slate-100 rounded text-label-md uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2"
                href="#rfq-form"
              >
                <Icon name="download" className="text-[18px]" />
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
            <Photo src={siteImg("lien-he/LocationMap#1", "/images/factory/kho-6.jpg")} alt={t("satelliteImageAlt")} className="w-full h-full min-h-[420px] object-cover object-center relative" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
