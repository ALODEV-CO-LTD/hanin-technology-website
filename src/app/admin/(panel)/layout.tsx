import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth";
import { get } from "@/server/db";
import { RESOURCES } from "@/server/cms/resources";
import Sidebar from "@/components/admin/Sidebar";
import Toaster from "@/components/ct999/thong-bao-toast/Toaster";
import DialogHost from "@/components/ct999/hop-thoai-promise/DialogHost";

export const dynamic = "force-dynamic";

/** Biến màu mà hai thành phần ct999 (hộp thoại, toast) đọc; giá trị theo bảng màu admin HANIN. */
const ADMIN_TOKENS = {
  "--cnn-red": "#dc2626",
  "--cnn-red-dark": "#b91c1c",
  "--cnn-black": "#0f172a",
  "--bg-soft": "#f1f5f9",
  "--text": "#0f172a",
  "--muted": "#64748b",
  "--border": "#e2e8f0",
  "--card": "#ffffff",
  "--card-soft": "#f8fafc",
} as React.CSSProperties;

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const newInquiries = Number(get<{ n: number }>("SELECT COUNT(*) AS n FROM inquiries WHERE status = 'new'")?.n ?? 0);

  return (
    <div className="min-h-screen" style={ADMIN_TOKENS}>
      <Sidebar
        user={user}
        newInquiries={newInquiries}
        resources={RESOURCES.map((r) => ({ key: r.key, label: r.label, icon: r.icon }))}
      />
      <main className="lg:pl-72 min-h-screen">
        <div className="w-full p-4 sm:p-8 xl:px-10">{children}</div>
      </main>
      <Toaster />
      <DialogHost />
    </div>
  );
}
