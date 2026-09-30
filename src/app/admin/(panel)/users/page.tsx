import { redirect } from "next/navigation";
import UserManager from "@/components/admin/UserManager";
import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const user = await getCurrentUser();
  if (user?.role !== "admin") redirect("/admin");
  return <UserManager />;
}
