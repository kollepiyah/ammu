@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/composables/useSantriForm.js vue-app/src/views/SantriFormView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_n4.txt -- vue-app/src/composables/useSantriForm.js vue-app/src/views/SantriFormView.vue
"%GIT%" log --oneline -1
endlocal
pause
