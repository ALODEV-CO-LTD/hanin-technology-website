import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Photo from "@/components/ui/Photo";

export default function FactoryGallery() {
  const t = useTranslations("NangLuc.FactoryGallery");

  const THUMBS = [
    {
      key: "campus",
      image: siteImg("nang-luc/FactoryGallery#1", "/images/factory/ma-quay-6.jpg"),
    },
    {
      key: "control",
      image: siteImg("nang-luc/FactoryGallery#2", "/images/factory/kho-6.jpg"),
    },
    {
      key: "finished",
      image: siteImg("nang-luc/FactoryGallery#3", "/images/factory/ma-treo-3.jpg"),
    },
    {
      key: "racks",
      image: siteImg("nang-luc/FactoryGallery#4", "/images/factory/qc-4.jpg"),
    },
  ] as const;

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200 scroll-mt-[var(--header-h)]" id="factory-gallery">
      <div className="mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
          </div>
        </div>

        {/* Main Featured Image */}
        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-lg overflow-hidden bg-slate-200 mb-gutter group shadow-md border border-slate-200">
          <Photo
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            alt={t("mainImage.alt")}
            src={siteImg("nang-luc/FactoryGallery#5", "/images/factory/ma-quay-7.jpg")}
            sizes="100vw"
          />
        </div>

        {/* Secondary Grid of 4 Images */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-sm sm:gap-gutter">
          {THUMBS.map((thumb) => (
            <div
              key={thumb.key}
              className="relative aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-200 group shadow-sm"
            >
              <Photo
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={t(`items.${thumb.key}.alt`)}
                src={thumb.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
