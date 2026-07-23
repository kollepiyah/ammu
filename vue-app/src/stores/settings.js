// Settings store — `savedSettings` di legacy
// Halaman 'pengaturan-web' adalah PoC migration pertama
// v.61.0526: SYNC FIX — legacy Pengaturan save ke settings/general, Vue baca dari sini.
// Tetap baca settings/web untuk Vue-only settings (Pengaturan PoC Vue), merge keduanya.
// Subscribe ke 'general' real-time supaya kalibrasi Hijri / kop / logo update otomatis di Vue.
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getOne, mergeOne, subscribeDoc } from '@/services/db'

const SETTINGS_DOC_ID_VUE = 'web' // Firestore: settings/web (Vue Pengaturan PoC)
const SETTINGS_DOC_ID_LEGACY = 'general' // Firestore: settings/general (legacy Pengaturan Web — source of truth)
const DEFAULT_SETTINGS = {
  // v.20.74.4.0526: Branding default "Ammu Online" (was "Portal MU" — kyai req)
  txtAppName: 'Ammu Online',
  txtHeaderBar: 'Ammu Online',
  appTitle: 'Ammu Online — Pondok Pesantren Mambaul Ulum',
  kopLine1: 'PONDOK PESANTREN MAMBAUL ULUM',
  kopLine2: 'PORTAL PRESTASI QIRAATI',
  kopLine3: '',
  kopLine4: '',
  logoUrl: '',
  logoKop: '',
  logoQiraati: '',
  alamat: '',
  noTelp: '',
  fiturBeranda: true,
  fiturKalender: true,
  fiturKritikSaran: true,
  fiturPengaduan: true,
  fiturNotifikasi: true,
  namaChannel: 'Al Manshur Channel',
  // v.21.10.0526: Ma'had tagihan template + sub-kategori (kyai spec final)
  mahad_tagihan_template: [], // [{ kategori: 'makan', nominal_default: 0 }]
  mahad_sub_kategori: [], // ['makan', 'listrik', 'air', dst]
  tarif_fullday_default: 0, // Fullday extra fix nominal (admin input)
  // v.100 Batch11: integrasi Google Sheet (Apps Script Web App) — kirim laporan rapi mirip PDF
  gsheetUrl: '',
  gsheetToken: ''
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref({ ...DEFAULT_SETTINGS })
  const isLoading = ref(false)
  const error = ref(null)
  // true HANYA setelah settings sekali berhasil dibaca dari DB. Selama false,
  // `settings` masih DEFAULT_SETTINGS — bukan nilai asli — jadi HARAM ditulis balik (lihat save()).
  const isLoaded = ref(false)
  let unsubscribe = null

  // Getters
  const kopLines = computed(() =>
    [
      settings.value.kopLine1,
      settings.value.kopLine2,
      settings.value.kopLine3,
      settings.value.kopLine4
    ].filter(Boolean)
  )

  // v.61.0526: Track 2 subscription handles (web + general docs)
  let unsubscribeGeneral = null

  // Actions
  // v.47.0526: silent retry on offline error — Firestore akan delivery via subscribe() saat reconnect
  // v.61.0526: Load BOTH settings/general (legacy source of truth) + settings/web (Vue PoC), merge keduanya

  // Promise load yang sedang berjalan, dipakai untuk dedup.
  //
  // FIX bug "edit apapun lalu refresh balik ke default": dedup dulu `if (isLoading.value) return`,
  // yang membuat pemanggil yang meng-`await load()` LANGSUNG lanjut tanpa menunggu fetch selesai,
  // lalu menghidrasi form dari store yang masih DEFAULT_SETTINGS. main.js menembak load() tanpa
  // await tepat sebelum app.mount(), jadi view yang mount saat boot SELALU kena. Paling parah di
  // Electron: bundle di-load dari file:// (disk lokal) sehingga boot mendahului fetch jaringan,
  // bikin race-nya kalah terus. Antre ke promise yang sama, jangan kabur.
  let _inflight = null

  async function load(retryCount = 0) {
    if (_inflight) return _inflight
    _inflight = _doLoad(retryCount)
    try {
      return await _inflight
    } finally {
      _inflight = null
    }
  }

  async function _doLoad(retryCount) {
    isLoading.value = true
    error.value = null
    try {
      // getOne pakai maybeSingle(): baris yang memang TIDAK ADA -> null tanpa error. Jadi
      // error di sini = baca GAGAL (jaringan/RLS/sesi mati). Dulu di-`.catch(() => null)`,
      // sehingga gagal-baca tak bisa dibedakan dari baris-kosong dan settings ditimpa
      // DEFAULT_SETTINGS diam-diam — jalur KEDUA menuju gejala "balik ke default".
      const [legacyData, vueData] = await Promise.all([
        getOne('settings', SETTINGS_DOC_ID_LEGACY),
        getOne('settings', SETTINGS_DOC_ID_VUE)
      ])
      // Merge: DEFAULT < vueData < legacyData (legacy menang karena live source of truth)
      settings.value = {
        ...DEFAULT_SETTINGS,
        ...(vueData || {}),
        ...(legacyData || {})
      }
      isLoaded.value = true
    } catch (e) {
      // Regex diperluas: kode 'unavailable' itu istilah Firestore & tak pernah cocok dgn error
      // Supabase, jadi retry-nya dulu praktis mati. Error jaringan supabase-js datang sbg
      // "Failed to fetch"/"NetworkError". Selain jaringan (mis. ditolak RLS) JANGAN diulang —
      // hasilnya akan sama saja dan cuma menunda pesan error ke user.
      const isOffline =
        e?.code === 'unavailable' || /offline|failed to fetch|network/i.test(e?.message || '')
      if (isOffline && retryCount < 2) {
        isLoading.value = false
        await new Promise((r) => setTimeout(r, 1500))
        return _doLoad(retryCount + 1)
      }
      error.value = e.message || String(e)
      if (!isOffline) {
        console.error('[settings/load]', e)
      }
    } finally {
      isLoading.value = false
    }
  }

  function subscribe() {
    // v.61.0526: subscribe ke kedua doc — general (legacy) + web (Vue PoC)
    if (!unsubscribe) {
      unsubscribe = subscribeDoc('settings', SETTINGS_DOC_ID_VUE, (data) => {
        if (data) settings.value = { ...settings.value, ...data, ...(_lastLegacyData || {}) }
      })
    }
    if (!unsubscribeGeneral) {
      unsubscribeGeneral = subscribeDoc('settings', SETTINGS_DOC_ID_LEGACY, (data) => {
        if (data) {
          _lastLegacyData = data
          // Legacy data overrides Vue (legacy = source of truth)
          settings.value = { ...settings.value, ...data }
        }
      })
    }
  }

  let _lastLegacyData = null

  function unsubscribeNow() {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
    if (unsubscribeGeneral) {
      unsubscribeGeneral()
      unsubscribeGeneral = null
    }
  }

  async function save(patch) {
    // `merged` di bawah dibangun DI ATAS settings.value, dan mergeOne menimpakannya ke DB.
    // Kalau store belum pernah ter-load, settings.value masih DEFAULT_SETTINGS -> menyimpan
    // SATU field akan ikut menimpa ~25 field lain di DB (kopLine1, alamat, dst) dengan default.
    // Muat dulu; kalau tetap gagal, batalkan daripada merusak data tersimpan.
    if (!isLoaded.value) await load()
    if (!isLoaded.value) {
      throw new Error(
        'Pengaturan belum termuat dari server — penyimpanan dibatalkan supaya nilai yang sudah ada tidak tertimpa default. Periksa koneksi lalu coba lagi.'
      )
    }
    isLoading.value = true
    error.value = null
    try {
      const merged = { ...settings.value, ...patch }
      // v.21.105.0527: save ke KEDUA doc.
      // settings/general (legacy, source of truth) supaya semua consumer
      // termasuk legacy Pengaturan Web v0 ikut update.
      // settings/web (Vue PoC) tetap sbg backup/audit.
      // Sebelumnya hanya save ke /web → legacy /general overwrite di subscribe
      // → kalibrasiHijri, kop, dll tampak "tidak tersimpan" padahal sudah.
      await Promise.all([
        mergeOne('settings', SETTINGS_DOC_ID_LEGACY, merged),
        mergeOne('settings', SETTINGS_DOC_ID_VUE, merged)
      ])
      settings.value = merged
    } catch (e) {
      error.value = e.message || String(e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  function reset() {
    settings.value = { ...DEFAULT_SETTINGS }
  }

  return {
    settings,
    isLoading,
    isLoaded,
    error,
    kopLines,
    load,
    subscribe,
    unsubscribeNow,
    save,
    reset
  }
})
