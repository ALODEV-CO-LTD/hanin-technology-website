import { useTranslations } from "next-intl";
import { getSettings, telHref } from "@/server/settings";
import InfoCard, { InfoField } from "@/components/ui/InfoCard";

export default function ContactChannels() {
  const t = useTranslations("LienHe.ContactChannels");
  const { hotline, engineerHotline, salesEmail, engineeringEmail } = getSettings();

  return (
    <section className="w-full bg-white py-space-xl">
      <div className="mx-auto px-margin">
        <div className="mb-space-lg flex flex-col justify-between gap-space-sm sm:flex-row sm:items-end">
          <h2 className="text-headline-md font-bold uppercase tracking-tight text-slate-900">{t("heading")}</h2>
          <span className="text-body-sm text-slate-500">{t("subtitle")}</span>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon="factory" badge={t("card1.badge")} title={t("card1.title")} footer={t("card1.footerValue")}>
            <p className="leading-relaxed">{t("card1.address")}</p>
          </InfoCard>

          <InfoCard
            icon="support_agent"
            tone="sky"
            badge={t("card2.badge")}
            title={t("card2.title")}
            footer={
              <span className="flex w-full items-center justify-between">
                {t("card2.footerLabel")}
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            }
          >
            <InfoField strong label={t("card2.quoteLabel")} value={hotline} href={telHref(hotline)} />
            <InfoField label={t("card2.engineerLabel")} value={`${engineerHotline} (${t("card2.engineerHotlineSuffix")})`} href={telHref(engineerHotline)} />
          </InfoCard>

          <InfoCard icon="mark_email_read" badge={t("card3.badge")} title={t("card3.title")} footer={t("card3.footerText")}>
            <InfoField label={t("card3.salesLabel")} value={salesEmail} href={`mailto:${salesEmail}`} />
            {engineeringEmail !== salesEmail && (
              <InfoField label={t("card3.engineeringLabel")} value={engineeringEmail} href={`mailto:${engineeringEmail}`} />
            )}
          </InfoCard>

          <InfoCard
            icon="schedule"
            tone="slate"
            badge={t("card4.badge")}
            title={t("card4.title")}
            footer={
              <span className="inline-block rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                {t("card4.footerBadge")}
              </span>
            }
          >
            <InfoField label={t("card4.officeLabel")} value={t("card4.officeValue")} />
            <InfoField label={t("card4.workshopLabel")} value={t("card4.workshopValue")} />
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
