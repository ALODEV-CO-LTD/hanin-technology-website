import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";

const CARDS = [
  {
    key: "iso9001",
    icon: "verified",
    iconAccent: true,
    tagAccent: true,
  },
  {
    key: "iso14001",
    icon: "eco",
    iconAccent: false,
    tagAccent: false,
  },
  {
    key: "astmRohs",
    icon: "rule",
    iconAccent: false,
    tagAccent: false,
  },
] as const;

export default function QualityStandards() {
  const t = useTranslations("NangLuc.QualityStandards");

  return (
    <section className="w-full py-space-xl bg-white border-t border-slate-200 scroll-mt-[var(--header-h)]" id="quality-standards">
      <div className="mx-auto px-margin w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">{t("sectionTitle")}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-lg">
          {CARDS.map((card) => (
            <div
              key={card.key}
              className="p-space-lg bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:border-steel-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center mb-space-md font-bold ${
                    card.iconAccent ? "bg-steel-100 text-steel-600" : "bg-slate-200/80 text-slate-700"
                  }`}
                >
                  <Icon name={card.icon} />
                </div>
                <div
                  className={`text-label-technical tracking-wider uppercase mb-1 font-semibold ${
                    card.tagAccent ? "text-steel-600" : "text-slate-600"
                  }`}
                >
                  {t(`items.${card.key}.tagLabel`)}
                </div>
                <h3 className="text-headline-sm text-slate-900 uppercase mb-space-xs">{t(`items.${card.key}.title`)}</h3>
                <p className="text-body-sm text-slate-600 leading-relaxed">{t(`items.${card.key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Link
            className="inline-flex items-center gap-1 text-label-technical text-steel-600 hover:text-slate-900 font-semibold uppercase tracking-wider transition-colors"
            href="/gioi-thieu#chung-nhan"
          >
            <span>{t("ctaDetail")}</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
