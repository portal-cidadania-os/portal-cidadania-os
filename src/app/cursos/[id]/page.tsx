"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DetalhesCurso from "@/components/cursos/DetalhesCurso";

// Força o Next.js a tratar esta rota dinamicamente (fix para build de produção)
export const dynamic = "force-dynamic";

export default function CursoDetalhePage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Breadcrumb de retorno */}
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand-ciano transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/cursos" className="hover:text-brand-ciano transition-colors">
            Cursos
          </Link>
          <span>/</span>
          <span className="text-neutral-400">Detalhes</span>
        </div>

        {/* Componente de detalhes — renderização condicional por ID */}
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
