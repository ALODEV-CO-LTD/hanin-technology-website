"use client";

import { useState, type FormEvent } from "react";
import { api, ApiError } from "./api";
import SaveButton, { useSavedFlash } from "./SaveButton";
import { useToast } from "./Toast";

export default function PasswordForm() {
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const { saved, flash } = useSavedFlash();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("newPassword") !== data.get("confirm")) {
      toast.error("Mật khẩu nhập lại không khớp");
      return;
    }
    setSaving(true);
    try {
      await api("password", { method: "PUT", body: { currentPassword: data.get("currentPassword"), newPassword: data.get("newPassword") } });
      toast.success("Đã đổi mật khẩu.");
      flash();
      form.reset();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Không đổi được mật khẩu");
    } finally {
      setSaving(false);
    }
  }

  const input = "h-10 px-3 border border-slate-300 rounded bg-white text-sm";
  return (
    <form onSubmit={onSubmit} className="max-w-sm bg-white border border-slate-200 rounded-lg p-5 flex flex-col gap-3">
      <input name="currentPassword" type="password" required placeholder="Mật khẩu hiện tại" autoComplete="current-password" className={input} />
      <input name="newPassword" type="password" required minLength={10} placeholder="Mật khẩu mới (≥ 10 ký tự)" autoComplete="new-password" className={input} />
      <input name="confirm" type="password" required placeholder="Nhập lại mật khẩu mới" autoComplete="new-password" className={input} />
      <SaveButton saving={saving} saved={saved} savingText="Đang đổi" savedText="Đã đổi" className="w-full">Đổi mật khẩu</SaveButton>
    </form>
  );
}
