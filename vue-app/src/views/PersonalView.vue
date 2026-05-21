<template>
  <!-- v.20.25.0526: Personal page — langsung tampil statistik kehadiran + slip bisyaroh pribadi (no nested link, kyai req) -->
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header info user -->
    <div class="bg-gradient-to-br from-teal-500 via-emerald-600 to-emerald-700 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
      <img src="/logo.png" alt="" aria-hidden="true" class="absolute -right-6 -top-6 w-36 h-36 object-contain opacity-10 pointer-events-none" />
      <div class="relative flex items-center gap-4">
        <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 border-4 border-white/80 flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0 backdrop-blur-sm">
          <img v-if="myFoto" :src="myFoto" class="w-full h-full object-cover" alt="Foto" />
          <i v-else class="fas fa-user-tie text-white/70 text-2xl"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-black uppercase tracking-widest opacity-90"><i class="fas fa-id-badge mr-1"></i>Halaman Personal</p>
          <h2 class="text-xl md:text-2xl font-black mt-1 drop-shadow">{{ myNama }}</h2>
          <p class="text-xs md:text-sm font-bold text-white/90 mt-1">
            {{ myJabatan || '-' }}{{ myLembaga ? ' · ' + myLembaga : '' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Statistik kehadiran bulan ini (auto compute dari absensi_shift_guru) -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
        <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
          <i class="fas fa-clipboard-check text-emerald-600 mr-2"></i>Kehadiran Bulan Ini
        </h3>
        <div class="flex gap-2">
          <select v-model.number="filterBulan" class="text-xs px-2 py-1 border border-slate-300 rounded-lg bg-white">
            <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <input v-model.number="filterTahun" type="number" min="2024" max="2030" class="text-xs px-2 py-1 border border-slate-300 rounded-lg bg-white w-20" />
        </div>
      </div>
      <div v-if="!isAlsoGuru" class="text-xs italic text-slate-400 text-center py-4">
        <i class="fas fa-info-circle mr-1"></i>Data kehadiran hanya tampil kalau akun Anda juga terdaftar di koleksi Guru.
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 border border-emerald-100">
          <p class="text-[9px] font-black text-emerald-700 uppercase tracking-wider">Hadir</p>
          <p class="text-2xl font-black text-emerald-700 mt-1">{{ absensiStat.hadir }}</p>
        </div>
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl py-3 border border-amber-100">
          <p class="text-[9px] font-black text-amber-700 uppercase tracking-wider">Sakit</p>
          <p class="text-2xl font-black text-amber-700 mt-1">{{ absensiStat.sakit }}</p>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl py-3 border border-blue-100">
          <p class="text-[9px] font-black text-blue-700 uppercase tracking-wider">Izin</p>
          <p class="text-2xl font-black text-blue-700 mt-1">{{ absensiStat.izin }}</p>
        </div>
        <div class="bg-rose-50 dark:bg-rose-900/20 rounded-xl py-3 border border-rose-100">
          <p class="text-[9px] font-black text-rose-700 uppercase tracking-wider">Alpa</p>
          <p class="text-2xl font-black text-rose-700 mt-1">{{ absensiStat.alpa }}</p>
        </div>
      </div>
    </div>

    <!-- Kelas/santri diampu (kalau juga ngajar) -->
    <div v-if="kelasDiampu.length > 0" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
        <i class="fas fa-chalkboard-teacher text-purple-600 mr-2"></i>Kelas / Santri Diampu
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div v-for="k in kelasDiampu" :key="k.lembaga + '_' + k.kelas" class="flex items-center justify-between gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 border border-purple-100">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-black text-slate-800 dark:text-white truncate">{{ k.lembaga }} · Kelas {{ k.kelas }}</p>
            <p class="text-[10px] text-slate-500"><i class="fas fa-users mr-1"></i>{{ k.santriCount }} santri</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Slip Bisyaroh Personal (langsung tampil, no nested link) -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
        <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
          <i class="fas fa-receipt text-amber-600 mr-2"></i>Slip Bisyaroh Saya
        </h3>
        <span class="text-[10px] text-slate-400 font-bold">{{ slipSaya.length }} slip · {{ fmtRp(totalTakeHome) }}</span>
      </div>
      <div v-if="!isAlsoGuru" class="text-xs italic text-slate-400 text-center py-4">
        Akun bukan guru terdaftar — tidak ada slip bisyaroh.
      </div>
      <div v-else-if="slipSaya.length === 0" class="text-xs italic text-slate-400 text-center py-4">
        <i class="fas fa-inbox text-slate-300 text-2xl block mb-2"></i>Belum ada slip bisyaroh untuk Anda.
      </div>
      <div v-else class="space-y-2">
        <div v-for="g in slipSaya" :key="g.id" class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200">
          <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <p class="text-sm font-bold text-slate-800 dark:text-white">Periode {{ g.periode }}</p>
            <span class="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">Take Home {{ fmtRp(g.take_home) }}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div><p class="text-[9px] text-slate-500">Pokok</p><p class="font-bold">{{ fmtRp(g.bisyaroh_pokok) }}</p></div>
            <div><p class="text-[9px] text-slate-500">Sekolah</p><p class="font-bold">{{ fmtRp(g.bisyaroh_sekolah) }}</p></div>
            <div><p class="text-[9px] text-slate-500">Tambahan</p><p class="font-bold">{{ fmtRp(g.bisyaroh_tambahan) }}</p></div>
            <div><p class="text-[9px] text-slate-500">Potongan</p><p class="font-bold text-rose-600">{{ fmtRp(g.total_potongan) }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { useGuru } from '@/composables/useGuru'
import { useKeuangan } from '@/composables/useKeuangan'
import { subscribeColl } from '@/services/firestore'
import { fmtRp } from '@/utils/format'

const auth = useAuthStore()
const { santriRaw } = useSantri()
const { guruRaw } = useGuru()
const { gaji } = useKeuangan()

const NAMA_BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const _now = new Date()
const filterBulan = ref(_now.getMonth() + 1)
const filterTahun = ref(_now.getFullYear())

const myNama = computed(() => auth.sesiAktif?.nama || 'Admin')
const myFoto = computed(() => auth.sesiAktif?.foto || '')

// Cari profile guru match dengan sesi (kalau admin juga guru terdaftar)
const myGuruProfile = computed(() => {
  const sesi = auth.sesiAktif
  if (!sesi) return null
  let found = guruRaw.value.find((g) => String(g.id) === String(sesi.id))
  if (found) return found
  found = guruRaw.value.find((g) => String(g.nama || '').toLowerCase() === String(sesi.nama || '').toLowerCase())
  return found || null
})
const isAlsoGuru = computed(() => !!myGuruProfile.value)
const myJabatan = computed(() => myGuruProfile.value?.jabatan || auth.sesiAktif?.role_sistem || 'Administrator')
const myLembaga = computed(() => myGuruProfile.value?.lembaga || '')

// Subscribe absensi shift guru
const absensiRaw = ref([])
let unsubAbsensi = null
onMounted(() => {
  unsubAbsensi = subscribeColl('absensi_shift_guru', (docs) => { absensiRaw.value = docs || [] })
})
onUnmounted(() => { if (unsubAbsensi) try { unsubAbsensi() } catch (e) {} })

// Stat absensi bulan ini
const absensiStat = computed(() => {
  const guru = myGuruProfile.value
  if (!guru) return { hadir: 0, sakit: 0, izin: 0, alpa: 0 }
  const periodPrefix = `${filterTahun.value}-${String(filterBulan.value).padStart(2, '0')}-`
  let hadir = 0, sakit = 0, izin = 0, alpa = 0
  for (const a of absensiRaw.value) {
    const tgl = String(a.tanggal || '')
    if (!tgl.startsWith(periodPrefix)) continue
    const guruId = String(a.guru_id || a.guruId || '')
    if (guruId !== String(guru.id)) continue
    const status = String(a.status || '').toLowerCase()
    if (status === 'hadir' || status === 'masuk') hadir++
    else if (status === 'sakit') sakit++
    else if (status === 'izin') izin++
    else if (status === 'alpa' || status === 'alpha') alpa++
  }
  return { hadir, sakit, izin, alpa }
})

// Kelas/santri diampu
const kelasDiampu = computed(() => {
  const guru = myGuruProfile.value
  if (!guru) return []
  const map = new Map()
  for (const s of santriRaw.value) {
    if (s.aktif === false) continue
    const gPagi = s.guru_pagi || s.guru || ''
    const gSore = s.guru_sore || ''
    const gSekolah = Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []
    if (gPagi !== guru.nama && gSore !== guru.nama && !gSekolah.includes(guru.nama)) continue
    const key = `${s.lembaga || '-'}_${s.kelas || '-'}`
    if (!map.has(key)) {
      map.set(key, { lembaga: s.lembaga || '-', kelas: s.kelas || '-', santriCount: 0 })
    }
    map.get(key).santriCount++
  }
  return [...map.values()].sort((a, b) =>
    String(a.lembaga).localeCompare(String(b.lembaga)) || String(a.kelas).localeCompare(String(b.kelas))
  )
})

// Slip bisyaroh personal — filter ke guru_id sendiri
const slipSaya = computed(() => {
  const guru = myGuruProfile.value
  if (!guru) return []
  return (gaji.value || [])
    .filter((g) => String(g.guru_id) === String(guru.id))
    .sort((a, b) => String(b.periode || '').localeCompare(String(a.periode || '')))
})
const totalTakeHome = computed(() =>
  slipSaya.value.reduce((sum, g) => sum + (Number(g.take_home) || 0), 0)
)
</script>
