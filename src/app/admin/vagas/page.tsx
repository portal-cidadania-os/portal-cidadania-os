"use client";

import React, { useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_VAGAS = [
  { id: 1, cargo: "Auxiliar de Produção", empresa: "Adiante Brasil", area: "Indústria", tipo: "CLT", candidatos: 34, status: "Aberta", data: "20/07/2026" },
  { id: 2, cargo: "Operador de Caixa", empresa: "Varejo Parceiro", area: "Comércio", tipo: "CLT", candidatos: 18, status: "Aberta", data: "19/07/2026" },
  { id: 3, cargo: "Auxiliar Administrativo", empresa: "Empresa X", area: "Administrativo", tipo: "CLT", candidatos: 27, status: "Aberta", data: "18/07/2026" },
  { id: 4, cargo: "Serviços Gerais", empresa: "Condomínio Y", area: "Serviços", tipo: "CLT", candidatos: 12, status: "Aberta", data: "18/07/2026" },
  { id: 5, cargo: "Motorista Entregador", empresa: "Logística Z", area: "Logística", tipo: "CLT", candidatos: 9, status: "Encerrada", data: "15/07/2026" },
  { id: 6, cargo: "Recepcionista", empresa: "Clínica W", area: "Saúde", tipo: "CLT", candidatos: 21, status: "Aberta", data: "14/07/2026" },
  { id: 7, cargo: "Costureiro(a)", empresa: "Confecção A", area: "Confecção", tipo: "CLT", candidatos: 8, status: "Encerrada", data: "12/07/2026" },
];

const STATUS_COR: Record<string, string> = {
  Aberta: "bg-brand-verde/10 text-brand-verde",
  Encerrada: "bg-neutral-100 text-neutral-400",
  Pausada: "bg-brand-amarelo/20 text-amber-700",
};

export default function AdminVagasPage() {
  const [busca, setBusca] = useState("");
  const ativas = MOCK_VAGAS.filter((v) => v.status === "Aberta").length;
  const filtradas = MOCK_VAGAS.filter((v) =>
    v.cargo.toLowerCase().includes(busca.toLowerCase()) ||
    v.empresa.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Vagas & Emprego"
        descricao={`${ativas} vagas ativas · ${MOCK_VAGAS.length} no total`}
        ctaLabel="Publicar Vaga"
        ctaHref="/admin/vagas/nova"
      />

      {/* Métricas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Vagas Abertas", valor: ativas.toString(), cor: "text-brand-verde" },
          { label: "Candidaturas Hoje", valor: "23", cor: "text-brand-ciano" },
          { label: "Empresas Parceiras", valor: "50+", cor: "text-brand-amarelo" },
          { label: "Contratações (mês)", valor: "87", cor: "text-brand-magenta" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-2xl border border-neutral-200 p-4">
            <div className={`text-2xl font-extrabold ${m.cor}`}>{m.valor}</div>
            <div className="text-xs text-neutral-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          placeholder="Buscar cargo ou empresa…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-ciano flex-1"
        />
        <select className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-brand-ciano">
          <option>Todos os status</option>
          <option>Aberta</option>
          <option>Encerrada</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Cargo</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Empresa</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Área</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Tipo</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Candidatos</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filtradas.map((v) => (
                <tr key={v.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-black">{v.cargo}</td>
                  <td className="px-5 py-3.5 text-neutral-500 hidden md:table-cell">{v.empresa}</td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg">{v.area}</span>
                  </td>
                  <td className="px-5 py-3.5 text-neutral-500 hidden lg:table-cell">{v.tipo}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-brand-ciano">{v.candidatos}</span>
                    <span className="text-neutral-400 text-xs ml-1">candidatos</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${STATUS_COR[v.status]}`}>{v.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-brand-ciano hover:underline font-semibold">Ver</button>
                      <button className="text-xs text-neutral-400 hover:text-black font-semibold">Editar</button>
                      <button className="text-xs text-red-400 hover:text-red-600 font-semibold">Encerrar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-neutral-100">
          <p className="text-xs text-neutral-400">{filtradas.length} vagas exibidas</p>
        </div>
      </div>
    </div>
  );
}
