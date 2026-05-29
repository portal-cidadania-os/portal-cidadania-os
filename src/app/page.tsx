"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email || !password) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos." });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Autenticação bem-sucedida! Redirecionando..." });
        // Redireciona de forma nativa para a rota protegida recém-criada
        window.location.href = "/portal";
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro inesperado ao conectar com o servidor." });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email || !password) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos." });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({ type: "error", text: "A senha deve conter no mínimo 6 caracteres." });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ 
          type: "success", 
          text: "Cadastro realizado! Verifique sua caixa de e-mail para confirmação." 
        });
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro inesperado ao processar o cadastro." });
    } finally {
      setLoading(false);
    }
  };

  const alternarParaCadastro = () => {
    setActiveTab("register");
    setMessage(null);
    const elemento = document.getElementById("formulario-container");
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-73px)] relative overflow-hidden bg-white text-black font-sans">
      
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
            <a href="#saiba-mais" onClick={() => { setActiveTab("login"); setMessage(null); }} className="bg-brand-ciano text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
              Saiba Mais
            </a>
            <button 
              onClick={alternarParaCadastro}
              className="bg-brand-amarelo text-black font-semibold px-6 py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
            >
              Cadastre-se
            </button>
          </div>
        </section>

        {/* ================= GRID DE 4 CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-ciano bg-opacity-10 flex items-center justify-center text-brand-ciano font-bold text-xl">▶</div>
            <h3 className="text-black font-bold text-lg">Estudos Sociais</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Acesse materiais de orientação cidadã e desenvolvimento comunitário.</p>
          </div>

          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-magenta bg-opacity-10 flex items-center justify-center text-brand-magenta font-bold text-xl">❖</div>
            <h3 className="text-black font-bold text-lg">Soluções Associativas</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Registre e gerencie as frentes de apoio da sua comunidade local.</p>
          </div>

          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-amarelo bg-opacity-20 flex items-center justify-center text-amber-600 font-bold text-xl">★</div>
            <h3 className="text-black font-bold text-lg">Empregabilidade</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Encontre oportunidades de vagas e requalificação no mercado de trabalho.</p>
          </div>

          <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-verde bg-opacity-10 flex items-center justify-center text-brand-verde font-bold text-xl">✔</div>
            <h3 className="text-black font-bold text-lg">Recursos Diretos</h3>
            <p className="text-neutral-800 text-sm leading-relaxed">Fique por dentro dos editais públicos e programas assistenciais abertos.</p>
          </div>
        </section>

        {/* ================= SPLIT SECTION ================= */}
        <section id="formulario-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

          <div className="lg:col-span-5 bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="flex items-center border-b border-neutral-100">
              <button onClick={() => { setActiveTab("login"); setMessage(null); }} className={`flex-1 text-center font-bold text-sm pb-3 border-b-2 transition-colors ${activeTab === "login" ? "border-brand-ciano text-black" : "border-transparent text-neutral-400 hover:text-black"}`}>
                Área de Acesso
              </button>
              <button onClick={() => { setActiveTab("register"); setMessage(null); }} className={`flex-1 text-center font-bold text-sm pb-3 border-b-2 transition-colors ${activeTab === "register" ? "border-brand-ciano text-black" : "border-transparent text-neutral-400 hover:text-black"}`}>
                Criar Conta
              </button>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={activeTab === "login" ? handleLogin : handleRegister}>
              {message && (
                <div className={`p-3.5 rounded-lg text-sm font-medium ${message.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                  {message.text}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider">E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:border-brand-ciano" placeholder="Digite seu e-mail institucional" disabled={loading} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider">Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-black focus:outline-none focus:border-brand-ciano" placeholder="••••••••" disabled={loading} />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-brand-ciano text-white font-bold py-3 rounded-lg mt-2 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Processando..." : activeTab === "login" ? "Entrar" : "Finalizar Cadastro"}
              </button>
            </form>
          </div>
        </section>

      </div>
    </main>
  );
}
