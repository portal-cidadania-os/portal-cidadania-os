import React from "react";
import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Footer
// Estrutura: CTA de cadastro → 4 colunas → barra legal
// Fundo: bg-white + FUNDO.png animado (opacity 0.3)
// Barra legal: fundo preto + linha laranja brand-amarelo
// ============================================================

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white text-black">
      {/* Fundo FUNDO2.png animado — usa bg-movimento-suave-2 (troque por bg-movimento-suave para usar FUNDO.png) */}
      <div className="absolute inset-0 pointer-events-none bg-movimento-suave-2 opacity-[0.15]" />

      {/* ── CTA Section ── */}
      <div className="relative z-10 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-brand-ciano rounded-xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-extrabold text-xl leading-tight">
                Faça parte da nossa comunidade
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Acesse cursos gratuitos, vagas de emprego e recursos de cidadania. Cadastro 100% gratuito.
              </p>
            </div>
            <Link
              href="/entrar?tab=cadastro"
              className="bg-white text-brand-ciano hover:bg-neutral-50 font-extrabold text-sm px-6 py-3 rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
            >
              Cadastre-se gratuitamente →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Colunas ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Coluna 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-ciano flex items-center justify-center flex-shrink-0">
                <img
                  src="/LOGO.png"
                  alt="Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span className="font-extrabold text-2xl text-black">Portal Cidadania</span>
            </div>
            <p className="text-black/70 text-base font-bold leading-snug">
              {/* PLACEHOLDER: Substitua pelo texto oficial da missão da associação */}
              Associação sem fins lucrativos dedicada ao desenvolvimento humano e social, conectando cidadãos a oportunidades reais de capacitação, trabalho e cidadania ativa.
            </p>
            {/* Redes Sociais — PLACEHOLDER: substitua os hrefs pelos links reais */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com/[HANDLE]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-black hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/[HANDLE]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-black hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/[HANDLE]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-black hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@[HANDLE]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-black hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-white">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
              <a
                href="https://wa.me/55[NUMERO]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-black hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2 — Plataforma */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-black text-sm font-black uppercase tracking-widest mb-1">
              Plataforma
            </h4>
            {[
              { href: "/cursos", label: "Cursos & Capacitação" },
              { href: "/vagas", label: "Vagas & Emprego" },
              { href: "/voluntariado", label: "Voluntariado" },
              { href: "/eventos", label: "Eventos" },
              { href: "/publicacoes", label: "Publicações" },
              { href: "/campanhas", label: "Campanhas" },
              { href: "/certificados/validar", label: "Validar Certificado" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black hover:text-black/70 text-base font-semibold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Coluna 3 — Institucional */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-black text-sm font-black uppercase tracking-widest mb-1">
              Institucional
            </h4>
            {[
              { href: "/quem-somos", label: "Quem Somos" },
              { href: "/associe-se", label: "Associe-se" },
              { href: "/parceiros", label: "Parceiros" },
              { href: "/noticias", label: "Notícias" },
              { href: "/transparencia", label: "Transparência" },
              { href: "/relatorio-anual", label: "Relatório Anual" },
              { href: "/perguntas-frequentes", label: "FAQ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black hover:text-black/70 text-base font-semibold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Coluna 4 — Cidadania & Contato */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-black text-sm font-black uppercase tracking-widest mb-1">
              Cidadania
            </h4>
            {[
              { href: "/ouvidoria", label: "Ouvidoria" },
              { href: "/fale-conosco", label: "Fale Conosco" },
              { href: "/lgpd", label: "LGPD" },
              { href: "/politica-privacidade", label: "Política de Privacidade" },
              { href: "/termos-uso", label: "Termos de Uso" },
              { href: "/etica", label: "Ética e Conduta" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black hover:text-black/70 text-base font-semibold transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* PLACEHOLDER: Substitua pelo endereço e e-mail reais */}
            <div className="mt-3 pt-3 border-t border-black/5 flex flex-col gap-1">
              <span className="text-black/70 text-sm font-semibold">[Endereço da associação]</span>
              <span className="text-black/70 text-sm font-semibold">[Cidade - UF, CEP XX.XXX-XXX]</span>
              <a
                href="mailto:contato@[dominio].org.br"
                className="text-black hover:text-black/70 text-sm font-semibold transition-colors mt-1"
              >
                contato@[dominio].org.br
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barra Legal — fundo preto + linha laranja ── */}
      <div className="relative z-10 bg-[#0f0f1a] border-t-2 border-b-2 border-brand-amarelo">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-brand-amarelo/60 text-xs text-center sm:text-left">
            {/* PLACEHOLDER: Substitua pelo nome e CNPJ reais */}
            © {anoAtual} Associação [Nome Oficial] · CNPJ XX.XXX.XXX/0001-XX · Todos os direitos reservados
          </span>
          <div className="flex items-center gap-4">
            <Link href="/politica-privacidade" className="text-brand-amarelo/50 hover:text-brand-amarelo text-xs transition-colors">
              Privacidade
            </Link>
            <Link href="/termos-uso" className="text-brand-amarelo/50 hover:text-brand-amarelo text-xs transition-colors">
              Termos
            </Link>
            <Link href="/etica" className="text-brand-amarelo/50 hover:text-brand-amarelo text-xs transition-colors">
              Ética
            </Link>
            <Link href="/ouvidoria" className="text-brand-amarelo/50 hover:text-brand-amarelo text-xs transition-colors">
              Ouvidoria
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
