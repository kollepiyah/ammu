<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
    <!-- ============================================================
         HEADER BANNER — admin/guru: purple gradient
         ============================================================ -->
    <div
      v-if="role !== 'santri'"
      class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-5 md:p-6 text-white shadow-lg"
    >
      <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
        <i class="fas fa-chart-pie mr-1"></i>Dashboard Statistik
      </p>
      <h2 class="text-xl md:text-2xl font-black mt-1">{{ headerTitle }}</h2>
      <p class="text-xs md:text-sm font-medium mt-1 opacity-90">{{ headerSubtitle }}</p>
    </div>

    <!-- ============================================================
         SANTRI: Greeting hero (emerald gradient + logo watermark)
         ============================================================ -->
    <div
      v-if="role === 'santri' && santriProfile"
      class="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-primary-hover)] rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden"
    >
      <img
        :src="logoSrc"
        alt=""
        aria-hidden="true"
        class="absolute -right-4 -top-4 w-44 h-44 object-contain opacity-10 pointer-events-none"
      />
      <div class="relative">
        <h2 class="text-2xl md:text-3xl font-black drop-shadow">
          Ahlan, {{ santriProfile.nama }}!
        </h2>
        <p class="text-xs md:text-sm text-emerald-50/90 mt-1">
          Selamat datang di Portal Santri Qiraati
        </p>
        <span
          v-if="santriProfile.nis"
          class="inline-block mt-3 bg-[var(--bg-card)]/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1 rounded-full"
          >No. Induk: {{ santriProfile.nis }}</span
        >
        <button
          @click="gotoProfil"
          class="ml-2 mt-3 inline-flex items-center gap-1.5 bg-[var(--bg-card)]/15 hover:bg-[var(--bg-card)]/25 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          <i class="fas fa-id-card"></i>Lihat Data Diri
        </button>
      </div>
    </div>

    <!-- ============================================================
         SANTRI: Data Saat Ini + Capaian Prestasi (2-col)
         ============================================================ -->
    <div v-if="role === 'santri' && santriProfile" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <!-- Data Saat Ini -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 pb-2 border-b border-[var(--border-subtle)] flex items-center gap-2"
        >
          <i class="fas fa-id-card text-teal-600"></i>Data Saat Ini
        </h3>
        <div class="space-y-3">
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Kelas Sekolah
            </p>
            <p class="text-sm font-black text-[var(--text-primary)] mt-0.5">
              {{
                santriProfile.kelas_sekolah
                  ? formatKelasLabel(santriProfile.lembaga_sekolah, santriProfile.kelas_sekolah)
                  : '-'
              }}
            </p>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Lembaga Qiraati
            </p>
            <p class="text-sm font-black text-teal-700 dark:text-teal-300 mt-0.5">
              {{ santriProfile.lembaga || '-' }}
            </p>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Jilid / Kelas
            </p>
            <p class="text-sm font-black text-[var(--text-primary)] mt-0.5">
              {{ santriProfile.kelas || '-'
              }}{{
                santriProfile.juz && santriProfile.juz !== '-'
                  ? ' (Juz ' + juzNum(santriProfile.juz) + ')'
                  : ''
              }}
            </p>
          </div>
          <div>
            <p
              class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              Guru Kelas
            </p>
            <p class="text-sm font-black text-[var(--text-primary)] mt-0.5">
              {{ santriProfile.guru || santriProfile.guru_pagi || santriProfile.guru_sore || '-' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Capaian Prestasi -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div
          class="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-subtle)]"
        >
          <h3
            class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2"
          >
            <i class="fas fa-trophy text-cyan-700"></i>Capaian Prestasi
          </h3>
          <span
            class="text-[10px] font-black bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 px-2 py-0.5 rounded-full uppercase tracking-wider"
          >
            Periode: {{ periodeAktif }}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-2 md:gap-3">
          <div
            class="bg-teal-50 dark:bg-teal-900/20 rounded-xl py-3 px-2 text-center border border-teal-100 dark:border-teal-700"
          >
            <p
              class="text-[9px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider"
            >
              Awal Bulan
            </p>
            <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
              {{ santriProfile.prestasi_awal || '-' }}
            </p>
          </div>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 px-2 text-center border border-emerald-100 dark:border-emerald-700"
          >
            <p
              class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
            >
              Akhir Bulan
            </p>
            <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
              {{ santriProfile.prestasi_akhir || '-' }}
            </p>
          </div>
          <div
            class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 px-2 text-center border border-cyan-100 dark:border-cyan-700"
          >
            <p
              class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
            >
              Total Prestasi
            </p>
            <p class="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1">
              {{ santriProfile.prestasi_total || '-' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         SANTRI: Catatan Bulan Ini (jika ada)
         ============================================================ -->
    <div
      v-if="role === 'santri' && santriProfile && catatanBulanIni"
      class="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 md:p-5 border border-cyan-200 dark:border-cyan-700 shadow-sm"
    >
      <div class="flex items-start gap-3">
        <i class="fas fa-comment-dots text-cyan-700 text-xl mt-1 flex-shrink-0"></i>
        <div class="flex-1 min-w-0">
          <p
            class="text-xs font-black text-cyan-800 dark:text-cyan-300 uppercase tracking-wider mb-1"
          >
            Catatan Bulan Ini ({{ namaBulan[bulanIdx] }} {{ tahunIni }})
          </p>
          <p class="text-sm text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
            {{ catatanBulanIni }}
          </p>
        </div>
      </div>
    </div>

    <!-- ============================================================
         SANTRI: 4 Collapsible Cards (Rekap / Statistik / Kartu / Rapor)
         ============================================================ -->
    <div v-if="role === 'santri' && santriProfile" class="space-y-3">
      <!-- Rekap Prestasi Bulanan -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('rekap')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900 flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-book-open text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Rekap Prestasi Bulanan
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Nilai Qiraati &amp; Diniyah per bulan
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.rekap ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.rekap"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <p class="text-xs text-[var(--text-secondary)] italic mb-3">
            <i class="fas fa-info-circle mr-1"></i>Detail nilai bulanan &amp; history capaian.
          </p>
          <router-link
            to="/rekap-prestasi"
            class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm"
          >
            <i class="fas fa-external-link-alt"></i>Buka Rekap Lengkap
          </router-link>
        </div>
      </div>

      <!-- Statistik Prestasi -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('statistik')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-chart-line text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Statistik Prestasi
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Selisih, total halaman, mutasi, status
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.statistik ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.statistik"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center border border-emerald-100 dark:border-emerald-700"
            >
              <p
                class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
              >
                Selisih Capaian
              </p>
              <p
                class="text-2xl md:text-3xl font-black text-emerald-800 dark:text-emerald-200 mt-1"
              >
                {{ selisihCapaian }}
              </p>
              <p class="text-[8px] text-[var(--text-secondary)] mt-0.5">halaman</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 text-center border border-cyan-100 dark:border-cyan-700"
            >
              <p
                class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
              >
                Total Hal/Bulan
              </p>
              <p class="text-2xl md:text-3xl font-black text-cyan-800 dark:text-cyan-200 mt-1">
                {{ santriProfile.prestasi_total || '-' }}
              </p>
              <p class="text-[8px] text-[var(--text-secondary)] mt-0.5">{{ statusPrestasi }}</p>
            </div>
            <div
              class="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 text-center border border-teal-100 dark:border-teal-700"
            >
              <p
                class="text-[9px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider"
              >
                Riwayat Mutasi
              </p>
              <p class="text-2xl md:text-3xl font-black text-teal-800 dark:text-teal-200 mt-1">
                {{ totalKartuKenaikan }}
              </p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 text-center border border-cyan-100 dark:border-cyan-700"
            >
              <p
                class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
              >
                Lembaga/Kelas
              </p>
              <p
                class="text-sm md:text-base font-black text-cyan-800 dark:text-cyan-200 mt-1 truncate"
              >
                {{ santriProfile.lembaga || '-' }}
              </p>
              <p class="text-[10px] font-bold text-[var(--text-secondary)] mt-0.5">
                {{ santriProfile.kelas || '-' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Kartu Kenaikan -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('kartu')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900 flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-id-card text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Kartu Kenaikan
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Tanggal naik jilid &amp; catatan guru
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.kartu ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.kartu"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <div v-if="totalKartuKenaikan === 0" class="text-center py-6">
            <i class="fas fa-inbox text-[var(--text-tertiary)] text-2xl mb-2"></i>
            <p class="text-xs text-[var(--text-secondary)] italic">Belum ada riwayat kenaikan jilid.</p>
          </div>
          <div v-else class="space-y-2">
            <div class="text-xs text-slate-700 dark:text-[var(--text-tertiary)]">
              <p class="mb-2"><strong>Total Riwayat:</strong> {{ totalKartuKenaikan }} entry</p>
              <p class="text-[var(--text-secondary)]">
                Klik tombol di bawah untuk lihat kartu kenaikan lengkap dengan catatan &amp;
                rekomendasi guru.
              </p>
            </div>
          </div>
          <router-link
            to="/naik-kelas"
            class="mt-3 inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm"
          >
            <i class="fas fa-external-link-alt"></i>Buka Kartu Kenaikan
          </router-link>
        </div>
      </div>

      <!-- Rapor Semester -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <button
          @click="toggleSection('rapor')"
          class="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition cursor-pointer"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] flex items-center justify-center shadow-md flex-shrink-0"
            >
              <i class="fas fa-graduation-cap text-white"></i>
            </div>
            <div class="text-left min-w-0">
              <p class="text-sm md:text-base font-black text-[var(--text-primary)]">
                Rapor Semester
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Nilai rapor lengkap (PDF print)
              </p>
            </div>
          </div>
          <i
            :class="[
              'fas text-[var(--text-tertiary)] transition-transform',
              sections.rapor ? 'fa-chevron-up' : 'fa-chevron-down'
            ]"
          ></i>
        </button>
        <div
          v-if="sections.rapor"
          class="border-t border-[var(--border-subtle)] p-4 md:p-5 bg-[var(--bg-card-elevated)]/50 dark:bg-slate-900/20"
        >
          <p class="text-xs text-[var(--text-secondary)] italic mb-3">
            <i class="fas fa-info-circle mr-1"></i>Rapor semester (Qiraati &amp; Diniyah) dengan
            opsi cetak / Save as PDF.
          </p>
          <router-link
            to="/rapor"
            class="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-sm"
          >
            <i class="fas fa-external-link-alt"></i>Buka Rapor Semester
          </router-link>
        </div>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: KPI ringkas (Total Santri/Guru/Lembaga/Kelas) + Grafik Perkembangan.
         v.103: KPI dikembalikan ke dasbor (kyai req — at-a-glance cocok di sini).
         Alert operasional, distribusi capaian, grid/distribusi per-lembaga tetap di
         Laporan (components/statistik/*).
         ============================================================ -->
    <RingkasanSantriLembaga v-if="isAdminMode" section="kpi" />
    <AdminStatsCharts v-if="isAdminMode" :santri-list="scopedSantriAll" />

    <!-- ============================================================
         GURU: Statistik Pengajaran + Kehadiran + Kelas Saya
         ============================================================ -->
    <template v-if="role === 'guru'">
      <!-- Statistik Santri Saya (agregat santri yang diampu) -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-user-graduate text-teal-600 mr-2"></i>Statistik Santri Saya
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div class="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase">Total Santri Diampu</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ totalSantriDisplay }}</p>
          </div>
          <div v-if="adaQiraati" class="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">Santri Ngaji (Qiraati)</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ santriQiraatiSaya.length }}</p>
          </div>
          <div v-if="adaSekolah" class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 uppercase">Santri Sekolah</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ santriSekolahSaya.length }}</p>
          </div>
          <div class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 uppercase">Kelas Diampu</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ kelasSaya.length }}</p>
          </div>
        </div>
      </div>

      <!-- v.100c: Tren perkembangan capaian Qiraati (Opsi A) — Kepala=lembaga, Guru=kelasnya (dipisah) -->
      <TrenCapaianChart
        v-if="isKepalaMode"
        :santri-ids="lembagaSantriIds"
        :title="`Tren Capaian — ${namaLembagaSaya}`"
        subtitle="Rata-rata halaman bertambah per bulan, se-lembaga Anda."
      />
      <template v-else>
        <TrenCapaianChart
          v-if="adaQiraati"
          :santri-ids="qiraatiSantriIds"
          title="Tren Capaian — Santri Ngaji Saya"
          subtitle="Rata-rata halaman bertambah per bulan (Qiraati)."
        />
        <TrenCapaianChart
          v-if="adaSekolah"
          :santri-ids="sekolahSantriIds"
          title="Tren Capaian Qiraati — Santri Sekolah Saya"
          subtitle="Capaian Qiraati dari santri kelas sekolah yang Anda ampu."
        />
      </template>

      <!-- Breakdown Qiraati (kalau guru ngaji) -->
      <div v-if="adaQiraati && qiraatiPrestasi.length > 0" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-trophy text-teal-600 mr-2"></i>Santri Ngaji Berprestasi
        </h3>
        <ol class="space-y-2">
          <li v-for="(s, i) in qiraatiPrestasi" :key="s.id" class="flex items-center gap-3 bg-[var(--bg-card-elevated)] rounded-xl p-2.5 border border-[var(--border-subtle)]">
            <span :class="['w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0', i === 0 ? 'bg-teal-600 text-white' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-emerald-500 text-emerald-900' : 'bg-slate-200 text-slate-600']">{{ i + 1 }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]">{{ s.lembaga }} · Kelas {{ s.kelas || '-' }}</p>
            </div>
            <p class="text-sm font-black text-teal-700 dark:text-teal-300">{{ prestasiNum(s) }}</p>
          </li>
        </ol>
      </div>

      <!-- Breakdown Sekolah (kalau guru sekolah) -->
      <div v-if="adaSekolah && sekolahPrestasi.length > 0" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-trophy text-cyan-600 mr-2"></i>Santri Sekolah Berprestasi
        </h3>
        <ol class="space-y-2">
          <li v-for="(s, i) in sekolahPrestasi" :key="s.id" class="flex items-center gap-3 bg-[var(--bg-card-elevated)] rounded-xl p-2.5 border border-[var(--border-subtle)]">
            <span :class="['w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0', i === 0 ? 'bg-cyan-600 text-white' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-emerald-500 text-emerald-900' : 'bg-slate-200 text-slate-600']">{{ i + 1 }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]">{{ s.lembaga_sekolah || s.lembaga }} · Kelas {{ s.kelas_sekolah || s.kelas || '-' }}</p>
            </div>
            <p class="text-sm font-black text-cyan-700 dark:text-cyan-300">{{ prestasiNum(s) }}</p>
          </li>
        </ol>
      </div>

      <!-- Kelas Saya -->
      <div v-if="kelasSaya.length > 0" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2">
          <i class="fas fa-chalkboard-teacher text-cyan-600 mr-2"></i>Kelas Saya
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div v-for="k in kelasSaya" :key="k.lembaga + '_' + k.kelas" class="flex items-center justify-between gap-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 border border-cyan-100 dark:border-cyan-800">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-[var(--text-primary)] truncate">{{ k.lembaga }} · Kelas {{ k.kelas }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]"><i class="fas fa-users mr-1"></i>{{ k.santriCount }} santri</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Info: kehadiran & bisyaroh pribadi pindah ke menu Personal -->
      <div class="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-3 border border-teal-100 dark:border-teal-800 text-center">
        <p class="text-[11px] text-teal-700 dark:text-teal-300">
          <i class="fas fa-info-circle mr-1"></i>Data kehadiran &amp; slip bisyaroh pribadi Anda ada di menu
          <button @click="$router.push('/personal')" class="font-black underline cursor-pointer">Personal</button>.
        </p>
      </div>
    </template>

    <!-- ============================================================
         SANTRI: Riwayat Mondok (tanggal masuk)
         ============================================================ -->
    <div
      v-if="role === 'santri' && santriProfile?.tanggal_masuk"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Mondok
      </h3>
      <p class="text-sm text-[var(--text-secondary)]">
        <i class="fas fa-calendar-day text-emerald-500 mr-1.5"></i>
        <span class="text-[var(--text-secondary)] font-bold">Mondok sejak:</span>
        <span class="font-black text-[var(--text-primary)] ml-1.5">{{
          santriProfile.tanggal_masuk
        }}</span>
      </p>
    </div>

    <!-- ============================================================
         Loading state
         ============================================================ -->
    <div
      v-if="loadingAny"
      class="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)] shadow-sm text-center"
    >
      <i class="fas fa-spinner fa-spin text-2xl text-slate-300 dark:text-[var(--text-secondary)]"></i>
      <p class="text-xs text-[var(--text-tertiary)] mt-2">Memuat data statistik...</p>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// StatistikView.vue — Dashboard Statistik (admin / guru / santri 3-role)
// Recovered from minified chunk StatistikView-DppFnKCD.js
// ----------------------------------------------------------------------------
// Role-aware:
//   - admin: top stats (santri/guru/lembaga/kelas), per-lembaga prestasi
//            (top5 + PTPT distribusi Kurang/Cukup/Bagus), statistik lembaga
//            grid, distribusi bar chart, AdminStatsCharts (12-bulan chart.js)
//   - guru : top stats (santri saya/guru), statistik pengajaran, kehadiran
//            bulan ini, kelas yang diampu
//   - santri: greeting hero, data saat ini, capaian prestasi, catatan bulan,
//             4 collapsible action cards (rekap/statistik/kartu/rapor),
//             riwayat mondok
// ============================================================================

import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useSantri } from '@/composables/useSantri'
import { useGuru } from '@/composables/useGuru'
import { formatKelasLabel } from '@/composables/useLembaga'
import { subscribeColl } from '@/services/firestore'
import AdminStatsCharts from '@/components/charts/AdminStatsCharts.vue'
import TrenCapaianChart from '@/components/charts/TrenCapaianChart.vue' // v.100c: Opsi A — tren capaian
import RingkasanSantriLembaga from '@/components/statistik/RingkasanSantriLembaga.vue' // v.103: KPI ringkas di dasbor
// v.21.107.0527: gating role konsisten (admin/super_admin/admin_keuangan)
import { isFullFilterRole, isKepalaLembaga } from '@/utils/roleScope'
import { juzNum } from '@/utils/format' // v.100e: normalisasi tampilan juz (anti dobel "Juz JUZ n")
// v.103 "rapikan dashboard": KPI/alert/distribusi/per-lembaga admin DIPINDAH ke Laporan
// (components/statistik/*). Di sini cukup scope utk AdminStatsCharts & TrenCapaian guru.
import { useStatistikScope } from '@/composables/useStatistikScope'

// Logo dipakai sebagai watermark di greeting santri (dari public/)
const logoSrc = '/logo.png'

// ---- Stores & composables --------------------------------------------------
const router = useRouter()
const settings = useSettingsStore()
const auth = useAuthStore()

const sections = reactive({
  rekap: false,
  statistik: true,
  kartu: false,
  rapor: false
})
function toggleSection(name) {
  sections[name] = !sections[name]
}

const { santriRaw, loading: loadingSantri } = useSantri()
const { guruRaw, loading: loadingGuru } = useGuru()

// ---- Role / loading --------------------------------------------------------
const role = computed(() => auth.sesiAktif?.role || 'guest')
// v.21.107.0527: isAdminMode true utk admin, super_admin, admin_keuangan
const isAdminMode = computed(() => isFullFilterRole(auth.sesiAktif))
const loadingAny = computed(() => loadingSantri.value || loadingGuru.value)

// v.103: scope dipakai utk AdminStatsCharts (scopedSantriAll) & TrenCapaian guru/kepala
//   (scopedSantriAktif). KPI/alert/distribusi/per-lembaga admin sudah pindah ke Laporan
//   (components/statistik/{RingkasanSantriLembaga,DistribusiPrestasi,OperasionalGuru}.vue).
const { scopedSantriAktif, scopedSantriAll } = useStatistikScope()

// ---- Helpers ---------------------------------------------------------------
// parseNum: dipakai section santri (selisih/status prestasi)
function parseNum(value) {
  const m = String(value || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

// ---- Header label (role-aware) --------------------------------------------
// v.21.107.0527: admin/super_admin/admin_keuangan semua dapat label "Lengkap"
const headerTitle = computed(() => {
  if (isAdminMode.value) return 'Statistik Lengkap'
  if (role.value === 'guru') return 'Statistik Kelas Saya'
  if (role.value === 'santri') return 'Statistik Saya'
  return 'Statistik'
})
const headerSubtitle = computed(() => {
  if (isAdminMode.value) return 'Data ringkas seluruh pondok.'
  if (role.value === 'guru') return 'Santri yang Anda ajar & data kehadiran Anda.'
  if (role.value === 'santri') return 'Pencapaian & prestasi Anda di pondok.'
  return ''
})

// ---- Display counters per role --------------------------------------------
// v.103: dipakai kartu "Total Santri Diampu" (guru). Cabang admin dibuang —
//   KPI admin sudah pindah ke Laporan (components/statistik/RingkasanSantriLembaga).
const totalSantriDisplay = computed(() => {
  if (role.value !== 'guru') return 0
  const guruName = String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '')
    .toLowerCase()
    .trim()
  if (!guruName) return 0
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const gp = String(s.guru_pagi || '').toLowerCase().trim()
    const gs = String(s.guru_sore || '').toLowerCase().trim()
    const g = String(s.guru || '').toLowerCase().trim()
    const gsek = Array.isArray(s.guru_sekolah)
      ? s.guru_sekolah.map((x) => String(x || '').toLowerCase().trim())
      : []
    return gp === guruName || gs === guruName || g === guruName || gsek.includes(guruName)
  }).length
})

// ============================================================================
// SANTRI ROLE
// ============================================================================
const santriProfile = computed(() => {
  if (role.value !== 'santri') return null
  const id = auth.sesiAktif?.id
  return santriRaw.value.find((s) => String(s.id) === String(id)) || null
})

const namaBulan = [
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
const now = new Date()
const bulanIdx = now.getMonth()
const tahunIni = now.getFullYear()

const catatanBulanIni = computed(() => {
  const p = santriProfile.value
  if (!p || !p.catatan_bulanan || typeof p.catatan_bulanan !== 'object') return ''
  const key = `${tahunIni}_${String(bulanIdx + 1).padStart(2, '0')}`
  return p.catatan_bulanan[key] || ''
})

const selisihCapaian = computed(() => {
  if (!santriProfile.value) return 0
  const akhir = parseNum(santriProfile.value.prestasi_akhir)
  const awal = parseNum(santriProfile.value.prestasi_awal)
  return Math.max(0, akhir - awal)
})

const statusPrestasi = computed(() => {
  if (!santriProfile.value) return ''
  const total = parseNum(santriProfile.value.prestasi_total)
  if (total === 0) return 'BELUM DINILAI'
  if (total < 5) return 'KURANG'
  if (total <= 9) return 'CUKUP'
  return 'BAGUS'
})

const totalKartuKenaikan = computed(() => {
  const kk = santriProfile.value?.kartu_kenaikan
  if (!kk || typeof kk !== 'object') return 0
  let count = 0
  for (const tahun in kk) {
    for (const bulan in kk[tahun] || {}) {
      const entries = kk[tahun][bulan]?.entries || []
      count += Array.isArray(entries) ? entries.length : 0
    }
  }
  return count
})

// v.21.107.0527: jangan hardcode periode Hijriah (cepat kadaluarsa)
const periodeAktif = computed(() => settings.settings?.periodeAktif || settings.settings?.txtPeriode || '-')

function gotoProfil() {
  router.push('/profil')
}

// ============================================================================
// GURU ROLE
// ============================================================================
const guruProfile = computed(() => {
  if (role.value !== 'guru') return null
  const id = auth.sesiAktif?.id
  return guruRaw.value.find((g) => String(g.id) === String(id)) || null
})

const guruLembaga = computed(() => guruProfile.value?.lembaga || '-')
const guruJabatan = computed(() => guruProfile.value?.jabatan || 'Guru')

const kelasSaya = computed(() => {
  if (role.value !== 'guru') return []
  const guruName = String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '')
    .toLowerCase()
    .trim()
  if (!guruName) return []
  const map = new Map()
  for (const s of santriRaw.value) {
    if (s.aktif === false) continue
    const gp = String(s.guru_pagi || '')
      .toLowerCase()
      .trim()
    const gs = String(s.guru_sore || '')
      .toLowerCase()
      .trim()
    const g = String(s.guru || '')
      .toLowerCase()
      .trim()
    const gsek = Array.isArray(s.guru_sekolah)
      ? s.guru_sekolah.map((x) =>
          String(x || '')
            .toLowerCase()
            .trim()
        )
      : []
    if (gp !== guruName && gs !== guruName && g !== guruName && !gsek.includes(guruName)) continue
    const key = `${s.lembaga || '-'}_${s.kelas || '-'}`
    if (!map.has(key)) {
      map.set(key, { lembaga: s.lembaga || '-', kelas: s.kelas || '-', santriCount: 0 })
    }
    map.get(key).santriCount++
  }
  return [...map.values()].sort(
    (a, b) =>
      String(a.lembaga).localeCompare(String(b.lembaga)) ||
      String(a.kelas).localeCompare(String(b.kelas))
  )
})

// v.21.84.0527: Breakdown Qiraati vs Sekolah santri yang diampu guru
function _guruNameLower() {
  return String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '').toLowerCase().trim()
}
function prestasiNum(s) {
  const v = s.prestasi_total ?? s.prestasi_akhir ?? 0
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

// Santri diampu via guru_pagi/guru_sore = Qiraati (ngaji)
const santriQiraatiSaya = computed(() => {
  if (role.value !== 'guru') return []
  const gn = _guruNameLower()
  if (!gn) return []
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const gp = String(s.guru_pagi || '').toLowerCase().trim()
    const gs = String(s.guru_sore || '').toLowerCase().trim()
    const g = String(s.guru || '').toLowerCase().trim()
    return gp === gn || gs === gn || g === gn
  })
})

// Santri diampu via guru_sekolah[] = Sekolah
const santriSekolahSaya = computed(() => {
  if (role.value !== 'guru') return []
  const gn = _guruNameLower()
  if (!gn) return []
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const gsek = Array.isArray(s.guru_sekolah)
      ? s.guru_sekolah.map((x) => String(x || '').toLowerCase().trim())
      : []
    return gsek.includes(gn)
  })
})

const adaQiraati = computed(() => santriQiraatiSaya.value.length > 0)
const adaSekolah = computed(() => santriSekolahSaya.value.length > 0)

// Santri berprestasi (top 5 by prestasi_total) — Qiraati & Sekolah terpisah
const qiraatiPrestasi = computed(() =>
  [...santriQiraatiSaya.value]
    .filter((s) => prestasiNum(s) > 0)
    .sort((a, b) => prestasiNum(b) - prestasiNum(a))
    .slice(0, 5)
)
const sekolahPrestasi = computed(() =>
  [...santriSekolahSaya.value]
    .filter((s) => prestasiNum(s) > 0)
    .sort((a, b) => prestasiNum(b) - prestasiNum(a))
    .slice(0, 5)
)

// v.100c: Tren perkembangan capaian (Opsi A) — id santri per scope untuk TrenCapaianChart.
//   Kepala/PJ -> se-lembaga (scopedSantriAktif). Guru -> kelasnya (ngaji & sekolah, DIPISAH).
const isKepalaMode = computed(() => isKepalaLembaga(auth.sesiAktif))
const namaLembagaSaya = computed(() => auth.sesiAktif?.lembaga || 'Lembaga')
const lembagaSantriIds = computed(() => scopedSantriAktif.value.map((s) => String(s.id)))
const qiraatiSantriIds = computed(() => santriQiraatiSaya.value.map((s) => String(s.id)))
const sekolahSantriIds = computed(() => santriSekolahSaya.value.map((s) => String(s.id)))

// Kehadiran guru bulan ini (subscribe absensi_shift_guru)
const absensiShiftGuru = ref([])
let unsubAbsensi = null
onMounted(() => {
  // v.21.107.0527: hemat reads — subscribe hanya kalau role 'guru'
  if (role.value !== 'guru') return
  unsubAbsensi = subscribeColl('absensi_shift_guru', (docs) => {
    absensiShiftGuru.value = docs || []
  })
})
onUnmounted(() => {
  if (unsubAbsensi) {
    try {
      unsubAbsensi()
    } catch {}
  }
})

// v.21.107.0527:
// - 'terlambat' dianggap hadir (selaras Bisyaroh bonus + AbsensiGuruView)
// - hitung UNIQUE tanggal (jangan double-count 3 shift dlm 1 hari)
const kehadiranGuru = computed(() => {
  const g = guruProfile.value
  if (!g) return { hadir: 0, sakit: 0, izin: 0, alpa: 0 }
  const d = new Date()
  const prefix = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-`
  const hadirSet = new Set()
  const sakitSet = new Set()
  const izinSet = new Set()
  const alpaSet = new Set()
  for (const row of absensiShiftGuru.value) {
    const tgl = String(row.tanggal || '')
    if (!tgl.startsWith(prefix)) continue
    if (String(row.guru_id || row.guruId || '') !== String(g.id)) continue
    const st = String(row.status || '').toLowerCase()
    if (st === 'hadir' || st === 'masuk' || st === 'terlambat') hadirSet.add(tgl)
    else if (st === 'sakit') sakitSet.add(tgl)
    else if (st === 'izin') izinSet.add(tgl)
    else if (st === 'alpa' || st === 'alpha') alpaSet.add(tgl)
  }
  return {
    hadir: hadirSet.size,
    sakit: sakitSet.size,
    izin: izinSet.size,
    alpa: alpaSet.size
  }
})
</script>
