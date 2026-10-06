"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link as IntlLink } from "@/i18n/navigation";
import { getCategoryTabs, type Product } from "@/lib/products-data";

function ProductCardFeatured({ product, t }: { product: Product; t: ReturnType<typeof useTranslations<"SanPham.ProductCatalog">> }) {
  return (
    <div className="lg:col-span-8 flex flex-col md:flex-row bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300">
      <div className="md:w-1/2 relative min-h-[260px] md:min-h-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={product.image}
        />
      </div>
      <div className="md:w-1/2 p-space-lg flex flex-col justify-between bg-white">
        <div className="flex flex-col gap-space-sm">
          <span className="text-label-technical text-sky-700 uppercase tracking-wider font-semibold">
            {t("lotNumber")} #{product.lot}
          </span>
          <h3 className="text-headline-md text-slate-900 uppercase hover:text-steel-600 transition-colors font-bold">
            {product.title}
          </h3>
          <p className="text-body-md text-slate-600 leading-relaxed">{product.description}</p>
        </div>
        <div className="pt-space-md flex flex-col gap-space-sm">
          <div className="p-space-xs px-space-sm bg-slate-50 border border-slate-200 rounded text-label-technical text-slate-500 flex flex-wrap items-center gap-x-space-sm gap-y-1">
            {product.specChips.map((chip) => (
              <span key={chip.label}>
                {chip.label}: <strong className="text-slate-900">{chip.value}</strong>
              </span>
            ))}
          </div>
          <Link
            href={`/san-pham-du-an/${product.slug}`}
            className="inline-flex items-center gap-space-xs text-label-technical uppercase tracking-wider text-steel-600 hover:translate-x-1 transition-transform font-bold"
          >
            {t("ctaViewDetail")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCardStandard({ product, t }: { product: Product; t: ReturnType<typeof useTranslations<"SanPham.ProductCatalog">> }) {
  return (
    <div className="lg:col-span-4 flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={product.image}
        />
      </div>
      <div className="p-space-md flex flex-col flex-1 justify-between bg-white">
        <div className="flex flex-col gap-space-xs">
          <h3 className="text-headline-sm text-slate-900 uppercase hover:text-steel-600 transition-colors font-bold">
            {product.title}
          </h3>
          <p className="text-body-sm text-slate-600 leading-relaxed">{product.description}</p>
        </div>
        <div className="pt-space-md flex items-center justify-between">
          <span className="text-label-technical text-slate-500 bg-slate-50 border border-slate-200 px-space-sm py-1 rounded font-medium">
            {product.specChips[0]?.label}
            {product.specChips[0] ? ` // ${product.specChips[0].value}` : ""}
          </span>
          <Link
            href={`/san-pham-du-an/${product.slug}`}
            className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-steel-600 hover:bg-steel-600 hover:text-white transition-colors shrink-0"
            aria-label={`${t("viewDetailAriaLabel")} ${product.title}`}
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalog({ products }: { products: Product[] }) {
  const tp = useTranslations("SanPham");
  const t = useTranslations("SanPham.ProductCatalog");
  const searchParams = useSearchParams();
  const CATEGORY_TABS = useMemo(() => getCategoryTabs(tp), [tp]);
  const GRID_PRODUCTS = useMemo(() => products.filter((product) => product.showInGrid), [products]);

  // Danh mục lọc lấy từ ?category= trên URL (bộ lọc nằm ở dropdown trên Header).
  const rawCategory = searchParams.get("category");
  const activeCategory = CATEGORY_TABS.find((tab) => tab.value === rawCategory)?.value ?? "all";

  const filtered = useMemo(() => {
    return GRID_PRODUCTS.filter(
      (product) => activeCategory === "all" || product.categorySlug === activeCategory
    );
  }, [GRID_PRODUCTS, activeCategory]);

  const sectionRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const activeLabel = CATEGORY_TABS.find((tab) => tab.value === activeCategory)?.label ?? "";

  // Chọn danh mục (từ dropdown trên Header) thì cuộn mượt xuống danh sách sản phẩm.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (activeCategory === "all") return;
    }
    const timer = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [activeCategory]);

  const featured = filtered.find((product) => product.featured);
  const standard = filtered.filter((product) => !product.featured);

  return (
    <>
      <section ref={sectionRef} className="w-full mx-auto px-margin py-space-xl bg-slate-50 scroll-mt-[86px]">
        {activeCategory !== "all" && (
          <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm rounded border border-steel-200 bg-white px-space-md py-space-sm">
            <p className="text-body-md text-slate-700">
              <span className="text-label-technical uppercase tracking-wider text-slate-500 mr-2">{t("filterViewing")}:</span>
              <span className="font-bold text-steel-700">{activeLabel}</span>
              <span className="ml-2 text-slate-500">({t("filterCount", { count: filtered.length })})</span>
            </p>
            <IntlLink
              href="/san-pham-du-an"
              scroll={false}
              className="inline-flex min-h-11 items-center text-label-technical uppercase tracking-wider font-semibold text-steel-600 hover:underline"
            >
              {t("filterViewAll")}
            </IntlLink>
          </div>
        )}
        {filtered.length === 0 ? (
          <p className="text-body-md text-slate-500 text-center py-space-xl">{t("emptyState")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter items-stretch">
            {featured && <ProductCardFeatured product={featured} t={t} />}
            {standard.map((product) => (
              <ProductCardStandard key={product.slug} product={product} t={t} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
