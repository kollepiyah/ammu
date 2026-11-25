<script setup>
// JurnalKartu — satu kartu isian Jurnal Pondok Laju untuk SATU sesi × SATU kelas.
//
// Kyai 17 Nov 2026: "kalau seumpama tidak perlu memilih dropdown gimana, jadi langsung isian
// kartu sendiri (Tadarus Pagi, Laju 1, Laju 2), kartunya muncul sesuai daftar jadwal."
// Sebelumnya tab Jurnal punya SATU isian dengan dua pemilih (sesi + kelas) di atasnya; guru yang
// membuka hari tanpa jadwal melihat "Anda tidak terjadwal piket" — benar, tapi terasa seperti
// kerusakan. Sekarang yang dipajang adalah jadwalnya itu sendiri: tak ada yang bisa dipilih
// salah, dan sesi yang bukan miliknya tak pernah tampil.
//
// Isiannya SATU untuk sekelas (metode Pondok Laju: santri membaca BERSAMA, jatah bacaan itu
// jatah kelas — lihat utils/pondokLajuSesi). Baris per santri tetap dibentuk di skrip sebab
// itulah bentuk yang disimpan ke `pondok_laju_capaian`, tapi tak dipajang.
//
// Langkah "Terapkan ke N santri" yang dulu terpisah DIHAPUS: satu isian untuk sekelas membuat
// langkah itu cuma tombol antara yang bisa terlupa. SIMPAN yang menerapkannya.
import { ref, reactive, computed, watch } from 'vue'
import { queryColl, mergeOne } from '@/services/db'
import { useToast } from '@/composables/useToast'
import { fmtTgl } from '@/utils/format'
import {
  SURAH,
  jumlahAyat,
  juzDariHalaman,
  validasiPosisi,
  teksPosisi,
  posisiSebelum,
  labelSesi,
  idCapaian
} from '@/utils/pondokLajuSesi'

const props = defineProps({
  tanggal: { type: String, required: true },
  sesi: { type: String, required: true },
  kelas: { type: Object, required: true },
  /** Nama guru piket terjadwal — dipajang untuk admin/PJ yang melihat jadwal orang lain. */
  piketNama: { type: String, default: '' },
  /** Yang MENCATAT (sesi login), bukan yang piket: itulah yang disimpan sebagai guru_id. */
  pencatat: { type: Object, required: true }
})
const emit = defineEmits(['tersimpan'])

const toast = useToast()
const memuat = ref(false)
const menyimpan = ref(false)
const baris = ref([])
const sudah = ref(0) // berapa santri sudah punya baris tersimpan di tanggal & sesi ini
const sebelumnya = ref(null) // { sesi, hariIni, tgl, posisi } — posisi akhir sesi sebelumnya
const kls = reactive({ juz: '', halaman: '', surah: '', ayat: '', catatan: '' })

const jumlahSantri = computed(() => props.kelas?.santri?.length || 0)
const terisi = computed(() => String(kls.juz).trim() !== '' || String(kls.halaman).trim() !== '')
const galat = computed(() => (terisi.value ? validasiPosisi(kls) : []))

async function muat() {
  const k = props.kelas
  baris.value = []
  sudah.value = 0
  sebelumnya.value = null
  if (!k?.santri?.length) return
  memuat.value = true
  try {
    const ids = k.santri.map((s) => String(s.id))
    // Terbaru dulu, dibatasi: cukup untuk menemukan posisi terakhir tiap santri sekelas.
    const rows = await queryColl(
      'pondok_laju_capaian',
      [
        ['santri_id', 'in', ids],
        ['tanggal', '<=', props.tanggal]
      ],
      [['tanggal', 'desc']],
      ids.length * 8
    )
    baris.value = k.santri.map((s) => ({ santri_id: String(s.id), nama: s.nama || '' }))
    const sid0 = baris.value[0]?.santri_id || ''
    const iniSemua = rows.filter(
      (r) =>
        r.tanggal === props.tanggal && r.sesi === props.sesi && ids.includes(String(r.santri_id))
    )
    sudah.value = new Set(iniSemua.map((r) => String(r.santri_id))).size
    // Sekelas membaca bersama, jadi satu santri cukup mewakili posisi kelasnya.
    const ini = iniSemua.find((r) => String(r.santri_id) === sid0) || iniSemua[0] || null
    const lalu = posisiSebelum(rows, sid0, props.tanggal, props.sesi)
    // Kyai 25 Nov 2026: kolom isian KOSONG sampai sesi ini disimpan — posisi sesi sebelumnya
    //   (guru lain) cukup dipajang besar sebagai patokan, bukan disalin ke kolom.
    const src = ini || {}
    kls.juz = String(src.juz ?? '')
    kls.halaman = String(src.halaman ?? '')
    kls.surah = src.surah ? String(src.surah) : ''
    kls.ayat = String(src.ayat ?? '')
    // Catatan TIDAK diwarisi dari hari lalu — ia catatan hari itu, bukan posisi bacaan.
    kls.catatan = ini?.catatan || ''
    sebelumnya.value = lalu
      ? {
          sesi: labelSesi(lalu.sesi),
          hariIni: lalu.tanggal === props.tanggal,
          tgl: fmtTgl(lalu.tanggal),
          posisi: teksPosisi(lalu)
        }
      : null
  } catch (e) {
    toast.error('Gagal memuat jurnal: ' + (e?.message || e))
  } finally {
    memuat.value = false
  }
}
watch(() => [props.tanggal, props.sesi, props.kelas?.key], muat, { immediate: true })

async function simpan() {
  if (menyimpan.value || galat.value.length) return
  if (!terisi.value) {
    toast.warning('Isi halaman atau juz dulu.')
    return
  }
  menyimpan.value = true
  let ok = 0
  try {
    for (const r of baris.value) {
      const id = idCapaian(props.tanggal, props.sesi, r.santri_id)
      await mergeOne('pondok_laju_capaian', id, {
        id,
        tanggal: props.tanggal,
        sesi: props.sesi,
        santri_id: r.santri_id,
        guru_id: String(props.pencatat?.id ?? ''),
        periode: props.tanggal.slice(0, 7),
        juz: Number(kls.juz),
        halaman: Number(kls.halaman),
        surah: kls.surah ? Number(kls.surah) : '',
        ayat: kls.ayat ? Number(kls.ayat) : '',
        catatan: String(kls.catatan || '').trim(),
        kelas_key: props.kelas.key,
        santri_nama: r.nama,
        guru_nama: String(props.pencatat?.nama ?? ''),
        dicatat_at: new Date().toISOString()
      })
      ok++
    }
    toast.success(`Jurnal ${labelSesi(props.sesi)} tersimpan untuk ${ok} santri.`)
    emit('tersimpan')
    await muat()
  } catch (e) {
    toast.error(`Gagal menyimpan (${ok} sudah tersimpan): ` + (e?.message || e))
  } finally {
    menyimpan.value = false
  }
}
</script>

<template>
  <div
    class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-3"
  >
    <!-- Kepala kartu: sesi + kelas. Inilah pengganti dua pemilih yang dulu. -->
    <div class="flex flex-wrap items-start justify-between gap-2">
      <div class="min-w-0">
        <p class="text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
          <i class="fas fa-book-open-reader mr-1"></i>{{ labelSesi(sesi) }}
        </p>
        <p class="text-sm font-bold text-[var(--text-primary)] truncate">
          {{ kelas.guru || '— tanpa guru —' }} · Juz {{ kelas.juz || '-' }}
          <span class="text-[var(--text-secondary)] font-medium">({{ jumlahSantri }} santri)</span>
        </p>
        <p v-if="piketNama" class="text-[11px] text-[var(--text-secondary)]">
          <i class="fas fa-user-check mr-1"></i>piket {{ piketNama }}
        </p>
      </div>
      <span
        v-if="sudah"
        class="shrink-0 px-2 py-1 rounded-lg text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
      >
        <i class="fas fa-circle-check mr-1"></i>sudah diisi {{ sudah }}/{{ jumlahSantri }}
      </span>
    </div>

    <div v-if="memuat" class="text-center text-sm text-[var(--text-secondary)] py-4">
      <i class="fas fa-spinner fa-spin mr-1"></i>Memuat jurnal…
    </div>

    <template v-else>
      <!-- Posisi akhir sesi sebelumnya (biasanya guru lain) — patokan untuk sesi ini, tulisan
           besar supaya terbaca sekilas (Kyai 25 Nov 2026). -->
      <div
        v-if="sebelumnya"
        class="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/25 px-3 py-2.5"
      >
        <p class="text-sm font-bold text-amber-800 dark:text-amber-200">
          <i class="fas fa-clock-rotate-left mr-1"></i>Terakhir {{ sebelumnya.sesi }}
          <span class="font-medium">{{ sebelumnya.hariIni ? '(hari ini)' : sebelumnya.tgl }}</span>
        </p>
        <p class="text-lg font-black text-[var(--text-primary)] leading-snug mt-0.5">
          {{ sebelumnya.posisi }}
        </p>
        <p class="text-sm text-amber-800 dark:text-amber-200 mt-0.5">
          Isi posisi terakhir bacaan {{ labelSesi(sesi) }} di bawah.
        </p>
      </div>
      <div
        v-else-if="!sudah"
        class="rounded-xl border border-[var(--border-default)] px-3 py-2 text-sm text-[var(--text-secondary)]"
      >
        <i class="fas fa-circle-info mr-1"></i>Belum ada catatan sesi sebelumnya.
      </div>

      <div
        class="rounded-xl border border-teal-300 dark:border-teal-700 bg-teal-50/60 dark:bg-teal-900/20 p-3 space-y-2"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <label class="block">
            <span class="block text-[10px] font-black uppercase text-teal-700 mb-1">Halaman</span>
            <input
              v-model="kls.halaman"
              type="text"
              inputmode="numeric"
              aria-label="Halaman sekelas"
              class="w-full text-center rounded-xl border-2 border-teal-300 p-2.5 text-base font-black bg-[var(--bg-card)] text-[var(--text-primary)]"
              @input="kls.juz = juzDariHalaman(Number(kls.halaman)) || kls.juz"
            />
          </label>
          <label class="block">
            <span class="block text-[10px] font-black uppercase text-teal-700 mb-1">Juz</span>
            <input
              v-model="kls.juz"
              type="text"
              inputmode="numeric"
              aria-label="Juz sekelas"
              class="w-full text-center rounded-xl border-2 border-teal-300 p-2.5 text-base font-black bg-[var(--bg-card)] text-[var(--text-primary)]"
            />
          </label>
          <label class="block col-span-2">
            <span class="block text-[10px] font-black uppercase text-teal-700 mb-1">Surah</span>
            <select
              v-model="kls.surah"
              aria-label="Surah sekelas"
              class="w-full rounded-xl border-2 border-teal-300 p-2.5 text-sm font-bold bg-[var(--bg-card)] text-[var(--text-primary)]"
            >
              <option value="">—</option>
              <option v-for="(s, i) in SURAH" :key="i" :value="String(i + 1)">
                {{ i + 1 }}. {{ s[0] }}
              </option>
            </select>
          </label>
          <label class="block">
            <span class="block text-[10px] font-black uppercase text-teal-700 mb-1">Ayat</span>
            <input
              v-model="kls.ayat"
              type="text"
              inputmode="numeric"
              :placeholder="kls.surah ? `1–${jumlahAyat(kls.surah)}` : ''"
              aria-label="Ayat sekelas"
              class="w-full text-center rounded-xl border-2 border-teal-300 p-2.5 text-base font-black bg-[var(--bg-card)] text-[var(--text-primary)]"
            />
          </label>
          <label class="block col-span-2 md:col-span-3">
            <span class="block text-[10px] font-black uppercase text-teal-700 mb-1"
              >Catatan (opsional)</span
            >
            <input
              v-model="kls.catatan"
              type="text"
              aria-label="Catatan sekelas"
              class="w-full rounded-xl border-2 border-teal-300 p-2.5 text-sm bg-[var(--bg-card)] text-[var(--text-primary)]"
            />
          </label>
        </div>
      </div>

      <p v-if="galat.length" class="text-[11px] font-bold text-rose-600">
        <i class="fas fa-triangle-exclamation mr-1"></i>{{ galat.join(' · ') }}
      </p>

      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-[11px] text-[var(--text-secondary)]">
          {{ fmtTgl(tanggal) }} · berlaku untuk {{ jumlahSantri }} santri sekelas
        </p>
        <button
          :disabled="menyimpan || !terisi || galat.length > 0"
          class="h-10 px-4 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black cursor-pointer"
          @click="simpan"
        >
          <i :class="['fas', menyimpan ? 'fa-spinner fa-spin' : 'fa-save']"></i>
          {{ menyimpan ? 'Menyimpan…' : 'SIMPAN' }}
        </button>
      </div>
    </template>
  </div>
</template>
