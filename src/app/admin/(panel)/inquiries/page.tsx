import InquiryManager from "@/components/admin/InquiryManager";

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  return <InquiryManager initialStatus={status ?? ""} />;
}
