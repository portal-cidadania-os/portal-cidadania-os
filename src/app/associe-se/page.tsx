import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Associe-se (/associe-se)
// ============================================================

export const metadata = {
  title: "Associe-se | Portal Cidadania CERPI",
  description: "Torne-se associado do CERPI e faça parte da maior rede de impacto social de Piracicaba.",
};

const PLANOS = [
  {
    id: "apoiador",
    nome: "Apoiador",
    valor: "R$ 30",
    periodo: "/mês",
    descricao: "Para quem quer contribuir com a missão do CERPI de forma acessível.",
    beneficios: [
      "Certificado digital de associado",
      "Acesso ao boletim mensal",
      "Participação nas assembleias",
      "Desconto em cursos e eventos",
    ],
    cta: "Começar como Apoiador",
    destaque: false,
    cor: "border-neutral-200",
    ctaCor: "bg-neutral-900 text-white hover:opacity-80",
  },
  {
    id: "membro",
    nome: "Membro Ativo",
    valor: "R$ 80",
    periodo: "/mês",
    descricao: "O plano mais completo para quem quer participar ativamente da gestão e das ações do CERPI.",
    beneficios: [
      "Tudo do plano Apoiador",
      "Voto nas deliberações do conselho",
      "Acesso ao relatório de impacto",
      "Prioridade em eventos exclusivos",
      "Menção no relatório anual",
    ],
    cta: "Tornar-me Membro Ativo",
    destaque: true,
    cor: "border-brand-ciano ring-2 ring-brand-ciano/20",
    ctaCor: "bg-brand-ciano text-white hover:opacity-90",
  },
  {
    id: "empresa",
    nome: "Empresa Parceira",
    valor: "A consultar",
    periodo: "",
    descricao: "Para empresas que desejam se tornar parceiras institucionais do CERPI.",
    beneficios: [
      "Logomarca nas campanhas oficiais",
      "Certificado de responsabilidade social",
      "Relatório de impacto personalizado",
      "Divulgação de vagas sem custo",
      "Participação em eventos corporativos",
    ],
    cta: "Falar com nossa equipe",
    destaque: false,
    cor: "border-brand-amarelo",
    ctaCor: "bg-brand-amarelo text-black hover:opacity-90",
  },
];

const POR_QUE = [
  {
    titulo: "Impacto real e mensurável",
    descricao: "Cada real investido é rastreado e publicado no relatório de transparência anual. Você sabe exatamente onde sua contribuição chega.",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    titulo: "Organização séria e transparente",
    descricao: "O CERPI publica anualmente seus relatórios financeiros e de impacto social. Governança participativa com conselho eleito pelos próprios associados.",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    titulo: "Comunidade de pessoas engajadas",
    descricao: "Conecte-se com empreendedores, profissionais e líderes comunitários de Piracicaba que compartilham do mesmo propósito.",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AssociesePage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Associe-se</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-brand-amarelo/20 border border-brand-amarelo/30 text-brand-amarelo text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                Faça Parte
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Torne-se Associado
              </h1>
              <p className="text-white/50 text-base mt-2 max-w-2xl">
                Associar-se ao CERPI é contribuir de forma direta com a transformação social de Piracicaba. Escolha o plano que melhor se encaixa no seu perfil.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Por que se associar ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POR_QUE.map((item) => (
            <div key={item.titulo} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-ciano/10 text-brand-ciano flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.icone}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-black mb-1">{item.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Planos ── */}
      <div className="bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight mb-2">Escolha seu plano</h2>
            <p className="text-neutral-500 text-sm max-w-lg mx-auto">Toda contribuição é bem-vinda. Cancele quando quiser — sem burocracia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANOS.map((plano) => (
              <div
                key={plano.id}
                className={`relative bg-white border-2 ${plano.cor} rounded-2xl p-7 flex flex-col gap-5`}
              >
                {plano.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-ciano text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      Mais popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-extrabold text-base text-black mb-1">{plano.nome}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-black">{plano.valor}</span>
                    <span className="text-neutral-400 text-sm">{plano.periodo}</span>
                  </div>
                  <p className="text-neutral-500 text-xs leading-relaxed mt-2">{plano.descricao}</p>
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  {plano.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-neutral-600">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5 text-brand-verde"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/cadastro"
                  className={`w-full text-center font-bold py-3 rounded-xl text-sm transition-opacity ${plano.ctaCor}`}
                >
                  {plano.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-neutral-400 mt-6">
            Pessoa jurídica · Recibo de doação disponível · Dados protegidos pela LGPD
          </p>
        </div>
      </div>

      {/* ── Depoimento / testemunho ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <blockquote className="bg-brand-ciano/5 border border-brand-ciano/20 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <p className="text-neutral-700 text-base leading-relaxed italic mb-4">
            "Me associar ao CERPI foi uma das melhores decisões que tomei. Vejo o impacto do meu investimento em cada família atendida, em cada jovem que consegue um emprego."
          </p>
          <span className="text-sm font-bold text-black">— Associado Membro Ativo, Piracicaba</span>
        </blockquote>
      </div>

      {/* ── Dúvidas ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16 text-center">
        <p className="text-neutral-500 text-sm">
          Dúvidas sobre os planos?{" "}
          <Link href="/perguntas-frequentes" className="text-brand-ciano font-semibold hover:underline">Veja o FAQ</Link>
          {" "}ou{" "}
          <Link href="/fale-conosco" className="text-brand-ciano font-semibold hover:underline">fale com nossa equipe</Link>.
        </p>
      </div>

    </main>
  );
}
