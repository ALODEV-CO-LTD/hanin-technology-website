import { useTranslations } from "next-intl";
import { siteImg } from "@/server/site-images";

const ITEMS = [
  { key: "saltSpray", no: "01" },
  { key: "xrf", no: "02" },
  { key: "bathControl", no: "03" },
] as const;

export default function TestingAnalysis() {
  const t = useTranslations("NangLuc.TestingAnalysis");

  return (
    <section className="w-full py-space-xl bg-slate-50 border-t border-slate-200 scroll-mt-20" id="kiem-nghiem">
      <div className="mx-auto px-margin w-full">
        <div className="mb-space-xl">
          <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
          <p className="text-body-md text-slate-600 max-w-3xl mt-1">{t("sectionDescription")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* LEFT: Metrology Photo */}
          <div className="lg:col-span-6 relative rounded-lg overflow-hidden bg-slate-200 border border-slate-200 min-h-[380px] shadow-sm flex flex-col justify-end p-space-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t("image.alt")}
              className="absolute inset-0 w-full h-full object-cover"
              src={siteImg("nang-luc/TestingAnalysis#1", "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-ozXlS4iAi4T3wA_X-lfMFRZW6tBLRXa9hiO-_aiiAfyUkQ8VaPUa8EIi2vm-qZxixg0pq2T-tmuJ7mwR9Oi5C5cCOzm0cUAv_mj5VqOPDE2-FpS3whEh-TNU1x6XT7patK-2NZNtDRfCepVnV8NB_q7n1lh24xLceTFJ2xeUcVblzSkj0sC-xVpcv6ESoW197zbUsdcV2puaYUyDaS4LJTXmFeTs8dr52845R9MiW3QRPUFLO-ixg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          </div>

          {/* RIGHT: 3 Technical Information Blocks */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            {ITEMS.map((item) => (
              <div
                key={item.key}
                className="p-space-lg bg-white border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 transition-colors"
              >
                <div className="flex items-center gap-space-sm mb-space-xs">
                  <span className="w-7 h-7 rounded bg-steel-100 text-steel-600 flex items-center justify-center text-label-technical font-bold">
                    {item.no}
                  </span>
                  <h3 className="text-headline-sm text-slate-900 uppercase">{t(`items.${item.key}.title`)}</h3>
                </div>
                <p className="text-body-sm text-slate-600 leading-relaxed pl-9">{t(`items.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
