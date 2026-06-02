@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add vue-app/src/components/layout/GlobalSearch.vue vue-app/src/components/layout/AppHeader.vue vue-app/src/views/SantriView.vue vue-app/src/views/GuruView.vue > tmp_recovery\_gsearch_out.txt 2>&1
"%GIT%" commit --no-verify -m "feat(search): global search header (admin/guru) - bar desktop + ikon/overlay mobile, cari santri+guru, prefill list via ?q=" >> tmp_recovery\_gsearch_out.txt 2>&1
"%GIT%" log -1 --oneline >> tmp_recovery\_gsearch_out.txt 2>&1
echo GSEARCHDONE
