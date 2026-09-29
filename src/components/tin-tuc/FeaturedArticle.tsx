import { FEATURED_ARTICLE } from "@/lib/news-data";

export default function FeaturedArticle() {
  const article = FEATURED_ARTICLE;

  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-4 bg-orange-600 rounded-sm" />
            <span className="text-title-md uppercase tracking-wider text-slate-900 font-bold">
              TIÊU ĐIỂM KỸ THUẬT
            </span>
          </div>
          <span className="text-label-technical text-slate-500 uppercase tracking-wider">
            FEATURED ARTICLE
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
              <span className="px-space-sm py-1 bg-orange-600 text-white text-label-sm uppercase font-bold tracking-wider rounded">
                {article.tag}
              </span>
              <span className="px-space-xs py-1 bg-slate-900/80 backdrop-blur-sm text-white text-label-sm rounded">
                {article.standard}
              </span>
            </div>
            <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-white text-label-sm">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {article.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {article.liveLabel}
              </span>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col justify-between bg-white">
            <div className="flex flex-col gap-space-md">
              <div className="flex flex-wrap items-center gap-space-xs text-label-sm">
                <span className="px-space-xs py-0.5 rounded bg-orange-100 text-orange-700 font-bold uppercase">
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
              <h2 className="text-headline-lg text-slate-900 group-hover:text-orange-600 transition-colors leading-tight font-bold">
                {article.title}
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed">{article.excerpt}</p>

              {/* Technical Metadata Metric Inset */}
              <div className="bg-slate-50 border border-slate-200 p-space-sm rounded-lg grid grid-cols-3 gap-space-xs text-center text-label-sm">
                {article.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <span className="text-slate-500">{metric.label}</span>
                    <span
                      className={
                        metric.highlight
                          ? "text-title-md text-orange-600 font-bold"
                          : "text-title-md text-slate-900 font-bold"
                      }
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-space-md flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-label-sm text-slate-900">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-orange-600 font-bold">
                  HT
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">{article.author}</span>
                  <span className="text-slate-500 text-label-sm">{article.authorRole}</span>
                </div>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-orange-600 text-white text-title-md rounded-lg shadow-sm hover:bg-orange-700 transition-all uppercase tracking-wider"
              >
                <span>ĐỌC BÀI VIẾT</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
