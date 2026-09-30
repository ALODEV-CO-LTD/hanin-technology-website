import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { getRecord } from "@/server/cms/crud";
import { getResource } from "@/server/cms/resources";

export const dynamic = "force-dynamic";

export default async function ResourceEditPage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource: key, id } = await params;
  const resource = getResource(key);
  if (!resource) notFound();

  let record = null;
  if (id !== "new") {
    record = getRecord(resource, Number(id));
    if (!record) notFound();
  }

  // Chỉ truyền phần mô tả trường xuống client component (không kèm thông tin bảng/SQL).
  const lite = { key: resource.key, label: resource.label, singular: resource.singular, fields: resource.fields };
  return <ResourceForm resource={lite} initial={record} id={record ? record.id : null} />;
}
