import { useTranslations } from "next-intl";
import type { Product } from "@/lib/products-data";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function ProductBreadcrumbBar({ product }: { product: Product }) {
  const tc = useTranslations("SanPham.ProductBreadcrumbBar");

  return (
    <section className="w-full bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-margin py-3">
        <PageBreadcrumb
          items={[
            { label: tc("home"), href: "/" },
            { label: tc("productsAndProjects"), href: "/san-pham-du-an" },
            { label: product.title.toUpperCase() },
          ]}
        />
      </div>
    </section>
  );
}
