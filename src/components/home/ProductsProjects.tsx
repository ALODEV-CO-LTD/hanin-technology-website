import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getProducts } from "@/server/public";


export default function ProductsProjects() {
  const t = useTranslations("Home.ProductsProjects");
  const tp = useTranslations("SanPham");
  const locale = useLocale();
  const projects = getProducts(locale, tp)
    .filter((product) => product.showInGrid)
    .slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section className="w-full py-space-xl bg-slate-50">
      <div className="mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-2">
            <h2 className="text-headline-xl text-slate-900 font-bold">
              {t("title")}
            </h2>
            <p className="text-body-md text-slate-600">
              {t("description")}
            </p>
          </div>
          <Link
            href="/san-pham-du-an"
            className="inline-flex items-center gap-2 text-label-technical uppercase tracking-wider text-slate-600 hover:text-steel-600 transition-colors whitespace-nowrap font-semibold"
          >
            <span>{t("ctaAll")}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/san-pham-du-an/${project.slug}`}
              className="group flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={project.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={project.image}
                />
              </div>
              <div className="p-space-lg flex flex-col gap-2">
                <span className="text-label-technical text-steel-600 uppercase font-bold tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-headline-sm text-slate-900 font-bold group-hover:text-steel-600 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 pt-space-xs text-slate-500 group-hover:text-steel-600 transition-colors">
                  <span className="text-label-technical uppercase tracking-wider font-semibold">
                    {t("project1.cta")}
                  </span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
