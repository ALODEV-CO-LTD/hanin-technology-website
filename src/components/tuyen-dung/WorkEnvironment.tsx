import { siteImg } from "@/server/site-images";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function WorkEnvironment() {
  const t = useTranslations("TuyenDung.WorkEnvironment");

  return (
    <section className="w-full py-space-xl bg-white">
      <div className="mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col gap-2 max-w-3xl">
          <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Main featured image */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[440px] md:h-[500px] rounded overflow-hidden shadow-sm group bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t("mainImageAlt")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={siteImg("tuyen-dung/WorkEnvironment#1", "/images/factory/qc-5.jpg")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-space-lg left-space-lg right-space-lg flex flex-col gap-1 text-white">
                <div className="text-white text-label-sm uppercase tracking-widest font-bold">
                  {t("mainBadge")}
                </div>
                <h3 className="text-headline-sm uppercase text-white font-semibold">
                  {t("mainTitle")}
                </h3>
                <p className="text-body-sm text-white max-w-xl">
                  {t("mainDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Supporting visuals */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <div className="relative w-full h-[236px] md:h-[238px] rounded overflow-hidden shadow-sm group bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t("secondaryImageAlt")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={siteImg("tuyen-dung/WorkEnvironment#2", "/images/factory/qc-6.jpg")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-transparent to-transparent" />
              <div className="absolute bottom-space-md left-space-md right-space-md flex flex-col text-white">
                <span className="text-label-sm text-white uppercase tracking-wider font-semibold">
                  {t("secondaryBadge")}
                </span>
                <h4 className="text-title-md uppercase font-semibold">
                  {t("secondaryTitle")}
                </h4>
                <p className="text-label-sm text-white">
                  {t("secondaryDesc")}
                </p>
              </div>
            </div>

            <div className="p-space-lg rounded bg-slate-100 border border-slate-200 shadow-sm flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded bg-steel-600 text-white flex items-center justify-center">
                    <Icon name="biotech" className="text-[22px]" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-500 text-label-sm font-bold uppercase">
                    {t("labBadge")}
                  </span>
                </div>
                <h4 className="text-title-md text-slate-900 uppercase font-semibold">
                  {t("labTitle")}
                </h4>
                <p className="text-body-sm text-slate-600">
                  {t("labDesc")}
                </p>
              </div>
              <div className="pt-space-sm flex items-center gap-2 text-slate-500 text-label-sm">
                <Icon name="verified" className="text-[16px] text-steel-600" />
                <span>{t("labFooter")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
