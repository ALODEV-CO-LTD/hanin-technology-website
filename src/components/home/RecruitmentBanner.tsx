import Link from "next/link";
import { useTranslations } from "next-intl";
import { countActiveJobs } from "@/server/public";

export default function RecruitmentBanner() {
  const t = useTranslations("Home.RecruitmentBanner");
  const openPositions = String(countActiveJobs()).padStart(2, "0");

  return (
    <section className="w-full py-space-lg bg-white border-y border-slate-200">
      <div className="mx-auto px-margin">
        <div className="p-space-lg md:p-space-xl rounded bg-gradient-to-r from-slate-100 via-steel-50/40 to-slate-100 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[linear-gradient(to_right,transparent,rgba(43,90,122,0.06))] pointer-events-none" />
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="text-headline-lg text-slate-900 font-bold">
              {t("title")}
            </h2>
            <p className="text-body-md text-slate-600">
              {t("description")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0">
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-headline-lg text-steel-600 font-bold">{openPositions}</span>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {t("positionsLabel")}
              </span>
            </div>
            <Link
              href="/tuyen-dung"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-steel-600 hover:bg-steel-700 text-white text-title-md uppercase tracking-wider rounded transition-all duration-150 shadow-md whitespace-nowrap"
            >
              <span>{t("cta")}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
