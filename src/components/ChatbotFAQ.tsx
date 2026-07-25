"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ============================================================
// CERPI — Chatbot FAQ Flutuante
// Context-aware: detecta o módulo pela URL e filtra FAQs
// ============================================================

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
  modulo: string | null;
}

const CATEGORIAS = [
  { valor: "todos",     label: "Tudo" },
  { valor: "geral",     label: "Geral" },
  { valor: "emprego",   label: "Emprego" },
  { valor: "saude",     label: "Saúde" },
  { valor: "cursos",    label: "Cursos" },
  { valor: "campanhas", label: "Campanhas" },
  { valor: "nucleo",    label: "Núcleos" },
];

// Detecta contexto/módulo pela URL atual
function getContexto(pathname: string): { categoria: string; modulo: string } {
  if (pathname.startsWith("/nucleos/")) {
    const slug = pathname.split("/nucleos/")[1]?.split("/")[0] ?? "";
    return { categoria: "nucleo", modulo: slug };
  }
  if (pathname.startsWith("/vagas") || pathname.startsWith("/admin/vagas")) return { categoria: "emprego", modulo: "" };
  if (pathname.startsWith("/cursos") || pathname.startsWith("/admin/cursos")) return { categoria: "cursos", modulo: "" };
  if (pathname.startsWith("/campanhas") || pathname.startsWith("/admin/campanhas")) return { categoria: "campanhas", modulo: "" };
  if (pathname.startsWith("/voluntariado")) return { categoria: "geral", modulo: "" };
  return { categoria: "todos", modulo: "" };
}

export default function ChatbotFAQ() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [items, setItems] = useState<FaqItem[]>([]);
  const [expandido, setExpandido] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [iniciou, setIniciou] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ao abrir o widget, detecta contexto da página atual
  useEffect(() => {
    if (aberto && !iniciou) {
      const ctx = getContexto(pathname);
      setCategoria(ctx.categoria);
      setIniciou(true);
    }
  }, [aberto, pathname, iniciou]);

  // Busca com debounce
  const buscarFAQ = useCallback(async (q: string, cat: string) => {
    setCarregando(true);
    try {
      const ctx = getContexto(pathname);
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat && cat !== "todos") params.set("categoria", cat);
      if (ctx.modulo) params.set("modulo", ctx.modulo);

      const res = await fetch(`/api/faq?${params.toString()}`);
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setCarregando(false);
    }
  }, [pathname]);

  // Dispara busca quando busca ou categoria muda
  useEffect(() => {
    if (!aberto) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      buscarFAQ(busca, categoria);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [busca, categoria, aberto, buscarFAQ]);

  // Foca no input ao abrir
  useEffect(() => {
    if (aberto) setTimeout(() => inputRef.current?.focus(), 100);
  }, [aberto]);

  const toggleAberto = () => {
    setAberto((v) => !v);
    if (!aberto) {
      setBusca("");
      setExpandido(null);
    }
  };

  return (
    <>
      {/* ── PAINEL ── */}
      {aberto && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
          style={{ maxHeight: "min(560px, calc(100vh - 120px))" }}
        >
          {/* Cabeçalho */}
          <div className="bg-brand-ciano px-4 py-3.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-extrabold text-sm leading-tight">Central de Ajuda</p>
                <p className="text-white/70 text-[10px]">CERPI · Piracicaba</p>
              </div>
            </div>
            <button onClick={toggleAberto} className="text-white/70 hover:text-white transition-colors p-1">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Barra de busca */}
          <div className="px-3 pt-3 pb-2 border-b border-neutral-100 flex-shrink-0">
            <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">
              <svg width="14" height="14" fill="none" stroke="#999" viewBox="0 0 24 24" className="flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="O que você precisa saber?"
                className="flex-1 bg-transparent text-sm text-black placeholder-neutral-400 outline-none"
              />
              {busca && (
                <button onClick={() => setBusca("")} className="text-neutral-400 hover:text-black">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Chips de categoria */}
          <div className="flex gap-1.5 px-3 py-2 overflow-x-auto scrollbar-none flex-shrink-0 border-b border-neutral-50">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.valor}
                onClick={() => setCategoria(cat.valor)}
                className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                  categoria === cat.valor
                    ? "bg-brand-ciano text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Lista de resultados */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            {carregando ? (
              <div className="flex justify-center py-8">
                <div className="w-5 h-5 border-2 border-brand-ciano border-t-transparent rounded-full animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-sm font-semibold text-neutral-600">Nenhuma resposta encontrada</p>
                <p className="text-xs text-neutral-400 mt-1">Tente outras palavras ou fale conosco</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 pb-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-neutral-100 rounded-xl overflow-hidden hover:border-brand-ciano/30 transition-colors"
                  >
                    <button
                      className="w-full text-left px-3.5 py-3 flex items-start justify-between gap-2 hover:bg-neutral-50 transition-colors"
                      onClick={() => setExpandido(expandido === item.id ? null : item.id)}
                    >
                      <span className="text-xs font-semibold text-black leading-snug">{item.pergunta}</span>
                      <svg
                        width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        className={`flex-shrink-0 mt-0.5 text-neutral-400 transition-transform ${expandido === item.id ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandido === item.id && (
                      <div className="px-3.5 pb-3 text-xs text-neutral-600 leading-relaxed border-t border-neutral-50 pt-2 bg-neutral-50/50">
                        {item.resposta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rodapé */}
          <div className="px-3 py-2.5 border-t border-neutral-100 bg-neutral-50 flex-shrink-0">
            <p className="text-[10px] text-neutral-400 text-center">
              Não encontrou?{" "}
              <Link
                href="/fale-conosco"
                onClick={toggleAberto}
                className="text-brand-ciano font-semibold hover:underline"
              >
                Fale com nossa equipe
              </Link>
              {" "}ou{" "}
              <a
                href="https://wa.me/5519900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-verde font-semibold hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      )}

      {/* ── BOTÃO FLUTUANTE ── */}
      <button
        onClick={toggleAberto}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 bg-brand-ciano hover:opacity-90 text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
        aria-label="Central de Ajuda CERPI"
      >
        {aberto ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {/* Pulse de atenção */}
        {!aberto && (
          <span className="absolute inset-0 rounded-full bg-brand-ciano animate-ping opacity-30" />
        )}
      </button>
    </>
  );
}
