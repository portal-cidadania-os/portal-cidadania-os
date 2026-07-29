"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================
// HeroSection — CERPI
//
// Sequência por grupo de 3 banners:
//   [FundoFixo 5s]
//   → [Coluna esquerda entra da esquerda, banners se revezam com crossfade
//      por SLIDE_S segundos cada (sem gap branco), texto aparece à direita — 18s total]
//   → [FundoFixo 5s]
//   → [Preview: 1º banner do próximo grupo em tela cheia — 5s]
//   → repete para o próximo grupo
//
// Correção de timing: container CSS entra 1 vez por grupo;
// banners individuais alternam via React state (crossfade opacity),
// sem gap branco entre eles.
// ============================================================

const TOTAL_BANNERS  = 28;
const PER_GROUP      = 3;
const NUM_GROUPS     = Math.ceil(TOTAL_BANNERS / PER_GROUP); // 10
const SLIDE_S        = 6;      // segundos que cada banner fica visível
const FUNDO_MS       = 5_000;
const PREVIEW_MS     = 5_000;
const CROSSFADE_MS   = 800;    // duração do crossfade entre banners (ms)

const FUNDO_SRC  = "/fundo/FundoFixo.jpg";
const ALL_BANNERS = Array.from(
  { length: TOTAL_BANNERS },
  (_, i) => `/slides/banner${i + 1}.jpg`
);

type Phase = "fundo" | "preview" | "slides";

function groupBanners(g: number): string[] {
  return ALL_BANNERS.slice(g * PER_GROUP, g * PER_GROUP + PER_GROUP);
}

export default function HeroSection() {
  const [groupIndex, setGroupIndex]     = useState(0);
  const [phase, setPhase]               = useState<Phase>("fundo");
  const [activeSlide, setActiveSlide]   = useState(0);   // banner ativo dentro do grupo
  const [columnKey, setColumnKey]       = useState(0);   // força re-entrada da coluna
  const firstCycle = useRef(true);

  // ── Máquina de estados principal (fundo / preview / slides) ──────────
  useEffect(() => {
    const banners = groupBanners(groupIndex);
    const slidesDuration = banners.length * SLIDE_S * 1_000;

    const ms =
      phase === "fundo"   ? FUNDO_MS       :
      phase === "preview" ? PREVIEW_MS     :
      slidesDuration;

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
        // slides → próximo grupo → fundo
        const next = (groupIndex + 1) % NUM_GROUPS;
        setGroupIndex(next);
        setPhase("fundo");
      }
    }, ms);

    return () => clearTimeout(timer);
  }, [phase, groupIndex]);

  // ── Ciclo de banners DENTRO da fase slides (crossfade, sem gap) ───────
  useEffect(() => {
    if (phase !== "slides") return;
    setActiveSlide(0); // começa do banner 0 do grupo

    const banners = groupBanners(groupIndex);
    if (banners.length <= 1) return; // só 1 banner → não precisa ciclar

    const interval = setInterval(() => {
      setActiveSlide((s) => Math.min(s + 1, banners.length - 1));
    }, SLIDE_S * 1_000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, columnKey]); // columnKey garante reset ao trocar de grupo

  const banners     = groupBanners(groupIndex);
  const previewSrc  = banners[0]; // 1º banner do grupo atual para tela cheia

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "500px", background: "#fff" }}
    >
      {/* ── z-0: base branca ── */}
      <div className="absolute inset-0 bg-white" style={{ zIndex: 0 }} />

      {/* ── z-10: Coluna esquerda com banners em crossfade ── */}
      {phase === "slides" && (
        <div
          key={columnKey}
          className="absolute top-0 left-0 h-full pointer-events-none overflow-hidden"
          style={{
            width: "52%",
            zIndex: 10,
            WebkitMaskImage: "linear-gradient(to right, black 65%, transparent 100%)",
            maskImage:        "linear-gradient(to right, black 65%, transparent 100%)",
            /* Entra da esquerda uma única vez quando o grupo começa */
            animation: `heroColumnIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
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

      {/* ── z-20: Grid texto (visível só na fase slides) ── */}
      <div
        className="relative grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-[1200ms]"
        style={{ minHeight: "500px", zIndex: 20, opacity: phase === "slides" ? 1 : 0 }}
      >
        {/* Coluna esquerda — transparente */}
        <div />

        {/* Coluna direita — texto institucional */}
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

          <div className="flex items-center gap-2">
            <span className="text-brand-amarelo font-extrabold text-lg tracking-tight">
              #MadureiraTem
            </span>
            <span className="text-black/20 text-sm">·</span>
            <span className="text-black text-sm font-semibold">Desenvolvimento de Pessoas</span>
          </div>
        </div>
      </div>

      {/* ── z-30: FundoFixo.jpg (fase "fundo") ── */}
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

      {/* ── z-31: Preview do 1º banner do próximo grupo (fase "preview") ── */}
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
