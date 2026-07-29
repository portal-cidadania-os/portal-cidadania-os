"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================
// HeroSection — CERPI (responsivo: mobile / tablet / desktop)
//
// Mobile  : imagem em topo (full-width, 260px), texto abaixo
// Desktop : imagem na coluna esquerda (52%), texto na direita
//
// Sequência:
//   [FundoFixo 5s] → [Slides G0: B1-B3] → [FundoFixo 5s]
//   → [Preview B4 5s] → [Slides G1: B4-B6] → ...
//   → (loop após B28)
// ============================================================

const TOTAL_BANNERS = 28;
const PER_GROUP     = 3;
const NUM_GROUPS    = Math.ceil(TOTAL_BANNERS / PER_GROUP); // 10
const SLIDE_S       = 6;      // segundos por banner
const FUNDO_MS      = 5_000;
const PREVIEW_MS    = 5_000;
const CROSSFADE_MS  = 800;

const FUNDO_SRC  = "/fundo/FundoFixo.jpg";
const ALL_BANNERS = Array.from({ length: TOTAL_BANNERS }, (_, i) => `/slides/banner${i + 1}.jpg`);

type Phase = "fundo" | "preview" | "slides";

function groupBanners(g: number): string[] {
  return ALL_BANNERS.slice(g * PER_GROUP, g * PER_GROUP + PER_GROUP);
}

export default function HeroSection() {
  const [groupIndex,  setGroupIndex]  = useState(0);
  const [phase,       setPhase]       = useState<Phase>("fundo");
  const [activeSlide, setActiveSlide] = useState(0);
  const [columnKey,   setColumnKey]   = useState(0); // força re-entrada da coluna
  const firstCycle = useRef(true);

  // ── Máquina de estados (fundo / preview / slides) ─────────────────────
  useEffect(() => {
    const banners = groupBanners(groupIndex);
    const ms =
      phase === "fundo"   ? FUNDO_MS :
      phase === "preview" ? PREVIEW_MS :
      banners.length * SLIDE_S * 1_000;

    const timer = setTimeout(() => {
      if (phase === "fundo") {
        if (firstCycle.current) {
          firstCycle.current = false;
          setActiveSlide(0);
          setColumnKey((k) => k + 1);
          setPhase("slides");
        } else {
          setPhase("preview");
        }
      } else if (phase === "preview") {
        setActiveSlide(0);
        setColumnKey((k) => k + 1);
        setPhase("slides");
      } else {
        const next = (groupIndex + 1) % NUM_GROUPS;
        setGroupIndex(next);
        setPhase("fundo");
      }
    }, ms);

    return () => clearTimeout(timer);
  }, [phase, groupIndex]);

  // ── Ciclo de banners dentro da fase slides (crossfade) ────────────────
  useEffect(() => {
    if (phase !== "slides") return;
    setActiveSlide(0);
    const banners = groupBanners(groupIndex);
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((s) => Math.min(s + 1, banners.length - 1));
    }, SLIDE_S * 1_000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, columnKey]);

  const banners    = groupBanners(groupIndex);
  const previewSrc = banners[0];

  // ─────────────────────────────────────────────────────────────────────
  // RENDER
  //
  // Camadas:
  //  z-0  base branca
  //  z-10 imagem (mobile: no fluxo / desktop: absolute esquerda)
  //  z-20 texto (mobile: abaixo da imagem / desktop: coluna direita)
  //  z-30 overlay FundoFixo (cobre tudo quando phase=fundo)
  //  z-31 overlay Preview   (cobre tudo quando phase=preview)
  // ─────────────────────────────────────────────────────────────────────
  return (
    <section className="relative overflow-hidden bg-white">

      {/* ── z-0: base branca (desktop) ── */}
      <div className="absolute inset-0 bg-white hidden lg:block" style={{ zIndex: 0 }} />

      {/* ══════════════════════════════════════════════════
          MOBILE: coluna de imagem em fluxo normal
          Sempre ocupa espaço (evita layout shift).
          A imagem correta aparece conforme a fase.
      ══════════════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden lg:hidden"
        style={{ height: "clamp(220px, 45vw, 320px)", zIndex: 10 }}
      >
        {/* Banners (crossfade) — visíveis na fase slides */}
        {banners.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: phase === "slides" && i === activeSlide ? 1 : 0,
              transition: `opacity ${CROSSFADE_MS}ms ease-in-out`,
            }}
          />
        ))}

        {/* FundoFixo — visível na fase fundo */}
        <img
          src={FUNDO_SRC}
          alt="Departamento Cidadania Madureira"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            opacity: phase === "fundo" ? 1 : 0,
            transition: "opacity 1200ms ease-in-out",
          }}
        />

        {/* Preview banner — visível na fase preview */}
        <img
          src={previewSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            opacity: phase === "preview" ? 1 : 0,
            transition: "opacity 1200ms ease-in-out",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════
          DESKTOP: coluna de imagem absoluta (esquerda 52%)
          Só renderiza na fase slides — overlays cobrem o restante.
      ══════════════════════════════════════════════════ */}
      {phase === "slides" && (
        <div
          key={columnKey}
          className="hero-col-enter hero-col-mask absolute top-0 left-0 h-full pointer-events-none overflow-hidden hidden lg:block"
          style={{ width: "52%", zIndex: 10 }}
        >
          {banners.map((src, i) => (
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
      )}

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
          flex flex-col gap-4 lg:gap-5
          px-5 py-7
          sm:px-8 sm:py-8
          lg:pl-10 lg:pr-6 lg:pt-10 lg:pb-14
          xl:pl-12 xl:pr-8
          bg-white lg:bg-transparent
          text-black
        ">
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
      </div>

      {/* ══════════════════════════════════════════════════
          OVERLAYS GLOBAIS (cobrem tudo — mobile e desktop)
          FundoFixo e Preview ficam na frente (z 30/31)
          e cobrem tanto a imagem mobile quanto o texto.
      ══════════════════════════════════════════════════ */}

      {/* FundoFixo — fase "fundo" */}
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

      {/* Preview do 1º banner do próximo grupo — fase "preview" */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]"
        style={{ zIndex: 31, opacity: phase === "preview" ? 1 : 0 }}
      >
        <img
          src={previewSrc}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
