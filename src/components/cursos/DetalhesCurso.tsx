"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BotaoInscricao from "./BotaoInscricao";

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  carga_horaria: number;
  modalidade: string;
  localizacao: string;
  status: string;
}

interface DetalhesCursoProps {
  id: string;
}

export default function DetalhesCurso({ id }: DetalhesCursoProps) {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const { data, error } = await supabase
          .from("cursos")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setCurso(data);
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes do curso:", err);
      } finally {
        setLoading(false);
      }
    };

    buscarDetalhes();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-ciano border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-neutral-500 font-medium">Buscando especificações do curso...</p>
        </div>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="w-full text-center py-12 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
        ⚠️ Identificador inválido ou curso não encontrado na base de dados.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Lado Esquerdo: Título e Detalhes do Conteúdo */}
      <div className="lg:col-span-8 bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-ciano">Capacitação Profissional</span>
        <h1 className="text-3xl font-bold text-black tracking-tight leading-tight">{curso.titulo}</h1>
        <p className="text-neutral-800 text-sm leading-relaxed whitespace-pre-line mt-2">
          {curso.descricao || "Nenhum detalhe adicional fornecido para esta grade programática."}
        </p>
      </div>

      {/* Lado Direito: Caixa de Inscrição e Metadados */}
      <div className="lg:col-span-4 bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-6 sticky top-6">
        <h3 className="text-black font-bold text-lg border-b border-neutral-50 pb-3">Informações Gerais</h3>
        
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center py-1 border-b border-neutral-50">
            <span className="text-neutral-500 font-medium">Modalidade</span>
            <span className="text-black font-bold capitalize">{curso.modalidade}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-neutral-50">
            <span className="text-neutral-500 font-medium">Carga Horária</span>
            <span className="text-black font-bold">{curso.carga_horaria} horas</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-neutral-50">
            <span className="text-neutral-500 font-medium">Localização</span>
            <span className="text-black font-bold">{curso.localizacao}</span>
          </div>
        </div>

        {/* Acoplamento do Botão de Inscrição Controlado por Sessão */}
        <BotaoInscricao cursoId={curso.id} />
      </div>
    </div>
  );
}
