@echo off
set "PATH=C:\Windows\System32;C:\Windows;C:\nvm4w\nodejs;C:\Users\Lenovo\AppData\Roaming\npm;C:\Program Files\Git\cmd"
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
cd /d "D:\Aplikasi Project\Portal MU"
set "LOG=D:\Aplikasi Project\Portal MU\tmp_recovery\_gitpush.txt"
git rev-parse --abbrev-ref HEAD > "%LOG%" 2>&1
git remote -v >> "%LOG%" 2>&1
echo === PUSH === >> "%LOG%"
git push origin HEAD >> "%LOG%" 2>&1
echo PUSH_EXITCODE=%ERRORLEVEL% >> "%LOG%"
echo DONE
