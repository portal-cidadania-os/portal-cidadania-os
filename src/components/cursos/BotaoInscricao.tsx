"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface BotaoInscricaoProps {
  cursoId: string;
}

// ============================================================
// Portal Cidadania OS — Botão de Inscrição em Curso
// Substituídos todos os alert() por feedback inline com estado
// ============================================================

export default function BotaoInscricao({ cursoId }: BotaoInscricaoProps) {
  const [carregando, setCarregando] = useState(false);
  const [inscrito, setInscrito] = useState(false);
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [mensagem, setMensagem] = useState<{
    tipo: "sucesso" | "erro" | "info";
    texto: string;
  } | null>(null);

  useEffect(() => {
    const verificarEstado = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setAutenticado(false);
          return;
        }

        setAutenticado(true);

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
        console.error("Erro ao verificar inscrição:", err);
      }
    };

    verificarEstado();
  }, [cursoId]);

  const executarInscricao = async () => {
    setCarregando(true);
    setMensagem(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setMensagem({ tipo: "info", texto: "Faça login para se inscrever neste curso." });
        setCarregando(false);
        return;
      }

      const { error } = await supabase.from("inscricoes_cursos").insert({
        curso_id: cursoId,
        user_id: session.user.id,
        status: "inscrito",
      });

      if (error) {
        if (error.code === "23505") {
          setInscrito(true);
          setMensagem({ tipo: "info", texto: "Você já estava inscrito neste curso." });
        } else {
          setMensagem({ tipo: "erro", texto: `Erro ao processar inscrição: ${error.message}` });
        }
      } else {
        setInscrito(true);
        setMensagem({ tipo: "sucesso", texto: "Inscrição confirmada com sucesso!" });
      }
    } catch {
      setMensagem({ tipo: "erro", texto: "Erro de comunicação com o servidor. Tente novamente." });
    } finally {
      setCarregando(false);
    }
  };

  // Já inscrito
  if (inscrito) {
    return (
      <div className="flex flex-col gap-2">
        <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          Você já está inscrito neste curso
        </div>
        {mensagem?.tipo === "sucesso" && (
          <p className="text-center text-xs text-emerald-600">✓ {mensagem.texto}</p>
        )}
      </div>
    );
  }

  // Não autenticado — mostra opções de login/cadastro
  if (autenticado === false) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-center">
        <p className="text-sm text-neutral-600 font-medium mb-3">
          Faça login para se inscrever neste curso
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href="/entrar"
            className="w-full text-center bg-brand-ciano text-white font-bold py-2.5 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Fazer Login
          </Link>
          <Link
            href="/entrar?tab=cadastro"
            className="w-full text-center border border-brand-ciano text-brand-ciano font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-brand-ciano hover:text-white transition-all"
          >
            Criar conta gratuita
          </Link>
        </div>
      </div>
    );
  }

  // Autenticado — pode se inscrever
  return (
    <div className="flex flex-col gap-2">
      {mensagem && (
        <div className={`px-3.5 py-2.5 rounded-lg text-xs font-medium ${
          mensagem.tipo === "erro"
            ? "bg-red-50 text-red-600 border border-red-100"
            : mensagem.tipo === "info"
            ? "bg-blue-50 text-blue-600 border border-blue-100"
            : "bg-emerald-50 text-emerald-600 border border-emerald-100"
        }`}>
          {mensagem.texto}
        </div>
      )}
      <button
        onClick={executarInscricao}
        disabled={carregando}
        className="w-full bg-brand-ciano text-white font-bold py-3 px-6 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {carregando ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processando...
          </>
        ) : (
          "Quero me inscrever nesta vaga"
        )}
      </button>
    </div>
  );
}
