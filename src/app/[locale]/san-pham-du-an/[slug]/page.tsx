import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getProductBySlug } from "@/server/public";
import ProductBreadcrumbBar from "@/components/san-pham/ProductBreadcrumbBar";
import ProductHero from "@/components/san-pham/ProductHero";
import ProductGallery from "@/components/san-pham/ProductGallery";
import ProductOverview from "@/components/san-pham/ProductOverview";
import ProductProcessTimeline from "@/components/san-pham/ProductProcessTimeline";
import RelatedServices from "@/components/san-pham/RelatedServices";
import RelatedProjects from "@/components/san-pham/RelatedProjects";
import ProductQuoteCta from "@/components/san-pham/ProductQuoteCta";
import Reveal from "@/components/ui/Reveal";
import ClientMessages from "@/i18n/client-messages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("SanPham");
  const product = getProductBySlug(slug, await getLocale(), t);
  if (!product) return {};

  return {
    title: `${product.title}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = await getTranslations("SanPham");
  const product = getProductBySlug(slug, await getLocale(), t);
  if (!product) notFound();
  // Phần định danh (tiêu đề, breadcrumb) lấy từ CMS; các mục chi tiết kỹ thuật còn lại là
  // nội dung mẫu dùng chung từ messages, chỉnh sửa qua màn hình "Nội dung trang" của CMS.

  return (
    <ClientMessages keys={["SanPham.ProductGallery"]}>
    <div className="flex flex-col w-full">
      <ProductBreadcrumbBar product={product} />
      <ProductHero product={product} />
      <Reveal><ProductGallery product={product} /></Reveal>
      <Reveal direction="left"><ProductOverview /></Reveal>
      <Reveal><ProductProcessTimeline /></Reveal>
      <Reveal><RelatedServices /></Reveal>
      <Reveal><RelatedProjects currentSlug={product.slug} /></Reveal>
      <Reveal direction="left"><ProductQuoteCta /></Reveal>
    </div>
    </ClientMessages>
  );
}
