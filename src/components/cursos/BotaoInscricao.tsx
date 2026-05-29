"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface BotaoInscricaoProps {
  cursoId: string;
}

export default function BotaoInscricao({ cursoId }: BotaoInscricaoProps) {
  const [loading, setLoading] = useState(false);
  const [inscrito, setInscrito] = useState(false);

  useEffect(() => {
    const checarInscricaoExistente = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
          .from("inscricoes_cursos")
          .select("id")
          .eq("curso_id", cursoId)
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (!error && data) {
          setInscrito(true);
        }
      } catch (err) {
        console.error("Erro ao verificar inscricao:", err);
      }
    };

    checarInscricaoExistente();
  }, [cursoId]);

  const executarInscricao = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert("Ação Rejeitada: Você precisa fazer login para se inscrever em um curso.");
        window.location.href = "/";
        return;
      }

      const { error } = await supabase
        .from("inscricoes_cursos")
        .insert({
          curso_id: cursoId,
          user_id: session.user.id,
          status: "inscrito"
        });

      if (error) {
        alert(`Erro ao processar inscrição: ${error.message}`);
      } else {
        setInscrito(true);
        alert("Inscrição confirmada com sucesso neste curso!");
      }
    } catch (err) {
      alert("Erro crítico de comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (inscrito) {
    return (
      <button 
        disabled
        className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold py-3 px-6 rounded-lg text-sm flex items-center justify-center gap-2 cursor-not-allowed"
      >
        ✓ Você já está inscrito neste curso
      </button>
    );
  }

  return (
    <button
      onClick={executarInscricao}
      disabled={loading}
      className="w-full bg-brand-ciano text-white font-bold py-3 px-6 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
    >
      {loading ? "Processando inscrição..." : "Quero me inscrever nesta vaga"}
    </button>
  );
}
