"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_NOTICIAS = [
  { id: 1, titulo: "Prefeitura abre 320 vagas temporárias para serviços gerais", categoria: "Emprego", fonte: "Prefeitura", urgente: true, data: "22/07/2026", status: "Publicada" },
  { id: 2, titulo: "CadÚnico: prazo para atualização vai até 31 de agosto", categoria: "Benefícios", fonte: "Gov Federal", urgente: true, data: "20/07/2026", status: "Publicada" },
  { id: 3, titulo: "UBS Madureira amplia horário de atendimento", categoria: "Saúde", fonte: "Sec. Saúde", urgente: false, data: "18/07/2026", status: "Publicada" },
  { id: 4, titulo: "SENAI abre inscrições para cursos gratuitos — 800 vagas", categoria: "Educação", fonte: "SENAI SP", urgente: false, data: "15/07/2026", status: "Publicada" },
  { id: 5, titulo: "Minha Casa Minha Vida — novas inscrições [rascunho]", categoria: "Habitação", fonte: "CEF", urgente: false, data: "—", status: "Rascunho" },
];

const STATUS_COR: Record<string, string> = {
  Publicada: "bg-brand-verde/10 text-brand-verde",
  Rascunho: "bg-brand-amarelo/20 text-amber-700",
  Arquivada: "bg-neutral-100 text-neutral-400",
};

export default function AdminNoticiasPage() {
  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Notícias de Piracicaba"
        descricao="Curadoria de notícias da cidade relevantes ao público CERPI"
        ctaLabel="Nova Notícia"
        ctaHref="/admin/noticias/nova"
      />

      <div className="bg-brand-ciano/5 border border-brand-ciano/15 rounded-xl px-4 py-3 text-xs text-brand-ciano font-semibold mb-5 flex items-center gap-2">
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Notícias são curadas pela equipe e exibidas em /noticias. Diferente de /publicacoes (conteúdo interno do CERPI).
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Título</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Categoria</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Fonte</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Urgente</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {MOCK_NOTICIAS.map((n) => (
                <tr key={n.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black text-sm leading-snug">{n.titulo}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{n.data}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg">{n.categoria}</span>
                  </td>
                  <td className="px-5 py-4 text-neutral-500 text-xs hidden md:table-cell">{n.fonte}</td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {n.urgente ? (
                      <span className="text-[10px] font-extrabold bg-red-50 text-red-500 px-2 py-1 rounded-full uppercase">⚡ Sim</span>
                    ) : (
                      <span className="text-neutral-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${STATUS_COR[n.status]}`}>{n.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-brand-ciano hover:underline font-semibold">Editar</button>
                      {n.status === "Rascunho" && (
                        <button className="text-xs text-brand-verde hover:underline font-semibold">Publicar</button>
                      )}
                      <button className="text-xs text-red-400 hover:text-red-600 font-semibold">Remover</button>
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
