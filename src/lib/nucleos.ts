// ============================================================
// Portal Cidadania OS — Dados dos Nucleos
// Fonte unica de verdade: importada em page.tsx e nas paginas individuais
//
// Estrutura de imagens (em /public/nucleos/[slug]/):
//   card.jpg   — 800x600 px (proporcao 4:3) — usado no grid da home
//   banner.jpg — 1920x1080 px (proporcao 16:9) — usado como hero da pagina
// ============================================================

export type Nucleo = {
  slug: string;
  titulo: string;
  subtitulo: string;
  imagem: string;   // card 4:3 — grid da home
  banner: string;   // banner 16:9 — hero da pagina individual
  acento: string;   // cor de destaque do nucleo
  descricao: string;
};

export const NUCLEOS: Nucleo[] = [
  {
    slug: "sorria-com-cristo",
    titulo: "Sorria com Cristo",
    subtitulo: "Odontologia solidaria gratuita",
    imagem: "/nucleos/sorria-com-cristo/card.jpg",
    banner: "/nucleos/sorria-com-cristo/banner.jpg",
    acento: "#ff66cc",
    descricao:
      "Atendimento odontologico gratuito para familias em vulnerabilidade social. Nosso nucleo de odontologia solidaria garante saude bucal e autoestima para toda a comunidade de Piracicaba.",
  },
  {
    slug: "nucleo-apoio",
    titulo: "Nucleo de Apoio",
    subtitulo: "Suporte e acolhimento social",
    imagem: "/nucleos/nucleo-apoio/card.jpg",
    banner: "/nucleos/nucleo-apoio/banner.jpg",
    acento: "#cc44ff",
    descricao:
      "Acolhimento, orientacao e apoio integral para familias em situacao de vulnerabilidade. O Nucleo de Apoio conecta pessoas a recursos e servicos essenciais.",
  },
  {
    slug: "nucleo-crescer",
    titulo: "Nucleo CRESCER",
    subtitulo: "Empresarios e Empreendedoras",
    imagem: "/nucleos/nucleo-crescer/card.jpg",
    banner: "/nucleos/nucleo-crescer/banner.jpg",
    acento: "#ffcc00",
    descricao:
      "Capacitacao, networking e suporte para empresarios e empreendedoras de Piracicaba. O Nucleo CRESCER e o espaco onde negocios nascem, crescem e transformam a cidade.",
  },
  {
    slug: "empregabilidade",
    titulo: "Empregabilidade",
    subtitulo: "+1.000 vagas por mes",
    imagem: "/nucleos/empregabilidade/card.jpg",
    banner: "/nucleos/empregabilidade/banner.jpg",
    acento: "#33cc66",
    descricao:
      "Mais de 1.000 vagas de emprego ofertadas mensalmente em parceria com Adiante Brasil. O Nucleo de Desenvolvimento e Empregabilidade e a ponte entre voce e o mercado de trabalho.",
  },
  {
    slug: "esporte",
    titulo: "Nucleo Esporte",
    subtitulo: "Futebol - Futsal - Volei",
    imagem: "/nucleos/esporte/card.jpg",
    banner: "/nucleos/esporte/banner.jpg",
    acento: "#ff4444",
    descricao:
      "O esporte como ferramenta de inclusao social e desenvolvimento de talentos. Modalidades: Futebol, Futsal e Volei - para criancas, jovens e adultos de Piracicaba.",
  },
  {
    slug: "promocao-social",
    titulo: "Promocao Social",
    subtitulo: "Acoes para toda a familia",
    imagem: "/nucleos/promocao-social/card.jpg",
    banner: "/nucleos/promocao-social/banner.jpg",
    acento: "#0099ff",
    descricao:
      "Acoes sociais continuas voltadas ao fortalecimento familiar e comunitario. O Nucleo de Promocao Social atua na linha de frente das necessidades da populacao de Piracicaba.",
  },
  {
    slug: "pascoa",
    titulo: "Pascoa Solidaria",
    subtitulo: "Celebrando com a comunidade",
    imagem: "/nucleos/pascoa/card.jpg",
    banner: "/nucleos/pascoa/banner.jpg",
    acento: "#cc44ff",
    descricao:
      "Campanha especial de Pascoa levando alegria, chocolates e celebracao as familias de Piracicaba. Uma tradicao de amor e solidariedade do Centro Restaurando Cidadania.",
  },
  {
    slug: "natal",
    titulo: "Natal Cidadania",
    subtitulo: "Feliz Natal para todos",
    imagem: "/nucleos/natal/card.jpg",
    banner: "/nucleos/natal/banner.jpg",
    acento: "#ff4444",
    descricao:
      "Campanha de Natal solidario com distribuicao de presentes, cesta basica e celebracao comunitaria. Porque todo mundo merece um Natal feliz.",
  },
  {
    slug: "empreendedoras",
    titulo: "Empreendedoras",
    subtitulo: "Mulheres que transformam",
    imagem: "/nucleos/empreendedoras/card.jpg",
    banner: "/nucleos/empreendedoras/banner.jpg",
    acento: "#ff66cc",
    descricao:
      "Programa de capacitacao, mentoria e apoio para mulheres empreendedoras de Piracicaba. Aqui, mulheres constroem negocios, autonomia e futuro.",
  },
  {
    slug: "acao-kids",
    titulo: "Acao Social Kids",
    subtitulo: "Criancas e adolescentes",
    imagem: "/nucleos/acao-kids/card.jpg",
    banner: "/nucleos/acao-kids/banner.jpg",
    acento: "#33cc66",
    descricao:
      "Acoes voltadas ao desenvolvimento integral de criancas e adolescentes - educacao, cultura, esporte e lazer. Um espaco seguro para crescer com proposito.",
  },
];
