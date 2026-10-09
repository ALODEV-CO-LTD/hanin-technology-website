"use client";

import { useState, type ReactNode } from "react";

/** Khi chưa có file hồ sơ năng lực: bấm nút chỉ hiện thông báo, không chuyển trang. */
export default function ProfileUnavailable({ className, message, children }: { className?: string; message: string; children: ReactNode }) {
  const [shown, setShown] = useState(false);
  return (
    <span className="inline-flex flex-col items-start gap-space-xs">
      <button type="button" className={className} onClick={() => setShown(true)} aria-describedby={shown ? "profile-unavailable" : undefined}>
        {children}
      </button>
      {shown && (
        <span id="profile-unavailable" role="status" className="rounded border border-slate-300 bg-white px-space-sm py-1.5 text-body-sm text-slate-700">
          {message}
        </span>
      )}
    </span>
  );
}
