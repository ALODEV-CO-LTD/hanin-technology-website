import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServiceBanner from "@/components/dich-vu/ServiceBanner";
import CapacityOverview from "@/components/dich-vu/CapacityOverview";
import ServiceCategories from "@/components/dich-vu/ServiceCategories";
import ProcessFlow from "@/components/dich-vu/ProcessFlow";
import QualityMetrology from "@/components/dich-vu/QualityMetrology";
import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";
import Reveal from "@/components/ui/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("dichVu.title"), description: t("dichVu.description") };
}

export default function DichVuGiaCongMaPage() {
  return (
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
  );
}
