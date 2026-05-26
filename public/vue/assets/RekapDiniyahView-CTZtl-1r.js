import {
  ab as W,
  ae as X,
  Q as c,
  I as ee,
  a2 as te,
  K as ae,
  h as l,
  e as r,
  j as v,
  a4 as i,
  ar as k,
  aj as C,
  F as b,
  U as x,
  ak as I,
  d as u,
  L as o,
  E as re,
  a8 as se,
  q,
  l as z,
  Y as L,
  Z as le
} from './index-DlQzz-jb.js'
import { u as oe } from './useToast-DlBPYiJY.js'
import { u as ne } from './useSantri-DJehexBi.js'
import { u as ie } from './useLembaga--Gos7VCc.js'
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
      const { santriRaw: M } = ne(),
        { lembagaRaw: O } = ie(),
        N = W(),
        y = X(),
        K = oe(),
        B = ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab'],
        m = c(''),
        p = c(''),
        _ = c(''),
        F = [
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
        U = new Date(),
        g = c(U.getMonth() + 1),
        f = c(U.getFullYear()),
        R = c([])
      let w = null
      ;(ee(() => {
        w = te('rekap_diniyah', (a) => {
          R.value = a || []
        })
      }),
        ae(() => {
          if (w)
            try {
              w()
            } catch {}
        }))
      function T(a) {
        var s, d
        const t = (s = y.settings) == null ? void 0 : s.rekapSchemaDiniyahPerKelas
        if (t && typeof t == 'object') {
          const n = String(a || '').trim()
          if (Array.isArray(t[n]) && t[n].length > 0) return t[n]
        }
        const e = (d = y.settings) == null ? void 0 : d.rekapSchemaDiniyah
        return Array.isArray(e) && e.length > 0 ? e : B
      }
      const V = u(() => {
          var t
          if (p.value) return T(p.value)
          const a = new Set()
          for (const e of h.value) for (const s of T(e.kelas_sekolah)) a.add(s)
          if (a.size === 0) {
            const e = (t = y.settings) == null ? void 0 : t.rekapSchemaDiniyah
            return Array.isArray(e) && e.length > 0 ? e : B
          }
          return [...a]
        }),
        S = ['SDI', 'PKBM'],
        P = u(() => {
          const a = (O.value || [])
            .filter((t) => S.includes(t.lembaga))
            .map((t) => t.lembaga)
            .filter(Boolean)
          return a.length > 0 ? a : S
        }),
        G = u(() => {
          const a = new Set()
          return (
            M.value.forEach((t) => {
              t.kelas_sekolah && a.add(t.kelas_sekolah)
            }),
            [...a].sort()
          )
        }),
        J = u(() => {
          const a = N.sesiAktif
          return (
            (a == null ? void 0 : a.role) === 'guru' &&
            (a == null ? void 0 : a.role_sistem) !== 'super_admin' &&
            (a == null ? void 0 : a.id) !== 'admin'
          )
        }),
        Y = u(() => {
          var a
          return ((a = N.sesiAktif) == null ? void 0 : a.nama) || ''
        }),
        h = u(() => {
          let a = M.value.filter(
            (e) => e.aktif !== !1 && e.lembaga_sekolah && S.includes(e.lembaga_sekolah)
          )
          ;(J.value &&
            (a = a.filter(
              (e) => Array.isArray(e.guru_sekolah) && e.guru_sekolah.includes(Y.value)
            )),
            m.value && (a = a.filter((e) => e.lembaga_sekolah === m.value)),
            p.value && (a = a.filter((e) => e.kelas_sekolah === p.value)))
          const t = _.value.trim().toLowerCase()
          return (
            t &&
              (a = a.filter((e) =>
                String(e.nama || '')
                  .toLowerCase()
                  .includes(t)
              )),
            a.sort(
              (e, s) =>
                String(e.lembaga_sekolah).localeCompare(String(s.lembaga_sekolah)) ||
                String(e.kelas_sekolah).localeCompare(String(s.kelas_sekolah)) ||
                String(e.nama).localeCompare(String(s.nama))
            )
          )
        }),
        A = u(() => `${f.value}_${String(g.value).padStart(2, '0')}`)
      function $(a) {
        return String(a)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '_')
      }
      function D(a) {
        const t = `diniyah_${a}_${A.value}`
        return R.value.find((e) => e.id === t) || null
      }
      function H(a, t) {
        var s
        const e = D(a)
        return ((s = e == null ? void 0 : e.data) == null ? void 0 : s[$(t)]) || ''
      }
      function E(a) {
        const t = D(a)
        if (!(t != null && t.data)) return '-'
        const e = Object.values(t.data)
          .map((s) => parseFloat(s))
          .filter((s) => !isNaN(s))
        return e.length === 0 ? '-' : (e.reduce((s, d) => s + d, 0) / e.length).toFixed(1)
      }
      function Q(a) {
        if (a === '-') return 'text-slate-400'
        const t = parseFloat(a)
        return t >= 85
          ? 'text-emerald-700 dark:text-emerald-400'
          : t >= 70
            ? 'text-blue-700 dark:text-blue-400'
            : t >= 60
              ? 'text-amber-700 dark:text-amber-400'
              : 'text-rose-700 dark:text-rose-400'
      }
      async function Z(a, t, e) {
        const s = `diniyah_${a}_${A.value}`,
          d = $(t)
        try {
          const n = D(a),
            j = { ...((n == null ? void 0 : n.data) || {}), [d]: e }
          ;(n
            ? await se(q(z, 'rekap_diniyah', s), { data: j, updated_at: L() })
            : await le(q(z, 'rekap_diniyah', s), {
                id: s,
                santri_id: a,
                periode: A.value,
                data: j,
                created_at: L(),
                updated_at: L()
              }),
            K.success(`Tersimpan: ${t}`))
        } catch (n) {
          ;(K.error(`Gagal simpan: ${n.message || n}`),
            console.error('[RekapDiniyah] saveCell error:', n))
        }
      }
      return (a, t) => (
        o(),
        l('div', de, [
          r('div', ue, [
            r('div', pe, [
              t[5] ||
                (t[5] = r(
                  'h2',
                  { class: 'text-base md:text-lg font-black text-slate-800 dark:text-white' },
                  [r('i', { class: 'fas fa-mosque text-indigo-600 mr-2' }), v('Rekap Diniyah ')],
                  -1
                )),
              r('p', ce, i(h.value.length) + ' santri · ' + i(F[g.value - 1]) + ' ' + i(f.value), 1)
            ]),
            r('div', be, [
              k(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': t[0] || (t[0] = (e) => (g.value = e)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    (o(),
                    l(
                      b,
                      null,
                      x(F, (e, s) => r('option', { key: e, value: s + 1 }, i(e), 9, xe)),
                      64
                    ))
                  ],
                  512
                ),
                [[C, g.value, void 0, { number: !0 }]]
              ),
              k(
                r(
                  'input',
                  {
                    'onUpdate:modelValue': t[1] || (t[1] = (e) => (f.value = e)),
                    type: 'number',
                    min: '2024',
                    max: '2030',
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  null,
                  512
                ),
                [[I, f.value, void 0, { number: !0 }]]
              ),
              k(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': t[2] || (t[2] = (e) => (m.value = e)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    t[6] || (t[6] = r('option', { value: '' }, 'Semua Lembaga', -1)),
                    (o(!0),
                    l(
                      b,
                      null,
                      x(P.value, (e) => (o(), l('option', { key: e, value: e }, i(e), 9, ke))),
                      128
                    ))
                  ],
                  512
                ),
                [[C, m.value]]
              ),
              k(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': t[3] || (t[3] = (e) => (p.value = e)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    t[7] || (t[7] = r('option', { value: '' }, 'Semua Kelas', -1)),
                    (o(!0),
                    l(
                      b,
                      null,
                      x(G.value, (e) => (o(), l('option', { key: e, value: e }, i(e), 9, me))),
                      128
                    ))
                  ],
                  512
                ),
                [[C, p.value]]
              ),
              k(
                r(
                  'input',
                  {
                    'onUpdate:modelValue': t[4] || (t[4] = (e) => (_.value = e)),
                    type: 'search',
                    placeholder: 'Cari santri...',
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  null,
                  512
                ),
                [[I, _.value]]
              )
            ])
          ]),
          r('div', ge, [
            h.value.length === 0
              ? (o(),
                l('div', fe, [
                  ...(t[8] ||
                    (t[8] = [
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
                        ' Pilih lembaga/kelas lain atau pastikan santri punya lembaga_sekolah. ',
                        -1
                      )
                    ]))
                ]))
              : (o(),
                l('div', he, [
                  r('table', ve, [
                    r('thead', ye, [
                      r('tr', null, [
                        t[9] ||
                          (t[9] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-left font-black uppercase text-[10px] sticky left-0 bg-slate-100 z-10'
                            },
                            ' Nama ',
                            -1
                          )),
                        t[10] ||
                          (t[10] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]'
                            },
                            ' Lembaga ',
                            -1
                          )),
                        t[11] ||
                          (t[11] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px]'
                            },
                            ' Kelas ',
                            -1
                          )),
                        (o(!0),
                        l(
                          b,
                          null,
                          x(
                            V.value,
                            (e) => (
                              o(),
                              l(
                                'th',
                                {
                                  key: e,
                                  class:
                                    'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200'
                                },
                                i(e),
                                1
                              )
                            )
                          ),
                          128
                        )),
                        t[12] ||
                          (t[12] = r(
                            'th',
                            {
                              class:
                                'py-2 px-2 border border-slate-300 text-center font-black uppercase text-[10px] bg-amber-50 text-amber-800'
                            },
                            ' Rata2 ',
                            -1
                          ))
                      ])
                    ]),
                    r('tbody', null, [
                      (o(!0),
                      l(
                        b,
                        null,
                        x(
                          h.value,
                          (e) => (
                            o(),
                            l(
                              'tr',
                              { key: e.id, class: 'hover:bg-slate-50 dark:hover:bg-slate-700/30' },
                              [
                                r('td', _e, i(e.nama), 1),
                                r('td', we, i(e.lembaga_sekolah || '-'), 1),
                                r('td', Se, i(e.kelas_sekolah || '-'), 1),
                                (o(!0),
                                l(
                                  b,
                                  null,
                                  x(
                                    V.value,
                                    (s) => (
                                      o(),
                                      l(
                                        'td',
                                        { key: s, class: 'py-0.5 px-1 border border-slate-300' },
                                        [
                                          r(
                                            'input',
                                            {
                                              type: 'text',
                                              inputmode: 'numeric',
                                              value: H(e.id, s),
                                              onChange: (d) => Z(e.id, s, d.target.value),
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
                                      Q(E(e.id))
                                    ])
                                  },
                                  i(E(e.id)),
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
          t[13] ||
            (t[13] = r(
              'p',
              { class: 'text-[10px] text-slate-400 italic text-center' },
              [
                r('i', { class: 'fas fa-info-circle mr-1' }),
                v(' Nilai per cell auto-save ke koleksi '),
                r('code', null, 'rekap_diniyah'),
                v(' (doc id: '),
                r('code', null, 'diniyah_{santri_id}_{periodKey}'),
                v('). ')
              ],
              -1
            ))
        ])
      )
    }
  }
export { Ke as default }
