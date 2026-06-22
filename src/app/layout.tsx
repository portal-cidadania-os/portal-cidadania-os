import React from "react";
import { Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ============================================================
// Portal Cidadania OS — Layout Raiz
// Carrega fonte Sora, aplica Header 4 camadas + Footer
// ============================================================

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata = {
  title: {
    default: "Portal Cidadania",
    template: "%s | Portal Cidadania",
  },
  description: "Associação sem fins lucrativos — Apoio Social, Capacitação, Empregabilidade e Cidadania.",
  // PLACEHOLDER: Substitua pela URL real do portal após deploy
  metadataBase: new URL("https://portalcidadania.org.br"),
  openGraph: {
    title: "Portal Cidadania",
    description: "Associação sem fins lucrativos — Apoio Social, Capacitação e Cidadania.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body className={`${sora.className} antialiased min-h-screen flex flex-col bg-white text-black`}>
        {/* Header fixo 4 camadas */}
        <Header />

        {/* Conteúdo da rota */}
        <div className="flex-1 w-full">
          {children}
        </div>

        {/* Rodapé */}
        <Footer />
      </body>
    </html>
  );
}
