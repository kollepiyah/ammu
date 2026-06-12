<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
    <!-- Back -->
    <button
      @click="goBack"
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-teal-600 transition cursor-pointer"
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
        <span class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">{{ kelasCount }} kelas</span>
        <span class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">{{ totalSantri }} santri</span>
        <span class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-3 py-1 rounded-full">{{ totalGuru }} guru</span>
        <button
          v-if="groups.length"
          @click="exportPdf"
          :disabled="exporting"
          class="ml-auto inline-flex items-center gap-1.5 bg-white/90 hover:bg-white disabled:opacity-50 text-teal-700 text-[11px] font-black px-3 py-1.5 rounded-lg shadow-sm transition"
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
      <p class="text-sm text-[var(--text-secondary)] italic">Belum ada santri aktif di lembaga ini.</p>
    </div>

    <!-- Per kelas → per pasangan guru -->
    <div
      v-for="g in groups"
      :key="g.key"
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <!-- Header grup -->
      <div class="flex items-center justify-between gap-2 flex-wrap p-3 md:p-4 bg-[var(--bg-muted)] border-b border-[var(--border-subtle)]">
        <div class="min-w-0">
          <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
            <i class="fas fa-door-open text-teal-600 mr-1.5"></i>{{ kelasLabel }} {{ g.kelas }}
          </h3>
          <p class="text-[11px] font-bold text-teal-700 dark:text-teal-300 mt-0.5">
            <i class="fas fa-chalkboard-teacher mr-1"></i>{{ g.guruLabel }}
          </p>
        </div>
        <span class="text-[11px] font-black text-[var(--text-secondary)] bg-[var(--bg-card)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)] flex-shrink-0">
          Total Santri: {{ g.santri.length }}
        </span>
      </div>

      <!-- Tabel santri -->
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="text-left text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
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
                <button @click="goSantri(s.id)" class="font-bold text-[var(--text-primary)] hover:text-teal-600 hover:underline text-left cursor-pointer">{{ s.nama }}</button>
              </td>
              <td v-if="isJuz" class="px-3 py-2 text-center font-bold">{{ s.juz || '-' }}</td>
              <td class="px-3 py-2 text-[var(--text-secondary)]">{{ s.capaian || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
import { useLembaga, getPkbmSubTier } from '@/composables/useLembaga'
import { useStatistikScope } from '@/composables/useStatistikScope'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import {
  createPdf, drawKopLetterhead, drawTable, drawTitle, lastTableY, savePdf, buildKopFromSettings
} from '@/utils/pdfBuilder'

const route = useRoute()
const router = useRouter()
const { scopedSantriAll } = useStatistikScope()
const settingsStore = useSettingsStore()
const toast = useToast()
useGuru()
useLembaga()

const namaLembaga = computed(() => String(route.params.nama || '').trim())
const _SEKOLAH_NAMA = ['TK', 'SDI', 'SMP', 'SMA', 'PKBM']
const isSekolah = computed(() => _SEKOLAH_NAMA.includes(namaLembaga.value.toUpperCase()))
// Kolom Juz hanya untuk PTPT (santri ngaji per-juz).
const isJuz = computed(() => namaLembaga.value.toUpperCase() === 'PTPT')
const kelasLabel = 'Kelas'

// Label grup guru: Qiraati = pasangan pagi/sore; Sekolah = daftar guru_sekolah.
function guruLabelOf(g) {
  if (g.guruSekolah && g.guruSekolah.length) return 'Guru: ' + g.guruSekolah.join(', ')
  const gp = g.guruPagi, gs = g.guruSore
  if (gp && gs) return gp === gs ? `Guru Pagi/Sore: ${gp}` : `Pagi: ${gp} · Sore: ${gs}`
  if (gp) return `Guru Pagi: ${gp}`
  if (gs) return `Guru Sore: ${gs}`
  return '— belum ada guru —'
}

// Santri lembaga ini (ter-scope), kelompok kelas → pasangan guru.
const groups = computed(() => {
  const nm = namaLembaga.value
  if (!nm) return []
  const up = nm.toUpperCase()
  const isSek = isSekolah.value
  const list = (scopedSantriAll.value || []).filter((s) => {
    if (s.aktif === false) return false
    if (!isSek) return String(s.lembaga || '').trim().toLowerCase() === nm.toLowerCase()
    if (up === 'SMP' || up === 'SMA') {
      return String(s.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM' && getPkbmSubTier(s.kelas_sekolah || s.kelas) === up
    }
    return String(s.lembaga_sekolah || '').trim().toUpperCase() === up
  })
  // kelas → guruKey → grup
  const byKelas = new Map()
  for (const s of list) {
    const kls = (isSek ? s.kelas_sekolah || s.kelas : s.kelas) || '-'
    let key, gp = '', gs = '', gsek = []
    if (isSek) {
      gsek = (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []).filter(Boolean)
      key = gsek.slice().sort().join(' & ') || '—'
    } else {
      gp = s.guru_pagi || ''
      gs = s.guru_sore || ''
      key = gp + '||' + gs
    }
    if (!byKelas.has(kls)) byKelas.set(kls, new Map())
    const gmap = byKelas.get(kls)
    if (!gmap.has(key)) gmap.set(key, { kelas: kls, key: kls + '#' + key, guruPagi: gp, guruSore: gs, guruSekolah: gsek, santri: [] })
    gmap.get(key).santri.push({ id: String(s.id), nama: s.nama || '-', juz: s.juz && s.juz !== '-' ? s.juz : '', capaian: s.prestasi_total || '' })
  }
  const out = []
  const kelasKeys = [...byKelas.keys()].sort((a, b) => String(a).localeCompare(String(b), 'id', { numeric: true }))
  for (const k of kelasKeys) {
    const grps = [...byKelas.get(k).values()].sort((a, b) => guruLabelOf(a).localeCompare(guruLabelOf(b), 'id'))
    for (const g of grps) {
      g.guruLabel = guruLabelOf(g)
      g.santri.sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id'))
      out.push(g)
    }
  }
  return out
})

const totalSantri = computed(() => groups.value.reduce((n, g) => n + g.santri.length, 0))
const kelasCount = computed(() => new Set(groups.value.map((g) => g.kelas)).size)
const totalGuru = computed(() => {
  const set = new Set()
  for (const g of groups.value) {
    if (g.guruSekolah && g.guruSekolah.length) g.guruSekolah.forEach((x) => set.add(x))
    else { if (g.guruPagi) set.add(g.guruPagi); if (g.guruSore) set.add(g.guruSore) }
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
    const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
    const font = doc._fontMU || 'helvetica'
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    let y = await drawKopLetterhead(doc, buildKopFromSettings(s), { y: 10 })
    drawTitle(doc, `DATA KELAS — ${namaLembaga.value.toUpperCase()}`, { y: y + 7, size: 13 })
    y += 12
    const head = isJuz.value
      ? [['No', 'Nama Santri', 'Juz', 'Total Capaian Terakhir']]
      : [['No', 'Nama Santri', 'Total Capaian Terakhir']]
    for (const g of groups.value) {
      if (y > pageH - 35) { doc.addPage(); y = 15 }
      doc.setFont(font, 'bold'); doc.setFontSize(10)
      doc.text(`${kelasLabel} ${g.kelas} · ${g.guruLabel}`, 12, y)
      doc.setFont(font, 'normal'); doc.setFontSize(9)
      doc.text(`Total Santri: ${g.santri.length}`, pageW - 12, y, { align: 'right' })
      const body = g.santri.map((st, i) =>
        isJuz.value
          ? [i + 1, st.nama, st.juz || '-', st.capaian || '-']
          : [i + 1, st.nama, st.capaian || '-']
      )
      drawTable(doc, {
        startY: y + 2,
        head,
        body,
        styles: { fontSize: 9, cellPadding: 1.4 },
        columnStyles: isJuz.value
          ? { 0: { cellWidth: 12, halign: 'center' }, 2: { cellWidth: 16, halign: 'center' }, 3: { cellWidth: 42 } }
          : { 0: { cellWidth: 12, halign: 'center' }, 2: { cellWidth: 50 } }
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

function goSantri(id) { if (id) router.push(`/profil/santri/${id}`) }
function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/statistik')
}
</script>
