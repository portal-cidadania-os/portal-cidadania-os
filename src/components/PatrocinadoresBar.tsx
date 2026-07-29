"use client";

import Link from "next/link";

// ============================================================
// PatrocinadoresBar — faixa abaixo dos Números de Impacto,
// com os logos dos patrocinadores em carrossel automático.
// Imagens em: public/patrocinadores/
// Sem site institucional próprio ainda -> href aponta para "/"
// (a home do próprio portal). Trocar o href assim que tiverem site.
// ============================================================

const PATROCINADORES = [
  { nome: "ACOVITTA", arquivo: "/patrocinadores/ACOVITTA.jpeg", href: "/" },
  { nome: "GETEC Soluções Elétricas", arquivo: "/patrocinadores/GETEC.jpeg", href: "/" },
];

export default function PatrocinadoresBar() {
  // Duplica a lista para o loop do carrossel ficar contínuo (sem "salto" no fim)
  const lista = [...PATROCINADORES, ...PATROCINADORES];

  return (
    <section className="bg-white border-b border-neutral-100 overflow-hidden">
      <div className="py-6">
        <div className="flex items-center gap-16 w-max animate-patrocinadores-scroll">
          {lista.map((p, i) => (
            <Link
              key={`${p.nome}-${i}`}
              href={p.href}
              className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
              aria-label={p.nome}
              title={p.nome}
            >
              <img
                src={p.arquivo}
                alt={p.nome}
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes patrocinadores-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-patrocinadores-scroll {
          animation: patrocinadores-scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
