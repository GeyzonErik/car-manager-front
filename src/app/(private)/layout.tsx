import type { Metadata } from "next";
import "../../styles/globals.css";
import Link from "next/link";
import { ToastProvider } from "@/components/ui/ToastProvider";
import UserMenu from "@/components/ui/UserMenu";

export const metadata: Metadata = {
  title: "Epta Car Gerenciamento de Veículos",
  description: "Gerencie seus veículos de forma simples e eficiente",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="h-screen bg-gray-100 text-gray-800">
        <ToastProvider />

        <div className="flex h-full">
          <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
            <h2 className="text-xl font-bold mb-6">EptaCar</h2>
            <nav className="space-y-4">
              <Link href="/dashboard" className="block hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/reports" className="block hover:text-blue-600">
                Relatórios
              </Link>
            </nav>
          </aside>

          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex justify-end items-center px-4 py-2 shadow bg-white">
              <UserMenu />
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
