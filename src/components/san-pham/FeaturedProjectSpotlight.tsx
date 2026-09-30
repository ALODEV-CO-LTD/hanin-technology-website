import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getSpotlightProduct } from "@/server/public";

export default function FeaturedProjectSpotlight() {
  const t = useTranslations("SanPham");
  const tc = useTranslations("SanPham.FeaturedProjectSpotlight");
  const locale = useLocale();
  const project = getSpotlightProduct(locale, t);

  if (!project) return null;

  return (
    <section className="w-full bg-white border-y border-slate-200 py-space-xl overflow-hidden">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center bg-white border border-slate-200 rounded overflow-hidden shadow-md">
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] h-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={project.imageAlt}
              className="w-full h-full object-cover"
              src={project.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/30" />
          </div>
          <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <h2 className="text-headline-lg text-slate-900 uppercase leading-snug font-bold">
                {project.title}
              </h2>
            </div>
            <p className="text-body-md text-slate-600 leading-relaxed">{project.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
              {project.specChips.map((chip) => (
                <div
                  key={chip.label}
                  className="p-space-sm bg-slate-50 border border-slate-200 rounded flex flex-col gap-1"
                >
                  <span className="text-label-technical uppercase text-slate-500 font-medium">
                    {chip.label}
                  </span>
                  <span className="text-body-sm text-slate-900 font-semibold">{chip.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm pt-space-sm">
              <Link
                href={`/san-pham-du-an/${project.slug}`}
                className="inline-flex items-center justify-center px-space-md py-space-sm bg-steel-600 text-white text-label-technical uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-md font-bold"
              >
                {tc("ctaViewDetail")}
              </Link>
              <a
                className="inline-flex items-center justify-center px-space-md py-space-sm bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-label-technical uppercase tracking-wider rounded transition-colors font-bold"
                href="#"
              >
                {tc("ctaDownloadCaseStudy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
