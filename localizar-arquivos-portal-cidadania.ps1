# =============================================================
#  LOCALIZADOR DE ARQUIVOS - PORTAL-CIDADANIA-OS
#  Uso: varre a pasta local do projeto e localiza arquivos-alvo,
#       gerando um relatorio (CSV) com caminho completo, tamanho
#       e data de modificacao. Nao envia nada para fora da maquina.
# =============================================================

param(
    [string]$ProjectRoot = "C:\Projetos\portal-cidadania-os",
    [string]$ReportPath  = "$PSScriptRoot\relatorio-localizacao-$(Get-Date -Format 'yyyyMMdd_HHmmss').csv"
)

if (-not (Test-Path $ProjectRoot)) {
    Write-Host "ERRO: pasta do projeto nao encontrada em '$ProjectRoot'" -ForegroundColor Red
    exit 1
}

Write-Host "Varrendo projeto em: $ProjectRoot" -ForegroundColor Cyan

# Lista de arquivos marcados como criticos (schema, conexao supabase, migracoes)
$arquivosCriticos = @(
    "supabase.ts",
    "001_schema_inicial.sql",
    "schema_completo.sql"
)

# Lista de outros arquivos-chave do projeto (estrutura conhecida)
$arquivosGerais = @(
    "nucleos.ts",
    "middleware.ts",
    "Header.tsx",
    "Footer.tsx",
    "NucleoCard.tsx",
    "BannerCarousel.tsx",
    "BgSlideshow.tsx",
    "ChatbotFAQ.tsx",
    "CardCurso.tsx",
    "ListaCursos.tsx",
    "DetalhesCurso.tsx",
    "BotaoInscricao.tsx",
    "AdminPageHeader.tsx",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    ".env.local",
    ".env.production"
)

$todosAlvos = $arquivosCriticos + $arquivosGerais
$resultados = @()

foreach ($nome in $todosAlvos) {
    $encontrados = Get-ChildItem -Path $ProjectRoot -Recurse -File -Filter $nome -ErrorAction SilentlyContinue

    if ($encontrados) {
        foreach ($arq in $encontrados) {
            $resultados += [PSCustomObject]@{
                Arquivo      = $arq.Name
                Critico      = if ($arquivosCriticos -contains $arq.Name) { "SIM" } else { "" }
                CaminhoCompleto = $arq.FullName
                TamanhoKB    = [math]::Round($arq.Length / 1KB, 2)
                UltimaModificacao = $arq.LastWriteTime
            }
        }
    }
    else {
        $resultados += [PSCustomObject]@{
            Arquivo      = $nome
            Critico      = if ($arquivosCriticos -contains $nome) { "SIM" } else { "" }
            CaminhoCompleto = "NAO ENCONTRADO"
            TamanhoKB    = ""
            UltimaModificacao = ""
        }
    }
}

# Exibe resumo no terminal
Write-Host "`n=== ARQUIVOS CRITICOS ===" -ForegroundColor Yellow
$resultados | Where-Object { $_.Critico -eq "SIM" } | Format-Table -AutoSize

Write-Host "`n=== DEMAIS ARQUIVOS ===" -ForegroundColor Gray
$resultados | Where-Object { $_.Critico -ne "SIM" } | Format-Table -AutoSize

# Exporta relatorio CSV
$resultados | Export-Csv -Path $ReportPath -NoTypeInformation -Encoding UTF8

Write-Host "`nRelatorio salvo em: $ReportPath" -ForegroundColor Green