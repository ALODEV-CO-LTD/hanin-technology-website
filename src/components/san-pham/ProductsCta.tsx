import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";

export default function ProductsCta() {
  const t = useTranslations("SanPham.ProductsCta");

  return (
    <section className="w-full bg-white border-y border-slate-200 py-space-xl my-space-lg">
      <div className="mx-auto px-margin flex flex-col items-center text-center">
        <h2 className="text-headline-xl-mobile lg:text-headline-xl uppercase text-slate-900 font-bold">
          {t("title")}
        </h2>
        <p className="text-body-lg text-slate-600 max-w-2xl mt-space-sm mb-space-lg leading-relaxed">
          {t("description")}
        </p>
        <Link
          className="inline-flex items-center justify-center px-space-xl py-space-sm bg-steel-600 text-white font-bold text-title-md uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-xl"
          href="/lien-he#rfq-form"
        >
          {t("cta")}
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-space-sm mt-space-xl text-label-technical text-slate-500">
          <div className="px-space-md py-space-xs bg-white border border-slate-200 rounded flex items-center gap-1.5 shadow-sm">
            <Icon name="call" className="text-steel-600 text-[16px]" />
            <span>{t("hotline")}</span>
          </div>
          <div className="px-space-md py-space-xs bg-white border border-slate-200 rounded flex items-center gap-1.5 shadow-sm">
            <Icon name="mail" className="text-steel-600 text-[16px]" />
            <span>{t("email")}</span>
          </div>
          <div className="px-space-md py-space-xs bg-white border border-slate-200 rounded flex items-center gap-1.5 shadow-sm">
            <Icon name="schedule" className="text-emerald-600 text-[16px]" />
            <span>{t("responseTime")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
