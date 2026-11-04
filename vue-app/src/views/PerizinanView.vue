<template>
  <!-- v.1.4.9 (Kyai, 4 Nov 2026): menu sendiri untuk Perizinan & Cuti — guru mengajukan di
       sini, Kepala/PJ/admin menyetujui & melihat riwayatnya di sini. Dulu menumpang di
       Personal. Tidak dipindah ke Absensi Guru karena menu itu khusus admin, sedangkan
       kepala lembaga ber-peran guru juga menyetujui izin. -->
  <div class="p-3 md:p-5 space-y-4 max-w-4xl mx-auto">
    <div
      v-if="!isDesktop"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-calendar-minus text-cyan-600 mr-2"></i>Perizinan &amp; Cuti
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Ajukan izin / sakit / cuti<span v-if="izinIsApprover"
          >, setujui pengajuan, dan lihat riwayatnya</span
        >.
      </p>
    </div>

    <!-- Pengajuan saya -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div
        class="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
        >
          <i class="fas fa-calendar-minus text-cyan-600 mr-2"></i>Pengajuan Saya
        </h3>
        <button
          class="text-[11px] font-bold bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded-lg transition cursor-pointer"
          @click="openIzinForm"
        >
          <i class="fas fa-plus mr-1"></i>Ajukan
        </button>
      </div>
      <div
        v-if="myIzin.length === 0"
        class="text-[11px] text-[var(--text-tertiary)] italic text-center py-3"
      >
        Belum ada pengajuan izin / sakit / cuti.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="a in myIzin"
          :key="a.id"
          class="flex items-center justify-between gap-3 bg-[var(--bg-card-elevated)] rounded-xl p-2.5 border border-[var(--border-subtle)]"
        >
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)]">
              {{ jenisIzinLabel(a.jenis)
              }}<span v-if="a.jenis === 'cuti' && a.kategori" class="text-violet-600">
                ({{ cutiKatNama(a.kategori) }})</span
              >
              · {{ rangeLabel(a) }}
            </p>
            <p class="text-[10px] text-[var(--text-secondary)]">
              Shift {{ shiftsLabel(a.shifts)
              }}<span v-if="a.keterangan"> · {{ a.keterangan }}</span>
            </p>
            <a
              v-if="a.lampiran_url"
              :href="a.lampiran_url"
              target="_blank"
              rel="noopener"
              class="text-[10px] font-bold text-cyan-600 hover:underline"
              ><i class="fas fa-paperclip mr-0.5"></i>Lihat lampiran</a
            >
            <p v-if="a.catatan_putus" class="text-[10px] text-[var(--text-tertiary)] italic">
              {{ a.catatan_putus }}
            </p>
          </div>
          <div class="flex flex-col items-end gap-1 flex-shrink-0">
            <span
              :class="['text-[10px] font-black px-2 py-0.5 rounded-full', kelasStatusIzin(a)]"
              >{{ labelStatusIzin(a) }}</span
            >
            <button
              v-if="a.status === 'diajukan'"
              class="text-[10px] font-bold text-rose-600 hover:underline"
              @click="batalIzin(a)"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Persetujuan (Kepala/PJ/admin) -->
    <div
      v-if="izinIsApprover"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-user-check text-emerald-600 mr-2"></i>Persetujuan
        <span
          v-if="izinAntrian.length"
          class="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] align-middle"
          >{{ izinAntrian.length }}</span
        >
      </h3>
      <div
        v-if="izinAntrian.length === 0"
        class="text-[11px] text-[var(--text-tertiary)] italic text-center py-2"
      >
        Tak ada pengajuan menunggu.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="a in izinAntrian"
          :key="a.id"
          class="bg-[var(--bg-card-elevated)] rounded-xl p-2.5 border border-[var(--border-subtle)]"
        >
          <p class="text-sm font-bold text-[var(--text-primary)]">
            {{ a.guru_nama }}
            <span class="text-[10px] font-normal text-[var(--text-secondary)]"
              >· {{ a.lembaga || '-' }}</span
            >
          </p>
          <p class="text-[11px] text-[var(--text-secondary)]">
            {{ jenisIzinLabel(a.jenis)
            }}<span v-if="a.jenis === 'cuti' && a.kategori" class="text-violet-600">
              ({{ cutiKatNama(a.kategori) }})</span
            >
            · {{ rangeLabel(a) }} · Shift {{ shiftsLabel(a.shifts) }}
          </p>
          <p
            v-if="cutiSisa(a) && cutiSisa(a).sisa !== null"
            class="text-[10px] font-bold"
            :class="cutiSisa(a).sisa <= 0 ? 'text-rose-600' : 'text-[var(--text-secondary)]'"
          >
            <i class="fas fa-info-circle mr-0.5"></i>Sisa kuota: {{ cutiSisa(a).sisa }} /
            {{ cutiSisa(a).kuota }} hari
          </p>
          <p v-if="a.keterangan" class="text-[10px] text-[var(--text-tertiary)] italic">
            {{ a.keterangan }}
          </p>
          <a
            v-if="a.lampiran_url"
            :href="a.lampiran_url"
            target="_blank"
            rel="noopener"
            class="text-[10px] font-bold text-cyan-600 hover:underline"
            ><i class="fas fa-paperclip mr-0.5"></i>Lihat lampiran</a
          >
          <div class="flex gap-2 mt-2">
            <button
              :disabled="izinBusyId === a.id"
              class="flex-1 text-[11px] font-black bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg"
              @click="setujuiIzin(a)"
            >
              <i class="fas fa-check mr-1"></i>Setujui
            </button>
            <button
              :disabled="izinBusyId === a.id"
              class="text-[11px] font-black bg-[var(--bg-muted)] text-rose-600 border border-[var(--border-subtle)] px-3 py-1.5 rounded-lg"
              @click="tolakIzin(a)"
            >
              <i class="fas fa-times mr-1"></i>Tolak
            </button>
          </div>
        </div>
      </div>

      <!-- Pemulihan: pengajuan sudah disetujui tapi belum ada baris absensi yang tertulis
           (korban bug tanggal-mundur s/d 5 Agu 2026). Blok ini hilang sendiri kalau kosong. -->
      <div
        v-if="izinPerluTerap.length"
        class="mt-3 pt-3 border-t border-dashed border-amber-400/60"
      >
        <p class="text-[11px] font-black text-amber-700 dark:text-amber-500 mb-2">
          <i class="fas fa-triangle-exclamation mr-1"></i>Sudah disetujui, absensinya belum terisi
          ({{ izinPerluTerap.length }})
        </p>
        <div class="space-y-2">
          <div
            v-for="a in izinPerluTerap"
            :key="'terap-' + a.id"
            class="flex items-center justify-between gap-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl p-2.5 border border-amber-200 dark:border-amber-900"
          >
            <div class="min-w-0">
              <p class="text-[13px] font-bold text-[var(--text-primary)] truncate">
                {{ a.guru_nama }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)]">
                {{ jenisIzinLabel(a.jenis) }} · {{ rangeLabel(a) }} · Shift
                {{ shiftsLabel(a.shifts) }}
              </p>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <button
                :disabled="izinBusyId === a.id"
                class="text-[10px] font-black bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-2.5 py-1.5 rounded-lg"
                @click="terapkanUlangIzin(a)"
              >
                <i class="fas fa-rotate-right mr-1"></i>Terapkan
              </button>
              <button
                :disabled="izinBusyId === a.id"
                title="Tutup baris ini tanpa mengubah absensi"
                class="text-[10px] font-bold text-[var(--text-secondary)] hover:text-rose-600 disabled:opacity-50 px-2 py-1.5 rounded-lg border border-[var(--border-subtle)]"
                @click="abaikanTerapIzin(a)"
              >
                <i class="fas fa-xmark mr-1"></i>Abaikan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rekap riwayat per orang (Kepala/PJ/admin) — bisa diekspor PDF -->
    <div
      v-if="izinIsApprover"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div
        class="flex items-center justify-between gap-2 mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
        >
          <i class="fas fa-clock-rotate-left text-teal-600 mr-2"></i>Rekap Riwayat Izin per Orang
        </h3>
        <div class="flex items-center gap-2 flex-shrink-0">
          <span class="text-[10px] font-bold text-[var(--text-tertiary)]"
            >{{ rekapIzin.length }} orang</span
          >
          <button
            :disabled="!rekapIzin.length || !!pdfBusy"
            title="Ekspor PDF semua orang di daftar ini (ikut penyaring)"
            class="text-[11px] font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white px-2.5 py-1.5 rounded-lg transition cursor-pointer"
            @click="eksporRekapIzin()"
          >
            <i :class="['fas mr-1', pdfBusy === 'semua' ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i
            >PDF
          </button>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mb-3">
        <div class="relative flex-1 min-w-[150px]">
          <i
            class="fas fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[var(--text-tertiary)]"
          ></i>
          <input
            v-model="rekapIzinCari"
            type="search"
            placeholder="Cari nama…"
            class="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          v-model="rekapIzinTahun"
          class="px-3 py-2 text-xs font-bold rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Semua tahun</option>
          <option v-for="t in rekapIzinTahunOpsi" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>

      <div
        v-if="!rekapIzin.length"
        class="text-[11px] text-[var(--text-tertiary)] italic text-center py-3"
      >
        {{
          rekapIzinDisaring
            ? 'Tak ada yang cocok dengan penyaring ini.'
            : 'Belum ada riwayat pengajuan izin / sakit / cuti.'
        }}
      </div>

      <div v-else class="space-y-2">
        <div
          v-for="g in rekapIzin"
          :key="g.id"
          class="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between gap-3 p-2.5 text-left cursor-pointer"
            :aria-expanded="!!rekapIzinBuka[g.id]"
            @click="toggleRekapIzin(g.id)"
          >
            <div class="min-w-0">
              <p class="text-[13px] font-bold text-[var(--text-primary)] truncate">
                {{ g.nama
                }}<span class="text-[10px] font-normal text-[var(--text-secondary)]">
                  · {{ g.lembaga || '-' }}</span
                >
              </p>
              <p class="text-[10px] text-[var(--text-secondary)]">
                {{ ringkasJenisIzin(g) }} · <b>{{ g.totalHari }}</b> hari disetujui
                <span v-if="g.menunggu" class="text-amber-600 font-bold">
                  · {{ g.menunggu }} menunggu</span
                >
                <span v-if="g.lampiran" class="text-[var(--text-tertiary)]">
                  · <i class="fas fa-paperclip"></i> {{ g.lampiran }}</span
                >
              </p>
            </div>
            <i
              class="fas text-[11px] text-[var(--text-tertiary)] flex-shrink-0"
              :class="rekapIzinBuka[g.id] ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </button>

          <div v-if="rekapIzinBuka[g.id]" class="border-t border-[var(--border-subtle)]">
            <div class="px-2.5 pt-2 flex justify-end">
              <button
                :disabled="!!pdfBusy"
                class="text-[10px] font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 disabled:opacity-50 px-2 py-1 rounded-lg border border-rose-200 dark:border-rose-800 cursor-pointer"
                @click="eksporRekapIzin(g)"
              >
                <i
                  :class="['fas mr-1', pdfBusy === g.id ? 'fa-spinner fa-spin' : 'fa-file-pdf']"
                ></i
                >Ekspor PDF {{ g.nama }}
              </button>
            </div>
            <div class="divide-y divide-[var(--border-subtle)]">
              <div
                v-for="a in g.items"
                :key="'rk-' + a.id"
                class="p-2.5 flex items-start justify-between gap-3"
              >
                <div class="min-w-0">
                  <p class="text-[12px] font-bold text-[var(--text-primary)]">
                    {{ jenisIzinLabel(a.jenis)
                    }}<span v-if="a.jenis === 'cuti' && a.kategori" class="text-violet-600">
                      ({{ cutiKatNama(a.kategori) }})</span
                    >
                    · {{ rangeLabel(a) }}
                  </p>
                  <p class="text-[10px] text-[var(--text-secondary)]">
                    Shift {{ shiftsLabel(a.shifts)
                    }}<span v-if="a.penyetuju"> · oleh {{ a.penyetuju }}</span>
                  </p>
                  <p v-if="a.keterangan" class="text-[10px] text-[var(--text-tertiary)] italic">
                    {{ a.keterangan }}
                  </p>
                  <p v-if="a.catatan_putus" class="text-[10px] text-[var(--text-tertiary)] italic">
                    {{ a.catatan_putus }}
                  </p>
                  <a
                    v-if="a.lampiran_url"
                    :href="a.lampiran_url"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-cyan-600 hover:underline"
                    ><i class="fas fa-paperclip"></i>Lihat lampiran</a
                  >
                  <span v-else class="text-[10px] text-[var(--text-tertiary)] italic"
                    >Tanpa lampiran</span
                  >
                </div>
                <span
                  :class="[
                    'text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0',
                    kelasStatusIzin(a)
                  ]"
                  >{{ labelStatusIzin(a) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ajukan Izin/Sakit/Cuti -->
    <div
      v-if="izinFormOpen"
      class="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 backdrop-blur-sm"
      @click.self="izinFormOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 class="text-sm font-black text-[var(--text-primary)]">
            <i class="fas fa-calendar-minus text-cyan-600 mr-1.5"></i>Ajukan Izin / Sakit / Cuti
          </h3>
          <button
            class="text-[var(--text-tertiary)] hover:text-rose-600"
            @click="izinFormOpen = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-4 space-y-3 text-sm">
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
              >Jenis</label
            >
            <select
              v-model="izinForm.jenis"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="izin">Izin</option>
              <option value="sakit">Sakit</option>
              <option value="cuti">Cuti</option>
            </select>
          </div>
          <!-- Kategori cuti + sisa kuota (hanya jenis cuti) -->
          <div v-if="izinForm.jenis === 'cuti'">
            <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
              >Kategori Cuti</label
            >
            <select
              v-model="izinForm.kategori"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">— Pilih kategori —</option>
              <option v-for="k in cutiKategori" :key="k.id" :value="k.id">{{ k.nama }}</option>
            </select>
            <p v-if="!cutiKategori.length" class="text-[10px] text-amber-600 italic mt-1">
              <i class="fas fa-exclamation-triangle mr-1"></i>Belum ada kategori cuti — hubungi
              admin untuk mengaturnya.
            </p>
            <p
              v-else-if="izinKuota"
              class="text-[10px] mt-1"
              :class="izinOverKuota ? 'text-rose-600 font-bold' : 'text-[var(--text-secondary)]'"
            >
              <i class="fas fa-info-circle mr-1"></i>
              <template v-if="izinKuota.sisa === null">Kategori ini tanpa batas kuota.</template>
              <template v-else
                >Sisa kuota: <b>{{ izinKuota.sisa }}</b> / {{ izinKuota.kuota }} hari · diajukan
                {{ izinJumlahHari }} hari<span v-if="izinOverKuota">
                  — melebihi sisa</span
                ></template
              >
            </p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Mulai</label
              >
              <input
                v-model="izinForm.tgl_mulai"
                type="date"
                class="w-full px-2.5 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Selesai</label
              >
              <input
                v-model="izinForm.tgl_selesai"
                type="date"
                :min="izinForm.tgl_mulai"
                class="w-full px-2.5 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
              >Shift</label
            >
            <div class="flex flex-wrap gap-2">
              <button
                v-for="sh in izinShiftOptions"
                :key="sh.id"
                type="button"
                :class="[
                  'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
                  izinForm.shifts.includes(sh.id)
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-[var(--bg-card-elevated)] text-[var(--text-secondary)] border-[var(--border-default)]'
                ]"
                @click="toggleIzinShift(sh.id)"
              >
                {{ sh.label }}
              </button>
              <span
                v-if="!izinShiftOptions.length"
                class="text-[11px] text-[var(--text-tertiary)] italic"
                >Belum ada shift pada data guru.</span
              >
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
              >Keterangan</label
            >
            <textarea
              v-model="izinForm.keterangan"
              rows="2"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            ></textarea>
          </div>
          <!-- Lampiran opsional (surat dokter / keterangan) -->
          <div>
            <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
              >Lampiran (opsional)</label
            >
            <input
              type="file"
              accept="image/*,application/pdf"
              class="block w-full text-[11px] text-[var(--text-secondary)] file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-cyan-50 file:text-cyan-700 cursor-pointer"
              @change="onPickLampiran"
            />
            <p v-if="izinForm.lampiran_name" class="text-[10px] text-emerald-600 mt-1">
              <i class="fas fa-paperclip mr-1"></i>{{ izinForm.lampiran_name }}
            </p>
            <p class="text-[10px] text-[var(--text-tertiary)] italic mt-0.5">
              Foto/PDF, maks 2 MB (mis. surat dokter / keterangan).
            </p>
          </div>
        </div>
        <div class="p-4 border-t border-[var(--border-subtle)] flex justify-end gap-2">
          <button
            class="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]"
            @click="izinFormOpen = false"
          >
            Batal
          </button>
          <button
            :disabled="izinBusy"
            class="px-4 py-2 text-xs font-black rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
            @click="submitIzin"
          >
            <i :class="['fas', izinBusy ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1']"></i
            >Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { queryColl, getOne } from '@/services/db'
import { uploadBase64 } from '@/services/storage'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { useIzinGuru } from '@/composables/useIzinGuru'
import { todayJakarta, rentangTanggal } from '@/utils/format'
import {
  statusIzin,
  labelStatusIzin,
  kelasStatusIzin,
  rekapIzinPerOrang,
  tahunIzinTersedia
} from '@/utils/izinStatus'
import { pesanGalatDb } from '@/utils/pesanGalatDb'
import { shiftsForGuru } from '@/utils/shiftDerive'
import { shiftLabelOf } from '@/utils/shiftMaster'
import { cetakRekapIzinPdf } from '@/utils/rekapIzinPdf'

const auth = useAuthStore()
const settingsStore = useSettingsStore()
const toast = useToast()
const { isElectron: isDesktop } = useDesktopShell()

// Galat DB → kalimat yang bisa ditindaklanjuti (lihat utils/pesanGalatDb).
function galatSimpan(e, aksi) {
  toast.error(pesanGalatDb(e, { aksi, peran: auth.sesiAktif?.role_sistem }))
}

// Data guru yang login — sumber pilihan shift di form (termasuk shift custom).
const guru = ref(null)
onMounted(async () => {
  try {
    guru.value = await getOne('guru', String(auth.sesiAktif?.id))
  } catch {
    // tanpa data guru, pilihan shift jatuh ke sesi
  }
})
const izinShiftOptions = computed(() => {
  const s = settingsStore.settings || {}
  const g = guru.value || auth.sesiAktif || {}
  return [...shiftsForGuru(g, s)].map((id) => ({ id, label: shiftLabelOf(s, id) }))
})

const {
  myIzin,
  antrian: izinAntrian,
  riwayat: izinRiwayat,
  semua: izinSemua,
  isApprover: izinIsApprover,
  cutiKategori,
  kuotaCuti,
  ajukan: ajukanIzin,
  batal: batalIzinReq,
  tolak: tolakIzinReq,
  setujui: setujuiIzinReq,
  terapkanUlang: terapkanUlangReq,
  abaikanTerap: abaikanTerapReq
} = useIzinGuru()

// Pemulihan bug tanggal-mundur (s/d 5 Agu 2026): disetujui tapi nol baris absensi tertulis.
//   `tgl_terap_ulang` mengeluarkan baris yang sudah diperiksa manusia (Terapkan/Abaikan).
const izinPerluTerap = computed(() =>
  (izinRiwayat.value || []).filter(
    (a) => statusIzin(a) === 'disetujui' && Number(a.n_absensi || 0) === 0 && !a.tgl_terap_ulang
  )
)

const izinFormOpen = ref(false)
const izinForm = reactive({
  jenis: 'izin',
  kategori: '',
  tgl_mulai: '',
  tgl_selesai: '',
  shifts: [],
  keterangan: '',
  lampiran_dataUrl: '',
  lampiran_isPdf: false,
  lampiran_name: ''
})
const izinBusy = ref(false)
const izinBusyId = ref(null)

function openIzinForm() {
  // WIB, bukan UTC — kalau tidak, form yang dibuka dini hari terisi tanggal KEMARIN.
  const t = todayJakarta()
  Object.assign(izinForm, {
    jenis: 'izin',
    kategori: '',
    tgl_mulai: t,
    tgl_selesai: t,
    shifts: [],
    keterangan: '',
    lampiran_dataUrl: '',
    lampiran_isPdf: false,
    lampiran_name: ''
  })
  izinFormOpen.value = true
}

function cutiKatNama(id) {
  const k = cutiKategori.value.find((x) => String(x.id) === String(id))
  return k ? k.nama : id || '-'
}
// Kuota cuti pengaju sebuah pengajuan (untuk penyetuju) — { kuota, terpakai, sisa } | null
function cutiSisa(a) {
  if (a.jenis !== 'cuti' || !a.kategori) return null
  return kuotaCuti(String(a.guru_id || ''), a.kategori, new Date().getFullYear())
}
const izinKuota = computed(() => {
  if (izinForm.jenis !== 'cuti' || !izinForm.kategori) return null
  return kuotaCuti(String(auth.sesiAktif?.id || ''), izinForm.kategori, new Date().getFullYear())
})
const izinJumlahHari = computed(() => {
  if (!izinForm.tgl_mulai) return 0
  const s = new Date(izinForm.tgl_mulai + 'T00:00:00')
  const e = new Date((izinForm.tgl_selesai || izinForm.tgl_mulai) + 'T00:00:00')
  if (isNaN(s) || isNaN(e) || e < s) return 1
  return Math.min(60, Math.round((e - s) / 86400000) + 1)
})
const izinOverKuota = computed(
  () =>
    izinKuota.value && izinKuota.value.sisa !== null && izinJumlahHari.value > izinKuota.value.sisa
)

function onPickLampiran(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    toast.error('Lampiran maks 2 MB.')
    ev.target.value = ''
    return
  }
  const isPdf = file.type === 'application/pdf'
  if (!file.type.startsWith('image/') && !isPdf) {
    toast.error('Lampiran harus JPG / PNG / PDF.')
    ev.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    izinForm.lampiran_dataUrl = String(reader.result || '')
    izinForm.lampiran_isPdf = isPdf
    izinForm.lampiran_name = file.name
  }
  reader.readAsDataURL(file)
}
function toggleIzinShift(sh) {
  const i = izinForm.shifts.indexOf(sh)
  if (i >= 0) izinForm.shifts.splice(i, 1)
  else izinForm.shifts.push(sh)
}
async function submitIzin() {
  if (!izinForm.tgl_mulai) {
    toast.warning('Pilih tanggal mulai.')
    return
  }
  if (izinForm.jenis === 'cuti' && cutiKategori.value.length && !izinForm.kategori) {
    toast.warning('Pilih kategori cuti.')
    return
  }
  if (!izinForm.shifts.length) {
    toast.warning('Pilih minimal satu shift.')
    return
  }
  if (izinForm.tgl_selesai && izinForm.tgl_selesai < izinForm.tgl_mulai) {
    toast.warning('Tanggal selesai sebelum mulai.')
    return
  }
  // Over-kuota = peringatan (tetap boleh diajukan; penyetuju yang memutuskan).
  if (izinOverKuota.value) {
    toast.warning(
      `Melebihi sisa kuota (${izinKuota.value.sisa} hari). Pengajuan tetap dikirim untuk ditinjau.`
    )
  }
  izinBusy.value = true
  try {
    let lampiran_url = ''
    if (izinForm.lampiran_dataUrl) {
      const ext = izinForm.lampiran_isPdf ? 'pdf' : 'jpg'
      lampiran_url = await uploadBase64(
        `izin_lampiran/izin_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`,
        izinForm.lampiran_dataUrl,
        izinForm.lampiran_isPdf ? 'application/pdf' : 'image/jpeg'
      )
    }
    await ajukanIzin({
      jenis: izinForm.jenis,
      kategori: izinForm.kategori,
      tgl_mulai: izinForm.tgl_mulai,
      tgl_selesai: izinForm.tgl_selesai,
      shifts: izinForm.shifts,
      keterangan: izinForm.keterangan,
      lampiran_url
    })
    toast.success('Pengajuan terkirim, menunggu persetujuan.')
    izinFormOpen.value = false
  } catch (e) {
    galatSimpan(e, 'mengirim pengajuan izin/sakit/cuti')
  } finally {
    izinBusy.value = false
  }
}
async function batalIzin(a) {
  if (!confirm(`Batalkan pengajuan ${jenisIzinLabel(a.jenis)} ${rangeLabel(a)}?`)) return
  try {
    await batalIzinReq(a.id)
    toast.success('Pengajuan dibatalkan.')
  } catch (e) {
    galatSimpan(e, 'membatalkan pengajuan')
  }
}
// Absensi milik GURU PENGAJU — wajib dibaca dulu: tanpa daftar yang benar, penjaga
//   "hari ini sudah hadir" tak jalan dan baris HADIR-nya tertimpa menjadi izin.
async function ambilAbsensiGuru(guruId) {
  const id = String(guruId || '')
  if (!id) return []
  try {
    return await queryColl('absensi_shift_guru', [['guru_id', '==', id]])
  } catch (e) {
    // Gagal baca = JANGAN lanjut menulis; lebih baik batal daripada menimpa "hadir".
    throw new Error('Gagal membaca absensi guru tsb: ' + (e.message || e))
  }
}
async function setujuiIzin(a) {
  izinBusyId.value = a.id
  try {
    const r = await setujuiIzinReq(a, await ambilAbsensiGuru(a.guru_id))
    toast.success(
      `Disetujui — ${r.written} absensi terisi${r.skipped ? `, ${r.skipped} dilewati (sudah hadir)` : ''}.`
    )
  } catch (e) {
    galatSimpan(e, 'menyetujui pengajuan')
  } finally {
    izinBusyId.value = null
  }
}
async function terapkanUlangIzin(a) {
  izinBusyId.value = a.id
  try {
    const r = await terapkanUlangReq(a, await ambilAbsensiGuru(a.guru_id))
    if (r.written)
      toast.success(
        `${r.written} absensi terisi${r.skipped ? `, ${r.skipped} dilewati (sudah hadir)` : ''}.`
      )
    else
      toast.info(
        `Tak ada yang perlu diisi — ${r.skipped} hari sudah tercatat hadir/terlambat pada shift itu. Baris ini ditutup.`
      )
  } catch (e) {
    galatSimpan(e, 'menerapkan ulang absensi pengajuan')
  } finally {
    izinBusyId.value = null
  }
}
async function abaikanTerapIzin(a) {
  if (!confirm(`Tutup baris "${a.guru_nama}" dari daftar ini? Absensi tidak diubah.`)) return
  izinBusyId.value = a.id
  try {
    await abaikanTerapReq(a)
    toast.success('Baris ditutup dari daftar pemulihan.')
  } catch (e) {
    galatSimpan(e, 'menutup baris dari daftar pemulihan')
  } finally {
    izinBusyId.value = null
  }
}
async function tolakIzin(a) {
  izinBusyId.value = a.id
  try {
    await tolakIzinReq(a)
    toast.success('Pengajuan ditolak.')
  } catch (e) {
    galatSimpan(e, 'menolak pengajuan')
  } finally {
    izinBusyId.value = null
  }
}
function jenisIzinLabel(j) {
  return j === 'sakit' ? 'Sakit' : j === 'cuti' ? 'Cuti' : 'Izin'
}
function shiftsLabel(arr) {
  return (Array.isArray(arr) ? arr : [])
    .map((x) => String(x).charAt(0).toUpperCase() + String(x).slice(1))
    .join(', ')
}
function rangeLabel(a) {
  return a.tgl_selesai && a.tgl_selesai !== a.tgl_mulai
    ? `${a.tgl_mulai} – ${a.tgl_selesai}`
    : a.tgl_mulai
}

// ===== Rekap riwayat per orang (penyetuju) =====
// Sumbernya `izinSemua` (se-scope, status apa pun) supaya yang masih menunggu ikut terlihat.
const rekapIzinCari = ref('')
const rekapIzinTahun = ref('')
const rekapIzinBuka = reactive({})
function toggleRekapIzin(id) {
  rekapIzinBuka[id] = !rekapIzinBuka[id]
}
// Deret tanggal yang sama dengan penulis absensi (batas 60 hari) → angka rekap = absensi.
const hariIzin = (a) => rentangTanggal(a.tgl_mulai, a.tgl_selesai, 60).length || 1
const rekapIzinTahunOpsi = computed(() => tahunIzinTersedia(izinSemua.value))
const rekapIzin = computed(() =>
  rekapIzinPerOrang(izinSemua.value, {
    cari: rekapIzinCari.value,
    tahun: rekapIzinTahun.value,
    hitungHari: hariIzin
  })
)
const rekapIzinDisaring = computed(() => !!(rekapIzinCari.value.trim() || rekapIzinTahun.value))
function ringkasJenisIzin(g) {
  const p = []
  if (g.n.izin) p.push(`Izin ${g.n.izin}`)
  if (g.n.sakit) p.push(`Sakit ${g.n.sakit}`)
  if (g.n.cuti) p.push(`Cuti ${g.n.cuti}`)
  return p.join(' · ')
}

// v.1.4.9: ekspor PDF — satu orang (g) atau semua yang tampil sesuai penyaring.
const pdfBusy = ref('')
async function eksporRekapIzin(g = null) {
  const groups = g ? [g] : rekapIzin.value
  if (!groups.length) {
    toast.warning('Tak ada data untuk diekspor.')
    return
  }
  pdfBusy.value = g ? g.id : 'semua'
  try {
    await cetakRekapIzinPdf(groups, {
      settings: settingsStore.settings || {},
      tahun: rekapIzinTahun.value,
      cutiKatNama,
      hitungHari: hariIzin,
      pencetak: auth.sesiAktif?.nama || ''
    })
    toast.success('PDF rekap izin dibuat.')
  } catch (e) {
    toast.error('Gagal membuat PDF: ' + (e?.message || e))
  } finally {
    pdfBusy.value = ''
  }
}
</script>
