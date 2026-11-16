// Konteks rombel yang dipakai bersama seluruh layar (Kyai, 17 Nov 2026).
//
// `ownsNgaji` dan `kelasKeyQiraati` butuh daftar rombel untuk tahu bahwa santri yang cuma
// diisi salah satu dari pasangan guru tetap milik keduanya. Daftar itu kecil (satu baris per
// kelas) dan jarang berubah, jadi ditarik SEKALI lalu dipakai ulang semua layar — bukan
// sekali per layar. Beranda, Absensi, Rapor, dan Naik Kelas bisa dibuka berurutan dalam satu
// sesi; menariknya berulang kali hanya menghabiskan egress tanpa guna.
//
// Gagal menarik BUKAN keadaan darurat: konteks kosong berarti aturan lama yang berlaku,
// dan layarnya tetap jalan seperti sebelum rombel ada.
import { ref, computed } from 'vue'
import { getAll } from '@/services/db'
import { konteksRombel } from '@/utils/rombel'

const _rombel = ref([])
let _janji = null // satu penarikan dipakai bersama semua pemanggil yang datang berbarengan

/** Pastikan daftar rombel sudah ada. `paksa` untuk menarik ulang sesudah rombel diubah. */
export function muatRombel(paksa = false) {
  if (paksa) _janji = null
  if (!_janji) {
    _janji = getAll('rombel')
      .then((r) => {
        _rombel.value = Array.isArray(r) ? r : []
      })
      .catch(() => {
        _rombel.value = []
        _janji = null // biar bisa dicoba lagi nanti
      })
  }
  return _janji
}

export function useKonteksRombel({ muatOtomatis = true } = {}) {
  if (muatOtomatis) muatRombel()
  const rombel = computed(() => _rombel.value)
  const ctxRombel = computed(() => konteksRombel(_rombel.value))
  return { rombel, ctxRombel, muatRombel }
}
