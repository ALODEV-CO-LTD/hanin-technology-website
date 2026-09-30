import Link from "next/link";
import { all, get } from "@/server/db";
import { RESOURCES } from "@/server/cms/resources";

export const dynamic = "force-dynamic";

const count = (table: string, where = "1=1") => Number(get<{ n: number }>(`SELECT COUNT(*) AS n FROM ${table} WHERE ${where}`)?.n ?? 0);

export default function DashboardPage() {
  const recent = all<{ id: number; kind: string; fullName: string; company: string; createdAt: string; status: string }>(
    "SELECT id, kind, full_name AS fullName, company, created_at AS createdAt, status FROM inquiries ORDER BY id DESC LIMIT 6",
  );
  const kindLabel: Record<string, string> = { rfq: "Báo giá", contact: "Liên hệ", application: "Ứng tuyển" };

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-5">Tổng quan</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <Link href="/admin/inquiries?status=new" className="bg-white border border-slate-200 rounded-lg p-4 hover:border-steel-600">
          <p className="text-3xl font-bold text-steel-600">{count("inquiries", "status = 'new'")}</p>
          <p className="text-sm text-slate-600">Yêu cầu mới chưa xử lý</p>
        </Link>
        {RESOURCES.filter((r) => r.key !== "banners").map((r) => (
          <Link key={r.key} href={`/admin/${r.key}`} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-steel-600">
            <p className="text-3xl font-bold text-slate-900">{count(r.table)}</p>
            <p className="text-sm text-slate-600">{r.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="font-bold text-slate-900 mb-3">Yêu cầu gần đây</h2>
      <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
        {recent.map((r) => (
          <Link key={r.id} href="/admin/inquiries" className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 text-sm">
            <span className="min-w-0 truncate">
              <strong>{r.fullName}</strong>
              {r.company && <span className="text-slate-500"> · {r.company}</span>}
            </span>
            <span className="flex items-center gap-3 shrink-0 text-xs text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100">{kindLabel[r.kind] ?? r.kind}</span>
              {r.status === "new" && <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-semibold">Mới</span>}
              {r.createdAt.slice(0, 16)}
            </span>
          </Link>
        ))}
        {recent.length === 0 && <p className="px-4 py-8 text-center text-sm text-slate-500">Chưa có yêu cầu nào từ website.</p>}
      </div>
    </div>
  );
}
