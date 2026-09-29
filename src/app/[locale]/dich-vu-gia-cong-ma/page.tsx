import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import CategoryHero from "@/components/dich-vu/CategoryHero";
import CapacityOverview from "@/components/dich-vu/CapacityOverview";
import ServiceCategories from "@/components/dich-vu/ServiceCategories";
import ProcessFlow from "@/components/dich-vu/ProcessFlow";
import QualityMetrology from "@/components/dich-vu/QualityMetrology";
import RfqFormCategory from "@/components/dich-vu/RfqFormCategory";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Dịch Vụ Gia Công Mạ & Xử Lý Bề Mặt | HANIN TECHNOLOGY VIỆT NAM",
  description:
    "Dịch vụ gia công mạ điện phân, mạ hóa học và xử lý bề mặt kim loại đạt chuẩn ô tô, hàng không: mạ Crom cứng, mạ Niken hóa học (ENP), mạ Kẽm-Niken, Anodizing nhôm.",
};

export default async function DichVuGiaCongMaPage() {
  const t = await getTranslations("DichVu");
  const tNav = await getTranslations("Nav");

  return (
    <div className="mx-auto px-margin py-space-lg flex flex-col w-full">
      <PageBreadcrumb
        className="mb-space-md"
        items={[
          { label: tNav("trangChu"), href: "/" },
          { label: t("breadcrumbCategory") },
        ]}
      />
      <CategoryHero />
      <Reveal><CapacityOverview /></Reveal>
      <Reveal><ServiceCategories /></Reveal>
      <Reveal><ProcessFlow /></Reveal>
      <Reveal><QualityMetrology /></Reveal>
      <Reveal><RfqFormCategory /></Reveal>
    </div>
  );
}
