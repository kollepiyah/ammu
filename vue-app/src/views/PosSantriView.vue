<script setup>
// v.55.0526: POS Santri page — pick santri, buka ModalPOS, save transaksi ke keuangan_buku_induk
// v.60.0526: Auto-load tagihan pending saat pick santri → populate cart otomatis
// v.20.70.0526: Tunggakan map + badge per santri card + filter 'hanya tunggakan'
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { collection, getDocs, doc, setDoc, updateDoc, serverTimestamp, query, orderBy, where, limit as fsLimit } from 'firebase/firestore'
import { db } from '@/services/firebase'
import ModalPOS from '@/components/pos/ModalPOS.vue'

const auth = useAuthStore()
const toast = useToast()

const santriList = ref([])
const loading = ref(true)
const searchKw = ref('')
const filterLembaga = ref('')
const selectedSantri = ref(null)
const modalOpen = ref(false)
const recentTrx = ref([])
const tunggakanMap = ref({}) // santri_id -> { count, total }
const filterTunggakan = ref(false) // toggle "hanya yg punya tunggakan"
// v.60.0526: pre-populated cart dari tagihan pending santri yang dipick
const initialCart = ref([])
const loadingTagihan = ref(false)

const operator = computed(() => auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin')

// Aksesibilitas: hanya admin keuangan / super admin
const canAccess = computed(() => {
  const rs = auth.sesiAktif?.role_sistem || ''
  return auth.sesiAktif?.role === 'admin' || ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
})

// Load santri sekali saat mount
onMounted(async () => {
  if (!canAccess.value) {
    toast.error('Akses ditolak — hanya admin keuangan yang bisa pakai POS Santri')
    loading.value = false
    return
  }
  try {
    // Santri list
    const snap = await getDocs(collection(db, 'santri'))
    santriList.value = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((s) => s.aktif !== false)
      .sort((a, b) => (a.nama || '').localeCompare(b.nama || ''))

    // Recent 5 transaksi POS
    const trxSnap = await getDocs(
      query(collection(db, 'keuangan_buku_induk'), orderBy('createdAt', 'desc'), fsLimit(5))
    )
    recentTrx.value = trxSnap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((t) => t.sumber === 'pos_santri')

    // v.20.70.0526: Load semua tagihan pending untuk hitung tunggakan per santri
    try {
      const tagSnap = await getDocs(collection(db, 'keuangan_tagihan'))
      const map = {}
      for (const d of tagSnap.docs) {
        const t = d.data()
        const st = String(t.status || 'belum').toLowerCase()
        if (st !== 'belum' && st !== 'partial') continue
        const sid = t.santri_id
        if (!sid) continue
        if (!map[sid]) map[sid] = { count: 0, total: 0 }
        map[sid].count++
        map[sid].total += Number(t.nominal || 0) - Number(t.dibayar || 0)
      }
      tunggakanMap.value = map
    } catch (er) {
      // eslint-disable-next-line no-console
      console.warn('[pos] load tunggakan fail:', er.message)
    }
  } catch (e) {
    toast.error('Gagal load data santri: ' + e.message)
  } finally {
    loading.value = false
  }
})

// Lembaga unik dari list
const lembagaOptions = computed(() => {
  const set = new Set(santriList.value.map((s) => s.lembaga).filter(Boolean))
  return Array.from(set).sort()
})

// Filtered santri
const filteredSantri = computed(() => {
  let list = santriList.value
  if (filterLembaga.value) list = list.filter((s) => s.lembaga === filterLembaga.value)
  if (filterTunggakan.value) list = list.filter((s) => tunggakanMap.value[s.id]?.count > 0)
  const kw = searchKw.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (s) =>
        String(s.nama || '').toLowerCase().includes(kw) ||
        String(s.nis || '').includes(kw) ||
        String(s.wa || '').includes(kw)
    )
  }
  if (filterTunggakan.value) {
    list = [...list].sort((a, b) => (tunggakanMap.value[b.id]?.total || 0) - (tunggakanMap.value[a.id]?.total || 0))
  }
  return list.slice(0, 50) // limit display untuk performa
})

async function pickSantri(s) {
  selectedSantri.value = s
  loadingTagihan.value = true
  initialCart.value = [] // reset

  // v.60.0526: Auto-load tagihan pending dari koleksi keuangan_tagihan
  // Filter: santri_id match + status 'belum' atau 'partial'
  try {
    const tagihanRef = collection(db, 'keuangan_tagihan')
    // Firestore tidak support `in` + multi-where complex, jadi pakai 2 query separate atau filter client-side
    const snap = await getDocs(query(tagihanRef, where('santri_id', '==', s.id), fsLimit(50)))
    const pendingTagihan = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((t) => t.status === 'belum' || t.status === 'partial')
      .sort((a, b) => (a.jatuh_tempo || '').localeCompare(b.jatuh_tempo || ''))

    if (pendingTagihan.length > 0) {
      initialCart.value = pendingTagihan.map((t) => ({
        jenis: t.jenis_label || t.jenis_id || 'Tagihan',
        nominal: Number(t.nominal || 0),
        keterangan: t.keterangan || (t.bulan ? `Bulan ${t.bulan}` : ''),
        tagihan_id: t.id
      }))
      toast.info(`${pendingTagihan.length} tagihan pending dimuat ke cart`)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[pos] load tagihan fail:', e.message)
  } finally {
    loadingTagihan.value = false
    modalOpen.value = true
  }
}

async function handleSimpan(payload) {
  try {
    // Build single transaksi record per item ke keuangan_buku_induk
    const tanggal = payload.tanggal
    const batch = []
    const tagihanToMarkLunas = []
    for (const item of payload.items) {
      const id = `pos_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      const record = {
        id,
        tanggal,
        tipe: 'masuk',
        kategori: item.jenis,
        nominal: item.nominal,
        keterangan: `${item.jenis} — ${payload.santri_nama} (${payload.santri_nis || payload.santri_id})${item.keterangan ? ' — ' + item.keterangan : ''}`,
        sumber: 'pos_santri',
        santri_id: payload.santri_id,
        santri_nama: payload.santri_nama,
        operator: payload.operator || operator.value,
        wali: '',
        createdAt: serverTimestamp()
      }
      batch.push(setDoc(doc(db, 'keuangan_buku_induk', id), record))
      recentTrx.value.unshift(record)

      // v.60.0526: kalau item link ke tagihan, mark lunas
      if (item.tagihan_id) {
        tagihanToMarkLunas.push(item.tagihan_id)
      }
    }

    // Mark tagihan as lunas (batch update paralel)
    for (const tagihanId of tagihanToMarkLunas) {
      batch.push(
        updateDoc(doc(db, 'keuangan_tagihan', tagihanId), {
          status: 'lunas',
          tanggal_lunas: tanggal,
          dibayar_via: 'pos_santri',
          operator_pelunasan: payload.operator || operator.value
        }).catch((e) => console.warn('[pos] update tagihan fail:', tagihanId, e.message))
      )
    }

    await Promise.all(batch)
    if (recentTrx.value.length > 5) recentTrx.value = recentTrx.value.slice(0, 5)

    const marker = tagihanToMarkLunas.length > 0 ? ` (${tagihanToMarkLunas.length} tagihan dilunasi)` : ''
    toast.success(`Sukses! ${payload.items.length} transaksi tersimpan untuk ${payload.santri_nama}${marker}`)
    modalOpen.value = false
    selectedSantri.value = null
    initialCart.value = []
  } catch (e) {
    toast.error('Gagal simpan: ' + e.message)
  }
}

function fmtRp(n) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n || 0))
}
function fmtTanggal(d) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}
</script>

<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between gap-2">
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <i class="fas fa-cash-register text-teal-600"></i>POS Santri
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pembayaran tagihan, syahriyah, tabungan, dll
          </p>
        </div>
        <span class="text-[10px] font-bold text-teal-700 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 px-2 py-1 rounded-full">
          {{ santriList.length }} santri aktif
        </span>
      </div>
    </div>

    <!-- Access denied -->
    <div v-if="!canAccess" class="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-2xl p-5 text-center">
      <i class="fas fa-lock text-3xl text-rose-600 mb-2"></i>
      <p class="text-sm font-bold text-rose-700 dark:text-rose-300">Akses Ditolak</p>
      <p class="text-xs text-rose-600 dark:text-rose-400 mt-1">
        Hanya admin keuangan / super admin yang bisa pakai POS Santri.
      </p>
    </div>

    <!-- Filter & search -->
    <div v-if="canAccess" class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-col md:flex-row gap-2">
        <div class="relative flex-1">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            v-model="searchKw"
            type="search"
            placeholder="Cari nama, NIS, atau WA wali..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        <select
          v-model="filterLembaga"
          class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua Lembaga</option>
          <option v-for="lem in lembagaOptions" :key="lem" :value="lem">{{ lem }}</option>
        </select>
        <label class="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-2.5 rounded-xl border border-rose-200 cursor-pointer hover:bg-rose-100">
          <input type="checkbox" v-model="filterTunggakan" class="w-4 h-4 accent-rose-600" />
          Tunggakan saja
        </label>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="canAccess && loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-slate-200 dark:border-slate-700 text-center">
      <i class="fas fa-spinner fa-spin text-2xl text-teal-600 mb-2"></i>
      <p class="text-sm text-slate-500">Memuat data santri...</p>
    </div>

    <!-- Santri grid -->
    <div v-if="canAccess && !loading" class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <p v-if="filteredSantri.length === 0" class="text-center text-slate-400 py-6 text-sm">
        Tidak ada santri yang cocok.
      </p>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <button
          v-for="s in filteredSantri"
          :key="s.id"
          @click="pickSantri(s)"
          class="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 transition cursor-pointer flex items-center gap-2.5"
        >
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-700 dark:to-cyan-700 flex items-center justify-center font-black text-teal-700 dark:text-teal-200 flex-shrink-0">
            {{ (s.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {{ s.nis || '—' }}{{ s.lembaga ? ' · ' + s.lembaga : '' }}{{ s.kelas ? ' · ' + s.kelas : '' }}
            </p>
            <p v-if="tunggakanMap[s.id]?.count > 0" class="text-[10px] font-black text-rose-600 mt-0.5">
              <i class="fas fa-exclamation-circle mr-1"></i>{{ tunggakanMap[s.id].count }} tagihan · {{ fmtRp(tunggakanMap[s.id].total) }}
            </p>
          </div>
          <i class="fas fa-chevron-right text-slate-300 text-xs"></i>
        </button>
      </div>
      <p v-if="filteredSantri.length === 50" class="text-center text-[10px] text-slate-400 mt-3">
        Menampilkan 50 santri pertama — refine pencarian untuk lihat lainnya
      </p>
    </div>

    <!-- Recent transactions -->
    <div v-if="canAccess && recentTrx.length > 0" class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest mb-2">
        <i class="fas fa-history text-cyan-600 mr-1"></i>Transaksi Terakhir
      </h3>
      <div class="space-y-1.5">
        <div
          v-for="t in recentTrx"
          :key="t.id"
          class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-xs"
        >
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate text-slate-700 dark:text-slate-200">{{ t.santri_nama }}</p>
            <p class="text-[10px] text-slate-500 truncate">{{ t.kategori }} · {{ fmtTanggal(t.tanggal) }}</p>
          </div>
          <span class="font-black text-emerald-600">{{ fmtRp(t.nominal) }}</span>
        </div>
      </div>
    </div>

    <!-- Modal POS — v.60.0526: pass initialCart untuk auto-populate tagihan pending -->
    <ModalPOS
      :open="modalOpen"
      :santri="selectedSantri"
      :operator="operator"
      :initial-cart="initialCart"
      @close="modalOpen = false; initialCart = []"
      @simpan="handleSimpan"
    />
  </div>
</template>
