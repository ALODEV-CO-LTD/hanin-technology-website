import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/products-data";
import { getProductDetailContent } from "@/lib/products-data";

export default function ProductBreadcrumbBar({ product }: { product: Product }) {
  const t = useTranslations("SanPham");
  const tc = useTranslations("SanPham.ProductBreadcrumbBar");
  const { specEyebrow } = getProductDetailContent(t);

  return (
    <section className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-slate-500 text-xs font-mono">
        <nav className="flex items-center gap-2 tracking-wider flex-wrap font-sans text-xs">
          <Link className="hover:text-steel-600 transition-colors" href="/">
            {tc("home")}
          </Link>
          <span className="text-slate-300">/</span>
          <Link className="hover:text-steel-600 transition-colors" href="/san-pham-du-an">
            {tc("productsAndProjects")}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-steel-600 font-semibold uppercase">{product.title}</span>
        </nav>
        <div className="inline-flex items-center gap-2 self-start md:self-auto bg-slate-100 px-3 py-1 rounded border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-steel-600 animate-pulse" />
          <span className="text-slate-700 text-xs tracking-widest font-mono">
            {tc("lot")}: #{product.lot} {"//"} {specEyebrow}
          </span>
        </div>
      </div>
    </section>
  );
}
