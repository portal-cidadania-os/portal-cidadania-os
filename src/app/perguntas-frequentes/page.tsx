"use client";

import React, { useState } from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — FAQ / Perguntas Frequentes
// (/perguntas-frequentes)
// ============================================================

const FAQ = [
  {
    categoria: "Portal & Cadastro",
    perguntas: [
      {
        pergunta: "Como me cadastro no Portal Cidadania?",
        resposta: "Acesse a página de cadastro clicando em 'Cadastre-se' no menu. Preencha seus dados pessoais, endereço e documentos solicitados. O cadastro é gratuito e leva menos de 5 minutos.",
      },
      {
        pergunta: "O cadastro tem algum custo?",
        resposta: "Não. O cadastro e o acesso ao portal são completamente gratuitos para todos os cidadãos. Nunca cobramos nenhum valor para prestação de serviços.",
      },
      {
        pergunta: "Esqueci minha senha. O que faço?",
        resposta: "Na tela de login, clique em 'Esqueci minha senha'. Você receberá um link de redefinição no e-mail cadastrado. Se não tiver acesso ao e-mail, entre em contato com nossa equipe.",
      },
      {
        pergunta: "Posso atualizar meus dados depois do cadastro?",
        resposta: "Sim. Acesse 'Meu Perfil' após fazer login e atualize suas informações a qualquer momento. Recomendamos manter os dados sempre atualizados.",
      },
    ],
  },
  {
    categoria: "Vagas & Emprego",
    perguntas: [
      {
        pergunta: "Como me candidato a uma vaga de emprego?",
        resposta: "Cadastre-se no portal, acesse a página de Vagas, escolha a oportunidade desejada e clique em 'Candidatar-me'. Nossa equipe de empregabilidade fará o encaminhamento.",
      },
      {
        pergunta: "As vagas são para qualquer perfil?",
        resposta: "Temos vagas para os mais diversos perfis — sem experiência, com experiência, ensino fundamental, médio e superior. Consulte os requisitos de cada vaga na página correspondente.",
      },
      {
        pergunta: "Há algum custo para participar do processo seletivo?",
        resposta: "Nunca. O serviço de encaminhamento de vagas é 100% gratuito. Qualquer cobrança por parte de empresa ou intermediário deve ser reportada à nossa equipe.",
      },
    ],
  },
  {
    categoria: "Cursos & Capacitação",
    perguntas: [
      {
        pergunta: "Os cursos são realmente gratuitos?",
        resposta: "Sim, todos os cursos oferecidos pelo CERPI são gratuitos para a comunidade. Não há mensalidade, material pago ou taxa de inscrição.",
      },
      {
        pergunta: "Preciso ter ensino médio completo para fazer os cursos?",
        resposta: "Depende do curso. A maioria dos cursos profissionalizantes aceita candidatos com ensino fundamental. Confira os requisitos específicos na página de cada curso.",
      },
      {
        pergunta: "Recebo certificado ao concluir um curso?",
        resposta: "Sim. Todos os cursos emitem certificado de conclusão. Alguns cursos emitem certificados com parceiros institucionais como SENAI e SEBRAE.",
      },
    ],
  },
  {
    categoria: "Associação & Doações",
    perguntas: [
      {
        pergunta: "Como faço para me tornar associado?",
        resposta: "Acesse a página 'Associe-se', escolha o plano que mais combina com você e preencha o formulário de adesão. Nossa equipe entrará em contato para concluir o processo.",
      },
      {
        pergunta: "Posso cancelar minha contribuição mensal?",
        resposta: "Sim, a qualquer momento e sem burocracia. Entre em contato com nossa equipe informando o desejo de cancelamento.",
      },
      {
        pergunta: "As doações são dedutíveis do Imposto de Renda?",
        resposta: "Em análise. Recomendamos consultar seu contador. O CERPI emite recibo de doação para todos os contribuintes. Entre em contato para mais informações.",
      },
    ],
  },
  {
    categoria: "Voluntariado",
    perguntas: [
      {
        pergunta: "Preciso ter disponibilidade de tempo integral para ser voluntário?",
        resposta: "Não. Aceitamos voluntários com diferentes disponibilidades — algumas ações acontecem aos finais de semana, outras durante eventos pontuais. Informe sua disponibilidade no cadastro.",
      },
      {
        pergunta: "Menores de 18 anos podem ser voluntários?",
        resposta: "Sim, com autorização dos pais ou responsáveis. Temos ações específicas para jovens, especialmente no programa Ação Kids.",
      },
    ],
  },
];

function AcordionItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
      >
        <span className="font-semibold text-sm text-black leading-snug">{pergunta}</span>
        <svg
          width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          className={`flex-shrink-0 text-neutral-400 transition-transform duration-200 ${aberto ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {aberto && (
        <div className="px-5 pb-5">
          <p className="text-neutral-500 text-sm leading-relaxed">{resposta}</p>
        </div>
      )}
    </div>
  );
}

export default function PerguntasFrequentesPage() {
  return (
    <main className="w-full min-h-[calc(100vh-300px)] bg-white text-black">

      {/* ── Header ── */}
      <div className="bg-[#0a0a1a] text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/60">Perguntas Frequentes</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              FAQ
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Perguntas Frequentes</h1>
            <p className="text-white/50 text-base mt-2 max-w-2xl">
              Encontre respostas rápidas para as dúvidas mais comuns. Não encontrou o que procurava? Nossa equipe está disponível no Fale Conosco.
            </p>
          </div>
        </div>
      </div>

      {/* ── Busca visual (decorativa) ── */}
      <div className="border-b border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="max-w-lg flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-4 py-3">
            <svg width="16" height="16" fill="none" stroke="#aaa" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-neutral-400 text-sm">Pesquisar nas perguntas…</span>
          </div>
        </div>
      </div>

      {/* ── FAQ por categoria ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
        {FAQ.map((grupo) => (
          <div key={grupo.categoria}>
            <h2 className="text-base font-extrabold text-black mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-ciano rounded-full" />
              {grupo.categoria}
            </h2>
            <div className="flex flex-col gap-2">
              {grupo.perguntas.map((pq) => (
                <AcordionItem key={pq.pergunta} pergunta={pq.pergunta} resposta={pq.resposta} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA Fale Conosco ── */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center">
          <h3 className="font-extrabold text-lg text-black mb-2">Não encontrou sua resposta?</h3>
          <p className="text-neutral-500 text-sm mb-5">Nossa equipe responde em até 24 horas úteis. Pode nos enviar uma mensagem pelo WhatsApp, e-mail ou pelo formulário de contato.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/fale-conosco" className="bg-brand-ciano hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-opacity">
              Fale Conosco
            </Link>
            <a href="https://wa.me/5519000000000" target="_blank" rel="noopener noreferrer" className="border border-brand-verde text-brand-verde hover:bg-brand-verde hover:text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all">
              WhatsApp →
            </a>
          </div>
        </div>
      </div>

    </main>
  );
}
