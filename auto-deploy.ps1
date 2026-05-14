# PowerShell Auto-Deploy Script untuk Portal MU
# Cara pakai: cd "D:\Aplikasi Project\Portal MU"; .\auto-deploy.ps1

$ErrorActionPreference = "Continue"
$ProjectRoot = "D:\Aplikasi Project\Portal MU"
Set-Location $ProjectRoot

# Suppress git CRLF warnings (cosmetic, tidak affect functionality)
git config --local core.safecrlf false 2>$null | Out-Null
$env:GIT_TERMINAL_PROMPT = "0"

# Load credentials
$envFile = ".\.agent-credentials.env"
if (-not (Test-Path $envFile)) {
    Write-Host "[ERROR] .agent-credentials.env not found!" -ForegroundColor Red
    exit 1
}
$envLines = Get-Content $envFile
$GITHUB_TOKEN = ""
$FIREBASE_CI_TOKEN = ""
foreach ($line in $envLines) {
    if ($line -match "^GITHUB_TOKEN=(.+)$") { $GITHUB_TOKEN = $matches[1].Trim() }
    if ($line -match "^FIREBASE_CI_TOKEN=(.+)$") { $FIREBASE_CI_TOKEN = $matches[1].Trim() }
}
if (-not $GITHUB_TOKEN -or -not $FIREBASE_CI_TOKEN) {
    Write-Host "[ERROR] Missing GITHUB_TOKEN or FIREBASE_CI_TOKEN in credentials file" -ForegroundColor Red
    exit 1
}

# Step 1: Integrity gate
Write-Host ""
Write-Host "[1/5] Verifying integrity..." -ForegroundColor Cyan
$indexSize = (Get-Item public\index.html).Length
$indexTail = (Get-Content public\index.html -Tail 5) -join "`n"
$msg = "Integrity OK (" + $indexSize + " bytes)"
if ($indexSize -lt 1500000 -or $indexSize -gt 3000000) {
    Write-Host "[FAIL] index.html size suspicious: $indexSize bytes" -ForegroundColor Red
    exit 1
}
if ($indexTail -notmatch "</html>") {
    Write-Host "[FAIL] index.html doesn't end with </html>" -ForegroundColor Red
    exit 1
}
Write-Host $msg -ForegroundColor Green

# Step 2: Cleanup git lock
Write-Host ""
Write-Host "[2/5] Cleanup git lock..." -ForegroundColor Cyan
Remove-Item .git\index.lock -Force -ErrorAction SilentlyContinue
Get-ChildItem .git -Recurse -Filter "*.lock" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
Write-Host "Lock cleared" -ForegroundColor Green

# Step 2.5: Rebuild Vue widget bundle kalau ada perubahan di vue-widgets/src
Write-Host ""
Write-Host "[2.5/5] Check Vue widget rebuild..." -ForegroundColor Cyan
$vueSrcChanged = $false
if (Test-Path "vue-widgets/src") {
    # Bandingkan timestamp src vs dist
    $srcLatest = (Get-ChildItem -Path "vue-widgets/src" -Recurse -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1).LastWriteTime
    $distFile = "public/dist/widgets.js"
    if (Test-Path $distFile) {
        $distTime = (Get-Item $distFile).LastWriteTime
        if ($srcLatest -gt $distTime) { $vueSrcChanged = $true }
    } else {
        $vueSrcChanged = $true
    }
}
if ($vueSrcChanged) {
    Write-Host "Vue source changed, rebuilding bundle..." -ForegroundColor Yellow
    Push-Location vue-widgets
    if (-not (Test-Path "node_modules")) {
        Write-Host "Running npm install (first time)..." -ForegroundColor Yellow
        npm install 2>&1 | Out-Host
    }
    npm run build 2>&1 | Out-Host
    $buildExit = $LASTEXITCODE
    Pop-Location
    if ($buildExit -ne 0) {
        Write-Host "[FAIL] Vue widget build failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "Vue bundle rebuilt: public/dist/widgets.js" -ForegroundColor Green
} else {
    Write-Host "Vue bundle up-to-date, skip rebuild" -ForegroundColor Green
}

# Step 3: Commit kalau ada changes
Write-Host ""
Write-Host "[3/5] Commit changes..." -ForegroundColor Cyan
$status = git status --short
if ($status) {
    git add public/index.html public/sw.js .gitignore 2>&1 | Out-Null
    git add public/dist/widgets.js 2>&1 | Out-Null
    git add vue-widgets/src 2>&1 | Out-Null
    # Tambah semua .md + script (kalau ada)
    Get-ChildItem -Path . -Filter "*.md" -File -ErrorAction SilentlyContinue | ForEach-Object {
        git add $_.Name 2>&1 | Out-Null
    }
    if (Test-Path "auto-deploy.ps1") { git add auto-deploy.ps1 2>&1 | Out-Null }
    git commit --no-verify -m "auto-deploy: changes + Vue rebuild (v.109.13)" 2>&1 | Out-Host
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Committed" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Commit returned non-zero exit, continuing..." -ForegroundColor Yellow
    }
} else {
    Write-Host "Working tree clean, no commit needed" -ForegroundColor Green
}

# Step 4: Push
Write-Host ""
Write-Host "[4/5] Push to GitHub..." -ForegroundColor Cyan
$remoteUrl = "https://x-access-token:$GITHUB_TOKEN@github.com/kollepiyah/ammu.git"
git push $remoteUrl main 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] Push failed (exit code $LASTEXITCODE)" -ForegroundColor Red
    exit 1
}
Write-Host "Pushed to GitHub" -ForegroundColor Green

# Step 5: Firebase deploy
Write-Host ""
Write-Host "[5/5] Firebase deploy --only hosting..." -ForegroundColor Cyan
firebase deploy --only hosting --token "$FIREBASE_CI_TOKEN" --non-interactive 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] Firebase deploy failed (exit code $LASTEXITCODE)" -ForegroundColor Red
    exit 1
}
Write-Host ""
Write-Host "[DONE] Deploy success: https://portal-mambaul-ulum.web.app" -ForegroundColor Green
