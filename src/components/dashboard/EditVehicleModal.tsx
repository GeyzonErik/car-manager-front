"use client";

import { VehicleService } from "@/services/vehicle.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const schema = z.object({
  model: z.string().min(2),
  plate: z
    .string()
    .min(3, "Car plate must be at least 3 characters long")
    .max(7, "Car plate must be at most 7 characters long"),
});

type FormData = z.infer<typeof schema>;

type Props = {
  vehicle: {
    id: string;
    model: string;
    plate: string;
  };
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditVehicleModal({
  vehicle,
  onClose,
  onUpdated,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue("model", vehicle.model);
    setValue("plate", vehicle.plate);
  }, [vehicle, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await VehicleService.updateVehicle(vehicle.id, {
        model: data.model,
        plate: data.plate,
      });
      onUpdated();
    } catch (err: any) {
      console.error("Error updating vehicle:", err);
      toast.error("Failed to update vehicle");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Veículo</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
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
            <label className="block text-sm font-medium">Placa</label>
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
