import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPosts } from "@/server/public";
import Icon from "@/components/ui/Icon";

export default function NewsUpdates() {
  const t = useTranslations("Home.NewsUpdates");
  const tTinTuc = useTranslations("TinTuc");
  const locale = useLocale();
  const posts = getPosts(locale, tTinTuc, { limit: 3 });
  if (posts.length === 0) return null;

  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <h2 className="text-headline-xl text-slate-900 font-bold">{t("title")}</h2>
          </div>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 py-3 -my-3 text-label-technical uppercase tracking-wider text-slate-600 hover:text-steel-600 transition-colors font-semibold"
          >
            <span>{t("ctaAll")}</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.id}`}
              className="p-space-lg bg-white border border-slate-200 rounded shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center text-slate-600">
                  <span className="text-xs px-2 py-0.5 rounded bg-steel-50 text-steel-700 uppercase font-semibold">
                    {post.categoryLabel}
                  </span>
                </div>
                <h3 className="text-title-md text-slate-900 font-bold group-hover:text-steel-600 transition-colors leading-snug">
                  {post.title}
                </h3>
              </div>
              <div className="pt-space-md flex items-center gap-2 text-steel-600 text-xs uppercase tracking-wider font-semibold">
                <span>{t("readMore")}</span>
                <Icon name="east" className="text-[16px] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
