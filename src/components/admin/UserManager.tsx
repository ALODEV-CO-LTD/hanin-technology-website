"use client";

import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError } from "./api";
import Dropdown from "./Dropdown";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  active: number;
  lastLoginAt: string | null;
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const [version, setVersion] = useState(0);
  const [newRole, setNewRole] = useState("editor");

  useEffect(() => {
    let cancelled = false;
    api<{ items: User[] }>("users").then((data) => {
      if (!cancelled) setUsers(data.items);
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const guard = async (fn: () => Promise<unknown>) => {
    setError("");
    try {
      await fn();
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Thao tác thất bại");
    }
  };

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await guard(async () => {
      await api("users", { body: { ...Object.fromEntries(data), role: newRole } });
      form.reset();
    });
  }

  const input = "h-10 px-3 border border-slate-300 rounded bg-white text-sm";
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-1">Tài khoản quản trị</h1>
      <p className="text-sm text-slate-500 mb-5">Quản trị viên được quản lý tài khoản; biên tập viên chỉ sửa nội dung.</p>
      {error && <p role="alert" className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}

      <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 mb-8">
        {users.map((u) => (
          <div key={u.id} className="px-4 py-3 flex flex-wrap items-center gap-3 justify-between text-sm">
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 truncate">{u.name || u.email}</p>
              <p className="text-xs text-slate-500">{u.email} · {u.lastLoginAt ? `đăng nhập ${u.lastLoginAt.slice(0, 16)}` : "chưa đăng nhập"}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Dropdown
                className="w-40"
                ariaLabel="Vai trò"
                value={u.role}
                onChange={(v) => guard(() => api(`users/${u.id}`, { method: "PUT", body: { role: v } }))}
                options={[
                  { value: "admin", label: "Quản trị viên" },
                  { value: "editor", label: "Biên tập viên" },
                ]}
              />
              <button onClick={() => guard(() => api(`users/${u.id}`, { method: "PUT", body: { active: !u.active } }))} className="px-3 h-10 rounded border border-slate-300 bg-white text-xs whitespace-nowrap">
                {u.active ? "Khoá" : "Mở khoá"}
              </button>
              <button
                onClick={() => {
                  const password = prompt("Mật khẩu mới (tối thiểu 10 ký tự):");
                  if (password) void guard(() => api(`users/${u.id}`, { method: "PUT", body: { password } }));
                }}
                className="px-3 h-10 rounded border border-slate-300 bg-white text-xs whitespace-nowrap"
              >
                Đặt lại MK
              </button>
              <button onClick={() => confirm(`Xoá tài khoản ${u.email}?`) && guard(() => api(`users/${u.id}`, { method: "DELETE" }))} className="px-3 h-10 rounded border border-red-200 text-red-700 bg-white text-xs whitespace-nowrap">Xoá</button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-slate-900 mb-3">Thêm tài khoản</h2>
      <form onSubmit={create} className="bg-white border border-slate-200 rounded-lg p-4 grid sm:grid-cols-2 gap-3">
        <input name="email" type="email" required placeholder="Email" className={input} autoComplete="off" />
        <input name="name" placeholder="Họ tên" className={input} />
        <input name="password" type="password" required minLength={10} placeholder="Mật khẩu (≥ 10 ký tự)" className={input} autoComplete="new-password" />
        <Dropdown
          ariaLabel="Vai trò tài khoản mới"
          value={newRole}
          onChange={setNewRole}
          options={[
            { value: "editor", label: "Biên tập viên" },
            { value: "admin", label: "Quản trị viên" },
          ]}
        />
        <button className="h-10 px-5 rounded bg-steel-600 text-white font-semibold text-sm sm:col-span-2 sm:justify-self-start">Thêm</button>
      </form>
    </div>
  );
}
