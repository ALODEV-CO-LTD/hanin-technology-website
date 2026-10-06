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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className="lg:col-span-5">
            <h2 className="text-headline-sm md:text-headline-lg text-slate-900 uppercase font-bold mb-space-sm">
              {t("heading")}
            </h2>
            <p className="text-body-lg text-slate-600 mb-space-md">{t("subtitle")}</p>
            <div className="flex flex-col gap-space-sm">
              {LAB_ITEMS.map((item) => (
                <div key={item.key} className="flex items-start gap-space-sm bg-white border border-slate-200 p-space-sm rounded shadow-sm">
                  <Icon name={item.icon} className="text-steel-600 text-[24px]" />
                  <div>
                    <span className="text-title-md text-slate-900 font-bold block">{t(`${item.key}.title`)}</span>
                    <p className="text-body-md text-slate-600">{t(`${item.key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 p-space-md rounded shadow-sm">
              <div className="flex items-center justify-between pb-space-sm">
                <span className="text-title-md text-slate-900 font-bold uppercase">{t("tableTitle")}</span>
                <span className="bg-slate-100 text-slate-600 text-label-sm px-2 py-0.5 rounded">{t("revision")}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-body-sm table-fixed">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-label-sm uppercase">
                      <th className="py-space-sm px-3 w-[20%] align-bottom">{t("colMethod")}</th>
                      <th className="py-space-sm px-3 w-[26%] align-bottom">{t("colStandard")}</th>
                      <th className="py-space-sm px-3 w-[32%] align-bottom">{t("colCriteria")}</th>
                      <th className="py-space-sm px-3 w-[22%] align-bottom">{t("colFrequency")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {TEST_TABLE.map((row) => (
                      <tr key={row.key} className="hover:bg-slate-50/50">
                        <td className="py-space-sm px-3 align-top font-medium text-slate-900">{t(`${row.key}.method`)}</td>
                        <td className="py-space-sm px-3 align-top text-slate-500 leading-snug">{t(`${row.key}.standard`)}</td>
                        <td className="py-space-sm px-3 align-top text-steel-600 font-bold leading-snug">{t(`${row.key}.criteria`)}</td>
                        <td className="py-space-sm px-3 align-top text-slate-500 leading-snug">{t(`${row.key}.frequency`)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-space-md p-space-sm bg-slate-50 rounded flex items-center justify-between text-slate-500 text-label-sm">
                <span>{t("calibrationNote")}</span>
                <span className="text-slate-900 font-semibold">{t("warrantyLabel")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
