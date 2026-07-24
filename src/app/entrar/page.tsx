"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

// ============================================================
// Portal Cidadania OS — Página de Autenticação (/entrar)
// Separada da landing page. Tabs: Login | Cadastro
// useSearchParams() exige Suspense no Next.js 14 App Router
// ============================================================

// Componente interno com useSearchParams
function EntrarForm() {
  const searchParams = useSearchParams();
  const tabInicial = searchParams.get("tab") === "cadastro" ? "cadastro" : "login";

  const [aba, setAba] = useState<"login" | "cadastro">(tabInicial);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);

  // Redireciona se já estiver autenticado
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.href = "/portal";
      }
    });
  }, []);

  const trocarAba = (novaAba: "login" | "cadastro") => {
    setAba(novaAba);
    setMensagem(null);
    setEmail("");
    setSenha("");
    setNome("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem(null);

    if (!email || !senha) {
      setMensagem({ tipo: "erro", texto: "Preencha e-mail e senha para continuar." });
      setCarregando(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

      if (error) {
        const mensagensErro: Record<string, string> = {
          "Invalid login credentials": "E-mail ou senha incorretos. Verifique os dados.",
          "Email not confirmed": "Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.",
          "Too many requests": "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.",
        };
        setMensagem({
          tipo: "erro",
          texto: mensagensErro[error.message] ?? error.message,
        });
      } else {
        setMensagem({ tipo: "sucesso", texto: "Login realizado! Redirecionando..." });
        // Redireciona admin para /admin, demais usuários para /portal
        const { data: { session: sess } } = await supabase.auth.getSession();
        const role = sess?.user?.app_metadata?.role;
        setTimeout(() => {
          window.location.href = role === "admin" ? "/admin" : "/portal";
        }, 800);
      }
    } catch {
      setMensagem({ tipo: "erro", texto: "Erro ao conectar com o servidor. Tente novamente." });
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem(null);

    if (!email || !senha) {
      setMensagem({ tipo: "erro", texto: "Preencha todos os campos obrigatórios." });
      setCarregando(false);
      return;
    }

    if (senha.length < 6) {
      setMensagem({ tipo: "erro", texto: "A senha deve ter no mínimo 6 caracteres." });
      setCarregando(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { nome_completo: nome },
          emailRedirectTo: `${window.location.origin}/portal`,
        },
      });

      if (error) {
        setMensagem({ tipo: "erro", texto: error.message });
      } else {
        setMensagem({
          tipo: "sucesso",
          texto: "Cadastro realizado! Verifique sua caixa de e-mail para confirmar a conta.",
        });
        setEmail("");
        setSenha("");
        setNome("");
      }
    } catch {
      setMensagem({ tipo: "erro", texto: "Erro ao processar o cadastro. Tente novamente." });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-200px)] bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo / Link voltar */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-black text-sm transition-colors mb-6">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o início
          </Link>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-ciano flex items-center justify-center">
              <img src="/institucional/logo.png" alt="Logo" className="h-5 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <span className="font-extrabold text-xl text-black">Portal Cidadania</span>
          </div>
        </div>

        {/* Card de autenticação */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-neutral-100">
            <button
              onClick={() => trocarAba("login")}
              className={`flex-1 text-sm font-bold py-4 border-b-2 transition-colors ${
                aba === "login"
                  ? "border-brand-ciano text-black"
                  : "border-transparent text-neutral-400 hover:text-black"
              }`}
            >
              Fazer Login
            </button>
            <button
              onClick={() => trocarAba("cadastro")}
              className={`flex-1 text-sm font-bold py-4 border-b-2 transition-colors ${
                aba === "cadastro"
                  ? "border-brand-ciano text-black"
                  : "border-transparent text-neutral-400 hover:text-black"
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Formulário */}
          <div className="p-6">
            <form onSubmit={aba === "login" ? handleLogin : handleCadastro} className="flex flex-col gap-4">

              {/* Mensagem de feedback */}
              {mensagem && (
                <div
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    mensagem.tipo === "erro"
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}
                >
                  {mensagem.tipo === "erro" ? "⚠️ " : "✓ "}{mensagem.texto}
                </div>
              )}

              {/* Nome — apenas no cadastro */}
              {aba === "cadastro" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-black uppercase tracking-wider">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo"
                    disabled={carregando}
                    className="w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-brand-ciano focus:ring-1 focus:ring-brand-ciano/20 transition-colors disabled:opacity-50 bg-white"
                  />
                </div>
              )}

              {/* E-mail */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  disabled={carregando}
                  required
                  className="w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-brand-ciano focus:ring-1 focus:ring-brand-ciano/20 transition-colors disabled:opacity-50 bg-white"
                />
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-black uppercase tracking-wider">
                    Senha
                  </label>
                  {aba === "login" && (
                    <Link
                      href="/redefinir-senha"
                      className="text-xs text-brand-ciano hover:underline"
                    >
                      Esqueci a senha
                    </Link>
                  )}
                </div>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder={aba === "cadastro" ? "Mínimo 6 caracteres" : "••••••••"}
                  disabled={carregando}
                  required
                  className="w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-brand-ciano focus:ring-1 focus:ring-brand-ciano/20 transition-colors disabled:opacity-50 bg-white"
                />
              </div>

              {/* LGPD — apenas no cadastro */}
              {aba === "cadastro" && (
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Ao criar uma conta você concorda com nossa{" "}
                  <Link href="/politica-privacidade" className="text-brand-ciano hover:underline">
                    Política de Privacidade
                  </Link>{" "}
                  e{" "}
                  <Link href="/termos-uso" className="text-brand-ciano hover:underline">
                    Termos de Uso
                  </Link>
                  , em conformidade com a LGPD (Lei 13.709/18).
                </p>
              )}

              {/* Botão submit */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-brand-ciano hover:opacity-90 text-white font-bold py-3 rounded-lg text-sm transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-1"
              >
                {carregando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processando...
                  </>
                ) : aba === "login" ? (
                  "Entrar no Portal"
                ) : (
                  "Criar minha conta"
                )}
              </button>

            </form>

            {/* Divisor */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-neutral-400">
                  {aba === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
                </span>
              </div>
            </div>

            <button
              onClick={() => trocarAba(aba === "login" ? "cadastro" : "login")}
              className="w-full border border-neutral-200 hover:border-brand-ciano text-neutral-600 hover:text-brand-ciano font-semibold py-2.5 rounded-lg text-sm transition-all"
            >
              {aba === "login" ? "Criar conta gratuita" : "Já tenho conta — fazer login"}
            </button>
          </div>
        </div>

        {/* Rodapé do card */}
        <p className="text-center text-xs text-neutral-400 mt-4">
          Acesso seguro via SSL · Dados protegidos pela LGPD
        </p>

      </div>
    </main>
  );
}

// Export padrão com Suspense (obrigatório para useSearchParams no Next.js 14)
export default function EntrarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-ciano border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <EntrarForm />
    </Suspense>
  );
}
