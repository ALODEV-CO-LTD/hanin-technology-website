"use client";

import { useEffect, useMemo, useState } from "react";
import { api, ApiError } from "./api";
import { MediaPickerModal } from "./MediaPicker";
import { toast } from "@/components/ct999/thong-bao-toast/store";
import { confirm } from "./dialog";
import { PAGES, SECTIONS, PAGE_ORDER, humanize, parseSlotKey as parse } from "./image-labels";

interface Slot {
  key: string;
  url: string;
}

export default function SiteImages() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [picking, setPicking] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);
  const [onlyChanged, setOnlyChanged] = useState(false);
  const [activePage, setActivePage] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    api<{ slots: Slot[]; overrides: Record<string, string> }>("site-images").then((d) => {
      if (cancelled) return;
      setSlots(d.slots);
      setOverrides(d.overrides);
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const changedCount = slots.filter((s) => overrides[s.key]).length;

  const pageCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const sl of slots) {
      const page = sl.key.split("/")[0];
      m.set(page, (m.get(page) ?? 0) + 1);
    }
    return m;
  }, [slots]);

  const pageList = useMemo(
    () => [...pageCounts.keys()].sort((a, b) => (PAGE_ORDER.indexOf(a) + 1 || 99) - (PAGE_ORDER.indexOf(b) + 1 || 99)),
    [pageCounts],
  );

  /** trang lớn -> khối -> nhóm con -> vị trí */
  const tree = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pages = new Map<string, Map<string, Map<string, Slot[]>>>();
    for (const sl of slots) {
      if (onlyChanged && !overrides[sl.key]) continue;
      const info = parse(sl.key);
      if (activePage !== "all" && info.page !== activePage) continue;
      if (q && !`${sl.key} ${PAGES[info.page] ?? ""} ${SECTIONS[info.section] ?? ""} ${humanize(info.sub)}`.toLowerCase().includes(q)) continue;
      const sections = pages.get(info.page) ?? new Map<string, Map<string, Slot[]>>();
      const subs = sections.get(info.section) ?? new Map<string, Slot[]>();
      subs.set(info.sub, [...(subs.get(info.sub) ?? []), sl]);
      sections.set(info.section, subs);
      pages.set(info.page, sections);
    }
    return [...pages].sort((a, b) => (PAGE_ORDER.indexOf(a[0]) + 1 || 99) - (PAGE_ORDER.indexOf(b[0]) + 1 || 99));
  }, [slots, onlyChanged, overrides, activePage, query]);

  async function save(key: string, url: string) {
    setError("");
    try {
      await api("site-images", { method: "PUT", body: { key, url } });
      toast.success(url ? "Đã lưu ảnh. Website cập nhật ngay." : "Đã khôi phục ảnh gốc.");
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không lưu được");
      toast.error(err instanceof ApiError ? err.message : "Không lưu được");
    }
  }

  async function resetAll() {
    if (!(await confirm({ title: `Khôi phục tất cả ${changedCount} ảnh về ảnh gốc?`, message: "Mọi ảnh đã đổi sẽ quay về ảnh mặc định. Không thể hoàn tác.", confirmLabel: "Khôi phục", danger: true }))) return;
    try {
      await api("site-images", { method: "PUT", body: { resetAll: true } });
      toast.success("Đã khôi phục tất cả ảnh về ảnh gốc.");
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không khôi phục được");
      toast.error(err instanceof ApiError ? err.message : "Không khôi phục được");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-5 text-sm">
        <label className="inline-flex items-center gap-2 h-9 px-3 rounded border border-slate-300 bg-white cursor-pointer">
          <input type="checkbox" checked={onlyChanged} onChange={(e) => setOnlyChanged(e.target.checked)} className="accent-steel-600" />
          Chỉ hiện ảnh đã đổi ({changedCount})
        </label>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo trang, khối, dịch vụ…"
          className="h-9 px-3 rounded border border-slate-300 bg-white w-64"
          aria-label="Tìm vị trí ảnh"
        />
        {changedCount > 0 && (
          <button onClick={resetAll} className="h-9 px-3 rounded border border-red-300 text-red-700 bg-white font-semibold">
            ↺ Khôi phục tất cả ảnh về gốc
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="Chọn trang">
        {[["all", "Tất cả trang", slots.length], ...pageList.map((p) => [p, PAGES[p] ?? p, pageCounts.get(p) ?? 0] as const)].map(([id, name, n]) => (
          <button
            key={id}
            role="tab"
            aria-selected={activePage === id}
            onClick={() => setActivePage(String(id))}
            className={`h-9 px-3 rounded border text-sm ${activePage === id ? "bg-steel-600 border-steel-600 text-white font-semibold" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}
          >
            {name} <span className={activePage === id ? "text-white/80" : "text-slate-400"}>({n})</span>
          </button>
        ))}
      </div>
      {error && <p role="alert" className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      {tree.length === 0 && <p className="text-sm text-slate-500">{onlyChanged ? "Chưa có ảnh nào được đổi." : "Không có vị trí ảnh nào khớp."}</p>}
      {tree.map(([page, sections]) => (
        <section key={page} className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b-2 border-steel-600">{PAGES[page] ?? page}</h2>
          {[...sections].map(([section, subs]) => {
            const count = [...subs.values()].reduce((n, l) => n + l.length, 0);
            return (
              <details key={section} open={activePage !== "all" || tree.length === 1} className="mb-4 bg-slate-50 border border-slate-200 rounded-lg">
                <summary className="px-4 py-2.5 cursor-pointer font-semibold text-slate-800 text-sm">
                  {SECTIONS[section] ?? section.split("/")[1]} <span className="font-normal text-slate-400">({count} ảnh)</span>
                </summary>
                <div className="px-3 pb-3">
                  {[...subs].map(([sub, list]) => (
                    <div key={sub} className="mt-2">
                      {sub && <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2 mt-3">{humanize(sub)}</h3>}
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                        {list.map((slot) => {
                          const current = overrides[slot.key] || slot.url;
                          return (
                            <div key={slot.key} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
                              <div className="aspect-[4/3] bg-slate-100 relative">
                                {overrides[slot.key] && <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-400 text-amber-950 text-[11px] font-bold">Đã đổi</span>}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={current} alt="" loading="lazy" className="w-full h-full object-cover" />
                              </div>
                              <div className="p-2.5 flex flex-col gap-2 text-xs">
                                <p className="text-slate-700 break-all" title={slot.key}>{parse(slot.key).label}</p>
                                <div className="flex flex-wrap gap-2">
                                  <button onClick={() => setPicking(slot.key)} className="px-2.5 h-8 rounded bg-steel-600 text-white font-semibold">Đổi ảnh</button>
                                  {overrides[slot.key] && (
                                    <button onClick={() => save(slot.key, "")} className="px-2.5 h-8 rounded border border-slate-300 bg-white">↺ Khôi phục ảnh gốc</button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </section>
      ))}
      {picking && (
        <MediaPickerModal
          onClose={() => setPicking(null)}
          onSelect={(item) => {
            void save(picking, item.path);
            setPicking(null);
          }}
        />
      )}
    </div>
  );
}
