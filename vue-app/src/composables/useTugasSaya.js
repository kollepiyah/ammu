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

const KOSONG = { terjadwal: [], perlu: [], total: 0 }

export function useTugasSaya({ horizonHari = 7, maksWidget = 3 } = {}) {
  const auth = useAuthStore()
  const hasil = ref({ ...KOSONG })
  const memuat = ref(false)
  const galat = ref('')

  const myId = computed(() => String(auth.sesiAktif?.id ?? ''))
  // Hanya guru yang punya "tugas" dalam arti ini. Wali santri & santri tak perlu kartunya.
  const berlaku = computed(() => auth.sesiAktif?.role === 'guru' && !!myId.value)

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
