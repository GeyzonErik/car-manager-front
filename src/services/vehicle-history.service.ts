import { api } from "@/lib/api";

export const VehicleHistoryService = {
  getAll: () => api.get("vehicles-history")
}