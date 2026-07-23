// v.100: useTesKenaikan — koleksi `tes_kenaikan` (real-time) + scope per-role + actions.
//   Pengaju  = guru ngaji (santri ampuannya). Penguji = Kepala/PJ lembaga (scoped) + admin.
//   LULUS = tandai "siap naik" SAJA (tak ubah kelas santri) — kenaikan aktual tetap manual di
//   NaikKelasView (kyai: santri bisa pindah kelas). Notif HP menyusul (Fase B, functions).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, addOne, updateOne, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin, isAdminBiasa, isAdminKeuangan, isKepalaLembaga } from '@/utils/roleScope'
import { lembagaScopeMatches } from '@/composables/useLembaga'
// v.111: rumus pembagian glondongan PTPT (spawn baris tes_glondongan saat ajukan juz)
import {
  splitGlondongan,
  testedJuz,
  periodeBulan,
  gerbangGlondongan,
  buatScopePj,
  PTPT_LEMBAGA
} from '@/utils/glondongan'
import { useSantri } from '@/composables/useSantri'

export function useTesKenaikan() {
  const auth = useAuthStore()
  const ajuanRaw = ref([])
  const glondonganRaw = ref([]) // v.111.x: baris tes_glondongan (utk gerbang PJ)
  const loaded = ref(false)
  let unsub = null
  let unsubGl = null

  const sesi = computed(() => auth.sesiAktif || {})
  const myId = computed(() => String(sesi.value.id != null ? sesi.value.id : ''))
  const myNama = computed(() => String(sesi.value.nama || sesi.value.guru || '').trim())
  const myLembaga = computed(() => sesi.value.lembaga || '')

  const isAdmin = computed(
    () => isSuperAdmin(sesi.value) || isAdminBiasa(sesi.value) || isAdminKeuangan(sesi.value)
  )
  const isKepala = computed(() => isKepalaLembaga(sesi.value))
  // Penguji = kepala/PJ (scoped lembaganya) atau admin (semua).
  const isPenguji = computed(() => isAdmin.value || isKepala.value)

  // v.1.1.9: scope PJ PTPT — "PJ hanya bisa melihat santri ampuannya" (Kyai 21 Jul
  //   2026). PJ PTPT kini >1 orang. Sumber santri = pinia collections store, jadi
  //   TIDAK menambah langganan.
  const { santriRaw } = useSantri()
  const isAmpuanSaya = computed(() => buatScopePj(santriRaw.value, myNama.value))

  // Apakah ajuan masuk scope penguji ini? (admin = semua; kepala = se-lembaganya)
  function inScope(a) {
    if (isAdmin.value) return true
    if (!isKepala.value) return false
    if (!lembagaScopeMatches(myLembaga.value, a.lembaga)) return false
    // Penyempitan KHUSUS PTPT: kepala/PJ PTPT hanya santri ampuannya. Kepala
    //   lembaga lain TIDAK berubah — mereka tetap lihat se-lembaganya.
    if (
      String(a.lembaga || '')
        .trim()
        .toUpperCase() === PTPT_LEMBAGA
    ) {
      return isAmpuanSaya.value(a.santri_id)
    }
    return true
  }

  // Ajuan PTPT yang DISEMBUNYIKAN oleh scope PJ di atas. Dipakai UI untuk memberi
  //   tahu "ada N ajuan di luar ampuan Anda" — tanpa ini, santri yang label
  //   `pj_ptpt`-nya belum diisi tampak HILANG begitu saja.
  const diluarAmpuan = computed(() => {
    if (isAdmin.value || !isKepala.value) return 0
    return ajuanRaw.value.filter(
      (a) =>
        String(a.lembaga || '')
          .trim()
          .toUpperCase() === PTPT_LEMBAGA &&
        lembagaScopeMatches(myLembaga.value, a.lembaga) &&
        !isAmpuanSaya.value(a.santri_id)
    ).length
  })

  const sortNewest = (arr) => [...arr].sort((a, b) => (b._ts || 0) - (a._ts || 0))

  // Guru: ajuan yang SAYA buat (semua status, terbaru dulu).
  const myAjuan = computed(() =>
    sortNewest(ajuanRaw.value.filter((a) => String(a.guru_id || '') === myId.value))
  )

  // Penguji: antrian = status 'diajukan' dalam scope.
  const antrian = computed(() =>
    sortNewest(ajuanRaw.value.filter((a) => a.status === 'diajukan' && inScope(a)))
  )

  // Penguji: riwayat = sudah ada hasil (bukan diajukan) dalam scope.
  const riwayat = computed(() =>
    sortNewest(ajuanRaw.value.filter((a) => a.status !== 'diajukan' && inScope(a)))
  )

  // Guard dobel: santri sudah punya ajuan 'diajukan' (belum diputus)?
  function hasOpenAjuan(santriId) {
    const sid = String(santriId)
    return ajuanRaw.value.some((a) => String(a.santri_id) === sid && a.status === 'diajukan')
  }

  // v.111.x: baris glondongan per ajuan_id (utk gerbang PJ).
  const glondonganByAjuan = computed(() => {
    const m = {}
    for (const r of glondonganRaw.value || []) {
      const k = String(r.ajuan_id || '')
      if (!k) continue
      ;(m[k] || (m[k] = [])).push(r)
    }
    return m
  })
  // Gerbang PJ: hanya PTPT jenis 'juz'. Lainnya tak pernah terkunci.
  //   terkunci = glondongan/berjalan belum 'selesai' ATAU guru kelas belum klik 'Siap Tes'.
  function gerbangFor(ajuan) {
    const kosong = {
      berlaku: false,
      terkunci: false,
      glondonganTerkunci: false,
      siapTes: true,
      pending: [],
      adaBarisHilang: false
    }
    if (!ajuan) return kosong
    const isPtptJuz =
      String(ajuan.lembaga || '')
        .trim()
        .toUpperCase() === 'PTPT' && (ajuan.jenis || '') === 'juz'
    if (!isPtptJuz) return kosong
    const g = gerbangGlondongan(ajuan.juz_asal, glondonganByAjuan.value[String(ajuan.id)] || [])
    const siapTes = !!ajuan.siap_tes
    return {
      ...g,
      berlaku: true,
      glondonganTerkunci: g.terkunci,
      siapTes,
      terkunci: g.terkunci || !siapTes
    }
  }
  // Guru kelas / pengaju: tandai santri SIAP dites PJ (setelah glondongan+berjalan selesai).
  async function setSiapTes(ajuanId, val = true) {
    await updateOne('tes_kenaikan', String(ajuanId), { siap_tes: !!val })
  }

  // Ajukan batch. items: [{ santri, jenis, target }]. guruList utk resolve kepala (push Fase B).
  //   Return { ok, fail, skipped, glondonganGagal, errors }.
  async function ajukanBatch(items, guruList = []) {
    const batchId = 'tes_' + Date.now()
    let ok = 0,
      fail = 0,
      skipped = 0,
      glondonganGagal = 0
    const errors = []
    for (const it of items || []) {
      const s = it.santri
      if (!s || !s.id) {
        skipped++
        continue
      }
      if (hasOpenAjuan(s.id)) {
        skipped++
        continue
      } // sudah ada ajuan terbuka
      // Resolve nama kepala/PJ lembaga ini (utk push notif Fase B) — best-effort.
      const kepala = (guruList || []).find((g) => {
        const j = `${g.jabatan || ''} ${g.jabatan_tambahan || ''}`.toLowerCase()
        const isKep = /(^|\s)(kepala|pj|pengasuh)(\s|$)/.test(j)
        return isKep && g.status !== 'Non-Aktif' && lembagaScopeMatches(g.lembaga, s.lembaga)
      })
      const now = new Date()
      try {
        const ajuanId = await addOne('tes_kenaikan', {
          santri_id: String(s.id),
          nama_cache: s.nama || '',
          lembaga: s.lembaga || '',
          kelas_asal: s.kelas || '',
          juz_asal: s.juz || '',
          jenis: it.jenis || '',
          target: it.target || '',
          guru_id: myId.value,
          guru_nama: myNama.value,
          kepala_nama: kepala?.nama || '',
          status: 'diajukan',
          tgl_daftar: now.toISOString(),
          _ts: now.getTime(),
          batch_id: batchId
        })
        ok++
        // v.111: PTPT jenis 'juz' -> spawn baris glondongan + review juz berjalan.
        //   Kegagalan di sini TIDAK menggagalkan ajuan tes kenaikan utama, tapi
        //   dihitung & dilaporkan (lihat spawnGlondongan) — baris yang tak lahir
        //   mengunci gerbang PJ selamanya.
        if (
          String(s.lembaga || '')
            .trim()
            .toUpperCase() === 'PTPT' &&
          (it.jenis || '') === 'juz'
        ) {
          try {
            const g = await spawnGlondongan(ajuanId, s, now, guruList)
            glondonganGagal += g.gagal
            errors.push(...g.errors)
          } catch (e) {
            glondonganGagal++
            errors.push(`${s.nama || s.id}: baris glondongan gagal dibuat — ${e?.message || e}`)
          }
        }
      } catch (e) {
        fail++
        errors.push(`${s.nama || s.id}: ${e.message || e}`)
      }
    }
    return { ok, fail, skipped, glondonganGagal, errors }
  }

  // v.111: buat baris tes_glondongan untuk 1 ajuan PTPT juz (spawn saat ajukanBatch).
  //   - berjalan  : juz kelas berjalan di bawah target -> guru kelas santri (langsung 'ditugaskan').
  //   - glondongan: blok 5-juz per kelas asal (kumulatif) -> 'menunggu' penugasan koordinator/PJ/super_admin.
  //   Nilai per juz (format PJ) TAK masuk rapor — murni catatan evaluasi.
  // Bangun baris tes_glondongan (berjalan + glondongan blok) utk 1 ajuan.
  function _buildGlondonganRows(ajuanId, s, now, guruList = []) {
    const T = testedJuz(s)
    const split = splitGlondongan(T)
    if (!split.ok) return [] // juz tak valid / di luar 1..30
    const base = {
      ajuan_id: String(ajuanId),
      santri_id: String(s.id),
      nama_cache: s.nama || '',
      lembaga: 'PTPT',
      kelas_santri: s.kelas || '',
      mukim: !!s.is_mukim, // kategori koordinator: true -> Ma'had, false -> Selain Ma'had
      juz_target: T,
      periode: periodeBulan(now),
      nilai: {},
      catatan: '',
      tgl_daftar: now.toISOString(),
      _ts: now.getTime()
    }
    const rows = []
    // Review juz kelas berjalan (guru kelas santri) — hanya bila ada juz di bawah target.
    if (split.berjalan.juz.length) {
      const guruKelasNama = String(
        s.guru_pagi || s.guru || s.guru_sore || myNama.value || ''
      ).trim()
      const gk = (guruList || []).find((g) => String(g.nama || '').trim() === guruKelasNama)
      rows.push({
        ...base,
        tipe: 'berjalan',
        kelas_asal: split.kelas,
        juz_dari: split.berjalan.juz[0],
        juz_sampai: split.berjalan.juz[split.berjalan.juz.length - 1],
        juz: split.berjalan.juz,
        status: 'ditugaskan', // langsung ke guru kelas santri (tanpa koordinator)
        penguji_id: gk ? String(gk.id) : '',
        penguji_nama: guruKelasNama,
        ditugaskan_oleh: 'auto'
      })
    }
    // Glondongan per blok kelas asal (kelas lampau) — menunggu penugasan.
    for (const blk of split.glondongan) {
      rows.push({
        ...base,
        tipe: 'glondongan',
        kelas_asal: blk.kelas_asal,
        juz_dari: blk.juz_dari,
        juz_sampai: blk.juz_sampai,
        juz: blk.juz,
        status: 'menunggu',
        penguji_id: '',
        penguji_nama: '',
        ditugaskan_oleh: ''
      })
    }
    return rows
  }
  // Return { dibuat, gagal, errors }. Kegagalan TIDAK menggagalkan ajuan tes kenaikan
  //   utama, tapi WAJIB sampai ke pengaju: baris yang tak lahir membuat
  //   gerbangGlondongan() mengunci PJ SELAMANYA tanpa jejak (dulu cuma console.warn).
  async function spawnGlondongan(ajuanId, s, now, guruList = []) {
    let dibuat = 0
    const errors = []
    for (const r of _buildGlondonganRows(ajuanId, s, now, guruList)) {
      try {
        await addOne('tes_glondongan', r)
        dibuat++
      } catch (e) {
        const blok = r.tipe === 'berjalan' ? 'juz berjalan' : `blok kelas ${r.kelas_asal}`
        errors.push(`${s.nama || s.id} (${blok}): ${e?.message || e}`)
      }
    }
    return { dibuat, gagal: errors.length, errors }
  }
  // v.111.x: buat ULANG baris yang HILANG (spawn gagal / santri lama) tanpa menyentuh yg sudah ada.
  //   s = objek santri (utk juz/mukim/guru kelas). Return { dibuat, gagal, errors } —
  //   kegagalan JANGAN disembunyikan: 0 dibuat karena ditolak RLS vs 0 karena memang
  //   tak ada yang kurang itu dua hal yang sangat berbeda bagi pemakainya.
  async function buatUlangGlondongan(ajuan, s, guruList = []) {
    if (!ajuan?.id || !s) return { dibuat: 0, gagal: 0, errors: [] }
    const existing = glondonganByAjuan.value[String(ajuan.id)] || []
    const punya = (r) =>
      existing.some(
        (x) =>
          String(x.tipe) === String(r.tipe) &&
          (r.tipe === 'berjalan' || Number(x.kelas_asal) === Number(r.kelas_asal))
      )
    const rows = _buildGlondonganRows(String(ajuan.id), s, new Date(), guruList).filter(
      (r) => !punya(r)
    )
    let dibuat = 0
    const errors = []
    for (const r of rows) {
      try {
        await addOne('tes_glondongan', r)
        dibuat++
      } catch (e) {
        const blok = r.tipe === 'berjalan' ? 'juz berjalan' : `blok kelas ${r.kelas_asal}`
        errors.push(`${blok}: ${e?.message || e}`)
      }
    }
    return { dibuat, gagal: errors.length, errors }
  }

  // Penguji: tetapkan hasil. status: 'lulus' | 'tidak_lulus' | 'ditolak'.
  //   nilai = { aspekKey: angka 0–90 } (v.100d) — opsional, disimpan apa adanya.
  async function putuskan(id, status, catatan = '', nilai = null) {
    // v.111.x GERBANG: PJ tak boleh mengetes (Lulus/Belum Lulus) sebelum glondongan+berjalan
    //   'selesai'. Tolak/Batal (status lain) tetap boleh.
    if (status === 'lulus' || status === 'tidak_lulus') {
      const ajuan = ajuanRaw.value.find((a) => String(a.id) === String(id))
      if (gerbangFor(ajuan).terkunci) {
        const err = new Error(
          'Glondongan/berjalan belum selesai disimak — PJ belum bisa mengetes santri ini.'
        )
        err.code = 'GERBANG_GLONDONGAN'
        throw err
      }
    }
    const patch = {
      status,
      catatan_hasil: String(catatan || ''),
      penguji: myNama.value,
      tgl_hasil: new Date().toISOString()
    }
    if (nilai && typeof nilai === 'object' && Object.keys(nilai).length) patch.nilai = nilai
    await updateOne('tes_kenaikan', id, patch)
  }

  // Pengaju: batalkan ajuan yang masih 'diajukan' (sebelum diuji).
  async function batalAjuan(id) {
    await updateOne('tes_kenaikan', id, {
      status: 'ditolak',
      catatan_hasil: 'Dibatalkan pengaju',
      tgl_hasil: new Date().toISOString()
    })
  }

  // v.107 CRUD (super_admin saja): koreksi/hapus record tes_kenaikan historis.
  const canCrud = computed(() => isSuperAdmin(sesi.value))
  // Edit/koreksi record lama: ubah status/nilai/jenis/target/catatan (record tetap ada).
  async function editAjuan(id, patch) {
    await updateOne('tes_kenaikan', id, {
      ...patch,
      _edited_at: new Date().toISOString(),
      _edited_by: myNama.value
    })
  }
  // Reset ke 'diajukan' (uji ulang) — kosongkan hasil.
  async function resetAjuan(id) {
    await updateOne('tes_kenaikan', id, {
      status: 'diajukan',
      nilai: null,
      catatan_hasil: '',
      penguji: '',
      tgl_hasil: '',
      _edited_at: new Date().toISOString(),
      _edited_by: myNama.value
    })
  }
  // Hard-delete record (backup ke audit_log dulu via deleteOne).
  //   v.1.1.9: IKUT hapus baris tes_glondongan miliknya. `ajuan_id` cuma FK LOGIS
  //   (tak ada `references` / ON DELETE CASCADE di migrasi 20260701100000), jadi tanpa
  //   ini barisnya jadi YATIM: tesnya hilang tapi nama santri masih nongol di menu
  //   Glondongan — persis keluhan Kyai. Cascade di aplikasi, bukan migrasi, supaya tak
  //   perlu db push dan tetap tercatat di audit_log.
  async function hapusAjuan(id) {
    const anak = (glondonganRaw.value || []).filter((r) => String(r.ajuan_id || '') === String(id))
    for (const r of anak) {
      // Best-effort per baris: satu yang gagal jangan menahan penghapusan ajuannya.
      try {
        await deleteOne('tes_glondongan', r.id, { alasan: 'Ikut terhapus dgn ajuan tes kenaikan' })
      } catch (e) {
        console.warn('[tes] gagal hapus baris glondongan', r.id, e?.message || e)
      }
    }
    await deleteOne('tes_kenaikan', id, { alasan: 'Hapus record tes kenaikan (super_admin)' })
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsub = subscribeColl('tes_kenaikan', (docs) => {
      // pastikan _ts ada utk sort (dok lama / tanpa _ts → derive dari tgl_daftar)
      ajuanRaw.value = (docs || []).map((d) => ({
        ...d,
        _ts: d._ts || (d.tgl_daftar ? Date.parse(d.tgl_daftar) : 0)
      }))
      loaded.value = true
    })
    // v.111.x: baris glondongan (utk gerbang PJ + buat-ulang).
    unsubGl = subscribeColl('tes_glondongan', (docs) => {
      glondonganRaw.value = docs || []
    })
  })
  onUnmounted(() => {
    if (unsub) unsub()
    if (unsubGl) unsubGl()
  })

  return {
    loaded,
    ajuanRaw,
    myAjuan,
    antrian,
    riwayat,
    isPenguji,
    isAdmin,
    isKepala,
    isAmpuanSaya, // v.1.1.9: predikat scope PJ (santriId) => boolean
    diluarAmpuan, // jumlah ajuan PTPT yang disembunyikan scope PJ (utk pesan UI)
    hasOpenAjuan,
    ajukanBatch,
    putuskan,
    batalAjuan,
    canCrud,
    editAjuan,
    resetAjuan,
    hapusAjuan,
    // v.111.x gerbang glondongan PJ
    glondonganByAjuan,
    gerbangFor,
    buatUlangGlondongan,
    setSiapTes
  }
}
