import { useTranslations } from "next-intl";

const LINES = [
  {
    key: "barrel",
    tag: "01 // AUTOMATED BARREL LINE",
    badge: "SCADA CONTROL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiLEyraQZoiFKXRZK-kKbEjCzHq20OLP8VYEAIGmTRKHWwWTKjkLdqlTN-QXvVgwq7VIbnl96w_lRVJ6oSILfvqe6hwSlFb6OWdVRHP4f_k9pZ_OKXbxSqQZ-PEKXOHjcsNdS-ctIM6zUgt3pnsD3jdPT_RKiid7QKZ5Wm-kggOX75yTDYPmDvKtM91ped3_l66t8Y0H0iSod3lxNq0bK_EiuFwl4q2ZMX-fMK_kfs1yvSbpT9HFGxJQ",
    imageOrder: "",
  },
  {
    key: "rack",
    tag: "02 // RACK PLATING LINE",
    badge: "HEAVY DUTY",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9gDB_GDtgTuGWQ11eXyw3ln1I983UzyAD1puXLPdxQQrrMF4LTkJrj7Q2nJax-nYxbOuNg17ACAdUFpiZgLWUlmIwl8TZDBGcm8tHAXVuJeV8vLgEAFawY6al08_7_WX6mBbvn4eZudzKH11P-bOglwuQVEOzBlsrH1-t8iEV8hNQNTXSNhZpIQcjEZx0g-hFSoqnuMinXx6LiZk3U64BaRdq0uDdejVod0LFd8KtAiBNUYelDkaJUw",
    imageOrder: "order-first lg:order-last",
  },
  {
    key: "chemical",
    tag: "03 // CHEMICAL ENP & ANODIZING LINE",
    badge: "MIL-SPEC COMPLIANT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
    imageOrder: "",
  },
] as const;

export default function ProductionLines() {
  const t = useTranslations("NangLuc.ProductionLines");

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200" id="day-chuyen">
      <div className="max-w-[1280px] mx-auto px-margin w-full">
        <div className="max-w-2xl mb-space-xl">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight mb-space-xs">
            {t("sectionTitle")}
          </h2>
          <p className="text-body-md text-slate-600">{t("sectionDescription")}</p>
        </div>

        <div className="flex flex-col gap-space-lg">
          {LINES.map((line) => (
            <div
              key={line.key}
              className="grid grid-cols-1 lg:grid-cols-12 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:border-steel-300 hover:shadow-md transition-all group"
            >
              <div className={`lg:col-span-5 relative min-h-[260px] bg-slate-200 ${line.imageOrder}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={t(`items.${line.key}.alt`)}
                  src={line.image}
                />
              </div>
              <div className="lg:col-span-7 p-space-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                    <span className="text-label-technical text-steel-600 tracking-widest uppercase font-semibold">
                      {line.tag}
                    </span>
                    <span className="px-space-xs py-0.5 bg-slate-200/80 text-slate-700 rounded text-label-technical">
                      {line.badge}
                    </span>
                  </div>
                  <h3 className="text-headline-md text-slate-900 uppercase mb-space-sm">
                    {t(`items.${line.key}.title`)}
                  </h3>
                  <p className="text-body-md text-slate-600 leading-relaxed mb-space-md">
                    {t(`items.${line.key}.desc`)}
                  </p>
                </div>
                <div className="pt-space-md bg-white border border-slate-200 p-space-md rounded flex flex-wrap items-center justify-between gap-space-sm">
                  <div className="text-label-technical text-slate-800">
                    {line.key === "barrel" && (
                      <>
                        <span className="text-slate-500">{t("items.barrel.capacityLabel")}</span>{" "}
                        <span className="text-steel-600 font-bold">
                          850 {t("items.barrel.capacityUnit")}
                        </span>
                        {" // "}
                        <span className="text-slate-500">{t("items.barrel.toleranceLabel")}</span>{" "}
                        <span className="text-slate-900 font-bold">[±0.2 µm]</span>
                      </>
                    )}
                    {line.key === "rack" && (
                      <>
                        <span className="text-slate-500">{t("items.rack.capacityLabel")}</span>{" "}
                        <span className="text-steel-600 font-bold">
                          120,000 {t("items.rack.capacityUnit")}
                        </span>
                        {" // "}
                        <span className="text-slate-500">{t("items.rack.tankSizeLabel")}</span>{" "}
                        <span className="text-slate-900 font-bold">60 × 40 m</span>
                      </>
                    )}
                    {line.key === "chemical" && (
                      <>
                        <span className="text-slate-500">{t("items.chemical.reactorLabel")}</span>{" "}
                        <span className="text-steel-600 font-bold">[{t("items.chemical.reactorValue")}]</span>
                        {" // "}
                        <span className="text-slate-500">{t("items.chemical.thicknessLabel")}</span>{" "}
                        <span className="text-slate-900 font-bold">[5 - 50 µm]</span>
                      </>
                    )}
                  </div>
                  <a
                    className="inline-flex items-center gap-1 text-label-technical text-steel-600 hover:text-slate-900 font-semibold uppercase transition-colors"
                    href="#"
                  >
                    {t("cta")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
