"use client";

// ============================================================
// HeroBgFade — alterna duas imagens de fundo com transição suave
// (crossfade) a cada 5 segundos. Substitui o gradiente roxo fixo.
// Imagens em: public/fundo/diversos.jpg e diversos2.jpg
// Mesmo fade lateral (mask) usado no restante do Hero, pra fundir
// com a área de texto à direita.
// ============================================================

import { useState, useEffect } from "react";

const IMAGENS = ["/fundo/diversos.jpg", "/fundo/diversos2.jpg"];
const INTERVALO_MS = 5000;

export default function HeroBgFade() {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAtual((prev) => (prev + 1) % IMAGENS.length);
    }, INTERVALO_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to right, black 55%, transparent 100%)",
        maskImage: "linear-gradient(to right, black 55%, transparent 100%)",
      }}
    >
      {IMAGENS.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === atual ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
