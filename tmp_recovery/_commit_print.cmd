@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/utils/strukBuilder.js vue-app/src/composables/useDesktopPrint.js vue-app/src/views/PosSantriView.vue vue-app/src/components/PrinterSettingsModal.vue vue-app/src/App.vue vue-app/electron/src/preload.ts vue-app/electron/src/index.ts
"%GIT%" commit --no-verify -F tmp_recovery\msg_print.txt -- vue-app/src/utils/strukBuilder.js vue-app/src/composables/useDesktopPrint.js vue-app/src/views/PosSantriView.vue vue-app/src/components/PrinterSettingsModal.vue vue-app/src/App.vue vue-app/electron/src/preload.ts vue-app/electron/src/index.ts
"%GIT%" log --oneline -1
endlocal
pause
