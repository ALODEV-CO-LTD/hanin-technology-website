"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type ToastKind = "success" | "error" | "info";
interface ToastItem {
  id: number;
  kind: ToastKind;
  text: string;
}

interface ToastApi {
  success: (text: string) => void;
  error: (text: string) => void;
  info: (text: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Thông báo nổi cho admin: hiện ở góc phải trên, không đẩy nội dung trang, tự biến mất. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, number>());

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const push = useCallback(
    (kind: ToastKind, text: string) => {
      const id = nextId.current++;
      // Tối đa 4 thông báo cùng lúc; thông báo trùng nội dung được thay thế để không chồng đống.
      setItems((list) => [...list.filter((t) => t.text !== text), { id, kind, text }].slice(-4));
      timers.current.set(id, window.setTimeout(() => dismiss(id), kind === "error" ? 7000 : 3500));
    },
    [dismiss],
  );

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => window.clearTimeout(t));
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      success: (text) => push("success", text),
      error: (text) => push("error", text),
      info: (text) => push("info", text),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
        {items.map((t) => (
          <div
            key={t.id}
            role={t.kind === "error" ? "alert" : "status"}
            className={`admin-toast pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ${
              t.kind === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : t.kind === "error"
                  ? "border-red-200 bg-red-50 text-red-900"
                  : "border-slate-200 bg-white text-slate-800"
            }`}
          >
            <span aria-hidden="true" className="mt-0.5 text-base leading-none">
              {t.kind === "success" ? "✓" : t.kind === "error" ? "!" : "i"}
            </span>
            <p className="flex-1 whitespace-pre-line font-medium leading-snug">{t.text}</p>
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Đóng thông báo" className="-mr-1 -mt-0.5 px-1 text-lg leading-none opacity-60 hover:opacity-100">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  // Ngoài provider (ví dụ trang đăng nhập) thì không làm gì, tránh lỗi.
  return ctx ?? { success: () => {}, error: () => {}, info: () => {} };
}

/** Biểu tượng xoay nhỏ cho nút đang xử lý. */
export function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-4 w-4 animate-spin ${className}`} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
