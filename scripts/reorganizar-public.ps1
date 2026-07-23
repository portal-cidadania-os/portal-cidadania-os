# ============================================================
# Portal Cidadania OS — Reorganizacao da pasta /public
# Execucao: .\scripts\reorganizar-public.ps1
# Efeito: move arquivos para subpastas organizadas por secao
# ============================================================

$Root = Split-Path -Parent $PSScriptRoot
$Public = Join-Path $Root "public"

Write-Host ""
Write-Host "=== Reorganizando /public ===" -ForegroundColor Cyan
Write-Host "Pasta: $Public"
Write-Host ""

# ── Criar estrutura de pastas ─────────────────────────────────
$Pastas = @(
    "slides",
    "nucleos\sorria-com-cristo",
    "nucleos\nucleo-apoio",
    "nucleos\nucleo-crescer",
    "nucleos\empregabilidade",
    "nucleos\esporte",
    "nucleos\promocao-social",
    "nucleos\pascoa",
    "nucleos\natal",
    "nucleos\empreendedoras",
    "nucleos\acao-kids",
    "institucional",
    "dept",
    "documentos"
)

foreach ($pasta in $Pastas) {
    $caminho = Join-Path $Public $pasta
    if (-not (Test-Path $caminho)) {
        New-Item -ItemType Directory -Path $caminho | Out-Null
        Write-Host "  [+] $pasta" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "--- Movendo arquivos ---" -ForegroundColor Yellow

# Funcao auxiliar
function Mover($de, $para) {
    $origem = Join-Path $Public $de
    $destino = Join-Path $Public $para
    if (Test-Path $origem) {
        Move-Item -Path $origem -Destination $destino -Force
        Write-Host "  OK  $de -> $para" -ForegroundColor Green
    } else {
        Write-Host "  --  $de (nao encontrado, pulando)" -ForegroundColor DarkGray
    }
}

# ── Slides (carousel + bgslideshow) ──────────────────────────
Write-Host ""
Write-Host "[slides]" -ForegroundColor Cyan
Mover "portal.png"          "slides\portal.png"
Mover "cursos.png"          "slides\cursos.png"
Mover "crescer.png"         "slides\crescer.png"
Mover "empregabilidade.png" "slides\empregabilidade.png"
Mover "saude.png"           "slides\saude.png"
Mover "dentista.png"        "slides\dentista.png"
Mover "Farmacia.png"        "slides\farmacia.png"

# ── Cards dos nucleos ─────────────────────────────────────────
Write-Host ""
Write-Host "[nucleos - cards]" -ForegroundColor Cyan
Mover "SORRIA-COM-CRISTO.jpg"       "nucleos\sorria-com-cristo\card.jpg"
Mover "NUCLEO-APOIO.jpg"            "nucleos\nucleo-apoio\card.jpg"
Mover "NUCLEO-CRESCER.jpg"          "nucleos\nucleo-crescer\card.jpg"
Mover "NUCLEO-EMPREGABILIDADE.jpg"  "nucleos\empregabilidade\card.jpg"
Mover "NUCLEO-ESPORTE.jpg"          "nucleos\esporte\card.jpg"
Mover "NUCLEO-PROMOCAO.jpg"         "nucleos\promocao-social\card.jpg"
Mover "PASCOA.jpg"                  "nucleos\pascoa\card.jpg"
Mover "NATAL.jpg"                   "nucleos\natal\card.jpg"
Mover "EMPREENDEDORAS.jpg"          "nucleos\empreendedoras\card.jpg"
Mover "ACAO-KIDS.jpg"               "nucleos\acao-kids\card.jpg"

# ── Banners dos nucleos ───────────────────────────────────────
Write-Host ""
Write-Host "[nucleos - banners]" -ForegroundColor Cyan
Mover "banner-sorria-com-cristo.jpg"     "nucleos\sorria-com-cristo\banner.jpg"
Mover "banner-nucleo-de-apoio.jpg"       "nucleos\nucleo-apoio\banner.jpg"
Mover "banner-nucleo-crescer.jpg"        "nucleos\nucleo-crescer\banner.jpg"
Mover "banner-nucleo-empregabilidade.jpg" "nucleos\empregabilidade\banner.jpg"
Mover "banner-nucleo-esporte.jpg"        "nucleos\esporte\banner.jpg"
Mover "banner-nucleo-promocao.jpg"       "nucleos\promocao-social\banner.jpg"
Mover "banner-pascoa.jpg"                "nucleos\pascoa\banner.jpg"
Mover "banner-natal.jpg"                 "nucleos\natal\banner.jpg"
Mover "banner-empreendedoras.jpg"        "nucleos\empreendedoras\banner.jpg"
Mover "banner-acao-kids.jpg"             "nucleos\acao-kids\banner.jpg"

# ── Institucional ─────────────────────────────────────────────
Write-Host ""
Write-Host "[institucional]" -ForegroundColor Cyan
Mover "LOGO.png"              "institucional\logo.png"
Mover "LOGOV1.png"            "institucional\logo-v1.png"
Mover "LOGO SEM FUNDO V1.png" "institucional\logo-sem-fundo.png"
Mover "FUNDO.png"             "institucional\fundo.png"
Mover "QUEM-SOMO-FOTO.jpg"    "institucional\quem-somos-foto.jpg"

# ── Dept (imagens de departamento, uso futuro) ────────────────
Write-Host ""
Write-Host "[dept]" -ForegroundColor Cyan
Mover "dept-dentista.jpg"        "dept\dentista.jpg"
Mover "dept-portal.jpg"          "dept\portal.jpg"
Mover "dept-cursos.jpg"          "dept\cursos.jpg"
Mover "dept-crescer.jpg"         "dept\crescer.jpg"
Mover "dept-empregabilidae.jpg"  "dept\empregabilidade.jpg"
Mover "dept-saude.jpg"           "dept\saude.jpg"
Mover "dept-farmacia.jpg"        "dept\farmacia.jpg"

# ── Documentos ────────────────────────────────────────────────
Write-Host ""
Write-Host "[documentos]" -ForegroundColor Cyan
Get-ChildItem -Path $Public -Filter "img2026*.pdf" | ForEach-Object {
    Mover $_.Name ("documentos\" + $_.Name)
}
Mover "apresentacao-cerpi.html" "documentos\apresentacao-cerpi.html"

# ── Resultado ─────────────────────────────────────────────────
Write-Host ""
Write-Host "=== Concluido ===" -ForegroundColor Green
Write-Host ""
Write-Host "Arquivos que sobraram na raiz de /public (esperado: nenhum relevante):"
Get-ChildItem -Path $Public -File | Select-Object -ExpandProperty Name | ForEach-Object {
    Write-Host "  $_" -ForegroundColor DarkYellow
}
Write-Host ""
Write-Host "Proximos passos: o codigo ja foi atualizado com os novos caminhos." -ForegroundColor Cyan
