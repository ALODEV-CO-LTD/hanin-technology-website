import Link from "next/link";
import { notFound } from "next/navigation";
import RowActions from "@/components/admin/RowActions";
import { listRecords } from "@/server/cms/crud";
import type { FieldDef, RecordValue, ResourceDef } from "@/server/cms/fields";
import { getResource } from "@/server/cms/resources";

export const dynamic = "force-dynamic";

function Cell({ field, value }: { field: FieldDef; value: RecordValue | undefined }) {
  switch (field.type) {
    case "image":
      return value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(value)} alt="" className="w-16 h-10 object-cover rounded border border-slate-200 bg-slate-100" />
      ) : (
        <span className="text-slate-400">—</span>
      );
    case "i18n-text":
    case "i18n-textarea":
      return <span className="line-clamp-2">{(value as { vi?: string })?.vi || "—"}</span>;
    case "select":
      return <>{field.options?.find((o) => o.value === value)?.label ?? String(value ?? "")}</>;
    case "boolean":
      return (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${value ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
          {value ? "Hiển thị" : "Đang ẩn"}
        </span>
      );
    default:
      return <>{String(value ?? "")}</>;
  }
}

function isPublished(resource: ResourceDef, record: Record<string, unknown>) {
  if (!resource.publishField) return undefined;
  const v = record[resource.publishField];
  return resource.publishField === "status" ? v === "published" : Boolean(v);
}

export default async function ResourceListPage({
  params,
  searchParams,
}: {
  params: Promise<{ resource: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { resource: key } = await params;
  const resource = getResource(key);
  if (!resource) notFound();
  const { q, page } = await searchParams;
  const pageNumber = Math.max(1, Number(page ?? 1) || 1);
  const { items, total, pageSize } = listRecords(resource, { q, page: pageNumber });
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const columns = resource.listColumns.map((name) => resource.fields.find((f) => f.name === name)!).filter(Boolean);
  const href = (p: number) => `/admin/${resource.key}?${new URLSearchParams({ ...(q ? { q } : {}), page: String(p) })}`;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{resource.label}</h1>
          {resource.description && <p className="text-sm text-slate-500 mt-1 max-w-2xl">{resource.description}</p>}
        </div>
        <Link href={`/admin/${resource.key}/new`} className="h-10 px-5 inline-flex items-center rounded bg-steel-600 hover:bg-steel-700 text-white font-semibold text-sm">
          + Thêm {resource.singular}
        </Link>
      </div>

      {resource.searchFields && (
        <form className="mb-4 flex gap-2" action={`/admin/${resource.key}`}>
          <input name="q" defaultValue={q} placeholder="Tìm kiếm…" className="h-10 px-3 border border-slate-300 rounded bg-white text-sm w-full max-w-xs" />
          <button className="h-10 px-4 rounded border border-slate-300 bg-white text-sm">Tìm</button>
        </form>
      )}

      {/* Điện thoại: danh sách dạng thẻ, luôn thấy đủ nút Sửa/Ẩn/Xoá */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map((record) => {
          const imageCol = columns.find((c) => c.type === "image");
          const titleCol = columns.find((c) => c.name === resource.titleField) ?? columns.find((c) => c.type !== "image") ?? columns[0];
          const others = columns.filter((c) => c !== imageCol && c !== titleCol);
          return (
            <article key={record.id} className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col gap-3">
              <div className="flex gap-3 items-start">
                {imageCol && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={String(record[imageCol.name] ?? "")} alt="" className={`w-20 h-14 rounded border border-slate-200 shrink-0 ${resource.key === "clients" ? "object-contain p-1 bg-white" : "object-cover bg-slate-100"}`} />
                )}
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/${resource.key}/${record.id}`} className="font-semibold text-slate-900 leading-snug block">
                    <Cell field={titleCol} value={record[titleCol.name]} />
                  </Link>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 items-center">
                    {others.map((c) => (
                      <span key={c.name} className="inline-flex items-center gap-1">
                        <Cell field={c} value={record[c.name]} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <RowActions
                resource={resource.key}
                id={record.id}
                publishField={resource.publishField}
                published={isPublished(resource, record)}
              />
            </article>
          );
        })}
        {items.length === 0 && <p className="px-4 py-10 text-center text-slate-500 bg-white border border-slate-200 rounded-lg">Chưa có mục nào.</p>}
      </div>

      <div className="hidden md:block bg-white border border-slate-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((c) => (
                <th key={c.name} className="px-4 py-3 font-semibold">{c.label}</th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50 align-middle">
                {columns.map((c, i) => (
                  <td key={c.name} className="px-4 py-3">
                    {i === (columns[0].type === "image" ? 1 : 0) ? (
                      <Link href={`/admin/${resource.key}/${record.id}`} className="font-semibold text-slate-900 hover:text-steel-600">
                        <Cell field={c} value={record[c.name]} />
                      </Link>
                    ) : (
                      <Cell field={c} value={record[c.name]} />
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <RowActions
                    resource={resource.key}
                    id={record.id}
                    publishField={resource.publishField}
                    published={isPublished(resource, record)}
                  />
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-slate-500">Chưa có mục nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4 text-sm">
          {pageNumber > 1 && <Link href={href(pageNumber - 1)} className="px-3 py-1.5 border rounded bg-white">Trước</Link>}
          <span>Trang {pageNumber} / {pages}</span>
          {pageNumber < pages && <Link href={href(pageNumber + 1)} className="px-3 py-1.5 border rounded bg-white">Sau</Link>}
        </div>
      )}
    </div>
  );
}
