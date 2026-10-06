import { useTranslations } from "next-intl";
import { getSettings, telHref } from "@/server/settings";
import Icon from "@/components/ui/Icon";

export default function ApplicationCta() {
  const t = useTranslations("TuyenDung.ApplicationCta");
  const { hrEmail, hrHotline } = getSettings();

  return (
    <section className="w-full py-space-xl bg-slate-50 relative">
      <div className="mx-auto px-margin">
        <div className="relative p-space-xl md:p-12 rounded bg-white border border-slate-200 shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-steel-600 via-steel-400 to-steel-600" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <h2 className="text-headline-xl-mobile md:text-headline-xl text-slate-900 tracking-tight uppercase font-bold">
                {t("title")}
              </h2>
              <p className="text-body-lg text-slate-600 leading-relaxed max-w-xl">
                {t("description")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-1">
                <div className="p-space-sm rounded bg-slate-50 flex items-start gap-2">
                  <Icon name="mail" className="text-steel-600 text-[20px] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-label-sm text-slate-500 uppercase font-semibold">{t("emailLabel")}</span>
                    <a
                      className="text-title-md text-slate-900 hover:text-steel-600 transition-colors font-bold"
                      href={`mailto:${hrEmail}`}
                    >
                      {hrEmail}
                    </a>
                  </div>
                </div>
                <div className="p-space-sm rounded bg-slate-50 flex items-start gap-2">
                  <Icon name="phone_in_talk" className="text-steel-600 text-[20px] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-label-sm text-slate-500 uppercase font-semibold">
                      {t("hotlineLabel")}
                    </span>
                    <a
                      className="text-title-md text-slate-900 hover:text-steel-600 transition-colors font-bold"
                      href={telHref(hrHotline)}
                    >
                      {hrHotline}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-space-md p-space-lg rounded bg-slate-50 border border-slate-200 shadow-sm">
              <span className="text-title-md text-slate-900 uppercase tracking-wider font-semibold">
                {t("quickApplyTitle")}
              </span>
              <p className="text-body-md text-slate-600">
                {t("quickApplyDescription")}
              </p>
              <div className="flex flex-col gap-space-sm pt-1">
                <a
                  className="w-full inline-flex items-center justify-center gap-2 py-space-sm px-space-md bg-steel-600 hover:bg-steel-700 text-white text-title-md rounded shadow-sm transition-colors uppercase tracking-wider text-center"
                  href="#open-positions"
                >
                  <span>{t("viewJobsCta")}</span>
                  <Icon name="keyboard_arrow_up" className="text-[18px]" />
                </a>
                <a
                  className="w-full inline-flex items-center justify-center gap-2 py-space-sm px-space-md bg-white border border-slate-200 text-slate-900 hover:text-steel-600 text-title-md rounded shadow-sm hover:bg-slate-100 transition-colors uppercase tracking-wider text-center"
                  href={`mailto:${hrEmail}?subject=%5BHANIN%20TECH%20CAREERS%5D%20H%E1%BB%93%20s%C6%A1%20%E1%BB%A9ng%20tuy%E1%BB%83n%20v%E1%BB%8B%20tr%C3%AD%3A`}
                >
                  <span>{t("sendCvCta")}</span>
                  <Icon name="send" className="text-[18px]" />
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 text-slate-500 text-label-sm">
                <Icon name="lock" className="text-[16px] text-emerald-500" />
                <span>{t("securityNote")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
