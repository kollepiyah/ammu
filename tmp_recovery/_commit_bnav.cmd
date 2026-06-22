@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/src/composables/useMobileShell.js vue-app/src/views/NotifikasiView.vue vue-app/src/components/layout/BottomNav.vue vue-app/src/router/index.js vue-app/src/components/layout/AppLayout.vue vue-app/src/components/layout/AppHeader.vue > tmp_recovery\_bnav_out.txt 2>&1
"%GIT%" commit --no-verify -m "feat(mobile): bottom nav 5 tab (Android/PWA+mobile) + halaman Notifikasi penuh; bell pindah dari topbar di mobile" >> tmp_recovery\_bnav_out.txt 2>&1
"%GIT%" log -1 --stat >> tmp_recovery\_bnav_out.txt 2>&1
echo BNAVDONE
