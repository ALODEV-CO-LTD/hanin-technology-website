"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "./api";

interface Props {
  user: { email: string; name: string; role: string };
  newInquiries: number;
  resources: { key: string; label: string; icon: string }[];
}

export default function Sidebar({ user, newInquiries, resources }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/admin", label: "Tổng quan", icon: "dashboard" },
    ...resources.map((r) => ({ href: `/admin/${r.key}`, label: r.label, icon: r.icon })),
    { href: "/admin/inquiries", label: "Liên hệ & Ứng tuyển", icon: "inbox", badge: newInquiries },
    { href: "/admin/content", label: "Nội dung trang", icon: "edit_note" },
    { href: "/admin/media", label: "Thư viện ảnh", icon: "photo_library" },
    { href: "/admin/settings", label: "Liên kết & mạng xã hội", icon: "share" },
    ...(user.role === "admin" ? [{ href: "/admin/users", label: "Tài khoản quản trị", icon: "group" }] : []),
  ];

  async function logout() {
    await api("logout", { method: "POST", body: {} });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <>
      <div className="lg:hidden flex items-center justify-between bg-steel-950 text-white px-4 h-14 sticky top-0 z-30">
        <span className="font-bold tracking-wide">HANIN CMS</span>
        <button onClick={() => setOpen(!open)} className="px-3 py-1.5 rounded bg-white/10 text-sm" aria-expanded={open}>
          Menu
        </button>
      </div>
      <aside
        className={`${open ? "block" : "hidden"} lg:block lg:sticky lg:top-0 lg:h-screen w-full lg:w-64 shrink-0 bg-steel-950 text-slate-200 flex flex-col overflow-y-auto`}
      >
        <div className="hidden lg:block px-5 py-5 border-b border-white/10">
          <p className="text-white font-bold tracking-wide">HANIN CMS</p>
          <p className="text-xs text-slate-400">Quản trị website</p>
        </div>
        <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded px-3 py-2 text-sm transition-colors ${
                isActive(item.href) ? "bg-steel-600 text-white font-semibold" : "hover:bg-white/10"
              }`}
            >
              <span>{item.label}</span>
              {"badge" in item && item.badge ? (
                <span className="text-[11px] font-bold bg-red-500 text-white rounded-full px-2 py-0.5">{item.badge}</span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10 text-sm flex flex-col gap-2">
          <p className="truncate text-slate-300" title={user.email}>{user.name || user.email}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
            <Link href="/admin/account" className="hover:text-white">Đổi mật khẩu</Link>
            <a href="/" target="_blank" rel="noreferrer" className="hover:text-white">Xem website ↗</a>
            <button onClick={logout} className="hover:text-white">Đăng xuất</button>
          </div>
        </div>
      </aside>
    </>
  );
}
