import Link from "next/link";
import { notFound } from "next/navigation";
import { NUCLEOS } from "@/lib/nucleos";

// ============================================================
// Portal Cidadania OS — Página individual de cada Núcleo
// Rota: /nucleos/[slug]
// ============================================================

// Gera as rotas estáticas em build time
export function generateStaticParams() {
  return NUCLEOS.map((n) => ({ slug: n.slug }));
}

export default function NucleoPage({ params }: { params: { slug: string } }) {
  const nucleo = NUCLEOS.find((n) => n.slug === params.slug);

  if (!nucleo) notFound();

  return (
    <main className="min-h-screen bg-white">

      {/* ── BANNER / HERO DO NÚCLEO ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "60vh" }}>
        {/* Imagem de fundo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${nucleo.banner})` }}
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Foto pastores — canto direito, âncora no rodapé do banner */}
        <img
          src="/pastores/dilmo-marisa.jpg"
          alt="Pastores Dilmo e Marisa"
          className="absolute top-0 right-0 z-20 hidden sm:block pastores-anim"
          style={{ height: "36%", maxHeight: "196px", width: "auto", marginTop: "-1px", marginRight: "-1px" }}
        />

        {/* Conteúdo sobre o banner — alinhado à direita, com espaço para a foto */}
        <div className="relative z-10 w-full px-10 sm:pr-72 flex flex-col items-end justify-end pb-14 pt-32 md:pt-40" style={{ minHeight: "60vh" }}>
          {/* Subtítulo — extrema direita */}
          <p className="text-white/80 text-lg md:text-xl font-semibold mb-3 text-right">
            {nucleo.subtitulo}
          </p>

          {/* Badge #MadureiraTem — abaixo do subtítulo, extrema direita */}
          <span
            className="inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: `${nucleo.acento}30`,
              color: nucleo.acento,
              border: `1px solid ${nucleo.acento}50`,
            }}
          >
            #MadureiraTem
          </span>
        </div>
      </section>

      {/* ── DESCRIÇÃO + CTA ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Descrição */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-extrabold text-black mb-4 tracking-tight">
            Sobre o {nucleo.titulo}
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-8">
            {nucleo.descricao}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/cadastro?nucleo=${nucleo.slug}`}
              className="bg-brand-ciano hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-opacity text-center"
            >
              Cadastre-se neste núcleo
            </Link>
            <Link
              href="/"
              className="border border-black/20 hover:border-black/40 text-black font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors text-center"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>

        {/* Card lateral */}
        <div>
          <div
            className="rounded-2xl p-6 text-white"
            style={{ background: `${nucleo.acento}15`, border: `1px solid ${nucleo.acento}30` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${nucleo.acento}20` }}
            >
              <svg width="20" height="20" fill="none" stroke={nucleo.acento} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-black text-lg mb-2">Participar é gratuito</h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              Todos os serviços do Centro Restaurando Cidadania são 100% gratuitos para a comunidade.
            </p>
            <Link
              href={`/cadastro?nucleo=${nucleo.slug}`}
              className="block w-full text-center font-bold py-3 rounded-xl text-sm transition-opacity hover:opacity-80"
              style={{ background: nucleo.acento, color: "#fff" }}
            >
              Inscrever-se agora
            </Link>
          </div>
        </div>

      </section>

      {/* ── OUTROS NÚCLEOS ── */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h3 className="text-lg font-extrabold text-black mb-6">Outros Núcleos</h3>
          <div className="flex flex-wrap gap-3">
            {NUCLEOS.filter((n) => n.slug !== nucleo.slug).map((outro) => (
              <Link
                key={outro.slug}
                href={`/nucleos/${outro.slug}`}
                className="border border-neutral-200 hover:border-brand-ciano text-neutral-700 hover:text-brand-ciano font-semibold text-xs px-4 py-2 rounded-full transition-colors"
              >
                {outro.titulo}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
