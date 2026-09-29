import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PRODUCT_SLUGS, getProducts, getProductBySlug } from "@/lib/products-data";
import ProductBreadcrumbBar from "@/components/san-pham/ProductBreadcrumbBar";
import ProductHero from "@/components/san-pham/ProductHero";
import ProductGallery from "@/components/san-pham/ProductGallery";
import ProductOverview from "@/components/san-pham/ProductOverview";
import ProductProcessTimeline from "@/components/san-pham/ProductProcessTimeline";
import RelatedServices from "@/components/san-pham/RelatedServices";
import RelatedProjects from "@/components/san-pham/RelatedProjects";
import ProductQuoteCta from "@/components/san-pham/ProductQuoteCta";
import Reveal from "@/components/ui/Reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("SanPham");
  const products = getProducts(t);
  const product = getProductBySlug(products, slug) ?? products[0];

  return {
    title: `${product.title} | HANIN TECHNOLOGY VIỆT NAM`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const t = await getTranslations("SanPham");
  const products = getProducts(t);
  // Hiện chỉ có 1 bộ nội dung chi tiết kỹ thuật mẫu (PRODUCT_DETAIL_CONTENT),
  // nên khi slug không khớp sản phẩm cụ thể nào trong danh mục, trang sẽ
  // fallback về sản phẩm mẫu đầu tiên để vẫn hiển thị đầy đủ nội dung.
  const product = getProductBySlug(products, slug) ?? products[0];

  return (
    <div className="flex flex-col w-full">
      <ProductBreadcrumbBar product={product} />
      <ProductHero product={product} />
      <Reveal><ProductGallery /></Reveal>
      <Reveal><ProductOverview /></Reveal>
      <Reveal><ProductProcessTimeline /></Reveal>
      <Reveal><RelatedServices /></Reveal>
      <Reveal><RelatedProjects currentSlug={product.slug} /></Reveal>
      <Reveal><ProductQuoteCta /></Reveal>
    </div>
  );
}
