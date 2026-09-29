import type { Metadata } from "next";
import CategoryHero from "@/components/san-pham/CategoryHero";
import ProductCatalog from "@/components/san-pham/ProductCatalog";
import FeaturedProjectSpotlight from "@/components/san-pham/FeaturedProjectSpotlight";
import SpecTrustNote from "@/components/san-pham/SpecTrustNote";
import ProductsCta from "@/components/san-pham/ProductsCta";

export const metadata: Metadata = {
  title: "Sản phẩm & Dự án | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "Sản phẩm và dự án gia công mạ kim loại kỹ thuật cao của HANIN TECHNOLOGY VIỆT NAM: kiểm soát dung sai micron, độ đồng đều lớp phủ và độ bền môi trường khắt khe.",
};

export default function SanPhamDuAnPage() {
  return (
    <div className="flex flex-col w-full">
      <CategoryHero />
      <ProductCatalog />
      <FeaturedProjectSpotlight />
      <SpecTrustNote />
      <ProductsCta />
    </div>
  );
}
