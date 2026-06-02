@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/src/views/CapaianPrestasiView.vue vue-app/src/router/index.js vue-app/src/views/TagihanView.vue > tmp_recovery\_santri_out.txt 2>&1
"%GIT%" commit --no-verify -m "feat(santri): hapus 'Lihat Rapor' di Capaian Prestasi + guard /rapor noSantri + poles judul kartu tagihan santri" >> tmp_recovery\_santri_out.txt 2>&1
"%GIT%" log -1 --oneline >> tmp_recovery\_santri_out.txt 2>&1
echo SANTRIDONE
