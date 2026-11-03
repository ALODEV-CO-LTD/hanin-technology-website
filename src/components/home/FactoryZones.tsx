import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";

const ZONE_KEYS = ["0", "1", "2", "3", "4", "5"] as const;

/** Lưới 3x2 phân khu nhà xưởng: ảnh 4:3, tên phân khu, công suất và chi tiết bên dưới ảnh. */
export default function FactoryZones({ images }: { images: Record<(typeof ZONE_KEYS)[number], string> }) {
  const t = useTranslations("HomeZones");

  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-headline-xl text-slate-900 font-bold">{t("title")}</h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {ZONE_KEYS.map((key) => (
            <li key={key} className="flex flex-col overflow-hidden rounded border border-slate-200 bg-slate-50">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <Photo
                  src={images[key]}
                  alt={t(`zones.${key}.alt`)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-space-xs p-space-md">
                <h3 className="text-headline-sm font-bold text-slate-900">{t(`zones.${key}.title`)}</h3>
                <p className="text-title-md font-semibold text-steel-700">{t(`zones.${key}.capacity`)}</p>
                <p className="text-body-sm leading-relaxed text-slate-600">{t(`zones.${key}.detail`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
