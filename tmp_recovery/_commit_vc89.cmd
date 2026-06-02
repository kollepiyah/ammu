@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/android/app/build.gradle
"%GIT%" commit --no-verify -F tmp_recovery\msg_vc89.txt -- vue-app/android/app/build.gradle
"%GIT%" log --oneline -1
endlocal
pause
