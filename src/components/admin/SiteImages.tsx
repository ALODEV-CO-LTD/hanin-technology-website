"use client";

import { useEffect, useMemo, useState } from "react";
import { api, ApiError } from "./api";
import { MediaPickerModal } from "./MediaPicker";

interface Slot {
  key: string;
  url: string;
}

const PAGES: Record<string, string> = {
  home: "Trang chủ",
  "gioi-thieu": "Giới thiệu",
  "dich-vu": "Dịch vụ gia công mạ",
  "san-pham": "Sản phẩm & Dự án",
  "nang-luc": "Năng lực sản xuất",
  "tin-tuc": "Tin tức",
  "tuyen-dung": "Tuyển dụng",
  "lien-he": "Liên hệ",
  layout: "Logo (đầu trang & chân trang)",
};

export default function SiteImages() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [picking, setPicking] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);
  const [onlyChanged, setOnlyChanged] = useState(false);

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

  const groups = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots) {
      if (onlyChanged && !overrides[s.key]) continue;
      const page = s.key.split("/")[0];
      map.set(page, [...(map.get(page) ?? []), s]);
    }
    return [...map];
  }, [slots, onlyChanged, overrides]);

  async function save(key: string, url: string) {
    setError("");
    try {
      await api("site-images", { method: "PUT", body: { key, url } });
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không lưu được");
    }
  }

  async function resetAll() {
    if (!confirm(`Khôi phục TẤT CẢ ${changedCount} ảnh đã đổi về ảnh gốc?\nKhông thể hoàn tác.`)) return;
    try {
      await api("site-images", { method: "PUT", body: { resetAll: true } });
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không khôi phục được");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-5 text-sm">
        <label className="inline-flex items-center gap-2 h-9 px-3 rounded border border-slate-300 bg-white cursor-pointer">
          <input type="checkbox" checked={onlyChanged} onChange={(e) => setOnlyChanged(e.target.checked)} className="accent-steel-600" />
          Chỉ hiện ảnh đã đổi ({changedCount})
        </label>
        {changedCount > 0 && (
          <button onClick={resetAll} className="h-9 px-3 rounded border border-red-300 text-red-700 bg-white font-semibold">
            ↺ Khôi phục tất cả ảnh về gốc
          </button>
        )}
      </div>
      {onlyChanged && groups.length === 0 && <p className="text-sm text-slate-500">Chưa có ảnh nào được đổi.</p>}
      {error && <p role="alert" className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
      {groups.length === 0 && <p className="text-sm text-slate-500">Chưa có vị trí ảnh nào.</p>}
      {groups.map(([page, list]) => (
        <section key={page} className="mb-8">
          <h2 className="font-bold text-slate-900 mb-3">{PAGES[page] ?? page}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {list.map((slot) => {
              const current = overrides[slot.key] || slot.url;
              return (
                <div key={slot.key} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    {overrides[slot.key] && <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-400 text-amber-950 text-[11px] font-bold">Đã đổi</span>}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={current} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2.5 flex flex-col gap-2 text-xs">
                    <p className="text-slate-600 break-all" title={slot.key}>{slot.key.split("/").slice(1).join("/")}</p>
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
