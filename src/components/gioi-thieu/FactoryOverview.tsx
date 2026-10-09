import { siteImg } from "@/server/site-images";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import Photo from "@/components/ui/Photo";

export default function FactoryOverview() {
  const t = useTranslations("GioiThieu.FactoryOverview");

  return (
    <section className="w-full bg-slate-50 py-space-xl border-t border-slate-200">
      <div className="mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
          </div>
        </div>

        {/* Editorial Masonry Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-lg">
          {/* Main Large Photo: Modern Electroplating Line */}
          <div className="lg:col-span-8 w-full min-w-0 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[220px] lg:min-h-[320px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
            <Photo src={siteImg("gioi-thieu/FactoryOverview#1", "/images/factory/ma-quay-1.jpg")} alt={t("mainImageAlt")} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          </div>

          {/* 3 Smaller Auxiliary Photos */}
          <div className="lg:col-span-4 grid grid-rows-3 gap-gutter">
            {/* Aux Photo 1: Operator Monitoring Line */}
            <div className="relative h-full min-h-[150px] sm:min-h-[180px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <Photo src={siteImg("gioi-thieu/FactoryOverview#2", "/images/factory/ma-treo-2.jpg")} alt={t("zone2ImageAlt")} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
            </div>

            {/* Aux Photo 2: Precision Caliper Inspection */}
            <div className="relative h-full min-h-[150px] sm:min-h-[180px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <Photo
                alt={t("zone3ImageAlt")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={siteImg("gioi-thieu/FactoryOverview#3", "/images/factory/phan-tich-1.jpg")}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
            </div>

            {/* Aux Photo 3: Heavy Automated Crane System */}
            <div className="relative h-full min-h-[150px] sm:min-h-[180px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <Photo src={siteImg("gioi-thieu/FactoryOverview#4", "/images/factory/kho-5.jpg")} alt={t("zone4ImageAlt")} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="flex justify-center">
          <Link
            className="inline-flex min-h-11 items-center gap-space-sm px-space-lg py-space-sm rounded bg-white hover:bg-slate-50 text-slate-800 text-label-technical uppercase tracking-wider border border-slate-300 hover:border-steel-600 transition-all shadow-sm"
            href="/nang-luc-san-xuat"
          >
            {t("cta")}
            <Icon name="arrow_forward" className="text-[16px] text-steel-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
