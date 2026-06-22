@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
set "OUT=D:\Aplikasi Project\Portal MU\tmp_recovery\_w3.txt"
echo ==== d3d60f7: semua file di bawah widgets/ + res widget + TODO ==== > "%OUT%"
"%GIT%" ls-tree -r --name-only d3d60f7 > "%OUT%.tree" 2>&1
echo DONE-TREE >> "%OUT%"
echo ==== HEAD tree (utk bandingkan) ==== >> "%OUT%"
"%GIT%" ls-tree -r --name-only HEAD > "%OUT%.head" 2>&1
echo DONE >> "%OUT%"
