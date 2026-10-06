"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  FlaskConical,
  FolderOpen,
  GalleryHorizontal,
  Images,
  Inbox,
  LayoutDashboard,
  Link2,
  Newspaper,
  Package,
  PenLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import { api } from "./api";

interface Props {
  user: { email: string; name: string; role: string };
  newInquiries: number;
  resources: { key: string; label: string; icon: string }[];
}

/** Icon Lucide cho từng mục (cùng bộ với website). */
const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  banners: GalleryHorizontal,
  services: FlaskConical,
  products: Package,
  posts: Newspaper,
  jobs: Briefcase,
  inquiries: Inbox,
  content: PenLine,
  "site-images": Images,
  media: FolderOpen,
  settings: Link2,
  users: Users,
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

  // Điện thoại: menu là ngăn kéo phủ lên từ trái; khoá cuộn trang nền và đóng bằng Esc / bấm nền mờ.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="lg:hidden flex items-center justify-between gap-3 bg-steel-950 text-white px-4 h-14 sticky top-0 z-30">
        <Link href="/admin" className="flex items-center gap-2 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hanin-logo.png" alt="HANIN" className="h-7 w-auto bg-white rounded-sm px-1.5 py-0.5" />
          <span className="font-bold tracking-wide truncate">CMS</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 h-9 px-3 rounded bg-white/10 text-sm"
          aria-expanded={open}
          aria-controls="admin-drawer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          Menu
        </button>
      </div>

      {open && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />}

      <aside
        id="admin-drawer"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[85%] max-w-72 lg:w-72 bg-steel-950 text-slate-200 overflow-y-auto transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Menu quản trị"
      >
        <div className="px-6 py-5 lg:py-6 border-b border-white/10 flex items-start justify-between gap-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hanin-logo.png" alt="HANIN" className="h-9 w-auto bg-white rounded-sm px-2 py-1 mb-3" />
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Quản trị website</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden h-9 w-9 shrink-0 inline-flex items-center justify-center rounded bg-white/10"
            aria-label="Đóng menu"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.title || "top"} className="flex flex-col gap-1">
              {group.title && (
                <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{group.title}</p>
              )}
              {group.items.map((item) => {
                const active = isActive(item.href);
                const NavIcon = ICONS[item.id] ?? ICONS.content;
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
                    <NavIcon className={`shrink-0 ${active ? "text-white" : "text-steel-300"}`} strokeWidth={1.75} width={20} height={20} aria-hidden="true" />
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
