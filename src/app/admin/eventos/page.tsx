"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_EVENTOS = [
  { id: 1, titulo: "Encontro de Mulheres Empreendedoras", data: "09/08/2026", horario: "09h–13h", local: "Sede CERPI", inscritos: 87, vagas: 120, status: "Confirmado" },
  { id: 2, titulo: "Palestra: Mercado de Trabalho 2026", data: "16/08/2026", horario: "10h–12h", local: "Online", inscritos: 210, vagas: 300, status: "Confirmado" },
  { id: 3, titulo: "Semana de Saúde da Família", data: "25/08/2026", horario: "08h–17h", local: "Todas as unidades", inscritos: 320, vagas: 500, status: "Confirmado" },
  { id: 4, titulo: "Culto de Aniversário #MadureiraTem", data: "06/09/2026", horario: "19h", local: "Sede Central", inscritos: 450, vagas: 800, status: "Planejado" },
  { id: 5, titulo: "Formatura — Capacitação Profissional", data: "27/09/2026", horario: "15h–18h", local: "Auditório Principal", inscritos: 140, vagas: 200, status: "Planejado" },
  { id: 6, titulo: "Natal Cidadania 2026", data: "20/12/2026", horario: "09h–17h", local: "Praça Central", inscritos: 95, vagas: 2000, status: "Planejado" },
];

const STATUS_COR: Record<string, string> = {
  Confirmado: "bg-brand-verde/10 text-brand-verde",
  Planejado: "bg-brand-ciano/10 text-brand-ciano",
  Cancelado: "bg-red-50 text-red-500",
  Encerrado: "bg-neutral-100 text-neutral-400",
};

export default function AdminEventosPage() {
  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Eventos"
        descricao="Gerenciar agenda, inscrições e comunicação"
        ctaLabel="Criar Evento"
        ctaHref="/admin/eventos/novo"
      />

      <div className="flex flex-col gap-4">
        {MOCK_EVENTOS.map((evento) => {
          const pct = Math.round((evento.inscritos / evento.vagas) * 100);
          return (
            <div key={evento.id} className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-300 hover:shadow-sm transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_COR[evento.status]}`}>{evento.status}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-black">{evento.titulo}</h3>
                  <p className="text-neutral-400 text-xs mt-1">
                    {evento.data} · {evento.horario} · {evento.local}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span>{evento.inscritos} inscritos</span>
                        <span>{evento.vagas} vagas ({pct}%)</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-1.5">
                        <div
                          className="bg-brand-ciano h-1.5 rounded-full"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button className="text-xs font-bold text-brand-ciano bg-brand-ciano/5 hover:bg-brand-ciano hover:text-white px-4 py-2 rounded-xl transition-all">
                    Ver inscrições
                  </button>
                  <button className="text-xs font-bold text-neutral-500 bg-neutral-50 hover:bg-neutral-100 px-4 py-2 rounded-xl transition-all">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
