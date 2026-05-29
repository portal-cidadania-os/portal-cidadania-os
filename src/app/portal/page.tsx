"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PortalPage() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checarSessao = async () => {
      // Verifica o estado da sessão do usuário em tempo real
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Se não houver sessão ativa, ejeta o usuário imediatamente para a Home
        window.location.href = "/";
      } else {
        // Se estiver autenticado, extrai os dados do usuário e desliga o esqueleto de carregamento
        setUserEmail(session.user.email ?? "Usuário Cidadão");
        setLoading(false);
      }
    };

    checarSessao();
  }, []);

  // Manipulador de Desconexão Segura (Logout)
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-ciano border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-neutral-800">Verificando credenciais de acesso...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-[calc(100vh-73px)] relative overflow-hidden bg-white text-black font-sans">
      
      {/* Camada do Fundo em Movimento (Marca-dágua suave de 6%) */}
      <div className="absolute inset-0 bg-movimento-suave opacity-[0.06] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8">
        
        {/* Cabeçalho Interno do Painel */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-ciano">Área Restrita do Cidadão</span>
            <h1 className="text-3xl font-bold text-black tracking-tight mt-1">Painel de Controle</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-neutral-800 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
              Conectado como: <span className="text-black font-bold">{userEmail}</span>
            </div>
            <button 
              onClick={handleSignOut}
              className="bg-neutral-950 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Sair do Sistema
            </button>
          </div>
        </div>

        {/* Corpo Provisório do Painel (Preparado para a listagem de Empregos da Opção 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm md:col-span-2 flex flex-col gap-4">
            <h3 className="text-black font-bold text-lg">Módulo de Oportunidades</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">
              A sua infraestrutura de dados está pronta. No próximo passo, realizaremos a modelagem e conexão com a tabela PostgreSQL para listar vagas ativas e gerenciar candidaturas.
            </p>
            <div className="p-4 bg-blue-50 bg-opacity-50 border border-blue-100 rounded-lg text-sm text-blue-800 font-medium">
              ℹ Sistema operando sob protocolo RLS (Row Level Security) do Supabase ativo.
            </div>
          </div>
          
          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-black font-bold text-lg">Seu Perfil Institucional</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs border-b border-neutral-50 pb-2">
                <span className="text-neutral-500 font-medium">Nível de Acesso</span>
                <span className="text-black font-bold uppercase">Cidadão / Candidato</span>
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-neutral-500 font-medium">Ambiente Operacional</span>
                <span className="text-emerald-600 font-bold">STATUS GREEN</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
