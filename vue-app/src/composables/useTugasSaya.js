// v.1.5.0 (gelombang 3) — penarik data kartu "Tugas Saya".
//
// Penyusunan daftarnya ada di utils/tugasSaya.js (pure + diuji); di sini MURNI penarikan.
// Sengaja TANPA realtime: beranda dibuka semua orang tiap hari, dan channel realtime di
// beranda pernah jadi biang lonjakan egress Supabase. Cukup tarik sekali saat beranda
// terbuka, lalu dorong hasil yang SAMA ke widget Android.
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { queryColl } from '@/services/db'
import { todayJakarta } from '@/utils/format'
import { susunTugasSaya, geserHari, ringkasUntukWidget } from '@/utils/tugasSaya'
import { pushWidgetData } from '@/composables/useWidgetSync'
import { pastikanTokenWidget } from '@/composables/useWidgetToken'

const KOSONG = { terjadwal: [], perlu: [], total: 0 }

// Widget cuma memajang 3 baris, tapi yang DIKIRIM jauh lebih banyak dengan sengaja:
// widget hanya dapat data baru saat beranda dibuka, dan ia menyaring sendiri baris yang sudah
// lewat. Dengan bekal sepekan penuh, widget tetap benar berhari-hari sesudah app terakhir
// dibuka — baris hari ini habis, besok naik menggantikan. Kalau cuma dikirim 3, widget kosong
// begitu ketiganya lewat walau sebenarnya masih ada piket lusa.
const MUATAN_WIDGET = 12

export function useTugasSaya({ horizonHari = 7, maksWidget = MUATAN_WIDGET } = {}) {
  const auth = useAuthStore()
  const hasil = ref({ ...KOSONG })
  const memuat = ref(false)
  const galat = ref('')

  const myId = computed(() => String(auth.sesiAktif?.id ?? ''))
  // Guru DAN admin. Santri & wali santri tak punya "tugas" dalam arti ini, jadi tetap tidak.
  //
  // Kyai 17 Nov 2026: mulanya guru saja, lalu Kyai meminta dibuka — dengan akun sendiri ia tak
  //   bisa melihat kartunya, padahal ia juga mengampu dan ingin memeriksa jadwalnya tanpa
  //   meminjam akun guru. Pencocokannya tetap `guru_id == id sesi`, jadi akun admin yang bukan
  //   pengampu (mis. admin bawaan ber-id 'admin') akan melihat kartu bertulis "belum ada tugas"
  //   — benar, bukan gagal.
  const berlaku = computed(() => ['guru', 'admin'].includes(auth.sesiAktif?.role) && !!myId.value)

  async function muat() {
    if (!berlaku.value) {
      hasil.value = { ...KOSONG }
      return
    }
    const me = myId.value
    const hariIni = todayJakarta()
    const mundur = geserHari(hariIni, -horizonHari)
    memuat.value = true
    galat.value = ''
    try {
      // Seremonial tak bisa disaring di server (penyimak ada di ekor jsonb), jadi ditarik
      // yang akan datang saja lalu disaring di utils. Jumlahnya sedikit.
      const [jadwalLaju, capaianLaju, seremonial, glondongan, tesSekolah] = await Promise.all([
        queryColl('pondok_laju_jadwal', [
          ['guru_id', '==', me],
          ['tanggal', '>=', mundur]
        ]),
        queryColl('pondok_laju_capaian', [
          ['guru_id', '==', me],
          ['tanggal', '>=', mundur]
        ]),
        queryColl('ceremonial_ptpt', [['tanggal', '>=', hariIni]]),
        queryColl('tes_glondongan', [['penguji_id', '==', me]]),
        queryColl('tes_sekolah', [['penguji_id', '==', me]])
      ])
      hasil.value = susunTugasSaya({
        guruId: me,
        hariIni,
        horizonHari,
        jadwalLaju,
        capaianLaju,
        seremonial,
        glondongan,
        tesSekolah
        // izinMenunggu & inputBulananBelum belum disambungkan — lihat CHANGELOG gelombang 3.
      })
      // Widget home screen Android memakai daftar yang SAMA, bukan hitungan sendiri.
      pushWidgetData({ tugas: JSON.stringify(ringkasUntukWidget(hasil.value, maksWidget)) })
      // v.1.5.0: sekalian pastikan perangkat ini punya token, supaya widget bisa menarik
      //   sendiri di antara dua kali aplikasi dibuka. Gagal = widget tetap jalan seperti
      //   sebelumnya, jadi sengaja tak ditunggu dan tak dilaporkan.
      pastikanTokenWidget()
    } catch (e) {
      // Beranda tak boleh ikut mati gara-gara satu kartu; cukup tampilkan pesan.
      galat.value = 'Daftar tugas gagal dimuat.'
      hasil.value = { ...KOSONG }
    } finally {
      memuat.value = false
    }
  }

  onMounted(muat)

  return { hasil, memuat, galat, muat, berlaku }
}
