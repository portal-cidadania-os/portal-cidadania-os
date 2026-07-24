"use client";

import React, { useState } from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Fale Conosco (/fale-conosco)
// ============================================================

const ASSUNTOS = [
  "Informações gerais",
  "Vagas de emprego",
  "Cursos e capacitação",
  "Voluntariado",
  "Doações e parcerias",
  "Associação",
  "Suporte ao portal",
  "Imprensa",
  "Outro",
];

const CANAIS = [
  {
    titulo: "WhatsApp",
    descricao: "Atendimento rápido via mensagem. Resposta em até 2 horas em dias úteis.",
    valor: "(19) 9 0000-0000",
    href: "https://wa.me/5519000000000",
    icone: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    cor: "text-green-600 bg-green-50 border-green-200",
    ctaCor: "bg-green-500 hover:bg-green-600 text-white",
    ctaLabel: "Abrir WhatsApp",
  },
  {
    titulo: "E-mail",
    descricao: "Para solicitações formais, documentos e parcerias. Resposta em até 48 horas.",
    valor: "contato@cerpi.org.br",
    href: "mailto:contato@cerpi.org.br",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    cor: "text-brand-ciano bg-brand-ciano/5 border-brand-ciano/20",
    ctaCor: "bg-brand-ciano hover:opacity-90 text-white",
    ctaLabel: "Enviar e-mail",
  },
  {
    titulo: "Presencial",
    descricao: "Atendimento na sede. Segunda a sexta, das 8h às 17h.",
    valor: "Rua Madureira, 00 — Piracicaba/SP",
    href: "https://maps.google.com",
    icone: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    cor: "text-brand-amarelo bg-brand-amarelo/10 border-brand-amarelo/20",
    ctaCor: "bg-brand-amarelo hover:opacity-90 text-black",
    ctaLabel: "Ver no mapa",
  },
];

export default function FaleConoscoPage() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrar com Supabase / e-mail na Fase 2
    setEnviado(true);
  }

  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Fale Conosco</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              Atendimento
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Fale Conosco</h1>
            <p className="text-white/50 text-base mt-2 max-w-2xl">
              Tem alguma dúvida, sugestão ou deseja se tornar parceiro? Escolha o canal que preferir — nossa equipe está pronta para atender.
            </p>
          </div>
        </div>
      </div>

      {/* ── Canais de atendimento ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {CANAIS.map((canal) => (
            <div key={canal.titulo} className={`border ${canal.cor} rounded-2xl p-6 flex flex-col gap-4`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${canal.cor}`}>
                {canal.icone}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-base text-black mb-1">{canal.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-2">{canal.descricao}</p>
                <p className="font-semibold text-sm text-black">{canal.valor}</p>
              </div>
              <a href={canal.href} target="_blank" rel="noopener noreferrer" className={`w-full text-center font-bold py-2.5 rounded-xl text-sm transition-opacity ${canal.ctaCor}`}>
                {canal.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        {/* ── Formulário ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="text-xl font-extrabold text-black mb-6">Envie uma mensagem</h2>

            {enviado ? (
              <div className="bg-brand-verde/10 border border-brand-verde/30 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-brand-verde rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-extrabold text-lg text-black mb-2">Mensagem enviada!</h3>
                <p className="text-neutral-500 text-sm">Recebemos sua mensagem e responderemos em até 48 horas úteis. Obrigado pelo contato.</p>
                <button onClick={() => { setEnviado(false); setForm({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" }); }} className="mt-5 text-sm font-semibold text-brand-ciano hover:underline">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Nome completo *</label>
                    <input
                      name="nome" required value={form.nome} onChange={handleChange}
                      placeholder="Seu nome"
                      className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Telefone / WhatsApp</label>
                    <input
                      name="telefone" value={form.telefone} onChange={handleChange}
                      placeholder="(19) 9 0000-0000"
                      className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">E-mail *</label>
                  <input
                    name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="seu@email.com"
                    className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Assunto *</label>
                  <select
                    name="assunto" required value={form.assunto} onChange={handleChange}
                    className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors bg-white"
                  >
                    <option value="">Selecione o assunto…</option>
                    {ASSUNTOS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Mensagem *</label>
                  <textarea
                    name="mensagem" required rows={5} value={form.mensagem} onChange={handleChange}
                    placeholder="Escreva sua mensagem aqui…"
                    className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-ciano transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-brand-ciano hover:opacity-90 text-white font-bold py-3.5 rounded-xl text-sm transition-opacity">
                  Enviar mensagem →
                </button>
                <p className="text-xs text-neutral-400 text-center">Dados protegidos pela LGPD · Nunca compartilhamos suas informações</p>
              </form>
            )}
          </div>

          {/* ── Info lateral ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
              <h3 className="font-extrabold text-sm text-black mb-4">Horários de atendimento</h3>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { dia: "Segunda a Sexta", hora: "08h às 17h" },
                  { dia: "Sábado", hora: "08h às 12h" },
                  { dia: "Domingo e Feriados", hora: "Fechado" },
                ].map((h) => (
                  <div key={h.dia} className="flex justify-between">
                    <span className="text-neutral-500">{h.dia}</span>
                    <span className={`font-semibold ${h.hora === "Fechado" ? "text-neutral-300" : "text-black"}`}>{h.hora}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-ciano/5 border border-brand-ciano/20 rounded-2xl p-6">
              <h3 className="font-extrabold text-sm text-black mb-2">Dúvidas frequentes?</h3>
              <p className="text-neutral-500 text-xs leading-relaxed mb-3">Antes de entrar em contato, veja se sua dúvida já tem resposta no nosso FAQ.</p>
              <Link href="/perguntas-frequentes" className="inline-block text-xs font-bold text-brand-ciano hover:underline">
                Ver perguntas frequentes →
              </Link>
            </div>

            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
              <h3 className="font-extrabold text-sm text-black mb-2">Imprensa</h3>
              <p className="text-neutral-500 text-xs leading-relaxed mb-3">Para entrevistas, releases e solicitações de mídia, utilize o assunto "Imprensa" no formulário ou acesse:</p>
              <a href="mailto:imprensa@cerpi.org.br" className="inline-block text-xs font-bold text-brand-ciano hover:underline">
                imprensa@cerpi.org.br
              </a>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}
