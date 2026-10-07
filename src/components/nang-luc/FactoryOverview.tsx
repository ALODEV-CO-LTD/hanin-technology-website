import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Icon from "@/components/ui/Icon";

export default function FactoryOverview() {
  const t = useTranslations("NangLuc.FactoryOverview");

  return (
    <section className="w-full py-space-xl bg-slate-50 scroll-mt-[86px]" id="he-thong-nha-may">
      <div className="mx-auto px-margin w-full">
        <div className="flex items-center gap-space-sm mb-space-xl">
          <span className="w-2.5 h-2.5 bg-steel-600 rounded-sm" />
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* LEFT: Photo & Badges */}
          <div className="lg:col-span-7 relative rounded-lg overflow-hidden bg-slate-200 border border-slate-200 aspect-[4/3] lg:aspect-auto min-h-[220px] lg:min-h-[420px] shadow-sm flex flex-col justify-end p-space-lg group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={t("image.alt")}
              src={siteImg("nang-luc/FactoryOverview#1", "/images/factory/kho-5.jpg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          </div>

          {/* RIGHT: Description & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 p-space-md sm:p-space-xl rounded-lg shadow-sm">
            <div>
              <h3 className="text-headline-md text-slate-900 uppercase mb-space-md">{t("factoryTitle")}</h3>
              <p className="text-body-md text-slate-600 leading-relaxed mb-space-lg">{t("factoryDescription")}</p>
            </div>
            <div>
              {/* Technical specs table */}
              <div className="grid grid-cols-1 gap-space-xs mb-space-lg text-body-sm">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">{t("specs.locationLabel")}</span>
                  <span className="text-slate-900 font-semibold sm:text-right">
                    {t("specs.locationValue")}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">{t("specs.areaLabel")}</span>
                  <span className="text-steel-600 text-headline-sm font-bold">{t("specs.areaValue")}</span>
                </div>
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between p-space-sm bg-slate-50 border border-slate-200/80 rounded">
                  <span className="text-slate-500 text-label-technical uppercase">{t("specs.capabilityLabel")}</span>
                  <span className="text-slate-900 font-semibold sm:text-right">[{t("specs.capabilityValue")}]</span>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 text-label-technical text-steel-600 hover:text-slate-900 transition-colors uppercase tracking-wider font-semibold"
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
