import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Parceiros (/parceiros)
// ============================================================

export const metadata = {
  title: "Parceiros | Portal Cidadania CERPI",
  description: "Empresas e organizações que apoiam a missão do CERPI em Piracicaba.",
};

const CATEGORIAS_PARCEIROS = [
  {
    categoria: "Parceiros Institucionais",
    descricao: "Organizações que colaboram com programas e projetos estruturantes do CERPI.",
    parceiros: [
      { nome: "Adiante Brasil", area: "Empregabilidade", descricao: "Rede nacional de empregabilidade com foco em comunidades vulneráveis." },
      { nome: "Prefeitura de Piracicaba", area: "Gestão Pública", descricao: "Parceria em programas de assistência social e habitação." },
      { nome: "SENAI Piracicaba", area: "Capacitação", descricao: "Apoio técnico e curricular aos cursos profissionalizantes do CERPI." },
      { nome: "SEBRAE SP", area: "Empreendedorismo", descricao: "Suporte ao Núcleo CRESCER com formações e mentorias." },
    ],
  },
  {
    categoria: "Empresas Apoiadoras",
    descricao: "Empresas piracicabanas e da região que investem no desenvolvimento social.",
    parceiros: [
      { nome: "Empresa Parceira A", area: "Indústria", descricao: "Apoio às campanhas solidárias e oferta de vagas exclusivas." },
      { nome: "Empresa Parceira B", area: "Comércio", descricao: "Doação de alimentos e produtos para a Farmácia Solidária." },
      { nome: "Empresa Parceira C", area: "Saúde", descricao: "Fornecimento de medicamentos e apoio odontológico." },
      { nome: "Empresa Parceira D", area: "Tecnologia", descricao: "Infraestrutura digital e suporte ao portal cidadania." },
      { nome: "Empresa Parceira E", area: "Logística", descricao: "Transporte e distribuição nas campanhas Páscoa e Natal." },
      { nome: "Empresa Parceira F", area: "Alimentação", descricao: "Doação de alimentos para os programas de segurança alimentar." },
    ],
  },
  {
    categoria: "Igrejas e Organizações Religiosas",
    descricao: "Comunidades de fé que colaboram com voluntariado e recursos para as campanhas.",
    parceiros: [
      { nome: "Igreja Madureira Piracicaba", area: "Voluntariado", descricao: "Base central das operações e campanhas do CERPI." },
      { nome: "Congregações Parceiras", area: "Comunidade", descricao: "Rede de comunidades que amplificam o alcance das ações solidárias." },
    ],
  },
];

const COMO_PARCEIRO = [
  {
    titulo: "Ofereça vagas de emprego",
    descricao: "Conecte-se a candidatos qualificados triados pelo nosso núcleo de empregabilidade.",
  },
  {
    titulo: "Patrocine uma campanha",
    descricao: "Associe sua marca às campanhas Páscoa Solidária, Natal Cidadania ou Agasalho.",
  },
  {
    titulo: "Doe produtos ou serviços",
    descricao: "Medicamentos, alimentos, materiais ou serviços profissionais — tudo ajuda.",
  },
  {
    titulo: "Apoie com verba",
    descricao: "Contribuição mensal ou pontual com rastreabilidade total via relatório de impacto.",
  },
];

export default function ParceirosPage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Parceiros</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-brand-ciano/10 border border-brand-ciano/20 text-brand-ciano text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Rede de Parceiros
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Nossos Parceiros</h1>
              <p className="text-white/50 text-base mt-2 max-w-2xl">
                O impacto do CERPI só é possível graças à rede de empresas, organizações e comunidades que acreditam na transformação social de Piracicaba.
              </p>
            </div>
            <Link href="/fale-conosco" className="flex-shrink-0 bg-brand-ciano hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity">
              Quero ser parceiro →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Parceiros por categoria ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-14">
        {CATEGORIAS_PARCEIROS.map((grupo) => (
          <div key={grupo.categoria}>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-black">{grupo.categoria}</h2>
              <p className="text-neutral-500 text-sm mt-1">{grupo.descricao}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grupo.parceiros.map((p) => (
                <div key={p.nome} className="bg-white border border-neutral-200 rounded-xl p-5 flex gap-4 items-start hover:border-neutral-300 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0 text-sm font-extrabold text-neutral-500">
                    {p.nome.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-sm text-black">{p.nome}</h3>
                      <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{p.area}</span>
                    </div>
                    <p className="text-neutral-500 text-xs leading-relaxed">{p.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Como ser parceiro ── */}
      <div className="bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-black mb-2">Como sua empresa pode ajudar</h2>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto">Existem muitas formas de contribuir. Encontre a que melhor se encaixa no perfil da sua empresa.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMO_PARCEIRO.map((item, i) => (
              <div key={item.titulo} className="bg-white border border-neutral-200 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-brand-ciano text-white font-extrabold text-sm flex items-center justify-center mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-extrabold text-sm text-black mb-1">{item.titulo}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="bg-brand-ciano rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold mb-2">Pronto para fazer a diferença?</h3>
            <p className="text-white/70 text-sm max-w-lg">Entre em contato e nossa equipe apresenta as possibilidades de parceria que fazem sentido para o seu negócio.</p>
          </div>
          <Link href="/fale-conosco" className="flex-shrink-0 bg-white text-brand-ciano font-extrabold px-7 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity text-center">
            Iniciar conversa →
          </Link>
        </div>
      </div>

    </main>
  );
}
