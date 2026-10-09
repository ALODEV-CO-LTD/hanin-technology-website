import { useLocale, useTranslations } from "next-intl";
import { getSpotlightProduct } from "@/server/public";
import { Link } from "@/i18n/navigation";
import Photo from "@/components/ui/Photo";

export default function FeaturedProjectSpotlight() {
  const t = useTranslations("SanPham");
  const tc = useTranslations("SanPham.FeaturedProjectSpotlight");
  const locale = useLocale();
  const project = getSpotlightProduct(locale, t);

  if (!project) return null;

  return (
    <section className="w-full bg-white border-y border-slate-200 py-space-xl overflow-hidden">
      <div className="mx-auto px-margin">
        <h2 className="mb-space-md text-headline-lg text-slate-900 font-bold">{tc("heading")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center bg-white border border-slate-200 rounded overflow-hidden shadow-md">
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] h-full overflow-hidden bg-slate-100">
            <Photo
              alt={project.imageAlt}
              className="w-full h-full object-cover"
              src={project.image}
            />
          </div>
          <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <h3 className="text-headline-md text-slate-900 uppercase leading-snug font-bold">
                {project.title}
              </h3>
            </div>
            <p className="text-body-md text-slate-600 leading-relaxed">{project.description}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded border border-steel-200 bg-steel-200">
              {project.specChips.map((chip) => (
                <div key={chip.label} className="bg-steel-50 px-space-md py-space-sm flex flex-col gap-1">
                  <dt className="text-label-technical uppercase text-steel-600 font-semibold">
                    {chip.label}
                  </dt>
                  <dd className="text-body-md text-slate-900 font-bold leading-snug">{chip.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm pt-space-sm">
              <Link
                href={`/san-pham-du-an/${project.slug}`}
                className="inline-flex min-h-11 items-center justify-center px-space-md py-space-sm bg-steel-600 text-white text-label-technical uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-md font-bold"
              >
                {tc("ctaViewDetail")}
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center px-space-md py-space-sm bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-label-technical uppercase tracking-wider rounded transition-colors font-bold"
                href="/lien-he#rfq-form"
              >
                {tc("ctaDownloadCaseStudy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
