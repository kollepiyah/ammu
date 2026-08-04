<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header (web/HP; di Electron ribbon yang pegang judul) -->
    <div
      v-if="!isElectron"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-clipboard-check text-teal-500 mr-2"></i>Tes Kenaikan Qiraati
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Guru mengajukan tes santri ke Kepala/PJ. <b>Lulus = siap naik</b> (kenaikan tetap diproses
        di menu Kenaikan).
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1.5 flex-wrap">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="[
          'px-3.5 py-2 rounded-xl text-xs font-black transition',
          activeTab === t.id
            ? 'bg-teal-600 text-white shadow-sm'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)]'
        ]"
        @click="activeTab = t.id"
      >
        <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
        <span
          v-if="t.badge"
          class="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px]"
          >{{ t.badge }}</span
        >
      </button>
    </div>

    <!-- ============ TAB: AJUKAN (guru) ============ -->
    <div v-if="activeTab === 'ajukan'" class="space-y-3">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3"
      >
        <div class="flex gap-2">
          <div class="relative flex-1">
            <i
              class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
            ></i>
            <input
              v-model="search"
              type="text"
              placeholder="Cari nama / No. Induk santri..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <select
            v-model="fLembaga"
            class="px-2.5 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua lembaga</option>
            <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <p class="text-[11px] text-[var(--text-tertiary)] font-bold">
          {{ santriEligible.length }} santri bisa diajukan. Tercentang:
          <b class="text-teal-600">{{ checkedCount }}</b>
        </p>
      </div>

      <div
        v-if="santriEligible.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-user-slash text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">
          Tidak ada santri Qiraati yang bisa diajukan.
        </p>
      </div>

      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <div class="max-h-[55vh] overflow-y-auto divide-y divide-[var(--border-subtle)]">
          <div v-for="s in santriEligible" :key="s.id" class="p-3 md:p-3.5">
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                :checked="sel[s.id]?.checked"
                :disabled="hasOpenAjuan(s.id)"
                class="mt-1 w-4 h-4 accent-teal-600 flex-shrink-0 disabled:opacity-40"
                @change="toggle(s)"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
                <p class="text-[11px] text-[var(--text-secondary)]">
                  {{ s.lembaga
                  }}<span v-if="s.kelas"> · {{ labelKelasPra(s.lembaga, s.kelas) }}</span
                  ><span v-if="s.juz && s.juz !== '-'"> · Juz {{ juzNum(s.juz) }}</span>
                </p>
                <p v-if="hasOpenAjuan(s.id)" class="text-[10px] text-amber-600 font-bold mt-0.5">
                  <i class="fas fa-hourglass-half mr-1"></i>Sudah ada ajuan menunggu tes
                </p>

                <!-- Target tujuan (muncul saat dicentang).
                     v.1.1.9: dropdown "Jenis kenaikan" DIHAPUS — tiap lembaga cuma punya
                     satu jenis, dan PTPT kini selalu 'juz' (kenaikan kelas turun otomatis
                     dari juz: juz 11 -> Kelas 3). Satu pilihan yang tak pernah diganti
                     hanya menambah langkah. -->
                <div v-if="sel[s.id]?.checked" class="mt-2">
                  <label
                    class="block text-[10px] font-black text-[var(--text-secondary)] uppercase mb-1"
                    >Target tujuan</label
                  >
                  <select
                    v-model="sel[s.id].target"
                    class="w-full px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="" disabled>— pilih target —</option>
                    <option v-for="t in targetOptionsFor(s)" :key="t" :value="t">{{ t }}</option>
                  </select>
                  <p
                    v-if="s.lembaga === 'PTPT'"
                    class="text-[10px] text-[var(--text-tertiary)] mt-1"
                  >
                    Kelas PTPT ikut juz otomatis — mis. lulus juz 10 → juz 11 → Kelas 3.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="checkedCount > 0" class="sticky bottom-3 flex justify-end">
        <button
          :disabled="submitting"
          class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-black shadow-lg"
          @click="submitAjukan"
        >
          <i :class="['fas', submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1.5']"></i>
          Ajukan Tes ({{ checkedCount }})
        </button>
      </div>
    </div>

    <!-- ============ TAB: STATUS AJUAN SAYA (guru) ============ -->
    <div v-else-if="activeTab === 'status'" class="space-y-2">
      <div
        v-if="myAjuan.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada ajuan tes dari Anda.</p>
      </div>
      <div
        v-for="a in myAjuan"
        :key="a.id"
        class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {{ a.lembaga }} · {{ labelKelasPra(a.lembaga, a.kelas_asal) || '-' }} →
              <b>{{ a.target }}</b>
            </p>
            <p v-if="a.catatan_hasil" class="text-[11px] text-[var(--text-tertiary)] mt-1 italic">
              Catatan: {{ a.catatan_hasil }}
            </p>
            <!-- v.1.1.9: masa tempuh juz PTPT. Tab Riwayat hanya untuk penguji, jadi
                 tanpa ini GURU KELAS (pengaju) tak pernah melihatnya — padahal Kyai
                 minta tampil di guru kelas DAN PJ. -->
            <p
              v-if="masaTempuhText(a)"
              class="text-[10px] mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
              title="Hari efektif sejak lulus juz sebelumnya (Jumat & libur kalender tidak dihitung)"
            >
              <i class="fas fa-hourglass-half"></i>Masa tempuh: {{ masaTempuhText(a) }}
            </p>
          </div>
          <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span
              :class="['text-[10px] font-black px-2.5 py-1 rounded-full', statusCls(a.status)]"
              >{{ statusLabel(a.status) }}</span
            >
            <button
              v-if="a.status === 'diajukan'"
              class="text-[10px] font-bold text-rose-600 hover:underline"
              @click="batalkan(a)"
            >
              Batalkan
            </button>
          </div>
        </div>
        <!-- v.1.1.9: kontak wali + penyimak glondongan, untuk guru kelas PENGAJU.
             Dulu guru pengaju tak punya jalan sama sekali untuk tahu siapa penyimak
             santrinya, apalagi menghubunginya. -->
        <div
          v-if="waliInfo(a) || penyimakGlondonganAjuan(a).length"
          class="mt-2 pt-2 border-t border-[var(--border-subtle)] space-y-1"
        >
          <p v-if="waliInfo(a)" class="text-[11px] flex items-center gap-1.5 flex-wrap">
            <span class="text-[var(--text-tertiary)]">Wali:</span>
            <b class="text-[var(--text-primary)]">{{ waliInfo(a).nama }}</b>
            <a
              v-if="waLink(waliInfo(a).wa)"
              :href="
                waLink(
                  waliInfo(a).wa,
                  pesanTesHasil({
                    nama: a.nama_cache,
                    hasil: statusLabel(a.status),
                    asal: a.kelas_asal,
                    target: a.target,
                    pondok: pondokWa
                  })
                )
              "
              target="_blank"
              rel="noopener"
              class="px-1.5 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
            >
              <i class="fab fa-whatsapp mr-1"></i>{{ waliInfo(a).wa }}
            </a>
            <span v-else class="text-[10px] italic text-[var(--text-tertiary)]"
              >(no WA belum diisi)</span
            >
          </p>

          <div v-if="penyimakGlondonganAjuan(a).length" class="text-[11px]">
            <span class="text-[var(--text-tertiary)]">Penyimak glondongan:</span>
            <p
              v-for="p in penyimakGlondonganAjuan(a)"
              :key="p.id"
              class="flex items-center gap-1.5 flex-wrap mt-0.5 pl-2"
            >
              <span class="text-[var(--text-tertiary)]">{{ p.blok }}:</span>
              <template v-if="p.nama">
                <b class="text-[var(--text-primary)]">{{ p.nama }}</b>
                <a
                  v-if="waLink(p.wa)"
                  :href="
                    waLink(
                      p.wa,
                      pesanGlondongan({
                        guru: p.nama,
                        santri: a.nama_cache,
                        juz: p.blok,
                        pondok: pondokWa
                      })
                    )
                  "
                  target="_blank"
                  rel="noopener"
                  class="px-1.5 py-0.5 rounded font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
                >
                  <i class="fab fa-whatsapp mr-1"></i>{{ p.wa }}
                </a>
                <span v-else class="text-[10px] italic text-[var(--text-tertiary)]"
                  >(no WA belum diisi)</span
                >
                <span
                  v-if="p.status === 'selesai'"
                  class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  >selesai</span
                >
              </template>
              <span v-else class="italic text-amber-700 dark:text-amber-300">
                menunggu penugasan koordinator
              </span>
            </p>
          </div>
        </div>

        <!-- Siap Tes (guru kelas) — hanya PTPT juz yang masih diajukan -->
        <div
          v-if="a.status === 'diajukan' && gerbangMy[a.id] && gerbangMy[a.id].berlaku"
          class="mt-2 pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2 text-[11px]"
        >
          <template v-if="gerbangMy[a.id].glondonganTerkunci">
            <span class="text-amber-700 dark:text-amber-300">
              <i class="fas fa-hourglass-half mr-1"></i>Menunggu simakan:
              {{ pendingLabel(gerbangMy[a.id]) }}
            </span>
          </template>
          <template v-else-if="gerbangMy[a.id].siapTes">
            <span class="text-emerald-700 dark:text-emerald-300 font-bold">
              <i class="fas fa-circle-check mr-1"></i>Sudah ditandai SIAP dites PJ
            </span>
            <button
              :disabled="siapTesBusy === a.id"
              class="text-rose-600 hover:underline font-bold disabled:opacity-50"
              @click="toggleSiapTes(a, false)"
            >
              batal
            </button>
          </template>
          <template v-else>
            <span class="text-[var(--text-secondary)]"
              >Semua sudah disimak. Tandai santri siap dites PJ:</span
            >
            <button
              :disabled="siapTesBusy === a.id"
              class="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-black"
              @click="toggleSiapTes(a, true)"
            >
              <i class="fas fa-flag-checkered mr-1"></i
              >{{ siapTesBusy === a.id ? '...' : 'Siap Tes' }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- ============ TAB: ANTRIAN (kepala/admin) ============ -->
    <div v-else-if="activeTab === 'antrian'" class="space-y-2">
      <!-- v.100d: filter Lembaga/Jenis/Cari -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-2.5 border border-[var(--border-subtle)] shadow-sm flex flex-wrap gap-2"
      >
        <select
          v-model="fLembaga"
          class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua lembaga</option>
          <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
        </select>
        <select
          v-model="fJenis"
          class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua jenis</option>
          <option v-for="j in JENIS_OPTS" :key="j.value" :value="j.value">{{ j.label }}</option>
        </select>
        <input
          v-model="fCari"
          type="text"
          placeholder="Cari nama…"
          class="flex-1 min-w-[120px] px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>
      <div
        v-if="antrianView.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-clipboard-check text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">
          {{
            antrian.length ? 'Tak ada yang cocok dengan filter.' : 'Belum ada ajuan tes menunggu.'
          }}
        </p>
      </div>
      <div
        v-for="a in antrianView"
        :key="a.id"
        class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {{ a.lembaga }} · {{ labelKelasPra(a.lembaga, a.kelas_asal) || '-' }} →
              <b>{{ a.target }}</b>
            </p>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">
              Pengaju: {{ a.guru_nama || '-' }} · {{ fmtTgl(a.tgl_daftar) }}
            </p>
          </div>
        </div>
        <!-- v.100d: nilai aspek tes (skala 0–90) — penguji isi saat menguji -->
        <div class="mt-2 space-y-2">
          <template v-for="grp in aspekGroupsFor(a)" :key="grp.group || 'g'">
            <p v-if="grp.group" class="text-[10px] font-black text-teal-700 uppercase mt-1">
              {{ grp.group }}
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div v-for="asp in grp.aspek" :key="asp.key">
                <label class="block text-[10px] font-bold text-[var(--text-secondary)] mb-0.5">
                  {{ asp.label
                  }}<span
                    v-if="!asp.toRapor"
                    class="text-[var(--text-tertiary)]"
                    title="Nilai ini tidak masuk rapor"
                    >*</span
                  >
                </label>
                <input
                  type="number"
                  min="0"
                  :max="MAX_NILAI"
                  inputmode="numeric"
                  :value="getNilai(a.id, asp.key)"
                  :placeholder="`0–${MAX_NILAI}`"
                  class="w-full px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
                  @input="setNilai(a.id, asp.key, $event.target.value)"
                />
              </div>
            </div>
          </template>
        </div>
        <textarea
          v-model="catatan[a.id]"
          rows="1"
          class="w-full mt-2 px-2.5 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none resize-none"
        ></textarea>
        <!-- v.1.2.5 (Kyai): tanggal lulus/naik (default hari ini). Berlaku saat LULUS —
             menyetir cap kartu kenaikan, masa tempuh & periode rapor. Mundurkan bila tes
             benar terjadi di tanggal lampau. Sinkron dgn field yang sama di modal Lulus. -->
        <div class="mt-2 flex items-center gap-2">
          <label
            class="text-[10px] font-black uppercase text-[var(--text-secondary)] whitespace-nowrap"
            >Tgl lulus/naik</label
          >
          <input
            type="date"
            :value="getTgl(a.id)"
            :max="todayStr()"
            class="px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            @input="setTgl(a.id, $event.target.value)"
          />
        </div>
        <div
          v-if="gerbangAntrian[a.id] && gerbangAntrian[a.id].terkunci"
          class="mt-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-[11px] text-amber-800 dark:text-amber-200"
        >
          <i class="fas fa-lock mr-1"></i>
          <b>Belum bisa dites PJ</b> —
          <template v-if="gerbangAntrian[a.id].glondonganTerkunci">
            belum disimak: {{ pendingLabel(gerbangAntrian[a.id]) }}.
            <button
              v-if="gerbangAntrian[a.id].adaBarisHilang"
              :disabled="buatUlangBusy === a.id"
              class="ml-1 underline font-bold hover:text-amber-900 dark:hover:text-amber-100 disabled:opacity-50"
              @click="buatUlangGlond(a)"
            >
              {{ buatUlangBusy === a.id ? 'membuat…' : 'buat ulang baris' }}
            </button>
          </template>
          <template v-else>menunggu guru kelas menekan tombol "Siap Tes".</template>
        </div>
        <div class="flex gap-2 mt-2">
          <button
            :disabled="busyId === a.id || (gerbangAntrian[a.id] && gerbangAntrian[a.id].terkunci)"
            class="flex-1 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black"
            @click="openLulus(a)"
          >
            <i class="fas fa-check mr-1"></i>Lulus
          </button>
          <button
            :disabled="busyId === a.id || (gerbangAntrian[a.id] && gerbangAntrian[a.id].terkunci)"
            class="flex-1 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black"
            @click="decide(a, 'tidak_lulus')"
          >
            <i class="fas fa-redo mr-1"></i>Belum Lulus
          </button>
          <button
            :disabled="busyId === a.id"
            class="px-3 py-2 rounded-lg bg-[var(--bg-muted)] hover:bg-rose-50 text-rose-600 text-xs font-black border border-[var(--border-subtle)]"
            @click="decide(a, 'ditolak')"
          >
            <i class="fas fa-times mr-1"></i>Tolak
          </button>
        </div>
      </div>
    </div>

    <!-- ============ TAB: RIWAYAT (kepala/admin) ============ -->
    <div v-else-if="activeTab === 'riwayat'" class="space-y-2">
      <!-- v.1.1.9: PJ PTPT dibatasi ke santri ampuannya. Tanpa pesan ini, santri yang
           label "PJ PTPT"-nya belum diisi akan tampak HILANG tanpa keterangan. -->
      <div
        v-if="diluarAmpuan"
        class="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 px-3 py-2 text-[11px] text-amber-800 dark:text-amber-200"
      >
        <i class="fas fa-user-shield mr-1"></i>
        <b>{{ diluarAmpuan }} ajuan PTPT</b> tidak ditampilkan karena bukan santri ampuan Anda.
        Kalau ada santri yang seharusnya masuk, isi kolom <b>PJ PTPT</b> di data santrinya.
      </div>
      <!-- v.100d: filter Lembaga/Jenis/Cari -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-2.5 border border-[var(--border-subtle)] shadow-sm flex flex-wrap gap-2"
      >
        <select
          v-model="fLembaga"
          class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua lembaga</option>
          <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
        </select>
        <select
          v-model="fJenis"
          class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua jenis</option>
          <option v-for="j in JENIS_OPTS" :key="j.value" :value="j.value">{{ j.label }}</option>
        </select>
        <input
          v-model="fCari"
          type="text"
          placeholder="Cari nama…"
          class="flex-1 min-w-[120px] px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>
      <div
        v-if="riwayatView.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-history text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">
          {{ riwayat.length ? 'Tak ada yang cocok dengan filter.' : 'Belum ada riwayat tes.' }}
        </p>
      </div>
      <div
        v-for="a in riwayatView"
        :key="a.id"
        class="bg-[var(--bg-card)] rounded-xl p-3.5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ a.nama_cache }}</p>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {{ a.lembaga }} · {{ labelKelasPra(a.lembaga, a.kelas_asal) || '-' }} →
              <b>{{ a.target }}</b>
            </p>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">
              Pengaju: {{ a.guru_nama || '-' }} · Penguji: {{ a.penguji || '-' }} ·
              {{ fmtTgl(a.tgl_hasil) }}
            </p>
            <!-- v.1.1.9: masa tempuh antar-juz PTPT (hari efektif sejak lulus juz sebelumnya) -->
            <p
              v-if="masaTempuhText(a)"
              class="text-[10px] mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
              title="Hari efektif sejak lulus juz sebelumnya (Jumat & libur kalender tidak dihitung)"
            >
              <i class="fas fa-hourglass-half"></i>Masa tempuh: {{ masaTempuhText(a) }}
            </p>
            <p v-if="a.catatan_hasil" class="text-[11px] text-[var(--text-tertiary)] mt-1 italic">
              Catatan: {{ a.catatan_hasil }}
            </p>
            <div v-if="a.nilai && Object.keys(a.nilai).length" class="mt-1.5 flex flex-wrap gap-1">
              <span
                v-for="(v, k) in a.nilai"
                :key="k"
                class="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-bold"
                >{{ nilaiLabelFor(a, k) }}: {{ v }}</span
              >
            </div>
          </div>
          <span
            :class="[
              'text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0',
              statusCls(a.status)
            ]"
            >{{ statusLabel(a.status) }}</span
          >
        </div>
        <!-- v.107 CRUD (super_admin): uji ulang / hapus record historis -->
        <div
          v-if="canCrud"
          class="mt-2 pt-2 border-t border-[var(--border-subtle)] flex justify-end gap-2"
        >
          <button
            class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
            @click="ujiUlang(a)"
          >
            <i class="fas fa-rotate-left"></i>Uji Ulang
          </button>
          <button
            class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
            @click="hapusRecord(a)"
          >
            <i class="fas fa-trash"></i>Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- ============ TAB: REKAP (statistik + cetak PDF) — v.100d Fase 5 ============ -->
    <div v-else-if="activeTab === 'rekap'" class="space-y-3">
      <!-- filter -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-2.5 border border-[var(--border-subtle)] shadow-sm flex flex-wrap gap-2"
      >
        <select
          v-model="fLembaga"
          class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua lembaga</option>
          <option v-for="l in TES_LEMBAGA_OPTS" :key="l" :value="l">{{ l }}</option>
        </select>
        <select
          v-model="fJenis"
          class="px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua jenis</option>
          <option v-for="j in JENIS_OPTS" :key="j.value" :value="j.value">{{ j.label }}</option>
        </select>
        <input
          v-model="fCari"
          type="text"
          placeholder="Cari nama…"
          class="flex-1 min-w-[120px] px-2.5 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
        />
      </div>

      <!-- kartu statistik -->
      <div class="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
        <div
          class="bg-[var(--bg-card)] rounded-xl p-2.5 border border-[var(--border-subtle)] shadow-sm"
        >
          <p class="text-2xl font-black text-[var(--text-primary)]">{{ statsRekap.total }}</p>
          <p class="text-[10px] uppercase text-[var(--text-tertiary)]">Total</p>
        </div>
        <div
          class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-2.5 border border-amber-200 dark:border-amber-800"
        >
          <p class="text-2xl font-black text-amber-600">{{ statsRekap.diajukan }}</p>
          <p class="text-[10px] uppercase text-amber-700/80">Menunggu</p>
        </div>
        <div
          class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-2.5 border border-emerald-200 dark:border-emerald-800"
        >
          <p class="text-2xl font-black text-emerald-600">{{ statsRekap.lulus }}</p>
          <p class="text-[10px] uppercase text-emerald-700/80">Lulus</p>
        </div>
        <div
          class="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-2.5 border border-orange-200 dark:border-orange-800"
        >
          <p class="text-2xl font-black text-orange-600">{{ statsRekap.tidak_lulus }}</p>
          <p class="text-[10px] uppercase text-orange-700/80">Belum</p>
        </div>
        <div
          class="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-2.5 border border-rose-200 dark:border-rose-800"
        >
          <p class="text-2xl font-black text-rose-600">{{ statsRekap.ditolak }}</p>
          <p class="text-[10px] uppercase text-rose-700/80">Tolak</p>
        </div>
        <div
          class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-2.5 border border-cyan-200 dark:border-cyan-800"
        >
          <p class="text-2xl font-black text-cyan-600">{{ statsRekap.kelulusan }}%</p>
          <p class="text-[10px] uppercase text-cyan-700/80">Kelulusan</p>
        </div>
      </div>

      <!-- per lembaga -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-x-auto"
      >
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
            <tr
              v-for="r in statsRekap.lembagaRows"
              :key="r.lembaga"
              class="border-t border-[var(--border-subtle)]"
            >
              <td class="px-2 py-1.5 font-bold text-[var(--text-primary)]">{{ r.lembaga }}</td>
              <td class="px-2 py-1.5 text-center text-amber-600">{{ r.diajukan }}</td>
              <td class="px-2 py-1.5 text-center text-emerald-600 font-bold">{{ r.lulus }}</td>
              <td class="px-2 py-1.5 text-center text-orange-600">{{ r.tidak_lulus }}</td>
              <td class="px-2 py-1.5 text-center text-rose-600">{{ r.ditolak }}</td>
              <td class="px-2 py-1.5 text-center font-bold text-cyan-600">{{ r.pct }}%</td>
            </tr>
            <tr v-if="statsRekap.lembagaRows.length === 0">
              <td colspan="6" class="px-2 py-4 text-center text-[var(--text-tertiary)] italic">
                Belum ada data tes.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- cetak PDF -->
      <div class="flex flex-wrap gap-2">
        <button
          :disabled="cetakBusy"
          class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition"
          @click="cetakDaftarTes"
        >
          <i :class="['fas', cetakBusy ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Cetak Daftar
          Antrian
        </button>
        <button
          :disabled="cetakBusy"
          class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition"
          @click="cetakRekapHasil"
        >
          <i :class="['fas', cetakBusy ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Cetak Rekap
          Hasil
        </button>
      </div>
    </div>

    <!-- v.100d: Modal LULUS → naik otomatis (Kepala/PJ konfirmasi tujuan + pilih guru) -->
    <div
      v-if="lulusFor"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col"
      >
        <div class="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 class="text-sm font-black text-[var(--text-primary)]">
            <i class="fas fa-circle-check text-emerald-600 mr-1.5"></i>Lulus &amp; Naikkan
          </h3>
          <button
            class="text-[var(--text-tertiary)] hover:text-rose-600 text-lg"
            @click="closeLulus"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 space-y-3 text-sm">
          <p class="text-xs text-[var(--text-secondary)]">
            <b class="text-[var(--text-primary)]">{{ lulusFor.nama_cache }}</b> —
            {{ lulusFor.lembaga }} ·
            {{ labelKelasPra(lulusFor.lembaga, lulusFor.kelas_asal) || '-' }}
            <span class="block mt-0.5"
              >Diajukan naik ke <b>{{ lulusFor.target }}</b
              >. Konfirmasi tujuan &amp; guru berikutnya:</span
            >
          </p>
          <div v-if="!lulusSantri" class="text-xs text-[var(--text-tertiary)] italic">
            <i class="fas fa-spinner fa-spin mr-1"></i>Memuat data santri…
          </div>
          <template v-else>
            <!-- v.1.2.2 (Kyai): santri yang menamatkan jenjang TERAKHIR lembaganya naik ke
                 lembaga berikutnya. Ditegaskan supaya perpindahan tak terjadi diam-diam. -->
            <div
              v-if="naikForm.pindah"
              class="rounded-xl border border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-900/30 p-2.5 text-[11px] text-teal-800 dark:text-teal-200"
            >
              <i class="fas fa-arrow-up-right-dots mr-1"></i>
              <b>Tamat {{ lulusFor.lembaga }}</b> — ini jenjang terakhirnya, jadi tujuannya
              <b>pindah ke {{ naikForm.lembaga }}</b
              >. Pilih kelas & guru barunya di bawah.
            </div>
            <div>
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Lembaga tujuan</label
              >
              <select
                v-model="naikForm.lembaga"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
                @change="onLembagaTujuanChange"
              >
                <option v-for="l in lembagaTujuanOptions" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <div>
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Kelas / tingkat tujuan</label
              >
              <select
                v-model="naikForm.kelas"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="" disabled>— pilih —</option>
                <option v-for="k in canonKelasOptions(naikForm.lembaga)" :key="k" :value="k">
                  {{ k }}
                </option>
              </select>
              <p
                v-if="canonKelasOptions(naikForm.lembaga).length === 0"
                class="text-[10px] text-amber-600 dark:text-amber-400 mt-1"
              >
                <i class="fas fa-triangle-exclamation mr-1"></i>Lembaga ini belum punya daftar kelas
                di Master Data.
              </p>
            </div>
            <div v-if="naikForm.lembaga === 'PTPT'">
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Juz</label
              >
              <select
                v-model="naikForm.juz"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">—</option>
                <option v-for="j in juzOptionsNaik()" :key="j" :value="String(j)">
                  Juz {{ j }}
                </option>
              </select>
            </div>
            <div v-if="naikForm.lembaga === 'Pra PTPT'">
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Khotam ke</label
              >
              <select
                v-model="naikForm.khotam_ke"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">—</option>
                <option v-for="r in khotamOptions" :key="r" :value="r">Khotam {{ r }}</option>
              </select>
            </div>
            <!-- v.1.2.2 (Kyai): santri yang masuk PTPT butuh PJ — ada lebih dari satu PJ PTPT
                 dan pembagian santri mengikuti PJ-nya. -->
            <div v-if="naikForm.lembaga === 'PTPT'">
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >PJ PTPT</label
              >
              <select
                v-model="naikForm.pj_ptpt"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">— belum ditentukan —</option>
                <option v-for="p in pjPtptOptions" :key="p" :value="p">{{ p }}</option>
              </select>
              <p
                v-if="pjPtptOptions.length === 0"
                class="text-[10px] text-amber-600 dark:text-amber-400 mt-1"
              >
                <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada guru berjabatan
                <b>PJ PTPT</b> di lembaga PTPT.
              </p>
            </div>
            <div>
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Guru berikutnya (bila pindah kelas)</label
              >
              <input
                v-model="naikForm.guru"
                list="guru-naik-list"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <datalist id="guru-naik-list">
                <option v-for="g in guruOptionsFor(naikForm.lembaga)" :key="g" :value="g"></option>
              </datalist>
            </div>
            <!-- v.1.2.5 (Kyai): tanggal lulus & naik — sinkron dgn field di kartu antrian.
                 Menyetir cap kartu kenaikan, riwayat, tgl_naik, tgl_hasil & PERIODE RAPOR. -->
            <div>
              <label
                class="block text-[10px] font-black uppercase text-[var(--text-secondary)] mb-1"
                >Tanggal lulus &amp; naik</label
              >
              <input
                type="date"
                :value="getTgl(lulusFor.id)"
                :max="todayStr()"
                class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
                @input="setTgl(lulusFor.id, $event.target.value)"
              />
              <p class="text-[10px] text-[var(--text-tertiary)] mt-1">
                Default hari ini. Mundurkan bila tes benar terjadi di tanggal lampau — kartu
                kenaikan, masa tempuh &amp; rapor mengikuti tanggal ini.
              </p>
            </div>
            <p class="text-[10px] text-[var(--text-tertiary)] italic">
              Catatan tes diambil dari kolom catatan di antrian; nilai aspek yang sudah diisi ikut
              tersimpan.
            </p>
          </template>
        </div>
        <div class="p-4 border-t border-[var(--border-subtle)] flex justify-end gap-2">
          <button
            class="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]"
            @click="closeLulus"
          >
            Batal
          </button>
          <button
            :disabled="naikBusy || !lulusSantri"
            class="px-4 py-2 text-xs font-black rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            @click="submitLulus"
          >
            <i :class="['fas', naikBusy ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>Lulus
            &amp; Naikkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useSantri } from '@/composables/useSantri'
import { useTesKenaikan } from '@/composables/useTesKenaikan'
import { useAuthStore } from '@/stores/auth' // v.100d: nama guru utk scope ngaji-only
import { ownsNgaji, guruAktifSaja } from '@/utils/guruScope' // v.100d
import { getOne, mergeOne, subscribeColl } from '@/services/db' // v.100d: muat dokumen santri penuh utk auto-naik
import { buildKenaikanQiraatiPayload, writeKenaikan } from '@/utils/promosiKenaikan' // v.100d
import { buildTesRaporFeed, currentRaporPeriode } from '@/utils/tesRaporFeed' // v.100d Fase 3: nilai tes → rapor
import { buildListPdf } from '@/utils/pdfBuilder' // v.100d Fase 5: cetak daftar/rekap tes PDF
import { juzNum, waLink } from '@/utils/format' // v.100e: normalisasi juz · v.1.1.9: kontak WA
import { pesanTesHasil, pesanGlondongan } from '@/utils/pesanWa' // v.1.2.6: teks WA otomatis
// v.1.1.9: masa tempuh antar-juz PTPT (hari efektif lembaga) — tampil di guru kelas & PJ.
import { masaTempuhJuz, labelMasaTempuh } from '@/utils/masaTempuh'
import { expandLiburDates } from '@/utils/liburNasional'
import { useSettingsStore } from '@/stores/settings'
import { useLembaga } from '@/composables/useLembaga' // v.1.2.2: master/lembaga (daftar jenjang)
// v.1.2.2 (Kyai 22 Jul): jenjang terakhir sebuah lembaga → naik ke lembaga berikutnya.
import {
  jenjangLembaga,
  indexJenjang,
  itemJenjang,
  tujuanNaikLembaga,
  RANTAI_QIRAATI
} from '@/utils/jenjangQiraati'
import { isPjLembaga } from '@/utils/glondongan' // v.1.2.2: kandidat PJ PTPT
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useDesktopShell } from '@/composables/useDesktopShell'
import {
  isEligibleForTes,
  tesJenisOptions,
  tesTargetOptions,
  tesTargetDefault,
  STATUS_LABEL,
  tesAspekGroups,
  tesAspekFlat,
  clampNilaiTes,
  TES_NILAI_MAX
} from '@/utils/tesKenaikan'

const { isElectron } = useDesktopShell()
const toast = useToast()
const confirmDlg = useConfirm()
const settingsStore = useSettingsStore()

// v.1.2.2: daftar jenjang & rantai lembaga qiraati dibaca dari master/lembaga.
const { lembagaRaw } = useLembaga()
const { santri, search, guruRaw } = useSantri()
const {
  ajuanRaw, // v.1.1.9: sumber riwayat lulus utk masa tempuh (jangan pakai `riwayat` yg sudah discope UI)
  diluarAmpuan, // v.1.1.9: ajuan PTPT di luar ampuan PJ — dipakai pesan di bawah
  myAjuan,
  antrian,
  riwayat,
  isPenguji,
  ajukanBatch,
  putuskan,
  batalAjuan,
  hasOpenAjuan,
  canCrud,
  resetAjuan,
  hapusAjuan,
  gerbangFor,
  glondonganByAjuan, // v.1.1.9: baris glondongan per ajuan — utk kontak penyimak
  buatUlangGlondongan,
  setSiapTes
} = useTesKenaikan()

// v.111.x GERBANG glondongan: status per ajuan antrian + buat-ulang baris hilang.
const gerbangAntrian = computed(() => {
  const m = {}
  for (const a of antrian.value) m[a.id] = gerbangFor(a)
  return m
})
function pendingLabel(g) {
  return (g?.pending || [])
    .map(
      (p) =>
        `${p.tipe === 'berjalan' ? 'berjalan' : 'glondongan'} juz ${p.juz_dari}–${p.juz_sampai}`
    )
    .join(', ')
}
// Gerbang utk ajuan SAYA (tab Status) — utk tombol "Siap Tes" guru kelas.
const gerbangMy = computed(() => {
  const m = {}
  for (const a of myAjuan.value) m[a.id] = gerbangFor(a)
  return m
})

// ── v.1.1.9 (Kyai 21 Jul): guru kelas yang MENGAJUKAN perlu bisa menghubungi ──
//   (a) wali santrinya, dan (b) penyimak glondongan begitu ditugaskan koordinator.
//   Sebelumnya guru pengaju tak punya jalan sama sekali untuk tahu siapa penyimaknya.
const santriById = computed(() => {
  const m = new Map()
  for (const s of santri.value || []) m.set(String(s.id), s)
  return m
})
const guruById = computed(() => {
  const m = new Map()
  for (const g of guruRaw.value || []) m.set(String(g.id), g)
  return m
})
const guruByNama = computed(() => {
  const m = new Map()
  for (const g of guruRaw.value || []) {
    const n = String(g.nama || '')
      .trim()
      .toLowerCase()
    if (n) m.set(n, g)
  }
  return m
})

/** { nama, wa } wali santri ajuan ini. */
function waliInfo(a) {
  const s = santriById.value.get(String(a?.santri_id))
  if (!s) return null
  const nama = String(s.wali || s.nama_wali || '').trim()
  const wa = String(s.wa || '').trim()
  return nama || wa ? { nama: nama || '—', wa } : null
}

/**
 * Baris penyimak glondongan untuk 1 ajuan — hanya blok 'glondongan' (yang ditunjuk
 * koordinator). Baris 'berjalan' dilewati: itu tugas guru kelas sendiri, tak perlu
 * dihubungi. Belum ditugaskan → penyimak null supaya UI bilang "menunggu koordinator".
 */
function penyimakGlondonganAjuan(a) {
  const rows = glondonganByAjuan.value[String(a?.id)] || []
  return rows
    .filter((r) => String(r.tipe) === 'glondongan')
    .slice()
    .sort((x, y) => Number(x.kelas_asal || 0) - Number(y.kelas_asal || 0))
    .map((r) => {
      const g =
        guruById.value.get(String(r.penguji_id || '')) ||
        guruByNama.value.get(
          String(r.penguji_nama || '')
            .trim()
            .toLowerCase()
        )
      const nama = String(r.penguji_nama || g?.nama || '').trim()
      return {
        id: String(r.id),
        blok: `Kelas ${r.kelas_asal} · Juz ${r.juz_dari}–${r.juz_sampai}`,
        status: String(r.status || ''),
        nama,
        wa: g?.wa || ''
      }
    })
}
const siapTesBusy = ref(null)
async function toggleSiapTes(a, val) {
  siapTesBusy.value = a.id
  try {
    await setSiapTes(a.id, val)
    toast.success(val ? 'Santri ditandai SIAP dites PJ' : 'Tanda siap dibatalkan')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    siapTesBusy.value = null
  }
}
const buatUlangBusy = ref(null)
async function buatUlangGlond(a) {
  buatUlangBusy.value = a.id
  try {
    const s = (santri.value || []).find((x) => String(x.id) === String(a.santri_id)) || {
      id: a.santri_id,
      nama: a.nama_cache,
      kelas: a.kelas_asal,
      juz: a.juz_asal
    }
    const r = await buatUlangGlondongan(a, s, guruRaw.value || [])
    if (r.gagal) {
      toast.error(`${r.dibuat} dibuat, ${r.gagal} GAGAL — ${r.errors[0] || 'periksa hak akses'}`)
    } else {
      toast[r.dibuat ? 'success' : 'info'](
        r.dibuat
          ? `${r.dibuat} baris glondongan/berjalan dibuat ulang`
          : 'Tidak ada baris yang perlu dibuat'
      )
    }
  } catch (e) {
    toast.error('Gagal buat ulang: ' + (e.message || e))
  } finally {
    buatUlangBusy.value = null
  }
}

// v.107 CRUD (super_admin): uji ulang (reset → antrian utk dinilai ulang) + hapus record.
async function ujiUlang(a) {
  const ok = await confirmDlg({
    title: `Uji ulang ${a.nama_cache}?`,
    message:
      'Record dikembalikan ke antrian (status "diajukan") & nilai/hasil dikosongkan agar bisa dinilai ulang.',
    confirmText: 'Uji Ulang'
  })
  if (!ok) return
  try {
    await resetAjuan(a.id)
    toast.success('Dikembalikan ke antrian untuk uji ulang.')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}
async function hapusRecord(a) {
  const ok = await confirmDlg({
    title: `Hapus record tes ${a.nama_cache}?`,
    message:
      'Record tes kenaikan dihapus permanen (dicadangkan ke audit_log). Tidak mengubah kelas/rapor santri.',
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await hapusAjuan(a.id)
    toast.success('Record tes dihapus.')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

const settings = computed(() => settingsStore.settings || {})
// v.1.2.6: nama pondok utk tanda tangan pesan WA
const pondokWa = computed(() => settings.value.kopLine2 || 'Pondok Pesantren Mambaul Ulum')

const auth = useAuthStore()
const myGuruNama = computed(() => String(auth.sesiAktif?.guru || auth.sesiAktif?.nama || '').trim())

// v.100d: filter UI (Lembaga/Jenis/Cari) — berguna utk Kepala/PJ & admin lintas-lembaga.
const fLembaga = ref('')
const fJenis = ref('')
const fCari = ref('')
const TES_LEMBAGA_OPTS = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
const JENIS_OPTS = [
  { value: 'jilid', label: 'Jilid' },
  { value: 'khotam', label: 'Khotam' },
  { value: 'juz', label: 'Juz' },
  { value: 'kelas', label: 'Kelas' },
  { value: 'level', label: 'Level' }
]
function matchAjuanFilter(a) {
  if (fLembaga.value && a.lembaga !== fLembaga.value) return false
  if (fJenis.value && a.jenis !== fJenis.value) return false
  if (
    fCari.value &&
    !String(a.nama_cache || '')
      .toLowerCase()
      .includes(fCari.value.toLowerCase())
  )
    return false
  return true
}
const antrianView = computed(() => antrian.value.filter(matchAjuanFilter))
const riwayatView = computed(() => riwayat.value.filter(matchAjuanFilter))

// ── v.1.1.9: masa tempuh antar-juz PTPT ──────────────────────────────────────
//   Kyai: "tes kenaikan antar juz ada masa tempuh ketika lulus tes dan tampil di
//   guru kelas dan PJ, dihitung dari hari aktif antara juz sebelumnya dg juz yg
//   dites." Hari aktif = hari efektif lembaga (kalender − Jumat − libur kalender).
//   Dihitung saat ditampilkan (bukan disimpan) supaya berlaku juga utk tes lama.
const kegiatanRaw = ref([])
let unsubKegiatan = null
onMounted(() => {
  unsubKegiatan = subscribeColl('kegiatan', (docs) => (kegiatanRaw.value = docs || []))
})
onUnmounted(() => {
  if (unsubKegiatan) unsubKegiatan()
})
const liburSet = computed(() => expandLiburDates(kegiatanRaw.value))
const masaTempuhOpts = computed(() => ({
  libur: liburSet.value
  // v.1.2.1: libur mingguan = Ahad/Minggu (default ON di hariEfektif). Dulu Jumat.
}))
// Teks siap tampil utk 1 ajuan; '' = tak perlu ditampilkan (bukan PTPT-juz / belum lulus).
function masaTempuhText(a) {
  if (String(a?.lembaga || '').toUpperCase() !== 'PTPT') return ''
  if (String(a?.jenis || '') !== 'juz') return ''
  if (String(a?.status || '') !== 'lulus') return ''
  const mt = masaTempuhJuz(ajuanRaw.value, a, masaTempuhOpts.value)
  // Juz pertama → '—' (tak ada pembanding). Tetap ditampilkan supaya jelas
  // "belum ada data", bukan hilang tanpa keterangan.
  return labelMasaTempuh(mt)
}

// v.100d Fase 5: statistik/rekap tes (hormati filter aktif) — diajukan/lulus/belum/tolak + % kelulusan + per lembaga.
const statsRekap = computed(() => {
  // v.1.2.5: ajuan yang DIBATALKAN pengaju tak dihitung statistik (bukan hasil tes) —
  //   supaya Total & % kelulusan tetap koheren dengan jumlah bucket.
  const all = [...antrianView.value, ...riwayatView.value].filter((a) => a.status !== 'dibatalkan')
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
  return {
    title: set.kopLine1 || set.txtAppName || '',
    name: set.kopLine2 || '',
    address: set.kopLine3 || '',
    contact: set.kopLine4 || ''
  }
}
async function cetakDaftarTes() {
  if (cetakBusy.value) return
  const list = antrianView.value
  if (!list.length) {
    toast.warning('Tidak ada antrian untuk dicetak.')
    return
  }
  cetakBusy.value = true
  try {
    const rows = list.map((a, i) => ({
      no: i + 1,
      nama: a.nama_cache || '',
      lembaga: a.lembaga || '',
      kelas: a.kelas_asal || '-',
      target: a.target || '-',
      guru: a.guru_nama || '-',
      tgl: fmtTgl(a.tgl_daftar)
    }))
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      kop: _kopRekap(),
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
      rows,
      filename: 'Daftar_Peserta_Tes.pdf'
    })
    toast.success('PDF daftar peserta dibuat.')
  } catch (e) {
    toast.error('Gagal cetak: ' + (e.message || e))
  } finally {
    cetakBusy.value = false
  }
}
async function cetakRekapHasil() {
  if (cetakBusy.value) return
  const list = riwayatView.value
  if (!list.length) {
    toast.warning('Tidak ada riwayat untuk dicetak.')
    return
  }
  cetakBusy.value = true
  try {
    // v.1.2.6: rapikan ekspor — urut tanggal (terbaru dulu), tambah kolom Nilai (rata2
    //   aspek 0–90 yang penguji isi) + baris RINGKASAN jumlah lulus di akhir.
    const avgNilai = (a) => {
      const vals =
        a.nilai && typeof a.nilai === 'object'
          ? Object.values(a.nilai)
              .map(Number)
              .filter((n) => !isNaN(n))
          : []
      return vals.length ? String(Math.round(vals.reduce((s, x) => s + x, 0) / vals.length)) : '-'
    }
    const sorted = [...list].sort(
      (a, b) =>
        String(b.tgl_hasil || '').localeCompare(String(a.tgl_hasil || '')) ||
        String(a.nama_cache || '').localeCompare(String(b.nama_cache || ''))
    )
    const rows = sorted.map((a, i) => ({
      no: i + 1,
      nama: a.nama_cache || '',
      lembaga: a.lembaga || '',
      arah: `${a.kelas_asal || '-'} → ${a.target || '-'}`,
      status: statusLabel(a.status),
      nilai: avgNilai(a),
      penguji: a.penguji || '-',
      tgl: fmtTgl(a.tgl_hasil)
    }))
    const lulus = sorted.filter((a) => a.status === 'lulus').length
    rows.push({
      no: '',
      nama: `RINGKASAN — Lulus ${lulus} dari ${sorted.length}`,
      lembaga: '',
      arah: '',
      status: '',
      nilai: '',
      penguji: '',
      tgl: `${sorted.length} peserta`
    })
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      kop: _kopRekap(),
      title: 'REKAP HASIL TES KENAIKAN QIRAATI',
      columns: [
        { key: 'no', header: 'No', width: 26 },
        { key: 'nama', header: 'Nama Santri', width: 150 },
        { key: 'lembaga', header: 'Lembaga', width: 74 },
        { key: 'arah', header: 'Asal → Target', width: 120 },
        { key: 'status', header: 'Hasil', width: 74 },
        { key: 'nilai', header: 'Nilai', width: 44 },
        { key: 'penguji', header: 'Penguji', width: 96 },
        { key: 'tgl', header: 'Tanggal', width: 66 }
      ],
      rows,
      filename: 'Rekap_Hasil_Tes.pdf'
    })
    toast.success('PDF rekap hasil dibuat.')
  } catch (e) {
    toast.error('Gagal cetak: ' + (e.message || e))
  } finally {
    cetakBusy.value = false
  }
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
    out.push({
      id: 'status',
      label: 'Status Ajuan',
      icon: 'fa-list-check',
      badge: myAjuan.value.filter((a) => a.status === 'diajukan').length || 0
    })
  }
  if (isPenguji.value) {
    out.push({
      id: 'antrian',
      label: 'Antrian Tes',
      icon: 'fa-clipboard-check',
      // Kyai 4 Agu: angka di tab wajib SAMA dengan yang terlihat di daftarnya. Dulu
      //   `antrian` MENTAH, sementara daftarnya memakai `antrianView` (tersaring
      //   lembaga/jenis/nama) — menyaring ke TPQ menyisakan 3 kartu tapi tab tetap 40.
      //   Tab 'Status Ajuan' memang tetap dari `myAjuan`: daftarnya juga tak tersaring.
      badge: antrianView.value.length || 0
    })
    out.push({ id: 'riwayat', label: 'Riwayat', icon: 'fa-history' })
    out.push({ id: 'rekap', label: 'Rekap', icon: 'fa-chart-pie' }) // v.100d Fase 5
  }
  return out
})
const activeTab = ref(isPenguji.value ? 'antrian' : 'ajukan')

// ----- Tab Ajukan: state seleksi per santri -----
const sel = reactive({})
function targetOptionsFor(s) {
  return tesTargetOptions(s, sel[s.id]?.jenis, settings.value)
}
// v.1.1.9: jenis tak lagi dipilih pengguna — tiap lembaga punya SATU jenis
//   (PTPT selalu 'juz'; kenaikan kelasnya turun otomatis dari juz). Jenisnya tetap
//   disimpan di record supaya data lama & baru sebentuk.
function ensureSel(s) {
  if (!sel[s.id]) {
    const jenis = s.lembaga === 'PTPT' ? 'juz' : tesJenisOptions(s.lembaga)[0]?.value || ''
    sel[s.id] = { checked: false, jenis, target: tesTargetDefault(s, jenis, settings.value) }
  }
  return sel[s.id]
}
function toggle(s) {
  const st = ensureSel(s)
  st.checked = !st.checked
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
    // v.1.1.9: baris glondongan yang tak lahir akan mengunci gerbang PJ selamanya —
    //   jangan biarkan senyap seperti dulu (console.warn saja).
    if (res.glondonganGagal) msg += `, ${res.glondonganGagal} baris glondongan GAGAL dibuat`
    res.fail || res.glondonganGagal ? toast.warning(msg) : toast.success(msg)
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
  const ok = await confirmDlg({
    title: 'Batalkan ajuan?',
    message: `Batalkan ajuan tes ${a.nama_cache}?`,
    confirmText: 'Batalkan',
    danger: true
  })
  if (!ok) return
  try {
    await batalAjuan(a.id)
    toast.success('Ajuan dibatalkan.')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

// ----- Tab Antrian: putuskan hasil -----
const catatan = reactive({})
const busyId = ref(null)
// v.1.2.5 (Kyai): tanggal lulus/naik per-kartu (default hari ini, waktu LOKAL).
//   Dipakai HANYA saat LULUS (naik) — Belum Lulus/Tolak tetap tercatat waktu sekarang.
//   Menyetir cap kartu kenaikan, masa tempuh juz, tgl_hasil, dan PERIODE RAPOR.
//   Pola getter/setter selaras getNilai/setNilai supaya tak perlu pra-inisialisasi.
const tglHasil = reactive({})
function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`
}
function getTgl(id) {
  return tglHasil[id] || todayStr()
}
function setTgl(id, v) {
  tglHasil[id] = v || todayStr()
}
// v.100d: nilai aspek per ajuan (skala 0–90) — penguji isi saat menguji.
const nilai = reactive({})
const MAX_NILAI = TES_NILAI_MAX
function aspekGroupsFor(a) {
  return tesAspekGroups({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal })
}
function getNilai(id, key) {
  return nilai[id]?.[key] ?? ''
}
function setNilai(id, key, val) {
  if (!nilai[id]) nilai[id] = {}
  nilai[id][key] = val
}
function collectNilai(a) {
  const out = {}
  for (const asp of tesAspekFlat({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal })) {
    const v = clampNilaiTes(getNilai(a.id, asp.key))
    if (v !== null) out[asp.key] = v
  }
  return out
}
function nilaiLabelFor(a, key) {
  const asp = tesAspekFlat({ lembaga: a.lembaga, kelas: a.kelas_asal, juz: a.juz_asal }).find(
    (x) => x.key === key
  )
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
const naikForm = reactive({
  lembaga: '',
  kelas: '',
  juz: '',
  khotam_ke: '',
  guru: '',
  pj_ptpt: '',
  pindah: false // v.1.2.2: tujuannya lembaga BERIKUTNYA (bukan naik di lembaga sendiri)
})
const naikBusy = ref(false)
const KHOTAM_ROMAWI = ['I', 'II', 'III', 'IV', 'V'] // cadangan bila kartu belum punya item

// v.1.2.2 (Kyai 22 Jul): daftar jenjang DIBACA dari master/lembaga — di sanalah jenjang
//   sungguhan tertulis ('Level ½ Juz' … 'Level 3 Juz', PTPT '1'..'6'). Daftar hardcoded
//   lama sudah tak cocok dengan data, itulah sebabnya dropdown ini tampil KOSONG.
//   utils/jenjangQiraati tetap menyimpan daftar lama sebagai cadangan.
function canonKelasOptions(lembaga) {
  return jenjangLembaga(lembaga, lembagaRaw.value)
}
// Pilihan khotam mengikuti kartu kenaikan jenjang terpilih (Level 3 Juz → I..XI);
// dulu dipatok I..V sehingga khotam di atasnya tak pernah bisa dipilih.
const khotamOptions = computed(() => {
  const items = itemJenjang(naikForm.lembaga, naikForm.kelas, {
    lembagaList: lembagaRaw.value,
    settings: settings.value
  })
  return items.length ? items : KHOTAM_ROMAWI
})
// Kandidat PJ PTPT — dipakai saat santri MASUK PTPT dari lembaga sebelumnya.
const pjPtptOptions = computed(() =>
  guruAktifSaja(guruRaw.value)
    .filter((g) => isPjLembaga(g, 'PTPT'))
    .map((g) => g.nama)
    .filter(Boolean)
)
// Pilihan lembaga tujuan = rantai qiraati yang memang ada di Master Data. Ditampilkan
// walau tak pindah, supaya Kepala/PJ bisa mengoreksi tebakan sistem.
const lembagaTujuanOptions = computed(() => {
  const ada = new Set(
    (lembagaRaw.value || []).map((l) => String(l?.lembaga || l?.nama || '').trim()).filter(Boolean)
  )
  const out = RANTAI_QIRAATI.filter((l) => ada.has(l))
  const asal = String(lulusFor.value?.lembaga || '').trim()
  if (asal && !out.includes(asal)) out.unshift(asal)
  return out
})
// Ganti lembaga tujuan manual → kelas/juz/khotam ikut disetel ulang ke lembaga itu.
function onLembagaTujuanChange() {
  const opts = canonKelasOptions(naikForm.lembaga)
  if (!opts.includes(naikForm.kelas)) naikForm.kelas = opts[0] || ''
  naikForm.juz = naikForm.lembaga === 'PTPT' ? '1' : ''
  naikForm.khotam_ke = ''
  naikForm.pindah = naikForm.lembaga !== (lulusFor.value?.lembaga || '')
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
  // v.1.2.0: buang guru NONAKTIF — dulu hanya lembaga yang disaring.
  return guruAktifSaja(guruRaw.value)
    .filter((g) => g.lembaga === lembaga || g.lembaga_sekolah === lembaga)
    .map((g) => g.nama)
    .filter(Boolean)
}
// Tebakan tujuan dari target tes (Kepala bisa koreksi via dropdown).
function prefillNaik(a) {
  const ctx = { lembagaList: lembagaRaw.value, settings: settings.value }

  // v.1.2.2 (Kyai 22 Jul): santri yang MENAMATKAN lembaganya — jenjang terakhir DAN
  //   item terakhir jenjang itu (mis. Pra PTPT 'Level 3 Juz' + 'Khotam XI') — tujuannya
  //   lembaga BERIKUTNYA (TPQ → Pra PTPT → PTPT → PPPH), bukan jenjang di lembaga lama.
  const naik = tujuanNaikLembaga(a, ctx)
  if (naik) {
    const items = itemJenjang(naik.lembaga, naik.kelas, ctx)
    return {
      lembaga: naik.lembaga,
      kelas: naik.kelas,
      juz: naik.lembaga === 'PTPT' ? '1' : '',
      khotam: naik.lembaga === 'Pra PTPT' ? items[0] || '' : '',
      pindah: true
    }
  }

  // Naik di dalam lembaga sendiri — perilaku lama, tapi kelasnya diresolusi ke daftar
  //   jenjang NYATA (master) supaya nilai hasil tebakan benar-benar ada di dropdown.
  const lmb = a.lembaga
  const opts = canonKelasOptions(lmb)
  const pilih = (v) => {
    const i = indexJenjang(opts, v)
    return i >= 0 ? opts[i] : ''
  }
  const t = String(a.target || '')
  let kelas = '',
    juz = '',
    khotam = ''
  if (lmb === 'PTPT') {
    if (a.jenis === 'juz') {
      const m = t.match(/(\d+)/)
      juz = m ? m[1] : ''
      if (juz) kelas = opts[Math.ceil(Number(juz) / 5) - 1] || ''
    } else {
      kelas = pilih(t) || t
      const m = String(kelas).match(/(\d+)/)
      if (m) juz = String((Number(m[1]) - 1) * 5 + 1)
    }
  } else if (lmb === 'Pra PTPT') {
    khotam = t
      .replace(/khotam\s*/i, '')
      .trim()
      .toUpperCase()
    kelas = pilih(a.kelas_asal) || a.kelas_asal || ''
  } else if (lmb === 'PPPH' || lmb === 'P3H') {
    kelas = pilih(t) || t
  } else {
    const tu = t.toUpperCase()
    if (/^\d[A-C]$/i.test(t)) kelas = pilih(`Jilid ${tu}`) || `Jilid ${tu}`
    else if (tu.includes('IMTAS')) kelas = pilih('KPI') || 'KPI'
    else if (tu.includes('KHOTAM')) kelas = pilih('Persiapan Khotaman') || 'Persiapan Khotaman'
    else kelas = pilih(t) || t
  }
  return { lembaga: lmb, kelas, juz, khotam, pindah: false }
}
async function openLulus(a) {
  lulusFor.value = a
  lulusSantri.value = null
  naikForm.lembaga = a.lembaga || ''
  naikForm.kelas = ''
  naikForm.juz = ''
  naikForm.khotam_ke = ''
  naikForm.guru = ''
  naikForm.pj_ptpt = ''
  naikForm.pindah = false
  try {
    const s = await getOne('santri', String(a.santri_id))
    lulusSantri.value = s
    const pre = prefillNaik(a)
    naikForm.lembaga = pre.lembaga || a.lembaga || ''
    naikForm.kelas = pre.kelas
    naikForm.juz = pre.juz
    naikForm.khotam_ke = pre.khotam
    naikForm.pindah = !!pre.pindah
    // Pindah lembaga = pindah kelas & guru; jangan bawa guru lama sebagai tebakan.
    naikForm.guru = pre.pindah
      ? ''
      : s
        ? Array.isArray(s.guru)
          ? s.guru[0] || ''
          : s.guru || ''
        : ''
    naikForm.pj_ptpt = String(s?.pj_ptpt || '').trim()
  } catch (e) {
    toast.error('Gagal memuat data santri: ' + (e.message || e))
  }
}
function closeLulus() {
  lulusFor.value = null
  lulusSantri.value = null
}
async function submitLulus() {
  const a = lulusFor.value
  const s = lulusSantri.value
  if (!a) return
  // GERBANG: jangan tulis kenaikan bila glondongan/berjalan belum selesai (cegah race).
  if (gerbangFor(a).terkunci) {
    toast.error('Glondongan/berjalan belum selesai disimak — belum bisa meluluskan.')
    return
  }
  if (!s) {
    toast.error('Data santri belum termuat.')
    return
  }
  if (!naikForm.kelas) {
    toast.warning('Pilih kelas tujuan dulu.')
    return
  }
  naikBusy.value = true
  try {
    // v.1.2.5: tanggal lulus/naik pilihan (default hari ini). Satu sumber untuk cap
    //   kartu kenaikan, tgl_hasil, dan periode rapor — supaya tak saling geser.
    const tgl = getTgl(a.id)
    const opts = {
      lembaga: naikForm.lembaga || a.lembaga || '',
      kelas: naikForm.kelas,
      juz: naikForm.lembaga === 'PTPT' ? naikForm.juz : '',
      khotam_ke: naikForm.lembaga === 'Pra PTPT' ? naikForm.khotam_ke : '',
      guru: naikForm.guru || '',
      // v.1.2.2: label PJ hanya relevan di PTPT (santri yang baru masuk PTPT).
      pj_ptpt: naikForm.lembaga === 'PTPT' ? naikForm.pj_ptpt || '' : '',
      kelas_sekolah: s.kelas_sekolah || '',
      catatan: catatan[a.id] || '',
      tanggal: tgl // v.1.2.5: cap kartu kenaikan & riwayat ikut tanggal ini
    }
    const { payload, rkEntry } = buildKenaikanQiraatiPayload(s, opts, {
      settings: settings.value,
      // v.1.2.2: dulu selalu [] — akibatnya kartu kenaikan Pra PTPT tak pernah tercap
      //   (label master 'Level 3 Juz' ≠ label kartu 'Level 5 (3 Juz)').
      lembagaList: lembagaRaw.value
    })
    await writeKenaikan(s, payload, rkEntry)
    const nilaiObj = collectNilai(a)
    await putuskan(a.id, 'lulus', catatan[a.id] || '', nilaiObj, tgl)
    // v.100d Fase 3: nilai tes auto → rapor (posisi yang DISELESAIKAN; prefill editable).
    //   v.1.2.5: periode rapor MENGIKUTI tanggal lulus pilihan — kalau di-mundur ke
    //   semester lalu, nilai mendarat di rapor semester itu (bukan yang berjalan).
    try {
      const feed = buildTesRaporFeed(
        { lembaga: a.lembaga, kelas_asal: a.kelas_asal, juz_asal: a.juz_asal, target: a.target },
        nilaiObj
      )
      if (feed) {
        const { tahunAjaran, semester, periodKey } = currentRaporPeriode(
          new Date(`${tgl}T00:00:00`)
        )
        const lmbKey = s.lembaga || a.lembaga || ''
        const rid = `rapor_${s.id}_${lmbKey}_${periodKey}`
        await mergeOne('rapor_semester', rid, {
          santri_id: String(s.id),
          santri_nama: s.nama || a.nama_cache || '',
          lembaga: lmbKey,
          tahunAjaran,
          semester,
          data_nilai: feed,
          updated_at: new Date().toISOString()
        })
      }
    } catch (e2) {
      console.warn('[tes→rapor] gagal feed nilai ke rapor:', e2?.message || e2)
    }
    delete catatan[a.id]
    delete nilai[a.id]
    delete tglHasil[a.id] // v.1.2.5
    toast.success(
      naikForm.pindah
        ? `${a.nama_cache} LULUS & pindah ke ${naikForm.lembaga} — ${naikForm.kelas}.`
        : `${a.nama_cache} LULUS & dinaikkan ke ${naikForm.kelas}.`
    )
    closeLulus()
  } catch (e) {
    toast.error('Gagal proses lulus: ' + (e.message || e))
  } finally {
    naikBusy.value = false
  }
}

// ----- helpers UI -----
// v.1.2.3: tampilkan kelas Pra PTPT dengan nama master ('Level ½ Juz'..'Level 3 Juz').
//   Data lama yang tersimpan bare ('Level 5') dipetakan lewat INDEX ke label master;
//   lembaga lain / label yang sudah benar dibiarkan apa adanya.
function labelKelasPra(lembaga, kelas) {
  const lmb = String(lembaga || '').trim()
  const k = String(kelas || '').trim()
  if (lmb !== 'Pra PTPT' || !k) return k
  const list = jenjangLembaga('Pra PTPT', lembagaRaw.value)
  if (!list.length) return k
  const i = indexJenjang(list, k)
  if (i >= 0) return list[i]
  const m = k.match(/(\d+)/)
  return (m && list[parseInt(m[1], 10) - 1]) || k
}
function statusLabel(s) {
  return STATUS_LABEL[s] || s
}
function statusCls(s) {
  if (s === 'lulus') return 'bg-emerald-100 text-emerald-700'
  if (s === 'tidak_lulus') return 'bg-amber-100 text-amber-700'
  if (s === 'ditolak') return 'bg-rose-100 text-rose-700'
  // v.1.2.5: dibatalkan pengaju = netral (beda dari ditolak penguji yang merah).
  if (s === 'dibatalkan') return 'bg-slate-200 text-slate-500'
  return 'bg-slate-100 text-slate-600'
}
function fmtTgl(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '-'
}
</script>
