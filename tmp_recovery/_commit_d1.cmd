@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- firestore.rules
"%GIT%" commit --no-verify -F tmp_recovery\msg_d1.txt -- firestore.rules
"%GIT%" log --oneline -1
endlocal
pause
