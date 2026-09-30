"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { api, ApiError } from "./api";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await api("login", { body: { email: form.get("email"), password: form.get("password") } });
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Không đăng nhập được");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="lg-form">
      <div className="lg-field">
        <label htmlFor="lg-email">Tài khoản</label>
        <input id="lg-email" name="email" type="text" required autoComplete="username" autoFocus className="lg-input" />
      </div>
      <div className="lg-field">
        <label htmlFor="lg-pass">Mật khẩu</label>
        <input id="lg-pass" name="password" type="password" required autoComplete="current-password" className="lg-input" />
      </div>
      {error && <p role="alert" className="lg-err">{error}</p>}
      <button className="lg-btn" disabled={busy}>{busy ? "Đang đăng nhập…" : "Đăng nhập"}</button>
    </form>
  );
}
