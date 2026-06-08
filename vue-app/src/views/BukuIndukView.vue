<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Akses Keuangan terbatas</p>
    </div>

    <template v-else>
      <!-- Header + stats + actions. v.98: disembunyikan di Electron (aksi -> pita "Aksi Halaman") -->
      <div
        v-if="!isDesktop"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <!-- v.21.113.0528: Header restructure — title + subtitle kiri, semua tombol aksi rapi di kanan (Ekspor/Input/Cetak), warna cyan konsisten -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div class="min-w-0">
            <h1 class="text-base md:text-lg font-black text-[var(--text-primary)] whitespace-nowrap">
              <i class="fas fa-book text-cyan-500 mr-1"></i>Buku Induk (General Ledger)
            </h1>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              Pusat data arus kas keluar/masuk seluruh lembaga · {{ getBulanLabel(selectedMonth) }}
              {{ selectedYear }}
            </p>
          </div>
          <!-- v.21.113.0528: tombol aksi grup kanan — Ekspor/Input/Cetak konsisten h-9 px-3 rounded-xl -->
          <div class="flex gap-2 flex-wrap items-center">
            <button
              @click="exportBukuIndukExcel"
              :disabled="exportingBI"
              aria-label="Ekspor Buku Induk ke Excel"
              class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
            >
              <i :class="['fas', exportingBI ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i>{{ exportingBI ? 'Ekspor...' : 'Ekspor Excel' }}
            </button>
            <button
              @click="bukaModalInput()"
              aria-label="Input transaksi manual"
              class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition cursor-pointer"
            >
              <i class="fas fa-plus-circle"></i>Input Manual
            </button>
            <button
              @click="cetakLaporan"
              aria-label="Cetak laporan buku induk PDF"
              class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer"
            >
              <i class="fas fa-file-pdf"></i>Cetak Laporan
            </button>
          </div>
        </div>
        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-2 md:gap-3 mt-3">
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-emerald-700 uppercase">Total Masuk</p>
            <p class="text-base md:text-lg font-black text-emerald-800 mt-1">
              {{ fmtRp(stats.pemasukan) }}
            </p>
          </div>
          <div class="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-rose-700 uppercase">Total Keluar</p>
            <p class="text-base md:text-lg font-black text-rose-800 mt-1">
              {{ fmtRp(stats.pengeluaran) }}
            </p>
          </div>
          <div
            :class="[
              'p-3 rounded-xl border-l-4',
              stats.saldo >= 0 ? 'bg-cyan-50 border-cyan-500' : 'bg-cyan-50 border-cyan-500'
            ]"
          >
            <p
              :class="[
                'text-[10px] font-bold uppercase',
                stats.saldo >= 0 ? 'text-cyan-700' : 'text-cyan-700'
              ]"
            >
              Saldo Akhir
            </p>
            <p
              :class="[
                'text-base md:text-lg font-black mt-1',
                stats.saldo >= 0 ? 'text-cyan-800' : 'text-cyan-800'
              ]"
            >
              {{ fmtRp(stats.saldo) }}
            </p>
          </div>
        </div>
      </div>

      <!-- v.72.16.0526: Input Manual Modal -->
      <Teleport to="body">
        <div
          v-if="modalInputOpen"
          @click.self="modalInputOpen = false"
          class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md">
            <form @submit.prevent="simpanInputManual" class="p-5">
              <h3 class="text-base font-black text-[var(--text-primary)] mb-4">
                <i class="fas fa-plus-circle text-emerald-600 mr-2"></i>Input Transaksi Manual
              </h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Tanggal *</label>
                  <input
                    v-model="inputForm.tanggal"
                    type="date"
                    required
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Tipe *</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      @click="inputForm.tipe = 'masuk'"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'masuk'
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-[var(--bg-card)] text-emerald-700 border-emerald-300'
                      ]"
                    >
                      <i class="fas fa-arrow-down mr-1"></i>Pemasukan
                    </button>
                    <button
                      type="button"
                      @click="inputForm.tipe = 'keluar'"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'keluar'
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-[var(--bg-card)] text-rose-700 border-rose-300'
                      ]"
                    >
                      <i class="fas fa-arrow-up mr-1"></i>Pengeluaran
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Kategori</label>
                  <input
                    v-model="inputForm.kategori"
                    type="text"
                    placeholder="Kategori"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Keterangan *</label>
                  <textarea
                    v-model="inputForm.keterangan"
                    required
                    rows="2"
                    placeholder="Deskripsi transaksi..."
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)] resize-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1">Nominal (Rp) *</label>
                  <input
                    v-model.number="inputForm.nominal"
                    type="number"
                    min="0"
                    required
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
              </div>
              <div class="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  @click="modalInputOpen = false"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="savingInput"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50"
                >
                  <i :class="['fas', savingInput ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                  {{ savingInput ? 'Menyimpan...' : 'Simpan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>

      <!-- Filter -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select
            v-model.number="selectedYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="selectedMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option :value="0">Semua bulan</option>
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select
            v-model="filterTipe"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua tipe</option>
            <option value="masuk">Pemasukan</option>
            <option value="keluar">Pengeluaran</option>
          </select>
          <input
            v-model="search"
            type="text"
            placeholder="Cari keterangan..."
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>
      </div>

      <!-- v.108: banner bersih-residu (super_admin) -->
      <div
        v-if="isAdmin && residuBuku.length > 0"
        class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-2 flex-wrap"
      >
        <span class="text-xs font-bold text-amber-800 dark:text-amber-300">
          <i class="fas fa-triangle-exclamation mr-1"></i>{{ residuBuku.length }} entri residu/tanpa tanggal valid (terhitung di dashboard, tak tampil di ledger)
        </span>
        <button
          type="button"
          @click="bersihkanResidu"
          class="text-[11px] font-black bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg"
        >
          <i class="fas fa-broom mr-1"></i>Bersihkan residu ({{ residuBuku.length }})
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-3"></i>
        <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat buku induk...</p>
      </div>

      <!-- Empty -->
      <div
        v-else-if="filteredBuku.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-book-open text-[var(--text-tertiary)] text-4xl mb-3"></i>
        <p class="text-sm font-bold text-[var(--text-primary)]">Tidak ada transaksi</p>
      </div>

      <!-- List -->
      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <!-- v.21.100.0527: bulk action bar -->
        <div
          v-if="isAdmin && selectedBuku.size > 0"
          class="px-4 py-2 bg-rose-50 dark:bg-rose-900/20 border-b border-rose-200 dark:border-rose-800 flex items-center justify-between gap-2"
        >
          <span class="text-[11px] font-bold text-rose-700 dark:text-rose-300">
            {{ selectedBuku.size }} record dipilih
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              @click="selectedBuku = new Set()"
              class="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]"
            >Batal</button>
            <button
              type="button"
              @click="hapusBukuTerpilih"
              class="text-[11px] font-black bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg"
            >
              <i class="fas fa-trash mr-1"></i>Hapus Terpilih ({{ selectedBuku.size }})
            </button>
          </div>
        </div>
        <!-- Table header (desktop) -->
        <div
          :class="['hidden md:grid gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider border-b border-[var(--border-subtle)]', isAdmin ? 'md:grid-cols-[36px_100px_1fr_120px_120px]' : 'md:grid-cols-[100px_1fr_120px_120px]']"
        >
          <span v-if="isAdmin" class="text-center">
            <input
              type="checkbox"
              :checked="selectedBuku.size === filteredBuku.length && filteredBuku.length > 0"
              @change="toggleSemuaBuku"
              class="w-4 h-4 accent-rose-600"
              title="Pilih semua"
            />
          </span>
          <span>Tanggal</span>
          <span>Keterangan</span>
          <span class="text-right">Masuk</span>
          <span class="text-right">Keluar</span>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="b in filteredBuku"
            :key="b.id"
            :class="['px-4 py-2.5 md:grid gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition', isAdmin ? 'md:grid-cols-[36px_100px_1fr_120px_120px]' : 'md:grid-cols-[100px_1fr_120px_120px]']"
          >
            <span v-if="isAdmin" class="md:text-center hidden md:inline-flex md:items-center md:justify-center">
              <input
                type="checkbox"
                :checked="selectedBuku.has(String(b.id))"
                @change="toggleBukuSel(b.id)"
                class="w-4 h-4 accent-rose-600"
              />
            </span>
            <span class="text-[11px] text-[var(--text-secondary)] font-bold whitespace-nowrap block md:inline">
              {{ formatTgl(b.tanggal) }}
            </span>
            <div class="md:inline">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{ b.keterangan || '-' }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                <span
                  v-if="b.kategori"
                  class="bg-[var(--bg-muted)] text-slate-700 dark:text-[var(--text-tertiary)] px-1.5 py-0.5 rounded font-bold"
                >
                  {{ b.kategori }}
                </span>
                <span v-if="b.ref_id" class="ml-1 text-[var(--text-tertiary)]">· #{{ b.ref_id }}</span>
              </p>
            </div>
            <div class="mt-1 md:mt-0 md:text-right">
              <span
                v-if="b.tipe === 'masuk' || Number(b.masuk) > 0"
                class="text-sm font-black text-emerald-700"
              >
                {{ fmtRp(b.masuk || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
            </div>
            <div class="md:text-right flex items-center md:justify-end gap-2">
              <span
                v-if="b.tipe === 'keluar' || Number(b.keluar) > 0"
                class="text-sm font-black text-rose-700"
              >
                {{ fmtRp(b.keluar || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
              <button
                v-if="b.sumber === 'pos_santri' && b.trx_id"
                type="button"
                @click="cetakUlangStruk(b, 'pdf')"
                class="text-[10px] text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 px-1.5 py-1 rounded"
                title="Cetak ulang struk PDF"
              >
                <i class="fas fa-file-pdf"></i>
              </button>
              <button
                v-if="b.sumber === 'pos_santri' && b.trx_id"
                type="button"
                @click="cetakUlangStruk(b, 'dot')"
                class="text-[10px] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 px-1.5 py-1 rounded"
                title="Cetak ulang struk dot-matrix"
              >
                <i class="fas fa-print"></i>
              </button>
              <button
                v-if="isAdmin"
                type="button"
                @click="bukaEditBuku(b)"
                class="text-[10px] text-cyan-600 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 px-1.5 py-1 rounded"
                title="Edit record (super admin)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                v-if="isAdmin"
                type="button"
                @click="hapusBuku(b)"
                class="text-[10px] text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 px-1.5 py-1 rounded"
                title="Hapus record (super admin)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filteredBuku.length }} transaksi · Vue 3 · Phase
        5.14
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { deleteOne } from '@/services/firestore' // v.91.0626: hapus = backup audit_log dulu
import { db } from '@/services/firebase'
import { fmtRp, formatTanggal as formatTgl } from '@/utils/format'
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'
// v.21.103.0527: reprint struk dari BukuInduk untuk record sumber pos_santri
import { cetakStrukPdf, cetakStrukSlipPdf } from '@/utils/strukBuilder'
import { collection as fbCollection, query as fbQuery, where as fbWhere, getDocs as fbGetDocs } from 'firebase/firestore'

const toast = useToast()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const { exportStyled } = useExcel()
// v.21.98.0527: super_admin only — bisa hapus record buku induk
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

// v.21.103.0527: reprint struk untuk record POS — group by trx_id
async function cetakUlangStruk(b, mode = 'pdf') {
  const trxId = b.trx_id || ''
  if (!trxId) {
    toast.warning('Record tidak punya trx_id — bukan dari POS Santri')
    return
  }
  try {
    // Fetch semua record dengan trx_id sama
    const snap = await fbGetDocs(
      fbQuery(fbCollection(db, 'keuangan_buku_induk'), fbWhere('trx_id', '==', trxId))
    )
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    if (items.length === 0) {
      toast.warning('Data transaksi tidak ditemukan')
      return
    }
    // Bangun struktur trx
    const first = items[0]
    const trx = {
      trx_id: trxId,
      no_struk: first.no_struk || trxId,
      tanggal: first.tanggal || '',
      santri_nama: first.santri_nama || '-',
      santri_nis: '',
      lembaga: '',
      kelas: '',
      operator: first.operator || '-',
      penyetor: first.wali || '',
      items: items.map((e) => ({
        jenis: e.kategori || 'Pembayaran',
        nominal: Number(e.nominal || 0),
        keterangan: ''
      })),
      total: items.reduce((sum, e) => sum + Number(e.nominal || 0), 0)
    }
    const sset = settingsStore.settings || {}
    // v.95.0626: 2 mode -> 'dot' = struk print 2-ply (PDF slip grafis), selain itu = Struk PDF (F4)
    if (mode === 'dot') {
      await cetakStrukSlipPdf(trx, sset, { preview: true })
    } else {
      await cetakStrukPdf(trx, sset)
    }
    toast.success('Struk dicetak ulang')
  } catch (e) {
    console.error('[cetakUlangStruk]', e)
    toast.error('Gagal cetak ulang: ' + (e.message || e))
  }
}

async function hapusBuku(b) {
  if (!isAdmin.value) return
  const label = b.keterangan || b.kategori || b.id
  if (!confirm(`Hapus PERMANEN record buku induk:\n${label}\nNominal: ${fmtRp(b.nominal || 0)}\n\nTidak bisa di-undo.`)) return
  try {
    await deleteOne('keuangan_buku_induk', b.id)
    toast.success('Record dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

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

const bukuRaw = ref([])
const loading = ref(true)
let unsub = null

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1) // 0 = semua bulan
const filterTipe = ref('')
const search = ref('')

// v.72.16.0526: Input Manual modal
const modalInputOpen = ref(false)
const savingInput = ref(false)
// v.21.99.0527: editingId untuk mode edit (super_admin koreksi nominal/keterangan)
const editingId = ref(null)
// v.21.100.0527: multi-select bulk delete (super_admin)
const selectedBuku = ref(new Set())
function toggleBukuSel(id) {
  const ns = new Set(selectedBuku.value)
  const sid = String(id)
  if (ns.has(sid)) ns.delete(sid)
  else ns.add(sid)
  selectedBuku.value = ns
}
function toggleSemuaBuku() {
  if (selectedBuku.value.size === filteredBuku.value.length && filteredBuku.value.length > 0) {
    selectedBuku.value = new Set()
  } else {
    selectedBuku.value = new Set(filteredBuku.value.map((b) => String(b.id)))
  }
}
async function hapusBukuTerpilih() {
  if (!isAdmin.value) return
  const ids = Array.from(selectedBuku.value)
  if (ids.length === 0) return
  if (!confirm(`Hapus ${ids.length} record buku induk terpilih?\n\nTidak bisa di-undo.`)) return
  let ok = 0, fail = 0
  for (const id of ids) {
    try {
      await deleteOne('keuangan_buku_induk', id)
      ok++
    } catch (e) {
      fail++
      console.warn('[bulkHapusBuku]', id, e.message)
    }
  }
  selectedBuku.value = new Set()
  // v.21.104.0527: audit log bulk delete
  await writeAuditLog({
    operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
    action: 'bulk_delete',
    target: 'keuangan_buku_induk',
    ids,
    detail: { ok, fail }
  })
  if (fail > 0) toast.warning(`${ok} dihapus, ${fail} gagal — cek console`)
  else toast.success(`${ok} record dihapus`)
}
// v.108: residu = entri tabungan-residu ATAU tanpa tanggal valid (ke-hitung di dashboard tapi tdk tampil di ledger)
const residuBuku = computed(() =>
  bukuRaw.value.filter((b) => {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    const tabungan = kat === 'tabungan' || sumber.includes('tabungan')
    const noTgl = !/^\d{4}-\d{2}/.test(String(b.tanggal || '').trim())
    return tabungan || noTgl
  })
)
async function bersihkanResidu() {
  if (!isAdmin.value) return
  const list = residuBuku.value
  if (list.length === 0) { toast.info('Tidak ada residu.'); return }
  if (!confirm(`Hapus ${list.length} entri residu/tak-bertanggal dari buku induk?\n\nIni entri yang ter-hitung di dashboard tapi TIDAK muncul di ledger. Tidak bisa di-undo.`)) return
  let ok = 0, fail = 0
  const ids = list.map((b) => String(b.id))
  for (const id of ids) {
    try { await deleteOne('keuangan_buku_induk', id); ok++ }
    catch (e) { fail++; console.warn('[bersihkanResidu]', id, e.message) }
  }
  await writeAuditLog({
    operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
    action: 'cleanup_residu',
    target: 'keuangan_buku_induk',
    ids,
    detail: { ok, fail }
  })
  if (fail > 0) toast.warning(`${ok} residu dihapus, ${fail} gagal — cek console`)
  else toast.success(`${ok} entri residu dibersihkan`)
}
const inputForm = reactive({
  tanggal: new Date().toISOString().slice(0, 10),
  tipe: 'masuk',
  kategori: '',
  keterangan: '',
  nominal: 0
})

function bukaModalInput() {
  editingId.value = null
  inputForm.tanggal = new Date().toISOString().slice(0, 10)
  inputForm.tipe = 'masuk'
  inputForm.kategori = ''
  inputForm.keterangan = ''
  inputForm.nominal = 0
  modalInputOpen.value = true
}

// v.21.99.0527: super_admin only — buka modal edit, prefill dari record
function bukaEditBuku(b) {
  if (!isAdmin.value) return
  editingId.value = String(b.id)
  inputForm.tanggal = b.tanggal || new Date().toISOString().slice(0, 10)
  inputForm.tipe = b.tipe || (Number(b.masuk) > 0 ? 'masuk' : 'keluar')
  inputForm.kategori = b.kategori || ''
  inputForm.keterangan = b.keterangan || ''
  inputForm.nominal = Number(b.nominal || b.masuk || b.keluar || 0)
  modalInputOpen.value = true
}

async function simpanInputManual() {
  if (!inputForm.keterangan.trim()) {
    toast.warning('Keterangan wajib diisi')
    return
  }
  if (!inputForm.nominal || inputForm.nominal <= 0) {
    toast.warning('Nominal harus > 0')
    return
  }
  savingInput.value = true
  try {
    // v.21.99.0527: mode edit (super_admin) vs create
    if (editingId.value) {
      const upd = {
        tanggal: inputForm.tanggal,
        tipe: inputForm.tipe,
        kategori: inputForm.kategori.trim() || 'Manual',
        keterangan: inputForm.keterangan.trim(),
        nominal: Number(inputForm.nominal) || 0
      }
      upd.masuk = upd.tipe === 'masuk' ? upd.nominal : 0
      upd.keluar = upd.tipe === 'keluar' ? upd.nominal : 0
      await updateDoc(doc(db, 'keuangan_buku_induk', editingId.value), upd)
      toast.success('Transaksi diperbarui')
    } else {
      const id = `bi_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
      const payload = {
        id,
        tanggal: inputForm.tanggal,
        tipe: inputForm.tipe,
        kategori: inputForm.kategori.trim() || 'Manual',
        keterangan: inputForm.keterangan.trim(),
        nominal: Number(inputForm.nominal) || 0,
        sumber: 'manual',
        operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
        createdAt: serverTimestamp()
      }
      if (inputForm.tipe === 'masuk') payload.masuk = payload.nominal
      else payload.keluar = payload.nominal
      await setDoc(doc(db, 'keuangan_buku_induk', id), payload)
      toast.success('Transaksi tersimpan')
    }
    modalInputOpen.value = false
    editingId.value = null
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingInput.value = false
  }
}

async function cetakLaporan() {
  // v.21.25.0526: jsPDF + autoTable (drop window.print)
  try {
    const settingsObj = settingsStore?.settings || {}
    const kop = buildKopFromSettings(settingsObj)
    const rows = (filteredBuku.value || []).map((b, i) => ({
      no: i + 1,
      tanggal: b.tanggal ? formatTgl(b.tanggal) : '',
      keterangan: b.keterangan || b.deskripsi || '',
      tipe: b.tipe || '',
      masuk: b.masuk ? fmtRp(b.masuk) : '',
      keluar: b.keluar ? fmtRp(b.keluar) : ''
    }))
    const periode =
      selectedMonth.value > 0
        ? `${BULAN[selectedMonth.value - 1]} ${selectedYear.value}`
        : `Tahun ${selectedYear.value}`
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: `BUKU INDUK KEUANGAN — ${periode}`,
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'tanggal', header: 'Tanggal', width: 30 },
        { key: 'keterangan', header: 'Keterangan', width: 90 },
        { key: 'tipe', header: 'Tipe', width: 25 },
        { key: 'masuk', header: 'Masuk', width: 35 },
        { key: 'keluar', header: 'Keluar', width: 35 }
      ],
      rows,
      filename: `buku-induk-${periode.replace(/\s+/g, '_')}.pdf`
    })
    toast.success('PDF buku induk berhasil dibuat')
  } catch (e) {
    toast.error('Gagal cetak: ' + (e?.message || e))
  }
}

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

const filteredBuku = computed(() => {
  // v.21.96.0527: Defensive — exclude residu tabungan dari buku induk.
  let list = bukuRaw.value.filter((b) => {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    if (kat === 'tabungan' || sumber === 'tabungan' || sumber.includes('tabungan')) return false
    return true
  })
  // Filter by year/month
  if (selectedMonth.value > 0) {
    const ym = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
    list = list.filter((b) => String(b.tanggal || '').substring(0, 7) === ym)
  } else {
    list = list.filter((b) => String(b.tanggal || '').startsWith(String(selectedYear.value)))
  }
  // Tipe
  if (filterTipe.value) {
    list = list.filter((b) => {
      if (filterTipe.value === 'masuk') return b.tipe === 'masuk' || Number(b.masuk) > 0
      if (filterTipe.value === 'keluar') return b.tipe === 'keluar' || Number(b.keluar) > 0
      return true
    })
  }
  // Search
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (b) =>
        String(b.keterangan || '')
          .toLowerCase()
          .includes(kw) ||
        String(b.kategori || '')
          .toLowerCase()
          .includes(kw) ||
        String(b.ref_id || '')
          .toLowerCase()
          .includes(kw)
    )
  }
  return list.sort(
    (a, b) =>
      (b.tanggal || '').localeCompare(a.tanggal || '') || (b.id || '').localeCompare(a.id || '')
  )
})

const stats = computed(() => {
  let masuk = 0,
    keluar = 0
  for (const b of filteredBuku.value) {
    if (b.tipe === 'masuk' || Number(b.masuk) > 0) {
      masuk += Number(b.masuk || b.nominal) || 0
    }
    if (b.tipe === 'keluar' || Number(b.keluar) > 0) {
      keluar += Number(b.keluar || b.nominal) || 0
    }
  }
  return { pemasukan: masuk, pengeluaran: keluar, saldo: masuk - keluar }
})

const years = computed(() => {
  const now = new Date().getFullYear()
  return [now - 2, now - 1, now, now + 1]
})

function getBulanLabel(m) {
  if (m === 0) return 'Sepanjang tahun'
  return BULAN[m - 1] || '-'
}

onMounted(() => {
  unsub = subscribeColl('keuangan_buku_induk', (docs) => {
    bukuRaw.value = docs
    loading.value = false
  })
})
onUnmounted(() => {
  if (unsub) {
    try {
      unsub()
    } catch (e) {}
  }
})

// v.21+: Export Excel Buku Induk Keuangan (kolom: no, tanggal, no_struk, keterangan, kategori, tipe, masuk, keluar, saldo)
const exportingBI = ref(false)
async function exportBukuIndukExcel() {
  if (exportingBI.value) return
  exportingBI.value = true
  try {
    const list = filteredBuku.value || bukuRaw.value || []
    const rows = list.map((b, i) => ({
      no: i + 1,
      tanggal: b.tanggal || '',
      no_struk: b.no_struk || '',
      keterangan: b.keterangan || b.deskripsi || '',
      kategori: b.kategori || '',
      tipe: b.tipe || (Number(b.masuk) > 0 ? 'Masuk' : 'Keluar'),
      masuk: b.masuk || (b.tipe === 'masuk' ? b.nominal : 0) || 0,
      keluar: b.keluar || (b.tipe === 'keluar' ? b.nominal : 0) || 0,
      saldo: b.saldo || 0
    }))
    const s = settingsStore.settings || {}
    await exportStyled(rows, {
      filename: `buku_induk_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Buku Induk',
      kop: [
        s.kopLine1 || '',
        s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
        s.kopLine3 || '',
        s.kopLine4 || ''
      ],
      subtitle: `Buku Induk Keuangan — ${rows.length} transaksi`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'tanggal', header: 'Tanggal', width: 12 },
        { key: 'no_struk', header: 'No Struk', width: 14 },
        { key: 'keterangan', header: 'Keterangan', width: 32 },
        { key: 'kategori', header: 'Kategori', width: 16 },
        { key: 'tipe', header: 'Tipe', width: 10 },
        { key: 'masuk', header: 'Masuk', width: 14 },
        { key: 'keluar', header: 'Keluar', width: 14 },
        { key: 'saldo', header: 'Saldo', width: 14 }
      ]
    })
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    exportingBI.value = false
  }
}

// v.98 full-native (Electron): header in-page disembunyikan, aksi -> grup pita "Aksi Halaman"
const { isElectron: isDesktop } = useDesktopShell()
definePageActions(() => {
  if (!isFullAccess.value) return []
  return [
    { label: 'Input Manual', icon: 'plus', primary: true, on: () => bukaModalInput() },
    { label: 'Ekspor Excel', icon: 'download', on: exportBukuIndukExcel, disabled: exportingBI.value },
    { label: 'Cetak Laporan', icon: 'printer', on: cetakLaporan }
  ]
})
</script>
