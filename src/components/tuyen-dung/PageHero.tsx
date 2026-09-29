import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PageHero() {
  const t = useTranslations("TuyenDung.PageHero");

  return (
    <section className="relative w-full bg-slate-100 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-steel-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-margin pt-space-xl pb-space-xl relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-lg">
          <div className="flex items-center gap-2 text-label-technical text-slate-500 tracking-wider uppercase">
            <Link className="hover:text-steel-600 transition-colors" href="/">
              {t("breadcrumbHome")}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-steel-600 font-bold">{t("breadcrumbCurrent")}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded bg-white shadow-sm text-slate-500 text-label-sm font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-steel-600 animate-pulse" />
            <span>{t("statusBadge")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center pt-space-sm">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <h1 className="text-display-hero-mobile md:text-display-hero text-slate-900 tracking-tight uppercase font-bold">
              {t("titlePrefix")} <span className="text-steel-600">{t("titleHighlight")}</span>
            </h1>
            <p className="text-body-lg text-slate-600 max-w-2xl leading-relaxed">
              <strong className="text-slate-900 font-semibold">{t("companyName")}</strong> {t("description")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-sm">
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("standardLabel")}</span>
                <span className="text-title-md text-slate-900">{t("standardValue")}</span>
              </div>
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("benefitsLabel")}</span>
                <span className="text-title-md text-slate-900">{t("benefitsValue")}</span>
              </div>
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("developmentLabel")}</span>
                <span className="text-title-md text-slate-900">{t("developmentValue")}</span>
              </div>
              <div className="p-space-sm rounded bg-white shadow-sm flex flex-col gap-1">
                <span className="text-label-sm text-slate-500 uppercase tracking-wider">{t("factoryLabel")}</span>
                <span className="text-title-md text-slate-900">{t("factoryValue")}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-space-md lg:mt-0">
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden shadow-md bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t("imageAlt")}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between gap-space-sm text-white">
                <div className="flex flex-col">
                  <span className="text-label-sm text-steel-300 uppercase tracking-wider">
                    {t("imageBadgeTag")}
                  </span>
                  <span className="text-title-md">{t("imageBadgeTitle")}</span>
                </div>
                <span className="px-2 py-1 rounded bg-steel-600 text-white text-label-sm uppercase tracking-widest font-bold shrink-0">
                  {t("imageBadgeLab")}
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-space-sm px-space-md py-space-sm bg-white rounded shadow-lg">
              <div className="w-10 h-10 rounded bg-steel-100 flex items-center justify-center text-steel-600 shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="text-title-md text-slate-900">{t("floatingBadgeTitle")}</span>
                <span className="text-label-sm text-slate-500">{t("floatingBadgeSubtitle")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
