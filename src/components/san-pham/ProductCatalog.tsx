import { getTranslations } from "next-intl/server";
import { withProductBadges, type Product } from "@/lib/products-data";
import ProductCatalogClient from "./ProductCatalogClient";

/** Server wrapper: gắn nhãn lớp mạ và vật liệu nền (namespace HomeProducts) rồi giao cho lưới phía client. */
export default async function ProductCatalog({ products }: { products: Product[] }) {
  const th = await getTranslations("HomeProducts");
  return (
    <ProductCatalogClient
      products={withProductBadges(products, th)}
      labels={{ plating: th("platingLabel"), substrate: th("substrateLabel") }}
    />
  );
}
