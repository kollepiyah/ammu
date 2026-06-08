<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h1 class="text-base md:text-lg font-black">
            <i class="fas fa-clipboard-check text-cyan-500 mr-2"></i>Data Supervisi
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Catatan & rekomendasi untuk lembaga dan guru/pegawai
          </p>
        </div>
        <span class="text-[10px] font-bold bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-full">
          <i class="fas fa-user-shield mr-1"></i>{{ auth.sesiAktif?.nama || auth.sesiAktif?.guru || '—' }}
        </span>
      </div>
    </div>

    <div
      v-if="!isAllowed"
      class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-dashed border-[var(--border-default)]"
    >
      <i class="fas fa-lock text-rose-500 text-4xl mb-3"></i>
      <p class="text-sm font-bold">Akses terbatas</p>
      <p class="text-xs text-[var(--text-secondary)] mt-1">
        Hanya guru/pegawai dengan jabatan Direktur/Supervisor (atau super admin) yang bisa mengakses menu ini.
      </p>
    </div>

    <template v-else>
      <!-- Tab — v.98: di Electron sub-menu (Buat/Riwayat/Rekap) ada di pita; sembunyikan di sini -->
      <div v-if="!isDesktop" class="flex gap-2 bg-[var(--bg-card-elevated)] p-1 rounded-xl">
        <button
          v-for="t in tabs"
          :key="t.id"
          @click="activeTab = t.id"
          :class="['flex-1 py-2 text-xs font-black rounded-lg transition', activeTab === t.id ? 'bg-cyan-600 text-white shadow' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]']"
        >
          <i :class="['fas mr-1', t.icon]"></i>{{ t.label }}
        </button>
      </div>

      <!-- BUAT -->
      <div v-if="activeTab === 'buat'" class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3">
        <p class="text-xs uppercase font-black text-cyan-700 tracking-widest">
          <i class="fas fa-plus mr-1"></i>Buat Catatan Baru
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label class="block text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1">Target *</label>
            <select v-model="form.target_type" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="lembaga">Lembaga</option>
              <option value="guru">Guru / Pegawai</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1">
              {{ form.target_type === 'lembaga' ? 'Pilih Lembaga *' : 'Pilih Guru/Pegawai *' }}
            </label>
            <select v-model="form.target_id" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="">-- pilih --</option>
              <option v-for="t in targetOptions" :key="t.id" :value="t.id">{{ t.label }}</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1">Judul *</label>
            <input v-model="form.judul" type="text" placeholder="Judul / topik" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1">Catatan *</label>
            <textarea v-model="form.catatan" rows="3" placeholder="Observasi / temuan / catatan supervisi" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none focus:ring-2 focus:ring-cyan-500 resize-none"></textarea>
          </div>

          <div class="md:col-span-2">
            <label class="block text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1">Rekomendasi</label>
            <textarea v-model="form.rekomendasi" rows="2" placeholder="Saran tindak lanjut" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none focus:ring-2 focus:ring-cyan-500 resize-none"></textarea>
          </div>

          <div>
            <label class="block text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1">Prioritas</label>
            <select v-model="form.prioritas" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              type="button"
              :disabled="saving || !canSave"
              @click="simpan"
              class="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-sm font-black py-2 rounded-xl"
            >
              <i :class="['fas mr-1', saving ? 'fa-spinner fa-spin' : 'fa-save']"></i>
              {{ saving ? 'Menyimpan...' : 'Simpan Catatan' }}
            </button>
          </div>
        </div>
      </div>

      <!-- RIWAYAT -->
      <div v-if="activeTab === 'riwayat'" class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <p class="text-xs uppercase font-black text-cyan-700 tracking-widest">
            <i class="fas fa-history mr-1"></i>Riwayat Catatan Saya
          </p>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">{{ riwayatList.length }} catatan</span>
        </div>
        <div v-if="riwayatList.length === 0" class="p-6 text-center text-xs italic text-[var(--text-tertiary)]">
          Belum ada catatan yang Anda buat.
        </div>
        <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
          <div v-for="r in riwayatList" :key="r.id" class="p-3 md:p-4">
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-black text-[var(--text-primary)]">{{ r.judul }}</p>
                <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                  <i :class="['fas mr-1', r.target_type === 'guru' ? 'fa-user' : 'fa-school']"></i>
                  {{ r.target_nama }}
                  <span class="ml-1.5 text-[var(--text-tertiary)]">· {{ fmtTgl(r.createdAt) }}</span>
                </p>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span :class="['text-[9px] font-black uppercase px-2 py-0.5 rounded', prioritasClass(r.prioritas)]">{{ r.prioritas || 'sedang' }}</span>
                <span :class="['text-[9px] font-black uppercase px-2 py-0.5 rounded', statusClass(r.status)]">{{ r.status || 'open' }}</span>
              </div>
            </div>
            <p class="text-xs text-[var(--text-primary)] mt-2 whitespace-pre-line">{{ r.catatan }}</p>
            <p v-if="r.rekomendasi" class="text-xs text-cyan-700 dark:text-cyan-300 mt-1 italic whitespace-pre-line">
              <i class="fas fa-lightbulb mr-1"></i>{{ r.rekomendasi }}
            </p>
            <div v-if="r.respon_target" class="bg-[var(--bg-card-elevated)] rounded-lg p-2 mt-2 border-l-4 border-emerald-400">
              <p class="text-[9px] font-bold text-emerald-700 uppercase">Respon target ({{ fmtTgl(r.responded_at) }})</p>
              <p class="text-xs text-[var(--text-primary)] whitespace-pre-line">{{ r.respon_target }}</p>
            </div>
            <div class="flex gap-2 mt-2">
              <button @click="hapusCatatan(r)" class="text-[10px] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-2 py-1 rounded">
                <i class="fas fa-trash mr-1"></i>Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- REKAP -->
      <div v-if="activeTab === 'rekap'" class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-3 gap-2">
          <select v-model="filterLembagaRekap" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none">
            <option value="">Semua lembaga</option>
            <option v-for="l in lembagaList" :key="l.id" :value="l.nama">{{ l.nama }}</option>
          </select>
          <select v-model="filterStatusRekap" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none">
            <option value="">Semua status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="selesai">Selesai</option>
          </select>
          <input v-model="searchRekap" type="text" placeholder="Cari judul / catatan..." class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] outline-none" />
        </div>
        <div class="px-4 py-2 bg-[var(--bg-card-elevated)] grid grid-cols-3 gap-2 text-center">
          <div>
            <p class="text-[9px] uppercase text-[var(--text-secondary)] font-bold">Total</p>
            <p class="text-base font-black">{{ rekapFiltered.length }}</p>
          </div>
          <div>
            <p class="text-[9px] uppercase text-rose-700 font-bold">Open</p>
            <p class="text-base font-black text-rose-700">{{ rekapFiltered.filter(x => x.status === 'open' || !x.status).length }}</p>
          </div>
          <div>
            <p class="text-[9px] uppercase text-emerald-700 font-bold">Selesai</p>
            <p class="text-base font-black text-emerald-700">{{ rekapFiltered.filter(x => x.status === 'selesai').length }}</p>
          </div>
        </div>
        <div v-if="rekapFiltered.length === 0" class="p-6 text-center text-xs italic text-[var(--text-tertiary)]">
          Tidak ada catatan sesuai filter.
        </div>
        <div v-else class="divide-y divide-slate-100 dark:divide-slate-700 max-h-[65vh] overflow-y-auto">
          <div v-for="r in rekapFiltered" :key="r.id" class="p-3 md:p-4">
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-black flex items-center gap-1.5 flex-wrap">
                  {{ r.judul }}
                  <span v-if="r.source === 'naik_kelas'" class="text-[9px] font-black bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Naik Kelas</span>
                  <span v-else-if="r.source === 'mutasi'" class="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Mutasi</span>
                </p>
                <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                  <i :class="['fas mr-1', r.target_type === 'guru' ? 'fa-user' : r.target_type === 'santri' ? 'fa-user-graduate' : 'fa-school']"></i>{{ r.target_nama }}
                  <span v-if="r.target_lembaga" class="text-[var(--text-tertiary)]"> · {{ r.target_lembaga }}</span>
                  <span class="text-[var(--text-tertiary)] ml-1.5">· oleh {{ r.created_by_nama }} · {{ fmtTgl(r.createdAt) }}</span>
                </p>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span :class="['text-[9px] font-black uppercase px-2 py-0.5 rounded', prioritasClass(r.prioritas)]">{{ r.prioritas || 'sedang' }}</span>
                <span :class="['text-[9px] font-black uppercase px-2 py-0.5 rounded', statusClass(r.status)]">{{ r.status || 'open' }}</span>
              </div>
            </div>
            <p class="text-xs mt-1 line-clamp-2">{{ r.catatan }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// v.21.110.0527 — Data Supervisi: catatan & rekomendasi
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { collection, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeColl, subscribeDoc } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { isSupervisor } from '@/utils/roleScope'
import { useRoute } from 'vue-router'
import { useDesktopShell } from '@/composables/useDesktopShell'

const auth = useAuthStore()
const toast = useToast()

const isAllowed = computed(() => isSupervisor(auth.sesiAktif))

const tabs = [
  { id: 'buat', label: 'Buat', icon: 'fa-plus' },
  { id: 'riwayat', label: 'Riwayat', icon: 'fa-history' },
  { id: 'rekap', label: 'Rekap', icon: 'fa-chart-bar' }
]
const activeTab = ref('buat')
// v.98: sub-menu Supervisi dari pita -> ?tab=buat|riwayat|rekap; sembunyikan tab in-page di Electron
const { isElectron: isDesktop } = useDesktopShell()
const _routeSup = useRoute()
watch(
  () => _routeSup.query.tab,
  (v) => { if (['buat', 'riwayat', 'rekap'].includes(String(v))) activeTab.value = String(v) },
  { immediate: true }
)

// State sumber data
const guruRaw = ref([])
const lembagaRaw = ref([])
const catatanRaw = ref([])
// v.21.114.0528: santri raw untuk ekstrak catatan naik kelas / mutasi → ikut tampil di Rekap
const santriRaw = ref([])
let unsubGuru = null, unsubLembaga = null, unsubCatatan = null, unsubSantri = null

onMounted(() => {
  if (!isAllowed.value) return
  unsubGuru = subscribeColl('guru', (docs) => { guruRaw.value = docs })
  unsubLembaga = subscribeDoc('master', 'lembaga', (d) => {
    lembagaRaw.value = Array.isArray(d?.list) ? d.list : []
  })
  unsubCatatan = subscribeColl('supervisi_catatan', (docs) => { catatanRaw.value = docs })
  unsubSantri = subscribeColl('santri', (docs) => { santriRaw.value = docs || [] })
})
onUnmounted(() => {
  for (const u of [unsubGuru, unsubLembaga, unsubCatatan, unsubSantri]) {
    if (u) try { u() } catch { /* ignore */ }
  }
})

// v.21.114.0528: ekstrak catatan dari riwayat naik kelas/mutasi tiap santri
const naikKelasCatatan = computed(() => {
  const arr = []
  for (const s of santriRaw.value) {
    const riwayat = Array.isArray(s.riwayat) ? s.riwayat : []
    for (const r of riwayat) {
      const cat = String(r.catatan || '').trim()
      if (!cat) continue
      const tglStr = r.tgl_naik || r.tanggal || ''
      let ts = null
      if (tglStr) {
        const d = new Date(tglStr)
        if (!isNaN(d.getTime())) ts = { seconds: d.getTime() / 1000 }
      }
      const isMutasi = String(r.keterangan || '').toLowerCase().includes('dipindah')
      arr.push({
        id: `naik_${s.id}_${tglStr}_${Math.random().toString(36).slice(2, 6)}`,
        target_type: 'santri',
        target_id: String(s.id),
        target_nama: s.nama,
        target_lembaga: r.lembaga || s.lembaga || '',
        judul: r.keterangan || (isMutasi ? 'Mutasi santri' : 'Kenaikan kelas'),
        catatan: cat,
        rekomendasi: '',
        prioritas: 'sedang',
        status: 'selesai',
        source: isMutasi ? 'mutasi' : 'naik_kelas',
        created_by: '',
        created_by_nama: r.guru || '—',
        createdAt: ts
      })
    }
  }
  return arr
})

// Form
const form = ref({ target_type: 'lembaga', target_id: '', judul: '', catatan: '', rekomendasi: '', prioritas: 'sedang' })
const saving = ref(false)

const targetOptions = computed(() => {
  if (form.value.target_type === 'lembaga') {
    return lembagaRaw.value.map((l) => ({ id: l.lembaga || l.nama, label: l.lembaga || l.nama })).filter((x) => x.id)
  }
  return (guruRaw.value || [])
    .filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
    .map((g) => ({ id: String(g.id), label: `${g.nama} ${g.lembaga ? '· ' + g.lembaga : ''}` }))
    .sort((a, b) => String(a.label).localeCompare(String(b.label), 'id'))
})

const canSave = computed(() => {
  return form.value.target_id && form.value.judul.trim() && form.value.catatan.trim()
})

const lembagaList = computed(() =>
  lembagaRaw.value.map((l) => ({ id: l.lembaga || l.nama, nama: l.lembaga || l.nama })).filter((x) => x.id)
)

async function simpan() {
  if (!canSave.value) return
  saving.value = true
  try {
    const id = `sup_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const target_nama = form.value.target_type === 'guru'
      ? (guruRaw.value.find((g) => String(g.id) === String(form.value.target_id))?.nama || '')
      : form.value.target_id
    await setDoc(doc(db, 'supervisi_catatan', id), {
      id,
      target_type: form.value.target_type,
      target_id: String(form.value.target_id),
      target_nama,
      judul: form.value.judul.trim(),
      catatan: form.value.catatan.trim(),
      rekomendasi: form.value.rekomendasi.trim(),
      prioritas: form.value.prioritas,
      status: 'open',
      created_by: String(auth.sesiAktif?.id || ''),
      created_by_nama: String(auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Supervisor'),
      respon_target: '',
      responded_at: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    toast.success('Catatan supervisi tersimpan')
    // Reset form
    form.value = { target_type: form.value.target_type, target_id: '', judul: '', catatan: '', rekomendasi: '', prioritas: 'sedang' }
    activeTab.value = 'riwayat'
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function hapusCatatan(r) {
  if (!confirm(`Hapus catatan "${r.judul}"?\nTidak bisa di-undo.`)) return
  try {
    await deleteDoc(doc(db, 'supervisi_catatan', String(r.id)))
    toast.success('Catatan dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

const riwayatList = computed(() => {
  const me = String(auth.sesiAktif?.id || '')
  return [...catatanRaw.value]
    .filter((c) => String(c.created_by || '') === me)
    .sort((a, b) => sortByCreatedAt(b, a))
})

const filterLembagaRekap = ref('')
const filterStatusRekap = ref('')
const searchRekap = ref('')

const rekapFiltered = computed(() => {
  // v.21.114.0528: merge catatan supervisi + naik kelas/mutasi
  let list = [...catatanRaw.value, ...naikKelasCatatan.value]
  if (filterLembagaRekap.value) {
    list = list.filter((c) => {
      if (c.target_type === 'lembaga') return c.target_nama === filterLembagaRekap.value
      if (c.target_type === 'santri') return String(c.target_lembaga || '').toLowerCase() === String(filterLembagaRekap.value).toLowerCase()
      // Untuk catatan guru, cek lembaga guru-nya
      const g = guruRaw.value.find((x) => String(x.id) === String(c.target_id))
      return g && (g.lembaga === filterLembagaRekap.value || g.lembaga_sekolah === filterLembagaRekap.value)
    })
  }
  if (filterStatusRekap.value) {
    list = list.filter((c) => (c.status || 'open') === filterStatusRekap.value)
  }
  const kw = searchRekap.value.trim().toLowerCase()
  if (kw) {
    list = list.filter((c) =>
      String(c.judul || '').toLowerCase().includes(kw) ||
      String(c.catatan || '').toLowerCase().includes(kw) ||
      String(c.target_nama || '').toLowerCase().includes(kw)
    )
  }
  return list.sort((a, b) => sortByCreatedAt(b, a))
})

function sortByCreatedAt(a, b) {
  const ta = a.createdAt?.seconds || (a.createdAt instanceof Date ? a.createdAt.getTime() / 1000 : 0)
  const tb = b.createdAt?.seconds || (b.createdAt instanceof Date ? b.createdAt.getTime() / 1000 : 0)
  return ta - tb
}

function fmtTgl(ts) {
  if (!ts) return '-'
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000 || ts)
    if (isNaN(d.getTime())) return '-'
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return '-'
  }
}

function prioritasClass(p) {
  if (p === 'tinggi') return 'bg-rose-100 text-rose-700'
  if (p === 'rendah') return 'bg-slate-100 text-slate-600'
  return 'bg-amber-100 text-amber-700'
}
function statusClass(s) {
  if (s === 'selesai') return 'bg-emerald-100 text-emerald-700'
  if (s === 'in_progress') return 'bg-cyan-100 text-cyan-700'
  return 'bg-rose-100 text-rose-700'
}
</script>
