import { useTranslations } from "next-intl";
import Photo from "@/components/ui/Photo";
import { SERVICE_FLOW_IMAGES } from "@/lib/block-images";

export default function ProcessFlow() {
  const t = useTranslations("DichVu.ProcessFlow");

  const STEPS = [
    { key: "s1", index: "01", icon: "cleaning_services" },
    { key: "s2", index: "02", icon: "electric_meter" },
    { key: "s3", index: "03", icon: "water_drop" },
    { key: "s4", index: "04", icon: "verified" },
    { key: "s5", index: "05", icon: "inventory_2" },
  ] as const;

  return (
    <section className="w-full bg-white border border-slate-200 rounded p-space-md lg:p-space-xl mb-space-xl shadow-sm">
      <div className="flex flex-col mb-space-lg">
        <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold">{t("heading")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-space-sm">
        {STEPS.map((step) => (
          <div
            key={step.key}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-space-md rounded flex flex-col justify-between transition-colors"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded bg-slate-200 mb-space-sm">
                  <Photo src={SERVICE_FLOW_IMAGES[step.key]} alt={t(`${step.key}.title`)} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
                </div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="text-headline-md text-steel-600 font-bold">{step.index}</span>
            </div>
            <div>
              <h3 className="text-title-md text-slate-900 font-bold uppercase mb-1">{t(`${step.key}.title`)}</h3>
              <p className="text-body-md text-slate-600">{t(`${step.key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
