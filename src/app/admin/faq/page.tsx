"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// ============================================================
// CERPI — Admin: Gestão de FAQ
// CRUD para faq_items (usa supabase client com sessão do admin)
// ============================================================

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
  modulo: string | null;
  ordem: number;
  ativo: boolean;
  created_at: string;
}

const CATEGORIAS = ["geral", "emprego", "saude", "cursos", "campanhas", "nucleo"];


const VAZIO: Omit<FaqItem, "id" | "created_at"> = {
  pergunta: "",
  resposta: "",
  categoria: "geral",
  modulo: null,
  ordem: 0,
  ativo: true,
};

export default function AdminFaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroCat, setFiltroCat] = useState("todos");
  const [modal, setModal] = useState<null | "criar" | FaqItem>(null);
  const [form, setForm] = useState(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    let q = supabase.from("faq_items").select("*").order("categoria").order("ordem");
    if (filtroCat !== "todos") q = q.eq("categoria", filtroCat);
    const { data, error } = await q;
    if (!error) setItems(data ?? []);
    setCarregando(false);
  }, [filtroCat]);

  useEffect(() => { carregar(); }, [carregar]);

  const abrirCriar = () => {
    setForm(VAZIO);
    setErro(null);
    setModal("criar");
  };

  const abrirEditar = (item: FaqItem) => {
    setForm({
      pergunta: item.pergunta,
      resposta: item.resposta,
      categoria: item.categoria,
      modulo: item.modulo,
      ordem: item.ordem,
      ativo: item.ativo,
    });
    setErro(null);
    setModal(item);
  };

  const fecharModal = () => { setModal(null); setErro(null); };

  const salvar = async () => {
    if (!form.pergunta.trim() || !form.resposta.trim()) {
      setErro("Pergunta e resposta são obrigatórias.");
      return;
    }
    setSalvando(true);
    setErro(null);

    const payload = {
      pergunta: form.pergunta.trim(),
      resposta: form.resposta.trim(),
      categoria: form.categoria,
      modulo: form.modulo?.trim() || null,
      ordem: Number(form.ordem) || 0,
      ativo: form.ativo,
    };

    if (modal === "criar") {
      const { error } = await supabase.from("faq_items").insert(payload);
      if (error) setErro(error.message);
      else { fecharModal(); carregar(); }
    } else if (modal && typeof modal === "object") {
      const { error } = await supabase.from("faq_items").update(payload).eq("id", modal.id);
      if (error) setErro(error.message);
      else { fecharModal(); carregar(); }
    }
    setSalvando(false);
  };

  const excluir = async (id: string) => {
    if (!confirm("Excluir este item do FAQ?")) return;
    setExcluindo(id);
    await supabase.from("faq_items").delete().eq("id", id);
    setExcluindo(null);
    carregar();
  };

  const toggleAtivo = async (item: FaqItem) => {
    await supabase.from("faq_items").update({ ativo: !item.ativo }).eq("id", item.id);
    carregar();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-black">FAQ / Central de Ajuda</h1>
          <p className="text-neutral-500 text-sm mt-0.5">Gerencie as perguntas frequentes exibidas no chatbot</p>
        </div>
        <button
          onClick={abrirCriar}
          className="bg-brand-ciano text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Nova pergunta
        </button>
      </div>

      {/* Filtros por categoria */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["todos", ...CATEGORIAS].map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltroCat(cat)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all capitalize ${
              filtroCat === cat
                ? "bg-brand-ciano text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {cat === "todos" ? "Todos" : cat === "saude" ? "Saúde" : cat === "nucleo" ? "Núcleos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabela */}
      {carregando ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-brand-ciano border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-semibold">Nenhum item encontrado</p>
          <p className="text-sm mt-1">Crie sua primeira pergunta clicando em "Nova pergunta"</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">Pergunta</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider w-28">Categoria</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider w-24">Módulo</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider w-20">Ativo</th>
                <th className="px-4 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {items.map((item) => (
                <tr key={item.id} className={`hover:bg-neutral-50 transition-colors ${!item.ativo ? "opacity-40" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-black leading-snug">{item.pergunta}</p>
                    <p className="text-neutral-400 text-xs mt-0.5 line-clamp-1">{item.resposta}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-500">{item.modulo ?? "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleAtivo(item)}
                      className={`w-9 h-5 rounded-full transition-colors relative ${item.ativo ? "bg-brand-ciano" : "bg-neutral-300"}`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.ativo ? "translate-x-4" : "translate-x-0.5"}`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => abrirEditar(item)}
                        className="p-1.5 text-neutral-400 hover:text-brand-ciano hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => excluir(item.id)}
                        disabled={excluindo === item.id}
                        className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 border-t border-neutral-100 bg-neutral-50">
            <p className="text-xs text-neutral-400">{items.length} pergunta{items.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      )}

      {/* ── Modal criar/editar ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">

            {/* Header modal */}
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between flex-shrink-0">
              <h2 className="font-extrabold text-black text-base">
                {modal === "criar" ? "Nova pergunta" : "Editar pergunta"}
              </h2>
              <button onClick={fecharModal} className="text-neutral-400 hover:text-black">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Corpo */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

              {erro && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 text-red-600 text-xs font-semibold">
                  {erro}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1.5">Pergunta *</label>
                <input
                  type="text"
                  value={form.pergunta}
                  onChange={(e) => setForm((f) => ({ ...f, pergunta: e.target.value }))}
                  placeholder="Ex: Como me cadastrar no CERPI?"
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-black outline-none focus:border-brand-ciano transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 mb-1.5">Resposta *</label>
                <textarea
                  rows={4}
                  value={form.resposta}
                  onChange={(e) => setForm((f) => ({ ...f, resposta: e.target.value }))}
                  placeholder="Resposta completa para exibir no chatbot..."
                  className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-black outline-none focus:border-brand-ciano transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-600 mb-1.5">Categoria *</label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-black outline-none focus:border-brand-ciano transition-colors"
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>
                        {c === "saude" ? "Saúde" : c === "nucleo" ? "Núcleo" : c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-600 mb-1.5">Ordem</label>
                  <input
                    type="number"
                    min={0}
                    value={form.ordem}
                    onChange={(e) => setForm((f) => ({ ...f, ordem: Number(e.target.value) }))}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-black outline-none focus:border-brand-ciano transition-colors"
                  />
                </div>
              </div>

              {form.categoria === "nucleo" && (
                <div>
                  <label className="block text-xs font-bold text-neutral-600 mb-1.5">
                    Slug do Núcleo <span className="text-neutral-400 font-normal">(ex: sorria-com-cristo)</span>
                  </label>
                  <input
                    type="text"
                    value={form.modulo ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, modulo: e.target.value || null }))}
                    placeholder="deixe vazio para todos os núcleos"
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-black outline-none focus:border-brand-ciano transition-colors"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm((f) => ({ ...f, ativo: !f.ativo }))}
                  className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${form.ativo ? "bg-brand-ciano" : "bg-neutral-300"}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.ativo ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </button>
                <span className="text-sm text-neutral-600">
                  {form.ativo ? "Visível no chatbot" : "Oculto (inativo)"}
                </span>
              </div>
            </div>

            {/* Footer modal */}
            <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-end gap-2.5 flex-shrink-0">
              <button
                onClick={fecharModal}
                className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-black transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={salvar}
                disabled={salvando}
                className="px-5 py-2 bg-brand-ciano text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {salvando ? "Salvando…" : modal === "criar" ? "Criar pergunta" : "Salvar alterações"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
