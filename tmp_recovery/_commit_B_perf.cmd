@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
echo ===== Commit 1/2: perf store terpusat =====
"%GIT%" add -- vue-app/src/stores/collections.js vue-app/src/composables/useSantri.js vue-app/src/composables/useGuru.js vue-app/src/composables/useAbsensi.js vue-app/src/composables/useKeuangan.js vue-app/src/composables/useLembaga.js
"%GIT%" commit --no-verify -F tmp_recovery\msg_B.txt -- vue-app/src/stores/collections.js vue-app/src/composables/useSantri.js vue-app/src/composables/useGuru.js vue-app/src/composables/useAbsensi.js vue-app/src/composables/useKeuangan.js vue-app/src/composables/useLembaga.js
echo ===== Commit 2/2: fix deploy script =====
"%GIT%" add -- scripts/deploy-minified.cjs
"%GIT%" commit --no-verify -F tmp_recovery\msg_deployfix.txt -- scripts/deploy-minified.cjs
"%GIT%" log --oneline -3
endlocal
pause
