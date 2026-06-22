import React from "react";
import Link from "next/link";
import ListaCursos from "@/components/cursos/ListaCursos";

// ============================================================
// Portal Cidadania OS — Listagem de Cursos (/cursos)
// ============================================================

export const metadata = {
  title: "Cursos & Capacitação | Portal Cidadania",
  description: "Cursos gratuitos de capacitação profissional para a comunidade.",
};

export default function CursosPage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header da Seção ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Cursos &amp; Capacitação</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-brand-ciano/10 border border-brand-ciano/20 text-brand-ciano text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Capacitação Profissional
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Cursos Gratuitos
              </h1>
              <p className="text-white/50 text-base mt-2 max-w-2xl">
                Qualificação profissional e desenvolvimento pessoal para a comunidade. Todos os cursos são gratuitos e abertos à inscrição.
              </p>
            </div>

            <Link
              href="/entrar?tab=cadastro"
              className="flex-shrink-0 bg-brand-ciano hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity"
            >
              Criar conta para se inscrever
            </Link>
          </div>
        </div>
      </div>

      {/* ── Filtros rápidos (visuais — lógica de filtro na Fase 2) ── */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex-shrink-0">
            Filtrar:
          </span>
          {["Todos", "Presencial", "Online", "Híbrido"].map((filtro, i) => (
            <span
              key={filtro}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full border cursor-pointer transition-colors flex-shrink-0 ${
                i === 0
                  ? "bg-brand-ciano text-white border-brand-ciano"
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-brand-ciano hover:text-brand-ciano"
              }`}
            >
              {filtro}
            </span>
          ))}
        </div>
      </div>

      {/* ── Lista de Cursos ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <ListaCursos />
      </div>

      {/* ── Banner de CTA ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-black">
              Não encontrou o que buscava?
            </h3>
            <p className="text-neutral-500 text-sm mt-1">
              Entre em contato para sugerir novos cursos ou verificar turmas futuras.
            </p>
          </div>
          <Link
            href="/fale-conosco"
            className="border border-brand-ciano text-brand-ciano hover:bg-brand-ciano hover:text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all flex-shrink-0"
          >
            Fale Conosco
          </Link>
        </div>
      </div>

    </main>
  );
}
