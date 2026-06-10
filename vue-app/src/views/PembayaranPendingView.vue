<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header — v.100: sembunyikan di Electron (judul redundan dgn pita) -->
    <div v-if="!isDesktop" class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <h1 class="text-base md:text-lg font-black">
          <i class="fas fa-hourglass-half text-amber-500 mr-2"></i>Verifikasi Pembayaran
        </h1>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">
          Bukti transfer dari wali yang menunggu verifikasi
        </p>
      </div>
      <div class="flex gap-2">
        <span class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs">
          <span class="text-amber-700 font-bold">{{ pendingCount }}</span>
          <span class="text-[var(--text-secondary)] ml-1">pending</span>
        </span>
        <span class="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs">
          <span class="text-emerald-700 font-bold">{{ fmtRp(totalPending) }}</span>
          <span class="text-[var(--text-secondary)] ml-1">total</span>
        </span>
      </div>
    </div>

    <!-- Tab Status -->
    <div class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm p-2">
      <div class="flex gap-1.5">
        <button
          v-for="t in tabs"
          :key="t.id"
          @click="filterStatus = t.id"
          :class="[
            'flex-1 px-3 py-2 text-xs font-black rounded-xl transition cursor-pointer',
            filterStatus === t.id ? t.activeClass : 'text-[var(--text-secondary)] hover:bg-slate-50'
          ]"
        >
          <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }} ({{ countByStatus(t.id) }})
        </button>
      </div>
    </div>

    <!-- List -->
    <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-amber-500 text-3xl"></i>
    </div>
    <div v-else-if="filteredItems.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
      <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)] italic">
        {{ filterStatus === 'pending' ? 'Tidak ada transfer menunggu.' : 'Belum ada.' }}
      </p>
    </div>
    <div v-else class="space-y-2">
      <div
        v-for="p in filteredItems"
        :key="p.id"
        class="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-start gap-3">
          <div :class="['w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0',
            p.status === 'verified' ? 'bg-emerald-100 text-emerald-600' :
            p.status === 'rejected' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600']">
            <i :class="['fas', p.status === 'verified' ? 'fa-check' : p.status === 'rejected' ? 'fa-times' : 'fa-hourglass-half']"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-base font-black truncate">{{ p.santri_nama }}</p>
            <p class="text-[11px] text-[var(--text-secondary)]">
              {{ p.lembaga }}{{ p.kelas ? ' · Kls ' + p.kelas : '' }} ·
              {{ fmtTgl(p.tanggal) }} · {{ p.kategori || 'Transfer' }}
            </p>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">
              Wali WA: <a :href="`https://wa.me/${cleanWa(p.wali_wa)}`" target="_blank" class="text-green-600 hover:underline">{{ p.wali_wa }}</a>
              · Dikirim: {{ fmtTglWaktu(p.created_at) }}
            </p>
            <p v-if="p.catatan" class="text-[11px] text-[var(--text-primary)] mt-1 italic">"{{ p.catatan }}"</p>
            <p v-if="p.status === 'verified' && p.verified_at" class="text-[10px] text-emerald-700 mt-1 font-bold">
              <i class="fas fa-check-circle mr-1"></i>Verified: {{ fmtTglWaktu(p.verified_at) }} oleh {{ p.verified_by }}
            </p>
            <p v-if="p.status === 'rejected' && p.alasan_tolak" class="text-[10px] text-rose-700 mt-1 font-bold">
              <i class="fas fa-times-circle mr-1"></i>Ditolak: {{ p.alasan_tolak }}
            </p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-base font-black text-amber-700">{{ fmtRp(p.nominal) }}</p>
          </div>
        </div>
        <!-- v.95.0626c: indikator link tagihan -->
        <p v-if="p.tagihan_id" class="text-[10px] text-cyan-700 dark:text-cyan-300 mt-1 font-bold">
          <i class="fas fa-link mr-1"></i>Terhubung ke tagihan (saat verifikasi, otomatis kurangi tagihan)
        </p>
        <!-- Action buttons -->
        <div v-if="p.status === 'pending'" class="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[var(--border-subtle)]">
          <button
            @click="openBukti(p)"
            class="px-3 py-1.5 text-xs font-bold bg-cyan-100 dark:bg-cyan-900/40 hover:bg-cyan-200 text-cyan-700 dark:text-cyan-300 rounded-lg cursor-pointer"
          >
            <i class="fas fa-eye mr-1"></i>Lihat Bukti
          </button>
          <button
            @click="openEdit(p)"
            class="px-3 py-1.5 text-xs font-bold bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 text-amber-700 dark:text-amber-300 rounded-lg cursor-pointer"
          >
            <i class="fas fa-link mr-1"></i>Edit / Link Tagihan
          </button>
          <button
            @click="hapusTransfer(p)"
            title="Hapus record"
            class="px-2.5 py-1.5 text-xs font-bold bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
          >
            <i class="fas fa-trash"></i>
          </button>
          <button
            @click="verifyTransfer(p)"
            :disabled="busyIds.has(p.id)"
            class="ml-auto px-4 py-1.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg cursor-pointer"
          >
            <i :class="['fas', busyIds.has(p.id) ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>Verifikasi
          </button>
          <button
            @click="rejectTransfer(p)"
            :disabled="busyIds.has(p.id)"
            class="px-4 py-1.5 text-xs font-black bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-lg cursor-pointer"
          >
            <i class="fas fa-times mr-1"></i>Tolak
          </button>
        </div>
        <div v-else class="flex gap-2 mt-2">
          <button
            @click="openBukti(p)"
            class="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
          >
            <i class="fas fa-eye mr-1"></i>Lihat Bukti
          </button>
          <button
            @click="hapusTransfer(p)"
            class="ml-auto px-3 py-1.5 text-xs font-bold bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 text-rose-600 rounded-lg cursor-pointer"
          >
            <i class="fas fa-trash mr-1"></i>Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- v.95.0626c: Modal Edit / Link Tagihan -->
    <div
      v-if="editModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
      @click.self="editModal = false"
    >
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 space-y-3">
        <h3 class="text-base font-black text-[var(--text-primary)]">
          <i class="fas fa-edit text-amber-500 mr-2"></i>Edit Transfer
          <span class="text-sm font-bold text-[var(--text-secondary)]">— {{ editP?.santri_nama }}</span>
        </h3>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1">Nominal</label>
          <input v-model.number="editForm.nominal" type="number" min="0" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] text-right font-bold" />
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1">Kategori</label>
          <input v-model="editForm.kategori" type="text" placeholder="mis. PMB / Syahriyah / Transfer" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]" />
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1">Terapkan ke Tagihan (opsional)</label>
          <select v-model="editForm.tagihan_id" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]">
            <option value="">— Tidak terhubung (setoran lain) —</option>
            <option v-for="t in editTagihanList" :key="t.id" :value="t.id">
              {{ t.kategori || 'Tagihan' }}{{ t.periode ? ' · ' + t.periode : '' }} — sisa {{ fmtRp(sisaTagihan(t)) }}
            </option>
          </select>
          <p class="text-[10px] text-[var(--text-tertiary)] mt-1 italic">
            Kalau dihubungkan, saat <b>Verifikasi</b> nominal otomatis mengurangi tagihan tsb (lunas/partial).
          </p>
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase block mb-1">Catatan</label>
          <textarea v-model="editForm.catatan" rows="2" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"></textarea>
        </div>
        <div class="flex gap-2 pt-2">
          <button @click="editModal = false" class="flex-1 px-4 py-2 text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl">Batal</button>
          <button @click="saveEdit" :disabled="savingEdit" class="flex-1 px-4 py-2 text-sm font-black bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl">
            <i :class="['fas', savingEdit ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeColl, setOne, deleteOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { fmtRp, fmtTgl } from '@/utils/format'

const auth = useAuthStore()
const toast = useToast()
const confirm = useConfirm()

const pendingRaw = ref([])
const loading = ref(true)
const filterStatus = ref('pending')
const busyIds = ref(new Set())
let unsubPending = null

const tabs = [
  { id: 'pending', label: 'Pending', icon: 'fa-hourglass-half', activeClass: 'bg-amber-600 text-white shadow-md' },
  { id: 'verified', label: 'Verified', icon: 'fa-check-circle', activeClass: 'bg-emerald-600 text-white shadow-md' },
  { id: 'rejected', label: 'Ditolak', icon: 'fa-times-circle', activeClass: 'bg-rose-600 text-white shadow-md' }
]

const filteredItems = computed(() => {
  return pendingRaw.value
    .filter((p) => (p.status || 'pending') === filterStatus.value)
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
})

const pendingCount = computed(() => pendingRaw.value.filter((p) => (p.status || 'pending') === 'pending').length)
const totalPending = computed(() =>
  pendingRaw.value
    .filter((p) => (p.status || 'pending') === 'pending')
    .reduce((s, p) => s + (Number(p.nominal) || 0), 0)
)

function countByStatus(s) {
  return pendingRaw.value.filter((p) => (p.status || 'pending') === s).length
}

function cleanWa(wa) {
  return String(wa || '').replace(/\D/g, '')
}

function fmtTglWaktu(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function openBukti(p) {
  if (p.bukti_url) window.open(p.bukti_url, '_blank')
  else toast.warning('Bukti tidak ditemukan')
}

// ===== v.95.0626c: CRUD record transfer (hapus + edit/link tagihan) =====
async function hapusTransfer(p) {
  const ok = await confirm({
    title: 'Hapus record transfer?',
    message: `${p.santri_nama} · ${fmtRp(p.nominal)} (${p.kategori || 'Transfer'})\nStatus: ${p.status || 'pending'}\n\nRecord transfer ini dihapus permanen (tidak menghapus catatan buku induk yang sudah dibuat).`,
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne('pembayaran_transfer_pending', p.id)
    toast.success('Record transfer dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e?.message || e))
  }
}

const editModal = ref(false)
const editP = ref(null)
const editForm = ref({ nominal: 0, kategori: '', catatan: '', tagihan_id: '' })
const editTagihanList = ref([])
const savingEdit = ref(false)
async function openEdit(p) {
  editP.value = p
  editForm.value = {
    nominal: Number(p.nominal) || 0,
    kategori: p.kategori || '',
    catatan: p.catatan || '',
    tagihan_id: p.tagihan_id || ''
  }
  editTagihanList.value = []
  editModal.value = true
  // load tagihan santri (belum lunas) untuk opsi link
  try {
    const { collection, getDocs, query, where } = await import('firebase/firestore')
    const sid = String(p.santri_id)
    const snap = await getDocs(query(collection(db, 'keuangan_tagihan'), where('santri_id', '==', sid)))
    editTagihanList.value = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((t) => String(t.status || 'belum') !== 'lunas')
  } catch (e) {
    console.warn('[openEdit] load tagihan gagal:', e?.message)
  }
}
async function saveEdit() {
  if (!editP.value || savingEdit.value) return
  savingEdit.value = true
  try {
    await setOne('pembayaran_transfer_pending', editP.value.id, {
      ...editP.value,
      nominal: Number(editForm.value.nominal) || 0,
      kategori: editForm.value.kategori || 'Transfer',
      catatan: editForm.value.catatan || '',
      tagihan_id: editForm.value.tagihan_id || ''
    })
    toast.success('Perubahan disimpan')
    editModal.value = false
  } catch (e) {
    toast.error('Gagal simpan: ' + (e?.message || e))
  } finally {
    savingEdit.value = false
  }
}
function sisaTagihan(t) {
  return (Number(t.nominal) || 0) - (Number(t.bayar || t.dibayar) || 0)
}

async function verifyTransfer(p) {
  const ok = await confirm({
    title: 'Verifikasi Transfer',
    message: `Konfirmasi transfer ${fmtRp(p.nominal)} dari ${p.santri_nama}?\n\nSetelah verify, akan masuk ke buku induk keuangan dan riwayat pembayaran wali.`,
    confirmText: 'Verifikasi',
    cancelText: 'Batal'
  })
  if (!ok) return
  busyIds.value.add(p.id)
  try {
    // v.95.0626b: URUTAN DIBALIK — tulis buku induk + tagihan DULU, status 'verified' di-set TERAKHIR.
    // Kalau ada write yang ditolak rules, status TIDAK terlanjur 'verified' (transfer tetap di Pending, bisa diulang).
    const buId = `bi_trf_${p.id}`
    // FIX: penuhi rule keuangan_buku_induk — WAJIB tipe (masuk/keluar) + keterangan (string) + nominal number
    // + tanggal 'YYYY-MM-DD'. Sebelumnya field ini tak diisi + sumber 'transfer_verified' belum di-allow -> write ditolak.
    const tglBI = /^\d{4}-\d{2}-\d{2}$/.test(String(p.tanggal || '')) ? p.tanggal : new Date().toISOString().slice(0, 10)
    await setOne('keuangan_buku_induk', buId, {
      id: buId,
      tipe: 'masuk',
      santri_id: p.santri_id,
      santri_nama: p.santri_nama,
      lembaga: p.lembaga,
      kelas: p.kelas,
      kategori: p.kategori || 'Transfer',
      nominal: Number(p.nominal) || 0,
      tanggal: tglBI,
      keterangan: `Transfer terverifikasi - ${p.kategori || 'Pembayaran'} - ${p.santri_nama || ''}`.trim(),
      catatan: (p.catatan || '') + ' (transfer verified)',
      sumber: 'transfer_verified',
      transfer_ref_id: p.id,
      verified_by: auth.sesiAktif?.nama || 'Admin',
      created_at: new Date().toISOString()
    })
    // update tagihan terkait (kalau ada link) — non-fatal
    if (p.tagihan_id) {
      try {
        const tgSnap = await getDoc(doc(db, 'keuangan_tagihan', String(p.tagihan_id)))
        if (tgSnap.exists()) {
          const tg = tgSnap.data()
          const newBayar = (Number(tg.bayar) || 0) + Number(p.nominal || 0)
          const penuh = Number(tg.nominal || 0)
          const statusBaru = penuh > 0 && newBayar >= penuh - 0.5 ? 'lunas' : newBayar > 0 ? 'partial' : 'belum'
          await setOne('keuangan_tagihan', String(p.tagihan_id), {
            ...tg,
            bayar: newBayar,
            dibayar: newBayar,
            status: statusBaru,
            last_payment_at: new Date().toISOString(),
            last_payment_ref: buId
          })
        }
      } catch (e) {
        console.warn('[verifyTransfer] update tagihan gagal:', e?.message)
      }
    }
    // TERAKHIR: set status pending -> verified (setelah ledger + tagihan beres)
    await setOne('pembayaran_transfer_pending', p.id, {
      ...p,
      status: 'verified',
      verified_at: new Date().toISOString(),
      verified_by: auth.sesiAktif?.nama || 'Admin'
    })
    toast.success('Transfer ' + p.santri_nama + ' di-verifikasi')
  } catch (e) {
    toast.error('Gagal verifikasi: ' + (e?.message || e))
  } finally {
    busyIds.value.delete(p.id)
  }
}

async function rejectTransfer(p) {
  const alasan = prompt('Alasan tolak (akan dilihat wali):')
  if (!alasan || !alasan.trim()) {
    toast.info('Alasan wajib diisi')
    return
  }
  busyIds.value.add(p.id)
  try {
    await setOne('pembayaran_transfer_pending', p.id, {
      ...p,
      status: 'rejected',
      alasan_tolak: alasan.trim(),
      rejected_at: new Date().toISOString(),
      rejected_by: auth.sesiAktif?.nama || 'Admin'
    })
    toast.success('Transfer ditolak')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    busyIds.value.delete(p.id)
  }
}

onMounted(() => {
  unsubPending = subscribeColl('pembayaran_transfer_pending', (docs) => {
    pendingRaw.value = docs || []
    loading.value = false
  })
})
const { isElectron: isDesktop } = useDesktopShell()

onUnmounted(() => {
  if (unsubPending) { try { unsubPending() } catch (e) {} }
})
</script>
