import { siteImg } from "@/server/site-images";
import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";

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
            <div className="relative w-full h-[440px] md:h-[500px] rounded overflow-hidden shadow-sm group bg-white border border-slate-200 flex flex-col">
              <div className="relative flex-1 min-h-0 overflow-hidden bg-slate-50">
              <Photo
                alt={t("mainImageAlt")}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={siteImg("tuyen-dung/WorkEnvironment#1", "/images/hanin/slide04-khu-vuc-be-ma.webp")}
              />
              </div>
              <div className="p-space-lg bg-white flex flex-col gap-1 text-slate-900">
                <div className="text-steel-600 text-label-sm uppercase tracking-wider font-bold">
                  {t("mainBadge")}
                </div>
                <h3 className="text-headline-sm uppercase text-slate-900 font-semibold">
                  {t("mainTitle")}
                </h3>
                <p className="text-body-sm text-slate-600 max-w-xl">
                  {t("mainDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Supporting visuals */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <div className="relative w-full h-[236px] md:h-[238px] rounded overflow-hidden shadow-sm group bg-white border border-slate-200 flex flex-col">
              <div className="relative flex-1 min-h-0 overflow-hidden bg-slate-50">
              <Photo
                alt={t("secondaryImageAlt")}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={siteImg("tuyen-dung/WorkEnvironment#2", "/images/hanin/slide11-kim-loai-ma-crom-tay-nam.webp")}
              />
              </div>
              <div className="p-space-md bg-white flex flex-col text-slate-900">
                <span className="text-label-sm text-steel-600 uppercase tracking-wider font-semibold">
                  {t("secondaryBadge")}
                </span>
                <h3 className="text-title-md text-slate-900 uppercase font-semibold">
                  {t("secondaryTitle")}
                </h3>
                <p className="text-label-sm text-slate-600">
                  {t("secondaryDesc")}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded bg-white border border-slate-200 shadow-sm flex flex-col flex-1 min-h-[238px]">
              <div className="relative h-36 w-full overflow-hidden bg-slate-200">
                <Photo
                  alt={t("labImageAlt")}
                  className="w-full h-full object-cover"
                  src={siteImg("tuyen-dung/WorkEnvironment#3", "/images/hanin/slide10-phong-phan-tich.webp")}
                />
              </div>
              <div className="p-space-md flex flex-col gap-1">
                <h3 className="text-title-md text-slate-900 uppercase font-semibold">
                  {t("labTitle")}
                </h3>
                <p className="text-body-sm text-slate-600">
                  {t("labDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
