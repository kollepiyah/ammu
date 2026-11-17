// jejakHampa — event mesin yang BUKAN absen: mana yang layak satu baris sendiri, mana yang
// cukup jadi denyut.
//
// Kyai 17 Nov 2026, sesudah kueri 5 dijalankan: dari 31.129 baris `hiview_scan_log`, **22.317
// (72%) adalah event hampa** — `AccessControllerEvent` major=5 tanpa employeeNo, tanpa cardNo,
// tanpa minorEventType. Datangnya ±227/hari sejak 6 Agu 2026 dan tak pernah berhenti; tanggalnya
// kosong, jadi ia tak muncul di panel Jejak Mesin mana pun, cuma menggelembungkan tabel (9,5 MB)
// dan mengaburkan hitungan "berapa scan sebenarnya".
//
// TAPI JANGAN DIBUANG HABIS. Spanduk "mesin HiView diam" (utils/mesinDiam, lahir dari insiden
// 24 Sep 2026) membaca SATU baris terbaru `hiview_scan_log` menurut `created_at` tanpa menyaring
// hasil — event hampa inilah denyut yang membuktikan mesin masih hidup. Kalau semuanya disaring,
// hari kerja yang kebetulan belum ada guru menempel sampai jamMulai+2 jam akan berteriak "mesin
// diam" (alarm palsu), dan mesin yang jaringannya hidup tapi pembacanya mati jadi tak terbedakan
// dari mesin yang mati total.
//
// Jalan tengahnya: event hampa dilipat jadi **satu baris per JAM mesin** lewat id denyut +
// upsert yang sudah ada. Denyut tetap ada (maksimal 24 baris/hari, nyatanya belasan di jam
// kerja), ±227 baris/hari susut jadi hitungan jari.

/**
 * Event hampa = tak membawa keterangan apa pun yang bisa ditindaklanjuti.
 *
 * Yang BERISI tetap dicatat utuh satu baris per event:
 *  - `cardNo` → nomor kartu belum terdaftar; inilah satu-satunya cara tahu nomor versi mesin
 *    tanpa menebak urutan byte UID (v.1.5.0, kartu e-Qiraati).
 *  - `minorEventType` → kode sebab Hikvision (mis. kartu tak dikenal, wajah gagal); dipakai
 *    saat mendiagnosa "sudah menempel tapi tak terbaca".
 */
export function hampaTanpaKeterangan(kartu: unknown, minor: unknown): boolean {
  const adaKartu = String(kartu ?? '').trim() !== ''
  const adaMinor = minor !== null && minor !== undefined && String(minor).trim() !== ''
  return !adaKartu && !adaMinor
}

/**
 * Id denyut: satu baris per jam waktu MESIN ('YYYYMMDDHH'). Event hampa berikutnya di jam yang
 * sama menimpa baris itu (upsert `onConflict: id`), bukan menambah baris baru.
 *
 * Mengembalikan '' bila cap waktu mesin tak cukup untuk menentukan jam — pemanggil lalu memakai
 * id biasa, sebab lebih baik satu baris berlebih daripada denyut yang hilang.
 */
export function idDenyutJam(dateTime: unknown): string {
  const digit = String(dateTime ?? '').replace(/\D/g, '')
  return digit.length >= 10 ? `hv_denyut_${digit.slice(0, 10)}` : ''
}
