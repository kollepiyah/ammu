@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/android/app/src/main/res/values/styles.xml vue-app/android/app/src/main/java/app/ammu/id/MainActivity.java vue-app/android/app/src/main/res/drawable-mdpi/splash_branding.png vue-app/android/app/src/main/res/drawable-hdpi/splash_branding.png vue-app/android/app/src/main/res/drawable-xhdpi/splash_branding.png vue-app/android/app/src/main/res/drawable-xxhdpi/splash_branding.png vue-app/android/app/src/main/res/drawable-xxxhdpi/splash_branding.png > tmp_recovery\_splash90_out.txt 2>&1
"%GIT%" commit --no-verify -m "feat(splash): branding 'Powered by Bakafrawi' + fade-out (Android SplashScreen API, v.90)" >> tmp_recovery\_splash90_out.txt 2>&1
echo ----LOG---- >> tmp_recovery\_splash90_out.txt
"%GIT%" log -1 --stat >> tmp_recovery\_splash90_out.txt 2>&1
echo SPLASHDONE
