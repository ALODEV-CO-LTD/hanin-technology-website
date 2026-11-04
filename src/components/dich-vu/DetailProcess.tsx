import { useServiceNs } from "@/lib/service-ns";
import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";
import { SERVICE_PROCESS_IMAGES } from "@/lib/block-images";

export default function DetailProcess({ slug }: { slug: string }) {
  const t = useTranslations(useServiceNs(slug, "DetailProcess"));

  const STEPS = (["s1", "s2", "s3", "s4", "s5", "s6"] as const)
    .filter((key) => t.has(`${key}.title`))
    .map((key) => ({ key, highlight: false }));
  const COLS = STEPS.length >= 6 ? "xl:grid-cols-6" : STEPS.length === 5 ? "xl:grid-cols-5" : "xl:grid-cols-4";

  return (
    <section className="w-full mb-space-xl">
      <div className="bg-slate-50 border border-slate-200 p-space-md sm:p-space-lg rounded shadow-sm">
        <div className="flex items-center justify-between pb-space-sm mb-space-lg flex-wrap gap-space-sm">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${COLS} gap-space-sm`}>
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className={`flex flex-col p-space-sm rounded ${
                step.highlight ? "bg-steel-50 border border-steel-200" : "bg-white border border-slate-200"
              }`}
            >
              {SERVICE_PROCESS_IMAGES[slug]?.[step.key] && (
                <div className="relative aspect-[4/3] overflow-hidden rounded bg-slate-200 mb-space-xs">
                  <Photo src={SERVICE_PROCESS_IMAGES[slug][step.key]} alt={t(`${step.key}.title`)} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between text-steel-600 text-title-md mb-2">
                <span className="font-bold">
                  {t("stepLabel")} 0{i + 1}
                </span>
              </div>
              <h3 className="text-title-md text-slate-900 uppercase mb-1 font-bold">{t(`${step.key}.title`)}</h3>
              <p className="text-body-md text-slate-600">{t(`${step.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
