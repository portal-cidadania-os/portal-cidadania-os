# ============================================================
# Portal Cidadania OS (CERPI) — Setup Staging v1.0
# Cria a branch develop, aplica o schema no staging e valida.
#
# Pre-requisitos:
#   1. .env.local preenchido com as chaves do staging
#   2. psql instalado (vem junto com PostgreSQL client tools)
#
# Uso:
#   .\scripts\setup-staging.ps1
#   .\scripts\setup-staging.ps1 -PularSchema  # se o schema ja foi aplicado
# ============================================================

param([switch]$PularSchema)

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
$SchemaFile  = Join-Path $ProjectRoot "supabase\schema_completo.sql"

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Portal Cidadania OS (CERPI) | Setup Staging v1.0" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Cria a branch develop ──────────────────────────────────────────────────
Write-Host "[GIT] Criando branch develop..." -ForegroundColor Yellow
Set-Location $ProjectRoot

$branches = git branch --list develop
if ($branches) {
    Write-Host "  [EXISTE] Branch develop ja existe." -ForegroundColor DarkGray
    git checkout develop
} else {
    git checkout -b develop
    git push -u origin develop
    Write-Host "  [OK] Branch develop criada e publicada no GitHub." -ForegroundColor Green
}

Write-Host ""

# ── 2. Verifica .env.local ────────────────────────────────────────────────────
Write-Host "[ENV] Verificando .env.local..." -ForegroundColor Yellow
$EnvFile = Join-Path $ProjectRoot ".env.local"
$EnvContent = Get-Content $EnvFile -Raw

if ($EnvContent -match "STAGING_REF" -or $EnvContent -match "STAGING_ANON_KEY") {
    Write-Host ""
    Write-Host "  [FALHA] .env.local ainda tem placeholders. Preencha antes de continuar:" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Supabase Dashboard -> portal-cidadania-os-staging -> Settings -> API" -ForegroundColor Yellow
    Write-Host "    NEXT_PUBLIC_SUPABASE_URL  = Project URL" -ForegroundColor White
    Write-Host "    NEXT_PUBLIC_SUPABASE_ANON_KEY = anon key" -ForegroundColor White
    Write-Host "    SUPABASE_SERVICE_ROLE_KEY = service_role key" -ForegroundColor White
    Write-Host ""
    Write-Host "  Supabase Dashboard -> portal-cidadania-os-staging -> Settings -> Database" -ForegroundColor Yellow
    Write-Host "    PORTAL_CIDADANIA_SUPABASE_DB_URL = Connection string (URI, modo Transaction)" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "  [OK] .env.local preenchido." -ForegroundColor Green
Write-Host ""

# ── 3. Aplica o schema no staging ─────────────────────────────────────────────
if (!$PularSchema) {
    Write-Host "[SCHEMA] Aplicando schema_completo.sql no staging..." -ForegroundColor Yellow

    if (!(Test-Path $SchemaFile)) {
        Write-Host "  [ERRO] Arquivo nao encontrado: $SchemaFile" -ForegroundColor Red
        exit 1
    }

    # Le a DB URL do .env.local
    $DbUrl = ($EnvContent -split "`n" | Where-Object { $_ -match "^PORTAL_CIDADANIA_SUPABASE_DB_URL=" }) -replace "^PORTAL_CIDADANIA_SUPABASE_DB_URL=", "" | ForEach-Object { $_.Trim() }

    if ([string]::IsNullOrWhiteSpace($DbUrl) -or $DbUrl -match "STAGING_SENHA") {
        Write-Host "  [FALHA] PORTAL_CIDADANIA_SUPABASE_DB_URL nao configurada ou ainda com placeholder." -ForegroundColor Red
        exit 1
    }

    if (!(Get-Command psql -ErrorAction SilentlyContinue)) {
        Write-Host "  [AVISO] psql nao encontrado. Aplique o schema manualmente:" -ForegroundColor Yellow
        Write-Host "    Supabase Dashboard -> portal-cidadania-os-staging -> SQL Editor" -ForegroundColor White
        Write-Host "    Cole o conteudo de: supabase\schema_completo.sql" -ForegroundColor White
    } else {
        & psql $DbUrl -f $SchemaFile
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  [OK] Schema aplicado no staging com sucesso." -ForegroundColor Green
        } else {
            Write-Host "  [ERRO] Falha ao aplicar o schema (code: $LASTEXITCODE)." -ForegroundColor Red
            Write-Host "         Aplique manualmente pelo SQL Editor do Supabase." -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "[SCHEMA] Pulado (-PularSchema)." -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Setup concluido!" -ForegroundColor Green
Write-Host ""
Write-Host "  Proximos passos:" -ForegroundColor White
Write-Host "    1. npm run dev  -> aponta para staging (correto)" -ForegroundColor White
Write-Host "    2. Desenvolva na branch develop" -ForegroundColor White
Write-Host "    3. Quando pronto: merge develop -> main = deploy em producao" -ForegroundColor White
Write-Host "    4. Configure as variaveis de PRODUCAO no Vercel Dashboard" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
