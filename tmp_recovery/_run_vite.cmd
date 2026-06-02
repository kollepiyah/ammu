@echo off
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0;C:\nvm4w\nodejs;C:\Program Files\Git\cmd"
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
cd /d "D:\Aplikasi Project\Portal MU\vue-app"
echo === VITE BUILD:ELECTRON ===
call npm run build:electron > "D:\Aplikasi Project\Portal MU\tmp_recovery\_vite_full.log" 2>&1
echo VITE_EXITCODE=%ERRORLEVEL%
