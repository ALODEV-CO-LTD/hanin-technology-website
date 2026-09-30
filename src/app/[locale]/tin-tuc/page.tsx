import type { Metadata } from "next";
import NewsBanner from "@/components/tin-tuc/NewsBanner";
import NewsIntro from "@/components/tin-tuc/NewsIntro";
import FeaturedArticle from "@/components/tin-tuc/FeaturedArticle";
import NewsFilterBar from "@/components/tin-tuc/NewsFilterBar";
import NewsGrid from "@/components/tin-tuc/NewsGrid";
import NewsPagination from "@/components/tin-tuc/NewsPagination";
import NewsInquiryCta from "@/components/tin-tuc/NewsInquiryCta";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tin tức & Bản tin kỹ thuật",
  description:
    "Cập nhật tin tức doanh nghiệp, công nghệ xử lý bề mặt kim loại, quy chuẩn đo kiểm chất lượng và hoạt động sản xuất mới nhất.",
};

export default function TinTucPage() {
  return (
    <div className="flex flex-col w-full text-slate-900">
      <NewsBanner />
      <NewsIntro />
      <Reveal direction="right"><FeaturedArticle /></Reveal>
      <Reveal><NewsFilterBar /></Reveal>
      <Reveal><NewsGrid /></Reveal>
      <Reveal><NewsPagination /></Reveal>
      <Reveal direction="left"><NewsInquiryCta /></Reveal>
    </div>
  );
}
