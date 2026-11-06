"use client";

import { useEffect } from "react";

/**
 * Tiện ích a11y dùng chung cho MỌI modal/popup trong admin:
 *  - Nhấn Esc để đóng.
 *  - KHÓA CUỘN nền khi mở (body overflow hidden) - tránh nền trôi sau lớp phủ.
 *  - BÙ chiều rộng scrollbar (padding-right) để trang không "giật ngang" lúc
 *    thanh cuộn biến mất (đồng bộ pattern QueuePanel/LoginModal).
 *
 * Dùng: gọi `useModalA11y(open, onClose)` trong component modal. Khi `open`
 * chuyển false, mọi listener + khóa cuộn được gỡ sạch.
 *
 * Việc "bấm nền đóng" để cho lớp phủ (backdrop) tự xử lý onClick vì cần biết
 * chính xác phần tử nền - hook chỉ lo Esc + khóa cuộn (phần dùng chung nhất).
 */
export function useModalA11y(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);

    // Khóa cuộn nền + bù scrollbar - lưu giá trị cũ để phục hồi đúng khi đóng.
    const { body, documentElement: html } = document;
    const sbw = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open, onClose]);
}

export default useModalA11y;
