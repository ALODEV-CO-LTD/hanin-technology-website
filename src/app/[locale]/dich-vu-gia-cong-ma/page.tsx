import type { Metadata } from "next";
import ServiceBanner from "@/components/dich-vu/ServiceBanner";
import CategoryHero from "@/components/dich-vu/CategoryHero";
import CapacityOverview from "@/components/dich-vu/CapacityOverview";
import ServiceCategories from "@/components/dich-vu/ServiceCategories";
import ProcessFlow from "@/components/dich-vu/ProcessFlow";
import QualityMetrology from "@/components/dich-vu/QualityMetrology";
import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Dịch Vụ Gia Công Mạ & Xử Lý Bề Mặt",
  description:
    "Dịch vụ gia công mạ điện phân, mạ hóa học và xử lý bề mặt kim loại đạt chuẩn ô tô, hàng không: mạ Crom cứng, mạ Niken hóa học (ENP), mạ Kẽm-Niken, Anodizing nhôm.",
};

export default function DichVuGiaCongMaPage() {
  return (
    <>
      <ServiceBanner />
      <div className="px-margin py-space-lg flex flex-col w-full">
        <CategoryHero />
        <Reveal><CapacityOverview /></Reveal>
        <Reveal><ServiceCategories /></Reveal>
        <Reveal><ProcessFlow /></Reveal>
        <Reveal direction="left"><QualityMetrology /></Reveal>
        <Reveal><RfqFormCategory /></Reveal>
      </div>
    </>
  );
}
