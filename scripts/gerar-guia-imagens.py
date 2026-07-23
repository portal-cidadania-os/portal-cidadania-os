"""
Gerador do Guia de Imagens Institucionais — Portal Cidadania OS (CERPI)
Gera: docs/guia-imagens-institucionais.pdf

Instalar dependencia (uma vez):
    pip install reportlab

Executar:
    python scripts/gerar-guia-imagens.py
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ── Cores CERPI ───────────────────────────────────────────────────────────────
CIANO    = colors.HexColor("#0099ff")
AMARELO  = colors.HexColor("#ffcc00")
PRETO    = colors.HexColor("#0a0a0a")
CINZA    = colors.HexColor("#666666")
CINZA_BG = colors.HexColor("#f5f5f5")
BRANCO   = colors.white
VERDE    = colors.HexColor("#22c55e")
ROXO     = colors.HexColor("#cc44ff")

# ── Caminhos ──────────────────────────────────────────────────────────────────
SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(PROJECT_DIR, "docs", "guia-imagens-institucionais.pdf")

# ── Estilos ───────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

titulo_doc = ParagraphStyle(
    "TituloDoc",
    parent=styles["Normal"],
    fontSize=26,
    fontName="Helvetica-Bold",
    textColor=BRANCO,
    leading=32,
    alignment=TA_CENTER,
    spaceAfter=6,
)
subtitulo_doc = ParagraphStyle(
    "SubtituloDoc",
    parent=styles["Normal"],
    fontSize=11,
    fontName="Helvetica",
    textColor=colors.HexColor("#ccddff"),
    leading=16,
    alignment=TA_CENTER,
    spaceAfter=4,
)
secao = ParagraphStyle(
    "Secao",
    parent=styles["Normal"],
    fontSize=13,
    fontName="Helvetica-Bold",
    textColor=CIANO,
    leading=18,
    spaceBefore=18,
    spaceAfter=6,
)
corpo = ParagraphStyle(
    "Corpo",
    parent=styles["Normal"],
    fontSize=9.5,
    fontName="Helvetica",
    textColor=PRETO,
    leading=15,
    spaceAfter=6,
)
aviso = ParagraphStyle(
    "Aviso",
    parent=styles["Normal"],
    fontSize=9,
    fontName="Helvetica-Oblique",
    textColor=colors.HexColor("#cc5500"),
    leading=13,
    spaceAfter=4,
    leftIndent=10,
)
codigo = ParagraphStyle(
    "Codigo",
    parent=styles["Normal"],
    fontSize=8.5,
    fontName="Courier",
    textColor=colors.HexColor("#1a1a2e"),
    leading=13,
    leftIndent=10,
    spaceAfter=2,
)
rodape_style = ParagraphStyle(
    "Rodape",
    parent=styles["Normal"],
    fontSize=8,
    fontName="Helvetica",
    textColor=colors.HexColor("#999999"),
    alignment=TA_CENTER,
)

# ── Helpers ───────────────────────────────────────────────────────────────────
def linha():
    return HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e5e7eb"), spaceAfter=4, spaceBefore=4)

def tabela_spec(dados, col_widths=None):
    """Tabela de especificacoes com cabecalho ciano."""
    if col_widths is None:
        col_widths = [5*cm, 4*cm, 5*cm, 3*cm]
    t = Table(dados, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        # Cabecalho
        ("BACKGROUND", (0, 0), (-1, 0), CIANO),
        ("TEXTCOLOR",  (0, 0), (-1, 0), BRANCO),
        ("FONTNAME",   (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",   (0, 0), (-1, 0), 9),
        ("ALIGN",      (0, 0), (-1, 0), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, 0), 6),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
        # Linhas pares
        ("BACKGROUND", (0, 1), (-1, -1), CINZA_BG),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [BRANCO, CINZA_BG]),
        # Texto
        ("FONTNAME",   (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",   (0, 1), (-1, -1), 9),
        ("ALIGN",      (0, 1), (-1, -1), "LEFT"),
        ("VALIGN",     (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        # Grid
        ("GRID",       (0, 0), (-1, -1), 0.3, colors.HexColor("#d1d5db")),
        ("BOX",        (0, 0), (-1, -1), 0.5, CIANO),
    ]))
    return t

# ── Capa ──────────────────────────────────────────────────────────────────────
def capa():
    # Fundo azul simulado por tabela
    capa_dados = [[
        Paragraph("CERPI", ParagraphStyle("CerpiLogo", parent=styles["Normal"],
            fontSize=14, fontName="Helvetica-Bold", textColor=AMARELO, alignment=TA_CENTER)),
    ]]
    capa_topo = Table(capa_dados, colWidths=[17*cm])
    capa_topo.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PRETO),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ]))

    hero_dados = [[
        Paragraph("Guia de Imagens<br/>Institucionais", titulo_doc),
    ]]
    hero = Table(hero_dados, colWidths=[17*cm])
    hero.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CIANO),
        ("TOPPADDING", (0, 0), (-1, -1), 30),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 30),
    ]))

    sub_dados = [[
        Paragraph("Portal Cidadania OS &mdash; Centro Restaurando Cidadania (CERPI)", subtitulo_doc),
    ]]
    sub = Table(sub_dados, colWidths=[17*cm])
    sub.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0077cc")),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))

    meta = [
        ["Versao", "1.0"],
        ["Data", "23/07/2026"],
        ["Elaborado por", "Connection Cyber Assessoria e Treinamento Tecnologico"],
        ["Projeto", "portal-cidadania-os"],
    ]
    meta_t = Table(meta, colWidths=[5*cm, 12*cm])
    meta_t.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("TEXTCOLOR", (0, 0), (0, -1), CINZA),
        ("TEXTCOLOR", (1, 0), (1, -1), PRETO),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, colors.HexColor("#e5e7eb")),
    ]))

    return [capa_topo, hero, sub, Spacer(1, 0.8*cm), meta_t, Spacer(1, 0.5*cm), linha()]

# ── Conteudo ──────────────────────────────────────────────────────────────────
def conteudo():
    items = []

    # Regra geral
    items.append(Paragraph("Regra Geral", secao))
    items.append(Paragraph(
        "Toda imagem deve ter o <b>elemento principal centralizado</b>. "
        "O sistema usa <b>object-cover</b> e <b>bg-cover bg-center</b> — as bordas sao recortadas "
        "automaticamente para preencher o espaco disponivel. "
        "Se o sujeito principal estiver nas bordas, sera cortado.",
        corpo
    ))
    items.append(linha())

    # 1 — Cards de Nucleos
    items.append(Paragraph("1. Cards de Nucleos (Pagina Inicial)", secao))
    items.append(Paragraph(
        "Aparecem na grade de nucleos da home — 4 colunas no desktop, 2 no celular. "
        "Cada card usa <b>proporcao 4:3</b> com recorte automatico pelo centro.",
        corpo
    ))
    dados1 = [
        ["Atributo", "Valor"],
        ["Proporcao", "4:3  (ex: 800x600 px)"],
        ["Tamanho minimo", "600 x 450 px"],
        ["Tamanho ideal", "800 x 600 px"],
        ["Formato", "JPG ou WebP"],
        ["Peso maximo", "300 KB"],
        ["Recorte automatico", "Sim — bordas laterais e superior sao cortadas"],
        ["Foco do recorte", "Centro da imagem"],
    ]
    items.append(tabela_spec(dados1, [5.5*cm, 11.5*cm]))
    items.append(Spacer(1, 0.3*cm))
    items.append(Paragraph(
        "ATENCAO: imagens com texto grande ocupando toda a largura (ex: 'NUCLEO DE APOIO' "
        "com letras de ponta a ponta) ficam com o texto cortado nas laterais. "
        "Prefira imagens fotograficas ou com logo/texto centralizado.",
        aviso
    ))
    items.append(linha())

    # 2 — Slides Carousel
    items.append(Paragraph("2. Slides do Carousel Hero (Pagina Inicial)", secao))
    items.append(Paragraph(
        "Painel esquerdo da secao hero — slideshow automatico com 7 slides. "
        "O texto (titulo, subtitulo, badge, CTA) e inserido pelo sistema sobre a foto — "
        "nao precisa estar gravado na imagem.",
        corpo
    ))
    dados2 = [
        ["Atributo", "Valor"],
        ["Proporcao", "16:9  (ex: 1280x720 px)"],
        ["Tamanho minimo", "800 x 450 px"],
        ["Tamanho ideal", "1280 x 720 px"],
        ["Formato", "PNG ou JPG"],
        ["Peso maximo", "500 KB"],
        ["Recorte automatico", "Sim — object-cover preenche o container"],
        ["Foco do recorte", "Centro da imagem"],
    ]
    items.append(tabela_spec(dados2, [5.5*cm, 11.5*cm]))
    items.append(Spacer(1, 0.3*cm))
    items.append(Paragraph("Arquivos atuais em /public/:", corpo))
    items.append(Paragraph("portal.png   cursos.png   crescer.png   empregabilidade.png   saude.png   dentista.png   Farmacia.png", codigo))
    items.append(linha())

    # 3 — Banner pagina nucleo
    items.append(Paragraph("3. Banner de Pagina do Nucleo  (/nucleos/[slug])", secao))
    items.append(Paragraph(
        "Hero de topo de cada pagina individual de nucleo — ocupa 60% da altura da tela (aprox. 540 px). "
        "E a imagem mais visivel do portal, merece a maior resolucao.",
        corpo
    ))
    dados3 = [
        ["Atributo", "Valor"],
        ["Proporcao", "16:9 ou 21:9 (panoramico)"],
        ["Tamanho minimo", "1280 x 720 px"],
        ["Tamanho ideal", "1920 x 1080 px"],
        ["Formato", "JPG ou WebP"],
        ["Peso maximo", "600 KB"],
        ["Recorte automatico", "Sim — bg-cover bg-center centraliza e corta"],
        ["Foco do recorte", "Centro da imagem"],
    ]
    items.append(tabela_spec(dados3, [5.5*cm, 11.5*cm]))
    items.append(linha())

    # 4 — BgSlideshow
    items.append(Paragraph("4. Fundo Animado Hero — BgSlideshow (Pagina Inicial)", secao))
    items.append(Paragraph(
        "Fundo da secao hero com opacidade 12% (efeito sutil de textura em movimento). "
        "Usa os mesmos arquivos do carousel — nao precisa de imagens separadas.",
        corpo
    ))
    dados4 = [
        ["Atributo", "Valor"],
        ["Proporcao", "16:9"],
        ["Tamanho ideal", "1280 x 720 px"],
        ["Formato", "JPG (qualidade pode ser menor — e quase invisivel)"],
        ["Peso maximo", "200 KB"],
    ]
    items.append(tabela_spec(dados4, [5.5*cm, 11.5*cm]))
    items.append(linha())

    # 5 — Logo header
    items.append(Paragraph("5. Logo no Header", secao))
    items.append(Paragraph(
        "Exibida no canto superior esquerdo dentro de um quadrado azul (#0099ff) de 40x40 px. "
        "O fundo do container e azul — use PNG com fundo transparente para o logo aparecer corretamente.",
        corpo
    ))
    dados5 = [
        ["Atributo", "Valor"],
        ["Formato", "PNG com fundo TRANSPARENTE"],
        ["Container no site", "40 x 40 px (quadrado azul arredondado)"],
        ["Tamanho exibido", "28 px de altura"],
        ["Tamanho do arquivo", "512 x 512 px (ideal) ou 200 x 200 px (minimo)"],
        ["Peso maximo", "50 KB"],
    ]
    items.append(tabela_spec(dados5, [5.5*cm, 11.5*cm]))
    items.append(Paragraph("Arquivo atual: /public/LOGO.png", codigo))
    items.append(linha())

    # 6 — Favicon
    items.append(Paragraph("6. Icone Favicon (Aba do Navegador)", secao))
    dados6 = [
        ["Formato", "Tamanho", "Arquivo", "Uso"],
        ["ICO", "16x16 e 32x32 px", "/public/favicon.ico", "Navegadores legados"],
        ["PNG", "192x192 px", "/public/favicon-192.png", "Navegadores modernos"],
        ["PNG", "180x180 px", "/public/apple-touch-icon.png", "iOS / atalho celular"],
    ]
    items.append(tabela_spec(dados6, [3*cm, 3.5*cm, 6*cm, 4.5*cm]))
    items.append(linha())

    # 7 — OG Image
    items.append(Paragraph("7. Imagem OG (Compartilhamento em Redes Sociais)", secao))
    items.append(Paragraph(
        "Aparece quando o link do portal e compartilhado no WhatsApp, Instagram, Facebook ou LinkedIn. "
        "Tamanho fixo e obrigatorio.",
        corpo
    ))
    dados7 = [
        ["Atributo", "Valor"],
        ["Tamanho obrigatorio", "1200 x 630 px"],
        ["Formato", "JPG"],
        ["Peso maximo", "300 KB"],
        ["Conteudo sugerido", "Logo CERPI + nome + slogan + cores da marca (#0099ff / #ffcc00)"],
        ["Arquivo", "/public/og-image.jpg"],
    ]
    items.append(tabela_spec(dados7, [5.5*cm, 11.5*cm]))
    items.append(linha())

    # 8 — Foto Quem Somos
    items.append(Paragraph("8. Foto Institucional — Pagina Quem Somos", secao))
    items.append(Paragraph(
        "Exibida em formato circular na pagina /quem-somos. "
        "Use imagem quadrada para evitar distorcao na mascara circular.",
        corpo
    ))
    dados8 = [
        ["Atributo", "Valor"],
        ["Proporcao", "1:1 (quadrado — exibida em circulo)"],
        ["Tamanho ideal", "600 x 600 px"],
        ["Formato", "JPG"],
        ["Peso maximo", "200 KB"],
        ["Foco", "Rosto ou grupo centralizado"],
    ]
    items.append(tabela_spec(dados8, [5.5*cm, 11.5*cm]))
    items.append(Paragraph("Arquivo atual: /public/QUEM-SOMO-FOTO.jpg", codigo))
    items.append(linha())

    # Resumo final
    items.append(Paragraph("Resumo Rapido", secao))
    resumo = [
        ["Local de uso", "Proporcao", "Tamanho ideal", "Formato"],
        ["Card Nucleo (home)", "4:3", "800 x 600 px", "JPG"],
        ["Slide Carousel Hero", "16:9", "1280 x 720 px", "PNG/JPG"],
        ["Banner Pagina Nucleo", "16:9", "1920 x 1080 px", "JPG"],
        ["Fundo BgSlideshow", "16:9", "1280 x 720 px", "JPG"],
        ["Logo Header", "1:1", "512 x 512 px", "PNG transp."],
        ["Favicon (moderno)", "1:1", "192 x 192 px", "PNG/ICO"],
        ["OG (redes sociais)", "~2:1", "1200 x 630 px", "JPG"],
        ["Foto Quem Somos", "1:1", "600 x 600 px", "JPG"],
    ]
    t_resumo = Table(resumo, colWidths=[5.5*cm, 3*cm, 4.5*cm, 4*cm], repeatRows=1)
    t_resumo.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PRETO),
        ("TEXTCOLOR",  (0, 0), (-1, 0), AMARELO),
        ("FONTNAME",   (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",   (0, 0), (-1, 0), 9),
        ("ALIGN",      (0, 0), (-1, 0), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, 0), 7),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [BRANCO, CINZA_BG]),
        ("FONTNAME",   (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",   (0, 1), (-1, -1), 9),
        ("ALIGN",      (0, 1), (-1, -1), "LEFT"),
        ("ALIGN",      (1, 1), (2, -1), "CENTER"),
        ("VALIGN",     (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("GRID",       (0, 0), (-1, -1), 0.3, colors.HexColor("#d1d5db")),
        ("BOX",        (0, 0), (-1, -1), 1, PRETO),
    ]))
    items.append(t_resumo)
    items.append(Spacer(1, 0.5*cm))

    # Problema dos cards atuais
    items.append(KeepTogether([
        Paragraph("Problema dos Cards Atuais e Como Resolver", secao),
        Paragraph(
            "As imagens atuais dos nucleos foram criadas como banners horizontais com texto ocupando "
            "toda a largura. No card 4:3, o sistema recorta as laterais e o texto fica cortado. "
            "Ha tres opcoes para corrigir:",
            corpo
        ),
        Spacer(1, 0.2*cm),
        Paragraph("<b>Opcao 1 — Criar versoes especificas para card (RECOMENDADO):</b>", corpo),
        Paragraph(
            "Salvar duas versoes de cada imagem: uma 800x600 px com o sujeito centralizado "
            "(para o card) e uma 1920x1080 px panoramica (para o banner da pagina). "
            "Exemplo: NUCLEO-APOIO-card.jpg e NUCLEO-APOIO-banner.jpg",
            corpo
        ),
        Spacer(1, 0.1*cm),
        Paragraph("<b>Opcao 2 — Ajustar o ponto de foco no codigo:</b>", corpo),
        Paragraph(
            "Trocar object-cover por object-[center_top] no NucleoCard.tsx "
            "para controlar de onde o recorte comeca por imagem.",
            corpo
        ),
        Spacer(1, 0.1*cm),
        Paragraph("<b>Opcao 3 — Mudar a proporcao do card:</b>", corpo),
        Paragraph(
            "Trocar aspect-[4/3] por aspect-[16/9] no NucleoCard.tsx para "
            "que a imagem apareca mais larga e corte menos nas laterais.",
            corpo
        ),
    ]))

    return items

# ── Rodape ────────────────────────────────────────────────────────────────────
def rodape(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.setFillColor(colors.HexColor("#999999"))
    canvas_obj.drawCentredString(
        A4[0] / 2,
        1.2*cm,
        f"Guia de Imagens Institucionais — CERPI | Connection Cyber | pag. {doc.page}"
    )
    canvas_obj.setStrokeColor(colors.HexColor("#e5e7eb"))
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(2*cm, 1.6*cm, A4[0] - 2*cm, 1.6*cm)
    canvas_obj.restoreState()

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2.5*cm,
        title="Guia de Imagens Institucionais - CERPI",
        author="Connection Cyber Assessoria e Treinamento Tecnologico",
        subject="Especificacoes de imagens para o Portal Cidadania OS",
    )

    story = capa() + conteudo()
    doc.build(story, onLaterPages=rodape, onFirstPage=rodape)
    print(f"\nPDF gerado com sucesso:")
    print(f"  {OUTPUT_PATH}\n")

if __name__ == "__main__":
    main()
