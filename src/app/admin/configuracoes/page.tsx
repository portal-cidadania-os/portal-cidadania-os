"use client";

import React, { useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminConfiguracoesPage() {
  const [nomeSite, setNomeSite] = useState("Portal Cidadania CERPI");
  const [emailContato, setEmailContato] = useState("contato@cerpi.org.br");
  const [whatsapp, setWhatsapp] = useState("(19) 9 0000-0000");
  const [salvo, setSalvo] = useState(false);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  }

  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Configurações"
        descricao="Informações gerais do portal e configurações do sistema"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Formulário principal */}
        <div className="lg:col-span-2">
          <form onSubmit={salvar} className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-5">
            <h2 className="font-extrabold text-sm text-black uppercase tracking-wider">Informações do Portal</h2>

            {salvo && (
              <div className="bg-brand-verde/10 border border-brand-verde/20 text-brand-verde text-sm font-semibold px-4 py-3 rounded-xl">
                ✓ Configurações salvas com sucesso.
              </div>
            )}

            {[
              { label: "Nome do portal", value: nomeSite, set: setNomeSite, type: "text" },
              { label: "E-mail de contato", value: emailContato, set: setEmailContato, type: "email" },
              { label: "WhatsApp", value: whatsapp, set: setWhatsapp, type: "text" },
            ].map((campo) => (
              <div key={campo.label} className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{campo.label}</label>
                <input
                  type={campo.type}
                  value={campo.value}
                  onChange={(e) => campo.set(e.target.value)}
                  className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-ciano"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Endereço da sede</label>
              <input
                type="text"
                defaultValue="Rua Madureira, 00 — Piracicaba/SP"
                className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-ciano"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="bg-brand-ciano hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity">
                Salvar configurações
              </button>
            </div>
          </form>
        </div>

        {/* Info do sistema */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <h3 className="font-extrabold text-xs text-neutral-400 uppercase tracking-wider mb-4">Status do Sistema</h3>
            {[
              { label: "Banco de dados", valor: "Supabase PostgreSQL", ok: true },
              { label: "Autenticação", valor: "Supabase Auth", ok: true },
              { label: "Deploy", valor: "Vercel (main)", ok: true },
              { label: "Ambiente", valor: "Staging", ok: true },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-neutral-50 last:border-0">
                <span className="text-xs text-neutral-500">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-brand-verde" : "bg-red-400"}`} />
                  <span className="text-xs font-semibold text-black">{item.valor}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <h3 className="font-extrabold text-xs text-neutral-400 uppercase tracking-wider mb-4">Usuários Admin</h3>
            <div className="flex items-center gap-2 py-2">
              <div className="w-7 h-7 rounded-full bg-brand-ciano/20 border border-brand-ciano/30 flex items-center justify-center">
                <span className="text-brand-ciano text-[10px] font-extrabold">A</span>
              </div>
              <div>
                <p className="text-xs font-bold text-black">admin@cerpi.com.br</p>
                <p className="text-[10px] text-neutral-400">Administrador · Ativo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
