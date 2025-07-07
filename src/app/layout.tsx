import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "My App",
  description: "My description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
