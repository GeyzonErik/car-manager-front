"use client";

import { VehicleService } from "@/services/vehicle.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VehicleSummary() {
  const [summary, setSummary] = useState<{
    total: number;
    active: number;
    inactive: number;
  } | null>(null);

  useEffect(() => {
    VehicleService.getSummary()
      .then((res) => setSummary(res.data))
      .catch((err: any) => {
        toast.error("Failed to fetch vehicle summary");

        console.error("Error fetching vehicle summary:", err);

        setSummary({
          total: 0,
          active: 0,
          inactive: 0,
        });
      });
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600">Total</p>
          <p className="text-3xl font-bold">{summary.total}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600">Ativos</p>
          <p className="text-3xl font-bold text-green-600">{summary.active}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600">Inativos</p>
          <p className="text-3xl font-bold text-red-500">{summary.inactive}</p>
        </div>
      </div>
    </div>
  );
}
