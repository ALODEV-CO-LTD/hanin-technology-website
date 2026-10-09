import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPhones, getSettings } from "@/server/settings";
import PhoneLinks from "@/components/ui/PhoneLinks";
import Icon from "@/components/ui/Icon";

export default function NewsInquiryCta() {
  const t = useTranslations("TinTuc.NewsInquiryCta");
  const { engineeringEmail } = getSettings();
  const { general } = getPhones();

  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="mx-auto px-margin">
        <div className="bg-white border border-slate-200 rounded-xl p-space-lg lg:p-space-xl shadow-sm relative overflow-hidden">
          {/* Subtle industrial background watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-slate-900 select-none">
            <Icon name="precision_manufacturing" className="text-[240px]" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 uppercase tracking-tight font-bold">
                {t("titlePrefix")} <span className="text-steel-600">{t("titleHighlight")}</span>
              </h2>
              <p className="text-body-lg text-slate-600 max-w-3xl">{t("description")}</p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <div className="flex items-center gap-space-xs text-title-md text-slate-900">
                  <Icon name="call" className="text-steel-600 text-[20px]" />
                  <span>
                    {t("hotlineLabel")} <strong className="text-slate-900"><PhoneLinks phones={general} /></strong>
                  </span>
                </div>
                <span aria-hidden="true" className="text-slate-400 hidden sm:inline">|</span>
                <div className="flex items-center gap-space-xs text-title-md text-slate-900">
                  <Icon name="mail" className="text-steel-600 text-[20px]" />
                  <span>
                    {t("emailLabel")} <strong className="text-slate-900">{engineeringEmail}</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-space-sm justify-center">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md bg-steel-600 text-white text-title-md rounded-lg shadow-sm hover:bg-steel-700 transition-all uppercase tracking-wider text-center"
              >
                <span>{t("ctaContact")}</span>
                <Icon name="arrow_forward" className="text-[20px]" />
              </Link>
              <Link
                href="/lien-he#rfq-form"
                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md bg-slate-100 text-slate-900 hover:bg-slate-200 text-title-md rounded-lg transition-all uppercase tracking-wider text-center"
              >
                <Icon name="request_quote" className="text-[20px]" />
                <span>{t("ctaQuote")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
