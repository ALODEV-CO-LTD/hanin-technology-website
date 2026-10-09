import { useTranslations } from "next-intl";
import { getPhones, getSettings } from "@/server/settings";
import PhoneLinks from "@/components/ui/PhoneLinks";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";

export default function ProductQuoteCta() {
  const t = useTranslations("SanPham.ProductQuoteCta");
  const { salesEmail } = getSettings();
  const { general } = getPhones();

  return (
    <section className="w-full bg-slate-50 py-space-xl scroll-mt-[var(--header-h)]" id="quote-form">
      <div className="mx-auto px-margin">
        <div className="p-space-md sm:p-space-lg lg:p-space-xl bg-white border border-slate-200 rounded relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end pr-space-md">
            <svg aria-hidden="true" className="text-steel-600" fill="currentColor" height="400" viewBox="0 0 100 100" width="400">
              <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="4 2" strokeWidth="2" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" fill="currentColor" r="20" />
            </svg>
          </div>
          <div className="relative z-10 max-w-[840px] flex flex-col gap-space-md">
            <h2 className="text-headline-xl-mobile lg:text-headline-xl text-slate-900 uppercase tracking-tight">
              {t("title")}
            </h2>
            <p className="text-body-lg text-slate-600 leading-relaxed">
              {t("descriptionPrefix")}{" "}
              <span className="text-steel-600 font-semibold">{t("descriptionHighlight")}</span>.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <Link
                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-steel-600 text-white text-label-technical uppercase tracking-wider rounded hover:bg-steel-700 active:scale-95 transition-all shadow-md"
                href="/lien-he#rfq-form"
              >
                <span>{t("ctaSendQuote")}</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </Link>
            </div>
            <div className="pt-space-md border-t border-slate-200 flex flex-wrap items-center gap-x-space-lg gap-y-space-sm text-body-md text-slate-500">
              <div className="flex items-center gap-space-xs">
                <Icon name="call" className="text-steel-600 text-[20px]" />
                <span>
                  {t("hotlineLabel")}{" "}
                  <strong className="text-slate-900 tracking-wider">
                    <PhoneLinks phones={general} className="" />
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <Icon name="mark_email_unread" className="text-steel-600 text-[20px]" />
                <span>
                  {t("emailLabel")}{" "}
                  <strong className="text-slate-900 tracking-wider">
                    {salesEmail}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
