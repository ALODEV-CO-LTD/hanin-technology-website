import type { Metadata } from "next";
import Breadcrumb from "@/components/dich-vu/Breadcrumb";
import CategoryHero from "@/components/dich-vu/CategoryHero";
import CapacityOverview from "@/components/dich-vu/CapacityOverview";
import ServiceCategories from "@/components/dich-vu/ServiceCategories";
import ProcessFlow from "@/components/dich-vu/ProcessFlow";
import QualityMetrology from "@/components/dich-vu/QualityMetrology";
import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";

export const metadata: Metadata = {
  title: "Dịch Vụ Gia Công Mạ & Xử Lý Bề Mặt | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "HANIN TECHNOLOGY VIỆT NAM cung cấp dịch vụ gia công mạ điện phân, mạ hóa học và xử lý bề mặt kim loại công nghiệp đạt chuẩn ô tô, hàng không: mạ Crom cứng, mạ Niken hóa học (ENP), mạ Kẽm-Niken, Anodizing nhôm.",
};

export default function DichVuGiaCongMaPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-margin py-space-lg flex flex-col w-full">
      <Breadcrumb
        items={[
          { label: "Trang Chủ", href: "/" },
          { label: "Dịch Vụ Gia Công Mạ & Xử Lý Bề Mặt" },
        ]}
      />
      <CategoryHero />
      <CapacityOverview />
      <ServiceCategories />
      <ProcessFlow />
      <QualityMetrology />
      <RfqFormCategory />
    </div>
  );
}
