
# ============================================================
# Portal Cidadania OS — Commit e Push
# Execute: .\scripts\commit-e-push.ps1
# ============================================================

Set-Location "C:\Projetos\portal-cidadania-os"

Write-Host "`n[1/3] Status dos arquivos alterados..." -ForegroundColor Cyan
git status --short

Write-Host "`n[2/3] Adicionando arquivos e fazendo commit..." -ForegroundColor Cyan
git add -A
git commit -m "fix: auth session cookies, admin redirect e header role-aware

- src/lib/supabase.ts: createClient -> createBrowserClient (SSR cookies)
- src/middleware.ts: redireciona admin de /portal -> /admin
- src/components/Header.tsx: botao Meu Portal aponta para /admin se role=admin
- src/app/admin/layout.tsx: fix TS exato property (cast)"

Write-Host "`n[3/3] Enviando para o repositorio remoto..." -ForegroundColor Cyan
git push origin main

Write-Host "`nDone! Vercel vai detectar o push e iniciar o deploy automaticamente." -ForegroundColor Green
