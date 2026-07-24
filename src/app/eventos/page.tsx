import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Eventos (/eventos)
// ============================================================

export const metadata = {
  title: "Eventos | Portal Cidadania",
  description: "Confira os próximos eventos, palestras e atividades do CERPI em Piracicaba.",
};

const EVENTOS = [
  {
    id: 1,
    titulo: "Encontro de Mulheres Empreendedoras",
    nucleo: "Núcleo CRESCER",
    data: "09 de Agosto de 2026",
    horario: "09h às 13h",
    local: "CERPI — Sede Madureira, Piracicaba",
    tipo: "Presencial",
    corTipo: "bg-brand-amarelo/20 text-amber-700",
    corBorda: "border-brand-amarelo",
    descricao: "Capacitação e networking para mulheres empreendedoras de Piracicaba. Temas: marketing digital, finanças e planejamento de negócios.",
    inscritos: 87,
    vagas: 120,
    destaque: true,
  },
  {
    id: 2,
    titulo: "Palestra: Mercado de Trabalho em 2026",
    nucleo: "Empregabilidade",
    data: "16 de Agosto de 2026",
    horario: "10h às 12h",
    local: "Online — Google Meet",
    tipo: "Online",
    corTipo: "bg-brand-ciano/10 text-brand-ciano",
    corBorda: "border-brand-ciano",
    descricao: "Como se preparar para as novas demandas do mercado de trabalho. Palestrante: Zezinho Monteiro, coordenador do núcleo de empregabilidade.",
    inscritos: 210,
    vagas: 300,
    destaque: false,
  },
  {
    id: 3,
    titulo: "Semana de Saúde da Família",
    nucleo: "Promoção Social",
    data: "25 a 29 de Agosto de 2026",
    horario: "08h às 17h",
    local: "CERPI — Todas as unidades",
    tipo: "Presencial",
    corTipo: "bg-brand-verde/10 text-brand-verde",
    corBorda: "border-brand-verde",
    descricao: "Consultas, vacinas, orientação nutricional e atendimento odontológico gratuitos. Serviço destinado a famílias cadastradas no portal.",
    inscritos: 320,
    vagas: 500,
    destaque: false,
  },
  {
    id: 4,
    titulo: "Culto de Aniversário — #MadureiraTem",
    nucleo: "Sorria com Cristo",
    data: "06 de Setembro de 2026",
    horario: "19h",
    local: "Sede Central — Madureira",
    tipo: "Presencial",
    corTipo: "bg-purple-100 text-purple-700",
    corBorda: "border-purple-300",
    descricao: "Celebração dos anos de impacto social do CERPI em Piracicaba. Louvor, testemunhos e apresentações especiais. Entrada gratuita.",
    inscritos: 450,
    vagas: 800,
    destaque: false,
  },
  {
    id: 5,
    titulo: "Formatura — Turma de Capacitação Profissional",
    nucleo: "Cursos",
    data: "27 de Setembro de 2026",
    horario: "15h às 18h",
    local: "CERPI — Auditório Principal",
    tipo: "Presencial",
    corTipo: "bg-neutral-100 text-neutral-600",
    corBorda: "border-neutral-300",
    descricao: "Cerimônia de formatura dos alunos concluintes dos cursos de maquiagem, cabeleireiro, Libras e informática. Familiares são bem-vindos.",
    inscritos: 140,
    vagas: 200,
    destaque: false,
  },
  {
    id: 6,
    titulo: "Natal Cidadania 2026",
    nucleo: "Campanhas Solidárias",
    data: "20 de Dezembro de 2026",
    horario: "09h às 17h",
    local: "Praça Central — Piracicaba",
    tipo: "Presencial",
    corTipo: "bg-red-50 text-red-600",
    corBorda: "border-red-200",
    descricao: "A maior ação solidária do ano: distribuição de brinquedos, cestas e kits de higiene para famílias de baixa renda de Piracicaba.",
    inscritos: 95,
    vagas: 2000,
    destaque: false,
  },
];

export default function EventosPage() {
  const destaque = EVENTOS.find((e) => e.destaque)!;
  const lista = EVENTOS.filter((e) => !e.destaque);

  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Eventos</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-brand-amarelo/20 border border-brand-amarelo/30 text-brand-amarelo text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agenda CERPI
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Eventos &amp; Atividades</h1>
              <p className="text-white/50 text-base mt-2 max-w-2xl">
                Palestras, campanhas solidárias, formações e muito mais. Acompanhe a agenda e participe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Evento em destaque ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className={`border-2 ${destaque.corBorda} rounded-2xl overflow-hidden`}>
          <div className="bg-brand-amarelo/5 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
            <div className="flex-1">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-brand-amarelo text-black px-3 py-1 rounded-full mb-3">Em destaque</span>
              <h2 className="text-xl md:text-2xl font-extrabold text-black mb-2">{destaque.titulo}</h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">{destaque.descricao}</p>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {destaque.data} · {destaque.horario}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {destaque.local}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <div className="text-center md:text-right">
                <div className="text-2xl font-extrabold text-black">{destaque.inscritos}</div>
                <div className="text-xs text-neutral-400">de {destaque.vagas} vagas preenchidas</div>
              </div>
              <div className="w-full md:w-48 bg-neutral-200 rounded-full h-1.5">
                <div className="bg-brand-amarelo h-1.5 rounded-full" style={{ width: `${(destaque.inscritos / destaque.vagas) * 100}%` }} />
              </div>
              <Link href="/cadastro" className="bg-brand-amarelo text-black font-extrabold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity text-center">
                Inscrever-me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lista de eventos ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-lg font-extrabold text-black mb-6">Próximos eventos</h2>
        <div className="flex flex-col gap-4">
          {lista.map((evento) => {
            const pct = Math.round((evento.inscritos / evento.vagas) * 100);
            return (
              <div key={evento.id} className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-300 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${evento.corTipo}`}>{evento.tipo}</span>
                    <span className="text-xs text-neutral-400">{evento.nucleo}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-black leading-tight mb-1">{evento.titulo}</h3>
                  <p className="text-neutral-500 text-sm line-clamp-2">{evento.descricao}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-400 mt-2">
                    <span>{evento.data} · {evento.horario}</span>
                    <span>{evento.local}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end sm:min-w-[140px]">
                  <div className="text-xs text-neutral-400">{evento.inscritos}/{evento.vagas} inscritos ({pct}%)</div>
                  <div className="w-full sm:w-32 bg-neutral-100 rounded-full h-1">
                    <div className="bg-brand-ciano h-1 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <Link href="/cadastro" className="text-xs font-bold text-brand-ciano hover:underline">
                    Inscrever-me →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </main>
  );
}
