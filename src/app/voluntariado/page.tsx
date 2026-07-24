import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Voluntariado (/voluntariado)
// ============================================================

export const metadata = {
  title: "Voluntariado | Portal Cidadania",
  description: "Faça parte da transformação social em Piracicaba. Seja voluntário no CERPI.",
};

const AREAS = [
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    titulo: "Educação & Capacitação",
    descricao: "Auxilie instrutores nos cursos profissionalizantes. Ideal para professores, técnicos e profissionais liberais.",
    vagas: "8 vagas",
    cor: "text-brand-ciano bg-brand-ciano/10",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    titulo: "Apoio Social",
    descricao: "Acompanhamento de famílias em vulnerabilidade, visitas domiciliares e distribuição de doações.",
    vagas: "12 vagas",
    cor: "text-brand-magenta bg-brand-magenta/10",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titulo: "Saúde & Bem-estar",
    descricao: "Apoio nas campanhas de saúde, eventos de vacinação e triagem da Farmácia Solidária.",
    vagas: "5 vagas",
    cor: "text-brand-verde bg-brand-verde/10",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    titulo: "Comunicação & Eventos",
    descricao: "Organização de campanhas solidárias, eventos comunitários como Páscoa e Natal Cidadania.",
    vagas: "6 vagas",
    cor: "text-brand-amarelo bg-brand-amarelo/20",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    titulo: "Tecnologia & Inovação",
    descricao: "Suporte ao portal digital, treinamento de usuários no acesso ao sistema e atendimento online.",
    vagas: "4 vagas",
    cor: "text-indigo-500 bg-indigo-50",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    titulo: "Esporte & Juventude",
    descricao: "Auxílio em atividades esportivas, acompanhamento de jovens e ações do Ação Kids.",
    vagas: "10 vagas",
    cor: "text-orange-500 bg-orange-50",
  },
];

const ETAPAS = [
  { numero: "01", titulo: "Cadastre-se", descricao: "Crie sua conta gratuita no portal e acesse a área de voluntariado." },
  { numero: "02", titulo: "Escolha a área", descricao: "Selecione as áreas de atuação que combinam com seu perfil e disponibilidade." },
  { numero: "03", titulo: "Entrevista", descricao: "Nossa equipe entrará em contato para uma breve conversa de alinhamento." },
  { numero: "04", titulo: "Comece a transformar", descricao: "Receba as orientações e comece a impactar vidas em Piracicaba." },
];

export default function VoluntariadoPage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Voluntariado</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-brand-magenta/10 border border-brand-magenta/20 text-brand-magenta text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                Seja Voluntário
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Voluntariado CERPI
              </h1>
              <p className="text-white/50 text-base mt-2 max-w-2xl">
                Doe seu tempo, talento e conhecimento. Cada hora de voluntariado no CERPI impacta diretamente uma família de Piracicaba.
              </p>
            </div>
            <Link
              href="/cadastro"
              className="flex-shrink-0 bg-brand-magenta hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity"
            >
              Quero ser voluntário →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Áreas de atuação ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight mb-2">Áreas de Atuação</h2>
          <p className="text-neutral-500 text-base max-w-xl mx-auto">Escolha a área que mais combina com você. Toda forma de contribuição é bem-vinda.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREAS.map((area) => (
            <div key={area.titulo} className="border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 hover:shadow-sm transition-all flex flex-col gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${area.cor}`}>
                {area.icone}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-base text-black">{area.titulo}</h3>
                  <span className="text-xs font-semibold text-neutral-400 bg-neutral-100 px-2 py-1 rounded-lg">{area.vagas}</span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed">{area.descricao}</p>
              </div>
              <Link href="/cadastro" className="mt-auto text-center text-xs font-bold text-brand-ciano hover:underline">
                Candidatar-me a esta área →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── Como funciona ── */}
      <div className="bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-extrabold text-black tracking-tight mb-10 text-center">Como funciona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ETAPAS.map((e) => (
              <div key={e.numero} className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-ciano text-white font-extrabold text-lg flex items-center justify-center">
                  {e.numero}
                </div>
                <h3 className="font-extrabold text-black">{e.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{e.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA final ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="bg-brand-magenta rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Pronto para transformar vidas?</h3>
          <p className="text-white/70 text-base mb-6 max-w-lg mx-auto">Junte-se a mais de 200 voluntários que atuam nos 10 núcleos do Centro Restaurando Cidadania.</p>
          <Link href="/cadastro" className="inline-block bg-white text-brand-magenta font-extrabold px-8 py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
            Cadastrar-me como voluntário
          </Link>
        </div>
      </div>

    </main>
  );
}
