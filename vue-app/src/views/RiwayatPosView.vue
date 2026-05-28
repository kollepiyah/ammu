<script setup>
// v.21.88.0527: Riwayat Transaksi POS Santri — group per transaksi (trx_id), filter tanggal + cari,
// cetak ulang struk (PDF ber-KOP + dot-matrix).
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, query, orderBy, limit, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { cetakStrukPdf, cetakStrukDotMatrix, fmtRpStruk } from '@/utils/strukBuilder'
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'

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
    const tgts = entries.value.filter((e) => e.trx_id === t.trx_id)
    for (const e of tgts) {
      try {
        await deleteDoc(doc(db, 'keuangan_buku_induk', String(e.id)))
      } catch (er) {
        console.warn('[hapusTrx] fail', e.id, er.message)
      }
    }
    entries.value = entries.value.filter((e) => e.trx_id !== t.trx_id)
    toast.success(`Transaksi ${t.trx_id} dihapus (${tgts.length} record)`)
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
  if (!confirm(`Hapus ${tgt.length} transaksi POS terpilih (${totalRec} record di buku induk)?\n\nTidak bisa di-undo. Tagihan TIDAK auto-revert.`)) return
  let ok = 0, fail = 0
  const trxIds = tgt.map((t) => t.trx_id)
  const recIds = entries.value.filter((e) => trxIds.includes(e.trx_id)).map((e) => e.id)
  for (const id of recIds) {
    try {
      await deleteDoc(doc(db, 'keuangan_buku_induk', String(id)))
      ok++
    } catch (e) {
      fail++
      console.warn('[bulkHapusTrx]', id, e.message)
    }
  }
  entries.value = entries.value.filter((e) => !trxIds.includes(e.trx_id))
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
const santriMap = ref({}) // id -> {lembaga, kelas, nis}
const guruTtdMap = ref({}) // nama -> tanda_tangan URL (utk auto-isi TTD Penerima di struk PDF)
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
    // v.21.91.0527: guruTtdMap (nama -> tanda_tangan) utk auto-TTD di reprint struk PDF
    try {
      const gSnap = await getDocs(collection(db, 'guru'))
      const gm = {}
      for (const d of gSnap.docs) {
        const g = d.data()
        if (g.nama && g.tanda_tangan) gm[g.nama] = g.tanda_tangan
      }
      guruTtdMap.value = gm
    } catch (e) {
      /* ignore — fallback tanpa TTD */
    }
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

        <!-- v.21.100.0527: bulk action bar + select-all -->
        <div
          v-if="isAdmin && transaksi.length > 0"
          class="flex items-center justify-between gap-2 mb-2 px-2"
        >
          <label class="flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] cursor-pointer">
            <input
              type="checkbox"
              :checked="selectedTrx.size === transaksi.length && transaksi.length > 0"
              @change="toggleSemuaTrx"
              class="w-4 h-4 accent-rose-600"
            />
            Pilih semua ({{ transaksi.length }})
          </label>
          <button
            v-if="selectedTrx.size > 0"
            type="button"
            @click="hapusTrxTerpilih"
            class="text-[11px] font-black bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg"
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
                @change="toggleTrxSel(t.key)"
                class="w-4 h-4 mt-1 accent-rose-600 flex-shrink-0"
                title="Pilih transaksi"
              />
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
                  <button
                    v-if="isAdmin"
                    type="button"
                    @click="hapusTrx(t)"
                    class="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/30 px-2 py-1 rounded-lg hover:bg-rose-100"
                    title="Hapus transaksi (super admin)"
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
