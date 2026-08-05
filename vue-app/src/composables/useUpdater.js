// useUpdater — cek pembaruan IN-APP (Electron autoUpdater), tanpa buka web.
// Alur: check -> ada? konfirm Unduh -> selesai unduh? konfirm Pasang. Tak ada? toast "terbaru".
//
// v.1.2.8 (Kyai, 5 Agu 2026: "di electron update otomatis langsung dari app, di beberapa
// PC tidak bisa"). Dulu setiap kegagalan menjadi satu toast buta: "Gagal memeriksa
// pembaruan". Tak ada versi, tak ada sebab, tak ada jalan keluar — jadi PC yang benar-benar
// bermasalah tak bisa dibedakan dari PC yang jaringannya sedang mati.
//
// Sebab utamanya sudah ditambal di config (win.publisherName dibuang: installer belum
// bersertifikat, sedang electron-updater memverifikasi tanda tangan Authenticode dan
// menolak update yang "tidak bertanda tangan pemilik aplikasi"). TAPI tambalan itu hanya
// berlaku untuk build BARU: PC yang sekarang sudah terpasang membawa app-update.yml lama
// di dalam dirinya, jadi ia akan tetap menolak sekali lagi. Karena itu di sini disediakan:
//   1) pesan galat ASLI, supaya sebabnya kelihatan;
//   2) versi terpasang — PC berversi skema lama (mis. 110.0.626) TAK AKAN PERNAH ditawari
//      update karena semver menilai 110 > 1.2.x;
//   3) tombol jalan keluar: buka halaman rilis untuk pasang manual sekali.
import { useUiStore } from '@/stores/ui'

let _wired = false

const HALAMAN_RILIS = 'https://github.com/kollepiyah/ammu/releases/latest'

function getApi() {
  try {
    return window.electronAPI || null
  } catch (e) {
    return null
  }
}

// Versi berskema LAMA (110.x, pernah rilis sebelum penomoran turun ke 1.1.x). Untuk PC
// ini electron-updater tak akan pernah menawarkan apa pun — 110 > 1.2.x menurut semver.
// Diekspor supaya ambangnya terjaga tes (kalau salah, PC lama kembali diberi kabar
// "sudah terbaru" dan tak ada yang tahu ia tertinggal).
export function versiSkemaLama(v) {
  const mayor = Number(String(v || '').split('.')[0])
  return Number.isFinite(mayor) && mayor >= 100
}

export function useUpdater() {
  const ui = useUiStore()
  const api = getApi()

  function bukaRilis() {
    try {
      window.open(HALAMAN_RILIS, '_blank')
    } catch (e) {
      /* ignore */
    }
  }

  // Tawarkan pemasangan manual — satu-satunya jalan bagi PC yang updater otomatisnya
  // memang tak bisa jalan (versi skema lama / app-update.yml lama yang masih
  // memverifikasi tanda tangan).
  async function tawarkanManual(judul, pesan) {
    const ok = await ui.confirm({
      title: judul,
      message: pesan + '\n\nBuka halaman unduhan untuk memasang versi terbaru secara manual?',
      confirmText: 'Buka Halaman Unduhan',
      cancelText: 'Nanti',
      danger: false
    })
    if (ok) bukaRilis()
  }

  function wire() {
    if (_wired || !api?.onUpdateStatus) return
    _wired = true
    api.onUpdateStatus(async (s) => {
      if (!s) return
      if (s.status === 'available') {
        const ok = await ui.confirm({
          title: 'Pembaruan tersedia',
          message: `Versi ${s.version || 'baru'} tersedia. Unduh sekarang?`,
          confirmText: 'Unduh',
          cancelText: 'Nanti',
          danger: false
        })
        if (ok) {
          ui.toast.info('Mengunduh pembaruan…')
          try {
            api.downloadUpdate?.()
          } catch (e) {
            /* ignore */
          }
        }
      } else if (s.status === 'none') {
        // "Sudah terbaru" bisa PALSU di PC berversi skema lama: updater membandingkan
        // 110.x dengan 1.2.x dan menyimpulkan yang lama lebih baru. Jangan diamkan.
        const info = await ambilInfo()
        if (info && versiSkemaLama(info.version)) {
          await tawarkanManual(
            'Perlu pasang manual sekali',
            `PC ini memakai versi ${info.version}, yang penomorannya lebih tinggi daripada versi ` +
              `terbaru (1.2.x) menurut aturan semver. Karena itu pembaruan otomatis tak akan ` +
              `pernah ditawarkan di PC ini sampai dipasang manual satu kali.`
          )
          return
        }
        ui.toast.success('Aplikasi sudah versi terbaru')
      } else if (s.status === 'downloaded') {
        const ok = await ui.confirm({
          title: 'Pembaruan siap',
          message: `Versi ${s.version || ''} siap dipasang. Pasang & mulai ulang sekarang?`,
          confirmText: 'Pasang Sekarang',
          cancelText: 'Nanti',
          danger: false
        })
        if (ok) {
          try {
            api.installUpdate?.()
          } catch (e) {
            /* ignore */
          }
        }
      } else if (s.status === 'error') {
        const info = await ambilInfo()
        const sebab = String(s.message || '').trim()
        // Pola galat yang khas: verifikasi tanda tangan installer (app-update.yml lama).
        const soalTandaTangan = /not signed|signature|publisherName|Authenticode/i.test(sebab)
        await tawarkanManual(
          'Pembaruan otomatis gagal',
          (info ? `Versi terpasang: ${info.version}\n` : '') +
            (sebab ? `Sebab: ${sebab}\n` : '') +
            (soalTandaTangan
              ? '\nPemeriksaan tanda tangan installer menolak berkasnya. Ini sudah dibetulkan ' +
                'untuk versi berikutnya, tapi PC ini perlu dipasang manual satu kali lebih dulu.'
              : '')
        )
      }
    })
  }

  async function ambilInfo() {
    try {
      const r = await api?.updateInfo?.()
      return r?.ok ? r : null
    } catch (e) {
      return null
    }
  }

  function check() {
    if (!api?.checkUpdate) {
      ui.toast.info('Cek pembaruan hanya tersedia di aplikasi desktop')
      return
    }
    ui.toast.info('Memeriksa pembaruan…')
    try {
      api.checkUpdate()
    } catch (e) {
      ui.toast.error('Gagal memeriksa pembaruan: ' + (e?.message || e))
    }
  }

  return { wire, check, bukaRilis }
}
