<script setup>
// v.21.88.0527: Riwayat Transaksi POS Santri — group per transaksi (trx_id), filter tanggal + cari,
// cetak ulang struk (PDF ber-KOP + dot-matrix).
import { ref, computed, onMounted, watch } from 'vue'
import { useCollectionsStore } from '@/stores/collections' // P5b: santri/guru dari store terpusat
import { useRouter } from 'vue-router'
import { queryColl, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { cetakStrukPdf, cetakStrukSlipPdf, fmtRpStruk } from '@/utils/strukBuilder'
import { buildStrukSlipEscpBase64 } from '@/utils/escpImage'
import { printRaw, getDefaultPrinter } from '@/composables/useDesktopPrint'
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'
// v.1.2.6: kelompokkan per TRANSAKSI, bukan per nomor struk — nomor lama bisa kembar
import { kunciTransaksi } from '@/utils/trxStruk'
// v.1.2.6 (Kyai): laporan PDF harian per lembaga + berkas terpisah tunai/transfer.
//   Pakai pembangun yang sudah dipakai Buku Induk & struk — TIDAK menambah pustaka.
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
import { metodeTransaksi, METODE_OPTS } from '@/utils/metodeBayar'
import { fmtRp, formatTanggal as formatTgl } from '@/utils/format'
import {
  petaKasLembaga,
  kasLembagaBaris,
  ringkasKasLembaga,
  kunciLembaga
} from '@/utils/kasLembaga'

const router = useRouter()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const toast = useToast()

const isAdminKeu = computed(() => {
  const rs = auth.sesiAktif?.role_sistem || ''
  return auth.sesiAktif?.role === 'admin' || ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
})
// v.21.98.0527: super_admin only — bisa hapus transaksi POS (cascade)
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

async function hapusTrx(t) {
  if (!isAdmin.value) return
  if (
    !confirm(
      `Hapus PERMANEN seluruh transaksi POS ini?\n\nNo: ${t.trx_id}\nSantri: ${t.santri_nama}\nTotal: ${fmtRpStruk(t.total)}\n\nSemua ${t.items.length} record di buku induk akan dihapus. Tagihan yg ter-lunaskan TIDAK otomatis di-revert.`
    )
  )
    return
  try {
    // v.1.2.6: hapus baris milik TRANSAKSI ini saja (t.ids), bukan semua baris se-trx_id —
    //   nomor struk lama bisa kembar dgn transaksi santri lain.
    const idSet = new Set((t.ids || []).map(String))
    for (const id of idSet) {
      try {
        await deleteOne('keuangan_buku_induk', id, { sesi: auth.sesiAktif })
      } catch (er) {
        console.warn('[hapusTrx] fail', id, er.message)
      }
    }
    entries.value = entries.value.filter((e) => !idSet.has(String(e.id)))
    toast.success(`Transaksi ${t.trx_id} dihapus (${idSet.size} record)`)
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

// v.21.100.0527: bulk select hapus transaksi POS (super_admin)
const selectedTrx = ref(new Set())
function toggleTrxSel(key) {
  const ns = new Set(selectedTrx.value)
  const k = String(key)
  if (ns.has(k)) ns.delete(k)
  else ns.add(k)
  selectedTrx.value = ns
}
function toggleSemuaTrx() {
  if (selectedTrx.value.size === transaksi.value.length && transaksi.value.length > 0) {
    selectedTrx.value = new Set()
  } else {
    selectedTrx.value = new Set(transaksi.value.map((t) => String(t.key)))
  }
}
async function hapusTrxTerpilih() {
  if (!isAdmin.value) return
  const keys = Array.from(selectedTrx.value)
  if (keys.length === 0) return
  const tgt = transaksi.value.filter((t) => keys.includes(String(t.key)))
  const totalRec = tgt.reduce((a, t) => a + t.items.length, 0)
  if (
    !confirm(
      `Hapus ${tgt.length} transaksi POS terpilih (${totalRec} record di buku induk)?\n\nTidak bisa di-undo. Tagihan TIDAK auto-revert.`
    )
  )
    return
  let ok = 0,
    fail = 0
  // v.1.2.6: id baris diambil dari transaksi terpilih (bukan dari trx_id — bisa kembar,
  //   dulu ikut menghapus transaksi santri lain yang kebetulan senomor)
  const trxIds = tgt.map((t) => t.trx_id)
  const recIds = [...new Set(tgt.flatMap((t) => (t.ids || []).map(String)))]
  for (const id of recIds) {
    try {
      await deleteOne('keuangan_buku_induk', String(id), { sesi: auth.sesiAktif })
      ok++
    } catch (e) {
      fail++
      console.warn('[bulkHapusTrx]', id, e.message)
    }
  }
  const hapusSet = new Set(recIds)
  entries.value = entries.value.filter((e) => !hapusSet.has(String(e.id)))
  selectedTrx.value = new Set()
  // v.21.104.0527: audit log bulk delete transaksi POS
  await writeAuditLog({
    operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
    action: 'bulk_delete_trx',
    target: 'keuangan_buku_induk',
    ids: recIds.map(String),
    detail: { trx_ids: trxIds, transaksi_count: tgt.length, record_ok: ok, record_fail: fail }
  })
  if (fail > 0) toast.warning(`${ok} record dihapus, ${fail} gagal — cek console`)
  else toast.success(`${tgt.length} transaksi dihapus (${ok} record)`)
}

const loading = ref(true)
const entries = ref([]) // raw buku_induk pos rows
// P5b: keduanya kini TURUNAN dari store terpusat (bukan hasil getAll per buka halaman)
const collections = useCollectionsStore()
const santriMap = computed(() => {
  const m = {} // id -> {lembaga, kelas, nis, wali}
  for (const s of collections.santri || []) {
    m[s.id] = {
      lembaga: s.lembaga || '',
      kelas: s.kelas || '',
      lembaga_sekolah: s.lembaga_sekolah || '',
      kelas_sekolah: s.kelas_sekolah || '',
      nis: s.nis || '',
      wali: s.wali || s.nama_wali || s.nama_ayah || (s.ayah && s.ayah.nama) || ''
    }
  }
  return m
})
// nama -> tanda_tangan URL (utk auto-isi TTD Penerima di struk PDF)
const guruTtdMap = computed(() => {
  const gm = {}
  for (const g of collections.guru || []) {
    if (g.nama && g.tanda_tangan) gm[g.nama] = g.tanda_tangan
  }
  return gm
})
const search = ref('')
// v.108: filter tahun / bulan / hari
const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]
const filterYear = ref(new Date().getFullYear())
// v.1.2.6 (Kyai): default = BULAN BERJALAN, bukan "semua bulan". Halaman ini kini
//   memuat PERIODE TERPILIH dari database (bukan "400 terakhir"), jadi defaultnya harus
//   satu bulan supaya bukaan pertama tetap ringan. "Semua bulan" tetap ada sebagai
//   pilihan sadar — jumlah baris yang termuat ditampilkan di bawah penyaring.
const filterMonth = ref(new Date().getMonth() + 1)
const filterDay = ref(0) // 0 = semua tanggal (disaring di klien, tanpa query ulang)
// v.1.2.6 (Kyai): kas per lembaga. Nilainya KUNCI ternormalisasi (kunciLembaga);
//   KAS_INDUK sentinel karena kunci Kas Induk '' sudah dipakai "Semua lembaga".
const KAS_INDUK = '__induk__'
const filterLembaga = ref('')
const petaKas = computed(() => petaKasLembaga(settingsStore.settings?.keuTagihanJenis || []))
function kasLembagaDari(b) {
  return kasLembagaBaris(b, petaKas.value)
}
// v.1.2.6: daftar tahun TIDAK lagi diturunkan dari `entries` — entries sekarang berisi
//   satu periode saja, jadi menurunkannya dari situ akan menghilangkan pilihan tahun
//   lain begitu satu tahun dipilih (dan mengunci Kyai di tahun itu).
const years = computed(() => {
  const now = new Date().getFullYear()
  const ys = new Set([now - 2, now - 1, now, now + 1, filterYear.value])
  return [...ys].sort((a, b) => b - a)
})

// v.1.2.6 (Kyai): halaman ini dulu memuat "400 baris terakhir" TANPA filter tanggal,
//   sehingga laporan uang untuk periode lama diam-diam tidak lengkap. Sekarang yang
//   dimuat adalah PERIODE TERPILIH — batas 400 dihapus, dan laporan PDF-nya lengkap.
//   Rentang dibaca sebagai [dari, sampai) supaya baris yang `tanggal`-nya menyimpan
//   waktu ('2026-08-04T07:00') ikut terambil; batas atas inklusif akan membuangnya.
//   TANGGAL (hari) disaring di KLIEN — mengubah hari tak perlu query ulang.
//   Kolom `tanggal` & `sumber` dua-duanya ber-index (migrasi 20260622090200).
function _pad(n) {
  return String(n).padStart(2, '0')
}
function rentangPeriode() {
  const y = filterYear.value
  if (filterMonth.value > 0) {
    const m = filterMonth.value
    const dari = `${y}-${_pad(m)}-01`
    const sampai = m === 12 ? `${y + 1}-01-01` : `${y}-${_pad(m + 1)}-01`
    return { dari, sampai }
  }
  return { dari: `${y}-01-01`, sampai: `${y + 1}-01-01` }
}

async function muatPeriode() {
  if (!isAdminKeu.value) {
    loading.value = false
    return
  }
  const { dari, sampai } = rentangPeriode()
  loading.value = true
  try {
    entries.value = await queryColl(
      'keuangan_buku_induk',
      [
        ['sumber', '==', 'pos_santri'],
        ['tanggal', '>=', dari],
        ['tanggal', '<', sampai]
      ],
      [['tanggal', 'desc']],
      0
    )
  } catch (e) {
    toast.error('Gagal memuat riwayat: ' + (e.message || e))
  } finally {
    loading.value = false
  }
}

// Ganti tahun/bulan = ganti rentang query. Hari TIDAK ikut (disaring di klien).
watch([filterYear, filterMonth], () => {
  muatPeriode()
})

onMounted(() => {
  // AUDIT AGU 2026 (P5b): santri & guru dari store TERPUSAT (subscribe sekali per
  //   sesi + live) — dulu getAll penuh KEDUANYA setiap kali Riwayat dibuka
  //   (santri 539 baris ≈ 41 kB gzip + guru ≈ 9 kB). Peta di bawah kini computed,
  //   jadi ikut menyesuaikan sendiri saat datanya berubah.
  if (isAdminKeu.value) collections.ensure('santri', 'guru')
  muatPeriode()
})

// v.F6e: epoch dari createdAt — Supabase simpan ISO string (shim serverTimestamp),
//   tetap dukung bentuk legacy Firestore Timestamp { seconds }.
function tsEpoch(c) {
  if (!c) return 0
  if (typeof c === 'object' && c.seconds != null) return Number(c.seconds) * 1000
  const t = new Date(c).getTime()
  return Number.isNaN(t) ? 0 : t
}

// v.95.0626: ekstrak periode bersih dari keterangan buku induk verbose ("jenis — nama (nis) — periode")
function extractPeriode(ket) {
  const parts = String(ket || '').split(' — ')
  if (parts.length >= 3) {
    const last = parts[parts.length - 1].trim()
    if (/^[A-Za-z]+\s+\d{4}$/.test(last) || (last && last.length <= 22)) return last
  }
  return ''
}

// v.1.2.6: group per TRANSAKSI via kunciTransaksi (trx_uid -> trx_id+santri_id -> fallback).
//   Dulu murni `trx_id`: nomor struk yang kembar (bug counter lokal, lihat utils/trxStruk.js)
//   membuat transaksi dua santri berbeda menyatu jadi satu struk — item dobel, lintas
//   lembaga, total membengkak. Kunci ber-santri memisahkannya lagi, termasuk data lama.
const transaksi = computed(() => {
  const groups = {}
  for (const e of entries.value) {
    const key = kunciTransaksi(e)
    if (!groups[key]) {
      const sm = santriMap.value[e.santri_id] || {}
      groups[key] = {
        key,
        trx_id: e.trx_id || key,
        santri_id: e.santri_id,
        santri_nama: e.santri_nama || '-',
        santri_nis: sm.nis || '',
        lembaga: sm.lembaga || '',
        kelas: sm.kelas || '',
        lembaga_sekolah: sm.lembaga_sekolah || '',
        kelas_sekolah: sm.kelas_sekolah || '',
        tanggal: e.tanggal || '',
        operator: e.operator || '-',
        penyetor: e.wali || sm.wali || '',
        createdAt: e.createdAt || null,
        // id baris buku induk milik transaksi ini — dasar hapus (JANGAN pakai trx_id:
        //   nomor kembar akan ikut menghapus transaksi santri lain)
        ids: [],
        items: [],
        total: 0
      }
    }
    groups[key].ids.push(e.id)
    groups[key].items.push({
      jenis: e.kategori || 'Pembayaran',
      nominal: Number(e.nominal || 0),
      keterangan: extractPeriode(e.keterangan)
    })
    groups[key].total += Number(e.nominal || 0)
  }
  let list = Object.values(groups)
  // tandai nomor struk yang dipakai >1 transaksi (warisan bug penomoran) supaya kelihatan
  const pakai = {}
  for (const t of list) pakai[t.trx_id] = (pakai[t.trx_id] || 0) + 1
  for (const t of list) t.nomorKembar = pakai[t.trx_id] > 1
  // filter tahun / bulan / hari
  list = list.filter((t) => {
    const tg = String(t.tanggal || '')
    if (filterYear.value && tg.slice(0, 4) !== String(filterYear.value)) return false
    if (filterMonth.value > 0 && tg.slice(5, 7) !== String(filterMonth.value).padStart(2, '0'))
      return false
    if (filterDay.value > 0 && tg.slice(8, 10) !== String(filterDay.value).padStart(2, '0'))
      return false
    return true
  })
  // search nama
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((t) => String(t.santri_nama).toLowerCase().includes(kw))
  // urut terbaru
  return list.sort((a, b) => {
    const ta = tsEpoch(a.createdAt)
    const tb = tsEpoch(b.createdAt)
    if (tb !== ta) return tb - ta
    return String(b.tanggal).localeCompare(String(a.tanggal))
  })
})

const totalTampil = computed(() => transaksi.value.reduce((s, t) => s + t.total, 0))

// ── v.1.2.6 (Kyai): laporan PDF harian per lembaga + berkas terpisah tunai/transfer ──
// Laporannya dibangun dari BARIS kas (bukan transaksi) karena satu transaksi bisa
//   berisi komponen dari dua lembaga (pemecahan tagihan gabungan K1) — dijumlahkan
//   per transaksi, uangnya tak bisa dipilah per kas lembaga.
const barisPeriode = computed(() =>
  entries.value.filter((e) => {
    const tg = String(e.tanggal || '')
    if (filterYear.value && tg.slice(0, 4) !== String(filterYear.value)) return false
    if (filterMonth.value > 0 && tg.slice(5, 7) !== String(filterMonth.value).padStart(2, '0'))
      return false
    if (filterDay.value > 0 && tg.slice(8, 10) !== String(filterDay.value).padStart(2, '0'))
      return false
    const kw = search.value.trim().toLowerCase()
    if (
      kw &&
      !String(e.santri_nama || '')
        .toLowerCase()
        .includes(kw)
    )
      return false
    return true
  })
)
// Rekap kas per lembaga — kartu ringkasan + daftar opsi filter (tak ikut filter lembaga
//   sendiri, supaya pilihannya tak lenyap begitu satu lembaga dipilih).
const rekapLembaga = computed(() => ringkasKasLembaga(barisPeriode.value, kasLembagaDari))
const labelLembagaAktif = computed(() => {
  if (!filterLembaga.value) return ''
  if (filterLembaga.value === KAS_INDUK) return 'Kas Induk'
  return rekapLembaga.value.find((o) => o.kunci === filterLembaga.value)?.lembaga || ''
})
const barisLaporan = computed(() => {
  if (!filterLembaga.value) return barisPeriode.value
  const target = filterLembaga.value === KAS_INDUK ? '' : filterLembaga.value
  return barisPeriode.value.filter((b) => kunciLembaga(kasLembagaDari(b)) === target)
})

function labelPeriode() {
  if (!filterMonth.value) return `Tahun ${filterYear.value}`
  const b = `${BULAN[filterMonth.value - 1]} ${filterYear.value}`
  return filterDay.value > 0 ? `${filterDay.value} ${b}` : b
}

async function cetakLaporanPos(metodeOnly = '') {
  try {
    const semua = barisLaporan.value || []
    const list = metodeOnly ? semua.filter((b) => metodeTransaksi(b) === metodeOnly) : semua
    if (!list.length) {
      toast.warning(
        metodeOnly
          ? `Tidak ada transaksi ${metodeOnly} pada filter ini.`
          : 'Tidak ada transaksi pada filter ini.'
      )
      return
    }
    const urut = [...list].sort(
      (a, b) =>
        String(a.tanggal || '').localeCompare(String(b.tanggal || '')) ||
        String(a.trx_id || '').localeCompare(String(b.trx_id || ''))
    )
    const sub = { Tunai: 0, Transfer: 0 }
    let total = 0
    const rows = urut.map((b, i) => {
      const nom = Number(b.nominal || 0)
      const met = metodeTransaksi(b)
      if (sub[met] != null) sub[met] += nom
      total += nom
      const sm = santriMap.value[b.santri_id] || {}
      return {
        no: i + 1,
        tanggal: b.tanggal ? formatTgl(b.tanggal) : '',
        struk: b.trx_id || '',
        santri: b.santri_nama || sm.nama || '-',
        jenis: b.kategori || '',
        lembaga: kasLembagaDari(b) || 'Kas Induk',
        metode: met,
        nominal: fmtRp(nom)
      }
    })
    const barisJumlah = (label, nominal) => ({
      no: '',
      tanggal: '',
      struk: '',
      santri: label,
      jenis: '',
      lembaga: '',
      metode: '',
      nominal: fmtRp(nominal)
    })
    for (const m of METODE_OPTS) {
      if (!sub[m]) continue
      rows.push(barisJumlah(`SUBTOTAL ${m.toUpperCase()}`, sub[m]))
    }
    rows.push(barisJumlah(`TOTAL (${urut.length} baris)`, total))

    const bagian = [labelPeriode()]
    if (labelLembagaAktif.value) bagian.push(labelLembagaAktif.value)
    if (metodeOnly) bagian.push(metodeOnly.toUpperCase())
    const slug = [
      'pos',
      String(filterYear.value),
      filterMonth.value > 0 ? String(filterMonth.value).padStart(2, '0') : '',
      filterDay.value > 0 ? String(filterDay.value).padStart(2, '0') : '',
      labelLembagaAktif.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      metodeOnly.toLowerCase()
    ]
      .filter(Boolean)
      .join('-')
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop: buildKopFromSettings(settingsStore.settings || {}),
      title: `TRANSAKSI POS SANTRI — ${bagian.join(' — ')}`,
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'tanggal', header: 'Tanggal', width: 26 },
        { key: 'struk', header: 'No Struk', width: 26 },
        { key: 'santri', header: 'Santri', width: 56 },
        { key: 'jenis', header: 'Jenis', width: 44 },
        { key: 'lembaga', header: 'Kas Lembaga', width: 30 },
        { key: 'metode', header: 'Cara Bayar', width: 24 },
        { key: 'nominal', header: 'Nominal', width: 32 }
      ],
      rows,
      filename: `${slug}.pdf`
    })
    toast.success(metodeOnly ? `PDF POS ${metodeOnly} berhasil dibuat` : 'PDF POS berhasil dibuat')
  } catch (e) {
    toast.error('Gagal cetak: ' + (e?.message || e))
  }
}

function toTrx(t) {
  return {
    no_struk: t.trx_id,
    tanggal: t.tanggal,
    santri_nama: t.santri_nama,
    santri_nis: t.santri_nis,
    lembaga: t.lembaga,
    kelas: t.kelas,
    lembaga_sekolah: t.lembaga_sekolah || '',
    kelas_sekolah: t.kelas_sekolah || '',
    operator: t.operator,
    // v.94.0626: penyetor (wali) utk reprint struk
    penyetor: t.penyetor || '',
    // v.21.91.0527: TTD operator dari guru.tanda_tangan (untuk reprint struk PDF)
    operator_ttd_url: guruTtdMap.value[t.operator] || '',
    items: t.items,
    total: t.total,
    bayar: t.total,
    kembali: 0
  }
}

async function cetakPdf(t) {
  try {
    await cetakStrukPdf(toTrx(t), settingsStore.settings || {}, { preview: true })
  } catch (e) {
    toast.error('Gagal cetak PDF: ' + (e.message || e))
  }
}
// v.96.0626: reprint 2-ply -> GRAFIS RASTER ESC/P (bypass driver, TANPA feed 5cm), SAMA dgn "Cetak Langsung" POS.
async function cetakDot(t) {
  try {
    const s = settingsStore.settings || {}
    const res = await printRaw({
      base64: buildStrukSlipEscpBase64(toTrx(t), s),
      deviceName: getDefaultPrinter() || undefined
    })
    if (res && res.ok === false) throw new Error(res.error || 'Print gagal')
    toast.success('Struk dicetak ke printer')
  } catch (e) {
    toast.error('Gagal cetak: ' + (e.message || e))
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

<template>
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h2
            class="text-lg md:text-xl font-black text-[var(--text-primary)] flex items-center gap-2"
          >
            <i class="fas fa-receipt text-teal-600"></i>Riwayat Transaksi POS
          </h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Cetak ulang struk pembayaran santri.
          </p>
        </div>
        <button
          type="button"
          class="text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 px-3 py-2 rounded-xl hover:bg-teal-100"
          @click="router.push('/pos-santri')"
        >
          <i class="fas fa-cash-register mr-1"></i>Ke Kasir POS
        </button>
      </div>
    </div>

    <div
      v-if="!isAdminKeu"
      class="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-2xl p-5 text-center"
    >
      <i class="fas fa-lock text-3xl text-rose-600 mb-2"></i>
      <p class="text-sm font-bold text-rose-700 dark:text-rose-300">Akses Ditolak</p>
    </div>

    <template v-else>
      <!-- Filter -->
      <div
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
              placeholder="Cari nama santri..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <select
            v-model.number="filterYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="filterMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option :value="0">Semua bulan</option>
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select
            v-model.number="filterDay"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option :value="0">Semua tgl</option>
            <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
          </select>
          <!-- v.1.2.6 (Kyai): kas lembaga — menyetir isi PDF laporan, bukan daftar struk
               di bawah (satu transaksi bisa berisi komponen dua lembaga). -->
          <select
            v-model="filterLembaga"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua lembaga</option>
            <option
              v-for="o in rekapLembaga"
              :key="`pfl_${o.kunci || 'induk'}`"
              :value="o.kunci || KAS_INDUK"
            >
              {{ o.lembaga || 'Kas Induk' }} ({{ o.jumlah }})
            </option>
          </select>
        </div>
        <!-- v.1.2.6 (Kyai): laporan harian POS — per lembaga, dan berkas TERPISAH untuk
             tunai vs transfer (pengecekan manual setiap hari). -->
        <div class="flex flex-wrap items-center gap-2 mt-2">
          <button
            type="button"
            class="text-[11px] font-black px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white"
            @click="cetakLaporanPos()"
          >
            <i class="fas fa-file-pdf mr-1"></i>PDF Laporan
          </button>
          <button
            type="button"
            class="text-[11px] font-black px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white"
            @click="cetakLaporanPos('Tunai')"
          >
            <i class="fas fa-money-bill mr-1"></i>PDF Tunai
          </button>
          <button
            type="button"
            class="text-[11px] font-black px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white"
            @click="cetakLaporanPos('Transfer')"
          >
            <i class="fas fa-building-columns mr-1"></i>PDF Transfer
          </button>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">
            {{ barisLaporan.length }} baris kas
            <template v-if="labelLembagaAktif"> · {{ labelLembagaAktif }}</template>
            · {{ labelPeriode() }}
          </span>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">
            <i class="fas fa-database mr-1"></i>{{ entries.length }} baris termuat dari database
          </span>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-[var(--border-subtle)] text-center"
      >
        <i class="fas fa-spinner fa-spin text-2xl text-teal-600 mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)]">Memuat riwayat...</p>
      </div>

      <!-- List -->
      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-[var(--text-secondary)]"
            >{{ transaksi.length }} transaksi</span
          >
          <span class="text-xs font-black text-emerald-600"
            >Total: {{ fmtRpStruk(totalTampil) }}</span
          >
        </div>

        <p
          v-if="transaksi.length === 0"
          class="text-center text-[var(--text-tertiary)] py-8 text-sm"
        >
          Tidak ada transaksi.
        </p>

        <!-- v.21.100.0527: bulk action bar + select-all -->
        <div
          v-if="isAdmin && transaksi.length > 0"
          class="flex items-center justify-between gap-2 mb-2 px-2"
        >
          <label
            class="flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] cursor-pointer"
          >
            <input
              type="checkbox"
              :checked="selectedTrx.size === transaksi.length && transaksi.length > 0"
              class="w-4 h-4 accent-rose-600"
              @change="toggleSemuaTrx"
            />
            Pilih semua ({{ transaksi.length }})
          </label>
          <button
            v-if="selectedTrx.size > 0"
            type="button"
            class="text-[11px] font-black bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg"
            @click="hapusTrxTerpilih"
          >
            <i class="fas fa-trash mr-1"></i>Hapus Terpilih ({{ selectedTrx.size }})
          </button>
        </div>

        <ul v-if="transaksi.length > 0" class="space-y-2">
          <li
            v-for="t in transaksi"
            :key="t.key"
            class="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-elevated)]"
          >
            <div class="flex items-start justify-between gap-2">
              <input
                v-if="isAdmin"
                type="checkbox"
                :checked="selectedTrx.has(String(t.key))"
                class="w-4 h-4 mt-1 accent-rose-600 flex-shrink-0"
                title="Pilih transaksi"
                @change="toggleTrxSel(t.key)"
              />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                  {{ t.santri_nama }}
                </p>
                <p class="text-[10px] text-[var(--text-secondary)] truncate">
                  {{ fmtTgl(t.tanggal) }}<span v-if="t.lembaga"> · {{ t.lembaga }}</span
                  ><span v-if="t.kelas"> · {{ t.kelas }}</span> · {{ t.operator }} ·
                  {{ t.trx_id }}
                </p>
                <!-- v.1.2.6: warisan bug penomoran — satu nomor dipakai >1 transaksi.
                     Strukanya sudah dipisah per santri; nomornya saja yang kembar. -->
                <p v-if="t.nomorKembar" class="text-[10px] font-bold text-amber-600 mt-0.5">
                  <i class="fas fa-triangle-exclamation mr-1"></i>No. struk kembar dengan transaksi
                  lain
                </p>
                <div class="mt-1 flex flex-wrap gap-1">
                  <span
                    v-for="(it, i) in t.items"
                    :key="i"
                    class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
                  >
                    {{ it.jenis }} {{ fmtRpStruk(it.nominal) }}
                  </span>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-sm font-black text-emerald-600">{{ fmtRpStruk(t.total) }}</p>
                <!-- v.21.115.0528: standardize per design-tokens — PDF cyan (info action), struk dot neutral -->
                <div class="flex gap-1 mt-1.5 justify-end">
                  <button
                    type="button"
                    aria-label="Cetak struk PDF ber-KOP"
                    title="Cetak struk PDF ber-KOP"
                    class="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 px-2 py-1 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition"
                    @click="cetakPdf(t)"
                  >
                    <i class="fas fa-file-pdf mr-1"></i>PDF
                  </button>
                  <button
                    type="button"
                    aria-label="Cetak struk dot-matrix"
                    title="Cetak struk dot-matrix"
                    class="text-[10px] font-bold text-slate-700 dark:text-slate-200 bg-[var(--bg-muted)] px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                    @click="cetakDot(t)"
                  >
                    <i class="fas fa-print mr-1"></i>Struk
                  </button>
                  <button
                    v-if="isAdmin"
                    type="button"
                    class="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/30 px-2 py-1 rounded-lg hover:bg-rose-100"
                    title="Hapus transaksi (super admin)"
                    @click="hapusTrx(t)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
