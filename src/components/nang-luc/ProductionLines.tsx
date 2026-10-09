import Icon from "@/components/ui/Icon";
import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";
import { Link } from "@/i18n/navigation";
import Photo from "@/components/ui/Photo";

export default function ProductionLines() {
  const t = useTranslations("NangLuc.ProductionLines");

  const LINES = [
    {
      key: "barrel",
      image: siteImg("nang-luc/ProductionLines#1", "/images/factory/ma-quay-6.jpg"),
      imageOrder: "order-first lg:order-last",
    },
    {
      key: "rack",
      image: siteImg("nang-luc/ProductionLines#2", "/images/factory/ma-quay-6.jpg"),
      imageOrder: "",
    },
    {
      key: "chemical",
      image: siteImg("nang-luc/ProductionLines#3", "/images/factory/ma-treo-3.jpg"),
      imageOrder: "order-first lg:order-last",
    },
  ] as const;

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200 scroll-mt-[var(--header-h)]" id="day-chuyen">
      <div className="mx-auto px-margin w-full">
        <div className="max-w-2xl mb-space-xl">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight mb-space-xs">
            {t("sectionTitle")}
          </h2>
        </div>

        <div className="flex flex-col gap-space-lg">
          {LINES.map((line) => (
            <div
              key={line.key}
              className="grid grid-cols-1 lg:grid-cols-12 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:border-steel-300 hover:shadow-md transition-all group"
            >
              <div className={`lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-0 lg:min-h-[260px] bg-slate-200 ${line.imageOrder}`}>
                <Photo
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={t(`items.${line.key}.alt`)}
                  src={line.image}
                />
              </div>
              <div className="lg:col-span-7 p-space-md sm:p-space-xl flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-xs">
                    <span className="text-label-technical text-steel-600 tracking-wider uppercase font-semibold">
                      {t(`items.${line.key}.tag`)}
                    </span>
                  </div>
                  <h3 className="text-headline-md text-slate-900 uppercase mb-space-sm">
                    {t(`items.${line.key}.title`)}
                  </h3>
                  <p className="text-body-md text-slate-600 leading-relaxed mb-space-md">
                    {t(`items.${line.key}.desc`)}
                  </p>
                </div>
                <div className="bg-white border border-slate-200 p-space-md rounded flex flex-wrap items-center justify-between gap-space-sm">
                  <div className="text-label-technical text-slate-800">
                    {line.key === "barrel" && (
                      <>
                        <span className="text-slate-600">{t("items.barrel.capacityLabel")}</span>{" "}
                        <span className="text-steel-600 font-bold">
                          {t("items.barrel.capacityValue")} {t("items.barrel.capacityUnit")}
                        </span>
                        <><span className="hidden sm:inline">{" · "}</span><br className="sm:hidden" /></>
                        <span className="text-slate-600">{t("items.barrel.toleranceLabel")}</span>{" "}
                        <span className="text-slate-900 font-bold">{t("items.barrel.toleranceValue")}</span>
                      </>
                    )}
                    {line.key === "rack" && (
                      <>
                        <span className="text-slate-600">{t("items.rack.capacityLabel")}</span>{" "}
                        <span className="text-steel-600 font-bold">
                          {t("items.rack.capacityValue")} {t("items.rack.capacityUnit")}
                        </span>
                        <><span className="hidden sm:inline">{" · "}</span><br className="sm:hidden" /></>
                        <span className="text-slate-600">{t("items.rack.tankSizeLabel")}</span>{" "}
                        <span className="text-slate-900 font-bold">{t("items.rack.tankSizeValue")}</span>
                      </>
                    )}
                    {line.key === "chemical" && (
                      <>
                        <span className="text-slate-600">{t("items.chemical.reactorLabel")}</span>{" "}
                        <span className="text-steel-600 font-bold">{t("items.chemical.reactorValue")}</span>
                        <><span className="hidden sm:inline">{" · "}</span><br className="sm:hidden" /></>
                        <span className="text-slate-600">{t("items.chemical.thicknessLabel")}</span>{" "}
                        <span className="text-slate-900 font-bold">{t("items.chemical.thicknessValue")}</span>
                      </>
                    )}
                  </div>
                  <Link
                    className="inline-flex items-center gap-1 text-label-technical text-steel-600 hover:text-slate-900 font-semibold uppercase transition-colors"
                    href="/dich-vu-gia-cong-ma"
                  >
                    <span>{t("cta")}</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
