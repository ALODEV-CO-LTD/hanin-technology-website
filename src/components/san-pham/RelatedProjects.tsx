import Link from "next/link";
import { PRODUCTS, type Product } from "@/lib/products-data";

export default function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const related: Product[] = PRODUCTS.filter(
    (product) => product.showInGrid && product.slug !== currentSlug,
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="w-full bg-slate-50 py-space-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-space-lg">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
            DỰ ÁN &amp; SẢN PHẨM KHÁC
          </h2>
          <p className="text-body-md text-slate-600 mt-1">
            Các sản phẩm cơ khí chính xác và hoàn thiện bề mặt tiêu biểu được hoàn thành tại nhà
            máy HANIN.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {related.map((project) => (
            <Link
              key={project.slug}
              href={`/san-pham-du-an/${project.slug}`}
              className="group flex flex-col bg-white border border-slate-200 rounded overflow-hidden hover:border-steel-600 hover:shadow-md transition-all shadow-sm"
            >
              <div className="w-full aspect-[16/10] bg-slate-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={project.image}
                />
                <span className="absolute top-2 left-2 px-space-xs py-0.5 bg-white/95 backdrop-blur font-mono text-label-sm text-steel-600 font-semibold rounded shadow-sm">
                  LOT #{project.lot}
                </span>
              </div>
              <div className="p-space-md flex flex-col gap-space-xs">
                <span className="text-label-sm text-slate-500 uppercase">
                  {project.category}
                </span>
                <h3 className="text-title-md text-slate-900 group-hover:text-steel-600 transition-colors uppercase leading-snug">
                  {project.title}
                </h3>
                <p className="text-body-sm text-slate-600 line-clamp-2 mt-1">{project.description}</p>
                <div className="flex items-center gap-space-xs pt-space-xs text-steel-600 text-label-sm font-semibold">
                  <span>XEM CHI TIẾT DỰ ÁN</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
