import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { getPhones } from "@/server/settings";
import LegalPage from "@/components/legal/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata({ locale, path: "/chinh-sach-bao-mat", title: t("chinhSachBaoMat.title"), description: t("chinhSachBaoMat.description") });
}

export default async function PrivacyPage() {
  const t = await getTranslations("Legal");
  const operator = {
    title: t("operator.title"),
    body: [t("operator.name"), t("operator.tax"), t("operator.hq"), t("operator.fac"), t("operator.rep"), t("operator.mail")],
  };
  const sections = [
    { title: t("privacy.collect.title"), body: [t("privacy.collect.p1"), t("privacy.collect.p2")] },
    { title: t("privacy.purpose.title"), body: [t("privacy.purpose.p1")] },
    { title: t("privacy.security.title"), body: [t("privacy.security.p1")] },
    { title: t("privacy.retention.title"), body: [t("privacy.retention.p1")] },
    { title: t("privacy.contact.title"), body: [t("privacy.contact.p1", { phones: getPhones().general.map((p) => p.number).join(" / ") })] },
    operator,
  ];
  return (
    <LegalPage
      title={t("privacy.title")}
      updated={t("privacy.updated")}
      intro={t("privacy.intro")}
      sections={sections}
    />
  );
}
