import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Photo from "@/components/ui/Photo";

export default function AutomatedVsManual() {
  const t = useTranslations("NangLuc.AutomatedVsManual");

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200">
      <div className="mx-auto px-margin w-full">
        <div className="mb-space-xl text-center">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* AUTOMATED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-md sm:p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                <Photo
                  className="w-full h-full object-cover"
                  alt={t("automated.imageAlt")}
                  src={siteImg("nang-luc/AutomatedVsManual#1", "/images/factory/ma-treo-2.jpg")}
                />
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t("automated.title")}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{t("automated.desc")}</p>
            </div>
          </div>

          {/* MANUAL / SPECIALIZED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-md sm:p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                <Photo
                  className="w-full h-full object-cover"
                  alt={t("manual.imageAlt")}
                  src={siteImg("nang-luc/AutomatedVsManual#2", "/images/factory/ma-quay-5.jpg")}
                />
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t("manual.title")}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed">{t("manual.desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
