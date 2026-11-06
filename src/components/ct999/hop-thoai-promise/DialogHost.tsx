"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useModalA11y } from "./useModalA11y";
import {
  closeDialog,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "./store";

/**
 * NOI VE hop thoai dung chung. Gan MOT lan o app/layout.tsx (canh <Toaster/>),
 * sau do moi noi chi can goi `ask.confirm(...)` - khong phai dung markup lai.
 *
 * Thiet ke bam theo LoginModal cho dong bo: lop phu den mo + blur nhe, hop bo goc,
 * tren dien thoai truot len tu DAY man hinh (de voi ngon tay cai), tren may tinh
 * thi canh giua. Mau lay tu bien CSS nen tu dong dung ca nen sang lan nen toi.
 */
export default function DialogHost() {
  const req = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  const open = !!req;
  const cancel = () => closeDialog(req?.kind === "prompt" ? null : false);
  // Esc + khoa cuon nen: dung chung hook voi moi modal khac trong admin.
  useModalA11y(open, cancel);

  /**
   * Moi lan mo: nap lai gia tri mac dinh va DAT CON TRO vao dung cho.
   * - prompt -> vao o nhap, boi den san chu cu (go de len duoc ngay).
   * - confirm/alert -> vao nut dong y, de bam Enter la xong, khong can chuot.
   */
  useEffect(() => {
    if (!req) return;
    setValue(req.defaultValue ?? "");
    const t = window.setTimeout(() => {
      if (req.kind === "prompt") {
        inputRef.current?.focus();
        inputRef.current?.select();
      } else {
        confirmRef.current?.focus();
      }
    }, 30);
    return () => window.clearTimeout(t);
  }, [req]);

  if (!req) return null;

  const isPrompt = req.kind === "prompt";
  const isAlert = req.kind === "alert";
  // Nut dong y mo khi o nhap bat buoc ma con trong - tranh gui du lieu rong.
  const blocked = isPrompt && !!req.required && !value.trim();

  const submit = () => {
    if (blocked) return;
    closeDialog(isPrompt ? value : true);
  };

  const confirmLabel =
    req.confirmLabel ?? (isAlert ? "Got it" : isPrompt ? "Done" : "OK");

  return (
    <>
      <div
        className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-[2px]"
        onClick={cancel}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[191] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="qmvn-dialog-title"
          aria-describedby={req.message ? "qmvn-dialog-desc" : undefined}
          className="pointer-events-auto w-full sm:max-w-[26rem] bg-[var(--card)] text-[var(--cnn-black)] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Thanh keo nho - dau hieu quen thuoc cua tam truot tren dien thoai. */}
          <div className="sm:hidden flex justify-center pt-2.5 pb-1">
            <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
          </div>

          <div className="px-5 pt-4 pb-1">
            <h2
              id="qmvn-dialog-title"
              className="text-[15px] font-semibold leading-snug"
            >
              {req.title}
            </h2>
            {req.message && (
              <p
                id="qmvn-dialog-desc"
                className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)] whitespace-pre-line"
              >
                {req.message}
              </p>
            )}
          </div>

          {isPrompt && (
            <div className="px-5 pt-3">
              {req.multiline ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={req.placeholder}
                  rows={4}
                  className="w-full resize-y border border-[var(--border)] focus:border-[var(--cnn-red)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--cnn-red)_18%,transparent)] outline-none px-3 py-2.5 text-sm bg-[var(--card-soft)] rounded-lg transition-shadow"
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={req.placeholder}
                  /* Enter = dong y, cho thao tac nhanh bang ban phim. */
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); submit(); }
                  }}
                  className="w-full border border-[var(--border)] focus:border-[var(--cnn-red)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--cnn-red)_18%,transparent)] outline-none px-3 py-2.5 text-sm bg-[var(--card-soft)] rounded-lg transition-shadow"
                />
              )}
            </div>
          )}

          <div className="flex gap-2 px-5 pt-4 pb-5 sm:justify-end">
            {!isAlert && (
              <button
                type="button"
                onClick={cancel}
                className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold rounded-lg border border-[var(--border)] hover:bg-[var(--card-soft)] transition-colors"
              >
                {req.cancelLabel ?? "Cancel"}
              </button>
            )}
            <button
              ref={confirmRef}
              type="button"
              onClick={submit}
              disabled={blocked}
              className={
                "flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed " +
                (req.danger
                  ? "bg-[var(--cnn-red)] hover:bg-[var(--cnn-red-dark)]"
                  : "bg-[var(--cnn-black)] hover:opacity-90")
              }
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
