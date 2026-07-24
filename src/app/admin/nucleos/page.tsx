"use client";

import React from "react";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_NUCLEOS = [
  { slug: "sorria-com-cristo", nome: "Sorria com Cristo", coordenador: "A definir", cadastros: 180, voluntarios: 24, status: "Ativo", cor: "bg-brand-ciano" },
  { slug: "nucleo-apoio", nome: "Núcleo de Apoio", coordenador: "A definir", cadastros: 134, voluntarios: 18, status: "Ativo", cor: "bg-brand-verde" },
  { slug: "nucleo-crescer", nome: "Núcleo CRESCER", coordenador: "Juliana Galvão", cadastros: 97, voluntarios: 12, status: "Ativo", cor: "bg-brand-amarelo" },
  { slug: "empregabilidade", nome: "Empregabilidade", coordenador: "Zezinho Monteiro", cadastros: 312, voluntarios: 8, status: "Ativo", cor: "bg-brand-magenta" },
  { slug: "esporte", nome: "Esporte", coordenador: "A definir", cadastros: 89, voluntarios: 15, status: "Ativo", cor: "bg-orange-400" },
  { slug: "promocao-social", nome: "Promoção Social", coordenador: "A definir", cadastros: 201, voluntarios: 22, status: "Ativo", cor: "bg-purple-500" },
  { slug: "pascoa", nome: "Páscoa Solidária", coordenador: "Raquel Campos", cadastros: 0, voluntarios: 40, status: "Sazonal", cor: "bg-amber-400" },
  { slug: "natal", nome: "Natal Cidadania", coordenador: "A definir", cadastros: 95, voluntarios: 60, status: "Ativo", cor: "bg-red-500" },
  { slug: "empreendedoras", nome: "Mulheres Empreendedoras", coordenador: "Juliana Galvão", cadastros: 67, voluntarios: 6, status: "Ativo", cor: "bg-pink-500" },
  { slug: "acao-kids", nome: "Ação Kids", coordenador: "A definir", cadastros: 109, voluntarios: 14, status: "Ativo", cor: "bg-teal-500" },
];

const STATUS_COR: Record<string, string> = {
  Ativo: "bg-brand-verde/10 text-brand-verde",
  Sazonal: "bg-brand-amarelo/20 text-amber-700",
  Inativo: "bg-neutral-100 text-neutral-400",
};

export default function AdminNucleosPage() {
  const ativos = MOCK_NUCLEOS.filter((n) => n.status === "Ativo").length;
  const totalCadastros = MOCK_NUCLEOS.reduce((acc, n) => acc + n.cadastros, 0);
  const totalVoluntarios = MOCK_NUCLEOS.reduce((acc, n) => acc + n.voluntarios, 0);

  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Núcleos"
        descricao={`${ativos} núcleos ativos · ${totalCadastros} cadastros · ${totalVoluntarios} voluntários`}
        ctaLabel="Novo Núcleo"
        ctaHref="/admin/nucleos/novo"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {MOCK_NUCLEOS.map((nucleo) => (
          <div key={nucleo.slug} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-sm transition-all">
            <div className={`h-1.5 ${nucleo.cor}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-extrabold text-sm text-black leading-tight">{nucleo.nome}</h3>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_COR[nucleo.status]}`}>
                  {nucleo.status}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">Coord.: {nucleo.coordenador}</p>
              <div className="grid grid-cols-2 gap-3 text-center mb-4">
                <div className="bg-neutral-50 rounded-xl p-2">
                  <div className="font-extrabold text-lg text-black">{nucleo.cadastros}</div>
                  <div className="text-[10px] text-neutral-400">Cadastros</div>
                </div>
                <div className="bg-neutral-50 rounded-xl p-2">
                  <div className="font-extrabold text-lg text-black">{nucleo.voluntarios}</div>
                  <div className="text-[10px] text-neutral-400">Voluntários</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/nucleos/${nucleo.slug}`} target="_blank" className="flex-1 text-center text-xs font-semibold text-brand-ciano bg-brand-ciano/5 hover:bg-brand-ciano hover:text-white py-2 rounded-xl transition-all">
                  Ver página
                </Link>
                <button className="flex-1 text-xs font-semibold text-neutral-500 bg-neutral-50 hover:bg-neutral-100 py-2 rounded-xl transition-all">
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
