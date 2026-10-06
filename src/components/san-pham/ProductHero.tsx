import { useTranslations } from "next-intl";
import type { Product } from "@/lib/products-data";
import { getProductDetailContent } from "@/lib/products-data";
import Icon from "@/components/ui/Icon";

export default function ProductHero({ product }: { product: Product }) {
  const tp = useTranslations("SanPham");
  const t = useTranslations("SanPham.ProductHero");
  const { heroStats, heroDescription, heroImageAlt } = getProductDetailContent(tp);
  const heroImage = product.image;

  return (
    <section className="w-full bg-white py-space-xl border-b border-slate-200">
      <div className="px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight leading-tight">
              {product.title}
            </h1>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{heroDescription}</p>
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded">
              {(["steel", "sky", "slate"] as const).map((color, index) => {
                const stat = heroStats[index];
                if (!stat) return null;
                const valueColor =
                  color === "steel"
                    ? "text-steel-600"
                    : color === "sky"
                    ? "text-sky-700"
                    : "text-slate-900";
                const wrapperClass =
                  index === 0
                    ? "flex flex-col border-r border-slate-200 pr-3"
                    : index === 1
                    ? "flex flex-col border-r border-slate-200 pr-3 pl-2"
                    : "flex flex-col pl-2";
                return (
                  <div key={stat.label} className={wrapperClass}>
                    <span className="text-xs text-slate-500 uppercase font-mono">{stat.label}</span>
                    <span className={`text-lg md:text-xl font-bold ${valueColor} font-mono mt-1`}>
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-400">{stat.note}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-steel-600 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-md"
                href="#quote-form"
              >
                <span>{t("ctaRequestQuote")}</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm uppercase tracking-wider rounded hover:bg-slate-100 hover:border-slate-300 transition-all"
                href="#quote-form"
              >
                <Icon name="download" className="text-steel-600 text-[18px]" />
                <span>{t("ctaDownloadSpecSheet")}</span>
              </a>
            </div>
            <div className="flex items-center gap-5 pt-2 border-t border-slate-200 text-xs text-slate-500 font-mono flex-wrap">
              <div className="flex items-center gap-1.5">
                <Icon name="verified" className="text-emerald-600 text-[16px]" />
                <span className="text-slate-700 font-medium font-sans">{t("badgeIso")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="shield" className="text-sky-700 text-[16px]" />
                <span className="text-slate-700 font-medium font-sans">{t("badgeRohs")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="biotech" className="text-steel-600 text-[16px]" />
                <span className="text-slate-700 font-medium font-sans">{t("badgeXrf")}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="relative w-full aspect-[4/3] bg-slate-100 border border-slate-200 rounded overflow-hidden group shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={product.imageAlt || heroImageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={heroImage}
              />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 flex items-center justify-between rounded">
              <div className="flex items-center gap-2">
                <Icon name="science" className="text-steel-600 text-[20px]" />
                <span className="text-sm text-slate-700 font-medium">
                  {t("microHardnessLabel")}
                </span>
              </div>
              <span className="text-base font-bold text-steel-600 font-mono">{t("microHardnessValue")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
