import type { Metadata } from "next";
import "../../styles/globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "Epta Car Gerenciamento de Veículos",
  description: "Gerencie seus veículos de forma simples e eficiente",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex h-screen bg-gray-100 text-gray-800">
        <ToastProvider />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
