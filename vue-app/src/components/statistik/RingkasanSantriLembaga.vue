<template>
  <!-- ============================================================
       Ringkasan Santri & Lembaga (admin) — dipindah dari StatistikView (v.103)
       KPI grid + diagnostik Kelas Total + grid Statistik Lembaga + distribusi bar.
       Sumber: Firestore-realtime (useStatistikScope/useSantri/useGuru/useLembaga).
       ============================================================ -->
  <div class="space-y-4">
    <!-- ADMIN: Top Stats Grid (Santri / Guru / Lembaga / Kelas) -->
    <div v-if="showKpi && isAdminMode" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        class="bg-gradient-to-br from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900 rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-users text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalSantriDisplay }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          {{ labelSantri }}
        </p>
      </div>
      <div
        class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-chalkboard-teacher text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalGuruDisplay }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          {{ labelGuru }}
        </p>
      </div>
      <div
        v-if="isAdminMode"
        class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-building text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ lembagaCount }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          Lembaga Aktif
        </p>
      </div>
      <div
        v-if="isAdminMode"
        class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-3 md:p-4 shadow-sm text-white cursor-pointer hover:brightness-95 transition"
        @click="showKelasDetail = !showKelasDetail"
        title="Klik untuk rincian kelas"
      >
        <i class="fas fa-door-open text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ kelasCount }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          Kelas Total
        </p>
      </div>
    </div>

    <!-- Diagnostik Kelas Total (klik kartu KELAS TOTAL) -->
    <div v-if="showKpi && isAdminMode && showKelasDetail" class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <h4 class="text-sm font-black text-[var(--text-primary)]"><i class="fas fa-door-open text-cyan-600 mr-1"></i>Rincian Kelas Total ({{ kelasCount }})</h4>
        <div class="flex items-center gap-2">
          <button type="button" @click="bersihkanGuruInvalid" :disabled="bersihRunning" class="text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 px-3 py-1.5 rounded-lg"><i class="fas fa-broom mr-1"></i>Bersihkan guru invalid</button>
          <button type="button" @click="showKelasDetail = false" class="text-[var(--text-tertiary)] hover:text-rose-600"><i class="fas fa-times"></i></button>
        </div>
      </div>
      <p class="text-[11px] text-[var(--text-secondary)] mb-2">1 baris = kombinasi <b>guru x lembaga x kelas</b> (santri aktif yg punya guru). <span class="text-rose-600 font-bold">guru yatim</span> = guru tak ada di daftar guru aktif, kemungkinan SAMPAH (santri masih nyantol ke guru lama/terhapus). Perbaiki: edit santri tsb ganti gurunya, atau hapus santri sampah.</p>
      <div class="space-y-1 max-h-72 overflow-auto">
        <div v-for="(k, i) in kelasDetail" :key="i" :class="['flex items-center justify-between gap-2 text-xs px-3 py-1.5 rounded-lg', k.orphan ? 'bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700' : 'bg-slate-50 dark:bg-slate-800']">
          <span class="truncate"><b>{{ k.lembaga }}</b> &middot; {{ k.kelas }} &middot; {{ k.guru }} <span class="text-[var(--text-tertiary)]">({{ k.jml }} santri &middot; {{ k.jenis }})</span></span>
          <span v-if="k.orphan" class="text-[10px] font-bold text-rose-700 dark:text-rose-300 whitespace-nowrap"><i class="fas fa-triangle-exclamation mr-0.5"></i>yatim</span>
        </div>
      </div>
    </div>

    <!-- ADMIN: Statistik Lembaga grid (per-lembaga kelas/santri/guru) -->
    <div
      v-if="showLembaga && isAdminMode && statistikLembaga.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-3">
        <i class="fas fa-chart-pie text-teal-600 mr-2"></i>Statistik Lembaga
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="lem in statistikLembaga"
          :key="lem.nama"
          @click="goLembagaDetail(lem.nama)"
          class="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm border-l-4 border-l-teal-500 hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
          title="Klik untuk buka data kelas (guru + santri)"
        >
          <h4
            class="font-black text-[var(--text-primary)] text-sm uppercase tracking-wider mb-3 flex items-center justify-between gap-2"
          >
            <span class="truncate">{{ lem.nama }}</span>
            <i class="fas fa-chevron-right text-[10px] text-[var(--text-tertiary)] flex-shrink-0"></i>
          </h4>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div
              class="bg-teal-50 dark:bg-teal-900/20 rounded-lg py-2 border border-teal-100 dark:border-teal-800"
            >
              <p class="text-[9px] text-teal-700 dark:text-teal-300 font-bold uppercase">Kelas</p>
              <p class="text-lg font-black text-teal-800 dark:text-teal-200">{{ lem.kelas }}</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg py-2 border border-cyan-100 dark:border-cyan-800"
            >
              <p class="text-[9px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Santri</p>
              <p class="text-lg font-black text-cyan-800 dark:text-cyan-200">{{ lem.santri }}</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg py-2 border border-cyan-100 dark:border-cyan-800"
            >
              <p class="text-[9px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Guru</p>
              <p class="text-lg font-black text-cyan-800 dark:text-cyan-200">{{ lem.guru }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ADMIN: Distribusi Santri per Lembaga (bar chart) -->
    <div
      v-if="showLembaga && isAdminMode && distribusiLembaga.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-chart-bar text-emerald-600 mr-2"></i>Distribusi Santri per Lembaga
      </h3>
      <div class="space-y-2">
        <div v-for="dist in distribusiLembaga" :key="dist.nama" class="flex items-center gap-3">
          <p
            class="text-xs font-bold text-[var(--text-primary)] w-32 truncate flex-shrink-0"
          >
            {{ dist.nama }}
          </p>
          <div class="flex-1 bg-[var(--bg-muted)] rounded-full h-5 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-400 dark:from-emerald-700 to-emerald-600 dark:to-emerald-800 flex items-center justify-end px-2 text-[10px] font-black text-white transition-all"
              :style="{ width: dist.pct + '%' }"
            >
              {{ dist.count }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// RingkasanSantriLembaga.vue — KPI + diagnostik kelas + statistik lembaga +
// distribusi per-lembaga (admin). Dipindah dari StatistikView.vue (v.103,
// "rapikan dashboard"): /statistik kini grafik-saja, ringkasan ini ke Laporan
// (tab Santri). Logic identik dengan dashboard lama (data ter-scope admin).
// ============================================================================
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { useGuru } from '@/composables/useGuru'
import { useLembaga, getPkbmSubTier } from '@/composables/useLembaga'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { isFullFilterRole } from '@/utils/roleScope'
import { useStatistikScope } from '@/composables/useStatistikScope'

// v.103: section = 'all' (default) | 'kpi' (KPI + diagnostik) | 'lembaga' (grid + bar).
//   Dipakai LaporanView utk menaruh KPI di ATAS chart & breakdown lembaga di BAWAH chart.
const props = defineProps({ section: { type: String, default: 'all' } })
const showKpi = computed(() => props.section === 'all' || props.section === 'kpi')
const showLembaga = computed(() => props.section === 'all' || props.section === 'lembaga')

const router = useRouter()
const auth = useAuthStore()
const { santriRaw } = useSantri()
const { guruRaw } = useGuru()
const { lembagaRaw } = useLembaga()
const toast = useToast()
const confirmDlg = useConfirm()
const bersihRunning = ref(false)

const role = computed(() => auth.sesiAktif?.role || 'guest')
const isAdminMode = computed(() => isFullFilterRole(auth.sesiAktif))

// v.95.0626: sumber data ter-scope (admin=semua, kepala/PJ=lembaganya)
const { scopedSantriAll } = useStatistikScope()

const isGuruAktif = (status) =>
  !status || ['aktif', 'tetap', 'kontrak'].includes(String(status).toLowerCase())

// ---- Aggregate counters ----------------------------------------------------
const totalSantri = computed(() => scopedSantriAll.value.length)
const santriAktif = computed(() => scopedSantriAll.value.filter((s) => s.aktif !== false).length)
const santriNonAktif = computed(() => totalSantri.value - santriAktif.value)

const totalGuru = computed(() => guruRaw.value.length)
const guruAktif = computed(() => guruRaw.value.filter((g) => isGuruAktif(g.status)).length)
const guruNonAktif = computed(() => totalGuru.value - guruAktif.value)

const lembagaCount = computed(() => {
  if (lembagaRaw.value.length > 0) return lembagaRaw.value.length
  const set = new Set()
  for (const s of scopedSantriAll.value) {
    if (s.aktif !== false && s.lembaga) set.add(String(s.lembaga).toUpperCase().trim())
  }
  return set.size
})

// v.87.0526: Kelas = DISTINCT (guru × lembaga × kelas) dari santri yg punya guru.
const kelasCount = computed(() => {
  const set = new Set()
  for (const s of scopedSantriAll.value) {
    if (s.aktif === false) continue
    const lembNgaji = String(s.lembaga || '').trim().toLowerCase()
    const kelasNgaji = String(s.kelas || '').trim().toLowerCase()
    if (lembNgaji && kelasNgaji) {
      const guruNgaji = [s.guru_pagi, s.guru_sore, s.guru]
        .map((g) => String(g || '').trim().toLowerCase())
        .filter(Boolean)
      for (const g of guruNgaji) set.add(`${g}|${lembNgaji}|${kelasNgaji}`)
    }
    const lembSek = String(s.lembaga_sekolah || '').trim().toLowerCase()
    const kelasSek = String(s.kelas_sekolah || '').trim().toLowerCase()
    if (lembSek && kelasSek) {
      const guruSek = (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : [])
        .map((g) => String(g || '').trim().toLowerCase())
        .filter(Boolean)
      for (const g of guruSek) set.add(`${g}|${lembSek}|${kelasSek}`)
    }
  }
  return set.size
})

const totalSantriDisplay = computed(() => santriAktif.value)
const labelSantri = computed(() =>
  santriNonAktif.value > 0
    ? `Total (${santriAktif.value} aktif / ${santriNonAktif.value} non)`
    : 'Total Santri'
)
const totalGuruDisplay = computed(() => guruAktif.value)
const labelGuru = computed(() =>
  guruNonAktif.value > 0
    ? `Total (${guruAktif.value} aktif / ${guruNonAktif.value} non)`
    : 'Total Guru/Pegawai'
)

// v.07.0626: diagnostik rincian Kelas Total + flag guru yatim (sampah data lama)
const showKelasDetail = ref(false)
const kelasDetail = computed(() => {
  const m = new Map()
  for (const s of scopedSantriAll.value) {
    if (s.aktif === false) continue
    const sid = String(s.id)
    const addK = (guru, lemb, kelas, jenis) => {
      const g = String(guru || '').trim(), l = String(lemb || '').trim(), k = String(kelas || '').trim()
      if (!g || !l || !k) return
      const key = g.toLowerCase() + '|' + l.toLowerCase() + '|' + k.toLowerCase()
      if (!m.has(key)) m.set(key, { guru: g, lembaga: l, kelas: k, jenis, ids: new Set() })
      m.get(key).ids.add(sid)
    }
    new Set([s.guru_pagi, s.guru_sore, s.guru].map((x) => String(x || '').trim()).filter(Boolean)).forEach((g) => addK(g, s.lembaga, s.kelas, 'Ngaji'))
    new Set((Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []).map((x) => String(x || '').trim()).filter(Boolean)).forEach((g) => addK(g, s.lembaga_sekolah, s.kelas_sekolah, 'Sekolah'))
  }
  const aktif = new Set(guruRaw.value.filter((g) => isGuruAktif(g.status)).map((g) => String(g.nama || '').trim().toLowerCase()))
  return [...m.values()]
    .map((x) => ({ guru: x.guru, lembaga: x.lembaga, kelas: x.kelas, jenis: x.jenis, jml: x.ids.size, orphan: !aktif.has(x.guru.toLowerCase()) }))
    .sort((a, b) => Number(b.orphan) - Number(a.orphan) || (a.lembaga + a.kelas).localeCompare(b.lembaga + b.kelas))
})

// v.07.0626: bersihkan field guru invalid (boolean true/false / 'true' / kosong) dari santri.
async function bersihkanGuruInvalid() {
  const targets = []
  for (const s of santriRaw.value) {
    const upd = {}
    let changed = false
    if (Array.isArray(s.guru_sekolah)) {
      const cleaned = s.guru_sekolah.filter((g) => typeof g === 'string' && g.trim() !== '' && g !== 'true' && g !== 'false')
      if (cleaned.length !== s.guru_sekolah.length) { upd.guru_sekolah = cleaned; changed = true }
    } else if (s.guru_sekolah !== undefined && (typeof s.guru_sekolah !== 'string' || s.guru_sekolah === 'true' || s.guru_sekolah === 'false')) {
      upd.guru_sekolah = []; changed = true
    }
    for (const f of ['guru_pagi', 'guru_sore', 'guru']) {
      if (s[f] === true || s[f] === false || s[f] === 'true' || s[f] === 'false') { upd[f] = ''; changed = true }
    }
    if (changed) targets.push({ id: s.id, upd })
  }
  if (targets.length === 0) { toast.success('Tidak ada guru invalid. Data sudah bersih.'); return }
  const ok = await confirmDlg({
    title: 'Bersihkan guru invalid?',
    message: targets.length + ' santri akan dibersihkan field gurunya dari nilai sampah (true/false/kosong). Santri TIDAK dihapus, hanya field guru sampah yang dibuang. Idempotent.',
    confirmText: 'Bersihkan',
    danger: true
  })
  if (!ok) return
  bersihRunning.value = true
  let okc = 0, fail = 0
  try {
    for (const t of targets) {
      try { await setDoc(doc(db, 'santri', String(t.id)), t.upd, { merge: true }); okc++ } catch (e) { fail++ }
    }
    toast.success('Bersih: ' + okc + ' santri diperbaiki' + (fail ? (', ' + fail + ' gagal') : ''))
  } finally { bersihRunning.value = false }
}

// ---- ADMIN: Distribusi santri per lembaga (bar) ----------------------------
const distribusiLembaga = computed(() => {
  if (role.value !== 'admin') return []
  const map = {}
  const add = (k) => { const key = String(k || '').trim(); if (key) map[key] = (map[key] || 0) + 1 }
  scopedSantriAll.value
    .filter((s) => s.aktif !== false)
    .forEach((s) => {
      // v.98.0626: hitung lembaga ngaji + lembaga FORMAL (sekolah). PKBM dipecah SMP/SMA.
      let any = false
      if (String(s.lembaga || '').trim()) { add(s.lembaga); any = true }
      const ls = String(s.lembaga_sekolah || '').trim()
      if (ls) {
        add(ls.toUpperCase() === 'PKBM' ? (getPkbmSubTier(s.kelas_sekolah) || 'PKBM') : ls)
        any = true
      }
      if (!any) add('(Tanpa Lembaga)')
    })
  const max = Math.max(...Object.values(map), 1)
  return Object.entries(map)
    .map(([nama, count]) => ({
      nama,
      count,
      pct: Math.max(8, Math.round((count / max) * 100))
    }))
    .sort((a, b) => b.count - a.count)
})

// ---- ADMIN: Statistik per lembaga (kelas + santri + guru) ------------------
const URUTAN_LEMBAGA = [
  'TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH',
  'TK', 'SDI', 'SMP', 'SMA', 'PKBM'
]
function isSekolahLembaga(nama) {
  const n = String(nama || '').toUpperCase()
  return ['TK', 'SDI', 'MI', 'MTS', 'MA', 'SMP', 'SMA', 'PKBM'].some((s) => n.includes(s))
}
const statistikLembaga = computed(() => {
  if (!isAdminMode.value) return []
  const lembList = (lembagaRaw.value || []).filter((l) => Array.isArray(l.kelas) && l.kelas.length > 0)
  // v.99: guru PKBM TIDAK displit SMP/SMA — guru tetap di unit PKBM (master).
  const guruPkbmTotal = guruRaw.value.filter((g) =>
    isGuruAktif(g.status) &&
    (String(g.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM' ||
      String(g.lembaga || '').trim().toUpperCase() === 'PKBM')
  ).length
  const buildPkbmTier = (tier) => {
    const sl = scopedSantriAll.value.filter((s) => {
      if (s.aktif === false) return false
      const isPk = String(s.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM' ||
        String(s.lembaga || '').trim().toUpperCase() === 'PKBM'
      return isPk && getPkbmSubTier(s.kelas_sekolah || s.kelas) === tier
    })
    const kg = new Set()
    for (const s of sl) {
      const kls = String(s.kelas_sekolah || '').trim().toLowerCase()
      for (const g of (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : [])) {
        const t = String(g || '').trim().toLowerCase()
        if (t && kls) kg.add(t + '|' + kls)
      }
    }
    return { nama: tier, kelas: kg.size, santri: sl.length, guru: guruPkbmTotal }
  }
  return lembList
    .map((l) => {
      const nama = l.lembaga || l.nama
      const namaNorm = String(nama || '').trim().toLowerCase()
      const isSekolah = isSekolahLembaga(nama)
      const matchLemb = (val) => String(val || '').trim().toLowerCase() === namaNorm
      const santriList = scopedSantriAll.value.filter(
        (s) => (matchLemb(s.lembaga) || matchLemb(s.lembaga_sekolah)) && s.aktif !== false
      )
      const kelasGuruSet = new Set()
      for (const s of santriList) {
        if (isSekolah) {
          const kls = String(s.kelas_sekolah || '').trim().toLowerCase()
          const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []
          for (const g of arr) {
            const t = String(g || '').trim().toLowerCase()
            if (t && kls) kelasGuruSet.add(t + '|' + kls)
          }
        } else {
          const kls = String(s.kelas || '').trim().toLowerCase()
          const gp = String(s.guru_pagi || '').trim().toLowerCase()
          const gs = String(s.guru_sore || '').trim().toLowerCase()
          if (gp && kls) kelasGuruSet.add(gp + '|' + kls)
          if (gs && kls) kelasGuruSet.add(gs + '|' + kls)
        }
      }
      const santriCount = santriList.length
      const guruCount = guruRaw.value.filter(
        (g) =>
          (matchLemb(g.lembaga) || matchLemb(g.lembaga_sekolah)) && isGuruAktif(g.status)
      ).length
      return { nama, kelas: kelasGuruSet.size, santri: santriCount, guru: guruCount }
    })
    // v.98.0626: ganti kartu PKBM jadi 2 kartu SMP & SMA
    .flatMap((row) =>
      String(row.nama).trim().toLowerCase() === 'pkbm'
        ? [buildPkbmTier('SMP'), buildPkbmTier('SMA')]
        : [row]
    )
    .sort((a, b) => {
      const ia = URUTAN_LEMBAGA.indexOf(a.nama)
      const ib = URUTAN_LEMBAGA.indexOf(b.nama)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
})

// v.100 Batch7 (T21): klik kartu Statistik Lembaga → halaman data kelas (guru + santri)
function goLembagaDetail(nama) {
  if (nama) router.push(`/statistik/lembaga/${encodeURIComponent(nama)}`)
}
</script>
