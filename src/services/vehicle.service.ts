import { api } from "@/lib/api";

type CreateVehiclePayload = {
  model: string;
  plate: string;
};

type UpdateVehiclePayload = {
  model?: string;
  plate?: string;
};

type ToggleActivePayload = {
  active: boolean;
};

export const VehicleService = {
  createVehicle: (data: CreateVehiclePayload) => api.post("/vehicles", data),
  getAll: () => api.get("/vehicles"),
  getById: (id: string) => api.get(`/vehicles/${id}`),
  updateVehicle: (id: string, data: UpdateVehiclePayload) =>
    api.patch(`/vehicles/${id}`, data),
  deleteVehicle: (id: string) => api.delete(`/vehicles/${id}`),
  toggleActive: (id: string, data: ToggleActivePayload) =>
    api.patch(`/vehicles/${id}/toggle-active`, data),
  getSummary: () => api.get("/vehicles/status-summary"),
};
