@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
set "D=D:\Aplikasi Project\Portal MU\tmp_recovery\widget82"
mkdir "%D%" 2>nul
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/java/app/ammu/id/widgets/JamHijriWidget.kt" > "%D%\JamHijriWidget.kt" 2>&1
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/res/layout/widget_jam_hijri.xml" > "%D%\widget_jam_hijri.xml" 2>&1
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/res/xml/widget_jam_hijri_info.xml" > "%D%\widget_jam_hijri_info.xml" 2>&1
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/res/drawable/widget_bg.xml" > "%D%\widget_bg.xml" 2>&1
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/AndroidManifest.xml" > "%D%\AndroidManifest.d3d60f7.xml" 2>&1
echo DONE
