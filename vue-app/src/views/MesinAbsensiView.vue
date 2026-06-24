<template>
  <div class="rb-page">
    <!-- Electron-only: di web/HP route ini sudah di-redirect router guard (electronOnly).
         v-if isElectron = lapis kedua supaya tak ada UI yang ter-render di luar desktop. -->
    <template v-if="isElectron">
      <div class="rb-section-title">
        <span class="ic"><RibbonIcon name="clock" :size="22" /></span>
        <span class="st">Mesin Absensi</span>
        <span class="note">Sinkron scan sidik jari (Fingerspot) → absensi guru</span>
      </div>

      <!-- Kartu pengaturan -->
      <div class="rb-card fp-card">
        <div class="rb-card-h"><h3>Pengaturan</h3></div>

        <label class="fp-field">
          <span class="fp-lab">
            <RibbonIcon name="folder" :size="15" /> Folder Fingerspot Personnel
          </span>
          <input
            v-model="pathInput"
            type="text"
            class="fp-input"
            :placeholder="DEFAULT_PATH"
            spellcheck="false"
            autocapitalize="none"
            autocorrect="off"
            @change="savePath"
            @keyup.enter="savePath"
          />
          <span class="fp-hint">
            Kosongkan untuk pakai lokasi default: <code>{{ DEFAULT_PATH }}</code>
          </span>
        </label>

        <div class="fp-field fp-row">
          <div class="fp-row-l">
            <span class="fp-lab"><RibbonIcon name="refresh" :size="15" /> Sinkron otomatis</span>
            <span class="fp-hint">PC station yang selalu menyala — sinkron berkala di latar.</span>
          </div>
          <button
            type="button"
            class="fp-switch"
            role="switch"
            :aria-checked="String(autoSyncOn)"
            :data-on="autoSyncOn"
            @click="autoSyncOn = !autoSyncOn"
          >
            <span class="sw"></span>
          </button>
        </div>

        <label class="fp-field fp-row" :class="{ 'fp-dim': !autoSyncOn }">
          <div class="fp-row-l">
            <span class="fp-lab"><RibbonIcon name="clock" :size="15" /> Interval</span>
            <span class="fp-hint">Jeda antar sinkron otomatis (menit).</span>
          </div>
          <span class="fp-interval">
            <input
              v-model.number="interval"
              type="number"
              class="fp-input fp-num"
              :min="store.MIN_INTERVAL"
              step="5"
              :disabled="!autoSyncOn"
            />
            <em>menit</em>
          </span>
        </label>
      </div>

      <!-- Kartu sinkron + status -->
      <div class="rb-card fp-card">
        <div class="rb-card-h">
          <h3>Sinkronisasi</h3>
          <button type="button" class="fp-btn-primary" :disabled="store.running" @click="syncNow">
            <RibbonIcon name="refresh" :size="16" :class="{ spin: store.running }" />
            {{ store.running ? 'Menyinkron…' : 'Sinkron sekarang' }}
          </button>
        </div>

        <!-- Status terakhir -->
        <div class="fp-status">
          <span class="fp-lab">Terakhir disinkron</span>
          <span v-if="store.lastSyncAt" class="fp-status-v">
            {{ fmtWaktu(store.lastSyncAt) }}
            <em class="fp-trig">({{ store.lastTrigger === 'auto' ? 'otomatis' : 'manual' }})</em>
          </span>
          <span v-else class="fp-status-v fp-muted">Belum pernah</span>
        </div>

        <!-- Hasil error -->
        <div v-if="store.lastError" class="fp-result fp-err">
          <RibbonIcon name="info" :size="16" />
          <span>{{ store.lastError }}</span>
        </div>

        <!-- Ringkasan sukses -->
        <template v-else-if="store.lastResult">
          <div class="fp-summary">
            <div class="fp-stat fp-ok">
              <b>{{ store.lastResult.written }}</b>
              <span>ditulis</span>
            </div>
            <div class="fp-stat">
              <b>{{ store.lastResult.scan }}</b>
              <span>scan dibaca</span>
            </div>
            <div class="fp-stat">
              <b>{{ store.lastResult.skipIzin }}</b>
              <span>lewati izin/sakit</span>
            </div>
            <div class="fp-stat">
              <b>{{ store.lastResult.skipSame }}</b>
              <span>identik (skip)</span>
            </div>
            <div class="fp-stat">
              <b>{{ store.lastResult.luar }}</b>
              <span>luar jam shift</span>
            </div>
            <div class="fp-stat" :class="{ 'fp-warn': (store.lastResult.takKenal || []).length }">
              <b>{{ (store.lastResult.takKenal || []).length }}</b>
              <span>PIN tak dikenal</span>
            </div>
          </div>

          <p v-if="(store.lastResult.takKenal || []).length" class="fp-takkenal">
            <RibbonIcon name="info" :size="14" />
            PIN belum tertaut id_fingerprint guru:
            <code>{{ store.lastResult.takKenal.join(', ') }}</code>
          </p>

          <!-- Rincian baris yang ditulis -->
          <div v-if="(store.lastResult.rows || []).length" class="fp-table-wrap">
            <table class="rb-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Tanggal</th>
                  <th>Shift</th>
                  <th>Jam</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, i) in store.lastResult.rows" :key="i">
                  <td>{{ r.nama }}</td>
                  <td>{{ r.tanggal }}</td>
                  <td>{{ r.shift }}</td>
                  <td>{{ r.jam }}</td>
                  <td>
                    <span class="rb-pill" :class="r.status === 'terlambat' ? 'keluar' : 'masuk'">
                      {{ r.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <p class="fp-foot">
          Sumber scan: MySQL Fingerspot Personnel (<code>att_log</code>). Mesin → Personnel
          (auto-download) → Ammu. Setelan IP/jam mesin diatur di aplikasi Personnel.
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
// MesinAbsensiView (Fase 3) — UI sinkron fingerprint untuk Ammu Desktop.
// Tipis di atas store fingerprint (config + status + scheduler). Tombol "Sinkron sekarang"
// memicu satu siklus manual; toggle auto-sync mengaktifkan scheduler di store (hidup di luar
// view ini). Electron-only: route di-gate router guard (electronOnly) + v-if isElectron.
import { ref, computed } from 'vue'
import RibbonIcon from '@/components/ribbon/RibbonIcon.vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { useFingerprintStore } from '@/stores/fingerprint'
import { useUiStore } from '@/stores/ui'

const DEFAULT_PATH = 'C:\\Program Files (x86)\\Fingerspot Personnel'

const { isElectron } = useDesktopShell()
const store = useFingerprintStore()
const { toast } = useUiStore()

// Path: edit lokal, commit saat blur/enter (jarang diubah).
const pathInput = ref(store.personnelDir)
function savePath() {
  store.setPersonnelDir(pathInput.value)
}

// Toggle & interval: efek langsung ke scheduler lewat setter store.
const autoSyncOn = computed({
  get: () => store.autoSync,
  set: (v) => store.setAutoSync(v)
})
const interval = computed({
  get: () => store.intervalMin,
  set: (v) => store.setIntervalMin(v)
})

async function syncNow() {
  if (!store.available()) {
    toast.error('Sinkron mesin hanya tersedia di Ammu Desktop.')
    return
  }
  const res = await store.runNow('manual')
  if (store.lastError) {
    toast.error('Sinkron gagal: ' + store.lastError)
  } else if (res) {
    const tk = (res.takKenal || []).length
    toast.success(
      `Sinkron selesai — ${res.written} ditulis dari ${res.scan} scan` +
        (tk ? ` · ${tk} PIN tak dikenal` : '')
    )
  }
}

function fmtWaktu(iso) {
  try {
    return new Date(iso).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return iso
  }
}
</script>

<style scoped>
.fp-card {
  max-width: 720px;
  margin-bottom: 16px;
}
.fp-field {
  display: block;
  margin-bottom: 16px;
}
.fp-field:last-child {
  margin-bottom: 0;
}
.fp-lab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--rb-text);
}
.fp-hint {
  display: block;
  font-size: 11.5px;
  color: var(--rb-text-dim);
  margin-top: 4px;
}
.fp-hint code,
.fp-takkenal code,
.fp-foot code {
  font-size: 11px;
  background: var(--rb-hover);
  padding: 1px 5px;
  border-radius: 4px;
}
.fp-input {
  margin-top: 6px;
  width: 100%;
  height: 34px;
  padding: 0 11px;
  border: 1px solid var(--rb-card-border);
  border-radius: 7px;
  background: var(--rb-card);
  color: var(--rb-text);
  font-size: 13px;
  font-family: inherit;
}
.fp-input:focus {
  outline: none;
  border-color: var(--accent);
}
.fp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.fp-row-l {
  display: flex;
  flex-direction: column;
}
.fp-row-l .fp-hint {
  margin-top: 2px;
}
.fp-dim {
  opacity: 0.55;
}
.fp-interval {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: none;
}
.fp-interval em {
  font-style: normal;
  font-size: 12px;
  color: var(--rb-text-dim);
}
.fp-num {
  width: 78px;
  margin-top: 0;
  text-align: center;
}
/* switch */
.fp-switch {
  flex: none;
  width: 42px;
  height: 23px;
  border: 0;
  padding: 0;
  border-radius: 12px;
  background: var(--rb-card-border);
  cursor: pointer;
  position: relative;
  transition: background 0.15s;
}
.fp-switch .sw {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: left 0.15s;
}
.fp-switch[data-on='true'] {
  background: var(--accent);
}
.fp-switch[data-on='true'] .sw {
  left: 22px;
}
/* primary action */
.fp-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 14px;
  border: 0;
  border-radius: 7px;
  background: var(--accent);
  color: #fff;
  font-size: 12.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}
.fp-btn-primary:disabled {
  opacity: 0.6;
  cursor: default;
}
.spin {
  animation: fp-spin 0.9s linear infinite;
}
@keyframes fp-spin {
  to {
    transform: rotate(360deg);
  }
}
/* status */
.fp-status {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rb-divider);
}
.fp-status-v {
  font-size: 13px;
  font-weight: 600;
  color: var(--rb-text);
}
.fp-trig {
  font-style: normal;
  font-weight: 400;
  font-size: 11.5px;
  color: var(--rb-text-dim);
}
.fp-muted {
  font-weight: 400;
  color: var(--rb-text-dim);
}
/* summary stats */
.fp-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 14px;
}
.fp-stat {
  background: var(--rb-hover);
  border-radius: 9px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.fp-stat b {
  font-size: 20px;
  font-weight: 700;
  color: var(--rb-text);
  line-height: 1;
}
.fp-stat span {
  font-size: 11px;
  color: var(--rb-text-dim);
}
.fp-stat.fp-ok b {
  color: #15803d;
}
.fp-stat.fp-warn b {
  color: #b45309;
}
.fp-takkenal {
  margin-top: 10px;
  font-size: 12px;
  color: var(--rb-text-dim);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.fp-result {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 11px 13px;
  border-radius: 9px;
  font-size: 12.5px;
}
.fp-err {
  background: color-mix(in srgb, #dc2626 12%, transparent);
  color: #b91c1c;
}
.fp-table-wrap {
  margin-top: 14px;
  max-height: 320px;
  overflow: auto;
}
.fp-foot {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--rb-divider);
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--rb-text-dim);
}
</style>
