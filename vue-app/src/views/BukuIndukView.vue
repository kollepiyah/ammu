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
              @click="cetakLaporan()"
            >
              <i class="fas fa-file-pdf"></i>Cetak Laporan
            </button>
            <!-- v.1.2.6 (Kyai): berkas TERPISAH per cara bayar — uang laci dicocokkan ke
                 satu kertas, mutasi rekening ke kertas lain, setiap hari. -->
            <button
              aria-label="Cetak laporan transaksi tunai PDF"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer"
              @click="cetakLaporan('Tunai')"
            >
              <i class="fas fa-money-bill"></i>PDF Tunai
            </button>
            <button
              aria-label="Cetak laporan transaksi transfer PDF"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition cursor-pointer"
              @click="cetakLaporan('Transfer')"
            >
              <i class="fas fa-building-columns"></i>PDF Transfer
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
          <!-- Kartu ini dulu berlabel "Saldo Akhir" padahal isinya masuk − keluar PERIODE
               INI saja — salah satu sebab "total saldonya tidak jelas". Sekarang namanya
               jujur, dan saldo akhir yang sesungguhnya ditampilkan di bawahnya. -->
          <div class="p-3 rounded-xl border-l-4 bg-cyan-50 border-cyan-500">
            <p class="text-[10px] font-bold uppercase text-cyan-700">Selisih Periode</p>
            <p class="text-base md:text-lg font-black mt-1 text-cyan-800">
              {{ fmtRp(stats.saldo) }}
            </p>
            <p class="text-[9px] text-cyan-700/80 mt-0.5">masuk &minus; keluar</p>
          </div>
        </div>
        <!-- Saldo kas menurut penyaring yang sedang aktif — angka yang sama persis dengan
             baris SALDO AWAL/TOTAL di PDF & Excel, jadi layar dan kertas tak bisa beda. -->
        <div
          class="mt-2 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50/60 dark:bg-cyan-900/20 px-3 py-2 flex flex-wrap items-baseline gap-x-4 gap-y-1"
        >
          <span class="text-[10px] font-bold uppercase text-cyan-800 dark:text-cyan-300">
            Saldo awal
            <b class="font-mono font-black ml-1">{{ fmtRp(saldoAwalPeriode) }}</b>
          </span>
          <span class="text-[10px] font-bold uppercase text-cyan-800 dark:text-cyan-300">
            Saldo akhir
            <b class="font-mono font-black ml-1">{{ fmtRp(saldoAkhirPeriode) }}</b>
          </span>
          <span class="text-[10px] text-[var(--text-secondary)]">
            {{
              adaPenyaringKas ? 'mengikuti penyaring yang aktif' : 'seluruh kas, tanpa penyaring'
            }}
          </span>
        </div>
        <!-- v.1.2.6: pisah uang laci vs rekening — inti laporan kas harian -->
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
        <!-- v.1.2.6 (Kyai): kas tiap lembaga sendiri-sendiri. Ikut tanggal & cara bayar
             yang aktif, TIDAK ikut filter lembaga — jadi tetap terlihat utuh sambil
             menyaring satu lembaga. Klik baris = saring ke lembaga itu. -->
        <div v-if="rekapLembaga.length > 1" class="mt-3">
          <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5">
            <i class="fas fa-sitemap mr-1"></i>Kas per lembaga · {{ periodeLabel }}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <button
              v-for="o in rekapLembaga"
              :key="`kl_${o.kunci || 'induk'}`"
              type="button"
              :class="[
                'text-left p-2.5 rounded-xl border transition',
                filterLembaga === (o.kunci || KAS_INDUK)
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] hover:border-cyan-300'
              ]"
              @click="
                filterLembaga = filterLembaga === (o.kunci || KAS_INDUK) ? '' : o.kunci || KAS_INDUK
              "
            >
              <p class="text-[11px] font-black text-[var(--text-primary)] truncate">
                {{ o.lembaga || 'Kas Induk / Yayasan' }}
              </p>
              <p class="text-sm font-black text-cyan-700 dark:text-cyan-300 mt-0.5">
                {{ fmtRp(o.saldo) }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                masuk {{ fmtRp(o.masuk) }} · keluar {{ fmtRp(o.keluar) }} · {{ o.jumlah }} trx
              </p>
            </button>
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
                <!-- v.1.2.6: cara bayar dicatat eksplisit — laporan harian memisahkan
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
                <!-- v.1.2.6 (Kyai): kas per lembaga. Kategori kas manual itu teks bebas
                     (tak ada jenis pembayaran), jadi lembaganya ditunjuk di sini —
                     mis. beli papan tulis SDI dibebankan ke kas SDI. -->
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Masuk Kas Lembaga</label
                  >
                  <select
                    v-model="inputForm.lembaga"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  >
                    <option value="">Kas Induk / Yayasan</option>
                    <option
                      v-for="o in lembagaOpsi"
                      :key="`kas_${o.nama}`"
                      :value="o.nama"
                      :title="o.ket"
                    >
                      {{ o.nama }}{{ o.ket ? ` — ${o.ket}` : '' }}
                    </option>
                  </select>
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
        <!-- v.1.2.6: 7 penyaring (tahun/bulan/tgl/lembaga/tipe/cara bayar/cari) — 2 baris di
             lg, satu baris penuh mulai xl. -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2">
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
          <!-- v.1.2.6: filter HARIAN — dasar laporan kas harian. Nonaktif kalau bulan
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
          <!-- Kyai 5 Agu 2026: "Pos yg lain (tabungan wajib, uang buku, uang kegiatan) itu
               terpisah pencatatannya dari buku induk. atau dibuat filter pos saja, biar
               ekspor pdf laporannya mudah." Filter ini menyaring SEMUA yang mengalir dari
               daftar tersaring: kartu ringkasan, saldo, PDF, Excel, dan Google Sheet.
               "Kas Umum" = baris tanpa tag pos, yaitu buku induk murni. -->
          <select
            v-model="filterPos"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option v-for="o in opsiPos" :key="`fp_${o.key || 'all'}`" :value="o.key">
              {{ o.label }}
            </option>
          </select>
          <!-- v.1.2.6 (Kyai): filter kas lembaga. Opsinya dari lembaga yang BENAR-BENAR
               punya baris di periode ini + Kas Induk — bukan seluruh master, supaya
               tak penuh pilihan yang selalu kosong. -->
          <select
            v-model="filterLembaga"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua lembaga</option>
            <option
              v-for="o in rekapLembaga"
              :key="`fl_${o.kunci || 'induk'}`"
              :value="o.kunci || KAS_INDUK"
            >
              {{ o.lembaga || 'Kas Induk' }} ({{ o.jumlah }})
            </option>
          </select>
          <!-- v.1.2.6: filter cara bayar (tunai/transfer) -->
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
        <!-- v.1.2.6: pintasan hari ini — laporan harian sekali klik -->
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

      <!-- Kyai 6 Agu 2026: transaksi sebelum fitur Pos (5 Agu) tak bertag, jadi Tabungan
           Wajib & Uang Buku lama ikut terbaca sebagai Kas Umum. Banner ini hilang sendiri
           begitu tak ada lagi yang perlu ditandai. -->
      <div
        v-if="isAdmin && kandidatRetagPos.length > 0"
        class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl px-4 py-3 flex items-center justify-between gap-2 flex-wrap"
      >
        <div>
          <p class="text-xs font-bold text-indigo-800 dark:text-indigo-300">
            <i class="fas fa-tags mr-1"></i>{{ kandidatRetagPos.length }} transaksi lama belum
            bertag Pos Dana — ikut terhitung sebagai Kas Umum
          </p>
          <p class="text-[10px] text-indigo-700/80 dark:text-indigo-400 mt-0.5">
            <span v-for="(r, i) in ringkasRetagPos" :key="r.pos">
              <span v-if="i">&nbsp;·&nbsp;</span>{{ r.label }}: {{ r.jumlah }}
            </span>
          </p>
        </div>
        <button
          type="button"
          :disabled="retagBerjalan"
          class="text-[11px] font-black bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg"
          @click="tandaiUlangPos"
        >
          <i :class="['fas mr-1', retagBerjalan ? 'fa-spinner fa-spin' : 'fa-tags']"></i>
          {{ retagBerjalan ? 'Menandai…' : 'Tandai ulang pos' }}
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
              ? 'md:grid-cols-[32px_88px_minmax(0,1fr)_120px_120px_132px_auto]'
              : 'md:grid-cols-[88px_minmax(0,1fr)_120px_120px_132px_auto]'
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
          <span aria-hidden="true"></span>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="b in filteredBuku"
            :key="b.id"
            :class="[
              'px-4 py-2.5 md:grid gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition',
              isAdmin
                ? 'md:grid-cols-[32px_88px_minmax(0,1fr)_120px_120px_132px_auto]'
                : 'md:grid-cols-[88px_minmax(0,1fr)_120px_120px_132px_auto]'
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
                <!-- v.1.2.6: penanda cara bayar (tunai = uang laci, transfer = rekening) -->
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
                class="text-sm font-black text-emerald-700 whitespace-nowrap"
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
                class="text-sm font-black text-rose-700 whitespace-nowrap"
              >
                {{ fmtRp(b.keluar || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
            </div>
            <!-- v.1.2.6: Saldo berjalan. v.1.2.10 (Kyai, 6 Agu 2026): tombol aksi
                 DIPINDAH ke kolomnya sendiri. Dulu angka saldo + sampai 4 tombol berdesakan
                 dalam 150px, dan karena angkanya `whitespace-nowrap` ia meluber ke KIRI
                 menimpa kolom Keluar — terbaca sebagai "Rp 370.000" bertindih
                 "Rp -14.759.000". Saldo bisa MINUS + berdigit banyak, jadi kolomnya memang
                 tak boleh berbagi tempat dengan tombol. -->
            <div class="mt-1 md:mt-0 md:text-right">
              <span class="md:hidden text-[10px] text-[var(--text-tertiary)] font-bold mr-1"
                >Saldo:</span
              >
              <span class="text-sm font-bold text-cyan-700 dark:text-cyan-400 whitespace-nowrap">
                {{ fmtRp(saldoOf(b)) }}
              </span>
            </div>
            <div class="mt-1 md:mt-0 flex items-center md:justify-end gap-1 shrink-0">
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
  subscribeDoc,
  setOne,
  updateOne,
  mergeOne,
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
// v.1.2.6: cara bayar (tunai/transfer) utk kolom + filter + subtotal laporan harian
import { metodeTransaksi, ringkasMetode, METODE_OPTS } from '@/utils/metodeBayar'
// v.1.2.6 (Kyai): kas per lembaga — resolver & rekap di utils/kasLembaga (sumber tunggal)
import {
  petaKasLembaga,
  opsiKasLembaga,
  kasLembagaBaris,
  ringkasKasLembaga,
  kunciLembaga
} from '@/utils/kasLembaga'
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
// Pos dana (Uang Kegiatan/Buku/Tabungan Wajib) — sumber tunggal aturan & labelnya.
import { cocokPos, opsiFilterPos, labelFilterPos, posDari, labelPos } from '@/utils/posDana'
// Saldo berjalan & susunan baris laporan — dipisah ke util murni supaya bisa diuji
//   (kolom Saldo yang lepas dari filter adalah keluhan Kyai 6 Agu 2026).
import {
  petaSaldoBerjalan,
  saldoAwalSebelum,
  bangunBarisLaporan,
  nominalMasuk,
  nominalKeluar
} from '@/utils/bukuIndukLaporan'
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'
// v.21.103.0527: reprint struk dari BukuInduk untuk record sumber pos_santri
// v.1.2.6: cetakStrukKasPdf = struk BUKTI KAS MASUK/KELUAR untuk transaksi manual
import { cetakStrukPdf, cetakStrukSlipPdf, cetakStrukKasPdf } from '@/utils/strukBuilder'
// v.1.2.6: satu struk = satu TRANSAKSI (nomor struk lama bisa kembar antar santri)
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
    // Fetch semua record dengan trx_id sama, lalu v.1.2.6: saring ke TRANSAKSI baris ini
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
// v.1.2.6: filter harian (0 = semua tanggal) + cara bayar — untuk laporan kas harian
const selectedDay = ref(0)
const filterMetode = ref('')
const filterTipe = ref('')
// v.1.2.6 (Kyai): filter kas lembaga. Nilainya KUNCI ternormalisasi (kunciLembaga),
//   bukan nama mentah — sekolah kustom ditulis campur ("Kelas Baca") dan pernah
//   membuat filter lembaga kosong tanpa suara. '' = semua lembaga.
const filterLembaga = ref('')
// '' = semua pos. POS_UMUM = hanya baris tanpa tag (buku induk murni).
const filterPos = ref('')
const opsiPos = computed(() => opsiFilterPos(bukuPeriode.value))
// Penanda pos untuk judul & nama berkas ekspor — tanpa ini laporan "Uang Kegiatan" dan
//   laporan kas umum bulan yang sama terbit dengan nama yang sama persis.
function judulPosSuffix() {
  const l = labelFilterPos(filterPos.value)
  return l ? ` — ${l}` : ''
}
function slugPosBerkas() {
  const l = labelFilterPos(filterPos.value)
  return l ? '_' + l.toLowerCase().replace(/[^a-z0-9]+/g, '_') : ''
}
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
// ── Tandai ulang Pos Dana untuk transaksi lama (Kyai, 6 Agu 2026) ────────────
// Filter Pos baru lahir 5 Agu, sedangkan transaksi sebelum itu ditulis tanpa tag `pos`.
// Akibatnya baris Tabungan Wajib/Uang Buku/Uang Kegiatan yang lama ikut terbaca sebagai
// "Kas Umum" — laporan kas umum jadi tercampur dana terikat, persis yang terlihat di
// berkas 3 Agu yang Kyai kirim.
//
// Penandaan memakai jalur yang SAMA dengan POS: kategori baris dicocokkan ke label jenis
// pembayaran, lalu pos jenis itu yang dipakai. Jadi hasilnya tak bisa berbeda dari yang
// ditulis kasir hari ini. Baris yang SUDAH bertag tak pernah disentuh.
const petaPosJenis = computed(() => {
  const peta = new Map()
  for (const j of settingsStore.settings?.keuTagihanJenis || []) {
    const label = String(j?.label || '')
      .trim()
      .toLowerCase()
    const pos = String(j?.pos || '').trim()
    if (label && pos) peta.set(label, pos)
  }
  return peta
})

// Baris tanpa tag pos yang kategorinya cocok dengan jenis ber-pos → kandidat.
const kandidatRetagPos = computed(() => {
  if (!isAdmin.value || petaPosJenis.value.size === 0) return []
  const out = []
  for (const b of bukuRaw.value) {
    if (posDari(b)) continue
    const kat = String(b.kategori || '')
      .trim()
      .toLowerCase()
    const pos = kat && petaPosJenis.value.get(kat)
    if (pos) out.push({ baris: b, pos })
  }
  return out
})

// Rincian per pos untuk pratinjau — Kyai harus tahu APA yang akan berubah sebelum
// menyetujui, bukan cuma jumlah barisnya.
const ringkasRetagPos = computed(() => {
  const per = new Map()
  for (const { baris, pos } of kandidatRetagPos.value) {
    if (!per.has(pos)) per.set(pos, { pos, label: labelPos(pos), jumlah: 0, nominal: 0 })
    const r = per.get(pos)
    r.jumlah++
    r.nominal += nominalMasuk(baris) - nominalKeluar(baris)
  }
  return [...per.values()].sort((a, b) => b.jumlah - a.jumlah)
})

const retagBerjalan = ref(false)
async function tandaiUlangPos() {
  if (!isAdmin.value || retagBerjalan.value) return
  const kandidat = kandidatRetagPos.value
  if (!kandidat.length) {
    toast.info('Tidak ada transaksi lama yang perlu ditandai.')
    return
  }
  const rincian = ringkasRetagPos.value
    .map((r) => `  • ${r.label}: ${r.jumlah} baris (${fmtRp(r.nominal)})`)
    .join('\n')
  if (
    !confirm(
      `Tandai ulang Pos Dana untuk ${kandidat.length} transaksi lama?\n\n${rincian}\n\n` +
        'Baris yang sudah punya pos TIDAK disentuh, dan nominalnya tak diubah sama sekali — ' +
        'yang ditambahkan hanya tag pos, supaya laporan Kas Umum tak lagi tercampur dana terikat.'
    )
  )
    return
  retagBerjalan.value = true
  let ok = 0
  let fail = 0
  try {
    for (const { baris, pos } of kandidat) {
      try {
        // mergeOne, BUKAN setOne: setOne menimpa seluruh baris tanpa merge dan akan
        // membuang kolom lain (nominal, keterangan, trx_id) dari transaksi keuangan riil.
        await mergeOne('keuangan_buku_induk', String(baris.id), { pos })
        ok++
      } catch (e) {
        fail++
        console.warn('[tandaiUlangPos]', baris.id, e.message)
      }
    }
    await writeAuditLog({
      operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
      action: 'retag_pos_dana',
      target: 'keuangan_buku_induk',
      ids: kandidat.map(({ baris }) => String(baris.id)),
      detail: { ok, fail, per_pos: ringkasRetagPos.value }
    })
    if (fail > 0) toast.warning(`${ok} transaksi ditandai, ${fail} gagal — cek console`)
    else toast.success(`${ok} transaksi lama kini bertag pos`)
  } finally {
    retagBerjalan.value = false
  }
}

const inputForm = reactive({
  tanggal: todayJakarta(),
  tipe: 'masuk',
  metode: 'Tunai', // v.1.2.6: cara bayar kas manual
  kategori: '',
  lembaga: '', // v.1.2.6: kas lembaga tujuan ('' = Kas Induk/Yayasan)
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
  inputForm.lembaga = ''
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
  // v.1.2.6: cara bayar — baris lama tanpa field metode disimpulkan dari sumber
  inputForm.metode = metodeTransaksi(b)
  inputForm.kategori = b.kategori || ''
  inputForm.lembaga = b.lembaga || ''
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
        // v.1.2.6: kas lembaga. '' = Kas Induk — sengaja DITULIS (bukan dilewati) supaya
        //   koreksi bisa memindahkan baris kembali ke Kas Induk.
        lembaga: String(inputForm.lembaga || '').trim(),
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
        // v.1.2.6 (Kyai): kas lembaga tujuan; '' = Kas Induk/Yayasan
        lembaga: String(inputForm.lembaga || '').trim(),
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

// v.1.2.6 (Kyai): cetak laporan. `metodeOnly` = 'Tunai' | 'Transfer' menghasilkan
//   BERKAS TERSENDIRI berisi metode itu saja — Kyai mencocokkan uang laci dengan satu
//   kertas dan mutasi rekening dengan kertas lain setiap hari. Kosong = apa adanya
//   (mengikuti penyaring yang aktif, termasuk lembaga & tanggal).
async function cetakLaporan(metodeOnly = '') {
  // v.21.25.0526: jsPDF + autoTable (drop window.print)
  try {
    const settingsObj = settingsStore?.settings || {}
    const kop = buildKopFromSettings(settingsObj)
    const list = metodeOnly
      ? (filteredBuku.value || []).filter((b) => metodeTransaksi(b) === metodeOnly)
      : filteredBuku.value || []
    if (!list.length) {
      toast.warning(
        metodeOnly
          ? `Tidak ada transaksi ${metodeOnly} pada filter ini.`
          : 'Tidak ada transaksi pada filter ini.'
      )
      return
    }
    // v.1.2.6 (D): pakai buildExportRows (saldo berjalan + baris TOTAL) lalu format Rp utk PDF.
    const rows = buildExportRows(list, { metodeOnly }).map((r) => ({
      no: r.no,
      tanggal: r.tanggal ? formatTgl(r.tanggal) : '',
      keterangan: r.keterangan,
      tipe: r.tipe,
      metode: r.metode || '',
      masuk: r.masuk ? fmtRp(r.masuk) : '',
      keluar: r.keluar ? fmtRp(r.keluar) : '',
      saldo: r.saldo != null ? fmtRp(r.saldo) : ''
    }))
    // v.1.2.6: judul ikut periode aktif — termasuk tanggal saat filter harian dipakai,
    //   lembaga kas yang disaring, dan metode kalau ini berkas Tunai/Transfer.
    const periode = periodeLabel.value
    const bagian = [periode]
    // Pos ikut disebut di judul & nama berkas: laporan "Uang Kegiatan" dan laporan kas
    //   umum bulan yang sama akan bernama sama persis kalau tidak dibedakan di sini.
    const labelPosAktif = labelFilterPos(filterPos.value)
    if (labelPosAktif) bagian.push(labelPosAktif)
    if (labelLembagaAktif.value) bagian.push(labelLembagaAktif.value)
    if (metodeOnly) bagian.push(metodeOnly.toUpperCase())
    const judul = bagian.join(' — ')
    const slugMetode = metodeOnly ? `-${metodeOnly.toLowerCase()}` : ''
    const slugPos = labelPosAktif
      ? '-' + labelPosAktif.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : ''
    const slugLemb = labelLembagaAktif.value
      ? '-' + labelLembagaAktif.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : ''
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: `BUKU INDUK KEUANGAN — ${judul}`,
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
      filename: `buku-induk-${periodeSlug.value}${slugPos}${slugLemb}${slugMetode}.pdf`
    })
    toast.success(
      metodeOnly ? `PDF buku induk ${metodeOnly} berhasil dibuat` : 'PDF buku induk berhasil dibuat'
    )
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

// v.1.2.6 (Kyai): kas per lembaga. Peta jenis → lembaga; resolvernya di
//   utils/kasLembaga (sumber tunggal, dipakai POS juga). Baris LAMA tak punya tag
//   `lembaga` dan diturunkan di sini — tak ada data yang ditulis ulang.
const petaKas = computed(() => petaKasLembaga(settingsStore.settings?.keuTagihanJenis || []))
function kasLembagaDari(b) {
  return kasLembagaBaris(b, petaKas.value)
}

// KAS_INDUK: sentinel nilai filter untuk "Kas Induk". Kunci lembaganya '' dan itu
//   sudah dipakai "Semua lembaga", jadi Kas Induk butuh nilai sendiri.
const KAS_INDUK = '__induk__'

// Ledger sah dalam scope gedung, TANPA batas periode. Jadi basis dua hal sekaligus:
//   baris yang tampil (setelah dibatasi periode) dan saldo berjalan (yang justru harus
//   kumulatif sejak transaksi pertama). Dulu keduanya menyalin penyaring masing-masing,
//   dan di situlah kolom Saldo lepas dari filter yang sedang aktif.
const ledgerScope = computed(() => {
  // v.21.96.0527: Defensive — exclude residu tabungan dari buku induk.
  let list = bukuRaw.value.filter((b) => {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    if (kat === 'tabungan' || sumber === 'tabungan' || sumber.includes('tabungan')) return false
    return true
  })
  // v.111: scope Gedung — admin keuangan ber-gedung hanya lihat baris gedungnya (Buku Kas)
  if (gedungScoped.value) list = list.filter(allowRow)
  return list
})

// Penyaring NON-periode & NON-lembaga: pos, cara bayar, tipe, pencarian.
function lolosPenyaringUmum(b) {
  // Pos dana (Kyai 5 Agu 2026) — disaring PALING AWAL supaya kartu rekap lembaga, saldo,
  //   dan seluruh ekspor ikut terbatas pada pos yang dipilih. "Kas Umum" = buku induk
  //   murni, tanpa dana terikat (Uang Kegiatan/Buku/Tabungan Wajib).
  if (filterPos.value && !cocokPos(b, filterPos.value)) return false
  // v.1.2.6: cara bayar
  if (filterMetode.value && metodeTransaksi(b) !== filterMetode.value) return false
  // Tipe
  if (filterTipe.value === 'masuk' && !(b.tipe === 'masuk' || Number(b.masuk) > 0)) return false
  if (filterTipe.value === 'keluar' && !(b.tipe === 'keluar' || Number(b.keluar) > 0)) return false
  // Search
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    const cocok =
      String(b.keterangan || '')
        .toLowerCase()
        .includes(kw) ||
      String(b.kategori || '')
        .toLowerCase()
        .includes(kw) ||
      String(b.ref_id || '')
        .toLowerCase()
        .includes(kw)
    if (!cocok) return false
  }
  return true
}

// Penyaring lembaga (kunci ternormalisasi di KEDUA sisi). Kosong = semua lembaga.
function lolosPenyaringLembaga(b) {
  if (!filterLembaga.value) return true
  const target = filterLembaga.value === KAS_INDUK ? '' : filterLembaga.value
  return kunciLembaga(kasLembagaDari(b)) === target
}

// Baris dalam periode & scope gedung, SEBELUM penyaring lembaga/tipe/cara bayar/cari.
const bukuPeriode = computed(() => {
  let list = ledgerScope.value
  // Filter by year/month (+ v.1.2.6: tanggal, utk laporan harian)
  if (selectedMonth.value > 0) {
    const ym = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
    const tgl = selectedDay.value > 0 ? `${ym}-${String(selectedDay.value).padStart(2, '0')}` : ''
    list = tgl
      ? list.filter((b) => String(b.tanggal || '').substring(0, 10) === tgl)
      : list.filter((b) => String(b.tanggal || '').substring(0, 7) === ym)
  } else {
    list = list.filter((b) => String(b.tanggal || '').startsWith(String(selectedYear.value)))
  }
  return list
})

// Semua penyaring KECUALI lembaga. Rekap & opsi filter lembaga dihitung dari sini,
//   supaya pilihannya tak lenyap begitu satu lembaga dipilih — tapi tetap ikut
//   tanggal & cara bayar (itulah gunanya: "tunai per lembaga hari ini").
const bukuTanpaLembaga = computed(() => bukuPeriode.value.filter(lolosPenyaringUmum))

// Rekap kas per lembaga — dipakai kartu ringkasan DAN daftar opsi filter lembaga.
const rekapLembaga = computed(() => ringkasKasLembaga(bukuTanpaLembaga.value, kasLembagaDari))
// Nama lembaga yang sedang disaring — judul & nama berkas laporan. '' = semua lembaga.
const labelLembagaAktif = computed(() => {
  if (!filterLembaga.value) return ''
  if (filterLembaga.value === KAS_INDUK) return 'Kas Induk'
  const hit = rekapLembaga.value.find((o) => o.kunci === filterLembaga.value)
  return hit?.lembaga || ''
})

const filteredBuku = computed(() =>
  bukuTanpaLembaga.value
    .filter(lolosPenyaringLembaga)
    .slice()
    .sort(
      (a, b) =>
        (b.tanggal || '').localeCompare(a.tanggal || '') || (b.id || '').localeCompare(a.id || '')
    )
)

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

// Ledger dasar KOLOM SALDO — Kyai, 6 Agu 2026: "info saldo sesuai filter yg diekspor,
//   saldo total jika diekspor semuanya tanpa filter."
//
//   Semua penyaring ikut (pos, lembaga, cara bayar, tipe, pencarian, scope gedung)
//   KECUALI periode: yang dibatasi periode adalah baris yang tampil, sedangkan saldo
//   tetap kumulatif sejak transaksi pertama — itulah yang bikin baris SALDO AWAL punya
//   arti. Tanpa penyaring apa pun, hasilnya sama persis dengan saldo total yang lama.
const ledgerSaldo = computed(() =>
  ledgerScope.value
    .filter((b) => /^\d{4}-\d{2}/.test(String(b.tanggal || '').trim()))
    .filter(lolosPenyaringUmum)
    .filter(lolosPenyaringLembaga)
)
const saldoMap = computed(() => petaSaldoBerjalan(ledgerSaldo.value))
function saldoOf(b) {
  return saldoMap.value.get(String(b.id)) ?? 0
}
// Saldo sebelum periode yang sedang dilihat — dipakai baris SALDO AWAL di ekspor.
const saldoAwalPeriode = computed(() => saldoAwalSebelum(ledgerSaldo.value, periodeSlug.value))
// Saldo akhir = saldo awal + mutasi periode. Sengaja dihitung dari stats (bukan dari
//   baris terakhir peta saldo) supaya angkanya pasti bertemu dengan kartu Masuk/Keluar.
const saldoAkhirPeriode = computed(() => saldoAwalPeriode.value + stats.value.saldo)
// Ada penyaring kas yang aktif? Menentukan kalimat penjelas di kartu saldo — "seluruh kas"
//   vs "mengikuti penyaring". Periode TIDAK dihitung sebagai penyaring di sini: ia memang
//   selalu ada, dan yang dibatasinya cuma baris yang tampil.
const adaPenyaringKas = computed(
  () =>
    !!(
      filterPos.value ||
      filterLembaga.value ||
      filterMetode.value ||
      filterTipe.value ||
      search.value.trim() ||
      gedungScoped.value
    )
)

const years = computed(() => {
  const now = new Date().getFullYear()
  return [now - 2, now - 1, now, now + 1]
})

// v.1.2.6: label periode aktif — dipakai header, judul PDF/Excel, & nama berkas.
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

// v.1.2.6: subtotal tunai vs transfer atas baris yang sedang tampil (dasar laporan harian)
const rekapMetode = computed(() => ringkasMetode(filteredBuku.value))

// v.1.2.6 (Kyai): daftar lembaga untuk pilihan "Masuk Kas Lembaga" pada kas manual.
//   subscribeDoc langsung (1 baris master) — useLembaga() ikut memuat guru + santri
//   PENUH, beban yang tak ada gunanya di halaman ini.
const lembagaRaw = ref([])
let unsubLembaga = null
// Kyai 4 Agu: pilihan kas = baris master + kas yang BUKAN lembaga (TPQ payung, Fullday,
//   Ma'had) — sumber tunggal di utils/kasLembaga, sama dengan dialog Jenis Pembayaran.
const lembagaOpsi = computed(() => opsiKasLembaga(lembagaRaw.value, inputForm.lembaga || ''))

onMounted(() => {
  unsub = subscribeColl('keuangan_buku_induk', (docs) => {
    bukuRaw.value = docs
    loading.value = false
  })
  unsubLembaga = subscribeDoc('master', 'lembaga', (doc) => {
    lembagaRaw.value = Array.isArray(doc?.list) ? doc.list : []
  })
})
onUnmounted(() => {
  for (const fn of [unsub, unsubLembaga]) {
    if (!fn) continue
    try {
      fn()
    } catch (e) {}
  }
})

// Baris ekspor buku induk — dipakai bersama PDF, Excel, dan Google Sheet. Susunannya
//   SALDO AWAL → transaksi kronologis NAIK → SUBTOTAL cara bayar → TOTAL (kolom saldonya
//   = saldo akhir), lihat utils/bukuIndukLaporan.
//   v.1.2.6 (Kyai): `listIn` opsional supaya cetak TUNAI / TRANSFER bisa memakai
//   pembangun yang sama (satu bentuk laporan, bukan dua yang bisa berbeda diam-diam).
//   `metodeOnly` ikut menyaring ledger dasar saldo: tanpa itu, berkas TUNAI akan
//   memakai saldo awal yang masih mengandung transfer dan angkanya tak akan bertemu.
function buildExportRows(listIn, { metodeOnly = '' } = {}) {
  const list = listIn || filteredBuku.value || []
  const ledger = metodeOnly
    ? ledgerSaldo.value.filter((b) => metodeTransaksi(b) === metodeOnly)
    : ledgerSaldo.value
  return bangunBarisLaporan(list, {
    saldoAwal: metodeOnly ? saldoAwalSebelum(ledger, periodeSlug.value) : saldoAwalPeriode.value,
    labelPeriode: periodeLabel.value,
    metodeOf: metodeTransaksi,
    metodeOpts: METODE_OPTS,
    ringkasMetodeOf: ringkasMetode
  })
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
      // v.1.2.6: nama berkas & subjudul ikut periode yang difilter (harian/bulanan/tahunan)
      filename: `buku_induk_${periodeSlug.value}${slugPosBerkas()}.xlsx`,
      sheetName: 'Buku Induk',
      kop: [
        s.kopLine1 || '',
        s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
        s.kopLine3 || '',
        s.kopLine4 || ''
      ],
      subtitle: `Buku Induk Keuangan${judulPosSuffix()} — ${periodeLabel.value} — ${filteredBuku.value.length} transaksi`,
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
      subtitle: `Buku Induk Keuangan${judulPosSuffix()} — ${periodeLabel.value} — ${filteredBuku.value.length} transaksi`,
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
    { label: 'Cetak Laporan', icon: 'printer', on: () => cetakLaporan() },
    // v.1.2.6 (Kyai): berkas terpisah per cara bayar (pengecekan manual harian)
    { label: 'PDF Tunai', icon: 'printer', on: () => cetakLaporan('Tunai') },
    { label: 'PDF Transfer', icon: 'printer', on: () => cetakLaporan('Transfer') }
  ]
})
</script>
