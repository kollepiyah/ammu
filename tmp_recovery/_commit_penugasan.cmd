@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/views/KelasGuruView.vue vue-app/src/services/firestore.js
"%GIT%" commit --no-verify -F tmp_recovery\msg_penugasan.txt
"%GIT%" log --oneline -1
endlocal
pause
