"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "react-toastify";
import { VehicleService } from "@/services/vehicle.service";

const createVehicleSchema = z.object({
  model: z.string().min(2, "Car model must be at least 2 characters long"),
  plate: z
    .string()
    .min(3, "Car plate must be at least 3 characters long")
    .max(7, "Car plate must be at most 7 characters long"),
});

type FormData = z.infer<typeof createVehicleSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateVehicleModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createVehicleSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await VehicleService.createVehicle(data);
      reset();
      onCreated();
      onClose();
    } catch (err: any) {
      console.error("Error creating vehicle:", err);
      toast.error("Failed to create vehicle");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Cadastrar Veículo</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome do Veículo</label>
            <input
              type="text"
              {...register("model")}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Placa do Veículo
            </label>
            <input
              type="text"
              {...register("plate")}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.plate && (
              <p className="text-red-500 text-sm">{errors.plate.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
