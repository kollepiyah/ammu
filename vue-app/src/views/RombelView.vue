<script setup>
// Rombel — MASTER DATA KELAS (Kyai, 17 Nov 2026).
//
// Alurnya persis yang Kyai minta: pilih Qiraati/Sekolah → pilih lembaga → Tambah Kelas →
// pilih guru → centang santrinya → Simpan. Kelas dibuat DULU, data santri mengikuti.
// Kelas Qiraati sengaja tanpa jenjang: yang menentukan kelas adalah gurunya.
//
// Layar ini menulis ke ratusan baris santri, jadi tiap tindakan yang melepas santri
// disebutkan jumlahnya lebih dulu.
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import { useRombel } from '@/composables/useRombel'
import { labelRombel } from '@/utils/rombel'
import { shiftNgajiOf } from '@/utils/kelasHitung'

const {
  kategori,
  lembaga,
  guruOptions,
  pjOptions,
  lembagaOptions,
  santriLembaga,
  kelasList,
  anggota,
  belumBerkelas,
  memuat,
  sibuk,
  muat,
  simpanKelas,
  hapusKelas,
  pratinjau,
  terapkan
} = useRombel()

onMounted(muat)

const form = ref(null) // null = tak ada yang sedang disunting
const cariSantri = ref('')
const hasil = ref(null) // pratinjau perapian sekali-jalan

const KATEGORI = [
  { v: 'ngaji', label: 'Qiraati', icon: 'fa-book-quran' },
  { v: 'sekolah', label: 'Sekolah', icon: 'fa-school' }
]

const LABEL_SHIFT = { pagi: 'Pagi', sore: 'Sore', pagi_sore: 'Pagi-Sore', '': '—' }

function gantiKategori(v) {
  kategori.value = v
  lembaga.value = lembagaOptions.value[0] || ''
  form.value = null
}

function kelasBaru() {
  form.value = {
    id: '',
    lembaga: lembaga.value,
    kategori: kategori.value,
    nama: '',
    guru_pagi: '',
    guru_sore: '',
    guru_sekolah: [],
    pj_ptpt: '',
    pondok_laju: false,
    santriIds: []
  }
  cariSantri.value = ''
}

function suntingKelas(r) {
  form.value = {
    id: String(r.id),
    lembaga: r.lembaga || lembaga.value,
    kategori: r.kategori || kategori.value,
    nama: r.nama || '',
    guru_pagi: r.guru_pagi || '',
    guru_sore: r.guru_sore || '',
    guru_sekolah: Array.isArray(r.guru_sekolah) ? [...r.guru_sekolah] : [],
    pj_ptpt: r.pj_ptpt || '',
    pondok_laju: r.pondok_laju === true,
    santriIds: anggota(r.id).map((s) => String(s.id))
  }
  cariSantri.value = ''
}

// Santri yang boleh dicentang: yang belum berkelas + yang sudah jadi anggota kelas ini.
// Santri milik kelas LAIN sengaja tak ditawarkan di sini — memindahkannya dilakukan dari
// kelas asalnya, supaya tak ada dua layar yang mengaku memilikinya.
const calonSantri = computed(() => {
  if (!form.value) return []
  const anggotaKini = new Set(form.value.santriIds)
  const bebas = new Set(belumBerkelas.value.map((s) => String(s.id)))
  const kw = cariSantri.value.trim().toLowerCase()
  return santriLembaga.value
    .filter((s) => anggotaKini.has(String(s.id)) || bebas.has(String(s.id)))
    .filter(
      (s) =>
        !kw ||
        String(s.nama || '')
          .toLowerCase()
          .includes(kw)
    )
})

function toggleSantri(id) {
  const sid = String(id)
  const i = form.value.santriIds.indexOf(sid)
  if (i >= 0) form.value.santriIds.splice(i, 1)
  else form.value.santriIds.push(sid)
}

function centangSemua() {
  form.value.santriIds = [
    ...new Set([...form.value.santriIds, ...calonSantri.value.map((s) => String(s.id))])
  ]
}

async function simpan() {
  if (await simpanKelas(form.value)) form.value = null
}

async function hapus(r) {
  const n = anggota(r.id).length
  const pesan = n
    ? `Hapus kelas "${labelRombel(r)}"? ${n} santri akan dilepas dari kelas dan gurunya dikosongkan (data santri tak dihapus).`
    : `Hapus kelas "${labelRombel(r)}"?`
  if (!window.confirm(pesan)) return
  await hapusKelas(r)
}

function lihatPratinjau() {
  hasil.value = pratinjau()
}
async function terapkanUsul() {
  await terapkan(hasil.value?.usul || [])
  hasil.value = null
}
</script>

<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- KEPALA + PILIHAN -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm space-y-3"
    >
      <div>
        <h2 class="text-base font-black text-[var(--text-primary)]">
          <i class="fas fa-people-group text-teal-500 mr-2"></i>Rombel — Master Data Kelas
        </h2>
        <p class="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
          Kelas dibuat di sini, santrinya dicentang, lalu data santri mengikuti. Kelas Qiraati tidak
          memakai jenjang — yang menentukan kelas adalah gurunya.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="k in KATEGORI"
          :key="k.v"
          :class="[
            'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
            kategori === k.v
              ? 'bg-teal-600 text-white border-teal-700'
              : 'bg-[var(--bg-card-elevated)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-teal-400'
          ]"
          @click="gantiKategori(k.v)"
        >
          <i :class="['fas', k.icon, 'mr-1']"></i>{{ k.label }}
        </button>

        <select
          v-model="lembaga"
          class="px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
        >
          <option value="">— pilih lembaga —</option>
          <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
        </select>

        <button
          :disabled="!lembaga || memuat || sibuk"
          class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black"
          @click="kelasBaru"
        >
          <i class="fas fa-plus mr-1"></i>Tambah Kelas
        </button>

        <button
          :disabled="memuat || sibuk"
          class="px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)] text-xs font-bold border border-[var(--border-subtle)]"
          @click="muat"
        >
          <i class="fas fa-rotate mr-1"></i>Muat ulang
        </button>

        <span v-if="memuat" class="text-xs text-[var(--text-tertiary)]">
          <i class="fas fa-spinner fa-spin mr-1"></i>memuat…
        </span>
      </div>

      <p v-if="lembaga" class="text-[11px] text-[var(--text-secondary)]">
        <b>{{ kelasList.length }}</b> kelas di {{ lembaga }}
        <template v-if="belumBerkelas.length">
          ·
          <span class="font-bold text-amber-700 dark:text-amber-300"
            >{{ belumBerkelas.length }} santri belum berkelas</span
          >
        </template>
      </p>
    </div>

    <!-- DAFTAR KELAS -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <p v-if="!lembaga" class="text-xs text-[var(--text-secondary)] italic py-4 text-center">
        Pilih lembaga dulu di atas.
      </p>
      <p
        v-else-if="!kelasList.length"
        class="text-xs text-[var(--text-secondary)] italic py-6 text-center"
      >
        Belum ada kelas di {{ lembaga }}. Tekan "Tambah Kelas" untuk membuatnya.
      </p>

      <ul v-else class="space-y-2">
        <li
          v-for="r in kelasList"
          :key="r.id"
          class="rounded-xl p-3 border border-[var(--border-subtle)] bg-[var(--bg-card-elevated)]"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-black text-sm text-[var(--text-primary)]">{{ labelRombel(r) }}</span>
            <span class="text-[11px] text-[var(--text-secondary)]"
              >{{ anggota(r.id).length }} santri</span
            >
            <span class="ml-auto flex gap-2">
              <button
                :disabled="sibuk"
                class="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-[11px] font-black"
                @click="suntingKelas(r)"
              >
                <i class="fas fa-user-pen mr-1"></i>Atur guru &amp; santri
              </button>
              <button
                :disabled="sibuk"
                class="px-2.5 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-rose-50 text-rose-600 text-[11px] font-black border border-[var(--border-subtle)] disabled:opacity-50"
                @click="hapus(r)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </span>
          </div>
          <p class="text-[11px] text-[var(--text-secondary)] mt-1">
            <template v-if="(r.kategori || 'ngaji') === 'ngaji'">
              Pagi: <b>{{ r.guru_pagi || '—' }}</b> · Sore: <b>{{ r.guru_sore || '—' }}</b>
            </template>
            <template v-else>
              Guru: <b>{{ (r.guru_sekolah || []).join(', ') || '—' }}</b>
            </template>
          </p>
        </li>
      </ul>
    </div>

    <!-- PERAPIAN SEKALI-JALAN -->
    <details
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <summary class="text-xs font-black text-[var(--text-secondary)] cursor-pointer">
        <i class="fas fa-wand-magic-sparkles mr-1 text-teal-500"></i>Susun kelas dari data santri
        lama (sekali jalan)
      </summary>
      <p class="text-[11px] text-[var(--text-secondary)] mt-2">
        Untuk pertama kali saja, supaya tak mencentang ratusan santri dari nol. Kelas disusun dari
        pasangan guru yang sudah tertulis di tiap santri. Yang tak bisa ditebak dibiarkan dan
        dilaporkan.
      </p>
      <button
        :disabled="memuat || sibuk"
        class="mt-2 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-black"
        @click="lihatPratinjau"
      >
        Lihat pratinjau
      </button>

      <div v-if="hasil" class="mt-3 space-y-2">
        <p v-if="!hasil.usul.length" class="text-xs italic text-[var(--text-secondary)]">
          Tak ada kelas yang bisa disusun dari data santri saat ini.
        </p>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="text-[var(--text-tertiary)] uppercase text-[10px] tracking-wider">
                <th class="text-left py-1 px-2">Lembaga</th>
                <th class="text-left py-1 px-2">Kelas</th>
                <th class="text-right py-1 px-2">Santri</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="u in hasil.usul"
                :key="u.key"
                class="border-t border-[var(--border-subtle)]"
              >
                <td class="py-1 px-2 text-[var(--text-secondary)]">{{ u.lembaga || '—' }}</td>
                <td class="py-1 px-2 font-bold">{{ u.nama }}</td>
                <td class="py-1 px-2 text-right font-black">{{ u.santriIds.length }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="hasil.ambigu.length"
          class="rounded-xl p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-[11px] text-amber-900 dark:text-amber-200"
        >
          <p class="font-black mb-1">
            {{ hasil.ambigu.length }} tak bisa ditebak — buat kelasnya sendiri setelah ini
          </p>
          <ul>
            <li v-for="a in hasil.ambigu" :key="a.key">
              <b>{{ a.guru }}</b> (slot {{ a.slot }}, {{ a.lembaga || 'tanpa lembaga' }}) —
              {{ a.jumlahSantri }} santri; berpasangan dengan: {{ a.calon.join(' / ') }}
            </li>
          </ul>
        </div>
        <button
          :disabled="sibuk || !hasil.usul.length"
          class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black"
          @click="terapkanUsul"
        >
          {{ sibuk ? 'menyimpan…' : `Simpan ${hasil.usul.length} kelas` }}
        </button>
      </div>
    </details>

    <!-- FORM KELAS -->
    <div
      v-if="form"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="form = null"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-5 w-full max-w-2xl shadow-xl space-y-3 max-h-[90vh] overflow-y-auto"
      >
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          {{ form.id ? 'Atur kelas' : 'Kelas baru' }} — {{ form.lembaga }}
        </h3>

        <div v-if="form.kategori === 'ngaji'" class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
              >Guru Pagi</label
            >
            <select
              v-model="form.guru_pagi"
              class="w-full px-2 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
            >
              <option value="">— kosong —</option>
              <option v-for="g in guruOptions" :key="'p' + g" :value="g">{{ g }}</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
              >Guru Sore</label
            >
            <select
              v-model="form.guru_sore"
              class="w-full px-2 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
            >
              <option value="">— kosong —</option>
              <option v-for="g in guruOptions" :key="'s' + g" :value="g">{{ g }}</option>
            </select>
          </div>
        </div>

        <div v-else>
          <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
            >Guru Kelas (boleh lebih dari satu)</label
          >
          <select
            v-model="form.guru_sekolah"
            multiple
            size="5"
            class="w-full px-2 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)]"
          >
            <option v-for="g in guruOptions" :key="'k' + g" :value="g">{{ g }}</option>
          </select>
        </div>

        <!-- Kyai 17 Nov 2026: PJ & penanda Pondok Laju disetel SEKELAS, bukan per anak —
             sifatnya memang sekelas, dan mengisinya satu-satu itu sumber data nyasar.
             Nilainya diturunkan ke kolom santri saat disimpan. -->
        <div v-if="form.kategori === 'ngaji'" class="grid grid-cols-2 gap-2 items-end">
          <div v-if="form.lembaga === 'PTPT'">
            <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
              >PJ PTPT kelas ini</label
            >
            <select
              v-model="form.pj_ptpt"
              class="w-full px-2 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
            >
              <option value="">— belum ditentukan —</option>
              <option v-for="g in pjOptions" :key="'pj' + g" :value="g">{{ g }}</option>
            </select>
          </div>
          <label
            class="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
          >
            <input v-model="form.pondok_laju" type="checkbox" class="accent-teal-600" />
            <span class="text-xs font-bold text-[var(--text-primary)]">Kelas Pondok Laju</span>
          </label>
        </div>

        <div>
          <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
            >Nama kelas (boleh dikosongkan)</label
          >
          <input
            v-model="form.nama"
            type="text"
            placeholder="otomatis dari nama gurunya"
            class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <label class="text-[10px] font-black uppercase text-[var(--text-tertiary)]"
              >Santri ({{ form.santriIds.length }} tercentang)</label
            >
            <input
              v-model="cariSantri"
              type="text"
              placeholder="cari nama…"
              class="ml-auto px-2 py-1 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none"
            />
            <button
              class="px-2 py-1 text-[11px] font-bold rounded-lg bg-[var(--bg-muted)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
              @click="centangSemua"
            >
              Centang semua
            </button>
          </div>
          <p class="text-[10px] text-[var(--text-tertiary)] mb-1.5">
            Yang tampil: santri yang belum berkelas, ditambah anggota kelas ini. Santri milik kelas
            lain dipindahkan dari kelas asalnya.
          </p>
          <div
            class="max-h-64 overflow-y-auto rounded-xl border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]"
          >
            <p
              v-if="!calonSantri.length"
              class="text-xs italic text-[var(--text-secondary)] p-3 text-center"
            >
              Tak ada santri yang bisa dicentang.
            </p>
            <label
              v-for="s in calonSantri"
              :key="s.id"
              class="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[var(--bg-muted)]"
            >
              <input
                type="checkbox"
                :checked="form.santriIds.includes(String(s.id))"
                class="accent-teal-600"
                @change="toggleSantri(s.id)"
              />
              <span class="text-xs font-bold text-[var(--text-primary)]">{{ s.nama }}</span>
              <span
                v-if="form.kategori === 'ngaji'"
                class="ml-auto text-[10px] text-[var(--text-tertiary)]"
                >{{ LABEL_SHIFT[shiftNgajiOf(s)] || '—' }}</span
              >
            </label>
          </div>
        </div>

        <div class="flex gap-2 pt-1">
          <button
            :disabled="sibuk"
            class="flex-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black"
            @click="simpan"
          >
            {{ sibuk ? 'menyimpan…' : 'Simpan' }}
          </button>
          <button
            :disabled="sibuk"
            class="px-3 py-2 rounded-xl bg-[var(--bg-muted)] text-[var(--text-secondary)] text-xs font-bold border border-[var(--border-subtle)]"
            @click="form = null"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
