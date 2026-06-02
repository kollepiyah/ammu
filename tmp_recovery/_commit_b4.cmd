@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/src/utils/jenjang.js vue-app/src/views/LembagaDetailView.vue vue-app/src/views/RaporView.vue vue-app/src/views/RekapDiniyahView.vue > tmp_recovery\_commit_b4_out.txt 2>&1
"%GIT%" commit --no-verify -F tmp_recovery\_msg_b4.txt >> tmp_recovery\_commit_b4_out.txt 2>&1
echo ----LOG---- >> tmp_recovery\_commit_b4_out.txt
"%GIT%" log -1 --stat >> tmp_recovery\_commit_b4_out.txt 2>&1
echo COMMITDONE
