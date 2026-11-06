"use client";

import { useSyncExternalStore } from "react";
import { subscribe, getSnapshot, dismissToast, type Toast } from "./store";

const ICON: Record<Toast["kind"], React.ReactNode> = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

const STYLE: Record<Toast["kind"], string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-neutral-800 text-white",
};

// Snapshot rỗng ổn định cho SSR - tránh tạo mảng [] mới mỗi lần gọi (React coi
// là "đã đổi" vô hạn -> "getServerSnapshot should be cached" -> loop).
const EMPTY: Toast[] = [];
const getServerSnapshot = () => EMPTY;

/** Hàng toast nổi góc dưới-giữa màn hình. Mount 1 lần ở root layout. */
export default function Toaster() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (items.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[300] flex flex-col items-end gap-2 max-w-[92vw] pointer-events-none">
      {items.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-2.5 rounded-full pl-3 pr-2 py-2 shadow-lg text-sm font-semibold max-w-[92vw] ${STYLE[t.kind]}`}
          style={{ animation: "toastIn .18s ease-out" }}
        >
          <span className="shrink-0">{ICON[t.kind]}</span>
          <span className="truncate pr-1">{t.message}</span>
          {t.action && (
            <button
              type="button"
              onClick={() => { t.action!.run(); dismissToast(t.id); }}
              className="shrink-0 rounded-full bg-white/25 hover:bg-white/40 px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors"
            >
              {t.action.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Close"
            className="shrink-0 w-6 h-6 rounded-full hover:bg-white/20 grid place-items-center transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ))}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
