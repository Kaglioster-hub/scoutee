Write-Host "⚡ Scoutee: Clean + Reinstall + Push 🚀" -ForegroundColor Cyan

Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

npm install
if ($LASTEXITCODE -ne 0) { throw "❌ Errore npm install" }

npm run build
if ($LASTEXITCODE -ne 0) { throw "❌ Build fallita" }

git add .
git commit -m "chore: auto clean + deploy"
git push origin main --force

Write-Host "✅ Push completato! Vercel triggererà il deploy automatico." -ForegroundColor Green
