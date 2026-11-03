"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";

/**
 * Nút trên thanh liên hệ nổi, bấm mở cửa sổ nhỏ của WeChat / KakaoTalk.
 * Có ảnh QR từ CMS thì hiện ảnh; chưa có thì hiện ID / số điện thoại kèm nút sao chép (không tạo mã QR).
 */
export default function SocialQrPopup({
  channel,
  icon,
  contactId,
  qrSrc,
  buttonClassName,
  label,
}: {
  channel: "wechat" | "kakao";
  icon: string;
  contactId: string;
  qrSrc: string;
  buttonClassName: string;
  /** Chữ thay cho icon trên nút (ví dụ "TALK"). */
  label?: string;
}) {
  const t = useTranslations("HomeContact.Social");
  const name = t(channel);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setCopied(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("button, a[href]");
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
      setCopied(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, close]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(contactId);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = contactId;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* không sao chép được: số vẫn hiển thị để người dùng tự chép */
      }
      ta.remove();
    }
    setCopied(true);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={name}
        title={name}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        className={buttonClassName}
      >
        {label ? <span aria-hidden="true">{label}</span> : <Icon name={icon} className="text-[22px]" />}
      </button>
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed right-12 top-1/2 z-50 w-72 max-w-[calc(100vw-4rem)] -translate-y-1/2 rounded-lg border border-slate-200 bg-white p-space-md text-left shadow-lg"
        >
          <div className="flex items-start justify-between gap-space-sm">
            <h2 id={titleId} className="text-title-md font-bold text-slate-900">
              {name}
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded text-slate-600 hover:text-steel-600"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>
          {qrSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrSrc} alt={t("qrAlt", { name })} loading="lazy" className="mx-auto mt-space-sm aspect-square w-48 rounded border border-slate-200 object-contain" />
              <p className="mt-space-sm text-body-sm text-slate-600">{t("qrHint", { name })}</p>
            </>
          ) : (
            <p className="mt-space-sm text-body-sm text-slate-600">{t("noQrHint", { name })}</p>
          )}
          <div className="mt-space-sm flex items-center justify-between gap-space-sm rounded border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="min-w-0">
              <p className="text-label-sm uppercase text-slate-600">{t("idLabel")}</p>
              <p className="text-title-md font-bold text-slate-900">{contactId}</p>
            </div>
            <button
              type="button"
              onClick={copy}
              className="min-h-11 shrink-0 rounded border border-slate-200 bg-white px-3 text-label-technical font-semibold text-slate-800 hover:bg-slate-100"
            >
              {t("copy")}
            </button>
          </div>
          <p role="status" aria-live="polite" className="mt-1 min-h-5 text-body-sm font-semibold text-emerald-800">
            {copied ? t("copied") : ""}
          </p>
          <p className="text-body-sm text-slate-600">{t(channel === "wechat" ? "wechatHow" : "kakaoHow", { id: contactId })}</p>
        </div>
      ) : null}
    </>
  );
}
