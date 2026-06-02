@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- firestore.rules vue-app/index.html
"%GIT%" commit --no-verify -F tmp_recovery\msg_drev.txt -- firestore.rules vue-app/index.html
"%GIT%" log --oneline -1
endlocal
pause
