"use client";

import React from "react";
import { useParams } from "next/navigation";
import DetalhesCurso from "@/components/cursos/DetalhesCurso";

export default function CursoDetalhePage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Link de Retorno Rápido */}
        <div className="w-full">
          <a 
            href="/cursos" 
            className="text-xs font-bold text-neutral-500 hover:text-brand-ciano transition-colors uppercase tracking-wider"
          >
            ? Voltar para o Catálogo Geral
          </a>
        </div>

        {/* Renderização Condicional baseada na existência do ID em rota */}
        {id ? (
          <DetalhesCurso id={id} />
        ) : (
          <div className="w-full text-center py-6 text-xs text-neutral-400">
            Carregando parâmetros de rota...
          </div>
        )}
        
      </div>
    </main>
  );
}
