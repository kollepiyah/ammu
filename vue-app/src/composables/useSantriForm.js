// useSantriForm — manage santri CRUD form state (create + edit)
// Phase 5.13 (v.40.0526) — port logic legacy simpanSantri + editAdminSantri
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { setDoc, doc, collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'
import { toTitleCase } from '@/utils/format'

function emptyForm() {
  return {
    id: null,
    nis: '',
    nisn: '', // v.95.0626d: Nomor Induk Siswa Nasional
    nama: '',
    jk: 'L',
    tgl_lahir: '',
    tgl_masuk: '',
    lembaga: '',
    kelas: '',
    juz: '',
    lembaga_sekolah: '',
    kelas_sekolah: '',
    guru_pagi: '',
    guru_sore: '',
    guru_sekolah: [],
    nama_wali: '',
    wa_wali: '',
    is_mukim: false,
    // v.21.13.0526: + is_fullday + catatan_riwayat_pribadi (Ma'had) + alasan/tanggal keluar
    is_fullday: false,
    catatan_riwayat_pribadi: '',
    aktif: true,
    tgl_keluar: '',
    alasan_keluar: '',
    // v.89 (N4): field lengkap match PSB (biodata + ortu + alamat detail)
    alamat: '',
    tempat_lahir: '',
    nama_panggilan: '',
    no_kk: '',
    asal_sekolah: '',
    penghasilan_ortu: '',
    alamat_dusun: '', alamat_rt: '', alamat_rw: '',
    alamat_desa: '', alamat_kecamatan: '', alamat_kabupaten: '', alamat_provinsi: '',
    nama_ayah: '', nik_ayah: '', pekerjaan_ayah: '', pendidikan_ayah: '', hp_ayah: '',
    nama_ibu: '', nik_ibu: '', pekerjaan_ibu: '', pendidikan_ibu: '', hp_ibu: '',
    custom_fields: {}
  }
}

export function useSantriForm() {
  const toast = useToast()
  const form = ref(emptyForm())
  const lembagaRaw = ref([])
  const guruRaw = ref([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const errorMsg = ref(null)
  const editingId = ref(null) // null = create mode
  let unsubLembaga = null
  let unsubGuru = null

  // Computed: usia + usia masuk derived dari tgl_lahir + tgl_masuk
  const usia = computed(() => calcAge(form.value.tgl_lahir))
  const usiaMasuk = computed(() => calcAgeAt(form.value.tgl_lahir, form.value.tgl_masuk))

  // Cascade: kelas list per lembaga
  const kelasOptions = computed(() => {
    const l = lembagaRaw.value.find((x) => x.lembaga === form.value.lembaga)
    return Array.isArray(l?.kelas) ? l.kelas : []
  })

  // v.21.23.0526: Kelas Sekolah filter per lembaga_sekolah dengan TK umbrella + hardcode fallback
  const kelasSekolahOptions = computed(() => {
    const ls = form.value.lembaga_sekolah
    if (!ls) return []
    // TK umbrella: kelas = TK A, TK B (varian dari master/lembaga tk_group)
    if (ls === 'TK') {
      const varians = lembagaRaw.value
        .filter((x) => x.tk_group === 'TK' || ['TK A', 'TK B'].includes(x.lembaga))
        .map((x) => x.lembaga)
      return varians.length > 0 ? varians : ['TK A', 'TK B']
    }
    // SDI/PKBM ambil dari master/lembaga, dengan hardcode fallback
    const l = lembagaRaw.value.find((x) => x.lembaga === ls)
    if (l && Array.isArray(l.kelas) && l.kelas.length > 0) return l.kelas
    if (ls === 'SDI') return ['I', 'II', 'III', 'IV', 'V', 'VI']
    if (ls === 'PKBM') return ['VII', 'VIII', 'IX', 'X', 'XI', 'XII']
    return []
  })

  // Lembaga pondok (filtering: yang punya kelas, exclude Yayasan)
  const lembagaPondokOptions = computed(() =>
    lembagaRaw.value
      .filter((l) => Array.isArray(l.kelas) && l.kelas.length > 0)
      .filter((l) => l.lembaga !== 'Yayasan')
      .map((l) => l.lembaga)
  )

  // Lembaga sekolah (formal: TK umbrella, SDI, PKBM) — TK menggabung TK A+B
  const lembagaSekolahOptions = computed(() => ['TK', 'SDI', 'PKBM'])

  // Guru list filtered by lembaga (untuk multi-select guru pengajar)
  const guruByLembaga = computed(() => {
    if (!form.value.lembaga) return []
    return guruRaw.value
      .filter((g) => {
        const aktif = String(g.status || 'Aktif').toLowerCase().trim() === 'aktif'
        const tipeOk = ['ngaji', 'ngaji_sekolah'].includes(g.tipe_pegawai) || !g.tipe_pegawai
        return aktif && tipeOk && g.lembaga === form.value.lembaga
      })
      .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
  })

  // Guru sekolah filtered by lembaga_sekolah
  const guruByLembagaSekolah = computed(() => {
    if (!form.value.lembaga_sekolah) return []
    return guruRaw.value
      .filter((g) => {
        const aktif = String(g.status || 'Aktif').toLowerCase().trim() === 'aktif'
        return (
          aktif &&
          ((g.tipe_pegawai === 'sekolah' && g.lembaga === form.value.lembaga_sekolah) ||
            (g.tipe_pegawai === 'ngaji_sekolah' &&
              (g.lembaga === form.value.lembaga_sekolah ||
                g.lembaga_sekolah === form.value.lembaga_sekolah)))
        )
      })
      .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
  })

  // ============== ACTIONS ==============

  function resetForm() {
    form.value = emptyForm()
    editingId.value = null
    errorMsg.value = null
  }

  async function loadSantri(id) {
    if (!id) {
      resetForm()
      return
    }
    isLoading.value = true
    errorMsg.value = null
    try {
      const snap = await getDoc(doc(db, 'santri', String(id)))
      if (!snap.exists()) {
        errorMsg.value = 'Santri tidak ditemukan'
        return
      }
      const s = snap.data()
      // v.21.23.0526: Migrate lembaga_sekolah lama (TK A/TK B) → umbrella TK + kelas TK A/TK B
      let _lemSek = s.lembaga_sekolah || ''
      let _kelSek = s.kelas_sekolah || ''
      if (_lemSek === 'TK A' || _lemSek === 'TK B') {
        _kelSek = _lemSek
        _lemSek = 'TK'
      }
      form.value = {
        id: s.id,
        nis: s.nis || '',
        nisn: s.nisn || '',
        nama: s.nama || '',
        jk: s.jk || 'L',
        tgl_lahir: s.tgl_lahir || '',
        tgl_masuk: s.tgl_masuk || '',
        lembaga: s.lembaga || '',
        kelas: s.kelas || '',
        juz: s.juz || '',
        lembaga_sekolah: _lemSek,
        kelas_sekolah: _kelSek,
        guru_pagi: s.guru_pagi || (s.guru && !s.guru_sore ? s.guru : ''),
        guru_sore: s.guru_sore || '',
        guru_sekolah: Array.isArray(s.guru_sekolah) ? s.guru_sekolah : [],
        nama_wali: s.wali || '',
        wa_wali: s.wa || '',
        is_mukim: !!s.is_mukim,
        // v.21.13.0526: load + is_fullday + catatan + alasan keluar
        is_fullday: !!s.is_fullday,
        catatan_riwayat_pribadi: s.catatan_riwayat_pribadi || '',
        aktif: s.aktif !== false,
        tgl_keluar: s.tgl_keluar || '',
        alasan_keluar: s.alasan_keluar || '',
        alamat: s.alamat || '',
        tempat_lahir: s.tempat_lahir || '',
        nama_panggilan: s.nama_panggilan || '',
        no_kk: s.no_kk || '',
        asal_sekolah: s.asal_sekolah || '',
        penghasilan_ortu: s.penghasilan_ortu || '',
        alamat_dusun: s.alamat_dusun || '', alamat_rt: s.alamat_rt || '', alamat_rw: s.alamat_rw || '',
        alamat_desa: s.alamat_desa || '', alamat_kecamatan: s.alamat_kecamatan || '',
        alamat_kabupaten: s.alamat_kabupaten || '', alamat_provinsi: s.alamat_provinsi || '',
        nama_ayah: s.nama_ayah || (s.ayah && s.ayah.nama) || '',
        nik_ayah: s.nik_ayah || (s.ayah && s.ayah.nik) || '',
        pekerjaan_ayah: s.pekerjaan_ayah || (s.ayah && s.ayah.pekerjaan) || '',
        pendidikan_ayah: s.pendidikan_ayah || (s.ayah && s.ayah.pendidikan) || '',
        hp_ayah: s.hp_ayah || (s.ayah && s.ayah.telp) || '',
        nama_ibu: s.nama_ibu || (s.ibu && s.ibu.nama) || '',
        nik_ibu: s.nik_ibu || (s.ibu && s.ibu.nik) || '',
        pekerjaan_ibu: s.pekerjaan_ibu || (s.ibu && s.ibu.pekerjaan) || '',
        pendidikan_ibu: s.pendidikan_ibu || (s.ibu && s.ibu.pendidikan) || '',
        hp_ibu: s.hp_ibu || (s.ibu && s.ibu.telp) || '',
        custom_fields: s.custom_fields || {}
      }
      editingId.value = String(id)
    } catch (e) {
      errorMsg.value = 'Error load santri: ' + (e.message || e)
    } finally {
      isLoading.value = false
    }
  }

  function validate() {
    const f = form.value
    if (!String(f.nama || '').trim()) return 'Nama wajib diisi'
    if (!f.tgl_lahir) return 'Tanggal lahir wajib diisi'
    if (!f.lembaga) return 'Lembaga pondok wajib dipilih'
    if (!f.kelas) return 'Kelas wajib dipilih'
    if (!f.guru_pagi && !f.guru_sore) return 'Pilih minimal 1 guru pengajar dengan shift'
    if (!String(f.nama_wali || '').trim()) return 'Nama wali wajib diisi'
    if (!String(f.wa_wali || '').trim()) return 'WA wali wajib diisi'
    return null
  }

  async function save() {
    if (isSaving.value) return false
    const err = validate()
    if (err) {
      toast.warning(err)
      return false
    }
    isSaving.value = true
    try {
      const f = form.value
      const id = editingId.value || Date.now()
      const waVal = String(f.wa_wali || '').replace(/\D/g, '')
      const defaultUsername = waVal && waVal.length >= 8 ? waVal : f.nis || 'S' + id
      const data = {
        id: editingId.value ? Number(editingId.value) || editingId.value : id,
        nis: f.nis,
        nisn: f.nisn || '',
        username: defaultUsername,
        nama: toTitleCase(f.nama),
        jk: f.jk,
        tgl_lahir: f.tgl_lahir,
        usia: usia.value,
        tgl_masuk: f.tgl_masuk,
        usia_masuk: usiaMasuk.value,
        wali: toTitleCase(f.nama_wali),
        wa: f.wa_wali,
        lembaga_sekolah: f.lembaga_sekolah,
        kelas_sekolah: f.kelas_sekolah || '-',
        guru_sekolah: f.guru_sekolah,
        lembaga: f.lembaga,
        kelas: f.kelas,
        guru_pagi: f.guru_pagi,
        guru_sore: f.guru_sore,
        guru: f.guru_pagi || f.guru_sore, // backward compat
        juz: f.lembaga === 'PTPT' ? String(f.juz || '').toUpperCase() : '-',
        aktif: f.aktif,
        is_mukim: f.is_mukim,
        // v.21.13.0526: + is_fullday + catatan_riwayat + tgl/alasan keluar
        is_fullday: !!f.is_fullday,
        catatan_riwayat_pribadi: f.catatan_riwayat_pribadi || '',
        tgl_keluar: f.aktif === false ? (f.tgl_keluar || '') : '',
        alasan_keluar: f.aktif === false ? (f.alasan_keluar || '') : '',
        // v.89 (N4): biodata + ortu + alamat detail (match PSB)
        tempat_lahir: f.tempat_lahir || '',
        nama_panggilan: f.nama_panggilan || '',
        no_kk: f.no_kk || '',
        asal_sekolah: f.asal_sekolah || '',
        penghasilan_ortu: f.penghasilan_ortu || '',
        alamat: f.alamat || [f.alamat_dusun, f.alamat_desa, f.alamat_kecamatan].filter(Boolean).join(', '),
        alamat_dusun: f.alamat_dusun || '', alamat_rt: f.alamat_rt || '', alamat_rw: f.alamat_rw || '',
        alamat_desa: f.alamat_desa || '', alamat_kecamatan: f.alamat_kecamatan || '',
        alamat_kabupaten: f.alamat_kabupaten || '', alamat_provinsi: f.alamat_provinsi || '',
        nama_ayah: f.nama_ayah || '', nik_ayah: f.nik_ayah || '', pekerjaan_ayah: f.pekerjaan_ayah || '', pendidikan_ayah: f.pendidikan_ayah || '', hp_ayah: f.hp_ayah || '',
        nama_ibu: f.nama_ibu || '', nik_ibu: f.nik_ibu || '', pekerjaan_ibu: f.pekerjaan_ibu || '', pendidikan_ibu: f.pendidikan_ibu || '', hp_ibu: f.hp_ibu || '',
        ayah: { nama: f.nama_ayah || '', nik: f.nik_ayah || '', pekerjaan: f.pekerjaan_ayah || '', pendidikan: f.pendidikan_ayah || '', telp: f.hp_ayah || '' },
        ibu: { nama: f.nama_ibu || '', nik: f.nik_ibu || '', pekerjaan: f.pekerjaan_ibu || '', pendidikan: f.pendidikan_ibu || '', telp: f.hp_ibu || '' },
        custom_fields: f.custom_fields || {},
        password: '1234', // default password baru
        foto: '',
        riwayat: [],
        prestasi_awal: '',
        prestasi_akhir: '',
        prestasi_total: ''
      }
      // Kalau edit, preserve existing fields
      if (editingId.value) {
        try {
          const oldSnap = await getDoc(doc(db, 'santri', String(editingId.value)))
          if (oldSnap.exists()) {
            const old = oldSnap.data()
            data.password = old.password || '1234'
            data.foto = old.foto || ''
            data.riwayat = old.riwayat || []
            data.prestasi_awal = old.prestasi_awal || ''
            data.prestasi_akhir = old.prestasi_akhir || ''
            data.prestasi_total = old.prestasi_total || ''
            data.username = old.username || defaultUsername
          }
        } catch (e) { /* ignore */ }
      }
      await setDoc(doc(db, 'santri', String(data.id)), data)
      toast.success(editingId.value ? 'Data santri diupdate' : 'Santri baru disimpan')
      return true
    } catch (e) {
      toast.error('Error simpan: ' + (e.message || e))
      return false
    } finally {
      isSaving.value = false
    }
  }

  // v.21.22.0526: Lembaga ada di doc master/lembaga (list array), bukan collection lembaga/
  onMounted(() => {
    unsubLembaga = onSnapshot(doc(db, 'master', 'lembaga'), (snap) => {
      const data = snap.data()
      lembagaRaw.value = Array.isArray(data?.list) ? data.list : []
    })
    unsubGuru = onSnapshot(collection(db, 'guru'), (snap) => {
      guruRaw.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    })
  })

  // v.98: cleanup listener (cegah leak listener koleksi `guru` penuh tiap buka form santri)
  onUnmounted(() => {
    if (unsubLembaga) unsubLembaga()
    if (unsubGuru) unsubGuru()
  })

  return {
    form,
    lembagaRaw,
    guruRaw,
    isLoading,
    isSaving,
    errorMsg,
    editingId,
    usia,
    usiaMasuk,
    kelasOptions,
    kelasSekolahOptions,
    lembagaPondokOptions,
    lembagaSekolahOptions,
    guruByLembaga,
    guruByLembagaSekolah,
    resetForm,
    loadSantri,
    validate,
    save
  }
}

// Helper: hitung usia dari tgl_lahir
function calcAge(tglLahir) {
  if (!tglLahir) return ''
  const d = new Date(tglLahir)
  if (isNaN(d.getTime())) return ''
  const now = new Date()
  let y = now.getFullYear() - d.getFullYear()
  let m = now.getMonth() - d.getMonth()
  let day = now.getDate() - d.getDate()
  if (day < 0) m--
  if (m < 0) { y--; m += 12 }
  return `${y} thn ${m} bln`
}
function calcAgeAt(tglLahir, tglRef) {
  if (!tglLahir || !tglRef) return ''
  const d = new Date(tglLahir)
  const r = new Date(tglRef)
  if (isNaN(d.getTime()) || isNaN(r.getTime())) return ''
  let y = r.getFullYear() - d.getFullYear()
  let m = r.getMonth()
  if (m < 0) { y--; m += 12 }
  return `${y} thn ${m} bln`
}
