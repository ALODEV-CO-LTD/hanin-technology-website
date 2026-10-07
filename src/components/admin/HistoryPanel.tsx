"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "./api";

interface Revision {
  id: number;
  createdAt: string;
  userEmail: string;
  changed: string[];
}

/** Lịch sử các lần sửa của một mục + nút khôi phục về từng phiên bản. */
export default function HistoryPanel({ resource, id }: { resource: string; id: number }) {
  const [items, setItems] = useState<Revision[] | null>(null);
  const [busy, setBusy] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    api<{ items: Revision[] }>(`${resource}/${id}/history`).then((d) => {
      if (!cancelled) setItems(d.items);
    });
    return () => {
      cancelled = true;
    };
  }, [resource, id]);

  async function restore(rev: Revision) {
    const what = rev.changed.length ? `Các trường sẽ quay về phiên bản này: ${rev.changed.join(", ")}.` : "Phiên bản này giống bản hiện tại.";
    if (!confirm(`Khôi phục về phiên bản ${rev.createdAt}?\n${what}\n\nBản hiện tại vẫn được lưu lại trong lịch sử nên có thể hoàn tác.`)) return;
    setBusy(rev.id);
    setMessage("");
    try {
      await api(`${resource}/${id}/history`, { body: { revisionId: rev.id } });
      window.location.reload();
    } catch (err) {
      setMessage(err instanceof ApiError ? err.errors ? Object.values(err.errors).join("; ") : err.message : "Không khôi phục được");
      setBusy(0);
    }
  }

  return (
    <section className="mt-6 bg-white border border-slate-200 rounded-lg p-5" aria-label="Lịch sử thay đổi">
      <h2 className="font-bold text-slate-900">Lịch sử thay đổi</h2>
      <p className="text-sm text-slate-500 mb-3">Mỗi lần lưu, phiên bản trước đó được giữ lại (tối đa 30). Bấm “Khôi phục” để quay về phiên bản đó.</p>
      {message && <p role="alert" className="mb-2 text-sm text-red-700">{message}</p>}
      {items === null ? (
        <p className="text-sm text-slate-500">Đang tải…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-500">Chưa có thay đổi nào được ghi lại.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((rev) => (
            <li key={rev.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-slate-800">
                  {rev.createdAt} {rev.userEmail && <span className="text-slate-500 font-normal">· {rev.userEmail}</span>}
                </p>
                <p className="text-xs text-slate-500">
                  {rev.changed.length ? `Khác bản hiện tại ở: ${rev.changed.join(", ")}` : "Giống bản hiện tại"}
                </p>
              </div>
              <button
                type="button"
                disabled={busy === rev.id || rev.changed.length === 0}
                onClick={() => restore(rev)}
                className="px-3 h-9 rounded border border-steel-600 text-steel-700 bg-white hover:bg-steel-50 text-xs font-semibold disabled:opacity-40"
              >
                {busy === rev.id ? "Đang khôi phục…" : "Khôi phục"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
