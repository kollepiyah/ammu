@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/views/PengaturanView.vue vue-app/src/views/PosSantriView.vue vue-app/src/views/PpdbAdminView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_corruptfix.txt -- vue-app/src/views/PengaturanView.vue vue-app/src/views/PosSantriView.vue vue-app/src/views/PpdbAdminView.vue
"%GIT%" log --oneline -2
endlocal
pause
