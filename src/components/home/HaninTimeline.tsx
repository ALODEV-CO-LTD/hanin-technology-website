import { useTranslations } from "next-intl";

const KEYS = ["0", "1", "2", "3", "4"] as const;
const CURRENT = "2"; // mốc 2023: nhà máy mạ HANIN

export default function HaninTimeline() {
  const t = useTranslations("HomeAbout");

  return (
    <div className="pt-space-xl">
      <h3 className="text-headline-md text-slate-900 font-bold">{t("timelineTitle")}</h3>
      <p className="mt-space-sm max-w-3xl text-body-md text-slate-700">{t("timelineIntro")}</p>
      <ol className="mt-space-lg grid grid-cols-1 lg:grid-cols-5 lg:gap-gutter">
        {KEYS.map((key) => {
          const current = key === CURRENT;
          return (
            <li
              key={key}
              className="relative pl-8 pb-space-lg last:pb-0 lg:pl-0 lg:pt-8 lg:pb-0 before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-px before:bg-slate-300 lg:before:left-0 lg:before:right-[calc(-1*var(--spacing-gutter))] lg:before:top-[7px] lg:before:bottom-auto lg:before:h-px lg:before:w-auto lg:last:before:right-0"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1 z-10 h-4 w-4 rounded-full border-2 lg:top-0 ${
                  current ? "border-steel-600 bg-steel-600 ring-4 ring-steel-100" : "border-slate-400 bg-slate-50"
                }`}
              />
              <div className={current ? "rounded border border-steel-600 bg-white p-space-md shadow-sm" : "lg:pr-space-sm"}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-title-md font-bold ${current ? "text-steel-700" : "text-slate-900"}`}>
                    {t(`milestones.${key}.year`)}
                  </span>
                  {current && (
                    <span className="rounded bg-steel-600 px-2 py-0.5 text-label-sm uppercase text-white">{t("thisFactory")}</span>
                  )}
                </div>
                <p className="mt-1 text-body-md font-semibold text-slate-900">{t(`milestones.${key}.name`)}</p>
                <p className="mt-1 text-body-sm text-slate-600">{t(`milestones.${key}.desc`)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
