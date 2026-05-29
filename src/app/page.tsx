"use client";

import React from "react";

export default function HomePage() {
  return (
    <main className="w-full min-h-[calc(100vh-73px)] relative overflow-hidden bg-white text-black font-sans">
      
      {/* Camada do Fundo em Movimento (Marca-dágua suave de 6%) */}
      <div className="absolute inset-0 bg-movimento-suave opacity-[0.06] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center max-w-3xl mx-auto flex flex-col gap-6 pt-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-tight">
            Bem-Vindo ao Portal Institucional da Associação
          </h1>
          <p className="text-lg text-neutral-800 font-medium max-w-2xl mx-auto">
            Conectando o terceiro setor, apoio ao cidadão e ferramentas de produção para o desenvolvimento social e humano.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#saiba-mais" className="bg-brand-ciano text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
              Saiba Mais
            </a>
            <a href="#cadastre-se" className="bg-brand-amarelo text-black font-semibold px-6 py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
              Cadastre-se
            </a>
          </div>
        </section>

        {/* ================= GRID DE 4 CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 - Ciano */}
          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-ciano bg-opacity-10 flex items-center justify-center text-brand-ciano font-bold text-xl">▶</div>
            <h3 className="text-black font-bold text-lg">Estudos Sociais</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Acesse materiais de orientação cidadã e desenvolvimento comunitário.</p>
          </div>

          {/* Card 2 - Magenta */}
          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-magenta bg-opacity-10 flex items-center justify-center text-brand-magenta font-bold text-xl">❖</div>
            <h3 className="text-black font-bold text-lg">Soluções Associativas</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Registre e gerencie as frentes de apoio da sua comunidade local.</p>
          </div>

          {/* Card 3 - Amarelo */}
          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-amarelo bg-opacity-20 flex items-center justify-center text-amber-600 font-bold text-xl">★</div>
            <h3 className="text-black font-bold text-lg">Empregabilidade</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Encontre oportunidades de vagas e requalificação no mercado de trabalho.</p>
          </div>

          {/* Card 4 - Verde */}
          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-verde bg-opacity-10 flex items-center justify-center text-brand-verde font-bold text-xl">✔</div>
            <h3 className="text-black font-bold text-lg">Recursos Diretos</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Fique por dentro dos editais públicos e programas assistenciais abertos.</p>
          </div>

        </section>

        {/* ================= SPLIT SECTION: NOTÍCIAS + LOGIN ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lado Esquerdo: Últimas Notícias (8 Colunas) */}
          <div className="lg:col-span-7 bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-xl font-bold text-black border-b border-neutral-100 pb-3">Últimas Notícias</h2>
            
            <div className="flex flex-col gap-1 border-l-4 border-brand-ciano pl-4">
              <h4 className="text-black font-bold hover:underline cursor-pointer">Seminário de Apoio Social e Cidadania</h4>
              <span className="text-xs text-neutral-500">Data de publicação: 2026</span>
            </div>

            <div className="flex flex-col gap-1 border-l-4 border-brand-magenta pl-4">
              <h4 className="text-black font-bold hover:underline cursor-pointer">Encontro de Integração e Novas Tecnologias</h4>
              <span className="text-xs text-neutral-500">Data de publicação: 2026</span>
            </div>
          </div>

          {/* Lado Direito: Área de Acesso (5 Colunas) */}
          <div className="lg:col-span-5 bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-xl font-bold text-black border-b border-neutral-100 pb-3">Área de Acesso</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider">Usuário</label>
                <input type="text" className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:border-brand-ciano" placeholder="Digite seu usuário" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider">Senha</label>
                <input type="password" className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:border-brand-ciano" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-brand-ciano text-white font-bold py-3 rounded-lg mt-2 hover:opacity-90 transition-opacity">
                Entrar
              </button>
            </form>
          </div>

        </section>

      </div>
    </main>
  );
}
