import { useTranslations } from "next-intl";
import { getPhones, getSettings, telHref } from "@/server/settings";
import InfoCard, { InfoField } from "@/components/ui/InfoCard";

export default function ContactChannels() {
  const t = useTranslations("LienHe.ContactChannels");
  const { salesEmail, engineeringEmail } = getSettings();
  const { general } = getPhones();

  return (
    <section className="w-full bg-white py-space-xl">
      <div className="mx-auto px-margin">
        <div className="mb-space-lg flex flex-col justify-between gap-space-sm sm:flex-row sm:items-end">
          <h2 className="text-headline-md font-bold uppercase tracking-tight text-slate-900">{t("heading")}</h2>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon="factory" badge={t("card1.badge")} title={t("card1.title")}>
            <p className="leading-relaxed">{t("card1.address")}</p>
          </InfoCard>

          <InfoCard
            icon="support_agent"
            tone="sky"
            badge={t("card2.badge")}
            title={t("card2.title")}
          >
            {general.map((phone, i) => (
              <InfoField
                key={phone.number}
                strong={i === 0}
                label={phone.role === "engineer" ? t("card2.engineerLabel") : t("card2.quoteLabel")}
                value={phone.number}
                href={telHref(phone.number)}
              />
            ))}
          </InfoCard>

          <InfoCard icon="mark_email_read" badge={t("card3.badge")} title={t("card3.title")}>
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
          >
            <InfoField label={t("card4.officeLabel")} value={t("card4.officeValue")} />
            <InfoField label={t("card4.workshopLabel")} value={t("card4.workshopValue")} />
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
