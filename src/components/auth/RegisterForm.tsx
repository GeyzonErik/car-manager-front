"use client";

import { AuthService } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setFormError("");

    try {
      await AuthService.register(data);
      router.push("/login");
    } catch (error: any) {
      setFormError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded shadow-md w-96"
    >
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Nome</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Senha</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}

      <span className="text-sm text-gray-600 mb-4 block">
        Já tem uma conta?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Entrar
        </a>
      </span>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
