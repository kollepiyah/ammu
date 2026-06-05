@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
set "OUT=D:\Aplikasi Project\Portal MU\tmp_recovery\_gitcheck.txt"
cd /d "D:\Aplikasi Project\Portal MU"
echo ===TOPLEVEL=== > "%OUT%"
"%GIT%" rev-parse --show-toplevel >> "%OUT%" 2>&1
echo ===nested vue-app/.git?=== >> "%OUT%"
if exist "vue-app\.git" (echo YES-vue-app-has-.git >> "%OUT%") else (echo no-nested-git >> "%OUT%")
echo ===submodule status=== >> "%OUT%"
"%GIT%" submodule status >> "%OUT%" 2>&1
echo ===STATUS my files=== >> "%OUT%"
"%GIT%" status --short -- "vue-app/src/views/PosSantriView.vue" "vue-app/src/components/pos/ModalPOS.vue" "vue-app/src/utils/strukBuilder.js" "vue-app/android/app/build.gradle" "vue-app/src/main.js" "vue-app/android/app/src/main/java/app/ammu/id/widgets/JamHijriWidget.java" >> "%OUT%" 2>&1
echo ===ls-files PosSantri (tracked?)=== >> "%OUT%"
"%GIT%" ls-files --error-unmatch "vue-app/src/views/PosSantriView.vue" >> "%OUT%" 2>&1
echo ===diff --stat vue-app (first 40)=== >> "%OUT%"
"%GIT%" diff --stat -- "vue-app" >> "%OUT%" 2>&1
echo ===DONE=== >> "%OUT%"
