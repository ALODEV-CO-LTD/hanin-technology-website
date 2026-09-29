"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_TABS, getGridProducts, type Product } from "@/lib/products-data";

const GRID_PRODUCTS = getGridProducts();

function ProductCardFeatured({ product }: { product: Product }) {
  return (
    <div className="lg:col-span-8 flex flex-col md:flex-row bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300">
      <div className="md:w-1/2 relative min-h-[260px] md:min-h-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={product.image}
        />
        <div className="absolute top-space-sm left-space-sm px-space-xs py-0.5 bg-white/90 border border-slate-200 backdrop-blur-sm rounded text-label-technical text-steel-600 font-bold">
          {product.imageBadge}
        </div>
      </div>
      <div className="md:w-1/2 p-space-lg flex flex-col justify-between bg-white">
        <div className="flex flex-col gap-space-sm">
          <span className="text-label-technical text-sky-700 uppercase tracking-wider font-semibold">
            LÔ SẢN XUẤT #{product.lot}
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
            XEM CHI TIẾT SẢN PHẨM →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCardStandard({ product }: { product: Product }) {
  return (
    <div className="lg:col-span-4 flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={product.image}
        />
        <div className="absolute top-space-sm left-space-sm px-space-xs py-0.5 bg-white/90 border border-slate-200 backdrop-blur-sm rounded text-label-technical text-steel-600 font-bold">
          {product.imageBadge}
        </div>
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
            aria-label={`Xem chi tiết ${product.title}`}
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_TABS)[number]["value"]>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return GRID_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categorySlug === activeCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const featured = filtered.find((product) => product.featured);
  const standard = filtered.filter((product) => !product.featured);

  return (
    <>
      <section className="sticky top-20 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-margin py-space-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveCategory(tab.value)}
                className={
                  activeCategory === tab.value
                    ? "px-space-md py-space-xs bg-steel-600 text-white text-label-technical uppercase tracking-wider rounded shrink-0 transition-all shadow-sm font-semibold"
                    : "px-space-md py-space-xs bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 text-label-technical uppercase tracking-wider rounded shrink-0 transition-colors font-semibold"
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-space-sm pointer-events-none">
                search
              </span>
              <input
                className="w-full sm:w-64 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 text-body-sm pl-9 pr-space-sm py-space-xs rounded focus:outline-none focus:border-steel-600 focus:bg-white transition-all"
                placeholder="Tìm kiếm sản phẩm / dự án..."
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="hidden sm:inline-flex items-center px-space-sm py-space-xs bg-slate-50 border border-slate-200 rounded text-label-technical text-slate-500 shrink-0 font-medium">
              [ĐANG HIỂN THỊ {String(filtered.length).padStart(2, "0")} KẾT QUẢ]
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1280px] mx-auto px-margin py-space-xl">
        {filtered.length === 0 ? (
          <p className="text-body-md text-slate-500 text-center py-space-xl">
            Không tìm thấy sản phẩm / dự án phù hợp với bộ lọc hiện tại.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter items-stretch">
            {featured && <ProductCardFeatured product={featured} />}
            {standard.map((product) => (
              <ProductCardStandard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
