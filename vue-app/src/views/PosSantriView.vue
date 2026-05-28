<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header -->
    <div
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

    <!-- v.21.88.0527: Banner sukses + tombol cetak struk transaksi terakhir -->
    <div
      v-if="isAdminKeu && lastTrx"
      class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-2xl p-3 md:p-4 flex items-center justify-between gap-3 flex-wrap"
    >
      <div class="min-w-0">
        <p class="text-sm font-black text-emerald-800 dark:text-emerald-200">
          <i class="fas fa-check-circle mr-1"></i>Transaksi tersimpan
        </p>
        <p class="text-xs text-emerald-700 dark:text-emerald-300 truncate">
          {{ lastTrx.santri_nama }} · {{ fmtRp(lastTrx.total) }}
        </p>
      </div>
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          @click="cetakLastPdf"
          class="text-xs font-bold text-rose-700 bg-rose-100 dark:bg-rose-900/40 dark:text-rose-300 px-3 py-2 rounded-lg hover:bg-rose-200"
        >
          <i class="fas fa-file-pdf mr-1"></i>Struk PDF
        </button>
        <button
          type="button"
          @click="cetakLastDot"
          class="text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <i class="fas fa-print mr-1"></i>Struk Dot-matrix
        </button>
        <button
          type="button"
          @click="lastTrx = null"
          class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2"
          aria-label="Tutup"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

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
            placeholder="Cari nama, NIS, atau WA wali..."
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
      @close="closeModal"
      @simpan="handleSimpan"
    />
  </div>
</template>

<script setup>
// v.21+: POS Santri — kasir cepat pembayaran tagihan/syahriyah/tabungan dengan modal cart.
// Save ke keuangan_buku_induk (sumber='pos_santri') + auto-lunas tagihan terkait.
import { ref, computed, onMounted } from 'vue'
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
import { cetakStrukPdf, cetakStrukDotMatrix } from '@/utils/strukBuilder'
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
const loadingCart = ref(false)
// v.21.87.0527: ringkasan transaksi POS hari ini
const todayStats = ref({ count: 0, total: 0 })
// v.21.90.0527: counter transaksi unik hari ini (utk nomor struk MU-NNNddmmyy)
const todayTrxCount = ref(0)
// v.21.91.0527: TTD operator (kasir) — auto dari guru.tanda_tangan
const operatorTtdUrl = ref('')
// v.21.88.0527: transaksi terakhir (utk tombol cetak struk setelah simpan)
const lastTrx = ref(null)

const operatorName = computed(() => {
  return auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin'
})

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

async function openModal(s) {
  selectedSantri.value = s
  loadingCart.value = true
  pendingTagihan.value = []
  try {
    const tagCol = collection(db, 'keuangan_tagihan')
    const snap = await getDocs(query(tagCol, where('santri_id', '==', s.id), limit(50)))
    const pending = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((t) => t.status === 'belum' || t.status === 'partial')
      .sort((a, b) => (a.jatuh_tempo || '').localeCompare(b.jatuh_tempo || ''))
    // v.21.87.0527: kirim sisa (remaining) + meta utk pembayaran sebagian (partial)
    pendingTagihan.value = pending.map((t) => {
      const penuh = Number(t.nominal || 0)
      // v.21.104.0527: pakai 'bayar' fallback 'dibayar'
      const dibayar = Number(t.bayar || t.dibayar || 0)
      return {
        tagihan_id: t.id,
        jenis: t.jenis_label || t.jenis_id || 'Tagihan',
        nominal: Math.max(0, penuh - dibayar),
        nominal_penuh: penuh,
        dibayar_lama: dibayar,
        keterangan: t.keterangan || (t.bulan ? `Bulan ${t.bulan}` : '')
      }
    })
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
}

async function handleSimpan(payload) {
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
    const writes = []
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
        santri_id: payload.santri_id,
        santri_nama: payload.santri_nama,
        operator: op,
        wali: '',
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
          updateDoc(doc(db, 'keuangan_tagihan', item.tagihan_id), upd).catch((e) =>
            console.warn('[pos] update tagihan fail:', item.tagihan_id, e.message)
          )
        )
      }
    }
    await Promise.all(writes)
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
      operator: op,
      // v.21.90.0527: field tambahan utk struk Yayasan-style
      metode: 'TUNAI',
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
    modalOpen.value = false
    selectedSantri.value = null
    pendingTagihan.value = []
  } catch (e) {
    toast.error('Gagal simpan: ' + e.message)
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
function cetakLastDot() {
  if (lastTrx.value) cetakStrukDotMatrix(lastTrx.value, settingsStore.settings || {})
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
        