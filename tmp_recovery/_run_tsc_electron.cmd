@echo off
set "PATH=C:\nvm4w\nodejs;C:\Program Files\Git\cmd;%PATH%"
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
cd /d "D:\Aplikasi Project\Portal MU\vue-app\electron"
call npm run build > "D:\Aplikasi Project\Portal MU\tmp_recovery\_tsc_out.txt" 2>&1
echo TSC_EXITCODE=%ERRORLEVEL% >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_tsc_out.txt"
