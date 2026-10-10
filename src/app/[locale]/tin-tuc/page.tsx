import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import NewsBanner from "@/components/tin-tuc/NewsBanner";
import NewsIntro from "@/components/tin-tuc/NewsIntro";
import FeaturedArticle from "@/components/tin-tuc/FeaturedArticle";
import NewsBrowser from "@/components/tin-tuc/NewsBrowser";
import NewsInquiryCta from "@/components/tin-tuc/NewsInquiryCta";
import Reveal from "@/components/ui/Reveal";
import { getNewsCategories } from "@/lib/news-data";
import { getPostCounts, getPosts } from "@/server/public";
import ClientMessages from "@/i18n/client-messages";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("tinTuc.title"), description: t("tinTuc.description") };
}

export default async function TinTucPage() {
  const locale = await getLocale();
  const t = await getTranslations("TinTuc");
  const counts = getPostCounts();
  const posts = getPosts(locale, t).map((p) => ({
    id: p.id,
    categoryKey: p.categoryKey,
    categoryLabel: p.categoryLabel,
    categoryColorClass: p.categoryColorClass,
    techBadge: p.techBadge,
    date: p.date,
    readTime: p.readTime,
    title: p.title,
    excerpt: p.excerpt,
    author: p.author,
    image: p.image,
    imageAlt: p.imageAlt,
  }));
  const categories = getNewsCategories(t).map((c) => ({ ...c, count: counts[c.key] ?? 0 }));

  return (
    <ClientMessages keys={["TinTuc.NewsFilterBar", "TinTuc.NewsGrid", "TinTuc.NewsPagination"]}>
    <div className="flex flex-col w-full text-slate-900">
      <NewsBanner />
      <NewsIntro />
      <Reveal direction="right"><FeaturedArticle /></Reveal>
      <Reveal><NewsBrowser posts={posts} categories={categories} /></Reveal>
      <Reveal direction="left"><NewsInquiryCta /></Reveal>
    </div>
    </ClientMessages>
  );
}
