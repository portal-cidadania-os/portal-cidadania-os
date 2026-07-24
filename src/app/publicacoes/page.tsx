import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Publicações (/publicacoes)
// ============================================================

export const metadata = {
  title: "Publicações | Portal Cidadania",
  description: "Notícias, reportagens e histórias de impacto social do CERPI em Piracicaba.",
};

const CATEGORIAS = ["Todas", "Empregabilidade", "Saúde", "Educação", "Campanhas", "Núcleos", "Institucional"];

const PUBLICACOES = [
  {
    id: 1,
    categoria: "Empregabilidade",
    cor: "bg-brand-verde/10 text-brand-verde",
    titulo: "Núcleo de Empregabilidade bate recorde: 1.200 vagas ofertadas em junho",
    resumo: "Em parceria com a rede Adiante Brasil, o CERPI alcançou o maior número de vagas já divulgadas em um único mês desde a fundação do núcleo.",
    autor: "Equipe CERPI",
    data: "18 de junho de 2026",
    tempoLeitura: "3 min",
    destaque: true,
  },
  {
    id: 2,
    categoria: "Educação",
    cor: "bg-brand-ciano/10 text-brand-ciano",
    titulo: "Nova turma de Libras forma 32 alunos em Piracicaba",
    resumo: "O curso gratuito de Língua Brasileira de Sinais do CERPI conclui mais uma turma, habilitando profissionais e voluntários para atendimento inclusivo.",
    autor: "Carol Alves",
    data: "12 de junho de 2026",
    tempoLeitura: "2 min",
    destaque: false,
  },
  {
    id: 3,
    categoria: "Campanhas",
    cor: "bg-brand-amarelo/20 text-amber-700",
    titulo: "Páscoa Solidária 2026 distribui mais de 5.000 ovos para famílias carentes",
    resumo: "A campanha anual do CERPI superou todas as metas e levou alegria a famílias de todos os bairros atendidos pelos núcleos da instituição.",
    autor: "Raquel Campos",
    data: "05 de abril de 2026",
    tempoLeitura: "4 min",
    destaque: false,
  },
  {
    id: 4,
    categoria: "Saúde",
    cor: "bg-brand-magenta/10 text-brand-magenta",
    titulo: "Farmácia Solidária amplia atendimento para 400 famílias por mês",
    resumo: "Com a chegada de novos medicamentos doados por parceiros, a farmácia solidária do CERPI dobrou sua capacidade de atendimento mensal.",
    autor: "Equipe Promoção Social",
    data: "28 de maio de 2026",
    tempoLeitura: "3 min",
    destaque: false,
  },
  {
    id: 5,
    categoria: "Núcleos",
    cor: "bg-purple-100 text-purple-700",
    titulo: "Núcleo CRESCER lança programa de mentoria para mulheres empreendedoras",
    resumo: "Em parceria com empresários locais, o núcleo oferece mentorias individuais para mulheres que desejam abrir ou expandir seus negócios.",
    autor: "Juliana Galvão",
    data: "20 de maio de 2026",
    tempoLeitura: "3 min",
    destaque: false,
  },
  {
    id: 6,
    categoria: "Institucional",
    cor: "bg-neutral-100 text-neutral-600",
    titulo: "CERPI completa mais um ano de impacto social em Piracicaba",
    resumo: "Fundado para restaurar cidadania, o Centro celebra mais um ano de atividades com novos parceiros, novos núcleos e mais famílias atendidas.",
    autor: "Equipe CERPI",
    data: "10 de março de 2026",
    tempoLeitura: "5 min",
    destaque: false,
  },
];

export default function PublicacoesPage() {
  const destaque = PUBLICACOES.find((p) => p.destaque)!;
  const lista = PUBLICACOES.filter((p) => !p.destaque);

  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Publicações</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Notícias &amp; Histórias
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Publicações</h1>
            <p className="text-white/50 text-base mt-2 max-w-2xl">
              Histórias reais de impacto social, notícias dos núcleos e novidades do Centro Restaurando Cidadania.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex-shrink-0">Categoria:</span>
          {CATEGORIAS.map((cat, i) => (
            <span key={cat} className={`text-xs font-semibold px-4 py-1.5 rounded-full border cursor-pointer flex-shrink-0 ${i === 0 ? "bg-black text-white border-black" : "bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black"}`}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Destaque ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-7 md:p-9">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 ${destaque.cor}`}>{destaque.categoria}</span>
          <h2 className="text-xl md:text-2xl font-extrabold text-black leading-snug mb-3 max-w-3xl">{destaque.titulo}</h2>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">{destaque.resumo}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            <span>{destaque.autor}</span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            <span>{destaque.data}</span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            <span>{destaque.tempoLeitura} de leitura</span>
          </div>
          <Link href="/publicacoes/1" className="inline-block mt-5 font-bold text-brand-ciano text-sm hover:underline">
            Ler reportagem completa →
          </Link>
        </div>
      </div>

      {/* ── Grade de publicações ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-lg font-extrabold text-black mb-6">Mais publicações</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lista.map((pub) => (
            <Link
              key={pub.id}
              href={`/publicacoes/${pub.id}`}
              className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-300 hover:shadow-sm transition-all flex flex-col gap-3 group"
            >
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md self-start ${pub.cor}`}>{pub.categoria}</span>
              <h3 className="font-extrabold text-base text-black leading-snug group-hover:text-brand-ciano transition-colors">{pub.titulo}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 flex-1">{pub.resumo}</p>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-auto pt-2 border-t border-neutral-100">
                <span>{pub.autor}</span>
                <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                <span>{pub.data}</span>
                <span className="ml-auto">{pub.tempoLeitura}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA newsletter ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-black">Receba novidades em primeira mão</h3>
            <p className="text-neutral-500 text-sm mt-1">Cadastre-se e receba as publicações do CERPI diretamente no seu e-mail.</p>
          </div>
          <Link href="/cadastro" className="flex-shrink-0 bg-brand-ciano hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity">
            Cadastrar e assinar
          </Link>
        </div>
      </div>

    </main>
  );
}
