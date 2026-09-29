"use client";

import { useState } from "react";
import { PRODUCT_DETAIL_CONTENT } from "@/lib/products-data";

const { gallery } = PRODUCT_DETAIL_CONTENT;

export default function ProductGallery() {
  const [activeId, setActiveId] = useState(gallery[0].id);
  const active = gallery.find((item) => item.id === activeId) ?? gallery[0];

  return (
    <section className="w-full bg-slate-50 py-space-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
              HÌNH ẢNH CHI TIẾT &amp; KIỂM ĐỊNH THỰC TẾ
            </h2>
            <p className="text-body-md text-slate-600 mt-1">
              Bộ sưu tập hình ảnh phôi kim loại sau gia công mạ, mặt cắt hiển vi và kiểm tra đo
              lường chất lượng tại phòng Lab.
            </p>
          </div>
          <div className="flex items-center gap-space-xs text-label-technical text-slate-500 shrink-0">
            <span className="px-space-xs py-1 bg-white border border-slate-200 rounded text-slate-800 shadow-sm">
              {gallery.length} ẢNH CHẤT LƯỢNG CAO
            </span>
            <span className="px-space-xs py-1 bg-white border border-slate-200 rounded text-sky-700 shadow-sm font-semibold">
              ZOOM 40X OPTICAL
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-[21/9] bg-slate-100 border border-slate-200 rounded overflow-hidden mb-space-md group shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={active.alt} className="w-full h-full object-cover" src={active.image} />
          <div className="absolute top-space-sm right-space-sm flex items-center gap-space-xs">
            <button
              type="button"
              className="w-9 h-9 bg-white/90 backdrop-blur-md border border-slate-200 rounded text-slate-700 hover:text-steel-600 hover:border-steel-500 transition-all flex items-center justify-center shadow-sm"
              aria-label="Phóng to ảnh"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_in</span>
            </button>
            <button
              type="button"
              className="w-9 h-9 bg-white/90 backdrop-blur-md border border-slate-200 rounded text-slate-700 hover:text-steel-600 hover:border-steel-500 transition-all flex items-center justify-center shadow-sm"
              aria-label="Xem toàn màn hình"
            >
              <span className="material-symbols-outlined text-[18px]">fullscreen</span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-space-sm bg-gradient-to-t from-slate-950/80 via-slate-950/60 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-space-xs text-label-sm text-slate-200">
            <div className="flex items-center gap-space-sm">
              <span className="px-2 py-0.5 bg-steel-600 text-white font-mono rounded">
                FRAME #{String(active.id).padStart(2, "0")}
              </span>
              <span className="text-white text-title-md">{active.caption}</span>
            </div>
            <div className="flex items-center gap-space-md font-mono text-slate-300">
              <span>RES: 4K HIGH-DEF</span>
              <span>DATE: 2026-03-29</span>
              <span className="text-emerald-400 font-semibold">STATUS: APPROVED QA</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
          {gallery.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={
                  isActive
                    ? "text-left cursor-pointer p-1.5 bg-white rounded transition-all hover:shadow-md flex flex-col gap-1.5 shadow-sm border-steel-600 border-2"
                    : "text-left cursor-pointer p-1.5 bg-white border border-slate-200 rounded transition-all hover:border-steel-500 hover:shadow-md flex flex-col gap-1.5 shadow-sm"
                }
              >
                <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden rounded">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={item.alt} className="w-full h-full object-cover" src={item.image} />
                </div>
                <span
                  className={
                    isActive
                      ? "text-label-sm truncate text-steel-600 font-semibold"
                      : "text-label-sm truncate text-slate-600"
                  }
                >
                  {item.thumbLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
