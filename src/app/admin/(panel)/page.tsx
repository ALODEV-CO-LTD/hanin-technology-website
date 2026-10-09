import Link from "next/link";
import { all, get } from "@/server/db";
import { RESOURCES } from "@/server/cms/resources";
import { DailyBars, Donut, HorizontalBars, StackedStatus } from "@/components/admin/Charts";

export const dynamic = "force-dynamic";

const count = (table: string, where = "1=1") => Number(get<{ n: number }>(`SELECT COUNT(*) AS n FROM ${table} WHERE ${where}`)?.n ?? 0);

export default function DashboardPage() {
  const recent = all<{ id: number; kind: string; fullName: string; company: string; createdAt: string; status: string }>(
    "SELECT id, kind, full_name AS fullName, company, created_at AS createdAt, status FROM inquiries ORDER BY id DESC LIMIT 6",
  );
  const kindLabel: Record<string, string> = { rfq: "Báo giá", contact: "Liên hệ", application: "Ứng tuyển" };
  const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Đã xử lý", spam: "Spam" };

  // 30 ngày gần nhất (giờ UTC của cơ sở dữ liệu); ngày không có yêu cầu hiển thị 0.
  const dayRows = all<{ d: string; n: number }>(
    "SELECT substr(created_at, 1, 10) AS d, COUNT(*) AS n FROM inquiries WHERE created_at >= date('now', '-29 days') GROUP BY d",
  );
  const byDay = new Map(dayRows.map((r) => [r.d, Number(r.n)]));
  const days = Array.from({ length: 30 }, (_, i) => {
    const key = new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10);
    return { label: key.slice(8, 10) + "/" + key.slice(5, 7), value: byDay.get(key) ?? 0 };
  });
  const last30 = days.reduce((a, b) => a + b.value, 0);
  const kindRows = all<{ kind: string; n: number }>("SELECT kind, COUNT(*) AS n FROM inquiries GROUP BY kind");
  const KIND_COLOR: Record<string, string> = { rfq: "#2b5a7a", contact: "#8bb3cd", application: "#475569" };
  const kinds = kindRows.map((r) => ({ label: kindLabel[r.kind] ?? r.kind, value: Number(r.n), color: KIND_COLOR[r.kind] ?? "#94a3b8" }));
  const totalInquiries = kinds.reduce((a, b) => a + b.value, 0);
  const statusRows = all<{ status: string; n: number }>("SELECT status, COUNT(*) AS n FROM inquiries GROUP BY status");
  const STATUS_META: { key: string; label: string; color: string }[] = [
    { key: "new", label: "Mới", color: "#dc2626" },
    { key: "processing", label: "Đang xử lý", color: "#2b5a7a" },
    { key: "done", label: "Đã xử lý", color: "#8bb3cd" },
    { key: "spam", label: "Spam", color: "#cbd5e1" },
  ];
  const statuses = STATUS_META.map((m) => ({ label: m.label, color: m.color, value: Number(statusRows.find((r) => r.status === m.key)?.n ?? 0) }));
  const handled = statuses.filter((x) => x.label === "Đã xử lý" || x.label === "Spam").reduce((a, b) => a + b.value, 0);
  const content = RESOURCES.filter((r) => r.key !== "banners").map((r) => ({ label: r.label, value: count(r.table) }));

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-5">Tổng quan</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
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

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Tổng yêu cầu", value: totalInquiries },
          { label: "30 ngày qua", value: last30 },
          { label: "Chưa xử lý", value: statuses.find((x) => x.label === "Mới")?.value ?? 0 },
          { label: "Đã xử lý hoặc loại", value: handled },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">{k.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
        <section className="xl:col-span-2 bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-bold text-slate-900">Yêu cầu trong 30 ngày qua</h2>
            <span className="text-sm text-slate-500">Tổng: <strong className="text-slate-900">{last30}</strong></span>
          </div>
          <DailyBars data={days} />
        </section>
        <section className="bg-white border border-slate-200 rounded-lg p-4">
          <h2 className="font-bold text-slate-900 mb-3">Cơ cấu yêu cầu</h2>
          <Donut data={kinds} total={totalInquiries} />
        </section>
        <section className="bg-white border border-slate-200 rounded-lg p-4">
          <h2 className="font-bold text-slate-900 mb-3">Trạng thái xử lý</h2>
          <StackedStatus data={statuses} />
        </section>
        <section className="xl:col-span-2 bg-white border border-slate-200 rounded-lg p-4">
          <h2 className="font-bold text-slate-900 mb-3">Nội dung trên website</h2>
          <HorizontalBars data={content} />
        </section>
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
