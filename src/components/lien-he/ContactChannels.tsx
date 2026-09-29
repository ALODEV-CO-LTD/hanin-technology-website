import { useTranslations } from "next-intl";

export default function ContactChannels() {
  const t = useTranslations("LienHe.ContactChannels");

  return (
    <section className="w-full bg-slate-50 py-space-xl">
      <div className="mx-auto px-margin">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <h2 className="text-headline-md font-bold text-slate-900 uppercase tracking-tight">
              {t("heading")}
            </h2>
          </div>
          <span className="text-body-sm text-slate-500">{t("subtitle")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Card 1: Headquarter & manufacturing plant */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-steel-600" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-steel-600 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">factory</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                {t("card1.badge")}
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                {t("card1.title")}
              </h3>
              <p className="text-body-sm text-slate-600 leading-relaxed mb-space-md">
                {t("card1.address")}
              </p>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md">
              <span className="text-label-sm text-slate-500 block font-semibold">
                {t("card1.footerLabel")}
              </span>
              <span className="text-body-sm text-slate-900">{t("card1.footerValue")}</span>
            </div>
          </div>

          {/* Card 2: Hotline & tech consulting */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-sky-700" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-sky-700 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                {t("card2.badge")}
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                {t("card2.title")}
              </h3>
              <div className="flex flex-col gap-space-sm text-body-sm mb-space-md">
                <div>
                  <span className="text-label-sm text-slate-500 block">{t("card2.quoteLabel")}</span>
                  <a
                    href="tel:02438186868"
                    className="font-bold text-steel-600 hover:underline text-title-md block"
                  >
                    (+84) 24 3818 6868
                  </a>
                </div>
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    {t("card2.engineerLabel")}
                  </span>
                  <span className="font-semibold text-slate-900 block">
                    (+84) 988 123 456 ({t("card2.engineerHotlineSuffix")})
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md flex items-center justify-between">
              <span className="text-label-sm text-slate-500">{t("card2.footerLabel")}</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>

          {/* Card 3: Dedicated email channels */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-steel-600" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-steel-600 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                {t("card3.badge")}
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                {t("card3.title")}
              </h3>
              <div className="flex flex-col gap-space-sm text-body-sm mb-space-md">
                <div>
                  <span className="text-label-sm text-slate-500 block">{t("card3.salesLabel")}</span>
                  <a
                    href="mailto:sales@hanintech.vn"
                    className="font-semibold text-steel-600 hover:underline block"
                  >
                    sales@hanintech.vn
                  </a>
                </div>
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    {t("card3.engineeringLabel")}
                  </span>
                  <a
                    href="mailto:engineering@hanintech.vn"
                    className="font-semibold text-slate-900 hover:underline block"
                  >
                    engineering@hanintech.vn
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md">
              <span className="text-label-sm text-slate-500 block">{t("card3.footerText")}</span>
            </div>
          </div>

          {/* Card 4: Operating schedules */}
          <div className="bg-white border border-slate-200 p-space-lg rounded shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-500" />
            <div>
              <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-600 mb-space-md">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
              </div>
              <span className="text-label-sm uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                {t("card4.badge")}
              </span>
              <h3 className="text-title-md font-bold text-slate-900 mb-space-sm">
                {t("card4.title")}
              </h3>
              <div className="flex flex-col gap-space-sm text-body-sm mb-space-md">
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    {t("card4.officeLabel")}
                  </span>
                  <span className="text-slate-900 block font-medium">
                    {t("card4.officeValue")}
                  </span>
                </div>
                <div>
                  <span className="text-label-sm text-slate-500 block">
                    {t("card4.workshopLabel")}
                  </span>
                  <span className="text-slate-900 block font-medium">
                    {t("card4.workshopValue")}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-space-sm bg-slate-50 -mx-space-lg -mb-space-lg p-space-md">
              <span className="text-label-sm text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block font-semibold">
                {t("card4.footerBadge")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
