"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_PARCEIROS = [
  { id: 1, nome: "Adiante Brasil", tipo: "Institucional", area: "Empregabilidade", contato: "contato@adiantebrasil.com.br", status: "Ativo", desde: "2023" },
  { id: 2, nome: "SENAI Piracicaba", tipo: "Institucional", area: "Capacitação", contato: "piracicaba@senai.sp.br", status: "Ativo", desde: "2024" },
  { id: 3, nome: "SEBRAE SP", tipo: "Institucional", area: "Empreendedorismo", contato: "sebrae@sp.sebrae.com.br", status: "Ativo", desde: "2025" },
  { id: 4, nome: "Empresa Parceira A", tipo: "Empresa", area: "Indústria", contato: "rh@empresaa.com.br", status: "Ativo", desde: "2026" },
  { id: 5, nome: "Empresa Parceira B", tipo: "Empresa", area: "Comércio", contato: "rh@empresab.com.br", status: "Inativo", desde: "2024" },
  { id: 6, nome: "Igreja Madureira", tipo: "Igreja", area: "Voluntariado", contato: "contato@madureira.com.br", status: "Ativo", desde: "2019" },
];

const TIPO_COR: Record<string, string> = {
  Institucional: "bg-brand-ciano/10 text-brand-ciano",
  Empresa: "bg-brand-verde/10 text-brand-verde",
  Igreja: "bg-purple-50 text-purple-600",
};

const STATUS_COR: Record<string, string> = {
  Ativo: "bg-brand-verde/10 text-brand-verde",
  Inativo: "bg-neutral-100 text-neutral-400",
};

export default function AdminParceirosPage() {
  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Parceiros"
        descricao="Gerenciar empresas e organizações parceiras do CERPI"
        ctaLabel="Novo Parceiro"
        ctaHref="/admin/parceiros/novo"
      />

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Nome</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Tipo</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Área</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Contato</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Desde</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {MOCK_PARCEIROS.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-black">{p.nome}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${TIPO_COR[p.tipo]}`}>{p.tipo}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg">{p.area}</span>
                  </td>
                  <td className="px-5 py-3.5 text-neutral-400 text-xs hidden lg:table-cell">{p.contato}</td>
                  <td className="px-5 py-3.5 text-neutral-400 text-xs hidden md:table-cell">{p.desde}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${STATUS_COR[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-brand-ciano hover:underline font-semibold">Editar</button>
                      <button className="text-xs text-neutral-400 hover:text-red-500 font-semibold">Remover</button>
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
