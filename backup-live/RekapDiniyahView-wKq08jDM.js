import {
  ab as W,
  ae as X,
  Q as c,
  I as ee,
  a2 as te,
  K as ae,
  h as o,
  e as r,
  j as _,
  a4 as d,
  ar as k,
  aj as F,
  F as b,
  U as x,
  ak as j,
  d as u,
  L as n,
  E as re,
  a8 as se,
  q,
  l as O,
  Y as L,
  Z as le
} from './index-CPbTnm_Q.js'
import { u as oe } from './useSantri-BrAe1mw4.js'
import { u as ne } from './useLembaga-8ypq4SFU.js'
import { u as ie } from './useToast-BjwjYk11.js'
const de = { class: 'p-4 md:p-6 max-w-7xl mx-auto space-y-4' },
  ue = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  pe = { class: 'flex items-center justify-between gap-3 flex-wrap mb-3' },
  ce = { class: 'text-[10px] text-slate-500 dark:text-slate-400' },
  be = { class: 'grid grid-cols-2 md:grid-cols-5 gap-2' },
  xe = ['value'],
  ke = ['value'],
  me = ['value'],
  ge = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'
  },
  fe = { key: 0, class: 'py-10 text-center' },
  he = { key: 1, class: 'overflow-x-auto' },
  ve = { class: 'w-full text-xs border-collapse' },
  ye = { class: 'bg-slate-100 dark:bg-slate-900/40 sticky top-0' },
  _e = {
    class:
      'py-1.5 px-2 border border-slate-300 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-800'
  },
  we = { class: 'py-1.5 px-2 border border-slate-300 text-center text-[11px] text-slate-600' },
  Se = { class: 'py-1.5 px-2 border border-slate-300 text-center text-[11px] text-slate-600' },
  Ae = ['value', 'onChange'],
  Ke = {
    __name: 'RekapDiniyahView',
    setup(De) {
      const { santriRaw: N } = oe(),
        { lembagaRaw: z } = ne(),
        m = W(),
        w = X(),
        K = ie(),
        M = ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab'],
        g = c(''),
        p = c(''),
        R = [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember'
        ],
        B = new Date(),
        f = c(B.getMonth() + 1),
        h = c(B.getFullYear()),
        v = c(''),
        T = c([])
      let S = null
      ;(ee(() => {
        S = te('rekap_diniyah', (a) => {
          T.value = a || []
        })
      }),
        ae(() => {
          if (S)
            try {
              S()
            } catch {}
        }))
      function U(a) {
        var s, i
        const e = (s = w.settings) == null ? void 0 : s.rekapSchemaDiniyahPerKelas
        if (e && typeof e == 'object') {
          const l = String(a || '').trim()
          if (Array.isArray(e[l]) && e[l].length > 0) return e[l]
        }
        const t = (i = w.settings) == null ? void 0 : i.rekapSchemaDiniyah
        return Array.isArray(t) && t.length > 0 ? t : M
      }
      const V = u(() => {
          var e
          if (p.value) return U(p.value)
          const a = new Set()
          for (const t of y.value) for (const s of U(t.kelas_sekolah)) a.add(s)
          if (a.size === 0) {
            const t = (e = w.settings) == null ? void 0 : e.rekapSchemaDiniyah
            return Array.isArray(t) && t.length > 0 ? t : M
          }
          return [...a]
        }),
        A = ['SDI', 'PKBM'],
        P = u(() => {
          const a = (z.value || [])
            .filter((e) => A.includes(e.lembaga))
            .map((e) => e.lembaga)
            .filter(Boolean)
          return a.length > 0 ? a : A
        }),
        Y = u(() => {
          const a = new Set()
          return (
            N.value.forEach((e) => {
              e.kelas_sekolah && a.add(e.kelas_sekolah)
            }),
            [...a].sort()
          )
        }),
        G = u(() => {
          var a, e, t
          return (
            ((a = m.sesiAktif) == null ? void 0 : a.role) === 'guru' &&
            ((e = m.sesiAktif) == null ? void 0 : e.role_sistem) !== 'super_admin' &&
            ((t = m.sesiAktif) == null ? void 0 : t.id) !== 'admin'
          )
        }),
        J = u(() => {
          var a
          return ((a = m.sesiAktif) == null ? void 0 : a.nama) || ''
        }),
        y = u(() => {
          let a = N.value.filter(
            (e) => e.aktif !== !1 && e.lembaga_sekolah && A.includes(e.lembaga_sekolah)
          )
          if (
            (G.value &&
              (a = a.filter(
                (e) => Array.isArray(e.guru_sekolah) && e.guru_sekolah.includes(J.value)
              )),
            g.value && (a = a.filter((e) => e.lembaga_sekolah === g.value)),
            p.value && (a = a.filter((e) => e.kelas_sekolah === p.value)),
            v.value.trim())
          ) {
            const e = v.value.trim().toLowerCase()
            a = a.filter((t) =>
              String(t.nama || '')
                .toLowerCase()
                .includes(e)
            )
          }
          return a.sort(
            (e, t) =>
              String(e.lembaga_sekolah).localeCompare(String(t.lembaga_sekolah)) ||
              String(e.kelas_sekolah).localeCompare(String(t.kelas_sekolah)) ||
              String(e.nama).localeCompare(String(t.nama))
          )
        }),
        D = u(() => `${h.value}_${String(f.value).padStart(2, '0')}`)
      function $(a) {
        return String(a)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '_')
      }
      function C(a) {
        const e = `diniyah_${a}_${D.value}`
        return T.value.find((t) => t.id === e) || null
      }
      function H(a, e) {
        var s
        const t = C(a)
        return ((s = t == null ? void 0 : t.data) == null ? void 0 : s[$(e)]) || ''
      }
      function E(a) {
        const e = C(a)
        if (!(e != null && e.data)) return '-'
        const t = Object.values(e.data)
          .map((i) => parseFloat(i))
          .filter((i) => !isNaN(i))
        return t.length === 0 ? '-' : (t.reduce((i, l) => i + l, 0) / t.length).toFixed(1)
      }
      function Q(a) {
        if (a === '-') return 'text-slate-400'
        const e = parseFloat(a)
        return e >= 85
          ? 'text-emerald-700 dark:text-emerald-400'
          : e >= 70
            ? 'text-blue-700 dark:text-blue-400'
            : e >= 60
              ? 'text-amber-700 dark:text-amber-400'
              : 'text-rose-700 dark:text-rose-400'
      }
      async function Z(a, e, t) {
        const s = `diniyah_${a}_${D.value}`,
          i = $(e)
        try {
          const l = C(a),
            I = { ...((l == null ? void 0 : l.data) || {}), [i]: t }
          ;(l
            ? await se(q(O, 'rekap_diniyah', s), { data: I, updated_at: L() })
            : await le(q(O, 'rekap_diniyah', s), {
                id: s,
                santri_id: a,
                periode: D.value,
                data: I,
                created_at: L(),
                updated_at: L()
              }),
            K.success(`Tersimpan: ${e}`))
        } catch (l) {
          ;(K.error(`Gagal simpan: ${l.message || l}`),
            console.error('[RekapDiniyah] saveCell error:', l))
        }
      }
      return (a, e) => (
        n(),
        o('div', de, [
          r('div', ue, [
            r('div', pe, [
              e[5] ||
                (e[5] = r(
                  'h2',
                  { class: 'text-base md:text-lg font-black text-slate-800 dark:text-white' },
                  [r('i', { class: 'fas fa-mosque text-indigo-600 mr-2' }), _('Rekap Diniyah ')],
                  -1
                )),
              r('p', ce, d(y.value.length) + ' santri · ' + d(R[f.value - 1]) + ' ' + d(h.value), 1)
            ]),
            r('div', be, [
              k(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': e[0] || (e[0] = (t) => (f.value = t)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    (n(),
                    o(
                      b,
                      null,
                      x(R, (t, s) => r('option', { key: t, value: s + 1 }, d(t), 9, xe)),
                      64
                    ))
                  ],
                  512
                ),
                [[F, f.value, void 0, { number: !0 }]]
              ),
              k(
                r(
                  'input',
                  {
                    'onUpdate:modelValue': e[1] || (e[1] = (t) => (h.value = t)),
                    type: 'number',
                    min: '2024',
                    max: '2030',
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  null,
                  512
                ),
                [[j, h.value, void 0, { number: !0 }]]
              ),
              k(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': e[2] || (e[2] = (t) => (g.value = t)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    e[6] || (e[6] = r('option', { value: '' }, 'Semua Lembaga', -1)),
                    (n(!0),
                    o(
                      b,
                      null,
                      x(P.value, (t) => (n(), o('option', { key: t, value: t }, d(t), 9, ke))),
                      128
                    ))
                  ],
                  512
                ),
                [[F, g.value]]
              ),
              k(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': e[3] || (e[3] = (t) => (p.value = t)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    e[7] || (e[7] = r('option', { value: '' }, 'Semua Kelas', -1)),
                    (n(!0),
                    o(
                      b,
                      null,
                      x(Y.value, (t) => (n(), o('option', { key: t, value: t }, d(t), 9, me))),
                      128
                    ))
                  ],
                  512
                ),
                [[F, p.value]]
              ),
              k(
                r(
                  'input',
                  {
                    'onUpdate:modelValue': e[4] || (e[4] = (t) => (v.value = t)),
                    type: 'search',
                    placeholder: 'Cari santri...',
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  null,
                  512
                ),
                [[j, v.value]]
              )
            ])
          ]),
          r('div', ge, [
            y.value.length === 0
              ? (n(),
                o('div', fe, [
                  ...(e[8] ||
                    (e[8] = [
                      r(
                        'i',
                        { class: 'fas fa-users-slash text-slate-300 text-3xl block mb-2' },
                        null,
                        -1
                      ),
                      r(
                        'p',
                        { class: 'text-sm text-slate-500 italic' },
                        'Tidak ada santri di filter ini.',
                        -1
                      ),
                      r(
                        'p',
                        { class: 'text-[10px] text-slate-400' },
                        'Pilih lembaga/kelas lain atau pastikan santri punya lembaga_sekolah.',
                        -1
                      )
                    ]))
                ]))
              : (n(),
                o('div', he, [
                  r('table', ve, [
                    r('thead', ye, [
                      r('tr', null, [
                        e[9] ||
                          (e[9] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-left font-black uppercase text-[10px] sticky left-0 bg-slate-100 z-10'
                            },
                            'Nama',
                            -1
                          )),
                        e[10] ||
                          (e[10] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]'
                            },
                            'Lembaga',
                            -1
                          )),
                        e[11] ||
                          (e[11] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]'
                            },
                            'Kelas',
                            -1
                          )),
                        (n(!0),
                        o(
                          b,
                          null,
                          x(
                            V.value,
                            (t) => (
                              n(),
                              o(
                                'th',
                                {
                                  key: t,
                                  class:
                                    'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200'
                                },
                                d(t),
                                1
                              )
                            )
                          ),
                          128
                        )),
                        e[12] ||
                          (e[12] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-amber-50 text-amber-800'
                            },
                            'Rata2',
                            -1
                          ))
                      ])
                    ]),
                    r('tbody', null, [
                      (n(!0),
                      o(
                        b,
                        null,
                        x(
                          y.value,
                          (t) => (
                            n(),
                            o(
                              'tr',
                              { key: t.id, class: 'hover:bg-slate-50 dark:hover:bg-slate-700/30' },
                              [
                                r('td', _e, d(t.nama), 1),
                                r('td', we, d(t.lembaga_sekolah || '-'), 1),
                                r('td', Se, d(t.kelas_sekolah || '-'), 1),
                                (n(!0),
                                o(
                                  b,
                                  null,
                                  x(
                                    V.value,
                                    (s) => (
                                      n(),
                                      o(
                                        'td',
                                        { key: s, class: 'py-0.5 px-1 border border-slate-300' },
                                        [
                                          r(
                                            'input',
                                            {
                                              type: 'text',
                                              inputmode: 'numeric',
                                              value: H(t.id, s),
                                              onChange: (i) => Z(t.id, s, i.target.value),
                                              class:
                                                'w-full text-center text-[11px] py-1 px-1 border-0 outline-none bg-transparent focus:bg-yellow-50 dark:focus:bg-yellow-900/30 dark:text-white',
                                              placeholder: '-'
                                            },
                                            null,
                                            40,
                                            Ae
                                          )
                                        ]
                                      )
                                    )
                                  ),
                                  128
                                )),
                                r(
                                  'td',
                                  {
                                    class: re([
                                      'py-1.5 px-2 border border-slate-300 text-center font-black bg-amber-50 dark:bg-amber-900/20',
                                      Q(E(t.id))
                                    ])
                                  },
                                  d(E(t.id)),
                                  3
                                )
                              ]
                            )
                          )
                        ),
                        128
                      ))
                    ])
                  ])
                ]))
          ]),
          e[13] ||
            (e[13] = r(
              'p',
              { class: 'text-[10px] text-slate-400 italic text-center' },
              [
                r('i', { class: 'fas fa-info-circle mr-1' }),
                _(' Nilai per cell auto-save ke koleksi '),
                r('code', null, 'rekap_diniyah'),
                _(' (doc id: '),
                r('code', null, 'diniyah_{santri_id}_{periodKey}'),
                _('). ')
              ],
              -1
            ))
        ])
      )
    }
  }
export { Ke as default }
