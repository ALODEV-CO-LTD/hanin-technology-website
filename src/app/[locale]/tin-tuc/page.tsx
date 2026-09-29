import type { Metadata } from "next";
import NewsBreadcrumb from "@/components/tin-tuc/NewsBreadcrumb";
import NewsIntro from "@/components/tin-tuc/NewsIntro";
import FeaturedArticle from "@/components/tin-tuc/FeaturedArticle";
import NewsFilterBar from "@/components/tin-tuc/NewsFilterBar";
import NewsGrid from "@/components/tin-tuc/NewsGrid";
import NewsPagination from "@/components/tin-tuc/NewsPagination";
import NewsInquiryCta from "@/components/tin-tuc/NewsInquiryCta";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tin tức & Bản tin kỹ thuật | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "Cập nhật tin tức doanh nghiệp, công nghệ xử lý bề mặt kim loại, quy chuẩn đo kiểm chất lượng và hoạt động sản xuất mới nhất từ HANIN TECHNOLOGY VIỆT NAM.",
};

export default function TinTucPage() {
  return (
    <div className="flex flex-col w-full text-slate-900">
      <NewsBreadcrumb />
      <NewsIntro />
      <Reveal><FeaturedArticle /></Reveal>
      <Reveal><NewsFilterBar /></Reveal>
      <Reveal><NewsGrid /></Reveal>
      <Reveal><NewsPagination /></Reveal>
      <Reveal><NewsInquiryCta /></Reveal>
    </div>
  );
}
