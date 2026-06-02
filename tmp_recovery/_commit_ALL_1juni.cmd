@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
echo ===== Commit 1/4: cleanup =====
"%GIT%" add -- vue-app/src/views/MasterDataView.vue vue-app/src/composables/useLembaga.js vue-app/src/composables/useSantri.js vue-app/src/composables/useGuru.js vue-app/src/views/GuruView.vue vue-app/src/views/SantriView.vue vue-app/src/views/RaporView.vue vue-app/src/views/StatistikView.vue
"%GIT%" rm -q --ignore-unmatch -- vue-app/src/utils/tpqShift.js
"%GIT%" commit --no-verify -F tmp_recovery\msg_cleanup.txt -- vue-app/src/views/MasterDataView.vue vue-app/src/composables/useLembaga.js vue-app/src/composables/useSantri.js vue-app/src/composables/useGuru.js vue-app/src/views/GuruView.vue vue-app/src/views/SantriView.vue vue-app/src/views/RaporView.vue vue-app/src/views/StatistikView.vue vue-app/src/utils/tpqShift.js
echo ===== Commit 2/4: corruptfix =====
"%GIT%" add -- vue-app/src/views/PengaturanView.vue vue-app/src/views/PosSantriView.vue vue-app/src/views/PpdbAdminView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_corruptfix.txt -- vue-app/src/views/PengaturanView.vue vue-app/src/views/PosSantriView.vue vue-app/src/views/PpdbAdminView.vue
echo ===== Commit 3/4: hapus dead file =====
"%GIT%" rm -q vue-app/src/composables/useDiniyahSchema.js vue-app/src/composables/useFieldSchema.js vue-app/src/composables/useFormValidation.js vue-app/src/composables/useKelas.js vue-app/src/composables/usePrinter.js vue-app/src/composables/useRapor.js vue-app/src/utils/rekapBulanan.js vue-app/src/utils/v21_61_pkbm_split.js
"%GIT%" commit --no-verify -F tmp_recovery\msg_deadfiles.txt
echo ===== Commit 4/4: quickwins =====
"%GIT%" add -- firestore.rules vue-app/src/views/TabunganView.vue vue-app/src/views/RiwayatSantriView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_quickwins.txt -- firestore.rules vue-app/src/views/TabunganView.vue vue-app/src/views/RiwayatSantriView.vue
"%GIT%" log --oneline -6
endlocal
pause
