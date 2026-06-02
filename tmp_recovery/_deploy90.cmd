@echo off
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0;C:\nvm4w\nodejs;C:\Program Files\Git\cmd;%APPDATA%\npm"
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
cd /d "D:\Aplikasi Project\Portal MU"
echo === FIREBASE DEPLOY START === > tmp_recovery\_deploy_out.txt
call npm run firebase:deploy >> tmp_recovery\_deploy_out.txt 2>&1
echo DEPLOY_EXITCODE=%ERRORLEVEL% >> tmp_recovery\_deploy_out.txt
echo === DEPLOY END ===
