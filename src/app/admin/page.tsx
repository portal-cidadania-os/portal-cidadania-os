"use client";

import React from "react";
import Link from "next/link";

// ============================================================
// CERPI — Admin Dashboard (/admin)
// ============================================================

const CARDS_TOPO = [
  { label: "Cadastros", valor: "1.284", variacao: "+23 esta semana", cor: "text-brand-ciano", bg: "bg-brand-ciano/10", icone: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { label: "Vagas Ativas", valor: "312", variacao: "+18 hoje", cor: "text-brand-verde", bg: "bg-brand-verde/10", icone: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { label: "Cursos Ativos", valor: "9", variacao: "2 com inscrições abertas", cor: "text-brand-amarelo", bg: "bg-brand-amarelo/10", icone: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
  { label: "Voluntários", valor: "214", variacao: "+5 novos este mês", cor: "text-brand-magenta", bg: "bg-brand-magenta/10", icone: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
  { label: "Eventos Próximos", valor: "6", variacao: "próximo em 16 dias", cor: "text-purple-500", bg: "bg-purple-50", icone: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { label: "Campanhas Ativas", valor: "2", variacao: "Agasalho + Natal 2026", cor: "text-red-500", bg: "bg-red-50", icone: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg> },
];

const NUCLEOS_STATUS = [
  { nome: "Sorria com Cristo", slug: "sorria-com-cristo", cadastros: 180, status: "Ativo" },
  { nome: "Núcleo de Apoio", slug: "nucleo-apoio", cadastros: 134, status: "Ativo" },
  { nome: "Núcleo CRESCER", slug: "nucleo-crescer", cadastros: 97, status: "Ativo" },
  { nome: "Empregabilidade", slug: "empregabilidade", cadastros: 312, status: "Ativo" },
  { nome: "Esporte", slug: "esporte", cadastros: 89, status: "Ativo" },
  { nome: "Promoção Social", slug: "promocao-social", cadastros: 201, status: "Ativo" },
  { nome: "Páscoa Solidária", slug: "pascoa", cadastros: 0, status: "Sazonal" },
  { nome: "Natal Cidadania", slug: "natal", cadastros: 95, status: "Ativo" },
  { nome: "Mulheres Empreend.", slug: "empreendedoras", cadastros: 67, status: "Ativo" },
  { nome: "Ação Kids", slug: "acao-kids", cadastros: 109, status: "Ativo" },
];

const ATIVIDADES_RECENTES = [
  { acao: "Novo cadastro", detalhe: "Maria Silva — Madureira", tempo: "2 min atrás", cor: "bg-brand-ciano" },
  { acao: "Vaga publicada", detalhe: "Auxiliar Administrativo — Empresa X", tempo: "18 min atrás", cor: "bg-brand-verde" },
  { acao: "Voluntário aprovado", detalhe: "João Oliveira — Área: Educação", tempo: "45 min atrás", cor: "bg-brand-magenta" },
  { acao: "Inscrição em curso", detalhe: "Ana Souza — Cabeleireiro T3", tempo: "1h atrás", cor: "bg-brand-amarelo" },
  { acao: "Evento atualizado", detalhe: "Encontro Empreendedoras — +12 inscritos", tempo: "2h atrás", cor: "bg-purple-500" },
  { acao: "Novo cadastro", detalhe: "Carlos Mendes — Empregabilidade", tempo: "3h atrás", cor: "bg-brand-ciano" },
];

const ATALHOS = [
  { href: "/admin/cadastros", label: "Novo Cadastro", cor: "bg-brand-ciano text-white" },
  { href: "/admin/vagas", label: "Publicar Vaga", cor: "bg-brand-verde text-white" },
  { href: "/admin/cursos", label: "Novo Curso", cor: "bg-brand-amarelo text-black" },
  { href: "/admin/eventos", label: "Criar Evento", cor: "bg-purple-500 text-white" },
  { href: "/admin/campanhas", label: "Nova Campanha", cor: "bg-red-500 text-white" },
  { href: "/admin/publicacoes", label: "Nova Publicação", cor: "bg-neutral-800 text-white" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-7">

      {/* ── Cabeçalho ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
            Painel de Controle
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
            Dashboard Global
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Visão geral de todos os departamentos — CERPI Piracicaba
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-brand-verde/10 text-brand-verde text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-brand-verde rounded-full animate-pulse" />
            Sistema Online
          </span>
        </div>
      </div>

      {/* ── Cards de métricas ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {CARDS_TOPO.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-neutral-200 p-4 flex flex-col gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.bg} ${card.cor}`}>
              {card.icone}
            </div>
            <div>
              <div className={`text-2xl font-extrabold ${card.cor}`}>{card.valor}</div>
              <div className="text-xs text-neutral-500 font-medium mt-0.5">{card.label}</div>
              <div className="text-[10px] text-neutral-400 mt-1">{card.variacao}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Atalhos rápidos ── */}
      <div>
        <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">Ações Rápidas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ATALHOS.map((a) => (
            <Link key={a.href} href={a.href} className={`${a.cor} font-bold text-xs py-3 px-3 rounded-xl text-center hover:opacity-90 transition-opacity`}>
              + {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Grid principal ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Status dos Núcleos */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h2 className="font-extrabold text-sm text-black">Status dos Núcleos</h2>
            <Link href="/admin/nucleos" className="text-xs font-semibold text-brand-ciano hover:underline">
              Gerenciar todos →
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {NUCLEOS_STATUS.map((nucleo) => (
              <div key={nucleo.slug} className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${nucleo.status === "Ativo" ? "bg-brand-verde" : "bg-neutral-300"}`} />
                  <span className="text-sm font-semibold text-black">{nucleo.nome}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-neutral-400">{nucleo.cadastros} cadastros</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${nucleo.status === "Ativo" ? "bg-brand-verde/10 text-brand-verde" : "bg-neutral-100 text-neutral-400"}`}>
                    {nucleo.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100">
            <h2 className="font-extrabold text-sm text-black">Atividade Recente</h2>
          </div>
          <div className="divide-y divide-neutral-50">
            {ATIVIDADES_RECENTES.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.cor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-black">{item.acao}</p>
                  <p className="text-xs text-neutral-500 truncate">{item.detalhe}</p>
                </div>
                <span className="text-[10px] text-neutral-300 flex-shrink-0">{item.tempo}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-neutral-100">
            <button className="text-xs font-semibold text-brand-ciano hover:underline">
              Ver histórico completo →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
