import { useServiceNs } from "@/lib/service-ns";
import { useTranslations } from "next-intl";

export default function DetailQaTable({ slug }: { slug: string }) {
  const t = useTranslations(useServiceNs(slug, "DetailQaTable"));

  const ROWS = (["r1", "r2", "r3", "r4", "r5"] as const).filter((key) => t.has(`${key}.item`));

  return (
    <section className="w-full mb-space-xl">
      <div className="bg-white border border-slate-200 p-space-md sm:p-space-lg rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-sm mb-space-md gap-space-sm">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-body-md">
            <thead>
              <tr className="bg-slate-100 text-slate-900 text-label-technical uppercase">
                <th scope="col" className="py-3 px-4">{t("colItem")}</th>
                <th scope="col" className="py-3 px-4">{t("colDevice")}</th>
                <th scope="col" className="py-3 px-4">{t("colCriteria")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ROWS.map((row) => (
                <tr key={row} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="w-2 h-2 rounded-full bg-steel-600 shrink-0" />
                      {t(`${row}.item`)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{t(`${row}.device`)}</td>
                  <td className="py-3 px-4 text-slate-900 font-medium">{t(`${row}.criteria`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
