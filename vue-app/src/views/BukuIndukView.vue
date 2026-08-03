<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
        Akses Keuangan terbatas
      </p>
    </div>

    <template v-else>
      <!-- Header + stats + actions. v.98: disembunyikan di Electron (aksi -> pita "Aksi Halaman") -->
      <div
        v-if="!isDesktop"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <!-- v.21.113.0528: Header restructure — title + subtitle kiri, semua tombol aksi rapi di kanan (Ekspor/Input/Cetak), warna cyan konsisten -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div class="min-w-0">
            <h1
              class="text-base md:text-lg font-black text-[var(--text-primary)] whitespace-nowrap"
            >
              <i class="fas fa-book text-cyan-500 mr-1"></i>{{ pageTitle }}
            </h1>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {{
                gedungScoped
                  ? 'Arus kas gedung Anda'
                  : 'Pusat data arus kas keluar/masuk seluruh lembaga'
              }}
              · {{ periodeLabel }}
            </p>
          </div>
          <!-- v.21.113.0528: tombol aksi grup kanan — Ekspor/Input/Cetak konsisten h-9 px-3 rounded-xl -->
          <!-- v.103b: mobile = toolbar 1-baris scroll-samping (tak wrap berantakan); desktop wrap normal -->
          <div
            class="flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto md:overflow-visible hide-scrollbar [&>*]:shrink-0 md:[&>*]:shrink -mx-1 px-1 lg:mx-0 lg:px-0"
          >
            <button
              :disabled="exportingBI"
              aria-label="Ekspor Buku Induk ke Excel"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
              @click="exportBukuIndukExcel"
            >
              <i :class="['fas', exportingBI ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i
              >{{ exportingBI ? 'Ekspor...' : 'Ekspor Excel' }}
            </button>
            <button
              v-if="gsheetConfigured()"
              :disabled="sendingGsheet"
              aria-label="Kirim Buku Induk ke Google Sheet"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
              @click="kirimBukuGsheet"
            >
              <i :class="['fas', sendingGsheet ? 'fa-spinner fa-spin' : 'fa-table']"></i
              >{{ sendingGsheet ? 'Mengirim...' : 'Google Sheet' }}
            </button>
            <button
              aria-label="Input transaksi manual"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition cursor-pointer"
              @click="bukaModalInput()"
            >
              <i class="fas fa-plus-circle"></i>Input Manual
            </button>
            <button
              aria-label="Cetak laporan buku induk PDF"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer"
              @click="cetakLaporan"
            >
              <i class="fas fa-file-pdf"></i>Cetak Laporan
            </button>
          </div>
        </div>
      </div>

      <!-- v.1.2.6: Kartu Ringkasan (SELALU tampil, termasuk Electron — dulu blok stats ikut
           disembunyikan `v-if="!isDesktop"` → saldo tak terlihat di desktop). -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-center justify-between gap-2 mb-3">
          <h2 class="text-xs md:text-sm font-black text-[var(--text-primary)]">
            <i class="fas fa-book text-cyan-500 mr-1"></i>{{ pageTitle }}
          </h2>
          <span class="text-[10px] md:text-[11px] text-[var(--text-secondary)] font-bold">
            {{ periodeLabel }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2 md:gap-3">
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-emerald-700 uppercase">Total Masuk</p>
            <p class="text-base md:text-lg font-black text-emerald-800 mt-1">
              {{ fmtRp(stats.pemasukan) }}
            </p>
          </div>
          <div class="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-rose-700 uppercase">Total Keluar</p>
            <p class="text-base md:text-lg font-black text-rose-800 mt-1">
              {{ fmtRp(stats.pengeluaran) }}
            </p>
          </div>
          <div class="p-3 rounded-xl border-l-4 bg-cyan-50 border-cyan-500">
            <p class="text-[10px] font-bold uppercase text-cyan-700">Saldo Akhir</p>
            <p class="text-base md:text-lg font-black mt-1 text-cyan-800">
              {{ fmtRp(stats.saldo) }}
            </p>
          </div>
        </div>
        <!-- v.1.2.7: pisah uang laci vs rekening — inti laporan kas harian -->
        <div class="grid grid-cols-2 gap-2 md:gap-3 mt-2">
          <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
              <i class="fas fa-money-bill mr-1"></i>Tunai (masuk)
            </p>
            <p class="text-sm md:text-base font-black text-amber-800 dark:text-amber-200 mt-1">
              {{ fmtRp(rekapMetode.Tunai.masuk) }}
            </p>
            <p
              v-if="rekapMetode.Tunai.keluar > 0"
              class="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5"
            >
              keluar {{ fmtRp(rekapMetode.Tunai.keluar) }}
            </p>
          </div>
          <div class="bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase">
              <i class="fas fa-building-columns mr-1"></i>Transfer (masuk)
            </p>
            <p class="text-sm md:text-base font-black text-sky-800 dark:text-sky-200 mt-1">
              {{ fmtRp(rekapMetode.Transfer.masuk) }}
            </p>
            <p
              v-if="rekapMetode.Transfer.keluar > 0"
              class="text-[10px] text-sky-700 dark:text-sky-400 mt-0.5"
            >
              keluar {{ fmtRp(rekapMetode.Transfer.keluar) }}
            </p>
          </div>
        </div>
      </div>

      <!-- v.72.16.0526: Input Manual Modal -->
      <Teleport to="body">
        <div
          v-if="modalInputOpen"
          class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          @click.self="tutupModalInput"
        >
          <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md">
            <form v-if="!savedKas" class="p-5" @submit.prevent="simpanInputManual">
              <h3 class="text-base font-black text-[var(--text-primary)] mb-4">
                <i class="fas fa-plus-circle text-emerald-600 mr-2"></i>Input Transaksi Manual
              </h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Tanggal *</label
                  >
                  <input
                    v-model="inputForm.tanggal"
                    type="date"
                    required
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Tipe *</label
                  >
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'masuk'
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-[var(--bg-card)] text-emerald-700 border-emerald-300'
                      ]"
                      @click="inputForm.tipe = 'masuk'"
                    >
                      <i class="fas fa-arrow-down mr-1"></i>Pemasukan
                    </button>
                    <button
                      type="button"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'keluar'
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-[var(--bg-card)] text-rose-700 border-rose-300'
                      ]"
                      @click="inputForm.tipe = 'keluar'"
                    >
                      <i class="fas fa-arrow-up mr-1"></i>Pengeluaran
                    </button>
                  </div>
                </div>
                <!-- v.1.2.7: cara bayar dicatat eksplisit — laporan harian memisahkan
                     uang laci (tunai) dari uang rekening (transfer) -->
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Cara Bayar *</label
                  >
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="m in METODE_OPTS"
                      :key="m"
                      type="button"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.metode === m
                          ? 'bg-cyan-600 text-white border-cyan-700'
                          : 'bg-[var(--bg-card)] text-cyan-700 border-cyan-300'
                      ]"
                      @click="inputForm.metode = m"
                    >
                      <i
                        :class="[
                          'fas mr-1',
                          m === 'Transfer' ? 'fa-building-columns' : 'fa-money-bill'
                        ]"
                      ></i
                      >{{ m }}
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Kategori</label
                  >
                  <input
                    v-model="inputForm.kategori"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Keterangan *</label
                  >
                  <textarea
                    v-model="inputForm.keterangan"
                    required
                    rows="2"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)] resize-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Nominal (Rp) *</label
                  >
                  <input
                    v-model.number="inputForm.nominal"
                    type="number"
                    min="0"
                    required
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
              </div>
              <div
                class="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-[var(--border-subtle)]"
              >
                <button
                  type="button"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]"
                  @click="tutupModalInput"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="savingInput"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50"
                >
                  <i :class="['fas', savingInput ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                  {{ savingInput ? 'Menyimpan...' : 'Simpan' }}
                </button>
              </div>
            </form>

            <!-- v.1.2.6 (E): panel sukses + cetak struk kas (gaya POS) -->
            <div v-else class="p-5 space-y-4 text-center">
              <div
                :class="[
                  'mx-auto w-14 h-14 rounded-full flex items-center justify-center text-2xl',
                  savedKas.tipe === 'masuk'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-rose-100 text-rose-600'
                ]"
              >
                <i class="fas fa-check"></i>
              </div>
              <div>
                <p class="text-base font-black text-[var(--text-primary)]">Transaksi tersimpan</p>
                <p class="text-sm text-[var(--text-secondary)] mt-0.5">
                  {{ savedKas.tipe === 'masuk' ? 'Kas Masuk' : 'Kas Keluar' }} ·
                  {{ fmtRp(savedKas.nominal) }}
                </p>
                <p class="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                  {{ savedKas.keterangan }}
                </p>
              </div>
              <div class="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  class="px-4 py-2 text-xs font-black bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
                  @click="cetakStrukKas(savedKas)"
                >
                  <i class="fas fa-file-pdf mr-1"></i>Cetak Struk
                </button>
              </div>
              <div
                class="flex items-center justify-center gap-2 pt-3 border-t border-[var(--border-subtle)]"
              >
                <button
                  type="button"
                  class="px-4 py-2 text-xs font-bold text-[var(--text-primary)] hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg"
                  @click="bukaModalInput"
                >
                  <i class="fas fa-plus mr-1"></i>Transaksi Baru
                </button>
                <button
                  type="button"
                  class="px-5 py-2 text-xs font-black bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg"
                  @click="tutupModalInput"
                >
                  <i class="fas fa-check-double mr-1"></i>Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Filter -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <select
            v-model.number="selectedYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="selectedMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option :value="0">Semua bulan</option>
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <!-- v.1.2.7: filter HARIAN — dasar laporan kas harian. Nonaktif kalau bulan
               belum dipilih (tanggal tanpa bulan tak bermakna). -->
          <select
            v-model.number="selectedDay"
            :disabled="selectedMonth === 0"
            :title="selectedMonth === 0 ? 'Pilih bulan dulu' : 'Filter per tanggal'"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50"
          >
            <option :value="0">Semua tgl</option>
            <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
          </select>
          <select
            v-model="filterTipe"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua tipe</option>
            <option value="masuk">Pemasukan</option>
            <option value="keluar">Pengeluaran</option>
          </select>
          <!-- v.1.2.7: filter cara bayar (tunai/transfer) -->
          <select
            v-model="filterMetode"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua cara bayar</option>
            <option v-for="m in METODE_OPTS" :key="m" :value="m">{{ m }}</option>
          </select>
          <input
            v-model="search"
            type="text"
            placeholder="Cari keterangan..."
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>
        <!-- v.1.2.7: pintasan hari ini — laporan harian sekali klik -->
        <div class="flex items-center gap-2 mt-2">
          <button
            type="button"
            class="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100"
            @click="setHariIni"
          >
            <i class="fas fa-calendar-day mr-1"></i>Hari ini
          </button>
          <button
            v-if="selectedDay > 0"
            type="button"
            class="text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-slate-200 dark:hover:bg-slate-600"
            @click="selectedDay = 0"
          >
            <i class="fas fa-xmark mr-1"></i>Semua tanggal
          </button>
        </div>
      </div>

      <!-- v.108: banner bersih-residu (super_admin) -->
      <div
        v-if="isAdmin && residuBuku.length > 0"
        class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-2 flex-wrap"
      >
        <span class="text-xs font-bold text-amber-800 dark:text-amber-300">
          <i class="fas fa-triangle-exclamation mr-1"></i>{{ residuBuku.length }} entri residu/tanpa
          tanggal valid (terhitung di dashboard, tak tampil di ledger)
        </span>
        <button
          type="button"
          class="text-[11px] font-black bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg"
          @click="bersihkanResidu"
        >
          <i class="fas fa-broom mr-1"></i>Bersihkan residu ({{ residuBuku.length }})
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-3"></i>
        <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat buku induk...</p>
      </div>

      <!-- Empty -->
      <div
        v-else-if="filteredBuku.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-book-open text-[var(--text-tertiary)] text-4xl mb-3"></i>
        <p class="text-sm font-bold text-[var(--text-primary)]">Tidak ada transaksi</p>
      </div>

      <!-- List -->
      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <!-- v.21.100.0527: bulk action bar -->
        <div
          v-if="isAdmin && selectedBuku.size > 0"
          class="px-4 py-2 bg-rose-50 dark:bg-rose-900/20 border-b border-rose-200 dark:border-rose-800 flex items-center justify-between gap-2"
        >
          <span class="text-[11px] font-bold text-rose-700 dark:text-rose-300">
            {{ selectedBuku.size }} record dipilih
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              class="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]"
              @click="selectedBuku = new Set()"
            >
              Batal
            </button>
            <button
              type="button"
              class="text-[11px] font-black bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg"
              @click="hapusBukuTerpilih"
            >
              <i class="fas fa-trash mr-1"></i>Hapus Terpilih ({{ selectedBuku.size }})
            </button>
          </div>
        </div>
        <!-- Table header (desktop) -->
        <div
          :class="[
            'hidden md:grid gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider border-b border-[var(--border-subtle)]',
            isAdmin
              ? 'md:grid-cols-[32px_88px_1fr_96px_96px_150px]'
              : 'md:grid-cols-[88px_1fr_96px_96px_150px]'
          ]"
        >
          <span v-if="isAdmin" class="text-center">
            <input
              type="checkbox"
              :checked="selectedBuku.size === filteredBuku.length && filteredBuku.length > 0"
              class="w-4 h-4 accent-rose-600"
              title="Pilih semua"
              @change="toggleSemuaBuku"
            />
          </span>
          <span>Tanggal</span>
          <span>Keterangan</span>
          <span class="text-right">Masuk</span>
          <span class="text-right">Keluar</span>
          <span class="text-right">Saldo</span>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="b in filteredBuku"
            :key="b.id"
            :class="[
              'px-4 py-2.5 md:grid gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition',
              isAdmin
                ? 'md:grid-cols-[32px_88px_1fr_96px_96px_150px]'
                : 'md:grid-cols-[88px_1fr_96px_96px_150px]'
            ]"
          >
            <span
              v-if="isAdmin"
              class="md:text-center hidden md:inline-flex md:items-center md:justify-center"
            >
              <input
                type="checkbox"
                :checked="selectedBuku.has(String(b.id))"
                class="w-4 h-4 accent-rose-600"
                @change="toggleBukuSel(b.id)"
              />
            </span>
            <span
              class="text-[11px] text-[var(--text-secondary)] font-bold whitespace-nowrap block md:inline"
            >
              {{ formatTgl(b.tanggal) }}
            </span>
            <div class="md:inline">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{ b.keterangan || '-' }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                <span
                  v-if="b.kategori"
                  class="bg-[var(--bg-muted)] text-slate-700 dark:text-[var(--text-tertiary)] px-1.5 py-0.5 rounded font-bold"
                >
                  {{ b.kategori }}
                </span>
                <!-- v.1.2.7: penanda cara bayar (tunai = uang laci, transfer = rekening) -->
                <span
                  :class="[
                    'ml-1 px-1.5 py-0.5 rounded font-bold',
                    metodeTransaksi(b) === 'Transfer'
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                  ]"
                >
                  <i
                    :class="[
                      'fas mr-0.5',
                      metodeTransaksi(b) === 'Transfer' ? 'fa-building-columns' : 'fa-money-bill'
                    ]"
                  ></i
                  >{{ metodeTransaksi(b) }}
                </span>
                <span v-if="b.ref_id" class="ml-1 text-[var(--text-tertiary)]"
                  >· #{{ b.ref_id }}</span
                >
              </p>
            </div>
            <div class="mt-1 md:mt-0 md:text-right">
              <span class="md:hidden text-[10px] text-[var(--text-tertiary)] font-bold mr-1"
                >Masuk:</span
              >
              <span
                v-if="b.tipe === 'masuk' || Number(b.masuk) > 0"
                class="text-sm font-black text-emerald-700"
              >
                {{ fmtRp(b.masuk || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
            </div>
            <div class="md:text-right">
              <span class="md:hidden text-[10px] text-[var(--text-tertiary)] font-bold mr-1"
                >Keluar:</span
              >
              <span
                v-if="b.tipe === 'keluar' || Number(b.keluar) > 0"
                class="text-sm font-black text-rose-700"
              >
                {{ fmtRp(b.keluar || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
            </div>
            <!-- v.1.2.6: Saldo berjalan + tombol aksi (struk/edit/hapus) -->
            <div class="mt-1 md:mt-0 md:text-right flex items-center md:justify-end gap-2">
              <span class="md:hidden text-[10px] text-[var(--text-tertiary)] font-bold mr-1"
                >Saldo:</span
              >
              <span class="text-sm font-bold text-cyan-700 dark:text-cyan-400 whitespace-nowrap">
                {{ fmtRp(saldoOf(b)) }}
              </span>
              <button
                v-if="b.sumber === 'pos_santri' && b.trx_id"
                type="button"
                class="text-[10px] text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 px-1.5 py-1 rounded"
                title="Cetak ulang struk PDF"
                @click="cetakUlangStruk(b, 'pdf')"
              >
                <i class="fas fa-file-pdf"></i>
              </button>
              <button
                v-if="b.sumber === 'pos_santri' && b.trx_id"
                type="button"
                class="text-[10px] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 px-1.5 py-1 rounded"
                title="Cetak ulang struk dot-matrix"
                @click="cetakUlangStruk(b, 'dot')"
              >
                <i class="fas fa-print"></i>
              </button>
              <!-- v.1.2.6 (E): struk untuk transaksi kas manual (masuk/keluar) -->
              <button
                v-if="b.sumber === 'manual'"
                type="button"
                class="text-[10px] text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 px-1.5 py-1 rounded"
                title="Cetak struk kas"
                @click="cetakStrukKas(b)"
              >
                <i class="fas fa-receipt"></i>
              </button>
              <button
                v-if="isAdmin"
                type="button"
                class="text-[10px] text-cyan-600 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 px-1.5 py-1 rounded"
                title="Edit record (super admin)"
                @click="bukaEditBuku(b)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                v-if="isAdmin"
                type="button"
                class="text-[10px] text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 px-1.5 py-1 rounded"
                title="Hapus record (super admin)"
                @click="hapusBuku(b)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filteredBuku.length }} transaksi
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
// v.91.0626: deleteOne = backup audit_log dulu. serverTimestamp = shim ISO (db.js).
import {
  subscribeColl,
  setOne,
  updateOne,
  deleteOne,
  queryColl,
  serverTimestamp
} from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useGedungScope } from '@/composables/useGedungScope'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { useGoogleSheet } from '@/composables/useGoogleSheet' // v.100 Batch12: ekspor ke Google Sheet
import { fmtRp, formatTanggal as formatTgl, todayJakarta } from '@/utils/format'
// v.1.2.7: cara bayar (tunai/transfer) utk kolom + filter + subtotal laporan harian
import { metodeTransaksi, ringkasMetode, METODE_OPTS } from '@/utils/metodeBayar'
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'
// v.21.103.0527: reprint struk dari BukuInduk untuk record sumber pos_santri
// v.1.2.6: cetakStrukKasPdf = struk BUKTI KAS MASUK/KELUAR untuk transaksi manual
import { cetakStrukPdf, cetakStrukSlipPdf, cetakStrukKasPdf } from '@/utils/strukBuilder'
// v.1.2.7: satu struk = satu TRANSAKSI (nomor struk lama bisa kembar antar santri)
import { kunciTransaksi } from '@/utils/trxStruk'

const toast = useToast()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const { exportStyled } = useExcel()
// v.100 Batch12: kirim Buku Induk ke Google Sheet (hybrid, mirip PDF)
const { isConfigured: gsheetConfigured, sendToSheet } = useGoogleSheet()
const sendingGsheet = ref(false)
// v.21.98.0527: super_admin only — bisa hapus record buku induk
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

// v.111: scope Gedung — admin keuangan ber-gedung hanya lihat Buku Kas-nya.
const { scoped: gedungScoped, myGedung, allowRow } = useGedungScope()
const pageTitle = computed(() =>
  gedungScoped.value ? `Buku Kas — ${myGedung.value}` : 'Buku Induk (General Ledger)'
)

// v.21.103.0527: reprint struk untuk record POS — group by trx_id
async function cetakUlangStruk(b, mode = 'pdf') {
  const trxId = b.trx_id || ''
  if (!trxId) {
    toast.warning('Record tidak punya trx_id — bukan dari POS Santri')
    return
  }
  try {
    // Fetch semua record dengan trx_id sama, lalu v.1.2.7: saring ke TRANSAKSI baris ini
    //   saja (kunciTransaksi) — nomor struk lama bisa kembar dgn transaksi santri lain,
    //   dulu ikut tercetak jadi satu struk gabungan.
    const sekunci = kunciTransaksi(b)
    const semua = await queryColl('keuangan_buku_induk', [['trx_id', '==', trxId]])
    const items = semua.filter((e) => kunciTransaksi(e) === sekunci)
    if (items.length === 0) {
      toast.warning('Data transaksi tidak ditemukan')
      return
    }
    // Bangun struktur trx
    const first = items[0]
    const trx = {
      trx_id: trxId,
      no_struk: first.no_struk || trxId,
      tanggal: first.tanggal || '',
      santri_nama: first.santri_nama || '-',
      santri_nis: '',
      lembaga: '',
      kelas: '',
      operator: first.operator || '-',
      penyetor: first.wali || '',
      items: items.map((e) => ({
        jenis: e.kategori || 'Pembayaran',
        nominal: Number(e.nominal || 0),
        keterangan: ''
      })),
      total: items.reduce((sum, e) => sum + Number(e.nominal || 0), 0)
    }
    const sset = settingsStore.settings || {}
    // v.95.0626: 2 mode -> 'dot' = struk print 2-ply (PDF slip grafis), selain itu = Struk PDF (F4)
    if (mode === 'dot') {
      await cetakStrukSlipPdf(trx, sset, { preview: true })
    } else {
      await cetakStrukPdf(trx, sset)
    }
    toast.success('Struk dicetak ulang')
  } catch (e) {
    console.error('[cetakUlangStruk]', e)
    toast.error('Gagal cetak ulang: ' + (e.message || e))
  }
}

async function hapusBuku(b) {
  if (!isAdmin.value) return
  const label = b.keterangan || b.kategori || b.id
  if (
    !confirm(
      `Hapus PERMANEN record buku induk:\n${label}\nNominal: ${fmtRp(b.nominal || 0)}\n\nTidak bisa di-undo.`
    )
  )
    return
  try {
    await deleteOne('keuangan_buku_induk', b.id)
    toast.success('Record dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

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

const bukuRaw = ref([])
const loading = ref(true)
let unsub = null

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1) // 0 = semua bulan
// v.1.2.7: filter harian (0 = semua tanggal) + cara bayar — untuk laporan kas harian
const selectedDay = ref(0)
const filterMetode = ref('')
const filterTipe = ref('')
const search = ref('')

// pintasan: set filter ke tanggal hari ini (WIB)
function setHariIni() {
  const [y, m, d] = todayJakarta().split('-')
  selectedYear.value = Number(y)
  selectedMonth.value = Number(m)
  selectedDay.value = Number(d)
}
// bulan diganti ke "semua bulan" -> tanggal ikut direset (kombinasi itu tak bermakna)
watch(selectedMonth, (m) => {
  if (m === 0) selectedDay.value = 0
})

// v.72.16.0526: Input Manual modal
const modalInputOpen = ref(false)
const savingInput = ref(false)
// v.1.2.6 (E): record kas manual yang baru tersimpan → tampil panel sukses + cetak struk
const savedKas = ref(null)
// v.21.99.0527: editingId untuk mode edit (super_admin koreksi nominal/keterangan)
const editingId = ref(null)
// v.21.100.0527: multi-select bulk delete (super_admin)
const selectedBuku = ref(new Set())
function toggleBukuSel(id) {
  const ns = new Set(selectedBuku.value)
  const sid = String(id)
  if (ns.has(sid)) ns.delete(sid)
  else ns.add(sid)
  selectedBuku.value = ns
}
function toggleSemuaBuku() {
  if (selectedBuku.value.size === filteredBuku.value.length && filteredBuku.value.length > 0) {
    selectedBuku.value = new Set()
  } else {
    selectedBuku.value = new Set(filteredBuku.value.map((b) => String(b.id)))
  }
}
async function hapusBukuTerpilih() {
  if (!isAdmin.value) return
  const ids = Array.from(selectedBuku.value)
  if (ids.length === 0) return
  if (!confirm(`Hapus ${ids.length} record buku induk terpilih?\n\nTidak bisa di-undo.`)) return
  let ok = 0,
    fail = 0
  for (const id of ids) {
    try {
      await deleteOne('keuangan_buku_induk', id)
      ok++
    } catch (e) {
      fail++
      console.warn('[bulkHapusBuku]', id, e.message)
    }
  }
  selectedBuku.value = new Set()
  // v.21.104.0527: audit log bulk delete
  await writeAuditLog({
    operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
    action: 'bulk_delete',
    target: 'keuangan_buku_induk',
    ids,
    detail: { ok, fail }
  })
  if (fail > 0) toast.warning(`${ok} dihapus, ${fail} gagal — cek console`)
  else toast.success(`${ok} record dihapus`)
}
// v.108: residu = entri tabungan-residu ATAU tanpa tanggal valid (ke-hitung di dashboard tapi tdk tampil di ledger)
const residuBuku = computed(() =>
  bukuRaw.value.filter((b) => {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    const tabungan = kat === 'tabungan' || sumber.includes('tabungan')
    const noTgl = !/^\d{4}-\d{2}/.test(String(b.tanggal || '').trim())
    return tabungan || noTgl
  })
)
async function bersihkanResidu() {
  if (!isAdmin.value) return
  const list = residuBuku.value
  if (list.length === 0) {
    toast.info('Tidak ada residu.')
    return
  }
  if (
    !confirm(
      `Hapus ${list.length} entri residu/tak-bertanggal dari buku induk?\n\nIni entri yang ter-hitung di dashboard tapi TIDAK muncul di ledger. Tidak bisa di-undo.`
    )
  )
    return
  let ok = 0,
    fail = 0
  const ids = list.map((b) => String(b.id))
  for (const id of ids) {
    try {
      await deleteOne('keuangan_buku_induk', id)
      ok++
    } catch (e) {
      fail++
      console.warn('[bersihkanResidu]', id, e.message)
    }
  }
  await writeAuditLog({
    operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
    action: 'cleanup_residu',
    target: 'keuangan_buku_induk',
    ids,
    detail: { ok, fail }
  })
  if (fail > 0) toast.warning(`${ok} residu dihapus, ${fail} gagal — cek console`)
  else toast.success(`${ok} entri residu dibersihkan`)
}
const inputForm = reactive({
  tanggal: todayJakarta(),
  tipe: 'masuk',
  metode: 'Tunai', // v.1.2.7: cara bayar kas manual
  kategori: '',
  keterangan: '',
  nominal: 0
})

function bukaModalInput() {
  editingId.value = null
  savedKas.value = null
  inputForm.tanggal = todayJakarta()
  inputForm.tipe = 'masuk'
  inputForm.metode = 'Tunai'
  inputForm.kategori = ''
  inputForm.keterangan = ''
  inputForm.nominal = 0
  modalInputOpen.value = true
}

// v.1.2.6 (E): cetak struk BUKTI KAS untuk record buku induk manual (masuk/keluar)
async function cetakStrukKas(b) {
  try {
    await cetakStrukKasPdf(b, settingsStore.settings || {})
    toast.success('Struk kas dicetak')
  } catch (e) {
    console.error('[cetakStrukKas]', e)
    toast.error('Gagal cetak struk: ' + (e.message || e))
  }
}

// v.1.2.6 (E): tutup modal input + reset panel sukses
function tutupModalInput() {
  modalInputOpen.value = false
  editingId.value = null
  savedKas.value = null
}

// v.21.99.0527: super_admin only — buka modal edit, prefill dari record
function bukaEditBuku(b) {
  if (!isAdmin.value) return
  savedKas.value = null
  editingId.value = String(b.id)
  inputForm.tanggal = b.tanggal || todayJakarta()
  inputForm.tipe = b.tipe || (Number(b.masuk) > 0 ? 'masuk' : 'keluar')
  // v.1.2.7: cara bayar — baris lama tanpa field metode disimpulkan dari sumber
  inputForm.metode = metodeTransaksi(b)
  inputForm.kategori = b.kategori || ''
  inputForm.keterangan = b.keterangan || ''
  inputForm.nominal = Number(b.nominal || b.masuk || b.keluar || 0)
  modalInputOpen.value = true
}

async function simpanInputManual() {
  if (!inputForm.keterangan.trim()) {
    toast.warning('Keterangan wajib diisi')
    return
  }
  if (!inputForm.nominal || inputForm.nominal <= 0) {
    toast.warning('Nominal harus > 0')
    return
  }
  savingInput.value = true
  try {
    // v.21.99.0527: mode edit (super_admin) vs create
    if (editingId.value) {
      const upd = {
        tanggal: inputForm.tanggal,
        tipe: inputForm.tipe,
        metode: inputForm.metode || 'Tunai',
        kategori: inputForm.kategori.trim() || 'Manual',
        keterangan: inputForm.keterangan.trim(),
        nominal: Number(inputForm.nominal) || 0
      }
      upd.masuk = upd.tipe === 'masuk' ? upd.nominal : 0
      upd.keluar = upd.tipe === 'keluar' ? upd.nominal : 0
      await updateOne('keuangan_buku_induk', editingId.value, upd)
      toast.success('Transaksi diperbarui')
      modalInputOpen.value = false
      editingId.value = null
    } else {
      const id = `bi_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
      const payload = {
        id,
        tanggal: inputForm.tanggal,
        tipe: inputForm.tipe,
        metode: inputForm.metode || 'Tunai',
        kategori: inputForm.kategori.trim() || 'Manual',
        keterangan: inputForm.keterangan.trim(),
        nominal: Number(inputForm.nominal) || 0,
        sumber: 'manual',
        // v.111: kas manual masuk ke gedung admin pencatat ('' utk super_admin = level induk)
        gedung: myGedung.value || '',
        operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
        createdAt: serverTimestamp()
      }
      if (inputForm.tipe === 'masuk') payload.masuk = payload.nominal
      else payload.keluar = payload.nominal
      await setOne('keuangan_buku_induk', id, payload)
      toast.success('Transaksi tersimpan')
      // v.1.2.6 (E): tampil panel sukses + tawarkan cetak struk (modal tetap terbuka)
      savedKas.value = payload
      editingId.value = null
    }
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingInput.value = false
  }
}

async function cetakLaporan() {
  // v.21.25.0526: jsPDF + autoTable (drop window.print)
  try {
    const settingsObj = settingsStore?.settings || {}
    const kop = buildKopFromSettings(settingsObj)
    // v.1.2.6 (D): pakai buildExportRows (saldo berjalan + baris TOTAL) lalu format Rp utk PDF.
    const rows = buildExportRows().map((r) => ({
      no: r.no,
      tanggal: r.tanggal ? formatTgl(r.tanggal) : '',
      keterangan: r.keterangan,
      tipe: r.tipe,
      metode: r.metode || '',
      masuk: r.masuk ? fmtRp(r.masuk) : '',
      keluar: r.keluar ? fmtRp(r.keluar) : '',
      saldo: r.saldo != null ? fmtRp(r.saldo) : ''
    }))
    // v.1.2.7: judul ikut periode aktif — termasuk tanggal saat filter harian dipakai
    const periode = periodeLabel.value
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: `BUKU INDUK KEUANGAN — ${periode}`,
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'tanggal', header: 'Tanggal', width: 26 },
        { key: 'keterangan', header: 'Keterangan', width: 70 },
        { key: 'tipe', header: 'Tipe', width: 20 },
        { key: 'metode', header: 'Cara Bayar', width: 24 },
        { key: 'masuk', header: 'Masuk', width: 30 },
        { key: 'keluar', header: 'Keluar', width: 30 },
        { key: 'saldo', header: 'Saldo', width: 30 }
      ],
      rows,
      filename: `buku-induk-${periodeSlug.value}.pdf`
    })
    toast.success('PDF buku induk berhasil dibuat')
  } catch (e) {
    toast.error('Gagal cetak: ' + (e?.message || e))
  }
}

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

const filteredBuku = computed(() => {
  // v.21.96.0527: Defensive — exclude residu tabungan dari buku induk.
  let list = bukuRaw.value.filter((b) => {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    if (kat === 'tabungan' || sumber === 'tabungan' || sumber.includes('tabungan')) return false
    return true
  })
  // v.111: scope Gedung — admin keuangan ber-gedung hanya lihat baris gedungnya (Buku Kas)
  if (gedungScoped.value) list = list.filter(allowRow)
  // Filter by year/month (+ v.1.2.7: tanggal, utk laporan harian)
  if (selectedMonth.value > 0) {
    const ym = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
    const tgl = selectedDay.value > 0 ? `${ym}-${String(selectedDay.value).padStart(2, '0')}` : ''
    list = tgl
      ? list.filter((b) => String(b.tanggal || '').substring(0, 10) === tgl)
      : list.filter((b) => String(b.tanggal || '').substring(0, 7) === ym)
  } else {
    list = list.filter((b) => String(b.tanggal || '').startsWith(String(selectedYear.value)))
  }
  // v.1.2.7: cara bayar
  if (filterMetode.value) {
    list = list.filter((b) => metodeTransaksi(b) === filterMetode.value)
  }
  // Tipe
  if (filterTipe.value) {
    list = list.filter((b) => {
      if (filterTipe.value === 'masuk') return b.tipe === 'masuk' || Number(b.masuk) > 0
      if (filterTipe.value === 'keluar') return b.tipe === 'keluar' || Number(b.keluar) > 0
      return true
    })
  }
  // Search
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (b) =>
        String(b.keterangan || '')
          .toLowerCase()
          .includes(kw) ||
        String(b.kategori || '')
          .toLowerCase()
          .includes(kw) ||
        String(b.ref_id || '')
          .toLowerCase()
          .includes(kw)
    )
  }
  return list.sort(
    (a, b) =>
      (b.tanggal || '').localeCompare(a.tanggal || '') || (b.id || '').localeCompare(a.id || '')
  )
})

const stats = computed(() => {
  let masuk = 0,
    keluar = 0
  for (const b of filteredBuku.value) {
    if (b.tipe === 'masuk' || Number(b.masuk) > 0) {
      masuk += Number(b.masuk || b.nominal) || 0
    }
    if (b.tipe === 'keluar' || Number(b.keluar) > 0) {
      keluar += Number(b.keluar || b.nominal) || 0
    }
  }
  return { pemasukan: masuk, pengeluaran: keluar, saldo: masuk - keluar }
})

// v.1.2.6: saldo BERJALAN all-time per record (kolom Saldo + ekspor). Basis = ledger riil
//   (tanpa residu/tabungan) dalam scope Gedung, urut kronologis naik. Filter-independent:
//   nilai = saldo kumulatif setelah transaksi itu, apa pun filter bulan/tipe yang aktif.
const saldoMap = computed(() => {
  let base = bukuRaw.value.filter((b) => {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    if (kat === 'tabungan' || sumber === 'tabungan' || sumber.includes('tabungan')) return false
    return /^\d{4}-\d{2}/.test(String(b.tanggal || '').trim())
  })
  if (gedungScoped.value) base = base.filter(allowRow)
  base = base
    .slice()
    .sort(
      (a, b) =>
        (a.tanggal || '').localeCompare(b.tanggal || '') || (a.id || '').localeCompare(b.id || '')
    )
  const map = new Map()
  let saldo = 0
  for (const b of base) {
    const masuk = b.tipe === 'masuk' || Number(b.masuk) > 0 ? Number(b.masuk || b.nominal) || 0 : 0
    const keluar =
      b.tipe === 'keluar' || Number(b.keluar) > 0 ? Number(b.keluar || b.nominal) || 0 : 0
    saldo += masuk - keluar
    map.set(String(b.id), saldo)
  }
  return map
})
function saldoOf(b) {
  return saldoMap.value.get(String(b.id)) ?? 0
}

const years = computed(() => {
  const now = new Date().getFullYear()
  return [now - 2, now - 1, now, now + 1]
})

// v.1.2.7: label periode aktif — dipakai header, judul PDF/Excel, & nama berkas.
//   "3 Agustus 2026" | "Agustus 2026" | "Tahun 2026"
const periodeLabel = computed(() => {
  if (selectedMonth.value === 0) return `Tahun ${selectedYear.value}`
  const bulan = `${BULAN[selectedMonth.value - 1]} ${selectedYear.value}`
  return selectedDay.value > 0 ? `${selectedDay.value} ${bulan}` : bulan
})
// nama berkas ekspor: buku-induk-2026-08-03 / 2026-08 / 2026
const periodeSlug = computed(() => {
  const y = String(selectedYear.value)
  if (selectedMonth.value === 0) return y
  const ym = `${y}-${String(selectedMonth.value).padStart(2, '0')}`
  return selectedDay.value > 0 ? `${ym}-${String(selectedDay.value).padStart(2, '0')}` : ym
})

// v.1.2.7: subtotal tunai vs transfer atas baris yang sedang tampil (dasar laporan harian)
const rekapMetode = computed(() => ringkasMetode(filteredBuku.value))

onMounted(() => {
  unsub = subscribeColl('keuangan_buku_induk', (docs) => {
    bukuRaw.value = docs
    loading.value = false
  })
})
onUnmounted(() => {
  if (unsub) {
    try {
      unsub()
    } catch (e) {}
  }
})

// v.1.2.6 (D): baris ekspor buku induk — saldo BERJALAN per baris (saldoOf) + baris TOTAL
//   (jumlah masuk/keluar & net periode) di akhir. Dipakai Excel + Google Sheet.
function buildExportRows() {
  const list = filteredBuku.value || []
  let totMasuk = 0,
    totKeluar = 0
  const rows = list.map((b, i) => {
    const masuk = Number(b.masuk || (b.tipe === 'masuk' ? b.nominal : 0) || 0)
    const keluar = Number(b.keluar || (b.tipe === 'keluar' ? b.nominal : 0) || 0)
    totMasuk += masuk
    totKeluar += keluar
    return {
      no: i + 1,
      tanggal: b.tanggal || '',
      no_struk: b.no_struk || b.trx_id || '',
      keterangan: b.keterangan || b.deskripsi || '',
      kategori: b.kategori || '',
      tipe: b.tipe || (Number(b.masuk) > 0 ? 'Masuk' : 'Keluar'),
      // v.1.2.7: cara bayar — kasir perlu memisahkan uang laci dari uang rekening
      metode: metodeTransaksi(b),
      masuk,
      keluar,
      saldo: saldoOf(b)
    }
  })
  // v.1.2.7: subtotal per cara bayar SEBELUM baris TOTAL — inti laporan harian kas.
  const rk = ringkasMetode(list)
  for (const m of METODE_OPTS) {
    if (rk[m].masuk === 0 && rk[m].keluar === 0) continue
    rows.push({
      no: '',
      tanggal: '',
      no_struk: '',
      keterangan: `SUBTOTAL ${m.toUpperCase()}`,
      kategori: '',
      tipe: '',
      metode: m,
      masuk: rk[m].masuk,
      keluar: rk[m].keluar,
      saldo: rk[m].masuk - rk[m].keluar
    })
  }
  rows.push({
    no: '',
    tanggal: '',
    no_struk: '',
    keterangan: `TOTAL (${list.length} transaksi)`,
    kategori: '',
    tipe: '',
    metode: '',
    masuk: totMasuk,
    keluar: totKeluar,
    saldo: totMasuk - totKeluar
  })
  return rows
}

// v.21+: Export Excel Buku Induk Keuangan (kolom: no, tanggal, no_struk, keterangan, kategori, tipe, masuk, keluar, saldo)
const exportingBI = ref(false)
async function exportBukuIndukExcel() {
  if (exportingBI.value) return
  exportingBI.value = true
  try {
    const rows = buildExportRows()
    const s = settingsStore.settings || {}
    await exportStyled(rows, {
      // v.1.2.7: nama berkas & subjudul ikut periode yang difilter (harian/bulanan/tahunan)
      filename: `buku_induk_${periodeSlug.value}.xlsx`,
      sheetName: 'Buku Induk',
      kop: [
        s.kopLine1 || '',
        s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
        s.kopLine3 || '',
        s.kopLine4 || ''
      ],
      subtitle: `Buku Induk Keuangan — ${periodeLabel.value} — ${filteredBuku.value.length} transaksi`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'tanggal', header: 'Tanggal', width: 12 },
        { key: 'no_struk', header: 'No Struk', width: 14 },
        { key: 'keterangan', header: 'Keterangan', width: 32 },
        { key: 'kategori', header: 'Kategori', width: 16 },
        { key: 'tipe', header: 'Tipe', width: 10 },
        { key: 'metode', header: 'Cara Bayar', width: 12 },
        { key: 'masuk', header: 'Masuk', width: 14 },
        { key: 'keluar', header: 'Keluar', width: 14 },
        { key: 'saldo', header: 'Saldo', width: 14 }
      ]
    })
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    exportingBI.value = false
  }
}

// v.100 Batch12: kirim Buku Induk ke Google Sheet (reuse rows + kolom yang sama dgn Excel)
async function kirimBukuGsheet() {
  if (sendingGsheet.value) return
  if (!gsheetConfigured()) {
    toast.warning('Google Sheet belum diatur. Buka Pengaturan → Google Sheet dulu.')
    return
  }
  sendingGsheet.value = true
  try {
    const rows = buildExportRows()
    const s = settingsStore.settings || {}
    const { url } = await sendToSheet({
      rows,
      title: `Buku Induk ${periodeLabel.value}`,
      sheetName: 'Buku Induk',
      kop: [
        s.kopLine1 || '',
        s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
        s.kopLine3 || '',
        s.kopLine4 || ''
      ].filter(Boolean),
      subtitle: `Buku Induk Keuangan — ${periodeLabel.value} — ${filteredBuku.value.length} transaksi`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'tanggal', header: 'Tanggal', width: 12 },
        { key: 'no_struk', header: 'No Struk', width: 14 },
        { key: 'keterangan', header: 'Keterangan', width: 32 },
        { key: 'kategori', header: 'Kategori', width: 16 },
        { key: 'tipe', header: 'Tipe', width: 10 },
        { key: 'metode', header: 'Cara Bayar', width: 12 },
        { key: 'masuk', header: 'Masuk', width: 14 },
        { key: 'keluar', header: 'Keluar', width: 14 },
        { key: 'saldo', header: 'Saldo', width: 14 }
      ]
    })
    toast.success(`${filteredBuku.value.length} transaksi terkirim ke Google Sheet.`)
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

// v.98 full-native (Electron): header in-page disembunyikan, aksi -> grup pita "Aksi Halaman"
const { isElectron: isDesktop } = useDesktopShell()
definePageActions(() => {
  if (!isFullAccess.value) return []
  return [
    { label: 'Input Manual', icon: 'plus', primary: true, on: () => bukaModalInput() },
    {
      label: 'Ekspor Excel',
      icon: 'download',
      on: exportBukuIndukExcel,
      disabled: exportingBI.value
    },
    ...(gsheetConfigured()
      ? [
          {
            label: 'Google Sheet',
            icon: 'file',
            on: kirimBukuGsheet,
            disabled: sendingGsheet.value
          }
        ]
      : []),
    { label: 'Cetak Laporan', icon: 'printer', on: cetakLaporan }
  ]
})
</script>
