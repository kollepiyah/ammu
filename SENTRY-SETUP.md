# Sentry Setup — Portal MU

**Status:** PLACEHOLDER DSN di code. Kyai perlu replace agar error tracking aktif.

---

## 1. Kenapa Sentry?

Sentry adalah layanan error tracking gratis (5,000 errors/bulan untuk tier free). Tanpa Sentry, kalau ada error di HP santri/wali, Kyai tidak akan tahu sampai mereka lapor manual. Dengan Sentry, setiap error otomatis terkirim ke dashboard dengan stack trace + context (browser, URL, user yang kena, dll).

## 2. Cara dapat DSN

1. Sign up di [https://sentry.io](https://sentry.io) (pakai email Kyai)
2. Create new project → pilih platform **JavaScript** → **Browser**
3. Beri nama project: `portal-mu` atau `ammu-online`
4. Setelah create, Sentry akan kasih DSN format:
   ```
   https://abcd1234xxxxxxxxxxxxxxxx@o123456.ingest.sentry.io/1234567
   ```
5. Copy DSN tersebut.

## 3. Replace placeholder

Buka file `public/index.html`, cari string:

```
const SENTRY_DSN = 'PLACEHOLDER_DSN_KYAI_REPLACE'
```

Ganti jadi DSN asli:

```js
const SENTRY_DSN = 'https://abcd1234@o123456.ingest.sentry.io/1234567'
```

Setelah replace, init guard otomatis lewat (gate: `SENTRY_DSN.indexOf('PLACEHOLDER') === -1`).

## 4. Verifikasi

Setelah deploy, buka portal di browser, trigger error sengaja (mis. login dengan password salah berkali-kali). Cek di Sentry dashboard — harus muncul event dalam < 1 menit.

## 5. Konfigurasi yang sudah di-set di code

```js
Sentry.init({
  dsn: SENTRY_DSN,
  release: APP_VERSION, // auto-tag release per versi
  environment: 'production',
  tracesSampleRate: 0.1, // 10% transactions untuk performance
  beforeSend(event) {
    // Skip error dari localhost (dev env)
    if (event.request?.url?.includes('localhost')) return null
    return event
  }
})
```

## 6. Yang di-track

`captureToSentry()` dipanggil di lokasi kritis:

| Lokasi                               | Context                                   |
| ------------------------------------ | ----------------------------------------- |
| `initApp()` catch                    | `{ where: 'initApp' }`                    |
| `simpanGuru()` catch                 | `{ where: 'simpanGuru' }`                 |
| `simpanSantri()` catch               | `{ where: 'simpanSantri' }`               |
| `simpanRaporSantri()` predikat catch | `{ where: 'simpanRaporSantri.predikat' }` |
| Auth signIn catch                    | `{ where: 'auth.signIn', code }`          |
| Auth Google link catch               | `{ where: 'auth.linkGoogle', code }`      |

Untuk tambah location: panggil `captureToSentry(err, { where: 'nama-fitur' })` di catch block manapun. Wrapper aman kalau DSN belum di-set (silent no-op).

## 7. Free tier limit

- 5,000 errors/bulan (cukup untuk beta internal testing)
- 1 user (Kyai)
- Email alert kalau ada error baru
- 30 hari retention

Cukup untuk tahap beta. Upgrade ke paid kalau release publik > 1000 user aktif.

## 8. Privacy

`beforeSend` filter sudah skip localhost. Untuk filter data sensitif (mis. password field), bisa tambah di `beforeSend`:

```js
beforeSend(event) {
  if (event.request?.url?.includes('localhost')) return null
  // Scrub password fields dari breadcrumb
  if (event.breadcrumbs) {
    event.breadcrumbs.forEach(b => {
      if (b.data?.password) b.data.password = '[REDACTED]'
    })
  }
  return event
}
```

---

**TL;DR:** Sign up Sentry → copy DSN → replace `PLACEHOLDER_DSN_KYAI_REPLACE` di `public/index.html`.
