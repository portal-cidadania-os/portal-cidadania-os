import React from "react";
import Link from "next/link";
import BannerCarousel from "@/components/BannerCarousel";

// ============================================================
// Portal Cidadania OS — Landing Page (/)
// Pura landing page institucional. Login movido para /entrar
// ============================================================

// Dados placeholder — substitua por dados reais ou busca do Supabase
const NUMEROS_IMPACTO = [
  { valor: "1.000+", label: "Vagas por Mês" },
  { valor: "7", label: "Núcleos Ativos" },
  { valor: "4+", label: "Cursos Profissionalizantes" },
  { valor: "Piracicaba", label: "Com amor à cidade" },
];

const SERVICOS = [
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    cor: "bg-brand-ciano/10 text-brand-ciano",
    titulo: "Cursos & Capacitação",
    descricao: "Qualificação profissional gratuita nas áreas de tecnologia, empreendedorismo, saúde e cidadania.",
    href: "/cursos",
    cta: "Ver cursos disponíveis",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    cor: "bg-brand-magenta/10 text-brand-magenta",
    titulo: "Vagas & Emprego",
    descricao: "Acesso a oportunidades de trabalho em parceria com empresas locais comprometidas com a inclusão social.",
    href: "/vagas",
    cta: "Buscar vagas",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    cor: "bg-brand-amarelo/20 text-amber-600",
    titulo: "Voluntariado",
    descricao: "Conecte seu tempo e talento a causas que transformam vidas. Cadastre-se como voluntário.",
    href: "/voluntariado",
    cta: "Ser voluntário",
  },
  {
    icone: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    cor: "bg-brand-verde/10 text-brand-verde",
    titulo: "Recursos Cidadãos",
    descricao: "Informações sobre editais, programas assistenciais, direitos sociais e serviços públicos disponíveis.",
    href: "/publicacoes",
    cta: "Acessar recursos",
  },
];

const NOTICIAS = [
  {
    id: 1,
    categoria: "#MadureiraTem",
    corCategoria: "bg-brand-ciano/10 text-brand-ciano",
    titulo: "Desenvolvimento de Pessoas — novas turmas abertas",
    resumo: "Carol Alves, Juliana Galvão e Raquel Campos conduzem nova edição do programa de desenvolvimento humano e social.",
    data: "Junho de 2026",
    href: "/noticias/desenvolvimento-pessoas",
  },
  {
    id: 2,
    categoria: "Empregabilidade",
    corCategoria: "bg-brand-verde/10 text-brand-verde",
    titulo: "+1.000 vagas de emprego ofertadas mensalmente",
    resumo: "Núcleo de Desenvolvimento e Empregabilidade, com coord. Zezinho Monteiro, em parceria com Adiante Brasil.",
    data: "Junho de 2026",
    href: "/vagas",
  },
  {
    id: 3,
    categoria: "Núcleo CRESCER",
    corCategoria: "bg-brand-amarelo/20 text-amber-600",
    titulo: "Encontro de Mulheres Empreendedoras — inscrições abertas",
    resumo: "Evento do Núcleo CRESCER reúne empresários e empreendedoras de Piracicaba para capacitação e networking.",
    data: "Julho de 2026",
    href: "/noticias/crescer-mulheres",
  },
];

export default function LandingPage() {
  return (
    <main className="w-full bg-white text-black">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white">
        {/* Fundo FUNDO.png animado — mais visível */}
        <div className="absolute inset-0 pointer-events-none bg-movimento-suave opacity-[0.3]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* ── Coluna esquerda: texto ── */}
          <div className="flex flex-col gap-6 justify-center px-6 md:px-10 lg:px-12 xl:px-20 py-16 md:py-24 text-black">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-black/5 border border-black/20 text-black text-sm font-bold px-4 py-1.5 rounded-full self-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              Centro Restaurando Cidadania · Piracicaba
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-black">
              Conectando pessoas a{" "}
              <span className="text-amber-600">oportunidades</span>{" "}
              que transformam vidas
            </h1>

            <p className="text-black text-base md:text-lg leading-relaxed max-w-lg">
              Cursos gratuitos, vagas de emprego, saúde, odontologia e farmácia solidária — tudo em um único portal, acessível para toda a comunidade de Piracicaba.
            </p>

            {/* Hashtag */}
            <div className="flex items-center gap-2">
              <span className="text-amber-600 font-extrabold text-lg tracking-tight">#MadureiraTem</span>
              <span className="text-black/20 text-sm">·</span>
              <span className="text-black text-sm font-semibold">Desenvolvimento de Pessoas</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/entrar?tab=cadastro"
                className="bg-brand-ciano hover:opacity-90 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-opacity"
              >
                Cadastre-se gratuitamente
              </Link>
              <Link
                href="/cursos"
                className="border border-black/20 hover:border-black/40 text-black font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors"
              >
                Ver cursos →
              </Link>
            </div>
          </div>

          {/* ── Coluna direita: carousel com fundo visível ao redor ── */}
          <div className="relative min-h-[340px] lg:min-h-0 p-4 md:p-6 lg:p-8 flex items-stretch">
            <div className="relative flex-1 min-h-[290px] rounded-2xl overflow-hidden shadow-xl">
              <BannerCarousel />
            </div>
          </div>

        </div>
      </section>

      {/* ── NÚMEROS DE IMPACTO ── */}
      <section className="bg-brand-ciano border-t-2 border-b-2 border-brand-amarelo">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black">
            {NUMEROS_IMPACTO.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold">{item.valor}</div>
                <div className="text-black/60 text-sm font-medium mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-3">
            O que oferecemos
          </h2>
          <p className="text-neutral-500 text-base max-w-2xl mx-auto">
            Serviços e programas para a comunidade, totalmente gratuitos e acessíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICOS.map((servico) => (
            <div
              key={servico.titulo}
              className="bg-white border border-black/20 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${servico.cor}`}>
                {servico.icone}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-extrabold text-lg text-black leading-tight">{servico.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{servico.descricao}</p>
              </div>
              <Link
                href={servico.href}
                className="text-brand-ciano font-bold text-sm hover:underline mt-auto"
              >
                {servico.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTÍCIAS + CTA CADASTRO ── */}
      <section className="bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Notícias */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-black tracking-tight">Últimas Notícias</h2>
                <Link href="/noticias" className="text-brand-ciano font-semibold text-sm hover:underline">
                  Ver todas →
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {NOTICIAS.map((noticia) => (
                  <Link
                    key={noticia.id}
                    href={noticia.href}
                    className="bg-white border border-black/20 rounded-xl p-5 hover:border-black/40 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2 ${noticia.corCategoria}`}>
                          {noticia.categoria}
                        </span>
                        <h3 className="font-extrabold text-base text-black group-hover:text-brand-ciano transition-colors leading-tight mb-1">
                          {noticia.titulo}
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">{noticia.resumo}</p>
                        <span className="text-neutral-400 text-xs mt-2 block">{noticia.data}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA de cadastro */}
            <div className="lg:col-span-5">
              <div className="bg-[#0a0a1a] rounded-2xl p-8 text-white sticky top-28">
                <div className="w-10 h-10 rounded-xl bg-brand-ciano/10 flex items-center justify-center mb-4">
                  <svg width="20" height="20" fill="none" stroke="#0099ff" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold mb-2">Acesse o Portal</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Crie sua conta gratuita e tenha acesso aos cursos, vagas e todos os recursos da plataforma.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/entrar?tab=cadastro"
                    className="w-full text-center bg-brand-ciano hover:opacity-90 text-white font-bold py-3 rounded-xl text-sm transition-opacity"
                  >
                    Criar conta gratuita
                  </Link>
                  <Link
                    href="/entrar"
                    className="w-full text-center border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-semibold py-3 rounded-xl text-sm transition-all"
                  >
                    Já tenho conta — fazer login
                  </Link>
                </div>
                <p className="text-white/25 text-xs text-center mt-4">
                  Dados protegidos pela LGPD · Sem anúncios
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BANNER CTA FINAL ── */}
      <section className="bg-brand-amarelo">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-3">
            Junte-se à nossa comunidade
          </h2>
          <p className="text-black/60 text-base max-w-xl mx-auto mb-8">
            O Centro Restaurando Cidadania conecta famílias de Piracicaba a saúde, educação, emprego e dignidade — porque <strong>#MadureiraTem</strong> o que a sua família precisa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/associe-se"
              className="bg-black text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:opacity-80 transition-opacity"
            >
              Associe-se
            </Link>
            <Link
              href="/quem-somos"
              className="border-2 border-black/20 text-black font-semibold px-8 py-3.5 rounded-xl text-sm hover:border-black/40 transition-colors"
            >
              Conheça nossa história
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
