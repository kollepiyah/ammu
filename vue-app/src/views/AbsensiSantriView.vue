<template>
  <!-- v.21.84.0527: Absensi Santri — input manual bulanan, 2 kategori (Ngaji/Sekolah), autofill rapor -->
  <!-- Ngaji: 2 sesi (Pagi=kolom tetap, Sore=*_sore di data jsonb). Sekolah: 1 sesi. Rapor=gabungan Pagi+Sore. -->
  <div class="p-3 md:p-5 space-y-4">
    <!-- LAYER 1: LANDING -->
    <div
      v-if="step === 'landing'"
      class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-emerald-100 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-start gap-3 mb-4">
        <i class="fas fa-clipboard-check text-emerald-600 text-2xl"></i>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">
            Absensi Santri
          </h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Input absensi bulanan santri. Pilih kategori.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          @click="pilihKategori('ngaji')"
          class="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-700 hover:from-emerald-600 hover:to-teal-800 rounded-2xl p-5 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <i class="fas fa-mosque text-2xl drop-shadow mb-2"></i>
          <h3 class="text-base md:text-lg font-black leading-tight drop-shadow-sm !text-white">
            Absen Ngaji
          </h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">
            TPQ Pagi/Sore · Pra PTPT · PTPT · PPPH
          </p>
        </button>
        <button
          @click="pilihKategori('sekolah')"
          class="group relative overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 rounded-2xl p-5 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <i class="fas fa-school text-2xl drop-shadow mb-2"></i>
          <h3 class="text-base md:text-lg font-black leading-tight drop-shadow-sm !text-white">
            Absen Sekolah
          </h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">SDI · SMP · SMA (PKBM)</p>
        </button>
      </div>
    </div>

    <!-- LAYER 2-NGAJI -->
    <div
      v-else-if="step === 'sub-ngaji'"
      class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-emerald-100 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center gap-3 mb-4">
        <button
          @click="backToLanding"
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer"
        >
          <i class="fas fa-arrow-left text-slate-600 dark:text-slate-300"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">
            <i class="fas fa-mosque text-emerald-600 mr-2"></i>Absen Ngaji
          </h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih lembaga untuk input absensi.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        <button
          @click="pilihLembaga('TPQ Pagi')"
          class="bg-gradient-to-br from-emerald-500 to-emerald-700 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-sun text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">
            TPQ Pagi
          </h3>
        </button>
        <button
          @click="pilihLembaga('TPQ Sore')"
          class="bg-gradient-to-br from-teal-500 to-teal-700 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-cloud-sun text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">
            TPQ Sore
          </h3>
        </button>
        <button
          @click="pilihLembaga('Pra PTPT')"
          class="bg-gradient-to-br from-teal-600 to-teal-800 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-book text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">
            Pra PTPT
          </h3>
        </button>
        <button
          @click="pilihLembaga('PTPT')"
          class="bg-gradient-to-br from-emerald-500 to-emerald-700 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-quran text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">
            PTPT
          </h3>
        </button>
        <button
          @click="pilihLembaga('PPPH')"
          class="bg-gradient-to-br from-cyan-600 to-cyan-800 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-scroll text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">
            PPPH
          </h3>
        </button>
      </div>
    </div>

    <!-- LAYER 2-SEKOLAH -->
    <div
      v-else-if="step === 'sub-sekolah'"
      class="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-cyan-100 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center gap-3 mb-4">
        <button
          @click="backToLanding"
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer"
        >
          <i class="fas fa-arrow-left text-slate-600 dark:text-slate-300"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">
            <i class="fas fa-school text-cyan-600 mr-2"></i>Absen Sekolah
          </h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih jenjang untuk input absensi.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        <button
          @click="pilihLembaga('SDI')"
          class="bg-gradient-to-br from-cyan-500 to-cyan-700 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-school text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SDI</h3>
          <p class="text-[11px] text-white/85 mt-0.5">Kelas I–VI</p>
        </button>
        <button
          @click="pilihLembaga('SMP')"
          class="bg-gradient-to-br from-cyan-600 to-cyan-800 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-school-flag text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SMP</h3>
          <p class="text-[11px] text-white/85 mt-0.5">PKBM · Kelas VII–IX</p>
        </button>
        <button
          @click="pilihLembaga('SMA')"
          class="bg-gradient-to-br from-teal-600 to-teal-800 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-graduation-cap text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SMA</h3>
          <p class="text-[11px] text-white/85 mt-0.5">PKBM · Kelas X–XII</p>
        </button>
      </div>
    </div>

    <!-- LAYER 3: INPUT BULANAN -->
    <template v-else-if="step === 'input'">
      <button
        v-if="showBackBtn"
        @click="backToSub"
        class="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer text-slate-700 dark:text-slate-200"
      >
        <i class="fas fa-arrow-left"></i>
        {{ isGuru ? 'Pilih Kategori Lain' : 'Pilih Lembaga Lain' }}
      </button>

      <!-- Header -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
          <i
            :class="[
              'fas mr-1',
              kategori === 'ngaji' ? 'fa-mosque text-emerald-600' : 'fa-school text-cyan-600'
            ]"
          ></i>
          <template v-if="isGuru"
            >Absensi {{ kategori === 'ngaji' ? 'Ngaji' : 'Sekolah' }} Saya</template
          >
          <template v-else
            >Absensi {{ kategori === 'ngaji' ? 'Ngaji' : 'Sekolah' }} —
            {{ selectedLembaga }}</template
          >
        </h1>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">
          Total: {{ filteredSantri.length }} santri · Periode:
          <b class="text-teal-700 dark:text-teal-300"
            >{{ BULAN[selectedMonth - 1] }} {{ selectedYear }}</b
          >
        </p>
      </div>

      <!-- Filters + Hari Efektif -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 gap-2"
        :class="isNgaji ? 'md:grid-cols-5' : 'md:grid-cols-4'"
      >
        <select
          v-model.number="selectedMonth"
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
        </select>
        <select
          v-model.number="selectedYear"
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option v-for="y in TAHUN_LIST" :key="y" :value="y">{{ y }}</option>
        </select>
        <div
          class="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border bg-white dark:bg-slate-900"
          :class="
            isNgaji
              ? 'border-amber-300 dark:border-amber-600'
              : 'border-slate-300 dark:border-slate-600'
          "
        >
          <span
            class="text-[11px] font-bold whitespace-nowrap"
            :class="isNgaji ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'"
          >
            <i v-if="isNgaji" class="fas fa-sun mr-0.5"></i
            >{{ isNgaji ? 'H. Efektif Pagi' : 'Hari Efektif' }}
          </span>
          <input
            v-model.number="hariEfektif"
            type="number"
            min="0"
            max="31"
            class="w-full text-center font-bold bg-transparent outline-none text-slate-800 dark:text-white"
          />
        </div>
        <div
          v-if="isNgaji"
          class="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-slate-900"
        >
          <span
            class="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 whitespace-nowrap"
          >
            <i class="fas fa-moon mr-0.5"></i>H. Efektif Sore
          </span>
          <input
            v-model.number="hariEfektifSore"
            type="number"
            min="0"
            max="31"
            class="w-full text-center font-bold bg-transparent outline-none text-slate-800 dark:text-white"
          />
        </div>
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama..."
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>

      <!-- Action bar -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-2"
      >
        <div class="text-[11px] text-slate-500 dark:text-slate-400">
          <i class="fas fa-info-circle mr-1 text-teal-500"></i>
          <template v-if="isNgaji"
            >Isi <b>S/I/A</b> tiap sesi <b class="text-amber-600 dark:text-amber-400">Pagi</b> &amp;
            <b class="text-indigo-600 dark:text-indigo-400">Sore</b>. Hadir auto = H. Efektif −
            (S+I+A) per sesi.</template
          >
          <template v-else
            >Isi <b>Sakit</b>/<b>Izin</b>/<b>Alfa</b>. Hadir auto = Hari Efektif −
            (S+I+A).</template
          >
        </div>
        <div class="flex gap-2">
          <button
            @click="simpanSemua"
            :disabled="saving"
            class="px-4 py-2 text-sm font-bold rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white inline-flex items-center gap-1.5 transition cursor-pointer"
          >
            <i :class="saving ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i
            >{{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <button
            @click="generateKeRapor"
            :disabled="generating"
            class="px-4 py-2 text-sm font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white inline-flex items-center gap-1.5 transition cursor-pointer"
          >
            <i :class="generating ? 'fas fa-spinner fa-spin' : 'fas fa-file-export'"></i
            >{{ generating ? 'Memproses...' : 'Generate ke Rapor' }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-700"
      >
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl"></i>
      </div>
      <div
        v-else-if="filteredSantri.length === 0"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 dark:border-slate-600 text-center"
      >
        <i class="fas fa-calendar-times text-slate-300 text-4xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">
          Tidak ada santri di lembaga {{ selectedLembaga }}.
        </p>
      </div>

      <!-- Tabel input -->
      <div
        v-else
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <!-- Baris grup sesi (khusus ngaji): Pagi | Sore -->
              <tr
                v-if="isNgaji"
                class="bg-slate-50 dark:bg-slate-900/40 text-[11px] uppercase tracking-wider"
              >
                <th class="px-4 py-2"></th>
                <th class="px-2 py-2"></th>
                <th
                  colspan="4"
                  class="text-center px-2 py-2 font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20"
                >
                  <i class="fas fa-sun mr-1"></i>Pagi
                </th>
                <th
                  colspan="4"
                  class="text-center px-2 py-2 font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 border-l border-l-slate-200 dark:border-l-slate-700"
                >
                  <i class="fas fa-moon mr-1"></i>Sore
                </th>
              </tr>
              <tr
                class="bg-slate-50 dark:bg-slate-900/40 text-[11px] uppercase tracking-wider text-slate-500"
              >
                <th class="text-left px-4 py-3 font-bold">Nama Santri</th>
                <th class="text-center px-2 py-3 font-bold">Kelas</th>
                <th class="text-center px-2 py-3 font-bold w-16">Sakit</th>
                <th class="text-center px-2 py-3 font-bold w-16">Izin</th>
                <th class="text-center px-2 py-3 font-bold w-16">Alfa</th>
                <th
                  class="text-center px-2 py-3 font-bold w-16 bg-emerald-50 dark:bg-emerald-900/20"
                >
                  Hadir
                </th>
                <template v-if="isNgaji">
                  <th
                    class="text-center px-2 py-3 font-bold w-16 border-l border-l-slate-200 dark:border-l-slate-700"
                  >
                    Sakit
                  </th>
                  <th class="text-center px-2 py-3 font-bold w-16">Izin</th>
                  <th class="text-center px-2 py-3 font-bold w-16">Alfa</th>
                  <th
                    class="text-center px-2 py-3 font-bold w-16 bg-emerald-50 dark:bg-emerald-900/20"
                  >
                    Hadir
                  </th>
                </template>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr
                v-for="s in filteredSantri"
                :key="s.id"
                class="hover:bg-teal-50 dark:hover:bg-teal-900/10 transition"
              >
                <td class="px-4 py-2 font-bold text-slate-800 dark:text-white">{{ s.nama }}</td>
                <td class="text-center px-2 py-2 text-slate-500">{{ kelasOf(s) || '-' }}</td>
                <td class="px-2 py-2">
                  <input
                    v-model.number="getRow(s.id).sakit"
                    type="number"
                    min="0"
                    class="w-full text-center bg-cyan-50 dark:bg-cyan-900/20 text-cyan-900 dark:text-cyan-200 rounded p-1 text-xs font-bold border border-cyan-200 dark:border-cyan-700 outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </td>
                <td class="px-2 py-2">
                  <input
                    v-model.number="getRow(s.id).izin"
                    type="number"
                    min="0"
                    class="w-full text-center bg-teal-50 dark:bg-teal-900/20 text-teal-900 dark:text-teal-200 rounded p-1 text-xs font-bold border border-teal-200 dark:border-teal-700 outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </td>
                <td class="px-2 py-2">
                  <input
                    v-model.number="getRow(s.id).alfa"
                    type="number"
                    min="0"
                    class="w-full text-center bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-200 rounded p-1 text-xs font-bold border border-rose-200 dark:border-rose-700 outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </td>
                <td
                  class="text-center px-2 py-2 font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20"
                >
                  {{ hadirOf(s.id) }}
                </td>
                <!-- Sesi Sore (khusus ngaji) -->
                <template v-if="isNgaji">
                  <td class="px-2 py-2 border-l border-l-slate-200 dark:border-l-slate-700">
                    <input
                      v-model.number="getRow(s.id).sakit_sore"
                      type="number"
                      min="0"
                      class="w-full text-center bg-cyan-50 dark:bg-cyan-900/20 text-cyan-900 dark:text-cyan-200 rounded p-1 text-xs font-bold border border-cyan-200 dark:border-cyan-700 outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </td>
                  <td class="px-2 py-2">
                    <input
                      v-model.number="getRow(s.id).izin_sore"
                      type="number"
                      min="0"
                      class="w-full text-center bg-teal-50 dark:bg-teal-900/20 text-teal-900 dark:text-teal-200 rounded p-1 text-xs font-bold border border-teal-200 dark:border-teal-700 outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </td>
                  <td class="px-2 py-2">
                    <input
                      v-model.number="getRow(s.id).alfa_sore"
                      type="number"
                      min="0"
                      class="w-full text-center bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-200 rounded p-1 text-xs font-bold border border-rose-200 dark:border-rose-700 outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </td>
                  <td
                    class="text-center px-2 py-2 font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20"
                  >
                    {{ hadirSoreOf(s.id) }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { subscribeColl, mergeOne, serverTimestamp } from '@/services/db'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'
import { isFullFilterRole, isKepalaLembaga } from '@/utils/roleScope'
import { lembagaScopeMatches } from '@/composables/useLembaga'
import { sortSantri } from '@/utils/santriSort'

const toast = useToast()
const auth = useAuthStore()

// Full filter (pilih lembaga) hanya admin/super_admin. admin_keuangan + guru/user = guru mode.
const isFullFilter = computed(() => isFullFilterRole(auth.sesiAktif))
const isGuruMode = computed(() => !isFullFilter.value)
// alias lama supaya template tetap jalan
const isGuru = isGuruMode
// v.86.0526: Kepala/PJ (role guru, bukan admin) discope ke lembaganya.
const kepalaScope = computed(() => {
  const s = auth.sesiAktif
  if (!s || s.role === 'admin' || s.id === 'admin') return null
  return isKepalaLembaga(s) ? s.lembaga || null : null
})
const guruName = computed(() =>
  String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '')
    .toLowerCase()
    .trim()
)

function _low(v) {
  return String(v || '')
    .toLowerCase()
    .trim()
}
// Guru ownership
function ownNgaji(s) {
  const gn = guruName.value
  if (!gn) return false
  return _low(s.guru_pagi) === gn || _low(s.guru_sore) === gn || _low(s.guru) === gn
}
function ownSekolah(s) {
  const gn = guruName.value
  if (!gn) return false
  const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah.map(_low) : []
  return arr.includes(gn)
}
// Inclusive lembaga matcher (handle TPQ split/single + PPPH/P3H legacy)
function matchNgajiLembaga(s, lmb) {
  const sl = _low(s.lembaga)
  const sh = _low(s.shift_qiraati || s.shift)
  const L = _low(lmb)
  if (L === 'tpq pagi') return sl === 'tpq pagi' || (sl === 'tpq' && (sh === 'pagi' || sh === ''))
  if (L === 'tpq sore') return sl === 'tpq sore' || (sl === 'tpq' && sh === 'sore')
  if (L === 'ppph') return sl === 'ppph' || sl === 'p3h'
  return sl === L
}
// Apakah guru punya santri ngaji / sekolah
const hasNgaji = computed(
  () => isGuru.value && santriRaw.value.some((s) => s.aktif !== false && ownNgaji(s))
)
const hasSekolah = computed(
  () => isGuru.value && santriRaw.value.some((s) => s.aktif !== false && ownSekolah(s))
)
const showBackBtn = computed(() => !isGuru.value || (hasNgaji.value && hasSekolah.value))

const BULAN = [
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
const _now = new Date()
const TAHUN_LIST = [2024, 2025, 2026, 2027, 2028]

// State machine
const step = ref('landing') // 'landing' | 'sub-ngaji' | 'sub-sekolah' | 'input'
const kategori = ref('') // 'ngaji' | 'sekolah'
const selectedLembaga = ref('')
const selectedYear = ref(_now.getFullYear())
const selectedMonth = ref(_now.getMonth() + 1)
const hariEfektif = ref(24) // sesi Pagi (dan sesi tunggal utk sekolah)
const hariEfektifSore = ref(24) // sesi Sore (khusus ngaji)
const search = ref('')

const santriRaw = ref([])
const absRaw = ref([]) // dokumen absensi periode terpilih
const loading = ref(true)
const saving = ref(false)
const generating = ref(false)

const COLL = computed(() =>
  kategori.value === 'ngaji' ? 'absensi_santri_ngaji_bulanan' : 'absensi_santri_sekolah_bulanan'
)
const periode = computed(
  () => `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
)
// Ngaji = 2 sesi (Pagi/Sore). Sekolah = 1 sesi. Dipakai template & simpan/generate.
const isNgaji = computed(() => kategori.value === 'ngaji')

function pilihKategori(k) {
  kategori.value = k
  // Guru langsung ke input (santri yang diampu, tanpa pilih lembaga). Admin pilih lembaga dulu.
  if (isGuru.value) {
    selectedLembaga.value = k === 'ngaji' ? 'Ngaji Saya' : 'Sekolah Saya'
    step.value = 'input'
  } else {
    step.value = k === 'ngaji' ? 'sub-ngaji' : 'sub-sekolah'
  }
}
function pilihLembaga(l) {
  selectedLembaga.value = l
  step.value = 'input'
}
function backToLanding() {
  step.value = 'landing'
  selectedLembaga.value = ''
}
function backToSub() {
  if (isGuru.value) {
    // guru kembali ke landing (kalau punya 2 kategori) — kalau cuma 1 tetap di input
    step.value = 'landing'
  } else {
    step.value = kategori.value === 'ngaji' ? 'sub-ngaji' : 'sub-sekolah'
  }
  selectedLembaga.value = ''
}

// Filter santri sesuai kategori + lembaga
function kelasOf(s) {
  return kategori.value === 'ngaji' ? s.kelas || '' : s.kelas_sekolah || s.kelas || ''
}
const ROMAWI_SMP = ['VII', 'VIII', 'IX']
const ROMAWI_SMA = ['X', 'XI', 'XII']

const filteredSantri = computed(() => {
  const lmb = selectedLembaga.value
  let list = santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    if (kategori.value === 'ngaji') {
      // Guru: santri ngaji yang diampu (tanpa filter lembaga). Admin: filter per lembaga.
      if (isGuru.value) return ownNgaji(s)
      return matchNgajiLembaga(s, lmb)
    } else {
      // sekolah
      if (isGuru.value) return ownSekolah(s)
      const ls = String(s.lembaga_sekolah || '')
      if (lmb === 'SDI') return ls === 'SDI'
      if (lmb === 'SMP')
        return (
          ls === 'PKBM' &&
          ROMAWI_SMP.includes(String(s.kelas_sekolah || s.kelas || '').toUpperCase())
        )
      if (lmb === 'SMA')
        return (
          ls === 'PKBM' &&
          ROMAWI_SMA.includes(String(s.kelas_sekolah || s.kelas || '').toUpperCase())
        )
      return false
    }
  })
  // v.86.0526: Kepala/PJ → hanya santri lembaganya (block lintas-lembaga)
  if (kepalaScope.value)
    list = list.filter(
      (s) =>
        lembagaScopeMatches(kepalaScope.value, s.lembaga) ||
        lembagaScopeMatches(kepalaScope.value, s.lembaga_sekolah)
    )
  if (search.value) {
    const kw = search.value.toLowerCase()
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  }
  // urut per lembaga lalu kelas lalu nama
  const lf = kategori.value === 'ngaji' ? 'lembaga' : 'lembaga_sekolah'
  const kf = kategori.value === 'ngaji' ? 'kelas' : 'kelas_sekolah'
  return sortSantri(list, { lembagaField: lf, kelasField: kf })
})

// Input rows state (santriId → {sakit, izin, alfa})
const rows = reactive({})
function getRow(id) {
  if (!rows[id])
    rows[id] = { sakit: 0, izin: 0, alfa: 0, sakit_sore: 0, izin_sore: 0, alfa_sore: 0 }
  return rows[id]
}
// Hadir sesi Pagi (dan sesi tunggal utk sekolah)
function hadirOf(id) {
  const r = getRow(id)
  const h =
    (Number(hariEfektif.value) || 0) -
    ((Number(r.sakit) || 0) + (Number(r.izin) || 0) + (Number(r.alfa) || 0))
  return Math.max(0, h)
}
// Hadir sesi Sore (khusus ngaji)
function hadirSoreOf(id) {
  const r = getRow(id)
  const h =
    (Number(hariEfektifSore.value) || 0) -
    ((Number(r.sakit_sore) || 0) + (Number(r.izin_sore) || 0) + (Number(r.alfa_sore) || 0))
  return Math.max(0, h)
}

// Load existing absensi untuk periode + isi rows.
// Hari Efektif tersimpan per baris tapi 1 nilai global/periode. Di-hydrate ke input HANYA
// saat pindah periode/kategori (bukan tiap echo realtime) supaya ketikan HE yang belum
// disimpan tak ketimpa. _heKey ditandai HANYA setelah berhasil hydrate (tahan race data async).
let _heKey = ''
function loadRows() {
  // reset
  for (const k in rows) delete rows[k]
  const pfx = periode.value
  const hydrateHE = _heKey !== `${kategori.value}::${pfx}`
  let heLoaded = false
  for (const a of absRaw.value) {
    if (String(a.periode) !== pfx) continue
    rows[String(a.santri_id)] = {
      sakit: Number(a.sakit) || 0,
      izin: Number(a.izin) || 0,
      alfa: Number(a.alpa) || 0,
      // sesi Sore (ngaji) — di data jsonb; absen utk sekolah → default 0
      sakit_sore: Number(a.sakit_sore) || 0,
      izin_sore: Number(a.izin_sore) || 0,
      alfa_sore: Number(a.alpa_sore) || 0
    }
    // Muat Hari Efektif dari baris tersimpan pertama (nilai global periode).
    if (hydrateHE && !heLoaded && a.hari_efektif != null && a.hari_efektif !== '') {
      hariEfektif.value = Number(a.hari_efektif) || 0
      if (isNgaji.value) hariEfektifSore.value = Number(a.hari_efektif_sore) || 0
      heLoaded = true
      _heKey = `${kategori.value}::${pfx}`
    }
  }
}
watch([periode, () => absRaw.value.length, step], loadRows)

async function simpanSemua() {
  if (saving.value) return
  saving.value = true
  try {
    let count = 0
    for (const s of filteredSantri.value) {
      const r = getRow(s.id)
      const sakit = Number(r.sakit) || 0
      const izin = Number(r.izin) || 0
      const alpa = Number(r.alfa) || 0
      const hadir = hadirOf(s.id)
      const docId = `${s.id}_${periode.value}`
      const payload = {
        id: docId,
        santri_id: String(s.id),
        santri_nama: s.nama || '',
        kategori: kategori.value,
        lembaga: kategori.value === 'ngaji' ? s.lembaga || '' : s.lembaga_sekolah || '',
        kelas: kelasOf(s),
        periode: periode.value,
        hari_efektif: Number(hariEfektif.value) || 0,
        sakit,
        izin,
        alpa,
        hadir,
        updated_at: serverTimestamp()
      }
      // Ngaji: sesi Pagi = kolom tetap di atas; sesi Sore = field *_sore (masuk data jsonb).
      if (isNgaji.value) {
        payload.hari_efektif_sore = Number(hariEfektifSore.value) || 0
        payload.sakit_sore = Number(r.sakit_sore) || 0
        payload.izin_sore = Number(r.izin_sore) || 0
        payload.alpa_sore = Number(r.alfa_sore) || 0
        payload.hadir_sore = hadirSoreOf(s.id)
      }
      await mergeOne(COLL.value, docId, payload)
      count++
    }
    toast.success(
      `Absensi ${count} santri tersimpan (${BULAN[selectedMonth.value - 1]} ${selectedYear.value})`
    )
  } catch (e) {
    toast.error('Gagal simpan: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function generateKeRapor() {
  if (generating.value) return
  generating.value = true
  try {
    const m = selectedMonth.value
    const y = selectedYear.value
    const semester = m >= 7 ? 'Ganjil' : 'Genap'
    const tahunAjaran = m >= 7 ? `${y}-${y + 1}` : `${y - 1}-${y}`
    const periodKey = `${tahunAjaran}_${semester}`.replace(/[^a-zA-Z0-9_]/g, '_')
    let count = 0
    for (const s of filteredSantri.value) {
      const r = getRow(s.id)
      // Ngaji: absensi rapor = gabungan sesi Pagi + Sore (keputusan "digabung"). Sekolah: sesi tunggal.
      const sakit = (Number(r.sakit) || 0) + (isNgaji.value ? Number(r.sakit_sore) || 0 : 0)
      const izin = (Number(r.izin) || 0) + (isNgaji.value ? Number(r.izin_sore) || 0 : 0)
      const alpa = (Number(r.alfa) || 0) + (isNgaji.value ? Number(r.alfa_sore) || 0 : 0)
      const hadir = hadirOf(s.id) + (isNgaji.value ? hadirSoreOf(s.id) : 0)
      const lembagaRapor = kategori.value === 'ngaji' ? s.lembaga || '' : s.lembaga_sekolah || ''
      const docId = `rapor_${s.id}_${lembagaRapor}_${periodKey}`
      // F6e: setDoc(merge:true) Firestore -> mergeOne (deep-merge Supabase via db.js).
      //   setDoc/doc/db tak pernah di-import di file ini -> dulu ReferenceError diam (gagal senyap).
      await mergeOne('rapor_semester', docId, {
        santri_id: String(s.id),
        santri_nama: s.nama || '',
        lembaga: lembagaRapor,
        tahunAjaran,
        semester,
        absensi: {
          sakit,
          izin,
          alpa,
          hadir,
          total: sakit + izin + alpa + hadir,
          _generatedFrom: COLL.value,
          _generatedAt: new Date().toISOString(),
          _periodGenerated: `${BULAN[m - 1]} ${y}`
        }
      })
      count++
    }
    toast.success(`Absensi ${count} santri ter-generate ke rapor (${semester} ${tahunAjaran})`)
  } catch (e) {
    toast.error('Gagal generate: ' + (e?.message || e))
  } finally {
    generating.value = false
  }
}

let unsubSantri = null
let unsubAbs = null
function resubAbs() {
  if (unsubAbs) {
    try {
      unsubAbs()
    } catch (e) {}
  }
  if (!kategori.value) return
  unsubAbs = subscribeColl(COLL.value, (docs) => {
    absRaw.value = docs || []
    loadRows()
  })
}
watch(kategori, resubAbs)

function initGuruFlow() {
  if (!isGuru.value) return
  const ng = hasNgaji.value
  const sk = hasSekolah.value
  if (ng && sk) {
    step.value = 'landing' // pilih ngaji/sekolah dulu
  } else if (ng) {
    kategori.value = 'ngaji'
    selectedLembaga.value = 'Ngaji Saya'
    step.value = 'input'
  } else if (sk) {
    kategori.value = 'sekolah'
    selectedLembaga.value = 'Sekolah Saya'
    step.value = 'input'
  }
}

onMounted(() => {
  unsubSantri = subscribeColl('santri', (docs) => {
    santriRaw.value = docs || []
    loading.value = false
    initGuruFlow()
  })
})
onUnmounted(() => {
  if (unsubSantri) {
    try {
      unsubSantri()
    } catch (e) {}
  }
  if (unsubAbs) {
    try {
      unsubAbs()
    } catch (e) {}
  }
})
</script>
