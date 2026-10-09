import { useServiceNs } from "@/lib/service-ns";
import { useTranslations } from "next-intl";

export default function DetailProcess({ slug }: { slug: string }) {
  const t = useTranslations(useServiceNs(slug, "DetailProcess"));

  const STEPS = [
    { key: "s1", icon: "cleaning_services", highlight: false },
    { key: "s2", icon: "science", highlight: false },
    { key: "s3", icon: "precision_manufacturing", highlight: true },
    { key: "s4", icon: "water_drop", highlight: false },
    { key: "s5", icon: "local_fire_department", highlight: false },
    { key: "s6", icon: "verified", highlight: false },
  ] as const;

  return (
    <section className="w-full mb-space-xl">
      <div className="bg-slate-50 border border-slate-200 p-space-md sm:p-space-lg rounded shadow-sm">
        <div className="flex items-center justify-between pb-space-sm mb-space-lg flex-wrap gap-space-sm">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-sm">
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className={`flex flex-col p-space-sm rounded ${
                step.highlight ? "bg-steel-50 border border-steel-200" : "bg-white border border-slate-200"
              }`}
            >
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
