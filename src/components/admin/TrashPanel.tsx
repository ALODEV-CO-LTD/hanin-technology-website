"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, ApiError } from "./api";
import { useToast } from "./Toast";

interface Deleted {
  id: number;
  title: string;
  deletedAt: string;
  userEmail: string;
}

/** Danh sách mục đã xoá gần đây — khôi phục lại được. */
export default function TrashPanel({ resource }: { resource: string }) {
  const router = useRouter();
  const [items, setItems] = useState<Deleted[]>([]);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;
    api<{ items: Deleted[] }>(`${resource}/trash`).then((d) => {
      if (!cancelled) setItems(d.items);
    });
    return () => {
      cancelled = true;
    };
  }, [resource, version]);

  if (items.length === 0) return null;

  async function restore(item: Deleted) {
    setError("");
    try {
      await api(`${resource}/trash`, { body: { revisionId: item.id } });
      toast.success("Đã khôi phục.");
      setVersion((v) => v + 1);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? (err.errors ? Object.values(err.errors).join("; ") : err.message) : "Không khôi phục được");
    }
  }

  return (
    <details className="mt-6 bg-white border border-slate-200 rounded-lg">
      <summary className="px-4 py-3 cursor-pointer text-sm font-semibold text-slate-800">Đã xoá gần đây ({items.length}) — bấm để khôi phục</summary>
      {error && <p role="alert" className="px-4 pb-2 text-sm text-red-700">{error}</p>}
      <ul className="divide-y divide-slate-100 border-t border-slate-100">
        {items.map((item) => (
          <li key={item.id} className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="min-w-0">
              <span className="font-medium text-slate-800">{item.title}</span>
              <span className="block text-xs text-slate-500">Xoá lúc {item.deletedAt}{item.userEmail ? ` · ${item.userEmail}` : ""}</span>
            </span>
            <button type="button" onClick={() => restore(item)} className="px-3 h-9 rounded border border-steel-600 text-steel-700 bg-white hover:bg-steel-50 text-xs font-semibold">
              Khôi phục
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
