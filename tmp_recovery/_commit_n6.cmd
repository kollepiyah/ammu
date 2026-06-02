@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/views/GuruView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_n6.txt -- vue-app/src/views/GuruView.vue
"%GIT%" log --oneline -1
endlocal
pause
