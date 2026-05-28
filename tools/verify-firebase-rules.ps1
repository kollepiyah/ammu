# Portal MU - Firebase Rules Verify (v4: ASCII-only, no unicode parse error)
# Run: .\tools\verify-firebase-rules.ps1

$ProjectRoot = "D:\Aplikasi Project\Portal MU"
$Project = "portal-mambaul-ulum"
Set-Location $ProjectRoot

Write-Host ""
Write-Host "=== Portal MU Firebase Rules Verify ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Firebase CLI installed?
Write-Host "[1/2] Firebase CLI check..." -ForegroundColor Cyan
$fbVersion = firebase --version 2>$null
if (-not $fbVersion) {
    Write-Host "[FAIL] Firebase CLI tidak terinstall. npm install -g firebase-tools" -ForegroundColor Red
    exit 1
}
Write-Host "Firebase CLI: $fbVersion" -ForegroundColor Green

# Step 2: Login check
Write-Host ""
Write-Host "[2/2] Login check..." -ForegroundColor Cyan
$loginList = firebase login:list 2>&1 | Out-String
if ($loginList -match "No authorized accounts" -or $loginList -match "No active") {
    Write-Host "[FAIL] Belum login. Run: firebase login" -ForegroundColor Red
    exit 1
}
Write-Host "Login OK" -ForegroundColor Green
Write-Host "(Project access check di-skip. Firebase CLI 15.x output format tricky untuk regex.)" -ForegroundColor Gray

# Open Console URLs untuk visual verify
Write-Host ""
Write-Host "=== Manual verify via Firebase Console ===" -ForegroundColor Cyan
Write-Host "Firebase CLI tidak punya firestore:rules:get. Compare manual via Console:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Firestore Rules:" -ForegroundColor White
Write-Host "  https://console.firebase.google.com/project/$Project/firestore/rules" -ForegroundColor Gray
Write-Host ""
Write-Host "  Storage Rules:" -ForegroundColor White
Write-Host "  https://console.firebase.google.com/project/$Project/storage/rules" -ForegroundColor Gray
Write-Host ""

$openConsole = Read-Host "Buka 2 URL Console di browser? (Y/n)"
if ($openConsole -ne 'n' -and $openConsole -ne 'N') {
    Start-Process "https://console.firebase.google.com/project/$Project/firestore/rules"
    Start-Sleep -Seconds 1
    Start-Process "https://console.firebase.google.com/project/$Project/storage/rules"
    Write-Host "[OK] Console terbuka" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Compare workflow ===" -ForegroundColor Cyan
Write-Host "1. Buka Console (URL di atas)"
Write-Host "2. Copy text rules dari Console"
Write-Host "3. Buka file lokal: notepad firestore.rules"
Write-Host "4. Visual compare"
Write-Host ""
Write-Host "Kalau drift:" -ForegroundColor Yellow
Write-Host "  - Deployed lebih baru: copy dari Console ke file lokal, commit"
Write-Host "  - Local lebih baru:    firebase deploy --only firestore:rules,storage"
Write-Host ""
Write-Host "TIP: Jangan edit rules langsung di Console. Selalu edit lokal + deploy via CLI." -ForegroundColor Cyan
