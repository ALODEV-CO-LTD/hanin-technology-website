import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/lib/products-data";
import { getProducts } from "@/server/public";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

export default function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const tp = useTranslations("SanPham");
  const locale = useLocale();
  const t = useTranslations("SanPham.RelatedProjects");
  const related: Product[] = getProducts(locale, tp)
    .filter((product) => product.showInGrid && product.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="w-full bg-white py-space-xl border-b border-slate-200">
      <div className="mx-auto px-margin">
        <div className="mb-space-lg">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {related.map((project) => (
            <Link
              key={project.slug}
              href={`/san-pham-du-an/${project.slug}`}
              className="group flex flex-col bg-white border border-slate-200 rounded overflow-hidden hover:border-steel-600 hover:shadow-md transition-all shadow-sm"
            >
              <div className="w-full aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <Photo
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={project.image}
                />
              </div>
              <div className="p-space-md flex flex-col gap-space-xs">
                <span className="text-label-sm text-steel-600 font-semibold uppercase">
                  {project.category}
                </span>
                <h3 className="text-title-md text-slate-900 group-hover:text-steel-600 transition-colors uppercase leading-snug">
                  {project.title}
                </h3>
                <p className="text-body-md text-slate-600 line-clamp-2 mt-1">{project.description}</p>
                <div className="flex items-center gap-space-xs pt-space-xs text-steel-600 text-label-technical uppercase font-semibold">
                  <span>{t("ctaViewDetail")}</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
