import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import ServiceBanner from "@/components/dich-vu/ServiceBanner";
import CapacityOverview from "@/components/dich-vu/CapacityOverview";
import ServiceCategories from "@/components/dich-vu/ServiceCategories";
import ProcessFlow from "@/components/dich-vu/ProcessFlow";
import QualityMetrology from "@/components/dich-vu/QualityMetrology";
import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";
import Reveal from "@/components/ui/Reveal";
import ClientMessages from "@/i18n/client-messages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata({ locale, path: "/dich-vu-gia-cong-ma", title: t("dichVu.title"), description: t("dichVu.description") });
}

export default function DichVuGiaCongMaPage() {
  return (
    <ClientMessages keys={["AttachField", "DichVu.RfqFormCategory"]}>
    <>
      <ServiceBanner />
      <div className="px-margin py-space-lg flex flex-col w-full">
        <Reveal><CapacityOverview /></Reveal>
        <Reveal><ServiceCategories /></Reveal>
        <Reveal><ProcessFlow /></Reveal>
        <Reveal direction="left"><QualityMetrology /></Reveal>
        <Reveal><RfqFormCategory /></Reveal>
      </div>
    </>
    </ClientMessages>
  );
}
