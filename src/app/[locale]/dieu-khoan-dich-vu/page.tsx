import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalPage from "@/components/legal/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("dieuKhoan.title"), description: t("dieuKhoan.description") };
}

export default async function TermsPage() {
  const t = await getTranslations("Legal");
  const operator = {
    title: t("operator.title"),
    body: [t("operator.name"), t("operator.tax"), t("operator.hq"), t("operator.fac"), t("operator.rep"), t("operator.mail")],
  };
  const sections = [
    { title: t("terms.scope.title"), body: [t("terms.scope.p1")] },
    { title: t("terms.quote.title"), body: [t("terms.quote.p1")] },
    { title: t("terms.ip.title"), body: [t("terms.ip.p1")] },
    { title: t("terms.liability.title"), body: [t("terms.liability.p1")] },
    { title: t("terms.contact.title"), body: [t("terms.contact.p1")] },
    operator,
  ];
  return (
    <LegalPage
      title={t("terms.title")}
      updated={t("terms.updated")}
      intro={t("terms.intro")}
      sections={sections}
    />
  );
}
