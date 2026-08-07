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
// A1 (audit 29 Jul): config keuangan SENSITIF (tarif syahriyah/bisyaroh, nominal_per_santri,
//   beban mengajar, tunjangan/potongan per-guru) DIPISAH ke settings/keuangan yang RLS-nya
//   HANYA {super,admin,admin_keuangan} — supaya TAK terbaca anon lewat general/web (PSB+login
//   wajib bisa baca general → tak bisa ditutup). Store me-merge key ini ke `settings` sehingga
//   pembaca (POS/Bisyaroh/Pengaturan) tak berubah; peran non-keuangan dapat null → key absen.
const SETTINGS_DOC_ID_KEUANGAN = 'keuangan'
const KEUANGAN_KEYS = [
  'keuTagihanJenis',
  'keuTagihanJenisByTA',
  'keu_jenis_tagihan',
  'keuBisyarohJenis',
  'bebanMengajar',
  'master_tunjangan',
  'master_potongan',
  // Potongan POS (per baris transaksi santri). Finance-only sama seperti kunci lain di
  //   sini — jangan pindah ke general/web yang anon-readable.
  'keuPotonganPos'
]

/**
 * Buang kunci keuangan dari data general/web sebelum di-merge (Kyai, 7 Agu 2026).
 *
 * Migrasi 29 Jul sudah menghapus kunci ini dari general/web, dan kode di bawah dulu
 * MENGANDALKAN itu ("kunci keuangan tak ada di general lagi"). Diperiksa 7 Agu 2026 lewat
 * anon REST: kunci-kunci itu ADA LAGI di general, berisi DEFAULT KOSONG — klien lawas yang
 * tak kenal row `keuangan` menerbitkannya kembali saat "Simpan Semua". Selama salinan itu
 * ikut ter-merge, satu urutan yang meleset saja (kunci `keuangan` terbaca belakangan, atau
 * gagal terbaca sesaat) sudah cukup untuk membuat POS & Bisyaroh memakai daftar jenis
 * DEFAULT — tarif salah di layar kasir, dan itu uang riil.
 *
 * Sesudah ini row `keuangan` adalah SATU-SATUNYA sumber kunci tersebut. Peran yang tak
 * boleh membacanya mendapat kunci ABSEN (perilaku yang memang dirancang A1), bukan
 * salinan publik yang basi.
 */
function tanpaKunciKeuangan(data) {
  if (!data || typeof data !== 'object') return data
  let salin = null
  for (const k of KEUANGAN_KEYS) {
    if (k in data) {
      if (!salin) salin = { ...data }
      delete salin[k]
    }
  }
  return salin || data
}
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
  // true bila row `settings/keuangan` BENAR-BENAR terbaca (bukan null). Sejak kunci
  //   keuangan cuma bersumber dari row itu, false berarti seluruh config keuangan di layar
  //   ini KOSONG — bukan "memang belum diisi". Pengaturan Keuangan memakainya untuk menolak
  //   menyimpan, supaya layar kosong tak menimpa config yang sungguhan.
  const keuanganTerbaca = ref(false)
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
  let unsubscribeKeuangan = null // A1: settings/keuangan (finance-only)
  let _lastKeuData = null

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
      const [legacyData, vueData, keuData] = await Promise.all([
        getOne('settings', SETTINGS_DOC_ID_LEGACY),
        getOne('settings', SETTINGS_DOC_ID_VUE),
        // A1: null utk anon/peran non-keuangan (RLS filter → maybeSingle null, BUKAN error)
        getOne('settings', SETTINGS_DOC_ID_KEUANGAN)
      ])
      // Merge: DEFAULT < vueData < legacyData < keuData. Kunci keuangan DIBUANG dari
      //   vueData/legacyData — bukan sekadar kalah urutan — supaya salinan basi di row
      //   publik tak pernah bisa dipakai walau row `keuangan` gagal/terlambat terbaca.
      settings.value = {
        ...DEFAULT_SETTINGS,
        ...(tanpaKunciKeuangan(vueData) || {}),
        ...(tanpaKunciKeuangan(legacyData) || {}),
        ...(keuData || {})
      }
      _lastKeuData = keuData || null
      keuanganTerbaca.value = !!keuData
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
        if (data)
          settings.value = {
            ...settings.value,
            ...tanpaKunciKeuangan(data),
            ...(_lastLegacyData || {})
          }
      })
    }
    if (!unsubscribeGeneral) {
      unsubscribeGeneral = subscribeDoc('settings', SETTINGS_DOC_ID_LEGACY, (data) => {
        if (data) {
          // Kunci keuangan dibuang di sini, bukan ditimpa balik oleh _lastKeuData:
          //   kalau row `keuangan` belum/tak terbaca (_lastKeuData null), menimpa balik
          //   tak terjadi dan salinan basi general-lah yang menang. Itu jalur nyata —
          //   lihat catatan di `tanpaKunciKeuangan`.
          _lastLegacyData = tanpaKunciKeuangan(data)
          settings.value = { ...settings.value, ..._lastLegacyData, ...(_lastKeuData || {}) }
        }
      })
    }
    // A1: settings/keuangan (finance-only) — key sensitif; null utk peran lain.
    if (!unsubscribeKeuangan) {
      unsubscribeKeuangan = subscribeDoc('settings', SETTINGS_DOC_ID_KEUANGAN, (data) => {
        if (data) {
          _lastKeuData = data
          keuanganTerbaca.value = true
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
    if (unsubscribeKeuangan) {
      unsubscribeKeuangan()
      unsubscribeKeuangan = null
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
      // A1: pisahkan kunci keuangan SENSITIF — JANGAN ditulis ke general/web yang
      //   anon-readable. Kunci sensitif → settings/keuangan (finance-only).
      const pub = { ...merged }
      const keu = {}
      for (const k of KEUANGAN_KEYS) {
        // Yang ditulis ke row `keuangan` hanya kunci yang MEMANG ada di `patch` — bukan
        //   salinan di memori. Dulu dari `merged`, sehingga menyimpan hal tak terkait
        //   (branding, KKM rapor) ikut menuliskan ULANG seluruh config keuangan dari
        //   snapshot yang bisa saja sudah basi — perangkat lain menyunting jenis, halaman
        //   ini menyimpan logo, jenis itu mundur tanpa jejak. Tak ada pemanggil `save()`
        //   yang mengirim kunci keuangan (Pengaturan Keuangan menulis sendiri), jadi ini
        //   murni menutup jalur kecelakaan.
        if (k in patch) keu[k] = patch[k]
        delete pub[k]
      }
      // v.21.105.0527: save ke KEDUA doc.
      // settings/general (legacy, source of truth) supaya semua consumer
      // termasuk legacy Pengaturan Web v0 ikut update.
      // settings/web (Vue PoC) tetap sbg backup/audit.
      // Sebelumnya hanya save ke /web → legacy /general overwrite di subscribe
      // → kalibrasiHijri, kop, dll tampak "tidak tersimpan" padahal sudah.
      const writes = [
        mergeOne('settings', SETTINGS_DOC_ID_LEGACY, pub),
        mergeOne('settings', SETTINGS_DOC_ID_VUE, pub)
      ]
      if (Object.keys(keu).length) writes.push(mergeOne('settings', SETTINGS_DOC_ID_KEUANGAN, keu))
      await Promise.all(writes)
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
    keuanganTerbaca.value = false
  }

  return {
    settings,
    isLoading,
    isLoaded,
    keuanganTerbaca,
    error,
    kopLines,
    load,
    subscribe,
    unsubscribeNow,
    save,
    reset
  }
})
