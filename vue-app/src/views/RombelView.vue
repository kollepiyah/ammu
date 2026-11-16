<script setup>
// Rombel (Kyai, 17 Nov 2026) — satu tempat untuk melihat kelas ngaji sebagai BARANG,
// menyusunnya dari data santri lama, dan mengganti gurunya sekali jalan.
//
// Alurnya sengaja: PRATINJAU dulu, baru tulis. Penyusunan ini menyentuh ratusan baris
// santri sekaligus; Kyai harus bisa melihat apa yang akan terjadi — termasuk yang
// TIDAK bisa ditebak — sebelum satu pun baris berubah.
import { ref, computed, onMounted } from 'vue'
import { useRombel } from '@/composables/useRombel'
import { guruAktifSaja } from '@/utils/guruScope'
import { labelRombel } from '@/utils/rombel'

const {
  rombelList,
  guruList,
  jumlahSantri,
  yatim,
  memuat,
  sibuk,
  muat,
  pratinjau,
  terapkan,
  gantiGuru,
  hapus
} = useRombel()

const hasil = ref(null) // { usul, ambigu } — null = belum pernah dipratinjau
const filterLembaga = ref('')
const edit = ref(null) // rombel yang sedang diubah gurunya
const formGuru = ref({ guru_pagi: '', guru_sore: '', nama: '' })

onMounted(muat)

const lembagaOptions = computed(() => {
  const set = new Set(rombelList.value.map((r) => String(r.lembaga || '')).filter(Boolean))
  return [...set].sort()
})

const tampil = computed(() => {
  const f = filterLembaga.value
  return rombelList.value
    .filter((r) => !f || String(r.lembaga || '') === f)
    .slice()
    .sort(
      (a, b) =>
        String(a.lembaga || '').localeCompare(String(b.lembaga || '')) ||
        labelRombel(a).localeCompare(labelRombel(b))
    )
})

// Guru calon pengampu — hanya yang aktif, dan dibatasi lembaga rombel yang sedang diubah.
const guruPilihan = computed(() => {
  const lem = String(edit.value?.lembaga || '').toLowerCase()
  return guruAktifSaja(guruList.value || [])
    .filter((g) => !lem || String(g.lembaga || '').toLowerCase() === lem)
    .map((g) => g.nama)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
})

function lihatPratinjau() {
  hasil.value = pratinjau()
}

async function terapkanUsul() {
  if (!hasil.value?.usul?.length) return
  await terapkan(hasil.value.usul)
  hasil.value = null
}

function mulaiEdit(r) {
  edit.value = r
  formGuru.value = {
    guru_pagi: r.guru_pagi || '',
    guru_sore: r.guru_sore || '',
    nama: r.nama || ''
  }
}

async function simpanEdit() {
  await gantiGuru(edit.value, formGuru.value)
  edit.value = null
}

async function hapusRombel(r) {
  const n = jumlahSantri.value.get(String(r.id)) || 0
  const pesan =
    n > 0
      ? `Hapus rombel "${labelRombel(r)}"? ${n} santri akan kehilangan penunjuk rombelnya (data santri tak dihapus).`
      : `Hapus rombel "${labelRombel(r)}"?`
  if (!window.confirm(pesan)) return
  await hapus(r)
}
</script>

<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h2 class="text-base font-black text-[var(--text-primary)] mb-1">
        <i class="fas fa-people-group text-teal-500 mr-2"></i>Rombel Ngaji
      </h2>
      <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
        Satu rombel = satu kelas ngaji, yaitu pasangan guru pagi &amp; guru sore. Santri yang hanya
        ikut satu shift tetap milik KEDUA gurunya selama ia ada di rombel yang sama.
      </p>

      <div class="flex flex-wrap items-center gap-2 mt-3">
        <button
          :disabled="memuat || sibuk"
          class="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-black"
          @click="lihatPratinjau"
        >
          <i class="fas fa-wand-magic-sparkles mr-1"></i>Susun dari data santri
        </button>
        <button
          :disabled="memuat || sibuk"
          class="px-3 py-2 rounded-xl bg-[var(--bg-muted)] hover:bg-[var(--bg-card-elevated)] text-[var(--text-secondary)] text-xs font-bold border border-[var(--border-subtle)]"
          @click="muat"
        >
          <i class="fas fa-rotate mr-1"></i>Muat ulang
        </button>
        <span v-if="memuat" class="text-xs text-[var(--text-tertiary)]">
          <i class="fas fa-spinner fa-spin mr-1"></i>memuat…
        </span>
        <span
          v-else-if="yatim.length"
          class="ml-auto text-[11px] font-bold text-amber-700 dark:text-amber-300"
        >
          <i class="fas fa-triangle-exclamation mr-1"></i>{{ yatim.length }} santri berguru belum
          punya rombel
        </span>
      </div>
    </div>

    <!-- PRATINJAU — belum ada satu baris pun yang berubah sampai tombol di bawah ditekan -->
    <div
      v-if="hasil"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border-2 border-teal-400 dark:border-teal-700 shadow-sm space-y-3"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)]">
        <i class="fas fa-eye text-teal-500 mr-2"></i>Pratinjau — belum ada yang disimpan
      </h3>

      <p v-if="!hasil.usul.length" class="text-xs text-[var(--text-secondary)] italic">
        Tak ada rombel yang bisa disusun dari data santri saat ini.
      </p>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="text-[var(--text-tertiary)] uppercase text-[10px] tracking-wider">
              <th class="text-left py-1.5 px-2">Lembaga</th>
              <th class="text-left py-1.5 px-2">Rombel</th>
              <th class="text-left py-1.5 px-2">Guru Pagi</th>
              <th class="text-left py-1.5 px-2">Guru Sore</th>
              <th class="text-right py-1.5 px-2">Santri</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in hasil.usul" :key="u.key" class="border-t border-[var(--border-subtle)]">
              <td class="py-1.5 px-2 text-[var(--text-secondary)]">{{ u.lembaga || '—' }}</td>
              <td class="py-1.5 px-2 font-bold text-[var(--text-primary)]">{{ u.nama }}</td>
              <td class="py-1.5 px-2">{{ u.guru_pagi || '—' }}</td>
              <td class="py-1.5 px-2">{{ u.guru_sore || '—' }}</td>
              <td class="py-1.5 px-2 text-right font-black">{{ u.santriIds.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Yang TIDAK bisa ditebak. Ini bagian terpenting: menebak di sini berarti
           memindahkan santri ke kelas yang salah tanpa seorang pun tahu. -->
      <div
        v-if="hasil.ambigu.length"
        class="rounded-xl p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-[11px] text-amber-900 dark:text-amber-200"
      >
        <p class="font-black mb-1">
          <i class="fas fa-circle-question mr-1"></i>{{ hasil.ambigu.length }} tak bisa ditebak —
          dibiarkan berdiri sendiri
        </p>
        <ul class="space-y-0.5">
          <li v-for="a in hasil.ambigu" :key="a.key">
            <b>{{ a.guru }}</b> (slot {{ a.slot }}, {{ a.lembaga || 'tanpa lembaga' }}) —
            {{ a.jumlahSantri }} santri; berpasangan dengan: {{ a.calon.join(' / ') }}. Tentukan
            sendiri rombelnya setelah ini.
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          :disabled="sibuk || !hasil.usul.length"
          class="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black"
          @click="terapkanUsul"
        >
          <i class="fas fa-check mr-1"></i
          >{{ sibuk ? 'menyimpan…' : `Simpan ${hasil.usul.length} rombel` }}
        </button>
        <button
          :disabled="sibuk"
          class="px-3 py-2 rounded-xl bg-[var(--bg-muted)] text-[var(--text-secondary)] text-xs font-bold border border-[var(--border-subtle)]"
          @click="hasil = null"
        >
          Batal
        </button>
      </div>
    </div>

    <!-- DAFTAR ROMBEL -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          Daftar Rombel
          <span class="text-[var(--text-tertiary)] font-bold">({{ tampil.length }})</span>
        </h3>
        <select
          v-if="lembagaOptions.length"
          v-model="filterLembaga"
          class="ml-auto px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
        >
          <option value="">Semua lembaga</option>
          <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
        </select>
      </div>

      <p v-if="!tampil.length" class="text-xs text-[var(--text-secondary)] italic py-4 text-center">
        Belum ada rombel. Tekan "Susun dari data santri" di atas untuk membuatnya dari data yang
        sudah ada.
      </p>

      <ul v-else class="space-y-2">
        <li
          v-for="r in tampil"
          :key="r.id"
          class="rounded-xl p-3 border border-[var(--border-subtle)] bg-[var(--bg-card-elevated)]"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-black text-sm text-[var(--text-primary)]">{{ labelRombel(r) }}</span>
            <span
              class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-muted)] text-[var(--text-secondary)]"
              >{{ r.lembaga || '—' }}</span
            >
            <span class="text-[11px] text-[var(--text-secondary)]">
              {{ jumlahSantri.get(String(r.id)) || 0 }} santri
            </span>
            <span class="ml-auto flex gap-2">
              <button
                :disabled="sibuk"
                class="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-[11px] font-black"
                @click="mulaiEdit(r)"
              >
                <i class="fas fa-user-pen mr-1"></i>Ganti guru
              </button>
              <button
                :disabled="sibuk"
                class="px-2.5 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-rose-50 text-rose-600 text-[11px] font-black border border-[var(--border-subtle)] disabled:opacity-50"
                @click="hapusRombel(r)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </span>
          </div>
          <p class="text-[11px] text-[var(--text-secondary)] mt-1">
            Pagi: <b>{{ r.guru_pagi || '—' }}</b> · Sore: <b>{{ r.guru_sore || '—' }}</b>
          </p>
        </li>
      </ul>
    </div>

    <!-- GANTI GURU SATU ROMBEL -->
    <div
      v-if="edit"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="edit = null"
    >
      <div class="bg-[var(--bg-card)] rounded-2xl p-5 w-full max-w-md shadow-xl space-y-3">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          Ganti guru — {{ labelRombel(edit) }}
        </h3>
        <p class="text-[11px] text-[var(--text-secondary)]">
          Guru seluruh santri di rombel ini ikut diganti sekaligus. Santri yang hanya ikut satu
          shift tetap satu shift — slot yang memang kosong tidak diisi paksa.
        </p>

        <div>
          <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
            >Nama rombel (boleh dikosongkan)</label
          >
          <input
            v-model="formGuru.nama"
            type="text"
            placeholder="otomatis dari nama gurunya"
            class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
              >Guru Pagi</label
            >
            <select
              v-model="formGuru.guru_pagi"
              class="w-full px-2 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
            >
              <option value="">— kosong —</option>
              <option v-for="g in guruPilihan" :key="'p' + g" :value="g">{{ g }}</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-tertiary)] mb-1"
              >Guru Sore</label
            >
            <select
              v-model="formGuru.guru_sore"
              class="w-full px-2 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer"
            >
              <option value="">— kosong —</option>
              <option v-for="g in guruPilihan" :key="'s' + g" :value="g">{{ g }}</option>
            </select>
          </div>
        </div>

        <div class="flex gap-2 pt-1">
          <button
            :disabled="sibuk"
            class="flex-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black"
            @click="simpanEdit"
          >
            {{ sibuk ? 'menyimpan…' : 'Simpan' }}
          </button>
          <button
            :disabled="sibuk"
            class="px-3 py-2 rounded-xl bg-[var(--bg-muted)] text-[var(--text-secondary)] text-xs font-bold border border-[var(--border-subtle)]"
            @click="edit = null"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
