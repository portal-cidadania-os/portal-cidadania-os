"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const MOCK_CURSOS = [
  { id: 1, nome: "Maquiagem Profissional", turma: "T4 — 2026", alunos: 22, vagas: 25, cargaHoraria: "40h", modalidade: "Presencial", status: "Em andamento", inicio: "01/07/2026" },
  { id: 2, nome: "Cabeleireiro Básico", turma: "T3 — 2026", alunos: 18, vagas: 20, cargaHoraria: "60h", modalidade: "Presencial", status: "Em andamento", inicio: "15/06/2026" },
  { id: 3, nome: "Libras — Nível I", turma: "T2 — 2026", alunos: 30, vagas: 30, cargaHoraria: "30h", modalidade: "Online", status: "Encerrado", inicio: "01/05/2026" },
  { id: 4, nome: "Informática Básica", turma: "T5 — 2026", alunos: 15, vagas: 20, cargaHoraria: "40h", modalidade: "Presencial", status: "Inscrições abertas", inicio: "01/08/2026" },
  { id: 5, nome: "Empreendedorismo Feminino", turma: "T1 — 2026", alunos: 28, vagas: 30, cargaHoraria: "20h", modalidade: "Híbrido", status: "Em andamento", inicio: "10/07/2026" },
  { id: 6, nome: "Marketing Digital", turma: "T2 — 2026", alunos: 0, vagas: 25, cargaHoraria: "30h", modalidade: "Online", status: "Inscrições abertas", inicio: "10/08/2026" },
];

const STATUS_COR: Record<string, string> = {
  "Em andamento": "bg-brand-ciano/10 text-brand-ciano",
  "Encerrado": "bg-neutral-100 text-neutral-400",
  "Inscrições abertas": "bg-brand-verde/10 text-brand-verde",
  "Suspenso": "bg-red-50 text-red-500",
};

export default function AdminCursosPage() {
  return (
    <div className="p-6 md:p-8">
      <AdminPageHeader
        titulo="Cursos & Capacitação"
        descricao="Gerenciar turmas, inscrições e certificados"
        ctaLabel="Novo Curso"
        ctaHref="/admin/cursos/novo"
      />

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Turmas Ativas", valor: "4", cor: "text-brand-ciano" },
          { label: "Alunos Matriculados", valor: "113", cor: "text-brand-verde" },
          { label: "Inscrições Abertas", valor: "2", cor: "text-brand-amarelo" },
          { label: "Formados (2026)", valor: "32", cor: "text-brand-magenta" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-2xl border border-neutral-200 p-4">
            <div className={`text-2xl font-extrabold ${m.cor}`}>{m.valor}</div>
            <div className="text-xs text-neutral-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Grid de cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MOCK_CURSOS.map((curso) => {
          const pct = Math.round((curso.alunos / curso.vagas) * 100);
          return (
            <div key={curso.id} className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4 hover:border-neutral-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-sm text-black leading-tight">{curso.nome}</h3>
                  <p className="text-neutral-400 text-xs mt-0.5">{curso.turma}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full flex-shrink-0 ${STATUS_COR[curso.status]}`}>
                  {curso.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
                <span className="bg-neutral-50 border border-neutral-100 px-2 py-1 rounded-lg">{curso.cargaHoraria}</span>
                <span className="bg-neutral-50 border border-neutral-100 px-2 py-1 rounded-lg">{curso.modalidade}</span>
                <span className="bg-neutral-50 border border-neutral-100 px-2 py-1 rounded-lg">Início: {curso.inicio}</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-neutral-500">{curso.alunos}/{curso.vagas} vagas preenchidas</span>
                  <span className="font-bold text-black">{pct}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${pct >= 100 ? "bg-brand-magenta" : pct >= 80 ? "bg-brand-amarelo" : "bg-brand-ciano"}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button className="flex-1 text-xs font-bold text-brand-ciano bg-brand-ciano/5 hover:bg-brand-ciano hover:text-white py-2 rounded-xl transition-all">Ver alunos</button>
                <button className="flex-1 text-xs font-bold text-neutral-500 bg-neutral-50 hover:bg-neutral-100 py-2 rounded-xl transition-all">Editar</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
