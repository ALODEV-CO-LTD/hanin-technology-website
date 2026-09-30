import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth";
import { get } from "@/server/db";
import { RESOURCES } from "@/server/cms/resources";
import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const newInquiries = Number(get<{ n: number }>("SELECT COUNT(*) AS n FROM inquiries WHERE status = 'new'")?.n ?? 0);

  return (
    <div className="min-h-screen">
      <Sidebar
        user={user}
        newInquiries={newInquiries}
        resources={RESOURCES.map((r) => ({ key: r.key, label: r.label, icon: r.icon }))}
      />
      <main className="lg:pl-72 min-h-screen">
        <div className="w-full p-4 sm:p-8 xl:px-10">{children}</div>
      </main>
    </div>
  );
}
