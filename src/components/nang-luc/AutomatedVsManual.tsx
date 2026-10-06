import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import Icon from "@/components/ui/Icon";

export default function AutomatedVsManual() {
  const t = useTranslations("NangLuc.AutomatedVsManual");

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200">
      <div className="mx-auto px-margin w-full">
        <div className="mb-space-xl text-center">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("title")}</h2>
          <p className="text-body-md text-slate-600 mt-2 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* AUTOMATED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt={t("automated.imageAlt")}
                  src={siteImg("nang-luc/AutomatedVsManual#1", "/images/factory/ma-treo-2.jpg")}
                />
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t("automated.title")}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">{t("automated.desc")}</p>
            </div>
            <div className="space-y-space-xs bg-slate-50 border border-slate-200 p-space-md rounded text-label-technical text-slate-700">
              <div className="flex items-center gap-2">
                <Icon name="check_circle" className="text-steel-600 text-[16px]" />
                <span>{t("automated.feature1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check_circle" className="text-steel-600 text-[16px]" />
                <span>{t("automated.feature2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check_circle" className="text-steel-600 text-[16px]" />
                <span>{t("automated.feature3")}</span>
              </div>
            </div>
          </div>

          {/* MANUAL / SPECIALIZED LINE */}
          <div className="bg-white border border-slate-200 rounded-lg p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="relative h-56 rounded overflow-hidden mb-space-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt={t("manual.imageAlt")}
                  src={siteImg("nang-luc/AutomatedVsManual#2", "/images/factory/ma-quay-5.jpg")}
                />
              </div>
              <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t("manual.title")}</h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">{t("manual.desc")}</p>
            </div>
            <div className="space-y-space-xs bg-slate-50 border border-slate-200 p-space-md rounded text-label-technical text-slate-700">
              <div className="flex items-center gap-2">
                <Icon name="tune" className="text-slate-500 text-[16px]" />
                <span>{t("manual.feature1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="science" className="text-slate-500 text-[16px]" />
                <span>{t("manual.feature2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="engineering" className="text-slate-500 text-[16px]" />
                <span>{t("manual.feature3")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
