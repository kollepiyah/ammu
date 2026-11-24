// Data layar publik: tampilkan salinan di HP dulu, segarkan dari server bila basi.
// Sengaja tanpa realtime (blueprint 4.6) — egress & kuota koneksi Supabase Free terbatas.
import { ref } from 'vue'

const AWALAN = 'ammu_tamu_'

export function useDataTamu(kunci, ambil, { umurMs = 6 * 60 * 60 * 1000 } = {}) {
  const data = ref(null)
  const loading = ref(true)
  const galat = ref(null)
  let diambilPada = 0

  try {
    const simpan = JSON.parse(localStorage.getItem(AWALAN + kunci) || 'null')
    if (simpan) {
      data.value = simpan.isi
      diambilPada = simpan.waktu || 0
      loading.value = false
    }
  } catch {
    /* salinan rusak -> abaikan */
  }

  async function segarkan(paksa = false) {
    if (!paksa && data.value != null && Date.now() - diambilPada < umurMs) return
    galat.value = null
    if (data.value == null) loading.value = true
    try {
      const isi = await ambil()
      data.value = isi
      diambilPada = Date.now()
      try {
        localStorage.setItem(AWALAN + kunci, JSON.stringify({ isi, waktu: diambilPada }))
      } catch {
        /* kuota penuh -> tetap jalan tanpa salinan */
      }
    } catch (e) {
      galat.value = e
    } finally {
      loading.value = false
    }
  }

  segarkan()
  return { data, loading, galat, segarkan }
}
