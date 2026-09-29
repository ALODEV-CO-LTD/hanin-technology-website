import type { Metadata } from "next";
import Breadcrumb from "@/components/dich-vu/Breadcrumb";
import DetailHero from "@/components/dich-vu/DetailHero";
import DetailOverview from "@/components/dich-vu/DetailOverview";
import DetailProcess from "@/components/dich-vu/DetailProcess";
import DetailCapability from "@/components/dich-vu/DetailCapability";
import DetailApplications from "@/components/dich-vu/DetailApplications";
import DetailQaTable from "@/components/dich-vu/DetailQaTable";
import DetailGallery from "@/components/dich-vu/DetailGallery";
import RfqFormDetail from "@/components/dich-vu/RfqFormDetail";
import RelatedServices from "@/components/dich-vu/RelatedServices";
import { DETAIL_TEMPLATE_SLUG, getServiceBySlug } from "@/lib/services-data";

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug) ?? getServiceBySlug(DETAIL_TEMPLATE_SLUG);

  return {
    title: `${service?.title ?? "Dịch Vụ Gia Công Mạ"} | HANIN TECHNOLOGY VIỆT NAM`,
    description:
      service?.description ??
      "Chi tiết dịch vụ gia công mạ và xử lý bề mặt kim loại công nghiệp tại HANIN TECHNOLOGY VIỆT NAM.",
  };
}

export default async function DichVuChiTietPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  // Hiện tại mới có 1 bộ nội dung chi tiết mẫu (Mạ Niken hóa học - ENP).
  // Mọi slug đều hiển thị nội dung này tạm thời cho tới khi có dữ liệu thật của từng dịch vụ.
  const service = getServiceBySlug(slug) ?? getServiceBySlug(DETAIL_TEMPLATE_SLUG);

  return (
    <div className="max-w-[1280px] mx-auto px-margin py-space-lg flex flex-col w-full">
      <Breadcrumb
        items={[
          { label: "Trang Chủ", href: "/" },
          { label: "Dịch Vụ Gia Công Mạ", href: "/dich-vu-gia-cong-ma" },
          { label: service?.title.toUpperCase() ?? "CHI TIẾT DỊCH VỤ" },
        ]}
      />
      <DetailHero />
      <DetailOverview />
      <DetailProcess />
      <DetailCapability />
      <DetailApplications />
      <DetailQaTable />
      <DetailGallery />
      <RfqFormDetail />
      <RelatedServices currentSlug={service?.slug ?? DETAIL_TEMPLATE_SLUG} />
    </div>
  );
}
