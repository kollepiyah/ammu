@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/views/MasterDataView.vue vue-app/src/composables/useLembaga.js vue-app/src/composables/useSantri.js vue-app/src/composables/useGuru.js vue-app/src/views/GuruView.vue vue-app/src/views/SantriView.vue vue-app/src/views/RaporView.vue vue-app/src/views/StatistikView.vue
"%GIT%" rm -q --ignore-unmatch -- vue-app/src/utils/tpqShift.js
"%GIT%" commit --no-verify -F tmp_recovery\msg_cleanup.txt -- vue-app/src/views/MasterDataView.vue vue-app/src/composables/useLembaga.js vue-app/src/composables/useSantri.js vue-app/src/composables/useGuru.js vue-app/src/views/GuruView.vue vue-app/src/views/SantriView.vue vue-app/src/views/RaporView.vue vue-app/src/views/StatistikView.vue vue-app/src/utils/tpqShift.js
"%GIT%" log --oneline -1
endlocal
pause
