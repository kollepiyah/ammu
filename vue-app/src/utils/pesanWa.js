// pesanWa.js — teks WhatsApp siap-pakai per konteks (SATU tempat untuk diedit).
// Dipakai bareng `waLink(nomor, pesan)` di utils/format.js → membuka WhatsApp dengan
// pesan sudah terisi. Semua fungsi PURE: terima data + `pondok` (nama lembaga), balik string.
//
// Kyai bisa mengubah gaya/wording di sini saja — semua tombol WA ikut berubah.

const SALAM = "Assalamu'alaikum Wr. Wb."

function _rp(n) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(Number(n) || 0))
}
function _ttd(pondok) {
  return pondok ? '\n\n— ' + pondok : ''
}

/** Tagihan → wali santri. */
export function pesanTagihan({ nama, kategori, nominal, periode, pondok } = {}) {
  const per = periode ? ` (${periode})` : ''
  return (
    `${SALAM}\n` +
    `Bapak/Ibu wali Ananda *${nama || '-'}*, kami sampaikan tagihan *${kategori || 'pembayaran'}* ` +
    `sebesar *${_rp(nominal)}*${per}. Mohon dapat diselesaikan. Terima kasih.` +
    _ttd(pondok)
  )
}

/** Tugas menyimak Glondongan PTPT → guru penyimak. */
export function pesanGlondongan({ guru, santri, juz, pondok } = {}) {
  return (
    `${SALAM}\n` +
    `Ustadz/Ustadzah *${guru || ''}*, Anda ditugaskan menyimak *${santri || '-'}*` +
    `${juz ? ' (' + juz + ')' : ''}. Mohon dapat dijadwalkan. Terima kasih, semoga sehat selalu.` +
    _ttd(pondok)
  )
}

/** Kontak guru kelas terkait glondongan santri (koordinasi, bukan penugasan). */
export function pesanKontakGlondongan({ guru, santri, juz, pondok } = {}) {
  return (
    `${SALAM}\n` +
    `Ustadz/Ustadzah *${guru || ''}*, terkait Ananda *${santri || '-'}*` +
    `${juz ? ' (' + juz + ')' : ''} — koordinasi glondongan PTPT. Terima kasih.` +
    _ttd(pondok)
  )
}

/** Jadwal menyimak Ceremonial PTPT → guru penyimak. */
export function pesanCeremonial({ guru, tanggal, jam, tempat, jumlah, pondok } = {}) {
  const waktu = [tanggal, jam].filter(Boolean).join(' ')
  return (
    `${SALAM}\n` +
    `Ustadz/Ustadzah *${guru || ''}*, jadwal menyimak seremonial` +
    `${waktu ? ' *' + waktu + '*' : ''}${tempat ? ' di *' + tempat + '*' : ''}` +
    `${jumlah ? ', ' + jumlah + ' peserta' : ''}. Terima kasih.` +
    _ttd(pondok)
  )
}

/** Hasil tes kenaikan → wali santri. */
export function pesanTesHasil({ nama, hasil, asal, target, pondok } = {}) {
  const arah = [asal, target].filter(Boolean).join(' → ')
  return (
    `${SALAM}\n` +
    `Bapak/Ibu wali Ananda *${nama || '-'}*, hasil tes kenaikan: *${hasil || '-'}*` +
    `${arah ? ' (' + arah + ')' : ''}. Terima kasih.` +
    _ttd(pondok)
  )
}

/** Ajuan tes → penguji (koordinasi jadwal menguji). */
export function pesanTesPenguji({ penguji, santri, target, pondok } = {}) {
  return (
    `${SALAM}\n` +
    `Ustadz/Ustadzah *${penguji || ''}*, mohon kesediaan menguji tes kenaikan *${santri || '-'}*` +
    `${target ? ' → ' + target : ''}. Terima kasih, semoga sehat selalu.` +
    _ttd(pondok)
  )
}
