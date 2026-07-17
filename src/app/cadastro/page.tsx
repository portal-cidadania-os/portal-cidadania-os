"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ============================================================
// Cadastro Geral — Portal Cidadania OS
// Acessado via /cadastro?nucleo=cursos (etc.)
// Salva em: Supabase → tabela cadastros
// ============================================================

const NUCLEOS = [
  { value: "portal",          label: "Portal Cidadania — Desenvolvimento de Pessoas" },
  { value: "cursos",          label: "Cursos Gratuitos" },
  { value: "crescer",         label: "Núcleo CRESCER — Empresários e Empreendedoras" },
  { value: "empregabilidade", label: "Empregabilidade — Vagas de Emprego" },
  { value: "saude",           label: "Madureira Saúde — Clínica Médica" },
  { value: "odontologia",     label: "Sorria com Cristo — Odontologia Solidária" },
  { value: "farmacia",        label: "Farmácia Solidária" },
];

const RENDA = [
  { value: "ate_1sm",    label: "Até 1 salário mínimo" },
  { value: "1_2sm",      label: "1 a 2 salários mínimos" },
  { value: "2_3sm",      label: "2 a 3 salários mínimos" },
  { value: "acima_3sm",  label: "Acima de 3 salários mínimos" },
  { value: "nao_informar", label: "Prefiro não informar" },
];

const ESCOLARIDADE = [
  { value: "fundamental_incompleto", label: "Fundamental incompleto" },
  { value: "fundamental_completo",   label: "Fundamental completo" },
  { value: "medio_incompleto",       label: "Médio incompleto" },
  { value: "medio_completo",         label: "Médio completo" },
  { value: "superior_incompleto",    label: "Superior incompleto" },
  { value: "superior_completo",      label: "Superior completo" },
  { value: "pos_graduacao",          label: "Pós-graduação / MBA" },
];

const EMPREGO = [
  { value: "empregado",    label: "Empregado(a) com carteira" },
  { value: "desempregado", label: "Desempregado(a)" },
  { value: "autonomo",     label: "Autônomo(a) / Freelancer" },
  { value: "empresario",   label: "Empresário(a)" },
  { value: "estudante",    label: "Estudante" },
  { value: "aposentado",   label: "Aposentado(a)" },
];

const GENERO = [
  { value: "masculino",           label: "Masculino" },
  { value: "feminino",            label: "Feminino" },
  { value: "outro",               label: "Outro" },
  { value: "prefiro_nao_informar", label: "Prefiro não informar" },
];

function CadastroForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nucleoParam = searchParams.get("nucleo") ?? "";

  const [form, setForm] = useState({
    nome_completo: "",
    cpf: "",
    data_nascimento: "",
    genero: "",
    whatsapp: "",
    email: "",
    bairro: "",
    cidade: "Piracicaba",
    nucleo_principal: nucleoParam,
    outros_nucleos: [] as string[],
    renda_familiar: "",
    escolaridade: "",
    situacao_emprego: "",
    observacoes: "",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleOutroNucleo = (value: string) => {
    setForm((prev) => ({
      ...prev,
      outros_nucleos: prev.outros_nucleos.includes(value)
        ? prev.outros_nucleos.filter((v) => v !== value)
        : [...prev.outros_nucleos, value],
    }));
  };

  const formatCPF = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatWhatsApp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    return d.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!form.nome_completo.trim()) return setErro("Nome completo é obrigatório.");
    if (!form.whatsapp.trim()) return setErro("WhatsApp é obrigatório.");
    if (!form.nucleo_principal) return setErro("Selecione o núcleo de interesse.");

    setLoading(true);
    const { error } = await supabase.from("cadastros").insert({
      nome_completo:    form.nome_completo.trim(),
      cpf:              form.cpf || null,
      data_nascimento:  form.data_nascimento || null,
      genero:           form.genero || null,
      whatsapp:         form.whatsapp.trim(),
      email:            form.email || null,
      bairro:           form.bairro || null,
      cidade:           form.cidade || "Piracicaba",
      nucleo_principal: form.nucleo_principal,
      outros_nucleos:   form.outros_nucleos.length ? form.outros_nucleos : null,
      renda_familiar:   form.renda_familiar || null,
      escolaridade:     form.escolaridade || null,
      situacao_emprego: form.situacao_emprego || null,
      observacoes:      form.observacoes || null,
    });

    setLoading(false);

    if (error) {
      setErro("Erro ao salvar cadastro. Tente novamente.");
      console.error(error);
      return;
    }

    setSucesso(true);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-brand-verde/10 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" fill="none" stroke="#33cc66" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-black mb-3">Cadastro realizado!</h2>
          <p className="text-neutral-500 mb-8">
            Recebemos suas informações. Em breve nossa equipe entrará em contato pelo WhatsApp.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="bg-brand-ciano text-white font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Voltar para o Portal
            </Link>
            <Link
              href="/entrar?tab=cadastro"
              className="border border-black/20 text-black font-semibold py-3 rounded-xl text-sm hover:border-black/40 transition-colors"
            >
              Criar conta no portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nucleoLabel = NUCLEOS.find((n) => n.value === nucleoParam)?.label;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header da página */}
      <div className="bg-brand-ciano border-b-2 border-brand-amarelo">
        <div className="max-w-2xl mx-auto px-6 py-8 text-center">
          <p className="text-white/70 text-sm font-semibold mb-1">#MadureiraTem</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Cadastro — Centro Restaurando Cidadania
          </h1>
          {nucleoLabel && (
            <p className="text-white/80 text-sm mt-2">
              Interesse em: <strong>{nucleoLabel}</strong>
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* ── Dados Pessoais ── */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
          <h2 className="font-extrabold text-lg text-black mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-ciano text-white text-xs flex items-center justify-center font-black">1</span>
            Dados Pessoais
          </h2>
          <div className="flex flex-col gap-4">

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Nome completo <span className="text-brand-magenta">*</span>
              </label>
              <input
                type="text"
                required
                value={form.nome_completo}
                onChange={(e) => set("nome_completo", e.target.value)}
                placeholder="Seu nome completo"
                className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-1">CPF</label>
                <input
                  type="text"
                  value={form.cpf}
                  onChange={(e) => set("cpf", formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">Data de nascimento</label>
                <input
                  type="date"
                  value={form.data_nascimento}
                  onChange={(e) => set("data_nascimento", e.target.value)}
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Gênero</label>
              <div className="flex flex-wrap gap-2">
                {GENERO.map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => set("genero", g.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      form.genero === g.value
                        ? "bg-brand-ciano text-white border-brand-ciano"
                        : "bg-white text-black/60 border-black/20 hover:border-brand-ciano"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── Contato ── */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
          <h2 className="font-extrabold text-lg text-black mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-ciano text-white text-xs flex items-center justify-center font-black">2</span>
            Contato
          </h2>
          <div className="flex flex-col gap-4">

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                WhatsApp <span className="text-brand-magenta">*</span>
              </label>
              <input
                type="tel"
                required
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", formatWhatsApp(e.target.value))}
                placeholder="(19) 99999-9999"
                className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">E-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="seu@email.com"
                className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-1">Bairro</label>
                <input
                  type="text"
                  value={form.bairro}
                  onChange={(e) => set("bairro", e.target.value)}
                  placeholder="Seu bairro"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">Cidade</label>
                <input
                  type="text"
                  value={form.cidade}
                  onChange={(e) => set("cidade", e.target.value)}
                  placeholder="Piracicaba"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── Núcleo de Interesse ── */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
          <h2 className="font-extrabold text-lg text-black mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-ciano text-white text-xs flex items-center justify-center font-black">3</span>
            Núcleo de Interesse
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-bold text-black mb-2">
              Núcleo principal <span className="text-brand-magenta">*</span>
            </label>
            <select
              required
              value={form.nucleo_principal}
              onChange={(e) => set("nucleo_principal", e.target.value)}
              className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors bg-white"
            >
              <option value="">Selecione um núcleo...</option>
              {NUCLEOS.map((n) => (
                <option key={n.value} value={n.value}>{n.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Outros núcleos de interesse <span className="text-neutral-400 font-normal">(opcional)</span>
            </label>
            <div className="flex flex-col gap-2">
              {NUCLEOS.filter((n) => n.value !== form.nucleo_principal).map((n) => (
                <label key={n.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.outros_nucleos.includes(n.value)}
                    onChange={() => toggleOutroNucleo(n.value)}
                    className="w-4 h-4 accent-brand-ciano"
                  />
                  <span className="text-sm text-black/70 group-hover:text-black transition-colors">
                    {n.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dados Socioeconômicos ── */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
          <h2 className="font-extrabold text-lg text-black mb-1 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-ciano text-white text-xs flex items-center justify-center font-black">4</span>
            Perfil Socioeconômico
          </h2>
          <p className="text-neutral-400 text-xs mb-5 ml-9">
            Informações usadas apenas para relatórios internos e editais de captação.
          </p>

          <div className="flex flex-col gap-5">

            <div>
              <label className="block text-sm font-bold text-black mb-2">Renda familiar mensal</label>
              <div className="flex flex-col gap-2">
                {RENDA.map((r) => (
                  <label key={r.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="renda"
                      value={r.value}
                      checked={form.renda_familiar === r.value}
                      onChange={() => set("renda_familiar", r.value)}
                      className="w-4 h-4 accent-brand-ciano"
                    />
                    <span className="text-sm text-black/70 group-hover:text-black transition-colors">
                      {r.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Escolaridade</label>
              <select
                value={form.escolaridade}
                onChange={(e) => set("escolaridade", e.target.value)}
                className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors bg-white"
              >
                <option value="">Selecione...</option>
                {ESCOLARIDADE.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Situação de emprego</label>
              <div className="flex flex-wrap gap-2">
                {EMPREGO.map((emp) => (
                  <button
                    key={emp.value}
                    type="button"
                    onClick={() => set("situacao_emprego", emp.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      form.situacao_emprego === emp.value
                        ? "bg-brand-ciano text-white border-brand-ciano"
                        : "bg-white text-black/60 border-black/20 hover:border-brand-ciano"
                    }`}
                  >
                    {emp.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-1">
                Observações <span className="text-neutral-400 font-normal">(opcional)</span>
              </label>
              <textarea
                value={form.observacoes}
                onChange={(e) => set("observacoes", e.target.value)}
                placeholder="Alguma informação adicional que queira compartilhar..."
                rows={3}
                className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors resize-none"
              />
            </div>

          </div>
        </section>

        {/* ── Erro e Submit ── */}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-semibold">
            {erro}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-ciano hover:opacity-90 disabled:opacity-50 text-white font-extrabold py-4 rounded-2xl text-base transition-opacity"
        >
          {loading ? "Enviando..." : "Concluir Cadastro →"}
        </button>

        <p className="text-center text-neutral-400 text-xs">
          Seus dados são protegidos pela LGPD e usados apenas para contato e relatórios internos.
        </p>

      </form>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Carregando...</div>}>
      <CadastroForm />
    </Suspense>
  );
}
