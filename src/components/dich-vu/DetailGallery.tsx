import { useTranslations } from "next-intl";
import type { PlatingService } from "@/lib/services-data";
import { SERVICE_GALLERY_POOL, pickImages } from "@/lib/factory-pool";

export default function DetailGallery({ service }: { service: PlatingService }) {
  const t = useTranslations("DichVu.DetailGallery");
  // Ảnh #1 của bộ chọn dành cho khối "Năng lực" (DetailCapability), nên ở đây lấy 3 ảnh tiếp theo.
  const [, ...picked] = pickImages(service.slug, SERVICE_GALLERY_POOL, 4, [service.image]);
  const GALLERY = [
    { key: "line", src: picked[0] },
    { key: "surface", src: picked[1] },
    { key: "prep", src: picked[2] },
  ] as const;

  return (
    <section className="w-full bg-slate-50 mb-space-xl">
      <div className="flex items-center justify-between pb-space-sm mb-space-md flex-wrap gap-space-sm">
        <div>
          <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
        </div>
        <span className="text-label-sm text-slate-500 hidden sm:inline">{t("subtitle")}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {GALLERY.map((item) => (
          <div key={item.key} className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-64 bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t(`${item.key}.alt`)} className="w-full h-full object-cover" src={item.src} />
            </div>
            <div className="p-space-sm flex flex-col flex-1 justify-between bg-white">
              <h4 className="text-title-md text-slate-900 uppercase mb-1 font-bold">{t(`${item.key}.title`)}</h4>
              <p className="text-body-md text-slate-600">{t(`${item.key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
