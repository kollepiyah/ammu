// v.100: useTesKenaikan — koleksi `tes_kenaikan` (real-time) + scope per-role + actions.
//   Pengaju  = guru ngaji (santri ampuannya). Penguji = Kepala/PJ lembaga (scoped) + admin.
//   LULUS = tandai "siap naik" SAJA (tak ubah kelas santri) — kenaikan aktual tetap manual di
//   NaikKelasView (kyai: santri bisa pindah kelas). Notif HP menyusul (Fase B, functions).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, addOne, updateOne, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin, isAdminBiasa, isKepalaLembaga } from '@/utils/roleScope'
import { lembagaScopeMatches } from '@/composables/useLembaga'
// v.111: rumus pembagian glondongan PTPT (spawn baris tes_glondongan saat ajukan juz)
import {
  splitGlondongan,
  testedJuz,
  periodeBulan,
  gerbangGlondongan,
  PTPT_LEMBAGA
} from '@/utils/glondongan'
import { useSantri } from '@/composables/useSantri'
import { headsLembaga } from '@/utils/guruScope'
import { ajuanPengunci } from '@/utils/tesKenaikan'

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

  // v.1.2.6 (Kyai): admin_keuangan TIDAK lagi penguji/admin di sini. Yang merangkap
  //   guru ngaji tetap bisa MENGAJUKAN tes untuk santri KELASNYA (jalur pengaju,
  //   ter-scope ownsNgaji) — bukan melihat/menguji semua santri. `isAdminKeuangan`
  //   sengaja tak dipakai lagi di isAdmin.
  const isAdmin = computed(() => isSuperAdmin(sesi.value) || isAdminBiasa(sesi.value))
  const isKepala = computed(() => isKepalaLembaga(sesi.value))
  // Penguji = kepala/PJ (scoped lembaganya) atau admin (semua).
  const isPenguji = computed(() => isAdmin.value || isKepala.value)

  // v.1.1.9: scope PJ PTPT — "PJ hanya bisa melihat santri ampuannya" (Kyai 21 Jul
  //   2026). PJ PTPT kini >1 orang. Sumber santri = pinia collections store, jadi
  //   TIDAK menambah langganan.
  // v.1.4.8: ampuan PJ = PJ EFEKTIF santri (guru pengajar → PJ lewat peta Peran Glondongan,
  //   cadangan label pj_ptpt) — sama dengan Data Santri. Dulu di sini label `pj_ptpt` SAJA,
  //   jadi santri yang dibagikan lewat peta guru tak pernah sampai ke antrian PJ barunya.
  const { santriRaw, scope, petaPjSantri } = useSantri()
  const _norm = (v) =>
    String(v ?? '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
  const isAmpuanSaya = computed(() => {
    const saya = _norm(myNama.value)
    return (santriId) => !!saya && _norm(petaPjSantri.value.get(String(santriId))) === saya
  })
  const _isPtpt = (a) =>
    String(a?.lembaga || '')
      .trim()
      .toUpperCase() === PTPT_LEMBAGA
  // v.1.4.8: lembaga yang dipimpin dibaca dari JABATAN (headsLembaga), bukan `sesi.lembaga`
  //   (lembaga tempat ia mengajar). Dulu Kepala SDI yang mengajar PTPT ikut menjadi penguji
  //   PTPT. Jabatan yang tak menyebut lembaga apa pun (mis. "Pengasuh") tetap memakai
  //   aturan lama supaya tak kehilangan antriannya.
  const _jabatanMenyebutLembaga = computed(() =>
    [sesi.value.jabatan, sesi.value.jabatan_tambahan].some((j) =>
      /^(kepala|pj|pengasuh)\s+\S/.test(_norm(j))
    )
  )
  function _pimpinLembagaAjuan(a) {
    return _jabatanMenyebutLembaga.value
      ? headsLembaga(sesi.value, a.lembaga)
      : lembagaScopeMatches(myLembaga.value, a.lembaga)
  }

  // Apakah ajuan masuk scope penguji ini? (admin = semua; kepala = lembaga yang dipimpinnya)
  function inScope(a) {
    if (isAdmin.value) return true
    if (!isKepala.value) return false
    if (!_pimpinLembagaAjuan(a)) return false
    // Penyempitan KHUSUS PTPT: PJ PTPT hanya santri ampuannya. Kepala lembaga lain
    //   (termasuk gelar luas seperti "Kepala Qiraati") tetap se-lembaganya.
    if (_isPtpt(a) && scope.value.pjPtpt) return isAmpuanSaya.value(a.santri_id)
    return true
  }

  // Ajuan PTPT yang DISEMBUNYIKAN oleh scope PJ di atas. Dipakai UI untuk memberi
  //   tahu "ada N ajuan di luar ampuan Anda" — tanpa ini, santri yang label
  //   `pj_ptpt`-nya belum diisi tampak HILANG begitu saja.
  const diluarAmpuan = computed(() => {
    if (isAdmin.value || !isKepala.value || !scope.value.pjPtpt) return 0
    return ajuanRaw.value.filter(
      (a) => _isPtpt(a) && _pimpinLembagaAjuan(a) && !isAmpuanSaya.value(a.santri_id)
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

  // Guard dobel. v.1.4.8: bukan lagi "ada ajuan 'diajukan'" saja — ajuan terakhir yang
  //   BELUM LULUS ikut mengunci (lihat utils/tesKenaikan.ajuanPengunci). `santri` boleh
  //   objek santri (disarankan — dipakai pengecualian jenjang lama) atau id saja.
  function pengunciAjuan(santri) {
    const s =
      santri && typeof santri === 'object'
        ? santri
        : santriRaw.value.find((x) => String(x?.id) === String(santri)) || { id: santri }
    return ajuanPengunci(ajuanRaw.value, s)
  }
  function hasOpenAjuan(santri) {
    return !!pengunciAjuan(santri)
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
    // v.1.4.8: "langsung tes" — glondongan & review juz berjalan dilewati atas pilihan
    //   pengaju; tak ada baris yang ditunggu, tak ada gerbang.
    if (ajuan.tanpa_glondongan) return { ...kosong, tanpaGlondongan: true }
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
      if (pengunciAjuan(s)) {
        skipped++
        continue
      } // v.1.4.8: masih ada ajuan menunggu tes / belum lulus
      // v.1.4.8 (Kyai 3 Nov 2026): "ada beberapa anak yg kadang tidak perlu gelondong, jadi
      //   langsung tes". Hanya untuk PTPT juz yang memang punya glondongan (kelas 2+), dicentang
      //   pengaju per santri. Glondongan DAN review juz berjalan dilewati (keputusan Kyai),
      //   santri langsung siap dites PJ.
      const isPtptJuz =
        String(s.lembaga || '')
          .trim()
          .toUpperCase() === 'PTPT' && (it.jenis || '') === 'juz'
      const langsungTes =
        !!it.langsungTes && isPtptJuz && splitGlondongan(testedJuz(s)).glondongan.length > 0
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
          batch_id: batchId,
          ...(langsungTes ? { tanpa_glondongan: true, siap_tes: true } : {})
        })
        ok++
        // v.111: PTPT jenis 'juz' -> spawn baris glondongan + review juz berjalan.
        //   Kegagalan di sini TIDAK menggagalkan ajuan tes kenaikan utama, tapi
        //   dihitung & dilaporkan (lihat spawnGlondongan) — baris yang tak lahir
        //   mengunci gerbang PJ selamanya.
        if (isPtptJuz && !langsungTes) {
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
  async function putuskan(id, status, catatan = '', nilai = null, tglIso = null) {
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
    // v.1.2.5: tgl_hasil bisa diatur penguji (dipakai KHUSUS saat LULUS — lihat
    //   TesKenaikanView). 'YYYY-MM-DD' → disimpan sbg 00:00Z tanggal itu; slice(0,10)
    //   tetap benar untuk masa tempuh juz & fmtTgl, tanpa geser hari (jangan konstruksi
    //   via waktu lokal lalu toISOString — bisa mundur 1 hari di WIB). Default = sekarang.
    const tgl = /^\d{4}-\d{2}-\d{2}$/.test(String(tglIso || ''))
      ? `${tglIso}T00:00:00.000Z`
      : new Date().toISOString()
    const patch = {
      status,
      catatan_hasil: String(catatan || ''),
      penguji: myNama.value,
      tgl_hasil: tgl
    }
    if (nilai && typeof nilai === 'object' && Object.keys(nilai).length) patch.nilai = nilai
    await updateOne('tes_kenaikan', id, patch)
  }

  // v.1.4.8: PJ/penguji menguji ULANG ajuan yang "Belum lulus" — ajuan yang SAMA kembali ke
  //   antrian, jadi glondongan yang sudah selesai disimak (dan tanda Siap Tes) tetap berlaku.
  //   Hasil sebelumnya tidak dibuang: disimpan berurutan di `riwayat_hasil`. Trigger notif
  //   (tg_tes_decided_notif) diam karena `penguji` dikosongkan; notif baru keluar saat
  //   hasil tes ulangnya diputuskan.
  function bisaTesUlang(a) {
    if (!a || a.status !== 'tidak_lulus') return false
    // Hanya ajuan yang masih MENGUNCI santrinya — ajuan gagal lama yang sudah disusul ajuan
    //   lain tak boleh dibuka kembali (jadi dua ajuan terbuka untuk satu santri).
    const p = pengunciAjuan(a.santri_id)
    return !!p && String(p.id) === String(a.id)
  }
  async function tesUlang(id) {
    const a = ajuanRaw.value.find((x) => String(x.id) === String(id))
    if (!bisaTesUlang(a))
      throw new Error('Hanya ajuan terakhir yang "Belum lulus" yang bisa dites ulang.')
    const jejak = Array.isArray(a.riwayat_hasil) ? a.riwayat_hasil : []
    await updateOne('tes_kenaikan', String(id), {
      status: 'diajukan',
      riwayat_hasil: [
        ...jejak,
        {
          status: a.status,
          nilai: a.nilai || null,
          catatan_hasil: a.catatan_hasil || '',
          penguji: a.penguji || '',
          tgl_hasil: a.tgl_hasil || ''
        }
      ],
      tes_ulang_ke: (Number(a.tes_ulang_ke) || 0) + 1,
      nilai: null,
      catatan_hasil: '',
      penguji: '',
      tgl_hasil: ''
    })
  }

  // Pengaju: batalkan ajuan yang masih 'diajukan' (sebelum diuji).
  //   v.1.2.5 (Kyai): status khusus 'dibatalkan' — BUKAN 'ditolak'. Pembatalan oleh
  //   pengaju sendiri ≠ penolakan penguji; dibedakan supaya labelnya jujur dan tak
  //   memicu notifikasi "Ditolak" ke pengaju (lihat useNotifications).
  async function batalAjuan(id) {
    await updateOne('tes_kenaikan', id, {
      status: 'dibatalkan',
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
    pengunciAjuan, // v.1.4.8: ajuan yang mengunci santri (menunggu / belum lulus) atau null
    bisaTesUlang, // v.1.4.8
    tesUlang, // v.1.4.8: PJ menguji ulang ajuan "Belum lulus" yang sama
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
