@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -A > "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log" 2>&1
"%GIT%" reset -- tmp_recovery "vue-app/electron/app" "Portal MU" >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log" 2>&1
echo ---COMMIT--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log"
"%GIT%" commit --no-verify -F "D:\Aplikasi Project\Portal MU\commit-msg.txt" >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log" 2>&1
echo COMMIT_EXIT=%ERRORLEVEL% >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log"
echo ---LAST 3 COMMITS--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log"
"%GIT%" log --oneline -3 >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log" 2>&1
echo ---STATUS AFTER (short)--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log"
"%GIT%" status --short >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit.log" 2>&1
