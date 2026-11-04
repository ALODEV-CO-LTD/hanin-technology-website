import { useTranslations } from "next-intl";
import { getProductDetailContent } from "@/lib/products-data";
import type { Product } from "@/lib/products-data";
import { PRODUCT_GALLERY_POOL, pickImages } from "@/lib/factory-pool";
import ProductGalleryClient from "./ProductGalleryClient";
import { PRODUCT_PROFILE_GALLERY } from "@/lib/block-images";

export default function ProductGallery({ product }: { product: Product }) {
  const tp = useTranslations("SanPham");
  const { gallery } = getProductDetailContent(tp);
  const images = PRODUCT_PROFILE_GALLERY[product.slug] ?? pickImages(product.slug, PRODUCT_GALLERY_POOL, 4, [product.image]);
  return <ProductGalleryClient gallery={gallery.map((item, i) => ({ ...item, image: images[i] }))} />;
}
