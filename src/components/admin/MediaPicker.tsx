"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { api, ApiError } from "./api";
import { toast } from "@/components/ct999/thong-bao-toast/store";
import { confirm } from "./dialog";
import { PAGES, PAGE_ORDER, SECTIONS, humanize } from "./image-labels";

export interface MediaItem {
  id: number;
  path: string;
  original: string;
  mime: string;
  size: number;
  usage?: { page: string; section: string; sub: string; label: string }[];
}

export function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Lưới thư viện ảnh + tải lên. Dùng cả cho trang Thư viện và hộp chọn ảnh. */
export function MediaLibrary({ onSelect }: { onSelect?: (item: MediaItem) => void }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const picking = !!onSelect;

  const [version, setVersion] = useState(0);
  const reload = () => setVersion((v) => v + 1);

  useEffect(() => {
    let cancelled = false;
    api<{ items: MediaItem[] }>("media")
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setSelected((cur) => new Set([...cur].filter((id) => data.items.some((it) => it.id === id))));
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Không tải được thư viện");
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const total = items.length;
  /** Trang lớn của ảnh = nơi dùng đầu tiên theo thứ tự trang; chưa dùng thì "chua-gan". */
  const pageOf = (it: MediaItem) => {
    const pages = (it.usage ?? []).map((u) => u.page);
    if (pages.length === 0) return "chua-gan";
    return pages.sort((a, b) => (PAGE_ORDER.indexOf(a) + 1 || 99) - (PAGE_ORDER.indexOf(b) + 1 || 99))[0];
  };

  const pageCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of items) m.set(pageOf(it), (m.get(pageOf(it)) ?? 0) + 1);
    return m;
  }, [items]);
  const pageList = useMemo(
    () => [...pageCounts.keys()].sort((a, b) => (PAGE_ORDER.indexOf(a) + 1 || 99) - (PAGE_ORDER.indexOf(b) + 1 || 99)),
    [pageCounts],
  );

  /** trang lớn -> khối (trang nhỏ) -> ảnh */
  const tree = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pages = new Map<string, Map<string, MediaItem[]>>();
    for (const it of items) {
      const page = pageOf(it);
      if (activePage !== "all" && page !== activePage) continue;
      const section = page === "chua-gan" ? "chua-gan/chua-gan" : ((it.usage ?? []).find((u) => u.page === page)?.section ?? `${page}/khac`);
      const hay = `${it.original} ${it.path} ${PAGES[page] ?? ""} ${SECTIONS[section] ?? ""} ${(it.usage ?? []).map((u) => `${u.label} ${u.sub}`).join(" ")}`.toLowerCase();
      if (q && !hay.includes(q)) continue;
      const sections = pages.get(page) ?? new Map<string, MediaItem[]>();
      sections.set(section, [...(sections.get(section) ?? []), it]);
      pages.set(page, sections);
    }
    return [...pages].sort((a, b) => (PAGE_ORDER.indexOf(a[0]) + 1 || 99) - (PAGE_ORDER.indexOf(b[0]) + 1 || 99));
  }, [items, activePage, query]);

  const visible = useMemo(() => tree.flatMap(([, secs]) => [...secs.values()].flat()), [tree]);
  const toggle = (id: number) =>
    setSelected((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const selectMany = (list: MediaItem[], on: boolean) =>
    setSelected((cur) => {
      const next = new Set(cur);
      for (const it of list) {
        if (on) next.add(it.id);
        else next.delete(it.id);
      }
      return next;
    });

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
    reload();
  }

  async function removeSelected() {
    const list = items.filter((it) => selected.has(it.id));
    if (list.length === 0) return;
    const inUse = list.filter((it) => (it.usage ?? []).length > 0).length;
    const ok = await confirm({
      title: `Xoá ${list.length} ảnh đã chọn?`,
      message: inUse > 0
        ? `${inUse} ảnh đang được dùng trên website; xoá xong các chỗ đó sẽ mất ảnh. Không thể hoàn tác.`
        : "Các ảnh này chưa được dùng ở đâu. Không thể hoàn tác.",
      confirmLabel: `Xoá ${list.length} ảnh`,
      danger: true,
    });
    if (!ok) return;
    try {
      const r = await api<{ deleted: number }>("media", { method: "DELETE", body: { ids: list.map((it) => it.id) } });
      toast.success(`Đã xoá ${r.deleted} ảnh.`);
      setSelected(new Set());
      reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không xoá được");
    }
  }

  async function remove(item: MediaItem) {
    if (!(await confirm({ title: `Xoá "${item.original}"?`, message: "Nếu ảnh đang được dùng ở đâu đó, chỗ đó sẽ bị mất ảnh.", danger: true }))) return;
    try {
      await api(`media/${item.id}`, { method: "DELETE" });
      toast.success("Đã xoá tệp.");
      setSelected((cur) => {
        const next = new Set(cur);
        next.delete(item.id);
        return next;
      });
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
      <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên ảnh, trang, khối…"
          className="h-9 px-3 rounded border border-slate-300 bg-white w-64"
          aria-label="Tìm ảnh"
        />
        {!picking && visible.length > 0 && (
          <>
            <button type="button" onClick={() => selectMany(visible, true)} className="h-9 px-3 rounded border border-slate-300 bg-white">Chọn tất cả ({visible.length})</button>
            <button type="button" onClick={() => selectMany(visible.filter((it) => (it.usage ?? []).length === 0), true)} className="h-9 px-3 rounded border border-slate-300 bg-white">Chọn ảnh chưa dùng</button>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="Chọn trang">
        {[["all", "Tất cả", total] as const, ...pageList.map((p) => [p, PAGES[p] ?? p, pageCounts.get(p) ?? 0] as const)].map(([id, name, n]) => (
          <button
            key={id}
            role="tab"
            aria-selected={activePage === id}
            onClick={() => setActivePage(id)}
            className={`h-9 px-3 rounded border text-sm ${activePage === id ? "bg-steel-600 border-steel-600 text-white font-semibold" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}
          >
            {name} <span className={activePage === id ? "text-white/80" : "text-slate-400"}>({n})</span>
          </button>
        ))}
      </div>
      {!picking && selected.size > 0 && (
        <div className="sticky top-0 z-20 mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-steel-300 bg-steel-50 px-3 py-2 text-sm shadow-sm">
          <span className="font-semibold text-slate-800">Đã chọn {selected.size} ảnh</span>
          <button type="button" onClick={() => setSelected(new Set())} className="h-8 px-3 rounded border border-slate-300 bg-white">Bỏ chọn</button>
          <button type="button" onClick={removeSelected} className="h-8 px-3 rounded bg-red-600 text-white font-semibold">Xoá {selected.size} ảnh</button>
        </div>
      )}
      {tree.length === 0 && <p className="text-sm text-slate-500 py-8 text-center">{total === 0 ? "Chưa có tệp nào. Chọn hoặc kéo thả ảnh vào khung phía trên để bắt đầu." : "Không có ảnh nào khớp."}</p>}
      {tree.map(([page, sections]) => (
        <section key={page} className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b-2 border-steel-600">{PAGES[page] ?? page}</h2>
          {[...sections].map(([section, list]) => {
            const allOn = list.every((it) => selected.has(it.id));
            return (
              <details key={section} open={picking || activePage !== "all" || tree.length === 1} className="mb-4 bg-slate-50 border border-slate-200 rounded-lg">
                <summary className="px-4 py-2.5 cursor-pointer font-semibold text-slate-800 text-sm flex items-center gap-3">
                  <span>{SECTIONS[section] ?? humanize(section.split("/")[1])} <span className="font-normal text-slate-400">({list.length} ảnh)</span></span>
                  {!picking && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        selectMany(list, !allOn);
                      }}
                      className="ml-auto text-xs font-medium text-steel-700 hover:underline"
                    >
                      {allOn ? "Bỏ chọn khối này" : "Chọn cả khối"}
                    </button>
                  )}
                </summary>
                <div className="px-3 pb-3 pt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {list.map((item) => {
                    const used = item.usage ?? [];
                    const isSel = selected.has(item.id);
                    return (
                      <div key={item.id} className={`group relative bg-white border rounded overflow-hidden flex flex-col ${isSel ? "border-steel-600 ring-2 ring-steel-600" : "border-slate-200"}`}>
                        {!picking && (
                          <input
                            type="checkbox"
                            checked={isSel}
                            onChange={() => toggle(item.id)}
                            aria-label={`Chọn ${item.original}`}
                            className="absolute top-2 left-2 z-10 h-5 w-5 accent-steel-600 cursor-pointer"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => (picking ? onSelect?.(item) : toggle(item.id))}
                          className="aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden"
                          title={picking ? "Chọn ảnh này" : item.original}
                        >
                          {item.mime.startsWith("image/") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.path} alt={item.original} loading="lazy" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-slate-500">PDF</span>
                          )}
                        </button>
                        <div className="p-2 text-xs flex flex-col gap-1">
                          <p className="truncate font-medium text-slate-700" title={item.original}>{item.original}</p>
                          <p className="text-slate-400">{formatSize(item.size)}</p>
                          <p className={used.length ? "text-slate-600" : "text-amber-700"} title={used.map((u) => `${PAGES[u.page] ?? u.page} › ${SECTIONS[u.section] ?? u.section}`).join("\n")}>
                            {used.length ? `Đang dùng ở ${used.length} chỗ` : "Chưa dùng"}
                          </p>
                          <div className="flex items-center justify-between">
                            <button type="button" className="text-steel-600 hover:underline" onClick={() => navigator.clipboard?.writeText(item.path)}>
                              Chép đường dẫn
                            </button>
                            {!picking && <button type="button" className="text-red-600 hover:underline" onClick={() => remove(item)}>Xoá</button>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </section>
      ))}
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
