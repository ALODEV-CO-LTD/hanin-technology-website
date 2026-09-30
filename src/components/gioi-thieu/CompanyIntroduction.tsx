import { useTranslations } from "next-intl";

export default function CompanyIntroduction() {
  const t = useTranslations("GioiThieu.CompanyIntroduction");

  const METADATA_GRID = [
    { key: "field", noteClass: "text-steel-600" },
    { key: "target", noteClass: "text-sky-700" },
    { key: "location", noteClass: "text-slate-600" },
  ] as const;

  return (
    <section className="w-full bg-white py-space-xl">
      <div className="mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Left: Precision Factory Campus Visual */}
          <div className="lg:col-span-5 relative group">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-lg">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                role="img"
                aria-label={t("imageAlt")}
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              {/* Technical Overlay Captions */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 [text-shadow:0_1px_3px_rgba(15,23,42,0.85),0_2px_10px_rgba(15,23,42,0.55)]">
                <span className="material-symbols-outlined text-steel-500 text-[14px]">factory</span>
                <span className="text-[11px] text-steel-500 uppercase tracking-wider font-semibold">
                  {t("scaleBadge")}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-steel-500 text-[11px] [text-shadow:0_1px_3px_rgba(15,23,42,0.85),0_2px_10px_rgba(15,23,42,0.55)]">
                <span className="font-semibold">{t("coordBadge")}</span>
                <span className="font-semibold">{t("areaBadge")}</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial & Mission */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <h2 className="text-headline-lg md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
              {t("heading")}
            </h2>
            <div className="space-y-space-sm text-body-md text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">{t("paragraph1Strong")}</strong> {t("paragraph1Rest")}
              </p>
              <p>{t("paragraph2")}</p>
            </div>
            {/* Metadata Technical Grid Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs p-space-sm bg-slate-50 rounded border border-slate-200 mt-space-xs">
              {METADATA_GRID.map((item) => (
                <div
                  key={item.key}
                  className="p-space-sm bg-white rounded border border-slate-200 flex flex-col shadow-sm"
                >
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                    {t(`${item.key}.label`)}
                  </span>
                  <span className="text-title-md text-slate-900 font-semibold">{t(`${item.key}.value`)}</span>
                  <span className={`text-[10px] mt-1 font-semibold ${item.noteClass}`}>
                    {t(`${item.key}.note`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
