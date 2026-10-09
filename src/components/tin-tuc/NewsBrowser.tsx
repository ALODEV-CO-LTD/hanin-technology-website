"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NewsArticle, NewsCategoryKey } from "@/lib/news-data";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

const PAGE_SIZE = 9;

interface Props {
  posts: NewsArticle[];
  categories: { key: NewsCategoryKey; label: string; count: number }[];
}

export default function NewsBrowser({ posts, categories }: Props) {
  const tf = useTranslations("TinTuc.NewsFilterBar");
  const tg = useTranslations("TinTuc.NewsGrid");
  const tp = useTranslations("TinTuc.NewsPagination");
  const [activeCategory, setActiveCategory] = useState<NewsCategoryKey>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (activeCategory === "all" || p.categoryKey === activeCategory) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    );
  }, [posts, activeCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const goPage = (n: number) => {
    setPage(n);
    document.getElementById("news-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="w-full bg-white md:sticky md:top-[var(--header-h)] z-40 shadow-sm border-b border-slate-200">
        <div className="mx-auto px-margin py-space-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-xs w-full md:w-auto">
              {categories.map((category) => {
                const isActive = category.key === activeCategory;
                return (
                  <button
                    key={category.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveCategory(category.key);
                      setPage(1);
                    }}
                    className={
                      isActive
                        ? "px-space-md py-space-xs rounded-lg text-title-md bg-steel-600 text-white transition-all shadow-sm flex items-center gap-1.5"
                        : "px-space-md py-space-xs rounded-lg text-title-md bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all flex items-center gap-1.5"
                    }
                  >
                    <span>{category.label}</span>
                    <span
                      className={
                        isActive
                          ? "px-1.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold"
                          : "px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-xs font-bold"
                      }
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
              <div className="relative w-full md:w-64">
                <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-[18px]" />
                <input
                  type="search"
                  aria-label={tf("searchPlaceholder")}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder={tf("searchPlaceholder")}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-body-md text-slate-900 placeholder:text-slate-600 focus:bg-white"
                />
              </div>
              <span className="hidden xl:inline-block text-label-sm text-slate-600 whitespace-nowrap">
                {tf("showingCount", { shown: visible.length, total: filtered.length })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="news-grid" className="w-full bg-slate-50 py-space-xl scroll-mt-24 md:scroll-mt-48">
        <div className="mx-auto px-margin">
          {visible.length === 0 ? (
            <p className="text-center text-body-md text-slate-600 py-space-xl">{tg("empty")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {visible.map((article) => (
                <Link
                  key={article.id}
                  href={`/tin-tuc/${article.id}`}
                  className="block"
                >
                  <article className="h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group transition-all duration-300 hover:shadow-md">
                    <div>
                      <div className="relative h-56 overflow-hidden bg-slate-200">
                        {article.image && (
                          <Photo
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt={article.imageAlt}
                            src={article.image}
                          />
                        )}
                        <div className="absolute top-space-sm left-space-sm">
                          <span
                            className={`px-space-xs py-0.5 rounded bg-white text-label-sm font-bold uppercase tracking-wider text-steel-700`}
                          >
                            {article.categoryLabel}
                          </span>
                        </div>
                      </div>
                      <div className="p-space-md flex flex-col gap-space-xs">
                        <div className="flex items-center gap-space-xs text-label-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Icon name="calendar_month" className="text-[14px]" />
                            {article.date}
                          </span>
                          {article.readTime && (
                            <>
                              <span aria-hidden="true">•</span>
                              <span className="flex items-center gap-1">
                                <Icon name="schedule" className="text-[14px]" />
                                {article.readTime}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="text-headline-sm text-slate-900 group-hover:text-steel-600 transition-colors leading-snug line-clamp-2 font-bold">
                          {article.title}
                        </h3>
                        <p className="text-body-md text-slate-600 line-clamp-3">{article.excerpt}</p>
                      </div>
                    </div>
                    <div className="px-space-md pb-space-md pt-space-xs flex items-center justify-between">
                      <span className="text-label-sm text-slate-600">{article.author}</span>
                      <span className="inline-flex items-center gap-1 text-title-md text-steel-600 group-hover:translate-x-1 transition-all">
                        <span>{tg("readMore")}</span>
                        <Icon name="arrow_forward" className="text-[16px]" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {totalPages > 1 && (
        <section className="w-full bg-white py-space-lg">
          <div className="mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="text-label-sm text-slate-600">
              {tp("summary", { page: current, pages: totalPages, total: filtered.length })}
            </div>
            <nav aria-label={tp("summary", { page: current, pages: totalPages, total: filtered.length })} className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                disabled={current === 1}
                onClick={() => goPage(current - 1)}
                className={`px-space-sm py-1.5 rounded-lg bg-slate-100 transition-colors text-title-md flex items-center gap-1 ${
                  current === 1 ? "text-slate-600 opacity-50 cursor-not-allowed" : "text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Icon name="chevron_left" className="text-[16px]" />
                <span>{tp("prev")}</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-current={n === current ? "page" : undefined}
                  onClick={() => goPage(n)}
                  className={
                    n === current
                      ? "w-11 h-11 rounded-lg bg-steel-600 text-white text-title-md font-bold transition-all shadow-sm"
                      : "w-11 h-11 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 text-title-md transition-all"
                  }
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={current === totalPages}
                onClick={() => goPage(current + 1)}
                className={`px-space-sm py-1.5 rounded-lg bg-slate-100 transition-colors text-title-md flex items-center gap-1 ${
                  current === totalPages ? "text-slate-600 opacity-50 cursor-not-allowed" : "text-slate-900 hover:bg-slate-200"
                }`}
              >
                <span>{tp("next")}</span>
                <Icon name="chevron_right" className="text-[16px]" />
              </button>
            </nav>
          </div>
        </section>
      )}
    </>
  );
}
