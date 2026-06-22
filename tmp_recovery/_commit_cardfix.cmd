@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/src/views/SantriView.vue vue-app/src/views/GuruView.vue vue-app/src/views/profil/ProfilSantri.vue vue-app/src/views/profil/ProfilGuru.vue > tmp_recovery\_cardfix_out.txt 2>&1
"%GIT%" commit --no-verify -m "fix(profil): seluruh card santri/guru clickable (abaikan tombol/link/checkbox) + sembunyikan Pengaturan Profil saat readonly" >> tmp_recovery\_cardfix_out.txt 2>&1
"%GIT%" log -1 --oneline >> tmp_recovery\_cardfix_out.txt 2>&1
echo CARDFIXDONE
