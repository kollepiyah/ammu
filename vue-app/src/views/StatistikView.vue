<template>
  <!-- v.66.0526: Dashboard Statistik full Vue — per role -->
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <div v-if="role !== 'santri'" class="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-5 md:p-6 text-white shadow-lg">
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-chart-pie mr-1"></i>Dashboard Statistik
      </p>
      <h2 class="text-xl md:text-2xl font-black mt-1">{{ title }}</h2>
      <p class="text-xs md:text-sm font-medium mt-1 opacity-90">{{ subtitle }}</p>
    </div>

    <div v-if="role === 'santri' && santriMe" class="bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-700 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
      <img src="/logo.png" alt="" aria-hidden="true" class="absolute -right-4 -top-4 w-44 h-44 object-contain opacity-10 pointer-events-none" />
      <div class="relative">
        <h2 class="text-2xl md:text-3xl font-black drop-shadow">Ahlan, {{ santriMe.nama }}!</h2>
        <p class="text-xs md:text-sm text-emerald-50/90 mt-1">Selamat datang di Portal Santri Qiraati</p>
        <span v-if="santriMe.nis" class="inline-block mt-3 bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1 rounded-full">NIS: {{ santriMe.nis }}</span>
        <button @click="goProfil" class="ml-2 mt-3 inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer">
          <i class="fas fa-id-card"></i>Lihat Data Diri
        </button>
      </div>
    </div>

    <div v-if="role === 'santri' && santriMe" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
          <i class="fas fa-id-card text-teal-600"></i>Data Saat Ini
        </h3>
        <div class="space-y-3">
          <div>
            <p class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Kelas Sekolah</p>
            <p class="text-sm font-black text-slate-800 dark:text-white mt-0.5">{{ santriMe.kelas_sekolah || '-' }}</p>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Lembaga Qiraati</p>
            <p class="text-sm font-black text-teal-700 dark:text-teal-300 mt-0.5">{{ santriMe.lembaga || '-' }}</p>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Jilid / Kelas</p>
            <p class="text-sm font-black text-slate-800 dark:text-white mt-0.5">
              {{ santriMe.kelas || '-' }}{{ santriMe.juz && santriMe.juz !== '-' ? ' (Juz ' + santriMe.juz + ')' : '' }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Guru Kelas</p>
            <p class="text-sm font-black text-slate-800 dark:text-white mt-0.5">{{ santriMe.guru || santriMe.guru_pagi || santriMe.guru_sore || '-' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
          <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
            <i class="fas fa-trophy text-amber-600"></i>Capaian Prestasi
          </h3>
          <span class="text-[10px] font-black bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Periode: {{ periodeHijri }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2 md:gap-3">
          <div class="bg-teal-50 dark:bg-teal-900/20 rounded-xl py-3 px-2 text-center border border-teal-100 dark:border-teal-700">
            <p class="text-[9px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider">Awal Bulan</p>
            <p class="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-1">{{ santriMe.prestasi_awal || '-' }}</p>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 px-2 text-center border border-emerald-100 dark:border-emerald-700">
            <p class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Akhir Bulan</p>
            <p class="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-1">{{ santriMe.prestasi_akhir || '-' }}</p>
          </div>
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl py-3 px-2 text-center border border-amber-100 dark:border-amber-700">
            <p class="text-[9px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider">Total Prestasi</p>
            <p class="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-1">{{ santriMe.prestasi_total || '-' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- v.20.32.0526: SANTRI Catatan Bulan Ini (langsung tampil tanpa accordion, kyai req) -->
    <div v-if="role === 'santri' && santriMe && catatanBulanIni" class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 md:p-5 border border-amber-200 dark:border-amber-700 shadow-sm">
      <div class="flex items-start gap-3">
        <i class="fas fa-comment-dots text-amber-600 text-xl mt-1 flex-shrink-0"></i>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1">
            Catatan Bulan Ini ({{ NAMA_BULAN_CATATAN[bulanCatatan] }} {{ tahunCatatan }})
          </p>
          <p class="text-sm text-slate-800 dark:text-white whitespace-pre-line leading-relaxed">{{ catatanBulanIni }}</p>
        </div>
      </div>
    </div>

    <!-- v.20.13.0526: SANTRI 4 Accordion Sections -->
    <div v-if="role === 'santri' && santriMe" class="space-y-3">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <button @click="toggleAcc('rekap')" class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md flex-shrink-0">
              <i class="fas fa-book-open text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-slate-800 dark:text-white">Rekap Prestasi Bulanan</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Nilai Qiraati & Diniyah per bulan</p>
            </div>
          </div>
          <i :class="['fas text-slate-400 transition-transform', acc.rekap ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <div v-if="acc.rekap" class="border-t border-slate-100 dark:border-slate-700 p-4 md:p-5 bg-slate-50/50 dark:bg-slate-900/20">
          <p class="text-xs text-slate-500 dark:text-slate-400 italic mb-3">
            <i class="fas fa-info-circle mr-1"></i>Detail nilai bulanan & history capaian.
          </p>
          <router-link to="/rekap-prestasi" class="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm">
            <i class="fas fa-external-link-alt"></i>Buka Rekap Lengkap
          </router-link>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <button @click="toggleAcc('statistik')" class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md flex-shrink-0">
              <i class="fas fa-chart-line text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-slate-800 dark:text-white">Statistik Prestasi</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Selisih, total halaman, mutasi, status</p>
            </div>
          </div>
          <i :class="['fas text-slate-400 transition-transform', acc.statistik ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <div v-if="acc.statistik" class="border-t border-slate-100 dark:border-slate-700 p-4 md:p-5 bg-slate-50/50 dark:bg-slate-900/20">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center border border-emerald-100 dark:border-emerald-700">
              <p class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Selisih Capaian</p>
              <p class="text-2xl md:text-3xl font-black text-emerald-800 dark:text-emerald-200 mt-1">{{ selisihCapaian }}</p>
              <p class="text-[8px] text-slate-500 mt-0.5">halaman</p>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center border border-blue-100 dark:border-blue-700">
              <p class="text-[9px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider">Total Hal/Bulan</p>
              <p class="text-2xl md:text-3xl font-black text-blue-800 dark:text-blue-200 mt-1">{{ santriMe.prestasi_total || '-' }}</p>
              <p class="text-[8px] text-slate-500 mt-0.5">{{ statusPrestasi }}</p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center border border-purple-100 dark:border-purple-700">
              <p class="text-[9px] font-black text-purple-700 dark:text-purple-300 uppercase tracking-wider">Riwayat Mutasi</p>
              <p class="text-2xl md:text-3xl font-black text-purple-800 dark:text-purple-200 mt-1">{{ santriRiwayatCount }}</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center border border-amber-100 dark:border-amber-700">
              <p class="text-[9px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider">Lembaga/Kelas</p>
              <p class="text-sm md:text-base font-black text-amber-800 dark:text-amber-200 mt-1 truncate">{{ santriMe.lembaga || '-' }}</p>
              <p class="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-0.5">{{ santriMe.kelas || '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <button @click="toggleAcc('kartu')" class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
              <i class="fas fa-id-card text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-slate-800 dark:text-white">Kartu Kenaikan</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Tanggal naik jilid & catatan guru</p>
            </div>
          </div>
          <i :class="['fas text-slate-400 transition-transform', acc.kartu ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <div v-if="acc.kartu" class="border-t border-slate-100 dark:border-slate-700 p-4 md:p-5 bg-slate-50/50 dark:bg-slate-900/20">
          <div v-if="santriRiwayatCount === 0" class="text-center py-6">
            <i class="fas fa-inbox text-slate-300 text-2xl mb-2"></i>
            <p class="text-xs text-slate-500 italic">Belum ada riwayat kenaikan jilid.</p>
          </div>
          <div v-else class="space-y-2">
            <div class="text-xs text-slate-700 dark:text-slate-300">
              <p class="mb-2"><strong>Total Riwayat:</strong> {{ santriRiwayatCount }} entry</p>
              <p class="text-slate-500">Klik tombol di bawah untuk lihat kartu kenaikan lengkap dengan catatan & rekomendasi guru.</p>
            </div>
          </div>
          <router-link to="/naik-kelas" class="mt-3 inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm">
            <i class="fas fa-external-link-alt"></i>Buka Kartu Kenaikan
          </router-link>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <button @click="toggleAcc('rapor')" class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md flex-shrink-0">
              <i class="fas fa-graduation-cap text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-slate-800 dark:text-white">Rapor Semester</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Nilai rapor lengkap (PDF print)</p>
            </div>
          </div>
          <i :class="['fas text-slate-400 transition-transform', acc.rapor ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <div v-if="acc.rapor" class="border-t border-slate-100 dark:border-slate-700 p-4 md:p-5 bg-slate-50/50 dark:bg-slate-900/20">
          <p class="text-xs text-slate-500 dark:text-slate-400 italic mb-3">
            <i class="fas fa-info-circle mr-1"></i>Rapor semester (Qiraati & Diniyah) dengan opsi cetak / Save as PDF.
          </p>
          <router-link to="/rapor" class="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm">
            <i class="fas fa-external-link-alt"></i>Buka Rapor Semester
          </router-link>
        </div>
      </div>
    </div>

    <!-- Cards utama (admin & guru) -->
    <div v-if="role === 'admin' || role === 'guru'" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-3 md:p-4 shadow-sm text-white">
        <i class="fas fa-users text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ statSantri }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">{{ titleStatSantri }}</p>
      </div>
      <div class="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-3 md:p-4 shadow-sm text-white">
        <i class="fas fa-chalkboard-teacher text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ statGuru }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">{{ titleStatGuru }}</p>
      </div>
      <div v-if="role === 'admin'" class="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-3 md:p-4 shadow-sm text-white">
        <i class="fas fa-building text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalLembaga }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">Lembaga Aktif</p>
      </div>
      <div v-if="role === 'admin'" class="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl p-3 md:p-4 shadow-sm text-white">
        <i class="fas fa-door-open text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalKelas }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">Kelas Total</p>
      </div>
    </div>

    <!-- v.72.5: Top 5 Santri Prestasi per Lembaga (admin only) -->
    <div v-if="role === 'admin' && lembagaForRanking.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div v-for="lemb in lembagaForRanking" :key="lemb.nama" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
          <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white uppercase tracking-wider">{{ lemb.nama }}</h3>
          <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{{ lemb.dinilai }}/{{ lemb.total }} dinilai</p>
        </div>

        <div v-if="lemb.nama === 'PTPT'" class="grid grid-cols-3 gap-2 mb-3">
          <div class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-lg p-2 text-center">
            <p class="text-[10px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider">Kurang</p>
            <p class="text-xl font-black text-rose-700 dark:text-rose-300 mt-0.5">{{ lemb.kurang }}</p>
            <p class="text-[8px] text-rose-600 dark:text-rose-400 mt-0.5">&lt;5 hal</p>
          </div>
          <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-2 text-center">
            <p class="text-[10px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider">Cukup</p>
            <p class="text-xl font-black text-amber-700 dark:text-amber-300 mt-0.5">{{ lemb.cukup }}</p>
            <p class="text-[8px] text-amber-600 dark:text-amber-400 mt-0.5">5-9 hal</p>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center">
            <p class="text-[10px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Bagus</p>
            <p class="text-xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">{{ lemb.bagus }}</p>
            <p class="text-[8px] text-emerald-600 dark:text-emerald-400 mt-0.5">&gt;=10 hal</p>
          </div>
        </div>

        <p class="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
          <i class="fas fa-trophy text-amber-500 mr-1"></i>Top 5 Santri Prestasi Tertinggi
        </p>
        <div v-if="lemb.top5.length === 0" class="text-xs text-slate-400 italic text-center py-3">
          Belum ada data prestasi pada periode ini.
        </div>
        <ol v-else class="space-y-1.5">
          <li v-for="(s, idx) in lemb.top5" :key="s.id" class="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/30 px-2 py-1.5 rounded-lg">
            <span :class="[
              'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0',
              idx === 0 ? 'bg-amber-400 text-amber-900' : idx === 1 ? 'bg-slate-300 text-slate-700' : idx === 2 ? 'bg-orange-400 text-orange-900' : 'bg-slate-200 text-slate-600'
            ]">{{ idx + 1 }}</span>
            <p class="flex-1 text-xs font-bold text-slate-800 dark:text-white truncate">{{ s.nama }}</p>
            <p class="text-xs font-black text-blue-700 dark:text-blue-300">{{ s.totalDisplay }}</p>
          </li>
        </ol>
      </div>
    </div>

    <!-- Statistik Lembaga per-lembaga 3 metrics -->
    <div v-if="role === 'admin' && statistikLembaga.length > 0">
      <h3 class="text-sm md:text-base font-black text-slate-800 dark:text-white mb-3">
        <i class="fas fa-chart-pie text-purple-600 mr-2"></i>Statistik Lembaga
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="l in statistikLembaga" :key="l.nama" class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm border-l-4 border-l-teal-500 hover:shadow-md transition">
          <h4 class="font-black text-slate-800 dark:text-white text-sm uppercase tracking-wider mb-3">{{ l.nama }}</h4>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="bg-teal-50 dark:bg-teal-900/20 rounded-lg py-2 border border-teal-100 dark:border-teal-800">
              <p class="text-[9px] text-teal-700 dark:text-teal-300 font-bold uppercase">Kelas</p>
              <p class="text-lg font-black text-teal-800 dark:text-teal-200">{{ l.kelas }}</p>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg py-2 border border-blue-100 dark:border-blue-800">
              <p class="text-[9px] text-blue-700 dark:text-blue-300 font-bold uppercase">Santri</p>
              <p class="text-lg font-black text-blue-800 dark:text-blue-200">{{ l.santri }}</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg py-2 border border-amber-100 dark:border-amber-800">
              <p class="text-[9px] text-amber-700 dark:text-amber-300 font-bold uppercase">Guru</p>
              <p class="text-lg font-black text-amber-800 dark:text-amber-200">{{ l.guru }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="role === 'admin' && breakdownLembaga.length > 0" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <i class="fas fa-chart-bar text-emerald-600 mr-2"></i>Distribusi Santri per Lembaga
      </h3>
      <div class="space-y-2">
        <div v-for="row in breakdownLembaga" :key="row.nama" class="flex items-center gap-3">
          <p class="text-xs font-bold text-slate-700 dark:text-slate-200 w-32 truncate flex-shrink-0">{{ row.nama }}</p>
          <div class="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-5 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-end px-2 text-[10px] font-black text-white transition-all" :style="{ width: row.pct + '%' }">
              {{ row.count }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- v.20.80.0526 M9: 4 Charts admin (chart.js) -->
    <AdminStatsCharts v-if="role === 'admin'" :santri-list="santriRaw" />

    <!-- v.20.25.0526: Statistik Guru lengkap -->
    <template v-if="role === 'guru'">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
          <i class="fas fa-user-tie text-purple-600 mr-2"></i>Statistik Pengajaran Saya
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-purple-700 uppercase">Santri Diampu</p>
            <p class="text-2xl font-black text-slate-800 dark:text-white">{{ statSantri }}</p>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-blue-700 uppercase">Kelas Diampu</p>
            <p class="text-2xl font-black text-slate-800 dark:text-white">{{ kelasGuruList.length }}</p>
          </div>
          <div class="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-amber-700 uppercase">Lembaga</p>
            <p class="text-sm font-black text-slate-800 dark:text-white truncate">{{ myLembaga }}</p>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-emerald-700 uppercase">Jabatan</p>
            <p class="text-xs font-black text-slate-800 dark:text-white truncate">{{ myJabatan }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
          <i class="fas fa-clipboard-check text-emerald-600 mr-2"></i>Kehadiran Saya Bulan Ini
        </h3>
        <div class="grid grid-cols-4 gap-2 text-center">
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 border border-emerald-100">
            <p class="text-[9px] font-black text-emerald-700 uppercase tracking-wider">Hadir</p>
            <p class="text-2xl font-black text-emerald-700 mt-1">{{ guruAbsensi.hadir }}</p>
          </div>
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl py-3 border border-amber-100">
            <p class="text-[9px] font-black text-amber-700 uppercase tracking-wider">Sakit</p>
            <p class="text-2xl font-black text-amber-700 mt-1">{{ guruAbsensi.sakit }}</p>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl py-3 border border-blue-100">
            <p class="text-[9px] font-black text-blue-700 uppercase tracking-wider">Izin</p>
            <p class="text-2xl font-black text-blue-700 mt-1">{{ guruAbsensi.izin }}</p>
          </div>
          <div class="bg-rose-50 dark:bg-rose-900/20 rounded-xl py-3 border border-rose-100">
            <p class="text-[9px] font-black text-rose-700 uppercase tracking-wider">Alpa</p>
            <p class="text-2xl font-black text-rose-700 mt-1">{{ guruAbsensi.alpa }}</p>
          </div>
        </div>
      </div>

      <div v-if="kelasGuruList.length > 0" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
          <i class="fas fa-chalkboard-teacher text-blue-600 mr-2"></i>Kelas Saya
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div v-for="k in kelasGuruList" :key="k.lembaga + '_' + k.kelas" class="flex items-center justify-between gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-800 dark:text-white truncate">{{ k.lembaga }} · Kelas {{ k.kelas }}</p>
              <p class="text-[10px] text-slate-500"><i class="fas fa-users mr-1"></i>{{ k.santriCount }} santri</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-if="role === 'santri' && santriMe?.tanggal_masuk" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-xs md:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
        <i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Mondok
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        <i class="fas fa-calendar-day text-emerald-500 mr-1.5"></i>
        <span class="text-slate-500 font-bold">Mondok sejak:</span>
        <span class="font-black text-slate-800 dark:text-white ml-1.5">{{ santriMe.tanggal_masuk }}</span>
      </p>
    </div>

    <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm text-center">
      <i class="fas fa-spinner fa-spin text-2xl text-slate-300 dark:text-slate-600"></i>
      <p class="text-xs text-slate-400 mt-2">Memuat data statistik...</p>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { useGuru } from '@/composables/useGuru'
import { useLembaga } from '@/composables/useLembaga'
import { subscribeColl } from '@/services/firestore'
import { useSettingsStore } from '@/stores/settings'
// v.20.80.0526 M9: 4 Charts admin
import AdminStatsCharts from '@/components/charts/AdminStatsCharts.vue'

const router = useRouter()
const settingsForSantri = useSettingsStore()

const acc = reactive({
  rekap: false,
  statistik: true,
  kartu: false,
  rapor: false
})
function toggleAcc(key) {
  acc[key] = !acc[key]
}

const auth = useAuthStore()
const { santriRaw, loading: loadingSantri } = useSantri()
const { guruRaw, loading: loadingGuru } = useGuru()
const { lembagaRaw } = useLembaga()
const lembagaList = lembagaRaw

const role = computed(() => auth.sesiAktif?.role || 'guest')
const loading = computed(() => loadingSantri.value || loadingGuru.value)

const isStatusAktif = (s) =>
  !s || ['aktif', 'tetap', 'kontrak'].includes(String(s).toLowerCase())

const totalSantriAll = computed(() => santriRaw.value.length)
const aktifSantri = computed(() => santriRaw.value.filter((s) => s.aktif !== false).length)
const nonaktifSantri = computed(() => totalSantriAll.value - aktifSantri.value)

const totalGuruAll = computed(() => guruRaw.value.length)
const aktifGuru = computed(() => guruRaw.value.filter((g) => isStatusAktif(g.status)).length)
const nonaktifGuru = computed(() => totalGuruAll.value - aktifGuru.value)

const totalLembaga = computed(() => {
  if (lembagaList.value.length > 0) return lembagaList.value.length
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.aktif !== false && s.lembaga) set.add(String(s.lembaga).toUpperCase().trim())
  }
  return set.size
})
const totalKelas = computed(() => {
  if (lembagaList.value.length > 0) {
    const fromList = lembagaList.value.reduce((sum, l) => sum + (Array.isArray(l.kelas_list) ? l.kelas_list.length : 0), 0)
    if (fromList > 0) return fromList
  }
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.aktif !== false && s.lembaga && s.kelas) {
      set.add(`${String(s.lembaga).toUpperCase().trim()}|${String(s.kelas).toUpperCase().trim()}`)
    }
  }
  return set.size
})

function extractNum(v) {
  const m = String(v || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}
function totalDisplayLembaga(s) {
  if (s.lembaga === 'PTPT') {
    const d = extractNum(s.prestasi_akhir) - extractNum(s.prestasi_awal)
    return d > 0 ? `${d} Hal` : '-'
  }
  return s.prestasi_total || extractNum(s.prestasi_akhir) || '-'
}
const lembagaForRanking = computed(() => {
  if (role.value !== 'admin') return []
  const LEMBAGA_ORDER = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'SDI', 'PKBM']
  const allLembaga = lembagaList.value.map((l) => l.lembaga).filter(Boolean)
  const ordered = [
    ...LEMBAGA_ORDER.filter((n) => allLembaga.includes(n)),
    ...allLembaga.filter((n) => !LEMBAGA_ORDER.includes(n))
  ]
  return ordered.map((nama) => {
    const list = santriRaw.value.filter((s) => s.aktif !== false && s.lembaga === nama)
    const dinilai = list.filter((s) => extractNum(s.prestasi_akhir) > 0).length
    const sorted = [...list].sort((a, b) => {
      const ta = a.lembaga === 'PTPT' ? extractNum(a.prestasi_akhir) - extractNum(a.prestasi_awal) : extractNum(a.prestasi_akhir)
      const tb = b.lembaga === 'PTPT' ? extractNum(b.prestasi_akhir) - extractNum(b.prestasi_awal) : extractNum(b.prestasi_akhir)
      return tb - ta
    })
    const top5 = sorted.slice(0, 5).filter((s) => extractNum(s.prestasi_akhir) > 0).map((s) => ({
      id: s.id,
      nama: s.nama,
      totalDisplay: totalDisplayLembaga(s)
    }))
    let kurang = 0, cukup = 0, bagus = 0
    if (nama === 'PTPT') {
      for (const s of list) {
        const d = extractNum(s.prestasi_akhir) - extractNum(s.prestasi_awal)
        if (d <= 0) continue
        if (d < 5) kurang++
        else if (d < 10) cukup++
        else bagus++
      }
    }
    return { nama, total: list.length, dinilai, top5, kurang, cukup, bagus }
  })
})

const breakdownLembaga = computed(() => {
  if (role.value !== 'admin') return []
  const grouped = {}
  santriRaw.value
    .filter((s) => s.aktif !== false)
    .forEach((s) => {
      const lembaga = s.lembaga || '(Tanpa Lembaga)'
      grouped[lembaga] = (grouped[lembaga] || 0) + 1
    })
  const max = Math.max(...Object.values(grouped), 1)
  return Object.entries(grouped)
    .map(([nama, count]) => ({ nama, count, pct: Math.max(8, Math.round((count / max) * 100)) }))
    .sort((a, b) => b.count - a.count)
})

const statistikLembaga = computed(() => {
  if (role.value !== 'admin') return []
  const lembagaPendidikan = (lembagaList.value || []).filter((l) => l.kelas && l.kelas.length > 0)
  const ORDER = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'TPQ', 'P3H']
  return lembagaPendidikan
    .map((l) => {
      const nama = l.lembaga || l.nama
      const santriLmbg = santriRaw.value.filter(
        (s) => (s.lembaga === nama || s.lembaga_sekolah === nama) && s.aktif !== false
      )
      const guruSet = new Set(santriLmbg.map((s) => s.guru).filter(Boolean))
      const jmlKelas = guruSet.size
      const jmlSantri = santriLmbg.length
      const jmlGuru = guruRaw.value.filter((g) => g.lembaga === nama && isStatusAktif(g.status)).length
      return { nama, kelas: jmlKelas, santri: jmlSantri, guru: jmlGuru }
    })
    .sort((a, b) => {
      const ia = ORDER.indexOf(a.nama)
      const ib = ORDER.indexOf(b.nama)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
})

const title = computed(() => {
  if (role.value === 'admin') return 'Statistik Lengkap'
  if (role.value === 'guru') return 'Statistik Kelas Saya'
  if (role.value === 'santri') return 'Statistik Saya'
  return 'Statistik'
})
const subtitle = computed(() => {
  if (role.value === 'admin') return 'Data ringkas seluruh pondok.'
  if (role.value === 'guru') return 'Santri yang Anda ajar & data kehadiran Anda.'
  if (role.value === 'santri') return 'Pencapaian & prestasi Anda di pondok.'
  return ''
})

const statSantri = computed(() => {
  if (role.value === 'admin') return totalSantriAll.value
  if (role.value === 'guru') {
    const myName = String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '').toLowerCase().trim()
    if (!myName) return 0
    return santriRaw.value.filter((s) => {
      if (s.aktif === false) return false
      const gp = String(s.guru_pagi || '').toLowerCase().trim()
      const gs = String(s.guru_sore || '').toLowerCase().trim()
      const gOld = String(s.guru || '').toLowerCase().trim()
      const gsek = Array.isArray(s.guru_sekolah)
        ? s.guru_sekolah.map((x) => String(x || '').toLowerCase().trim())
        : []
      return gp === myName || gs === myName || gOld === myName || gsek.includes(myName)
    }).length
  }
  return 0
})
const titleStatSantri = computed(() => {
  if (role.value === 'admin') {
    return nonaktifSantri.value > 0 ? `Total (${aktifSantri.value} aktif / ${nonaktifSantri.value} non)` : 'Total Santri'
  }
  if (role.value === 'guru') return 'Santri Saya'
  return 'Santri'
})

const statGuru = computed(() => {
  if (role.value === 'admin') return totalGuruAll.value
  return 0
})
const titleStatGuru = computed(() => {
  if (role.value === 'admin') {
    return nonaktifGuru.value > 0 ? `Total (${aktifGuru.value} aktif / ${nonaktifGuru.value} non)` : 'Total Guru/Pegawai'
  }
  return 'Guru'
})

const santriMe = computed(() => {
  if (role.value !== 'santri') return null
  const id = auth.sesiAktif?.id
  return santriRaw.value.find((s) => String(s.id) === String(id)) || null
})

// v.20.32.0526: Catatan bulanan dari santri.catatan_bulanan[YYYY_MM]
const NAMA_BULAN_CATATAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const _nowCatatan = new Date()
const bulanCatatan = _nowCatatan.getMonth()
const tahunCatatan = _nowCatatan.getFullYear()
const catatanBulanIni = computed(() => {
  const s = santriMe.value
  if (!s || !s.catatan_bulanan || typeof s.catatan_bulanan !== 'object') return ''
  const key = `${tahunCatatan}_${String(bulanCatatan + 1).padStart(2, '0')}`
  return s.catatan_bulanan[key] || ''
})

function _extractNum(v) {
  const m = String(v || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}
const selisihCapaian = computed(() => {
  if (!santriMe.value) return 0
  const akhir = _extractNum(santriMe.value.prestasi_akhir)
  const awal = _extractNum(santriMe.value.prestasi_awal)
  return Math.max(0, akhir - awal)
})
const statusPrestasi = computed(() => {
  if (!santriMe.value) return ''
  const total = _extractNum(santriMe.value.prestasi_total)
  if (total === 0) return 'BELUM DINILAI'
  if (total < 5) return 'KURANG'
  if (total <= 9) return 'CUKUP'
  return 'BAGUS'
})
const santriRiwayatCount = computed(() => {
  const kk = santriMe.value?.kartu_kenaikan
  if (!kk || typeof kk !== 'object') return 0
  let total = 0
  for (const lembaga in kk) {
    for (const kelasId in (kk[lembaga] || {})) {
      const entries = kk[lembaga][kelasId]?.entries || []
      total += Array.isArray(entries) ? entries.length : 0
    }
  }
  return total
})
const periodeHijri = computed(() => {
  return settingsForSantri.settings?.periodeAktif || "Dzulqo'dah 1447"
})
function goProfil() {
  router.push('/profil')
}

const myGuru = computed(() => {
  if (role.value !== 'guru') return null
  const id = auth.sesiAktif?.id
  return guruRaw.value.find((g) => String(g.id) === String(id)) || null
})
const myLembaga = computed(() => myGuru.value?.lembaga || '-')
const myJabatan = computed(() => myGuru.value?.jabatan || 'Guru')

const kelasGuruList = computed(() => {
  if (role.value !== 'guru') return []
  const myName = String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '').toLowerCase().trim()
  if (!myName) return []
  const map = new Map()
  for (const s of santriRaw.value) {
    if (s.aktif === false) continue
    const gp = String(s.guru_pagi || '').toLowerCase().trim()
    const gs = String(s.guru_sore || '').toLowerCase().trim()
    const gOld = String(s.guru || '').toLowerCase().trim()
    const gsek = Array.isArray(s.guru_sekolah) ? s.guru_sekolah.map((x) => String(x || '').toLowerCase().trim()) : []
    if (gp !== myName && gs !== myName && gOld !== myName && !gsek.includes(myName)) continue
    const key = `${s.lembaga || '-'}_${s.kelas || '-'}`
    if (!map.has(key)) map.set(key, { lembaga: s.lembaga || '-', kelas: s.kelas || '-', santriCount: 0 })
    map.get(key).santriCount++
  }
  return [...map.values()].sort((a, b) =>
    String(a.lembaga).localeCompare(String(b.lembaga)) || String(a.kelas).localeCompare(String(b.kelas))
  )
})

const absensiShiftRaw = ref([])
let _unsubAbsensi = null
onMounted(() => {
  _unsubAbsensi = subscribeColl('absensi_shift_guru', (docs) => { absensiShiftRaw.value = docs || [] })
})
onUnmounted(() => { if (_unsubAbsensi) try { _unsubAbsensi() } catch (e) {} })
const guruAbsensi = computed(() => {
  const guru = myGuru.value
  if (!guru) return { hadir: 0, sakit: 0, izin: 0, alpa: 0 }
  const now = new Date()
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-`
  let hadir = 0, sakit = 0, izin = 0, alpa = 0
  for (const a of absensiShiftRaw.value) {
    if (!String(a.tanggal || '').startsWith(prefix)) continue
    if (String(a.guru_id || a.guruId || '') !== String(guru.id)) continue
    const st = String(a.status || '').toLowerCase()
    if (st === 'hadir' || st === 'masuk') hadir++
    else if (st === 'sakit') sakit++
    else if (st === 'izin') izin++
    else if (st === 'alpa' || st === 'alpha') alpa++
  }
  return { hadir, sakit, izin, alpa }
})
</script>
