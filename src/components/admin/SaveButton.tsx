"use client";

import { useCallback, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Spinner } from "./Toast";

/** Giữ trạng thái "vừa lưu xong" trong một khoảng ngắn để nút hiện dấu ✓ rồi tự trở lại bình thường. */
export function useSavedFlash(ms = 1800) {
  const [saved, setSaved] = useState(false);
  const timer = useRef<number | null>(null);
  const flash = useCallback(() => {
    setSaved(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaved(false), ms);
  }, [ms]);
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);
  return { saved, flash };
}

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  saving?: boolean;
  saved?: boolean;
  children?: ReactNode;
  savingText?: string;
  savedText?: string;
}

/**
 * Nút lưu cho admin: độ rộng cố định (không co giãn khi đổi chữ), có vòng xoay khi đang lưu,
 * hiện "✓ Đã lưu" ngắn sau khi xong, và chặn bấm nhiều lần.
 */
export default function SaveButton({ saving, saved, children = "Lưu", savingText = "Đang lưu", savedText = "Đã lưu", className = "", disabled, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || saving}
      aria-busy={saving || undefined}
      className={`inline-flex h-10 min-w-[8.5rem] items-center justify-center gap-2 rounded px-6 text-sm font-semibold text-white transition-colors duration-200 disabled:cursor-not-allowed ${
        saved ? "bg-emerald-600" : "bg-steel-600 hover:bg-steel-700"
      } ${saving ? "opacity-80" : "disabled:opacity-50"} ${className}`}
    >
      {saving ? (
        <>
          <Spinner />
          <span>{savingText}</span>
        </>
      ) : saved ? (
        <>
          <span aria-hidden="true">✓</span>
          <span>{savedText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
