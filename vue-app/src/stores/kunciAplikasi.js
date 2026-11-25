// Kunci aplikasi dengan sidik jari / Face ID (Kyai 25 Nov 2026) — state se-aplikasi. Aturannya di
// utils/kunciAplikasi (murni + tes), platformnya di services/biometrik. Hanya Android & PWA.
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { perluDikunci, kunciSetelan } from '@/utils/kunciAplikasi'
import { pakaiWilayahPublik } from '@/utils/wilayahPublik'
import {
  cekBiometrik,
  daftarkanBiometrik,
  verifikasiBiometrik,
  lupakanBiometrik
} from '@/services/biometrik'

export const useKunciAplikasiStore = defineStore('kunciAplikasi', () => {
  const auth = useAuthStore()
  const uid = computed(() => String(auth.sesiAktif?.id || ''))
  const versi = ref(0) // dipicu ulang saat setelan berubah (localStorage tak reaktif)
  const terkunci = ref(false)
  const memverifikasi = ref(false)
  let _tersembunyiSejak = 0
  // Ganti akun / keluar / masuk = autentikasi baru: jangan tampilkan kunci milik sesi sebelumnya.
  watch(uid, () => {
    terkunci.value = false
  })
  let _mulai = false

  const aktif = computed(() => {
    void versi.value // dibaca supaya computed ini ikut diperbarui saat setelan berubah
    if (!uid.value || !pakaiWilayahPublik()) return false
    try {
      return localStorage.getItem(kunciSetelan(uid.value)) === '1'
    } catch {
      return false
    }
  })

  function _simpan(v) {
    try {
      if (v) localStorage.setItem(kunciSetelan(uid.value), '1')
      else localStorage.removeItem(kunciSetelan(uid.value))
    } catch {
      /* noop */
    }
    versi.value++
  }

  /** Dipanggil sekali dari App.vue: kunci saat dibuka, dan saat kembali sesudah lama di latar. */
  function mulai() {
    if (_mulai) return
    _mulai = true
    terkunci.value = perluDikunci({
      aktif: aktif.value,
      adaSesi: !!auth.sesiAktif,
      dibukaUlang: true
    })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        _tersembunyiSejak = Date.now()
        return
      }
      const lama = _tersembunyiSejak ? Date.now() - _tersembunyiSejak : 0
      _tersembunyiSejak = 0
      if (perluDikunci({ aktif: aktif.value, adaSesi: !!auth.sesiAktif, tersembunyiMs: lama }))
        terkunci.value = true
    })
  }

  async function buka() {
    if (memverifikasi.value) return false
    memverifikasi.value = true
    try {
      const ok = await verifikasiBiometrik(uid.value)
      if (ok) terkunci.value = false
      return ok
    } finally {
      memverifikasi.value = false
    }
  }

  /** Nyalakan: cek perangkat lalu verifikasi sekali. Hasil { ok, pesan }. */
  async function aktifkan() {
    const cek = await cekBiometrik()
    if (!cek.ok) return { ok: false, pesan: cek.alasan }
    try {
      const ok = await daftarkanBiometrik(uid.value, auth.sesiAktif?.nama)
      if (!ok) return { ok: false, pesan: 'Verifikasi dibatalkan.' }
      _simpan(true)
      return { ok: true, pesan: `Kunci ${cek.label} aktif.` }
    } catch {
      return { ok: false, pesan: 'Verifikasi dibatalkan atau gagal.' }
    }
  }

  function nonaktifkan() {
    lupakanBiometrik(uid.value)
    _simpan(false)
    terkunci.value = false
  }

  return { aktif, terkunci, memverifikasi, mulai, buka, aktifkan, nonaktifkan }
})
