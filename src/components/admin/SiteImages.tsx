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
  layout: "Đầu trang / Chân trang",
};

export default function SiteImages() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [picking, setPicking] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

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

  const groups = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const s of slots) {
      const page = s.key.split("/")[0];
      map.set(page, [...(map.get(page) ?? []), s]);
    }
    return [...map];
  }, [slots]);

  async function save(key: string, url: string) {
    setError("");
    try {
      await api("site-images", { method: "PUT", body: { key, url } });
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không lưu được");
    }
  }

  return (
    <div>
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
                  <div className="aspect-[4/3] bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={current} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2.5 flex flex-col gap-2 text-xs">
                    <p className="text-slate-600 break-all" title={slot.key}>{slot.key.split("/").slice(1).join("/")}</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setPicking(slot.key)} className="px-2.5 h-8 rounded bg-steel-600 text-white font-semibold">Đổi ảnh</button>
                      {overrides[slot.key] && (
                        <button onClick={() => save(slot.key, "")} className="px-2.5 h-8 rounded border border-slate-300 bg-white">Ảnh gốc</button>
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
