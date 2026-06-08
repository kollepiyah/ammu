@echo off
set "PATH=C:\Windows\System32;C:\Windows;C:\nvm4w\nodejs;C:\Program Files\Git\cmd"
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
cd /d "D:\Aplikasi Project\Portal MU"
set "LOG=D:\Aplikasi Project\Portal MU\tmp_recovery\_gitcommit.txt"
git add vue-app/src/utils/raporPdf.js vue-app/src/views/RaporView.vue vue-app/package.json vue-app/src/main.js vue-app/src/components/layout/AppSidebar.vue PROJECT-KNOWLEDGE-BASE.md > "%LOG%" 2>&1
git commit --no-verify -F "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit_msg.txt" >> "%LOG%" 2>&1
echo === RESULT === >> "%LOG%"
git log --oneline -1 >> "%LOG%" 2>&1
git status --short >> "%LOG%" 2>&1
echo DONE
