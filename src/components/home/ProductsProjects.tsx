import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ProductsProjects() {
  const t = useTranslations("Home.ProductsProjects");

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          <Link
            href="/san-pham-du-an/banh-rang-truc-vit-ma-niken-hoa-hoc"
            className="lg:col-span-7 flex flex-col bg-white border border-slate-200 rounded overflow-hidden group shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300"
          >
            <div className="relative h-[340px] md:h-[400px] overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t("project1.imageAlt")}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded border border-slate-200 shadow-sm">
                <span className="text-[10px] text-steel-600 uppercase font-mono tracking-wider font-bold">
                  {t("project1.toleranceBadge")}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded border border-slate-200 shadow-sm">
                <span className="text-label-technical text-slate-700 uppercase font-semibold">
                  {t("project1.categoryBadge")}
                </span>
              </div>
            </div>
            <div className="p-space-lg flex flex-col justify-between flex-1 gap-space-md">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-steel-600 uppercase font-bold">
                    {t("project1.label")}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{t("project1.toleranceValue")}</span>
                </div>
                <h3 className="text-headline-sm text-slate-900 font-bold group-hover:text-steel-600 transition-colors">
                  {t("project1.title")}
                </h3>
                <p className="text-body-md text-slate-600">
                  {t("project1.desc")}
                </p>
              </div>
              <div className="flex items-center justify-between pt-space-xs text-slate-500 group-hover:text-steel-600 transition-colors">
                <span className="text-label-technical uppercase tracking-wider font-semibold">
                  {t("project1.cta")}
                </span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </div>
            </div>
          </Link>

          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <Link
              href="/san-pham-du-an/truc-piston-ty-ben-thuy-luc-o-to"
              className="flex-1 flex flex-col justify-between p-space-lg bg-white border border-slate-200 rounded group shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-steel-600 uppercase font-bold">
                    {t("project2.label")}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 uppercase font-semibold">
                    {t("project2.category")}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-title-md text-slate-900 font-bold group-hover:text-steel-600 transition-colors">
                    {t("project2.title")}
                  </h3>
                  <p className="text-body-sm text-slate-600 leading-relaxed">
                    {t("project2.desc")}
                  </p>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between text-slate-500 group-hover:text-steel-600 transition-colors">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {t("project2.cta")}
                </span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </Link>

            <Link
              href="/san-pham-du-an/thanh-busbar-dong-ma-thiec-dan-dien"
              className="flex-1 flex flex-col justify-between p-space-lg bg-white border border-slate-200 rounded group shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-label-technical text-steel-600 uppercase font-bold">
                    {t("project3.label")}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 uppercase font-semibold">
                    {t("project3.category")}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-title-md text-slate-900 font-bold group-hover:text-steel-600 transition-colors">
                    {t("project3.title")}
                  </h3>
                  <p className="text-body-sm text-slate-600 leading-relaxed">
                    {t("project3.desc")}
                  </p>
                </div>
              </div>
              <div className="pt-space-md flex items-center justify-between text-slate-500 group-hover:text-steel-600 transition-colors">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {t("project3.cta")}
                </span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
