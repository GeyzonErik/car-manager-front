import VehiclesHistoryList from "@/components/reports/VehiclesHistoryList";

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Relatório de Atividades</h1>
      <VehiclesHistoryList />
    </div>
  );
}
