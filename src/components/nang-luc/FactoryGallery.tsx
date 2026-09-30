import { useTranslations } from "next-intl";

const THUMBS = [
  {
    key: "campus",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI3db8cTjyz3mUD84Oi_CzhLyNPdD69lVtZEfNnlMHVqeb9Izs9XZUyXNa8hlKluCP-w3yaQWlueMnFG2RVvyVYRq80nhdqEydf09UmgNu68-vesb3s4bXES-thslj4UBB4BvFNLJnM-U-DDKlBnl3ifhJDyiScgRjL-x5HPzHopORtpn3pXmKkRlvah8arFBTtQqEXh9Il89Jdm63oTw_ZsHpL299cfiZn03hp0DqpYndmN2g0GhvPg",
  },
  {
    key: "control",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvBp7RiIBpk7NxoGWeGxZJ7uWqX_pU1m54UF5GCUCxiRmhguKnLD_SDs_co5Spd6vOinoKhbZ0qLIoHNEpNtBV4l2iaLanstN23ULsiXnBQrIHe--JMh5nEMs68dZUxBh579Uf0y5yRWrvTHb2aCGCm2PqaSCvUEgP-qQDkmnGPEUNUQgyoNmAIjvK2asXZkE3kP_vy9khtcYKY7o11JH9SREey42MVvCeDE9FdPHoo5zErCL1P30sXA",
  },
  {
    key: "finished",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg",
  },
  {
    key: "racks",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbKebYq3Yi1iDsoAXFwRWjce47gn5bzIJ9YMFqnDewXSZC2spmLtGhMIXBObN3GY_ElvNmVQvCX8O2J_e37k-gBj1xBdZCrQje3O5cmm3P1OKwZc-w9SFwQOllK4swLW1CyjRCdttOIl5mbZEluWvsMuhJkbx4yp_Am3cXG9ryAIgDl46MVLOXno6b2rs0MCr-dUeNKQVkUDt_2GCvXY25vGm0Eh51Fu7In9aSZboWpiQQyGqQiW00rg",
  },
] as const;

export default function FactoryGallery() {
  const t = useTranslations("NangLuc.FactoryGallery");

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200" id="factory-gallery">
      <div className="mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
          </div>
          <p className="text-body-sm text-slate-600 max-w-md">{t("sectionDescription")}</p>
        </div>

        {/* Main Featured Image */}
        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-lg overflow-hidden bg-slate-200 mb-gutter group shadow-md border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            alt={t("mainImage.alt")}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI3db8cTjyz3mUD84Oi_CzhLyNPdD69lVtZEfNnlMHVqeb9Izs9XZUyXNa8hlKluCP-w3yaQWlueMnFG2RVvyVYRq80nhdqEydf09UmgNu68-vesb3s4bXES-thslj4UBB4BvFNLJnM-U-DDKlBnl3ifhJDyiScgRjL-x5HPzHopORtpn3pXmKkRlvah8arFBTtQqEXh9Il89Jdm63oTw_ZsHpL299cfiZn03hp0DqpYndmN2g0GhvPg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>

        {/* Secondary Grid of 4 Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {THUMBS.map((thumb) => (
            <div
              key={thumb.key}
              className="relative aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-200 group shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={t(`items.${thumb.key}.alt`)}
                src={thumb.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
