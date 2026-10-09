"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import Photo from "@/components/ui/Photo";

export interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  thumbLabel: string;
  caption: string;
}

export default function ProductGalleryClient({ gallery }: { gallery: GalleryItem[] }) {
  const t = useTranslations("SanPham.ProductGallery");
  const [activeId, setActiveId] = useState(gallery[0].id);
  const [zoomed, setZoomed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const active = gallery.find((item) => item.id === activeId) ?? gallery[0];

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <section className="w-full bg-white py-space-xl border-b border-slate-200">
      <div className="mx-auto px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <h2 className="text-headline-lg text-slate-900 uppercase tracking-tight">
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] bg-slate-100 border border-slate-200 rounded overflow-hidden mb-space-md group shadow-sm" ref={frameRef}>
          <Photo alt={active.alt} className="w-full h-full object-cover" src={active.image} sizes="100vw" />
          <div className="absolute top-space-sm right-space-sm flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => setZoomed(true)}
              className="w-11 h-11 bg-white border border-slate-200 rounded text-slate-700 hover:text-steel-600 hover:border-steel-500 transition-all flex items-center justify-center shadow-sm"
              aria-label={t("zoomInAriaLabel")}
            >
              <Icon name="zoom_in" className="text-[18px]" />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="w-11 h-11 bg-white border border-slate-200 rounded text-slate-700 hover:text-steel-600 hover:border-steel-500 transition-all flex items-center justify-center shadow-sm"
              aria-label={t("fullscreenAriaLabel")}
            >
              <Icon name="fullscreen" className="text-[18px]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
          {gallery.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                type="button"
                key={item.id}
                aria-pressed={isActive}
                onClick={() => setActiveId(item.id)}
                className={
                  isActive
                    ? "text-left cursor-pointer p-1.5 bg-white rounded transition-all hover:shadow-md flex flex-col gap-1.5 shadow-sm border-steel-600 border-2"
                    : "text-left cursor-pointer p-1.5 bg-white border border-slate-200 rounded transition-all hover:border-steel-500 hover:shadow-md flex flex-col gap-1.5 shadow-sm"
                }
              >
                <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden rounded">
                  <Photo alt={item.alt} className="w-full h-full object-cover" src={item.image} />
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
      {zoomed && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setZoomed(false)}
        >
          <Photo alt={active.alt} src={active.image} sizes="100vw" className="max-h-full max-w-full object-contain rounded" />
          <button
            type="button"
            aria-label={t("closeAriaLabel")}
            className="absolute top-4 right-4 w-11 h-11 rounded bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center"
            onClick={() => setZoomed(false)}
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>
      )}
    </section>
  );
}
