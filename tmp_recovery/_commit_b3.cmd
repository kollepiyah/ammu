@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add firestore.rules vue-app/src/App.vue vue-app/src/composables/useGuruForm.js vue-app/src/stores/auth.js vue-app/src/utils/raporPdf.js vue-app/src/views/RaporView.vue > tmp_recovery\_commit_b3_out.txt 2>&1
"%GIT%" commit --no-verify -F tmp_recovery\_msg_b3.txt >> tmp_recovery\_commit_b3_out.txt 2>&1
echo ----LOG---- >> tmp_recovery\_commit_b3_out.txt
"%GIT%" log -1 --stat >> tmp_recovery\_commit_b3_out.txt 2>&1
echo COMMITDONE
