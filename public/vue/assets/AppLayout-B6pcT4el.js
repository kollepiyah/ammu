import {
  ae as z,
  af as B,
  ac as E,
  ad as K,
  L as l,
  h as i,
  e,
  a7 as p,
  a4 as f,
  g as _,
  F as T,
  U as D,
  E as h,
  j,
  d as x,
  ab as V,
  I as W,
  H as J,
  k as v,
  aq as H,
  a as I,
  Q as q,
  f as Y,
  T as Q,
  W as X
} from './index-DlQzz-jb.js'
import { u as Z } from './useMenus-BioGzquq.js'
import { u as G } from './useToast-DlBPYiJY.js'
import { m as ee, g as te } from './hijri-BQdwk8_X.js'
import { u as ae } from './useConfirm-DiDVgre1.js'
import { g as se } from './format-CpwY2Om2.js'
import { _ as re } from './_plugin-vue_export-helper-DlAUqK2U.js'
import { c as oe } from './createLucideIcon-B5kfwNOK.js'
/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ne = oe('TriangleAlertIcon', [
    [
      'path',
      {
        d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
        key: 'wmoenq'
      }
    ],
    ['path', { d: 'M12 9v4', key: 'juzpu7' }],
    ['path', { d: 'M12 17h.01', key: 'p32p05' }]
  ]),
  le = {
    class:
      'px-6 pt-8 pb-6 flex flex-col items-center gap-3 relative bg-emerald-50/60 dark:bg-black/20'
  },
  ie = ['src'],
  de = { class: 'text-center w-full mt-1' },
  ce = {
    class: 'text-[19px] font-black text-slate-800 dark:text-white leading-tight tracking-tight'
  },
  ue = { class: 'block' },
  fe = { key: 0, class: 'block' },
  be = {
    class:
      'text-[10px] text-teal-700 dark:text-teal-300 font-bold uppercase tracking-widest mt-3 bg-teal-100/60 dark:bg-white/10 px-3 py-1 rounded-full inline-block truncate'
  },
  pe = {
    class:
      'flex-1 overflow-y-auto py-4 px-3 custom-scrollbar border-t border-emerald-100 dark:border-white/10',
    'aria-label': 'Menu utama'
  },
  me = ['onClick', 'title'],
  xe = { class: 'flex-1' },
  ge = {
    key: 0,
    class:
      'text-[8px] bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-white/60 px-1.5 py-0.5 rounded uppercase tracking-wider'
  },
  ke = {
    __name: 'AppSidebar',
    setup(P) {
      const d = z(),
        n = B(),
        c = E(),
        w = K(),
        g = G(),
        { groupedMenus: m } = Z(),
        y = {
          Menu: 'fa-th-large',
          Pendidikan: 'fa-graduation-cap',
          Keuangan: 'fa-coins',
          Sistem: 'fa-shield-halved'
        }
      function k(t) {
        return y[t] || 'fa-folder'
      }
      function $(t) {
        return t
          .toLowerCase()
          .split(/\s+/)
          .map((a) => (a.length ? a[0].toUpperCase() + a.slice(1) : a))
          .join(' ')
      }
      const C = x(() => {
          var a, o
          const t =
            ((a = d.settings) == null ? void 0 : a.txtSidebarTitle) ||
            ((o = d.settings) == null ? void 0 : o.kopLine1) ||
            'PONDOK PESANTREN MAMBAUL ULUM'
          return $(t)
        }),
        L = x(() => {
          const t = C.value,
            a = t.match(/^(Pondok Pesantren|Pesantren|Madrasah|Sekolah|Yayasan)\s+/i)
          return a ? a[1] : t
        }),
        A = x(() => {
          const t = C.value,
            a = t.match(/^(Pondok Pesantren|Pesantren|Madrasah|Sekolah|Yayasan)\s+/i)
          return a ? t.replace(a[0], '').trim() : ''
        }),
        M = x(() => {
          var t
          return ((t = d.settings) == null ? void 0 : t.logoUrl) || '/logo.png'
        })
      function U(t) {
        t != null && t.target && (t.target.src = '/favicon.svg')
      }
      const O = [
          'Muharram',
          'Shafar',
          'Rabiul Awal',
          'Rabiul Akhir',
          'Jumadil Awal',
          'Jumadil Akhir',
          'Rajab',
          "Sya'ban",
          'Ramadhan',
          'Syawal',
          "Dzulqo'dah",
          'Dzulhijjah'
        ],
        R = x(() => {
          var a
          const t = String(((a = d.settings) == null ? void 0 : a.txtPeriode) || '').trim()
          if (t) return t
          try {
            const o = ee(new Date(), te(d.settings || {}))
            return !o || !o.month || !o.year
              ? "Dzulqo'dah 1447"
              : `${O[o.month - 1] || '?'} ${o.year}`
          } catch {
            return "Dzulqo'dah 1447"
          }
        })
      function S(t) {
        const [a, o] = String(t || '').split('?'),
          b = {}
        return (
          o &&
            o.split('&').forEach((u) => {
              const [N, F] = u.split('=')
              N && (b[N] = decodeURIComponent(F || ''))
            }),
          { pathOnly: a, query: b }
        )
      }
      function s(t) {
        const { pathOnly: a, query: o } = S(t)
        return c.path !== a && !c.path.startsWith(a + '/')
          ? !1
          : Object.keys(o).length > 0
            ? Object.entries(o).every(([b, u]) => String(c.query[b] || '') === u)
            : !c.query.tab
      }
      function r(t) {
        if (!t.available) {
          g.info(`"${t.name}" masih di versi lama. Migrasi sedang berlangsung.`)
          return
        }
        const { pathOnly: a, query: o } = S(t.path)
        ;(w.push({ path: a, query: o }).catch(() => {}),
          typeof window < 'u' && window.innerWidth < 768 && n.closeSidebar())
      }
      return (t, a) => (
        l(),
        i(
          T,
          null,
          [
            e(
              'aside',
              {
                class: h([
                  'bg-white dark:bg-slate-900 text-slate-700 dark:text-white flex-shrink-0 flex flex-col absolute inset-y-0 left-0 transform transition-all duration-300 z-50 shadow-xl border-r border-emerald-100 dark:border-white/5 md:relative overflow-hidden',
                  p(n).sidebarOpen
                    ? 'translate-x-0 w-72'
                    : '-translate-x-full w-72 md:translate-x-0 md:w-0 md:border-0 md:shadow-none'
                ]),
                'aria-label': 'Sidebar navigasi'
              },
              [
                e('div', le, [
                  e(
                    'button',
                    {
                      onClick: a[0] || (a[0] = (o) => p(n).closeSidebar()),
                      class:
                        'md:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-white/70 dark:hover:text-white text-xl',
                      'aria-label': 'Tutup sidebar'
                    },
                    [...(a[2] || (a[2] = [e('i', { class: 'fas fa-times' }, null, -1)]))]
                  ),
                  e(
                    'img',
                    {
                      src: M.value,
                      class:
                        'w-24 h-24 object-contain drop-shadow-md hover:scale-105 transition-transform',
                      alt: 'Logo Mambaul Ulum',
                      onError: U
                    },
                    null,
                    40,
                    ie
                  ),
                  e('div', de, [
                    e('h1', ce, [
                      e('span', ue, f(L.value), 1),
                      A.value ? (l(), i('span', fe, f(A.value), 1)) : _('', !0)
                    ]),
                    e('p', be, f(R.value), 1)
                  ])
                ]),
                e('nav', pe, [
                  (l(!0),
                  i(
                    T,
                    null,
                    D(
                      p(m),
                      (o, b) => (
                        l(),
                        i(
                          T,
                          { key: b },
                          [
                            e(
                              'p',
                              {
                                class: h([
                                  'text-[10px] font-bold uppercase tracking-widest pl-2 mb-1 mt-4 first:mt-1 flex items-center gap-1.5',
                                  b === 'Keuangan'
                                    ? 'text-amber-700 dark:text-amber-300'
                                    : 'text-slate-500 dark:text-slate-400'
                                ])
                              },
                              [
                                e(
                                  'i',
                                  { class: h(['fas', k(b), 'text-[11px] opacity-80']) },
                                  null,
                                  2
                                ),
                                j(f(b), 1)
                              ],
                              2
                            ),
                            (l(!0),
                            i(
                              T,
                              null,
                              D(
                                o,
                                (u) => (
                                  l(),
                                  i(
                                    'button',
                                    {
                                      key: u.path,
                                      onClick: (N) => r(u),
                                      class: h([
                                        'menu-item w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-3 font-semibold text-[14px] border-l-[3px]',
                                        s(u.path)
                                          ? b === 'Keuangan'
                                            ? 'border-amber-600 text-amber-800 bg-amber-50 dark:border-amber-400 dark:text-amber-100 dark:bg-amber-700/20'
                                            : 'border-teal-600 text-teal-800 bg-teal-50 dark:border-teal-400 dark:text-white dark:bg-teal-700/30'
                                          : b === 'Keuangan'
                                            ? 'border-transparent text-amber-800 hover:bg-amber-50 dark:text-amber-100 dark:hover:bg-amber-900/20'
                                            : 'border-transparent text-slate-700 hover:bg-emerald-100/50 dark:text-slate-300 dark:hover:bg-white/5',
                                        u.available ? '' : 'opacity-55'
                                      ]),
                                      title: u.available
                                        ? ''
                                        : 'Halaman ini masih di versi lama, akan dimigrasi'
                                    },
                                    [
                                      e(
                                        'i',
                                        {
                                          class: h([
                                            'fas',
                                            u.icon,
                                            'w-5 text-center text-[15px]',
                                            s(u.path)
                                              ? b === 'Keuangan'
                                                ? 'text-amber-600 dark:text-amber-300'
                                                : 'text-teal-600 dark:text-teal-300'
                                              : 'text-slate-500 dark:text-slate-400'
                                          ])
                                        },
                                        null,
                                        2
                                      ),
                                      e('span', xe, f(u.name), 1),
                                      u.available ? _('', !0) : (l(), i('span', ge, 'Legacy'))
                                    ],
                                    10,
                                    me
                                  )
                                )
                              ),
                              128
                            ))
                          ],
                          64
                        )
                      )
                    ),
                    128
                  ))
                ]),
                a[3] ||
                  (a[3] = e(
                    'div',
                    {
                      class:
                        'px-4 py-4 text-center bg-emerald-50/60 dark:bg-black/20 border-t border-emerald-100 dark:border-white/10'
                    },
                    [
                      e(
                        'p',
                        {
                          class:
                            'text-[9px] text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase'
                        },
                        ' © 2026 Mambaul Ulum '
                      ),
                      e(
                        'p',
                        {
                          class:
                            'text-[9px] text-teal-600 dark:text-teal-400 font-bold tracking-widest mt-0.5'
                        },
                        ' v.21.10.0526 '
                      )
                    ],
                    -1
                  ))
              ],
              2
            ),
            p(n).sidebarOpen
              ? (l(),
                i('div', {
                  key: 0,
                  onClick: a[1] || (a[1] = (o) => p(n).closeSidebar()),
                  class: 'md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm'
                }))
              : _('', !0)
          ],
          64
        )
      )
    }
  },
  he = {
    class:
      'bg-white/95 dark:bg-slate-800 backdrop-blur-sm shadow-sm border-b-2 border-teal-600/30 dark:border-slate-700 px-4 md:px-8 py-3 flex justify-between items-center z-30 sticky top-0'
  },
  ve = { class: 'flex items-center gap-3' },
  _e = { class: 'text-sm md:text-base font-black text-slate-800 dark:text-white tracking-tight' },
  we = { class: 'flex items-center gap-2' },
  ye = { class: 'text-right hidden md:block mr-2' },
  $e = { class: 'text-xs font-black text-slate-800 dark:text-white leading-tight' },
  Ae = {
    class:
      'text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5'
  },
  Se = ['title'],
  Ce = { key: 0, class: 'fas fa-user text-teal-600 dark:text-teal-200' },
  Le = ['src'],
  Me = {
    key: 0,
    class:
      'absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50'
  },
  Te = { class: 'px-4 py-3 border-b border-slate-100 dark:border-slate-700' },
  je = { class: 'text-sm font-black text-slate-800 dark:text-white truncate' },
  Pe = {
    class:
      'text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5'
  },
  Ue = {
    __name: 'AppHeader',
    setup(P) {
      const d = V(),
        n = B(),
        c = z(),
        w = ae(),
        g = G()
      E()
      const m = K(),
        y = x(() => {
          var s, r
          return (
            ((s = c.settings) == null ? void 0 : s.txtHeaderBar) ||
            ((r = c.settings) == null ? void 0 : r.txtAppName) ||
            'Ammu Online'
          )
        }),
        k = q(!1),
        $ = q(null),
        C = { admin: 'Administrator', guru: 'Guru/Pegawai', santri: 'Santri/Wali' },
        L = x(() => {
          var s
          return C[(s = d.sesiAktif) == null ? void 0 : s.role] || '—'
        }),
        A = x(() => {
          const s = d.sesiAktif
          return s
            ? s.id === 'admin'
              ? 'Administrator'
              : s.role === 'guru' || s.role === 'admin'
                ? se(s.nama, s.jk) || s.nama || s.username || 'Pengguna'
                : s.nama || s.username || '—'
            : 'User'
        }),
        M = x(() => {
          var s
          return ((s = d.sesiAktif) == null ? void 0 : s.foto) || ''
        })
      function U() {
        ;((k.value = !1), m.push('/profil'))
      }
      function O() {
        ;((k.value = !1), m.push('/pengaturan-web'))
      }
      async function R() {
        ;((k.value = !1),
          (await w({
            title: 'Keluar dari aplikasi?',
            message: 'Anda akan diarahkan ke halaman login.',
            confirmText: 'Keluar',
            cancelText: 'Batal',
            danger: !0
          })) && (await d.logout(), g.success('Berhasil keluar'), m.push('/login')))
      }
      function S(s) {
        $.value && !$.value.contains(s.target) && (k.value = !1)
      }
      return (
        W(() => document.addEventListener('click', S)),
        J(() => document.removeEventListener('click', S)),
        (s, r) => (
          l(),
          i('header', he, [
            e('div', ve, [
              e(
                'button',
                {
                  onClick: r[0] || (r[0] = (t) => p(n).toggleSidebar()),
                  class:
                    'text-slate-500 dark:text-slate-300 hover:text-teal-600 text-xl transition cursor-pointer',
                  'aria-label': 'Toggle sidebar'
                },
                [...(r[3] || (r[3] = [e('i', { class: 'fas fa-bars' }, null, -1)]))]
              ),
              e('h2', _e, f(y.value), 1)
            ]),
            e('div', we, [
              e('div', ye, [e('p', $e, f(A.value), 1), e('p', Ae, f(L.value), 1)]),
              e(
                'button',
                {
                  onClick: r[1] || (r[1] = (t) => p(n).toggleDark()),
                  class:
                    'w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition cursor-pointer',
                  title: p(n).isDark ? 'Mode Terang' : 'Mode Gelap',
                  'aria-label': 'Toggle dark mode'
                },
                [
                  e(
                    'i',
                    {
                      class: h([
                        'fas',
                        p(n).isDark ? 'fa-sun text-amber-400' : 'fa-moon text-slate-600'
                      ])
                    },
                    null,
                    2
                  )
                ],
                8,
                Se
              ),
              e(
                'div',
                { class: 'relative', ref_key: 'dropdownRef', ref: $ },
                [
                  e(
                    'button',
                    {
                      onClick: r[2] || (r[2] = (t) => (k.value = !k.value)),
                      class:
                        'w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-700 dark:to-cyan-700 hover:ring-2 hover:ring-teal-300 dark:hover:ring-teal-500 flex items-center justify-center transition cursor-pointer overflow-hidden border border-slate-200 dark:border-slate-600',
                      'aria-label': 'Menu profil'
                    },
                    [
                      M.value
                        ? (l(),
                          i(
                            'img',
                            {
                              key: 1,
                              src: M.value,
                              alt: 'Foto profil',
                              class: 'w-full h-full object-cover'
                            },
                            null,
                            8,
                            Le
                          ))
                        : (l(), i('i', Ce))
                    ]
                  ),
                  v(
                    I,
                    {
                      'enter-active-class': 'transition duration-150',
                      'enter-from-class': 'opacity-0 scale-95',
                      'enter-to-class': 'opacity-100 scale-100',
                      'leave-active-class': 'transition duration-100',
                      'leave-from-class': 'opacity-100 scale-100',
                      'leave-to-class': 'opacity-0 scale-95'
                    },
                    {
                      default: H(() => [
                        k.value
                          ? (l(),
                            i('div', Me, [
                              e('div', Te, [e('p', je, f(A.value), 1), e('p', Pe, f(L.value), 1)]),
                              e(
                                'button',
                                {
                                  onClick: U,
                                  class:
                                    'w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition cursor-pointer'
                                },
                                [
                                  ...(r[4] ||
                                    (r[4] = [
                                      e(
                                        'i',
                                        { class: 'fas fa-user-circle text-purple-500 w-5' },
                                        null,
                                        -1
                                      ),
                                      j('Profil Saya ', -1)
                                    ]))
                                ]
                              ),
                              p(d).isAdmin
                                ? (l(),
                                  i(
                                    'button',
                                    {
                                      key: 0,
                                      onClick: O,
                                      class:
                                        'w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition cursor-pointer'
                                    },
                                    [
                                      ...(r[5] ||
                                        (r[5] = [
                                          e(
                                            'i',
                                            { class: 'fas fa-cog text-cyan-500 w-5' },
                                            null,
                                            -1
                                          ),
                                          j('Pengaturan ', -1)
                                        ]))
                                    ]
                                  ))
                                : _('', !0),
                              r[7] ||
                                (r[7] = e(
                                  'div',
                                  { class: 'border-t border-slate-100 dark:border-slate-700 my-1' },
                                  null,
                                  -1
                                )),
                              e(
                                'button',
                                {
                                  onClick: R,
                                  class:
                                    'w-full text-left px-4 py-2.5 text-sm font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 transition cursor-pointer'
                                },
                                [
                                  ...(r[6] ||
                                    (r[6] = [
                                      e('i', { class: 'fas fa-sign-out-alt w-5' }, null, -1),
                                      j('Keluar ', -1)
                                    ]))
                                ]
                              )
                            ]))
                          : _('', !0)
                      ]),
                      _: 1
                    }
                  )
                ],
                512
              )
            ])
          ])
        )
      )
    }
  },
  Oe = { class: 'bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-5' },
  Re = { class: 'flex items-center gap-3 mb-3' },
  Ne = {
    key: 0,
    class:
      'w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600'
  },
  Be = { class: 'text-lg font-bold' },
  De = ['innerHTML'],
  qe = { class: 'flex justify-end gap-2' },
  ze = {
    __name: 'ConfirmDialog',
    setup(P) {
      const d = B(),
        n = x(() => d.confirmState)
      function c(g) {
        d.confirmResolve(g)
      }
      function w(g) {
        g.target === g.currentTarget && c(!1)
      }
      return (g, m) => (
        l(),
        Y(Q, { to: 'body' }, [
          v(
            I,
            { name: 'fade' },
            {
              default: H(() => [
                n.value.open
                  ? (l(),
                    i(
                      'div',
                      {
                        key: 0,
                        class:
                          'fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4',
                        onClick: w
                      },
                      [
                        e('div', Oe, [
                          e('div', Re, [
                            n.value.danger
                              ? (l(), i('div', Ne, [v(p(ne), { class: 'w-5 h-5' })]))
                              : _('', !0),
                            e('h3', Be, f(n.value.title), 1)
                          ]),
                          e(
                            'div',
                            {
                              class: 'text-sm text-slate-600 dark:text-slate-300 mb-5',
                              innerHTML: n.value.message
                            },
                            null,
                            8,
                            De
                          ),
                          e('div', qe, [
                            e(
                              'button',
                              {
                                type: 'button',
                                class:
                                  'px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-300 dark:hover:bg-slate-600',
                                onClick: m[0] || (m[0] = (y) => c(!1))
                              },
                              f(n.value.cancelText),
                              1
                            ),
                            e(
                              'button',
                              {
                                type: 'button',
                                class: h([
                                  'px-4 py-2 rounded-lg text-white font-medium text-sm',
                                  n.value.danger
                                    ? 'bg-rose-600 hover:bg-rose-700'
                                    : 'bg-teal-600 hover:bg-teal-700'
                                ]),
                                onClick: m[1] || (m[1] = (y) => c(!0))
                              },
                              f(n.value.confirmText),
                              3
                            )
                          ])
                        ])
                      ]
                    ))
                  : _('', !0)
              ]),
              _: 1
            }
          )
        ])
      )
    }
  },
  Ee = re(ze, [['__scopeId', 'data-v-e52d5bfe']]),
  Ke = { class: 'h-screen flex overflow-hidden bg-amber-50/40 dark:bg-slate-900' },
  He = { class: 'flex-1 flex flex-col overflow-hidden' },
  Ie = { class: 'flex-1 overflow-y-auto custom-scrollbar' },
  Ze = {
    __name: 'AppLayout',
    setup(P) {
      return (d, n) => {
        const c = X('router-view')
        return (l(), i('div', Ke, [v(ke), e('div', He, [v(Ue), e('main', Ie, [v(c)])]), v(Ee)]))
      }
    }
  }
export { Ze as default }
