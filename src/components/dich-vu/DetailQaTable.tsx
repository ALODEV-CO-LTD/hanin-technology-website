import { useTranslations } from "next-intl";

export default function DetailQaTable() {
  const t = useTranslations("DichVu.DetailQaTable");

  const ROWS = [
    { key: "thickness", standard: "ASTM B568 // ISO 3497" },
    { key: "microhardness", standard: "ASTM E384" },
    { key: "saltSpray", standard: "ASTM B117 // ISO 9227" },
    { key: "adhesion", standard: "ASTM B571" },
    { key: "porosity", standard: "ASTM B733 Sec. 9.6" },
  ] as const;

  return (
    <section className="w-full mb-space-xl">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-sm mb-space-md gap-space-sm">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-body-md">
            <thead>
              <tr className="bg-slate-100 text-slate-900 text-label-technical uppercase">
                <th className="py-3 px-4">{t("colItem")}</th>
                <th className="py-3 px-4">{t("colDevice")}</th>
                <th className="py-3 px-4">{t("colStandard")}</th>
                <th className="py-3 px-4">{t("colCriteria")}</th>
                <th className="py-3 px-4">{t("colFrequency")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ROWS.map((row) => (
                <tr key={row.key} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-steel-600" />
                      {t(`${row.key}.item`)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{t(`${row.key}.device`)}</td>
                  <td className="py-3 px-4 text-label-sm text-slate-500">{row.standard}</td>
                  <td className="py-3 px-4 text-slate-900 font-medium">{t(`${row.key}.criteria`)}</td>
                  <td className="py-3 px-4 text-slate-600">{t(`${row.key}.frequency`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
