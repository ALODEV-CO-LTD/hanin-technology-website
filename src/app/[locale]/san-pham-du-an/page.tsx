import type { Metadata } from "next";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getProducts } from "@/server/public";
import CategoryHero from "@/components/san-pham/CategoryHero";
import ProductCatalog from "@/components/san-pham/ProductCatalog";
import FeaturedProjectSpotlight from "@/components/san-pham/FeaturedProjectSpotlight";
import SpecTrustNote from "@/components/san-pham/SpecTrustNote";
import ProductsCta from "@/components/san-pham/ProductsCta";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Sản phẩm & Dự án",
  description:
    "Sản phẩm và dự án gia công mạ kim loại kỹ thuật cao: kiểm soát dung sai micron, độ đồng đều lớp phủ và độ bền môi trường khắt khe.",
};

export default async function SanPhamDuAnPage() {
  const products = getProducts(await getLocale(), await getTranslations("SanPham"));

  return (
    <div className="flex flex-col w-full">
      <CategoryHero />
      <Reveal>
        <Suspense fallback={null}>
          <ProductCatalog products={products} />
        </Suspense>
      </Reveal>
      <Reveal direction="right"><FeaturedProjectSpotlight /></Reveal>
      <Reveal><SpecTrustNote /></Reveal>
      <Reveal><ProductsCta /></Reveal>
    </div>
  );
}
