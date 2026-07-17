"use client";

import Link from "next/link";

interface NucleoCardProps {
  titulo: string;
  subtitulo: string;
  href: string;
  imagem: string;
  acento: string;
  fallback: string;
}

export default function NucleoCard({ titulo, subtitulo, href, imagem, acento, fallback }: NucleoCardProps) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] block shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <img
        src={imagem}
        alt={titulo}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = fallback;
          img.onerror = null;
        }}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span
          className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
          style={{ background: `${acento}30`, color: acento, border: `1px solid ${acento}50` }}
        >
          #MadureiraTem
        </span>
        <h3 className="text-white font-extrabold text-sm md:text-base leading-tight">
          {titulo}
        </h3>
        <p className="text-white/60 text-[11px] mt-0.5 leading-snug">
          {subtitulo}
        </p>
      </div>
    </Link>
  );
}
