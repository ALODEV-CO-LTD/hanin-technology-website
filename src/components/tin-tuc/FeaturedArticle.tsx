import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedPost } from "@/server/public";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

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
        </div>

        <article className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 group transition-all duration-300 hover:shadow-md">
          {/* Visual Column */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px] overflow-hidden bg-slate-200">
            <Photo
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
                <span aria-hidden="true" className="text-slate-600">•</span>
                <span className="text-slate-600 flex items-center gap-1">
                  <Icon name="calendar_today" className="text-[14px]" />
                  {article.date}
                </span>
                <span aria-hidden="true" className="text-slate-600">•</span>
                <span className="text-slate-600 flex items-center gap-1">
                  <Icon name="schedule" className="text-[14px]" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-headline-lg text-slate-900 group-hover:text-steel-600 transition-colors leading-tight font-bold">
                {article.title}
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed">{article.excerpt}</p>

            </div>

            <div className="pt-space-md flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-label-sm text-slate-900">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-steel-600 font-bold">
                  {article.author.trim().charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">{article.author}</span>
                  <span className="text-slate-600 text-label-sm">{article.authorRole}</span>
                </div>
              </div>
              <Link
                href={`/tin-tuc/${article.slug}`}
                className="inline-flex min-h-11 items-center gap-space-xs px-space-md py-space-sm bg-steel-600 text-white text-title-md rounded-lg shadow-sm hover:bg-steel-700 transition-all uppercase tracking-wider"
              >
                <span>{tc("readArticle")}</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
