
# ============================================================
# Portal Cidadania OS — Commit, Merge develop->main e Push
# Execute: .\scripts\commit-e-push.ps1
# ============================================================

Set-Location "C:\Projetos\portal-cidadania-os"

Write-Host "`n[1/4] Branch atual e status..." -ForegroundColor Cyan
git branch
git status --short

Write-Host "`n[2/4] Commit de alteracoes pendentes no develop (se houver)..." -ForegroundColor Cyan
git add -A
git commit -m "feat: foto pastores animada nos banners dos nucleos + fixes auth

- nucleos/[slug]: foto pastores com animacao de entrada pelo canto superior direito
- globals.css: keyframe pastoresEntrada (slide + opacity 45%)
- supabase.ts: createBrowserClient para sessao em cookies (SSR)
- middleware.ts: redireciona admin /portal -> /admin
- Header.tsx: botao Painel Admin para role=admin
- admin/layout.tsx: fix TypeScript exato property" 2>&1 | Out-String | Write-Host

Write-Host "`n[3/4] Push develop e merge para main..." -ForegroundColor Cyan
git push origin develop
git checkout main
git merge develop --no-edit
git push origin main

Write-Host "`n[4/4] Voltando para develop..." -ForegroundColor Cyan
git checkout develop

Write-Host "`nDone! Vercel vai detectar o push no main e iniciar o deploy." -ForegroundColor Green
