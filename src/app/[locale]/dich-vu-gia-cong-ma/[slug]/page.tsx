import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
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
import { getServiceBySlug } from "@/server/public";
import Reveal from "@/components/ui/Reveal";

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug, await getLocale());
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function DichVuChiTietPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const t = await getTranslations("DichVu");
  const tNav = await getTranslations("Nav");
  const service = getServiceBySlug(slug, await getLocale());
  if (!service) notFound();
  // Phần đầu trang (tiêu đề, mã, badge, mô tả, ảnh) và breadcrumb lấy từ CMS.
  // Các mục còn lại (tổng quan/quy trình/năng lực/ứng dụng/QA/thư viện ảnh) là nội dung mẫu dùng chung
  // từ messages, chỉnh sửa qua màn hình "Nội dung trang" của CMS.

  return (
    <div className="px-margin py-space-lg flex flex-col w-full">
      <PageBreadcrumb
        className="mb-space-md"
        items={[
          { label: tNav("trangChu"), href: "/" },
          { label: t("breadcrumbCategory"), href: "/dich-vu-gia-cong-ma" },
          { label: service.title.toUpperCase() },
        ]}
      />
      <DetailHero service={service} />
      <Reveal><DetailOverview /></Reveal>
      <Reveal><DetailProcess /></Reveal>
      <Reveal direction="right"><DetailCapability /></Reveal>
      <Reveal><DetailApplications /></Reveal>
      <Reveal><DetailQaTable /></Reveal>
      <Reveal><DetailGallery /></Reveal>
      <Reveal><RfqFormDetail /></Reveal>
      <Reveal><RelatedServices currentSlug={service.slug} /></Reveal>
    </div>
  );
}
