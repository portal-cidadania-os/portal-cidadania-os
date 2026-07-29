"use client";

// ============================================================
// BgSlideshow — 28 fotos gerais do CERPI passando em sequência,
// sem título/tag/link por imagem (fotos soltas, só ambientação).
// Cada imagem cobre a coluna esquerda (35% da largura),
// entra da esquerda e para ao lado do texto (coluna direita).
// Borda direita tem fade suave para fundir com o fundo.
// Imagens em: public/slides/banner1.jpg ... banner28.jpg
// Uso: <BgSlideshow opacity={1} />
// ============================================================

const TOTAL_IMAGENS = 28;
const IMAGES = Array.from(
  { length: TOTAL_IMAGENS },
  (_, i) => `/slides/banner${i + 1}.jpg`
);

const DURATION_PER_IMAGE = 6;                          // segundos por imagem
const TOTAL_DURATION = IMAGES.length * DURATION_PER_IMAGE; // ciclo total (28 x 6s = 168s)

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
        <img
          key={src}
          src={src}
          alt=""
          className="absolute top-0 left-0 h-full"
          style={{
            width: "35%",
            objectFit: "cover",
            objectPosition: "center",
            /* Fade suave na borda direita — funde com o fundo */
            WebkitMaskImage:
              "linear-gradient(to right, black 55%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, black 55%, transparent 100%)",
            /* Animação: slide da esquerda + fade in/out */
            animation: `bgSlideFromLeft ${TOTAL_DURATION}s infinite`,
            animationDelay: `${i * DURATION_PER_IMAGE}s`,
            animationFillMode: "both", // mantém estado do 1º keyframe durante o delay
          }}
        />
      ))}
    </div>
  );
}
