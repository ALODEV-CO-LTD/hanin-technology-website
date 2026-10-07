import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function QualityMetrology() {
  const t = useTranslations("DichVu.QualityMetrology");

  const LAB_ITEMS = [
    { key: "xrf", icon: "biotech" },
    { key: "saltSpray", icon: "water" },
    { key: "cmm", icon: "straighten" },
  ] as const;

  const TEST_TABLE = [
    { key: "thickness" },
    { key: "saltSpray" },
    { key: "adhesion" },
    { key: "dehydrogenation" },
  ] as const;

  return (
    <section className="w-full mb-space-xl">
      <div className="bg-slate-50 border border-slate-200 rounded p-space-md lg:p-space-xl">
        <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold mb-space-lg">
          {t("heading")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-lg">
          {LAB_ITEMS.map((item) => (
            <div key={item.key} className="flex flex-col gap-space-sm bg-white border border-slate-200 p-space-md rounded shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded bg-steel-50 border border-steel-200 text-steel-600">
                <Icon name={item.icon} className="text-[24px]" />
              </div>
              <h3 className="text-title-md text-slate-900 font-bold">{t(`${item.key}.title`)}</h3>
              <p className="text-body-md text-slate-600 leading-relaxed">{t(`${item.key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-space-sm px-space-md py-space-sm border-b border-slate-200">
            <h3 className="text-title-md text-slate-900 font-bold uppercase">{t("tableTitle")}</h3>
            <span className="rounded border border-slate-200 px-2 py-0.5 text-label-sm font-semibold text-slate-600">{t("revision")}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-fixed text-left text-body-md">
              <thead>
                <tr className="border-b border-slate-200 text-label-sm uppercase tracking-wider text-slate-500">
                  <th className="w-[22%] px-space-md py-3 font-semibold">{t("colMethod")}</th>
                  <th className="w-[26%] px-space-md py-3 font-semibold">{t("colStandard")}</th>
                  <th className="w-[32%] px-space-md py-3 font-semibold">{t("colCriteria")}</th>
                  <th className="w-[20%] px-space-md py-3 font-semibold">{t("colFrequency")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TEST_TABLE.map((row) => (
                  <tr key={row.key}>
                    <td className="px-space-md py-3.5 align-top font-semibold text-slate-900">{t(`${row.key}.method`)}</td>
                    <td className="px-space-md py-3.5 align-top text-slate-600 leading-snug">{t(`${row.key}.standard`)}</td>
                    <td className="px-space-md py-3.5 align-top font-bold text-steel-700 leading-snug">{t(`${row.key}.criteria`)}</td>
                    <td className="px-space-md py-3.5 align-top text-slate-600 leading-snug">{t(`${row.key}.frequency`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-space-sm px-space-md py-space-sm border-t border-slate-200 text-label-sm text-slate-500">
            <span>{t("calibrationNote")}</span>
            <span className="font-bold text-slate-900 uppercase">{t("warrantyLabel")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
