"use client";
import { UserService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    UserService.getUser()
      .then((res) => setUserName(res.data.name))
      .catch((err: any) => {
        console.error("Error fetching user data:", err);
        setUserName("Usuário");
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Olá, {userName}</h1>
      <p className="text-gray-600">Bem-vindo ao seu painel de controle!</p>
    </div>
  );
}
