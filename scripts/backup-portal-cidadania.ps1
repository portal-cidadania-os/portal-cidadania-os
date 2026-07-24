# ============================================================
# Portal Cidadania OS (CERPI) — Backup Manager v1.1
#
# O que este script faz (em ordem):
#   1. Valida o ambiente (config, ferramentas, espaco em disco)
#   2. Sincroniza o codigo para OneDrive via robocopy
#   3. Sincroniza o codigo para HD Externo via robocopy
#   4. Cria um snapshot ZIP com timestamp
#   5. Exporta o banco Supabase via pg_dump       (pulavel com -PularBanco)
#   6. Faz git commit + push para o GitHub (branch develop)
#   7. [OPCIONAL] Merge develop -> main e push    (ativa com -Deploy)
#      Isso dispara o deploy automatico no Vercel (PRODUCAO)
#
# Parametros:
#   -Silencioso    Suprime saidas nao-essenciais
#   -DryRun        Simula todas as operacoes sem gravar nada
#   -PularBanco    Pula o pg_dump (util quando so quer salvar o codigo)
#   -CommitMessage Mensagem do commit git (default: "backup: <timestamp>")
#   -Deploy        Merge develop->main e push (publica no Vercel / PRODUCAO)
#                  NAO use em commits de trabalho em andamento!
#
# Variavel de ambiente obrigatoria (NAO commitar no git):
#   PORTAL_CIDADANIA_SUPABASE_DB_URL
#   Formato: postgresql://postgres.<ref>:<senha>@<host>:5432/postgres
#
# Exemplo de uso:
#   .\scripts\backup-portal-cidadania.ps1
#   .\scripts\backup-portal-cidadania.ps1 -Deploy
#   .\scripts\backup-portal-cidadania.ps1 -DryRun
#   .\scripts\backup-portal-cidadania.ps1 -PularBanco -CommitMessage "feat: add nucleo esporte page"
#   .\scripts\backup-portal-cidadania.ps1 -Deploy -CommitMessage "feat: modulo vagas v1"
# ============================================================

param(
    [switch]$Silencioso,
    [switch]$DryRun,
    [switch]$PularBanco,
    [switch]$Deploy,
    [string]$CommitMessage = ""
)

$ProjectName = "portal-cidadania-os"
$ScriptRoot  = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptRoot
$ConfigPath  = Join-Path $ProjectRoot "config\paths.json"

# ── Carrega config ─────────────────────────────────────────────────────────────
if (!(Test-Path $ConfigPath)) {
    Write-Host "[ERRO] config/paths.json nao encontrado em $ConfigPath" -ForegroundColor Red
    Write-Host "       Execute primeiro: .\scripts\init-portal-cidadania-folders.ps1" -ForegroundColor Yellow
    exit 1
}
$Config = Get-Content $ConfigPath -Raw | ConvertFrom-Json

# ── Caminhos ───────────────────────────────────────────────────────────────────
$Origem        = $ProjectRoot
$OneDriveDestino = Join-Path $Config.onedrive $ProjectName
$ExternoDestino  = Join-Path $Config.external  $ProjectName
$SnapshotDir     = Join-Path $Config.snapshots $ProjectName
$LogDir          = Join-Path $Origem "logs\$(Get-Date -f 'yyyy\\MM')\backup"
$Timestamp       = Get-Date -Format "yyyyMMdd_HHmmss"
$LogFile         = Join-Path $LogDir "backup_$Timestamp.log"

if (!(Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force | Out-Null }

# ── Logging ────────────────────────────────────────────────────────────────────
function Write-Log {
    param([string]$Msg, [string]$Color = "White")
    $line = "[$(Get-Date -f 'HH:mm:ss')] $Msg"
    Add-Content -Path $LogFile -Value $line -Encoding UTF8
    if (-not $Silencioso) { Write-Host $line -ForegroundColor $Color }
}

# ── Helpers ────────────────────────────────────────────────────────────────────
function Test-CommandExists { param([string]$Cmd); return [bool](Get-Command $Cmd -ErrorAction SilentlyContinue) }

function Get-FreeSpaceGB {
    param([string]$Path)
    try {
        $q = (Split-Path -Qualifier $Path).TrimEnd(':')
        $d = Get-PSDrive -Name $q -ErrorAction Stop
        return [math]::Round($d.Free / 1GB, 2)
    } catch { return $null }
}

function Sync-Robocopy {
    param([string]$Destino, [string]$Label)
    Write-Log "SYNC [$Label] $Origem -> $Destino" "Cyan"

    if (!(Test-Path $Destino)) {
        if (!$DryRun) { New-Item -ItemType Directory -Path $Destino -Force | Out-Null }
        Write-Log "  Pasta criada: $Destino" "DarkGray"
    }

    $XD = @()
    foreach ($dir in $Config.excludedDirectories) { $XD += @("/XD", $dir) }

    if ($DryRun) {
        Write-Log "  [DRY-RUN] Sync para $Label simulado." "DarkYellow"
        return $true
    }

    robocopy $Origem $Destino /MIR /R:2 /W:2 /NFL /NDL /NJH /NJS @XD | Out-Null
    $ok = $LASTEXITCODE -le 7
    if ($ok) { Write-Log "  [OK] $Label sincronizado (robocopy: $LASTEXITCODE)" "Green" }
    else     { Write-Log "  [ERRO] Falha no sync $Label (robocopy: $LASTEXITCODE)" "Red" }
    return $ok
}

function New-ZipSnapshot {
    Write-Log "SNAPSHOT ZIP" "Cyan"
    if (!(Test-Path $SnapshotDir)) {
        if (!$DryRun) { New-Item -ItemType Directory -Path $SnapshotDir -Force | Out-Null }
    }

    $ZipName = "${ProjectName}_${Timestamp}.zip"
    $ZipPath = Join-Path $SnapshotDir $ZipName

    if ($DryRun) {
        Write-Log "  [DRY-RUN] ZIP simulado: $ZipPath" "DarkYellow"
        return $true
    }

    # Cria ZIP excluindo node_modules, .next e .git
    $TempDir = Join-Path $env:TEMP "cidadania_snap_$Timestamp"
    New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

    robocopy $Origem $TempDir /MIR /R:2 /W:2 /NFL /NDL /NJH /NJS `
        /XD node_modules .next .git dist .turbo | Out-Null

    Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipPath -Force
    Remove-Item -Path $TempDir -Recurse -Force

    $SizeMB = [math]::Round((Get-Item $ZipPath).Length / 1MB, 2)
    Write-Log "  [OK] $ZipName ($SizeMB MB)" "Green"
    return $true
}

function Backup-SupabaseDatabase {
    Write-Log "BANCO DE DADOS (pg_dump)" "Cyan"

    if (!(Test-CommandExists "pg_dump")) {
        Write-Log "  [ERRO] pg_dump nao encontrado no PATH. Instale o PostgreSQL client tools." "Red"
        return $false
    }

    $DbUrl = $env:PORTAL_CIDADANIA_SUPABASE_DB_URL
    if ([string]::IsNullOrWhiteSpace($DbUrl)) {
        Write-Log "  [ERRO] Variavel PORTAL_CIDADANIA_SUPABASE_DB_URL nao definida." "Red"
        Write-Log "         Defina no sistema ou num .env nao versionado." "Yellow"
        return $false
    }

    if (!(Test-Path $SnapshotDir)) {
        if (!$DryRun) { New-Item -ItemType Directory -Path $SnapshotDir -Force | Out-Null }
    }

    $DumpName = "${ProjectName}_db_${Timestamp}.dump"
    $DumpPath = Join-Path $SnapshotDir $DumpName

    if ($DryRun) {
        Write-Log "  [DRY-RUN] pg_dump simulado: $DumpPath" "DarkYellow"
        return $true
    }

    & pg_dump --format=custom --no-owner --no-privileges -f $DumpPath $DbUrl 2>&1 | ForEach-Object {
        Write-Log "  pg_dump: $_" "DarkGray"
    }

    if ($LASTEXITCODE -eq 0 -and (Test-Path $DumpPath)) {
        $SizeKB = [math]::Round((Get-Item $DumpPath).Length / 1KB, 1)
        Write-Log "  [OK] $DumpName ($SizeKB KB)" "Green"
        Write-Log "  ATENCAO: Dump contem dados pessoais - NAO versionar no git." "Yellow"
        return $true
    } else {
        Write-Log "  [ERRO] pg_dump falhou (code: $LASTEXITCODE)" "Red"
        return $false
    }
}

function Sync-GitHub {
    param([string]$Msg)
    Write-Log "GIT COMMIT + PUSH (develop)" "Cyan"

    if (!(Test-CommandExists "git")) {
        Write-Log "  [ERRO] Git nao encontrado." "Red"
        return $false
    }

    if ($DryRun) {
        Write-Log "  [DRY-RUN] Git commit + push simulados." "DarkYellow"
        return $true
    }

    Set-Location $Origem

    git add -A
    $statusOut = git status --short
    if ([string]::IsNullOrWhiteSpace($statusOut)) {
        Write-Log "  Nenhuma alteracao para commitar." "DarkGray"
    } else {
        git commit -m $Msg 2>&1 | ForEach-Object { Write-Log "  $_" "DarkGray" }
    }

    git push 2>&1 | ForEach-Object { Write-Log "  $_" "DarkGray" }

    if ($LASTEXITCODE -eq 0) {
        Write-Log "  [OK] Push realizado com sucesso." "Green"
        return $true
    } else {
        Write-Log "  [ERRO] git push falhou (code: $LASTEXITCODE)." "Red"
        return $false
    }
}

function Deploy-Vercel {
    Write-Log "DEPLOY VERCEL (develop -> main)" "Cyan"
    Write-Log "  ATENCAO: Isso publica o codigo em PRODUCAO no Vercel." "Yellow"

    if (!(Test-CommandExists "git")) {
        Write-Log "  [ERRO] Git nao encontrado." "Red"
        return $false
    }

    if ($DryRun) {
        Write-Log "  [DRY-RUN] Merge develop->main simulado." "DarkYellow"
        return $true
    }

    Set-Location $Origem

    # Garante que esta no develop antes de comecar
    $branchAtual = git branch --show-current
    if ($branchAtual -ne "develop") {
        Write-Log "  [AVISO] Branch atual e '$branchAtual', nao 'develop'. Abortando deploy." "Red"
        return $false
    }

    # Muda para main, faz merge e push
    git checkout main 2>&1 | ForEach-Object { Write-Log "  $_" "DarkGray" }
    if ($LASTEXITCODE -ne 0) {
        Write-Log "  [ERRO] Falha ao mudar para branch main." "Red"
        git checkout develop | Out-Null
        return $false
    }

    git merge develop --no-edit 2>&1 | ForEach-Object { Write-Log "  $_" "DarkGray" }
    if ($LASTEXITCODE -ne 0) {
        Write-Log "  [ERRO] Merge falhou. Resolva os conflitos manualmente." "Red"
        git checkout develop | Out-Null
        return $false
    }

    git push origin main 2>&1 | ForEach-Object { Write-Log "  $_" "DarkGray" }
    $pushOk = $LASTEXITCODE -eq 0

    # Volta para develop sempre
    git checkout develop 2>&1 | Out-Null

    if ($pushOk) {
        Write-Log "  [OK] Deploy disparado no Vercel (main atualizado)." "Green"
        Write-Log "  Acompanhe em: https://vercel.com/portal-cidadania-os-projects/portal-cidadania-os" "DarkGray"
        return $true
    } else {
        Write-Log "  [ERRO] Push para main falhou." "Red"
        return $false
    }
}

function Validate-Environment {
    $ok = $true

    if (!(Test-Path $Origem)) {
        Write-Log "[ERRO] Pasta do projeto nao encontrada: $Origem" "Red"; $ok = $false
    }

    $FreeGB = Get-FreeSpaceGB -Path $Origem
    if ($null -ne $FreeGB -and $FreeGB -lt 1) {
        Write-Log "[AVISO] Espaco em disco baixo na raiz: $FreeGB GB" "Yellow"
    }

    if (!(Test-CommandExists "git")) {
        Write-Log "[ERRO] Git nao encontrado no PATH." "Red"; $ok = $false
    }

    if (!$PularBanco -and !(Test-CommandExists "pg_dump")) {
        Write-Log "[AVISO] pg_dump nao encontrado. Use -PularBanco ou instale o PostgreSQL client." "Yellow"
    }

    return $ok
}

# ── Header ─────────────────────────────────────────────────────────────────────
Write-Log "============================================================" "Cyan"
Write-Log "  Portal Cidadania OS (CERPI) | Backup Manager v1.1" "White"
if ($DryRun) { Write-Log "  [DRY-RUN] Nenhum arquivo sera gravado." "DarkYellow" }
Write-Log "============================================================" "Cyan"
Write-Log "Inicio: $(Get-Date -f 'dd/MM/yyyy HH:mm:ss')" "White"
Write-Log "Raiz:   $Origem" "White"
Write-Log "Log:    $LogFile" "DarkGray"
Write-Log ""

# ── Validacao ─────────────────────────────────────────────────────────────────
if (!(Validate-Environment)) {
    Write-Log "[ERRO] Validacao do ambiente falhou. Abortando." "Red"
    exit 1
}

# ── Mensagem do commit ─────────────────────────────────────────────────────────
if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
    $CommitMessage = "backup: $(Get-Date -f 'dd/MM/yyyy HH:mm')"
}

# ── Execucao ──────────────────────────────────────────────────────────────────
$Resultados = @{}

Write-Log ""
$Resultados["OneDrive"]  = Sync-Robocopy -Destino $OneDriveDestino -Label "OneDrive"
Write-Log ""
$Resultados["Externo"]   = Sync-Robocopy -Destino $ExternoDestino -Label "HD Externo"
Write-Log ""
$Resultados["Snapshot"]  = New-ZipSnapshot
Write-Log ""

if (!$PularBanco) {
    $Resultados["Banco"] = Backup-SupabaseDatabase
    Write-Log ""
} else {
    Write-Log "BANCO DE DADOS ignorado (-PularBanco)." "DarkGray"
    $Resultados["Banco"] = $true
}

$Resultados["GitHub"] = Sync-GitHub -Msg $CommitMessage
Write-Log ""

if ($Deploy) {
    $Resultados["Vercel"] = Deploy-Vercel
    Write-Log ""
}

# ── Resumo ────────────────────────────────────────────────────────────────────
Write-Log "============================================================" "Cyan"
Write-Log "  RESUMO DO BACKUP" "White"
Write-Log "============================================================" "Cyan"
foreach ($k in $Resultados.Keys) {
    $status = if ($Resultados[$k]) { "[OK]    " } else { "[ERRO]  " }
    $cor    = if ($Resultados[$k]) { "Green"    } else { "Red"     }
    Write-Log "  $status $k" $cor
}

$Falhas = ($Resultados.Values | Where-Object { !$_ }).Count
Write-Log ""
if ($Falhas -eq 0) {
    Write-Log "Backup concluido sem erros. $(Get-Date -f 'dd/MM/yyyy HH:mm:ss')" "Green"
    exit 0
} else {
    Write-Log "Backup concluido com $Falhas erro(s). Verifique o log: $LogFile" "Red"
    exit 1
}
