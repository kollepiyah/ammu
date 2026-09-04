<template>
  <div class="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
    <button
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-teal-600 transition cursor-pointer"
      @click="goBack"
    >
      <i class="fas fa-arrow-left"></i>Kembali
    </button>

    <!-- v.1.3.8 (Kyai 2 Sep 2026): "bisa saya ekspor pdf, untuk dishare siapa saja yg
         belum isi data". Ditaruh di luar kartu header supaya tak ikut tercetak. -->
    <button
      v-if="isAdminMode && guruBelumInput.length > 0"
      type="button"
      class="ml-3 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)] transition cursor-pointer"
      :class="cetakBusy ? 'opacity-50 pointer-events-none' : ''"
      @click="cetakPdf"
    >
      <i :class="['fas', cetakBusy ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Ekspor PDF
    </button>

    <!-- Header -->
    <div
      class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-user-clock mr-1"></i>Guru Belum Isi Rekap Prestasi
      </p>
      <h2 class="text-xl md:text-2xl font-black mt-1">Periode {{ periodeLabel }}</h2>
      <p class="text-xs md:text-sm font-medium mt-1 opacity-90">
        {{ guruBelumInput.length }} guru &middot; {{ totalSantriBelum }} santri belum dinilai
      </p>
      <!-- v.1.3.8: rekap diisi untuk bulan LALU, batas tanggal 5 (Kyai, 1 Sep 2026). -->
      <p v-if="batasLabel" class="text-[11px] font-bold mt-2 opacity-95">
        <i class="fas fa-clock mr-1"></i>PTPT &amp; PPPH &mdash;
        <span v-if="rekapSudahTerlambat">sudah lewat batas ({{ batasLabel }})</span>
        <span v-else>batas pengisian {{ batasLabel }}</span>
      </p>
    </div>

    <div
      v-if="!isAdminMode"
      class="bg-[var(--bg-card)] rounded-2xl p-8 text-center border border-[var(--border-subtle)]"
    >
      <p class="text-sm text-[var(--text-secondary)] italic">
        Halaman ini hanya untuk admin / kepala lembaga.
      </p>
    </div>

    <div
      v-else-if="guruBelumInput.length === 0"
      class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-10 text-center border border-emerald-200 dark:border-emerald-700"
    >
      <i class="fas fa-circle-check text-emerald-500 text-4xl mb-2"></i>
      <p class="text-sm font-bold text-emerald-700 dark:text-emerald-300">
        Semua guru sudah mengisi rekap {{ periodeLabel }} 🎉
      </p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="g in guruBelumInput"
        :key="g.guru"
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          class="w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition cursor-pointer"
          @click="toggle(g.guru)"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-chalkboard-teacher text-amber-600 dark:text-amber-300"></i>
            </div>
            <p class="font-black text-sm text-[var(--text-primary)] truncate">{{ g.guru }}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span
              class="text-[11px] font-black bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-full"
            >
              {{ g.jml }} santri
            </span>
            <i
              :class="[
                'fas text-[var(--text-tertiary)]',
                open[g.guru] ? 'fa-chevron-up' : 'fa-chevron-down'
              ]"
            ></i>
          </div>
        </button>
        <div
          v-if="open[g.guru]"
          class="px-4 pb-3 border-t border-[var(--border-subtle)] pt-2 space-y-1"
        >
          <button
            v-for="s in g.santri"
            :key="s.id"
            class="w-full flex items-center justify-between gap-2 text-left bg-slate-50 dark:bg-slate-700/30 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg px-3 py-2 transition cursor-pointer"
            @click="goSantri(s.id)"
          >
            <span class="text-xs font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</span>
            <span class="text-[10px] text-[var(--text-secondary)] whitespace-nowrap">
              {{ s.lembaga }} {{ s.kelas ? '· ' + s.kelas : ''
              }}<i class="fas fa-chevron-right ml-2"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStatistikScope } from '@/composables/useStatistikScope'
// v.1.3.8 (Kyai, 2 Sep 2026): "bisa saya ekspor pdf, untuk dishare siapa saja yg belum isi data".
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { labelPeriodeRekap } from '@/utils/prestasiBulanan'

const router = useRouter()
const settingsStore = useSettingsStore()
const toast = useToast()
const { isAdminMode, guruBelumInput, periodeRekap, batasRekapNow, rekapSudahTerlambat } =
  useStatistikScope()

const open = ref({})
function toggle(guru) {
  open.value = { ...open.value, [guru]: !open.value[guru] }
}

const totalSantriBelum = computed(() => guruBelumInput.value.reduce((sum, g) => sum + g.jml, 0))

const NAMA_BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]
// v.1.4.1: label periode SELALU menyebut bulan datanya — 'September 2026 (data Agustus
//   2026)'. Nama bulan yang berdiri sendiri di sini persis yang bikin Kyai ragu layar ini
//   dan Rekap Prestasi sedang membicarakan pekerjaan yang sama atau bukan.
const periodeLabel = computed(() => labelPeriodeRekap(periodeRekap.value))
const batasLabel = computed(() => {
  const m = String(batasRekapNow.value).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return m ? `${parseInt(m[3])} ${NAMA_BULAN[parseInt(m[2]) - 1]} ${m[1]}` : ''
})

// Ekspor PDF daftar guru yang belum mengisi — untuk dibagikan (Kyai, 2 Sep 2026).
//   SATU BARIS PER SANTRI, bukan per guru: yang ditanya penerima pesan selalu "santri saya
//   yang mana", dan daftar nama di dalam satu sel akan terpotong begitu jumlahnya belasan.
//   Nama guru sengaja diulang tiap baris supaya potongan tangkapan layar mana pun tetap
//   terbaca sendiri.
const cetakBusy = ref(false)
async function cetakPdf() {
  if (cetakBusy.value || guruBelumInput.value.length === 0) return
  cetakBusy.value = true
  try {
    let no = 0
    const rows = []
    for (const g of guruBelumInput.value) {
      for (const s of g.santri) {
        rows.push({
          no: ++no,
          guru: g.guru,
          santri: s.nama,
          lembaga: s.lembaga || '',
          kelas: s.kelas || ''
        })
      }
    }
    const tenggat = rekapSudahTerlambat.value
      ? `SUDAH LEWAT BATAS (${batasLabel.value})`
      : `batas pengisian ${batasLabel.value}`
    await buildListPdf({
      kind: 'umum',
      orientation: 'p',
      format: 'a4',
      kop: buildKopFromSettings(settingsStore.settings || {}),
      title: `BELUM ISI REKAP PRESTASI — ${periodeLabel.value.toUpperCase()}
${guruBelumInput.value.length} guru · ${totalSantriBelum.value} santri · PTPT & PPPH · ${tenggat}`,
      columns: [
        { key: 'no', header: 'No', width: 10 },
        { key: 'guru', header: 'Guru', width: 55 },
        { key: 'santri', header: 'Santri', width: 55 },
        { key: 'lembaga', header: 'Lembaga', width: 22 },
        { key: 'kelas', header: 'Kelas', width: 18 }
      ],
      rows,
      filename: `belum-rekap-prestasi-${periodeRekap.value}.pdf`
    })
  } catch (e) {
    toast.error('Gagal cetak PDF: ' + (e?.message || e))
  } finally {
    cetakBusy.value = false
  }
}

function goSantri(id) {
  router.push(`/statistik/santri/${id}`)
}
function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/statistik')
}
</script>
