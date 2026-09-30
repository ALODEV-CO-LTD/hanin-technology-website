import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
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
import Reveal from "@/components/ui/Reveal";

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("DichVu");
  const service = getServiceBySlug(t, slug) ?? getServiceBySlug(t, DETAIL_TEMPLATE_SLUG);

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
  const t = await getTranslations("DichVu");
  const tNav = await getTranslations("Nav");
  // Hiện tại mới có 1 bộ nội dung chi tiết mẫu (Mạ Niken hóa học - ENP).
  // Mọi slug đều hiển thị nội dung này tạm thời cho tới khi có dữ liệu thật của từng dịch vụ.
  const service = getServiceBySlug(t, slug) ?? getServiceBySlug(t, DETAIL_TEMPLATE_SLUG);

  return (
    <div className="max-w-[1800px] mx-auto px-margin py-space-lg flex flex-col w-full">
      <PageBreadcrumb
        className="mb-space-md"
        items={[
          { label: tNav("trangChu"), href: "/" },
          { label: t("breadcrumbCategory"), href: "/dich-vu-gia-cong-ma" },
          { label: service?.title.toUpperCase() ?? t("breadcrumbDetailFallback") },
        ]}
      />
      <DetailHero />
      <Reveal><DetailOverview /></Reveal>
      <Reveal><DetailProcess /></Reveal>
      <Reveal><DetailCapability /></Reveal>
      <Reveal><DetailApplications /></Reveal>
      <Reveal><DetailQaTable /></Reveal>
      <Reveal><DetailGallery /></Reveal>
      <Reveal><RfqFormDetail /></Reveal>
      <Reveal><RelatedServices currentSlug={service?.slug ?? DETAIL_TEMPLATE_SLUG} /></Reveal>
    </div>
  );
}
