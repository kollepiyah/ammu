@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU\vue-app\android\app\src\main"
mkdir "java\app\ammu\id\widgets" 2>nul
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/java/app/ammu/id/widgets/JamHijriWidget.kt" > "java\app\ammu\id\widgets\JamHijriWidget.kt" 2>&1
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/res/layout/widget_jam_hijri.xml" > "res\layout\widget_jam_hijri.xml" 2>&1
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/res/xml/widget_jam_hijri_info.xml" > "res\xml\widget_jam_hijri_info.xml" 2>&1
"%GIT%" show "d3d60f7:vue-app/android/app/src/main/res/drawable/widget_bg.xml" > "res\drawable\widget_bg.xml" 2>&1
echo ==== restored files ====
dir /b "java\app\ammu\id\widgets\JamHijriWidget.kt" "res\layout\widget_jam_hijri.xml" "res\xml\widget_jam_hijri_info.xml" "res\drawable\widget_bg.xml"
