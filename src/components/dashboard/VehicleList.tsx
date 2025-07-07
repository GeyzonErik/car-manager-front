"use client";

import { VehicleService } from "@/services/vehicle.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateVehicleModal from "./CreateVehicleModal";
import EditVehicleModal from "./EditVehicleModal";

type Vehicle = {
  id: string;
  model: string;
  plate: string;
  active: boolean;
};

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const itemsPerPage = 10;

  const fetchVehicles = () => {
    VehicleService.getAll()
      .then((res) => {
        setVehicles(res.data.vehicles);
        setVehicleCount(res.data.total);
        setCurrentPage(1);
      })
      .catch((err: any) => {
        toast.error("Failed to fetch vehicles");
        console.error("Error fetching vehicles:", err);
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  const paginated = vehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleArchive = async (vehicle: Vehicle) => {
    try {
      await VehicleService.toggleActive(vehicle.id, {
        active: !vehicle.active,
      });
      fetchVehicles();
      toast.success(
        vehicle.active
          ? "Veículo arquivado com sucesso!"
          : "Veículo reativado com sucesso!"
      );
    } catch (err: any) {
      console.error("Error toggling vehicle status:", err);
      toast.error("Failed to toggle vehicle status");
    }
  };

  const handleDelete = async (vehicleId: string) => {
    try {
      await VehicleService.deleteVehicle(vehicleId);
      fetchVehicles();
      toast.success("Veículo deletado com sucesso!");
    } catch (err: any) {
      console.error("Error deleting vehicle:", err);
      toast.error("Failed to delete vehicle");
    }
  };

  return (
    <div className="pl-8">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cadastrar Veículo
        </button>
      </div>

      <table className="mt-8 w-full table-auto bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Veículo</th>
            <th className="px-4 py-2 text-left">Placa</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((vehicle) => (
            <tr key={vehicle.id} className="border-t">
              <td className="px-4 py-2">{vehicle.model}</td>
              <td className="px-4 py-2">{vehicle.plate}</td>
              <td className="px-4 py-2">
                {vehicle.active ? (
                  <span className="text-green-600 font-semibold">Ativo</span>
                ) : (
                  <span className="text-red-500 font-semibold">Inativo</span>
                )}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => setVehicleToEdit(vehicle)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleArchive(vehicle)}
                  className="text-yellow-600 hover:underline"
                >
                  {vehicle.active ? "Arquivar" : "Reativar"}
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="text-red-600 hover:underline"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <span className="text-sm"> {vehicleCount} veículos</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      <CreateVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => {
          fetchVehicles();
          setIsModalOpen(false);
          toast.success("Veículo cadastrado com sucesso!");
        }}
      />

      {vehicleToEdit && (
        <EditVehicleModal
          vehicle={vehicleToEdit}
          onClose={() => setVehicleToEdit(null)}
          onUpdated={() => {
            fetchVehicles();
            setVehicleToEdit(null);
          }}
        />
      )}
    </div>
  );
}
