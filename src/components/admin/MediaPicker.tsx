"use client";

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { api, ApiError } from "./api";
import { useToast } from "./Toast";

export interface MediaItem {
  id: number;
  path: string;
  original: string;
  mime: string;
  size: number;
}

export function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Lưới thư viện ảnh + tải lên. Dùng cả cho trang Thư viện và hộp chọn ảnh. */
export function MediaLibrary({ onSelect }: { onSelect?: (item: MediaItem) => void }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [version, setVersion] = useState(0);
  const reload = () => setVersion((v) => v + 1);

  useEffect(() => {
    let cancelled = false;
    api<{ items: MediaItem[]; total: number }>(`media?page=${page}`)
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Không tải được thư viện");
      });
    return () => {
      cancelled = true;
    };
  }, [page, version]);

  const toast = useToast();
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState("");
  const dragDepth = useRef(0);

  function pickFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    void upload(files);
  }

  const hasFiles = (event: DragEvent) => Array.from(event.dataTransfer?.types ?? []).includes("Files");

  function onDragEnter(event: DragEvent) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    dragDepth.current += 1;
    setDragging(true);
  }
  function onDragOver(event: DragEvent) {
    if (!hasFiles(event)) return;
    event.preventDefault(); // bắt buộc để cho phép thả
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event: DragEvent) {
    if (!hasFiles(event)) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragging(false);
  }
  function onDrop(event: DragEvent) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    if (busy) return;
    void upload(Array.from(event.dataTransfer.files));
  }

  async function upload(all: File[]) {
    const allowed = /^(image\/(jpeg|png|webp|gif|avif)|application\/pdf)$/;
    const files = all.filter((f) => allowed.test(f.type));
    const skipped = all.length - files.length;
    setError(skipped > 0 ? `Bỏ qua ${skipped} tệp không phải ảnh (JPG, PNG, WEBP, GIF, AVIF) hoặc PDF.` : "");
    if (files.length === 0) return;
    setBusy(true);
    let done = 0;
    let okCount = 0;
    for (const file of files) {
      setProgress(`Đang tải lên ${done + 1}/${files.length}…`);
      const form = new FormData();
      form.append("file", file);
      try {
        const created = await api<MediaItem>("media", { form });
        okCount += 1;
        if (files.length === 1 && onSelect) onSelect(created);
      } catch (err) {
        setError((prev) => (prev ? prev + "\n" : "") + `${file.name}: ${err instanceof ApiError ? err.message : "tải lên thất bại"}`);
      }
      done += 1;
    }
    setProgress("");
    setBusy(false);
    if (okCount > 0) toast.success(`Đã tải lên ${okCount} tệp.`);
    setPage(1);
    reload();
  }

  async function remove(item: MediaItem) {
    if (!confirm(`Xoá "${item.original}"? Nếu ảnh đang được dùng ở đâu đó, chỗ đó sẽ bị mất ảnh.`)) return;
    try {
      await api(`media/${item.id}`, { method: "DELETE" });
      toast.success("Đã xoá tệp.");
      reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không xoá được");
    }
  }

  return (
    <div
      className="relative"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Vùng kéo thả: bấm để chọn tệp, hoặc kéo ảnh từ máy thả vào bất kỳ đâu trong thư viện */}
      <label
        className={`mb-4 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors ${
          dragging ? "border-steel-600 bg-steel-50" : "border-slate-300 bg-white hover:border-steel-400 hover:bg-slate-50"
        } ${busy ? "pointer-events-none opacity-70" : ""}`}
      >
        <span className="inline-flex items-center px-4 h-10 rounded bg-steel-600 text-white text-sm font-semibold">
          {busy ? progress || "Đang tải lên…" : "Chọn ảnh từ máy"}
        </span>
        <span className="text-sm font-medium text-slate-700">hoặc kéo thả ảnh vào đây</span>
        <span className="text-xs text-slate-500">JPG, PNG, WEBP, GIF, AVIF hoặc PDF · tối đa 10MB/tệp · chọn được nhiều tệp · hiện có {total} tệp</span>
        <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/avif,application/pdf" className="hidden" onChange={pickFiles} disabled={busy} />
      </label>
      {dragging && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-steel-600 bg-steel-50/90">
          <p className="text-base font-bold text-steel-700">Thả ảnh vào đây để tải lên</p>
        </div>
      )}
      {error && <p role="alert" className="mb-3 whitespace-pre-line text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="group bg-white border border-slate-200 rounded overflow-hidden flex flex-col">
            <button
              type="button"
              onClick={() => onSelect?.(item)}
              disabled={!onSelect}
              className="aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden disabled:cursor-default"
              title={onSelect ? "Chọn ảnh này" : item.original}
            >
              {item.mime.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.path} alt={item.original} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-slate-500">PDF</span>
              )}
            </button>
            <div className="p-2 text-xs flex flex-col gap-1">
              <p className="truncate font-medium text-slate-700" title={item.original}>{item.original}</p>
              <p className="text-slate-400">{formatSize(item.size)}</p>
              <div className="flex items-center justify-between">
                <button type="button" className="text-steel-600 hover:underline" onClick={() => navigator.clipboard?.writeText(item.path)}>
                  Chép đường dẫn
                </button>
                <button type="button" className="text-red-600 hover:underline" onClick={() => remove(item)}>Xoá</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full text-sm text-slate-500 py-8 text-center">Chưa có tệp nào. Chọn hoặc kéo thả ảnh vào khung phía trên để bắt đầu.</p>}
      </div>
      {total > 48 && (
        <div className="flex items-center justify-center gap-3 mt-4 text-sm">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 border rounded disabled:opacity-40">Trước</button>
          <span>Trang {page} / {Math.ceil(total / 48)}</span>
          <button disabled={page >= Math.ceil(total / 48)} onClick={() => setPage(page + 1)} className="px-3 py-1.5 border rounded disabled:opacity-40">Sau</button>
        </div>
      )}
    </div>
  );
}

export function MediaPickerModal({ onClose, onSelect }: { onClose: () => void; onSelect: (item: MediaItem) => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Chọn ảnh">
      <div className="bg-slate-50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Chọn ảnh từ thư viện</h3>
          <button onClick={onClose} className="px-3 py-1.5 rounded border border-slate-300 text-sm bg-white">Đóng</button>
        </div>
        <MediaLibrary onSelect={(item) => onSelect(item)} />
      </div>
    </div>
  );
}
