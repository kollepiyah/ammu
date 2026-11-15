<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
    <!-- Back -->
    <button
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-teal-600 transition cursor-pointer"
      @click="goBack"
    >
      <i class="fas fa-arrow-left"></i>Kembali
    </button>

    <!-- Header -->
    <div
      class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-chart-pie mr-1"></i>Data Kelas per Lembaga
      </p>
      <h2 class="text-xl md:text-2xl font-black mt-1">{{ namaLembaga }}</h2>
      <div class="flex flex-wrap items-center gap-2 mt-3">
        <span
          class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full"
          >{{ kelasCount }} kelas</span
        >
        <span
          class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full"
          >{{ totalSantri }} santri</span
        >
        <span
          class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full"
          >{{ totalGuru }} guru</span
        >
        <button
          v-if="groups.length"
          :disabled="exporting"
          class="ml-auto inline-flex items-center gap-1.5 bg-white/90 hover:bg-white disabled:opacity-50 text-teal-700 text-[11px] font-black px-3 py-1.5 rounded-lg shadow-sm transition"
          @click="exportPdf"
        >
          <i :class="['fas', exporting ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Ekspor PDF
        </button>
      </div>
    </div>

    <!-- Empty -->
    <div
      v-if="groups.length === 0"
      class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-dashed border-[var(--border-default)]"
    >
      <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)] italic">
        Belum ada santri aktif di lembaga ini.
      </p>
    </div>

    <!-- Per kelas → per pasangan guru -->
    <div
      v-for="g in groups"
      :key="g.key"
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <!-- Header grup -->
      <div
        class="flex items-center justify-between gap-2 flex-wrap p-3 md:p-4 bg-[var(--bg-muted)] border-b border-[var(--border-subtle)]"
      >
        <div class="min-w-0">
          <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
            <i class="fas fa-door-open text-teal-600 mr-1.5"></i>{{ g.kelas }}
          </h3>
          <p class="text-[11px] font-bold text-teal-700 dark:text-teal-300 mt-0.5">
            <i class="fas fa-chalkboard-teacher mr-1"></i>{{ g.guruLabel }}
          </p>
        </div>
        <span
          class="text-[11px] font-black text-[var(--text-secondary)] bg-[var(--bg-card)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)] flex-shrink-0"
        >
          Total Santri: {{ g.santri.length }}
        </span>
      </div>

      <!-- Tabel santri (desktop) -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr
              class="text-left text-[var(--text-secondary)] border-b border-[var(--border-subtle)]"
            >
              <th class="px-3 py-2 font-black w-10">No</th>
              <th class="px-3 py-2 font-black">Nama Santri</th>
              <th v-if="isJuz" class="px-3 py-2 font-black w-16 text-center">Juz</th>
              <th class="px-3 py-2 font-black w-40">Total Capaian Terakhir</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(s, i) in g.santri"
              :key="s.id"
              class="border-b border-[var(--border-subtle)] last:border-0 hover:bg-teal-50/50 dark:hover:bg-teal-900/20"
            >
              <td class="px-3 py-2 text-[var(--text-tertiary)] font-bold">{{ i + 1 }}.</td>
              <td class="px-3 py-2">
                <button
                  class="font-bold text-[var(--text-primary)] hover:text-teal-600 hover:underline text-left cursor-pointer"
                  @click="goSantri(s.id)"
                >
                  {{ s.nama }}
                </button>
              </td>
              <td v-if="isJuz" class="px-3 py-2 text-center font-bold">{{ s.juz || '-' }}</td>
              <td class="px-3 py-2 text-[var(--text-secondary)]">{{ s.capaian || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- List santri (mobile) — baris sentuh penuh, native feel -->
      <ul class="md:hidden divide-y divide-[var(--border-subtle)]">
        <li v-for="(s, i) in g.santri" :key="s.id">
          <button
            class="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-teal-50/60 dark:active:bg-teal-900/20 transition"
            @click="goSantri(s.id)"
          >
            <span class="text-[11px] font-black text-[var(--text-tertiary)] w-5 flex-shrink-0">{{
              i + 1
            }}</span>
            <span class="flex-1 min-w-0">
              <span class="block text-sm font-bold text-[var(--text-primary)] truncate">{{
                s.nama
              }}</span>
              <span class="block text-[11px] text-[var(--text-secondary)] mt-0.5">
                Capaian: {{ s.capaian || '-'
                }}<template v-if="isJuz"> &middot; Juz {{ s.juz || '-' }}</template>
              </span>
            </span>
            <i
              class="fas fa-chevron-right text-[11px] text-[var(--text-tertiary)] flex-shrink-0"
            ></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// v.100 Batch7 (T21): halaman data kelas per lembaga.
// v.100b: dikelompokkan per kelas → per PASANGAN guru (pagi+sore); list tabel (No/Nama/Juz/Capaian)
//   + ekspor PDF berkelompok. Capaian = prestasi_total (kyai).
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuru } from '@/composables/useGuru'
import { useLembaga, getPkbmSubTier, isSekolahLembaga } from '@/composables/useLembaga'
import { useStatistikScope } from '@/composables/useStatistikScope'
import { kelompokRombel, labelKelasSantri } from '@/utils/kelompokRombel'
import { juzNum } from '@/utils/format'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import {
  createPdf,
  drawKopLetterhead,
  drawTable,
  drawTitle,
  lastTableY,
  savePdf,
  buildKopFromSettings
} from '@/utils/pdfBuilder'

const route = useRoute()
const router = useRouter()
const { scopedSantriAll } = useStatistikScope()
const settingsStore = useSettingsStore()
const toast = useToast()
useGuru()
const { lembagaRaw } = useLembaga()

const namaLembaga = computed(() => String(route.params.nama || '').trim())
// v.1.2.1: sekolah dibaca dari master/lembaga (tipe 'Formal'), dulu daftar nama
//   hardcoded ['TK','SDI','SMP','SMA','PKBM'] — sekolah tambahan Kyai tak dikenali.
//   SMP/SMA di sini = baris sub-tier PKBM dari dashboard; keduanya tetap kebaca
//   lewat alias canonLembaga.
const isSekolah = computed(() => isSekolahLembaga(namaLembaga.value, lembagaRaw.value))
// Kolom Juz hanya untuk PTPT (santri ngaji per-juz).
const isJuz = computed(() => namaLembaga.value.toUpperCase() === 'PTPT')

const _teks = (v) => String(v ?? '').trim()

// Santri lembaga ini (ter-scope), kelompok kelas → pasangan guru.
const groups = computed(() => {
  const nm = namaLembaga.value
  if (!nm) return []
  const up = nm.toUpperCase()
  const isSek = isSekolah.value
  const list = (scopedSantriAll.value || []).filter((s) => {
    if (s.aktif === false) return false
    if (!isSek)
      return (
        String(s.lembaga || '')
          .trim()
          .toLowerCase() === nm.toLowerCase()
      )
    if (up === 'SMP' || up === 'SMA') {
      return (
        String(s.lembaga_sekolah || '')
          .trim()
          .toUpperCase() === 'PKBM' && getPkbmSubTier(s.kelas_sekolah || s.kelas) === up
      )
    }
    return (
      String(s.lembaga_sekolah || '')
        .trim()
        .toUpperCase() === up
    )
  })
  // 1 grup = 1 rombel = 1 kelas (kunci = nama guru; jenjang campuran jadi label
  //   "Kelas 1 & 2"). Santri tanpa guru tetap tampil tapi `dihitung:false`.
  // v.1.5.0: dirakit di utils/kelompokRombel (dipakai juga PDF Data Santri) — label
  //   kelas & juz dikanonkan; dulu 'Kelas 1, 2, Kelas 1' dan 'JUZ 4' bercampur '5'.
  const lembagaList = lembagaRaw.value
  return kelompokRombel(list, { sekolah: isSek, lembagaList }).map((g) => ({
    ...g,
    // Ekspor PDF menampilkan KEDUA sisi (ngaji & sekolah) — dari daftar SDI pun juz &
    //   guru ngaji santrinya kelihatan, dan sebaliknya.
    santri: g.santri.map((s) => ({
      id: String(s.id),
      nama: s.nama || '-',
      juz: juzNum(s.juz),
      capaian: s.prestasi_total || '',
      lembagaQiraati: _teks(s.lembaga),
      kelasQiraati: labelKelasSantri(s, false, lembagaList),
      lembagaSekolah: _teks(s.lembaga_sekolah),
      kelasSekolah: labelKelasSantri(s, true, lembagaList),
      guruNgaji: [...new Set([s.guru_pagi, s.guru_sore, s.guru].map(_teks).filter(Boolean))].join(
        ', '
      ),
      guruSekolah: [
        ...new Set((Array.isArray(s.guru_sekolah) ? s.guru_sekolah : [s.guru_sekolah]).map(_teks))
      ]
        .filter(Boolean)
        .join(', ')
    }))
  }))
})

const totalSantri = computed(() => groups.value.reduce((n, g) => n + g.santri.length, 0))
// v.1.1.9: kelas = 1 ROMBEL = 1 grup = 1 (pasangan) GURU; jenjang tak ikut menentukan.
//   Hanya grup ber-kunci sah yang dihitung (grup "belum ada guru" tetap TAMPIL agar
//   datanya bisa dibetulkan, tapi tak menambah angka) — supaya sama persis dgn dasbor.
const kelasCount = computed(() => groups.value.filter((g) => g.dihitung).length)
const totalGuru = computed(() => {
  const set = new Set()
  for (const g of groups.value) {
    if (g.guruSekolah && g.guruSekolah.length) g.guruSekolah.forEach((x) => set.add(x))
    else {
      if (g.guruPagi) set.add(g.guruPagi)
      if (g.guruSore) set.add(g.guruSore)
      // v.1.1.9: field `guru` lama ikut dihitung — dulu terlewat sehingga jumlah
      //   guru di halaman ini lebih kecil dari kenyataan.
      if (g.guruLegacy) set.add(g.guruLegacy)
    }
  }
  return set.size
})

// ── Ekspor PDF berkelompok (KOP + judul + tiap grup: header + tabel) ──
const exporting = ref(false)
async function exportPdf() {
  if (exporting.value || !groups.value.length) return
  exporting.value = true
  try {
    const s = settingsStore.settings || {}
    // v.1.1.9: LANDSCAPE — kolomnya kini 10 (ngaji + sekolah sekaligus), tak muat potret.
    const doc = await createPdf({ kind: 'umum', orientation: 'l', format: 'F4' })
    const font = doc._fontMU || 'helvetica'
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    let y = await drawKopLetterhead(doc, buildKopFromSettings(s), { y: 10 })
    drawTitle(doc, `DATA KELAS — ${namaLembaga.value.toUpperCase()}`, { y: y + 7, size: 13 })
    y += 12
    // v.1.1.9 (permintaan Kyai): tampilkan lembaga & kelas KEDUA sisi, Juz (PTPT),
    //   serta guru ngaji & guru sekolah. Kolom Juz SELALU ada — dari daftar sekolah
    //   pun juz santri PTPT harus kelihatan; santri non-PTPT terisi '-'.
    const head = [
      [
        'No',
        'Nama Santri',
        'Lembaga Ngaji',
        'Kelas Ngaji',
        'Juz',
        'Guru Ngaji',
        'Lembaga Sekolah',
        'Kelas Sekolah',
        'Guru Sekolah',
        'Capaian Terakhir'
      ]
    ]
    for (const g of groups.value) {
      if (y > pageH - 35) {
        doc.addPage()
        y = 15
      }
      doc.setFont(font, 'bold')
      doc.setFontSize(10)
      doc.text(`${g.kelas} · ${g.guruLabel}`, 12, y)
      doc.setFont(font, 'normal')
      doc.setFontSize(9)
      doc.text(`Total Santri: ${g.santri.length}`, pageW - 12, y, { align: 'right' })
      const body = g.santri.map((st, i) => [
        i + 1,
        st.nama,
        st.lembagaQiraati || '-',
        st.kelasQiraati || '-',
        st.juz || '-',
        st.guruNgaji || '-',
        st.lembagaSekolah || '-',
        st.kelasSekolah || '-',
        st.guruSekolah || '-',
        st.capaian || '-'
      ])
      drawTable(doc, {
        startY: y + 2,
        head,
        body,
        styles: { fontSize: 7.5, cellPadding: 1.1, overflow: 'linebreak' },
        columnStyles: {
          0: { cellWidth: 9, halign: 'center' }, // No
          1: { cellWidth: 48 }, // Nama Santri
          2: { cellWidth: 22 }, // Lembaga Ngaji
          3: { cellWidth: 20 }, // Kelas Ngaji
          4: { cellWidth: 11, halign: 'center' }, // Juz
          5: { cellWidth: 40 }, // Guru Ngaji (bisa 2 nama pagi+sore)
          6: { cellWidth: 22 }, // Lembaga Sekolah
          7: { cellWidth: 20 }, // Kelas Sekolah
          8: { cellWidth: 40 }, // Guru Sekolah (bisa >1)
          9: { cellWidth: 26 } // Capaian Terakhir
        }
      })
      y = lastTableY(doc) + 7
    }
    await savePdf(doc, `Data_Kelas_${namaLembaga.value.replace(/\s+/g, '_')}.pdf`)
    toast.success('PDF berhasil dibuat.')
  } catch (e) {
    toast.error('Gagal ekspor PDF: ' + (e.message || e))
  } finally {
    exporting.value = false
  }
}

function goSantri(id) {
  if (id) router.push(`/profil/santri/${id}`)
}
function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/statistik')
}
</script>
