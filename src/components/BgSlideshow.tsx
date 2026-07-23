"use client";

// ============================================================
// BgSlideshow — fundo em slideshow com transição suave
// As imagens se alternam em loop, cada uma com fade in/out.
// Uso: <BgSlideshow /> substitui o div de fundo animado
// Para ajustar opacidade geral: prop opacity (padrão: 0.12)
// Para usar imagens diferentes: altere o array IMAGES abaixo
// ============================================================

const IMAGES = [
  "/slides/portal.png",
  "/slides/cursos.png",
  "/slides/crescer.png",
  "/slides/empregabilidade.png",
  "/slides/saude.png",
  "/slides/dentista.png",
  "/slides/farmacia.png",
];

const DURATION_PER_IMAGE = 6; // segundos visível por imagem
const TOTAL_DURATION = IMAGES.length * DURATION_PER_IMAGE; // 42s

interface BgSlideshowProps {
  opacity?: number;
}

export default function BgSlideshow({ opacity = 0.12 }: BgSlideshowProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            animation: `bgSlideshow ${TOTAL_DURATION}s infinite`,
            animationDelay: `${i * DURATION_PER_IMAGE}s`,
          }}
        />
      ))}
    </div>
  );
}
