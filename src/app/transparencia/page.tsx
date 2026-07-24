import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Transparência (/transparencia)
// ============================================================

export const metadata = {
  title: "Transparência | Portal Cidadania CERPI",
  description: "Relatórios financeiros, prestação de contas e governança do CERPI — Centro Restaurando Cidadania.",
};

const DOCUMENTOS = [
  {
    ano: "2025",
    itens: [
      { nome: "Relatório de Impacto Social 2025", tipo: "PDF", tamanho: "2,4 MB", data: "Jan 2026" },
      { nome: "Balanço Patrimonial 2025", tipo: "PDF", tamanho: "1,1 MB", data: "Jan 2026" },
      { nome: "Demonstrativo de Receitas e Despesas 2025", tipo: "PDF", tamanho: "890 KB", data: "Jan 2026" },
      { nome: "Ata da Assembleia Geral Ordinária 2025", tipo: "PDF", tamanho: "340 KB", data: "Mar 2025" },
    ],
  },
  {
    ano: "2024",
    itens: [
      { nome: "Relatório de Impacto Social 2024", tipo: "PDF", tamanho: "2,1 MB", data: "Jan 2025" },
      { nome: "Balanço Patrimonial 2024", tipo: "PDF", tamanho: "980 KB", data: "Jan 2025" },
      { nome: "Demonstrativo de Receitas e Despesas 2024", tipo: "PDF", tamanho: "750 KB", data: "Jan 2025" },
    ],
  },
];

const INDICADORES = [
  { label: "Famílias atendidas em 2025", valor: "4.200+" },
  { label: "Vagas de emprego ofertadas", valor: "12.000+" },
  { label: "Alunos formados em cursos", valor: "840" },
  { label: "Doações recebidas em 2025", valor: "R$ 280 mil" },
  { label: "% destinado a programas sociais", valor: "91%" },
  { label: "Voluntários ativos", valor: "210+" },
];

const CONSELHO = [
  { cargo: "Presidente", nome: "A divulgar" },
  { cargo: "Vice-Presidente", nome: "A divulgar" },
  { cargo: "Tesoureiro", nome: "A divulgar" },
  { cargo: "Secretário", nome: "A divulgar" },
  { cargo: "Conselheiro Fiscal", nome: "A divulgar" },
  { cargo: "Conselheiro Fiscal Suplente", nome: "A divulgar" },
];

export default function TransparenciaPage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/quem-somos" className="hover:text-white/70 transition-colors">Quem Somos</Link>
            <span>/</span>
            <span className="text-white/60">Transparência</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 bg-brand-verde/10 border border-brand-verde/20 text-brand-verde text-xs font-bold px-3 py-1 rounded-full mb-3">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Prestação de Contas
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Transparência</h1>
            <p className="text-white/50 text-base mt-2 max-w-2xl">
              O CERPI acredita que a confiança se constrói com clareza. Aqui você encontra todos os nossos documentos financeiros, relatórios de impacto e informações sobre governança.
            </p>
          </div>
        </div>
      </div>

      {/* ── Indicadores ── */}
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Números de 2025</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {INDICADORES.map((ind) => (
              <div key={ind.label} className="text-center">
                <div className="text-2xl font-extrabold text-black">{ind.valor}</div>
                <div className="text-neutral-500 text-xs mt-1 leading-tight">{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Documentos ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-extrabold text-black mb-8">Documentos e Relatórios</h2>

        {DOCUMENTOS.map((grupo) => (
          <div key={grupo.ano} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-base font-extrabold text-black">{grupo.ano}</h3>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>
            <div className="flex flex-col gap-3">
              {grupo.itens.map((doc) => (
                <div key={doc.nome} className="bg-white border border-neutral-200 rounded-xl px-5 py-4 flex items-center justify-between hover:border-neutral-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-black">{doc.nome}</p>
                      <p className="text-xs text-neutral-400">{doc.tipo} · {doc.tamanho} · Publicado em {doc.data}</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-brand-ciano hover:underline flex-shrink-0 ml-4">
                    Baixar →
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Conselho ── */}
      <div className="bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-xl font-extrabold text-black mb-2">Conselho Diretivo</h2>
          <p className="text-neutral-500 text-sm mb-8">Eleito pelos associados em assembleia geral. Mandato 2024–2026.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CONSELHO.map((m) => (
              <div key={m.cargo} className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" stroke="#999" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="font-extrabold text-xs text-black">{m.cargo}</p>
                <p className="text-neutral-400 text-xs mt-0.5">{m.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-neutral-500 text-sm mb-4">
          Tem dúvidas sobre a prestação de contas ou deseja solicitar documentos específicos?
        </p>
        <Link href="/fale-conosco" className="inline-block bg-brand-ciano hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-opacity">
          Fale Conosco
        </Link>
      </div>

    </main>
  );
}
