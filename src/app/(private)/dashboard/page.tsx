import DashboardClient from "@/components/dashboard/DashboardClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStrore = await cookies();

  const token = cookieStrore.get("auth_token");

  if (!token) {
    redirect("/login");
  }

  return <DashboardClient />;
}
