import {
  ab as ne,
  ae as ie,
  L as o,
  h as i,
  e,
  j as y,
  F as Q,
  U as H,
  E as q,
  a4 as n,
  f as J,
  at as xe,
  ar as E,
  ak as V,
  g as I,
  ag as pe,
  T as fe,
  d as j,
  Q as G,
  a9 as R,
  O as ke,
  B as de,
  a6 as ue,
  $ as ve,
  i as ye,
  k as te,
  a7 as ee,
  I as he,
  an as we,
  v as re
} from './index-CPbTnm_Q.js'
import { _ as X } from './logo-CxXS7KxG.js'
import { u as ce } from './useToast-BjwjYk11.js'
import { u as be } from './useConfirm-DjSfx6QZ.js'
import { uploadBase64 as oe } from './storage-BBNevPRC.js'
import { g as _e, c as z, h as $e } from './format-BMPXVxa_.js'
import { g as je } from './kenaikan-DcnKGnb3.js'
const Se = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 dark:border-slate-700'
  },
  Ae = { class: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' },
  Ge = ['onClick'],
  Pe = { class: 'text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate' },
  Be = { class: 'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-5' },
  Le = { key: 0 },
  Ue = { class: 'space-y-2' },
  Ce = { key: 1 },
  Te = ['disabled'],
  Ne = { key: 2 },
  Ie = { key: 0, class: 'text-xs text-slate-500 dark:text-slate-400 mt-2' },
  Me = { key: 1, class: 'text-xs text-emerald-600 mt-2' },
  Fe = { key: 2, class: 'text-xs text-rose-600 mt-2' },
  Ke = { key: 3 },
  De = { key: 4 },
  Ee = { key: 5 },
  Oe = ['disabled'],
  We = { key: 6 },
  Ve = { key: 0, class: 'mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg' },
  Re = { class: 'text-sm font-bold text-emerald-700' },
  qe = { key: 1, class: 'text-sm text-slate-700 dark:text-slate-200' },
  ze = ['disabled'],
  Qe = ['disabled'],
  He = { key: 7 },
  Je = {
    class: 'flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg cursor-pointer'
  },
  Xe = { key: 8 },
  Ye = {
    class: 'flex justify-end gap-2 mt-5 pt-3 border-t border-slate-200 dark:border-slate-700'
  },
  Ze = ['disabled'],
  et = ['disabled'],
  tt = ['disabled'],
  at = ['disabled'],
  st = ['disabled'],
  ae = {
    __name: 'ProfilPengaturanSaya',
    props: {
      role: { type: String, default: 'admin' },
      entityId: { type: [String, Number], default: null },
      entity: { type: Object, default: () => ({}) }
    },
    emits: ['updated'],
    setup(g, { emit: k }) {
      const l = g,
        S = k
      ne()
      const $ = ie(),
        m = ce(),
        U = be(),
        v = G(null),
        b = G(!1),
        s = j(() => {
          var t, A, h, c, D, se, le
          return [
            {
              id: 'sandi',
              icon: 'fa-key',
              color: 'blue',
              title: 'Ganti Kata Sandi',
              desc: 'Update password login',
              roles: ['admin', 'guru', 'santri']
            },
            {
              id: 'foto',
              icon: 'fa-camera',
              color: 'emerald',
              title: 'Ganti Foto Profil',
              desc: 'Upload foto baru',
              roles: ['admin', 'guru', 'santri']
            },
            {
              id: 'username',
              icon: 'fa-at',
              color: 'purple',
              title: 'Username',
              desc: ((t = l.entity) == null ? void 0 : t.username) || '-',
              roles: ['admin', 'guru', 'santri']
            },
            {
              id: 'wa',
              icon: 'fa-whatsapp',
              iconClass: 'fab',
              color: 'green',
              title: 'No. WhatsApp',
              desc: ((A = l.entity) == null ? void 0 : A.wa) || 'Belum diisi',
              roles: ['admin', 'guru']
            },
            {
              id: 'wa_wali',
              icon: 'fa-whatsapp',
              iconClass: 'fab',
              color: 'green',
              title: 'No. WhatsApp Wali',
              desc: ((h = l.entity) == null ? void 0 : h.wa) || 'Belum diisi',
              roles: ['santri']
            },
            {
              id: 'ttd',
              icon: 'fa-signature',
              color: 'rose',
              title: 'Tanda Tangan Digital',
              desc: 'Upload PNG transparan untuk rapor',
              roles: ['guru']
            },
            {
              id: 'ekgq',
              icon: 'fa-id-card',
              color: 'cyan',
              title: 'No. Syahadah Qiraati',
              desc:
                ((c = l.entity) == null ? void 0 : c.ekgq) ||
                ((D = l.entity) == null ? void 0 : D.no_syahadah) ||
                'Belum diisi',
              roles: ['guru']
            },
            {
              id: 'google',
              icon: 'fa-google',
              iconClass: 'fab',
              color: 'red',
              title: 'Tautkan Akun Google',
              desc:
                ((se = l.entity) == null ? void 0 : se.linked_email) ||
                ((le = l.entity) == null ? void 0 : le.google_email) ||
                'Belum tertaut',
              roles: ['admin', 'guru', 'santri']
            },
            {
              id: 'notif',
              icon: 'fa-bell',
              color: 'amber',
              title: 'Notifikasi',
              desc: 'Aktifkan push notification',
              roles: ['admin', 'guru', 'santri']
            }
          ].filter((me) => me.roles.includes(l.role))
        }),
        r = G({ lama: '', baru: '', konfirmasi: '' }),
        x = G({ uploading: !1, dataUrl: '' }),
        p = G({ value: '', checking: !1, available: null }),
        L = G({ value: '' }),
        C = G({ uploading: !1, dataUrl: '' }),
        u = G({ enabled: !0 }),
        a = G({ value: '' })
      function P(d) {
        var t, A, h, c, D
        ;((v.value = d),
          d === 'username' &&
            (p.value.value = ((t = l.entity) == null ? void 0 : t.username) || ''),
          (d === 'wa' || d === 'wa_wali') &&
            (L.value.value = ((A = l.entity) == null ? void 0 : A.wa) || ''),
          d === 'ekgq' &&
            (a.value.value =
              ((h = l.entity) == null ? void 0 : h.ekgq) ||
              ((c = l.entity) == null ? void 0 : c.no_syahadah) ||
              ''),
          d === 'notif' &&
            (u.value.enabled = ((D = l.entity) == null ? void 0 : D.notifEnabled) !== !1))
      }
      function _() {
        ;((v.value = null),
          (r.value = { lama: '', baru: '', konfirmasi: '' }),
          (x.value = { uploading: !1, dataUrl: '' }),
          (C.value = { uploading: !1, dataUrl: '' }))
      }
      async function M() {
        var d
        if (r.value.baru.length < 4) return m.error('Password minimal 4 karakter')
        if (r.value.baru !== r.value.konfirmasi) return m.error('Konfirmasi tidak cocok')
        b.value = !0
        try {
          if (l.role === 'admin') {
            const t = $.settings.adminPassword || '1234'
            if (r.value.lama !== t) {
              m.error('Password lama salah')
              return
            }
            ;(await ve('settings', 'general', { ...$.settings, adminPassword: r.value.baru }),
              ($.settings.adminPassword = r.value.baru))
          } else {
            if ((d = l.entity) != null && d.password && r.value.lama !== l.entity.password) {
              m.error('Password lama salah')
              return
            }
            const t = l.role === 'guru' ? 'guru' : 'santri'
            await R(t, String(l.entityId), { password: r.value.baru })
          }
          ;(m.success('Password berhasil diganti'), _(), S('updated'))
        } catch (t) {
          m.error('Gagal: ' + (t.message || t))
        } finally {
          b.value = !1
        }
      }
      async function F(d) {
        var A
        const t = (A = d.target.files) == null ? void 0 : A[0]
        if (t) {
          if (t.size > 2 * 1024 * 1024) return m.error('Maks 2MB')
          x.value.uploading = !0
          try {
            const h = new FileReader()
            ;((h.onload = async () => {
              try {
                const c = await oe(
                    `profil_foto/${l.role}_${l.entityId}_${Date.now()}.jpg`,
                    h.result,
                    t.type
                  ),
                  D = l.role === 'guru' ? 'guru' : 'santri'
                ;(await R(D, String(l.entityId), { foto: c }),
                  m.success('Foto profil diupdate'),
                  _(),
                  S('updated'))
              } catch (c) {
                m.error('Upload gagal: ' + (c.message || c))
              } finally {
                x.value.uploading = !1
              }
            }),
              h.readAsDataURL(t))
          } catch (h) {
            ;((x.value.uploading = !1), m.error('Error: ' + (h.message || h)))
          }
        }
      }
      async function T() {
        const d = p.value.value.trim()
        if (!d || d.length < 3) {
          p.value.available = !1
          return
        }
        p.value.checking = !0
        try {
          const t = l.role === 'guru' ? 'guru' : 'santri',
            h = (await ke(t, [['username', '==', d]], [], 5)).find(
              (c) => String(c.id) !== String(l.entityId)
            )
          p.value.available = !h
        } catch {
          p.value.available = null
        } finally {
          p.value.checking = !1
        }
      }
      async function K() {
        if (!p.value.value.trim()) return m.error('Username kosong')
        if ((await T(), !p.value.available)) return m.error('Username sudah dipakai')
        b.value = !0
        try {
          const d = l.role === 'guru' ? 'guru' : 'santri'
          ;(await R(d, String(l.entityId), { username: p.value.value.trim() }),
            m.success('Username updated'),
            _(),
            S('updated'))
        } catch (d) {
          m.error('Gagal: ' + (d.message || d))
        } finally {
          b.value = !1
        }
      }
      async function w() {
        const d = L.value.value.replace(/\D/g, '')
        if (d && (d.length < 8 || d.length > 15))
          return m.error('Format WA tidak valid (8-15 digit)')
        b.value = !0
        try {
          const t = l.role === 'guru' ? 'guru' : 'santri'
          ;(await R(t, String(l.entityId), { wa: d }),
            m.success('No WA diupdate'),
            _(),
            S('updated'))
        } catch (t) {
          m.error('Gagal: ' + (t.message || t))
        } finally {
          b.value = !1
        }
      }
      async function N(d) {
        var A
        const t = (A = d.target.files) == null ? void 0 : A[0]
        if (t) {
          if (t.size > 1 * 1024 * 1024) return m.error('Maks 1MB')
          C.value.uploading = !0
          try {
            const h = new FileReader()
            ;((h.onload = async () => {
              try {
                const c = await oe(
                  `tanda_tangan/${l.role}_${l.entityId}_${Date.now()}.png`,
                  h.result,
                  t.type
                )
                ;(await R('guru', String(l.entityId), { tanda_tangan: c }),
                  m.success('Tanda tangan diupdate'),
                  _(),
                  S('updated'))
              } catch (c) {
                m.error('Upload gagal: ' + (c.message || c))
              } finally {
                C.value.uploading = !1
              }
            }),
              h.readAsDataURL(t))
          } catch {
            C.value.uploading = !1
          }
        }
      }
      async function O() {
        b.value = !0
        try {
          if (l.role === 'admin') m.info('Admin notif diatur di Pengaturan Web')
          else {
            const d = l.role === 'guru' ? 'guru' : 'santri'
            await R(d, String(l.entityId), { notifEnabled: u.value.enabled })
          }
          ;(m.success(u.value.enabled ? 'Notif AKTIF' : 'Notif NONAKTIF'), _(), S('updated'))
        } catch (d) {
          m.error('Gagal: ' + (d.message || d))
        } finally {
          b.value = !1
        }
      }
      async function W() {
        b.value = !0
        try {
          ;(await R('guru', String(l.entityId), { ekgq: a.value.value.trim() }),
            m.success('No. Syahadah Qiraati disimpan'),
            _(),
            S('updated'))
        } catch (d) {
          m.error('Gagal: ' + (d.message || d))
        } finally {
          b.value = !1
        }
      }
      const f = G(!1)
      function B() {
        return l.role === 'santri' ? 'santri' : 'guru'
      }
      async function Y() {
        if (!f.value) {
          if (!l.entityId) {
            m.error('Entity ID kosong, tidak bisa link.')
            return
          }
          f.value = !0
          try {
            const d = B(),
              t = await de(d, String(l.entityId))
            ;(m.success('Akun Google terhubung: ' + (t.email || t.uid)), _(), S('updated'))
          } catch (d) {
            const t = String((d == null ? void 0 : d.message) || d || '')
            t.includes('popup-closed-by-user') ||
              t.includes('cancelled-popup') ||
              (t.includes('sudah dipakai') ? m.warning(t) : m.error('Gagal connect Google: ' + t))
          } finally {
            f.value = !1
          }
        }
      }
      async function ge() {
        if (!(f.value || !(await U.ask('Putuskan tautan akun Google?')))) {
          f.value = !0
          try {
            const t = B()
            ;(await ue(t, String(l.entityId)),
              m.success('Akun Google diputuskan.'),
              _(),
              S('updated'))
          } catch (t) {
            m.error('Gagal: ' + ((t == null ? void 0 : t.message) || t))
          } finally {
            f.value = !1
          }
        }
      }
      const Z = {
        amber: {
          iconBg: 'text-amber-500',
          hoverBg: 'hover:bg-amber-50 hover:border-amber-300',
          hoverText: 'group-hover:text-amber-700'
        },
        purple: {
          iconBg: 'text-purple-500',
          hoverBg: 'hover:bg-purple-50 hover:border-purple-300',
          hoverText: 'group-hover:text-purple-700'
        },
        blue: {
          iconBg: 'text-blue-500',
          hoverBg: 'hover:bg-blue-50 hover:border-blue-300',
          hoverText: 'group-hover:text-blue-700'
        },
        green: {
          iconBg: 'text-emerald-600',
          hoverBg: 'hover:bg-emerald-50 hover:border-emerald-300',
          hoverText: 'group-hover:text-emerald-700'
        },
        slate: {
          iconBg: 'text-slate-500',
          hoverBg: 'hover:bg-slate-50 hover:border-slate-300',
          hoverText: 'group-hover:text-slate-700'
        },
        red: {
          iconBg: 'text-red-500',
          hoverBg: 'hover:bg-red-50 hover:border-red-300',
          hoverText: 'group-hover:text-red-700'
        },
        rose: {
          iconBg: 'text-rose-500',
          hoverBg: 'hover:bg-rose-50 hover:border-rose-300',
          hoverText: 'group-hover:text-rose-700'
        },
        cyan: {
          iconBg: 'text-cyan-500',
          hoverBg: 'hover:bg-cyan-50 hover:border-cyan-300',
          hoverText: 'group-hover:text-cyan-700'
        },
        emerald: {
          iconBg: 'text-emerald-500',
          hoverBg: 'hover:bg-emerald-50 hover:border-emerald-300',
          hoverText: 'group-hover:text-emerald-700'
        }
      }
      return (d, t) => {
        var A, h
        return (
          o(),
          i('div', Se, [
            t[30] ||
              (t[30] = e(
                'h3',
                {
                  class:
                    'font-black text-slate-800 dark:text-slate-100 text-base mb-4 flex items-center gap-2'
                },
                [e('i', { class: 'fas fa-cog text-teal-600' }), y('Pengaturan Profil ')],
                -1
              )),
            e('div', Ae, [
              (o(!0),
              i(
                Q,
                null,
                H(
                  s.value,
                  (c) => (
                    o(),
                    i(
                      'button',
                      {
                        key: c.id,
                        onClick: (D) => P(c.id),
                        class: q([
                          'group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-left transition cursor-pointer',
                          Z[c.color].hoverBg
                        ])
                      },
                      [
                        e(
                          'i',
                          {
                            class: q([
                              c.iconClass || 'fas',
                              c.icon,
                              'text-2xl mb-2 block',
                              Z[c.color].iconBg
                            ])
                          },
                          null,
                          2
                        ),
                        e(
                          'p',
                          {
                            class: q([
                              'text-sm font-black text-slate-800 dark:text-slate-100',
                              Z[c.color].hoverText
                            ])
                          },
                          n(c.title),
                          3
                        ),
                        e('p', Pe, n(c.desc), 1)
                      ],
                      10,
                      Ge
                    )
                  )
                ),
                128
              ))
            ]),
            (o(),
            J(fe, { to: 'body' }, [
              v.value
                ? (o(),
                  i(
                    'div',
                    {
                      key: 0,
                      class:
                        'fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4',
                      onClick: xe(_, ['self'])
                    },
                    [
                      e('div', Be, [
                        v.value === 'sandi'
                          ? (o(),
                            i('div', Le, [
                              t[11] ||
                                (t[11] = e(
                                  'h3',
                                  { class: 'text-lg font-black mb-3' },
                                  'Ganti Sandi',
                                  -1
                                )),
                              e('div', Ue, [
                                e('div', null, [
                                  t[8] ||
                                    (t[8] = e(
                                      'label',
                                      {
                                        class:
                                          'text-xs font-bold text-slate-500 dark:text-slate-400'
                                      },
                                      'Password Lama',
                                      -1
                                    )),
                                  E(
                                    e(
                                      'input',
                                      {
                                        'onUpdate:modelValue':
                                          t[0] || (t[0] = (c) => (r.value.lama = c)),
                                        type: 'password',
                                        class:
                                          'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm'
                                      },
                                      null,
                                      512
                                    ),
                                    [[V, r.value.lama]]
                                  )
                                ]),
                                e('div', null, [
                                  t[9] ||
                                    (t[9] = e(
                                      'label',
                                      {
                                        class:
                                          'text-xs font-bold text-slate-500 dark:text-slate-400'
                                      },
                                      'Password Baru',
                                      -1
                                    )),
                                  E(
                                    e(
                                      'input',
                                      {
                                        'onUpdate:modelValue':
                                          t[1] || (t[1] = (c) => (r.value.baru = c)),
                                        type: 'password',
                                        class:
                                          'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm'
                                      },
                                      null,
                                      512
                                    ),
                                    [[V, r.value.baru]]
                                  )
                                ]),
                                e('div', null, [
                                  t[10] ||
                                    (t[10] = e(
                                      'label',
                                      {
                                        class:
                                          'text-xs font-bold text-slate-500 dark:text-slate-400'
                                      },
                                      'Konfirmasi',
                                      -1
                                    )),
                                  E(
                                    e(
                                      'input',
                                      {
                                        'onUpdate:modelValue':
                                          t[2] || (t[2] = (c) => (r.value.konfirmasi = c)),
                                        type: 'password',
                                        class:
                                          'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm'
                                      },
                                      null,
                                      512
                                    ),
                                    [[V, r.value.konfirmasi]]
                                  )
                                ])
                              ])
                            ]))
                          : v.value === 'foto'
                            ? (o(),
                              i('div', Ce, [
                                t[12] ||
                                  (t[12] = e(
                                    'h3',
                                    { class: 'text-lg font-black mb-3' },
                                    'Ganti Foto Profil',
                                    -1
                                  )),
                                e(
                                  'input',
                                  {
                                    type: 'file',
                                    accept: 'image/*',
                                    onChange: F,
                                    disabled: x.value.uploading,
                                    class: 'w-full text-sm'
                                  },
                                  null,
                                  40,
                                  Te
                                ),
                                t[13] ||
                                  (t[13] = e(
                                    'p',
                                    {
                                      class:
                                        'text-[10px] text-slate-500 dark:text-slate-400 italic mt-2'
                                    },
                                    'JPG/PNG, maks 2MB',
                                    -1
                                  ))
                              ]))
                            : v.value === 'username'
                              ? (o(),
                                i('div', Ne, [
                                  t[14] ||
                                    (t[14] = e(
                                      'h3',
                                      { class: 'text-lg font-black mb-3' },
                                      'Ganti Username',
                                      -1
                                    )),
                                  E(
                                    e(
                                      'input',
                                      {
                                        'onUpdate:modelValue':
                                          t[3] || (t[3] = (c) => (p.value.value = c)),
                                        onBlur: T,
                                        type: 'text',
                                        class:
                                          'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm',
                                        placeholder: 'username unik'
                                      },
                                      null,
                                      544
                                    ),
                                    [[V, p.value.value]]
                                  ),
                                  p.value.checking
                                    ? (o(), i('p', Ie, 'Cek...'))
                                    : p.value.available === !0
                                      ? (o(), i('p', Me, 'Username tersedia'))
                                      : p.value.available === !1
                                        ? (o(), i('p', Fe, 'Sudah dipakai'))
                                        : I('', !0)
                                ]))
                              : v.value === 'wa'
                                ? (o(),
                                  i('div', Ke, [
                                    t[15] ||
                                      (t[15] = e(
                                        'h3',
                                        { class: 'text-lg font-black mb-3' },
                                        'No WhatsApp',
                                        -1
                                      )),
                                    E(
                                      e(
                                        'input',
                                        {
                                          'onUpdate:modelValue':
                                            t[4] || (t[4] = (c) => (L.value.value = c)),
                                          type: 'tel',
                                          class:
                                            'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm',
                                          placeholder: '08xxxxxxxxxx'
                                        },
                                        null,
                                        512
                                      ),
                                      [[V, L.value.value]]
                                    ),
                                    t[16] ||
                                      (t[16] = e(
                                        'p',
                                        {
                                          class:
                                            'text-[10px] text-slate-500 dark:text-slate-400 italic mt-2'
                                        },
                                        'Format Indonesia, akan dibersihkan dari simbol',
                                        -1
                                      ))
                                  ]))
                                : v.value === 'wa_wali'
                                  ? (o(),
                                    i('div', De, [
                                      t[17] ||
                                        (t[17] = e(
                                          'h3',
                                          { class: 'text-lg font-black mb-3' },
                                          'No WhatsApp Wali',
                                          -1
                                        )),
                                      E(
                                        e(
                                          'input',
                                          {
                                            'onUpdate:modelValue':
                                              t[5] || (t[5] = (c) => (L.value.value = c)),
                                            type: 'tel',
                                            class:
                                              'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm',
                                            placeholder: '08xxxxxxxxxx'
                                          },
                                          null,
                                          512
                                        ),
                                        [[V, L.value.value]]
                                      ),
                                      t[18] ||
                                        (t[18] = e(
                                          'p',
                                          {
                                            class:
                                              'text-[10px] text-slate-500 dark:text-slate-400 italic mt-2'
                                          },
                                          'Nomor wali (orang tua) untuk terima notifikasi pondok.',
                                          -1
                                        ))
                                    ]))
                                  : v.value === 'ttd'
                                    ? (o(),
                                      i('div', Ee, [
                                        t[19] ||
                                          (t[19] = e(
                                            'h3',
                                            { class: 'text-lg font-black mb-3' },
                                            'Upload Tanda Tangan',
                                            -1
                                          )),
                                        e(
                                          'input',
                                          {
                                            type: 'file',
                                            accept: 'image/*',
                                            onChange: N,
                                            disabled: C.value.uploading,
                                            class: 'w-full text-sm'
                                          },
                                          null,
                                          40,
                                          Oe
                                        ),
                                        t[20] ||
                                          (t[20] = e(
                                            'p',
                                            {
                                              class:
                                                'text-[10px] text-slate-500 dark:text-slate-400 italic mt-2'
                                            },
                                            'PNG transparan disarankan, maks 1MB',
                                            -1
                                          ))
                                      ]))
                                    : v.value === 'google'
                                      ? (o(),
                                        i('div', We, [
                                          t[25] ||
                                            (t[25] = e(
                                              'h3',
                                              { class: 'text-lg font-black mb-3' },
                                              'Tautkan Akun Google',
                                              -1
                                            )),
                                          (A = l.entity) != null && A.linked_email
                                            ? (o(),
                                              i('div', Ve, [
                                                t[22] ||
                                                  (t[22] = e(
                                                    'p',
                                                    { class: 'text-xs text-slate-600' },
                                                    'Sudah tertaut ke:',
                                                    -1
                                                  )),
                                                e('p', Re, [
                                                  t[21] ||
                                                    (t[21] = e(
                                                      'i',
                                                      { class: 'fab fa-google mr-1' },
                                                      null,
                                                      -1
                                                    )),
                                                  y(n(l.entity.linked_email), 1)
                                                ])
                                              ]))
                                            : (o(),
                                              i(
                                                'p',
                                                qe,
                                                'Login lewat akun Google supaya bisa skip password.'
                                              )),
                                          (h = l.entity) != null && h.linked_email
                                            ? (o(),
                                              i(
                                                'button',
                                                {
                                                  key: 3,
                                                  onClick: ge,
                                                  disabled: f.value,
                                                  class:
                                                    'mt-3 w-full bg-slate-600 text-white py-2 rounded-lg font-bold text-sm disabled:opacity-50'
                                                },
                                                [
                                                  t[24] ||
                                                    (t[24] = e(
                                                      'i',
                                                      { class: 'fas fa-unlink mr-2' },
                                                      null,
                                                      -1
                                                    )),
                                                  y(
                                                    n(f.value ? 'Memutus...' : 'Putuskan Tautan'),
                                                    1
                                                  )
                                                ],
                                                8,
                                                Qe
                                              ))
                                            : (o(),
                                              i(
                                                'button',
                                                {
                                                  key: 2,
                                                  onClick: Y,
                                                  disabled: f.value,
                                                  class:
                                                    'mt-3 w-full bg-rose-600 text-white py-2 rounded-lg font-bold text-sm disabled:opacity-50'
                                                },
                                                [
                                                  t[23] ||
                                                    (t[23] = e(
                                                      'i',
                                                      { class: 'fab fa-google mr-2' },
                                                      null,
                                                      -1
                                                    )),
                                                  y(
                                                    n(
                                                      f.value
                                                        ? 'Menghubungkan...'
                                                        : 'Connect dengan Google'
                                                    ),
                                                    1
                                                  )
                                                ],
                                                8,
                                                ze
                                              ))
                                        ]))
                                      : v.value === 'notif'
                                        ? (o(),
                                          i('div', He, [
                                            t[27] ||
                                              (t[27] = e(
                                                'h3',
                                                { class: 'text-lg font-black mb-3' },
                                                'Setting Notifikasi',
                                                -1
                                              )),
                                            e('label', Je, [
                                              E(
                                                e(
                                                  'input',
                                                  {
                                                    'onUpdate:modelValue':
                                                      t[6] || (t[6] = (c) => (u.value.enabled = c)),
                                                    type: 'checkbox',
                                                    class: 'w-5 h-5 accent-cyan-600'
                                                  },
                                                  null,
                                                  512
                                                ),
                                                [[pe, u.value.enabled]]
                                              ),
                                              t[26] ||
                                                (t[26] = e(
                                                  'div',
                                                  null,
                                                  [
                                                    e(
                                                      'p',
                                                      { class: 'text-sm font-bold' },
                                                      'Aktifkan Push Notification'
                                                    ),
                                                    e(
                                                      'p',
                                                      {
                                                        class:
                                                          'text-xs text-slate-500 dark:text-slate-400'
                                                      },
                                                      'FCM untuk pengumuman & event penting'
                                                    )
                                                  ],
                                                  -1
                                                ))
                                            ])
                                          ]))
                                        : v.value === 'ekgq'
                                          ? (o(),
                                            i('div', Xe, [
                                              t[28] ||
                                                (t[28] = e(
                                                  'h3',
                                                  { class: 'text-lg font-black mb-3' },
                                                  'No. Syahadah Qiraati (EKGQ)',
                                                  -1
                                                )),
                                              E(
                                                e(
                                                  'input',
                                                  {
                                                    'onUpdate:modelValue':
                                                      t[7] || (t[7] = (c) => (a.value.value = c)),
                                                    type: 'text',
                                                    class:
                                                      'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm',
                                                    placeholder: 'EKGQ-2023-001'
                                                  },
                                                  null,
                                                  512
                                                ),
                                                [[V, a.value.value]]
                                              ),
                                              t[29] ||
                                                (t[29] = e(
                                                  'p',
                                                  {
                                                    class:
                                                      'text-[10px] text-slate-500 dark:text-slate-400 italic mt-2'
                                                  },
                                                  'Nomor syahadah resmi dari Pusat Qiraati',
                                                  -1
                                                ))
                                            ]))
                                          : I('', !0),
                        e('div', Ye, [
                          e(
                            'button',
                            {
                              onClick: _,
                              class:
                                'px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg'
                            },
                            'Batal'
                          ),
                          v.value === 'sandi'
                            ? (o(),
                              i(
                                'button',
                                {
                                  key: 0,
                                  onClick: M,
                                  disabled: b.value,
                                  class:
                                    'px-4 py-2 text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg disabled:opacity-50'
                                },
                                'Simpan',
                                8,
                                Ze
                              ))
                            : v.value === 'username'
                              ? (o(),
                                i(
                                  'button',
                                  {
                                    key: 1,
                                    onClick: K,
                                    disabled: b.value,
                                    class:
                                      'px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50'
                                  },
                                  'Simpan',
                                  8,
                                  et
                                ))
                              : v.value === 'wa' || v.value === 'wa_wali'
                                ? (o(),
                                  i(
                                    'button',
                                    {
                                      key: 2,
                                      onClick: w,
                                      disabled: b.value,
                                      class:
                                        'px-4 py-2 text-sm font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50'
                                    },
                                    'Simpan',
                                    8,
                                    tt
                                  ))
                                : v.value === 'notif'
                                  ? (o(),
                                    i(
                                      'button',
                                      {
                                        key: 3,
                                        onClick: O,
                                        disabled: b.value,
                                        class:
                                          'px-4 py-2 text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50'
                                      },
                                      'Simpan',
                                      8,
                                      at
                                    ))
                                  : v.value === 'ekgq'
                                    ? (o(),
                                      i(
                                        'button',
                                        {
                                          key: 4,
                                          onClick: W,
                                          disabled: b.value,
                                          class:
                                            'px-4 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50'
                                        },
                                        'Simpan',
                                        8,
                                        st
                                      ))
                                    : I('', !0)
                        ])
                      ])
                    ]
                  ))
                : I('', !0)
            ]))
          ])
        )
      }
    }
  },
  lt = { class: 'space-y-4' },
  rt = {
    __name: 'ProfilAdmin',
    setup(g) {
      return (k, l) => (
        o(),
        i('div', lt, [
          l[0] ||
            (l[0] = ye(
              '<div class="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"><div class="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-700 px-6 md:px-8 py-6 md:py-7 overflow-hidden"><img src="' +
                X +
                '" alt="" aria-hidden="true" class="absolute -right-4 -top-6 w-44 h-44 object-contain opacity-10 pointer-events-none select-none"><img src="' +
                X +
                '" alt="" aria-hidden="true" class="absolute -right-12 -bottom-12 w-32 h-32 object-contain opacity-[0.07] pointer-events-none select-none rotate-12"><div class="relative flex flex-col md:flex-row items-center md:items-center gap-5"><div class="w-28 h-28 md:w-32 md:h-32 bg-white dark:bg-slate-800/20 border-4 border-white/80 rounded-full flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0 backdrop-blur-sm"><i class="fas fa-user-shield text-white/80 text-5xl"></i></div><div class="flex-1 text-center md:text-left text-white min-w-0"><h2 class="text-2xl md:text-3xl font-black leading-tight drop-shadow-sm"> Administrator </h2><p class="text-xs md:text-sm font-bold text-emerald-50/90 uppercase tracking-wider mt-1.5"> Built-in Super Admin · Pondok </p><span class="inline-block mt-3 text-[11px] bg-white dark:bg-slate-800/25 backdrop-blur-sm text-white font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md"> Super Admin </span></div></div></div><div class="p-6 md:p-8"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700"><h3 class="font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4"><i class="fas fa-user mr-2"></i>Identitas </h3><ul class="space-y-3 text-sm"><li class="flex justify-between gap-2"><span class="text-slate-700 dark:text-slate-300 font-bold">Username:</span><span class="font-black text-slate-800 dark:text-slate-100 text-right">admin</span></li><li class="flex justify-between gap-2"><span class="text-slate-700 dark:text-slate-300 font-bold">Role:</span><span class="font-black text-slate-800 dark:text-slate-100 text-right">Administrator Utama</span></li><li class="flex justify-between gap-2"><span class="text-slate-700 dark:text-slate-300 font-bold">Hak Akses:</span><span class="font-black text-emerald-700 text-right">Penuh (semua fitur)</span></li></ul></div><div class="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100"><h3 class="font-black text-emerald-800 text-sm uppercase tracking-widest border-b border-emerald-200 pb-2 mb-4"><i class="fas fa-info-circle mr-2"></i>Informasi </h3><p class="text-xs text-slate-700 dark:text-slate-200 leading-relaxed"> Akun ini adalah <b>Administrator utama</b> Ammu Online. Hanya satu akun ini yang memiliki akses penuh ke semua modul, termasuk Master Data, Keuangan, dan Audit Log. </p><p class="text-[11px] text-amber-700 italic mt-3 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-100 dark:border-amber-800"><i class="fas fa-exclamation-triangle mr-1"></i>Demi keamanan, segera ganti kata sandi default di Pengaturan → Profil. </p></div></div><p class="text-[10px] text-slate-400 italic mt-4 text-center"><i class="fas fa-info-circle mr-1"></i>Untuk mengubah kata sandi, klik avatar di kanan atas → Edit Profil → Ganti Sandi. </p></div></div>',
              1
            )),
          te(ae, { role: 'admin', 'entity-id': 'admin', entity: { username: 'adminmu' } })
        ])
      )
    }
  },
  ot = { class: 'space-y-4' },
  nt = {
    class:
      'bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden'
  },
  it = {
    class:
      'relative bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-700 px-6 md:px-8 py-6 md:py-7 overflow-hidden'
  },
  dt = { class: 'relative flex flex-col md:flex-row items-center md:items-center gap-5' },
  ut = {
    class:
      'w-28 h-28 md:w-32 md:h-32 bg-white dark:bg-slate-800/20 border-4 border-white/80 rounded-full flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0 backdrop-blur-sm'
  },
  ct = ['src'],
  bt = { key: 1, class: 'fas fa-user-tie text-white/60 text-5xl' },
  gt = { class: 'flex-1 text-center md:text-left text-white min-w-0' },
  mt = { class: 'text-2xl md:text-3xl font-black leading-tight drop-shadow-sm' },
  xt = { class: 'text-xs md:text-sm font-bold text-emerald-50/90 uppercase tracking-wider mt-1.5' },
  pt = {
    class:
      'inline-block mt-3 text-[11px] bg-white dark:bg-slate-800/25 backdrop-blur-sm text-white font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md'
  },
  ft = { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
  kt = {
    class:
      'bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700'
  },
  vt = { class: 'space-y-3 text-sm' },
  yt = { class: 'flex justify-between gap-2' },
  ht = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  wt = { class: 'flex justify-between gap-2' },
  _t = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  $t = { class: 'flex justify-between gap-2' },
  jt = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  St = { class: 'flex justify-between gap-2' },
  At = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Gt = { class: 'bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100' },
  Pt = { class: 'space-y-3 text-sm' },
  Bt = { class: 'flex justify-between gap-2' },
  Lt = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Ut = { class: 'flex justify-between gap-2' },
  Ct = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Tt = { class: 'flex justify-between gap-2' },
  Nt = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  It = { class: 'flex justify-between gap-2' },
  Mt = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Ft = { class: 'flex justify-between gap-2' },
  Kt = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Dt = {
    class:
      'bg-purple-50 dark:bg-purple-900/20 p-5 rounded-2xl border border-purple-100 md:col-span-2'
  },
  Et = { class: 'grid grid-cols-1 md:grid-cols-3 gap-3 text-sm' },
  Ot = { class: 'bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-100' },
  Wt = { class: 'font-black text-slate-800 dark:text-slate-100 mt-1' },
  Vt = { class: 'bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-100' },
  Rt = { class: 'font-black text-slate-800 dark:text-slate-100 mt-1' },
  qt = { class: 'bg-white dark:bg-slate-800 p-3 rounded-xl border border-purple-100' },
  zt = { class: 'font-black text-slate-800 dark:text-slate-100 mt-1' },
  Qt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-4'
  },
  Ht = {
    key: 0,
    class:
      'flex items-center justify-between gap-2 flex-wrap bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3'
  },
  Jt = { class: 'flex-1 min-w-0' },
  Xt = { class: 'text-[10px] text-emerald-700 dark:text-emerald-300 truncate' },
  Yt = ['disabled'],
  Zt = ['disabled'],
  ea = {
    __name: 'ProfilGuru',
    props: { guru: { type: Object, required: !0 } },
    setup(g) {
      const k = g,
        l = ce(),
        S = be(),
        $ = G(!1)
      async function m() {
        var u
        if ((u = k.guru) != null && u.id) {
          $.value = !0
          try {
            const a = await de('guru', k.guru.id)
            ;(k.guru && ((k.guru.linked_uid = a.uid), (k.guru.linked_email = a.email)),
              l.success(`Akun ${a.email || 'Google'} berhasil dikaitkan`))
          } catch (a) {
            if ((a == null ? void 0 : a.code) === 'auth/popup-closed-by-user') return
            l.error('Gagal kaitkan: ' + (a.message || a))
          } finally {
            $.value = !1
          }
        }
      }
      async function U() {
        var a
        if (
          !(
            !((a = k.guru) != null && a.id) ||
            !(await S({
              title: 'Lepas kaitan Google?',
              message: `Akun Google "${k.guru.linked_email || k.guru.linked_uid}" akan dilepas.`,
              confirmText: 'Lepas',
              danger: !0
            }))
          )
        ) {
          $.value = !0
          try {
            ;(await ue('guru', k.guru.id),
              k.guru && ((k.guru.linked_uid = null), (k.guru.linked_email = null)),
              l.success('Akun Google dilepas'))
          } catch (P) {
            l.error('Gagal lepas: ' + (P.message || P))
          } finally {
            $.value = !1
          }
        }
      }
      const v = j(() => {
          var u, a
          return _e((u = k.guru) == null ? void 0 : u.nama, (a = k.guru) == null ? void 0 : a.jk)
        }),
        b = j(() => {
          var u, a
          return `${((u = k.guru) == null ? void 0 : u.jabatan) || 'Pegawai'} - ${((a = k.guru) == null ? void 0 : a.lembaga) || '-'}`
        }),
        s = j(() => {
          var u
          return ((u = k.guru) == null ? void 0 : u.jk) === 'L' ? 'Laki-laki' : 'Perempuan'
        }),
        r = j(() => {
          var u
          return z((u = k.guru) == null ? void 0 : u.tanggal_tugas)
        }),
        x = j(() => {
          var u
          return $e((u = k.guru) == null ? void 0 : u.tanggal_tugas)
        }),
        p = {
          user: 'User',
          admin: 'Admin',
          admin_keuangan: 'Admin Keuangan',
          super_admin: 'Super Admin'
        },
        L = j(() => {
          var u
          return p[((u = k.guru) == null ? void 0 : u.role_sistem) || 'user'] || 'Guru'
        }),
        C = j(() => {
          var u
          return (((u = k.guru) == null ? void 0 : u.role_sistem) || 'user')
            .replace('_', ' ')
            .toUpperCase()
        })
      return (u, a) => {
        var P, _, M, F, T, K, w, N, O, W
        return (
          o(),
          i('div', ot, [
            e('div', nt, [
              e('div', it, [
                a[0] ||
                  (a[0] = e(
                    'img',
                    {
                      src: X,
                      alt: '',
                      'aria-hidden': 'true',
                      class:
                        'absolute -right-4 -top-6 w-44 h-44 object-contain opacity-10 pointer-events-none select-none'
                    },
                    null,
                    -1
                  )),
                a[1] ||
                  (a[1] = e(
                    'img',
                    {
                      src: X,
                      alt: '',
                      'aria-hidden': 'true',
                      class:
                        'absolute -right-12 -bottom-12 w-32 h-32 object-contain opacity-[0.07] pointer-events-none select-none rotate-12'
                    },
                    null,
                    -1
                  )),
                e('div', dt, [
                  e('div', ut, [
                    (P = g.guru) != null && P.foto
                      ? (o(),
                        i(
                          'img',
                          {
                            key: 0,
                            src: g.guru.foto,
                            class: 'w-full h-full object-cover',
                            alt: 'Foto Profil'
                          },
                          null,
                          8,
                          ct
                        ))
                      : (o(), i('i', bt))
                  ]),
                  e('div', gt, [
                    e('h2', mt, n(v.value), 1),
                    e('p', xt, n(b.value), 1),
                    e('span', pt, n(L.value), 1)
                  ])
                ])
              ]),
              e('div', ft, [
                e('div', kt, [
                  a[6] ||
                    (a[6] = e(
                      'h3',
                      {
                        class:
                          'font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4'
                      },
                      [e('i', { class: 'fas fa-user mr-2' }), y('Identitas ')],
                      -1
                    )),
                  e('ul', vt, [
                    e('li', yt, [
                      a[2] ||
                        (a[2] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'Nama:',
                          -1
                        )),
                      e('span', ht, n(v.value), 1)
                    ]),
                    e('li', wt, [
                      a[3] ||
                        (a[3] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'Username:',
                          -1
                        )),
                      e('span', _t, n(((_ = g.guru) == null ? void 0 : _.username) || '-'), 1)
                    ]),
                    e('li', $t, [
                      a[4] ||
                        (a[4] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'Jenis Kelamin:',
                          -1
                        )),
                      e('span', jt, n(s.value), 1)
                    ]),
                    e('li', St, [
                      a[5] ||
                        (a[5] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'No WhatsApp:',
                          -1
                        )),
                      e('span', At, n(((M = g.guru) == null ? void 0 : M.wa) || '-'), 1)
                    ])
                  ])
                ]),
                e('div', Gt, [
                  a[12] ||
                    (a[12] = e(
                      'h3',
                      {
                        class:
                          'font-black text-blue-800 text-sm uppercase tracking-widest border-b border-blue-200 pb-2 mb-4'
                      },
                      [e('i', { class: 'fas fa-briefcase mr-2' }), y('Tugas & Lembaga ')],
                      -1
                    )),
                  e('ul', Pt, [
                    e('li', Bt, [
                      a[7] ||
                        (a[7] = e('span', { class: 'text-blue-700 font-bold' }, 'Jabatan:', -1)),
                      e('span', Lt, n(((F = g.guru) == null ? void 0 : F.jabatan) || '-'), 1)
                    ]),
                    e('li', Ut, [
                      a[8] ||
                        (a[8] = e(
                          'span',
                          { class: 'text-blue-700 font-bold' },
                          'Lembaga/Devisi:',
                          -1
                        )),
                      e('span', Ct, n(((T = g.guru) == null ? void 0 : T.lembaga) || '-'), 1)
                    ]),
                    e('li', Tt, [
                      a[9] ||
                        (a[9] = e(
                          'span',
                          { class: 'text-blue-700 font-bold' },
                          'Tanggal Tugas:',
                          -1
                        )),
                      e('span', Nt, n(r.value), 1)
                    ]),
                    e('li', It, [
                      a[10] ||
                        (a[10] = e(
                          'span',
                          { class: 'text-blue-700 font-bold' },
                          'Lama Mengajar:',
                          -1
                        )),
                      e('span', Mt, n(x.value), 1)
                    ]),
                    e('li', Ft, [
                      a[11] ||
                        (a[11] = e('span', { class: 'text-blue-700 font-bold' }, 'Status:', -1)),
                      e('span', Kt, n(((K = g.guru) == null ? void 0 : K.status) || 'Aktif'), 1)
                    ])
                  ])
                ]),
                e('div', Dt, [
                  a[16] ||
                    (a[16] = e(
                      'h3',
                      {
                        class:
                          'font-black text-purple-800 text-sm uppercase tracking-widest border-b border-purple-200 pb-2 mb-4'
                      },
                      [e('i', { class: 'fas fa-shield-halved mr-2' }), y('Sistem & Akses ')],
                      -1
                    )),
                  e('div', Et, [
                    e('div', Ot, [
                      a[13] ||
                        (a[13] = e(
                          'p',
                          { class: 'text-[10px] text-purple-600 font-bold uppercase' },
                          'Role Sistem',
                          -1
                        )),
                      e('p', Wt, n(C.value), 1)
                    ]),
                    e('div', Vt, [
                      a[14] ||
                        (a[14] = e(
                          'p',
                          { class: 'text-[10px] text-purple-600 font-bold uppercase' },
                          'No. Syahadah',
                          -1
                        )),
                      e('p', Rt, n(((w = g.guru) == null ? void 0 : w.ekgq) || '-'), 1)
                    ]),
                    e('div', qt, [
                      a[15] ||
                        (a[15] = e(
                          'p',
                          { class: 'text-[10px] text-purple-600 font-bold uppercase' },
                          'ID Fingerprint',
                          -1
                        )),
                      e('p', zt, n(((N = g.guru) == null ? void 0 : N.id_fingerprint) || '-'), 1)
                    ])
                  ])
                ])
              ]),
              a[17] ||
                (a[17] = e(
                  'p',
                  { class: 'text-[10px] text-slate-400 italic mt-4 text-center' },
                  [
                    e('i', { class: 'fas fa-info-circle mr-1' }),
                    y(
                      'Untuk mengubah foto, sandi, atau no WA, klik avatar di kanan atas → Edit Profil. '
                    )
                  ],
                  -1
                ))
            ]),
            e('div', Qt, [
              a[21] ||
                (a[21] = e(
                  'h3',
                  {
                    class:
                      'text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2'
                  },
                  [e('i', { class: 'fab fa-google text-blue-500 mr-1' }), y('Akun Google ')],
                  -1
                )),
              a[22] ||
                (a[22] = e(
                  'p',
                  { class: 'text-[11px] text-slate-500 dark:text-slate-400 mb-3' },
                  'Kaitkan akun Google supaya bisa login dengan 1 klik tanpa perlu password.',
                  -1
                )),
              (O = g.guru) != null && O.linked_uid
                ? (o(),
                  i('div', Ht, [
                    e('div', Jt, [
                      a[18] ||
                        (a[18] = e(
                          'p',
                          { class: 'text-xs font-bold text-emerald-800 dark:text-emerald-300' },
                          [e('i', { class: 'fas fa-check-circle mr-1' }), y('Sudah terkait')],
                          -1
                        )),
                      e('p', Xt, n(g.guru.linked_email || g.guru.linked_uid), 1)
                    ]),
                    e(
                      'button',
                      {
                        onClick: U,
                        disabled: $.value,
                        class:
                          'px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-[11px] rounded-lg disabled:opacity-50 cursor-pointer transition'
                      },
                      [
                        ...(a[19] ||
                          (a[19] = [
                            e('i', { class: 'fas fa-unlink mr-1' }, null, -1),
                            y('Lepas Kaitan ', -1)
                          ]))
                      ],
                      8,
                      Yt
                    )
                  ]))
                : (o(),
                  i(
                    'button',
                    {
                      key: 1,
                      onClick: m,
                      disabled: $.value,
                      class:
                        'w-full bg-white border-2 border-slate-300 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-bold py-2.5 rounded-xl cursor-pointer flex justify-center items-center gap-2 transition text-sm'
                    },
                    [
                      a[20] || (a[20] = e('i', { class: 'fab fa-google text-blue-500' }, null, -1)),
                      e('span', null, n($.value ? 'Memproses...' : 'Kaitkan Akun Google'), 1)
                    ],
                    8,
                    Zt
                  ))
            ]),
            te(
              ae,
              { role: 'guru', 'entity-id': (W = g.guru) == null ? void 0 : W.id, entity: g.guru },
              null,
              8,
              ['entity-id', 'entity']
            )
          ])
        )
      }
    }
  },
  ta = { class: 'space-y-4' },
  aa = {
    class:
      'bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700'
  },
  sa = { class: 'flex flex-col items-center mb-6 border-b border-slate-100 pb-6' },
  la = { class: 'relative mb-3' },
  ra = {
    class:
      'w-36 h-36 bg-gradient-to-br from-cyan-50 to-blue-50 border-4 border-white ring-4 ring-cyan-100 rounded-full flex items-center justify-center overflow-hidden shadow-xl'
  },
  oa = ['src'],
  na = { key: 1, class: 'fas fa-user-graduate text-cyan-300 text-6xl' },
  ia = { class: 'text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 text-center' },
  da = { class: 'text-xs text-slate-700 dark:text-slate-300 font-medium mt-1' },
  ua = { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
  ca = {
    class:
      'bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700'
  },
  ba = { class: 'space-y-3 text-sm' },
  ga = { class: 'flex justify-between gap-2' },
  ma = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  xa = { class: 'flex justify-between gap-2' },
  pa = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  fa = { class: 'flex justify-between gap-2' },
  ka = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  va = { class: 'flex justify-between gap-2' },
  ya = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  ha = { class: 'flex justify-between gap-2' },
  wa = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  _a = { class: 'flex justify-between gap-2' },
  $a = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  ja = {
    class:
      'bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-100 dark:border-cyan-800'
  },
  Sa = { class: 'space-y-3 text-sm' },
  Aa = { class: 'flex justify-between gap-2' },
  Ga = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Pa = { class: 'flex justify-between gap-2' },
  Ba = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  La = { class: 'flex justify-between gap-2' },
  Ua = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Ca = { class: 'flex justify-between gap-2' },
  Ta = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Na = { class: 'flex justify-between gap-2' },
  Ia = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Ma = { key: 0, class: 'flex justify-between gap-2' },
  Fa = { class: 'font-black text-slate-800 dark:text-slate-100 text-right' },
  Ka = {
    class:
      'bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800 md:col-span-2'
  },
  Da = { class: 'grid grid-cols-1 md:grid-cols-2 gap-3 text-sm' },
  Ea = {
    class: 'bg-white dark:bg-slate-800 p-3 rounded-xl border border-amber-100 dark:border-amber-800'
  },
  Oa = { class: 'font-black text-slate-800 dark:text-slate-100 mt-1' },
  Wa = {
    class: 'bg-white dark:bg-slate-800 p-3 rounded-xl border border-amber-100 dark:border-amber-800'
  },
  Va = { class: 'font-black text-slate-800 dark:text-slate-100 mt-1' },
  Ra = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700'
  },
  qa = { class: 'relative pl-6' },
  za = { class: 'bg-blue-50/60 rounded-lg p-3 border border-blue-100' },
  Qa = { class: 'flex flex-wrap items-center gap-2' },
  Ha = { class: 'text-[10px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded' },
  Ja = { class: 'text-xs font-bold text-slate-800' },
  Xa = {
    key: 0,
    class: 'text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded'
  },
  Ya = { class: 'text-[10px] text-slate-500' },
  Za = { key: 0, class: 'text-xs text-slate-600 mt-1 italic' },
  es = { key: 1, class: 'text-[10px] text-slate-400 mt-0.5' },
  ts = {
    key: 1,
    class:
      'bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700'
  },
  as = { class: 'space-y-3' },
  ss = { class: 'flex items-center justify-between flex-wrap gap-2 mb-2' },
  ls = { class: 'text-sm font-black text-slate-800 dark:text-slate-100' },
  rs = { key: 0, class: 'text-[11px] text-amber-700 font-bold mt-0.5' },
  os = {
    class:
      'text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider'
  },
  ns = { key: 0, class: 'space-y-1.5' },
  is = { class: 'font-medium normal-case text-slate-700 dark:text-slate-300 ml-1' },
  ds = { class: 'text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line' },
  us = { key: 1, class: 'text-[10px] text-slate-400 italic' },
  cs = {
    __name: 'ProfilSantri',
    props: { santri: { type: Object, required: !0 } },
    setup(g) {
      const k = ie(),
        l = g,
        S = j(() => {
          var b
          return ((b = l.santri) == null ? void 0 : b.jk) === 'L' ? 'Laki-laki' : 'Perempuan'
        }),
        $ = j(() => {
          var b
          return z((b = l.santri) == null ? void 0 : b.tgl_lahir)
        }),
        m = j(() => {
          var b
          return (b = l.santri) != null && b.is_mukim ? 'Mukim' : 'Non-Mukim'
        }),
        U = j(() => {
          var s
          return (
            Array.isArray((s = l.santri) == null ? void 0 : s.riwayat) ? l.santri.riwayat : []
          )
            .slice()
            .sort((r, x) => String(x.tgl_naik || '').localeCompare(String(r.tgl_naik || '')))
        }),
        v = j(() => {
          var r
          const b = (r = l.santri) == null ? void 0 : r.kartu_kenaikan
          if (!b || typeof b != 'object') return []
          const s = []
          for (const x of Object.keys(b)) {
            const p = b[x]
            if (!p || typeof p != 'object') continue
            const L = je(x, k.settings || {}),
              C = Object.fromEntries((L.kelasList || []).map((u) => [u.id, u]))
            for (const u of Object.keys(p)) {
              const a = p[u]
              if (!a || typeof a != 'object') continue
              let P = 0
              const _ = new Set(['ceremonial', 'catatan', 'rekomendasi', 'entries'])
              for (const [w, N] of Object.entries(a)) _.has(w) || (N && P++)
              const M = C[u] || { items: [], label: u },
                F = Object.fromEntries((M.items || []).map((w) => [w.id, w.label]))
              F.ceremonial = 'Ceremonial'
              const T = Array.isArray(a.entries) ? a.entries.slice() : []
              ;(typeof a.catatan == 'string' &&
                a.catatan.trim() &&
                T.push({ tanggal: '', itemId: '', tipe: 'catatan', text: a.catatan }),
                typeof a.rekomendasi == 'string' &&
                  a.rekomendasi.trim() &&
                  T.push({ tanggal: '', itemId: '', tipe: 'rekomendasi', text: a.rekomendasi }))
              const K = T.map((w) => ({
                tanggal: w.tanggal || '',
                itemId: w.itemId || '',
                itemLabel: F[w.itemId] || '',
                tipe: w.tipe === 'rekomendasi' ? 'rekomendasi' : 'catatan',
                text: w.text || ''
              })).sort((w, N) => (N.tanggal || '').localeCompare(w.tanggal || ''))
              ;(K.length === 0 && !a.ceremonial && P === 0) ||
                s.push({
                  lembaga: x,
                  kelasId: u,
                  kelasLabel: M.label || u,
                  ceremonial: a.ceremonial || '',
                  entries: K,
                  totalTanggal: P
                })
            }
          }
          return s.sort((x, p) => (p.ceremonial || '').localeCompare(x.ceremonial || ''))
        })
      return (b, s) => {
        var r, x, p, L, C, u, a, P, _, M, F, T, K, w, N, O, W
        return (
          o(),
          i('div', ta, [
            e('div', aa, [
              e('div', sa, [
                e('div', la, [
                  e('div', ra, [
                    (r = g.santri) != null && r.foto
                      ? (o(),
                        i(
                          'img',
                          {
                            key: 0,
                            src: g.santri.foto,
                            class: 'w-full h-full object-cover',
                            alt: 'Foto Santri'
                          },
                          null,
                          8,
                          oa
                        ))
                      : (o(), i('i', na))
                  ])
                ]),
                e('h2', ia, n(((x = g.santri) == null ? void 0 : x.nama) || '-'), 1),
                e(
                  'p',
                  da,
                  n(((p = g.santri) == null ? void 0 : p.lembaga) || '-') +
                    ' · Kelas ' +
                    n(((L = g.santri) == null ? void 0 : L.kelas) || '-'),
                  1
                ),
                s[0] ||
                  (s[0] = e(
                    'span',
                    {
                      class:
                        'inline-block mt-2 text-[10px] bg-cyan-100 text-cyan-700 font-bold px-3 py-1 rounded-full uppercase tracking-widest'
                    },
                    ' Santri ',
                    -1
                  ))
              ]),
              e('div', ua, [
                e('div', ca, [
                  s[7] ||
                    (s[7] = e(
                      'h3',
                      {
                        class:
                          'font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4'
                      },
                      [e('i', { class: 'fas fa-id-badge mr-2' }), y('Identitas ')],
                      -1
                    )),
                  e('ul', ba, [
                    e('li', ga, [
                      s[1] ||
                        (s[1] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'Nama:',
                          -1
                        )),
                      e('span', ma, n(((C = g.santri) == null ? void 0 : C.nama) || '-'), 1)
                    ]),
                    e('li', xa, [
                      s[2] ||
                        (s[2] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'NIS:',
                          -1
                        )),
                      e('span', pa, n(((u = g.santri) == null ? void 0 : u.nis) || '-'), 1)
                    ]),
                    e('li', fa, [
                      s[3] ||
                        (s[3] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'Username:',
                          -1
                        )),
                      e('span', ka, n(((a = g.santri) == null ? void 0 : a.username) || '-'), 1)
                    ]),
                    e('li', va, [
                      s[4] ||
                        (s[4] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'L/P:',
                          -1
                        )),
                      e('span', ya, n(S.value), 1)
                    ]),
                    e('li', ha, [
                      s[5] ||
                        (s[5] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'Tgl Lahir:',
                          -1
                        )),
                      e('span', wa, n($.value), 1)
                    ]),
                    e('li', _a, [
                      s[6] ||
                        (s[6] = e(
                          'span',
                          { class: 'text-slate-700 dark:text-slate-300 font-bold' },
                          'Status Mukim:',
                          -1
                        )),
                      e('span', $a, n(m.value), 1)
                    ])
                  ])
                ]),
                e('div', ja, [
                  s[14] ||
                    (s[14] = e(
                      'h3',
                      {
                        class:
                          'font-black text-cyan-800 text-sm uppercase tracking-widest border-b border-cyan-200 pb-2 mb-4'
                      },
                      [e('i', { class: 'fas fa-school mr-2' }), y('Pendidikan ')],
                      -1
                    )),
                  e('ul', Sa, [
                    e('li', Aa, [
                      s[8] ||
                        (s[8] = e('span', { class: 'text-cyan-700 font-bold' }, 'Lembaga:', -1)),
                      e('span', Ga, n(((P = g.santri) == null ? void 0 : P.lembaga) || '-'), 1)
                    ]),
                    e('li', Pa, [
                      s[9] ||
                        (s[9] = e(
                          'span',
                          { class: 'text-cyan-700 font-bold' },
                          'Kelas Pondok:',
                          -1
                        )),
                      e('span', Ba, n(((_ = g.santri) == null ? void 0 : _.kelas) || '-'), 1)
                    ]),
                    e('li', La, [
                      s[10] ||
                        (s[10] = e(
                          'span',
                          { class: 'text-cyan-700 font-bold' },
                          'Kelas Sekolah:',
                          -1
                        )),
                      e(
                        'span',
                        Ua,
                        n(((M = g.santri) == null ? void 0 : M.kelas_sekolah) || '-'),
                        1
                      )
                    ]),
                    e('li', Ca, [
                      s[11] ||
                        (s[11] = e('span', { class: 'text-cyan-700 font-bold' }, 'Guru Pagi:', -1)),
                      e(
                        'span',
                        Ta,
                        n(
                          ((F = g.santri) == null ? void 0 : F.guru_pagi) ||
                            ((T = g.santri) == null ? void 0 : T.guru) ||
                            '-'
                        ),
                        1
                      )
                    ]),
                    e('li', Na, [
                      s[12] ||
                        (s[12] = e('span', { class: 'text-cyan-700 font-bold' }, 'Guru Sore:', -1)),
                      e('span', Ia, n(((K = g.santri) == null ? void 0 : K.guru_sore) || '-'), 1)
                    ]),
                    (w = g.santri) != null && w.juz
                      ? (o(),
                        i('li', Ma, [
                          s[13] ||
                            (s[13] = e(
                              'span',
                              { class: 'text-cyan-700 font-bold' },
                              'Juz Sekarang:',
                              -1
                            )),
                          e('span', Fa, n(g.santri.juz), 1)
                        ]))
                      : I('', !0)
                  ])
                ]),
                e('div', Ka, [
                  s[17] ||
                    (s[17] = e(
                      'h3',
                      {
                        class:
                          'font-black text-amber-800 text-sm uppercase tracking-widest border-b border-amber-200 pb-2 mb-4 flex items-center justify-between'
                      },
                      [
                        e('span', null, [e('i', { class: 'fas fa-users mr-2' }), y('Wali Santri')]),
                        e(
                          'span',
                          {
                            class:
                              'text-[9px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded normal-case tracking-normal'
                          },
                          ' Akses akun ini '
                        )
                      ],
                      -1
                    )),
                  e('div', Da, [
                    e('div', Ea, [
                      s[15] ||
                        (s[15] = e(
                          'p',
                          { class: 'text-[10px] text-amber-600 font-bold uppercase' },
                          'Nama Wali',
                          -1
                        )),
                      e('p', Oa, n(((N = g.santri) == null ? void 0 : N.wali) || '-'), 1)
                    ]),
                    e('div', Wa, [
                      s[16] ||
                        (s[16] = e(
                          'p',
                          { class: 'text-[10px] text-amber-600 font-bold uppercase' },
                          'No WA Wali',
                          -1
                        )),
                      e('p', Va, n(((O = g.santri) == null ? void 0 : O.wa) || '-'), 1)
                    ])
                  ]),
                  s[18] ||
                    (s[18] = e(
                      'p',
                      {
                        class:
                          'text-[10px] text-amber-700 italic mt-3 bg-amber-100 p-2 rounded border border-amber-200'
                      },
                      [
                        e('i', { class: 'fas fa-info-circle mr-1' }),
                        y(
                          'Akun santri ini digunakan oleh wali (orang tua) untuk memantau perkembangan ananda — absensi, nilai rapor, tabungan, dan informasi pondok. '
                        )
                      ],
                      -1
                    ))
                ])
              ]),
              s[19] ||
                (s[19] = e(
                  'p',
                  { class: 'text-[10px] text-slate-400 italic mt-4 text-center' },
                  [
                    e('i', { class: 'fas fa-info-circle mr-1' }),
                    y(
                      'Untuk mengubah foto, sandi, atau no WA wali, klik avatar di kanan atas → Edit Profil. '
                    )
                  ],
                  -1
                ))
            ]),
            U.value.length > 0
              ? (o(),
                i('div', Ra, [
                  s[24] ||
                    (s[24] = e(
                      'h3',
                      {
                        class:
                          'font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2'
                      },
                      [
                        e('i', { class: 'fas fa-route text-blue-500' }),
                        y('Timeline Kenaikan Kelas ')
                      ],
                      -1
                    )),
                  e('div', qa, [
                    s[23] ||
                      (s[23] = e(
                        'div',
                        { class: 'absolute left-2 top-1 bottom-1 w-0.5 bg-blue-200' },
                        null,
                        -1
                      )),
                    (o(!0),
                    i(
                      Q,
                      null,
                      H(
                        U.value,
                        (f, B) => (
                          o(),
                          i('div', { key: B, class: 'relative mb-4 last:mb-0' }, [
                            s[22] ||
                              (s[22] = e(
                                'div',
                                {
                                  class:
                                    'absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-2 ring-white'
                                },
                                null,
                                -1
                              )),
                            e('div', za, [
                              e('div', Qa, [
                                e('span', Ha, n(ee(z)(f.tgl_naik)), 1),
                                e('span', Ja, [
                                  y(n(f.kelas_from || '—') + ' ', 1),
                                  s[20] ||
                                    (s[20] = e(
                                      'i',
                                      { class: 'fas fa-arrow-right text-[10px] mx-1' },
                                      null,
                                      -1
                                    )),
                                  y(' ' + n(f.kelas_to || '—'), 1)
                                ]),
                                f.juz ? (o(), i('span', Xa, n(f.juz), 1)) : I('', !0),
                                e('span', Ya, n(f.lembaga), 1)
                              ]),
                              f.catatan
                                ? (o(),
                                  i('p', Za, [
                                    s[21] ||
                                      (s[21] = e('i', { class: 'fas fa-comment mr-1' }, null, -1)),
                                    y(n(f.catatan), 1)
                                  ]))
                                : I('', !0),
                              f.guru ? (o(), i('p', es, 'Oleh: ' + n(f.guru), 1)) : I('', !0)
                            ])
                          ])
                        )
                      ),
                      128
                    ))
                  ])
                ]))
              : I('', !0),
            v.value.length > 0
              ? (o(),
                i('div', ts, [
                  s[27] ||
                    (s[27] = e(
                      'h3',
                      {
                        class:
                          'font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2'
                      },
                      [e('i', { class: 'fas fa-trophy text-amber-500' }), y('Riwayat Naik Kelas ')],
                      -1
                    )),
                  e('div', as, [
                    (o(!0),
                    i(
                      Q,
                      null,
                      H(
                        v.value,
                        (f) => (
                          o(),
                          i(
                            'div',
                            {
                              key: `${f.lembaga}-${f.kelasId}`,
                              class:
                                'bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 dark:border-slate-700'
                            },
                            [
                              e('div', ss, [
                                e('div', null, [
                                  e('h4', ls, [
                                    s[25] ||
                                      (s[25] = e(
                                        'i',
                                        { class: 'fas fa-graduation-cap text-emerald-600 mr-1' },
                                        null,
                                        -1
                                      )),
                                    y(n(f.lembaga) + ' — ' + n(f.kelasLabel), 1)
                                  ]),
                                  f.ceremonial
                                    ? (o(),
                                      i('p', rs, [
                                        s[26] ||
                                          (s[26] = e(
                                            'i',
                                            { class: 'fas fa-medal mr-1' },
                                            null,
                                            -1
                                          )),
                                        y('Ceremonial: ' + n(ee(z)(f.ceremonial)), 1)
                                      ]))
                                    : I('', !0)
                                ]),
                                e('span', os, n(f.totalTanggal) + ' Item Tuntas ', 1)
                              ]),
                              f.entries.length > 0
                                ? (o(),
                                  i('div', ns, [
                                    (o(!0),
                                    i(
                                      Q,
                                      null,
                                      H(
                                        f.entries,
                                        (B, Y) => (
                                          o(),
                                          i(
                                            'div',
                                            {
                                              key: Y,
                                              class: q([
                                                'border-l-4 px-3 py-2 rounded-r-lg',
                                                B.tipe === 'rekomendasi'
                                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500'
                                                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                                              ])
                                            },
                                            [
                                              e(
                                                'p',
                                                {
                                                  class: q([
                                                    'text-[10px] font-black uppercase tracking-wider mb-0.5',
                                                    B.tipe === 'rekomendasi'
                                                      ? 'text-emerald-700'
                                                      : 'text-blue-700'
                                                  ])
                                                },
                                                [
                                                  e(
                                                    'i',
                                                    {
                                                      class: q([
                                                        'fas mr-1',
                                                        B.tipe === 'rekomendasi'
                                                          ? 'fa-lightbulb'
                                                          : 'fa-comment-dots'
                                                      ])
                                                    },
                                                    null,
                                                    2
                                                  ),
                                                  y(
                                                    ' ' +
                                                      n(
                                                        B.tipe === 'rekomendasi'
                                                          ? 'Rekomendasi'
                                                          : 'Catatan'
                                                      ) +
                                                      ' ',
                                                    1
                                                  ),
                                                  e(
                                                    'span',
                                                    is,
                                                    ' · ' +
                                                      n(B.tanggal ? ee(z)(B.tanggal) : '—') +
                                                      n(B.itemLabel ? ' · ' + B.itemLabel : ''),
                                                    1
                                                  )
                                                ],
                                                2
                                              ),
                                              e('p', ds, n(B.text), 1)
                                            ],
                                            2
                                          )
                                        )
                                      ),
                                      128
                                    ))
                                  ]))
                                : (o(), i('p', us, ' Belum ada catatan/rekomendasi dari guru. '))
                            ]
                          )
                        )
                      ),
                      128
                    ))
                  ])
                ]))
              : I('', !0),
            te(
              ae,
              {
                role: 'santri',
                'entity-id': (W = g.santri) == null ? void 0 : W.id,
                entity: g.santri
              },
              null,
              8,
              ['entity-id', 'entity']
            )
          ])
        )
      }
    }
  },
  bs = { class: 'p-4 md:p-6 max-w-6xl mx-auto' },
  gs = { key: 0, class: 'flex items-center justify-center py-20' },
  ms = {
    key: 1,
    class: 'bg-rose-50 border-2 border-dashed border-rose-300 p-6 rounded-2xl text-center'
  },
  xs = { class: 'text-xs text-rose-600' },
  ps = {
    key: 5,
    class: 'bg-slate-50 border-2 border-dashed border-slate-300 p-6 rounded-2xl text-center'
  },
  fs = { class: 'text-xs text-slate-500 mt-1' },
  js = {
    __name: 'ProfilView',
    setup(g) {
      const k = ne(),
        l = j(() => k.sesiAktif),
        S = j(() => {
          var r
          return ((r = l.value) == null ? void 0 : r.role) || null
        }),
        $ = j(() => {
          var r, x
          return (
            ((r = l.value) == null ? void 0 : r.id) === 'admin' ||
            ((x = l.value) == null ? void 0 : x.auth_method) === 'admin-builtin'
          )
        }),
        m = G(null),
        U = G(null),
        v = G(!0),
        b = G(null)
      async function s() {
        ;((v.value = !0), (b.value = null), (m.value = null), (U.value = null))
        try {
          const r = l.value
          if (!(r != null && r.id)) {
            b.value = 'Sesi tidak valid'
            return
          }
          if ($.value) return
          if (
            r.role === 'guru' ||
            r.guru ||
            r.jabatan ||
            r.role_sistem === 'super_admin' ||
            r.role_sistem === 'admin' ||
            r.role_sistem === 'admin_keuangan'
          ) {
            const p = await re('guru', String(r.id))
            p ? (m.value = p) : (b.value = `Data guru ID ${r.id} tidak ditemukan`)
            return
          }
          if (r.role === 'santri') {
            const p = await re('santri', String(r.id))
            p ? (U.value = p) : (b.value = `Data santri ID ${r.id} tidak ditemukan`)
            return
          }
          b.value = `Role "${r.role}" belum didukung di halaman profil`
        } catch (r) {
          ;((b.value = r.message || String(r)), console.error('[ProfilView] load error:', r))
        } finally {
          v.value = !1
        }
      }
      return (
        he(s),
        we(
          () => {
            var r
            return (r = l.value) == null ? void 0 : r.id
          },
          (r, x) => {
            r && r !== x && s()
          }
        ),
        (r, x) => {
          var p
          return (
            o(),
            i('div', bs, [
              v.value
                ? (o(),
                  i('div', gs, [
                    ...(x[0] ||
                      (x[0] = [
                        e(
                          'div',
                          { class: 'text-center' },
                          [
                            e('i', { class: 'fas fa-spinner fa-spin text-4xl text-teal-500 mb-3' }),
                            e(
                              'p',
                              { class: 'text-sm text-slate-500 font-bold' },
                              'Memuat profil...'
                            )
                          ],
                          -1
                        )
                      ]))
                  ]))
                : b.value
                  ? (o(),
                    i('div', ms, [
                      x[2] ||
                        (x[2] = e(
                          'i',
                          { class: 'fas fa-exclamation-triangle text-rose-500 text-3xl mb-2' },
                          null,
                          -1
                        )),
                      x[3] ||
                        (x[3] = e(
                          'p',
                          { class: 'text-sm font-bold text-rose-800 mb-2' },
                          'Gagal memuat profil',
                          -1
                        )),
                      e('p', xs, n(b.value), 1),
                      e(
                        'button',
                        {
                          onClick: s,
                          class:
                            'mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg cursor-pointer'
                        },
                        [
                          ...(x[1] ||
                            (x[1] = [
                              e('i', { class: 'fas fa-redo mr-1' }, null, -1),
                              y('Coba Lagi ', -1)
                            ]))
                        ]
                      )
                    ]))
                  : $.value && !m.value && !U.value
                    ? (o(), J(rt, { key: 2 }))
                    : m.value
                      ? (o(), J(ea, { key: 3, guru: m.value }, null, 8, ['guru']))
                      : S.value === 'santri' && U.value
                        ? (o(), J(cs, { key: 4, santri: U.value }, null, 8, ['santri']))
                        : (o(),
                          i('div', ps, [
                            x[4] ||
                              (x[4] = e(
                                'i',
                                { class: 'fas fa-user-slash text-slate-400 text-3xl mb-2' },
                                null,
                                -1
                              )),
                            x[5] ||
                              (x[5] = e(
                                'p',
                                { class: 'text-sm font-bold text-slate-700' },
                                'Data profil tidak ditemukan',
                                -1
                              )),
                            e(
                              'p',
                              fs,
                              ' Akun ini (' +
                                n(((p = l.value) == null ? void 0 : p.role) || '?') +
                                ') belum terkonfigurasi penuh. Hubungi admin pondok. ',
                              1
                            )
                          ]))
            ])
          )
        }
      )
    }
  }
export { js as default }
