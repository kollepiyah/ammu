// v.111: useGlondongan — koleksi `tes_glondongan` (real-time) + scope per-peran + aksi.
//   Peran & hak:
//     - Menugaskan penguji blok glondongan : Koordinator kategori santri (Ma'had/Selain) · PJ PTPT · super_admin.
//     - Menilai (input nilai per juz+catatan): guru yang DITUGASKAN (glondongan) atau
//       guru kelas santri (baris 'berjalan', auto-assigned).
//     - Baca catatan evaluasi              : guru kelas santri + PJ (via view Task #6).
//   Nilai glondongan/berjalan TAK masuk rapor (murni catatan evaluasi).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc, updateOne, deleteOne, getOne, mergeOne } from '@/services/db'
import { antreNotifBanyak, targetGuru, targetSantri } from '@/services/notif'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin } from '@/utils/roleScope'
import {
  kategoriKoordinatori,
  isKoordinatorKategori,
  getKoordinatorGlondongan,
  getPenyimakGlondongan,
  isPenyimakKategori,
  kategoriMukim,
  buatScopePj,
  getPjGuru,
  isBarisTerbuka,
  isPjLembaga,
  KATEGORI_GLONDONGAN,
  PTPT_LEMBAGA
} from '@/utils/glondongan'
import { useSantri } from '@/composables/useSantri'

// PJ PTPT — v.1.2.2: satu aturan di utils/glondongan.isPjLembaga (jabatan wajib
//   MENYEBUT lembaganya). Dulu inline & cuma cari kata 'kepala|pj|pengasuh',
//   sehingga Kepala lembaga LAIN yang ditempatkan di PTPT ikut jadi PJ PTPT.
function _isPjPtpt(sesi) {
  return isPjLembaga(sesi, PTPT_LEMBAGA)
}

export function useGlondongan() {
  const auth = useAuthStore()
  const rowsRaw = ref([])
  const lembagaList = ref([])
  const loaded = ref(false)
  let unsub = null
  let unsubL = null

  const sesi = computed(() => auth.sesiAktif || {})
  const myId = computed(() => String(sesi.value.id != null ? sesi.value.id : ''))
  const myNama = computed(() => String(sesi.value.nama || sesi.value.guru || '').trim())

  const isSuper = computed(() => isSuperAdmin(sesi.value))
  const isPjPtpt = computed(() => _isPjPtpt(sesi.value))
  // Kategori ('mahad'/'nonmahad') yang saya koordinatori (bisa keduanya / kosong).
  const myKategori = computed(() => kategoriKoordinatori(myId.value, lembagaList.value))
  // Map { mahad:[guruId], nonmahad:[guruId] } koordinator glondongan PTPT (dari master/lembaga).
  const koordinatorGlondongan = computed(() => getKoordinatorGlondongan(lembagaList.value))
  // v.1.1.9: daftar PENYIMAK per kategori — menyaring kandidat penguji di tab Penugasan.
  const penyimakGlondongan = computed(() => getPenyimakGlondongan(lembagaList.value))
  // Guru ini boleh menyimak baris tsb? (kategori mukim santri baris itu)
  function bolehMenyimak(guruId, row) {
    return isPenyimakKategori(guruId, kategoriMukim(row?.mukim), lembagaList.value)
  }

  // v.1.1.9: scope PJ — "PJ hanya bisa melihat santri ampuannya" (Kyai 21 Jul 2026).
  //   PJ PTPT kini >1 orang; tiap PJ dibatasi ke santri ampuannya.
  //   Sumber santri = pinia collections store (useSantri), jadi TIDAK menambah langganan.
  const { santriRaw, guruRaw } = useSantri()
  // v.1.2.1: peta pembagian santri per PJ ({ [pjGuruId]: [guruId] }) dari master/lembaga.
  const pjGuru = computed(() => getPjGuru(lembagaList.value))
  // v.1.2.1: PJ efektif santri kini DITURUNKAN dari guru pengajarnya via pjGuru
  //   (label pj_ptpt jadi cadangan). Peta kosong → jatuh mulus ke perilaku label lama.
  const isAmpuanSaya = computed(() =>
    buatScopePj(santriRaw.value, myNama.value, {
      guruList: guruRaw.value,
      pjGuru: pjGuru.value
    })
  )

  // Boleh menugaskan penguji utk baris ini?
  //   super_admin  : semua baris.
  //   PJ PTPT      : hanya baris santri AMPUANNYA (dulu: semua baris).
  //   Koordinator  : baris sesuai kategori mukim santri — TIDAK diubah.
  //   Peran bisa menumpuk (PJ merangkap koordinator) → hak-nya gabungan.
  function canAssign(row) {
    if (isSuper.value) return true
    if (isPjPtpt.value && isAmpuanSaya.value(row?.santri_id)) return true
    return isKoordinatorKategori(myId.value, kategoriMukim(row?.mukim), lembagaList.value)
  }
  // Boleh melihat antrian penugasan sama sekali?
  const canAssignAny = computed(
    () => isSuper.value || isPjPtpt.value || myKategori.value.length > 0
  )

  const sortNewest = (arr) => [...arr].sort((a, b) => (b._ts || 0) - (a._ts || 0))

  // ── v.1.1.9: buang baris YATIM (Kyai: "sudah hapus tes santri A, tapi di glondongan
  //    masih ada namanya"). `tes_glondongan.ajuan_id` cuma FK LOGIS — tanpa ON DELETE
  //    CASCADE — jadi menghapus tes_kenaikan meninggalkan barisnya menggantung.
  //    Menyaringnya BUKAN sekadar kosmetik: baris yatim ber-status 'selesai' tetap ikut
  //    terhitung di Rekap Bisyaroh, artinya pengujinya dibayar untuk tes yang sudah batal.
  //    ajuanIds null = belum termuat → JANGAN sembunyikan apa pun (kalau tidak, sekejap
  //    setelah buka layar semua baris terlihat yatim).
  const ajuanIds = ref(null)
  let unsubA = null
  const rows = computed(() => {
    const ids = ajuanIds.value
    if (!ids) return rowsRaw.value
    return rowsRaw.value.filter((r) => !r.ajuan_id || ids.has(String(r.ajuan_id)))
  })
  const barisYatim = computed(() => {
    const ids = ajuanIds.value
    if (!ids) return []
    return rowsRaw.value.filter((r) => r.ajuan_id && !ids.has(String(r.ajuan_id)))
  })

  // super_admin: buang baris yatim yang terlanjur ada (dari penghapusan tes sebelum
  //   cascade dipasang). Mengembalikan jumlah yang berhasil dihapus.
  async function bersihkanYatim() {
    let n = 0
    for (const r of barisYatim.value) {
      await deleteOne('tes_glondongan', r.id, { alasan: 'Baris glondongan yatim (ajuan tak ada)' })
      n++
    }
    return n
  }

  // v.1.1.9: blok dikerjakan BERURUTAN dari kelas asal terkecil (Kyai 21 Jul).
  //   Aturannya di utils/glondongan.isBarisTerbuka — dihitung dari RUMUS, bukan dari
  //   baris yang kebetulan ada, supaya blok yang gagal ter-spawn tidak membocorkan urutan.
  const barisPerAjuan = computed(() => {
    const m = {}
    for (const r of rows.value) {
      const k = String(r.ajuan_id || '')
      if (!k) continue
      ;(m[k] || (m[k] = [])).push(r)
    }
    return m
  })
  function terbuka(r) {
    return isBarisTerbuka(r, barisPerAjuan.value[String(r?.ajuan_id || '')] || [])
  }

  // Antrian penugasan: baris glondongan 'menunggu' yang boleh SAYA tugaskan DAN
  //   sudah gilirannya (blok kelas sebelumnya selesai).
  const antrianTugas = computed(() =>
    sortNewest(
      rows.value.filter(
        (r) => r.tipe === 'glondongan' && r.status === 'menunggu' && canAssign(r) && terbuka(r)
      )
    )
  )

  // Blok yang boleh saya tugaskan tapi BELUM gilirannya — dipakai UI memberi tahu
  //   "N blok lain menunggu giliran", supaya hilangnya blok tidak terasa misterius.
  const antrianTertunda = computed(() =>
    rows.value.filter(
      (r) => r.tipe === 'glondongan' && r.status === 'menunggu' && canAssign(r) && !terbuka(r)
    )
  )

  // v.1.1.9: blok yang SUDAH ditugaskan & boleh saya kelola — dulu tab Penugasan
  //   hanya menampilkan yang 'menunggu', jadi koordinator tak punya tempat untuk
  //   melihat siapa penyimaknya (dan menghubunginya).
  const sudahDitugaskan = computed(() =>
    sortNewest(
      rows.value.filter((r) => r.tipe === 'glondongan' && r.status === 'ditugaskan' && canAssign(r))
    )
  )

  // Tugas menilai SAYA: baris 'ditugaskan' ke saya (penguji glondongan atau guru kelas berjalan).
  //   v.1.1.9: hanya yang SUDAH GILIRANNYA. Baris 'berjalan' (guru kelas) dibuat
  //   ber-status 'ditugaskan' sejak awal, jadi tanpa gerbang ini guru kelas bisa
  //   menilainya duluan — padahal Kyai minta ia menunggu semua glondongan selesai.
  const tugasNilaiSaya = computed(() =>
    sortNewest(
      rows.value.filter(
        (r) =>
          r.status === 'ditugaskan' &&
          (String(r.penguji_id || '') === myId.value ||
            (!r.penguji_id && String(r.penguji_nama || '').trim() === myNama.value)) &&
          terbuka(r)
      )
    )
  )

  // Tugas saya yang masih MENUNGGU giliran — supaya penyimak/guru kelas tahu tugasnya
  //   ada tapi belum waktunya, bukan mengira tak kebagian.
  const tugasMenunggu = computed(() =>
    sortNewest(
      rows.value.filter(
        (r) =>
          r.status === 'ditugaskan' &&
          (String(r.penguji_id || '') === myId.value ||
            (!r.penguji_id && String(r.penguji_nama || '').trim() === myNama.value)) &&
          !terbuka(r)
      )
    )
  )

  // Catatan evaluasi 1 santri (semua tipe, terbaru dulu) — untuk panel guru kelas / PJ.
  function catatanSantri(santriId) {
    const sid = String(santriId)
    return sortNewest(rows.value.filter((r) => String(r.santri_id) === sid))
  }
  // Baris untuk 1 ajuan tes_kenaikan.
  function rowsByAjuan(ajuanId) {
    const aid = String(ajuanId)
    return sortNewest(rows.value.filter((r) => String(r.ajuan_id) === aid))
  }

  // ── Aksi ──
  // Tugaskan penguji ke blok glondongan. penguji = { id, nama }.
  async function tugaskan(id, penguji) {
    await updateOne('tes_glondongan', id, {
      penguji_id: String(penguji?.id || ''),
      penguji_nama: String(penguji?.nama || ''),
      status: 'ditugaskan',
      ditugaskan_oleh: myNama.value,
      tgl_tugas: new Date().toISOString()
    })
    // Antre PUSH ke penguji DAN santri (dibaca Edge Function dispatch-push, cron
    //   tiap menit). Best-effort: gagal antre TIDAK menggagalkan penugasan.
    //
    // v.1.1.9 FIX: dulu target-nya `{ type:'guru', id }` — dispatch-push hanya
    //   mengenal `{ type:'guru', nama }`, jadi TIDAK ADA cabang yang cocok dan setiap
    //   penugasan berakhir 'failed: No tokens' tanpa ada yang tahu. Sekarang lewat
    //   targetGuru() yang mengirim nama + id sekaligus.
    const r = rowsRaw.value.find((x) => String(x.id) === String(id))
    if (!r) return
    const juzTxt =
      r.juz_dari === r.juz_sampai ? `juz ${r.juz_dari}` : `juz ${r.juz_dari}–${r.juz_sampai}`
    const namaSantri = r.nama_cache || 'santri'
    const antrean = []
    if (penguji?.id || penguji?.nama) {
      antrean.push({
        prefix: 'ntf_glond_guru',
        judul: 'Tugas Menyimak Glondongan',
        pesan: `Anda ditugaskan menyimak ${namaSantri} — ${juzTxt}.`,
        kategori: 'glondongan',
        target: targetGuru(penguji),
        link: '/glondongan',
        ref_id: String(id)
      })
    }
    // v.1.1.9 (Kyai 21 Jul): santri yang dijadwal glondongan ikut diberi tahu.
    if (r.santri_id) {
      antrean.push({
        prefix: 'ntf_glond_santri',
        judul: 'Jadwal Menyimak Glondongan',
        pesan: `${namaSantri} dijadwalkan menyimak ${juzTxt} bersama ${
          penguji?.nama || 'guru penyimak'
        }.`,
        kategori: 'glondongan',
        target: targetSantri(r.santri_id),
        link: '/glondongan',
        ref_id: String(id)
      })
    }
    await antreNotifBanyak(antrean)
  }
  // Batalkan penugasan (kembali ke antrian 'menunggu').
  async function batalTugas(id) {
    await updateOne('tes_glondongan', id, {
      penguji_id: '',
      penguji_nama: '',
      status: 'menunggu',
      ditugaskan_oleh: '',
      tgl_tugas: ''
    })
  }
  // Simpan nilai per juz + catatan -> 'selesai'. nilai = { <juz>: { aspekKey: 0..90 } }.
  async function simpanNilai(id, nilai, catatan = '') {
    await updateOne('tes_glondongan', id, {
      nilai: nilai && typeof nilai === 'object' ? nilai : {},
      catatan: String(catatan || ''),
      status: 'selesai',
      penilai_nama: myNama.value,
      tgl_nilai: new Date().toISOString()
    })
  }

  // super_admin: hapus baris (koreksi).
  const canCrud = computed(() => isSuper.value)
  async function hapus(id) {
    await deleteOne('tes_glondongan', id, { alasan: 'Hapus baris tes glondongan (super_admin)' })
  }

  function _bersihkanPeran(map) {
    const clean = {}
    for (const k of KATEGORI_GLONDONGAN) {
      const arr = Array.isArray(map && map[k]) ? map[k] : []
      clean[k] = [...new Set(arr.map((x) => String(x || '').trim()).filter(Boolean))]
    }
    return clean
  }

  // v.1.2.1: rapikan peta pj_guru { [pjId]: [guruId] } — id string, unik, buang kosong,
  //   dan JAGA agar satu guru cuma di bawah SATU PJ (yang pertama menang) supaya PJ
  //   efektif santri tak ambigu.
  function _bersihkanPjGuru(map) {
    const out = {}
    const dipakai = new Set()
    for (const [pjId, gids] of Object.entries(map || {})) {
      const key = String(pjId || '').trim()
      if (!key) continue
      const arr = []
      for (const g of Array.isArray(gids) ? gids : []) {
        const id = String(g || '').trim()
        if (!id || dipakai.has(id) || arr.includes(id)) continue
        arr.push(id)
        dipakai.add(id)
      }
      if (arr.length) out[key] = arr
    }
    return out
  }

  // super_admin: simpan peran glondongan ke master/lembaga PTPT.
  //   v.1.1.9: dua daftar TERPISAH — koordinator (yang menugaskan) & penyimak (yang
  //   boleh ditugaskan menyimak). Keduanya { mahad:[guruId], nonmahad:[guruId] }.
  //   `penyimak` boleh dihilangkan (undefined) → daftar penyimak tidak disentuh.
  //   v.1.2.1: + `pjGuru` — peta { [pjGuruId]: [guruId,…] } pembagian santri per PJ.
  //   undefined → tidak disentuh, sama seperti penyimak.
  async function savePeran({ koordinator, penyimak, pjGuru } = {}) {
    const m = await getOne('master', 'lembaga')
    const list = Array.isArray(m?.list) ? m.list.slice() : []
    const idx = list.findIndex((l) => (l.lembaga || l.nama) === PTPT_LEMBAGA)
    const patch = {}
    if (koordinator) {
      patch.koordinator_glondongan = _bersihkanPeran(koordinator)
      // Kosongkan field lama koordinator_kelas biar tak ada 2 sumber kebenaran.
      patch.koordinator_kelas = {}
    }
    if (penyimak) patch.penyimak_glondongan = _bersihkanPeran(penyimak)
    if (pjGuru) patch.pj_guru = _bersihkanPjGuru(pjGuru)
    if (idx >= 0) list[idx] = { ...list[idx], ...patch }
    else list.push({ lembaga: PTPT_LEMBAGA, ...patch })
    await mergeOne('master', 'lembaga', { list })
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsub = subscribeColl('tes_glondongan', (docs) => {
      rowsRaw.value = (docs || []).map((d) => ({
        ...d,
        _ts: d._ts || (d.tgl_daftar ? Date.parse(d.tgl_daftar) : 0)
      }))
      loaded.value = true
    })
    unsubL = subscribeDoc('master', 'lembaga', (doc) => {
      lembagaList.value = Array.isArray(doc?.list) ? doc.list : []
    })
    // v.1.1.9: id ajuan yang MASIH ADA — dipakai membuang baris glondongan yatim.
    //   Hanya id-nya yang disimpan (bukan seluruh dokumen) supaya ringan.
    unsubA = subscribeColl('tes_kenaikan', (docs) => {
      ajuanIds.value = new Set((docs || []).map((d) => String(d.id)))
    })
  })
  onUnmounted(() => {
    if (unsub) unsub()
    if (unsubL) unsubL()
    if (unsubA) unsubA()
  })

  return {
    loaded,
    rowsRaw, // mentah (termasuk yatim) — pemakai UI sebaiknya pakai `rows`
    rows, // v.1.1.9: sudah dibuang baris yatimnya
    barisYatim,
    bersihkanYatim,
    sesi,
    myId,
    myNama,
    isSuper,
    isPjPtpt,
    isAmpuanSaya, // v.1.1.9: predikat scope PJ (santriId) => boolean
    myKategori,
    koordinatorGlondongan,
    penyimakGlondongan, // v.1.1.9: daftar penyimak per kategori
    pjGuru, // v.1.2.1: peta { [pjGuruId]: [guruId] } pembagian santri per PJ
    bolehMenyimak,
    canAssign,
    canAssignAny,
    antrianTugas,
    antrianTertunda, // v.1.1.9: blok yang belum gilirannya
    tugasMenunggu,
    sudahDitugaskan, // v.1.1.9: blok ber-penyimak (utk kontak WA di tab Penugasan)
    tugasNilaiSaya,
    catatanSantri,
    rowsByAjuan,
    tugaskan,
    batalTugas,
    simpanNilai,
    canCrud,
    hapus,
    savePeran
  }
}
