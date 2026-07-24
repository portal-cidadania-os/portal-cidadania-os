"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_CAMPANHAS = [
  { id: 1, titulo: "Natal Cidadania 2026", tipo: "Solidária", meta: "2.000 famílias", arrecadado: "320 famílias cobertas", pct: 16, status: "Ativa", prazo: "15/12/2026" },
  { id: 2, titulo: "Campanha do Agasalho 2026", tipo: "Solidária", meta: "5.000 peças", arrecadado: "1.840 peças", pct: 37, status: "Ativa", prazo: "31/08/2026" },
  { id: 3, titulo: "Páscoa Solidária 2026", tipo: "Solidária", meta: "5.000 ovos", arrecadado: "5.200 ovos", pct: 100, status: "Encerrada", prazo: "05/04/2026" },
  { id: 4, titulo: "Natal Cidadania 2025", tipo: "Solidária", meta: "1.800 famílias", arrecadado: "1.800 famílias", pct: 100, status: "Encerrada", prazo: "20/12/2025" },
];

const STATUS_COR: Record<string, string> = {
  Ativa: "bg-brand-verde/10 text-brand-verde",
  Encerrada: "bg-neutral-100 text-neutral-400",
  Planejada: "bg-brand-ciano/10 text-brand-ciano",
};

export default function AdminCampanhasPage() {
  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Campanhas Solidárias"
        descricao="Gerenciar arrecadações, metas e resultados"
        ctaLabel="Nova Campanha"
        ctaHref="/admin/campanhas/nova"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_CAMPANHAS.map((camp) => (
          <div key={camp.id} className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-base text-black">{camp.titulo}</h3>
                <p className="text-neutral-400 text-xs mt-0.5">Prazo: {camp.prazo}</p>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full flex-shrink-0 ${STATUS_COR[camp.status]}`}>{camp.status}</span>
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-500 mb-2">
                <span>Progresso: <strong className="text-black">{camp.arrecadado}</strong></span>
                <span>Meta: <strong className="text-black">{camp.meta}</strong></span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${camp.pct >= 100 ? "bg-brand-verde" : camp.pct >= 50 ? "bg-brand-ciano" : "bg-brand-amarelo"}`}
                  style={{ width: `${Math.min(camp.pct, 100)}%` }}
                />
              </div>
              <p className="text-right text-xs text-neutral-400 mt-1">{camp.pct}% da meta</p>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 text-xs font-bold text-brand-ciano bg-brand-ciano/5 hover:bg-brand-ciano hover:text-white py-2 rounded-xl transition-all">Ver detalhes</button>
              {camp.status === "Ativa" && (
                <button className="flex-1 text-xs font-bold text-neutral-500 bg-neutral-50 hover:bg-neutral-100 py-2 rounded-xl transition-all">Atualizar meta</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
