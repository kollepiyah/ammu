@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/android/app/build.gradle package.json vue-app/package.json vue-app/electron/package.json vue-app/src/main.js vue-app/src/components/layout/AppSidebar.vue vue-app/src/views/LoginView.vue vue-app/src/views/DashboardView.vue vue-app/src/views/PpdbAdminView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_bump.txt -- vue-app/android/app/build.gradle package.json vue-app/package.json vue-app/electron/package.json vue-app/src/main.js vue-app/src/components/layout/AppSidebar.vue vue-app/src/views/LoginView.vue vue-app/src/views/DashboardView.vue vue-app/src/views/PpdbAdminView.vue
"%GIT%" log --oneline -1
endlocal
pause
