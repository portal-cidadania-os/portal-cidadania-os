"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_VOLUNTARIOS = [
  { id: 1, nome: "Ana Paula Ramos", area: "Educação", disponibilidade: "Sábados", status: "Ativo", desde: "Mar 2026" },
  { id: 2, nome: "Marcos Ferreira", area: "Apoio Social", disponibilidade: "Seg e Qua", status: "Ativo", desde: "Jan 2026" },
  { id: 3, nome: "Juliana Costa", area: "Saúde", disponibilidade: "Eventos", status: "Ativo", desde: "Abr 2026" },
  { id: 4, nome: "Pedro Alves", area: "Comunicação", disponibilidade: "Domingos", status: "Pendente", desde: "Jul 2026" },
  { id: 5, nome: "Renata Lima", area: "Tecnologia", disponibilidade: "Seg–Sex", status: "Ativo", desde: "Fev 2026" },
  { id: 6, nome: "Diego Santos", area: "Esporte", disponibilidade: "Sábados", status: "Ativo", desde: "Mai 2026" },
  { id: 7, nome: "Cláudia Melo", area: "Educação", disponibilidade: "Eventos", status: "Inativo", desde: "Nov 2025" },
  { id: 8, nome: "Thiago Barbosa", area: "Apoio Social", disponibilidade: "Sex e Sáb", status: "Pendente", desde: "Jul 2026" },
];

const STATUS_COR: Record<string, string> = {
  Ativo: "bg-brand-verde/10 text-brand-verde",
  Pendente: "bg-brand-amarelo/20 text-amber-700",
  Inativo: "bg-neutral-100 text-neutral-400",
};

const AREA_COR: Record<string, string> = {
  Educação: "bg-brand-ciano/10 text-brand-ciano",
  "Apoio Social": "bg-brand-magenta/10 text-brand-magenta",
  Saúde: "bg-brand-verde/10 text-brand-verde",
  Comunicação: "bg-brand-amarelo/20 text-amber-700",
  Tecnologia: "bg-indigo-50 text-indigo-600",
  Esporte: "bg-orange-50 text-orange-600",
};

export default function AdminVoluntariadoPage() {
  const ativos = MOCK_VOLUNTARIOS.filter((v) => v.status === "Ativo").length;
  const pendentes = MOCK_VOLUNTARIOS.filter((v) => v.status === "Pendente").length;

  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Voluntariado"
        descricao={`${ativos} voluntários ativos · ${pendentes} aguardando aprovação`}
        ctaLabel="Novo Voluntário"
        ctaHref="/voluntariado"
      />

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Ativos", valor: ativos.toString(), cor: "text-brand-verde" },
          { label: "Pendentes", valor: pendentes.toString(), cor: "text-brand-amarelo" },
          { label: "Horas (julho)", valor: "842h", cor: "text-brand-ciano" },
          { label: "Áreas cobertas", valor: "6", cor: "text-brand-magenta" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-2xl border border-neutral-200 p-4">
            <div className={`text-2xl font-extrabold ${m.cor}`}>{m.valor}</div>
            <div className="text-xs text-neutral-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Nome</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Área</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Disponibilidade</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Desde</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {MOCK_VOLUNTARIOS.map((v) => (
                <tr key={v.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-black">{v.nome}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${AREA_COR[v.area] ?? "bg-neutral-100 text-neutral-600"}`}>{v.area}</span>
                  </td>
                  <td className="px-5 py-3.5 text-neutral-500 text-xs hidden md:table-cell">{v.disponibilidade}</td>
                  <td className="px-5 py-3.5 text-neutral-400 text-xs hidden lg:table-cell">{v.desde}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${STATUS_COR[v.status]}`}>{v.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {v.status === "Pendente" && (
                        <button className="text-xs text-brand-verde hover:underline font-bold">Aprovar</button>
                      )}
                      <button className="text-xs text-brand-ciano hover:underline font-semibold">Ver</button>
                      <button className="text-xs text-neutral-400 hover:text-black font-semibold">Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
