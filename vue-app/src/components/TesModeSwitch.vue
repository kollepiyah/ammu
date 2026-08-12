<script setup>
// Saklar Qiraati | Sekolah di kepala halaman Tes Kenaikan.
//
// Kyai memintanya "di menu Tes Kenaikan tapi halaman berbeda bernama Sekolah", jadi
//   menunya tetap SATU dan saklar inilah pembedanya. Sisi Sekolah adalah rute & berkas
//   tersendiri (/tes-sekolah) supaya TesKenaikanView yang sudah ~1.800 baris tak
//   bertambah gemuk, dan supaya keduanya tetap bisa di-deep-link.
//
// Tombol "Sekolah" hanya muncul untuk yang berhak — lihat bolehTesSekolah():
//   admin penuh, guru penguji yang ditunjuk, atau wali kelas sekolah. Guru ngaji
//   murni tak melihat saklar ini sama sekali, persis permintaan Kyai
//   ("hanya muncul di guru sekolah yang ada fitur tersebut, tidak di semua").
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { subscribeDoc } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { bacaMateriTes, bolehTesSekolah } from '@/utils/tesSekolah'

const props = defineProps({
  /** 'qiraati' | 'sekolah' — sisi yang sedang dibuka. */
  aktif: { type: String, required: true }
})

const auth = useAuthStore()
const { santriRaw } = useSantri()
const materi = ref([])
let _unsub = null

onMounted(() => {
  _unsub = subscribeDoc('master', 'materi_tes', (doc) => {
    materi.value = doc === null ? [] : bacaMateriTes(doc)
  })
})
onUnmounted(() => {
  if (_unsub) {
    try {
      _unsub()
    } catch (e) {
      /* noop */
    }
  }
})

const boleh = computed(() => bolehTesSekolah(auth.sesiAktif, materi.value, santriRaw.value))
</script>

<template>
  <!-- Kalau tak berhak, saklarnya tak dirender sama sekali: halaman Qiraati tampak
       persis seperti sebelum fitur ini ada. -->
  <nav
    v-if="boleh"
    aria-label="Jenis tes"
    class="inline-flex p-1 gap-1 rounded-xl bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)]"
  >
    <RouterLink
      to="/tes-kenaikan"
      :aria-current="props.aktif === 'qiraati' ? 'page' : undefined"
      :class="[
        'px-3.5 py-1.5 rounded-lg text-xs font-black transition-all duration-150 cursor-pointer focus:ring-2 focus:ring-teal-400 focus:outline-none',
        props.aktif === 'qiraati'
          ? 'bg-teal-600 text-white shadow-sm'
          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
      ]"
    >
      <i class="fas fa-book-quran mr-1" aria-hidden="true"></i>Qiraati
    </RouterLink>
    <RouterLink
      to="/tes-sekolah"
      :aria-current="props.aktif === 'sekolah' ? 'page' : undefined"
      :class="[
        'px-3.5 py-1.5 rounded-lg text-xs font-black transition-all duration-150 cursor-pointer focus:ring-2 focus:ring-teal-400 focus:outline-none',
        props.aktif === 'sekolah'
          ? 'bg-teal-600 text-white shadow-sm'
          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
      ]"
    >
      <i class="fas fa-school mr-1" aria-hidden="true"></i>Sekolah
    </RouterLink>
  </nav>
</template>
