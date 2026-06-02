@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/android/app/src/main/res vue-app/capacitor.config.json vue-app/android/app/src/main/assets/capacitor.config.json vue-app/android/app/build.gradle
"%GIT%" commit --no-verify -F tmp_recovery\msg_splash.txt
"%GIT%" log --oneline -1
endlocal
pause
