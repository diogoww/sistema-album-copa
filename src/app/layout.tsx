import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Toast } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Album Copa",
  description: "Controle completo de figurinhas da Copa do Mundo"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        <Providers>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
