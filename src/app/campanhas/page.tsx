import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Campanhas (/campanhas)
// ============================================================

export const metadata = {
  title: "Campanhas | Portal Cidadania",
  description: "Campanhas solidárias do CERPI: Páscoa, Natal, Agasalho e muito mais em Piracicaba.",
};

const CAMPANHAS_ATIVAS = [
  {
    id: 1,
    titulo: "Natal Cidadania 2026",
    subtitulo: "A maior campanha solidária do ano",
    descricao: "Arrecadação de brinquedos, roupas e alimentos para distribuição a famílias em vulnerabilidade social durante o período natalino. Faça parte dessa corrente do bem.",
    meta: "2.000 famílias",
    cor: "border-red-200 bg-red-50",
    badge: "bg-red-100 text-red-700",
    status: "Em arrecadação",
    icone: "🎄",
    itens: ["Brinquedos novos ou em bom estado", "Roupas e agasalhos", "Cesta básica", "Kits de higiene"],
    prazo: "até 15 de dezembro de 2026",
  },
  {
    id: 2,
    titulo: "Campanha do Agasalho 2026",
    subtitulo: "Esquente quem precisa",
    descricao: "Com a chegada do inverno, o CERPI recolhe roupas de frio para distribuição nas comunidades atendidas. Toda peça importa.",
    meta: "5.000 peças",
    cor: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    status: "Em arrecadação",
    icone: "🧥",
    itens: ["Casacos e jaquetas", "Cobertores e mantas", "Meias e toucas", "Calças e suéteres"],
    prazo: "até 31 de agosto de 2026",
  },
];

const CAMPANHAS_HISTORICO = [
  {
    id: 3,
    titulo: "Páscoa Solidária 2026",
    icone: "🥚",
    descricao: "5.200 ovos de Páscoa distribuídos a crianças carentes de Piracicaba.",
    resultado: "5.200 ovos doados",
    data: "Abril de 2026",
    cor: "bg-brand-amarelo/10 border-brand-amarelo/30",
  },
  {
    id: 4,
    titulo: "Natal Cidadania 2025",
    icone: "🎁",
    descricao: "1.800 famílias beneficiadas com brinquedos, roupas e alimentos.",
    resultado: "1.800 famílias",
    data: "Dezembro de 2025",
    cor: "bg-red-50 border-red-200",
  },
  {
    id: 5,
    titulo: "Páscoa Solidária 2025",
    icone: "🐣",
    descricao: "Distribuição de 3.800 ovos para crianças em áreas de alta vulnerabilidade.",
    resultado: "3.800 ovos doados",
    data: "Abril de 2025",
    cor: "bg-brand-amarelo/10 border-brand-amarelo/30",
  },
  {
    id: 6,
    titulo: "Campanha do Agasalho 2025",
    icone: "🧣",
    descricao: "Arrecadação de mais de 4.000 peças de roupa para famílias em vulnerabilidade.",
    resultado: "4.300 peças doadas",
    data: "Julho de 2025",
    cor: "bg-blue-50 border-blue-200",
  },
];

const FORMAS_AJUDA = [
  {
    titulo: "Doação de itens",
    descricao: "Traga brinquedos, roupas e alimentos nos pontos de coleta espalhados por Piracicaba.",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    titulo: "Doação financeira",
    descricao: "Contribua com qualquer valor via Pix. Cada real se transforma em impacto real para as famílias.",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titulo: "Voluntariado",
    descricao: "Ajude na organização, triagem e distribuição das doações durante as campanhas.",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    titulo: "Divulgação",
    descricao: "Compartilhe nossas campanhas com amigos, familiares e na sua empresa. O alcance importa.",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
];

export default function CampanhasPage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Campanhas</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-brand-amarelo/20 border border-brand-amarelo/30 text-brand-amarelo text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                Ações Solidárias
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Campanhas Solidárias</h1>
              <p className="text-white/50 text-base mt-2 max-w-2xl">
                Juntos somos mais. Participe das campanhas que transformam vidas em Piracicaba ao longo do ano.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Campanhas ativas ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl font-extrabold text-black">Campanhas em andamento</h2>
          <span className="inline-block bg-brand-verde text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Ativas</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAMPANHAS_ATIVAS.map((camp) => (
            <div key={camp.id} className={`border-2 ${camp.cor} rounded-2xl p-7 flex flex-col gap-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${camp.badge}`}>{camp.status}</span>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-3xl">{camp.icone}</span>
                    <div>
                      <h3 className="font-extrabold text-lg text-black leading-tight">{camp.titulo}</h3>
                      <p className="text-neutral-500 text-sm">{camp.subtitulo}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed">{camp.descricao}</p>
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">O que precisamos:</p>
                <ul className="flex flex-col gap-1">
                  {camp.itens.map((item) => (
                    <li key={item} className="text-sm text-neutral-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-ciano rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-black/10">
                <div>
                  <p className="text-xs text-neutral-400">Meta: <strong className="text-black">{camp.meta}</strong></p>
                  <p className="text-xs text-neutral-400">{camp.prazo}</p>
                </div>
                <Link href="/voluntariado" className="bg-brand-ciano hover:opacity-90 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-opacity">
                  Participar →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Como ajudar ── */}
      <div className="bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-xl font-extrabold text-black mb-8 text-center">Como posso ajudar?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FORMAS_AJUDA.map((f) => (
              <div key={f.titulo} className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-brand-ciano transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-ciano/10 text-brand-ciano flex items-center justify-center">
                  {f.icone}
                </div>
                <h3 className="font-extrabold text-sm text-black">{f.titulo}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{f.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Histórico ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-extrabold text-black mb-8">Campanhas realizadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAMPANHAS_HISTORICO.map((camp) => (
            <div key={camp.id} className={`border rounded-2xl p-5 ${camp.cor} flex flex-col gap-3`}>
              <span className="text-2xl">{camp.icone}</span>
              <h3 className="font-extrabold text-sm text-black">{camp.titulo}</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">{camp.descricao}</p>
              <div className="mt-auto pt-3 border-t border-black/10">
                <p className="text-xs font-bold text-neutral-600">{camp.resultado}</p>
                <p className="text-xs text-neutral-400">{camp.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Pix ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-brand-amarelo rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-black mb-2">Doe via Pix — qualquer valor ajuda</h3>
            <p className="text-black/60 text-sm max-w-lg">100% das doações vão diretamente para as famílias atendidas. O CERPI é uma organização social sem fins lucrativos.</p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Link href="/fale-conosco" className="bg-black text-white font-extrabold px-7 py-3 rounded-xl text-sm hover:opacity-80 transition-opacity text-center">
              Ver dados Pix →
            </Link>
            <p className="text-xs text-black/50 text-center">CNPJ emitido mediante solicitação</p>
          </div>
        </div>
      </div>

    </main>
  );
}
