import { useTranslations } from "next-intl";
import { getNewsArticles } from "@/lib/news-data";

export default function NewsGrid() {
  const t = useTranslations("TinTuc");
  const tc = useTranslations("TinTuc.NewsGrid");
  const NEWS_ARTICLES = getNewsArticles(t);
  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {NEWS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group transition-all duration-300 hover:shadow-md"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={article.imageAlt}
                    src={article.image}
                  />
                  <div className="absolute top-space-sm left-space-sm">
                    <span
                      className={`px-space-xs py-0.5 rounded bg-white/90 backdrop-blur-sm text-label-sm font-bold uppercase tracking-wider ${article.categoryColorClass}`}
                    >
                      {article.categoryLabel}
                    </span>
                  </div>
                </div>
                <div className="p-space-md flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs text-label-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        calendar_month
                      </span>
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-headline-sm text-slate-900 group-hover:text-steel-600 transition-colors leading-snug line-clamp-2 font-bold">
                    {article.title}
                  </h3>
                  <p className="text-body-md text-slate-600 line-clamp-3">{article.excerpt}</p>
                </div>
              </div>
              <div className="px-space-md pb-space-md pt-space-xs flex items-center justify-between">
                <span className="text-label-sm text-slate-500">{article.author}</span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-title-md text-steel-600 group-hover:translate-x-1 transition-all"
                >
                  <span>{tc("readMore")}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
