<template>
  <!-- Layar kunci (sidik jari / Face ID) — menutupi Portal saja; wilayah publik tetap terbuka. -->
  <div
    v-if="tampil"
    class="kunci-aplikasi fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 px-8 text-white text-center"
    role="dialog"
    aria-modal="true"
    aria-label="Aplikasi terkunci"
  >
    <img src="/logo.png" alt="" class="w-20 h-20 object-contain" />
    <div>
      <p class="text-xl font-black">{{ namaApp }}</p>
      <p class="text-sm text-white/80 mt-1">Terkunci. Buka dengan sidik jari atau wajah.</p>
    </div>
    <button
      v-haptic
      type="button"
      class="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center text-4xl cursor-pointer disabled:opacity-60"
      :disabled="kunci.memverifikasi"
      aria-label="Buka dengan sidik jari"
      @click="coba"
    >
      <i class="fas fa-fingerprint"></i>
    </button>
    <p v-if="gagal" class="text-xs text-amber-200">
      Belum berhasil. Ketuk ikon untuk mencoba lagi.
    </p>
    <div class="flex flex-col gap-3 text-sm font-bold">
      <button type="button" class="cursor-pointer underline" @click="keBeranda">
        Ke Beranda umum
      </button>
      <button type="button" class="cursor-pointer text-white/75" @click="keluar">
        Masuk dengan akun lain
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKunciAplikasiStore } from '@/stores/kunciAplikasi'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { tampilkanKunci } from '@/utils/kunciAplikasi'

const kunci = useKunciAplikasiStore()
const auth = useAuthStore()
const settings = useSettingsStore()
const route = useRoute()
const router = useRouter()
const gagal = ref(false)

const namaApp = computed(
  () => settings.settings?.txtHeaderBar || settings.settings?.txtAppName || 'Ammu Online'
)
const tampil = computed(() =>
  tampilkanKunci({ terkunci: kunci.terkunci, rutePublik: !!route.meta?.public })
)

async function coba() {
  gagal.value = !(await kunci.buka())
}
// Begitu layar kunci muncul, langsung tampilkan dialog sidik jari (tak perlu ketuk dulu).
watch(
  tampil,
  (v) => {
    gagal.value = false
    if (v) coba()
  },
  { immediate: true }
)

function keBeranda() {
  router.push('/umum')
}
async function keluar() {
  kunci.terkunci = false
  await auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.kunci-aplikasi {
  background:
    var(--pola-berlian) 0 0 / 28px 28px,
    linear-gradient(180deg, #0f766e 0%, #134e4a 100%);
  padding-top: env(safe-area-inset-top);
  padding-bottom: calc(2 * env(safe-area-inset-bottom, 0px));
  /* Turun melewati dasar viewport: menutup celah bug iOS 26 PWA (lihat main.css). */
  bottom: calc(-1 * env(safe-area-inset-bottom, 0px));
}
</style>
