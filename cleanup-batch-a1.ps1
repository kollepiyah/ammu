# Cleanup Batch A1 — Portal MU
# Jalankan di PowerShell sebagai Administrator di folder D:\Aplikasi Project\Portal MU
# Akan hapus ~80MB folder obsolete

Write-Host "=== Portal MU Cleanup Batch A1 ===" -ForegroundColor Cyan
Write-Host ""

$folders = @(
    "_archive-portal-mu-v2",
    "backup v.107",
    "backups\v24-broken-pre-restore",
    "backups\old-files-v30",
    ".lighthouseci"
)

$files = @(
    "public\index.min.html"
)

# Show what will be deleted
Write-Host "Folders to delete:" -ForegroundColor Yellow
foreach ($f in $folders) {
    if (Test-Path $f) {
        $size = (Get-ChildItem $f -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Host ("  - {0} ({1:N1} MB)" -f $f, $size)
    } else {
        Write-Host ("  - {0} (NOT FOUND, skip)" -f $f) -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Files to delete:" -ForegroundColor Yellow
foreach ($f in $files) {
    if (Test-Path $f) {
        $size = (Get-Item $f).Length / 1KB
        Write-Host ("  - {0} ({1:N0} KB)" -f $f, $size)
    } else {
        Write-Host ("  - {0} (NOT FOUND, skip)" -f $f) -ForegroundColor Gray
    }
}

Write-Host ""
$confirm = Read-Host "Lanjutkan hapus? (ketik 'YA' untuk konfirmasi)"

if ($confirm -ne "YA") {
    Write-Host "Dibatalkan." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Menghapus..." -ForegroundColor Yellow

foreach ($f in $folders) {
    if (Test-Path $f) {
        try {
            Remove-Item $f -Recurse -Force -ErrorAction Stop
            Write-Host ("  OK - {0}" -f $f) -ForegroundColor Green
        } catch {
            Write-Host ("  FAIL - {0} : {1}" -f $f, $_.Exception.Message) -ForegroundColor Red
        }
    }
}

foreach ($f in $files) {
    if (Test-Path $f) {
        try {
            Remove-Item $f -Force -ErrorAction Stop
            Write-Host ("  OK - {0}" -f $f) -ForegroundColor Green
        } catch {
            Write-Host ("  FAIL - {0} : {1}" -f $f, $_.Exception.Message) -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "Cleanup selesai!" -ForegroundColor Green
Write-Host ""

# Show total disk usage
$total = (Get-ChildItem "." -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host ("Total Portal MU sekarang: {0:N1} MB" -f $total) -ForegroundColor Cyan
