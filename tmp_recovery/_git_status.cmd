@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" rev-parse --abbrev-ref HEAD > "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt" 2>&1
echo ---STATUS--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt"
"%GIT%" status --short >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_gitstatus.txt" 2>&1
