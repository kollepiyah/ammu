@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/android/app/build.gradle package.json vue-app/package.json vue-app/electron/package.json vue-app/src/main.js vue-app/src/components/layout/AppSidebar.vue vue-app/src/views/LoginView.vue vue-app/src/views/DashboardView.vue vue-app/src/views/PpdbAdminView.vue vue-app/src/views/KelasGuruView.vue vue-app/src/components/layout/AppHeader.vue vue-app/src/views/TagihanView.vue > tmp_recovery\_v91_out.txt 2>&1
"%GIT%" commit --no-verify -m "feat(v.91): bump v.91.0626 (vc91) + search santri di Kelas + indikator offline topbar + badge status tagihan (Lunas/Tempo/Nunggak)" >> tmp_recovery\_v91_out.txt 2>&1
echo ----LOG---- >> tmp_recovery\_v91_out.txt
"%GIT%" log -1 --stat >> tmp_recovery\_v91_out.txt 2>&1
echo V91DONE
