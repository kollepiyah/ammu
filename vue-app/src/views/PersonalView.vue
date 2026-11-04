<template>
  <!-- v.21.84.0527: Personal — data statistik pribadi guru/pegawai (kehadiran + bisyaroh) -->
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div
      v-if="!isDesktop"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-id-badge text-teal-600 mr-2"></i>Personal
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        {{ auth.sesiAktif?.nama || '-' }} ·
        {{ guru?.jabatan || auth.sesiAktif?.jabatan || 'Guru/Pegawai' }}
      </p>
    </div>

    <!-- Ringkasan stat pribadi -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        class="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-4 text-white shadow-sm"
      >
        <p class="text-[10px] uppercase font-black text-white/85">Bisyaroh Bulan Ini</p>
        <p class="text-2xl font-black mt-1 !text-white">
          {{ fmtRp(slipBulanIni?.take_home || 0) }}
        </p>
        <p class="text-[10px] text-white/80 mt-1">
          {{ slipBulanIni ? 'Sudah diterbitkan' : 'Belum diterbitkan' }}
        </p>
      </div>
      <div class="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-4 text-white shadow-sm">
        <p class="text-[10px] uppercase font-black text-white/85">Lama Mengabdi</p>
        <p class="text-2xl font-black mt-1 !text-white">{{ lamaMengajar }}</p>
        <p class="text-[10px] text-white/80 mt-1">Sejak {{ guru?.tanggal_mengabdi || '-' }}</p>
      </div>
    </div>

    <!-- Kehadiran Saya Bulan Ini -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <!-- v.1.4.9: bulan bisa dipilih — riwayat kehadiran bulan-bulan sebelumnya. -->
      <div
        class="flex items-center justify-between gap-2 mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
        >
          <i class="fas fa-clipboard-check text-emerald-600 mr-2"></i>Kehadiran
        </h3>
        <select
          v-model="periodeHadir"
          aria-label="Pilih bulan kehadiran"
          class="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
        >
          <option v-for="p in opsiPeriodeHadir" :key="p" :value="p">{{ labelPeriode(p) }}</option>
        </select>
      </div>
      <!-- v.1.2.3: 6 status (tepat waktu / terlambat / sakit / izin / cuti / alpa) -->
      <div class="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
        <div
          class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-3 border border-emerald-100 dark:border-emerald-800"
        >
          <p
            class="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
          >
            Tepat Waktu
          </p>
          <p class="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
            {{ kehadiran.tepat }}
          </p>
        </div>
        <div
          class="bg-amber-50 dark:bg-amber-900/20 rounded-xl py-3 border border-amber-100 dark:border-amber-800"
        >
          <p
            class="text-[9px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider"
          >
            Terlambat
          </p>
          <p class="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">
            {{ kehadiran.terlambat }}
          </p>
        </div>
        <div
          class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 border border-cyan-100 dark:border-cyan-800"
        >
          <p
            class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
          >
            Sakit
          </p>
          <p class="text-2xl font-black text-cyan-700 dark:text-cyan-300 mt-1">
            {{ kehadiran.sakit }}
          </p>
        </div>
        <div
          class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl py-3 border border-cyan-100 dark:border-cyan-800"
        >
          <p
            class="text-[9px] font-black text-cyan-700 dark:text-cyan-300 uppercase tracking-wider"
          >
            Izin
          </p>
          <p class="text-2xl font-black text-cyan-700 dark:text-cyan-300 mt-1">
            {{ kehadiran.izin }}
          </p>
        </div>
        <div
          class="bg-violet-50 dark:bg-violet-900/20 rounded-xl py-3 border border-violet-100 dark:border-violet-800"
        >
          <p
            class="text-[9px] font-black text-violet-700 dark:text-violet-300 uppercase tracking-wider"
          >
            Cuti
          </p>
          <p class="text-2xl font-black text-violet-700 dark:text-violet-300 mt-1">
            {{ kehadiran.cuti }}
          </p>
        </div>
        <div
          class="bg-rose-50 dark:bg-rose-900/20 rounded-xl py-3 border border-rose-100 dark:border-rose-800"
        >
          <p
            class="text-[9px] font-black text-rose-700 dark:text-rose-300 uppercase tracking-wider"
          >
            Alpa
          </p>
          <p class="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1">
            {{ kehadiran.alpa }}
          </p>
        </div>
      </div>
      <!-- v.1.4.9 (Kyai): angka di atas = per SHIFT, bukan per hari. -->
      <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1.5 text-center">
        Dihitung per shift — satu hari dengan dua shift terhitung dua.
      </p>
      <!-- v.1.2.3: KPI ringkas absen pribadi -->
      <div class="grid grid-cols-3 gap-2 mt-2 text-center">
        <div class="bg-[var(--bg-muted)] rounded-xl py-2 border border-[var(--border-subtle)]">
          <p class="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-wider">
            Total Hadir
          </p>
          <p class="text-lg font-black text-[var(--text-primary)] mt-0.5">{{ kehadiran.hadir }}</p>
        </div>
        <div class="bg-[var(--bg-muted)] rounded-xl py-2 border border-[var(--border-subtle)]">
          <p class="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-wider">
            % Tepat Waktu
          </p>
          <p
            :class="[
              'text-lg font-black mt-0.5',
              kehadiran.persenTepat >= 80
                ? 'text-emerald-600'
                : kehadiran.persenTepat >= 50
                  ? 'text-amber-600'
                  : 'text-rose-600'
            ]"
          >
            {{ kehadiran.persenTepat }}%
          </p>
        </div>
        <div class="bg-[var(--bg-muted)] rounded-xl py-2 border border-[var(--border-subtle)]">
          <p class="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-wider">
            % Kehadiran
          </p>
          <p class="text-lg font-black text-[var(--text-primary)] mt-0.5">
            {{ kehadiran.persenHadir }}%
          </p>
        </div>
      </div>
      <p
        v-if="kehadiran.belumPulang > 0"
        class="text-[10px] text-amber-600 dark:text-amber-400 mt-2 text-center font-bold"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>{{ kehadiran.belumPulang }} kehadiran belum
        absen pulang
      </p>
      <p
        v-if="kehadiran.total === 0"
        class="text-[11px] text-[var(--text-tertiary)] italic text-center mt-3"
      >
        Belum ada data absensi {{ periodeHadir === periodeKini ? 'bulan ini' : bulanLabel }}.
      </p>
      <!-- v.1.4.9: rincian per hari bulan terpilih -->
      <div v-if="rincianHarian.length" class="mt-3">
        <button
          class="w-full flex items-center justify-between text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-[var(--bg-muted)] hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl px-3 py-2 transition cursor-pointer"
          :aria-expanded="rincianBuka"
          @click="rincianBuka = !rincianBuka"
        >
          <span
            ><i class="fas fa-list-ul mr-1.5"></i>Rincian harian {{ bulanLabel }} ({{
              rincianHarian.length
            }})</span
          >
          <i :class="['fas', rincianBuka ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <div
          v-if="rincianBuka"
          class="mt-2 rounded-xl border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)] max-h-80 overflow-y-auto"
        >
          <div
            v-for="r in rincianHarian"
            :key="r.id || r.tanggal + r.shift"
            class="flex items-center justify-between gap-2 px-3 py-2 text-[11px]"
          >
            <div class="min-w-0">
              <p class="font-bold text-[var(--text-primary)]">{{ labelHari(r.tanggal) }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]">
                {{ r.shift
                }}<template v-if="r.masuk || r.pulang">
                  · {{ r.masuk || '—' }} – {{ r.pulang || '—' }}</template
                >
              </p>
            </div>
            <span
              :class="[
                'text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0',
                kelasStatusHadir(r.status)
              ]"
              >{{ labelStatusHadir(r.status) }}</span
            >
          </div>
        </div>
        <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
          Alpa tidak tampil di rincian — hari tanpa catatan dihitung pada angka Alpa di atas.
        </p>
      </div>
      <!-- v.1.2.3: grafik KPI kehadiran per bulan (judul tanpa kata "tren") -->
      <div class="mt-4 pt-3 border-t border-[var(--border-subtle)]">
        <h4
          class="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2"
        >
          <i class="fas fa-chart-line text-teal-600 mr-1.5"></i>Kehadiran per Bulan
        </h4>
        <div class="relative h-52">
          <Line v-if="trenChartData" :data="trenChartData" :options="trenChartOptions" />
          <div
            v-else
            class="absolute inset-0 flex flex-col items-center justify-center text-center text-[11px] text-[var(--text-tertiary)] italic px-4"
          >
            <i class="fas fa-chart-line text-2xl mb-2 opacity-40"></i>
            Grafik muncul setelah ada data absensi minimal 2 bulan.
          </div>
        </div>
      </div>
    </div>

    <!-- v.1.4.9: pengajuan & persetujuan izin pindah ke menu sendiri (Perizinan & Cuti). -->
    <router-link
      to="/perizinan"
      class="flex items-center justify-between gap-3 bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm hover:border-cyan-300 transition"
    >
      <span class="text-xs md:text-sm font-black text-[var(--text-primary)]">
        <i class="fas fa-calendar-minus text-cyan-600 mr-2"></i>Perizinan &amp; Cuti
        <span class="block text-[10px] font-normal text-[var(--text-secondary)] mt-0.5"
          >Ajukan izin / sakit / cuti dan lihat statusnya di menu Perizinan &amp; Cuti.</span
        >
      </span>
      <i class="fas fa-chevron-right text-[var(--text-tertiary)]"></i>
    </router-link>

    <!-- Riwayat Slip Bisyaroh -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <!-- v.1.4.9: tahun bisa dipilih — slip tahun-tahun sebelumnya ikut terbuka. -->
      <div
        class="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2"
      >
        <div class="min-w-0">
          <h3 class="text-sm font-black text-[var(--text-primary)]">
            <i class="fas fa-history text-teal-600 mr-1.5"></i>Riwayat Slip Bisyaroh
          </h3>
          <p v-if="slipTahunPilihan.length" class="text-[10px] text-[var(--text-secondary)]">
            Total {{ tahunSlip }}: <b>{{ fmtRp(totalTahunPilihan) }}</b>
          </p>
        </div>
        <select
          v-model="tahunSlip"
          aria-label="Pilih tahun slip"
          class="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
        >
          <option v-for="t in opsiTahunSlip" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
      <div
        v-if="slipTahunPilihan.length === 0"
        class="p-8 text-center text-sm text-[var(--text-secondary)] italic"
      >
        Belum ada slip bisyaroh tahun {{ tahunSlip }}.
      </div>
      <div v-else class="divide-y divide-[var(--border-subtle)]">
        <div
          v-for="g in slipTahunPilihan"
          :key="g.id"
          class="p-3 flex items-center justify-between gap-3"
        >
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)]">{{ g.periode }}</p>
            <p class="text-[10px] text-[var(--text-secondary)]">
              {{ g.lembaga || '-' }} · {{ g.jabatan || '-' }}
            </p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <p class="text-sm font-black text-emerald-700 dark:text-emerald-300">
              {{ fmtRp(g.take_home || 0) }}
            </p>
            <button
              class="w-8 h-8 rounded-lg bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/40 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center transition cursor-pointer"
              title="Lihat detail slip"
              @click="openSlip(g)"
            >
              <i class="fas fa-eye text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DETAIL SLIP BISYAROH -->
    <div
      v-if="slipOpen"
      class="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 backdrop-blur-sm"
      @click.self="slipOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="bg-gradient-to-br from-emerald-500 to-teal-700 p-5 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[10px] uppercase font-black text-white/85 tracking-wider">
                Slip Bisyaroh
              </p>
              <h3 class="text-lg font-black !text-white mt-0.5">{{ slipDetail?.periode }}</h3>
            </div>
            <button
              class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
              @click="slipOpen = false"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p class="text-xs text-white/90 mt-2">
            {{ slipDetail?.guru_nama || auth.sesiAktif?.nama }}
          </p>
          <p class="text-[11px] text-white/80">
            {{ slipDetail?.lembaga || '-' }} · {{ slipDetail?.jabatan || '-' }}
          </p>
        </div>
        <div class="p-5 space-y-3">
          <div>
            <p
              class="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-wider mb-2"
            >
              Rincian
            </p>
            <div v-if="slipLineItems.length > 0" class="space-y-1.5">
              <div
                v-for="(li, i) in slipLineItems"
                :key="i"
                class="flex items-center justify-between text-sm"
              >
                <span class="text-[var(--text-secondary)]"
                  >{{ li.label || 'Bisyaroh'
                  }}<span
                    v-if="li.lembaga && li.lembaga !== '-'"
                    class="text-[var(--text-tertiary)]"
                  >
                    · {{ li.lembaga }}</span
                  ></span
                >
                <span class="font-bold text-[var(--text-primary)]">{{
                  fmtRp(li.nominal || 0)
                }}</span>
              </div>
            </div>
            <div v-else class="space-y-1.5">
              <div v-if="slipDetail?.bisyaroh_pokok" class="flex justify-between text-sm">
                <span class="text-[var(--text-secondary)]">Bisyaroh Pokok</span>
                <span class="font-bold text-[var(--text-primary)]">{{
                  fmtRp(slipDetail.bisyaroh_pokok)
                }}</span>
              </div>
              <div v-if="slipDetail?.bisyaroh_sekolah" class="flex justify-between text-sm">
                <span class="text-[var(--text-secondary)]">Bisyaroh Sekolah</span>
                <span class="font-bold text-[var(--text-primary)]">{{
                  fmtRp(slipDetail.bisyaroh_sekolah)
                }}</span>
              </div>
              <div v-if="slipDetail?.bisyaroh_tambahan" class="flex justify-between text-sm">
                <span class="text-[var(--text-secondary)]">Bisyaroh Tambahan</span>
                <span class="font-bold text-[var(--text-primary)]">{{
                  fmtRp(slipDetail.bisyaroh_tambahan)
                }}</span>
              </div>
            </div>
          </div>
          <div class="border-t border-[var(--border-subtle)] pt-3 space-y-1.5">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-secondary)]">Total Pemasukan</span>
              <span class="font-bold text-[var(--text-primary)]">{{
                fmtRp(slipDetail?.total_pemasukan || slipDetail?.take_home || 0)
              }}</span>
            </div>
            <div v-if="slipDetail?.total_potongan" class="flex justify-between text-sm">
              <span class="text-rose-600 dark:text-rose-400">Potongan</span>
              <span class="font-bold text-rose-600 dark:text-rose-400"
                >- {{ fmtRp(slipDetail.total_potongan) }}</span
              >
            </div>
          </div>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 flex justify-between items-center border border-emerald-100 dark:border-emerald-800"
          >
            <span
              class="text-sm font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-wide"
              >Take Home</span
            >
            <span class="text-lg font-black text-emerald-700 dark:text-emerald-300">{{
              fmtRp(slipDetail?.take_home || 0)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- v.21.110.0527: Catatan Supervisi -->
    <div
      v-if="supervisiList.length > 0"
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <div
        class="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between"
      >
        <h3 class="text-sm font-black">
          <i class="fas fa-clipboard-check text-cyan-600 mr-1.5"></i>Catatan Supervisi
        </h3>
        <span class="text-[10px] text-[var(--text-tertiary)] font-bold"
          >{{ supervisiList.length }} catatan</span
        >
      </div>
      <div class="divide-y divide-slate-100 dark:divide-slate-700 max-h-[60vh] overflow-y-auto">
        <div v-for="s in supervisiList" :key="s.id" class="p-3 md:p-4">
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black">{{ s.judul }}</p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                <i :class="['fas mr-1', s.target_type === 'guru' ? 'fa-user' : 'fa-school']"></i>
                {{ s.target_type === 'guru' ? 'Untuk Anda' : `Lembaga ${s.target_nama}` }}
                <span class="text-[var(--text-tertiary)] ml-1.5"
                  >· dari {{ s.created_by_nama }} · {{ fmtTglSup(s.createdAt) }}</span
                >
              </p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span
                :class="[
                  'text-[9px] font-black uppercase px-2 py-0.5 rounded',
                  supPrioritasClass(s.prioritas)
                ]"
                >{{ s.prioritas || 'sedang' }}</span
              >
              <span
                :class="[
                  'text-[9px] font-black uppercase px-2 py-0.5 rounded',
                  supStatusClass(s.status)
                ]"
                >{{ s.status || 'open' }}</span
              >
            </div>
          </div>
          <p class="text-xs mt-2 whitespace-pre-line">{{ s.catatan }}</p>
          <p
            v-if="s.rekomendasi"
            class="text-xs text-cyan-700 dark:text-cyan-300 mt-1 italic whitespace-pre-line"
          >
            <i class="fas fa-lightbulb mr-1"></i>{{ s.rekomendasi }}
          </p>
          <div
            v-if="s.respon_target"
            class="bg-[var(--bg-card-elevated)] rounded-lg p-2 mt-2 border-l-4 border-emerald-400"
          >
            <p class="text-[9px] font-bold text-emerald-700 uppercase">
              Tanggapan ({{ fmtTglSup(s.responded_at) }})
            </p>
            <p class="text-xs whitespace-pre-line">{{ s.respon_target }}</p>
          </div>
          <div v-if="s.status !== 'selesai'" class="mt-2 space-y-2">
            <textarea
              v-model="responText[s.id]"
              rows="2"
              class="w-full px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            ></textarea>
            <div class="flex gap-2 flex-wrap">
              <button
                v-if="(s.status || 'open') === 'open'"
                class="text-[10px] font-bold bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-lg hover:bg-cyan-200"
                @click="updateSupervisiStatus(s, 'in_progress')"
              >
                <i class="fas fa-play mr-1"></i>Tandai Diproses
              </button>
              <button
                class="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg hover:bg-emerald-200"
                @click="updateSupervisiStatus(s, 'selesai')"
              >
                <i class="fas fa-check mr-1"></i>Tandai Selesai
              </button>
              <button
                v-if="(responText[s.id] || '').trim()"
                class="text-[10px] font-bold bg-cyan-600 text-white px-2.5 py-1 rounded-lg hover:bg-cyan-700"
                @click="kirimRespon(s)"
              >
                <i class="fas fa-paper-plane mr-1"></i>Kirim Tanggapan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
// v.F6e: adapter Supabase (serverTimestamp = shim ISO string).
import { subscribeColl, getOne, mergeOne, serverTimestamp } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { fmtRp, hitungLamaMengajar, todayJakarta } from '@/utils/format'
// v.21.110.0527: catatan supervisi
import { useToast } from '@/composables/useToast'
import { isKepalaLembaga } from '@/utils/roleScope'
// v.1.4.2: galat DB → kalimat yang bisa ditindaklanjuti penggunanya (lihat galatSimpan).
import { pesanGalatDb } from '@/utils/pesanGalatDb'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { useSettingsStore } from '@/stores/settings'
import { shiftLabelOf } from '@/utils/shiftMaster'
// v.1.4.1: alpa juga hormati JAM — shift yang belum dibuka belum boleh dinilai (Kyai, 5 Sep 2026).
import { jamJakarta } from '@/utils/shiftBerjalan'
// v.1.4.9: rekap kehadiran per bulan (bulan mana pun) — aturan alpanya pindah ke util ini.
import { rekapKehadiranBulan, bulanKehadiranTersedia } from '@/utils/kehadiranPribadi'
// v.1.2.3: grafik kehadiran per bulan (KPI pribadi)
import { Line } from 'vue-chartjs'
import { opsiChart } from '@/utils/chartSentuh'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler
} from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler
)

const auth = useAuthStore()
const settingsStore = useSettingsStore()
const { isElectron: isDesktop } = useDesktopShell()
const guru = ref(null)
const slipRaw = ref([])
const absensiGuru = ref([])
const kegiatanRaw = ref([]) // v.1.2.3: utk hitung alpa (hormati libur kalender per lembaga)
let unsubSlip = null
let unsubAbsensi = null
let unsubKegiatan = null
// v.21.110.0527
const toast = useToast()
// v.1.4.2: satu pintu untuk galat penyimpanan di halaman ini. Sebelumnya tiap catch
//   menulis `toast.error('Gagal: ' + e.message)`, sehingga seorang guru membaca
//   `new row violates row-level security policy for table "izin_guru"` — kalimat
//   Postgres yang bagi dia berarti "aplikasi rusak", padahal artinya "peran akun
//   Anda tak berhak". Keluhan 12 Sep 2026 sampai ke Kyai tanpa petunjuk itu.
//   `peran` ikut dikirim supaya satu tangkapan layar cukup untuk mendiagnosis.
function galatSimpan(e, aksi) {
  toast.error(pesanGalatDb(e, { aksi, peran: auth.sesiAktif?.role_sistem }))
}
const supervisiRaw = ref([])
const responText = reactive({})
let unsubSupervisi = null

const now = new Date()
const tahunIni = now.getFullYear()
const NAMA_BULAN = [
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
// v.1.4.9 (Kyai, 4 Nov 2026): guru bisa melihat kehadiran & slip bulan-bulan sebelumnya.
const periodeKini = `${tahunIni}-${String(now.getMonth() + 1).padStart(2, '0')}`
const periodeHadir = ref(periodeKini) // 'YYYY-MM'
function labelPeriode(p) {
  const [y, m] = String(p || '').split('-')
  return NAMA_BULAN[Number(m) - 1] ? `${NAMA_BULAN[Number(m) - 1]} ${y}` : p
}
const bulanLabel = computed(() => labelPeriode(periodeHadir.value))
const opsiPeriodeHadir = computed(() =>
  bulanKehadiranTersedia(absensiGuru.value, auth.sesiAktif?.id, todayJakarta())
)

// Kyai 7 Agu 2026: masa pengabdian dari "Tgl. Tugas" (`tanggal_mengabdi`) — bukan
//   `tanggal_tugas` yang kini berlabel "Tgl. Syahadah".
const lamaMengajar = computed(() => hitungLamaMengajar(guru.value?.tanggal_mengabdi))

// === Bisyaroh ===
const slipMine = computed(() =>
  slipRaw.value.filter((g) => String(g.guru_id) === String(auth.sesiAktif?.id))
)
// v.1.4.9: daftar slip per TAHUN pilihan (dulu terkunci tahun berjalan).
const tahunSlip = ref(String(tahunIni))
const opsiTahunSlip = computed(() => {
  const set = new Set([String(tahunIni)])
  for (const g of slipMine.value) {
    const y = String(g.periode || '').slice(0, 4)
    if (/^\d{4}$/.test(y)) set.add(y)
  }
  return [...set].sort((a, b) => b.localeCompare(a))
})
const slipTahunPilihan = computed(() => {
  return slipMine.value
    .filter((g) => String(g.periode || '').startsWith(tahunSlip.value))
    .sort((a, b) => String(b.periode || '').localeCompare(String(a.periode || '')))
})
const totalTahunPilihan = computed(() =>
  slipTahunPilihan.value.reduce((s, g) => s + (Number(g.take_home) || 0), 0)
)
const slipBulanIni = computed(() => slipMine.value.find((g) => g.periode === periodeKini))

// === Kehadiran bulan terpilih (v.1.4.9: dulu terkunci bulan berjalan) ===
// Aturan hitungnya (termasuk alpa: libur per lembaga, jadwal masuk, jam mulai shift) di
//   utils/kehadiranPribadi — kartu ini hanya memilih bulannya.
const kehadiran = computed(() => {
  const [y, m] = periodeHadir.value.split('-').map(Number)
  return rekapKehadiranBulan({
    rows: absensiGuru.value,
    guruId: auth.sesiAktif?.id,
    guru: guru.value,
    settings: settingsStore.settings || {},
    kegiatan: kegiatanRaw.value,
    tahun: y,
    bulan: m,
    // WIB: toISOString() (UTC) membaca jam 00:00–06:59 sebagai hari SEBELUMNYA.
    todayIso: todayJakarta(),
    jamKini: jamJakarta()
  })
})

// v.1.4.9: rincian per hari bulan terpilih — riwayat yang bisa dibuka guru sendiri.
const rincianBuka = ref(false)
const rincianHarian = computed(() => {
  const id = String(auth.sesiAktif?.id || '')
  const prefix = periodeHadir.value + '-'
  const s = settingsStore.settings || {}
  return absensiGuru.value
    .filter(
      (r) =>
        String(r.tanggal || '').startsWith(prefix) && String(r.guru_id || r.guruId || '') === id
    )
    .map((r) => ({
      id: r.id,
      tanggal: String(r.tanggal).slice(0, 10),
      shift: shiftLabelOf(s, String(r.shift || '').toLowerCase()) || r.shift || '-',
      status: String(r.status || '').toLowerCase(),
      masuk: String(r.jam || '').slice(0, 5),
      pulang: String(r.jam_pulang || '').slice(0, 5)
    }))
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal) || a.shift.localeCompare(b.shift))
})
const HARI = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
function labelHari(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${HARI[new Date(y, m - 1, d).getDay()]}, ${d} ${NAMA_BULAN[m - 1].slice(0, 3)}`
}
const STATUS_HADIR = {
  hadir: ['Tepat waktu', 'bg-emerald-100 text-emerald-700'],
  masuk: ['Tepat waktu', 'bg-emerald-100 text-emerald-700'],
  terlambat: ['Terlambat', 'bg-amber-100 text-amber-700'],
  sakit: ['Sakit', 'bg-cyan-100 text-cyan-700'],
  izin: ['Izin', 'bg-cyan-100 text-cyan-700'],
  cuti: ['Cuti', 'bg-violet-100 text-violet-700']
}
const labelStatusHadir = (st) => STATUS_HADIR[st]?.[0] || st || '-'
const kelasStatusHadir = (st) => STATUS_HADIR[st]?.[1] || 'bg-slate-100 text-slate-600'

// v.1.2.3: KPI kehadiran per bulan (grafik) — % tepat waktu & % kehadiran, 8 bln terakhir.
const trenKehadiran = computed(() => {
  const id = String(auth.sesiAktif?.id || '')
  const byMonth = {}
  for (const row of absensiGuru.value) {
    if (String(row.guru_id || row.guruId || '') !== id) continue
    const p = String(row.tanggal || '').slice(0, 7)
    if (!/^\d{4}-\d{2}$/.test(p)) continue
    const st = String(row.status || '').toLowerCase()
    if (!byMonth[p]) byMonth[p] = { tepat: 0, terlambat: 0, lain: 0 }
    const b = byMonth[p]
    if (st === 'hadir' || st === 'masuk') b.tepat++
    else if (st === 'terlambat') b.terlambat++
    else if (['sakit', 'izin', 'cuti', 'alpa', 'alpha'].includes(st)) b.lain++
  }
  return Object.keys(byMonth)
    .sort()
    .slice(-8)
    .map((p) => {
      const b = byMonth[p]
      const hadir = b.tepat + b.terlambat
      const total = hadir + b.lain
      const [y, m] = p.split('-')
      return {
        label: `${NAMA_BULAN[Number(m) - 1].slice(0, 3)} ${y.slice(2)}`,
        persenTepat: hadir > 0 ? Math.round((b.tepat / hadir) * 100) : 0,
        persenHadir: total > 0 ? Math.round((hadir / total) * 100) : 0
      }
    })
})

const trenChartData = computed(() => {
  const s = trenKehadiran.value
  if (s.length < 2) return null
  return {
    labels: s.map((x) => x.label),
    datasets: [
      {
        label: '% Tepat Waktu',
        data: s.map((x) => x.persenTepat),
        borderColor: '#0F6E56',
        backgroundColor: 'rgba(29,158,117,0.14)',
        borderWidth: 2,
        tension: 0.35,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: '#0F6E56'
      },
      {
        label: '% Kehadiran',
        data: s.map((x) => x.persenHadir),
        borderColor: '#0891b2',
        backgroundColor: 'rgba(8,145,178,0.08)',
        borderWidth: 2,
        borderDash: [5, 4],
        tension: 0.35,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: '#0891b2'
      }
    ]
  }
})

// v.1.4.1 (Kyai): tooltip yang bisa dibuka dengan jari — lihat utils/chartSentuh.
const trenChartOptions = opsiChart({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true, labels: { boxWidth: 10, font: { size: 10 } } } },
  scales: {
    x: {
      ticks: { autoSkip: false, maxRotation: 45, font: { size: 9 } },
      grid: { display: false }
    },
    y: {
      min: 0,
      max: 100,
      ticks: { stepSize: 25, font: { size: 9 }, callback: (v) => v + '%' },
      grid: { color: 'rgba(136,135,128,0.15)' }
    }
  }
})

// === Detail slip modal ===
const slipOpen = ref(false)
const slipDetail = ref(null)
const slipLineItems = computed(() => {
  const li = slipDetail.value?.line_items
  return Array.isArray(li) ? li.filter((x) => Number(x?.nominal) > 0) : []
})
function openSlip(g) {
  slipDetail.value = g
  slipOpen.value = true
}

onMounted(async () => {
  // v.1.2.8 PERF (HP low-end): dua tabel di bawah dulu ditarik PENUH — seluruh slip
  //   bisyaroh dan seluruh absensi shift SEMUA guru — padahal halaman ini cuma
  //   menampilkan milik yang login (slipMine & kehadiran/tren memfilter guru_id
  //   sesudahnya). Filternya sekarang di server, lewat kolom riil `guru_id`.
  //   CATATAN: absensiGuru karenanya BUKAN lagi sumber sah untuk guru LAIN — jalur
  //   persetujuan izin mengambil absensi guru pengaju secara terpisah (lihat
  //   ambilAbsensiGuru), sebab kalau ia diberi daftar kosong, penjaga "sudah hadir"
  //   tak jalan dan baris HADIR guru lain bisa tertimpa menjadi izin.
  const meId = String(auth.sesiAktif?.id || '')
  const milikku = [['guru_id', '==', meId]]
  unsubSlip = subscribeColl(
    'keuangan_gaji',
    (docs) => {
      slipRaw.value = docs || []
    },
    milikku
  )
  unsubAbsensi = subscribeColl(
    'absensi_shift_guru',
    (docs) => {
      absensiGuru.value = docs || []
    },
    milikku
  )
  // v.21.110.0527: subscribe supervisi
  unsubSupervisi = subscribeColl('supervisi_catatan', (docs) => {
    supervisiRaw.value = docs || []
  })
  unsubKegiatan = subscribeColl('kegiatan', (docs) => {
    kegiatanRaw.value = docs || []
  })
  try {
    guru.value = await getOne('guru', String(auth.sesiAktif?.id))
  } catch (e) {
    // silent
  }
})
onUnmounted(() => {
  if (unsubSlip) {
    try {
      unsubSlip()
    } catch (e) {}
  }
  if (unsubAbsensi) {
    try {
      unsubAbsensi()
    } catch (e) {}
  }
  if (unsubSupervisi) {
    try {
      unsubSupervisi()
    } catch (e) {}
  }
  if (unsubKegiatan) {
    try {
      unsubKegiatan()
    } catch (e) {}
  }
})

// v.21.110.0527: catatan supervisi yg dialamatkan ke saya
const supervisiList = computed(() => {
  const me = String(auth.sesiAktif?.id || '')
  const myLembaga = String(guru.value?.lembaga || auth.sesiAktif?.lembaga || '').toLowerCase()
  const myLembagaSekolah = String(
    guru.value?.lembaga_sekolah || auth.sesiAktif?.lembaga_sekolah || ''
  ).toLowerCase()
  const isKepala = isKepalaLembaga({ ...(guru.value || {}), ...(auth.sesiAktif || {}) })
  return [...(supervisiRaw.value || [])]
    .filter((c) => {
      if (!c) return false
      // Catatan langsung ke guru saya
      if (c.target_type === 'guru' && String(c.target_id || '') === me) return true
      // Catatan ke lembaga & saya kepala/PJ lembaga itu
      if (c.target_type === 'lembaga' && isKepala) {
        const tname = String(c.target_nama || '').toLowerCase()
        return tname === myLembaga || tname === myLembagaSekolah
      }
      return false
    })
    .sort((a, b) => {
      // v.F6e: createdAt kini ISO string (Supabase); dukung legacy Firestore {seconds}.
      const ep = (c) =>
        c && typeof c === 'object' && c.seconds != null
          ? Number(c.seconds) * 1000
          : new Date(c || 0).getTime() || 0
      return ep(b.createdAt) - ep(a.createdAt)
    })
})

function fmtTglSup(ts) {
  if (!ts) return '-'
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000 || ts)
    if (isNaN(d.getTime())) return '-'
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return '-'
  }
}
function supPrioritasClass(p) {
  if (p === 'tinggi') return 'bg-rose-100 text-rose-700'
  if (p === 'rendah') return 'bg-slate-100 text-slate-600'
  return 'bg-amber-100 text-amber-700'
}
function supStatusClass(s) {
  if (s === 'selesai') return 'bg-emerald-100 text-emerald-700'
  if (s === 'in_progress') return 'bg-cyan-100 text-cyan-700'
  return 'bg-rose-100 text-rose-700'
}

async function updateSupervisiStatus(s, newStatus) {
  try {
    await mergeOne('supervisi_catatan', String(s.id), {
      status: newStatus,
      updatedAt: serverTimestamp()
    })
    toast.success(newStatus === 'selesai' ? 'Catatan ditandai selesai' : 'Status diperbarui')
  } catch (e) {
    galatSimpan(e, 'memperbarui status catatan supervisi')
  }
}

async function kirimRespon(s) {
  const txt = String(responText[s.id] || '').trim()
  if (!txt) return
  try {
    await mergeOne('supervisi_catatan', String(s.id), {
      respon_target: txt,
      responded_at: serverTimestamp(),
      status: s.status === 'selesai' ? 'selesai' : 'in_progress',
      updatedAt: serverTimestamp()
    })
    responText[s.id] = ''
    toast.success('Tanggapan terkirim')
  } catch (e) {
    galatSimpan(e, 'mengirim tanggapan catatan supervisi')
  }
}
</script>
