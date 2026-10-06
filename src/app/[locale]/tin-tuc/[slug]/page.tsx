import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import PostBody from "@/components/tin-tuc/PostBody";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPosts } from "@/server/public";
import Icon from "@/components/ui/Icon";

type PageParams = { slug: string };

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("TinTuc");
  const post = getPostBySlug(slug, locale, t);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.image ? { images: [post.image] } : undefined,
  };
}

export default async function TinTucChiTietPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("TinTuc");
  const tNav = await getTranslations("Nav");
  const post = getPostBySlug(slug, locale, t);
  if (!post) notFound();

  const related = getPosts(locale, t, { limit: 4 })
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="px-margin py-space-lg flex flex-col w-full">
      <PageBreadcrumb
        className="mb-space-md"
        items={[
          { label: tNav("trangChu"), href: "/" },
          { label: t("NewsBreadcrumb.news"), href: "/tin-tuc" },
          { label: post.title },
        ]}
      />

      <article className="mx-auto w-full max-w-3xl flex flex-col gap-space-md">
        {post.image && (
          <div className="rounded-xl overflow-hidden bg-slate-200 border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-auto max-h-[480px] object-cover" alt={post.imageAlt} src={post.image} />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-space-xs text-label-sm">
          <span className="px-space-xs py-0.5 rounded bg-steel-100 text-steel-700 font-bold uppercase">
            {post.categoryLabel}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-500 flex items-center gap-1">
            <Icon name="calendar_today" className="text-[14px]" />
            <time dateTime={post.isoDate}>{post.date}</time>
          </span>
          {post.readTime && (
            <>
              <span className="text-slate-500">•</span>
              <span className="text-slate-500 flex items-center gap-1">
                <Icon name="schedule" className="text-[14px]" />
                {post.readTime}
              </span>
            </>
          )}
          {post.author && (
            <>
              <span className="text-slate-500">•</span>
              <span className="text-slate-500 flex items-center gap-1">
                <Icon name="person" className="text-[14px]" />
                {post.author}
              </span>
            </>
          )}
        </div>

        <h1 className="text-headline-lg lg:text-headline-xl text-slate-900 font-bold leading-tight">{post.title}</h1>
        {post.excerpt && <p className="text-body-lg text-slate-600 leading-relaxed">{post.excerpt}</p>}

        <PostBody body={post.body} />
      </article>

      {related.length > 0 && (
        <section className="mt-space-xl">
          <h2 className="text-headline-sm text-slate-900 font-bold mb-space-md">{t("PostDetail.related")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {related.map((r) => (
              <Link key={r.id} href={`/tin-tuc/${r.id}`} className="block">
                <article className="h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-md">
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    {r.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={r.imageAlt}
                        src={r.image}
                      />
                    )}
                    <div className="absolute top-space-sm left-space-sm">
                      <span
                        className={`px-space-xs py-0.5 rounded bg-white text-label-sm font-bold uppercase tracking-wider ${r.categoryColorClass}`}
                      >
                        {r.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-xs">
                    <span className="text-label-sm text-slate-500">{r.date}</span>
                    <h3 className="text-headline-sm text-slate-900 group-hover:text-steel-600 transition-colors leading-snug line-clamp-2 font-bold">
                      {r.title}
                    </h3>
                    <p className="text-body-md text-slate-600 line-clamp-3">{r.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-space-xl mx-auto w-full max-w-3xl">
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-space-xs text-title-md text-steel-600 hover:text-steel-700 transition-colors"
        >
          <Icon name="arrow_back" className="text-[18px]" />
          <span>{t("PostDetail.backToNews")}</span>
        </Link>
      </div>
    </div>
  );
}
