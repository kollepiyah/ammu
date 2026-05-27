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
          >NIS: {{ santriProfile.nis }}</span
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
                  ? ' (Juz ' + santriProfile.juz + ')'
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
         ADMIN/GURU: Top Stats Grid (Santri / Guru / Lembaga / Kelas)
         ============================================================ -->
    <div v-if="role === 'admin' || role === 'guru'" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        class="bg-gradient-to-br from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900 rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-users text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalSantriDisplay }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          {{ labelSantri }}
        </p>
      </div>
      <div
        class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-chalkboard-teacher text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ totalGuruDisplay }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          {{ labelGuru }}
        </p>
      </div>
      <div
        v-if="role === 'admin'"
        class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-building text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ lembagaCount }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          Lembaga Aktif
        </p>
      </div>
      <div
        v-if="role === 'admin'"
        class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 rounded-xl p-3 md:p-4 shadow-sm text-white"
      >
        <i class="fas fa-door-open text-lg md:text-xl text-white/90"></i>
        <p class="text-2xl md:text-3xl font-black mt-1">{{ kelasCount }}</p>
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
          Kelas Total
        </p>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: Lembaga Prestasi Cards (top5, PTPT distribusi)
         ============================================================ -->
    <div
      v-if="role === 'admin' && lembagaPrestasi.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      <div
        v-for="lem in lembagaPrestasi"
        :key="lem.nama"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div
          class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3"
        >
          <h3
            class="text-sm md:text-base font-black text-[var(--text-primary)] uppercase tracking-wider"
          >
            {{ lem.nama }}
          </h3>
          <p class="text-[10px] text-[var(--text-secondary)] font-bold">
            {{ lem.dinilai }}/{{ lem.total }} dinilai
          </p>
        </div>

        <!-- PTPT only: distribusi Kurang / Cukup / Bagus -->
        <div v-if="lem.nama === 'PTPT'" class="grid grid-cols-3 gap-2 mb-3">
          <div
            class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider"
            >
              Kurang
            </p>
            <p class="text-xl font-black text-rose-700 dark:text-rose-300 mt-0.5">
              {{ lem.kurang }}
            </p>
            <p class="text-[8px] text-rose-600 dark:text-rose-400 mt-0.5">&lt;5 hal</p>
          </div>
          <div
            class="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
            >
              Cukup
            </p>
            <p class="text-xl font-black text-cyan-700 dark:text-cyan-300 mt-0.5">
              {{ lem.cukup }}
            </p>
            <p class="text-[8px] text-cyan-700 dark:text-cyan-400 mt-0.5">5-9 hal</p>
          </div>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center"
          >
            <p
              class="text-[10px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
            >
              Bagus
            </p>
            <p class="text-xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
              {{ lem.bagus }}
            </p>
            <p class="text-[8px] text-emerald-600 dark:text-emerald-400 mt-0.5">&gt;=10 hal</p>
          </div>
        </div>

        <p
          class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider mb-2"
        >
          <i class="fas fa-trophy text-cyan-600 mr-1"></i>Top 5 Santri Prestasi Tertinggi
        </p>
        <div v-if="lem.top5.length === 0" class="text-xs text-[var(--text-tertiary)] italic text-center py-3">
          Belum ada data prestasi pada periode ini.
        </div>
        <ol v-else class="space-y-1.5">
          <li
            v-for="(s, idx) in lem.top5"
            :key="s.id"
            class="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/30 px-2 py-1.5 rounded-lg"
          >
            <span
              :class="[
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0',
                idx === 0
                  ? 'bg-[var(--color-accent)] text-[var(--text-on-accent)]'
                  : idx === 1
                    ? 'bg-slate-300 text-[var(--text-primary)]'
                    : idx === 2
                      ? 'bg-emerald-500 text-emerald-900'
                      : 'bg-slate-200 text-[var(--text-secondary)]'
              ]"
              >{{ idx + 1 }}</span
            >
            <p class="flex-1 text-xs font-bold text-[var(--text-primary)] truncate">
              {{ s.nama }}
            </p>
            <p class="text-xs font-black text-cyan-700 dark:text-cyan-300">{{ s.totalDisplay }}</p>
          </li>
        </ol>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: Statistik Lembaga grid (per-lembaga kelas/santri/guru)
         ============================================================ -->
    <div
      v-if="role === 'admin' && statistikLembaga.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] mb-3">
        <i class="fas fa-chart-pie text-teal-600 mr-2"></i>Statistik Lembaga
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="lem in statistikLembaga"
          :key="lem.nama"
          class="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)] shadow-sm border-l-4 border-l-teal-500 hover:shadow-md transition"
        >
          <h4
            class="font-black text-[var(--text-primary)] text-sm uppercase tracking-wider mb-3"
          >
            {{ lem.nama }}
          </h4>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div
              class="bg-teal-50 dark:bg-teal-900/20 rounded-lg py-2 border border-teal-100 dark:border-teal-800"
            >
              <p class="text-[9px] text-teal-700 dark:text-teal-300 font-bold uppercase">Kelas</p>
              <p class="text-lg font-black text-teal-800 dark:text-teal-200">{{ lem.kelas }}</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg py-2 border border-cyan-100 dark:border-cyan-800"
            >
              <p class="text-[9px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Santri</p>
              <p class="text-lg font-black text-cyan-800 dark:text-cyan-200">{{ lem.santri }}</p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg py-2 border border-cyan-100 dark:border-cyan-800"
            >
              <p class="text-[9px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Guru</p>
              <p class="text-lg font-black text-cyan-800 dark:text-cyan-200">{{ lem.guru }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: Distribusi Santri per Lembaga (bar chart)
         ============================================================ -->
    <div
      v-if="role === 'admin' && distribusiLembaga.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-chart-bar text-emerald-600 mr-2"></i>Distribusi Santri per Lembaga
      </h3>
      <div class="space-y-2">
        <div v-for="dist in distribusiLembaga" :key="dist.nama" class="flex items-center gap-3">
          <p
            class="text-xs font-bold text-[var(--text-primary)] w-32 truncate flex-shrink-0"
          >
            {{ dist.nama }}
          </p>
          <div class="flex-1 bg-[var(--bg-muted)] rounded-full h-5 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-400 dark:from-emerald-700 to-emerald-600 dark:to-emerald-800 flex items-center justify-end px-2 text-[10px] font-black text-white transition-all"
              :style="{ width: dist.pct + '%' }"
            >
              {{ dist.count }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         ADMIN: AdminStatsCharts (chart.js 12-bulan)
         ============================================================ -->
    <AdminStatsCharts v-if="role === 'admin'" :santri-list="santriRaw" />

    <!-- ============================================================
         GURU: Statistik Pengajaran + Kehadiran + Kelas Saya
         ============================================================ -->
    <template v-if="role === 'guru'">
      <!-- Statistik Pengajaran Saya -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
        >
          <i class="fas fa-user-tie text-teal-600 mr-2"></i>Statistik Pengajaran Saya
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div class="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-teal-700 uppercase">Santri Diampu</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">
              {{ totalSantriDisplay }}
            </p>
          </div>
          <div class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-cyan-700 uppercase">Kelas Diampu</p>
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ kelasSaya.length }}</p>
          </div>
          <div class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-cyan-700 uppercase">Lembaga</p>
            <p class="text-sm font-black text-[var(--text-primary)] truncate">
              {{ guruLembaga }}
            </p>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
            <p class="text-[10px] font-bold text-emerald-700 uppercase">Jabatan</p>
            <p class="text-xs font-black text-[var(--text-primary)] truncate">
              {{ guruJabatan }}
            </p>
          </div>
        </div>
      </div>

      <!-- Kehadiran Saya Bulan Ini -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
        >
          <i class="fas fa-clipboard-check text-emerald-600 mr-2"></i>Kehadiran Saya Bulan Ini
        </h3>
        <div class="grid grid-cols-4 gap-2 text-center">
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 border border-emerald-100"
          >
            <p class="text-[9px] font-black text-emerald-700 uppercase tracking-wider">Hadir</p>
            <p class="text-2xl font-black text-emerald-700 mt-1">{{ kehadiranGuru.hadir }}</p>
          </div>
          <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 border border-cyan-100">
            <p class="text-[9px] font-black text-cyan-700 uppercase tracking-wider">Sakit</p>
            <p class="text-2xl font-black text-cyan-700 mt-1">{{ kehadiranGuru.sakit }}</p>
          </div>
          <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 border border-cyan-100">
            <p class="text-[9px] font-black text-cyan-700 uppercase tracking-wider">Izin</p>
            <p class="text-2xl font-black text-cyan-700 mt-1">{{ kehadiranGuru.izin }}</p>
          </div>
          <div class="bg-rose-50 dark:bg-rose-900/20 rounded-xl py-3 border border-rose-100">
            <p class="text-[9px] font-black text-rose-700 uppercase tracking-wider">Alpa</p>
            <p class="text-2xl font-black text-rose-700 mt-1">{{ kehadiranGuru.alpa }}</p>
          </div>
        </div>
      </div>

      <!-- Kelas Saya -->
      <div
        v-if="kelasSaya.length > 0"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
        >
          <i class="fas fa-chalkboard-teacher text-cyan-600 mr-2"></i>Kelas Saya
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div
            v-for="k in kelasSaya"
            :key="k.lembaga + '_' + k.kelas"
            class="flex items-center justify-between gap-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-3 border border-cyan-100"
          >
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-[var(--text-primary)] truncate">
                {{ k.lembaga }} · Kelas {{ k.kelas }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)]">
                <i class="fas fa-users mr-1"></i>{{ k.santriCount }} santri
              </p>
            </div>
          </div>
        </div>
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
import { useLembaga, formatKelasLabel } from '@/composables/useLembaga'
import { subscribeColl } from '@/services/firestore'
import AdminStatsCharts from '@/components/charts/AdminStatsCharts.vue'

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
const { lembagaRaw } = useLembaga()

// ---- Role / loading --------------------------------------------------------
const role = computed(() => auth.sesiAktif?.role || 'guest')
const loadingAny = computed(() => loadingSantri.value || loadingGuru.value)

const isGuruAktif = (status) =>
  !status || ['aktif', 'tetap', 'kontrak'].includes(String(status).toLowerCase())

// ---- Aggregate counters ----------------------------------------------------
const totalSantri = computed(() => santriRaw.value.length)
const santriAktif = computed(() => santriRaw.value.filter((s) => s.aktif !== false).length)
const santriNonAktif = computed(() => totalSantri.value - santriAktif.value)

const totalGuru = computed(() => guruRaw.value.length)
const guruAktif = computed(() => guruRaw.value.filter((g) => isGuruAktif(g.status)).length)
const guruNonAktif = computed(() => totalGuru.value - guruAktif.value)

const lembagaCount = computed(() => {
  if (lembagaRaw.value.length > 0) return lembagaRaw.value.length
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.aktif !== false && s.lembaga) set.add(String(s.lembaga).toUpperCase().trim())
  }
  return set.size
})

const kelasCount = computed(() => {
  if (lembagaRaw.value.length > 0) {
    const sum = lembagaRaw.value.reduce(
      (acc, l) => acc + (Array.isArray(l.kelas_list) ? l.kelas_list.length : 0),
      0
    )
    if (sum > 0) return sum
  }
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.aktif !== false && s.lembaga && s.kelas) {
      set.add(`${String(s.lembaga).toUpperCase().trim()}|${String(s.kelas).toUpperCase().trim()}`)
    }
  }
  return set.size
})

// ---- Helpers ---------------------------------------------------------------
function parseNum(value) {
  const m = String(value || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

function totalDisplay(s) {
  if (s.lembaga === 'PTPT') {
    const diff = parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal)
    return diff > 0 ? `${diff} Hal` : '-'
  }
  return s.prestasi_total || parseNum(s.prestasi_akhir) || '-'
}

// ---- ADMIN: Per-lembaga prestasi (top5 + PTPT distribusi) ------------------
const lembagaPrestasi = computed(() => {
  if (role.value !== 'admin') return []
  const URUTAN = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'SDI', 'PKBM']
  const fromMaster = lembagaRaw.value.map((l) => l.lembaga).filter(Boolean)
  const ordered = [
    ...URUTAN.filter((n) => fromMaster.includes(n)),
    ...fromMaster.filter((n) => !URUTAN.includes(n))
  ]
  return ordered.map((nama) => {
    const list = santriRaw.value.filter((s) => s.aktif !== false && s.lembaga === nama)
    const dinilai = list.filter((s) => parseNum(s.prestasi_akhir) > 0).length

    const top5 = [...list]
      .sort((a, b) => {
        const va =
          a.lembaga === 'PTPT'
            ? parseNum(a.prestasi_akhir) - parseNum(a.prestasi_awal)
            : parseNum(a.prestasi_akhir)
        const vb =
          b.lembaga === 'PTPT'
            ? parseNum(b.prestasi_akhir) - parseNum(b.prestasi_awal)
            : parseNum(b.prestasi_akhir)
        return vb - va
      })
      .slice(0, 5)
      .filter((s) => parseNum(s.prestasi_akhir) > 0)
      .map((s) => ({ id: s.id, nama: s.nama, totalDisplay: totalDisplay(s) }))

    let kurang = 0,
      cukup = 0,
      bagus = 0
    if (nama === 'PTPT') {
      for (const s of list) {
        const diff = parseNum(s.prestasi_akhir) - parseNum(s.prestasi_awal)
        if (diff <= 0) continue
        if (diff < 5) kurang++
        else if (diff < 10) cukup++
        else bagus++
      }
    }
    return { nama, total: list.length, dinilai, top5, kurang, cukup, bagus }
  })
})

// ---- ADMIN: Distribusi santri per lembaga (bar) ----------------------------
const distribusiLembaga = computed(() => {
  if (role.value !== 'admin') return []
  const map = {}
  santriRaw.value
    .filter((s) => s.aktif !== false)
    .forEach((s) => {
      const k = s.lembaga || '(Tanpa Lembaga)'
      map[k] = (map[k] || 0) + 1
    })
  const max = Math.max(...Object.values(map), 1)
  return Object.entries(map)
    .map(([nama, count]) => ({
      nama,
      count,
      pct: Math.max(8, Math.round((count / max) * 100))
    }))
    .sort((a, b) => b.count - a.count)
})

// ---- ADMIN: Statistik per lembaga (kelas + santri + guru) ------------------
const statistikLembaga = computed(() => {
  if (role.value !== 'admin') return []
  const lembList = (lembagaRaw.value || []).filter((l) => l.kelas && l.kelas.length > 0)
  const URUTAN = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'TPQ', 'P3H']
  return lembList
    .map((l) => {
      const nama = l.lembaga || l.nama
      const santriList = santriRaw.value.filter(
        (s) => (s.lembaga === nama || s.lembaga_sekolah === nama) && s.aktif !== false
      )
      const kelasSet = new Set(santriList.map((s) => s.guru).filter(Boolean)).size
      const santriCount = santriList.length
      const guruCount = guruRaw.value.filter(
        (g) => g.lembaga === nama && isGuruAktif(g.status)
      ).length
      return { nama, kelas: kelasSet, santri: santriCount, guru: guruCount }
    })
    .sort((a, b) => {
      const ia = URUTAN.indexOf(a.nama)
      const ib = URUTAN.indexOf(b.nama)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
})

// ---- Header label (role-aware) --------------------------------------------
const headerTitle = computed(() => {
  if (role.value === 'admin') return 'Statistik Lengkap'
  if (role.value === 'guru') return 'Statistik Kelas Saya'
  if (role.value === 'santri') return 'Statistik Saya'
  return 'Statistik'
})
const headerSubtitle = computed(() => {
  if (role.value === 'admin') return 'Data ringkas seluruh pondok.'
  if (role.value === 'guru') return 'Santri yang Anda ajar & data kehadiran Anda.'
  if (role.value === 'santri') return 'Pencapaian & prestasi Anda di pondok.'
  return ''
})

// ---- Display counters per role --------------------------------------------
const totalSantriDisplay = computed(() => {
  if (role.value === 'admin') return totalSantri.value
  if (role.value === 'guru') {
    const guruName = String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '')
      .toLowerCase()
      .trim()
    if (!guruName) return 0
    return santriRaw.value.filter((s) => {
      if (s.aktif === false) return false
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
      return gp === guruName || gs === guruName || g === guruName || gsek.includes(guruName)
    }).length
  }
  return 0
})

const labelSantri = computed(() => {
  if (role.value === 'admin') {
    return santriNonAktif.value > 0
      ? `Total (${santriAktif.value} aktif / ${santriNonAktif.value} non)`
      : 'Total Santri'
  }
  if (role.value === 'guru') return 'Santri Saya'
  return 'Santri'
})

const totalGuruDisplay = computed(() => (role.value === 'admin' ? totalGuru.value : 0))

const labelGuru = computed(() => {
  if (role.value === 'admin') {
    return guruNonAktif.value > 0
      ? `Total (${guruAktif.value} aktif / ${guruNonAktif.value} non)`
      : 'Total Guru/Pegawai'
  }
  return 'Guru'
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

const periodeAktif = computed(() => settings.settings?.periodeAktif || "Dzulqo'dah 1447")

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

// Kehadiran guru bulan ini (subscribe absensi_shift_guru)
const absensiShiftGuru = ref([])
let unsubAbsensi = null
onMounted(() => {
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

const kehadiranGuru = computed(() => {
  const g = guruProfile.value
  if (!g) return { hadir: 0, sakit: 0, izin: 0, alpa: 0 }
  const d = new Date()
  const prefix = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-`
  let hadir = 0,
    sakit = 0,
    izin = 0,
    alpa = 0
  for (const row of absensiShiftGuru.value) {
    if (!String(row.tanggal || '').startsWith(prefix)) continue
    if (String(row.guru_id || row.guruId || '') !== String(g.id)) continue
    const st = String(row.status || '').toLowerCase()
    if (st === 'hadir' || st === 'masuk') hadir++
    else if (st === 'sakit') sakit++
    else if (st === 'izin') izin++
    else if (st === 'alpa' || st === 'alpha') alpa++
  }
  return { hadir, sakit, izin, alpa }
})
</script>
