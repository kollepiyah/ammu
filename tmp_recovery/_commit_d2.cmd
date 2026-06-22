@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- functions/index.js vue-app/src/services/auth.js
"%GIT%" commit --no-verify -F tmp_recovery\msg_d2.txt -- functions/index.js vue-app/src/services/auth.js
"%GIT%" log --oneline -1
endlocal
pause
