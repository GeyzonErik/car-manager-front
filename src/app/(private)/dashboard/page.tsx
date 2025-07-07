import DashboardHeader from "@/components/dashboard/DashboardHeader";
import VehicleList from "@/components/dashboard/VehicleList";
import VehicleSummary from "@/components/dashboard/VehicleSummary";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStrore = await cookies();

  const token = cookieStrore.get("auth_token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div>
      <DashboardHeader />
      <VehicleSummary />
      <VehicleList />
    </div>
  );
}
