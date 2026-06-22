@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" rev-parse --show-toplevel > "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt" 2>&1
echo ---LSFILES-PosSantri--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
"%GIT%" ls-files --error-unmatch "vue-app/src/views/PosSantriView.vue" >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt" 2>&1
echo ---DIFF-NAME-ONLY-vue-app-src--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
"%GIT%" diff --name-only -- "vue-app/src" >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt" 2>&1
echo ---DIFF-NAME-ONLY-android--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
"%GIT%" diff --name-only -- "vue-app/android" >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt" 2>&1
echo ---UNTRACKED-vue-app--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
"%GIT%" ls-files --others --exclude-standard -- "vue-app" >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt" 2>&1
echo ---NESTED-vue-app-.git--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
if exist "vue-app\.git" echo YES-nested-git-in-vue-app >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
if not exist "vue-app\.git" echo no-nested-git >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
echo ---DONE--- >> "D:\Aplikasi Project\Portal MU\tmp_recovery\_chk.txt"
