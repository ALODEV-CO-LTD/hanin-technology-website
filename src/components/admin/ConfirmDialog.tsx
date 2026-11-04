"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export interface ConfirmOptions {
  /** Câu hỏi chính, đậm. */
  title: string;
  /** Giải thích thêm (hậu quả, có hoàn tác được không); xuống dòng bằng \n. */
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Hành động nguy hiểm (xoá): nút xác nhận màu đỏ và mặc định chọn sẵn nút Huỷ. */
  danger?: boolean;
}

type Ask = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<Ask | null>(null);

/** Hộp xác nhận ở giữa màn hình cho admin, thay cho confirm() của trình duyệt. Trả về Promise<boolean>. */
export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ options: ConfirmOptions; resolve: (ok: boolean) => void } | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const okRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const ask = useCallback<Ask>(
    (options) =>
      new Promise<boolean>((resolve) => {
        returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setState({ options, resolve });
      }),
    [],
  );

  const close = useCallback(
    (ok: boolean) => {
      state?.resolve(ok);
      setState(null);
      returnFocus.current?.focus();
    },
    [state],
  );

  useEffect(() => {
    if (!state) return;
    (state.options.danger ? cancelRef.current : okRef.current)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(false);
      } else if (e.key === "Tab") {
        const first = cancelRef.current;
        const last = okRef.current;
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, close]);

  const value = useMemo(() => ask, [ask]);
  const o = state?.options;

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {o ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/45 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close(false);
          }}
        >
          <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby={o.message ? "confirm-message" : undefined} className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-2xl">
            <span
              aria-hidden="true"
              className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold ${o.danger ? "bg-red-50 text-red-600" : "bg-sky-50 text-sky-600"}`}
            >
              {o.danger ? "!" : "?"}
            </span>
            <h2 id="confirm-title" className="text-base font-semibold leading-snug text-slate-900 break-words">
              {o.title}
            </h2>
            {o.message ? (
              <p id="confirm-message" className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {o.message}
              </p>
            ) : null}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
              <button ref={cancelRef} type="button" onClick={() => close(false)} className="h-10 min-w-28 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
                {o.cancelLabel ?? "Huỷ"}
              </button>
              <button
                ref={okRef}
                type="button"
                onClick={() => close(true)}
                className={`h-10 min-w-28 rounded-lg px-4 text-sm font-semibold text-white ${o.danger ? "bg-red-600 hover:bg-red-700" : "bg-sky-600 hover:bg-sky-700"}`}
              >
                {o.confirmLabel ?? (o.danger ? "Xoá" : "Đồng ý")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ConfirmContext.Provider>
  );
}

/** Dùng: `const confirm = useConfirm(); if (!(await confirm({ title: "Xoá…?", danger: true }))) return;` */
export function useConfirm(): Ask {
  const ctx = useContext(ConfirmContext);
  // Ngoài provider thì từ chối an toàn (không thực hiện hành động).
  return ctx ?? (async () => false);
}
