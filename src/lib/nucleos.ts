// ============================================================
// Portal Cidadania OS — Dados dos Núcleos
// Fonte única de verdade: importada em page.tsx e nas páginas individuais
// ============================================================

export type Nucleo = {
  slug: string;
  titulo: string;
  subtitulo: string;
  imagem: string;      // imagem principal (salvar em /public/ com o nome abaixo)
  acento: string;      // cor de destaque do núcleo
  descricao: string;
};

// Ordem definida pelo usuário
// Nomes de arquivo sugeridos para /public/:
//   sorria-com-cristo.jpg   ← renomear "SORRIA COM CRISTO.jpg"
//   nucleo-apoio.jpg        ← renomear "NUCLEO DE APOIO.jpg"
//   nucleo-crescer.jpg      ← renomear "NUCLEO CRESCER.jpg"
//   nucleo-empregabilidade.jpg ← renomear "NUCLOEMPREGABILIDADE.jpg"
//   nucleo-esporte.jpg      ← renomear "NUCLEO ESPORTE.jpg"
//   nucleo-promocao.jpg     ← renomear "NUCLEOPROMOCAO.jpg"
//   pascoa.jpg              ← "PASCOA.jpg" (manter nome)
//   natal.jpg               ← "NATAL.jpg" (manter nome)
//   empreendedoras.jpg      ← "EMPREENDEDORAS.jpg" (manter nome)
//   acao-kids.jpg           ← renomear "ACAOKIDS.jpg"

export const NUCLEOS: Nucleo[] = [
  {
    slug: "sorria-com-cristo",
    titulo: "Sorria com Cristo",
    subtitulo: "Odontologia solidária gratuita",
    imagem: "/SORRIA-COM-CRISTO.jpg",
    acento: "#ff66cc",
    descricao:
      "Atendimento odontológico gratuito para famílias em vulnerabilidade social. Nosso núcleo de odontologia solidária garante saúde bucal e autoestima para toda a comunidade de Piracicaba.",
  },
  {
    slug: "nucleo-apoio",
    titulo: "Núcleo de Apoio",
    subtitulo: "Suporte e acolhimento social",
    imagem: "/NUCLEO-APOIO.jpg",
    acento: "#cc44ff",
    descricao:
      "Acolhimento, orientação e apoio integral para famílias em situação de vulnerabilidade. O Núcleo de Apoio conecta pessoas a recursos e serviços essenciais.",
  },
  {
    slug: "nucleo-crescer",
    titulo: "Núcleo CRESCER",
    subtitulo: "Empresários e Empreendedoras",
    imagem: "/NUCLEO-CRESCER.jpg",
    acento: "#ffcc00",
    descricao:
      "Capacitação, networking e suporte para empresários e empreendedoras de Piracicaba. O Núcleo CRESCER é o espaço onde negócios nascem, crescem e transformam a cidade.",
  },
  {
    slug: "empregabilidade",
    titulo: "Empregabilidade",
    subtitulo: "+1.000 vagas por mês",
    imagem: "/NUCLEO-EMPREGABILIDADE.jpg",
    acento: "#33cc66",
    descricao:
      "Mais de 1.000 vagas de emprego ofertadas mensalmente em parceria com Adiante Brasil. O Núcleo de Desenvolvimento e Empregabilidade é a ponte entre você e o mercado de trabalho.",
  },
  {
    slug: "esporte",
    titulo: "Núcleo Esporte",
    subtitulo: "Futebol · Futsal · Vôlei",
    imagem: "/NUCLEO-ESPORTE.jpg",
    acento: "#ff4444",
    descricao:
      "O esporte como ferramenta de inclusão social e desenvolvimento de talentos. Modalidades: Futebol, Futsal e Vôlei — para crianças, jovens e adultos de Piracicaba.",
  },
  {
    slug: "promocao-social",
    titulo: "Promoção Social",
    subtitulo: "Ações para toda a família",
    imagem: "/NUCLEO-PROMOCAO.jpg",
    acento: "#0099ff",
    descricao:
      "Ações sociais contínuas voltadas ao fortalecimento familiar e comunitário. O Núcleo de Promoção Social atua na linha de frente das necessidades da população de Piracicaba.",
  },
  {
    slug: "pascoa",
    titulo: "Páscoa Solidária",
    subtitulo: "Celebrando com a comunidade",
    imagem: "/PASCOA.jpg",
    acento: "#cc44ff",
    descricao:
      "Campanha especial de Páscoa levando alegria, chocolates e celebração às famílias de Piracicaba. Uma tradição de amor e solidariedade do Centro Restaurando Cidadania.",
  },
  {
    slug: "natal",
    titulo: "Natal Cidadania",
    subtitulo: "Feliz Natal para todos",
    imagem: "/NATAL.jpg",
    acento: "#ff4444",
    descricao:
      "Campanha de Natal solidário com distribuição de presentes, cesta básica e celebração comunitária. Porque todo mundo merece um Natal feliz.",
  },
  {
    slug: "empreendedoras",
    titulo: "Empreendedoras",
    subtitulo: "Mulheres que transformam",
    imagem: "/EMPREENDEDORAS.jpg",
    acento: "#ff66cc",
    descricao:
      "Programa de capacitação, mentoria e apoio para mulheres empreendedoras de Piracicaba. Aqui, mulheres constroem negócios, autonomia e futuro.",
  },
  {
    slug: "acao-kids",
    titulo: "Ação Social Kids",
    subtitulo: "Crianças e adolescentes",
    imagem: "/ACAO-KIDS.jpg",
    acento: "#33cc66",
    descricao:
      "Ações voltadas ao desenvolvimento integral de crianças e adolescentes — educação, cultura, esporte e lazer. Um espaço seguro para crescer com propósito.",
  },
];
