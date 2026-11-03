import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getProducts } from "@/server/public";
import CategoryHero from "@/components/san-pham/CategoryHero";
import ProductCatalog from "@/components/san-pham/ProductCatalog";
import FeaturedProjectSpotlight from "@/components/san-pham/FeaturedProjectSpotlight";
import SpecTrustNote from "@/components/san-pham/SpecTrustNote";
import ProductsCta from "@/components/san-pham/ProductsCta";
import Reveal from "@/components/ui/Reveal";
import ClientMessages from "@/i18n/client-messages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata({ locale, path: "/san-pham-du-an", title: t("sanPham.title"), description: t("sanPham.description") });
}

export default async function SanPhamDuAnPage() {
  const products = getProducts(await getLocale(), await getTranslations("SanPham"));

  return (
    <ClientMessages keys={["SanPham.ProductCatalog", "SanPham.categoryTabs"]}>
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
    </ClientMessages>
  );
}
