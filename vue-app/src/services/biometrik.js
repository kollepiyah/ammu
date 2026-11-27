// Biometrik untuk kunci aplikasi — satu pintu untuk dua platform (Kyai 25 Nov 2026):
//   · Android (Capacitor): @capgo/capacitor-native-biometric — sidik jari/wajah sistem HP.
//   · PWA/web: WebAuthn platform authenticator (Face ID / sidik jari / kunci layar perangkat).
// Ini KUNCI LAYAR untuk sesi yang sudah masuk, bukan login: tak ada rahasia yang disimpan atau
// dikirim ke server. Pada WebAuthn, keberhasilan navigator.credentials.get dengan
// userVerification 'required' sudah berarti pemilik perangkat lolos verifikasi biometrik.

const KUNCI_KREDENSIAL = 'ammu_kunci_webauthn_'

function diAndroid() {
  try {
    const C = window.Capacitor
    return !!C?.isNativePlatform?.() && C.getPlatform?.() === 'android'
  } catch {
    return false
  }
}

async function plugin() {
  const { NativeBiometric } = await import('@capgo/capacitor-native-biometric')
  return NativeBiometric
}

const keB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)))
const dariB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))
const acak = (n) => crypto.getRandomValues(new Uint8Array(n))

/** Bisa dipakai di perangkat ini? → { ok, label, alasan } */
export async function cekBiometrik() {
  if (diAndroid()) {
    try {
      const r = await (await plugin()).isAvailable({ useFallback: false })
      if (r?.isAvailable) return { ok: true, label: 'sidik jari / wajah' }
      return {
        ok: false,
        alasan:
          r?.errorCode === 3
            ? 'Belum ada sidik jari/wajah terdaftar di HP ini. Daftarkan dulu di Setelan HP.'
            : 'HP ini tidak mendukung sidik jari/wajah.'
      }
    } catch {
      return { ok: false, alasan: 'Sensor biometrik tidak terbaca.' }
    }
  }
  try {
    const ada =
      !!window.PublicKeyCredential &&
      (await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())
    return ada
      ? { ok: true, label: 'Face ID / sidik jari' }
      : { ok: false, alasan: 'Perangkat ini tidak punya Face ID/sidik jari untuk aplikasi web.' }
  } catch {
    return { ok: false, alasan: 'Perangkat ini tidak mendukung kunci biometrik.' }
  }
}

/** Aktifkan untuk pengguna `uid`: daftar kredensial (web) / verifikasi sekali (Android). */
export async function daftarkanBiometrik(uid, nama) {
  if (diAndroid()) return verifikasiBiometrik(uid)
  const kred = await navigator.credentials.create({
    publicKey: {
      challenge: acak(32),
      rp: { name: 'Ammu Online', id: location.hostname },
      user: { id: acak(16), name: String(nama || uid), displayName: String(nama || uid) },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 }
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'discouraged'
      },
      attestation: 'none',
      timeout: 60000
    }
  })
  if (!kred) return false
  localStorage.setItem(KUNCI_KREDENSIAL + uid, keB64(kred.rawId))
  return true
}

/** Minta verifikasi pemilik. true = lolos; false = batal/gagal. */
export async function verifikasiBiometrik(uid) {
  if (diAndroid()) {
    try {
      await (
        await plugin()
      ).verifyIdentity({
        title: 'Buka Ammu Online',
        subtitle: 'Pakai sidik jari atau wajah',
        reason: 'Buka Portal Ammu Online',
        negativeButtonText: 'Batal',
        maxAttempts: 5
      })
      return true
    } catch {
      return false
    }
  }
  const id = localStorage.getItem(KUNCI_KREDENSIAL + uid)
  if (!id) return false
  try {
    const hasil = await navigator.credentials.get({
      publicKey: {
        challenge: acak(32),
        allowCredentials: [{ type: 'public-key', id: dariB64(id) }],
        userVerification: 'required',
        timeout: 60000
      }
    })
    return !!hasil
  } catch {
    return false
  }
}

/** Nonaktifkan: buang kredensial lokal (web). Kredensial di perangkat tak berguna tanpa id ini. */
export function lupakanBiometrik(uid) {
  try {
    localStorage.removeItem(KUNCI_KREDENSIAL + uid)
  } catch {
    /* noop */
  }
}
