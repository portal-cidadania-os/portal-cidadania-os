"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CardCurso from "./CardCurso";

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  carga_horaria: number;
  modalidade: string;
  localizacao: string;
  status: string;
}

export default function ListaCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarCursos = async () => {
      try {
        const { data, error } = await supabase
          .from("cursos")
          .select("*")
          .eq("status", "ativo")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setCursos(data);
        }
      } catch (err) {
        console.error("Erro ao consumir catálogo de cursos:", err);
      } finally {
        setLoading(false);
      }
    };

    buscarCursos();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-brand-ciano border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-neutral-500 font-medium">Carregando catálogo de cursos...</p>
        </div>
      </div>
    );
  }

  if (cursos.length === 0) {
    return (
      <div className="w-full text-center py-12 bg-neutral-50 rounded-xl border border-neutral-100 border-dashed">
        <p className="text-sm text-neutral-500 font-medium">Nenhum curso de capacitação disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {cursos.map((item) => (
        <CardCurso key={item.id} curso={item} />
      ))}
    </div>
  );
}
