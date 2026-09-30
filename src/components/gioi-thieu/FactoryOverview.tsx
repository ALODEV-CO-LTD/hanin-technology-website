import { siteImg } from "@/server/site-images";
import { useTranslations } from "next-intl";

export default function FactoryOverview() {
  const t = useTranslations("GioiThieu.FactoryOverview");

  return (
    <section className="w-full bg-slate-50 py-space-xl border-t border-slate-200">
      <div className="mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
          </div>
          <p className="text-body-sm text-slate-500 max-w-md">{t("subtitle")}</p>
        </div>

        {/* Editorial Masonry Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-lg">
          {/* Main Large Photo: Modern Electroplating Line */}
          <div className="lg:col-span-8 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              role="img"
              aria-label={t("mainImageAlt")}
              style={{
                backgroundImage:
                  `url('${siteImg("gioi-thieu/FactoryOverview#1", "https://lh3.googleusercontent.com/aida-public/AB6AXuC3iWq6Q8x7Z_ezljbRjJXG8PvcpqAOwpBGwmmu7J3EnPlwjt-ESDXQPZn-f3bGkrQo1j4Fktga1Nfs95Jy84yTg6hciMwQPhremUKIsgR3mimhB3o44tahvfbANNl2qbbXUJZ14ZiC5fCAh0Dy7JL9Hx_T_G2g-fk5Edk0e7SRVSfngXwCCp4lJDdWvYz-exCHChR-wHudNXNTbih0u5lwpmsbB1YgK4rArBQ8O3JSNqIBzt5ZNwkMLw")}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          </div>

          {/* 3 Smaller Auxiliary Photos */}
          <div className="lg:col-span-4 grid grid-rows-3 gap-gutter">
            {/* Aux Photo 1: Operator Monitoring Line */}
            <div className="relative h-full min-h-[180px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                role="img"
                aria-label={t("zone2ImageAlt")}
                style={{
                  backgroundImage:
                    `url('${siteImg("gioi-thieu/FactoryOverview#2", "https://lh3.googleusercontent.com/aida-public/AB6AXuAO2uvWt8xZ536YyQhEYJ4tMDQSA_F8RQdHhM9bM7ZB-wMZ20tNyoSahZ2yEsXh63o9vlm-FKJE3lFtgtpoKw0mrgndMjdkzbIofNBppqs9oSAbfUBmVB6loE0Bps6z_jDqRd4wcOCtaszi2w7u2wqKoQZe-Xy0KFBp8ZUm4Kw9ojunATcWfAcTAmSFzOn6akWctZ7olr4NkCdWDucif0g9unLB_iNU9XvCZIFsMM-octzeubPl5rQOhA")}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
            </div>

            {/* Aux Photo 2: Precision Caliper Inspection */}
            <div className="relative h-full min-h-[180px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t("zone3ImageAlt")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={siteImg("gioi-thieu/FactoryOverview#3", "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg")}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
            </div>

            {/* Aux Photo 3: Heavy Automated Crane System */}
            <div className="relative h-full min-h-[180px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                role="img"
                aria-label={t("zone4ImageAlt")}
                style={{
                  backgroundImage:
                    `url('${siteImg("gioi-thieu/FactoryOverview#4", "https://lh3.googleusercontent.com/aida-public/AB6AXuBMN0lym82cEAA9k9kEK85J37YJBabdX5LVykdHImAJrf6CHqddqInsnSorwbmqZLTQAqRIsizQmmahLAPP4kP--Zi_rvgLXB14CZxIER1vTsym4bh6b1rI8RH_x9HyH4YcURRVskMZtdr5b09X-hZx5pPqRRMkjyQX4kyg55rB450Ml7kTRsX42xU0XLaH1kjzmQYE5wU-i1I_UaxnfjxxejVysfKwY5jFgQimj8WXl4xHV8G24IqbtA")}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-space-sm px-space-lg py-space-sm rounded bg-white hover:bg-slate-50 text-slate-800 text-label-technical uppercase tracking-wider border border-slate-300 hover:border-steel-600 transition-all shadow-sm"
            href="#"
          >
            {t("cta")}
            <span className="material-symbols-outlined text-[16px] text-steel-600">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
