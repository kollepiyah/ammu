// vue-app/src/composables/useRapor.js
// State + actions untuk Input Nilai Rapor. Port full-parity dari legacy:
//   - _raporState global   (public/index.html line 35082)
//   - bukaFormRapor        (line 35322)
//   - simpanRaporSantri    (line 35645)
//   - hapusRaporSantri     (line 35775)
//
// Doc ID format identik legacy:
//   `rapor_${santriId}_${lembaga}_${periodKey}`  (periodKey = `${ta}_${sm}`.replace(/[^a-zA-Z0-9_]/g, '_'))
//
// Collection: `rapor_semester`

import { ref } from 'vue'
import { doc, getDoc, deleteDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { safeSaveDoc, backupSebelumHapus } from '@/services/firestoreSafe'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { getSchemaLembaga } from '@/utils/raporSchema'
import {
  recomputeAllAutoPredikat,
  computeRataRataRapor,
  autoFillTanggalKenaikan
} from '@/utils/raporCompute'

/**
 * Build periodKey legacy-compatible: ${ta}_${sm} slugified.
 */
export function buildPeriodKey(ta, sm) {
  return `${ta}_${sm}`.replace(/[^a-zA-Z0-9_]/g, '_')
}

/**
 * Build raporId legacy-compatible: rapor_<sId>_<lembaga>_<periodKey>.
 * Lembaga DIPERTAHANKAN dengan space (match legacy, Firestore accept).
 */
export function buildRaporId(santriId, lembaga, ta, sm) {
  return `rapor_${santriId}_${lembaga}_${buildPeriodKey(ta, sm)}`
}

export function useRapor() {
  const toast = useToast()
  const confirm = useConfirm()
  const auth = useAuthStore()
  const settingsStore = useSettingsStore()

  // Internal reactive state — match legacy _raporState shape
  const raporState = ref({
    lembaga: '',
    santriId: null,
    data: {}, // data_nilai keyed
    absensi: { sakit: 0, izin: 0, alpa: 0 }, // legacy spelling: alpa (bukan alfa)
    kepribadian: { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' },
    catatan: '',
    _lastUpdatedAt: null // Timestamp untuk OCC
  })

  const loading = ref(false)
  const saving = ref(false)
  const deleting = ref(false)

  /**
   * Load atau init form rapor untuk santri+lembaga+periode tertentu.
   * Match legacy bukaFormRapor (line 35322).
   */
  async function loadRaporSantri(santri, lembaga, ta, sm) {
    if (!santri || !lembaga) return
    loading.value = true
    raporState.value.santriId = santri.id
    raporState.value.lembaga = lembaga
    const raporId = buildRaporId(santri.id, lembaga, ta, sm)
    try {
      const snap = await getDoc(doc(db, 'rapor_semester', raporId))
      if (snap.exists()) {
        const d = snap.data()
        raporState.value.data = d.data_nilai ? JSON.parse(JSON.stringify(d.data_nilai)) : {}
        raporState.value.absensi = d.absensi || { sakit: 0, izin: 0, alpa: 0 }
        raporState.value.kepribadian = d.kepribadian || {
          kelakuan: 'Baik',
          kerajinan: 'Baik',
          kebersihan: 'Baik'
        }
        raporState.value.catatan = d.catatan || ''
        raporState.value._lastUpdatedAt = d.updatedAt instanceof Timestamp ? d.updatedAt : null
      } else {
        raporState.value.data = {}
        raporState.value.absensi = { sakit: 0, izin: 0, alpa: 0 }
        raporState.value.kepribadian = { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' }
        raporState.value.catatan = ''
        raporState.value._lastUpdatedAt = null
      }
      // Auto-fill tgl khotam dari riwayat (kalau belum diisi).
      try {
        const schema = getSchemaLembaga(lembaga, settingsStore.settings)
        raporState.value.data = autoFillTanggalKenaikan(santri, schema, raporState.value.data)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[autoFillTanggalKenaikan]', e?.message)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[loadRaporSantri]', e?.message)
      toast.error('Gagal memuat rapor: ' + (e?.message || e))
    } finally {
      loading.value = false
    }
  }

  /**
   * Recompute predikat untuk semua field type=auto_predikat di schema.
   * Dipanggil saat user ubah nilai (live update di UI) atau sebelum save.
   */
  function recomputePredikat() {
    const schema = getSchemaLembaga(raporState.value.lembaga, settingsStore.settings)
    raporState.value.data = recomputeAllAutoPredikat(
      schema,
      raporState.value.data,
      settingsStore.settings
    )
  }

  /**
   * Simpan rapor santri. Match legacy simpanRaporSantri (line 35645).
   * Pakai safeSaveDoc (OCC). Kalau conflict → tanya user overwrite/batal.
   */
  async function simpanRapor(santri, ta, sm) {
    if (!santri || !raporState.value.lembaga) {
      toast.warning('Lembaga atau santri belum dipilih.')
      return false
    }
    if (saving.value) return false
    saving.value = true
    try {
      // Recompute predikat sebelum save (match legacy line 35668–35705)
      recomputePredikat()

      const raporId = buildRaporId(santri.id, raporState.value.lembaga, ta, sm)
      const rataRata = computeRataRataRapor(raporState.value.data)
      const payload = {
        id: raporId,
        santri_id: santri.id,
        santri_nama: santri.nama,
        lembaga: raporState.value.lembaga,
        kelas: santri.kelas || '',
        guru_kelas: santri.guru || '',
        periode: { tahun_ajaran: ta, semester: sm },
        data_nilai: raporState.value.data,
        rata_rata: rataRata,
        absensi: raporState.value.absensi,
        kepribadian: raporState.value.kepribadian,
        catatan: raporState.value.catatan,
        updated_at: new Date().toISOString(),
        edited_by: String(auth.sesiAktif?.id || 'admin')
      }

      try {
        await safeSaveDoc('rapor_semester', raporId, payload, {
          merge: false,
          expectedUpdatedAt: raporState.value._lastUpdatedAt,
          label: 'Simpan rapor'
        })
      } catch (occErr) {
        if (occErr && occErr.code === 'occ/conflict') {
          const ok = await confirm({
            title: 'Data sudah diubah user lain',
            message:
              'Saat Anda mengisi form, data ini sudah diubah oleh user lain.\n\n' +
              'Tetap simpan akan menimpa versi user lain. Batal supaya Anda bisa refresh dulu.',
            confirmText: 'Tetap Simpan (Overwrite)',
            cancelText: 'Batal',
            danger: true
          })
          if (!ok) {
            toast.info('Penyimpanan dibatalkan.')
            return false
          }
          await safeSaveDoc('rapor_semester', raporId, payload, {
            merge: false,
            expectedUpdatedAt: null,
            label: 'Overwrite rapor'
          })
        } else {
          throw occErr
        }
      }

      // Refresh local Timestamp marker (untuk OCC subsequent save)
      try {
        const fresh = await getDoc(doc(db, 'rapor_semester', raporId))
        if (fresh.exists() && fresh.data().updatedAt instanceof Timestamp) {
          raporState.value._lastUpdatedAt = fresh.data().updatedAt
        }
      } catch (_e) {}

      toast.success('Rapor ' + santri.nama + ' tersimpan.')
      return true
    } catch (e) {
      toast.error('Gagal simpan: ' + (e?.message || e))
      return false
    } finally {
      saving.value = false
    }
  }

  /**
   * Hapus rapor santri periode aktif. Match legacy hapusRaporSantri (line 35775).
   * Backup ke audit_log sebelum delete.
   */
  async function hapusRapor(santri, ta, sm) {
    if (!santri || !raporState.value.lembaga) {
      toast.warning('Lembaga atau santri belum dipilih.')
      return false
    }
    if (!ta || !sm) {
      toast.warning('Periode belum lengkap.')
      return false
    }
    if (deleting.value) return false

    const raporId = buildRaporId(santri.id, raporState.value.lembaga, ta, sm)
    let existing = null
    try {
      const snap = await getDoc(doc(db, 'rapor_semester', raporId))
      if (snap.exists()) existing = snap.data()
    } catch (_e) {}

    if (!existing) {
      toast.info(`Belum ada data rapor ${santri.nama} untuk periode ${ta} - ${sm}.`)
      return false
    }

    const ok = await confirm({
      title: 'Hapus Data Rapor?',
      message:
        `Hapus rapor ${santri.nama}\n` +
        `Periode: ${ta} - ${sm}\n` +
        `Lembaga: ${raporState.value.lembaga}\n\n` +
        `Tindakan ini tidak bisa dibatalkan!`,
      confirmText: 'Ya, Hapus',
      cancelText: 'Batal',
      danger: true
    })
    if (!ok) return false

    deleting.value = true
    try {
      await backupSebelumHapus(
        'rapor_semester',
        raporId,
        existing,
        `Hapus rapor ${santri.nama} periode ${ta} ${sm}`,
        auth.sesiAktif
      )
      await deleteDoc(doc(db, 'rapor_semester', raporId))
      // Reset state form
      raporState.value.data = {}
      raporState.value.absensi = { sakit: 0, izin: 0, alpa: 0 }
      raporState.value.kepribadian = { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' }
      raporState.value.catatan = ''
      raporState.value._lastUpdatedAt = null
      toast.success('Data rapor dihapus.')
      return true
    } catch (e) {
      toast.error('Gagal hapus: ' + (e?.message || e))
      return false
    } finally {
      deleting.value = false
    }
  }

  return {
    raporState,
    loading,
    saving,
    deleting,
    loadRaporSantri,
    simpanRapor,
    hapusRapor,
    recomputePredikat,
    buildRaporId,
    buildPeriodKey
  }
}
