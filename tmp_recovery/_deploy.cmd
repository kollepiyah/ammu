@echo off
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0;C:\nvm4w\nodejs;C:\Users\Lenovo\AppData\Roaming\npm;C:\Program Files\Git\cmd"
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
cd /d "D:\Aplikasi Project\Portal MU"
echo === FIREBASE DEPLOY (web) ===
call npm run firebase:deploy > "D:\Aplikasi Project\Portal MU\tmp_recovery\_deploy.log" 2>&1
echo DEPLOY_EXITCODE=%ERRORLEVEL%
