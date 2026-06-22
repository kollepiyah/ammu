<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Lock screen jika bukan admin -->
    <div
      v-if="!isFullAccess"
      class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses terbatas</p>
    </div>

    <template v-else>
      <!-- Header + statistik -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i class="fas fa-fingerprint text-teal-500 mr-2"></i>Rekap Absensi Guru
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">
              Bulan {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div
              class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs"
            >
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
              <span class="text-slate-500 ml-1">total</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-xs"
            >
              <span class="text-amber-700 dark:text-amber-300 font-bold">{{ stats.pagi }}</span>
              <span class="text-slate-500 ml-1">pagi</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 text-xs"
            >
              <span class="text-purple-700 dark:text-purple-300 font-bold">{{ stats.sore }}</span>
              <span class="text-slate-500 ml-1">sore</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-xs"
            >
              <span class="text-indigo-700 dark:text-indigo-300 font-bold">{{
                stats.guruActiveCount
              }}</span>
              <span class="text-slate-500 ml-1">guru</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter bar -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select
            v-model.number="selectedYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option v-for="y in tahunOptions" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="selectedMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select
            v-model="filterGuru"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua guru</option>
            <option v-for="g in guruAktif" :key="g.id" :value="g.id">{{ g.nama }}</option>
          </select>
          <select
            v-model="filterShift"
            class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua shift</option>
            <option value="pagi">Pagi saja</option>
            <option value="sore">Sore saja</option>
          </select>
        </div>
      </div>

      <!-- Tabs -->
      <div class="grid grid-cols-3 gap-2 md:gap-3">
        <button
          @click="tabMode = 'harian'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            tabMode === 'harian' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
          ]"
        >
          <i class="fas fa-calendar-check text-base md:text-lg drop-shadow"></i>
          <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">
            Input Harian
          </h3>
          <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">
            Absen hari ini per shift
          </p>
        </button>
        <button
          @click="tabMode = 'bulanan'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            tabMode === 'bulanan' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
          ]"
        >
          <i class="fas fa-calendar-alt text-base md:text-lg drop-shadow"></i>
          <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">
            Rekap Bulanan
          </h3>
          <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">
            Matrix per guru x tanggal
          </p>
        </button>
        <button
          @click="tabMode = 'impor'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            tabMode === 'impor' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
          ]"
        >
          <i class="fas fa-fingerprint text-base md:text-lg drop-shadow"></i>
          <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">
            Impor Fingerprint
          </h3>
          <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">
            Upload .xlsx/.csv device
          </p>
        </button>
      </div>

      <!-- TAB: Impor Fingerprint -->
      <div
        v-if="tabMode === 'impor'"
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white mb-3">
          <i class="fas fa-file-import text-blue-600 mr-2"></i>Impor Data Fingerprint Guru
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Upload file rekap fingerprint device (.xlsx atau .csv) untuk mengimpor data kehadiran guru
          per shift Pagi/Sore.
        </p>
        <div
          class="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 text-center"
        >
          <i class="fas fa-cloud-upload-alt text-4xl text-slate-400 dark:text-slate-500 mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
            Drag &amp; drop file di sini
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">atau klik untuk pilih file</p>
          <input
            ref="fileInputAbsen"
            type="file"
            accept=".xlsx,.csv"
            class="hidden"
            @change="handleImportFingerprint"
          />
          <button
            @click="$refs.fileInputAbsen.click()"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-folder-open mr-1"></i>Pilih File
          </button>
          <p
            v-if="lastImportFileName"
            class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-3 font-bold"
          >
            <i class="fas fa-check-circle mr-1"></i>{{ lastImportFileName }}
          </p>
        </div>
        <div
          class="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3"
        >
          <p class="text-[11px] text-amber-800 dark:text-amber-200">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            <strong>Format kolom:</strong>
            <code>tanggal</code> (YYYY-MM-DD atau DD-MM-YYYY), <code>jam</code> (HH:MM),
            <code>fingerprint_id</code> atau <code>nama</code> guru, <code>shift</code> (pagi/sore).
            Excel XLSX atau CSV diterima.
          </p>
        </div>
      </div>

      <!-- LOADING -->
      <div v-else-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat absensi...</p>
      </div>

      <!-- TAB: Bulanan / Rekap -->
      <div v-else-if="tabMode === 'bulanan' || tabMode === 'rekap'" class="space-y-3">
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center gap-2 justify-between"
        >
          <div class="flex flex-wrap items-center gap-2 text-[11px]">
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold"
              >&#9632; Tepat Waktu</span
            >
            <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold"
              >&#9632; Terlambat</span
            >
            <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold"
              >&#9632; Izin/Sakit</span
            >
            <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold"
              >&#9632; Alpha</span
            >
            <span class="px-2 py-0.5 rounded bg-pink-100 text-pink-800 font-bold"
              >&#9632; Libur</span
            >
          </div>
          <div class="flex gap-2">
            <button
              @click="showLiburModal = true"
              class="bg-pink-500 hover:bg-pink-600 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <i class="fas fa-calendar-plus"></i> Kelola Libur
            </button>
            <button
              @click="exportRekapExcel"
              class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <i class="fas fa-file-excel"></i> Excel
            </button>
            <button
              @click="exportRekapPdf"
              class="bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <i class="fas fa-file-pdf"></i> PDF
            </button>
          </div>
        </div>

        <div
          v-if="guruAktif.length === 0"
          class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
        >
          <i class="fas fa-calendar-times text-slate-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada guru aktif</p>
        </div>

        <div
          v-else
          class="bg-white dark:bg-slate-800 rounded-2xl p-2 md:p-3 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto"
        >
          <table class="w-full text-[10px] md:text-[11px] border-collapse">
            <thead>
              <tr
                class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 sticky top-0"
              >
                <th
                  class="p-1.5 text-left font-black uppercase tracking-wider sticky left-0 bg-slate-100 dark:bg-slate-700 z-10 min-w-[180px]"
                >
                  Nama Guru
                </th>
                <th
                  class="p-1.5 text-center font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-700 z-10 min-w-[70px]"
                >
                  FP ID
                </th>
                <th
                  v-for="d in daysInMonth"
                  :key="'h' + d"
                  :class="[
                    'p-1 text-center font-bold w-7 border-l border-slate-200 dark:border-slate-600',
                    { 'bg-pink-50 text-pink-700': isHariLibur(d) }
                  ]"
                >
                  {{ d }}
                </th>
                <th
                  class="p-1 text-center font-black text-emerald-700 bg-emerald-50 border-l border-slate-200"
                >
                  H
                </th>
                <th class="p-1 text-center font-black text-amber-700 bg-amber-50">T</th>
                <th class="p-1 text-center font-black text-blue-700 bg-blue-50">I/S</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="g in guruAktif"
                :key="'r' + g.id"
                class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30"
              >
                <td class="p-1.5 sticky left-0 bg-white dark:bg-slate-800 z-[1]">
                  <div
                    class="font-black text-slate-800 dark:text-white text-[11px] md:text-xs truncate"
                  >
                    {{ g.nama }}
                  </div>
                  <div class="text-[9px] text-slate-500 truncate">
                    {{ g.lembaga || g.unit || '-' }}
                  </div>
                </td>
                <td
                  class="p-1.5 text-center text-[10px] font-bold text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-700"
                >
                  {{ g.fingerprint_id || g.fp_id || g.id_fingerprint || '-' }}
                </td>
                <td
                  v-for="d in daysInMonth"
                  :key="g.id + '_' + d"
                  class="p-0.5 text-center border-l border-slate-200 dark:border-slate-700"
                >
                  <span
                    :class="[
                      cellClass(g.id, d),
                      'inline-block w-5 h-5 leading-5 rounded text-[9px] font-bold'
                    ]"
                    :title="cellTitle(g.id, d)"
                    >{{ cellText(g.id, d) }}</span
                  >
                </td>
                <td class="p-1 text-center font-black text-emerald-700 bg-emerald-50/50">
                  {{ countStatus(g.id, ['hadir']) }}
                </td>
                <td class="p-1 text-center font-black text-amber-700 bg-amber-50/50">
                  {{ countStatus(g.id, ['terlambat']) }}
                </td>
                <td class="p-1 text-center font-black text-blue-700 bg-blue-50/50">
                  {{ countStatus(g.id, ['izin', 'sakit']) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Kelola Hari Libur -->
      <div
        v-if="showLiburModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3"
        @click.self="showLiburModal = false"
      >
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl p-5 max-w-md w-full max-h-[80vh] overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-black text-slate-800 dark:text-white">
              <i class="fas fa-calendar-plus text-pink-500 mr-2"></i>
              Kelola Hari Libur &mdash; {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </h3>
            <button @click="showLiburModal = false" class="text-slate-400 hover:text-slate-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p class="text-xs text-slate-500 mb-3">
            Klik tanggal untuk toggle libur. Tersimpan di Pengaturan global.
          </p>
          <div class="grid grid-cols-7 gap-1.5">
            <button
              v-for="d in daysInMonth"
              :key="'l' + d"
              @click="toggleHariLibur(d)"
              :class="[
                'p-2 rounded-lg text-xs font-bold border',
                isHariLibur(d)
                  ? 'bg-pink-500 text-white border-pink-600'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-pink-50'
              ]"
            >
              {{ d }}
            </button>
          </div>
          <div class="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
            <button
              @click="showLiburModal = false"
              class="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Tutup
            </button>
            <button
              @click="saveHariLibur"
              :disabled="savingLibur"
              class="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white text-xs font-black px-3 py-1.5 rounded-lg"
            >
              <i :class="['fas', savingLibur ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
              {{ savingLibur ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>

      <!-- TAB: Input Harian -->
      <div
        v-if="tabMode === 'harian'"
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <h3 class="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">
          <i class="fas fa-calendar-check text-teal-600 mr-2"></i>
          Input Absensi Harian &mdash;
          {{
            new Date().toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })
          }}
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Centang guru yang hadir per shift (Pagi/Sore/Sekolah). Submit untuk simpan ke koleksi
          <code>absensi_shift_guru</code>.
        </p>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              <tr>
                <th
                  class="p-2 text-left font-black uppercase text-[10px] tracking-wider sticky left-0 bg-slate-100 dark:bg-slate-700"
                >
                  Nama Guru
                </th>
                <th
                  class="p-2 text-center font-black text-amber-700 dark:text-amber-300 uppercase text-[10px] tracking-wider"
                  colspan="2"
                >
                  Pagi
                </th>
                <th
                  class="p-2 text-center font-black text-indigo-700 dark:text-indigo-300 uppercase text-[10px] tracking-wider"
                  colspan="2"
                >
                  Sore
                </th>
                <th
                  class="p-2 text-center font-black text-teal-700 dark:text-teal-300 uppercase text-[10px] tracking-wider"
                  colspan="2"
                >
                  Sekolah
                </th>
              </tr>
              <tr class="bg-slate-50 dark:bg-slate-800">
                <th></th>
                <th class="p-1 text-[10px] font-bold">Hadir</th>
                <th class="p-1 text-[10px] font-bold">Jam</th>
                <th class="p-1 text-[10px] font-bold">Hadir</th>
                <th class="p-1 text-[10px] font-bold">Jam</th>
                <th class="p-1 text-[10px] font-bold">Hadir</th>
                <th class="p-1 text-[10px] font-bold">Jam</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="g in guruAktif"
                :key="g.id"
                class="border-b border-slate-100 dark:border-slate-700"
              >
                <td
                  class="p-2 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-800"
                >
                  {{ g.nama }}
                </td>
                <template v-for="shift in ['pagi', 'sore', 'sekolah']" :key="shift + g.id">
                  <td colspan="2" class="p-1">
                    <div class="flex items-center gap-1 justify-center">
                      <input
                        type="checkbox"
                        v-model="harianForm[g.id + '_' + shift + '_hadir']"
                        class="w-4 h-4 accent-teal-600 cursor-pointer"
                      />
                      <input
                        v-if="harianForm[g.id + '_' + shift + '_hadir']"
                        v-model="harianForm[g.id + '_' + shift + '_jam']"
                        type="time"
                        class="text-[10px] px-1 py-0.5 border border-slate-300 rounded bg-white"
                      />
                    </div>
                  </td>
                </template>
              </tr>
              <tr v-if="guruAktif.length === 0">
                <td colspan="7" class="text-center text-slate-400 italic py-6">
                  Tidak ada guru aktif
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700"
        >
          <p class="text-[11px] text-slate-500 italic">
            <i class="fas fa-info-circle mr-1"></i>
            Auto-status: jam &gt; batas terlambat (Pengaturan Web &rarr; Jam Shift) = "terlambat".
          </p>
          <button
            @click="saveHarian"
            :disabled="savingHarian || !hasAnyHadir"
            class="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5"
          >
            <i :class="['fas', savingHarian ? 'fa-spinner fa-spin' : 'fa-save']"></i>
            {{ savingHarian ? 'Menyimpan...' : 'Simpan Absensi Hari Ini' }}
          </button>
        </div>
      </div>

      <!-- TAB lain (list view) -->
      <div
        v-else-if="
          tabMode !== 'bulanan' &&
          tabMode !== 'rekap' &&
          tabMode !== 'impor' &&
          tabMode !== 'harian'
        "
        class="space-y-2"
      >
        <div
          v-if="filteredAbsensi.length === 0"
          class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
        >
          <i class="fas fa-calendar-times text-slate-300 text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada absensi</p>
        </div>
        <div
          v-for="a in filteredAbsensi"
          :key="a.id"
          class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              :class="[
                'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs',
                a.shift === 'pagi' ? 'bg-amber-500' : 'bg-purple-500'
              ]"
            >
              {{ a.shift === 'pagi' ? 'P' : 'S' }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
                {{ getNamaGuru(a.guru_id || a.guruId) }}
              </p>
              <p class="text-[11px] text-slate-500">
                {{ a.tanggal }} &middot; Shift {{ a.shift }}
                <span v-if="a.jam_masuk" class="ml-1">&middot; {{ a.jam_masuk }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>
        {{ filteredAbsensi.length }} absensi &middot; Vue 3 &middot; Phase 5.16
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { doc, writeBatch } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { setOne } from '@/services/firestore'
import { useAbsensi } from '@/composables/useAbsensi'
import { useExcel } from '@/composables/useExcel'
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { jsPDFFromCDN } from '@/services/pdf'

const {
  filteredAbsensi,
  guruRaw,
  loading,
  selectedYear,
  selectedMonth,
  filterGuru,
  filterShift,
  stats,
  isFullAccess,
  getNamaGuru,
  getBulanLabel,
  BULAN
} = useAbsensi()

const { importFile, exportSimple } = useExcel()
const settingsStore = useSettingsStore()
const toast = useToast()

const tabMode = ref('harian')
const lastImportFileName = ref('')
const importing = ref(false)
const importResult = ref({ ok: 0, error: 0, errors: [] })

// =====================================================
// IMPOR FINGERPRINT
// =====================================================
async function handleImportFingerprint(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  lastImportFileName.value = file.name
  importing.value = true
  importResult.value = { ok: 0, error: 0, errors: [] }
  try {
    const rows = await importFile(file)
    if (rows.length === 0) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    const batch = writeBatch(db)
    let ok = 0
    let errCount = 0
    const errors = []
    for (const r of rows) {
      try {
        const tgl = r.tanggal || r.Tanggal || r.tgl || r.Tgl || r.TANGGAL || ''
        const fpId = r.fingerprint_id || r.fingerprint || r.fp_id || r.FP || r.guru_id || r.id || ''
        const nama = r.nama || r.Nama || r.guru || r.Guru || ''
        const shift = String(r.shift || r.Shift || 'pagi')
          .toLowerCase()
          .trim()
        const jam = r.jam || r.Jam || r.JAM || ''
        if (!tgl || (!fpId && !nama)) {
          errCount++
          errors.push(`Row ${ok + errCount}: tanggal/guru kosong`)
          continue
        }
        let tanggal = String(tgl)
        const m = tanggal.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/)
        if (m) tanggal = `${m[3]}-${m[2]}-${m[1]}`
        let guru = null
        if (fpId) {
          guru = guruRaw.value.find(
            (g) => String(g.fingerprint_id || g.fp_id || '') === String(fpId)
          )
        }
        if (!guru && nama) {
          guru = guruRaw.value.find(
            (g) =>
              String(g.nama || '')
                .toLowerCase()
                .trim() === String(nama).toLowerCase().trim()
          )
        }
        if (!guru) {
          errCount++
          errors.push(`Row: guru ${fpId || nama} tidak ditemukan`)
          continue
        }
        const terlambatKey =
          shift === 'sore'
            ? 'shiftSoreTerlambat'
            : shift === 'sekolah'
              ? 'shiftSekolahTerlambat'
              : 'shiftPagiTerlambat'
        const mulaiKey =
          shift === 'sore'
            ? 'shiftSoreMulai'
            : shift === 'sekolah'
              ? 'shiftSekolahMulai'
              : 'shiftPagiMulai'
        const batas = String(
          settingsStore.settings?.[terlambatKey] || settingsStore.settings?.[mulaiKey] || ''
        ).trim()
        let status = 'hadir'
        if (jam && batas && jam > batas) status = 'terlambat'
        const docId = `shift_${guru.id}_${tanggal}_${shift}`
        batch.set(doc(db, 'absensi_shift_guru', docId), {
          id: docId,
          guru_id: guru.id,
          guru_nama: guru.nama,
          tanggal: tanggal,
          jam: jam || '',
          shift: shift,
          status: status,
          source: 'fingerprint_import',
          imported_at: new Date().toISOString()
        })
        ok++
      } catch (e) {
        errCount++
        errors.push(`Row error: ${e.message}`)
      }
    }
    if (ok > 0) await batch.commit()
    importResult.value = { ok, error: errCount, errors: errors.slice(0, 5) }
    if (ok > 0) {
      toast.success(`Impor selesai: ${ok} OK, ${errCount} error`)
    } else {
      toast.error(`Impor gagal: 0 OK, ${errCount} error. Cek format kolom.`)
    }
  } catch (e) {
    toast.error('Parse gagal: ' + (e.message || e))
  } finally {
    importing.value = false
    ev.target.value = ''
  }
}

// =====================================================
// FILTER & GURU AKTIF
// =====================================================
const tahunOptions = computed(() => {
  const t = new Date().getFullYear()
  return [t - 1, t, t + 1]
})

const guruAktif = computed(() =>
  guruRaw.value
    .filter(
      (g) =>
        String(g.status || 'Aktif')
          .toLowerCase()
          .trim() === 'aktif'
    )
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)

// =====================================================
// INPUT HARIAN
// =====================================================
const harianForm = ref({})
const savingHarian = ref(false)
const hasAnyHadir = computed(() => Object.keys(harianForm.value).some((k) => harianForm.value[k]))

async function saveHarian() {
  const today = new Date().toISOString().slice(0, 10)
  const batch = writeBatch(db)
  let count = 0
  for (const g of guruAktif.value) {
    for (const shift of ['pagi', 'sore', 'sekolah']) {
      if (!harianForm.value[g.id + '_' + shift + '_hadir']) continue
      const jam = String(harianForm.value[g.id + '_' + shift + '_jam'] || '').trim()
      const terlambatKey =
        shift === 'sore'
          ? 'shiftSoreTerlambat'
          : shift === 'sekolah'
            ? 'shiftSekolahTerlambat'
            : 'shiftPagiTerlambat'
      const mulaiKey =
        shift === 'sore'
          ? 'shiftSoreMulai'
          : shift === 'sekolah'
            ? 'shiftSekolahMulai'
            : 'shiftPagiMulai'
      const batas = String(
        settingsStore.settings?.[terlambatKey] || settingsStore.settings?.[mulaiKey] || ''
      ).trim()
      let status = 'hadir'
      if (jam && batas && jam > batas) status = 'terlambat'
      const docId = `shift_${g.id}_${today}_${shift}`
      batch.set(doc(db, 'absensi_shift_guru', docId), {
        id: docId,
        guru_id: g.id,
        guru_nama: g.nama,
        tanggal: today,
        jam: jam || '',
        shift: shift,
        status: status,
        source: 'manual_harian',
        imported_at: new Date().toISOString()
      })
      count++
    }
  }
  if (count === 0) {
    toast.warning('Tidak ada centang hadir — tidak ada yang disimpan')
    return
  }
  savingHarian.value = true
  try {
    await batch.commit()
    toast.success(`${count} absensi tersimpan untuk ${today}`)
    harianForm.value = {}
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingHarian.value = false
  }
}

// =====================================================
// HARI LIBUR
// =====================================================
const showLiburModal = ref(false)
const savingLibur = ref(false)
const hariLibur = ref([])

watch(
  () => settingsStore.settings?.hariLibur,
  (v) => {
    hariLibur.value = Array.isArray(v) ? [...v] : []
  },
  { immediate: true }
)

const daysInMonth = computed(() => {
  const y = selectedYear.value
  const m = selectedMonth.value
  return new Date(y, m, 0).getDate()
})

function isoDateOf(d) {
  const y = selectedYear.value
  const m = String(selectedMonth.value).padStart(2, '0')
  return `${y}-${m}-${String(d).padStart(2, '0')}`
}

function isHariLibur(d) {
  const iso = isoDateOf(d)
  const dow = new Date(selectedYear.value, selectedMonth.value - 1, d).getDay()
  if (dow === 5 && settingsStore.settings?.liburJumat !== false) return true
  return hariLibur.value.includes(iso)
}

function toggleHariLibur(d) {
  const iso = isoDateOf(d)
  const idx = hariLibur.value.indexOf(iso)
  if (idx >= 0) hariLibur.value.splice(idx, 1)
  else hariLibur.value.push(iso)
}

async function saveHariLibur() {
  savingLibur.value = true
  try {
    const merged = { ...settingsStore.settings, hariLibur: [...hariLibur.value] }
    await setOne('settings', 'general', merged, true)
    toast.success('Hari libur tersimpan')
    showLiburModal.value = false
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    savingLibur.value = false
  }
}

// =====================================================
// MATRIX REKAP BULANAN
// =====================================================
const absensiByGuruDay = computed(() => {
  const map = {}
  for (const a of filteredAbsensi.value) {
    const tgl = String(a.tanggal || '')
    const d = parseInt(tgl.slice(8, 10), 10)
    if (!d) continue
    const key = String(a.guru_id || a.guruId || '') + '_' + d
    if (!map[key]) {
      map[key] = a
    } else {
      // Pick highest-priority status (terlambat > hadir > izin/sakit)
      const prio = (s) => (s === 'terlambat' ? 3 : s === 'hadir' ? 2 : 1)
      if (prio(String(a.status || 'hadir')) > prio(String(map[key].status || 'hadir'))) {
        map[key] = a
      }
    }
  }
  return map
})

function getAbsensiCell(guruId, d) {
  return absensiByGuruDay.value[guruId + '_' + d] || null
}

function cellText(guruId, d) {
  if (isHariLibur(d)) return 'L'
  const a = getAbsensiCell(guruId, d)
  if (!a) return ''
  const s = String(a.status || 'hadir').toLowerCase()
  if (s === 'terlambat') return 'T'
  if (s === 'izin') return 'I'
  if (s === 'sakit') return 'S'
  return 'H'
}

function cellClass(guruId, d) {
  if (isHariLibur(d)) return 'bg-pink-200 text-pink-800'
  const a = getAbsensiCell(guruId, d)
  if (!a) {
    const today = new Date().toISOString().slice(0, 10)
    return isoDateOf(d) <= today ? 'bg-rose-100 text-rose-700' : 'bg-slate-50 text-slate-300'
  }
  const s = String(a.status || 'hadir').toLowerCase()
  if (s === 'terlambat') return 'bg-amber-200 text-amber-800'
  if (s === 'izin' || s === 'sakit') return 'bg-blue-200 text-blue-800'
  return 'bg-emerald-200 text-emerald-800'
}

function cellTitle(guruId, d) {
  const iso = isoDateOf(d)
  if (isHariLibur(d)) return iso + ' — Libur'
  const a = getAbsensiCell(guruId, d)
  if (!a) return iso + ' — (kosong)'
  return `${iso} — ${a.status || 'hadir'}${a.jam ? ' (' + a.jam + ')' : ''}${a.shift ? ' [' + a.shift + ']' : ''}`
}

function countStatus(guruId, statuses) {
  let n = 0
  for (let d = 1; d <= daysInMonth.value; d++) {
    if (isHariLibur(d)) continue
    const a = getAbsensiCell(guruId, d)
    if (a && statuses.includes(String(a.status || 'hadir').toLowerCase())) n++
  }
  return n
}

// =====================================================
// EXPORT EXCEL
// =====================================================
async function exportRekapExcel() {
  try {
    const days = daysInMonth.value
    const columns = [
      { key: 'nama', header: 'Nama Guru', width: 28 },
      { key: 'lembaga', header: 'Lembaga', width: 16 }
    ]
    for (let d = 1; d <= days; d++) {
      columns.push({ key: 'd' + d, header: String(d), width: 4 })
    }
    columns.push({ key: 'H', header: 'H', width: 5 })
    columns.push({ key: 'T', header: 'T', width: 5 })
    columns.push({ key: 'IS', header: 'I/S', width: 5 })

    const rows = guruAktif.value.map((g) => {
      const r = { nama: g.nama, lembaga: g.lembaga || g.unit || '-' }
      for (let d = 1; d <= days; d++) r['d' + d] = cellText(g.id, d)
      r.H = countStatus(g.id, ['hadir'])
      r.T = countStatus(g.id, ['terlambat'])
      r.IS = countStatus(g.id, ['izin', 'sakit'])
      return r
    })

    await exportSimple(rows, {
      filename: `Rekap_Absensi_Guru_${selectedYear.value}_${String(selectedMonth.value).padStart(2, '0')}.xlsx`,
      sheetName: 'Rekap',
      columns,
      title: `REKAP ABSENSI GURU — ${getBulanLabel(selectedMonth.value).toUpperCase()} ${selectedYear.value}`
    })
    toast.success('Excel berhasil di-ekspor')
  } catch (e) {
    toast.error('Gagal ekspor Excel: ' + (e.message || e))
  }
}

// =====================================================
// EXPORT PDF
// =====================================================
async function exportRekapPdf() {
  try {
    const jsPDF = await jsPDFFromCDN()
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    const days = daysInMonth.value
    const head = [
      [
        'Nama Guru',
        'Lembaga',
        ...Array.from({ length: days }, (_, i) => String(i + 1)),
        'H',
        'T',
        'I/S'
      ]
    ]
    const body = guruAktif.value.map((g) => {
      const row = [g.nama, g.lembaga || g.unit || '-']
      for (let d = 1; d <= days; d++) row.push(cellText(g.id, d))
      row.push(countStatus(g.id, ['hadir']))
      row.push(countStatus(g.id, ['terlambat']))
      row.push(countStatus(g.id, ['izin', 'sakit']))
      return row
    })
    doc.setFontSize(11)
    doc.text(
      `REKAP ABSENSI GURU — ${getBulanLabel(selectedMonth.value).toUpperCase()} ${selectedYear.value}`,
      40,
      28
    )
    doc.autoTable({
      head,
      body,
      startY: 40,
      styles: { fontSize: 6, cellPadding: 1.5, halign: 'center' },
      columnStyles: {
        0: { halign: 'left', cellPadding: { left: 6, top: 1.5, bottom: 1.5, right: 1.5 } },
        1: { halign: 'left' }
      },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' }
    })
    doc.save(
      `Rekap_Absensi_Guru_${selectedYear.value}_${String(selectedMonth.value).padStart(2, '0')}.pdf`
    )
    toast.success('PDF berhasil di-ekspor')
  } catch (e) {
    toast.error('Gagal ekspor PDF: ' + (e.message || e))
  }
}
</script>
