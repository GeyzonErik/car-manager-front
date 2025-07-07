import { api } from "@/lib/api";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export const AuthService = {
  login: (data: LoginPayload) => api.post("auth/login", data),
  logout: () => api.post("auth/logout"),
  register: (data: RegisterPayload) => api.post("auth/register", data),
};
