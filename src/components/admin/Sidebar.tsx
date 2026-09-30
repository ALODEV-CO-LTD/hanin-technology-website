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

/** Đường nét icon 24x24 (stroke). */
const ICONS: Record<string, string> = {
  dashboard: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  banners: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01",
  services: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3",
  products: "M12 3l8 4v10l-8 4-8-4V7zM4 7l8 4 8-4M12 11v10",
  posts: "M5 4h11v16H5zM16 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h5",
  jobs: "M3 8h18v12H3zM9 8V5h6v3M3 13h18",
  inquiries: "M3 13l2.5-8h13L21 13v6H3zM3 13h5l1 2.5h6l1-2.5h5",
  content: "M4 20l1-4L16 5l3 3L8 19zM14 7l3 3",
  "site-images": "M4 5h16v14H4zM4 15l4-4 3 3 4-4 5 5M9 9h.01",
  media: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  settings: "M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 11a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 19.7l1-1",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M17 8.5a2.5 2.5 0 1 1 0 5M18 15.2c1.9.5 3 2 3 4.8",
};

const DESCRIPTIONS: Record<string, string> = {
  dashboard: "Số liệu và yêu cầu mới",
  banners: "Ảnh đầu trang của từng trang",
  services: "Danh mục dịch vụ gia công mạ",
  products: "Sản phẩm và dự án tiêu biểu",
  posts: "Bài viết, bản tin kỹ thuật",
  jobs: "Vị trí đang tuyển dụng",
  inquiries: "Báo giá, liên hệ, hồ sơ ứng tuyển",
  content: "Sửa tiêu đề, mô tả, văn bản cố định",
  "site-images": "Đổi ảnh minh họa trong các khối",
  media: "Ảnh và PDF đã tải lên",
  settings: "Zalo, Facebook, YouTube, bản đồ",
  users: "Thêm, khoá, đặt lại mật khẩu",
};

interface Item {
  id: string;
  href: string;
  label: string;
  badge?: number;
}

export default function Sidebar({ user, newInquiries, resources }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const groups: { title: string; items: Item[] }[] = [
    { title: "", items: [{ id: "dashboard", href: "/admin", label: "Tổng quan" }] },
    {
      title: "Nội dung website",
      items: [
        ...resources.map((r) => ({ id: r.key, href: `/admin/${r.key}`, label: r.label })),
        { id: "content", href: "/admin/content", label: "Nội dung trang" },
        { id: "site-images", href: "/admin/site-images", label: "Hình ảnh trang" },
      ],
    },
    { title: "Tiếp nhận", items: [{ id: "inquiries", href: "/admin/inquiries", label: "Liên hệ & Ứng tuyển", badge: newInquiries }] },
    {
      title: "Hệ thống",
      items: [
        { id: "media", href: "/admin/media", label: "Thư viện ảnh" },
        { id: "settings", href: "/admin/settings", label: "Liên kết & mạng xã hội" },
        ...(user.role === "admin" ? [{ id: "users", href: "/admin/users", label: "Tài khoản quản trị" }] : []),
      ],
    },
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
        className={`${open ? "flex" : "hidden"} lg:flex flex-col lg:fixed lg:left-0 lg:top-0 lg:h-screen w-full lg:w-72 z-20 bg-steel-950 text-slate-200 overflow-y-auto`}
      >
        <div className="hidden lg:block px-6 py-6 border-b border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hanin-logo.png" alt="HANIN" className="h-9 w-auto bg-white rounded-sm px-2 py-1 mb-3" />
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Quản trị website</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.title || "top"} className="flex flex-col gap-1">
              {group.title && (
                <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{group.title}</p>
              )}
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
                      active ? "bg-steel-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className={`w-5 h-5 shrink-0 ${active ? "text-white" : "text-steel-300"}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={ICONS[item.id] ?? ICONS.content} />
                    </svg>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-tight">{item.label}</span>
                      <span className={`block text-xs leading-snug mt-0.5 truncate ${active ? "text-steel-100" : "text-slate-500 group-hover:text-slate-400"}`}>
                        {DESCRIPTIONS[item.id]}
                      </span>
                    </span>
                    {item.badge ? (
                      <span className="text-[11px] font-bold bg-red-500 text-white rounded-full px-2 py-0.5">{item.badge}</span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/10 text-sm flex flex-col gap-2">
          <p className="truncate text-slate-200 font-semibold" title={user.email}>{user.name || user.email}</p>
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
