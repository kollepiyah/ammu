@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
set "OUT=D:\Aplikasi Project\Portal MU\tmp_recovery\_w2.txt"
echo ==== rev-parse + type d3d60f7 ==== > "%OUT%"
"%GIT%" rev-parse d3d60f7 >> "%OUT%" 2>&1
"%GIT%" cat-file -t d3d60f7 >> "%OUT%" 2>&1
echo. >> "%OUT%"
"%GIT%" --no-pager show d3d60f7 --stat --oneline > "%OUT%.stat" 2>&1
"%GIT%" --no-pager show d3d60f7 -p > "%OUT%.full" 2>&1
echo ==== grep appwidget di d3d60f7 (matches) ==== >> "%OUT%"
"%GIT%" --no-pager grep -i -n "appwidget" d3d60f7 >> "%OUT%" 2>&1
echo DONE >> "%OUT%"
