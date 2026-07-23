# ============================================================
# backup-e-commit.ps1 — Backup e commit das alterações
# Uso: Clique direito no arquivo → "Run with PowerShell"
#      ou abra PowerShell na pasta e rode: .\scripts\backup-e-commit.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$projeto = "C:\Projetos\portal-cidadania-os"

Write-Host "`n=== PORTAL CIDADANIA OS — BACKUP E COMMIT ===" -ForegroundColor Cyan
Write-Host "Pasta: $projeto`n" -ForegroundColor Gray

Set-Location $projeto

# ── 1. Status git ──────────────────────────────────────────
Write-Host "── STATUS GIT ──────────────────────────────────" -ForegroundColor Yellow
git status
Write-Host ""

# ── 2. Branch atual ────────────────────────────────────────
$branch = git branch --show-current
Write-Host "Branch atual: $branch" -ForegroundColor Cyan

# ── 3. Build de verificação ────────────────────────────────
Write-Host "`n── BUILD (verificação de erros TypeScript/Next) ─" -ForegroundColor Yellow
Write-Host "Rodando npm run build..." -ForegroundColor Gray

$buildSaiu = 0
try {
    npm run build
    $buildSaiu = $LASTEXITCODE
} catch {
    $buildSaiu = 1
}

if ($buildSaiu -ne 0) {
    Write-Host "`n[ERRO] Build falhou. Corrija os erros antes de commitar." -ForegroundColor Red
    Read-Host "Pressione Enter para fechar"
    exit 1
}

Write-Host "`n[OK] Build concluído sem erros." -ForegroundColor Green

# ── 4. Adicionar todos os arquivos ─────────────────────────
Write-Host "`n── ADICIONANDO ARQUIVOS ─────────────────────────" -ForegroundColor Yellow
git add -A
Write-Host "[OK] git add -A concluído." -ForegroundColor Green

# ── 5. Verificar se há algo para commitar ──────────────────
$staged = git diff --cached --name-only
if (-not $staged) {
    Write-Host "`n[INFO] Nenhuma alteração para commitar. Tudo já está sincronizado." -ForegroundColor Cyan
    Read-Host "Pressione Enter para fechar"
    exit 0
}

Write-Host "`nArquivos para commitar:" -ForegroundColor Gray
$staged | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }

# ── 6. Commit ──────────────────────────────────────────────
$mensagem = @"
feat: animacao slide-da-esquerda no BgSlideshow + ajustes hero

- globals.css: novo keyframe bgSlideFromLeft (translateX + opacity)
- BgSlideshow: trocou divs de background por img posicionada em 50% esquerdo
  - animacao slide da esquerda ate a coluna esquerda
  - mask-image com fade suave na borda direita
  - animationFillMode both para estado correto durante delay
- page.tsx: hero mantido em grid 2 colunas (texto direita, imagem esquerda)
"@

Write-Host "`n── COMMIT ────────────────────────────────────────" -ForegroundColor Yellow
git commit -m $mensagem
Write-Host "`n[OK] Commit realizado com sucesso!" -ForegroundColor Green

# ── 7. Log recente ─────────────────────────────────────────
Write-Host "`n── ÚLTIMOS COMMITS ──────────────────────────────" -ForegroundColor Yellow
git log --oneline -5

Write-Host "`n=== BACKUP CONCLUÍDO ===" -ForegroundColor Cyan
Read-Host "Pressione Enter para fechar"
