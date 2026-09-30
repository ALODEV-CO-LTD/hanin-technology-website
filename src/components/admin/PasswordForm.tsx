"use client";

import { useState, type FormEvent } from "react";
import { api, ApiError } from "./api";

export default function PasswordForm() {
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("newPassword") !== data.get("confirm")) return setMessage({ ok: false, text: "Mật khẩu nhập lại không khớp" });
    try {
      await api("password", { method: "PUT", body: { currentPassword: data.get("currentPassword"), newPassword: data.get("newPassword") } });
      setMessage({ ok: true, text: "Đã đổi mật khẩu." });
      form.reset();
    } catch (err) {
      setMessage({ ok: false, text: err instanceof ApiError ? err.message : "Không đổi được mật khẩu" });
    }
  }

  const input = "h-10 px-3 border border-slate-300 rounded bg-white text-sm";
  return (
    <form onSubmit={onSubmit} className="max-w-sm bg-white border border-slate-200 rounded-lg p-5 flex flex-col gap-3">
      <input name="currentPassword" type="password" required placeholder="Mật khẩu hiện tại" autoComplete="current-password" className={input} />
      <input name="newPassword" type="password" required minLength={10} placeholder="Mật khẩu mới (≥ 10 ký tự)" autoComplete="new-password" className={input} />
      <input name="confirm" type="password" required placeholder="Nhập lại mật khẩu mới" autoComplete="new-password" className={input} />
      {message && <p role="status" className={`text-sm ${message.ok ? "text-emerald-700" : "text-red-700"}`}>{message.text}</p>}
      <button className="h-10 rounded bg-steel-600 text-white font-semibold text-sm">Đổi mật khẩu</button>
    </form>
  );
}
