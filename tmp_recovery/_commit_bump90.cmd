@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/android/app/build.gradle package.json vue-app/package.json vue-app/electron/package.json vue-app/src/main.js vue-app/src/components/layout/AppSidebar.vue vue-app/src/views/LoginView.vue vue-app/src/views/DashboardView.vue vue-app/src/views/PpdbAdminView.vue > tmp_recovery\_bump90_out.txt 2>&1
"%GIT%" commit --no-verify -m "chore(release): bump versionName v.90.0626 (versionCode 90)" >> tmp_recovery\_bump90_out.txt 2>&1
echo ----LOG---- >> tmp_recovery\_bump90_out.txt
"%GIT%" log -1 --oneline >> tmp_recovery\_bump90_out.txt 2>&1
echo BUMPDONE
