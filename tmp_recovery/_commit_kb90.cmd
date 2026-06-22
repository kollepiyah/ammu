@echo off
set "PATHEXT=.COM;.EXE;.BAT;.CMD"
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add PROJECT-KNOWLEDGE-BASE.md > tmp_recovery\_kb90_out.txt 2>&1
"%GIT%" commit --no-verify -m "docs(kb): recap sesi v.90.0626 (diniyah per-kelas, anon-auth, toast, splash, jabatan) untuk sesi berikutnya" >> tmp_recovery\_kb90_out.txt 2>&1
"%GIT%" log -1 --oneline >> tmp_recovery\_kb90_out.txt 2>&1
echo KBDONE
