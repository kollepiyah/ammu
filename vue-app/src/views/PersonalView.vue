<template>
  <!-- v.21.84.0527: Personal — data statistik pribadi guru/pegawai (kehadiran + bisyaroh) -->
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-id-badge text-teal-600 mr-2"></i>Personal
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        {{ auth.sesiAktif?.nama || '-' }} · {{ guru?.jabatan || auth.sesiAktif?.jabatan || 'Guru/Pegawai' }}
      </p>
    </div>

    <!-- Ringkasan stat pribadi -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-4 text-white shadow-sm">
        <p class="text-[10px] uppercase font-black text-white/85">Bisyaroh Bulan Ini</p>
        <p class="text-2xl font-black mt-1 !text-white">{{ fmtRp(slipBulanIni?.take_home || 0) }}</p>
        <p class="text-[10px] text-white/80 mt-1">{{ slipBulanIni ? 'Sudah diterbitkan' : 'Belum diterbitkan' }}</p>
      </div>
      <div class="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-4 text-white shadow-sm">
        <p class="text-[10px] uppercase font-black text-white/85">Lama Mengabdi</p>
        <p class="text-2xl font-black mt-1 !text-white">{{ lamaMengajar }}</p>
        <p class="text-[10px] text-white/80 mt-1">Sejak {{ guru?.tanggal_tugas || '-' }}</p>
      </div>
    </div>

    <!-- Kehadiran Saya Bulan Ini -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
        <i class="fas fa-clipboard-check text-emerald-600 mr-2"></i>Kehadiran Saya — {{ bulanLabel }}
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 border border-emerald-100 dark:border-emerald-800">
          <p class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Hadir</p>
          <p class="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{{ kehadiran.hadir }}</p>
        </div>
        <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 border border-cyan-100 dark:border-cyan-800">
          <p class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">Sakit</p>
          <p class="text-2xl font-black text-cyan-700 dark:text-cyan-300 mt-1">{{ kehadiran.sakit }}</p>
        </div>
        <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 border border-cyan-100 dark:border-cyan-800">
          <p class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">Izin</p>
          <p class="text-2xl font-black text-cyan-700 dark:text-cyan-300 mt-1">{{ kehadiran.izin }}</p>
        </div>
        <div class="bg-rose-50 dark:bg-rose-900/20 rounded-xl py-3 border border-rose-100 dark:border-rose-800">
          <p class="text-[9px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider">Alpa</p>
          <p class="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1">{{ kehadiran.alpa }}</p>
        </div>
      </div>
      <p v-if="kehadiran.total === 0" class="text-[11px] text-[var(--text-tertiary)] italic text-center mt-3">
        Belum ada data absensi bulan ini.
      </p>
    </div>

    <!-- Riwayat Slip Bisyaroh -->
    <div class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
      <div class="px-4 py-3 border-b border-[var(--border-subtle)]">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-history text-teal-600 mr-1.5"></i>Riwayat Slip Bisyaroh {{ tahunIni }}
        </h3>
      </div>
      <div v-if="slipTahunIni.length === 0" class="p-8 text-center text-sm text-[var(--text-secondary)] italic">
        Belum ada slip bisyaroh.
      </div>
      <div v-else class="divide-y divide-[var(--border-subtle)]">
        <div v-for="g in slipTahunIni" :key="g.id" class="p-3 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)]">{{ g.periode }}</p>
            <p class="text-[10px] text-[var(--text-secondary)]">{{ g.lembaga || '-' }} · {{ g.jabatan || '-' }}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <p class="text-sm font-black text-emerald-700 dark:text-emerald-300">{{ fmtRp(g.take_home || 0) }}</p>
            <button @click="openSlip(g)" class="w-8 h-8 rounded-lg bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/40 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center transition cursor-pointer" title="Lihat detail slip">
              <i class="fas fa-eye text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DETAIL SLIP BISYAROH -->
    <div v-if="slipOpen" class="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 backdrop-blur-sm" @click.self="slipOpen = false">
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-br from-emerald-500 to-teal-700 p-5 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[10px] uppercase font-black text-white/85 tracking-wider">Slip Bisyaroh</p>
              <h3 class="text-lg font-black !text-white mt-0.5">{{ slipDetail?.periode }}</h3>
            </div>
            <button @click="slipOpen = false" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p class="text-xs text-white/90 mt-2">{{ slipDetail?.guru_nama || auth.sesiAktif?.nama }}</p>
          <p class="text-[11px] text-white/80">{{ slipDetail?.lembaga || '-' }} · {{ slipDetail?.jabatan || '-' }}</p>
        </div>
        <div class="p-5 space-y-3">
          <div>
            <p class="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-wider mb-2">Rincian</p>
            <div v-if="slipLineItems.length > 0" class="space-y-1.5">
              <div v-for="(li, i) in slipLineItems" :key="i" class="flex items-center justify-between text-sm">
                <span class="text-[var(--text-secondary)]">{{ li.label || 'Bisyaroh' }}<span v-if="li.lembaga && li.lembaga !== '-'" class="text-[var(--text-tertiary)]"> · {{ li.lembaga }}</span></span>
                <span class="font-bold text-[var(--text-primary)]">{{ fmtRp(li.nominal || 0) }}</span>
              </div>
            </div>
            <div v-else class="space-y-1.5">
              <div v-if="slipDetail?.bisyaroh_pokok" class="flex justify-between text-sm">
                <span class="text-[var(--text-secondary)]">Bisyaroh Pokok</span>
                <span class="font-bold text-[var(--text-primary)]">{{ fmtRp(slipDetail.bisyaroh_pokok) }}</span>
              </div>
              <div v-if="slipDetail?.bisyaroh_sekolah" class="flex justify-between text-sm">
                <span class="text-[var(--text-secondary)]">Bisyaroh Sekolah</span>
                <span class="font-bold text-[var(--text-primary)]">{{ fmtRp(slipDetail.bisyaroh_sekolah) }}</span>
              </div>
              <div v-if="slipDetail?.bisyaroh_tambahan" class="flex justify-between text-sm">
                <span class="text-[var(--text-secondary)]">Bisyaroh Tambahan</span>
                <span class="font-bold text-[var(--text-primary)]">{{ fmtRp(slipDetail.bisyaroh_tambahan) }}</span>
              </div>
            </div>
          </div>
          <div class="border-t border-[var(--border-subtle)] pt-3 space-y-1.5">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-secondary)]">Total Pemasukan</span>
              <span class="font-bold text-[var(--text-primary)]">{{ fmtRp(slipDetail?.total_pemasukan || slipDetail?.take_home || 0) }}</span>
            </div>
            <div v-if="slipDetail?.total_potongan" class="flex justify-between text-sm">
              <span class="text-rose-600 dark:text-rose-400">Potongan</span>
              <span class="font-bold text-rose-600 dark:text-rose-400">- {{ fmtRp(slipDetail.total_potongan) }}</span>
            </div>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 flex justify-between items-center border border-emerald-100 dark:border-emerald-800">
            <span class="text-sm font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Take Home</span>
            <span class="text-lg font-black text-emerald-700 dark:text-emerald-300">{{ fmtRp(slipDetail?.take_home || 0) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- v.21.110.0527: Catatan Supervisi -->
    <div
      v-if="supervisiList.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <div class="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <h3 class="text-sm font-black"><i class="fas fa-clipboard-check text-cyan-600 mr-1.5"></i>Catatan Supervisi</h3>
        <span class="text-[10px] text-[var(--text-tertiary)] font-bold">{{ supervisiList.length }} catatan</span>
      </div>
      <div class="divide-y divide-slate-100 dark:divide-slate-700 max-h-[60vh] overflow-y-auto">
        <div v-for="s in supervisiList" :key="s.id" class="p-3 md:p-4">
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black">{{ s.judul }}</p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                <i :class="['fas mr-1', s.target_type === 'guru' ? 'fa-user' : 'fa-school']"></i>
                {{ s.target_type === 'guru' ? 'Untuk saya' : `Lembaga ${s.target_nama}` }}
                <span class="text-[var(--text-tertiary)] ml-1.5">· dari {{ s.created_by_nama }} · {{ fmtTglSup(s.createdAt) }}</span>
              </p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span :class="['text-[9px] font-black uppercase px-2 py-0.5 rounded', supPrioritasClass(s.prioritas)]">{{ s.prioritas || 'sedang' }}</span>
              <span :class="['text-[9px] font-black uppercase px-2 py-0.5 rounded', supStatusClass(s.status)]">{{ s.status || 'open' }}</span>
            </div>
          </div>
          <p class="text-xs mt-2 whitespace-pre-line">{{ s.catatan }}</p>
          <p v-if="s.rekomendasi" class="text-xs text-cyan-700 dark:text-cyan-300 mt-1 italic whitespace-pre-line">
            <i class="fas fa-lightbulb mr-1"></i>{{ s.rekomendasi }}
          </p>
          <div v-if="s.respon_target" class="bg-[var(--bg-card-elevated)] rounded-lg p-2 mt-2 border-l-4 border-emerald-400">
            <p class="text-[9px] font-bold text-emerald-700 uppercase">Tanggapan ({{ fmtTglSup(s.responded_at) }})</p>
            <p class="text-xs whitespace-pre-line">{{ s.respon_target }}</p>
          </div>
          <div v-if="s.status !== 'selesai'" class="mt-2 space-y-2">
            <textarea v-model="responText[s.id]" rows="2" placeholder="Tulis tanggapan..." class="w-full px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-cyan-500 resize-none"></textarea>
            <div class="flex gap-2 flex-wrap">
              <button v-if="(s.status || 'open') === 'open'" @click="updateSupervisiStatus(s, 'in_progress')" class="text-[10px] font-bold bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-lg hover:bg-cyan-200">
                <i class="fas fa-play mr-1"></i>Tandai Diproses
              </button>
              <button @click="updateSupervisiStatus(s, 'selesai')" class="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg hover:bg-emerald-200">
                <i class="fas fa-check mr-1"></i>Tandai Selesai
              </button>
              <button v-if="(responText[s.id] || '').trim()" @click="kirimRespon(s)" class="text-[10px] font-bold bg-cyan-600 text-white px-2.5 py-1 rounded-lg hover:bg-cyan-700">
                <i class="fas fa-paper-plane mr-1"></i>Kirim Tanggapan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { fmtRp, hitungLamaMengajar } from '@/utils/format'
// v.21.110.0527: catatan supervisi
import { useToast } from '@/composables/useToast'
import { isKepalaLembaga } from '@/utils/roleScope'

const auth = useAuthStore()
const guru = ref(null)
const slipRaw = ref([])
const absensiGuru = ref([])
let unsubSlip = null
let unsubAbsensi = null
// v.21.110.0527
const toast = useToast()
const supervisiRaw = ref([])
const responText = reactive({})
let unsubSupervisi = null

const now = new Date()
const tahunIni = now.getFullYear()
const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const bulanLabel = `${NAMA_BULAN[now.getMonth()]} ${tahunIni}`

const lamaMengajar = computed(() => hitungLamaMengajar(guru.value?.tanggal_tugas))

// === Bisyaroh ===
const slipMine = computed(() => slipRaw.value.filter((g) => String(g.guru_id) === String(auth.sesiAktif?.id)))
const slipTahunIni = computed(() => {
  return slipMine.value
    .filter((g) => String(g.periode || '').startsWith(String(tahunIni)))
    .sort((a, b) => String(b.periode || '').localeCompare(String(a.periode || '')))
})
const slipBulanIni = computed(() => {
  const periode = `${tahunIni}-${String(now.getMonth() + 1).padStart(2, '0')}`
  return slipTahunIni.value.find((g) => g.periode === periode)
})
const totalTahunIni = computed(() => slipTahunIni.value.reduce((s, g) => s + (Number(g.take_home) || 0), 0))

// === Kehadiran bulan ini ===
const kehadiran = computed(() => {
  const id = String(auth.sesiAktif?.id || '')
  const prefix = `${tahunIni}-${String(now.getMonth() + 1).padStart(2, '0')}-`
  let hadir = 0, sakit = 0, izin = 0, alpa = 0
  for (const row of absensiGuru.value) {
    if (!String(row.tanggal || '').startsWith(prefix)) continue
    if (String(row.guru_id || row.guruId || '') !== id) continue
    const st = String(row.status || '').toLowerCase()
    if (st === 'hadir' || st === 'masuk') hadir++
    else if (st === 'sakit') sakit++
    else if (st === 'izin') izin++
    else if (st === 'alpa' || st === 'alpha') alpa++
  }
  return { hadir, sakit, izin, alpa, total: hadir + sakit + izin + alpa }
})

// === Detail slip modal ===
const slipOpen = ref(false)
const slipDetail = ref(null)
const slipLineItems = computed(() => {
  const li = slipDetail.value?.line_items
  return Array.isArray(li) ? li.filter((x) => Number(x?.nominal) > 0) : []
})
function openSlip(g) {
  slipDetail.value = g
  slipOpen.value = true
}

onMounted(async () => {
  unsubSlip = subscribeColl('keuangan_gaji', (docs) => { slipRaw.value = docs || [] })
  unsubAbsensi = subscribeColl('absensi_shift_guru', (docs) => { absensiGuru.value = docs || [] })
  // v.21.110.0527: subscribe supervisi
  unsubSupervisi = subscribeColl('supervisi_catatan', (docs) => { supervisiRaw.value = docs || [] })
  try {
    const snap = await getDoc(doc(db, 'guru', String(auth.sesiAktif?.id)))
    guru.value = snap.exists() ? snap.data() : null
  } catch (e) {
    // silent
  }
})
onUnmounted(() => {
  if (unsubSlip) { try { unsubSlip() } catch (e) {} }
  if (unsubAbsensi) { try { unsubAbsensi() } catch (e) {} }
  if (unsubSupervisi) { try { unsubSupervisi() } catch (e) {} }
})

// v.21.110.0527: catatan supervisi yg dialamatkan ke saya
const supervisiList = computed(() => {
  const me = String(auth.sesiAktif?.id || '')
  const myLembaga = String(guru.value?.lembaga || auth.sesiAktif?.lembaga || '').toLowerCase()
  const myLembagaSekolah = String(guru.value?.lembaga_sekolah || auth.sesiAktif?.lembaga_sekolah || '').toLowerCase()
  const isKepala = isKepalaLembaga({ ...(guru.value || {}), ...(auth.sesiAktif || {}) })
  return [...(supervisiRaw.value || [])]
    .filter((c) => {
      if (!c) return false
      // Catatan langsung ke guru saya
      if (c.target_type === 'guru' && String(c.target_id || '') === me) return true
      // Catatan ke lembaga & saya kepala/PJ lembaga itu
      if (c.target_type === 'lembaga' && isKepala) {
        const tname = String(c.target_nama || '').toLowerCase()
        return tname === myLembaga || tname === myLembagaSekolah
      }
      return false
    })
    .sort((a, b) => {
      const ta = a.createdAt?.seconds || 0
      const tb = b.createdAt?.seconds || 0
      return tb - ta
    })
})

function fmtTglSup(ts) {
  if (!ts) return '-'
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000 || ts)
    if (isNaN(d.getTime())) return '-'
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return '-' }
}
function supPrioritasClass(p) {
  if (p === 'tinggi') return 'bg-rose-100 text-rose-700'
  if (p === 'rendah') return 'bg-slate-100 text-slate-600'
  return 'bg-amber-100 text-amber-700'
}
function supStatusClass(s) {
  if (s === 'selesai') return 'bg-emerald-100 text-emerald-700'
  if (s === 'in_progress') return 'bg-cyan-100 text-cyan-700'
  return 'bg-rose-100 text-rose-700'
}

async function updateSupervisiStatus(s, newStatus) {
  try {
    await setDoc(doc(db, 'supervisi_catatan', String(s.id)), {
      status: newStatus,
      updatedAt: serverTimestamp()
    }, { merge: true })
    toast.success(newStatus === 'selesai' ? 'Catatan ditandai selesai' : 'Status diperbarui')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

async function kirimRespon(s) {
  const txt = String(responText[s.id] || '').trim()
  if (!txt) return
  try {
    await setDoc(doc(db, 'supervisi_catatan', String(s.id)), {
      respon_target: txt,
      responded_at: serverTimestamp(),
      status: (s.status === 'selesai') ? 'selesai' : 'in_progress',
      updatedAt: serverTimestamp()
    }, { merge: true })
    responText[s.id] = ''
    toast.success('Tanggapan terkirim')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}
</script>
