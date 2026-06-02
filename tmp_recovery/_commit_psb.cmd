@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app-psb/src/views/PsbFormView.vue vue-app-psb/src/style.css vue-app-psb/index.html
"%GIT%" commit --no-verify -F tmp_recovery\msg_psb.txt -- vue-app-psb/src/views/PsbFormView.vue vue-app-psb/src/style.css vue-app-psb/index.html
"%GIT%" log --oneline -1
endlocal
pause
