import Link from "next/link";
import { useTranslations } from "next-intl";

const PROJECTS = [
  {
    key: "project1",
    href: "/san-pham-du-an/banh-rang-truc-vit-ma-niken-hoa-hoc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
  },
  {
    key: "project2",
    href: "/san-pham-du-an/truc-piston-ty-ben-thuy-luc-o-to",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-L99Nt8jdj5_ENTBVcnfW_xELEOl54Te4hFTL3Hg6RGpY7gw48eslCBcc7f42S3SBdQwThs9AFZAsIwhkTFrtBiEMKq8_kAgWh-3WxLUZwWUvn9xmsAkjd_gpAGF20T-KAGL323XIqWikrSDizkWjE4KBjEMaM7OOJ46O-D4MeGUrxI29q4hfCHxvJYVWvyH26Gz3Epu32JxKkL-ZDMCkrI4eLJEPoihSYFrIL8Vom_LGoPbC8e_jng",
  },
  {
    key: "project3",
    href: "/san-pham-du-an/thanh-busbar-dong-ma-thiec-dan-dien",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBm5dDTGIUSE8Igv663hzCgH3rH-kKI1euza2OEGnRSXOtzqW8FnTsFaxjSVP6_CwpXb3uJqVD8Fr6yOyRiOkl1gTQukK5EIxPU5O-BD1LXPyf_RkI38kVOjROWZRa9HeKrVrRrQPPiiFE4JNSWq3-wKdqlg84bADk-dINOWi7hLmkmw8947Cdh-ggqkheZDtMWQdzEor2Q9tuHEVbD3UdfvCbvD2htkJJO1IG8qr3Y-wMTWLy8h7F4Q",
  },
] as const;

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {PROJECTS.map((project) => (
            <Link
              key={project.key}
              href={project.href}
              className="group flex flex-col bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-xl hover:border-steel-300 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t(`${project.key}.imageAlt`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={project.image}
                />
              </div>
              <div className="p-space-lg flex flex-col gap-2">
                <span className="text-label-technical text-steel-600 uppercase font-bold tracking-wider">
                  {t(`${project.key}.category`)}
                </span>
                <h3 className="text-headline-sm text-slate-900 font-bold group-hover:text-steel-600 transition-colors">
                  {t(`${project.key}.title`)}
                </h3>
                <div className="flex items-center gap-2 pt-space-xs text-slate-500 group-hover:text-steel-600 transition-colors">
                  <span className="text-label-technical uppercase tracking-wider font-semibold">
                    {t(`${project.key}.cta`)}
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
