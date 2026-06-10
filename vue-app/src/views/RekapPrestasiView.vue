<template>
  <div class="p-3 md:p-5 max-w-7xl mx-auto space-y-4">

    <!-- v.100 Batch12: Preview impor Rekap Prestasi (review dulu: Baru/Update/Lewati/Tak ditemukan) -->
    <div v-if="importRekapPreview" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[88vh] flex flex-col">
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 class="text-base font-black text-slate-800 dark:text-slate-100">
            <i class="fas fa-file-import text-cyan-600 mr-2"></i>Preview Impor Rekap Prestasi — {{ importRekapPreview.plan.length }} baris
          </h3>
          <button @click="importRekapPreview = null" class="text-slate-400 hover:text-rose-600 text-xl"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-4 overflow-auto flex-1 text-xs">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded p-2 border border-emerald-200 dark:border-emerald-800">
              <p class="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase">Baru</p>
              <p class="text-2xl font-black text-emerald-700 dark:text-emerald-300">{{ importRekapPreview.cBaru }}</p>
            </div>
            <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded p-2 border border-cyan-200 dark:border-cyan-800">
              <p class="text-[10px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Update</p>
              <p class="text-2xl font-black text-cyan-700 dark:text-cyan-300">{{ importRekapPreview.cUpdate }}</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-700/40 rounded p-2 border border-slate-200 dark:border-slate-600">
              <p class="text-[10px] text-slate-600 dark:text-slate-300 font-bold uppercase">Lewati (kosong)</p>
              <p class="text-2xl font-black text-slate-600 dark:text-slate-300">{{ importRekapPreview.cSkip }}</p>
            </div>
            <div class="bg-rose-50 dark:bg-rose-900/20 rounded p-2 border border-rose-200 dark:border-rose-800">
              <p class="text-[10px] text-rose-700 dark:text-rose-300 font-bold uppercase">Tak ditemukan</p>
              <p class="text-2xl font-black text-rose-700 dark:text-rose-300">{{ importRekapPreview.cNotFound }}</p>
            </div>
          </div>
          <p v-if="importRekapPreview.cFuzzy" class="text-[11px] text-amber-700 dark:text-amber-300 mb-2"><i class="fas fa-circle-info mr-1"></i>{{ importRekapPreview.cFuzzy }} baris dicocokkan via <b>nama mirip / tak lengkap</b> (badge "Mirip"/"Lingkup", pakai lingkup guru+kelas) — periksa bila ragu.</p>
          <table class="w-full border border-slate-200 dark:border-slate-700">
            <thead class="bg-slate-100 dark:bg-slate-700/50">
              <tr>
                <th class="px-2 py-1 text-left">#</th>
                <th class="px-2 py-1 text-left">Aksi</th>
                <th class="px-2 py-1 text-left">Cocok</th>
                <th class="px-2 py-1 text-left">Nama</th>
                <th class="px-2 py-1 text-left">NIS</th>
                <th class="px-2 py-1 text-left">Lembaga</th>
                <th class="px-2 py-1 text-left">Nilai Baru</th>
                <th class="px-2 py-1 text-left">Nilai Lama</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in importRekapPreview.preview" :key="i" class="border-t border-slate-200 dark:border-slate-700">
                <td class="px-2 py-1">{{ i + 1 }}</td>
                <td class="px-2 py-1">
                  <span class="font-bold px-1.5 py-0.5 rounded text-[10px]" :class="{
                    'bg-emerald-100 text-emerald-700': p.action === 'baru',
                    'bg-cyan-100 text-cyan-700': p.action === 'update',
                    'bg-slate-200 text-slate-600': p.action === 'skip',
                    'bg-rose-100 text-rose-700': p.action === 'notfound'
                  }">{{ p.action === 'baru' ? 'BARU' : p.action === 'update' ? 'UPDATE' : p.action === 'skip' ? 'LEWATI' : 'TAK ADA' }}</span>
                </td>
                <td class="px-2 py-1"><span v-if="p.matchBy" class="text-[10px] px-1.5 py-0.5 rounded" :class="(p.matchBy === 'Mirip' || p.matchBy === 'Lingkup') ? 'bg-amber-100 text-amber-700 font-bold' : 'bg-slate-100 text-slate-500'">{{ p.matchBy }}</span></td>
                <td class="px-2 py-1 font-bold text-slate-700 dark:text-slate-200">{{ p.nama }}</td>
                <td class="px-2 py-1">{{ p.nis }}</td>
                <td class="px-2 py-1">{{ p.lembaga }}</td>
                <td class="px-2 py-1 text-cyan-700 dark:text-cyan-300">{{ p.nilaiBaru }}</td>
                <td class="px-2 py-1 text-slate-400">{{ p.nilaiLama }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="importRekapPreview.plan.length > importRekapPreview.preview.length" class="text-[10px] italic text-slate-500 mt-2">…dan {{ importRekapPreview.plan.length - importRekapPreview.preview.length }} baris lagi (semua diproses saat konfirmasi)</p>
        </div>
        <div class="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
          <button @click="importRekapPreview = null" class="px-4 py-2 text-xs font-bold rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 text-slate-700 dark:text-slate-100">Batal</button>
          <button @click="confirmImportRekap" :disabled="importingRekap || importRekapPreview.applyCount === 0" class="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50">
            <i :class="['fas', importingRekap ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>{{ importingRekap ? `Memproses… ${importRekapProgress.i}/${importRekapProgress.total}` : `Konfirmasi (${importRekapPreview.applyCount})` }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===== LAYER 1: LANDING (pilih Qiraati / Diniyah) ===== -->
    <div
      v-if="viewStep === 'landing'"
      class="bg-white rounded-2xl p-5 md:p-6 border border-emerald-100 shadow-sm"
    >
      <div class="flex items-start gap-3 mb-4">
        <i class="fas fa-book-open text-emerald-600 text-2xl"></i>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 leading-tight">Rekap Prestasi</h2>
          <p class="text-xs md:text-sm text-slate-500 mt-0.5">Pilih kategori rekap untuk mengelola data prestasi santri.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          @click="pilihKategori('qiraati')"
          class="group relative overflow-hidden bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-teal-700 dark:to-teal-900 hover:from-emerald-600 dark:from-emerald-800 hover:to-teal-800 rounded-2xl p-5 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <i class="fas fa-mosque text-2xl drop-shadow mb-2"></i>
          <h3 class="text-base md:text-lg font-black leading-tight drop-shadow-sm !text-white">Rekap Qiraati</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">TPQ Sore · Pra PTPT · PTPT · PPPH</p>
        </button>
        <button
          @click="pilihKategori('diniyah')"
          class="group relative overflow-hidden bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 hover:from-cyan-600 dark:from-cyan-800 hover:to-cyan-800 rounded-2xl p-5 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <i class="fas fa-book text-2xl drop-shadow mb-2"></i>
          <h3 class="text-base md:text-lg font-black leading-tight drop-shadow-sm !text-white">Rekap Diniyah</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">Mata pelajaran agama</p>
        </button>
      </div>
    </div>

    <!-- ===== LAYER 2-Q: SUB-LANDING QIRAATI ===== -->
    <div
      v-else-if="viewStep === 'sub-qiraati'"
      class="bg-white rounded-2xl p-5 md:p-6 border border-emerald-100 shadow-sm"
    >
      <div class="flex items-center gap-3 mb-4">
        <button
          @click="backToLanding"
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          title="Kembali"
        >
          <i class="fas fa-arrow-left text-slate-600"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 leading-tight">
            <i class="fas fa-mosque text-emerald-600 mr-2"></i>Rekap Qiraati
          </h2>
          <p class="text-xs md:text-sm text-slate-500 mt-0.5">Pilih lembaga untuk mulai input nilai.</p>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
        <button
          @click="pilihLembagaInput('TPQ Pagi')"
          class="bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-sun text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">TPQ Pagi</h3>
          <p class="text-[10px] text-white/85 font-medium mt-0.5">Shift pagi</p>
        </button>
        <button
          @click="pilihLembagaInput('TPQ Sore')"
          class="bg-gradient-to-br from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-cloud-sun text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">TPQ Sore</h3>
          <p class="text-[10px] text-white/85 font-medium mt-0.5">Shift sore</p>
        </button>
        <button
          @click="pilihLembagaInput('Pra PTPT')"
          class="bg-gradient-to-br from-teal-600 dark:from-teal-800 to-teal-800 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-book text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">Pra PTPT</h3>
          <p class="text-[10px] text-white/85 font-medium mt-0.5">Persiapan tahfizh</p>
        </button>
        <button
          @click="pilihLembagaInput('PTPT')"
          class="bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-quran text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">PTPT</h3>
          <p class="text-[10px] text-white/85 font-medium mt-0.5">Program tahfizh</p>
        </button>
        <button
          @click="pilihLembagaInput('PPPH')"
          class="bg-gradient-to-br from-cyan-600 dark:from-cyan-800 to-cyan-800 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-scroll text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">PPPH</h3>
          <p class="text-[10px] text-white/85 font-medium mt-0.5">Program hadits</p>
        </button>
      </div>
    </div>

    <!-- ===== LAYER 2-D: SUB-LANDING DINIYAH (redirect ke RekapDiniyahView) ===== -->
    <div
      v-else-if="viewStep === 'sub-diniyah'"
      class="bg-white rounded-2xl p-5 md:p-6 border border-cyan-100 shadow-sm"
    >
      <div class="flex items-center gap-3 mb-4">
        <button
          @click="backToLanding"
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          title="Kembali"
        >
          <i class="fas fa-arrow-left text-slate-600"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 leading-tight">
            <i class="fas fa-book text-cyan-600 mr-2"></i>Rekap Diniyah
          </h2>
          <p class="text-xs md:text-sm text-slate-500 mt-0.5">Pilih jenjang sekolah untuk mulai input nilai diniyah.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        <button
          @click="$router.push('/rekap-diniyah?lembaga=SDI')"
          class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-school text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SDI</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">Sekolah Dasar Islam (Kelas I–VI)</p>
        </button>
        <button
          @click="$router.push('/rekap-diniyah?lembaga=PKBM&jenjang=SMP')"
          class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-school-flag text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SMP</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">PKBM · Kelas VII–IX</p>
        </button>
        <button
          @click="$router.push('/rekap-diniyah?lembaga=PKBM&jenjang=SMA')"
          class="bg-gradient-to-br from-cyan-700 dark:from-cyan-900 to-cyan-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
        >
          <i class="fas fa-graduation-cap text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SMA</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">PKBM · Kelas X–XII</p>
        </button>
      </div>
    </div>

    <!-- ===== LAYER 3: INPUT BULANAN (existing — wrapped) ===== -->
    <template v-else-if="viewStep === 'input'">
      <!-- HEADER WITH BACK (admin/super only) -->
      <button
        v-if="isFullFilter"
        @click="backToSub"
        class="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer text-slate-700 dark:text-slate-200"
        title="Pilih lembaga lain"
      >
        <i class="fas fa-arrow-left"></i> Pilih Lembaga Lain
      </button>


    <!-- HEADER -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
            <i class="fas fa-trophy text-cyan-500 mr-1"></i>Rekap Prestasi Qiraati
          </h1>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">
            Rekap bulanan prestasi santri Qiraati. Total: {{ filteredSantri.length }} santri ·
            Periode: <b class="text-cyan-700">{{ bulan }} {{ tahun }}</b>
          </p>
        </div>
        <!-- View mode toggle -->
        <div class="flex gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            v-for="m in modes"
            :key="m.id"
            @click="mode = m.id"
            :class="['px-3 py-1.5 text-[11px] font-bold rounded-lg transition', mode === m.id ? 'bg-white shadow-sm text-cyan-700' : 'text-slate-500 hover:text-slate-700']"
          >
            <i :class="['fas', m.icon, 'mr-1']"></i>{{ m.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- FILTERS + PERIODE -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-2">
      <select v-model="bulan" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none">
        <option v-for="b in BULAN_LIST" :key="b" :value="b">{{ b }}</option>
      </select>
      <select v-model="tahun" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none">
        <option v-for="t in TAHUN_LIST" :key="t" :value="t">{{ t }}</option>
      </select>
      <select v-if="isFullFilter" v-model="filterLembaga" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none">
        <option value="">Semua lembaga</option>
        <option v-for="l in LEMBAGA_QIRAATI" :key="l" :value="l">{{ l }}</option>
      </select>
      <select v-model="filterKelas" class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none">
        <option value="">Semua kelas</option>
        <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
      </select>
      <input v-model="search" type="text" placeholder="Cari nama..." class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none col-span-2 md:col-span-1" />
    </div>

    <!-- STATS BADGES -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-2 text-center">
      <div class="bg-cyan-50 rounded-lg p-2">
        <p class="text-2xl font-black text-cyan-700">{{ stats.totalKenaikan }}</p>
        <p class="text-[10px] uppercase text-slate-500">Total Kenaikan</p>
      </div>
      <div class="bg-emerald-50 rounded-lg p-2">
        <p class="text-2xl font-black text-emerald-700">{{ stats.santriDgnRiwayat }}</p>
        <p class="text-[10px] uppercase text-slate-500">Santri Aktif Naik</p>
      </div>
      <div class="bg-cyan-50 rounded-lg p-2">
        <p class="text-2xl font-black text-cyan-700">{{ stats.avgKenaikan }}</p>
        <p class="text-[10px] uppercase text-slate-500">Avg Naik/Santri</p>
      </div>
      <div class="bg-teal-50 rounded-lg p-2">
        <p class="text-2xl font-black text-teal-700">{{ filteredSantri.length }}</p>
        <p class="text-[10px] uppercase text-slate-500">Santri</p>
      </div>
      <div class="bg-rose-50 rounded-lg p-2">
        <p class="text-2xl font-black text-rose-700">{{ stats.belumDinilai }}</p>
        <p class="text-[10px] uppercase text-slate-500">Belum Dinilai</p>
      </div>
      <div class="bg-teal-50 rounded-lg p-2">
        <p class="text-2xl font-black text-teal-700">{{ stats.sudahDinilai }}</p>
        <p class="text-[10px] uppercase text-slate-500">Sudah Dinilai</p>
      </div>
    </div>

    <!-- ACTION BAR (Export/Print/Simpan) -->
    <div v-if="mode === 'bulanan'" class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-2">
      <div class="text-[11px] text-slate-500">
        <i class="fas fa-info-circle mr-1 text-cyan-500"></i>
        Edit kolom <b>Awal</b> & <b>Akhir</b>, lalu klik <b>Simpan</b>. Total auto-compute untuk PTPT.
      </div>
      <!-- v.21.115.0528: standardize per design-tokens — Cetak cyan, PDF cyan, Excel emerald, Simpan primary -->
      <div class="flex flex-wrap gap-2">
        <button @click="cetakHTML()" aria-label="Cetak rekap HTML" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer">
          <i class="fas fa-print"></i>Cetak
        </button>
        <button @click="exportPdf()" :disabled="busy" aria-label="Ekspor rekap PDF" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
          <i class="fas fa-file-pdf"></i>PDF
        </button>
        <button @click="exportExcel()" :disabled="busy" aria-label="Ekspor rekap Excel" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
          <i class="fas fa-file-excel"></i>Excel
        </button>
        <button v-if="gsheetConfigured()" @click="kirimRekapGsheet()" :disabled="busy" aria-label="Kirim rekap ke Google Sheet" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
          <i :class="['fas', 'fa-table']"></i>Google Sheet
        </button>
        <!-- v.100 Batch10: impor massal nilai prestasi (data baru & banyak) — admin -->
        <button v-if="isFullFilter" @click="downloadTemplateRekap()" :disabled="busy" aria-label="Unduh template impor" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
          <i class="fas fa-file-arrow-down"></i>Template Impor
        </button>
        <label v-if="isFullFilter" aria-label="Impor rekap XLSX" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition cursor-pointer" :class="importingRekap ? 'opacity-50 pointer-events-none' : ''">
          <i :class="['fas', importingRekap ? 'fa-spinner fa-spin' : 'fa-file-arrow-up']"></i>
          {{ importingRekap ? `Impor… ${importRekapProgress.i}/${importRekapProgress.total}` : 'Impor XLSX' }}
          <input type="file" accept=".xlsx,.xls" class="hidden" @change="onImportRekap" :disabled="importingRekap" />
        </label>
        <button @click="simpanRekap()" :disabled="busy" aria-label="Simpan rekap" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black transition cursor-pointer">
          <i :class="['fas', busy ? 'fa-spinner fa-spin' : 'fa-save']"></i>{{ busy ? 'Menyimpan...' : 'SIMPAN' }}
        </button>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500">Memuat...</p>
    </div>

    <!-- EMPTY -->
    <div v-else-if="filteredSantri.length === 0" class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center">
      <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500 italic">Tidak ada santri Qiraati yang cocok.</p>
    </div>

    <!-- ============= MODE 1: RIWAYAT (list expandable kartu kenaikan) ============= -->
    <div v-else-if="mode === 'riwayat'" class="space-y-2">
      <div v-for="s in filteredSantri" :key="s.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-user-graduate"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-slate-500">
              {{ s.lembaga }}{{ s.shift ? ' · ' + s.shift : '' }} · Kelas {{ s.kelas || '-' }}{{ s.juz ? ' · ' + s.juz : '' }}
            </p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span class="text-[9px] bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded font-bold">{{ countRiwayat(s) }} kenaikan</span>
              <span v-if="s.prestasi_awal" class="text-[9px] bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded font-bold">Awal: {{ s.prestasi_awal }}</span>
              <span v-if="s.prestasi_akhir" class="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Akhir: {{ s.prestasi_akhir }}</span>
              <span v-if="s.prestasi_total" class="text-[9px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded font-bold">Total: {{ s.prestasi_total }}</span>
            </div>
          </div>
          <button @click="toggleExpand(s.id)" class="text-cyan-500 hover:bg-cyan-50 px-2 py-1 rounded">
            <i :class="['fas', expandedId === s.id ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
          </button>
        </div>
        <div v-if="expandedId === s.id && Array.isArray(s.riwayat) && s.riwayat.length > 0" class="mt-2 pt-2 border-t border-cyan-100">
          <p class="text-[10px] font-bold text-cyan-700 uppercase mb-1">Riwayat Kenaikan ({{ s.riwayat.length }})</p>
          <div class="space-y-1">
            <div v-for="(r, i) in s.riwayat" :key="i" class="text-[11px] bg-cyan-50 rounded px-2 py-1 flex justify-between gap-2">
              <span><b>{{ r.tgl_naik || r.tanggal || '-' }}</b>: {{ r.kelas_from || '?' }} → {{ r.kelas_to || r.keterangan || '?' }}</span>
              <span v-if="r.catatan" class="text-slate-500 italic truncate">{{ r.catatan }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============= MODE 2: BULANAN (editable input table) ============= -->
    <div v-else-if="mode === 'bulanan'" class="bg-white dark:bg-slate-800 rounded-2xl p-2 md:p-3 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
      <table class="min-w-full text-xs border-collapse">
        <thead class="bg-slate-100 sticky top-0 z-10">
          <tr>
            <!-- v.21.115.0528: Nama Santri sticky kiri supaya tetap visible saat scroll horizontal mobile -->
            <th class="py-2 px-2 border border-slate-300 font-black text-left text-[10px] uppercase text-slate-700 sticky left-0 bg-slate-100 z-20 min-w-[140px]">Nama Santri</th>
            <th class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] text-slate-700">L/P</th>
            <th class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] text-slate-700">Lembaga/Kelas</th>
            <th v-if="hasPTPT" class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-rose-50 text-rose-900">Juz</th>
            <th class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-teal-100 text-teal-900">Awal Bln</th>
            <th class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-teal-100 text-teal-900">Akhir Bln</th>
            <th class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-cyan-100 text-cyan-900">Total</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="grp in groupedBulanan" :key="grp.key">
            <tr class="bg-slate-200">
              <td :colspan="hasPTPT ? 7 : 6" class="p-2 border border-slate-300 font-black text-slate-800 uppercase tracking-wider text-[10px]">
                LEMBAGA: {{ grp.lembaga }} | KELAS: {{ grp.kelas }} | GURU: {{ grp.guru || '-' }}
              </td>
            </tr>
            <tr v-for="s in grp.santri" :key="s.id" class="hover:bg-cyan-50/30">
              <!-- v.21.115.0528: nama santri body sticky kiri -->
              <td class="p-2 border border-slate-300 font-bold text-slate-800 whitespace-nowrap sticky left-0 bg-white dark:bg-slate-800 z-[1]">{{ s.nama }}</td>
              <td class="p-2 border border-slate-300 text-center font-bold">{{ s.jk || '-' }}</td>
              <td class="p-2 border border-slate-300 text-center text-[10px]">{{ s.lembaga }} - {{ s.kelas || '-' }}</td>
              <td v-if="hasPTPT" class="p-1 border border-slate-300 bg-rose-50/40">
                <input v-if="s.lembaga === 'PTPT'" type="number" min="1" max="30" :value="getJuzNum(s)" @input="setJuz(s.id, $event.target.value)" class="w-full text-center bg-rose-50 text-rose-900 rounded p-1 text-[11px] font-bold border border-rose-300 outline-none focus:ring-2 focus:ring-rose-400" />
                <span v-else class="text-[10px] text-slate-400">-</span>
              </td>
              <td class="p-1 border border-slate-300 bg-white">
                <input type="text" :value="getEdit(s.id, 'awal')" @input="setEdit(s.id, 'awal', $event.target.value)" class="w-full text-center border-2 border-slate-200 rounded-lg p-1.5 text-[11px] font-black shadow-sm focus:border-teal-500 outline-none" />
              </td>
              <td class="p-1 border border-slate-300 bg-white">
                <input type="text" :value="getEdit(s.id, 'akhir')" @input="setEdit(s.id, 'akhir', $event.target.value)" class="w-full text-center border-2 border-slate-200 rounded-lg p-1.5 text-[11px] font-black shadow-sm focus:border-teal-500 outline-none" />
              </td>
              <td class="p-1 border border-slate-300 bg-slate-50">
                <input
                  v-if="s.lembaga === 'PTPT'"
                  type="text"
                  :value="computedTotal(s)"
                  readonly
                  :class="['w-full text-center font-black text-[11px] p-1.5 rounded-lg border-2 cursor-not-allowed shadow-inner', warnaPTPT(s)]"
                />
                <input
                  v-else
                  type="text"
                  :value="getEdit(s.id, 'total')"
                  @input="setEdit(s.id, 'total', $event.target.value)"
                  class="w-full text-center font-black text-[11px] p-1.5 rounded-lg border-2 border-slate-200 shadow-sm focus:border-teal-500 outline-none"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- ============= MODE 3: RANKING (top 5 per lembaga) ============= -->
    <div v-else-if="mode === 'ranking'" class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div v-for="lmb in rankingPerLembaga" :key="lmb.lembaga" class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
          <h3 class="font-black text-sm text-slate-800 uppercase tracking-wider">{{ lmb.lembaga }}</h3>
          <span class="text-[10px] font-bold text-slate-500">{{ lmb.dinilai }}/{{ lmb.total }} dinilai</span>
        </div>
        <!-- PTPT histogram -->
        <div v-if="lmb.isPTPT" class="grid grid-cols-3 gap-2 mb-3">
          <div class="bg-rose-50 border border-rose-200 rounded-lg p-2 text-center">
            <p class="text-[9px] font-bold text-rose-700 uppercase">Kurang</p>
            <p class="text-lg font-black text-rose-800">{{ lmb.kurang }}</p>
            <p class="text-[8px] text-rose-600">&lt;5 hal</p>
          </div>
          <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-2 text-center">
            <p class="text-[9px] font-bold text-cyan-700 uppercase">Cukup</p>
            <p class="text-lg font-black text-cyan-800">{{ lmb.cukup }}</p>
            <p class="text-[8px] text-cyan-600">5-9 hal</p>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center">
            <p class="text-[9px] font-bold text-emerald-700 uppercase">Bagus</p>
            <p class="text-lg font-black text-emerald-800">{{ lmb.bagus }}</p>
            <p class="text-[8px] text-emerald-600">&ge;10 hal</p>
          </div>
        </div>
        <p class="text-[10px] font-black text-slate-600 uppercase mb-2">
          <i class="fas fa-medal text-cyan-500 mr-1"></i>Top 5 Prestasi Tertinggi
        </p>
        <ol v-if="lmb.top5.length > 0" class="space-y-1">
          <li v-for="(t, idx) in lmb.top5" :key="t.id || idx" class="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs">
            <span class="font-bold text-slate-800 truncate">
              <span class="inline-block w-5 text-cyan-600 font-black">{{ idx + 1 }}.</span>{{ t.nama }}
            </span>
            <span :class="['font-black whitespace-nowrap ml-2', t.color]">{{ t.display }}</span>
          </li>
        </ol>
        <p v-else class="text-xs text-slate-400 italic text-center py-3">Belum ada data prestasi.</p>
      </div>
    </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { db } from '@/services/firebase'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { useGoogleSheet } from '@/composables/useGoogleSheet' // v.100 Batch12: ekspor ke Google Sheet
import { useSettingsStore } from '@/stores/settings'
import { extractNumber, getNamaGuruGelar } from '@/utils/format'
import { bestNameMatch, fuzzyKey, simRatio } from '@/utils/fuzzyMatch' // v.100 Batch12/14: cocokkan nama mirip + scope guru (impor Google Form)
import { buildListPdf } from '@/utils/pdfBuilder'
import { useAuthStore } from '@/stores/auth'
import { isFullFilterRole, isKepalaLembaga } from '@/utils/roleScope'
import { lembagaScopeMatches } from '@/composables/useLembaga'
import { sortSantri } from '@/utils/santriSort'

const LEMBAGA_QIRAATI = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
const BULAN_LIST = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const _now = new Date()
const TAHUN_LIST = [2024, 2025, 2026, 2027, 2028]

const toast = useToast()
const settings = useSettingsStore()
const { exportStyled } = useExcel()
// v.100 Batch12: kirim Rekap Prestasi ke Google Sheet (hybrid, mirip PDF)
const { isConfigured: gsheetConfigured, sendToSheet } = useGoogleSheet()

const modes = [
  { id: 'bulanan', label: 'Input Bulanan', icon: 'fa-table' },
  { id: 'ranking', label: 'Ranking', icon: 'fa-medal' },
  { id: 'riwayat', label: 'Riwayat', icon: 'fa-history' }
]

const santriRaw = ref([])
const guruRaw = ref([])
const loading = ref(true)
const busy = ref(false)
const search = ref('')
const filterLembaga = ref('')
const auth = useAuthStore()
const isFullFilter = computed(() => isFullFilterRole(auth.sesiAktif))
const isGuruMode = computed(() => !isFullFilter.value)
// v.86.0526: Kepala/PJ (role guru, bukan admin) discope ke lembaganya.
const kepalaScope = computed(() => {
  const s = auth.sesiAktif
  if (!s || s.role === 'admin' || s.id === 'admin') return null
  return isKepalaLembaga(s) ? (s.lembaga || null) : null
})
function _lowS(v) { return String(v || '').toLowerCase().trim() }
function ownNgaji(s) {
  const gn = _lowS(auth.sesiAktif?.guru || auth.sesiAktif?.nama)
  if (!gn) return false
  return _lowS(s.guru_pagi) === gn || _lowS(s.guru_sore) === gn || _lowS(s.guru) === gn
}
const filterKelas = ref('')
const expandedId = ref(null)
const mode = ref('bulanan')
const bulan = ref(BULAN_LIST[_now.getMonth()])
const tahun = ref(_now.getFullYear())

// v.21.84.0527: 3-layer flow — landing → sub-landing → input (match live UX)
const viewStep = ref('landing') // 'landing' | 'sub-qiraati' | 'sub-diniyah' | 'input'
const LEMBAGA_DINIYAH = ['SDI', 'PKBM']
function pilihKategori(cat) {
  if (isGuruMode.value) {
    // Guru: langsung input (santri diampu, tanpa pilih lembaga)
    if (cat === 'qiraati') {
      filterLembaga.value = ''
      viewStep.value = 'input'
    } else {
      // Diniyah → ke RekapDiniyahView (guru mode di-handle di sana)
      router.push('/rekap-diniyah')
    }
    return
  }
  viewStep.value = cat === 'qiraati' ? 'sub-qiraati' : 'sub-diniyah'
}
function pilihLembagaInput(lmb) {
  filterLembaga.value = lmb
  viewStep.value = 'input'
}
function backToLanding() {
  viewStep.value = 'landing'
  filterLembaga.value = ''
}
function backToSub() {
  const lmb = String(filterLembaga.value || '').toLowerCase()
  if (['sdi', 'pkbm'].includes(lmb)) viewStep.value = 'sub-diniyah'
  else viewStep.value = 'sub-qiraati'
  filterLembaga.value = ''
}


// edits state (Awal/Akhir/Total/Juz per santri)
const edits = reactive({})
let unsubSantri = null
let unsubGuru = null

const santriQiraati = computed(() => {
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const lmb = String(s.lembaga || '').trim().toLowerCase()
    return LEMBAGA_QIRAATI.some((q) => q.toLowerCase() === lmb) || lmb === 'tpq'
  })
})

function lembagaMatch(s, filter) {
  const lmb = String(s.lembaga || '').toLowerCase()
  const fl = filter.toLowerCase()
  if (fl === 'tpq pagi') return lmb === 'tpq pagi' || (lmb === 'tpq' && String(s.shift || '').toLowerCase() === 'pagi')
  if (fl === 'tpq sore') return lmb === 'tpq sore' || (lmb === 'tpq' && String(s.shift || '').toLowerCase() === 'sore')
  return lmb === fl
}

const filteredSantri = computed(() => {
  let list = santriQiraati.value
  // Guru mode: hanya santri ngaji yang diampu
  if (isGuruMode.value) list = list.filter((s) => ownNgaji(s))
  // v.86.0526: Kepala/PJ → hanya santri lembaganya (block lintas-lembaga)
  if (kepalaScope.value) list = list.filter((s) => lembagaScopeMatches(kepalaScope.value, s.lembaga) || lembagaScopeMatches(kepalaScope.value, s.lembaga_sekolah))
  if (filterLembaga.value) list = list.filter((s) => lembagaMatch(s, filterLembaga.value))
  if (filterKelas.value) list = list.filter((s) => String(s.kelas || '') === filterKelas.value)
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((s) => String(s.nama || '').toLowerCase().includes(kw))
  return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
})

const uniqueKelas = computed(() => {
  const set = new Set()
  for (const s of santriQiraati.value) if (s.kelas) set.add(s.kelas)
  return [...set].sort()
})

const hasPTPT = computed(() => filteredSantri.value.some((s) => s.lembaga === 'PTPT'))

// Group untuk bulanan table (by lembaga + kelas + guru)
const groupedBulanan = computed(() => {
  const groups = []
  let last = null
  for (const s of filteredSantri.value) {
    const key = `${s.lembaga}::${s.kelas}::${s.guru}`
    if (!last || last.key !== key) {
      const g = guruRaw.value.find((x) => x.nama === s.guru)
      const guruName = g ? getNamaGuruGelar(g.nama, g.jk) : (s.guru || '')
      last = { key, lembaga: s.lembaga, kelas: s.kelas, guru: guruName, santri: [] }
      groups.push(last)
    }
    last.santri.push(s)
  }
  return groups
})

// Stats: count kenaikan + status dinilai
const stats = computed(() => {
  let totalKenaikan = 0
  let santriDgnRiwayat = 0
  let belumDinilai = 0
  let sudahDinilai = 0
  for (const s of filteredSantri.value) {
    const n = Array.isArray(s.riwayat) ? s.riwayat.length : 0
    totalKenaikan += n
    if (n > 0) santriDgnRiwayat++
    const tot = getEdit(s.id, 'total') || s.prestasi_total
    const aw = getEdit(s.id, 'awal') || s.prestasi_awal
    const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir
    if (tot || aw || ak) sudahDinilai++
    else belumDinilai++
  }
  const avg = filteredSantri.value.length > 0
    ? (totalKenaikan / filteredSantri.value.length).toFixed(1)
    : '0'
  return { totalKenaikan, santriDgnRiwayat, avgKenaikan: avg, belumDinilai, sudahDinilai }
})

// RANKING per lembaga
const rankingPerLembaga = computed(() => {
  const result = []
  for (const lembaga of LEMBAGA_QIRAATI) {
    const list = filteredSantri.value.filter((s) => lembagaMatch(s, lembaga))
    if (list.length === 0) continue
    const isPTPT = lembaga === 'PTPT'
    let kurang = 0, cukup = 0, bagus = 0, dinilai = 0
    const scored = list.map((s) => {
      const aw = extractNumber(getEdit(s.id, 'awal') || s.prestasi_awal)
      const ak = extractNumber(getEdit(s.id, 'akhir') || s.prestasi_akhir)
      const rawTot = getEdit(s.id, 'total') || s.prestasi_total || ''
      const computed = isPTPT ? Math.max(0, ak - aw) : extractNumber(rawTot)
      if (rawTot || aw || ak) dinilai++
      if (isPTPT) {
        if (computed > 0 && computed < 5) kurang++
        else if (computed >= 5 && computed < 10) cukup++
        else if (computed >= 10) bagus++
      }
      let color = 'text-slate-700'
      if (isPTPT) {
        if (computed >= 10) color = 'text-emerald-700'
        else if (computed >= 5) color = 'text-cyan-700'
        else if (computed > 0) color = 'text-rose-700'
      }
      const display = isPTPT
        ? (computed > 0 ? `${computed} Hal` : '-')
        : (rawTot || '-')
      return { id: s.id, nama: s.nama, total: computed, display, color }
    })
    scored.sort((a, b) => b.total - a.total)
    const top5 = scored.filter((t) => t.total > 0).slice(0, 5)
    result.push({
      lembaga, isPTPT, total: list.length, dinilai,
      kurang, cukup, bagus, top5
    })
  }
  return result
})

// Helpers
function countRiwayat(s) { return Array.isArray(s.riwayat) ? s.riwayat.length : 0 }
function toggleExpand(id) { expandedId.value = expandedId.value === id ? null : id }
function getEdit(id, field) {
  const e = edits[id]
  if (e && e[field] !== undefined) return e[field]
  const s = santriRaw.value.find((x) => String(x.id) === String(id))
  if (!s) return ''
  if (field === 'awal') return s.prestasi_awal || ''
  if (field === 'akhir') return s.prestasi_akhir || ''
  if (field === 'total') return s.prestasi_total || ''
  if (field === 'juz') return s.juz || ''
  return ''
}
function setEdit(id, field, val) {
  if (!edits[id]) edits[id] = {}
  edits[id][field] = val
}
function getJuzNum(s) {
  const cur = edits[s.id]?.juz
  const raw = cur !== undefined ? cur : (s.juz || '')
  return extractNumber(raw) || ''
}
function setJuz(id, val) {
  setEdit(id, 'juz', val ? `JUZ ${val}` : '-')
}
function computedTotal(s) {
  const aw = extractNumber(getEdit(s.id, 'awal') || s.prestasi_awal)
  const ak = extractNumber(getEdit(s.id, 'akhir') || s.prestasi_akhir)
  const tot = Math.max(0, ak - aw)
  return tot > 0 ? `${tot} Hal` : ''
}
function warnaPTPT(s) {
  const aw = extractNumber(getEdit(s.id, 'awal') || s.prestasi_awal)
  const ak = extractNumber(getEdit(s.id, 'akhir') || s.prestasi_akhir)
  const tot = Math.max(0, ak - aw)
  if (tot > 0 && tot < 5) return 'bg-rose-100 text-rose-900 border-rose-400'
  if (tot >= 5 && tot < 10) return 'bg-cyan-100 text-cyan-900 border-cyan-400'
  if (tot >= 10) return 'bg-green-100 text-green-900 border-green-500'
  return 'bg-slate-100 text-cyan-900 border-slate-300'
}

// SIMPAN
async function simpanRekap() {
  if (busy.value) return
  const ids = Object.keys(edits)
  if (ids.length === 0) {
    toast.info('Tidak ada perubahan.')
    return
  }
  busy.value = true
  try {
    const promises = []
    for (const id of ids) {
      const e = edits[id]
      const s = santriRaw.value.find((x) => String(x.id) === String(id))
      if (!s) continue
      const payload = {}
      if (e.awal !== undefined) payload.prestasi_awal = e.awal
      if (e.akhir !== undefined) payload.prestasi_akhir = e.akhir
      if (s.lembaga === 'PTPT') {
        // Auto-compute PTPT total
        const aw = extractNumber(e.awal ?? s.prestasi_awal)
        const ak = extractNumber(e.akhir ?? s.prestasi_akhir)
        const tot = Math.max(0, ak - aw)
        payload.prestasi_total = tot > 0 ? `${tot} Hal` : ''
        if (e.juz !== undefined) payload.juz = e.juz
      } else {
        if (e.total !== undefined) payload.prestasi_total = e.total
      }
      if (Object.keys(payload).length === 0) continue
      promises.push(updateDoc(doc(db, 'santri', String(id)), payload))
      // v.87.0526: event notif prestasi (1 per santri / bulan berjalan) -> Notif Center wali.
      const _periode = new Date().toISOString().slice(0, 7)
      const _npId = `np_${id}_${_periode}`
      promises.push(setDoc(doc(db, 'notif_prestasi', _npId), {
        id: _npId,
        santri_id: String(id),
        santri_nama: s.nama || '',
        total: String(payload.prestasi_total ?? e.total ?? ''),
        periode: _periode,
        createdAt: new Date().toISOString()
      }, { merge: true }))
    }
    await Promise.all(promises)
    // clear local edits (snapshot will refresh)
    for (const id of ids) delete edits[id]
    toast.success(`Berhasil simpan ${promises.length} santri.`)
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  }
  busy.value = false
}

// ── v.100 Batch10: TEMPLATE + IMPOR XLSX rekap prestasi Qiraati (data baru & banyak — kyai) ──
const { importFile } = useExcel()
const importingRekap = ref(false)
const importRekapProgress = ref({ i: 0, total: 0 })
// v.100 Batch12: preview impor (review dulu spt impor santri/guru) sebelum tulis
const importRekapPreview = ref(null)

// Template berisi DAFTAR SANTRI sesuai filter aktif → tinggal isi kolom prestasi lalu impor.
async function downloadTemplateRekap() {
  if (busy.value) return
  busy.value = true
  try {
    const list = filteredSantri.value || []
    const rows = list.map((s) => ({
      nis: s.nis || '', nama: s.nama || '',
      lembaga: s.lembaga || '', kelas: s.kelas || '',
      juz: extractNumber(s.juz) || '',
      awal: s.prestasi_awal || '', akhir: s.prestasi_akhir || '',
      total: s.prestasi_total || ''
    }))
    await exportStyled(rows, {
      filename: `Template_Rekap_Prestasi_${(filterLembaga.value || 'Qiraati').replace(/\s+/g, '_')}.xlsx`,
      sheetName: 'Rekap Prestasi',
      // tanpa KOP — header row 1 supaya importFile auto-detect
      columns: [
        { key: 'nis', header: 'NIS', width: 12 },
        { key: 'nama', header: 'Nama Santri', width: 26 },
        { key: 'lembaga', header: 'Lembaga Qiraati', width: 14 },
        { key: 'kelas', header: 'Kelas', width: 16 },
        { key: 'juz', header: 'Juz (PTPT, angka)', width: 12 },
        { key: 'awal', header: 'Prestasi Awal', width: 14 },
        { key: 'akhir', header: 'Prestasi Akhir', width: 14 },
        { key: 'total', header: 'Prestasi Total (TPQ/PPPH manual)', width: 22 }
      ]
    })
    toast.success(`Template berisi ${rows.length} santri (${filterLembaga.value || 'semua Qiraati'}). PTPT: isi Awal+Akhir (total auto). Lainnya: isi Total.`)
  } catch (e) {
    toast.error('Gagal buat template: ' + (e.message || e))
  } finally {
    busy.value = false
  }
}

function _pickRekap(row, ...aliases) {
  for (const a of aliases) {
    if (row[a] !== undefined && row[a] !== null && row[a] !== '') return row[a]
  }
  const lower = {}
  for (const k of Object.keys(row)) lower[k.toLowerCase().trim()] = row[k]
  for (const a of aliases) {
    const v = lower[String(a).toLowerCase().trim()]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return ''
}

// Ringkasan nilai utk preview
function _fmtNilaiBaru(p) {
  const parts = []
  if (p.prestasi_awal != null && p.prestasi_awal !== '') parts.push(`Awal ${p.prestasi_awal}`)
  if (p.prestasi_akhir != null && p.prestasi_akhir !== '') parts.push(`Akhir ${p.prestasi_akhir}`)
  if (p.prestasi_total != null && p.prestasi_total !== '') parts.push(`Total ${p.prestasi_total}`)
  if (p.juz != null && p.juz !== '') parts.push(p.juz)
  return parts.join(' · ') || '—'
}
function _fmtNilaiLama(s) {
  const parts = []
  if (s.prestasi_awal) parts.push(`Awal ${s.prestasi_awal}`)
  if (s.prestasi_akhir) parts.push(`Akhir ${s.prestasi_akhir}`)
  if (s.prestasi_total) parts.push(`Total ${s.prestasi_total}`)
  if (s.juz) parts.push(s.juz)
  return parts.join(' · ') || '—'
}

// v.100 Batch14: impor Google Form — nama santri sering TAK lengkap & tanpa NIS. Manfaatkan kolom
//   Guru + Kelas + JK utk MEMPERSEMPIT pencarian, lalu cocokkan nama (persis/awalan/token) di lingkup kecil.
//   (Guru/Kelas/JK hanya penyaring — TIDAK ditulis ke santri. Yang ditulis: Juz → field juz, dsb.)
function _normNm(x) { return String(x == null ? '' : x).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() }
function _guruScopeMatch(s, guruIn) {
  const gi = _normNm(guruIn)
  if (!gi) return false
  for (const g of [s.guru_pagi, s.guru_sore, s.guru]) {
    const gn = _normNm(g)
    if (!gn) continue
    if (gn === gi || gn.includes(gi) || gi.includes(gn)) return true
    if (simRatio(fuzzyKey(g), fuzzyKey(guruIn)) >= 0.8) return true
  }
  return false
}
// Cocokkan nama (mungkin tak lengkap) di dalam pool. Return { s, how } | { s:null, ambiguous? }.
function _matchNameInPool(namaIn, pool) {
  const fn = _normNm(namaIn)
  if (!fn) return { s: null }
  const ftok = fn.split(' ').filter(Boolean)
  let cands = pool.filter((s) => _normNm(s.nama) === fn) // 1) persis
  if (cands.length === 1) return { s: cands[0], how: 'Nama' }
  if (cands.length > 1) return { s: null, ambiguous: cands.length }
  cands = pool.filter((s) => { // 2) awalan / subset token (nama form lebih pendek)
    const sn = _normNm(s.nama)
    if (!sn) return false
    if (sn.startsWith(fn) || fn.startsWith(sn)) return true
    const stok = sn.split(' ')
    return ftok.every((t) => stok.some((u) => u === t || u.startsWith(t) || t.startsWith(u)))
  })
  if (cands.length === 1) return { s: cands[0], how: 'Lingkup' }
  if (cands.length > 1) return { s: null, ambiguous: cands.length }
  const m = bestNameMatch(fn, pool, { getName: (x) => x.nama, min: 0.72 }) // 3) fuzzy ejaan (longgar, pool sempit)
  if (m) return { s: m.item, how: 'Mirip' }
  return { s: null }
}

// v.100 Batch12: FASE 1 — baca file → bangun PREVIEW (review dulu, belum tulis ke Firestore).
async function onImportRekap(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  importingRekap.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) { toast.warning('File kosong / format tidak sesuai'); return }
    const list = santriRaw.value || []
    const byNis = new Map()
    const byNama = new Map()
    for (const s of list) {
      const nis = String(s.nis || '').trim()
      if (nis && !byNis.has(nis)) byNis.set(nis, s)
      const nm = String(s.nama || '').trim().toLowerCase()
      if (nm && !byNama.has(nm)) byNama.set(nm, s)
    }
    const plan = []
    let cBaru = 0, cUpdate = 0, cSkip = 0, cNotFound = 0, cFuzzy = 0
    for (const r of rows) {
      const nisIn = String(_pickRekap(r, 'NIS', 'nis') || '').trim()
      const namaIn = String(_pickRekap(r, 'Nama Santri', 'Nama Lengkap Santri', 'Nama', 'nama') || '').trim()
      const namaLow = namaIn.toLowerCase()
      // v.100 Batch14: kolom Google Form sbg PENYARING pencocokan (tidak ditulis ke santri)
      const guruIn = String(_pickRekap(r, 'Nama Lengkap Guru', 'Nama Guru', 'Guru', 'guru') || '').trim()
      const kelasIn = String(_pickRekap(r, 'Sekolah', 'Kelas', 'kelas') || '').trim()
      const jkIn = String(_pickRekap(r, 'Jenis Kelamin', 'JK', 'L/P', 'jk') || '').trim().toUpperCase().charAt(0)
      let s = null, matchBy = ''
      if (nisIn && byNis.get(nisIn)) { s = byNis.get(nisIn); matchBy = 'NIS' }
      else if (namaLow && byNama.get(namaLow)) { s = byNama.get(namaLow); matchBy = 'Nama' }
      else if (namaLow) {
        // v.100 Batch14: bangun POOL ter-scope (guru → kelas → JK), cocokkan nama tak lengkap di lingkup kecil
        let pool = list
        if (guruIn) { const byG = list.filter((x) => _guruScopeMatch(x, guruIn)); if (byG.length) pool = byG }
        if (kelasIn) { const kf = _normNm(kelasIn); const byK = pool.filter((x) => _normNm(x.kelas_sekolah) === kf || _normNm(x.kelas) === kf); if (byK.length) pool = byK }
        if (jkIn === 'L' || jkIn === 'P') { const byJ = pool.filter((x) => String(x.jk || '').toUpperCase().charAt(0) === jkIn); if (byJ.length) pool = byJ }
        const scoped = pool !== list
        const res = _matchNameInPool(namaIn, pool)
        if (res.s) {
          s = res.s
          matchBy = res.how === 'Nama' ? 'Nama' : res.how // 'Lingkup' | 'Mirip'
          if (res.how !== 'Nama') cFuzzy++
        } else if (!scoped) {
          // tanpa info guru/kelas → fallback fuzzy global lama (kemiripan tinggi & tak ambigu)
          const m = bestNameMatch(namaLow, list, { getName: (x) => x.nama })
          if (m) { s = m.item; matchBy = 'Mirip'; cFuzzy++ }
        }
      }
      if (!s) {
        if (nisIn || namaIn) { cNotFound++; plan.push({ action: 'notfound', matchBy: '', nama: namaIn || '(tanpa nama)', nis: nisIn || '-', lembaga: '', nilaiBaru: '—', nilaiLama: '—' }) }
        continue
      }
      const awal = String(_pickRekap(r, 'Prestasi Awal', 'Awal', 'awal') || '').trim()
      const akhir = String(_pickRekap(r, 'Prestasi Akhir', 'Akhir', 'akhir') || '').trim()
      const totalIn = String(_pickRekap(r, 'Prestasi Total (TPQ/PPPH manual)', 'Prestasi Total', 'Total', 'total') || '').trim()
      const juzIn = String(_pickRekap(r, 'Juz (PTPT, angka)', 'Juz', 'juz') || '').trim()
      const payload = {}
      if (awal) payload.prestasi_awal = awal
      if (akhir) payload.prestasi_akhir = akhir
      const isPtpt = String(s.lembaga || '').toLowerCase().trim() === 'ptpt'
      if (isPtpt) {
        // mirror simpanRekap: total PTPT auto dari Awal/Akhir
        const aw = extractNumber(awal || s.prestasi_awal)
        const ak = extractNumber(akhir || s.prestasi_akhir)
        const tot = Math.max(0, ak - aw)
        if (awal || akhir) payload.prestasi_total = tot > 0 ? `${tot} Hal` : ''
        if (juzIn) payload.juz = `JUZ ${extractNumber(juzIn)}`
      } else if (totalIn) {
        payload.prestasi_total = totalIn
      }
      const base = { matchBy, santriId: String(s.id), nama: s.nama || namaIn, nis: s.nis || nisIn || '-', lembaga: s.lembaga || '-', nilaiLama: _fmtNilaiLama(s) }
      if (!Object.keys(payload).length) {
        cSkip++
        plan.push({ ...base, action: 'skip', nilaiBaru: '—' })
        continue
      }
      const hadOld = !!(s.prestasi_total || s.prestasi_awal || s.prestasi_akhir)
      const action = hadOld ? 'update' : 'baru'
      if (action === 'baru') cBaru++; else cUpdate++
      plan.push({ ...base, action, payload, totalIn, nilaiBaru: _fmtNilaiBaru(payload) })
    }
    importRekapPreview.value = { plan, preview: plan.slice(0, 100), cBaru, cUpdate, cSkip, cNotFound, cFuzzy, applyCount: cBaru + cUpdate }
  } catch (e2) {
    toast.error('Gagal baca file: ' + (e2.message || e2))
  } finally {
    importingRekap.value = false
    if (e.target) e.target.value = ''
  }
}

// v.100 Batch12: FASE 2 — terapkan hasil preview (hanya baris Baru/Update).
async function confirmImportRekap() {
  if (!importRekapPreview.value) return
  const items = importRekapPreview.value.plan.filter((p) => p.action === 'baru' || p.action === 'update')
  if (!items.length) { importRekapPreview.value = null; return }
  importingRekap.value = true
  importRekapProgress.value = { i: 0, total: items.length }
  const _periode = new Date().toISOString().slice(0, 7)
  let ok = 0, fail = 0
  try {
    for (const it of items) {
      importRekapProgress.value = { i: importRekapProgress.value.i + 1, total: items.length }
      try {
        await updateDoc(doc(db, 'santri', String(it.santriId)), it.payload)
        // event notif prestasi (sama dgn simpanRekap) → Notif Center wali
        const _npId = `np_${it.santriId}_${_periode}`
        await setDoc(doc(db, 'notif_prestasi', _npId), {
          id: _npId,
          santri_id: String(it.santriId),
          santri_nama: it.nama || '',
          total: String(it.payload.prestasi_total ?? it.totalIn ?? ''),
          periode: _periode,
          createdAt: new Date().toISOString()
        }, { merge: true })
        ok++
      } catch (err) {
        fail++
        console.error('[importRekap]', it.santriId, err)
      }
    }
    toast.success(`Impor rekap: ${ok} santri terisi${fail ? `, ${fail} gagal` : ''}.`)
    importRekapPreview.value = null
  } catch (e2) {
    toast.error('Gagal impor: ' + (e2.message || e2))
  } finally {
    importingRekap.value = false
  }
}

// EXPORT PDF
async function exportPdf() {
  if (busy.value) return
  busy.value = true
  try {
    const judul = `REKAPITULASI PRESTASI QIRAATI BULAN ${String(bulan.value).toUpperCase()} ${tahun.value}`
    const columns = [
      { key: 'no', header: 'No', width: 30 },
      { key: 'nama', header: 'Nama Santri', width: 140 },
      { key: 'jk', header: 'L/P', width: 30 },
      { key: 'lembaga_kelas', header: 'Lembaga/Kls', width: 120 }
    ]
    if (hasPTPT.value) columns.push({ key: 'juz', header: 'Juz', width: 60 })
    columns.push({ key: 'awal', header: 'Awal', width: 70 })
    columns.push({ key: 'akhir', header: 'Akhir', width: 70 })
    columns.push({ key: 'total', header: 'Total', width: 70 })

    let no = 1
    const rows = filteredSantri.value.map((s) => {
      const aw = getEdit(s.id, 'awal') || s.prestasi_awal || ''
      const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir || ''
      const tot = s.lembaga === 'PTPT' ? computedTotal(s) : (getEdit(s.id, 'total') || s.prestasi_total || '')
      const jz = s.lembaga === 'PTPT' ? (getEdit(s.id, 'juz') || s.juz || '-') : '-'
      return {
        no: no++,
        nama: s.nama,
        jk: s.jk || '-',
        lembaga_kelas: `${s.lembaga} - ${s.kelas || '-'}`,
        juz: jz,
        awal: aw,
        akhir: ak,
        total: tot
      }
    })

    const set = settings.savedSettings || {}
    const kop = {
      title: set.kopLine1 || set.txtAppName || '',
      name: set.kopLine2 || '',
      address: set.kopLine3 || '',
      contact: set.kopLine4 || ''
    }
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      kop,
      title: judul,
      columns,
      rows,
      filename: `REKAP_PRESTASI_${bulan.value}_${tahun.value}.pdf`
    })
    toast.success('PDF berhasil di-generate.')
  } catch (e) {
    toast.error('Gagal export PDF: ' + (e.message || e))
  }
  busy.value = false
}

// EXPORT EXCEL
async function exportExcel() {
  if (busy.value) return
  busy.value = true
  try {
    const set = settings.savedSettings || {}
    const judul = `REKAPITULASI PRESTASI QIRAATI BULAN ${String(bulan.value).toUpperCase()} ${tahun.value}`
    const columns = [
      { key: 'no', header: 'No', width: 6 },
      { key: 'nama', header: 'Nama Santri', width: 28 },
      { key: 'jk', header: 'L/P', width: 6 },
      { key: 'lembaga_kelas', header: 'Lembaga/Kelas', width: 22 }
    ]
    if (hasPTPT.value) columns.push({ key: 'juz', header: 'Juz', width: 10 })
    columns.push({ key: 'awal', header: 'Awal Bln', width: 12 })
    columns.push({ key: 'akhir', header: 'Akhir Bln', width: 12 })
    columns.push({ key: 'total', header: 'Total', width: 12 })

    let no = 1
    const rows = filteredSantri.value.map((s) => {
      const aw = getEdit(s.id, 'awal') || s.prestasi_awal || ''
      const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir || ''
      const tot = s.lembaga === 'PTPT' ? computedTotal(s) : (getEdit(s.id, 'total') || s.prestasi_total || '')
      const jz = s.lembaga === 'PTPT' ? (getEdit(s.id, 'juz') || s.juz || '-') : '-'
      return {
        no: no++,
        nama: s.nama,
        jk: s.jk || '-',
        lembaga_kelas: `${s.lembaga} - ${s.kelas || '-'}`,
        juz: jz,
        awal: aw,
        akhir: ak,
        total: tot
      }
    })

    const kopLines = [
      set.kopLine1 || set.txtAppName || '',
      set.kopLine2 || '',
      set.kopLine3 || '',
      set.kopLine4 || ''
    ]
    await exportStyled(rows, {
      filename: `REKAP_PRESTASI_${bulan.value}_${tahun.value}.xlsx`,
      sheetName: 'Rekap Prestasi',
      kop: kopLines,
      subtitle: `${judul} · Total: ${rows.length} santri`,
      columns
    })
    toast.success('Excel berhasil di-generate.')
  } catch (e) {
    toast.error('Gagal export Excel: ' + (e.message || e))
  }
  busy.value = false
}

// v.100 Batch12: kirim Rekap Prestasi ke Google Sheet (reuse data/kolom yang sama dgn Excel)
async function kirimRekapGsheet() {
  if (busy.value) return
  if (!gsheetConfigured()) { toast.warning('Google Sheet belum diatur. Buka Pengaturan → Google Sheet dulu.'); return }
  busy.value = true
  try {
    const set = settings.savedSettings || {}
    const judul = `REKAPITULASI PRESTASI QIRAATI BULAN ${String(bulan.value).toUpperCase()} ${tahun.value}`
    const columns = [
      { key: 'no', header: 'No', width: 6 },
      { key: 'nama', header: 'Nama Santri', width: 28 },
      { key: 'jk', header: 'L/P', width: 6 },
      { key: 'lembaga_kelas', header: 'Lembaga/Kelas', width: 22 }
    ]
    if (hasPTPT.value) columns.push({ key: 'juz', header: 'Juz', width: 10 })
    columns.push({ key: 'awal', header: 'Awal Bln', width: 12 })
    columns.push({ key: 'akhir', header: 'Akhir Bln', width: 12 })
    columns.push({ key: 'total', header: 'Total', width: 12 })
    let no = 1
    const rows = filteredSantri.value.map((s) => {
      const aw = getEdit(s.id, 'awal') || s.prestasi_awal || ''
      const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir || ''
      const tot = s.lembaga === 'PTPT' ? computedTotal(s) : (getEdit(s.id, 'total') || s.prestasi_total || '')
      const jz = s.lembaga === 'PTPT' ? (getEdit(s.id, 'juz') || s.juz || '-') : '-'
      return { no: no++, nama: s.nama, jk: s.jk || '-', lembaga_kelas: `${s.lembaga} - ${s.kelas || '-'}`, juz: jz, awal: aw, akhir: ak, total: tot }
    })
    const kopLines = [set.kopLine1 || set.txtAppName || '', set.kopLine2 || '', set.kopLine3 || '', set.kopLine4 || ''].filter(Boolean)
    const { url } = await sendToSheet({
      rows,
      title: `Rekap Prestasi ${bulan.value} ${tahun.value}`,
      sheetName: 'Rekap Prestasi',
      kop: kopLines,
      subtitle: `${judul} · Total: ${rows.length} santri`,
      columns
    })
    toast.success(`${rows.length} santri terkirim ke Google Sheet.`)
    try { window.open(url, '_blank') } catch (e) { /* ignore */ }
  } catch (e) {
    toast.error('Gagal kirim ke Google Sheet: ' + (e?.message || e))
  } finally {
    busy.value = false
  }
}

// CETAK HTML (print preview newwindow)
function cetakHTML() {
  const set = settings.savedSettings || {}
  const judul = `REKAPITULASI PRESTASI QIRAATI BULAN ${String(bulan.value).toUpperCase()} ${tahun.value}`
  let no = 1
  let lastKey = ''
  let bodyRows = ''
  for (const s of filteredSantri.value) {
    const aw = getEdit(s.id, 'awal') || s.prestasi_awal || ''
    const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir || ''
    const tot = s.lembaga === 'PTPT' ? computedTotal(s) : (getEdit(s.id, 'total') || s.prestasi_total || '')
    const jz = s.lembaga === 'PTPT' ? (getEdit(s.id, 'juz') || s.juz || '-') : '-'
    const g = guruRaw.value.find((x) => x.nama === s.guru)
    const guruName = g ? getNamaGuruGelar(g.nama, g.jk) : (s.guru || '-')
    const key = `${s.lembaga}::${s.kelas}::${s.guru}`
    if (key !== lastKey) {
      lastKey = key
      const cols = hasPTPT.value ? 8 : 7
      bodyRows += `<tr style="background:#e2e8f0;"><td colspan="${cols}" style="padding:6px;font-weight:900;text-transform:uppercase;">LEMBAGA: ${s.lembaga} | KELAS: ${s.kelas || '-'} | GURU: ${guruName}</td></tr>`
    }
    bodyRows += `<tr><td>${no++}</td><td style="text-align:left;">${s.nama}</td><td>${s.jk || '-'}</td><td>${s.lembaga} - ${s.kelas || '-'}</td>${hasPTPT.value ? `<td>${jz}</td>` : ''}<td>${aw}</td><td>${ak}</td><td>${tot}</td></tr>`
  }
  const head = `<tr><th>No</th><th>Nama Santri</th><th>L/P</th><th>Lembaga/Kelas</th>${hasPTPT.value ? '<th>Juz</th>' : ''}<th>Awal</th><th>Akhir</th><th>Total</th></tr>`
  const html = `<html><head><title>${judul}</title><style>
    body{font-family:Arial,sans-serif;padding:20px;color:#1e293b;}
    .header{text-align:center;margin-bottom:14px;}
    .header h2{margin:4px 0;font-size:14px;text-decoration:underline;}
    .header p{margin:2px 0;font-size:11px;}
    table{width:100%;border-collapse:collapse;font-size:11px;}
    th,td{border:1px solid #000;padding:6px;text-align:center;}
    th{background:#e5e7eb;font-weight:bold;}
  </style></head><body>
  <div class="header">
    <p style="font-weight:bold;">${set.kopLine1 || set.txtAppName || ''}</p>
    <h1 style="margin:2px 0;font-size:16px;font-weight:900;">${set.kopLine2 || ''}</h1>
    <p>${set.kopLine3 || ''}</p>
    <p>${set.kopLine4 || ''}</p>
    <h2>${judul}</h2>
    <p>Dicetak: ${new Date().toLocaleString('id-ID')}</p>
  </div>
  <table><thead>${head}</thead><tbody>${bodyRows}</tbody></table>
  </body></html>`
  const w = window.open('', '_blank', 'width=900,height=700')
  if (!w) {
    toast.error('Popup diblokir. Izinkan popup untuk print.')
    return
  }
  w.document.write(html)
  w.document.close()
  setTimeout(() => { try { w.print() } catch (_) {} }, 350)
}

// SUBSCRIBE
// Auto-init untuk guru mode: ngaji-only langsung input, sekolah-only ke Diniyah
let _guruInited = false
function initGuruFlow() {
  if (_guruInited || !isGuruMode.value || !santriRaw.value.length) return
  _guruInited = true
  const hasNgaji = santriRaw.value.some((s) => s.aktif !== false && ownNgaji(s))
  const lmbList = santriQiraati.value // ngaji list (sudah filter qiraati lembaga)
  // hasSekolah: santri yg guru ampu di sekolah
  const gn = _lowS(auth.sesiAktif?.guru || auth.sesiAktif?.nama)
  const hasSekolah = santriRaw.value.some((s) => {
    if (s.aktif === false) return false
    const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah.map(_lowS) : []
    return arr.includes(gn)
  })
  if (hasNgaji && !hasSekolah) {
    filterLembaga.value = ''
    viewStep.value = 'input'
  } else if (!hasNgaji && hasSekolah) {
    router.push('/rekap-diniyah')
  }
  // both → tetap landing
}

onMounted(() => {
  // v.21.84.0527: reset ke landing setiap fresh mount supaya gak stuck di step=input
  viewStep.value = 'landing'
  filterLembaga.value = ''
  _guruInited = false
  unsubSantri = subscribeColl('santri', (docs) => {
    santriRaw.value = docs
    loading.value = false
    initGuruFlow()
  })
  unsubGuru = subscribeColl('guru', (docs) => {
    guruRaw.value = docs
  })
})
onUnmounted(() => {
  if (unsubSantri) { try { unsubSantri() } catch (e) {} }
  if (unsubGuru) { try { unsubGuru() } catch (e) {} }
})

// reset filterKelas kalau lembaga ganti
watch(filterLembaga, () => { filterKelas.value = '' })
</script>
