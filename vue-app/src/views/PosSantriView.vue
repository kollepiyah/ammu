<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header — v.98: redundan dgn pita (POS Santri & Riwayat sudah di Keuangan), sembunyikan di Electron -->
    <div
      v-if="!isDesktop"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2">
        <div>
          <h2
            class="text-lg md:text-xl font-black text-[var(--text-primary)] flex items-center gap-2"
          >
            <i class="fas fa-cash-register text-teal-600"></i>POS Santri
          </h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Pembayaran tagihan, syahriyah, tabungan, dll
          </p>
        </div>
        <div class="flex flex-col items-end gap-1">
          <div class="flex items-center gap-1.5">
            <router-link
              v-if="isAdminKeu"
              to="/pos-riwayat"
              class="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1 rounded-full hover:bg-teal-100"
            >
              <i class="fas fa-receipt mr-1"></i>Riwayat
            </router-link>
            <span
              class="text-[10px] font-bold text-teal-700 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 px-2 py-1 rounded-full"
            >
              {{ santriList.length }} santri aktif
            </span>
          </div>
          <span
            v-if="isAdminKeu"
            class="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-full whitespace-nowrap"
            title="Transaksi POS hari ini"
          >
            <i class="fas fa-receipt mr-1"></i>Hari ini: {{ todayStats.count }} ·
            {{ fmtRp(todayStats.total) }}
          </span>
        </div>
      </div>
    </div>

    <!-- v.94.0626: banner cetak struk DIPINDAH ke dalam modal POS (layar sukses) -->

    <!-- Access denied -->
    <div
      v-if="!isAdminKeu"
      class="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-2xl p-5 text-center"
    >
      <i class="fas fa-lock text-3xl text-rose-600 mb-2"></i>
      <p class="text-sm font-bold text-rose-700 dark:text-rose-300">Akses Ditolak</p>
      <p class="text-xs text-rose-600 dark:text-rose-400 mt-1">
        Hanya admin keuangan / super admin yang bisa pakai POS Santri.
      </p>
    </div>

    <!-- Filter bar -->
    <div
      v-if="isAdminKeu"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex flex-col md:flex-row gap-2">
        <div class="relative flex-1">
          <i
            class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
          ></i>
          <input
            v-model="search"
            type="search"
            placeholder="Cari nama, No. Induk, atau WA wali..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        <select
          v-model="filterLembaga"
          class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua Lembaga</option>
          <option v-for="lb in lembagaList" :key="lb" :value="lb">{{ lb }}</option>
        </select>
        <select
          v-model="filterSekolah"
          class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua Sekolah</option>
          <option v-for="sk in sekolahList" :key="sk" :value="sk">{{ sk }}</option>
        </select>
        <label
          class="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-2.5 rounded-xl border border-rose-200 cursor-pointer hover:bg-rose-100"
        >
          <input v-model="filterTunggakan" type="checkbox" class="w-4 h-4 accent-rose-600" />
          Tunggakan saja
        </label>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="isAdminKeu && memuat"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-[var(--border-subtle)] text-center"
    >
      <i class="fas fa-spinner fa-spin text-2xl text-teal-600 mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)]">Memuat data santri...</p>
    </div>

    <!-- Santri grid -->
    <div
      v-if="isAdminKeu && !memuat"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <p
        v-if="filteredSantri.length === 0"
        class="text-center text-[var(--text-tertiary)] py-6 text-sm"
      >
        Tidak ada santri yang cocok.
      </p>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <button
          v-for="s in filteredSantri"
          :key="s.id"
          class="text-left p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 transition cursor-pointer flex items-center gap-2.5 [content-visibility:auto] [contain-intrinsic-size:auto_64px]"
          @click="openModal(s)"
        >
          <div
            class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-700 dark:to-cyan-700 flex items-center justify-center font-black text-teal-700 dark:text-teal-200 flex-shrink-0"
          >
            {{ (s.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-[var(--text-secondary)] truncate">
              {{ s.nis || '—' }}{{ s.lembaga ? ' · ' + s.lembaga : ''
              }}{{ s.kelas ? ' · ' + s.kelas : '' }}
            </p>
            <p
              v-if="tunggakanMap[s.id]?.count > 0"
              class="text-[10px] font-black text-rose-600 mt-0.5"
            >
              <i class="fas fa-exclamation-circle mr-1"></i>
              {{ tunggakanMap[s.id].count }} tagihan · {{ fmtRp(tunggakanMap[s.id].total) }}
            </p>
          </div>
          <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs"></i>
        </button>
      </div>
      <!-- v.1.4.3 (Kyai 14 Sep 2026): semua santri tampil — lihat filteredSantri. Hitungannya
           di sini karena header (yang juga menyebut jumlah) disembunyikan di Electron. -->
      <p
        v-if="filteredSantri.length > 0"
        class="text-center text-[10px] text-[var(--text-tertiary)] mt-3"
      >
        {{ filteredSantri.length }} santri ditampilkan
      </p>
    </div>

    <!-- Transaksi terakhir. v.1.4.3 (Kyai 14 Sep 2026: "admin keu bisa print ulang struk"):
         per TRANSAKSI (dulu per baris buku induk), masing-masing dengan cetak ulang, plus
         tautan ke Riwayat POS yang juga tampil di Electron. -->
    <div
      v-if="isAdminKeu && historiTrx.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <h3 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">
          <i class="fas fa-history text-cyan-600 mr-1"></i>Transaksi Terakhir
        </h3>
        <router-link
          to="/pos-riwayat"
          class="text-[11px] font-bold text-teal-700 dark:text-teal-300 hover:underline"
        >
          Semua riwayat &amp; cetak ulang <i class="fas fa-arrow-right ml-0.5"></i>
        </router-link>
      </div>
      <div class="space-y-1.5">
        <div
          v-for="t in historiTrx"
          :key="t.key"
          class="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--bg-card-elevated)] text-xs"
        >
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate text-[var(--text-primary)]">{{ t.santri_nama }}</p>
            <p class="text-[10px] text-[var(--text-secondary)] truncate">
              {{ t.jenis || '—' }} · {{ fmtTgl(t.tanggal)
              }}<span v-if="t.trx_id"> · {{ t.trx_id }}</span>
            </p>
          </div>
          <span class="font-black text-emerald-600 whitespace-nowrap">{{ fmtRp(t.total) }}</span>
          <div class="flex gap-1 flex-shrink-0">
            <button
              type="button"
              class="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 px-2 py-1 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
              title="Cetak ulang struk PDF ber-KOP"
              aria-label="Cetak ulang struk PDF ber-KOP"
              @click="cetak.cetakUlang(t.rows, 'pdf')"
            >
              <i class="fas fa-file-pdf mr-1"></i>PDF
            </button>
            <button
              type="button"
              class="text-[10px] font-bold text-slate-700 dark:text-slate-200 bg-[var(--bg-muted)] px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
              :title="
                cetak.bisaLangsung
                  ? 'Cetak ulang langsung ke printer'
                  : 'Buka struk dot-matrix (PDF)'
              "
              :aria-label="
                cetak.bisaLangsung
                  ? 'Cetak ulang langsung ke printer'
                  : 'Buka struk dot-matrix (PDF)'
              "
              @click="cetak.cetakUlang(t.rows, 'langsung')"
            >
              <i class="fas fa-print mr-1"></i>Struk
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal POS -->
    <ModalPOS
      :open="modalOpen"
      :santri="selectedSantri"
      :operator="operatorName"
      :all-tagihan="allTagihan"
      :pos-payments="posPayments"
      :saved-trx="lastTrx"
      :saving="posSaving"
      :is-desktop="isDesktop"
      @close="closeModal"
      @simpan="handleSimpan"
      @cetak-pdf="cetakLastPdf"
      @cetak-dot="cetakLastDot"
      @cetak-langsung="cetakLangsung"
      @pengaturan-printer="openPrinterSettings"
    />
  </div>
</template>

<script setup>
// v.21+: POS Santri — kasir cepat pembayaran tagihan/syahriyah/tabungan dengan modal cart.
// Save ke keuangan_buku_induk (sumber='pos_santri') + auto-lunas tagihan terkait.
import { ref, computed, onMounted, watch } from 'vue'
import { useCollectionsStore } from '@/stores/collections' // P5b: santri/guru dari store terpusat
import { useRoute, useRouter } from 'vue-router'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
// v.F6e: adapter Supabase (serverTimestamp = shim ISO string).
import { getOne, queryColl, setOne, updateOne, serverTimestamp } from '@/services/db'
import { sortSantri } from '@/utils/santriSort'
// v.1.4.2: penyaring ⇄ URL lewat sumber tunggal (lihat utils/filterQuery.js).
import { bacaFilterQuery, tulisFilterQuery, queryBerubah } from '@/utils/filterQuery'
import { sisaTagihan } from '@/utils/tagihan'
// K1: pemecahan komponen (sekolah+ngaji) jadi beberapa baris Buku Induk — rumusnya di
//   utils/syahriyah.js yang diuji unit, jangan disalin ke sini.
import { pecahProporsional } from '@/utils/syahriyah'
// Kyai 4 Agu: kas per lembaga — resolver tunggal di utils/kasLembaga (jangan disalin ke sini)
import { petaKasLembaga, kasLembagaBaris } from '@/utils/kasLembaga'
// v.1.2.6: nomor struk anti-kembar + penanda transaksi unik (lihat utils/trxStruk.js)
// v.1.4.3: + perakit struk cetak ulang — satu untuk POS, Riwayat POS, Buku Induk, Uang POS
import { nomorStrukBerikutnya, buatTrxUid, kunciTransaksi } from '@/utils/trxStruk'
import { todayJakarta } from '@/utils/format'
// v.1.4.3 (Kyai 14 Sep 2026): rumus pelunasan pindah ke util yang SAMA dengan sisi hapus,
//   supaya menghapus transaksi mengembalikan tagihan tepat ke angka sebelum dibayar.
import { pelunasanItem, bagiTambahTagihan } from '@/utils/batalBayarTagihan'
import { isElectron } from '@/composables/useDesktopPrint'
import { useCetakStruk } from '@/composables/useCetakStruk'
import { terbilangRupiah } from '@/utils/terbilang'
import { useSettingsStore } from '@/stores/settings'
import { useGedungScope } from '@/composables/useGedungScope'
import ModalPOS from '@/components/pos/ModalPOS.vue'

const auth = useAuthStore()
const toast = useToast()
const settingsStore = useSettingsStore()
// v.1.4.3: satu pintu cetak struk — layar sukses di bawah DAN cetak ulang Transaksi Terakhir
const cetak = useCetakStruk()
// v.111: scope Gedung — admin keuangan ber-gedung hanya transaksi santri gedungnya
const { allowSantri } = useGedungScope()

// AUDIT AGU 2026 (P5b): daftar santri diambil dari store TERPUSAT (stores/collections)
//   yang subscribe SEKALI per sesi + live realtime — bukan getAll penuh setiap kali
//   halaman POS dibuka (539 baris, 580 kB mentah / 41 kB gzip, 53 field per baris).
//   Datanya IDENTIK (store memakai select yang sama), jadi tak ada risiko field hilang;
//   yang hilang cuma pengulangan unduhannya. Bonus di PC kasir: 539 objek reaktif tak
//   dibuat ulang tiap kali halaman dibuka.
const collections = useCollectionsStore()
const santriList = computed(() =>
  sortSantri((collections.santri || []).filter((s) => s.aktif !== false))
)
// Spinner ikut menunggu store: kalau tidak, daftar sempat tampil "Tidak ada santri
// yang cocok" pada sesi yang membuka /pos-santri langsung (store belum terisi).
const memuat = computed(() => loading.value || !collections.isLoaded('santri'))
const loading = ref(true)
const search = ref('')
const filterLembaga = ref('')
const filterSekolah = ref('') // v.110.0626: filter lembaga sekolah (formal) — terpisah dari lembaga ngaji
const selectedSantri = ref(null)
const modalOpen = ref(false)
// v.1.4.3: BARIS buku induk POS terbaru (bukan 5 baris saja) — dikelompokkan jadi transaksi
//   di historiTrx, supaya transaksi berbaris banyak tak terpotong di tengah saat dicetak ulang.
const historiBaris = ref([])
const tunggakanMap = ref({})
const filterTunggakan = ref(false)
// v.107: filter <-> URL query — pertahankan filter saat kembali (mis. dari Riwayat POS).
const _route = useRoute()
const _router = useRouter()
// v.1.4.2: pindah ke utils/filterQuery — bendera `_syncingQuery` yang lama tak pernah
//   benar-benar menjaga (watcher Vue ber-`flush: 'pre'` ANTRE, jadi benderanya sudah
//   kembali false saat callback-nya jalan). Penjaganya kini perbandingan hasil.
//   `tunggakan` disimpan sebagai '1'/'' supaya tetap satu jenis nilai dengan yang lain.
const SPEC_FILTER = [
  { kunci: 'q' },
  { kunci: 'lembaga' },
  { kunci: 'sekolah' },
  { kunci: 'tunggakan' }
]
function syncFiltersFromQuery() {
  const nilai = bacaFilterQuery(_route.query, SPEC_FILTER)
  search.value = nilai.q
  filterLembaga.value = nilai.lembaga
  filterSekolah.value = nilai.sekolah
  filterTunggakan.value = nilai.tunggakan === '1'
}
syncFiltersFromQuery()
watch(() => _route.query, syncFiltersFromQuery)
watch([search, filterLembaga, filterSekolah, filterTunggakan], () => {
  const q = tulisFilterQuery(
    {
      q: search.value,
      lembaga: filterLembaga.value,
      sekolah: filterSekolah.value,
      tunggakan: filterTunggakan.value ? '1' : ''
    },
    SPEC_FILTER,
    _route.query
  )
  if (queryBerubah(_route.query, q)) _router.replace({ query: q }).catch(() => {})
})
// v.1.2.x: matriks POS gaya Braja — kirim SEMUA tagihan santri + pembayaran POS (utk warna sel)
const allTagihan = ref([])
const posPayments = ref([])
const loadingCart = ref(false)
// v.21.87.0527: ringkasan transaksi POS hari ini
const todayStats = ref({ count: 0, total: 0 })
// v.21.91.0527: TTD operator (kasir) — auto dari guru.tanda_tangan
const operatorTtdUrl = ref('')
// v.21.88.0527: transaksi terakhir (utk tombol cetak struk setelah simpan)
const lastTrx = ref(null)
// v.94.0626: status simpan -> disable tombol Simpan + spinner di modal
const posSaving = ref(false)
const isDesktop = isElectron()

const operatorName = computed(() => {
  return auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin'
})

// v.98 fix BUILD: isDesktop sudah dideklarasikan di atas (isElectron()) — hapus deklarasi ganda (cegah "Identifier 'isDesktop' has already been declared").
const isAdminKeu = computed(() => {
  const rs = auth.sesiAktif?.role_sistem || ''
  return auth.sesiAktif?.role === 'admin' || ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
})

// v.1.4.3 (Kyai 14 Sep 2026, audit): tombol "Bayar" di halaman Tagihan kini membuka POS untuk
//   santri itu (`?bayar=<id>`) — modal bayar lama di sana menaikkan `terbayar` tanpa Buku Induk,
//   tanpa struk, tanpa cara bayar. Parameternya dipakai SEKALI lalu dibuang dari URL, supaya
//   kembali ke halaman ini tak membuka modalnya lagi. Santri dicari di store penuh (bukan hanya
//   yang aktif): tunggakan santri yang sudah keluar pun tetap harus bisa dibayar.
const _bayarTertunda = ref(String(_route.query.bayar || ''))
watch(
  () => [_bayarTertunda.value, memuat.value],
  ([sid, sibuk]) => {
    if (!sid || sibuk || !isAdminKeu.value) return
    _bayarTertunda.value = ''
    const { bayar: _dipakai, ...sisa } = _route.query
    _router.replace({ query: sisa }).catch(() => {})
    const s = (collections.santri || []).find((x) => String(x.id) === sid)
    if (!s) {
      toast.warning('Santri pemilik tagihan itu tak ditemukan di data santri.')
      return
    }
    if (!allowSantri(s.id)) {
      toast.warning('Santri itu di luar gedung Anda.')
      return
    }
    openModal(s)
  },
  { immediate: true }
)

onMounted(async () => {
  if (!isAdminKeu.value) {
    toast.error('Akses ditolak — hanya admin keuangan yang bisa pakai POS Santri')
    loading.value = false
    return
  }
  try {
    // Santri & guru: pastikan store terpusat aktif (idempotent, hidup se-sesi).
    collections.ensure('santri', 'guru')

    // Load transaksi terakhir POS Santri (utk histori + ringkasan harian)
    const posTx = await queryColl(
      'keuangan_buku_induk',
      [['sumber', '==', 'pos_santri']],
      [['createdAt', 'desc']],
      80
    )
    historiBaris.value = posTx
    // v.1.2.6: tanggal WIB (todayJakarta), bukan toISOString() yang UTC — transaksi dini
    //   hari WIB (00:00–07:00) dulu dihitung ke tanggal kemarin.
    const hariIni = todayJakarta()
    const txToday = posTx.filter((t) => t.tanggal === hariIni)
    todayStats.value = {
      count: txToday.length,
      total: txToday.reduce((s, t) => s + Number(t.nominal || 0), 0)
    }
    // v.1.2.6: seq nomor struk TIDAK lagi di-cache di sini — dulu dihitung dari 80 baris
    //   terakhir saja sehingga mundur & bikin nomor kembar. Sekarang dibaca dari DB tepat
    //   saat menyimpan (lihat ambilNomorStruk).
    // v.21.91.0527: ambil TTD operator dari guru.tanda_tangan utk auto-isi struk PDF
    try {
      const myId = auth.sesiAktif?.id
      if (myId) {
        const gRow = await getOne('guru', String(myId))
        let ttd = gRow?.tanda_tangan || ''
        if (!ttd) {
          // dari store (sudah ada di memori) — dulu getAll('guru') penuh tiap kali
          // operator belum punya tanda tangan, jadi terulang di SETIAP buka POS.
          const me = (collections.guru || []).find(
            (g) => String(g.id) === String(myId) || g.nama === operatorName.value
          )
          ttd = me?.tanda_tangan || ''
        }
        operatorTtdUrl.value = ttd || ''
      }
    } catch (e) {
      console.warn('[pos] load ttd operator fail:', e.message)
    }

    // Load tunggakan map (count + total per santri_id)
    try {
      // AUDIT AGU 2026 (P5): dulu getAll (SELURUH keuangan_tagihan, 2.805 baris per
      //   3 Agu ≈ 1,1 MB) lalu dibuang lagi di klien — padahal peta tunggakan hanya
      //   butuh yang BELUM/PARTIAL. Penyaringannya dipindah ke DB.
      //   Aman & EKSAK: diperiksa di data nyata 3 Agu — `status` 0 baris NULL dan 0
      //   nilai di luar {belum, partial, lunas}, jadi `in` tak membuang baris yang
      //   loop di bawah dulu ikut hitung. (Kalau suatu saat status boleh NULL lagi,
      //   filter ini WAJIB dicabut: SQL membuang NULL dari `in`, sementara klien
      //   menganggapnya 'belum' — tunggakan akan tampak lebih kecil dari kenyataan.)
      // Kolom TETAP '*' (bukan pilih kolom): sisaTagihan -> terbayarDari punya jalur
      //   mundur ke `data.bayar`/`data.dibayar` di ekor jsonb, dan 8 baris nyata masih
      //   memakainya — membuang kolom `data` akan MELEBIHKAN tunggakan mereka.
      const tagihanAll = await queryColl('keuangan_tagihan', [
        ['status', 'in', ['belum', 'partial']]
      ])
      const map = {}
      for (const data of tagihanAll) {
        const status = String(data.status || 'belum').toLowerCase()
        if (status !== 'belum' && status !== 'partial') continue
        const sid = data.santri_id
        if (!sid) continue
        if (!map[sid]) map[sid] = { count: 0, total: 0 }
        map[sid].count++
        map[sid].total += sisaTagihan(data)
      }
      tunggakanMap.value = map
    } catch (e) {
      console.warn('[pos] load tunggakan fail:', e.message)
    }
  } catch (e) {
    toast.error('Gagal load data santri: ' + e.message)
  } finally {
    loading.value = false
  }
})

const lembagaList = computed(() => {
  const set = new Set(santriList.value.map((s) => s.lembaga).filter(Boolean))
  return Array.from(set).sort()
})

const sekolahList = computed(() => {
  const set = new Set(santriList.value.map((s) => s.lembaga_sekolah).filter(Boolean))
  return Array.from(set).sort()
})

const filteredSantri = computed(() => {
  let list = santriList.value.filter((s) => allowSantri(s.id)) // v.111: scope Gedung
  if (filterLembaga.value) list = list.filter((s) => s.lembaga === filterLembaga.value)
  if (filterSekolah.value) list = list.filter((s) => s.lembaga_sekolah === filterSekolah.value)
  if (filterTunggakan.value) list = list.filter((s) => (tunggakanMap.value[s.id]?.count || 0) > 0)
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (s) =>
        String(s.nama || '')
          .toLowerCase()
          .includes(q) ||
        String(s.nis || '').includes(q) ||
        String(s.wa || '').includes(q)
    )
  }
  if (filterTunggakan.value) {
    list = [...list].sort(
      (a, b) => (tunggakanMap.value[b.id]?.total || 0) - (tunggakanMap.value[a.id]?.total || 0)
    )
  }
  // v.1.4.3 (Kyai 14 Sep 2026): "di menu POS santri, saya ingin bisa ditampilkan semua
  //   santri. tidak seperti sekarang hanya 50 santri". Batas 50 lahir di v.21, saat daftar
  //   ini masih diunduh penuh setiap halaman dibuka. Sejak audit Agu 2026 datanya dari store
  //   terpusat yang memang sudah memuat SEMUA santri — yang dibatasi tinggal yang DIGAMBAR,
  //   sehingga santri ke-51 dst. hanya bisa diklik dengan mengetik namanya lebih dulu.
  //   Kartunya memakai content-visibility, jadi ±600 kartu tetap ringan digulir di PC kasir.
  return list
})

// v.1.4.3 (Kyai 14 Sep 2026: "admin keu bisa print ulang struk"): Transaksi Terakhir per
//   TRANSAKSI. Begitu modal sukses ditutup, struk transaksi yang barusan tak punya jalan
//   kembali dari layar ini — tautan "Riwayat" di header pun disembunyikan di Electron.
//   Scope gedung sama dengan daftar santri di atas.
const historiTrx = computed(() => {
  const per = new Map()
  for (const b of historiBaris.value) {
    if (!b || !allowSantri(b.santri_id)) continue
    const k = kunciTransaksi(b)
    if (!per.has(k)) per.set(k, [])
    per.get(k).push(b)
  }
  return [...per.entries()].slice(0, 5).map(([key, rows]) => ({
    key,
    rows,
    santri_nama: rows[0].santri_nama || '-',
    tanggal: rows[0].tanggal,
    trx_id: rows[0].trx_id || '',
    jenis: [...new Set(rows.map((r) => r.kategori).filter(Boolean))].join(', '),
    total: rows.reduce((n, r) => n + Number(r.nominal || 0), 0)
  }))
})

async function openModal(s) {
  selectedSantri.value = s
  // v.94.0626: buka selalu di mode form (bukan sisa layar sukses transaksi sebelumnya)
  lastTrx.value = null
  loadingCart.value = true
  allTagihan.value = []
  posPayments.value = []
  try {
    // v.1.2.x: matriks butuh SEMUA tagihan santri (segala status), bukan cuma yg nunggak.
    //   Cocokkan santri_id sbg STRING (+ NUMBER bila numerik) — sama spt yg dilihat akun wali.
    const sid = String(s.id)
    const sidNum = Number(sid)
    const numeric = !Number.isNaN(sidNum) && String(sidNum) === sid
    const tagQs = [queryColl('keuangan_tagihan', [['santri_id', '==', sid]])]
    if (numeric) tagQs.push(queryColl('keuangan_tagihan', [['santri_id', '==', sidNum]]))
    const tagSnaps = await Promise.all(tagQs)
    const seen = new Map()
    for (const rows of tagSnaps) for (const t of rows) seen.set(t.id, t)
    allTagihan.value = [...seen.values()]
    // v.1.2.x: pembayaran POS santri (Buku Induk) → warnai sel bayar-muka yg TAK punya baris tagihan
    try {
      const payQs = [
        queryColl('keuangan_buku_induk', [
          ['santri_id', '==', sid],
          ['sumber', '==', 'pos_santri']
        ])
      ]
      if (numeric)
        payQs.push(
          queryColl('keuangan_buku_induk', [
            ['santri_id', '==', sidNum],
            ['sumber', '==', 'pos_santri']
          ])
        )
      const paySnaps = await Promise.all(payQs)
      const seenPay = new Map()
      for (const rows of paySnaps) for (const p of rows) seenPay.set(p.id, p)
      posPayments.value = [...seenPay.values()]
    } catch (e) {
      console.warn('[pos] load pembayaran POS fail:', e.message)
    }
  } catch (e) {
    console.warn('[pos] load tagihan fail:', e.message)
  } finally {
    loadingCart.value = false
    modalOpen.value = true
  }
}

function closeModal() {
  modalOpen.value = false
  allTagihan.value = []
  posPayments.value = []
  // v.94.0626: reset transaksi terakhir + santri saat modal benar2 ditutup (selesai cetak)
  lastTrx.value = null
  selectedSantri.value = null
}

// v.1.2.6: nomor struk dibaca dari DB TEPAT saat menyimpan, disaring per TANGGAL transaksi
//   (kolom riil → murah). Dulu dari counter lokal yang diisi 80 baris terakhir saja: hari
//   ramai / halaman di-remount / kasir ke-2 → seq mundur → nomor kembar → dua transaksi
//   menyatu di Riwayat. Gagal baca → jangan tebak nomor, batalkan (uang belum tercatat).
async function ambilNomorStruk(tanggal) {
  const rows = await queryColl('keuangan_buku_induk', [
    ['sumber', '==', 'pos_santri'],
    ['tanggal', '==', tanggal]
  ])
  return nomorStrukBerikutnya(tanggal, rows.map((r) => r.trx_id).filter(Boolean))
}

async function handleSimpan(payload) {
  posSaving.value = true
  try {
    const tanggal = payload.tanggal
    const op = payload.operator || operatorName.value
    // v.21.90.0527: format nomor struk MU-NNNddmmyy (seq harian + tgl)
    const trxId = await ambilNomorStruk(tanggal)
    // v.1.2.6: penanda unik transaksi — dipakai mesin utk mengelompokkan struk. Nomor struk
    //   tetap nomor cantik utk manusia; kalaupun dua kasir berebut nomor yang sama pada
    //   detik yang sama, strukanya TIDAK akan pernah menyatu lagi.
    const trxUid = buatTrxUid(trxId)
    const santriRef = selectedSantri.value
    // v.94.0626: nama penyetor = nama walisantri (wali -> nama_wali -> ayah)
    const waliNama =
      santriRef?.wali ||
      santriRef?.nama_wali ||
      santriRef?.nama_ayah ||
      (santriRef?.ayah && santriRef.ayah.nama) ||
      ''
    const writes = []
    const barisBaru = [] // v.1.4.3: masuk Transaksi Terakhir SESUDAH tersimpan, lihat bawah
    let tagUpdErr = '' // v.95.0626: tangkap error update tagihan biar tidak gagal diam-diam (bug cicil)
    let lunasCount = 0
    let partialCount = 0
    let totalMasuk = 0
    // Resolusi Pos Dana (Uang Kegiatan/Buku) dari jenis pembayaran → tag baris buku induk.
    // Pembayaran tetap masuk keuangan_buku_induk (ikut total); pos hanya penyaring rekap.
    const posByLabel = {}
    for (const j of settingsStore.settings?.keuTagihanJenis || []) {
      const lbl = String(j?.label || j?.nama || j?.id || '').trim()
      if (lbl && j?.pos) posByLabel[lbl] = String(j.pos)
    }
    // Kyai 4 Agu: kas per lembaga "sesuai label pembayaran". Ditulis di baris supaya
    //   laporan bulan lalu tak bergeser kalau konfigurasi jenis diubah belakangan.
    //   Baris pecahan K1 dapat lembaga KOMPONENNYA sendiri, bukan lembaga tagihan induk.
    const petaKas = petaKasLembaga(settingsStore.settings?.keuTagihanJenis || [])
    const tabWajibItems = [] // item pos 'tabungan_wajib' -> picu push ke wali (lihat setelah writes)
    let barisMasuk = 0 // jumlah BARIS buku induk (bisa > jumlah item krn tagihan gabungan)
    for (const [itemIdx, item] of payload.items.entries()) {
      // tag pos: utamakan pos eksplisit dari tagihan (generate khusus), fallback dari jenis
      const _pos = item.pos || posByLabel[item.jenis] || ''
      // v.1.4.3: akibat item ini pada tagihannya dihitung SEKALI, sebelum barisnya ditulis —
      //   angka yang sama dipakai untuk memperbarui tagihan DAN dicatat di tiap baris
      //   (`tagihan_tambah`), supaya menghapus transaksi ini kelak bisa mengembalikannya tepat.
      const pelunasan = item.tagihan_id ? pelunasanItem(item) : null
      // K1 (Kyai): tagihan gabungan (sekolah sudah termasuk ngaji) dicatat DIPECAH di Buku
      //   Induk — wali cuma lihat 1 tagihan, tapi kasnya jadi 2 baris supaya laporan per
      //   lembaga & Buku Kas per gedung tetap benar. Uang yang dipecah = yang BENAR-BENAR
      //   diterima (bisa < nominal tagihan kalau bayar sebagian), dan `pecahProporsional`
      //   menjamin jumlah baris tepat sama dengan uang itu sampai rupiah terakhir.
      const pecahan = pecahProporsional(item.komponen, item.nominal)
      const barisItem = pecahan.length
        ? pecahan.map((k) => ({
            kategori: String(k.label || item.jenis),
            nominal: Number(k.nominal || 0),
            pos: String(k.pos || '') || _pos,
            // jejak: baris ini bagian dari tagihan jenis apa (utk audit & rekap gabungan)
            induk_jenis: item.jenis
          }))
        : [{ kategori: item.jenis, nominal: Number(item.nominal || 0), pos: _pos, induk_jenis: '' }]
      // v.1.4.3: tambahan ke `terbayar` dibagi ke baris yang BENAR-BENAR ditulis (baris
      //   bernominal 0 dilewati di bawah) — lihat utils/batalBayarTagihan.bagiTambahTagihan.
      const bagianTambah = pelunasan
        ? bagiTambahTagihan(
            barisItem.filter((x) => x.nominal > 0).map((x) => x.nominal),
            pelunasan.tambah
          )
        : []
      let urutTulis = 0
      for (const [kompIdx, baris] of barisItem.entries()) {
        // Baris bernominal 0 (mis. komponen ngaji tergerus pembayaran sebagian) jangan
        // ditulis — cuma jadi sampah di buku kas.
        if (baris.nominal <= 0) continue
        // audit B1: id WAJIB unik per BARIS. Dulu `pos_${Date.now()}_${rand(0..999)}` —
        //   dalam 1 keranjang loop sinkron → Date.now() SAMA, hanya random pembeda →
        //   tabrakan (ulang tahun) → INSERT PK dobel gagal → Promise.all reject SETELAH
        //   sebagian tertulis = commit keuangan PARSIAL. Index = pembeda deterministik.
        const id = `pos_${trxId}_${itemIdx}_${kompIdx}_${Math.random().toString(36).slice(2, 7)}`
        const docData = {
          id,
          tanggal,
          tipe: 'masuk',
          kategori: baris.kategori,
          nominal: baris.nominal,
          keterangan: `${baris.kategori} — ${payload.santri_nama} (${payload.santri_nis || payload.santri_id})${item.keterangan ? ' — ' + item.keterangan : ''}${baris.induk_jenis && baris.kategori !== baris.induk_jenis ? ' — bagian dari ' + baris.induk_jenis : ''}`,
          sumber: 'pos_santri',
          trx_id: trxId,
          trx_uid: trxUid,
          metode: payload.metode || 'Tunai',
          santri_id: payload.santri_id,
          santri_nama: payload.santri_nama,
          operator: op,
          wali: waliNama,
          createdAt: serverTimestamp()
        }
        // Jejak potongan (Kyai 5 Agu 2026). `nominal` baris tetap UANG RIIL yang diterima —
        //   pecahProporsional sudah memecah dari nominal neto — jadi laporan kas tak berubah.
        //   Potongannya dicatat sekali di baris PERTAMA item saja; kalau ditempel ke semua
        //   baris pecahan, rekap akan menjumlahkannya berkali-kali.
        if (kompIdx === 0 && Number(item.potongan_nominal || 0) > 0) {
          docData.potongan_nominal = Number(item.potongan_nominal)
          docData.potongan_label = String(item.potongan_label || 'Potongan')
          docData.keterangan += ` — potongan ${docData.potongan_label} ${fmtRp(docData.potongan_nominal)}`
        }
        if (baris.pos) docData.pos = baris.pos
        // v.1.4.1 (Kyai 5 Sep 2026): dua jejak yang membuat baris ini bisa DICOCOKKAN
        //   kembali dengan tagihannya. Tanpa keduanya, "riwayat vs tagihan" hanya bisa
        //   ditebak dari teks keterangan:
        //     tagihan_id  — baris ini melunasi tagihan yang mana (kosong = bayar di muka,
        //                   memang belum ada tagihannya)
        //     induk_jenis — tagihan gabungan dipecah memakai label KOMPONEN ('SPP Sekolah',
        //                   'Ngaji'), jadi tanpa nama induknya pembayaran gabungan tak akan
        //                   pernah cocok dengan tagihan 'Syahriyah'-nya.
        //   Lihat utils/cocokBayarTagihan; baris LAMA masih dibaca lewat keterangan.
        if (item.tagihan_id) docData.tagihan_id = String(item.tagihan_id)
        // v.1.4.3 (Kyai 14 Sep 2026): angka PASTI yang ditambahkan baris ini ke `terbayar`
        //   tagihannya. Uang di baris tak selalu sama — potongan ikut menutup tagihan, dan
        //   pembulatan kasir dijepit ke nominal tagihan — padahal menghapus transaksi harus
        //   mengembalikan tagihan tepat ke angka sebelum dibayar.
        if (pelunasan) docData.tagihan_tambah = bagianTambah[urutTulis] ?? 0
        if (baris.induk_jenis) docData.induk_jenis = baris.induk_jenis
        const kasLemb = kasLembagaBaris(
          { kategori: baris.kategori, induk_jenis: baris.induk_jenis },
          petaKas
        )
        if (kasLemb) docData.lembaga = kasLemb
        // v.1.2.x: penanda periode utk matriks POS mewarnai sel bayar-muka (tanpa baris tagihan)
        if (item.periode_kode) docData.periode_kode = item.periode_kode
        // Tabungan Wajib (dana kelulusan): wali diberi tahu. Pos lain tidak — utk syahriyah dsb
        // walinya justru sedang di depan kasir, push cuma jadi berisik.
        if (baris.pos === 'tabungan_wajib' && !tabWajibItems.includes(item))
          tabWajibItems.push(item)
        writes.push(setOne('keuangan_buku_induk', id, docData))
        barisBaru.push(docData)
        urutTulis++
        barisMasuk++
      }
      totalMasuk += Number(item.nominal || 0)
      // v.21.87.0527: tagihan → lunas penuh atau partial (bayar sebagian)
      if (item.tagihan_id) {
        const potongan = Number(item.potongan_nominal || 0)
        // Potongan IKUT menutup tagihan (keputusan Kyai 5 Agu 2026): tagihan 300rb dengan
        //   potongan 150rb + uang 150rb = LUNAS. Tanpa ini tiap potongan melahirkan
        //   tunggakan palsu yang mengejar santri di daftar tagihan & laporan.
        // v.1.4.3: rumusnya kini pelunasanItem() — persis rumus lama (dijaga tes cermin di
        //   tests/unit/batalBayarTagihan.test.js), dipakai bersama sisi hapus.
        const isLunas = pelunasan.lunas
        const upd = isLunas
          ? {
              status: 'lunas',
              terbayar: pelunasan.terbayar,
              tanggal_lunas: tanggal,
              dibayar_via: 'pos_santri',
              operator_pelunasan: op
            }
          : {
              status: 'partial',
              terbayar: pelunasan.terbayar,
              dibayar_via: 'pos_santri',
              operator_pelunasan: op
            }
        // Jejak di tagihan: tanpa ini "lunas" dengan uang < nominal tampak seperti selisih
        //   kas yang tak bisa dijelaskan saat diperiksa belakangan.
        if (potongan > 0) {
          upd.potongan_nominal = potongan
          upd.potongan_label = String(item.potongan_label || 'Potongan')
        }
        if (isLunas) lunasCount++
        else partialCount++
        writes.push(
          updateOne('keuangan_tagihan', item.tagihan_id, upd).catch((e) => {
            console.warn('[pos] update tagihan fail:', item.tagihan_id, e.message)
            tagUpdErr = e.message || String(e)
          })
        )
      }
      // v.1.2.x: item TANPA tagihan_id (sintesis / bayar di muka) → SENGAJA tidak membuat baris
      //   keuangan_tagihan. Aturan Kyai: yang sudah lunas jangan masuk daftar tagihan. Pembayaran
      //   cukup tercatat di Buku Induk + periode_kode; matriks POS mewarnai selnya hijau dari situ.
    }
    await Promise.all(writes)
    // Push ke WALI utk setoran Tabungan Wajib (dana kelulusan): yang menyetor sering santrinya,
    // jadi wali perlu diberi tahu. target {type:'santri',id} -> dispatch-push me-resolve token
    // santri + wali (via pencocokan WA/ayah). Sengaja SETELAH writes sukses: jangan kabari
    // wali kalau pencatatannya sendiri gagal.
    if (tabWajibItems.length) {
      const _totalTw = tabWajibItems.reduce((a, i) => a + Number(i.nominal || 0), 0)
      const _nid = `ntf_tw_${trxId}`
      try {
        await setOne('notif_queue', _nid, {
          id: _nid,
          judul: 'Setoran Tabungan Wajib diterima',
          pesan: `Setoran Tabungan Wajib a.n. ${payload.santri_nama} sebesar ${fmtRp(_totalTw)} telah diterima. Terima kasih.`,
          kategori: 'pembayaran',
          target: { type: 'santri', id: String(payload.santri_id) },
          link: '/tabungan-wajib',
          ref_id: trxId,
          dibaca: false,
          status: 'pending',
          created_at: new Date().toISOString()
        })
      } catch (e) {
        // best-effort: pembayaran SUDAH tercatat, jangan gagalkan transaksi gara-gara notif
        console.warn('[pos] notif tabungan wajib gagal:', e?.message || e)
      }
    }
    // v.95.0626: kalau update tagihan gagal (mis. dok tak ada / izin), beri tahu — jangan diam (bug cicil tetap 1jt)
    if (tagUpdErr)
      toast.error('Pembayaran tercatat, TAPI sisa tagihan GAGAL diperbarui: ' + tagUpdErr)
    // v.1.4.3: transaksi baru masuk Transaksi Terakhir SESUDAH `await Promise.all(writes)`.
    //   Dulu dimasukkan di dalam perulangan, sebelum tersimpan — transaksi yang gagal disimpan
    //   tetap tampil, dan kini tampilan itu punya tombol cetak ulang: kertas bukti untuk uang
    //   yang tak pernah tercatat.
    historiBaris.value = [...barisBaru, ...historiBaris.value].slice(0, 120)
    // Update ringkasan harian
    todayStats.value = {
      count: todayStats.value.count + barisMasuk, // BARIS, sepakat dengan hitungan dari DB
      total: todayStats.value.total + totalMasuk
    }
    const parts = []
    if (lunasCount > 0) parts.push(`${lunasCount} tagihan lunas`)
    if (partialCount > 0) parts.push(`${partialCount} bayar sebagian`)
    const extra = parts.length > 0 ? ` (${parts.join(', ')})` : ''
    toast.success(
      `Sukses! ${payload.items.length} transaksi tersimpan untuk ${payload.santri_nama}${extra}`
    )
    // v.21.88.0527: simpan transaksi terakhir utk tombol cetak struk
    const _total = Number(payload.total_tagihan || 0)
    lastTrx.value = {
      no_struk: trxId,
      tanggal,
      santri_nama: payload.santri_nama,
      santri_nis: payload.santri_nis || santriRef?.nis || '',
      lembaga: santriRef?.lembaga || '',
      kelas: santriRef?.kelas || '',
      lembaga_sekolah: santriRef?.lembaga_sekolah || '',
      kelas_sekolah: santriRef?.kelas_sekolah || '',
      operator: op,
      // v.94.0626: penyetor = nama walisantri (auto-isi di struk)
      penyetor: waliNama,
      // v.21.90.0527: field tambahan utk struk Yayasan-style
      metode: (payload.metode || 'Tunai').toUpperCase(),
      status_siswa: santriRef?.aktif === false ? 'Tidak Aktif' : 'Aktif',
      terbilang: terbilangRupiah(_total),
      operator_ttd_url: operatorTtdUrl.value || '',
      items: payload.items.map((i) => ({
        jenis: i.jenis,
        nominal: Number(i.nominal),
        // K1: di struk tetap SATU baris (wali membayar satu tagihan), rinciannya menempel di
        //   keterangan — semua pencetak struk (PDF, slip, ESC/P) sudah menampilkan keterangan
        //   dalam tanda kurung, jadi tak ada renderer yang perlu diubah.
        // Potongan ikut lewat jalur yang sama: wali berhak melihat bahwa nominalnya sudah
        //   dipotong, dan berapa dari berapa — tanpa itu struk tampak seperti salah tarif.
        keterangan: [i.keterangan || '', rincianKomponen(i), rincianPotongan(i)]
          .filter(Boolean)
          .join(' — ')
      })),
      total: _total,
      bayar: Number(payload.total_bayar || 0),
      kembali: Number(payload.kembalian || 0)
    }
    // v.94.0626: JANGAN tutup modal — tampilkan state sukses + tombol cetak DI DALAM modal POS.
    //   (lastTrx terisi -> ModalPOS otomatis pindah ke layar sukses.)
  } catch (e) {
    toast.error('Gagal simpan: ' + e.message)
  } finally {
    posSaving.value = false
  }
}

function fmtRp(n) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n || 0))
}

/**
 * Teks rincian utk struk tagihan gabungan: "termasuk Syahriyah Qiraati Pagi Rp 90.000".
 * Komponen ke-0 = porsi jenis induk (sekolah) — tak perlu disebut, karena label barisnya
 * sudah jenis itu sendiri. '' bila bukan tagihan gabungan.
 */
function rincianKomponen(item) {
  const k = Array.isArray(item?.komponen) ? item.komponen : []
  if (k.length < 2) return ''
  const ikut = k.slice(1).filter((x) => Number(x?.nominal) > 0)
  if (!ikut.length) return ''
  return 'termasuk ' + ikut.map((x) => `${x.label} ${fmtRp(x.nominal)}`).join(', ')
}

/**
 * Teks potongan untuk struk: "potongan Anak Guru Rp 150.000 dari Rp 300.000".
 * Menyebut brutonya penting — tanpa itu wali melihat angka yang lebih kecil dari tarif
 * yang ia tahu, dan struk justru menimbulkan pertanyaan.
 */
function rincianPotongan(item) {
  const pot = Number(item?.potongan_nominal || 0)
  if (pot <= 0) return ''
  const bruto = Number(item?.nominal_bruto || 0)
  const label = String(item?.potongan_label || 'Potongan')
  return `potongan ${label} ${fmtRp(pot)}` + (bruto > 0 ? ` dari ${fmtRp(bruto)}` : '')
}

// v.21.88.0527: cetak struk transaksi terakhir (layar sukses modal).
// v.1.4.3: lewat useCetakStruk — satu pintu dengan semua tombol cetak ulang. Isinya tak
//   berubah: PDF ber-KOP (v.21.88), slip PDF yang formatnya sama dengan cetak langsung
//   (v.95.0626), dan cetak langsung ESC/P grafis mengikuti setelan kertas (v.96.0626).
function cetakLastPdf() {
  return cetak.strukPdf(lastTrx.value)
}
function cetakLastDot() {
  return cetak.strukSlip(lastTrx.value)
}
function cetakLangsung() {
  return cetak.strukLangsung(lastTrx.value)
}
// v.94.0626: buka modal Pengaturan Printer (PrinterSettingsModal global dengar event ini)
function openPrinterSettings() {
  try {
    window.dispatchEvent(new CustomEvent('ammu:open-printer-settings'))
  } catch (e) {
    /* ignore */
  }
}

function fmtTgl(t) {
  if (!t) return '—'
  try {
    return new Date(t).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return t
  }
}
</script>
