"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

// ============================================================
// Portal Cidadania OS — Header 4 Camadas (inspirado no topo4)
// Camada 1: Barra de utilidade (transparência, ouvidoria, LGPD)
// Camada 2: Identidade (logo + nome) + 3 CTAs
// Camada 3: Navegação institucional
// Camada 4: Navegação de conteúdo (brand-ciano)
// ============================================================

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [navAberta, setNavAberta] = useState<"institucional" | "conteudo" | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 w-full z-50 shadow-sm">

      {/* ── CAMADA 1: Barra de Utilidade ── */}
      <div className="bg-[#0f0f1a] border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* PLACEHOLDER: Substitua pelo nome oficial da associação */}
            <span className="text-brand-amarelo/60 text-[11px] font-medium">
              Associação [Nome Oficial] — CNPJ XX.XXX.XXX/0001-XX
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/transparencia"
              className="text-brand-amarelo/70 hover:text-brand-amarelo text-[11px] transition-colors"
            >
              Transparência
            </Link>
            <span className="text-brand-amarelo/20">|</span>
            <Link
              href="/ouvidoria"
              className="text-brand-amarelo/70 hover:text-brand-amarelo text-[11px] transition-colors"
            >
              Ouvidoria
            </Link>
            <span className="text-brand-amarelo/20">|</span>
            <Link
              href="/lgpd"
              className="text-brand-amarelo/70 hover:text-brand-amarelo text-[11px] transition-colors"
            >
              LGPD &amp; Privacidade
            </Link>
            <span className="text-brand-amarelo/20">|</span>
            <Link
              href="/fale-conosco"
              className="text-brand-amarelo/70 hover:text-brand-amarelo text-[11px] transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>

      {/* ── CAMADA 2: Identidade + CTAs ── */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Logo + Nome */}
          <Link href="/" className="flex items-center gap-3 select-none group">
            <div className="w-10 h-10 rounded-lg bg-brand-ciano flex items-center justify-center flex-shrink-0">
              <img
                src="/LOGO.png"
                alt="Logo Portal Cidadania"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  // Fallback se a imagem não carregar
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              {/* PLACEHOLDER: Substitua pelo nome oficial da associação */}
              <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-widest hidden sm:block">
                Associação [Nome Oficial]
              </span>
              <span className="text-black font-extrabold text-lg tracking-tight group-hover:text-brand-ciano transition-colors">
                Portal Cidadania
              </span>
            </div>
          </Link>

          {/* CTAs — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/certificados/validar"
              className="text-neutral-600 hover:text-black border border-neutral-300 hover:border-neutral-400 font-semibold text-xs px-4 py-2 rounded-md transition-all"
            >
              Validar Certificado
            </Link>

            {session ? (
              <>
                <Link
                  href="/portal"
                  className="border border-brand-ciano text-brand-ciano hover:bg-brand-ciano hover:text-white font-semibold text-xs px-4 py-2 rounded-md transition-all"
                >
                  Meu Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs px-4 py-2 rounded-md transition-all"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/entrar"
                  className="border border-brand-ciano text-brand-ciano hover:bg-brand-ciano hover:text-white font-semibold text-xs px-4 py-2 rounded-md transition-all"
                >
                  Fazer Login
                </Link>
                <Link
                  href="/entrar?tab=cadastro"
                  className="bg-brand-ciano hover:opacity-90 text-white font-semibold text-xs px-4 py-2 rounded-md transition-all"
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </div>

          {/* Hamburguer — mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Abrir menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuAberto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* ── CAMADA 3: Navegação Institucional ── */}
      <div className="bg-white border-b border-neutral-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-6">
          <Link href="/quem-somos" className="text-neutral-600 hover:text-black font-medium text-xs transition-colors py-1">
            Quem Somos
          </Link>
          <Link href="/associe-se" className="text-neutral-600 hover:text-black font-medium text-xs transition-colors py-1">
            Associe-se
          </Link>
          <Link href="/transparencia" className="text-neutral-600 hover:text-black font-medium text-xs transition-colors py-1">
            Transparência
          </Link>
          <Link href="/parceiros" className="text-neutral-600 hover:text-black font-medium text-xs transition-colors py-1">
            Parceiros
          </Link>
          <Link href="/noticias" className="text-neutral-600 hover:text-black font-medium text-xs transition-colors py-1">
            Notícias
          </Link>
          <Link href="/perguntas-frequentes" className="text-neutral-600 hover:text-black font-medium text-xs transition-colors py-1">
            FAQ
          </Link>
          <Link href="/fale-conosco" className="text-neutral-600 hover:text-black font-medium text-xs transition-colors py-1">
            Fale Conosco
          </Link>
        </div>
      </div>

      {/* ── CAMADA 4: Navegação de Conteúdo (brand-ciano) ── */}
      <div className="bg-brand-ciano hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-6">
          <Link
            href="/cursos"
            className="text-black/80 hover:text-black font-semibold text-xs transition-colors py-1 flex items-center gap-1.5"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Cursos &amp; Capacitação
          </Link>
          <Link
            href="/vagas"
            className="text-black/80 hover:text-black font-semibold text-xs transition-colors py-1 flex items-center gap-1.5"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Vagas &amp; Emprego
          </Link>
          <Link
            href="/voluntariado"
            className="text-black/80 hover:text-black font-semibold text-xs transition-colors py-1 flex items-center gap-1.5"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Voluntariado
          </Link>
          <Link
            href="/eventos"
            className="text-black/80 hover:text-black font-semibold text-xs transition-colors py-1 flex items-center gap-1.5"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Eventos
          </Link>
          <Link
            href="/publicacoes"
            className="text-black/80 hover:text-black font-semibold text-xs transition-colors py-1 flex items-center gap-1.5"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Publicações
          </Link>
          <Link
            href="/campanhas"
            className="text-black/80 hover:text-black font-semibold text-xs transition-colors py-1 flex items-center gap-1.5"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            Campanhas
          </Link>
        </div>
      </div>

      {/* ── MENU MOBILE ── */}
      {menuAberto && (
        <div className="md:hidden bg-white border-b border-neutral-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">

            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pt-2 pb-1">
              Institucional
            </div>
            {[
              { href: "/quem-somos", label: "Quem Somos" },
              { href: "/associe-se", label: "Associe-se" },
              { href: "/transparencia", label: "Transparência" },
              { href: "/parceiros", label: "Parceiros" },
              { href: "/noticias", label: "Notícias" },
              { href: "/fale-conosco", label: "Fale Conosco" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className="px-2 py-2 text-sm font-medium text-neutral-700 hover:text-brand-ciano hover:bg-neutral-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-neutral-100 my-2" />

            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pb-1">
              Serviços
            </div>
            {[
              { href: "/cursos", label: "Cursos & Capacitação" },
              { href: "/vagas", label: "Vagas & Emprego" },
              { href: "/voluntariado", label: "Voluntariado" },
              { href: "/eventos", label: "Eventos" },
              { href: "/publicacoes", label: "Publicações" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className="px-2 py-2 text-sm font-medium text-neutral-700 hover:text-brand-ciano hover:bg-neutral-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-neutral-100 my-2" />

            <div className="flex flex-col gap-2 pt-1">
              {session ? (
                <>
                  <Link
                    href="/portal"
                    onClick={() => setMenuAberto(false)}
                    className="w-full text-center bg-brand-ciano text-white font-bold py-2.5 rounded-md text-sm"
                  >
                    Meu Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center bg-neutral-100 text-neutral-700 font-bold py-2.5 rounded-md text-sm"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/entrar"
                    onClick={() => setMenuAberto(false)}
                    className="w-full text-center border border-brand-ciano text-brand-ciano font-bold py-2.5 rounded-md text-sm"
                  >
                    Fazer Login
                  </Link>
                  <Link
                    href="/entrar?tab=cadastro"
                    onClick={() => setMenuAberto(false)}
                    className="w-full text-center bg-brand-ciano text-white font-bold py-2.5 rounded-md text-sm"
                  >
                    Cadastre-se
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
