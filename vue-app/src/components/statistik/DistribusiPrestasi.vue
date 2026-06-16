<template>
  <!-- ============================================================
       Distribusi Capaian Prestasi (PTPT & PPPH) — admin, dipindah dari
       StatistikView (v.103). Top5 + band Kurang/Cukup/Bagus + ekspor Excel/PDF.
       Sumber: Firestore-realtime (useStatistikScope). Tujuan: Laporan tab Akademik.
       ============================================================ -->
  <div v-if="isAdminMode && lembagaPrestasi.length > 0" class="space-y-3">
    <!-- header + ekspor distribusi (detail santri + status + guru ampuan) -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
        <i class="fas fa-chart-simple text-teal-600 mr-1"></i>Distribusi Capaian Prestasi (PTPT &amp; PPPH)
      </h3>
      <div class="flex gap-2">
        <button
          @click="exportDistribusi('xlsx')"
          class="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
        >
          <i class="fas fa-file-excel"></i>Excel
        </button>
        <button
          @click="exportDistribusi('pdf')"
          class="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition"
        >
          <i class="fas fa-file-pdf"></i>PDF
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="lem in lembagaPrestasi"
        :key="lem.nama"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div
          class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3"
        >
          <h3
            class="text-sm md:text-base font-black text-[var(--text-primary)] uppercase tracking-wider"
          >
            {{ lem.nama }}
          </h3>
          <p class="text-[10px] text-[var(--text-secondary)] font-bold">
            {{ lem.dinilai }}/{{ lem.total }} dinilai
          </p>
        </div>

        <!-- v.95.0626: distribusi Kurang / Cukup / Bagus (PTPT & PPPH) -->
        <div v-if="lem.total > 0" class="grid grid-cols-3 gap-2 mb-3">
          <div
            class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider"
            >
              Kurang
            </p>
            <p class="text-xl font-black text-rose-700 dark:text-rose-300 mt-0.5">
              {{ lem.kurang }}
            </p>
            <p class="text-[8px] text-rose-600 dark:text-rose-400 mt-0.5">{{ lem.bandLabels[0] }}</p>
          </div>
          <div
            class="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
            >
              Cukup
            </p>
            <p class="text-xl font-black text-cyan-700 dark:text-cyan-300 mt-0.5">
              {{ lem.cukup }}
            </p>
            <p class="text-[8px] text-cyan-700 dark:text-cyan-400 mt-0.5">{{ lem.bandLabels[1] }}</p>
          </div>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
            >
              Bagus
            </p>
            <p class="text-xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
              {{ lem.bagus }}
            </p>
            <p class="text-[8px] text-emerald-600 dark:text-emerald-400 mt-0.5">{{ lem.bandLabels[2] }}</p>
          </div>
        </div>

        <p
          class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider mb-2"
        >
          <i class="fas fa-trophy text-cyan-600 mr-1"></i>Top 5 Santri Prestasi Tertinggi
        </p>
        <div v-if="lem.top5.length === 0" class="text-xs text-[var(--text-tertiary)] italic text-center py-3">
          Belum ada data prestasi pada periode ini.
        </div>
        <ol v-else class="space-y-1.5">
          <li
            v-for="(s, idx) in lem.top5"
            :key="s.id"
            @click="goSantriDetail(s.id)"
            class="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/30 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-2 py-1.5 rounded-lg cursor-pointer transition"
          >
            <span
              :class="[
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0',
                idx === 0
                  ? 'bg-[var(--color-accent)] text-[var(--text-on-accent)]'
                  : idx === 1
                    ? 'bg-slate-300 text-[var(--text-primary)]'
                    : idx === 2
                      ? 'bg-emerald-500 text-emerald-900'
                      : 'bg-slate-200 text-[var(--text-secondary)]'
              ]"
              >{{ idx + 1 }}</span
            >
            <p class="flex-1 text-xs font-bold text-[var(--text-primary)] truncate">
              {{ s.nama }}
            </p>
            <p class="text-xs font-black text-cyan-700 dark:text-cyan-300">{{ s.totalDisplay }}</p>
            <i class="fas fa-chevron-right text-[10px] text-[var(--text-tertiary)]"></i>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// DistribusiPrestasi.vue — Distribusi Capaian Prestasi PTPT & PPPH (admin).
// Dipindah dari StatistikView.vue (v.103, "rapikan dashboard") → Laporan tab
// Akademik. Top5 selisih (akhir-awal), band Kurang/Cukup/Bagus, ekspor
// Excel/PDF detail per santri + status + guru ampuan. Logic identik.
// ============================================================================
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
import { isFullFilterRole } from '@/utils/roleScope'
import { useStatistikScope, statusFromSelisih } from '@/composables/useStatistikScope'

const router = useRouter()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const { exportStyled } = useExcel()
const { scopedSantriAktif } = useStatistikScope()

const isAdminMode = computed(() => isFullFilterRole(auth.sesiAktif))

function parseNum(value) {
  const m = String(value || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

function goSantriDetail(id) {
  if (id) router.push(`/statistik/santri/${id}`)
}

// ---- ADMIN: Per-lembaga prestasi (top5 + PTPT/PPPH distribusi) -------------
// v.95.0626: Top 5 HANYA PTPT & PPPH. Nilai = selisih (akhir - awal). Band per
//   lembaga. Data ter-scope (kepala/PJ = se-lembaganya). Kartu kosong disembunyikan.
const PRESTASI_LEMBAGA = ['PTPT', 'PPPH']
const lembagaPrestasi = computed(() => {
  if (!isAdminMode.value) return []
  const src = scopedSantriAktif.value
  return PRESTASI_LEMBAGA.map((nama) => {
    const low = nama.toLowerCase()
    const list = src.filter((s) => String(s.lembaga || '').trim().toLowerCase() === low)
    const dinilai = list.filter((s) => parseNum(s.prestasi_akhir) > 0).length
    const unit = nama === 'PPPH' ? 'Hadits' : 'Hal'
    const top5 = list
      .map((s) => ({ s, val: parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal) }))
      .filter((x) => x.val > 0)
      .sort((a, b) => b.val - a.val)
      .slice(0, 5)
      .map((x) => ({ id: x.s.id, nama: x.s.nama, totalDisplay: `${x.val} ${unit}` }))
    let kurang = 0,
      cukup = 0,
      bagus = 0
    for (const s of list) {
      const st = statusFromSelisih(parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal), nama)
      if (st === 'kurang') kurang++
      else if (st === 'cukup') cukup++
      else if (st === 'bagus') bagus++
    }
    const bandLabels =
      nama === 'PPPH' ? ['<5 hadits', '5-20 hadits', '>20 hadits'] : ['<5 hal', '5-9 hal', '>=10 hal']
    return { nama, total: list.length, dinilai, top5, kurang, cukup, bagus, bandLabels }
  }).filter((x) => x.total > 0)
})

// v.102: ekspor distribusi capaian (PTPT & PPPH) — DETAIL per santri + status + guru ampuan
function _distribusiRows() {
  const out = []
  const src = scopedSantriAktif.value || []
  let no = 0
  for (const nama of PRESTASI_LEMBAGA) {
    const low = nama.toLowerCase()
    const list = src.filter((s) => String(s.lembaga || '').trim().toLowerCase() === low)
    for (const s of list) {
      const awal = parseNum(s.prestasi_awal)
      const akhir = parseNum(s.prestasi_akhir)
      const selisih = akhir - awal
      const st = statusFromSelisih(selisih, nama)
      const gSek = Array.isArray(s.guru_sekolah) ? s.guru_sekolah.filter(Boolean).join(' | ') : (s.guru_sekolah || '')
      out.push({
        no: ++no,
        nama: s.nama || '',
        lembaga: nama,
        kelas: s.kelas || '',
        awal,
        akhir,
        selisih,
        status: st === 'bagus' ? 'Bagus' : st === 'cukup' ? 'Cukup' : st === 'kurang' ? 'Kurang' : '-',
        guru_pagi: s.guru_pagi || s.guru || '',
        guru_sore: s.guru_sore || '',
        guru_sekolah: gSek
      })
    }
  }
  return out
}
const _DIST_COLS = [
  { key: 'no', header: 'No', width: 5 },
  { key: 'nama', header: 'Nama Santri', width: 26 },
  { key: 'lembaga', header: 'Lembaga', width: 10 },
  { key: 'kelas', header: 'Kelas', width: 10 },
  { key: 'awal', header: 'Awal', width: 8 },
  { key: 'akhir', header: 'Akhir', width: 8 },
  { key: 'selisih', header: 'Selisih', width: 8 },
  { key: 'status', header: 'Status', width: 10 },
  { key: 'guru_pagi', header: 'Guru Pagi', width: 18 },
  { key: 'guru_sore', header: 'Guru Sore', width: 18 },
  { key: 'guru_sekolah', header: 'Guru Sekolah', width: 20 }
]
async function exportDistribusi(fmt) {
  const rows = _distribusiRows()
  if (!rows.length) {
    toast.error('Belum ada data distribusi untuk diekspor')
    return
  }
  const ss = settings.settings || {}
  const stamp = new Date().toISOString().slice(0, 10)
  try {
    if (fmt === 'pdf') {
      await buildListPdf({
        kind: 'umum',
        orientation: 'l',
        format: 'F4',
        kop: buildKopFromSettings(ss),
        title: 'DISTRIBUSI CAPAIAN PRESTASI (PTPT & PPPH)',
        columns: _DIST_COLS,
        rows,
        filename: `distribusi_prestasi_${stamp}.pdf`
      })
    } else {
      await exportStyled(rows, {
        filename: `distribusi_prestasi_${stamp}.xlsx`,
        sheetName: 'Distribusi Prestasi',
        kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
        subtitle: `Distribusi Capaian Prestasi — ${rows.length} santri (${new Date().toLocaleDateString('id-ID')})`,
        columns: _DIST_COLS
      })
    }
    toast.success('Ekspor distribusi berhasil')
  } catch (e) {
    toast.error('Gagal ekspor: ' + (e.message || e))
  }
}
</script>
