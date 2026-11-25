// Langkah di dalam satu halaman (pilih kategori → lembaga → isi) dicatat sebagai ?langkah=
// di riwayat, supaya tombol/geser kembali HP (Android & PWA) mundur SATU langkah — bukan
// keluar halaman. Kyai 25 Nov 2026: tombol "Kembali"/"Pilih Lembaga Lain" di layar disembunyikan
// di HP, jadi kembali HP-lah satu-satunya jalan mundur.
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * @param {import('vue').Ref<string>} langkah  state langkah halaman
 * @param {string} awal  nilai langkah pertama (tanpa ?langkah)
 * @param {(tujuan: string) => void} keLangkah  pindahkan state ke langkah `tujuan` saat mundur
 */
export function useLangkahRiwayat(langkah, awal, keLangkah) {
  const route = useRoute()
  const router = useRouter()
  let menyamakan = false

  // Maju lewat klik → catat di riwayat. Mundur lewat tombol di layar → ganti tanpa entri baru.
  watch(langkah, (baru, lama) => {
    if (menyamakan) return
    const diUrl = route.query.langkah || awal
    if (baru === diUrl) return
    const q = { ...route.query }
    if (baru === awal) delete q.langkah
    else q.langkah = baru
    const maju = lama === diUrl
    ;(maju ? router.push({ query: q }) : router.replace({ query: q })).catch(() => {})
  })

  // Kembali HP / browser → riwayat mundur → samakan state.
  watch(
    () => route.query.langkah,
    (q) => {
      const tujuan = q || awal
      if (tujuan === langkah.value) return
      menyamakan = true
      try {
        keLangkah(tujuan)
      } finally {
        menyamakan = false
      }
    }
  )
}
