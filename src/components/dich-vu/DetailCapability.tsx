import { useTranslations } from "next-intl";
import type { PlatingService } from "@/lib/services-data";
import { SERVICE_GALLERY_POOL, pickImages } from "@/lib/factory-pool";
import Icon from "@/components/ui/Icon";

export default function DetailCapability({ service }: { service: PlatingService }) {
  const t = useTranslations("DichVu.DetailCapability");

  const [capabilityImage] = pickImages(service.slug, SERVICE_GALLERY_POOL, 4, [service.image]);

  const FEATURES = [
    { key: "dosing", icon: "tune" },
    { key: "crane", icon: "cyclone" },
    { key: "filtration", icon: "filter_alt" },
  ] as const;

  return (
    <section className="w-full bg-white mb-space-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-6 flex flex-col gap-space-sm">
          <div className="w-full h-80 rounded overflow-hidden shadow-sm relative bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t("imageAlt")}
              className="w-full h-full object-cover"
              src={capabilityImage}
            />
          </div>
          <div className="p-space-md bg-white border border-slate-200 rounded shadow-sm flex items-center justify-between gap-space-sm">
            <div className="flex flex-col">
              <span className="text-label-sm text-slate-500 uppercase">{t("lineCapacityLabel")}</span>
              <span className="text-title-md text-slate-900 font-bold">{t("lineCapacityValue")}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-label-sm text-slate-500 uppercase">{t("tankSizeLabel")}</span>
              <span className="text-title-md text-steel-600 font-bold">{t("tankSizeValue")}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center bg-white border border-slate-200 p-space-lg rounded shadow-sm">
          <h2 className="text-headline-md text-slate-900 tracking-tight uppercase mb-space-sm font-bold">
            {t("heading")}
          </h2>
          <div className="space-y-space-sm text-body-md text-slate-600">
            {FEATURES.map((feature) => (
              <div key={feature.key} className="flex items-start gap-space-xs">
                <Icon name={feature.icon} className="text-steel-600 text-[20px] mt-0.5" />
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
