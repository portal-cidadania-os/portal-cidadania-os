import React from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PatrocinadoresBar from "@/components/PatrocinadoresBar";
import NucleoCard from "@/components/NucleoCard";
import { NUCLEOS } from "@/lib/nucleos";

// ============================================================
// Portal Cidadania OS — Landing Page (/)
// Pura landing page institucional. Login movido para /entrar
// ============================================================

// Dados placeholder — substitua por dados reais ou busca do Supabase
const NUMEROS_IMPACTO = [
  { valor: "1.000+", label: "Vagas por Mês" },
  { valor: "10", label: "Núcleos Ativos" },
  { valor: "4+", label: "Cursos Profissionalizantes" },
  { valor: "Piracicaba", label: "Com amor à cidade" },
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
      <HeroSection />

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

      {/* ── PATROCINADORES — barra preta com logo + carrossel ── */}
      <PatrocinadoresBar />

      {/* ── NÚCLEOS / DEPARTAMENTOS ── */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pt-8 md:pb-20">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {NUCLEOS.map((nucleo) => (
            <NucleoCard
              key={nucleo.slug}
              titulo={nucleo.titulo}
              subtitulo={nucleo.subtitulo}
              href={`/nucleos/${nucleo.slug}`}
              imagem={nucleo.imagem}
              fallback={nucleo.imagem}
              acento={nucleo.acento}
            />
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
