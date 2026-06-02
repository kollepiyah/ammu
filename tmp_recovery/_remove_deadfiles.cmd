@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" rm -q vue-app/src/composables/useDiniyahSchema.js vue-app/src/composables/useFieldSchema.js vue-app/src/composables/useFormValidation.js vue-app/src/composables/useKelas.js vue-app/src/composables/usePrinter.js vue-app/src/composables/useRapor.js vue-app/src/utils/rekapBulanan.js vue-app/src/utils/v21_61_pkbm_split.js
"%GIT%" commit --no-verify -F tmp_recovery\msg_deadfiles.txt
"%GIT%" log --oneline -3
endlocal
pause
