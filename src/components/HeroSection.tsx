"use client";

import React, { useState, useEffect } from "react";

// ============================================================
// HeroSection — CERPI
// Fase "fundo"  : FundoFixo.jpg ocupa 100% do banner (5s)
// Fase "slides" : Slideshow (3 banners × 6s = 18s) + texto
// Alterna continuamente: fundo → slides → fundo → slides ...
// A cada 3 transições de banner o FundoFixo reaparece.
// ============================================================

const FUNDO_SRC        = "/fundo/FundoFixo.jpg";
const TOTAL_SLIDES     = 28;
const SLIDE_DURATION_S = 6;                                      // segundos por slide
const SLIDES_POR_FASE  = 3;                                      // banners antes de voltar ao fundo
const FUNDO_MS         = 5_000;                                  // duração do fundo fixo
const SLIDES_MS        = SLIDES_POR_FASE * SLIDE_DURATION_S * 1_000; // 18 000 ms
const ANIM_TOTAL_S     = TOTAL_SLIDES * SLIDE_DURATION_S;        // 168s — ciclo CSS completo

const SLIDES_SRC = Array.from(
  { length: TOTAL_SLIDES },
  (_, i) => `/slides/banner${i + 1}.jpg`
);

export default function HeroSection() {
  const [phase, setPhase]           = useState<"fundo" | "slides">("fundo");
  const [slideshowKey, setSlideshowKey] = useState(0);

  useEffect(() => {
    const ms = phase === "fundo" ? FUNDO_MS : SLIDES_MS;
    const timer = setTimeout(() => {
      if (phase === "fundo") {
        setSlideshowKey((k) => k + 1); // reinicia do banner 1
        setPhase("slides");
      } else {
        setPhase("fundo");
      }
    }, ms);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "500px", background: "#fff" }}
    >
      {/* ── Camada 0: branco atrás do texto ── */}
      <div className="absolute inset-0 bg-white" style={{ zIndex: 0 }} />

      {/* ── Camada 10: Slideshow (monta/desmonta a cada fase) ── */}
      {phase === "slides" && (
        <div
          key={slideshowKey}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 10 }}
        >
          {SLIDES_SRC.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute top-0 left-0 h-full"
              style={{
                width: "52%",
                objectFit: "cover",
                objectPosition: "center",
                WebkitMaskImage: "linear-gradient(to right, black 65%, transparent 100%)",
                maskImage:       "linear-gradient(to right, black 65%, transparent 100%)",
                animation:        `bgSlideFromLeft ${ANIM_TOTAL_S}s infinite`,
                animationDelay:   `${i * SLIDE_DURATION_S}s`,
                animationFillMode: "both",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Camada 20: Grade com texto (visível só na fase 'slides') ── */}
      <div
        className="relative grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-[1200ms]"
        style={{ minHeight: "500px", zIndex: 20, opacity: phase === "slides" ? 1 : 0 }}
      >
        {/* Coluna esquerda — transparente, deixa o slideshow aparecer */}
        <div />

        {/* Coluna direita — texto */}
        <div className="flex flex-col gap-5 justify-start pl-6 pr-4 md:pl-8 md:pr-6 lg:pl-10 lg:pr-6 xl:pl-12 xl:pr-8 pt-6 md:pt-10 pb-10 md:pb-14 text-black">

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-black">
            Conectando pessoas a{" "}
            <span className="text-brand-amarelo">oportunidades</span>{" "}
            que transformam vidas
          </h1>

          <div className="text-black text-base md:text-lg leading-relaxed flex flex-col gap-3">
            <p className="text-justify">
              <strong className="font-extrabold">CERPI</strong> –{" "}
              <strong className="font-extrabold">Centro Restaurando Cidadania Piracicaba</strong>{" "}
              atua como um polo de transformação social,{" "}
              <strong className="font-extrabold">"núcleo de apoio"</strong>,{" "}
              <strong className="font-extrabold">"inclusão social para o autismo"</strong>,
              reunindo <strong className="font-extrabold">cursos gratuitos</strong>,{" "}
              <strong className="font-extrabold">vagas de emprego</strong>, serviços de{" "}
              <strong className="font-extrabold">saúde comunitária</strong>,{" "}
              <strong className="font-extrabold">odontologia</strong> e{" "}
              <strong className="font-extrabold">farmácia solidária</strong>, tudo acessível
              para a população de Piracicaba.
            </p>
            <p className="text-justify">
              O Centro desenvolve ações voltadas ao{" "}
              <strong className="font-extrabold">desenvolvimento humano</strong> e ao
              fortalecimento social, promovendo{" "}
              <strong className="font-extrabold">inclusão</strong>,{" "}
              <strong className="font-extrabold">qualificação profissional</strong>,{" "}
              <strong className="font-extrabold">educação</strong>,{" "}
              <strong className="font-extrabold">cultura</strong> e{" "}
              <strong className="font-extrabold">esporte</strong> e apoio às famílias.
              Cada iniciativa reforça o compromisso do{" "}
              <strong className="font-extrabold">CERPI</strong> em ampliar oportunidades e
              construir caminhos para uma vida mais digna, saudável e participativa.
            </p>
          </div>

          {/* Hashtag */}
          <div className="flex items-center gap-2">
            <span className="text-brand-amarelo font-extrabold text-lg tracking-tight">
              #MadureiraTem
            </span>
            <span className="text-black/20 text-sm">·</span>
            <span className="text-black text-sm font-semibold">Desenvolvimento de Pessoas</span>
          </div>
        </div>
      </div>

      {/* ── Camada 30: FundoFixo — cobre tudo na fase inicial e a cada 3 banners ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]"
        style={{ zIndex: 30, opacity: phase === "fundo" ? 1 : 0 }}
      >
        <img
          src={FUNDO_SRC}
          alt="Departamento Cidadania Madureira"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
