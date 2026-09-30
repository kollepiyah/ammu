<script setup>
// TambalLogHiview — tambal absensi guru dari berkas EKSPOR mesin HiView.
//
// v.1.4.6 gel. 3 (27 Sep 2026): mesin HiView berhenti mengirim sejak Kamis 24 Sep 17:44 WIB —
// tak satu kiriman pun sampai ke server, dan setiap guru yang scan di sana tercatat alpa.
// Tab Impor lama tak bisa dipakai menambalnya: ia menuntut lembar yang sudah disusun
// (tanggal/PIN/jam/shift, shift bawaan "pagi") dan tak menurunkan shift maupun jam pulang.
//
// Di sini berkas ekspor mentah dibaca apa adanya (utils/logMesinHiview), lalu diproses dengan
// aturan yang SAMA dengan kiriman langsung & sinkron Revo (utils/scanMesin): shift dari jam
// scan, terlambat dari batas shift, jam pulang dari scan berikutnya, baris "hadir sekolah"
// guru gabungan. Bedanya satu, dan disengaja: tambal hanya MENGISI slot yang masih kosong —
// izin, cuti, perbaikan manual, dan baris mesin lain dibiarkan (lihat rencanaTambalScan).
//
// Pratinjau dulu, tulis sesudah dikonfirmasi. Tepat sebelum menulis, baris yang sudah ada
// dibaca ULANG — layar ini bisa lama terbuka, dan yang boleh diisi hanya yang MASIH kosong.
//
// v.1.4.7 (30 Sep 2026): berkas asli mesin (AllReport) ditolak "kolom PIN dan waktu scan
// tidak dikenali" — yang terbaca hanya lembar pertamanya, rekap bulanan. Kini semua lembar
// dibaca dan lembar jam scannya dicari sendiri (utils/logMesinHiview.scanDariLembar).
import { ref, computed, watch } from 'vue'
import { queryColl, setOne, mergeOne } from '@/services/db'
import { useExcel } from '@/composables/useExcel'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { todayJakarta } from '@/utils/format'
import { guruAktifSaja } from '@/utils/guruScope'
import { shiftsForGuru } from '@/utils/shiftDerive'
import { shiftLabelOf } from '@/utils/shiftMaster'
import { labelSumberAbsen } from '@/utils/absensiRekap'
import { bacaCsv, scanDariLembar, samakanPin, tampakBiner } from '@/utils/logMesinHiview'
import {
  kelompokkanScan,
  saringScan,
  rencanaTambalScan,
  hitungScanTanpaAbsen,
  pisahWaktuScan
} from '@/utils/scanMesin'

const props = defineProps({
  // SEMUA guru (termasuk nonaktif) — PIN dicocokkan seperti kiriman langsung.
  guru: { type: Array, default: () => [] },
  settings: { type: Object, default: () => ({}) },
  // Tanggal mesin berhenti mengirim (spanduk "mesin HiView diam"). Rentang bawaan dimulai di
  //   sini, bukan di tanggal pertama berkas: AllReport memuat SEBULAN penuh, padahal hari
  //   sebelumnya sudah terkirim langsung dan barisnya mungkin sudah diperbaiki tangan.
  sejak: { type: String, default: '' }
})
const emit = defineEmits(['selesai'])

// Sumber baris baru — terpisah dari 'hiview' (kiriman langsung) supaya asal-usulnya terbaca.
const SUMBER = 'hiview_impor'

const { importSheets } = useExcel()
const toast = useToast()
const confirmDlg = useConfirm()

const inputBerkas = ref(null)
const namaBerkas = ref('')
const membaca = ref(false)
const bacaan = ref(null)
const dari = ref('')
const sampai = ref('')
const hariIni = todayJakarta()
const ada = ref([])
const memuatAda = ref(false)
const galatAda = ref('')
const menulis = ref(false)
const kemajuan = ref({ selesai: 0, total: 0 })
const hasilTulis = ref(null)

async function pilihBerkas(ev) {
  const file = ev.target.files?.[0]
  ev.target.value = ''
  if (!file) return
  namaBerkas.value = file.name
  bacaan.value = null
  hasilTulis.value = null
  ada.value = []
  const ext = String(file.name.split('.').pop() || '').toLowerCase()
  if (ext === 'xls') {
    toast.warning('Berkas .xls lama belum bisa dibaca — buka di Excel, lalu Simpan Sebagai .xlsx.')
    return
  }
  membaca.value = true
  try {
    let lembar
    if (ext === 'csv' || ext === 'txt') {
      const teks = await file.text()
      if (tampakBiner(teks)) {
        bacaan.value = { ok: false, biner: true, judul: [], daftarLembar: [] }
        return
      }
      lembar = [{ nama: file.name, baris: bacaCsv(teks) }]
    } else lembar = await importSheets(file)
    const b = scanDariLembar(lembar)
    b.scans = samakanPin(b.scans, props.guru)
    bacaan.value = b
    if (!b.ok) return
    const tgl = b.scans
      .map((s) => pisahWaktuScan(s.timestamp)?.date)
      .filter(Boolean)
      .sort()
    const awal = tgl[0] || ''
    const akhir = tgl[tgl.length - 1] || ''
    dari.value = props.sejak > awal && props.sejak <= akhir ? props.sejak : awal
    sampai.value = akhir > hariIni ? hariIni : akhir
    await muatAda()
  } catch (e) {
    toast.error('Gagal membaca berkas: ' + (e?.message || e))
  } finally {
    membaca.value = false
  }
}

async function muatAda() {
  galatAda.value = ''
  if (!dari.value || !sampai.value || dari.value > sampai.value) {
    ada.value = []
    return
  }
  memuatAda.value = true
  try {
    ada.value = await queryColl('absensi_shift_guru', [
      ['tanggal', '>=', dari.value],
      ['tanggal', '<=', sampai.value]
    ])
  } catch (e) {
    ada.value = []
    galatAda.value = 'Gagal membaca absen yang sudah ada: ' + (e?.message || e)
  } finally {
    memuatAda.value = false
  }
}
// Rentang digeser → baca ulang yang sudah ada (saat berkas baru dibaca, pilihBerkas sendiri
//   yang memuatnya — `membaca` masih menyala di sana).
watch([dari, sampai], () => {
  if (!membaca.value && bacaan.value?.ok) muatAda()
})

const saring = computed(() =>
  bacaan.value?.ok
    ? saringScan(bacaan.value.scans, { dari: dari.value, sampai: sampai.value, hariIni })
    : null
)
const kelompok = computed(() =>
  saring.value ? kelompokkanScan(saring.value.dipakai, props.guru, props.settings) : null
)
function susunRencana(waktu) {
  return rencanaTambalScan({
    kelompok: kelompok.value,
    ada: ada.value,
    guruAktif: guruAktifSaja(props.guru),
    settings: props.settings,
    sumber: SUMBER,
    waktu
  })
}
const rencana = computed(() =>
  kelompok.value && !memuatAda.value && !galatAda.value ? susunRencana('') : null
)
const jumlahTulis = computed(() =>
  rencana.value
    ? rencana.value.baru.length + rencana.value.gabungan.length + rencana.value.pulang.length
    : 0
)
const baruBerpulang = computed(() =>
  rencana.value ? rencana.value.baru.filter((r) => r.jam_pulang).length : 0
)
const perTanggal = computed(() =>
  rencana.value
    ? Object.keys(rencana.value.perTanggal)
        .sort()
        .map((tanggal) => ({ tanggal, ...rencana.value.perTanggal[tanggal] }))
    : []
)
const takKenal = computed(() => {
  if (!kelompok.value) return []
  const nama = new Map()
  for (const s of saring.value.dipakai) if (!nama.has(s.device_pin)) nama.set(s.device_pin, s.nama)
  return [...kelompok.value.takKenal]
    .map((pin) => ({ pin, nama: nama.get(pin) || '' }))
    .sort((a, b) => a.pin.localeCompare(b.pin, 'id', { numeric: true }))
})
const tanpaAbsen = computed(() =>
  kelompok.value
    ? hitungScanTanpaAbsen(
        kelompok.value.luarPer,
        Object.keys(kelompok.value.agg),
        (g) => [...shiftsForGuru(g, props.settings)],
        30
      )
    : { daftar: [], lebih: 0 }
)
const kolomWaktu = computed(() => {
  const k = bacaan.value?.kolom || {}
  return ['waktu', 'tanggal', 'jam', 'masuk', 'pulang']
    .filter((p) => k[p])
    .map((p) => `"${k[p]}"`)
    .join(' + ')
})

function fmtTgl(iso) {
  const [y, m, d] = String(iso || '')
    .split('-')
    .map(Number)
  if (!y || !m || !d) return iso || '—'
  return new Date(y, m - 1, d).toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
const labelShift = (id) => shiftLabelOf(props.settings || {}, id)

async function tulis() {
  if (!rencana.value || !jumlahTulis.value || menulis.value) return
  const r0 = rencana.value
  const ok = await confirmDlg({
    title: 'Tulis absen dari berkas mesin?',
    message:
      `${fmtTgl(dari.value)} – ${fmtTgl(sampai.value)}: ${r0.baru.length} baris hadir baru, ` +
      `${r0.gabungan.length} baris gabungan, dan ${r0.pulang.length} jam pulang. ` +
      `${r0.lewat.length} baris yang sudah ada tidak disentuh.`,
    confirmText: 'Tulis',
    danger: false
  })
  if (!ok) return
  menulis.value = true
  hasilTulis.value = null
  try {
    await muatAda()
    if (galatAda.value) throw new Error(galatAda.value)
    const r = susunRencana(new Date().toISOString())
    const tugas = [
      ...r.baru.map((row) => () => setOne('absensi_shift_guru', row.id, row)),
      ...r.gabungan.map((row) => () => setOne('absensi_shift_guru', row.id, row)),
      ...r.pulang.map(
        (p) => () => mergeOne('absensi_shift_guru', p.id, { jam_pulang: p.jam_pulang })
      )
    ]
    kemajuan.value = { selesai: 0, total: tugas.length }
    let gagal = 0
    const galat = []
    for (const t of tugas) {
      try {
        await t()
      } catch (e) {
        gagal++
        if (galat.length < 5) galat.push(e?.message || String(e))
      }
      kemajuan.value = { ...kemajuan.value, selesai: kemajuan.value.selesai + 1 }
    }
    hasilTulis.value = {
      baru: r.baru.length,
      gabungan: r.gabungan.length,
      pulang: r.pulang.length,
      gagal,
      galat
    }
    if (gagal) toast.warning(`${tugas.length - gagal} catatan tertulis, ${gagal} gagal`)
    else toast.success(`${tugas.length} catatan absen dari berkas mesin tertulis`)
    emit('selesai', hasilTulis.value)
    // Pratinjau berikutnya dihitung dari keadaan baru — berkas yang sama kini "sudah terisi".
    await muatAda()
  } catch (e) {
    toast.error('Gagal menulis: ' + (e?.message || e))
  } finally {
    menulis.value = false
  }
}
</script>

<template>
  <div
    class="rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-900/10 p-4 md:p-5"
  >
    <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-1">
      <i class="fas fa-satellite-dish text-amber-600 mr-2"></i>Tambal dari Log Mesin HiView
    </h3>
    <p class="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
      Untuk hari ketika mesin HiView tak mengirim ke server (lihat tab Jejak Mesin). Unggah berkas
      <b>AllReport</b> dari flashdisk mesin (.xlsx; bila .xls, buka di Excel lalu Simpan Sebagai
      .xlsx) — lembar jam scannya dicari sendiri. Scan diproses dengan aturan yang sama dengan
      kiriman langsung — shift dari jam scan, terlambat, jam pulang — dan
      <b>hanya mengisi yang masih kosong</b>: izin, cuti, dan perbaikan manual tidak ditimpa. Tak
      ada yang ditulis sebelum Anda menekan <b>Tulis</b>.
    </p>
    <div class="flex items-center gap-2 flex-wrap">
      <input
        ref="inputBerkas"
        type="file"
        accept=".xlsx,.csv,.txt"
        class="hidden"
        @change="pilihBerkas"
      />
      <button
        type="button"
        :disabled="membaca || menulis"
        class="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold"
        @click="inputBerkas.click()"
      >
        <i :class="['fas', membaca ? 'fa-spinner fa-spin' : 'fa-folder-open']"></i>Pilih Berkas
        Ekspor Mesin
      </button>
      <span v-if="namaBerkas" class="text-[11px] text-[var(--text-secondary)] font-bold">
        <i class="fas fa-file-lines mr-1"></i>{{ namaBerkas }}
      </span>
    </div>

    <!-- Berkas tak terbaca: sebut apa yang ADA di berkas, dan apa yang harus diunggah. -->
    <div
      v-if="bacaan && !bacaan.ok"
      class="mt-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 p-3 text-xs text-rose-800 dark:text-rose-200"
    >
      <template v-if="bacaan.biner">
        <p class="font-bold">
          <i class="fas fa-lock mr-1"></i>Isi berkas ini bukan teks yang bisa dibaca.
        </p>
        <p class="mt-1">
          Ekspor <b>recordList_….csv</b> dari flashdisk mesin memang terkunci (terenkripsi) walau
          berakhiran .csv. Unggah berkas <b>AllReport</b> dari flashdisk yang sama.
        </p>
      </template>
      <template v-else-if="bacaan.sebab === 'periode'">
        <p class="font-bold">
          <i class="fas fa-triangle-exclamation mr-1"></i>Bulan & tahun laporan tidak ditemukan.
        </p>
        <p class="mt-1">
          Lembar <b>"{{ bacaan.lembar }}"</b> berisi jam scan per tanggal, tapi baris periodenya di
          atas tabel (mis. <code>Made Date:2026/09/01-2026/09/30</code>) hilang atau tak cocok
          dengan kolom tanggal. Ekspor ulang dari mesin tanpa menyunting bagian atas lembar.
        </p>
      </template>
      <template v-else>
        <p class="font-bold">
          <i class="fas fa-triangle-exclamation mr-1"></i>Jam scan tidak ditemukan di berkas ini.
        </p>
        <p v-if="bacaan.daftarLembar.length > 1" class="mt-1">
          Lembar yang dibaca:
          <template v-for="(l, i) in bacaan.daftarLembar" :key="i"
            ><template v-if="i">; </template><b>{{ l.nama }}</b
            ><code v-if="l.judul.length"> ({{ l.judul.join(', ') }})</code></template
          >.
        </p>
        <p v-else class="mt-1">
          Judul kolom di berkas: <code>{{ bacaan.judul.join(', ') || '(kosong)' }}</code
          >.
        </p>
        <p class="mt-1">
          Dari mesin HiView, unggah <b>AllReport</b> — lembar "Attendance Record" dibaca otomatis.
          Berkas susunan sendiri: beri judul <b>PIN</b> dan <b>Waktu</b> (tanggal + jam dalam satu
          sel) — atau <b>PIN</b>, <b>Tanggal</b>, dan <b>Jam</b> — lalu unggah lagi.
        </p>
      </template>
    </div>

    <template v-else-if="bacaan">
      <p v-if="bacaan.bentuk === 'kisi'" class="mt-3 text-[11px] text-[var(--text-secondary)]">
        Lembar <b>"{{ bacaan.lembar }}"</b>, {{ fmtTgl(bacaan.periode.dari) }} –
        {{ fmtTgl(bacaan.periode.sampai) }}: <b>{{ bacaan.total }}</b> orang →
        <b>{{ bacaan.scans.length }}</b> scan. PIN dari kolom <code>"{{ bacaan.kolom.pin }}"</code>,
        tanggal dari judul kolom 1, 2, 3, …<template v-if="bacaan.waktuRusak">
          · {{ bacaan.waktuRusak }} sel tanpa jam terbaca</template
        >.
      </p>
      <p v-else class="mt-3 text-[11px] text-[var(--text-secondary)]">
        <template v-if="bacaan.daftarLembar?.length > 1"
          >Lembar <b>"{{ bacaan.lembar }}"</b>: </template
        >Terbaca <b>{{ bacaan.total }}</b> baris → <b>{{ bacaan.scans.length }}</b> scan. PIN dari
        kolom <code>"{{ bacaan.kolom.pin }}"</code>, waktu dari <code>{{ kolomWaktu }}</code
        ><template v-if="bacaan.tanpaPin"> · {{ bacaan.tanpaPin }} baris tanpa PIN</template
        ><template v-if="bacaan.gagal"> · {{ bacaan.gagal }} autentikasi gagal dilewati</template
        ><template v-if="bacaan.waktuRusak"> · {{ bacaan.waktuRusak }} waktu tak terbaca</template>.
      </p>
      <p v-if="!bacaan.urutanPasti" class="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
        <i class="fas fa-circle-info mr-1"></i>Urutan tanggal (hari/bulan atau bulan/hari) tak bisa
        dipastikan dari berkas ini — dibaca sebagai hari/bulan/tahun. Periksa rentang di bawah.
      </p>

      <div class="mt-3 flex items-center gap-2 flex-wrap text-xs">
        <span class="font-bold text-[var(--text-secondary)]">Tambal tanggal</span>
        <input
          v-model="dari"
          type="date"
          :max="hariIni"
          class="px-2 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
        />
        <span class="text-[var(--text-tertiary)]">s/d</span>
        <input
          v-model="sampai"
          type="date"
          :max="hariIni"
          class="px-2 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
        />
        <span v-if="saring?.luarRentang" class="text-[var(--text-tertiary)]">
          ({{ saring.luarRentang }} scan di luar rentang)
        </span>
      </div>
      <p v-if="sejak && dari === sejak" class="mt-1 text-[11px] text-[var(--text-secondary)]">
        <i class="fas fa-circle-info mr-1"></i>Mulai {{ fmtTgl(sejak) }} — hari mesin berhenti
        mengirim. Tanggal sebelumnya sudah terkirim langsung; geser bila memang perlu ditambal.
      </p>
      <p v-if="saring?.masaDepan" class="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
        <i class="fas fa-clock mr-1"></i>{{ saring.masaDepan }} scan bertanggal sesudah hari ini
        disisihkan — periksa tanggal & jam di mesin.
      </p>

      <div v-if="memuatAda" class="py-6 text-center">
        <i class="fas fa-spinner fa-spin text-amber-500 text-xl"></i>
      </div>
      <p
        v-else-if="galatAda"
        class="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-bold text-rose-800"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>{{ galatAda }}
      </p>

      <template v-else-if="rencana">
        <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div class="rounded-xl px-3 py-2 border bg-[var(--bg-card)] border-emerald-300">
            <p class="text-lg font-black leading-none text-emerald-700">
              {{ rencana.baru.length }}
            </p>
            <p class="text-[10px] text-[var(--text-secondary)] mt-1">
              Baris hadir baru<template v-if="baruBerpulang">
                ({{ baruBerpulang }} dengan jam pulang)</template
              >
            </p>
          </div>
          <div
            class="rounded-xl px-3 py-2 border bg-[var(--bg-card)] border-[var(--border-subtle)]"
          >
            <p class="text-lg font-black leading-none text-[var(--text-primary)]">
              {{ rencana.gabungan.length }}
            </p>
            <p class="text-[10px] text-[var(--text-secondary)] mt-1">Baris gabungan (ikut ngaji)</p>
          </div>
          <div
            class="rounded-xl px-3 py-2 border bg-[var(--bg-card)] border-[var(--border-subtle)]"
          >
            <p class="text-lg font-black leading-none text-[var(--text-primary)]">
              {{ rencana.pulang.length }}
            </p>
            <p class="text-[10px] text-[var(--text-secondary)] mt-1">Jam pulang ke baris lama</p>
          </div>
          <div
            class="rounded-xl px-3 py-2 border bg-[var(--bg-card)] border-[var(--border-subtle)]"
          >
            <p class="text-lg font-black leading-none text-[var(--text-tertiary)]">
              {{ rencana.lewat.length }}
            </p>
            <p class="text-[10px] text-[var(--text-secondary)] mt-1">Sudah terisi — dibiarkan</p>
          </div>
        </div>

        <div
          v-if="perTanggal.length"
          class="mt-3 overflow-x-auto rounded-xl border border-[var(--border-subtle)]"
        >
          <table class="w-full text-[11px] border-collapse min-w-[520px]">
            <thead>
              <tr class="bg-[var(--bg-muted)] text-[var(--text-primary)]">
                <th class="p-2 text-left font-black">Tanggal</th>
                <th class="p-2 text-center font-black">Baru</th>
                <th class="p-2 text-center font-black">Gabungan</th>
                <th class="p-2 text-center font-black">Jam pulang</th>
                <th class="p-2 text-center font-black">Sudah terisi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="t in perTanggal"
                :key="t.tanggal"
                class="border-t border-[var(--border-subtle)]"
              >
                <td class="p-2 font-bold text-[var(--text-primary)]">{{ fmtTgl(t.tanggal) }}</td>
                <td class="p-2 text-center font-black text-emerald-700">{{ t.baru }}</td>
                <td class="p-2 text-center">{{ t.gabungan }}</td>
                <td class="p-2 text-center">{{ t.pulang }}</td>
                <td class="p-2 text-center text-[var(--text-tertiary)]">{{ t.lewat }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <details v-if="takKenal.length" class="mt-3 text-[11px]">
          <summary class="cursor-pointer font-bold text-amber-700 dark:text-amber-300">
            {{ takKenal.length }} PIN tak dikenal — scannya dilewati
          </summary>
          <p class="mt-1 text-[var(--text-secondary)]">
            Isi PIN (ID Fingerprint) guru yang bersangkutan di data guru, lalu unggah berkasnya
            lagi.
          </p>
          <ul class="mt-1 space-y-0.5">
            <li v-for="t in takKenal" :key="t.pin" class="text-[var(--text-secondary)]">
              PIN <b class="font-mono">{{ t.pin }}</b
              ><template v-if="t.nama"> — {{ t.nama }}</template>
            </li>
          </ul>
        </details>

        <details v-if="tanpaAbsen.daftar.length" class="mt-2 text-[11px]">
          <summary class="cursor-pointer font-bold text-amber-700 dark:text-amber-300">
            {{ tanpaAbsen.daftar.length + tanpaAbsen.lebih }} guru punya scan tapi tak satu pun
            masuk window shift
          </summary>
          <ul class="mt-1 space-y-0.5">
            <li
              v-for="t in tanpaAbsen.daftar"
              :key="t.nama + t.tanggal"
              class="text-[var(--text-secondary)]"
            >
              <b>{{ t.nama }}</b> · {{ fmtTgl(t.tanggal) }} · scan {{ t.jam.join(', ') }} ·
              {{ t.sebab }}
            </li>
          </ul>
        </details>

        <details v-if="rencana.lewat.length" class="mt-2 text-[11px]">
          <summary class="cursor-pointer font-bold text-[var(--text-secondary)]">
            {{ rencana.lewat.length }} slot sudah terisi — dibiarkan apa adanya
          </summary>
          <ul class="mt-1 space-y-0.5">
            <li
              v-for="l in rencana.lewat.slice(0, 60)"
              :key="l.id"
              class="text-[var(--text-secondary)]"
            >
              <b>{{ l.nama }}</b> · {{ fmtTgl(l.tanggal) }} · {{ labelShift(l.shift) }} — tercatat
              <b>{{ l.status || 'hadir' }}</b> ({{ labelSumberAbsen(l.sumber) }}), scan mesin
              {{ l.jamScan }}
            </li>
          </ul>
        </details>

        <div class="mt-4 flex items-center gap-3 flex-wrap">
          <button
            type="button"
            :disabled="menulis || jumlahTulis === 0"
            class="h-9 px-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold"
            @click="tulis"
          >
            <i :class="['fas', menulis ? 'fa-spinner fa-spin' : 'fa-check']"></i>
            {{
              menulis
                ? `Menulis ${kemajuan.selesai}/${kemajuan.total}…`
                : jumlahTulis
                  ? `Tulis ${jumlahTulis} catatan`
                  : 'Tak ada yang perlu ditulis'
            }}
          </button>
          <span v-if="hasilTulis" class="text-[11px] font-bold text-emerald-700">
            <i class="fas fa-circle-check mr-1"></i>{{ hasilTulis.baru }} baru ·
            {{ hasilTulis.gabungan }} gabungan · {{ hasilTulis.pulang }} jam pulang<template
              v-if="hasilTulis.gagal"
            >
              · <span class="text-rose-700">{{ hasilTulis.gagal }} gagal</span></template
            >
          </span>
        </div>
        <ul v-if="hasilTulis?.galat?.length" class="mt-1 text-[10px] text-rose-700">
          <li v-for="(g, i) in hasilTulis.galat" :key="i">{{ g }}</li>
        </ul>
      </template>
    </template>
  </div>
</template>
