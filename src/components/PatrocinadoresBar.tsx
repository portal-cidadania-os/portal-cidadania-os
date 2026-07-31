"use client";

// ============================================================
// PatrocinadoresBar — barra preta abaixo da faixa de impacto.
// Dividida ao meio:
//   Esquerda : logo institucional centralizado (logocidadaniabr.png)
//   Direita  : carrossel automático dos patrocinadores
//              cada logo: círculo 80×80 com borda laranja #E88D0C
// Altura: 167px | Carrossel: 18s
// Imagens em: public/patrocinadores/
// ============================================================

const PATROCINADORES = [
  { nome: "ACOVITTA – Sua vida acolhida", arquivo: "/patrocinadores/ACOVITTA.jpeg", href: "/" },
  { nome: "GETEC Soluções Elétricas",     arquivo: "/patrocinadores/GETEC.jpeg",    href: "/" },
];

export default function PatrocinadoresBar() {
  // Triplicar para o loop ser suave mesmo com poucos logos
  const lista = [...PATROCINADORES, ...PATROCINADORES, ...PATROCINADORES];

  return (
    <section
      className="w-full overflow-hidden"
      style={{ background: "#000000" }}
      aria-label="Parceiros e patrocinadores"
    >
      <div className="flex items-center" style={{ minHeight: "167px" }}>

        {/* ── METADE ESQUERDA: logo institucional centralizado ── */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "50%",
            borderRight: "1px solid #222",
            height: "167px",
          }}
        >
          <img
            src="/barras/logocidadaniabr.png"
            alt="Cidadania Piracicaba"
            style={{ height: "100px", width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* ── METADE DIREITA: carrossel de patrocinadores ──── */}
        <div
          className="overflow-hidden flex items-center"
          style={{ width: "50%", height: "167px", paddingLeft: "20px" }}
        >
          <div className="patrocinadores-track flex items-center gap-6">
            {lista.map((p, i) => (
              <a
                key={`${p.nome}-${i}`}
                href={p.href}
                className="flex-shrink-0"
                aria-label={p.nome}
                title={p.nome}
              >
                <img
                  src={p.arquivo}
                  alt={p.nome}
                  style={{
                    height: "80px",
                    width: "80px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "3px solid #E88D0C",
                    display: "block",
                  }}
                />
              </a>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .patrocinadores-track {
          width: max-content;
          animation: patrocinadores-marquee 20s linear infinite;
        }
        @keyframes patrocinadores-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-80.000%); }
        }
        .patrocinadores-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
