import React from "react";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Portal Cidadania",
  description: "Associação Sem Fins Lucrativos - Apoio e Empregabilidade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen flex flex-col bg-white">
        {/* Topo fixo integrado */}
        <Header />
        
        {/* Conteúdo da rota */}
        <div className="flex-1 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
