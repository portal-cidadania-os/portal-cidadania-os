import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Vagas & Emprego (/vagas)
// ============================================================

export const metadata = {
  title: "Vagas & Emprego | Portal Cidadania",
  description: "Mais de 1.000 vagas de emprego por mês para a comunidade de Piracicaba.",
};

const VAGAS = [
  {
    id: 1,
    cargo: "Auxiliar de Produção",
    empresa: "Adiante Brasil Parceiros",
    local: "Piracicaba — SP",
    tipo: "CLT",
    area: "Indústria",
    cor: "bg-blue-50 text-blue-700",
    descricao: "Experiência mínima de 6 meses em linha de produção. Ensino Médio completo. Turno fixo ou rotativo.",
    data: "Aberta",
  },
  {
    id: 2,
    cargo: "Operador de Caixa",
    empresa: "Varejo Parceiro CERPI",
    local: "Piracicaba — SP",
    tipo: "CLT",
    area: "Comércio",
    cor: "bg-green-50 text-green-700",
    descricao: "Atendimento ao cliente, organização de estoque, fechamento de caixa. Não exige experiência.",
    data: "Aberta",
  },
  {
    id: 3,
    cargo: "Auxiliar Administrativo",
    empresa: "Empresa Conveniada",
    local: "Piracicaba — SP",
    tipo: "CLT",
    area: "Administrativo",
    cor: "bg-purple-50 text-purple-700",
    descricao: "Controle de documentos, apoio ao setor financeiro, planilhas. Excel básico desejável.",
    data: "Aberta",
  },
  {
    id: 4,
    cargo: "Serviços Gerais",
    empresa: "Condomínio Parceiro",
    local: "Piracicaba — SP",
    tipo: "CLT",
    area: "Serviços",
    cor: "bg-amber-50 text-amber-700",
    descricao: "Limpeza, conservação e pequenas manutenções. Sem exigência de experiência. Benefícios inclusos.",
    data: "Aberta",
  },
  {
    id: 5,
    cargo: "Motorista Entregador",
    empresa: "Logística Conveniada",
    local: "Piracicaba — SP",
    tipo: "CLT",
    area: "Logística",
    cor: "bg-red-50 text-red-700",
    descricao: "CNH B ou D. Experiência com entregas urbanas. Conhecimento de Piracicaba desejável.",
    data: "Aberta",
  },
  {
    id: 6,
    cargo: "Recepcionista",
    empresa: "Clínica Parceira",
    local: "Piracicaba — SP",
    tipo: "CLT",
    area: "Saúde / Administrativo",
    cor: "bg-teal-50 text-teal-700",
    descricao: "Agendamento, atendimento presencial e telefônico. Boa comunicação. Perfil proativo.",
    data: "Aberta",
  },
];

const NUMEROS = [
  { valor: "1.000+", label: "Vagas/mês" },
  { valor: "50+", label: "Empresas parceiras" },
  { valor: "3.200+", label: "Pessoas contratadas" },
  { valor: "Gratuito", label: "Para candidatos" },
];

export default function VagasPage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Vagas &amp; Emprego</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-brand-verde/10 border border-brand-verde/20 text-brand-verde text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Empregabilidade
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Vagas de Emprego
              </h1>
              <p className="text-white/50 text-base mt-2 max-w-2xl">
                Mais de <strong className="text-brand-verde">1.000 vagas por mês</strong>, em parceria com o Núcleo de Desenvolvimento e Empregabilidade e a rede Adiante Brasil. Cadastre-se e concorra gratuitamente.
              </p>
            </div>

            <Link
              href="/cadastro"
              className="flex-shrink-0 bg-brand-verde hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity"
            >
              Cadastre-se para candidatar
            </Link>
          </div>
        </div>
      </div>

      {/* ── Números de impacto ── */}
      <div className="bg-brand-verde/5 border-b border-brand-verde/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {NUMEROS.map((n) => (
              <div key={n.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-brand-verde">{n.valor}</div>
                <div className="text-neutral-500 text-sm mt-1">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex-shrink-0">Área:</span>
          {["Todas", "Indústria", "Comércio", "Administrativo", "Serviços", "Logística", "Saúde"].map((f, i) => (
            <span key={f} className={`text-xs font-semibold px-4 py-1.5 rounded-full border cursor-pointer flex-shrink-0 ${i === 0 ? "bg-brand-verde text-white border-brand-verde" : "bg-white text-neutral-500 border-neutral-200 hover:border-brand-verde hover:text-brand-verde"}`}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* ── Lista de vagas ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-extrabold text-black">Vagas disponíveis <span className="text-neutral-400 font-normal text-sm">— {VAGAS.length} exibidas</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VAGAS.map((vaga) => (
            <div key={vaga.id} className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-brand-verde hover:shadow-sm transition-all flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${vaga.cor}`}>{vaga.area}</span>
                  <h3 className="font-extrabold text-base text-black mt-1.5 leading-tight">{vaga.cargo}</h3>
                  <p className="text-neutral-500 text-sm">{vaga.empresa}</p>
                </div>
                <span className="text-[10px] font-semibold text-brand-verde bg-brand-verde/10 px-2 py-1 rounded-lg flex-shrink-0">{vaga.tipo}</span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed">{vaga.descricao}</p>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {vaga.local}
              </div>
              <Link
                href="/cadastro"
                className="mt-auto w-full text-center bg-brand-verde/10 hover:bg-brand-verde hover:text-white text-brand-verde font-bold py-2.5 rounded-xl text-sm transition-all"
              >
                Candidatar-me
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-[#0a0a1a] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="font-extrabold text-xl mb-2">Sou empresário — quero oferecer vagas</h3>
            <p className="text-white/50 text-sm max-w-lg">Conecte sua empresa à maior rede social de empregos de Piracicaba, com suporte completo de triagem e encaminhamento.</p>
          </div>
          <Link href="/fale-conosco" className="flex-shrink-0 bg-brand-verde hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-opacity">
            Anunciar vagas →
          </Link>
        </div>
      </div>

    </main>
  );
}
