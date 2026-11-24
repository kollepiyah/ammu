// stores/tugasSaya.js — data mentah "Tugas Saya", ditarik SEKALI dan dipakai dua pembaca:
// kartu beranda (daftar tugas) dan sidebar (menu Pondok Laju/Seremonial/Glondongan hanya
// untuk guru yang punya tugas — Kyai 18 Nov 2026). Satu tarikan untuk keduanya supaya
// membuka beranda tak menggandakan kueri. Aturan penyusunan tetap di utils/tugasSaya.js.
//
// Sengaja TANPA realtime: channel realtime di beranda pernah jadi biang lonjakan egress.
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCollectionsStore } from '@/stores/collections'
import { queryColl, getOne } from '@/services/db'
import { todayJakarta } from '@/utils/format'
import {
  susunTugasSaya,
  aksesMenuTugas,
  aksesPenuhTugas,
  geserHari,
  ringkasUntukWidget
} from '@/utils/tugasSaya'
import { pushWidgetData } from '@/composables/useWidgetSync'
import { pastikanTokenWidget } from '@/composables/useWidgetToken'

const HORIZON_HARI = 7
// Beranda dibuka berulang dalam satu sesi; tarikan yang baru <30 dtk dipakai ulang.
const JEDA_SEGAR_MS = 30_000
// Widget cuma memajang 3 baris, tapi dibekali sepekan: ia hanya dapat data baru saat beranda
// dibuka dan menyaring sendiri baris yang lewat, jadi tetap benar berhari-hari.
const MUATAN_WIDGET = 12

const KOSONG = { terjadwal: [], perlu: [], total: 0 }
const SEMUA = { pondokLaju: true, seremonial: true, glondongan: true }
const TUTUP = { pondokLaju: false, seremonial: false, glondongan: false }

export const useTugasSayaStore = defineStore('tugasSaya', () => {
  const auth = useAuthStore()
  const collections = useCollectionsStore()

  const mentah = ref(null)
  const pemilik = ref('') // id akun pemilik `mentah` — data akun lain tak boleh terbaca
  const hariIni = ref('')
  const memuat = ref(false)
  const galat = ref('')
  let _waktu = 0
  let _janji = null

  const sesi = computed(() => auth.sesiAktif || null)
  const myId = computed(() => String(sesi.value?.id ?? ''))
  // Guru DAN admin (Kyai 17 Nov: admin yang mengampu juga ingin melihat jadwalnya).
  const berlaku = computed(() => ['guru', 'admin'].includes(sesi.value?.role) && !!myId.value)
  const milikSaya = computed(() => !!mentah.value && pemilik.value === myId.value)

  async function _tarik(me) {
    const hari = todayJakarta()
    const mundur = geserHari(hari, -HORIZON_HARI)
    const penuh = aksesPenuhTugas(sesi.value)
    // Guru biasa butuh santri (guru kelas Pondok Laju) — langganan bersama yang sama dengan
    // pencarian global, jadi tak menambah tarikan.
    if (!penuh) collections.ensure('santri')
    const [jadwalLaju, capaianLaju, seremonial, glondongan, tesSekolah, lembaga] =
      await Promise.all([
        queryColl('pondok_laju_jadwal', [
          ['guru_id', '==', me],
          ['tanggal', '>=', mundur]
        ]),
        queryColl('pondok_laju_capaian', [
          ['guru_id', '==', me],
          ['tanggal', '>=', mundur]
        ]),
        // Penyimak ada di ekor jsonb → disaring di utils; yang akan datang saja, jumlahnya sedikit.
        queryColl('ceremonial_ptpt', [['tanggal', '>=', hari]]),
        // Yang sudah selesai tak pernah dihitung — jangan ikut ditarik (hemat egress).
        queryColl('tes_glondongan', [
          ['penguji_id', '==', me],
          ['status', '!=', 'selesai']
        ]),
        queryColl('tes_sekolah', [
          ['penguji_id', '==', me],
          ['status', '!=', 'selesai']
        ]),
        // Peran koordinator & Admin Pondok Laju ada di master/lembaga; admin tak butuh.
        penuh ? null : getOne('master', 'lembaga').catch(() => null)
      ])
    return {
      hari,
      data: {
        jadwalLaju,
        capaianLaju,
        seremonial,
        glondongan,
        tesSekolah,
        lembagaList: Array.isArray(lembaga?.list) ? lembaga.list : []
      }
    }
  }

  async function muat({ paksa = false } = {}) {
    if (!berlaku.value) {
      mentah.value = null
      pemilik.value = ''
      return
    }
    const me = myId.value
    if (_janji && pemilik.value === me) return _janji
    if (!paksa && milikSaya.value && Date.now() - _waktu < JEDA_SEGAR_MS) return
    memuat.value = true
    galat.value = ''
    if (pemilik.value !== me) mentah.value = null // jangan pinjamkan data akun sebelumnya
    pemilik.value = me
    _janji = (async () => {
      try {
        const { hari, data } = await _tarik(me)
        if (myId.value !== me) return // akun berganti di tengah jalan
        hariIni.value = hari
        mentah.value = data
        _waktu = Date.now()
        // Widget Android memakai daftar yang SAMA, bukan hitungan sendiri.
        pushWidgetData({ tugas: JSON.stringify(ringkasUntukWidget(hasil.value, MUATAN_WIDGET)) })
        // Perangkat ini butuh token supaya widget bisa menarik sendiri; gagal = tak apa.
        pastikanTokenWidget()
      } catch (e) {
        // Beranda tak boleh ikut mati gara-gara satu kartu.
        galat.value = 'Daftar tugas gagal dimuat.'
        mentah.value = null
      } finally {
        memuat.value = false
        _janji = null
      }
    })()
    return _janji
  }

  const hasil = computed(() => {
    if (!milikSaya.value) return { ...KOSONG }
    const m = mentah.value
    return susunTugasSaya({
      guruId: myId.value,
      hariIni: hariIni.value,
      horizonHari: HORIZON_HARI,
      jadwalLaju: m.jadwalLaju,
      capaianLaju: m.capaianLaju,
      seremonial: m.seremonial,
      glondongan: m.glondongan,
      tesSekolah: m.tesSekolah
      // izinMenunggu & inputBulananBelum belum disambungkan — lihat CHANGELOG v.1.5.0 gelombang 3.
    })
  })

  const akses = computed(() => {
    if (aksesPenuhTugas(sesi.value)) return SEMUA
    // Gagal muat → menu tetap dibuka: lebih baik terlalu terbuka sebentar daripada penyimak
    //   kehilangan pintu ke tugasnya. Rute & datanya sendiri memang tak dikunci.
    if (galat.value) return SEMUA
    if (!milikSaya.value) return TUTUP
    const m = mentah.value
    return aksesMenuTugas({
      sesi: sesi.value,
      hariIni: hariIni.value,
      horizonHari: HORIZON_HARI,
      lembagaList: m.lembagaList,
      santriList: collections.santri,
      jadwalLaju: m.jadwalLaju,
      seremonial: m.seremonial,
      glondongan: m.glondongan
    })
  })

  function kosongkan() {
    mentah.value = null
    pemilik.value = ''
    galat.value = ''
    _waktu = 0
  }

  return { hasil, hariIni, akses, memuat, galat, berlaku, muat, kosongkan }
})
