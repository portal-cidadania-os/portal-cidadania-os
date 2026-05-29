"use client";

import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 w-full bg-white border-b border-neutral-100 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Identidade Visual */}
        <div className="flex items-center gap-3 select-none">
          <img 
            src="/LOGO.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain"
            style={{ height: "40px", width: "auto" }}
          />
          <span className="text-black font-bold text-xl tracking-tight">
            Portal Cidadania
          </span>
        </div>

        {/* Menu Central */}
        <nav className="hidden md:flex items-center gap-8">
          <button className="text-black font-medium text-sm hover:text-brand-ciano transition-colors flex items-center gap-1">
            Soluções
            <svg width="16" height="16" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <a href="#recursos" className="text-neutral-950 font-medium text-sm hover:text-brand-ciano transition-colors">
            Recursos
          </a>
          
          <a href="#modelos" className="text-neutral-950 font-medium text-sm hover:text-brand-ciano transition-colors">
            Modelos
          </a>
        </nav>

        {/* Lado Direito */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-neutral-800 text-sm font-medium">
            <svg width="16" height="16" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
            </svg>
            <span>BR</span>
          </div>

          <a href="#login-empregabilidade" className="text-black font-semibold text-sm">
            Fazer login
          </a>

          <a href="#comece-gratis" className="bg-brand-ciano text-white font-medium text-sm px-5 py-2.5 rounded-lg">
            Comece grátis
          </a>
        </div>

      </div>
    </header>
  );
}
