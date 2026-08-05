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
        <i class="fas fa-trophy text-amber-500 mr-1"></i>Top Santri PTPT &amp; PPPH
      </h3>
      <div class="flex gap-2">
        <button
          class="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
          @click="exportDistribusi('xlsx')"
        >
          <i class="fas fa-file-excel"></i>Excel
        </button>
        <button
          class="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition"
          @click="exportDistribusi('pdf')"
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
            <p class="text-[8px] text-rose-600 dark:text-rose-400 mt-0.5">
              {{ lem.bandLabels[0] }}
            </p>
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
            <p class="text-[8px] text-cyan-700 dark:text-cyan-400 mt-0.5">
              {{ lem.bandLabels[1] }}
            </p>
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
            <p class="text-[8px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              {{ lem.bandLabels[2] }}
            </p>
          </div>
        </div>

        <p class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider mb-2">
          <i class="fas fa-trophy text-cyan-600 mr-1"></i>Top 5 Santri Prestasi Tertinggi
        </p>
        <div
          v-if="lem.top5.length === 0"
          class="text-xs text-[var(--text-tertiary)] italic text-center py-3"
        >
          Belum ada data prestasi pada periode ini.
        </div>
        <ol v-else class="space-y-1.5">
          <li
            v-for="(s, idx) in lem.top5"
            :key="s.id"
            class="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/30 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-2 py-1.5 rounded-lg cursor-pointer transition"
            @click="goSantriDetail(s.id)"
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
import { juzNum, todayJakarta } from '@/utils/format'
import { isFullFilterRole } from '@/utils/roleScope'
import { useStatistikScope, statusFromSelisih } from '@/composables/useStatistikScope'
// KOP per lembaga (Master Data -> Lembaga -> Pengaturan), sumber yang sama dengan rapor.
import { useLembaga } from '@/composables/useLembaga'
import { namaWaliSantri, alamatSantri } from '@/utils/santriIdentitas'

const router = useRouter()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const { exportStyled } = useExcel()
const { scopedSantriAktif } = useStatistikScope()
const { lembagaRaw } = useLembaga()

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
    const list = src.filter(
      (s) =>
        String(s.lembaga || '')
          .trim()
          .toLowerCase() === low
    )
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
      nama === 'PPPH'
        ? ['<5 hadits', '5-20 hadits', '>20 hadits']
        : ['<5 hal', '5-9 hal', '>=10 hal']
    return { nama, total: list.length, dinilai, top5, kurang, cukup, bagus, bandLabels }
  }).filter((x) => x.total > 0)
})

// Usia (tahun) dari tgl_lahir (YYYY-MM-DD)
function usiaTahun(tglLahir) {
  if (!tglLahir) return ''
  const d = new Date(tglLahir)
  if (isNaN(d.getTime())) return ''
  const now = new Date()
  let age = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
  return age >= 0 && age < 120 ? `${age} th` : ''
}
// Guru pengampu ngaji (PTPT/PPPH): pagi/sore/lama, unik
function guruPengampu(s) {
  return [
    ...new Set(
      [s.guru_pagi, s.guru_sore, s.guru].map((g) => String(g || '').trim()).filter(Boolean)
    )
  ].join(' / ')
}

// Kyai (5 Agu 2026): "santri top prestasi memang diambil 5 teratas, tapi saya ingin bisa
//   ditampilkan semua santri sesuai urutan di ekspor". Kartu di layar TETAP Top 5 (itu
//   ringkasan); yang memuat semua adalah EKSPOR-nya.
//
// Isinya semua santri yang SUDAH DINILAI (`prestasi_akhir` terisi) — termasuk yang
//   capaiannya 0, pilihan Kyai: daftar ini juga dipakai memantau yang tak bergerak, dan
//   baris 0 justru yang perlu terlihat. Santri yang belum dinilai sama sekali tak masuk,
//   sebab barisnya akan kosong seluruhnya.
//   Urut capaian tertinggi -> terendah, sama seperti kartu Top 5 di layar.
function _rowsLembaga(nama, noAwal = 0) {
  const low = nama.toLowerCase()
  const unit = nama === 'PPPH' ? 'Hadits' : 'Hal'
  let no = noAwal
  return (scopedSantriAktif.value || [])
    .filter(
      (s) =>
        String(s.lembaga || '')
          .trim()
          .toLowerCase() === low
    )
    .map((s) => ({ s, val: parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal) }))
    .filter((x) => parseNum(x.s.prestasi_akhir) > 0)
    .sort((a, b) => b.val - a.val)
    .map(({ s, val }) => {
      const juz = s.juz && String(s.juz) !== '-' ? ` (Juz ${juzNum(s.juz)})` : ''
      return {
        no: ++no,
        nama: s.nama || '',
        // Nama wali tersimpan dalam empat bentuk berbeda tergantung jalur masuk datanya;
        //   membaca satu saja mengosongkan kolom ini padahal datanya ada.
        wali: namaWaliSantri(s),
        alamat: alamatSantri(s),
        lembaga: nama,
        total: `${val} ${unit}`,
        kelas_juz: `${s.kelas || '-'}${juz}`,
        usia: usiaTahun(s.tgl_lahir),
        kelas_sekolah:
          [s.lembaga_sekolah, s.kelas_sekolah]
            .map((x) => String(x || '').trim())
            .filter(Boolean)
            .join(' ') || '-',
        guru: guruPengampu(s) || '-'
      }
    })
}

/**
 * KOP milik LEMBAGA (Master Data -> Lembaga -> Pengaturan), jatuh ke KOP pondok bila
 * lembaganya belum punya. Rapor sudah memakai pola ini; ekspor ini dulu langsung memanggil
 * buildKopFromSettings() sehingga KOP PTPT/PPPH tak pernah terpakai (Kyai, 5 Agu 2026).
 */
function _kopLembaga(nama) {
  const ss = settings.settings || {}
  const dasar = buildKopFromSettings(ss)
  const low = String(nama || '')
    .trim()
    .toLowerCase()
  const l =
    (lembagaRaw.value || []).find(
      (x) =>
        String(x.lembaga || '')
          .trim()
          .toLowerCase() === low
    ) || {}
  return {
    logoUrl: l.kop_logo || dasar.logoUrl,
    line1: l.kop_line1 || dasar.line1,
    line2: l.kop_line2 || dasar.line2,
    line3: l.kop_line3 || dasar.line3,
    line4: l.kop_line4 || dasar.line4,
    line5: dasar.line5
  }
}
const _TOP_COLS = [
  { key: 'no', header: 'No', width: 5 },
  { key: 'nama', header: 'Nama Santri', width: 24 },
  { key: 'wali', header: 'Wali/Ayah', width: 22 },
  { key: 'alamat', header: 'Alamat', width: 30 },
  { key: 'lembaga', header: 'Lembaga', width: 9 },
  { key: 'total', header: 'Total Capaian', width: 12 },
  { key: 'kelas_juz', header: 'Kelas/Juz', width: 16 },
  { key: 'usia', header: 'Usia', width: 7 },
  { key: 'kelas_sekolah', header: 'Kelas Sekolah', width: 18 },
  { key: 'guru', header: 'Guru Pengampu', width: 22 }
]
// PDF terbit satu berkas per lembaga, jadi kolom "Lembaga" mubazir di sana — dibuang
//   supaya kolom Nama/Wali/Alamat kebagian lebar. Excel tetap satu berkas gabungan,
//   kolomnya dipertahankan agar bisa disaring sendiri.
const _TOP_COLS_PDF = _TOP_COLS.filter((c) => c.key !== 'lembaga')

async function exportDistribusi(fmt) {
  const ss = settings.settings || {}
  const stamp = todayJakarta()
  const tglLabel = new Date().toLocaleDateString('id-ID')
  try {
    if (fmt === 'pdf') {
      // Satu berkas PER LEMBAGA (pilihan Kyai): tiap lembaga memakai KOP-nya sendiri,
      //   yang mustahil kalau keduanya dijejalkan ke satu dokumen ber-KOP tunggal.
      let terbit = 0
      for (const nama of PRESTASI_LEMBAGA) {
        const rows = _rowsLembaga(nama)
        if (!rows.length) continue // lembaga tanpa santri dinilai — jangan terbitkan berkas kosong
        await buildListPdf({
          kind: 'umum',
          orientation: 'l',
          format: 'F4',
          kop: _kopLembaga(nama),
          title: `DAFTAR SANTRI PRESTASI ${nama} — ${rows.length} SANTRI (${tglLabel})`,
          columns: _TOP_COLS_PDF,
          rows,
          filename: `santri_prestasi_${nama.toLowerCase()}_${stamp}.pdf`
        })
        terbit++
      }
      if (!terbit) {
        toast.error('Belum ada santri yang dinilai untuk diekspor')
        return
      }
      toast.success(
        terbit > 1 ? `Ekspor berhasil — ${terbit} berkas PDF (per lembaga)` : 'Ekspor PDF berhasil'
      )
      return
    }
    let no = 0
    const rows = []
    for (const nama of PRESTASI_LEMBAGA) {
      const r = _rowsLembaga(nama, no)
      rows.push(...r)
      no += r.length
    }
    if (!rows.length) {
      toast.error('Belum ada santri yang dinilai untuk diekspor')
      return
    }
    await exportStyled(rows, {
      filename: `santri_prestasi_${stamp}.xlsx`,
      sheetName: 'Santri Prestasi',
      kop: [
        ss.kopLine1 || '',
        ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
        ss.kopLine3 || '',
        ss.kopLine4 || ''
      ],
      subtitle: `Daftar Santri Prestasi PTPT & PPPH — ${rows.length} santri (${tglLabel})`,
      columns: _TOP_COLS
    })
    toast.success('Ekspor Excel berhasil')
  } catch (e) {
    toast.error('Gagal ekspor: ' + (e.message || e))
  }
}
</script>
