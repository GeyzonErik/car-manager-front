import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      const isAuthEndpoint = url.includes("/auth/login") || url.includes("/auth/register");
      
      if (!isAuthEndpoint) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
