<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header (web/HP; di Electron ribbon yang pegang judul) -->
    <div v-if="!isElectron" class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-clipboard-check text-teal-500 mr-2"></i>Tes Kenaikan Qiraati
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Guru mengajukan tes santri ke Kepala/PJ. <b>Lulus = siap naik</b> (kenaikan tetap diproses di menu Kenaikan).
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1.5 flex-wrap">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="activeTab = t.id"
        :class="[
          'px-3.5 py-2 rounded-xl text-xs font-black transition',
          activeTab === t.id
            ? 'bg-teal-600 text-white shadow-sm'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)]'
        ]"
      >
        <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
        <span v-if="t.badge" class="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px]">{{ t.badge }}</span>
      </button>
    </div>

    <!-- ============ TAB: AJUKAN (guru) ============ -->
    <div v-if="activeTab === 'ajukan'" class="space-y-3">
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"></i>
            <input v-model="search" type="text" placeholder="Cari nama / No. Induk santri..." class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <select v-model="fLembaga" class="px-2.5 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="">Semua lembaga</option>
            <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <p class="text-[11px] text-[var(--text-tertiary)] font-bold">
          {{ santriEligible.length }} santri bisa diajukan.
          Tercentang: <b class="text-teal-600">{{ checkedCount }}</b>
        </p>
      </div>

      <div v-if="santriEligible.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-user-slash text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Tidak ada santri Qiraati yang bisa diajukan.</p>
      </div>

      <div v-else class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
        <div class="max-h-[55vh] overflow-y-auto divide-y divide-[var(--border-subtle)]">
          <div v-for="s in santriEligible" :key="s.id" class="p-3 md:p-3.5">
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                :checked="sel[s.id]?.checked"
                :disabled="hasOpenAjuan(s.id)"
                @change="toggle(s)"
                class="mt-1 w-4 h-4 accent-teal-600 flex-shrink-0 disabled:opacity-40"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
                <p class="text-[11px] text-[var(--text-secondary)]">
                  {{ s.lembaga }}<span v-if="s.kelas"> · {{ s.kelas }}</span><span v-if="s.juz && s.juz !== '-'"> · Juz {{ juzNum(s.juz) }}</span>
                </p>
                <p v-if="hasOpenAjuan(s.id)" class="text-[10px] text-amber-600 font-bold mt-0.5">
                  <i class="fas fa-hourglass-half mr-1"></i>Sudah ada ajuan menunggu tes
                </p>

                <!-- Kontrol jenis + target (muncul saat dicentang) -->
                <div v-if="sel[s.id]?.checked" class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div v-if="jenisOptionsFor(s).length > 1">
                    <label class="block text-[10px] font-black text-[var(--text-secondary)] uppercase mb-1">Jenis kenaikan</label>
                    <select :value="sel[s.id].jenis" @change="onJenis(s, $event.target.value)" class="w-full px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
                      <option v-for="j in jenisOptionsFor(s)" :key="j.value" :value="j.value" :disabled="j.value === 'kelas' && !canNaikKelasPtpt(s)">
                        {{ j.label }}{{ j.value === 'kelas' && !canNaikKelasPtpt(s) ? ' — blm juz akhir' : '' }}
                      </option>
                    </select>
                  </div>
                  <div :class="jenisOptionsFor(s).length > 1 ? '' : 'sm:col-span-2'">
                    <label class="block text-[10px] font-black text-[var(--text-secondary)] uppercase mb-1">Target tujuan</label>
                    <select v-model="sel[s.id].target" class="w-full px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
                      <option value="" disabled>— pilih target —</option>
                      <option v-for="t in targetOptionsFor(s)" :key="t" :value="t">{{ t }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="checkedCount > 0" class="sticky bottom-3 flex justify-end">
        <button
          @click="submitAjukan"
          :disabled="submitting"
          class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-black shadow-lg"
        >
          <i :class="['fas', submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1.5']"></i>
          Ajukan Tes ({{ checkedCount }})
        </button>
      </div>
    </div>

    <!-- ============ TAB: STATUS AJUAN SAYA (guru) ============ -->
    <div v-else-if="activeTab === 'status'" class="space-y-2">
      <div v-if="myAjuan.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada ajuan tes dari Anda.</p>
      </div>
      <div v-for="a in myAjuan" :key="a.id" class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">{{ a.lembaga }} · {{ a.kelas_asal || '-' }} → <b>{{ a.target }}</b></p>
            <p v-if="a.catatan_hasil" class="text-[11px] text-[var(--text-tertiary)] mt-1 italic">Catatan: {{ a.catatan_hasil }}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span :class="['text-[10px] font-black px-2.5 py-1 rounded-full', statusCls(a.status)]">{{ statusLabel(a.status) }}</span>
            <button v-if="a.status === 'diajukan'" @click="batalkan(a)" class="text-[10px] font-bold text-rose-600 hover:underline">Batalkan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ TAB: ANTRIAN (kepala/admin) ============ -->
    <div v-else-if="activeTab === 'antrian'" class="space-y-2">
      <!-- v.100d: filter Lembaga/Jenis/Cari -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-2.5 border border-[var(--border-subtle)] shadow-sm flex flex-wrap gap-2">
        <select v-model="fLembaga" class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua lembaga</option>
          <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
        </select>
        <select v-model="fJenis" class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua jenis</option>
          <option v-for="j in JENIS_OPTS" :key="j.value" :value="j.value">{{ j.label }}</option>
        </select>
        <input v-model="fCari" type="text" placeholder="Cari nama…" class="flex-1 min-w-[120px] px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none" />
      </div>
      <div v-if="antrianView.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-clipboard-check text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">{{ antrian.length ? 'Tak ada yang cocok dengan filter.' : 'Belum ada ajuan tes menunggu.' }}</p>
      </div>
      <div v-for="a in antrianView" :key="a.id" class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">{{ a.lembaga }} · {{ a.kelas_asal || '-' }} → <b>{{ a.target }}</b></p>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">Pengaju: {{ a.guru_nama || '-' }} · {{ fmtTgl(a.tgl_daftar) }}</p>
          </div>
        </div>
        <!-- v.100d: nilai aspek tes (skala 0–90) — penguji isi saat menguji -->
        <div class="mt-2 space-y-2">
          <template v-for="grp in aspekGroupsFor(a)" :key="grp.group || 'g'">
            <p v-if="grp.group" class="text-[10px] font-black text-teal-700 uppercase mt-1">{{ grp.group }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div v-for="asp in grp.aspek" :key="asp.key">
                <label class="block text-[10px] font-bold text-[var(--text-secondary)] mb-0.5">
                  {{ asp.label }}<span v-if="!asp.toRapor" class="text-[var(--text-tertiary)]" title="Nilai ini tidak masuk rapor">*</span>
                </label>
                <input
                  type="number" min="0" :max="MAX_NILAI" inputmode="numeric"
                  :value="getNilai(a.id, asp.key)"
                  @input="setNilai(a.id, asp.key, $event.target.value)"
                  :placeholder="`0–${MAX_NILAI}`"
                  class="w-full px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          </template>
        </div>
        <textarea v-model="catatan[a.id]" rows="1" class="w-full mt-2 px-2.5 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none resize-none"></textarea>
        <div class="flex gap-2 mt-2">
          <button @click="openLulus(a)" :disabled="busyId === a.id" class="flex-1 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black"><i class="fas fa-check mr-1"></i>Lulus</button>
          <button @click="decide(a, 'tidak_lulus')" :disabled="busyId === a.id" class="flex-1 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-black"><i class="fas fa-redo mr-1"></i>Belum Lulus</button>
          <button @click="decide(a, 'ditolak')" :disabled="busyId === a.id" class="px-3 py-2 rounded-lg bg-[var(--bg-muted)] hover:bg-rose-50 text-rose-600 text-xs font-black border border-[var(--border-subtle)]"><i class="fas fa-times mr-1"></i>Tolak</button>
        </div>
      </div>
    </div>

    <!-- ============ TAB: RIWAYAT (kepala/admin) ============ -->
    <div v-else-if="activeTab === 'riwayat'" class="space-y-2">
      <!-- v.100d: filter Lembaga/Jenis/Cari -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-2.5 border border-[var(--border-subtle)] shadow-sm flex flex-wrap gap-2">
        <select v-model="fLembaga" class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua lembaga</option>
          <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
        </select>
        <select v-model="fJenis" class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua jenis</option>
          <option v-for="j in JENIS_OPTS" :key="j.value" :value="j.value">{{ j.label }}</option>
        </select>
        <input v-model="fCari" type="text" placeholder="Cari nama…" class="flex-1 min-w-[120px] px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none" />
      </div>
      <div v-if="riwayatView.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-history text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">{{ riwayat.length ? 'Tak ada yang cocok dengan filter.' : 'Belum ada riwayat tes.' }}</p>
      </div>
      <div v-for="a in riwayatView" :key="a.id" class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">{{ a.lembaga }} · {{ a.kelas_asal || '-' }} → <b>{{ a.target }}</b></p>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">Pengaju: {{ a.guru_nama || '-' }} · Penguji: {{ a.penguji || '-' }} · {{ fmtTgl(a.tgl_hasil) }}</p>
            <p v-if="a.catatan_hasil" class="text-[11px] text-[var(--text-tertiary)] mt-1 italic">Catatan: {{ a.catatan_hasil }}</p>
            <div v-if="a.nilai && Object.keys(a.nilai).length" class="mt-1.5 flex flex-wrap gap-1">
              <span v-for="(v, k) in a.nilai" :key="k" class="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-bold">{{ nilaiLabelFor(a, k) }}: {{ v }}</span>
            </div>
          </div>
          <span :class="['text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0', statusCls(a.status)]">{{ statusLabel(a.status) }}</span>
        </div>
      </div>
    </div>

    <!-- ============ TAB: REKAP (statistik + cetak PDF) — v.100d Fase 5 ============ -->
    <div v-else-if="activeTab === 'rekap'" class="space-y-3">
      <!-- filter -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-2.5 border border-[var(--border-subtle)] shadow-sm flex flex-wrap gap-2">
        <select v-model="fLembaga" class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua lembaga</option>
          <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
        </select>
        <select v-model="fJenis" class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua jenis</option>
          <option v-for="j in JENIS_OPTS" :key="j.value" :value="j.value">{{ j.label }}</option>
        </select>
        <input v-model="fCari" type="text" placeholder="Cari nama…" class="flex-1 min-w-[120px] px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none" />
      </div>

      <!-- kartu statistik -->
      <div class="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
        <div class="bg-[var(--bg-card)] rounded-xl p-2.5 border border-[var(--border-subtle)] shadow-sm">
          <p class="text-2xl font-black text-[var(--text-primary)]">{{ statsRekap.total }}</p>
          <p class="text-[10px] uppercase text-[var(--text-tertiary)]">Total</p>
        </div>
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-2.5 border border-amber-200 dark:border-amber-800">
          <p class="text-2xl font-black text-amber-600">{{ statsRekap.diajukan }}</p>
          <p class="text-[10px] uppercase text-amber-700/80">Menunggu</p>
        </div>
        <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-2.5 border border-emerald-200 dark:border-emerald-800">
          <p class="text-2xl font-black text-emerald-600">{{ statsRekap.lulus }}</p>
          <p class="text-[10px] uppercase text-emerald-700/80">Lulus</p>
        </div>
        <div class="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-2.5 border border-orange-200 dark:border-orange-800">
          <p class="text-2xl font-black text-orange-600">{{ statsRekap.tidak_lulus }}</p>
          <p class="text-[10px] uppercase text-orange-700/80">Belum</p>
        </div>
        <div class="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-2.5 border border-rose-200 dark:border-rose-800">
          <p class="text-2xl font-black text-rose-600">{{ statsRekap.ditolak }}</p>
          <p class="text-[10px] uppercase text-rose-700/80">Tolak</p>
        </div>
        <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-2.5 border border-cyan-200 dark:border-cyan-800">
          <p class="text-2xl font-black text-cyan-600">{{ statsRekap.kelulusan }}%</p>
          <p class="text-[10px] uppercase text-cyan-700/80">Kelulusan</p>
        </div>
      </div>

      <!-- per lembaga -->
      <div class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="bg-[var(--bg-muted)]">
            <tr class="text-[10px] uppercase text-[var(--text-secondary)]">
              <th class="px-2 py-2 text-left">Lembaga</th>
              <th class="px-2 py-2 text-center">Menunggu</th>
              <th class="px-2 py-2 text-center">Lulus</th>
              <th class="px-2 py-2 text-center">Belum</th>
              <th class="px-2 py-2 text-center">Tolak</th>
              <th class="px-2 py-2 text-center">% Lulus</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in statsRekap.lembagaRows" :key="r.lembaga" class="border-t border-[var(--border-subtle)]">
              <td class="px-2 py-1.5 font-bold text-[var(--text-primary)]">{{ r.lembaga }}</td>
              <td class="px-2 py-1.5 text-center text-amber-600">{{ r.diajukan }}</td>
              <td class="px-2 py-1.5 text-center text-emerald-600 font-bold">{{ r.lulus }}</td>
              <td class="px-2 py-1.5 text-center text-orange-600">{{ r.tidak_lulus }}</td>
              <td class="px-2 py-1.5 text-center text-rose-600">{{ r.ditolak }}</td>
              <td class="px-2 py-1.5 text-center font-bold text-cyan-600">{{ r.pct }}%</td>
            </tr>
            <tr v-if="statsRekap.lembagaRows.length === 0">
              <td colspan="6" class="px-2 py-4 text-center text-[var(--text-tertiary)] italic">Belum ada data tes.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- cetak PDF -->
      <div class="flex flex-wrap gap-2">
        <button @click="cetakDaftarTes" :disabled="cetakBusy" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition">
          <i :class="['fas', cetakBusy ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Cetak Daftar Antrian
        </button>
        <button @click="cetakRekapHasil" :disabled="cetakBusy" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition">
          <i :class="['fas', cetakBusy ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Cetak Rekap Hasil
        </button>
      </div>
    </div>

    <!-- v.100d: Modal LULUS → naik otomatis (Kepala/PJ konfirmasi tujuan + pilih guru) -->
    <div v-if="lulusFor" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
        <div class="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 class="text-sm font-black text-[var(--text-primary)]"><i class="fas fa-circle-check text-emerald-600 mr-1.5"></i>Lulus &amp; Naikkan</h3>
          <button @click="closeLulus" class="text-[var(--text-tertiary)] hover:text-rose-600 text-lg"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-4 overflow-auto flex-1 space-y-3 text-sm">
          <p class="text-xs text-[var(--text-secondary)]">
            <b class="text-[var(--text-primary)]">{{ lulusFor.nama_cache }}</b> — {{ lulusFor.lembaga }} · {{ lulusFor.kelas_asal || '-' }}
            <span class="block mt-0.5">Diajukan naik ke <b>{{ lulusFor.target }}</b>. Konfirmasi tujuan &amp; guru berikutnya:</span>
          </p>
          <div v-if="!lulusSantri" class="text-xs text-[var(--text-tertiary)] italic"><i class="fas fa-spinner fa-spin mr-1"></i>Memuat data santri…</div>
          <template v-else>
            <div>
              <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1">Kelas / tingkat tujuan</label>
              <select v-model="naikForm.kelas" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="" disabled>— pilih —</option>
                <option v-for="k in canonKelasOptions(naikForm.lembaga)" :key="k" :value="k">{{ k }}</option>
              </select>
            </div>
            <div v-if="naikForm.lembaga === 'PTPT'">
              <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1">Juz</label>
              <select v-model="naikForm.juz" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">—</option>
                <option v-for="j in juzOptionsNaik()" :key="j" :value="String(j)">Juz {{ j }}</option>
              </select>
            </div>
            <div v-if="naikForm.lembaga === 'Pra PTPT'">
              <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1">Khotam ke</label>
              <select v-model="naikForm.khotam_ke" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">—</option>
                <option v-for="r in KHOTAM_ROMAWI" :key="r" :value="r">Khotam {{ r }}</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1">Guru berikutnya (bila pindah kelas)</label>
              <input list="guru-naik-list" v-model="naikForm.guru" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
              <datalist id="guru-naik-list">
                <option v-for="g in guruOptionsFor(naikForm.lembaga)" :key="g" :value="g"></option>
              </datalist>
            </div>
            <p class="text-[10px] text-[var(--text-tertiary)] italic">Catatan tes diambil dari kolom catatan di antrian; nilai aspek yang sudah diisi ikut tersimpan.</p>
          </template>
        </div>
        <div class="p-4 border-t border-[var(--border-subtle)] flex justify-end gap-2">
          <button @click="closeLulus" class="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]">Batal</button>
          <button @click="submitLulus" :disabled="naikBusy || !lulusSantri" class="px-4 py-2 text-xs font-black rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50">
            <i :class="['fas', naikBusy ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>Lulus &amp; Naikkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useSantri } from '@/composables/useSantri'
import { useTesKenaikan } from '@/composables/useTesKenaikan'
import { useAuthStore } from '@/stores/auth' // v.100d: nama guru utk scope ngaji-only
import { ownsNgaji } from '@/utils/guruScope' // v.100d
import { getOne } from '@/services/firestore' // v.100d: muat dokumen santri penuh utk auto-naik
import { buildKenaikanQiraatiPayload, writeKenaikan } from '@/utils/promosiKenaikan' // v.100d
import { buildTesRaporFeed, currentRaporPeriode } from '@/utils/tesRaporFeed' // v.100d Fase 3: nilai tes → rapor
import { db } from '@/services/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { buildListPdf } from '@/utils/pdfBuilder' // v.100d Fase 5: cetak daftar/rekap tes PDF
import { juzNum } from '@/utils/format' // v.100e: normalisasi tampilan juz (anti dobel "Juz JUZ n")
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useDesktopShell } from '@/composables/useDesktopShell'
import {
  isEligibleForTes, tesJenisOptions, tesTargetOptions, tesTargetDefault,
  canNaikKelasPtpt, STATUS_LABEL,
  tesAspekGroups, tesAspekFlat, clampNilaiTes, TES_NILAI_MAX
} from '@/utils/tesKenaikan'

const { isElectron } = useDesktopShell()
const toast = useToast()
const confirmDlg = useConfirm()
const settingsStore = useSettingsStore()

const { santri, search, guruRaw } = useSantri()
const {
  myAjuan, antrian, riwayat, isPenguji, ajukanBatch, putuskan, batalAjuan, hasOpenAjuan
} = useTesKenaikan()

const settings = computed(() => settingsStore.settings || {})

const auth = useAuthStore()
const myGuruNama = computed(() => String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '').trim())

// v.100d: filter UI (Lembaga/Jenis/Cari) — berguna utk Kepala/PJ & admin lintas-lembaga.
const fLembaga = ref('')
const fJenis = ref('')
const fCari = ref('')
const TES_LEMBAGA_OPTS = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
const JENIS_OPTS = [
  { value: 'jilid', label: 'Jilid' }, { value: 'khotam', label: 'Khotam' },
  { value: 'juz', label: 'Juz' }, { value: 'kelas', label: 'Kelas' }, { value: 'level', label: 'Level' }
]
function matchAjuanFilter(a) {
  if (fLembaga.value && a.lembaga !== fLembaga.value) return false
  if (fJenis.value && a.jenis !== fJenis.value) return false
  if (fCari.value && !String(a.nama_cache || '').toLowerCase().includes(fCari.value.toLowerCase())) return false
  return true
}
const antrianView = computed(() => antrian.value.filter(matchAjuanFilter))
const riwayatView = computed(() => riwayat.value.filter(matchAjuanFilter))

// v.100d Fase 5: statistik/rekap tes (hormati filter aktif) — diajukan/lulus/belum/tolak + % kelulusan + per lembaga.
const statsRekap = computed(() => {
  const all = [...antrianView.value, ...riwayatView.value]
  const base = { diajukan: 0, lulus: 0, tidak_lulus: 0, ditolak: 0 }
  const tot = { ...base }
  const perLembaga = {}
  for (const a of all) {
    const st = a.status || 'diajukan'
    if (tot[st] != null) tot[st]++
    const l = a.lembaga || '—'
    if (!perLembaga[l]) perLembaga[l] = { lembaga: l, ...base }
    if (perLembaga[l][st] != null) perLembaga[l][st]++
  }
  const tested = tot.lulus + tot.tidak_lulus
  const kelulusan = tested > 0 ? Math.round((tot.lulus / tested) * 100) : 0
  const lembagaRows = Object.values(perLembaga).map((r) => {
    const t = r.lulus + r.tidak_lulus
    return { ...r, pct: t > 0 ? Math.round((r.lulus / t) * 100) : 0 }
  })
  return { total: all.length, ...tot, kelulusan, lembagaRows }
})

// ----- Fase 5: cetak PDF (PDF saja, sesuai kyai) -----
const cetakBusy = ref(false)
function _kopRekap() {
  const set = settingsStore.settings || {}
  return { title: set.kopLine1 || set.txtAppName || '', name: set.kopLine2 || '', address: set.kopLine3 || '', contact: set.kopLine4 || '' }
}
async function cetakDaftarTes() {
  if (cetakBusy.value) return
  const list = antrianView.value
  if (!list.length) { toast.warning('Tidak ada antrian untuk dicetak.'); return }
  cetakBusy.value = true
  try {
    const rows = list.map((a, i) => ({
      no: i + 1, nama: a.nama_cache || '', lembaga: a.lembaga || '',
      kelas: a.kelas_asal || '-', target: a.target || '-', guru: a.guru_nama || '-', tgl: fmtTgl(a.tgl_daftar)
    }))
    await buildListPdf({
      kind: 'umum', orientation: 'l', kop: _kopRekap(),
      title: 'DAFTAR PESERTA TES KENAIKAN QIRAATI',
      columns: [
        { key: 'no', header: 'No', width: 30 },
        { key: 'nama', header: 'Nama Santri', width: 150 },
        { key: 'lembaga', header: 'Lembaga', width: 80 },
        { key: 'kelas', header: 'Kelas/Posisi', width: 80 },
        { key: 'target', header: 'Target', width: 90 },
        { key: 'guru', header: 'Pengaju', width: 110 },
        { key: 'tgl', header: 'Tgl Ajuan', width: 70 }
      ],
      rows, filename: 'Daftar_Peserta_Tes.pdf'
    })
    toast.success('PDF daftar peserta dibuat.')
  } catch (e) { toast.error('Gagal cetak: ' + (e.message || e)) } finally { cetakBusy.value = false }
}
async function cetakRekapHasil() {
  if (cetakBusy.value) return
  const list = riwayatView.value
  if (!list.length) { toast.warning('Tidak ada riwayat untuk dicetak.'); return }
  cetakBusy.value = true
  try {
    const rows = list.map((a, i) => ({
      no: i + 1, nama: a.nama_cache || '', lembaga: a.lembaga || '',
      arah: `${a.kelas_asal || '-'} → ${a.target || '-'}`,
      status: statusLabel(a.status), penguji: a.penguji || '-', tgl: fmtTgl(a.tgl_hasil)
    }))
    await buildListPdf({
      kind: 'umum', orientation: 'l', kop: _kopRekap(),
      title: 'REKAP HASIL TES KENAIKAN QIRAATI',
      columns: [
        { key: 'no', header: 'No', width: 30 },
        { key: 'nama', header: 'Nama Santri', width: 150 },
        { key: 'lembaga', header: 'Lembaga', width: 80 },
        { key: 'arah', header: 'Asal → Target', width: 130 },
        { key: 'status', header: 'Hasil', width: 90 },
        { key: 'penguji', header: 'Penguji', width: 100 },
        { key: 'tgl', header: 'Tanggal', width: 70 }
      ],
      rows, filename: 'Rekap_Hasil_Tes.pdf'
    })
    toast.success('PDF rekap hasil dibuat.')
  } catch (e) { toast.error('Gagal cetak: ' + (e.message || e)) } finally { cetakBusy.value = false }
}

// Santri yang boleh diajukan (ter-scope per role oleh useSantri).
//   v.100d: guru biasa (bukan penguji) DIBATASI ke santri NGAJI ampuannya (bukan wali kelas sekolah).
const santriEligible = computed(() => {
  let list = (santri.value || []).filter((s) => isEligibleForTes(s))
  if (!isPenguji.value) list = list.filter((s) => ownsNgaji(s, myGuruNama.value))
  if (fLembaga.value) list = list.filter((s) => s.lembaga === fLembaga.value)
  return list
})

// ----- Tabs (adaptif role) -----
// Tab Ajukan tampil bila ada santri dalam scope (guru→ampuan, kepala→se-lembaga) atau bukan penguji.
const showAjukan = computed(() => (santri.value || []).length > 0 || !isPenguji.value)
const tabs = computed(() => {
  const out = []
  if (showAjukan.value) {
    out.push({ id: 'ajukan', label: 'Ajukan', icon: 'fa-paper-plane' })
    out.push({ id: 'status', label: 'Status Ajuan', icon: 'fa-list-check', badge: myAjuan.value.filter((a) => a.status === 'diajukan').length || 0 })
  }
  if (isPenguji.value) {
    out.push({ id: 'antrian', label: 'Antrian Tes', icon: 'fa-clipboard-check', badge: antrian.value.length || 0 })
    out.push({ id: 'riwayat', label: 'Riwayat', icon: 'fa-history' })
    out.push({ id: 'rekap', label: 'Rekap', icon: 'fa-chart-pie' }) // v.100d Fase 5
  }
  return out
})
const activeTab = ref(isPenguji.value ? 'antrian' : 'ajukan')

// ----- Tab Ajukan: state seleksi per santri -----
const sel = reactive({})
function jenisOptionsFor(s) { return tesJenisOptions(s.lembaga) }
function targetOptionsFor(s) { return tesTargetOptions(s, sel[s.id]?.jenis, settings.value) }
function ensureSel(s) {
  if (!sel[s.id]) {
    const jenisList = tesJenisOptions(s.lembaga)
    // default jenis: untuk PTPT pilih 'juz' (kelas hanya bila juz akhir)
    let jenis = jenisList[0]?.value || ''
    if (s.lembaga === 'PTPT') jenis = 'juz'
    sel[s.id] = { checked: false, jenis, target: tesTargetDefault(s, jenis, settings.value) }
  }
  return sel[s.id]
}
function toggle(s) {
  const st = ensureSel(s)
  st.checked = !st.checked
}
function onJenis(s, jenis) {
  const st = ensureSel(s)
  st.jenis = jenis
  st.target = tesTargetDefault(s, jenis, settings.value)
}
const checkedCount = computed(() => Object.values(sel).filter((x) => x.checked).length)

const submitting = ref(false)
async function submitAjukan() {
  const items = santriEligible.value
    .filter((s) => sel[s.id]?.checked)
    .map((s) => ({ santri: s, jenis: sel[s.id].jenis, target: sel[s.id].target }))
  const noTarget = items.filter((it) => !it.target)
  if (noTarget.length) {
    toast.warning(`${noTarget.length} santri belum dipilih targetnya.`)
    return
  }
  const ok = await confirmDlg({
    title: 'Ajukan tes kenaikan?',
    message: `${items.length} santri akan diajukan tes ke Kepala/PJ lembaganya. Lanjutkan?`,
    confirmText: 'Ajukan'
  })
  if (!ok) return
  submitting.value = true
  try {
    const res = await ajukanBatch(items, guruRaw.value || [])
    let msg = `${res.ok} ajuan terkirim`
    if (res.skipped) msg += `, ${res.skipped} dilewati (sudah ada ajuan)`
    if (res.fail) msg += `, ${res.fail} gagal`
    res.fail ? toast.warning(msg) : toast.success(msg)
    // reset centang yang sukses
    for (const it of items) if (sel[it.santri.id]) sel[it.santri.id].checked = false
    if (res.ok) activeTab.value = 'status'
  } catch (e) {
    toast.error('Gagal mengajukan: ' + (e.message || e))
  } finally {
    submitting.value = false
  }
}

async function batalkan(a) {
  const ok = await confirmDlg({ title: 'Batalkan ajuan?', message: `Batalkan ajuan tes ${a.nama_cache}?`, confirmText: 'Batalkan', danger: true })
  if (!ok) return
  try { await batalAjuan(a.id); toast.success('Ajuan dibatalkan.') } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
}

// ----- Tab Antrian: putuskan hasil -----
const catatan = reactive({})
const busyId = ref(null)
// v.100d: nilai aspek per ajuan (skala 0–90) — penguji isi saat menguji.
const nilai = reactive({})
const MAX_NILAI = TES_NILAI_MAX
function aspekGroupsFor(a) { return tesAspekGroups({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal }) }
function getNilai(id, key) { return nilai[id]?.[key] ?? '' }
function setNilai(id, key, val) { if (!nilai[id]) nilai[id] = {}; nilai[id][key] = val }
function collectNilai(a) {
  const out = {}
  for (const asp of tesAspekFlat({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal })) {
    const v = clampNilaiTes(getNilai(a.id, asp.key))
    if (v !== null) out[asp.key] = v
  }
  return out
}
function nilaiLabelFor(a, key) {
  const asp = tesAspekFlat({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal }).find((x) => x.key === key)
  return asp?.label || key
}
async function decide(a, status) {
  // v.100d: 'lulus' kini lewat modal naik (openLulus). decide hanya utk Belum Lulus / Tolak.
  const label = status === 'tidak_lulus' ? 'BELUM LULUS' : 'TOLAK'
  const ok = await confirmDlg({
    title: `Tetapkan hasil: ${label}?`,
    message: `${a.nama_cache} → ${label}. Lanjutkan?`,
    confirmText: 'Simpan',
    danger: status === 'ditolak'
  })
  if (!ok) return
  busyId.value = a.id
  try {
    await putuskan(a.id, status, catatan[a.id] || '', collectNilai(a))
    delete catatan[a.id]
    delete nilai[a.id]
    toast.success('Hasil tersimpan.')
  } catch (e) {
    toast.error('Gagal menyimpan: ' + (e.message || e))
  } finally {
    busyId.value = null
  }
}

// ----- v.100d: Lulus → naik otomatis (modal: konfirmasi tujuan + pilih guru) -----
const lulusFor = ref(null)
const lulusSantri = ref(null)
const naikForm = reactive({ lembaga: '', kelas: '', juz: '', khotam_ke: '', guru: '' })
const naikBusy = ref(false)
const KHOTAM_ROMAWI = ['I', 'II', 'III', 'IV', 'V']

function canonKelasOptions(lembaga) {
  const lmb = String(lembaga || '').toLowerCase().trim()
  if (lmb === 'tpq' || lmb === 'tpq pagi' || lmb === 'tpq sore') return ['Jilid 1A', 'Jilid 1B', 'Jilid 1C', 'Jilid 2A', 'Jilid 2B', 'Jilid 3A', 'Jilid 3B', 'Jilid 4A', 'Jilid 4B', 'Jilid 5A', 'Jilid 5B', 'KPI', 'Persiapan Khotaman']
  if (lmb === 'pra ptpt') return ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
  if (lmb === 'ptpt') return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']
  if (lmb === 'ppph' || lmb === 'p3h') return ["Level 1 (Arba'in Nawawi)", 'Level 2 (Riyadhus Sholihin)', 'Level 3 (Shahih Bukhari)', 'Level 4 (Shahih Muslim)']
  return []
}
function juzOptionsNaik() {
  const m = String(naikForm.kelas || '').match(/(\d+)/)
  if (!m) return Array.from({ length: 30 }, (_, i) => i + 1)
  const k = parseInt(m[1], 10)
  if (k < 1 || k > 6) return Array.from({ length: 30 }, (_, i) => i + 1)
  const start = (k - 1) * 5 + 1
  return Array.from({ length: 5 }, (_, i) => start + i)
}
function guruOptionsFor(lembaga) {
  return (guruRaw.value || []).filter((g) => g.lembaga === lembaga || g.lembaga_sekolah === lembaga).map((g) => g.nama).filter(Boolean)
}
// Tebakan tujuan dari target tes (Kepala bisa koreksi via dropdown).
function prefillNaik(a) {
  const lmb = a.lembaga
  const opts = canonKelasOptions(lmb)
  const t = String(a.target || '')
  let kelas = '', juz = '', khotam = ''
  if (lmb === 'PTPT') {
    if (a.jenis === 'juz') {
      const m = t.match(/(\d+)/); juz = m ? m[1] : ''
      if (juz) kelas = `Kelas ${Math.ceil(Number(juz) / 5)}`
    } else {
      kelas = opts.find((o) => o.toLowerCase() === t.toLowerCase()) || t
      const m = kelas.match(/(\d+)/); if (m) juz = String((Number(m[1]) - 1) * 5 + 1)
    }
  } else if (lmb === 'Pra PTPT') {
    khotam = t.replace(/khotam\s*/i, '').trim().toUpperCase()
    kelas = opts.find((o) => o.toLowerCase() === String(a.kelas_asal || '').toLowerCase()) || a.kelas_asal || ''
  } else if (lmb === 'PPPH' || lmb === 'P3H') {
    kelas = opts.find((o) => o.toLowerCase() === t.toLowerCase()) || t
  } else {
    const tu = t.toUpperCase()
    if (/^\d[A-C]$/i.test(t)) kelas = `Jilid ${tu}`
    else if (tu.includes('IMTAS')) kelas = 'KPI'
    else if (tu.includes('KHOTAM')) kelas = 'Persiapan Khotaman'
    else kelas = opts.find((o) => o.toLowerCase() === t.toLowerCase()) || t
  }
  return { kelas, juz, khotam }
}
async function openLulus(a) {
  lulusFor.value = a
  lulusSantri.value = null
  naikForm.lembaga = a.lembaga || ''
  naikForm.kelas = ''; naikForm.juz = ''; naikForm.khotam_ke = ''; naikForm.guru = ''
  try {
    const s = await getOne('santri', String(a.santri_id))
    lulusSantri.value = s
    const pre = prefillNaik(a)
    naikForm.kelas = pre.kelas
    naikForm.juz = pre.juz
    naikForm.khotam_ke = pre.khotam
    naikForm.guru = s ? (Array.isArray(s.guru) ? s.guru[0] || '' : s.guru || '') : ''
  } catch (e) {
    toast.error('Gagal memuat data santri: ' + (e.message || e))
  }
}
function closeLulus() { lulusFor.value = null; lulusSantri.value = null }
async function submitLulus() {
  const a = lulusFor.value
  const s = lulusSantri.value
  if (!a) return
  if (!s) { toast.error('Data santri belum termuat.'); return }
  if (!naikForm.kelas) { toast.warning('Pilih kelas tujuan dulu.'); return }
  naikBusy.value = true
  try {
    const opts = {
      lembaga: naikForm.lembaga || a.lembaga || '',
      kelas: naikForm.kelas,
      juz: naikForm.lembaga === 'PTPT' ? naikForm.juz : '',
      khotam_ke: naikForm.lembaga === 'Pra PTPT' ? naikForm.khotam_ke : '',
      guru: naikForm.guru || '',
      kelas_sekolah: s.kelas_sekolah || '',
      catatan: catatan[a.id] || ''
    }
    const { payload, rkEntry } = buildKenaikanQiraatiPayload(s, opts, { settings: settings.value, lembagaList: [] })
    await writeKenaikan(s, payload, rkEntry)
    const nilaiObj = collectNilai(a)
    await putuskan(a.id, 'lulus', catatan[a.id] || '', nilaiObj)
    // v.100d Fase 3: nilai tes auto → rapor (posisi yang DISELESAIKAN, periode berjalan; prefill editable)
    try {
      const feed = buildTesRaporFeed(
        { lembaga: a.lembaga, kelas_asal: a.kelas_asal, juz_asal: a.juz_asal, target: a.target },
        nilaiObj
      )
      if (feed) {
        const { tahunAjaran, semester, periodKey } = currentRaporPeriode()
        const lmbKey = s.lembaga || a.lembaga || ''
        const rid = `rapor_${s.id}_${lmbKey}_${periodKey}`
        await setDoc(doc(db, 'rapor_semester', rid), {
          santri_id: String(s.id),
          santri_nama: s.nama || a.nama_cache || '',
          lembaga: lmbKey,
          tahunAjaran,
          semester,
          data_nilai: feed,
          updated_at: new Date().toISOString()
        }, { merge: true })
      }
    } catch (e2) {
      console.warn('[tes→rapor] gagal feed nilai ke rapor:', e2?.message || e2)
    }
    delete catatan[a.id]; delete nilai[a.id]
    toast.success(`${a.nama_cache} LULUS & dinaikkan ke ${naikForm.kelas}.`)
    closeLulus()
  } catch (e) {
    toast.error('Gagal proses lulus: ' + (e.message || e))
  } finally {
    naikBusy.value = false
  }
}

// ----- helpers UI -----
function statusLabel(s) { return STATUS_LABEL[s] || s }
function statusCls(s) {
  if (s === 'lulus') return 'bg-emerald-100 text-emerald-700'
  if (s === 'tidak_lulus') return 'bg-amber-100 text-amber-700'
  if (s === 'ditolak') return 'bg-rose-100 text-rose-700'
  return 'bg-slate-100 text-slate-600'
}
function fmtTgl(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '-'
}
</script>
