"use client";

import React, { useState, useEffect } from "react";

// ============================================================
// HeroSection — CERPI (responsivo: mobile / tablet / desktop)
//
// Mobile  : imagem em topo (full-width, clamp height), texto abaixo
// Desktop : imagem na coluna esquerda (52%), texto na direita
//
// Sequência: Banner1 → Banner2 → ... → Banner28 → (loop)
// Crossfade a cada SLIDE_S segundos via React state.
// A cada novo grupo de 3 banners, a coluna desktop re-entra com animação.
// ============================================================

const TOTAL_BANNERS = 28;
const SLIDE_S       = 6;       // segundos por banner
const CROSSFADE_MS  = 800;

const ALL_BANNERS = Array.from({ length: TOTAL_BANNERS }, (_, i) => `/slides/banner${i + 1}.jpg`);

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [columnKey,   setColumnKey]   = useState(0); // força re-entrada da coluna a cada grupo

  // ── Ciclo contínuo de banners ─────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((s) => {
        const next = (s + 1) % TOTAL_BANNERS;
        // A cada início de grupo (múltiplo de 3), re-anima a coluna desktop
        if (next % 3 === 0) {
          setColumnKey((k) => k + 1);
        }
        return next;
      });
    }, SLIDE_S * 1_000);

    return () => clearInterval(interval);
  }, []);

  // ─────────────────────────────────────────────────────────────────────
  // RENDER
  //
  // Camadas:
  //  z-0  base branca (desktop)
  //  z-10 imagem (mobile: no fluxo / desktop: absolute esquerda)
  //  z-20 texto (mobile: abaixo da imagem / desktop: coluna direita)
  // ─────────────────────────────────────────────────────────────────────
  return (
    <section className="relative overflow-hidden bg-white">

      {/* ── z-0: base branca (desktop) ── */}
      <div className="absolute inset-0 bg-white hidden lg:block" style={{ zIndex: 0 }} />

      {/* ══════════════════════════════════════════════════
          MOBILE: coluna de imagem em fluxo normal
          Sempre ocupa espaço (evita layout shift).
      ══════════════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden lg:hidden"
        style={{ height: "clamp(220px, 45vw, 320px)", zIndex: 10 }}
      >
        {ALL_BANNERS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: i === activeSlide ? 1 : 0,
              transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          DESKTOP: coluna de imagem absoluta (esquerda 52%)
          Re-anima (hero-col-enter) a cada novo grupo de 3.
      ══════════════════════════════════════════════════ */}
      <div
        key={columnKey}
        className="hero-col-enter hero-col-mask absolute top-0 left-0 h-full pointer-events-none overflow-hidden hidden lg:block"
        style={{ width: "52%", zIndex: 10 }}
      >
        {ALL_BANNERS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: i === activeSlide ? 1 : 0,
              transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          TEXTO — mobile: abaixo da imagem / desktop: coluna direita
      ══════════════════════════════════════════════════ */}
      <div
        className="relative grid grid-cols-1 lg:grid-cols-2 lg:min-h-[500px]"
        style={{ zIndex: 20 }}
      >
        {/* Espaçador — só desktop (ocupa lugar da coluna de imagem) */}
        <div className="hidden lg:block" />

        {/* Coluna de texto */}
        <div className="
          px-5 py-7
          sm:px-8 sm:py-8
          lg:pl-10 lg:pr-6 lg:pt-6 lg:pb-14
          xl:pl-12 xl:pr-8
          bg-white lg:bg-transparent
          text-black
        ">
          {/* Linha interna: texto à esquerda, logo à direita */}
          <div className="flex flex-row items-center gap-4">

            {/* Bloco de texto */}
            <div className="flex flex-col gap-4 lg:gap-5 flex-1 min-w-0">
              <h1 className="
                text-3xl sm:text-4xl md:text-5xl
                font-extrabold leading-tight tracking-tight text-black
              ">
                Conectando pessoas a{" "}
                <span className="text-brand-amarelo">oportunidades</span>{" "}
                que transformam vidas
              </h1>

              <div className="text-black text-sm sm:text-base md:text-lg leading-relaxed flex flex-col gap-3">
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

              <div className="flex items-center gap-2">
                <span className="text-brand-amarelo font-extrabold text-base sm:text-lg tracking-tight">
                  #MadureiraTem
                </span>
                <span className="text-black/20 text-sm">·</span>
                <span className="text-black text-xs sm:text-sm font-semibold">
                  Desenvolvimento de Pessoas
                </span>
              </div>
            </div>

            {/* Logo — à direita do texto, centralizado verticalmente */}
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/logo/logo%20cidadania2.png"
                alt="Logo Cidadania Madureira"
                style={{ height: "88px", width: "auto" }}
                className="object-contain"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
