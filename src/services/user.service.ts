import { api } from "@/lib/api";

type UpdateUserPayload = {
  name?: string;
};

export const UserService = {
  getUser: () => api.get("users"),
  updateUser: (data: UpdateUserPayload) => api.patch("/users", data),
};
