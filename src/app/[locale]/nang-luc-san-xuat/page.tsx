import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import CapabilityHero from "@/components/nang-luc/CapabilityHero";
import FactoryOverview from "@/components/nang-luc/FactoryOverview";
import ProductionLines from "@/components/nang-luc/ProductionLines";
import AutomatedVsManual from "@/components/nang-luc/AutomatedVsManual";
import EquipmentGrid from "@/components/nang-luc/EquipmentGrid";
import TestingAnalysis from "@/components/nang-luc/TestingAnalysis";
import ProductionFlow from "@/components/nang-luc/ProductionFlow";
import ProcessExplorer from "@/components/nang-luc/ProcessExplorer";
import FactoryGallery from "@/components/nang-luc/FactoryGallery";
import QualityStandards from "@/components/nang-luc/QualityStandards";
import CompanyProfileCta from "@/components/nang-luc/CompanyProfileCta";
import NangLucFinalCta from "@/components/nang-luc/NangLucFinalCta";
import Reveal from "@/components/ui/Reveal";
import ClientMessages from "@/i18n/client-messages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata({ locale, path: "/nang-luc-san-xuat", title: t("nangLuc.title"), description: t("nangLuc.description") });
}

export default function NangLucSanXuatPage() {
  return (
    <ClientMessages keys={["QuyTrinh"]}>
    <div className="flex flex-col w-full">
      <CapabilityHero />
      <Reveal direction="right"><FactoryOverview /></Reveal>
      <Reveal direction="right"><ProductionLines /></Reveal>
      <Reveal><AutomatedVsManual /></Reveal>
      <Reveal><EquipmentGrid /></Reveal>
      <Reveal direction="right"><TestingAnalysis /></Reveal>
      <Reveal><ProductionFlow /></Reveal>
      <ProcessExplorer />
      <Reveal><FactoryGallery /></Reveal>
      <Reveal><QualityStandards /></Reveal>
      <Reveal direction="left"><CompanyProfileCta /></Reveal>
      <Reveal><NangLucFinalCta /></Reveal>
    </div>
    </ClientMessages>
  );
}
