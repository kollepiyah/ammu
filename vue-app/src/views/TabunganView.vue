<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- v.20.12.0526: santri BOLEH view tabungan-nya sendiri (override permission lock) -->
    <div v-if="!isFullAccess && !isSantriOnly" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses Keuangan terbatas</p>
    </div>

    <!-- SANTRI VIEW personal — banner saldo + riwayat mutasi (match legacy) -->
    <template v-else-if="isSantriOnly">
      <div class="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
        <img src="/logo.png" alt="" aria-hidden="true" class="absolute -right-6 -top-6 w-36 h-36 object-contain opacity-10 pointer-events-none" />
        <div class="relative">
          <p class="text-[10px] font-black uppercase tracking-widest opacity-90"><i class="fas fa-piggy-bank mr-1"></i>Tabungan Saya</p>
          <h2 class="text-xl md:text-2xl font-black mt-1 drop-shadow">{{ namaSantri }}</h2>
          <p class="text-[10px] font-bold uppercase tracking-widest opacity-90 mt-4">Saldo Tabungan</p>
          <p class="text-3xl md:text-4xl font-black mt-1 drop-shadow">{{ saldoSayaFmt }}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div class="px-4 md:px-5 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
            <i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Mutasi
          </h3>
          <span class="text-[10px] text-slate-400 font-bold">{{ mutasiSaya.length }} transaksi</span>
        </div>

        <div v-if="loading" class="p-10 text-center">
          <i class="fas fa-spinner fa-spin text-emerald-500 text-2xl mb-2"></i>
          <p class="text-xs text-slate-500 font-bold">Memuat...</p>
        </div>
        <div v-else-if="mutasiSaya.length === 0" class="p-10 border-t-2 border-dashed border-slate-200 text-center">
          <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
          <p class="text-sm text-slate-500 italic">Belum ada mutasi tabungan.</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 dark:bg-slate-900/40 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
              <tr>
                <th class="px-4 py-2.5 text-left">Tanggal</th>
                <th class="px-4 py-2.5 text-left">Jenis</th>
                <th class="px-4 py-2.5 text-right">Nominal</th>
                <th class="px-4 py-2.5 text-right">Saldo</th>
                <th class="px-4 py-2.5 text-left">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in mutasiSaya" :key="m.id" class="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30">
                <td class="px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 whitespace-nowrap">{{ fmtTgl(m.tanggal) }}</td>
                <td class="px-4 py-2.5">
                  <span :class="[
                    'inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded',
                    m.jenis === 'setor' || m.tipe === 'masuk' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  ]">
                    {{ m.jenis || m.tipe || '-' }}
                  </span>
                </td>
                <td :class="[
                  'px-4 py-2.5 text-right font-black whitespace-nowrap',
                  m.jenis === 'setor' || m.tipe === 'masuk' ? 'text-emerald-700' : 'text-rose-700'
                ]">{{ fmtRp(m.nominal) }}</td>
                <td class="px-4 py-2.5 text-right text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{{ fmtRp(m.saldo_after || m.saldo) }}</td>
                <td class="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">{{ m.catatan || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- ADMIN VIEW (full list, search) -->
    <template v-else>
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i class="fas fa-piggy-bank text-emerald-500 mr-2"></i>Tabungan
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">Saldo tabungan santri</p>
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <div class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs">
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">{{ totalSaldoFmt }}</span>
            </div>
            <!-- v.20.80.0526: tombol Input Mutasi (M2 auto-fill syahriyah) -->
            <button @click="openMutasiModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow">
              <i class="fas fa-plus mr-1"></i>Input Mutasi
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="relative">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-emerald-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat...</p>
      </div>
      <div v-else-if="filteredItems.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
        <i class="fas fa-wallet text-slate-300 text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada tabungan</p>
      </div>
      <!-- v.21.24b.0526: Orphan tabungan tool — admin bisa kosongkan saldo orphan (cleanup) -->
      <div v-if="orphanStats.count > 0" class="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-2">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <p class="text-xs font-bold text-rose-800">
            <i class="fas fa-exclamation-triangle mr-1"></i>{{ orphanStats.count }} mutasi orphan (santri_id tidak ada di koleksi santri) — {{ fmtRp(orphanStats.totalSaldo) }}
          </p>
          <div class="flex gap-1.5 flex-wrap">
            <button @click="dumpOrphansToConsole" class="text-[11px] font-bold text-rose-700 bg-white border border-rose-300 px-2 py-1 rounded hover:bg-rose-100 cursor-pointer">
              <i class="fas fa-terminal mr-1"></i>Dump console
            </button>
            <button v-if="isFullAccess" @click="cleanupOrphanTabungan" :disabled="orphanCleaning" class="text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 px-2 py-1 rounded cursor-pointer">
              <i :class="['fas', orphanCleaning ? 'fa-spinner fa-spin' : 'fa-broom', 'mr-1']"></i>{{ orphanCleaning ? 'Membersihkan...' : 'Hapus Mutasi Orphan' }}
            </button>
          </div>
        </div>
        <p class="text-[10px] text-rose-600 mt-1.5"><i class="fas fa-info-circle mr-1"></i>Mutasi orphan = transaksi yang santri-nya sudah dihapus dari data santri. "Hapus Mutasi Orphan" akan menghapus permanen seluruh record `keuangan_tabungan_santri` dengan santri_id tersebut.</p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="t in filteredItems"
          :key="t.id"
          class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-emerald-200 dark:border-emerald-700 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
                {{ getNamaSantri(t.santri_id) !== '(unknown)' ? getNamaSantri(t.santri_id) : (t.nama_cache || `(orphan ID: ${t.santri_id})`) }}
              </p>
              <p class="text-[10px] text-slate-500">{{ t.terakhir_update ? `Update: ${fmtTgl(t.terakhir_update)}` : '' }}</p>
            </div>
            <p class="text-base font-black text-emerald-700 dark:text-emerald-400 mr-2">
              {{ fmtRp(t.saldo) }}
            </p>
            <!-- v.20.80.0526: per-row quick action -->
            <div class="flex gap-1">
              <button @click="openMutasiModal(t.santri_id, 'setor')" class="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-[10px] font-black px-2 py-1 rounded" title="Setor">
                <i class="fas fa-plus"></i>
              </button>
              <button @click="openMutasiModal(t.santri_id, 'tarik')" class="bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-black px-2 py-1 rounded" title="Tarik">
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- v.20.80.0526: Modal Input Mutasi Tabungan (M2 auto-fill syahriyah) -->
    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3" @click.self="closeModal">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h3 class="text-base font-black text-slate-800 dark:text-white">
            <i class="fas fa-piggy-bank text-emerald-500 mr-2"></i>Input Mutasi Tabungan
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700"><i class="fas fa-times text-lg"></i></button>
        </div>
        <form @submit.prevent="simpanMutasi" class="p-5 space-y-3">
          <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Santri</label>
            <input
              v-model="modalSantriQuery"
              list="tabungan-santri-list"
              placeholder="Ketik nama santri..."
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              @input="onSantriQueryChange"
              required
            />
            <datalist id="tabungan-santri-list">
              <option v-for="s in santriDatalist" :key="s.id" :value="`${s.nama} (${s.lembaga || ''} - ${s.kelas || ''})`"></option>
            </datalist>
            <p v-if="modalSantriId" class="text-[10px] mt-1 text-emerald-700 font-bold">
              <i class="fas fa-check-circle mr-1"></i>Saldo: {{ fmtRp(modalSantriSaldo) }}
            </p>
            <p v-else-if="modalSantriQuery.length >= 2" class="text-[10px] mt-1 text-rose-600 font-bold">
              Santri tidak ditemukan — pilih dari saran.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Jenis</label>
              <select v-model="modalJenis" class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none">
                <option value="setor">Setor</option>
                <option value="tarik">Tarik</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Kategori</label>
              <select v-model="modalKategori" @change="onKategoriChange" class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none">
                <option v-for="j in jenisTagihanList" :key="j.id" :value="j.id">{{ j.label }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              Nominal
              <span v-if="autoFilledFromKategori" class="text-emerald-600 normal-case font-bold ml-1">
                <i class="fas fa-magic mr-1"></i>auto-fill {{ kategoriLabelById(modalKategori) }}
              </span>
            </label>
            <input
              v-model.number="modalNominal"
              type="number"
              min="0"
              placeholder="Rp 0"
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none font-black text-lg text-emerald-700"
              required
            />
            <p class="text-[10px] mt-1 text-slate-500">{{ fmtRp(modalNominal) }}</p>
          </div>

          <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Catatan (opsional)</label>
            <input
              v-model="modalCatatan"
              type="text"
              placeholder="Misal: angsuran bulan Mei"
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button type="button" @click="closeModal" class="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg">
              Batal
            </button>
            <button type="submit" :disabled="saving || !modalSantriId || !modalNominal" class="px-5 py-2 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
              <i class="fas fa-save mr-1"></i>{{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useKeuangan } from '@/composables/useKeuangan'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { subscribeColl, setOne } from '@/services/firestore'
import { fmtRp, fmtTgl } from '@/utils/format'

const { tabunganSantri, loading, isFullAccess, getNamaSantri, santriRaw } = useKeuangan()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const isSantriOnly = computed(() => auth.sesiAktif?.role === 'santri')

// v.20.12.0526: data personal santri
const namaSantri = computed(() => auth.sesiAktif?.nama || '-')
const myId = computed(() => String(auth.sesiAktif?.id || ''))

// v.20.16.0526: Saldo santri = aggregate mutasi (setor - tarik) bukan field doc
const saldoSaya = computed(() => {
  let saldo = 0
  for (const m of mutasiRaw.value) {
    if (String(m.santri_id || m.santriId) !== myId.value) continue
    const nominal = Number(m.nominal) || 0
    const jenis = String(m.jenis || '').toLowerCase()
    if (jenis === 'setor') saldo += nominal
    else if (jenis === 'tarik') saldo -= nominal
  }
  return saldo
})
const saldoSayaFmt = computed(() => fmtRp(saldoSaya.value))

// Riwayat mutasi (subscribe ke koleksi tabungan_mutasi atau tabungan_history)
const mutasiRaw = ref([])
let unsubMutasi = null

const mutasiSaya = computed(() => {
  return mutasiRaw.value
    .filter((m) => String(m.santri_id || m.santriId) === myId.value)
    .sort((a, b) => {
      const ta = new Date(a.tanggal || a.created_at || 0).getTime()
      const tb = new Date(b.tanggal || b.created_at || 0).getTime()
      return tb - ta
    })
})

onMounted(() => {
  // v.20.15.0526: subscribe mutasi tabungan santri match legacy collection name
  if (isSantriOnly.value) {
    unsubMutasi = subscribeColl('keuangan_tabungan_santri', (docs) => {
      mutasiRaw.value = docs
    })
  }
})
onUnmounted(() => {
  if (unsubMutasi) {
    try { unsubMutasi() } catch (e) {}
    unsubMutasi = null
  }
})

// === Admin view state ===
// v.20.16.0526: Tabungan admin view — group mutasi by santri_id, compute saldo dari sum (setor - tarik)
// Legacy: doc keuangan_tabungan_santri = MUTASI per transaksi, BUKAN saldo per santri
const search = ref('')
const aggregated = computed(() => {
  const byId = {}
  for (const m of tabunganSantri.value) {
    const sid = String(m.santri_id || m.santriId || '')
    if (!sid) continue
    if (!byId[sid]) byId[sid] = { santri_id: sid, saldo: 0, terakhir_update: '', nama_cache: m.nama || '' }
    const nominal = Number(m.nominal) || 0
    const jenis = String(m.jenis || '').toLowerCase()
    if (jenis === 'setor') byId[sid].saldo += nominal
    else if (jenis === 'tarik') byId[sid].saldo -= nominal
    const tgl = String(m.tanggal || '')
    if (tgl && tgl > byId[sid].terakhir_update) byId[sid].terakhir_update = tgl
  }
  return Object.values(byId)
})
const filteredItems = computed(() => {
  const kw = search.value.trim().toLowerCase()
  let result = [...aggregated.value]
  if (kw) {
    result = result.filter((t) => {
      const nama = getNamaSantri(t.santri_id) || t.nama_cache || ''
      return nama.toLowerCase().includes(kw)
    })
  }
  return result.sort((a, b) => (Number(b.saldo) || 0) - (Number(a.saldo) || 0))
})
// v.20.70.0526: Orphan diagnostic — mutasi tanpa santri valid
const orphanStats = computed(() => {
  const orphans = aggregated.value.filter((t) => getNamaSantri(t.santri_id) === '(unknown)' && !t.nama_cache)
  return { count: orphans.length, totalSaldo: orphans.reduce((s, o) => s + Number(o.saldo || 0), 0), ids: orphans.map(o => o.santri_id) }
})
// v.21.24b.0526: Cleanup orphan tabungan — hapus permanen mutasi yang santri_id-nya tidak ada
const orphanCleaning = ref(false)
async function cleanupOrphanTabungan() {
  const orphanIds = orphanStats.value.ids
  if (orphanIds.length === 0) return
  // Konfirmasi via window.confirm (untuk pakai useConfirm perlu import — pakai native untuk simple)
  const msg = `Hapus PERMANEN ${orphanStats.value.count} mutasi orphan?\n\nsantri_id: ${orphanIds.join(', ')}\nTotal saldo: ${fmtRp(orphanStats.value.totalSaldo)}\n\nMutasi ini akan hilang dari database. Tidak bisa di-undo.`
  if (!window.confirm(msg)) return
  orphanCleaning.value = true
  let ok = 0, fail = 0
  try {
    const { deleteDoc, doc } = await import('firebase/firestore')
    const { db } = await import('@/services/firebase')
    // Hapus semua mutasi yang santri_id ada di orphanIds
    const targetMutasi = mutasiRaw.value.filter((m) => orphanIds.includes(m.santri_id))
    for (const m of targetMutasi) {
      try {
        await deleteDoc(doc(db, 'keuangan_tabungan_santri', String(m.id)))
        ok++
      } catch (e) {
        fail++
        // eslint-disable-next-line no-console
        console.error('[cleanupOrphan] gagal hapus', m.id, e)
      }
    }
    if (fail > 0) toast.warning(`Cleanup: ${ok} hapus, ${fail} gagal — cek console`)
    else toast.success(`${ok} mutasi orphan dihapus`)
  } catch (e) {
    toast.error('Gagal cleanup: ' + (e.message || e))
  } finally {
    orphanCleaning.value = false
  }
}

function dumpOrphansToConsole() {
  // eslint-disable-next-line no-console
  console.group('[TabunganView] Orphan mutasi diagnostic')
  // eslint-disable-next-line no-console
  console.log('Orphan santri_id list:', orphanStats.value.ids)
  // eslint-disable-next-line no-console
  console.log('Total saldo orphan:', orphanStats.value.totalSaldo)
  // eslint-disable-next-line no-console
  console.log('Detail:', aggregated.value.filter((t) => orphanStats.value.ids.includes(t.santri_id)))
  // eslint-disable-next-line no-console
  console.groupEnd()
  alert('Orphan dump tersimpan di console (F12). ' + orphanStats.value.count + ' santri_id tidak terhubung ke koleksi santri.')
}

const totalSaldoFmt = computed(() =>
  fmtRp(aggregated.value.reduce((sum, t) => sum + (Number(t.saldo) || 0), 0))
)

// === v.20.80.0526: Modal Input Mutasi Tabungan (M2 auto-fill syahriyah) ===
const modalOpen = ref(false)
const modalSantriId = ref('')
const modalSantriQuery = ref('')
const modalJenis = ref('setor')
const modalKategori = ref('syahriyah')
const modalNominal = ref(0)
const modalCatatan = ref('')
const saving = ref(false)
const autoFilledFromKategori = ref(false)

// Jenis tagihan list dari settings (sumber syahriyah nominal_default)
const jenisTagihanList = computed(() => {
  const raw = settings.settings?.keuTagihanJenis
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((j) => ({
      id: j.id || String(j.label || j.nama || '').toLowerCase().replace(/\s+/g, '_'),
      label: j.label || j.nama || j.id || '-',
      nominal_default: Number(j.nominal_default || j.nominal || 0) || 0
    }))
  }
  return [{ id: 'syahriyah', label: 'Syahriyah', nominal_default: 0 }]
})

function kategoriLabelById(id) {
  return jenisTagihanList.value.find((j) => j.id === id)?.label || id
}

const modalSantriSaldo = computed(() => {
  if (!modalSantriId.value) return 0
  const t = aggregated.value.find((x) => String(x.santri_id) === String(modalSantriId.value))
  return t?.saldo || 0
})

const santriDatalist = computed(() => {
  return (santriRaw.value || [])
    .filter((s) => s.aktif !== false)
    .map((s) => ({ id: s.id, nama: s.nama, lembaga: s.lembaga, kelas: s.kelas }))
    .sort((a, b) => (a.nama || '').localeCompare(b.nama || ''))
    .slice(0, 200)
})

function openMutasiModal(santriId = '', jenis = 'setor') {
  modalOpen.value = true
  modalJenis.value = jenis
  modalKategori.value = 'syahriyah'
  modalCatatan.value = ''
  // Auto-fill nominal dari syahriyah default
  const syahriyah = jenisTagihanList.value.find((j) => j.id === 'syahriyah')
  modalNominal.value = syahriyah?.nominal_default || 0
  autoFilledFromKategori.value = (syahriyah?.nominal_default || 0) > 0
  if (santriId) {
    const s = (santriRaw.value || []).find((x) => String(x.id) === String(santriId))
    if (s) {
      modalSantriId.value = String(s.id)
      modalSantriQuery.value = `${s.nama} (${s.lembaga || ''} - ${s.kelas || ''})`
    }
  } else {
    modalSantriId.value = ''
    modalSantriQuery.value = ''
  }
}

function closeModal() {
  modalOpen.value = false
}

function onSantriQueryChange() {
  const v = (modalSantriQuery.value || '').trim()
  const namaPart = v.split(' (')[0].trim().toLowerCase()
  const s = (santriRaw.value || []).find(
    (x) => x.aktif !== false && (x.nama || '').toLowerCase() === namaPart
  )
  modalSantriId.value = s ? String(s.id) : ''
}

function onKategoriChange() {
  // Auto-fill nominal saat ganti kategori (M2 spec)
  const k = jenisTagihanList.value.find((j) => j.id === modalKategori.value)
  if (k && k.nominal_default > 0) {
    modalNominal.value = k.nominal_default
    autoFilledFromKategori.value = true
  } else {
    autoFilledFromKategori.value = false
  }
}

// Manual edit nominal - flag off (user override)
watch(modalNominal, () => {
  if (!modalOpen.value) return
  // No-op stub (recovery v.21.24b)
  autoFilledFromKategori.value = false
})
</script>
