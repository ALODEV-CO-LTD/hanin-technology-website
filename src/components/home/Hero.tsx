import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Home.Hero");

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t("imageAlt")}
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.1]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-margin py-space-xl flex flex-col justify-center h-full">
        <div className="max-w-3xl flex flex-col gap-space-md">
          <div className="flex flex-col gap-2">
            <h1 className="text-display-hero-mobile xl:text-display-hero text-white uppercase tracking-tight font-bold">
              {t("titlePrefix")} <span className="text-steel-500">{t("titleHighlight")}</span>
            </h1>
            <p className="text-headline-md text-slate-200 font-semibold tracking-tight">
              {t("subtitle")}
            </p>
          </div>

          <p className="text-body-lg text-slate-300 max-w-2xl leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <a
              href="#nang-luc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-lg shadow-steel-950/30"
            >
              {t("ctaPrimary")}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-title-md uppercase tracking-wider rounded backdrop-blur-sm transition-all duration-150 shadow-sm"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
