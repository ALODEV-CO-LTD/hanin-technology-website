"use client";

import { useState } from "react";
import { NEWS_CATEGORIES, type NewsCategoryKey } from "@/lib/news-data";

export default function NewsFilterBar() {
  const [activeCategory, setActiveCategory] = useState<NewsCategoryKey>("all");

  return (
    <section className="w-full bg-white sticky top-20 z-40 shadow-sm border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin py-space-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md">
          {/* Tab Filters */}
          <div className="flex flex-wrap items-center gap-space-xs w-full md:w-auto">
            {NEWS_CATEGORIES.map((category) => {
              const isActive = category.key === activeCategory;
              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={
                    isActive
                      ? "px-space-md py-space-xs rounded-lg text-title-md bg-orange-600 text-white transition-all shadow-sm flex items-center gap-1.5"
                      : "px-space-md py-space-xs rounded-lg text-title-md bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all"
                  }
                >
                  <span>{category.label}</span>
                  {typeof category.count === "number" && (
                    <span
                      className={
                        isActive
                          ? "px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold"
                          : "px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold"
                      }
                    >
                      {category.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Input & Status Info */}
          <div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
            <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm chuyên đề kỹ thuật..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-body-md text-slate-900 placeholder:text-slate-500 focus:outline-none focus:bg-white focus:border-orange-300"
              />
            </div>
            <span className="hidden xl:inline-block text-label-sm text-slate-500 whitespace-nowrap">
              Hiển thị 6 / 48 bài
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
