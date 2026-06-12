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
            <i class="fas fa-receipt mr-1"></i>Hari ini: {{ todayStats.count }} · {{ fmtRp(todayStats.total) }}
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
      v-if="isAdminKeu && loading"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-[var(--border-subtle)] text-center"
    >
      <i class="fas fa-spinner fa-spin text-2xl text-teal-600 mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)]">Memuat data santri...</p>
    </div>

    <!-- Santri grid -->
    <div
      v-if="isAdminKeu && !loading"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <p v-if="filteredSantri.length === 0" class="text-center text-[var(--text-tertiary)] py-6 text-sm">
        Tidak ada santri yang cocok.
      </p>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <button
          v-for="s in filteredSantri"
          :key="s.id"
          @click="openModal(s)"
          class="text-left p-3 rounded-xl border border-[var(--border-subtle)] hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 transition cursor-pointer flex items-center gap-2.5"
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
      <p v-if="filteredSantri.length === 50" class="text-center text-[10px] text-[var(--text-tertiary)] mt-3">
        Menampilkan 50 santri pertama — refine pencarian untuk lihat lainnya
      </p>
    </div>

    <!-- Histori transaksi terakhir -->
    <div
      v-if="isAdminKeu && histori.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest mb-2">
        <i class="fas fa-history text-cyan-600 mr-1"></i>Transaksi Terakhir
      </h3>
      <div class="space-y-1.5">
        <div
          v-for="t in histori"
          :key="t.id"
          class="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-card-elevated)] text-xs"
        >
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate text-[var(--text-primary)]">{{ t.santri_nama }}</p>
            <p class="text-[10px] text-[var(--text-secondary)] truncate">
              {{ t.kategori }} · {{ fmtTgl(t.tanggal) }}
            </p>
          </div>
          <span class="font-black text-emerald-600">{{ fmtRp(t.nominal) }}</span>
        </div>
      </div>
    </div>

    <!-- Modal POS -->
    <ModalPOS
      :open="modalOpen"
      :santri="selectedSantri"
      :operator="operatorName"
      :pending-tagihan="pendingTagihan"
      :prepaid-periodes="prepaidPeriodes"
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
import { ref, computed, onMounted } from 'vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '@/services/firebase'
import { sortSantri } from '@/utils/santriSort'
import { cetakStrukPdf, cetakStrukSlipPdf, buildStrukHtml } from '@/utils/strukBuilder'
import { buildStrukSlipEscpBase64 } from '@/utils/escpImage'
import { isElectron, printStruk, printRaw, printPdf, getDefaultPrinter } from '@/composables/useDesktopPrint'
import { terbilangRupiah } from '@/utils/terbilang'
import { useSettingsStore } from '@/stores/settings'
import ModalPOS from '@/components/pos/ModalPOS.vue'

const auth = useAuthStore()
const toast = useToast()
const settingsStore = useSettingsStore()

const santriList = ref([])
const loading = ref(true)
const search = ref('')
const filterLembaga = ref('')
const selectedSantri = ref(null)
const modalOpen = ref(false)
const histori = ref([])
const tunggakanMap = ref({})
const filterTunggakan = ref(false)
const pendingTagihan = ref([])
const prepaidPeriodes = ref([]) // v.96.0626 audit: periode sudah ada tagihan -> anti-dobel bayar di muka
const loadingCart = ref(false)
// v.21.87.0527: ringkasan transaksi POS hari ini
const todayStats = ref({ count: 0, total: 0 })
// v.21.90.0527: counter transaksi unik hari ini (utk nomor struk MU-NNNddmmyy)
const todayTrxCount = ref(0)
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

onMounted(async () => {
  if (!isAdminKeu.value) {
    toast.error('Akses ditolak — hanya admin keuangan yang bisa pakai POS Santri')
    loading.value = false
    return
  }
  try {
    // Load santri
    const snap = await getDocs(collection(db, 'santri'))
    santriList.value = sortSantri(
      snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((s) => s.aktif !== false)
    )

    // Load transaksi terakhir POS Santri (utk histori + ringkasan harian)
    const histSnap = await getDocs(
      query(collection(db, 'keuangan_buku_induk'), orderBy('createdAt', 'desc'), limit(80))
    )
    const posTx = histSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((t) => t.sumber === 'pos_santri')
    histori.value = posTx.slice(0, 5)
    const hariIni = new Date().toISOString().split('T')[0]
    const txToday = posTx.filter((t) => t.tanggal === hariIni)
    todayStats.value = {
      count: txToday.length,
      total: txToday.reduce((s, t) => s + Number(t.nominal || 0), 0)
    }
    // v.21.90.0527: hitung jumlah TRANSAKSI unik (trx_id) hari ini utk seq nomor struk
    const trxIdsToday = new Set(txToday.map((t) => t.trx_id).filter(Boolean))
    todayTrxCount.value = trxIdsToday.size
    // v.21.91.0527: ambil TTD operator dari guru.tanda_tangan utk auto-isi struk PDF
    try {
      const myId = auth.sesiAktif?.id
      if (myId) {
        const gSnap = await getDocs(
          query(collection(db, 'guru'), where('id', '==', String(myId)), limit(1))
        )
        let ttd = ''
        if (!gSnap.empty) ttd = gSnap.docs[0].data().tanda_tangan || ''
        if (!ttd) {
          const all = await getDocs(query(collection(db, 'guru'), limit(500)))
          const me = all.docs.find(
            (d) => String(d.data().id) === String(myId) || d.data().nama === operatorName.value
          )
          ttd = me?.data().tanda_tangan || ''
        }
        operatorTtdUrl.value = ttd || ''
      }
    } catch (e) {
      console.warn('[pos] load ttd operator fail:', e.message)
    }

    // Load tunggakan map (count + total per santri_id)
    try {
      const tagSnap = await getDocs(collection(db, 'keuangan_tagihan'))
      const map = {}
      for (const t of tagSnap.docs) {
        const data = t.data()
        const status = String(data.status || 'belum').toLowerCase()
        if (status !== 'belum' && status !== 'partial') continue
        const sid = data.santri_id
        if (!sid) continue
        if (!map[sid]) map[sid] = { count: 0, total: 0 }
        map[sid].count++
        // v.21.104.0527: pakai field 'bayar' (selaras TagihanView), fallback 'dibayar' utk legacy
        map[sid].total += Number(data.nominal || 0) - Number(data.bayar || data.dibayar || 0)
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

const filteredSantri = computed(() => {
  let list = santriList.value
  if (filterLembaga.value) list = list.filter((s) => s.lembaga === filterLembaga.value)
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
  return list.slice(0, 50)
})

// v.95.0626: derive periode tagihan -> "Juni 2026" dari periode/bulan/jatuh_tempo (utk rincian struk)
const _BLN_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
function _namaBulan(n) {
  const i = parseInt(n, 10) - 1
  return _BLN_ID[i] || ''
}
function periodeTagihan(t) {
  if (!t) return ''
  // periode "2026-06" / "2026_6" -> "Juni 2026"
  let m = String(t.periode || '').match(/^(\d{4})[-_](\d{1,2})$/)
  if (m) return _namaBulan(m[2]) + ' ' + m[1]
  // periode sudah teks ("Juni 2026") -> pakai apa adanya
  if (t.periode && /[A-Za-z]/.test(String(t.periode))) return String(t.periode).trim()
  // bulan (angka/nama) + tahun (field tahun / dari jatuh_tempo)
  if (t.bulan) {
    const bln = /^\d+$/.test(String(t.bulan).trim()) ? _namaBulan(t.bulan) : String(t.bulan).trim()
    const thn = t.tahun || (String(t.jatuh_tempo || '').match(/^(\d{4})/) || [])[1] || ''
    if (bln) return (thn ? bln + ' ' + thn : bln)
  }
  // jatuh_tempo "2026-06-05" -> "Juni 2026"
  m = String(t.jatuh_tempo || '').match(/^(\d{4})-(\d{2})/)
  if (m) return _namaBulan(m[2]) + ' ' + m[1]
  return ''
}

async function openModal(s) {
  selectedSantri.value = s
  // v.94.0626: buka selalu di mode form (bukan sisa layar sukses transaksi sebelumnya)
  lastTrx.value = null
  loadingCart.value = true
  pendingTagihan.value = []
  prepaidPeriodes.value = []
  try {
    const tagCol = collection(db, 'keuangan_tagihan')
    // v.95.0626: FIX tagihan khusus tak muncul di POS — cocokkan santri_id sbg STRING (+ NUMBER bila numerik),
    //   tanpa limit, supaya SAMA dgn yg dilihat akun wali (yg pakai String(santri_id)).
    const sid = String(s.id)
    const seen = new Map()
    const qs = [getDocs(query(tagCol, where('santri_id', '==', sid)))]
    const sidNum = Number(sid)
    if (!Number.isNaN(sidNum) && String(sidNum) === sid) qs.push(getDocs(query(tagCol, where('santri_id', '==', sidNum))))
    const snaps = await Promise.all(qs)
    for (const snp of snaps) for (const d of snp.docs) seen.set(d.id, { id: d.id, ...d.data() })
    const pending = [...seen.values()]
      .filter((t) => t.status === 'belum' || t.status === 'partial')
      .sort((a, b) => (a.jatuh_tempo || '').localeCompare(b.jatuh_tempo || ''))
    // v.21.87.0527: kirim sisa (remaining) + meta utk pembayaran sebagian (partial)
    pendingTagihan.value = pending.map((t) => {
      const penuh = Number(t.nominal || 0)
      // v.21.104.0527: pakai 'bayar' fallback 'dibayar'
      const dibayar = Number(t.bayar || t.dibayar || 0)
      return {
        tagihan_id: t.id,
        jenis: t.jenis_label || t.jenis_id || t.kategori || 'Tagihan',
        nominal: Math.max(0, penuh - dibayar),
        nominal_penuh: penuh,
        dibayar_lama: dibayar,
        // v.95.0626: utamakan periode bersih "Juni 2026" utk rincian struk
        keterangan: periodeTagihan(t) || t.keterangan || ''
      }
    })
    prepaidPeriodes.value = [...seen.values()]
      .filter((t) => t.periode_kode)
      .map((t) => ({ jenis: String(t.jenis_label || t.jenis_id || t.kategori || '').toLowerCase().trim(), periode: String(t.periode_kode) }))
  } catch (e) {
    console.warn('[pos] load tagihan fail:', e.message)
  } finally {
    loadingCart.value = false
    modalOpen.value = true
  }
}

function closeModal() {
  modalOpen.value = false
  pendingTagihan.value = []
  // v.94.0626: reset transaksi terakhir + santri saat modal benar2 ditutup (selesai cetak)
  lastTrx.value = null
  selectedSantri.value = null
}

async function handleSimpan(payload) {
  posSaving.value = true
  try {
    const tanggal = payload.tanggal
    const op = payload.operator || operatorName.value
    // v.21.90.0527: format nomor struk MU-NNNddmmyy (seq harian + tgl)
    todayTrxCount.value += 1
    const seq = String(todayTrxCount.value).padStart(3, '0')
    const dt = String(tanggal || '').split('-')
    const ddmmyy = (dt[2] || '') + (dt[1] || '') + String(dt[0] || '').slice(-2)
    const trxId = 'MU-' + seq + ddmmyy
    const santriRef = selectedSantri.value
    // v.94.0626: nama penyetor = nama walisantri (wali -> nama_wali -> ayah)
    const waliNama =
      santriRef?.wali ||
      santriRef?.nama_wali ||
      santriRef?.nama_ayah ||
      (santriRef?.ayah && santriRef.ayah.nama) ||
      ''
    const writes = []
    let tagUpdErr = '' // v.95.0626: tangkap error update tagihan biar tidak gagal diam-diam (bug cicil)
    let lunasCount = 0
    let partialCount = 0
    let totalMasuk = 0
    for (const item of payload.items) {
      const id = `pos_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      const docData = {
        id,
        tanggal,
        tipe: 'masuk',
        kategori: item.jenis,
        nominal: item.nominal,
        keterangan: `${item.jenis} — ${payload.santri_nama} (${payload.santri_nis || payload.santri_id})${item.keterangan ? ' — ' + item.keterangan : ''}`,
        sumber: 'pos_santri',
        trx_id: trxId,
        metode: payload.metode || 'Tunai',
        santri_id: payload.santri_id,
        santri_nama: payload.santri_nama,
        operator: op,
        wali: waliNama,
        createdAt: serverTimestamp()
      }
      writes.push(setDoc(doc(db, 'keuangan_buku_induk', id), docData))
      histori.value.unshift(docData)
      totalMasuk += Number(item.nominal || 0)
      // v.21.87.0527: tagihan → lunas penuh atau partial (bayar sebagian)
      if (item.tagihan_id) {
        const penuh = Number(item.nominal_penuh || 0)
        const newDibayar = Number(item.dibayar_lama || 0) + Number(item.nominal || 0)
        const isLunas = penuh <= 0 || newDibayar >= penuh - 0.5
        const upd = isLunas
          ? {
              status: 'lunas',
              bayar: penuh || newDibayar,
              dibayar: penuh || newDibayar,
              tanggal_lunas: tanggal,
              dibayar_via: 'pos_santri',
              operator_pelunasan: op
            }
          : { status: 'partial', bayar: newDibayar, dibayar: newDibayar, dibayar_via: 'pos_santri', operator_pelunasan: op }
        if (isLunas) lunasCount++
        else partialCount++
        writes.push(
          updateDoc(doc(db, 'keuangan_tagihan', item.tagihan_id), upd).catch((e) => {
            console.warn('[pos] update tagihan fail:', item.tagihan_id, e.message)
            tagUpdErr = e.message || String(e)
          })
        )
      } else if (item.prepay && item.periode) {
        // v.108: bayar di muka — tagihan bulan depan belum ada, buat baru langsung LUNAS
        const tagId = `tagihan_${payload.santri_id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`
        writes.push(
          setDoc(doc(db, 'keuangan_tagihan', tagId), {
            id: tagId,
            santri_id: payload.santri_id,
            santri_nama: payload.santri_nama,
            kategori: item.jenis,
            periode: item.periode_label || item.periode,
            periode_kode: item.periode,
            nominal: Number(item.nominal),
            bayar: Number(item.nominal),
            dibayar: Number(item.nominal),
            status: 'lunas',
            jatuh_tempo: item.periode + '-10',
            tanggal_lunas: tanggal,
            dibayar_via: 'pos_santri',
            operator_pelunasan: op,
            trx_id: trxId,
            createdAt: serverTimestamp()
          }).catch((e) => {
            console.warn('[pos] buat tagihan prepay fail:', tagId, e.message)
            tagUpdErr = e.message || String(e)
          })
        )
        lunasCount++
      }
    }
    await Promise.all(writes)
    // v.95.0626: kalau update tagihan gagal (mis. dok tak ada / izin), beri tahu — jangan diam (bug cicil tetap 1jt)
    if (tagUpdErr) toast.error('Pembayaran tercatat, TAPI sisa tagihan GAGAL diperbarui: ' + tagUpdErr)
    if (histori.value.length > 5) histori.value = histori.value.slice(0, 5)
    // Update ringkasan harian
    todayStats.value = {
      count: todayStats.value.count + payload.items.length,
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
        keterangan: i.keterangan || ''
      })),
      total: _total,
      bayar: Number(payload.total_bayar || 0),
      kembali: Number(payload.kembalian || 0)
    }
    // v.94.0626: JANGAN tutup modal — tampilkan state sukses + tombol cetak DI DALAM modal POS.
    //   (lastTrx terisi -> ModalPOS otomatis pindah ke layar sukses.)
    pendingTagihan.value = []
  } catch (e) {
    toast.error('Gagal simpan: ' + e.message)
  } finally {
    posSaving.value = false
  }
}

function fmtRp(n) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n || 0))
}

// v.21.88.0527: cetak struk transaksi terakhir
async function cetakLastPdf() {
  if (!lastTrx.value) return
  try {
    await cetakStrukPdf(lastTrx.value, settingsStore.settings || {}, { preview: true })
  } catch (e) {
    toast.error('Gagal cetak PDF: ' + (e.message || e))
  }
}
// v.95.0626: "Struk Print" -> buka PDF slip grafis (pratinjau, bisa cetak manual) — format SAMA dgn Cetak Langsung
async function cetakLastDot() {
  if (!lastTrx.value) return
  try {
    await cetakStrukSlipPdf(lastTrx.value, settingsStore.settings || {}, { preview: true })
  } catch (e) {
    toast.error('Gagal buka struk: ' + (e.message || e))
  }
}
// v.07.0626: cetak langsung (silent) ke printer default Electron
async function cetakLangsung() {
  if (!lastTrx.value) return
  try {
    const s = settingsStore.settings || {}
    const paper = String(s.posStrukPaper || '9.5')
    const printerName = getDefaultPrinter()
    if (paper === '9.5') {
      // v.96.0626: cetak GRAFIS RASTER via ESC/P (bypass driver Windows -> TANPA feed 5cm, tetap Arial).
      //   Slip dirender ke canvas lalu dikirim sbg bit-image ESC/P langsung ke printer (print:raw).
      const res = await printRaw({ base64: buildStrukSlipEscpBase64(lastTrx.value, s), deviceName: printerName || undefined })
      if (res && res.ok === false) throw new Error(res.error || 'Print gagal')
    } else {
      const html = buildStrukHtml(lastTrx.value, s)
      await printStruk({ html, deviceName: printerName || undefined })
    }
    toast.success('Struk dikirim ke: ' + (printerName || 'printer default Windows'))
  } catch (e) {
    toast.error('Gagal cetak: ' + (e.message || e))
  }
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
