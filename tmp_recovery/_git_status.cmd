@echo off
set "PATH=C:\Windows\System32;C:\Windows;C:\nvm4w\nodejs;C:\Program Files\Git\cmd"
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
cd /d "D:\Aplikasi Project\Portal MU"
echo === BRANCH === > "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt"
git rev-parse --abbrev-ref HEAD >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt" 2>&1
echo === STATUS SHORT === >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt"
git status --short >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt" 2>&1
echo === LAST 3 COMMITS === >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt"
git log --oneline -3 >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt" 2>&1
echo DONE
