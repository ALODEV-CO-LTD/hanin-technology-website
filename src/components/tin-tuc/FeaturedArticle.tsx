import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedPost } from "@/server/public";

export default function FeaturedArticle() {
  const t = useTranslations("TinTuc");
  const tc = useTranslations("TinTuc.FeaturedArticle");
  const locale = useLocale();
  const article = getFeaturedPost(locale, t);
  if (!article) return null;

  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="mx-auto px-margin">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-4 bg-steel-600 rounded-sm" />
            <span className="text-title-md uppercase tracking-wider text-slate-900 font-bold">
              {tc("heading")}
            </span>
          </div>
          <span className="text-label-technical text-slate-500 uppercase tracking-wider">
            {tc("badge")}
          </span>
        </div>

        <article className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 group transition-all duration-300 hover:shadow-md">
          {/* Visual Column */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px] overflow-hidden bg-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={article.imageAlt}
              src={article.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute top-space-md left-space-md flex flex-wrap items-center gap-space-xs">
              {article.tag && (
                <span className="px-space-sm py-1 bg-steel-600 text-white text-label-sm uppercase font-bold tracking-wider rounded">
                  {article.tag}
                </span>
              )}
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col justify-between bg-white">
            <div className="flex flex-col gap-space-md">
              <div className="flex flex-wrap items-center gap-space-xs text-label-sm">
                <span className="px-space-xs py-0.5 rounded bg-steel-100 text-steel-700 font-bold uppercase">
                  {article.category}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  {article.date}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-headline-lg text-slate-900 group-hover:text-steel-600 transition-colors leading-tight font-bold">
                {article.title}
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed">{article.excerpt}</p>

              {/* Technical Metadata Metric Inset */}
              {article.metrics.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 p-space-sm rounded-lg grid grid-cols-3 gap-space-xs text-center text-label-sm">
                {article.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <span className="text-slate-500">{metric.label}</span>
                    <span
                      className={
                        metric.highlight
                          ? "text-title-md text-steel-600 font-bold"
                          : "text-title-md text-slate-900 font-bold"
                      }
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
              )}
            </div>

            <div className="pt-space-md flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-label-sm text-slate-900">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-steel-600 font-bold">
                  {article.author.trim().charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">{article.author}</span>
                  <span className="text-slate-500 text-label-sm">{article.authorRole}</span>
                </div>
              </div>
              <Link
                href={`/tin-tuc/${article.slug}`}
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-steel-600 text-white text-title-md rounded-lg shadow-sm hover:bg-steel-700 transition-all uppercase tracking-wider"
              >
                <span>{tc("readArticle")}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
