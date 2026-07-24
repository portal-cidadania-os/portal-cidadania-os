"use client";

import React, { useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_CADASTROS = [
  { id: 1, nome: "Maria Silva", email: "maria@email.com", telefone: "(19) 99001-0001", nucleo: "Empregabilidade", status: "Ativo", data: "22/07/2026" },
  { id: 2, nome: "João Oliveira", email: "joao@email.com", telefone: "(19) 99001-0002", nucleo: "Sorria com Cristo", status: "Ativo", data: "21/07/2026" },
  { id: 3, nome: "Ana Souza", email: "ana@email.com", telefone: "(19) 99001-0003", nucleo: "Cursos", status: "Ativo", data: "20/07/2026" },
  { id: 4, nome: "Carlos Mendes", email: "carlos@email.com", telefone: "(19) 99001-0004", nucleo: "Empregabilidade", status: "Pendente", data: "20/07/2026" },
  { id: 5, nome: "Fernanda Lima", email: "fernanda@email.com", telefone: "(19) 99001-0005", nucleo: "CRESCER", status: "Ativo", data: "19/07/2026" },
  { id: 6, nome: "Roberto Santos", email: "roberto@email.com", telefone: "(19) 99001-0006", nucleo: "Esporte", status: "Ativo", data: "19/07/2026" },
  { id: 7, nome: "Camila Torres", email: "camila@email.com", telefone: "(19) 99001-0007", nucleo: "Ação Kids", status: "Inativo", data: "18/07/2026" },
  { id: 8, nome: "Paulo Nunes", email: "paulo@email.com", telefone: "(19) 99001-0008", nucleo: "Promoção Social", status: "Ativo", data: "18/07/2026" },
];

const STATUS_COR: Record<string, string> = {
  Ativo: "bg-brand-verde/10 text-brand-verde",
  Pendente: "bg-brand-amarelo/20 text-amber-700",
  Inativo: "bg-neutral-100 text-neutral-400",
};

export default function AdminCadastrosPage() {
  const [busca, setBusca] = useState("");
  const filtrados = MOCK_CADASTROS.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Cadastros & Usuários"
        descricao={`${MOCK_CADASTROS.length} cidadãos cadastrados no portal`}
        ctaLabel="Novo Cadastro"
        ctaHref="/cadastro"
      />

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-ciano flex-1"
        />
        <select className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-brand-ciano">
          <option>Todos os núcleos</option>
          <option>Empregabilidade</option>
          <option>Cursos</option>
          <option>CRESCER</option>
        </select>
        <select className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-brand-ciano">
          <option>Todos os status</option>
          <option>Ativo</option>
          <option>Pendente</option>
          <option>Inativo</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">#</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Nome</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">E-mail</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Telefone</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Núcleo</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Cadastro</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filtrados.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3.5 text-neutral-400 text-xs">{c.id}</td>
                  <td className="px-5 py-3.5 font-semibold text-black">{c.nome}</td>
                  <td className="px-5 py-3.5 text-neutral-500 hidden md:table-cell">{c.email}</td>
                  <td className="px-5 py-3.5 text-neutral-500 hidden lg:table-cell">{c.telefone}</td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg font-medium">{c.nucleo}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${STATUS_COR[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-neutral-400 text-xs hidden lg:table-cell">{c.data}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-brand-ciano hover:underline font-semibold">Ver</button>
                      <button className="text-xs text-neutral-400 hover:text-black font-semibold">Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-neutral-100 flex items-center justify-between">
          <p className="text-xs text-neutral-400">Mostrando {filtrados.length} de {MOCK_CADASTROS.length} registros</p>
          <div className="flex gap-2">
            <button className="text-xs font-semibold text-neutral-400 hover:text-black px-3 py-1.5 rounded-lg border border-neutral-200">← Anterior</button>
            <button className="text-xs font-semibold text-brand-ciano bg-brand-ciano/5 px-3 py-1.5 rounded-lg border border-brand-ciano/20">1</button>
            <button className="text-xs font-semibold text-neutral-400 hover:text-black px-3 py-1.5 rounded-lg border border-neutral-200">Próxima →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
