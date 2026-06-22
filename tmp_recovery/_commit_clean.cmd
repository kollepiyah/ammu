@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/views/StatistikView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_clean.txt -- vue-app/src/views/StatistikView.vue
"%GIT%" log --oneline -1
endlocal
pause
