import { useTranslations } from "next-intl";
import { getPostCounts } from "@/server/public";
import Icon from "@/components/ui/Icon";

export default function NewsIntro() {
  const t = useTranslations("TinTuc.NewsIntro");
  const counts = getPostCounts();
  const total = counts.all ?? 0;
  const categoryCount = Object.entries(counts).filter(([k, n]) => k !== "all" && n > 0).length;

  return (
    <section className="w-full bg-white">
      <div className="px-margin py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
          <div className="lg:col-span-8 flex flex-col gap-space-xs">
            <h1 className="text-display-hero-mobile lg:text-display-hero text-slate-900 uppercase tracking-tight font-bold">
              {t("titlePrefix")} <span className="text-steel-600">{t("titleHighlight")}</span>{" "}
              {t("titleSuffix")}
            </h1>
            <p className="text-body-lg text-slate-600 max-w-2xl mt-space-xs">{t("description")}</p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-space-sm justify-end">
            <div className="bg-slate-50 border border-slate-200 p-space-md rounded-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">{t("archiveLabel")}</span>
                <span className="text-headline-sm text-slate-900 font-bold">
                  {t("archiveValue", { count: total })}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-steel-100 flex items-center justify-center text-steel-600">
                <Icon name="library_books" />
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-space-md rounded-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-label-sm text-slate-500 uppercase">{t("auditLabel")}</span>
                <span className="text-headline-sm text-slate-900 font-bold">
                  {t("auditValue", { count: categoryCount })}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-steel-100 flex items-center justify-center text-steel-600">
                <Icon name="verified" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
