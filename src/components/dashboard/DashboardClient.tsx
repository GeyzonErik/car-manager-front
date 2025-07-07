import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import VehicleList from "./VehicleList";
import VehicleSummary from "./VehicleSummary";

export default function DashboardClient() {
  const [refreshSummary, setRefreshSummary] = useState(0);

  return (
    <div>
      <DashboardHeader />
      <VehicleSummary refresh={refreshSummary} />
      <VehicleList onChange={() => setRefreshSummary((v) => v + 1)} />
    </div>
  );
}
