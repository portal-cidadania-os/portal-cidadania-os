"use client";

import React from "react";
import ListaCursos from "@/components/cursos/ListaCursos";

export default function CursosPage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Cabeçalho de Seção */}
        <div className="flex flex-col gap-2 border-b border-neutral-100 pb-6">
          <h2 className="text-2xl font-extrabold text-black tracking-tight">
            Catálogo de Cursos e Capacitações
          </h2>
          <p className="text-sm text-neutral-500 font-medium">
            Selecione uma das oportunidades abaixo para expandir suas habilidades e se qualificar para o mercado de trabalho.
          </p>
        </div>

        {/* Grid Injetado do Módulo de Componentes */}
        <ListaCursos />
        
      </div>
    </main>
  );
}
