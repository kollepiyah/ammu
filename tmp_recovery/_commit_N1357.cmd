@echo off
setlocal
set "GIT=C:\Program Files\Git\cmd\git.exe"
cd /d "D:\Aplikasi Project\Portal MU"
"%GIT%" add -- vue-app/src/views/LembagaDetailView.vue vue-app/src/views/RaporView.vue vue-app/src/views/LoginView.vue vue-app/src/views/BukuIndukView.vue vue-app/src/views/GuruFormView.vue vue-app/src/views/JabatanKelolaView.vue vue-app/src/views/KalenderKegiatanView.vue vue-app/src/views/KegiatanPesantrenView.vue vue-app/src/views/LembagaFormView.vue vue-app/src/views/MasterDataView.vue vue-app/src/views/PembayaranView.vue vue-app/src/views/PostsView.vue vue-app/src/views/PpdbDetailView.vue vue-app/src/views/SantriFormView.vue vue-app/src/views/SupervisiView.vue vue-app/src/views/TabunganView.vue vue-app/src/views/TagihanView.vue
"%GIT%" commit --no-verify -F tmp_recovery\msg_N.txt -- vue-app/src/views/LembagaDetailView.vue vue-app/src/views/RaporView.vue vue-app/src/views/LoginView.vue vue-app/src/views/BukuIndukView.vue vue-app/src/views/GuruFormView.vue vue-app/src/views/JabatanKelolaView.vue vue-app/src/views/KalenderKegiatanView.vue vue-app/src/views/KegiatanPesantrenView.vue vue-app/src/views/LembagaFormView.vue vue-app/src/views/MasterDataView.vue vue-app/src/views/PembayaranView.vue vue-app/src/views/PostsView.vue vue-app/src/views/PpdbDetailView.vue vue-app/src/views/SantriFormView.vue vue-app/src/views/SupervisiView.vue vue-app/src/views/TabunganView.vue vue-app/src/views/TagihanView.vue
"%GIT%" log --oneline -1
endlocal
pause
