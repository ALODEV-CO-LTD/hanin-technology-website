import type { Metadata } from "next";
import CapabilityHero from "@/components/nang-luc/CapabilityHero";
import CapabilityOverviewStats from "@/components/nang-luc/CapabilityOverviewStats";
import FactoryOverview from "@/components/nang-luc/FactoryOverview";
import ProductionLines from "@/components/nang-luc/ProductionLines";
import AutomatedVsManual from "@/components/nang-luc/AutomatedVsManual";
import EquipmentGrid from "@/components/nang-luc/EquipmentGrid";
import TestingAnalysis from "@/components/nang-luc/TestingAnalysis";
import ProductionFlow from "@/components/nang-luc/ProductionFlow";
import FactoryGallery from "@/components/nang-luc/FactoryGallery";
import QualityStandards from "@/components/nang-luc/QualityStandards";
import CompanyProfileCta from "@/components/nang-luc/CompanyProfileCta";
import NangLucFinalCta from "@/components/nang-luc/NangLucFinalCta";

export const metadata: Metadata = {
  title: "Năng lực sản xuất | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "Hệ sinh thái nhà xưởng chuẩn hóa, chuỗi dây chuyền mạ tự động điều khiển PLC SCADA và phòng thí nghiệm kiểm định vi mô đạt chuẩn quốc tế của HANIN TECHNOLOGY.",
};

export default function NangLucSanXuatPage() {
  return (
    <div className="flex flex-col w-full">
      <CapabilityHero />
      <CapabilityOverviewStats />
      <FactoryOverview />
      <ProductionLines />
      <AutomatedVsManual />
      <EquipmentGrid />
      <TestingAnalysis />
      <ProductionFlow />
      <FactoryGallery />
      <QualityStandards />
      <CompanyProfileCta />
      <NangLucFinalCta />
    </div>
  );
}
