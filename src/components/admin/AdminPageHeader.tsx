import React from "react";
import Link from "next/link";

interface AdminPageHeaderProps {
  titulo: string;
  descricao?: string;
  ctaLabel?: string;
  ctaHref?: string;
  breadcrumb?: string;
}

export default function AdminPageHeader({
  titulo,
  descricao,
  ctaLabel,
  ctaHref,
  breadcrumb,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 text-neutral-400 text-xs mb-2">
          <Link href="/admin" className="hover:text-black transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-black font-semibold">{breadcrumb ?? titulo}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-black tracking-tight">{titulo}</h1>
        {descricao && <p className="text-neutral-500 text-sm mt-1">{descricao}</p>}
      </div>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="flex-shrink-0 bg-brand-ciano hover:opacity-90 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-opacity"
        >
          + {ctaLabel}
        </Link>
      )}
    </div>
  );
}
