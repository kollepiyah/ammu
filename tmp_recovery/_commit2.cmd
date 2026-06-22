@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add "vue-app/android/app/src/main/res/drawable/widget_bg.xml" "vue-app/android/app/src/main/res/drawable/widget_hijri_pattern.png" "vue-app/android/app/src/main/res/xml/widget_jam_hijri_info.xml" "vue-app/android/app/src/main/res/layout/widget_jam_hijri.xml" "vue-app/android/app/src/main/res/layout/widget_kalender.xml" "vue-app/android/app/src/main/java/app/ammu/id/widgets/KalenderWidget.java" "vue-app/src/components/dashboard/DashboardKalender.vue" > "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit2.log" 2>&1
echo ---COMMIT--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit2.log"
"%GIT%" commit --no-verify -F "D:\Aplikasi Project\Portal MU\commit-msg.txt" >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit2.log" 2>&1
echo COMMIT_EXIT=%ERRORLEVEL% >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit2.log"
echo ---SHOW STAT--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit2.log"
"%GIT%" show --stat --oneline HEAD >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_commit2.log" 2>&1
