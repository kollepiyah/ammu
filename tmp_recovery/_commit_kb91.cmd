@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add PROJECT-KNOWLEDGE-BASE.md > tmp_recovery\_kb91_out.txt 2>&1
"%GIT%" commit --no-verify -m "docs(kb): recap sesi v.91.0626 (bottom nav, notif page, global search, profil detail, badge tagihan) untuk sesi baru" >> tmp_recovery\_kb91_out.txt 2>&1
"%GIT%" log -1 --oneline >> tmp_recovery\_kb91_out.txt 2>&1
echo KB91DONE
