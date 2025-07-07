"use client";
import { VehicleHistoryService } from "@/services/vehicle-history.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type HistoryItem = {
  id: string;
  description: string;
};

export default function VehiclesHistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const fetchHistory = async () => {
    try {
      const res = await VehicleHistoryService.getAll();
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to fetch history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-4">
      <ul className="bg-white shadow-md rounded-lg p-4">
        {history.length > 0 ? (
          history.map((item) => (
            <li key={item.id} className="py-2 border-b last:border-b-0">
              {item.description}
            </li>
          ))
        ) : (
          <li className="text-gray-500">Nenhum histórico encontrado.</li>
        )}
      </ul>
    </div>
  );
}
