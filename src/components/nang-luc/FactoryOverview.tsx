import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

export default function FactoryOverview() {
  const t = useTranslations("NangLuc.FactoryOverview");

  return (
    <section className="w-full py-space-xl bg-slate-50 scroll-mt-[var(--header-h)]" id="he-thong-nha-may">
      <div className="mx-auto px-margin w-full">
        <div className="flex items-center gap-space-sm mb-space-xl">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* LEFT: Photo & Badges */}
          <div className="lg:col-span-7 relative rounded-lg overflow-hidden bg-slate-200 border border-slate-200 aspect-[4/3] lg:aspect-auto min-h-[220px] lg:min-h-[420px] shadow-sm flex flex-col justify-end p-space-lg group">
            <Photo
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={t("image.alt")}
              src={siteImg("nang-luc/FactoryOverview#1", "/images/factory/ma-quay-7.jpg")}
            />
          </div>

          {/* RIGHT: Description & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-space-lg bg-white border border-slate-200 p-space-md sm:p-space-lg lg:p-space-xl rounded-lg shadow-sm">
            <div className="flex flex-col gap-space-sm">
              <h3 className="text-headline-md text-slate-900 uppercase font-bold">{t("factoryTitle")}</h3>
              <p className="text-body-md text-slate-600 leading-relaxed">{t("factoryDescription")}</p>
            </div>

            <div className="flex flex-col gap-space-md">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-headline-xl lg:text-display-hero-mobile font-bold text-steel-600 leading-none">{t("specs.areaValue")}</span>
                <span className="text-label-technical uppercase tracking-wider text-slate-600 font-semibold">{t("specs.areaLabel")}</span>
              </div>

              <dl className="divide-y divide-slate-200 border-y border-slate-200 text-body-sm">
                <div className="flex flex-col gap-1 py-space-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-space-md">
                  <dt className="text-label-technical uppercase tracking-wider text-slate-600 font-semibold shrink-0">{t("specs.locationLabel")}</dt>
                  <dd className="text-slate-900 font-semibold sm:text-right">{t("specs.locationValue")}</dd>
                </div>
                <div className="flex flex-col gap-1 py-space-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-space-md">
                  <dt className="text-label-technical uppercase tracking-wider text-slate-600 font-semibold shrink-0">{t("specs.capabilityLabel")}</dt>
                  <dd className="text-slate-900 font-semibold sm:text-right">{t("specs.capabilityValue")}</dd>
                </div>
              </dl>

              <a
                className="inline-flex min-h-11 w-fit items-center gap-2 rounded border border-steel-600 px-space-md text-label-technical text-steel-600 hover:[background:var(--color-steel-600)] hover:text-white transition-colors uppercase tracking-wider font-semibold"
                href="#factory-gallery"
              >
                {t("ctaGallery")} <Icon name="arrow_downward" className="text-[16px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
