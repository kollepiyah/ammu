@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/src/views/ProfilDetailView.vue vue-app/src/views/profil/ProfilSantri.vue vue-app/src/views/profil/ProfilGuru.vue vue-app/src/router/index.js vue-app/src/views/SantriView.vue vue-app/src/views/GuruView.vue vue-app/src/components/layout/GlobalSearch.vue > tmp_recovery\_profil_out.txt 2>&1
"%GIT%" commit --no-verify -m "feat(profil): klik nama/avatar santri-guru -> halaman profil read-only + prestasi (noSantri); global search -> profil detail" >> tmp_recovery\_profil_out.txt 2>&1
"%GIT%" log -1 --stat >> tmp_recovery\_profil_out.txt 2>&1
echo PROFILDONE
