"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ============================================================
// Centro Restaurando Cidadania — Banner Carousel
// 7 slides: Portal, Cursos, CRESCER, Empregabilidade,
//           Saúde, Sorria com Cristo, Farmácia Solidária
// Full-bleed: foto real como background de cada slide.
// O slide inteiro é um Link clicável → landpage do núcleo.
// Gradiente lateral funde com o fundo escuro do Hero.
// ============================================================

interface Slide {
  id: number;
  tag: string;
  titulo: string;
  subtitulo: string;
  destaque?: string;
  href: string;
  imagem: string;
  acento: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: "#MadureiraTem",
    titulo: "Portal Cidadania",
    subtitulo: "Conectando pessoas a oportunidades que transformam vidas em Piracicaba.",
    destaque: "Carol Alves · Juliana Galvão · Raquel Campos",
    href: "/",
    imagem: "/portal.png",
    acento: "#0099ff",
  },
  {
    id: 2,
    tag: "Capacitação Profissional",
    titulo: "Cursos Gratuitos",
    subtitulo: "Auto Maquiagem · LIBRAS · Manicure · Auxiliar de Cabeleireiro",
    destaque: "Turmas abertas",
    href: "/cursos",
    imagem: "/cursos.png",
    acento: "#cc44ff",
  },
  {
    id: 3,
    tag: "Núcleo CRESCER",
    titulo: "Empresários e Empreendedoras",
    subtitulo: "Encontro de Mulheres Empreendedoras · Desenvolvimento de líderes locais.",
    destaque: "Lider Carol Alves · Mayara Santos · Lider Pr. Henrique",
    href: "/crescer",
    imagem: "/crescer.png",
    acento: "#ffcc00",
  },
  {
    id: 4,
    tag: "Núcleo de Empregabilidade",
    titulo: "+1.000 Vagas por Mês",
    subtitulo: "Vagas de emprego, cursos e desenvolvimento pessoal. Parceria Adiante Brasil.",
    destaque: "Coord. Zezinho Monteiro",
    href: "/vagas",
    imagem: "/empregabilidade.png",
    acento: "#33cc66",
  },
  {
    id: 5,
    tag: "Madureira Saúde",
    titulo: "Clínica Médica",
    subtitulo: "Medicina · Nutrição · Psicologia · Atendimento humanizado para a comunidade.",
    destaque: "Fabio Rufino · Dra. Paola · Sulamita · Nutricionista Fábiana · Psicóloga Gabriela",
    href: "/saude",
    imagem: "/saude.png",
    acento: "#ff4444",
  },
  {
    id: 6,
    tag: "Sorria com Cristo",
    titulo: "Odontologia Solidária",
    subtitulo: "Atendimento odontológico gratuito para crianças e adultos da comunidade.",
    destaque: "@sorriacomcristo_admp",
    href: "/saude#odontologia",
    imagem: "/dentista.png",
    acento: "#ff66cc",
  },
  {
    id: 7,
    tag: "Farmácia Solidária",
    titulo: "Acesso a Medicamentos",
    subtitulo: "Cama hospitalar · Cadeira de roda · Andador · Medicamentos para a comunidade.",
    destaque: "Sulamita · Pastor Dri · Junior Minharo",
    href: "/farmacia",
    imagem: "/Farmacia.png",
    acento: "#ff9944",
  },
];

export default function BannerCarousel() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const proximo = useCallback(() => {
    setAtual((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const anterior = useCallback(() => {
    setAtual((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-play a cada 4 segundos
  useEffect(() => {
    if (pausado) return;
    const timer = setInterval(proximo, 4000);
    return () => clearInterval(timer);
  }, [proximo, pausado]);

  const slide = SLIDES[atual];

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === atual ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Foto real como fundo full-bleed */}
          <img
            src={s.imagem}
            alt={s.titulo}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradiente lateral — funde com o fundo claro do Hero pela esquerda */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />

          {/* Gradiente vertical — escurece a base para legibilidade do texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Slide inteiro é clicável → landpage do núcleo */}
          <Link
            href={s.href}
            className="absolute inset-0 z-10 flex flex-col justify-end p-6 group"
            aria-label={`Saiba mais sobre ${s.titulo}`}
          >
            {/* Tag badge */}
            <span
              className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full self-start mb-2"
              style={{
                background: `${s.acento}22`,
                color: s.acento,
                border: `1px solid ${s.acento}44`,
              }}
            >
              {s.tag}
            </span>

            {/* Título */}
            <h3 className="text-white font-extrabold text-lg md:text-xl leading-tight mb-1 group-hover:opacity-90 transition-opacity">
              {s.titulo}
            </h3>

            {/* Subtítulo */}
            <p className="text-white/60 text-xs leading-relaxed mb-1.5">
              {s.subtitulo}
            </p>

            {/* Destaque (líderes / coordenadores) */}
            {s.destaque && (
              <span className="text-white/40 text-[10px] font-semibold mb-3 block">
                {s.destaque}
              </span>
            )}

            {/* CTA */}
            <div
              className="inline-flex items-center gap-2 text-xs font-bold self-start px-4 py-2 rounded-lg transition-opacity group-hover:opacity-80"
              style={{
                background: `${s.acento}20`,
                color: s.acento,
                border: `1px solid ${s.acento}35`,
              }}
            >
              Saiba mais
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      ))}

      {/* Botão anterior */}
      <button
        onClick={anterior}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors"
        aria-label="Slide anterior"
      >
        <svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Botão próximo */}
      <button
        onClick={proximo}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors"
        aria-label="Próximo slide"
      >
        <svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setAtual(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === atual ? "18px" : "5px",
              height: "5px",
              borderRadius: "3px",
              background: i === atual ? slide.acento : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>

      {/* Barra de progresso */}
      {!pausado && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20 bg-white/5">
          <div
            key={atual}
            className="h-full rounded-full"
            style={{
              background: slide.acento,
              animation: "progress 4s linear forwards",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
