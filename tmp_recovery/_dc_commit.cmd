@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app-psb/src/views/PsbFormView.vue vue-app-psb/src/style.css vue-app-psb/index.html > tmp_recovery\_gitout.txt 2>&1
"%GIT%" commit --no-verify -m "feat(psb): header 2 logo kiri-kanan (logoQiraati/logoKop dari settings, match rapor)" -- vue-app-psb/src/views/PsbFormView.vue vue-app-psb/src/style.css vue-app-psb/index.html >> tmp_recovery\_gitout.txt 2>&1
echo === LOG === >> tmp_recovery\_gitout.txt
"%GIT%" log --oneline -3 >> tmp_recovery\_gitout.txt 2>&1
