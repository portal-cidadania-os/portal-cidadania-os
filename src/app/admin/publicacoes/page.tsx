"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_PUBS = [
  { id: 1, titulo: "Núcleo de Empregabilidade bate recorde: 1.200 vagas", categoria: "Empregabilidade", autor: "Equipe CERPI", visualizacoes: 1240, data: "18/06/2026", status: "Publicada" },
  { id: 2, titulo: "Nova turma de Libras forma 32 alunos", categoria: "Educação", autor: "Carol Alves", visualizacoes: 870, data: "12/06/2026", status: "Publicada" },
  { id: 3, titulo: "Páscoa Solidária 2026 distribui mais de 5.000 ovos", categoria: "Campanhas", autor: "Raquel Campos", visualizacoes: 3200, data: "05/04/2026", status: "Publicada" },
  { id: 4, titulo: "Farmácia Solidária amplia atendimento para 400 famílias", categoria: "Saúde", autor: "Promoção Social", visualizacoes: 640, data: "28/05/2026", status: "Publicada" },
  { id: 5, titulo: "CRESCER lança programa de mentoria — rascunho", categoria: "Núcleos", autor: "Juliana Galvão", visualizacoes: 0, data: "—", status: "Rascunho" },
];

const STATUS_COR: Record<string, string> = {
  Publicada: "bg-brand-verde/10 text-brand-verde",
  Rascunho: "bg-brand-amarelo/20 text-amber-700",
  Arquivada: "bg-neutral-100 text-neutral-400",
};

export default function AdminPublicacoesPage() {
  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Publicações"
        descricao="Gerenciar notícias e publicações do CERPI"
        ctaLabel="Nova Publicação"
        ctaHref="/admin/publicacoes/nova"
      />

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Título</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Categoria</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Autor</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Visualizações</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-neutral-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {MOCK_PUBS.map((pub) => (
                <tr key={pub.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black leading-snug text-sm">{pub.titulo}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{pub.data}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg">{pub.categoria}</span>
                  </td>
                  <td className="px-5 py-4 text-neutral-500 text-xs hidden lg:table-cell">{pub.autor}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="font-bold text-black">{pub.visualizacoes.toLocaleString()}</span>
                    <span className="text-neutral-400 text-xs ml-1">views</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${STATUS_COR[pub.status]}`}>{pub.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-brand-ciano hover:underline font-semibold">Editar</button>
                      {pub.status === "Rascunho" && (
                        <button className="text-xs text-brand-verde hover:underline font-semibold">Publicar</button>
                      )}
                      <button className="text-xs text-red-400 hover:text-red-600 font-semibold">Arquivar</button>
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
