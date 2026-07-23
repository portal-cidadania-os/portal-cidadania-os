"use client";

import Link from "next/link";

// ============================================================
// Portal Cidadania OS — Página Quem Somos (/quem-somos)
// Visual: fundo escuro, estilo institucional
// ============================================================

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── HERO: Quem Somos ── */}
      <section className="relative overflow-hidden">
        {/* Gradiente decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6600cc]/20 via-transparent to-[#cc00ff]/10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Coluna esquerda: texto ── */}
          <div>
            {/* Logo + Título */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/institucional/logo.png"
                alt="Logo CERPI"
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#cc44ff] leading-tight">
                Quem Somos:
              </h1>
            </div>

            {/* Descrição */}
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
              O{" "}
              <strong className="text-[#cc44ff]">
                Centro Restaurando Cidadania (CERPI)
              </strong>{" "}
              é uma organização voltada ao desenvolvimento humano e social, atuando em diversas
              frentes para promover inclusão, qualificação profissional, fortalecimento familiar,
              educação, cultura, saúde e esporte.
            </p>

            {/* Nossa Missão */}
            <div className="mb-5">
              <h2 className="text-[#cc44ff] font-extrabold text-lg mb-1 tracking-wide">
                Nossa Missão
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Promover transformação social por meio de ações concretas que gerem oportunidades,
                dignidade e desenvolvimento para crianças, jovens, adultos e idosos.
              </p>
            </div>

            {/* Nossa Visão */}
            <div className="mb-5">
              <h2 className="text-[#cc44ff] font-extrabold text-lg mb-1 tracking-wide">
                Nossa Visão
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Ser referência em inclusão social e desenvolvimento comunitário na região de
                Piracicaba.
              </p>
            </div>

            {/* Nossos Valores */}
            <div className="mb-8">
              <h2 className="text-[#cc44ff] font-extrabold text-lg mb-2 tracking-wide">
                Nossos Valores
              </h2>
              <ul className="text-white/70 text-sm space-y-1">
                {[
                  "Ética",
                  "Transparência",
                  "Solidariedade",
                  "Respeito",
                  "Inclusão",
                  "Responsabilidade Social",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2">
                    <span className="text-[#cc44ff]">•</span> {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/associe-se"
                className="bg-[#cc44ff] hover:opacity-90 text-white font-bold px-8 py-3 rounded-xl text-sm transition-opacity text-center"
              >
                Associe-se
              </Link>
              <Link
                href="/fale-conosco"
                className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all text-center"
              >
                Fale Conosco
              </Link>
            </div>
          </div>

          {/* ── Coluna direita: foto + ícones ── */}
          <div className="flex flex-col items-center gap-8">
            {/* Foto em círculo */}
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#6600cc]/40 shadow-2xl shadow-[#cc44ff]/20">
                <img
                  src="/institucional/quem-somos-foto.jpg"
                  alt="Centro Restaurando Cidadania"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "/institucional/logo.png";
                    img.onerror = null;
                  }}
                />
              </div>
              {/* Glow decorativo */}
              <div className="absolute -inset-4 rounded-full bg-[#cc44ff]/10 blur-2xl -z-10" />
            </div>

            {/* Ícones hexagonais */}
            <div className="flex items-end gap-3">
              {/* Hexágono 1 — Educação */}
              <div className="flex flex-col items-center">
                <div
                  className="w-24 h-24 flex items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "#8833cc",
                  }}
                >
                  <svg width="36" height="36" fill="white" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                  </svg>
                </div>
              </div>

              {/* Hexágono 2 — Inclusão (maior, centro) */}
              <div className="flex flex-col items-center -mt-6">
                <div
                  className="w-28 h-28 flex items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "#9944dd",
                  }}
                >
                  <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                </div>
              </div>

              {/* Hexágono 3 — Comunidade */}
              <div className="flex flex-col items-center">
                <div
                  className="w-24 h-24 flex items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "#7722bb",
                  }}
                >
                  <svg width="36" height="36" fill="white" viewBox="0 0 24 24">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Botão de navegação */}
            <Link
              href="/associe-se"
              className="flex items-center gap-2 border border-white/20 hover:border-[#cc44ff]/60 text-white/60 hover:text-white px-6 py-2.5 rounded-full text-sm transition-all group"
            >
              Saiba mais
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* ── NÚMEROS DE IMPACTO ── */}
      <section className="border-t border-white/5 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { valor: "1.000+", label: "Vagas por Mês" },
              { valor: "10",     label: "Núcleos Ativos" },
              { valor: "4+",     label: "Cursos Gratuitos" },
              { valor: "2019",   label: "Fundado em" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-4xl font-extrabold text-[#cc44ff]">{item.valor}</div>
                <div className="text-white/40 text-sm font-medium mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Faça parte desta história
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto mb-8">
            Junte-se ao Centro Restaurando Cidadania e ajude a transformar Piracicaba — porque{" "}
            <strong className="text-[#cc44ff]">#MadureiraTem</strong> o que a sua família precisa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/associe-se"
              className="bg-[#cc44ff] hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-opacity"
            >
              Associe-se
            </Link>
            <Link
              href="/voluntariado"
              className="border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all"
            >
              Seja voluntário
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
