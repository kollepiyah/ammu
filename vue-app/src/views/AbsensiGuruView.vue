<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Lock screen jika bukan admin -->
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
        Akses terbatas
      </p>
    </div>

    <template v-else>
      <!-- Header + statistik -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-base md:text-lg font-black text-[var(--text-primary)]">
              <i class="fas fa-fingerprint text-teal-500 mr-2"></i>Rekap Absensi Guru
            </h1>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">
              Bulan {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div
              class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs"
            >
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
              <span class="text-[var(--text-secondary)] ml-1">total</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700 text-xs"
            >
              <span class="text-cyan-700 dark:text-cyan-300 font-bold">{{ stats.pagi }}</span>
              <span class="text-[var(--text-secondary)] ml-1">pagi</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs"
            >
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.sore }}</span>
              <span class="text-[var(--text-secondary)] ml-1">sore</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700 text-xs"
            >
              <span class="text-cyan-700 dark:text-cyan-300 font-bold">{{
                stats.guruActiveCount
              }}</span>
              <span class="text-[var(--text-secondary)] ml-1">guru</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter bar -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <select
            v-model.number="selectedYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option v-for="y in tahunOptions" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="selectedMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select
            v-model="filterGuru"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua guru</option>
            <option v-for="g in guruAktif" :key="g.id" :value="g.id">{{ g.nama }}</option>
          </select>
          <select
            v-model="filterShift"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua shift</option>
            <option value="pagi">Pagi saja</option>
            <option value="sore">Sore saja</option>
            <option value="sekolah">Sekolah saja</option>
            <option value="pegawai_pagi">Pegawai Pagi</option>
            <option value="pegawai_sore">Pegawai Sore</option>
          </select>
          <select
            v-model="filterStatus"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua status</option>
            <option value="hadir">Hadir</option>
            <option value="terlambat">Terlambat</option>
            <option value="izin">Izin</option>
            <option value="sakit">Sakit</option>
          </select>
        </div>
      </div>

      <!-- Tabs -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <button
          @click="tabMode = 'harian'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            tabMode === 'harian' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-cyan-50' : ''
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
            'group relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            tabMode === 'bulanan' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-cyan-50' : ''
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
            'group relative overflow-hidden bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            tabMode === 'impor' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-cyan-50' : ''
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
        <button
          @click="tabMode = 'riwayat'"
          :class="[
            'group relative overflow-hidden bg-gradient-to-br from-indigo-500 dark:from-indigo-700 to-indigo-700 dark:to-indigo-900 rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer',
            tabMode === 'riwayat' ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-cyan-50' : ''
          ]"
        >
          <i class="fas fa-history text-base md:text-lg drop-shadow"></i>
          <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">Riwayat</h3>
          <p class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">
            Daftar absen per scan
          </p>
        </button>
      </div>

      <!-- TAB: Impor Fingerprint -->
      <div
        v-if="tabMode === 'impor'"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-3">
          <i class="fas fa-file-import text-cyan-600 mr-2"></i>Impor Data Fingerprint Guru
        </h3>
        <p class="text-xs text-[var(--text-secondary)] mb-4">
          Upload file rekap fingerprint device (.xlsx atau .csv) untuk mengimpor data kehadiran guru
          per shift Pagi/Sore.
        </p>
        <div
          class="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border-2 border-dashed border-[var(--border-default)] text-center"
        >
          <i class="fas fa-cloud-upload-alt text-4xl text-[var(--text-tertiary)] mb-3"></i>
          <p class="text-sm font-bold text-[var(--text-primary)] mb-1">
            Drag &amp; drop file di sini
          </p>
          <p class="text-xs text-[var(--text-secondary)] mb-3">atau klik untuk pilih file</p>
          <input
            ref="fileInputAbsen"
            type="file"
            accept=".xlsx,.csv"
            class="hidden"
            @change="handleImportFingerprint"
          />
          <button
            @click="$refs.fileInputAbsen.click()"
            class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
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
          class="mt-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-xl p-3"
        >
          <p class="text-[11px] text-cyan-800 dark:text-cyan-200">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            <strong>Format kolom:</strong>
            <code>tanggal</code> (YYYY-MM-DD atau DD-MM-YYYY), <code>jam</code> (HH:MM),
            <code>fingerprint_id</code> atau <code>nama</code> guru, <code>shift</code> (pagi/sore).
            Excel XLSX atau CSV diterima.
          </p>
        </div>

        <!-- v.110: SET PIN / FINGERPRINT ID MASSAL dari file master mesin -->
        <div class="mt-6 pt-5 border-t border-[var(--border-subtle)]">
          <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-1">
            <i class="fas fa-id-badge text-indigo-600 mr-2"></i>Set PIN (Fingerprint ID) Massal
          </h3>
          <p class="text-xs text-[var(--text-secondary)] mb-3">
            Upload file <strong>master karyawan</strong> dari mesin (kolom <code>Nama</code> +
            <code>ID Karyawan</code>) untuk mengisi <code>id_fingerprint</code> tiap guru otomatis
            (cocok by nama). Pratinjau dulu — tak ada yang ditulis sebelum Anda konfirmasi.
          </p>
          <div class="flex items-center gap-2 flex-wrap">
            <input
              ref="fileInputPin"
              type="file"
              accept=".xlsx,.csv"
              class="hidden"
              @change="handlePinFile"
            />
            <button
              @click="$refs.fileInputPin.click()"
              class="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
            >
              <i class="fas fa-folder-open"></i>Pilih File Karyawan
            </button>
            <span v-if="pinFileName" class="text-[11px] text-[var(--text-secondary)] font-bold">
              <i class="fas fa-file-excel mr-1"></i>{{ pinFileName }}
            </span>
          </div>

          <div v-if="pinRows.length" class="mt-4">
            <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
              <p class="text-[11px] text-[var(--text-secondary)]">
                <span class="font-black text-emerald-600">{{ pinToApply.length }}</span> akan di-set
                · <span class="font-bold">{{ pinRows.length }}</span> baris terbaca
              </p>
              <button
                @click="applyPinMapping"
                :disabled="pinApplying || pinToApply.length === 0"
                class="h-9 px-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold"
              >
                <i :class="['fas', pinApplying ? 'fa-spinner fa-spin' : 'fa-check']"></i>
                {{ pinApplying ? 'Menyimpan...' : `Terapkan (${pinToApply.length})` }}
              </button>
            </div>
            <div class="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
              <table class="w-full text-[11px] border-collapse">
                <thead>
                  <tr class="bg-[var(--bg-muted)] text-[var(--text-primary)]">
                    <th class="p-2 text-left font-black">Nama (file)</th>
                    <th class="p-2 text-center font-black">PIN</th>
                    <th class="p-2 text-left font-black">Guru (app)</th>
                    <th class="p-2 text-center font-black">Status</th>
                    <th class="p-2 text-left font-black">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(r, i) in pinRows"
                    :key="'pin' + i"
                    class="border-t border-[var(--border-subtle)]"
                  >
                    <td class="p-2 text-[var(--text-primary)]">{{ r.namaFile || '-' }}</td>
                    <td class="p-2 text-center font-mono font-bold">{{ r.pin || '-' }}</td>
                    <td class="p-2 text-[var(--text-secondary)]">{{ r.guru?.nama || '—' }}</td>
                    <td class="p-2 text-center">
                      <span
                        :class="[
                          'inline-block px-2 py-0.5 rounded-full text-[10px] font-black',
                          r.status === 'set'
                            ? 'bg-emerald-100 text-emerald-700'
                            : r.status === 'sama'
                              ? 'bg-slate-100 text-slate-600'
                              : r.status === 'konflik'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-rose-100 text-rose-700'
                        ]"
                      >
                        {{ r.status }}
                      </span>
                    </td>
                    <td class="p-2 text-[var(--text-tertiary)] text-[10px]">{{ r.note }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- LOADING -->
      <div v-else-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
        <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat absensi...</p>
      </div>

      <!-- TAB: Bulanan / Rekap -->
      <div v-else-if="tabMode === 'bulanan' || tabMode === 'rekap'" class="space-y-3">
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm flex flex-wrap items-center gap-2 justify-between"
        >
          <div class="flex flex-wrap items-center gap-2 text-[11px]">
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold"
              >&#9632; Tepat Waktu</span
            >
            <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold"
              >&#9632; Terlambat</span
            >
            <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold"
              >&#9632; Izin/Sakit</span
            >
            <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold"
              >&#9632; Alpha</span
            >
            <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold"
              >&#9632; Libur</span
            >
          </div>
          <!-- v.103b: mobile = toolbar 1-baris scroll-samping; desktop wrap normal -->
          <div
            class="flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto md:overflow-visible hide-scrollbar [&>*]:shrink-0 md:[&>*]:shrink -mx-1 px-1 lg:mx-0 lg:px-0"
          >
            <!-- v.21.114.0528: Kelola libur pindah ke Kalender Kegiatan (kyai req) — tombol link sekedarnya -->
            <!-- v.103b: samakan ke pola tombol standar (h-11 md:h-9 rounded-xl), warna rose dipertahankan -->
            <router-link
              to="/kalender"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black transition"
              title="Atur libur (manual & nasional) di menu Kalender Kegiatan"
            >
              <i class="fas fa-calendar-plus"></i> Atur Libur di Kalender
            </router-link>
            <!-- v.21.115.0528: standardize per design-tokens — h-9 px-3 rounded-xl -->
            <button
              @click="exportRekapExcel"
              aria-label="Ekspor rekap absensi guru Excel"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
            >
              <i class="fas fa-file-excel"></i>Excel
            </button>
            <button
              v-if="gsheetConfigured()"
              @click="kirimAbsensiGsheet"
              :disabled="sendingGsheet"
              aria-label="Kirim rekap absensi guru ke Google Sheet"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
            >
              <i :class="['fas', sendingGsheet ? 'fa-spinner fa-spin' : 'fa-table']"></i
              >{{ sendingGsheet ? 'Mengirim...' : 'Google Sheet' }}
            </button>
            <button
              @click="exportRekapPdf"
              aria-label="Cetak rekap absensi guru PDF"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer"
            >
              <i class="fas fa-file-pdf"></i>PDF
            </button>
          </div>
        </div>

        <div
          v-if="rekapRows.length === 0"
          class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
        >
          <i class="fas fa-calendar-times text-[var(--text-tertiary)] text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
            Tidak ada baris rekap (cek filter shift / guru aktif)
          </p>
        </div>

        <div
          v-else
          class="bg-[var(--bg-card)] rounded-2xl p-2 md:p-3 border border-[var(--border-subtle)] shadow-sm overflow-x-auto"
        >
          <table class="w-full text-[10px] md:text-[11px] border-collapse">
            <thead>
              <tr class="bg-[var(--bg-muted)] text-[var(--text-primary)] sticky top-0">
                <th
                  class="p-1.5 text-left font-black uppercase tracking-wider sticky left-0 bg-[var(--bg-muted)] z-10 min-w-[150px]"
                >
                  Nama Guru
                </th>
                <th
                  class="p-1.5 text-center font-black uppercase tracking-wider bg-[var(--bg-muted)] z-10 min-w-[64px]"
                >
                  Shift
                </th>
                <th
                  class="p-1.5 text-center font-black uppercase tracking-wider bg-[var(--bg-muted)] z-10 min-w-[60px]"
                >
                  FP ID
                </th>
                <th
                  v-for="d in daysInMonth"
                  :key="'h' + d"
                  :class="[
                    'p-1 text-center font-bold w-7 border-l border-slate-200 dark:border-slate-600',
                    { 'bg-rose-50 text-rose-700': isHariLibur(d) }
                  ]"
                >
                  {{ d }}
                </th>
                <th
                  class="p-1 text-center font-black text-emerald-700 bg-emerald-50 border-l border-[var(--border-subtle)]"
                >
                  H
                </th>
                <th class="p-1 text-center font-black text-cyan-700 bg-cyan-50">T</th>
                <th class="p-1 text-center font-black text-cyan-700 bg-cyan-50">I/S</th>
                <th class="p-1 text-center font-black text-rose-700 bg-rose-50">A</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in rekapRows"
                :key="'r' + row.g.id + '_' + row.shift"
                class="border-b border-[var(--border-subtle)] hover:bg-slate-50 dark:hover:bg-slate-700/30"
              >
                <td
                  v-if="row.isFirst"
                  :rowspan="row.span"
                  class="p-1.5 sticky left-0 bg-[var(--bg-card)] z-[1] align-middle"
                >
                  <div
                    class="font-black text-[var(--text-primary)] text-[11px] md:text-xs truncate"
                  >
                    {{ row.g.nama }}
                  </div>
                  <div class="text-[9px] text-[var(--text-secondary)] truncate">
                    {{ row.g.lembaga || row.g.unit || '-' }}
                  </div>
                </td>
                <td class="p-1.5 text-center border-l border-[var(--border-subtle)]">
                  <span
                    class="inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[9px] font-black text-slate-700 dark:text-slate-200 whitespace-nowrap"
                    >{{ shiftLabel(row.shift) }}</span
                  >
                </td>
                <td
                  class="p-1.5 text-center text-[10px] font-bold text-[var(--text-secondary)] border-l border-[var(--border-subtle)]"
                >
                  {{ row.g.fingerprint_id || row.g.fp_id || row.g.id_fingerprint || '-' }}
                </td>
                <td
                  v-for="d in daysInMonth"
                  :key="row.g.id + '_' + row.shift + '_' + d"
                  class="p-0.5 text-center border-l border-[var(--border-subtle)]"
                >
                  <span
                    :class="[
                      cellClass(row.g.id, row.shift, d),
                      'inline-block w-5 h-5 leading-5 rounded text-[9px] font-bold'
                    ]"
                    :title="cellTitle(row.g.id, row.shift, d)"
                    >{{ cellText(row.g.id, row.shift, d) }}</span
                  >
                </td>
                <td class="p-1 text-center font-black text-emerald-700 bg-emerald-50/50">
                  {{ countStatus(row.g.id, row.shift, ['hadir']) }}
                </td>
                <td class="p-1 text-center font-black text-cyan-700 bg-cyan-50/50">
                  {{ countStatus(row.g.id, row.shift, ['terlambat']) }}
                </td>
                <td class="p-1 text-center font-black text-cyan-700 bg-cyan-50/50">
                  {{ countStatus(row.g.id, row.shift, ['izin', 'sakit']) }}
                </td>
                <td class="p-1 text-center font-black text-rose-700 bg-rose-50/50">
                  {{ countAlpha(row.g.id, row.shift) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- v.21.114.0528: Modal Kelola Hari Libur dihapus — pindah ke Kalender Kegiatan (kyai req) -->

      <!-- TAB: Input Harian -->
      <div
        v-if="tabMode === 'harian'"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3 class="text-sm font-black text-[var(--text-primary)] mb-3">
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
        <p class="text-xs text-[var(--text-secondary)] mb-4">
          Centang yang hadir per shift. Kolom muncul sesuai tipe &amp; shift: guru → shift mengajar
          (+ Sekolah bila ada), pegawai → Peg. Pagi/Sore, dual-role → keduanya. Submit untuk simpan
          ke koleksi <code>absensi_shift_guru</code>.
        </p>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead class="bg-[var(--bg-muted)] text-[var(--text-primary)]">
              <tr>
                <th
                  class="p-2 text-left font-black uppercase text-[10px] tracking-wider sticky left-0 bg-[var(--bg-muted)]"
                >
                  Nama Guru
                </th>
                <th
                  v-for="col in SHIFT_COLS"
                  :key="'h-' + col.key"
                  class="p-2 text-center font-black uppercase text-[10px] tracking-wider"
                  :class="
                    col.key.startsWith('pegawai')
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : col.key === 'sekolah'
                        ? 'text-teal-700 dark:text-teal-300'
                        : 'text-cyan-700 dark:text-cyan-300'
                  "
                  colspan="2"
                >
                  {{ col.label }}
                </th>
              </tr>
              <tr class="bg-slate-50 dark:bg-slate-800">
                <th></th>
                <template v-for="col in SHIFT_COLS" :key="'hj-' + col.key">
                  <th class="p-1 text-[10px] font-bold">Hadir</th>
                  <th class="p-1 text-[10px] font-bold">Jam</th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr v-for="g in guruAktif" :key="g.id" class="border-b border-[var(--border-subtle)]">
                <td
                  class="p-2 font-bold text-[var(--text-primary)] sticky left-0 bg-[var(--bg-card)]"
                >
                  {{ g.nama }}
                </td>
                <template v-for="col in SHIFT_COLS" :key="col.key + g.id">
                  <td colspan="2" class="p-1">
                    <div
                      v-if="(guruShifts[g.id] || []).includes(col.key)"
                      class="flex items-center gap-1 justify-center"
                    >
                      <input
                        type="checkbox"
                        v-model="harianForm[g.id + '_' + col.key + '_hadir']"
                        class="w-4 h-4 accent-teal-600 cursor-pointer"
                      />
                      <input
                        v-if="harianForm[g.id + '_' + col.key + '_hadir']"
                        v-model="harianForm[g.id + '_' + col.key + '_jam']"
                        type="time"
                        class="text-[10px] px-1 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
                      />
                    </div>
                    <div v-else class="text-center text-[var(--text-tertiary)] text-[10px]">·</div>
                  </td>
                </template>
              </tr>
              <tr v-if="guruAktif.length === 0">
                <td colspan="11" class="text-center text-[var(--text-tertiary)] italic py-6">
                  Tidak ada guru aktif
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-subtle)]"
        >
          <p class="text-[11px] text-[var(--text-secondary)] italic">
            <i class="fas fa-info-circle mr-1"></i>
            Auto-status: jam &gt; batas terlambat (Pengaturan Web &rarr; Jam Shift) = "terlambat".
          </p>
          <button
            @click="saveHarian"
            :disabled="savingHarian || !hasAnyHadir"
            class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5"
          >
            <i :class="['fas', savingHarian ? 'fa-spinner fa-spin' : 'fa-save']"></i>
            {{ savingHarian ? 'Menyimpan...' : 'Simpan Absensi Hari Ini' }}
          </button>
        </div>
      </div>

      <!-- TAB: Riwayat (daftar absensi per record, terbaru dulu) -->
      <div v-else-if="tabMode === 'riwayat'" class="space-y-2">
        <div
          v-if="filteredAbsensi.length === 0"
          class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
        >
          <i class="fas fa-calendar-times text-[var(--text-tertiary)] text-4xl mb-3"></i>
          <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
            Tidak ada riwayat absensi pada filter ini
          </p>
        </div>
        <div
          v-for="a in filteredAbsensi"
          :key="a.id"
          class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              :class="[
                'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[11px]',
                String(a.shift || '').startsWith('pegawai')
                  ? 'bg-indigo-500'
                  : a.shift === 'pagi'
                    ? 'bg-[var(--color-accent)]'
                    : 'bg-teal-500'
              ]"
            >
              {{ shiftAbbr(a.shift) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                  {{ getNamaGuru(a.guru_id || a.guruId) }}
                </p>
                <span :class="statusInfo(a.status).cls">{{ statusInfo(a.status).label }}</span>
              </div>
              <p
                class="text-[11px] text-[var(--text-secondary)] mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5"
              >
                <span>{{ formatTgl(a.tanggal) }}</span>
                <span class="text-[var(--text-tertiary)]">&middot;</span>
                <span>{{ shiftLabel(a.shift) }}</span>
                <span v-if="a.jam"><i class="far fa-clock mr-0.5"></i>{{ a.jam }}</span>
                <span
                  class="ml-auto px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-[9px] font-bold text-[var(--text-secondary)] whitespace-nowrap"
                >
                  <i class="fas fa-tag mr-0.5"></i>{{ sourceLabel(a.source) }}
                </span>
              </p>
            </div>
            <button
              v-if="canHapusAbsen"
              @click="hapusAbsen(a)"
              title="Hapus catatan absen ini (super admin)"
              class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition"
            >
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
        <i class="fas fa-circle-info mr-1"></i>
        {{ filteredAbsensi.length }} absensi
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { setOne, updateOne, deleteOne } from '@/services/db'
import { isSuperAdmin } from '@/utils/roleScope'
import { useAuthStore } from '@/stores/auth'
import { useAbsensi } from '@/composables/useAbsensi'
import { useExcel } from '@/composables/useExcel'
import { useGoogleSheet } from '@/composables/useGoogleSheet' // v.100 Batch12: ekspor ke Google Sheet
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { jsPDFFromCDN } from '@/services/pdf'
// v.21.114.0528: pakai kegiatan composable utk derive hari libur dari event multi-day
import { useKegiatan } from '@/composables/useKegiatan'

const {
  filteredAbsensi,
  guruRaw,
  loading,
  selectedYear,
  selectedMonth,
  filterGuru,
  filterShift,
  filterStatus,
  stats,
  isFullAccess,
  getNamaGuru,
  getBulanLabel,
  BULAN
} = useAbsensi()

const { importFile, exportSimple } = useExcel()
// v.100 Batch12: kirim Rekap Absensi Guru ke Google Sheet (hybrid, mirip PDF)
const { isConfigured: gsheetConfigured, sendToSheet } = useGoogleSheet()
const sendingGsheet = ref(false)
const settingsStore = useSettingsStore()
const toast = useToast()
const authStore = useAuthStore()
// v.110: hapus catatan absensi — super_admin only (konsisten kebijakan hapus data lain).
const canHapusAbsen = computed(() => isSuperAdmin(authStore.sesiAktif || {}))
async function hapusAbsen(a) {
  if (!canHapusAbsen.value || !a?.id) return
  const nama = getNamaGuru(a.guru_id || a.guruId)
  const detail = `${nama} — ${formatTgl(a.tanggal)} ${shiftLabel(a.shift)}${a.jam ? ' (' + a.jam + ')' : ''}`
  if (!confirm(`Hapus catatan absen ini?\n\n${detail}\n\nTindakan ini tidak bisa dibatalkan.`))
    return
  try {
    await deleteOne('absensi_shift_guru', a.id, { alasan: 'Hapus riwayat absen (super_admin)' })
    toast.success('Catatan absen dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}
// v.21.114.0528: kegiatan composable utk derive hari libur dari event multi-day
const { kegiatanRaw } = useKegiatan()

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
          // match PIN: AMMU simpan PIN fingerprint di kolom riil `id_fingerprint`
          // (fingerprint_id/fp_id = alias legacy). trim sekali, aman spasi.
          const fpKey = String(fpId).trim()
          guru = guruRaw.value.find(
            (g) => String(g.id_fingerprint || g.fingerprint_id || g.fp_id || '').trim() === fpKey
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
        const batas = shiftBatas(shift)
        let status = 'hadir'
        if (jam && batas && jam > batas) status = 'terlambat'
        const docId = `shift_${guru.id}_${tanggal}_${shift}`
        await setOne('absensi_shift_guru', docId, {
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
// SET PIN / FINGERPRINT ID MASSAL (dari file master mesin)
// v.110: upload ekspor "Karyawan" mesin (Nama + ID Karyawan) -> set guru.id_fingerprint.
//   Preview-konfirmasi dulu (tak nulis buta); nama ganda di-flag utk set manual.
// =====================================================
const pinFileName = ref('')
const pinApplying = ref(false)
const pinRows = ref([]) // [{ pin, namaFile, guru, status, note }]

function _normNama(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

async function handlePinFile(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  pinFileName.value = file.name
  pinRows.value = []
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    // peta nama -> daftar guru (deteksi nama ganda di data app)
    const guruByNama = new Map()
    for (const g of guruRaw.value) {
      const k = _normNama(g.nama)
      if (!k) continue
      if (!guruByNama.has(k)) guruByNama.set(k, [])
      guruByNama.get(k).push(g)
    }
    // hitung kemunculan nama di FILE (deteksi duplikat antar-baris, mis. "Siti Fatimah" 2 PIN)
    const namaCountFile = {}
    for (const r of rows) {
      const nm = _normNama(r['Nama'] || r['Name'] || r['nama'] || r['NAMA'])
      if (nm) namaCountFile[nm] = (namaCountFile[nm] || 0) + 1
    }
    const out = []
    for (const r of rows) {
      const pin = String(
        r['ID Karyawan'] ||
          r['ID'] ||
          r['PIN'] ||
          r['Pin'] ||
          r['id_fingerprint'] ||
          r['fingerprint_id'] ||
          ''
      ).trim()
      const namaFile = String(r['Nama'] || r['Name'] || r['nama'] || r['NAMA'] || '').trim()
      if (!pin && !namaFile) continue
      const nk = _normNama(namaFile)
      const matches = guruByNama.get(nk) || []
      let status
      let note
      let guru = null
      if (!pin) {
        status = 'skip'
        note = 'PIN kosong'
      } else if (matches.length === 0) {
        status = 'notfound'
        note = 'Nama tak ada di data guru'
      } else if (matches.length > 1 || (namaCountFile[nk] || 0) > 1) {
        status = 'konflik'
        note = 'Nama ganda — set manual via form guru'
      } else {
        guru = matches[0]
        const cur = String(guru.id_fingerprint || guru.fingerprint_id || guru.fp_id || '').trim()
        if (cur === pin) {
          status = 'sama'
          note = 'Sudah sesuai'
        } else {
          status = 'set'
          note = cur ? `Ganti ${cur} → ${pin}` : 'Set baru'
        }
      }
      out.push({ pin, namaFile, guru, status, note })
    }
    pinRows.value = out
  } catch (e) {
    toast.error('Parse gagal: ' + (e.message || e))
  } finally {
    ev.target.value = ''
  }
}

const pinToApply = computed(() => pinRows.value.filter((r) => r.status === 'set'))

async function applyPinMapping() {
  const list = pinToApply.value
  if (!list.length) {
    toast.warning('Tidak ada PIN untuk diterapkan')
    return
  }
  pinApplying.value = true
  let ok = 0
  let err = 0
  try {
    for (const r of list) {
      try {
        await updateOne('guru', r.guru.id, { id_fingerprint: r.pin })
        r.guru.id_fingerprint = r.pin // refresh lokal (guru bukan realtime di store)
        r.status = 'sama'
        r.note = 'Tersimpan'
        ok++
      } catch (e) {
        r.note = 'Gagal: ' + (e.message || e)
        err++
      }
    }
    if (ok) toast.success(`PIN tersimpan: ${ok} guru${err ? `, ${err} gagal` : ''}`)
    else toast.error(`Gagal menyimpan PIN (${err})`)
  } finally {
    pinApplying.value = false
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

// v.99: kolom shift absensi (guru mengajar + PEGAWAI pisah pagi/sore, tarif beda di Pengaturan).
const SHIFT_COLS = [
  { key: 'pagi', label: 'Pagi' },
  { key: 'sore', label: 'Sore' },
  { key: 'sekolah', label: 'Sekolah' },
  { key: 'pegawai_pagi', label: 'Peg. Pagi' },
  { key: 'pegawai_sore', label: 'Peg. Sore' }
]

// Shift mana yang berlaku utk seorang guru/pegawai (gating per tipe & shift):
//   guru -> shift mengajar (pagi/sore sesuai field shift) + Sekolah bila punya lembaga_sekolah;
//   pegawai -> Peg. Pagi/Sore; dual-role (pegawai_guru) -> keduanya.
function shiftsForGuru(g) {
  const tipe = String(g?.tipe_pegawai || 'guru')
    .toLowerCase()
    .trim()
  const hasPegawai = tipe.includes('pegawai')
  const hasGuru = !hasPegawai || tipe.includes('guru') // pegawai murni=false; guru/dual/legacy=true
  const shiftField = String(g?.shift || 'pagi_sore').toLowerCase()
  const hasSekolah = !!(g?.lembaga_sekolah && String(g.lembaga_sekolah).trim())
  const set = new Set()
  if (hasGuru && shiftField.includes('pagi')) set.add('pagi')
  if (hasGuru && shiftField.includes('sore')) set.add('sore')
  if (hasGuru && hasSekolah) set.add('sekolah')
  if (hasPegawai) {
    // v.99: kolom pegawai mengikuti SHIFT KERJA — pegawai murni pakai g.shift, dual-role pakai g.shift_pegawai.
    //   Default 'pagi_sore' (data lama tanpa shift_pegawai) -> dua kolom (tak ada regresi).
    const sp = String((hasGuru ? g?.shift_pegawai : g?.shift) || 'pagi_sore').toLowerCase()
    if (sp.includes('pagi')) set.add('pegawai_pagi')
    if (sp.includes('sore')) set.add('pegawai_sore')
  }
  return set
}
// peta id -> array shift (reaktif, dipakai di template form harian)
const guruShifts = computed(() => {
  const m = {}
  for (const g of guruAktif.value) m[g.id] = [...shiftsForGuru(g)]
  return m
})

// Setting-key per shift (mulai/terlambat/selesai). Pegawai punya jam SENDIRI;
// 'fallback' = shift guru yg dipakai bila setelan pegawai dikosongkan.
function shiftSettingKeys(shift) {
  switch (shift) {
    case 'sore':
      return {
        mulai: 'shiftSoreMulai',
        terlambat: 'shiftSoreTerlambat',
        selesai: 'shiftSoreSelesai'
      }
    case 'sekolah':
      return {
        mulai: 'shiftSekolahMulai',
        terlambat: 'shiftSekolahTerlambat',
        selesai: 'shiftSekolahSelesai'
      }
    case 'pegawai_pagi':
      return {
        mulai: 'shiftPegawaiPagiMulai',
        terlambat: 'shiftPegawaiPagiTerlambat',
        selesai: 'shiftPegawaiPagiSelesai',
        fallback: 'pagi'
      }
    case 'pegawai_sore':
      return {
        mulai: 'shiftPegawaiSoreMulai',
        terlambat: 'shiftPegawaiSoreTerlambat',
        selesai: 'shiftPegawaiSoreSelesai',
        fallback: 'sore'
      }
    default:
      return {
        mulai: 'shiftPagiMulai',
        terlambat: 'shiftPagiTerlambat',
        selesai: 'shiftPagiSelesai'
      }
  }
}
// Window jam shift dari settings; pegawai kosong → fallback ke jam guru pagi/sore.
function shiftWindow(shift) {
  const s = settingsStore.settings || {}
  const k = shiftSettingKeys(shift)
  const pick = (kk) => ({
    mulai: String(s[kk.mulai] || '').trim(),
    terlambat: String(s[kk.terlambat] || '').trim(),
    selesai: String(s[kk.selesai] || '').trim()
  })
  let w = pick(k)
  if (!w.mulai && !w.terlambat && k.fallback) w = pick(shiftSettingKeys(k.fallback))
  return w
}
// Batas terlambat (string 'HH:MM'): pakai 'terlambat', else 'mulai'.
function shiftBatas(shift) {
  const w = shiftWindow(shift)
  return w.terlambat || w.mulai || ''
}
function shiftAbbr(sh) {
  const s = String(sh || '').toLowerCase()
  if (s === 'pagi') return 'P'
  if (s === 'sore') return 'S'
  if (s === 'sekolah') return 'Sk'
  if (s === 'pegawai_pagi') return 'PgP'
  if (s === 'pegawai_sore') return 'PgS'
  return '?'
}

// ===== Helper tampilan Riwayat =====
function shiftLabel(sh) {
  const s = String(sh || '').toLowerCase()
  return (SHIFT_COLS.find((c) => c.key === s) || {}).label || sh || '-'
}
function statusInfo(status) {
  const s = String(status || 'hadir').toLowerCase()
  const base = 'px-2 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap shrink-0 '
  if (s === 'terlambat')
    return {
      label: 'Terlambat',
      cls: base + 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300'
    }
  if (s === 'izin')
    return {
      label: 'Izin',
      cls: base + 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
    }
  if (s === 'sakit')
    return {
      label: 'Sakit',
      cls: base + 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
    }
  if (s === 'alpha' || s === 'alpa')
    return {
      label: 'Alpha',
      cls: base + 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
    }
  return {
    label: 'Hadir',
    cls: base + 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
  }
}
function sourceLabel(src) {
  const s = String(src || '').toLowerCase()
  if (s === 'fingerprint') return 'Fingerprint'
  if (s === 'fingerprint_import') return 'Impor FP'
  if (s === 'manual_harian') return 'Input manual'
  if (s === 'pengajuan_guru') return 'Izin/Pengajuan'
  return src || 'manual'
}
function formatTgl(t) {
  const s = String(t || '')
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return s || '-'
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  if (isNaN(d.getTime())) return s
  return d.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// =====================================================
// INPUT HARIAN
// =====================================================
const harianForm = ref({})
const savingHarian = ref(false)
const hasAnyHadir = computed(() => Object.keys(harianForm.value).some((k) => harianForm.value[k]))

async function saveHarian() {
  const today = new Date().toISOString().slice(0, 10)
  const writes = []
  for (const g of guruAktif.value) {
    const allow = shiftsForGuru(g)
    for (const shift of ['pagi', 'sore', 'sekolah', 'pegawai_pagi', 'pegawai_sore']) {
      if (!allow.has(shift)) continue
      if (!harianForm.value[g.id + '_' + shift + '_hadir']) continue
      const jam = String(harianForm.value[g.id + '_' + shift + '_jam'] || '').trim()
      const batas = shiftBatas(shift)
      let status = 'hadir'
      if (jam && batas && jam > batas) status = 'terlambat'
      const docId = `shift_${g.id}_${today}_${shift}`
      writes.push({
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
    }
  }
  if (writes.length === 0) {
    toast.warning('Tidak ada centang hadir — tidak ada yang disimpan')
    return
  }
  savingHarian.value = true
  try {
    for (const w of writes) await setOne('absensi_shift_guru', w.id, w)
    toast.success(`${writes.length} absensi tersimpan untuk ${today}`)
    harianForm.value = {}
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingHarian.value = false
  }
}

// =====================================================
// HARI LIBUR — v.21.114.0528: kelola pindah ke Kalender Kegiatan
// Sumber: (a) settings.hariLibur (legacy backward-compat single-day toggles)
//         (b) kegiatan_kalender events dengan tipe='libur'|'libur_nasional' (multi-day)
// Mahari libur Jumat tetap honor settings.liburJumat default true
// =====================================================
const hariLibur = ref([])

watch(
  () => settingsStore.settings?.hariLibur,
  (v) => {
    hariLibur.value = Array.isArray(v) ? [...v] : []
  },
  { immediate: true }
)

// v.21.114.0528: ekspansi event libur (multi-day) → Set of YYYY-MM-DD strings
const liburEventDates = computed(() => {
  const set = new Set()
  for (const k of kegiatanRaw.value || []) {
    if (k.tipe !== 'libur' && k.tipe !== 'libur_nasional') continue
    const start = k.tgl_mulai
    const end = k.tgl_akhir || k.tgl_mulai
    if (!start) continue
    const sd = new Date(start)
    const ed = new Date(end)
    if (isNaN(sd.getTime()) || isNaN(ed.getTime())) continue
    const cur = new Date(sd)
    while (cur <= ed) {
      const y = cur.getFullYear()
      const m = String(cur.getMonth() + 1).padStart(2, '0')
      const d = String(cur.getDate()).padStart(2, '0')
      set.add(`${y}-${m}-${d}`)
      cur.setDate(cur.getDate() + 1)
    }
  }
  return set
})

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
  if (hariLibur.value.includes(iso)) return true
  return liburEventDates.value.has(iso)
}

// =====================================================
// MATRIX REKAP BULANAN — per (guru × shift)
// Selaras dgn bisyaroh yg dihitung per shift (BisyarohView bonusKehadiran):
// tiap shift jadi baris sendiri, tidak diratakan jadi 1 status/hari.
// =====================================================
// Satu baris utk tiap shift yg BERLAKU bagi guru (shiftsForGuru), urut SHIFT_COLS.
// filterShift mempersempit ke shift terpilih.
const rekapRows = computed(() => {
  const order = SHIFT_COLS.map((c) => c.key)
  const only = String(filterShift.value || '').toLowerCase()
  const rows = []
  for (const g of guruAktif.value) {
    const shifts = shiftsForGuru(g)
    const keys = order.filter((k) => shifts.has(k) && (!only || k === only))
    keys.forEach((key, idx) => {
      // nama guru di-merge (rowspan) sekali per guru: isFirst + jumlah baris (span)
      rows.push({ g, shift: key, isFirst: idx === 0, span: keys.length })
    })
  }
  return rows
})

// Index absensi per (guru + shift + hari) — TANPA meratakan antar-shift.
const absensiByGuruShiftDay = computed(() => {
  const map = {}
  for (const a of filteredAbsensi.value) {
    const tgl = String(a.tanggal || '')
    const d = parseInt(tgl.slice(8, 10), 10)
    if (!d) continue
    const sh = String(a.shift || '').toLowerCase()
    const key = String(a.guru_id || a.guruId || '') + '_' + sh + '_' + d
    if (!map[key]) {
      map[key] = a
    } else {
      // Duplikat shift+hari yg sama (jarang): pilih status prioritas tertinggi.
      const prio = (s) => (s === 'terlambat' ? 3 : s === 'hadir' ? 2 : 1)
      if (prio(String(a.status || 'hadir')) > prio(String(map[key].status || 'hadir'))) {
        map[key] = a
      }
    }
  }
  return map
})

function getAbsensiCell(guruId, shift, d) {
  return absensiByGuruShiftDay.value[guruId + '_' + shift + '_' + d] || null
}

function cellText(guruId, shift, d) {
  if (isHariLibur(d)) return 'L'
  const a = getAbsensiCell(guruId, shift, d)
  if (!a) {
    // kosong & hari sudah lewat = alpha; hari depan = belum terjadi (kosong)
    const today = new Date().toISOString().slice(0, 10)
    return isoDateOf(d) <= today ? 'A' : ''
  }
  const s = String(a.status || 'hadir').toLowerCase()
  if (s === 'terlambat') return 'T'
  if (s === 'izin') return 'I'
  if (s === 'sakit') return 'S'
  return 'H'
}

function cellClass(guruId, shift, d) {
  if (isHariLibur(d)) return 'bg-rose-200 text-rose-800'
  const a = getAbsensiCell(guruId, shift, d)
  if (!a) {
    const today = new Date().toISOString().slice(0, 10)
    return isoDateOf(d) <= today
      ? 'bg-rose-100 text-rose-700'
      : 'bg-[var(--bg-card-elevated)] text-[var(--text-tertiary)]'
  }
  const s = String(a.status || 'hadir').toLowerCase()
  if (s === 'terlambat') return 'bg-cyan-200 text-cyan-800'
  if (s === 'izin' || s === 'sakit') return 'bg-cyan-200 text-cyan-800'
  return 'bg-emerald-200 text-emerald-800'
}

function cellTitle(guruId, shift, d) {
  const iso = isoDateOf(d)
  if (isHariLibur(d)) return iso + ' — Libur'
  const a = getAbsensiCell(guruId, shift, d)
  if (!a) {
    const today = new Date().toISOString().slice(0, 10)
    return iso + (iso <= today ? ' — Alpha' : ' — (belum)') + ' [' + shiftLabel(shift) + ']'
  }
  return `${iso} — ${a.status || 'hadir'}${a.jam ? ' (' + a.jam + ')' : ''} [${shiftLabel(shift)}]`
}

function countStatus(guruId, shift, statuses) {
  let n = 0
  for (let d = 1; d <= daysInMonth.value; d++) {
    if (isHariLibur(d)) continue
    const a = getAbsensiCell(guruId, shift, d)
    if (a && statuses.includes(String(a.status || 'hadir').toLowerCase())) n++
  }
  return n
}

// Alpha = hari kerja (non-libur) yg sudah lewat tanpa record utk shift ini.
function countAlpha(guruId, shift) {
  const today = new Date().toISOString().slice(0, 10)
  let n = 0
  for (let d = 1; d <= daysInMonth.value; d++) {
    if (isHariLibur(d)) continue
    if (isoDateOf(d) > today) continue
    if (!getAbsensiCell(guruId, shift, d)) n++
  }
  return n
}

// =====================================================
// EXPORT EXCEL
// =====================================================
// Bangun kolom + baris rekap PER (guru × shift) — dipakai bareng oleh
// Excel, Google Sheet, dan PDF agar formatnya selalu sinkron dgn layar.
function buildRekapExport() {
  const days = daysInMonth.value
  const columns = [
    { key: 'nama', header: 'Nama Guru', width: 22 },
    { key: 'shift', header: 'Shift', width: 10 },
    { key: 'lembaga', header: 'Lembaga', width: 14 }
  ]
  for (let d = 1; d <= days; d++) columns.push({ key: 'd' + d, header: String(d), width: 4 })
  columns.push({ key: 'H', header: 'H', width: 5 })
  columns.push({ key: 'T', header: 'T', width: 5 })
  columns.push({ key: 'IS', header: 'I/S', width: 5 })
  columns.push({ key: 'A', header: 'A', width: 5 })
  const rows = rekapRows.value.map(({ g, shift }) => {
    const r = { nama: g.nama, shift: shiftLabel(shift), lembaga: g.lembaga || g.unit || '-' }
    for (let d = 1; d <= days; d++) r['d' + d] = cellText(g.id, shift, d)
    r.H = countStatus(g.id, shift, ['hadir'])
    r.T = countStatus(g.id, shift, ['terlambat'])
    r.IS = countStatus(g.id, shift, ['izin', 'sakit'])
    r.A = countAlpha(g.id, shift)
    return r
  })
  return { columns, rows }
}

async function exportRekapExcel() {
  try {
    const { columns, rows } = buildRekapExport()
    await exportSimple(rows, {
      filename: `Rekap_Absensi_Guru_${selectedYear.value}_${String(selectedMonth.value).padStart(2, '0')}.xlsx`,
      sheetName: 'Rekap',
      columns,
      title: `REKAP ABSENSI GURU (per shift) — ${getBulanLabel(selectedMonth.value).toUpperCase()} ${selectedYear.value}`
    })
    toast.success('Excel berhasil di-ekspor')
  } catch (e) {
    toast.error('Gagal ekspor Excel: ' + (e.message || e))
  }
}

// v.100 Batch12: kirim Rekap Absensi Guru ke Google Sheet (reuse data/kolom yang sama dgn Excel)
async function kirimAbsensiGsheet() {
  if (sendingGsheet.value) return
  if (!gsheetConfigured()) {
    toast.warning('Google Sheet belum diatur. Buka Pengaturan → Google Sheet dulu.')
    return
  }
  sendingGsheet.value = true
  try {
    const { columns, rows } = buildRekapExport()
    const ss = settingsStore.settings || {}
    const judul = `REKAP ABSENSI GURU (per shift) — ${getBulanLabel(selectedMonth.value).toUpperCase()} ${selectedYear.value}`
    const { url } = await sendToSheet({
      rows,
      title: `Rekap Absensi Guru ${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`,
      sheetName: 'Rekap Absensi',
      kop: [ss.kopLine1 || 'PONDOK PESANTREN MAMBAUL ULUM', judul].filter(Boolean),
      subtitle: `${rows.length} baris (guru × shift)`,
      columns
    })
    toast.success(`${rows.length} baris terkirim ke Google Sheet.`)
    try {
      window.open(url, '_blank')
    } catch (e) {
      /* ignore */
    }
  } catch (e) {
    toast.error('Gagal kirim ke Google Sheet: ' + (e?.message || e))
  } finally {
    sendingGsheet.value = false
  }
}

// =====================================================
// EXPORT PDF
// =====================================================
async function exportRekapPdf() {
  try {
    const jsPDF = await jsPDFFromCDN()
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    const { columns, rows } = buildRekapExport()
    const head = [columns.map((c) => c.header)]
    const body = rows.map((r) => columns.map((c) => r[c.key]))
    doc.setFontSize(11)
    doc.text(
      `REKAP ABSENSI GURU (per shift) — ${getBulanLabel(selectedMonth.value).toUpperCase()} ${selectedYear.value}`,
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
        1: { halign: 'left' },
        2: { halign: 'left' }
      },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' }
    })
    // v.71.0526: native save di Android/iOS via Capacitor, web download di browser
    const { saveBlob } = await import('@/composables/useNativeDownload')
    await saveBlob(
      doc.output('blob'),
      `Rekap_Absensi_Guru_${selectedYear.value}_${String(selectedMonth.value).padStart(2, '0')}.pdf`
    )
    toast.success('PDF berhasil di-ekspor')
  } catch (e) {
    toast.error('Gagal ekspor PDF: ' + (e.message || e))
  }
}
</script>
