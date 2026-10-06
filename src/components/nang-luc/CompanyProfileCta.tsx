import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import ProfileLink from "@/components/ui/ProfileLink";

export default function CompanyProfileCta() {
  const t = useTranslations("NangLuc.CompanyProfileCta");

  return (
    <section className="w-full py-space-xl bg-slate-900 text-white">
      <div className="mx-auto px-margin w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* LEFT: Text & Button */}
          <div className="lg:col-span-7">
            <h3 className="text-headline-lg text-white uppercase tracking-tight mb-space-md">{t("title")}</h3>
            <p className="text-body-lg text-slate-300 max-w-xl leading-relaxed mb-space-lg">{t("description")}</p>
            <ProfileLink
              className="inline-flex items-center gap-2 px-space-xl py-space-md bg-steel-600 hover:bg-steel-700 text-white text-headline-sm font-semibold uppercase rounded transition-all active:scale-[0.99] shadow-lg"
              
            >
              {t("ctaDownload")}
            </ProfileLink>
          </div>

          {/* RIGHT: Realistic PDF booklet card mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-slate-800 border border-slate-700 text-white p-space-lg rounded-lg shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-slate-700">
                <span className="text-label-technical text-steel-400 font-semibold uppercase">HANIN VIETNAM</span>
                <span className="px-space-xs py-0.5 bg-slate-700 text-slate-300 rounded text-label-sm">
                  {t("fileBadge")}
                </span>
              </div>
              <div className="py-space-xl text-center">
                <Icon name="menu_book" className="text-[48px] text-steel-500 mb-space-xs" />
                <div className="text-headline-sm uppercase text-white font-bold tracking-tight">
                  {t("cardTitle")}
                </div>
                <p className="text-label-technical text-slate-400 uppercase mt-1">{t("cardSubtitle")}</p>
              </div>
              <div className="pt-space-sm border-t border-slate-700 text-label-sm text-slate-400 flex items-center justify-between">
                <span>{t("cardEdition")}</span>
                <span className="text-steel-400 font-bold">{t("cardReady")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
