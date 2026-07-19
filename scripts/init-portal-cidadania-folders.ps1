# ============================================================
# Portal Cidadania OS (CERPI) — Init Folders v1.0
# Cria toda a estrutura de pastas do projeto:
#   workspace, espelhos OneDrive e HD externo, snapshots e logs.
# Le config/paths.json para obter os caminhos; usa defaults se o
# arquivo ainda nao existir.
# ============================================================

$ProjectName = "portal-cidadania-os"
$ScriptRoot  = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptRoot
$ConfigPath  = Join-Path $ProjectRoot "config\paths.json"

# ── Caminhos default (caso config/paths.json nao exista) ──────────────────────
$DefaultWorkspace = "C:\Projetos"
$DefaultOneDrive  = "C:\Users\joaqu\OneDrive\Projetos"
$DefaultExternal  = "E:\Projetos"
$DefaultSnapshots = "E:\Projetos\Snapshots"

if (Test-Path $ConfigPath) {
    $Config    = Get-Content $ConfigPath -Raw | ConvertFrom-Json
    $Workspace = $Config.workspace
    $OneDrive  = $Config.onedrive
    $External  = $Config.external
    $Snapshots = $Config.snapshots
} else {
    Write-Host "[AVISO] config/paths.json nao encontrado. Usando caminhos default." -ForegroundColor Yellow
    $Workspace = $DefaultWorkspace
    $OneDrive  = $DefaultOneDrive
    $External  = $DefaultExternal
    $Snapshots = $DefaultSnapshots
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Portal Cidadania OS (CERPI) | Init Folders v1.0" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

function New-Dir {
    param([string]$Path, [string]$Label)
    if (!(Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
        Write-Host "[CRIADO] $Label" -ForegroundColor Green
        Write-Host "         $Path" -ForegroundColor DarkGray
    } else {
        Write-Host "[EXISTE] $Label" -ForegroundColor DarkGray
    }
}

# ── Pasta principal do projeto ─────────────────────────────────────────────────
$ProjectPath = Join-Path $Workspace $ProjectName
Write-Host "[PROJETO] $ProjectPath" -ForegroundColor Yellow
Write-Host ""

New-Dir $ProjectPath "Raiz do projeto"

# ── Sub-pastas de documentacao ─────────────────────────────────────────────────
Write-Host ""
Write-Host "[DOCS]" -ForegroundColor Cyan
$Docs = @(
    "nucleos",
    "financeiro",
    "juridico",
    "reunioes",
    "campanhas",
    "parceiros",
    "relatorios",
    "apresentacoes"
)
foreach ($sub in $Docs) {
    New-Dir (Join-Path $ProjectPath "docs\$sub") "docs\$sub"
}

# ── Scripts e config ───────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[SCRIPTS / CONFIG]" -ForegroundColor Cyan
New-Dir (Join-Path $ProjectPath "scripts") "scripts"
New-Dir (Join-Path $ProjectPath "config")  "config"
New-Dir (Join-Path $ProjectPath "supabase") "supabase"

# ── Espelho OneDrive ──────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[ONEDRIVE]" -ForegroundColor Cyan
$OneDriveProject = Join-Path $OneDrive $ProjectName
New-Dir $OneDriveProject "Espelho OneDrive"

# ── Espelho HD Externo ────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[HD EXTERNO]" -ForegroundColor Cyan
if (Test-Path "E:\") {
    $ExternalProject = Join-Path $External $ProjectName
    New-Dir $ExternalProject "Espelho HD Externo"
} else {
    Write-Host "[AVISO] HD externo (E:) nao encontrado. Pule esta etapa ou conecte o disco." -ForegroundColor Yellow
}

# ── Snapshots ZIP ─────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[SNAPSHOTS]" -ForegroundColor Cyan
if (Test-Path "E:\") {
    $SnapshotProject = Join-Path $Snapshots $ProjectName
    New-Dir $SnapshotProject "Snapshots ZIP"
} else {
    Write-Host "[AVISO] HD externo (E:) nao encontrado. Snapshots ignorados." -ForegroundColor Yellow
}

# ── Logs (estrutura YYYY/MM) ──────────────────────────────────────────────────
Write-Host ""
Write-Host "[LOGS]" -ForegroundColor Cyan
$LogRoot  = Join-Path $ProjectPath "logs"
$Year     = (Get-Date).Year.ToString()
$Month    = (Get-Date).ToString("MM")
$LogTypes = if ($Config.logTypes) { $Config.logTypes } else { @("backup","restore","git","database","health") }

foreach ($t in $LogTypes) {
    New-Dir (Join-Path $LogRoot "$Year\$Month\$t") "logs\$Year\$Month\$t"
}

# ── config/paths.json (cria se nao existir) ───────────────────────────────────
$CfgFile = Join-Path $ProjectPath "config\paths.json"
if (!(Test-Path $CfgFile)) {
    Write-Host ""
    Write-Host "[CONFIG] Gerando config/paths.json com defaults..." -ForegroundColor Yellow
    @{
        workspace = $Workspace
        onedrive  = $OneDrive
        external  = $External
        snapshots = $Snapshots
        github    = @{ organization = "portal-cidadania-os"; defaultBranch = "main" }
        excludedDirectories = @("node_modules",".next",".git","dist",".turbo")
        logTypes  = @("backup","restore","git","database","health")
    } | ConvertTo-Json -Depth 4 | Set-Content $CfgFile -Encoding UTF8
    Write-Host "[CRIADO] config/paths.json" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Estrutura criada com sucesso!" -ForegroundColor Green
Write-Host "  Proximos passos:" -ForegroundColor White
Write-Host "    1. Defina a variavel PORTAL_CIDADANIA_SUPABASE_DB_URL" -ForegroundColor White
Write-Host "    2. Execute verify-portal-cidadania.ps1 para checar o ambiente" -ForegroundColor White
Write-Host "    3. Execute backup-portal-cidadania.ps1 para o primeiro backup" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
