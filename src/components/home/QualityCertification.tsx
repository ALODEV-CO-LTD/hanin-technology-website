import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import ClientsGrid from "@/components/home/ClientsGrid";

const CERT_KEYS = ["1", "2"] as const;
const ICONS: Record<(typeof CERT_KEYS)[number], string> = {
  "1": "eco",
  "2": "fact_check",
};

export default function QualityCertification() {
  const t = useTranslations("Home.QualityCertification");
  const h = useTranslations("HomeTrust.iso");
  const ROWS = ["holder", "body", "no", "issued", "valid", "scope"] as const;

  return (
    <section className="w-full py-space-xl bg-white border-y border-slate-200">
      <div className="mx-auto px-margin flex flex-col gap-space-xl">
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-headline-xl text-slate-900 font-bold">
            {t("title")}
          </h2>
        </div>

        <div className="p-space-lg bg-slate-50 border border-slate-200 rounded shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-steel-100 flex items-center justify-center text-steel-600 shadow-sm">
              <Icon name="workspace_premium" className="text-[26px]" />
            </div>
            <h3 className="text-title-md text-slate-900 font-semibold">{h("title")}</h3>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-x-gutter gap-y-2 text-body-sm">
            {ROWS.map((r) => (
              <div key={r} className="contents">
                <dt className="text-slate-500">{h(`rows.${r}.0`)}</dt>
                <dd className="text-slate-900 font-medium">{h(`rows.${r}.1`)}</dd>
              </div>
            ))}
          </dl>
          <p className="text-body-sm text-slate-600 leading-relaxed">{h("scopeNote")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {CERT_KEYS.map((key) => (
            <div
              key={key}
              className="p-space-lg bg-slate-50 border border-slate-200 rounded shadow-sm flex flex-col gap-space-md relative overflow-hidden group hover:border-steel-300 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded bg-steel-100 flex items-center justify-center text-steel-600 font-bold shadow-sm">
                <Icon name={ICONS[key]} className="text-[26px]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-headline-md text-steel-600 font-bold">{t(`certs.${key}.label`)}</span>
                <h3 className="text-title-md text-slate-900 font-semibold">{t(`certs.${key}.title`)}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{t(`certs.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <ClientsGrid />

        <div className="flex justify-center pt-space-xs">
          <Link
            href="/nang-luc-san-xuat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-label-technical uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <span>{t("ctaView")}</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
