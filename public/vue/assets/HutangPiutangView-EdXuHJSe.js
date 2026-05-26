import {
  I as G,
  a2 as E,
  K as F,
  h as u,
  e as t,
  j as _,
  a4 as l,
  a7 as C,
  E as b,
  ar as i,
  aj as $,
  F as J,
  U as q,
  at as K,
  ak as y,
  g as Q,
  d as j,
  Q as n,
  Z as N,
  q as S,
  l as T,
  Y as D,
  L as r,
  n as R
} from './index-DlQzz-jb.js'
import { u as Y } from './useToast-DlBPYiJY.js'
import { u as Z } from './useConfirm-DiDVgre1.js'
import { a as H } from './format-CpwY2Om2.js'
const A = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  W = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  X = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  ee = { class: 'grid grid-cols-2 gap-3' },
  te = { class: 'bg-amber-50 rounded-2xl p-4 border-2 border-amber-200' },
  ae = { class: 'text-2xl font-black text-amber-800 mt-1' },
  se = { class: 'bg-cyan-50 rounded-2xl p-4 border-2 border-cyan-200' },
  le = { class: 'text-2xl font-black text-cyan-800 mt-1' },
  ne = { class: 'bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden' },
  oe = { class: 'px-4 py-3 border-b border-slate-100 grid grid-cols-2 gap-2' },
  ue = { key: 0, class: 'p-10 text-center' },
  ie = { key: 1, class: 'divide-y divide-slate-100' },
  re = { class: 'flex-1 min-w-0' },
  de = { class: 'text-sm font-bold truncate' },
  pe = { class: 'text-[10px] text-slate-500' },
  me = { class: 'text-right' },
  ge = ['onClick', 'title'],
  ce = ['onClick'],
  xe = { class: 'bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3' },
  be = { class: 'flex gap-2' },
  ve = ['disabled'],
  _e = {
    __name: 'HutangPiutangView',
    setup(fe) {
      const o = Y(),
        P = Z(),
        d = n([]),
        v = n(''),
        f = n(''),
        p = n(!1),
        m = n('hutang'),
        g = n(''),
        c = n(0),
        k = n(''),
        w = n(''),
        x = n(!1)
      let h = null
      const V = j(() => {
          let a = [...d.value]
          return (
            v.value && (a = a.filter((e) => e.jenis === v.value)),
            f.value === 'lunas'
              ? (a = a.filter((e) => e.lunas))
              : f.value === 'open' && (a = a.filter((e) => !e.lunas)),
            a.sort((e, s) => String(s.tanggal || '').localeCompare(String(e.tanggal || '')))
          )
        }),
        U = j(() =>
          d.value
            .filter((a) => a.jenis === 'hutang' && !a.lunas)
            .reduce((a, e) => a + Number(e.nominal || 0), 0)
        ),
        L = j(() =>
          d.value
            .filter((a) => a.jenis === 'piutang' && !a.lunas)
            .reduce((a, e) => a + Number(e.nominal || 0), 0)
        )
      function B() {
        ;((m.value = 'hutang'),
          (g.value = ''),
          (c.value = 0),
          (k.value = new Date().toISOString().slice(0, 10)),
          (w.value = ''),
          (p.value = !0))
      }
      async function M() {
        if (!(!g.value || !c.value || x.value)) {
          x.value = !0
          try {
            const a = `hp_${m.value}_${Date.now()}`
            ;(await N(S(T, 'keuangan_hutang_piutang', a), {
              id: a,
              jenis: m.value,
              pihak: g.value,
              nominal: Number(c.value),
              tanggal: k.value,
              catatan: w.value,
              lunas: !1,
              created_at: D()
            }),
              o.success('Tersimpan'),
              (p.value = !1))
          } catch (a) {
            o.error('Gagal: ' + ((a == null ? void 0 : a.message) || a))
          } finally {
            x.value = !1
          }
        }
      }
      async function O(a) {
        try {
          ;(await N(
            S(T, 'keuangan_hutang_piutang', String(a.id)),
            { lunas: !a.lunas, _last_update: D() },
            { merge: !0 }
          ),
            o.success(a.lunas ? 'Set ke Open' : 'Set Lunas'))
        } catch (e) {
          o.error('Gagal: ' + ((e == null ? void 0 : e.message) || e))
        }
      }
      async function I(a) {
        if (
          await P({
            title: 'Hapus?',
            message: `Hapus ${a.jenis} dari ${a.pihak}?`,
            confirmText: 'Hapus',
            danger: !0
          })
        )
          try {
            ;(await R(S(T, 'keuangan_hutang_piutang', String(a.id))), o.success('Dihapus'))
          } catch (s) {
            o.error('Gagal: ' + ((s == null ? void 0 : s.message) || s))
          }
      }
      return (
        G(() => {
          h = E('keuangan_hutang_piutang', (a) => {
            d.value = a
          })
        }),
        F(() => {
          if (h)
            try {
              h()
            } catch {}
        }),
        (a, e) => (
          r(),
          u('div', A, [
            t('div', W, [
              t('div', X, [
                e[11] ||
                  (e[11] = t(
                    'div',
                    null,
                    [
                      t('h1', { class: 'text-xl md:text-2xl font-black' }, [
                        t('i', { class: 'fas fa-balance-scale text-rose-500 mr-2' }),
                        _('Hutang Piutang')
                      ]),
                      t(
                        'p',
                        { class: 'text-xs text-slate-500 mt-0.5' },
                        'Catatan hutang + piutang pesantren'
                      )
                    ],
                    -1
                  )),
                t(
                  'button',
                  {
                    onClick: e[0] || (e[0] = (s) => B()),
                    class:
                      'bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow'
                  },
                  [
                    ...(e[10] ||
                      (e[10] = [t('i', { class: 'fas fa-plus mr-1' }, null, -1), _('Tambah', -1)]))
                  ]
                )
              ])
            ]),
            t('div', ee, [
              t('div', te, [
                e[12] ||
                  (e[12] = t(
                    'p',
                    { class: 'text-[10px] uppercase font-black text-amber-700' },
                    'Hutang (kewajiban)',
                    -1
                  )),
                t('p', ae, l(C(H)(U.value)), 1)
              ]),
              t('div', se, [
                e[13] ||
                  (e[13] = t(
                    'p',
                    { class: 'text-[10px] uppercase font-black text-cyan-700' },
                    'Piutang (klaim)',
                    -1
                  )),
                t('p', le, l(C(H)(L.value)), 1)
              ])
            ]),
            t('div', ne, [
              t('div', oe, [
                t(
                  'button',
                  {
                    onClick: e[1] || (e[1] = (s) => (v.value = '')),
                    class: b([
                      'py-1.5 text-xs font-bold rounded-lg',
                      v.value === '' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                    ])
                  },
                  'Semua (' + l(d.value.length) + ')',
                  3
                ),
                i(
                  t(
                    'select',
                    {
                      'onUpdate:modelValue': e[2] || (e[2] = (s) => (f.value = s)),
                      class: 'px-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white'
                    },
                    [
                      ...(e[14] ||
                        (e[14] = [
                          t('option', { value: '' }, 'Semua status', -1),
                          t('option', { value: 'open' }, 'Belum lunas', -1),
                          t('option', { value: 'lunas' }, 'Lunas', -1)
                        ]))
                    ],
                    512
                  ),
                  [[$, f.value]]
                )
              ]),
              V.value.length === 0
                ? (r(),
                  u('div', ue, [
                    ...(e[15] ||
                      (e[15] = [
                        t('i', { class: 'fas fa-inbox text-slate-300 text-3xl mb-2' }, null, -1),
                        t('p', { class: 'text-sm text-slate-500 italic' }, 'Belum ada catatan.', -1)
                      ]))
                  ]))
                : (r(),
                  u('div', ie, [
                    (r(!0),
                    u(
                      J,
                      null,
                      q(
                        V.value,
                        (s) => (
                          r(),
                          u('div', { key: s.id, class: 'p-3 flex items-center gap-3' }, [
                            t(
                              'div',
                              {
                                class: b([
                                  'w-9 h-9 rounded-full flex items-center justify-center text-white',
                                  s.jenis === 'piutang' ? 'bg-cyan-500' : 'bg-amber-500'
                                ])
                              },
                              [
                                t(
                                  'i',
                                  {
                                    class: b([
                                      'fas',
                                      s.jenis === 'piutang' ? 'fa-hand-holding-usd' : 'fa-receipt'
                                    ])
                                  },
                                  null,
                                  2
                                )
                              ],
                              2
                            ),
                            t('div', re, [
                              t('p', de, l(s.pihak), 1),
                              t(
                                'p',
                                pe,
                                l(s.jenis === 'piutang' ? 'Piutang' : 'Hutang') +
                                  ' · ' +
                                  l(s.catatan || '-') +
                                  ' · ' +
                                  l(s.tanggal || '-'),
                                1
                              )
                            ]),
                            t('div', me, [
                              t(
                                'p',
                                {
                                  class: b([
                                    'text-sm font-black',
                                    s.jenis === 'piutang' ? 'text-cyan-700' : 'text-amber-700'
                                  ])
                                },
                                l(C(H)(s.nominal)),
                                3
                              ),
                              t(
                                'p',
                                {
                                  class: b([
                                    'text-[9px] uppercase',
                                    s.lunas ? 'text-emerald-600' : 'text-rose-600'
                                  ])
                                },
                                l(s.lunas ? 'Lunas' : 'Open'),
                                3
                              )
                            ]),
                            t(
                              'button',
                              {
                                onClick: (z) => O(s),
                                class: 'text-emerald-500 hover:bg-emerald-50 p-2 rounded',
                                title: s.lunas ? 'Tandai Open' : 'Tandai Lunas'
                              },
                              [
                                ...(e[16] ||
                                  (e[16] = [t('i', { class: 'fas fa-check' }, null, -1)]))
                              ],
                              8,
                              ge
                            ),
                            t(
                              'button',
                              {
                                onClick: (z) => I(s),
                                class: 'text-rose-500 hover:bg-rose-50 p-2 rounded'
                              },
                              [
                                ...(e[17] ||
                                  (e[17] = [t('i', { class: 'fas fa-trash' }, null, -1)]))
                              ],
                              8,
                              ce
                            )
                          ])
                        )
                      ),
                      128
                    ))
                  ]))
            ]),
            p.value
              ? (r(),
                u(
                  'div',
                  {
                    key: 0,
                    class:
                      'fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4',
                    onClick: e[9] || (e[9] = K((s) => (p.value = !1), ['self']))
                  },
                  [
                    t('div', xe, [
                      e[19] ||
                        (e[19] = t(
                          'h3',
                          { class: 'text-base font-black' },
                          [
                            t('i', { class: 'fas fa-balance-scale text-rose-500 mr-1' }),
                            _('Tambah Hutang/Piutang')
                          ],
                          -1
                        )),
                      i(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue': e[3] || (e[3] = (s) => (m.value = s)),
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                          },
                          [
                            ...(e[18] ||
                              (e[18] = [
                                t(
                                  'option',
                                  { value: 'hutang' },
                                  'Hutang (pesantren wajib bayar)',
                                  -1
                                ),
                                t(
                                  'option',
                                  { value: 'piutang' },
                                  'Piutang (pesantren klaim ke pihak)',
                                  -1
                                )
                              ]))
                          ],
                          512
                        ),
                        [[$, m.value]]
                      ),
                      i(
                        t(
                          'input',
                          {
                            'onUpdate:modelValue': e[4] || (e[4] = (s) => (g.value = s)),
                            type: 'text',
                            placeholder: 'Nama pihak (orang/toko/dll)',
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                          },
                          null,
                          512
                        ),
                        [[y, g.value]]
                      ),
                      i(
                        t(
                          'input',
                          {
                            'onUpdate:modelValue': e[5] || (e[5] = (s) => (c.value = s)),
                            type: 'number',
                            min: '0',
                            placeholder: 'Nominal',
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold'
                          },
                          null,
                          512
                        ),
                        [[y, c.value, void 0, { number: !0 }]]
                      ),
                      i(
                        t(
                          'input',
                          {
                            'onUpdate:modelValue': e[6] || (e[6] = (s) => (k.value = s)),
                            type: 'date',
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                          },
                          null,
                          512
                        ),
                        [[y, k.value]]
                      ),
                      i(
                        t(
                          'textarea',
                          {
                            'onUpdate:modelValue': e[7] || (e[7] = (s) => (w.value = s)),
                            rows: '2',
                            placeholder: 'Catatan',
                            class:
                              'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none'
                          },
                          null,
                          512
                        ),
                        [[y, w.value]]
                      ),
                      t('div', be, [
                        t(
                          'button',
                          {
                            onClick: e[8] || (e[8] = (s) => (p.value = !1)),
                            class:
                              'flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-sm'
                          },
                          'Batal'
                        ),
                        t(
                          'button',
                          {
                            onClick: M,
                            disabled: x.value,
                            class:
                              'flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm'
                          },
                          l(x.value ? 'Menyimpan...' : 'Simpan'),
                          9,
                          ve
                        )
                      ])
                    ])
                  ]
                ))
              : Q('', !0)
          ])
        )
      )
    }
  }
export { _e as default }
