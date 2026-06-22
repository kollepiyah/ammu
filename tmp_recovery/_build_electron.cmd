@echo off
setlocal
cd /d "D:\Aplikasi Project\Portal MU"
echo === [1/3] Build Vue (mode electron, base relatif) ===
call npm run build:electron --prefix vue-app
if errorlevel 1 goto :err
echo === [2/3] Mirror dist -^> electron\app ===
robocopy "vue-app\dist" "vue-app\electron\app" /MIR
echo === [3/3] Build installer NSIS (tsc + electron-builder) ===
cd vue-app\electron
call npm run electron:make
if errorlevel 1 goto :err
echo.
echo SELESAI. Installer ada di: vue-app\electron\dist\ (v7.0.626)
goto :done
:err
echo GAGAL - cek error di atas
:done
endlocal
pause
