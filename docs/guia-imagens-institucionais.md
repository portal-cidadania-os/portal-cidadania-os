# Guia de Imagens Institucionais — Portal Cidadania OS (CERPI)

**Versão:** 1.0 | **Criado em:** 2026-07-23 | **Connection Cyber**

---

## Regra Geral

Toda imagem deve ter o **elemento principal centralizado** na imagem.
O sistema usa `object-cover` e `bg-cover bg-center` — isso significa que as bordas
são cortadas automaticamente para preencher o espaço. Se o assunto estiver nas bordas, será cortado.

---

## 1. Cards de Núcleos (Página Inicial)

**Onde aparece:** grade de núcleos na home — 4 colunas no desktop, 2 no celular.

| Atributo | Valor |
|---|---|
| Proporção | **4:3** (ex: 800×600px) |
| Tamanho mínimo | 600×450 px |
| Tamanho ideal | **800×600 px** |
| Formato | JPG ou WebP |
| Peso máximo | 300 KB |
| Recorte automático | Sim — bordas laterais e superior são cortadas |
| Foco do recorte | Centro da imagem |

**Como o texto aparece sobre a imagem:**
- Badge `#MadureiraTem` na parte inferior esquerda
- Título e subtítulo na base da imagem com fundo escurecido

**Cuidado:** imagens com texto grande em toda a extensão (ex: "NÚCLEO DE APOIO" ocupando 100% da largura)
ficam com o texto cortado nas laterais. Prefira imagens onde o texto ou logo esteja centralizado
ou use imagens fotográficas sem texto sobreposto — o texto do card já é inserido pelo sistema.

**Arquivos atuais (`/public/`):**
```
SORRIA-COM-CRISTO.jpg   NUCLEO-APOIO.jpg    NUCLEO-CRESCER.jpg
NUCLEO-EMPREGABILIDADE.jpg  NUCLEO-ESPORTE.jpg  NUCLEO-PROMOCAO.jpg
PASCOA.jpg  NATAL.jpg  EMPREENDEDORAS.jpg  ACAO-KIDS.jpg
```

---

## 2. Slides do Carousel Hero (Página Inicial)

**Onde aparece:** painel esquerdo da seção hero — slideshow com 7 slides.

| Atributo | Valor |
|---|---|
| Proporção | **16:9** (ex: 1280×720px) |
| Tamanho mínimo | 800×450 px |
| Tamanho ideal | **1280×720 px** |
| Formato | PNG ou JPG |
| Peso máximo | 500 KB |
| Recorte automático | Sim — `object-cover` preenche o container |
| Foco do recorte | Centro da imagem |

**Texto sobreposto pelo sistema (não precisa estar na imagem):**
- Badge colorido (tag da seção)
- Título em branco grande
- Subtítulo em branco/transparente
- Destaque (nomes dos líderes)
- Botão "Saiba mais"

**Arquivos atuais (`/public/`):**
```
portal.png  cursos.png  crescer.png  empregabilidade.png
saude.png   dentista.png  Farmacia.png
```

---

## 3. Banner de Página do Núcleo (`/nucleos/[slug]`)

**Onde aparece:** hero de topo de cada página individual de núcleo — ocupa 60% da altura da tela.

| Atributo | Valor |
|---|---|
| Proporção | **16:9** ou **21:9** (panorâmico) |
| Tamanho mínimo | 1280×720 px |
| Tamanho ideal | **1920×1080 px** |
| Formato | JPG ou WebP |
| Peso máximo | 600 KB |
| Recorte automático | Sim — `bg-cover bg-center` centraliza e corta |
| Foco do recorte | Centro da imagem |

**Texto sobreposto pelo sistema:**
- Badge `#MadureiraTem` colorido no canto inferior esquerdo
- Título grande em branco (nome do núcleo)
- Subtítulo abaixo do título

**Mesmos arquivos dos cards** — a mesma imagem serve para card e banner,
mas imagens de 1920×1080 ficam muito melhores no banner.

---

## 4. Fundo Animado Hero — BgSlideshow (Página Inicial)

**Onde aparece:** fundo da seção hero com opacity 12% (efeito sutil de textura).

| Atributo | Valor |
|---|---|
| Proporção | **16:9** |
| Tamanho ideal | **1280×720 px** |
| Formato | JPG (não precisa ser perfeito — é quase invisível) |
| Peso máximo | 200 KB |

**Usa os mesmos arquivos do carousel** — não precisa de imagens separadas.

---

## 5. Logo no Header

**Onde aparece:** canto superior esquerdo, dentro de um quadrado azul (`brand-ciano`) de 40×40px.

| Atributo | Valor |
|---|---|
| Formato | **PNG com fundo transparente** |
| Tamanho do container | 40×40 px (exibido em 28px de altura) |
| Tamanho do arquivo | **200×200 px** (mínimo) ou **512×512 px** (ideal) |
| Peso máximo | 50 KB |
| Fundo | Transparente (o fundo azul já existe no container) |
| Formato ideal | PNG-24 com transparência |

**Arquivo atual:** `/public/LOGO.png`

---

## 6. Ícone Favicon (Aba do navegador)

**Onde aparece:** aba do navegador, favoritos, atalho de celular.

| Formato | Tamanho | Arquivo |
|---|---|---|
| ICO (navegadores legados) | 16×16 e 32×32 px | `/public/favicon.ico` |
| PNG (navegadores modernos) | 192×192 px | `/public/favicon-192.png` |
| PNG (Apple, atalho iOS) | 180×180 px | `/public/apple-touch-icon.png` |

---

## 7. Imagem OG (Compartilhamento em redes sociais)

**Onde aparece:** quando o link do portal é compartilhado no WhatsApp, Instagram, Facebook, LinkedIn.

| Atributo | Valor |
|---|---|
| Tamanho obrigatório | **1200×630 px** |
| Formato | JPG |
| Peso máximo | 300 KB |
| Conteúdo sugerido | Logo CERPI + nome + slogan + cores da marca |
| Arquivo | `/public/og-image.jpg` |

---

## 8. Imagens de Documentos/Apresentações (Quem Somos, etc.)

**Onde aparece:** foto circular na página `/quem-somos`.

| Atributo | Valor |
|---|---|
| Proporção | **1:1 (quadrado)** — exibida em círculo |
| Tamanho ideal | **600×600 px** |
| Formato | JPG |
| Peso máximo | 200 KB |
| Foco | Rosto ou grupo centralizado |

**Arquivo atual:** `/public/QUEM-SOMO-FOTO.jpg`

---

## Resumo Rápido

| Local | Proporção | Tamanho ideal | Formato |
|---|---|---|---|
| Card Núcleo (home) | 4:3 | 800×600 px | JPG |
| Slide Carousel Hero | 16:9 | 1280×720 px | PNG/JPG |
| Banner Página Núcleo | 16:9 | 1920×1080 px | JPG |
| Fundo BgSlideshow | 16:9 | 1280×720 px | JPG |
| Logo Header | 1:1 | 512×512 px | PNG transparente |
| Favicon | 1:1 | 192×192 px | PNG/ICO |
| OG (redes sociais) | ~2:1 | 1200×630 px | JPG |
| Foto Quem Somos | 1:1 | 600×600 px | JPG |

---

## Problema dos Cards Atuais — e Como Resolver

As imagens atuais dos núcleos (ex: "NÚCLEO DE APOIO" com texto ocupando
toda a largura) foram feitas como banners horizontais. Quando usadas no card
4:3, o sistema recorta as laterais e o texto fica cortado.

**Opção 1 — Criar versões específicas para card (recomendado):**
Salvar duas versões de cada imagem:
- `NUCLEO-APOIO-card.jpg` → 800×600 px, sujeito centralizado
- `NUCLEO-APOIO-banner.jpg` → 1920×1080 px, versão panorâmica

**Opção 2 — Ajustar o ponto de foco no código:**
Trocar `object-cover` por `object-[center_top]` ou `object-[center_20%]`
no `NucleoCard.tsx` para controlar de onde o recorte começa.

**Opção 3 — Ajustar a proporção do card:**
Trocar `aspect-[4/3]` por `aspect-[3/2]` ou `aspect-[16/9]` no `NucleoCard.tsx`
para que a imagem apareça mais "larga" e corte menos nas laterais.
