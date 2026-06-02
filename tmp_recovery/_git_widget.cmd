@echo off
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
set "OUT=D:\Aplikasi Project\Portal MU\tmp_recovery\_widget.txt"
echo ==== commits w/ 'widget' in message ==== > "%OUT%"
"%GIT%" log --all -i --grep=widget --oneline >> "%OUT%" 2>&1
echo. >> "%OUT%"
echo ==== pickaxe AppWidgetProvider ==== >> "%OUT%"
"%GIT%" log --all -i -S "AppWidgetProvider" --oneline >> "%OUT%" 2>&1
echo. >> "%OUT%"
echo ==== pickaxe appwidget ==== >> "%OUT%"
"%GIT%" log --all -i -S "appwidget" --oneline >> "%OUT%" 2>&1
echo. >> "%OUT%"
echo ==== commits touching *Widget*/*widget* ==== >> "%OUT%"
"%GIT%" log --all --oneline -- "*Widget*" "*widget*" "*appwidget*" >> "%OUT%" 2>&1
echo. >> "%OUT%"
echo ==== HEAD tree widget files ==== >> "%OUT%"
"%GIT%" ls-tree -r --name-only HEAD > "%OUT%.tree" 2>&1
findstr /i widget "%OUT%.tree" >> "%OUT%" 2>&1
echo. >> "%OUT%"
echo ==== reflog 30 ==== >> "%OUT%"
"%GIT%" reflog --oneline -30 >> "%OUT%" 2>&1
echo DONE >> "%OUT%"
