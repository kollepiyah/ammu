<script setup>
// v.21.88.0527: Riwayat Transaksi POS Santri — group per transaksi (trx_id), filter tanggal + cari,
// cetak ulang struk (PDF ber-KOP + dot-matrix).
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { cetakStrukPdf, cetakStrukDotMatrix, fmtRpStruk } from '@/utils/strukBuilder'

const router = useRouter()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const toast = useToast()

const isAdminKeu = computed(() => {
  const rs = auth.sesiAktif?.role_sistem || ''
  return auth.sesiAktif?.role === 'admin' || ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
})

const loading = ref(true)
const entries = ref([]) // raw buku_induk pos rows
const santriMap = ref({}) // id -> {lembaga, kelas, nis}
const search = ref('')
const filterTanggal = ref('') // '' = semua

onMounted(async () => {
  if (!isAdminKeu.value) {
    loading.value = false
    return
  }
  try {
    const snap = await getDocs(
      query(collection(db, 'keuangan_buku_induk'), orderBy('createdAt', 'desc'), limit(400))
    )
    entries.value = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((t) => t.sumber === 'pos_santri')
    // lookup santri utk lembaga/kelas
    const sSnap = await getDocs(collection(db, 'santri'))
    const m = {}
    for (const d of sSnap.docs) {
      const s = d.data()
      m[d.id] = { lembaga: s.lembaga || '', kelas: s.kelas || '', nis: s.nis || '' }
    }
    santriMap.value = m
  } catch (e) {
    toast.error('Gagal memuat riwayat: ' + (e.message || e))
  } finally {
    loading.value = false
  }
})

// Group jadi transaksi: pakai trx_id; fallback santri_id + tanggal + operator
const transaksi = computed(() => {
  const groups = {}
  for (const e of entries.value) {
    const key = e.trx_id || `${e.santri_id}__${e.tanggal}__${e.operator || ''}`
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
        tanggal: e.tanggal || '',
        operator: e.operator || '-',
        createdAt: e.createdAt || null,
        items: [],
        total: 0
      }
    }
    groups[key].items.push({
      jenis: e.kategori || 'Pembayaran',
      nominal: Number(e.nominal || 0),
      keterangan: e.keterangan || ''
    })
    groups[key].total += Number(e.nominal || 0)
  }
  let list = Object.values(groups)
  // filter tanggal
  if (filterTanggal.value) list = list.filter((t) => t.tanggal === filterTanggal.value)
  // search nama
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((t) => String(t.santri_nama).toLowerCase().includes(kw))
  // urut terbaru
  return list.sort((a, b) => {
    const ta = a.createdAt?.seconds || 0
    const tb = b.createdAt?.seconds || 0
    if (tb !== ta) return tb - ta
    return String(b.tanggal).localeCompare(String(a.tanggal))
  })
})

const totalTampil = computed(() => transaksi.value.reduce((s, t) => s + t.total, 0))

function toTrx(t) {
  return {
    no_struk: t.trx_id,
    tanggal: t.tanggal,
    santri_nama: t.santri_nama,
    santri_nis: t.santri_nis,
    lembaga: t.lembaga,
    kelas: t.kelas,
    operator: t.operator,
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
function cetakDot(t) {
  cetakStrukDotMatrix(toTrx(t), settingsStore.settings || {})
}

function fmtTgl(t) {
  if (!t) return '—'
  try {
    return new Date(t).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return t
  }
}
</script>

<template>
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h2 class="text-lg md:text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
            <i class="fas fa-receipt text-teal-600"></i>Riwayat Transaksi POS
          </h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Cetak ulang struk pembayaran santri.</p>
        </div>
        <button
          type="button"
          @click="router.push('/pos-santri')"
          class="text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 px-3 py-2 rounded-xl hover:bg-teal-100"
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
      <div class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex flex-col md:flex-row gap-2">
          <div class="relative flex-1">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"></i>
            <input
              v-model="search"
              type="search"
              placeholder="Cari nama santri..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <input
            v-model="filterTanggal"
            type="date"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <button
            v-if="filterTanggal"
            type="button"
            @click="filterTanggal = ''"
            class="px-3 py-2.5 text-xs font-bold rounded-xl border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
          >
            Semua tanggal
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-[var(--border-subtle)] text-center">
        <i class="fas fa-spinner fa-spin text-2xl text-teal-600 mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)]">Memuat riwayat...</p>
      </div>

      <!-- List -->
      <div v-else class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-[var(--text-secondary)]">{{ transaksi.length }} transaksi</span>
          <span class="text-xs font-black text-emerald-600">Total: {{ fmtRpStruk(totalTampil) }}</span>
        </div>

        <p v-if="transaksi.length === 0" class="text-center text-[var(--text-tertiary)] py-8 text-sm">
          Tidak ada transaksi.
        </p>

        <ul v-else class="space-y-2">
          <li
            v-for="t in transaksi"
            :key="t.key"
            class="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-elevated)]"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ t.santri_nama }}</p>
                <p class="text-[10px] text-[var(--text-secondary)] truncate">
                  {{ fmtTgl(t.tanggal) }}<span v-if="t.lembaga"> · {{ t.lembaga }}</span
                  ><span v-if="t.kelas"> · {{ t.kelas }}</span> · {{ t.operator }}
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
                <div class="flex gap-1 mt-1.5 justify-end">
                  <button
                    type="button"
                    @click="cetakPdf(t)"
                    class="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/30 px-2 py-1 rounded-lg hover:bg-rose-100"
                    title="Cetak struk PDF ber-KOP"
                  >
                    <i class="fas fa-file-pdf mr-1"></i>PDF
                  </button>
                  <button
                    type="button"
                    @click="cetakDot(t)"
                    class="text-[10px] font-bold text-slate-700 dark:text-slate-200 bg-[var(--bg-muted)] px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
                    title="Cetak struk dot-matrix"
                  >
                    <i class="fas fa-print mr-1"></i>Struk
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
