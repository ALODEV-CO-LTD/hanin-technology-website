import { useTranslations } from "next-intl";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

export default function PageHero() {
  const t = useTranslations("TuyenDung.PageHero");

  return (
    <section className="relative w-full min-h-screen bg-slate-100 overflow-hidden flex items-center border-b border-slate-200">
      {/* Banner Background Image & Tonal Scrim */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-multiply scale-105 transition-transform duration-1000 ease-out"
        role="img"
        aria-label={t("imageAlt")}
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full px-margin">
        <PageBreadcrumb
          className="mb-space-sm"
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]}
        />

        <h1 className="text-display-hero-mobile md:text-display-hero text-slate-900 tracking-tight uppercase mb-space-sm font-bold">
          {t("titlePrefix")} <span className="text-steel-600">{t("titleHighlight")}</span>
        </h1>
        <p className="text-body-lg text-slate-600 max-w-2xl leading-relaxed">
          <strong className="text-slate-900 font-semibold">{t("companyName")}</strong> {t("description")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm max-w-2xl pt-space-md">
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
    </section>
  );
}
