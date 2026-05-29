"use client";

import React from "react";

interface CursoProps {
  curso: {
    id: string;
    titulo: string;
    descricao: string;
    carga_horaria: number;
    modalidade: string;
    localizacao: string;
    status: string;
  };
}

export default function CardCurso({ curso }: CursoProps) {
  return (
    <a 
      href={`/cursos/${curso.id}`} 
      className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3 hover:shadow-md hover:border-neutral-200 transition-all block group"
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-ciano bg-brand-ciano bg-opacity-10 px-2.5 py-1 rounded-md">
          {curso.modalidade}
        </span>
        <span className="text-xs text-neutral-500 font-medium">
          {curso.carga_horaria} horas
        </span>
      </div>
      
      <h3 className="text-black font-bold text-lg group-hover:text-brand-ciano transition-colors line-clamp-1">
        {curso.titulo}
      </h3>
      
      <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
        {curso.descricao || "Nenhuma descrição fornecida para este curso de capacitação."}
      </p>
      
      <div className="pt-2 border-t border-neutral-50 flex items-center justify-between text-xs text-neutral-500 font-medium mt-auto">
        <span>📍 {curso.localizacao}</span>
        <span className="text-brand-ciano font-bold group-hover:translate-x-1 transition-transform">Ver detalhes →</span>
      </div>
    </a>
  );
}
