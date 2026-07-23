"use client";

// ============================================================
// BgSlideshow — imagens deslizam da esquerda para direita
// Cada imagem cobre a coluna esquerda (50% da largura),
// entra da esquerda e para ao lado do texto (coluna direita).
// Borda direita tem fade suave para fundir com o fundo.
// Uso: <BgSlideshow opacity={0.30} />
// ============================================================

const IMAGES = [
  "/slides/sorria-com-cristo.jpg",
  "/slides/nucleo-apoio.jpg",
  "/slides/nucleo-crescer.jpg",
  "/slides/empregabilidade.jpg",
  "/slides/esporte.jpg",
  "/slides/promocao-social.jpg",
  "/slides/pascoa.jpg",
  "/slides/natal.jpg",
  "/slides/empreendedoras.jpg",
  "/slides/acao-kids.jpg",
];

const DURATION_PER_IMAGE = 6;                          // segundos por imagem
const TOTAL_DURATION = IMAGES.length * DURATION_PER_IMAGE; // 60s ciclo total

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
            width: "50%",
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
