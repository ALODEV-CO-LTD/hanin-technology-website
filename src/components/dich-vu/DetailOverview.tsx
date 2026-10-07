import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

export default function DetailOverview() {
  const t = useTranslations("DichVu.DetailOverview");

  const SUBSTRATES = ["alloySteel", "carbonSteel", "stainless", "aluminum", "brass", "ductileIron"] as const;

  return (
    <section className="w-full mb-space-xl">
      <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pb-space-md mb-space-md bg-slate-50 border border-slate-200 p-space-md rounded">
          <div>
            <h2 className="text-headline-md text-slate-900 tracking-tight uppercase font-bold">{t("heading")}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Cột 1: Bản chất cơ chế phản ứng */}
          <div className="flex flex-col gap-space-xs bg-slate-50/60 p-space-md rounded">
            <div className="flex items-center gap-space-xs mb-1">
              <div className="w-8 h-8 rounded bg-steel-600 flex items-center justify-center text-white text-title-md">
                01
              </div>
              <h3 className="text-title-md text-slate-900 uppercase font-bold">{t("col1.title")}</h3>
            </div>
            <p className="text-body-md text-slate-600">
              {t("col1.p1")} <strong className="text-slate-900 font-semibold">{t("col1.p1Strong")}</strong>.
            </p>
            <div className="bg-white border border-slate-200 p-space-sm rounded text-label-sm text-slate-600 my-2">
              <code>{t("col1.formula")}</code>
            </div>
            <p className="text-body-md text-slate-600">{t("col1.p2")}</p>
          </div>

          {/* Cột 2: Phạm vi ứng dụng chiến lược */}
          <div className="flex flex-col gap-space-xs bg-slate-50/60 p-space-md rounded">
            <div className="flex items-center gap-space-xs mb-1">
              <div className="w-8 h-8 rounded bg-slate-600 flex items-center justify-center text-white text-title-md">
                02
              </div>
              <h3 className="text-title-md text-slate-900 uppercase font-bold">{t("col2.title")}</h3>
            </div>
            <p className="text-body-md text-slate-600">{t("col2.intro")}</p>
            <ul className="flex flex-col gap-1.5 text-body-md text-slate-600 mt-1">
              <li className="flex items-start gap-2">
                <Icon name="check_circle" className="text-steel-600 text-[18px] mt-0.5" />
                <span>
                  <strong>{t("col2.item1Strong")}</strong> {t("col2.item1")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check_circle" className="text-steel-600 text-[18px] mt-0.5" />
                <span>
                  <strong>{t("col2.item2Strong")}</strong> {t("col2.item2")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check_circle" className="text-steel-600 text-[18px] mt-0.5" />
                <span>
                  <strong>{t("col2.item3Strong")}</strong> {t("col2.item3")}
                </span>
              </li>
            </ul>
          </div>

          {/* Cột 3: Chủng loại kim loại nền */}
          <div className="flex flex-col gap-space-xs bg-slate-50/60 p-space-md rounded">
            <div className="flex items-center gap-space-xs mb-1">
              <div className="w-8 h-8 rounded bg-slate-500 flex items-center justify-center text-white text-title-md">
                03
              </div>
              <h3 className="text-title-md text-slate-900 uppercase font-bold">{t("col3.title")}</h3>
            </div>
            <p className="text-body-md text-slate-600">{t("col3.intro")}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SUBSTRATES.map((key) => (
                <span
                  key={key}
                  className="bg-white border border-slate-200 px-2 py-1 rounded text-label-sm text-slate-800 font-medium"
                >
                  {t(`col3.substrates.${key}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
