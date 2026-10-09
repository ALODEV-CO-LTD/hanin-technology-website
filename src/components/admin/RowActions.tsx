"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, ApiError } from "./api";
import { useToast } from "./Toast";

interface Props {
  resource: string;
  id: number;
  publishField?: string;
  published?: boolean;
}

export default function RowActions({ resource, id, publishField, published }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  async function toggle() {
    if (!publishField) return;
    setBusy(true);
    try {
      const next = publishField === "status" ? (published ? "draft" : "published") : !published;
      await api(`${resource}/${id}`, { method: "PUT", body: { [publishField]: next } });
      toast.success(next === "published" || next === true ? "Đã hiển thị trên website." : "Đã ẩn khỏi website.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không cập nhật được");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Xoá mục này? Thao tác không thể hoàn tác.")) return;
    setBusy(true);
    try {
      await api(`${resource}/${id}`, { method: "DELETE" });
      toast.success("Đã xoá. Có thể khôi phục trong mục \"Đã xoá\" bên dưới danh sách.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không xoá được");
      setBusy(false);
    }
  }

  const btn = "px-2.5 h-8 rounded border text-xs font-medium bg-white disabled:opacity-50";
  return (
    <div className="flex items-center gap-1.5 justify-end whitespace-nowrap">
      <Link href={`/admin/${resource}/${id}`} className={`${btn} inline-flex items-center border-slate-300 text-slate-700 hover:bg-slate-50`}>Sửa</Link>
      {publishField && (
        <button onClick={toggle} disabled={busy} className={`${btn} border-slate-300 text-slate-700 hover:bg-slate-50`}>
          {published ? "Ẩn" : "Hiện"}
        </button>
      )}
      <button onClick={remove} disabled={busy} className={`${btn} border-red-200 text-red-700 hover:bg-red-50`}>Xoá</button>
    </div>
  );
}
