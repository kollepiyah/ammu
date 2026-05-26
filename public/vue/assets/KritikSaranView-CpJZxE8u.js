import {
  ab as D,
  I as V,
  a2 as C,
  K as T,
  h as l,
  e as t,
  j as v,
  a4 as i,
  ar as u,
  ak as b,
  aj as U,
  g,
  F as A,
  U as K,
  d as B,
  Q as m,
  L as o,
  Z as I,
  q as f,
  l as h,
  Y as M,
  n as N
} from './index-DlQzz-jb.js'
import { u as j } from './useToast-DlBPYiJY.js'
import { u as H } from './useConfirm-DiDVgre1.js'
const E = { class: 'p-3 md:p-5 max-w-3xl mx-auto space-y-4' },
  F = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  G = { class: 'text-xs text-slate-500 mt-0.5' },
  L = { key: 0, class: 'bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2' },
  $ = ['disabled'],
  q = { key: 1 },
  z = { key: 0, class: 'bg-white rounded-2xl p-10 text-center' },
  O = {
    key: 1,
    class: 'bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  P = { key: 2, class: 'space-y-2' },
  Q = { class: 'flex items-center justify-between mb-1' },
  W = { class: 'text-sm font-bold' },
  Y = { class: 'text-xs text-amber-700' },
  Z = ['onClick'],
  J = { class: 'text-[10px] text-slate-500 mb-1' },
  R = { class: 'text-sm text-slate-700' },
  re = {
    __name: 'KritikSaranView',
    setup(X) {
      const w = D(),
        d = j(),
        y = H(),
        c = m([]),
        k = m(!0),
        n = m(!1),
        r = m({ nama: '', kontak: '', kategori: 'saran', isi: '' })
      let p = null
      const x = B(() => {
        const s = w.sesiAktif
        return s
          ? s.role === 'admin' ||
              s.id === 'admin' ||
              ['super_admin', 'admin'].includes(s.role_sistem)
          : !1
      })
      async function _() {
        if (!(!r.value.isi || n.value)) {
          n.value = !0
          try {
            const s = `kritik_${Date.now()}`
            ;(await I(f(h, 'kritik_saran', s), {
              id: s,
              ...r.value,
              tanggal: new Date().toISOString().slice(0, 10),
              created_at: M()
            }),
              d.success('Terima kasih, kritik/saran tersimpan'),
              (r.value = { nama: '', kontak: '', kategori: 'saran', isi: '' }))
          } catch (s) {
            d.error('Gagal: ' + ((s == null ? void 0 : s.message) || s))
          } finally {
            n.value = !1
          }
        }
      }
      async function S(s) {
        if (
          await y({
            title: 'Hapus?',
            message: 'Hapus pesan ini?',
            confirmText: 'Hapus',
            danger: !0
          })
        )
          try {
            ;(await N(f(h, 'kritik_saran', String(s.id))), d.success('Dihapus'))
          } catch (e) {
            d.error('Gagal: ' + ((e == null ? void 0 : e.message) || e))
          }
      }
      return (
        V(() => {
          p = C('kritik_saran', (s) => {
            ;((c.value = s.sort((a, e) =>
              String(e.tanggal || '').localeCompare(String(a.tanggal || ''))
            )),
              (k.value = !1))
          })
        }),
        T(() => {
          if (p)
            try {
              p()
            } catch {}
        }),
        (s, a) => (
          o(),
          l('div', E, [
            t('div', F, [
              a[4] ||
                (a[4] = t(
                  'h1',
                  { class: 'text-xl md:text-2xl font-black' },
                  [t('i', { class: 'fas fa-comments text-amber-500 mr-2' }), v('Kritik & Saran')],
                  -1
                )),
              t(
                'p',
                G,
                i(
                  x.value
                    ? 'Inbox kritik & saran dari santri/wali'
                    : 'Sampaikan kritik atau saran kamu'
                ),
                1
              )
            ]),
            x.value
              ? g('', !0)
              : (o(),
                l('div', L, [
                  u(
                    t(
                      'input',
                      {
                        'onUpdate:modelValue': a[0] || (a[0] = (e) => (r.value.nama = e)),
                        type: 'text',
                        placeholder: 'Nama (opsional)',
                        class:
                          'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                      },
                      null,
                      512
                    ),
                    [[b, r.value.nama]]
                  ),
                  u(
                    t(
                      'input',
                      {
                        'onUpdate:modelValue': a[1] || (a[1] = (e) => (r.value.kontak = e)),
                        type: 'text',
                        placeholder: 'WA / Email (opsional)',
                        class:
                          'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                      },
                      null,
                      512
                    ),
                    [[b, r.value.kontak]]
                  ),
                  u(
                    t(
                      'select',
                      {
                        'onUpdate:modelValue': a[2] || (a[2] = (e) => (r.value.kategori = e)),
                        class:
                          'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white'
                      },
                      [
                        ...(a[5] ||
                          (a[5] = [
                            t('option', { value: 'saran' }, 'Saran', -1),
                            t('option', { value: 'kritik' }, 'Kritik', -1),
                            t('option', { value: 'pertanyaan' }, 'Pertanyaan', -1)
                          ]))
                      ],
                      512
                    ),
                    [[U, r.value.kategori]]
                  ),
                  u(
                    t(
                      'textarea',
                      {
                        'onUpdate:modelValue': a[3] || (a[3] = (e) => (r.value.isi = e)),
                        rows: '4',
                        placeholder: 'Tuliskan kritik / saran / pertanyaan...',
                        class:
                          'w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white resize-none'
                      },
                      null,
                      512
                    ),
                    [[b, r.value.isi]]
                  ),
                  t(
                    'button',
                    {
                      onClick: _,
                      disabled: !r.value.isi || n.value,
                      class:
                        'w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow'
                    },
                    i(n.value ? 'Mengirim...' : 'Kirim'),
                    9,
                    $
                  )
                ])),
            x.value
              ? (o(),
                l('div', q, [
                  k.value
                    ? (o(),
                      l('div', z, [
                        ...(a[6] ||
                          (a[6] = [
                            t(
                              'i',
                              { class: 'fas fa-spinner fa-spin text-amber-500 text-3xl' },
                              null,
                              -1
                            )
                          ]))
                      ]))
                    : c.value.length === 0
                      ? (o(),
                        l('div', O, [
                          ...(a[7] ||
                            (a[7] = [
                              t(
                                'i',
                                { class: 'fas fa-inbox text-slate-300 text-3xl mb-2' },
                                null,
                                -1
                              ),
                              t(
                                'p',
                                { class: 'text-sm text-slate-500 italic' },
                                'Belum ada kritik/saran.',
                                -1
                              )
                            ]))
                        ]))
                      : (o(),
                        l('div', P, [
                          (o(!0),
                          l(
                            A,
                            null,
                            K(
                              c.value,
                              (e) => (
                                o(),
                                l(
                                  'div',
                                  {
                                    key: e.id,
                                    class:
                                      'bg-white rounded-xl p-3 border border-slate-200 shadow-sm'
                                  },
                                  [
                                    t('div', Q, [
                                      t('p', W, [
                                        v(i(e.nama || 'Anonim') + ' · ', 1),
                                        t('span', Y, i(e.kategori), 1)
                                      ]),
                                      t(
                                        'button',
                                        {
                                          onClick: (ee) => S(e),
                                          class: 'text-rose-500 hover:bg-rose-50 p-1.5 rounded'
                                        },
                                        [
                                          ...(a[8] ||
                                            (a[8] = [
                                              t('i', { class: 'fas fa-trash text-xs' }, null, -1)
                                            ]))
                                        ],
                                        8,
                                        Z
                                      )
                                    ]),
                                    t('p', J, i(e.tanggal || '-') + ' · ' + i(e.kontak || '-'), 1),
                                    t('p', R, i(e.isi), 1)
                                  ]
                                )
                              )
                            ),
                            128
                          ))
                        ]))
                ]))
              : g('', !0)
          ])
        )
      )
    }
  }
export { re as default }
