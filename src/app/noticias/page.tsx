import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Notícias de Piracicaba (/noticias)
// Foco: oportunidades, benefícios e acontecimentos na cidade
// que impactam diretamente o público atendido pelo CERPI.
// Diferente de /publicacoes (conteúdo interno do CERPI).
// ============================================================

export const metadata = {
  title: "Notícias de Piracicaba | Portal Cidadania",
  description: "Notícias, editais e oportunidades em Piracicaba que importam para a sua família.",
};

const NOTICIAS = [
  {
    id: 1,
    categoria: "Emprego",
    cor: "bg-brand-verde/10 text-brand-verde",
    titulo: "Prefeitura de Piracicaba abre 320 vagas temporárias para serviços gerais",
    resumo: "Processo seletivo simplificado, sem necessidade de experiência. Inscrições até 10 de agosto. Salário de R$ 1.600 + benefícios.",
    fonte: "Prefeitura Municipal",
    data: "22 jul. 2026",
    destaque: true,
    urgente: true,
  },
  {
    id: 2,
    categoria: "Benefícios",
    cor: "bg-brand-amarelo/20 text-amber-700",
    titulo: "Cadastro Único: prazo para atualização de dados vai até 31 de agosto",
    resumo: "Famílias que não atualizarem o CadÚnico até o prazo podem perder o acesso ao Bolsa Família e outros benefícios sociais.",
    fonte: "Governo Federal / CRAS Piracicaba",
    data: "20 jul. 2026",
    destaque: false,
    urgente: true,
  },
  {
    id: 3,
    categoria: "Saúde",
    cor: "bg-brand-magenta/10 text-brand-magenta",
    titulo: "UBS Madureira amplia horário de atendimento para período noturno",
    resumo: "A partir de agosto, a unidade de saúde passará a funcionar até as 21h de segunda a sexta, facilitando o acesso para trabalhadores.",
    fonte: "Secretaria Municipal de Saúde",
    data: "18 jul. 2026",
    destaque: false,
    urgente: false,
  },
  {
    id: 4,
    categoria: "Educação",
    cor: "bg-brand-ciano/10 text-brand-ciano",
    titulo: "SENAI abre inscrições para cursos gratuitos em Piracicaba — 800 vagas",
    resumo: "Cursos de mecânica, eletroeletrônica, administração e TI disponíveis. Requisito mínimo: ensino fundamental completo.",
    fonte: "SENAI Piracicaba",
    data: "15 jul. 2026",
    destaque: false,
    urgente: false,
  },
  {
    id: 5,
    categoria: "Habitação",
    cor: "bg-purple-100 text-purple-700",
    titulo: "Programa Minha Casa Minha Vida abre novas inscrições na região de Piracicaba",
    resumo: "Famílias com renda de até R$ 2.850 podem se inscrever. Documentação necessária: RG, CPF, comprovante de renda e residência.",
    fonte: "Caixa Econômica Federal",
    data: "12 jul. 2026",
    destaque: false,
    urgente: false,
  },
  {
    id: 6,
    categoria: "Assistência Social",
    cor: "bg-neutral-100 text-neutral-600",
    titulo: "CRAS Madureira retoma atendimentos presenciais sem agendamento às sextas-feiras",
    resumo: "Serviços de orientação social, inclusão no CadÚnico e encaminhamentos estarão disponíveis das 8h às 12h, toda sexta-feira.",
    fonte: "CRAS Madureira — Piracicaba",
    data: "10 jul. 2026",
    destaque: false,
    urgente: false,
  },
];

const CATEGORIAS = ["Todas", "Emprego", "Benefícios", "Saúde", "Educação", "Habitação", "Assistência Social"];

export default function NoticiasPage() {
  const destaque = NOTICIAS.find((n) => n.destaque)!;
  const lista = NOTICIAS.filter((n) => !n.destaque);

  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Notícias</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <svg width="10" height="10" className="fill-brand-ciano" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" /></svg>
              Piracicaba em tempo real
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Notícias de Piracicaba</h1>
            <p className="text-white/50 text-base mt-2 max-w-2xl">
              Editais, oportunidades e benefícios que afetam diretamente as famílias atendidas pelo CERPI — com curadoria da nossa equipe.
            </p>
          </div>
        </div>
      </div>

      {/* ── Aviso de curadoria ── */}
      <div className="bg-brand-ciano/5 border-b border-brand-ciano/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-brand-ciano font-semibold">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Estas notícias são selecionadas pela equipe do CERPI. Para publicações sobre o nosso trabalho, acesse{" "}
          <Link href="/publicacoes" className="underline">Publicações</Link>.
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="border-b border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex-shrink-0">Tema:</span>
          {CATEGORIAS.map((cat, i) => (
            <span key={cat} className={`text-xs font-semibold px-4 py-1.5 rounded-full border cursor-pointer flex-shrink-0 ${i === 0 ? "bg-black text-white border-black" : "bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black"}`}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Notícia urgente em destaque ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-7">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest bg-red-500 text-white px-2.5 py-1 rounded-full animate-pulse">
              ⚡ Urgente
            </span>
            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${destaque.cor}`}>{destaque.categoria}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-black leading-snug mb-3 max-w-3xl">{destaque.titulo}</h2>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">{destaque.resumo}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            <span>Fonte: <strong className="text-neutral-600">{destaque.fonte}</strong></span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            <span>{destaque.data}</span>
          </div>
        </div>
      </div>

      {/* ── Lista de notícias ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-lg font-extrabold text-black mb-6">Mais notícias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lista.map((noticia) => (
            <div key={noticia.id} className={`bg-white border ${noticia.urgente ? "border-red-200" : "border-neutral-200"} rounded-2xl p-5 hover:shadow-sm transition-all flex flex-col gap-3`}>
              <div className="flex flex-wrap items-center gap-2">
                {noticia.urgente && (
                  <span className="text-[10px] font-extrabold uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-full">⚡ Atenção</span>
                )}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${noticia.cor}`}>{noticia.categoria}</span>
              </div>
              <h3 className="font-extrabold text-base text-black leading-snug">{noticia.titulo}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 flex-1">{noticia.resumo}</p>
              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-100 mt-auto">
                <span>{noticia.fonte}</span>
                <span>{noticia.data}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base text-black mb-1">Conhece uma notícia relevante para a comunidade?</h3>
            <p className="text-neutral-500 text-sm">Envie para nossa equipe. Se for útil ao nosso público, publicamos aqui.</p>
          </div>
          <Link href="/fale-conosco" className="flex-shrink-0 bg-brand-ciano hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity">
            Enviar notícia
          </Link>
        </div>
      </div>

    </main>
  );
}
