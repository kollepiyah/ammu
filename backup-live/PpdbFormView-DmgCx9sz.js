import {
  I as W,
  a3 as $,
  h as s,
  e as a,
  i as E,
  j as r,
  a4 as i,
  at as A,
  ar as u,
  ak as m,
  aj as P,
  F as c,
  U as y,
  g as b,
  Q as p,
  d as q,
  L as o,
  E as T,
  ah as Q,
  $ as K
} from './index-CPbTnm_Q.js'
import { _ as z } from './logo-CxXS7KxG.js'
import { u as O } from './useToast-BjwjYk11.js'
const R = {
    class: 'min-h-screen p-4 md:p-6',
    style: { background: 'linear-gradient(135deg, #F9F6EE 0%, #f0ead8 100%)' }
  },
  G = { class: 'max-w-3xl mx-auto space-y-4' },
  H = {
    key: 0,
    class: 'bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center'
  },
  J = { class: 'text-sm text-slate-600 mt-2' },
  Y = { class: 'bg-white rounded-2xl p-4 md:p-5 shadow-sm' },
  X = { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
  Z = { class: 'md:col-span-2' },
  ee = { class: 'md:col-span-2' },
  ae = { class: 'bg-white rounded-2xl p-4 md:p-5 shadow-sm' },
  te = { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
  le = { class: 'md:col-span-2' },
  se = { class: 'bg-cyan-50 rounded-2xl p-4 md:p-5 border-2 border-cyan-300 shadow-sm' },
  oe = { class: 'grid grid-cols-1 sm:grid-cols-3 gap-2' },
  ne = ['onClick'],
  re = { class: 'font-bold text-sm' },
  ie = { class: 'text-[10px] opacity-80' },
  ue = { key: 0, class: 'bg-teal-50 rounded-2xl p-4 md:p-5 border-2 border-teal-300 shadow-sm' },
  de = { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
  me = ['value'],
  pe = { key: 0 },
  be = ['value'],
  xe = { class: 'md:col-span-2' },
  ge = { key: 0, class: 'mt-3 flex flex-wrap gap-2' },
  ve = {
    key: 1,
    class: 'bg-emerald-50 rounded-2xl p-4 md:p-5 border-2 border-emerald-300 shadow-sm'
  },
  fe = { class: 'text-xs font-black text-emerald-800 uppercase tracking-wide mb-3' },
  ce = { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
  ye = { class: 'block text-xs font-bold text-emerald-700 mb-1 uppercase' },
  ke = ['onUpdate:modelValue', 'type', 'required'],
  we = ['onUpdate:modelValue', 'required'],
  he = ['onUpdate:modelValue', 'required'],
  _e = ['value'],
  Pe = {
    class: 'bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-5 max-h-[85vh] overflow-y-auto'
  },
  qe = { class: 'text-lg font-black mb-3 text-amber-700' },
  Se = { key: 0, class: 'space-y-2' },
  Ae = ['src'],
  Te = ['href'],
  Ve = { key: 1, class: 'text-sm text-slate-500 italic' },
  Ue = { class: 'mt-4 text-right' },
  je = {
    class: 'bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-5 max-h-[85vh] overflow-y-auto'
  },
  Ce = { class: 'text-lg font-black mb-3 text-purple-700' },
  Le = { key: 0, class: 'space-y-2' },
  Me = ['src'],
  Ne = ['href'],
  De = { key: 1, class: 'text-sm text-slate-500 italic' },
  Fe = { class: 'mt-4 text-right' },
  Ie = { class: 'bg-white rounded-2xl p-3 shadow-sm flex gap-2' },
  Be = ['disabled'],
  Ke = {
    __name: 'PpdbFormView',
    setup(We) {
      const k = O(),
        M = [
          { value: 'mahad', label: "Ma'had", desc: 'Tinggal di pondok (mukim)', icon: 'fa-mosque' },
          { value: 'pp', label: 'Non-Mukim (PP)', desc: 'Pulang-Pergi', icon: 'fa-home' },
          { value: 'fullday', label: 'Fullday', desc: 'Hadir pagi-sore', icon: 'fa-sun' }
        ],
        N = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH'],
        D = ['TK A', 'TK B', 'SDI', 'PKBM'],
        w = p(!1),
        h = p(!1),
        x = p({}),
        F = q(() => l.value.lembaga_qiraati && l.value.lembaga_qiraati !== 'TPQ Pagi'),
        g = q(() => {
          var e, t, n, f
          const d = String(l.value.lembaga_qiraati || '').trim()
          return (
            ((t = (e = x.value) == null ? void 0 : e[d]) == null ? void 0 : t.syarat) ||
            ((f = (n = x.value) == null ? void 0 : n._default) == null ? void 0 : f.syarat) ||
            ''
          )
        }),
        v = q(() => {
          var e, t, n, f
          const d = String(l.value.lembaga_qiraati || '').trim()
          return (
            ((t = (e = x.value) == null ? void 0 : e[d]) == null ? void 0 : t.pembayaran) ||
            ((f = (n = x.value) == null ? void 0 : n._default) == null ? void 0 : f.pembayaran) ||
            ''
          )
        }),
        V = q(() => {
          var t, n
          const d = String(l.value.lembaga_qiraati || '').trim(),
            e = (n = (t = x.value) == null ? void 0 : t[d]) == null ? void 0 : n.acf
          return Array.isArray(e) ? e : []
        })
      W(() => {
        $('settings', 'psb_assets', (d) => {
          x.value = d || {}
        })
      })
      function U() {
        return {
          nama: '',
          jk: '',
          tgl_lahir: '',
          tempat_lahir: '',
          asal_sekolah: '',
          alamat: '',
          nama_wali: '',
          wa_wali: '',
          pekerjaan_wali: '',
          tipe_santri: '',
          lembaga_qiraati: '',
          lembaga_sekolah: '',
          lembaga_tujuan: '',
          is_mukim: null,
          custom_fields: {},
          catatan: ''
        }
      }
      const l = p(U()),
        _ = p(!1),
        S = p(!1),
        j = p(''),
        C = p('')
      function L() {
        l.value = U()
      }
      function I() {
        ;((S.value = !1), L())
      }
      async function B() {
        if (!l.value.tipe_santri) {
          k.warning("Pilih tipe santri (Ma'had / PP / Fullday)")
          return
        }
        if (!l.value.lembaga_qiraati) {
          k.warning('Pilih lembaga Qiraati')
          return
        }
        ;((l.value.is_mukim = l.value.tipe_santri === 'mahad'),
          (l.value.lembaga_tujuan = l.value.lembaga_qiraati),
          (_.value = !0))
        try {
          const d = 'ppdb_' + Date.now(),
            e = {
              id: d,
              ...l.value,
              status: 'pending',
              tanggal_daftar: new Date().toISOString(),
              tahun_ajaran: new Date().getFullYear()
            }
          ;(await K('psb_pendaftaran', d, e),
            (j.value = l.value.nama),
            (C.value = l.value.wa_wali),
            (S.value = !0),
            k.success('Pendaftaran terkirim!'))
        } catch (d) {
          k.error('Gagal kirim: ' + (d.message || d))
        } finally {
          _.value = !1
        }
      }
      return (d, e) => (
        o(),
        s('div', R, [
          a('div', G, [
            e[51] ||
              (e[51] = E(
                '<div class="bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md text-center"><img src="' +
                  z +
                  '" alt="Logo MU" class="w-20 h-20 mx-auto mb-3"><h1 class="text-xl md:text-2xl font-black text-slate-800">PSB Pondok Pesantren Mambaul Ulum</h1><p class="text-xs text-teal-700 font-bold uppercase tracking-widest mt-1">Generasi Qurani Pewaris Negeri</p><p class="text-sm text-slate-600 mt-3"> Formulir Penerimaan Santri Baru </p></div>',
                1
              )),
            S.value
              ? (o(),
                s('div', H, [
                  e[22] ||
                    (e[22] = a(
                      'i',
                      { class: 'fas fa-check-circle text-emerald-500 text-5xl mb-3' },
                      null,
                      -1
                    )),
                  e[23] ||
                    (e[23] = a(
                      'h2',
                      { class: 'text-lg font-black text-emerald-700' },
                      'Pendaftaran Berhasil!',
                      -1
                    )),
                  a('p', J, [
                    r(' Terima kasih, ' + i(j.value) + '.', 1),
                    e[18] || (e[18] = a('br', null, null, -1)),
                    e[19] || (e[19] = r(' Admin akan menghubungi Anda di WA ', -1)),
                    a('b', null, i(C.value), 1),
                    e[20] || (e[20] = r('. ', -1))
                  ]),
                  a(
                    'button',
                    {
                      onClick: I,
                      class:
                        'mt-4 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition'
                    },
                    [
                      ...(e[21] ||
                        (e[21] = [
                          a('i', { class: 'fas fa-plus mr-1' }, null, -1),
                          r('Daftar Calon Santri Lain ', -1)
                        ]))
                    ]
                  )
                ]))
              : (o(),
                s(
                  'form',
                  { key: 1, onSubmit: A(B, ['prevent']), class: 'space-y-4' },
                  [
                    a('div', Y, [
                      e[31] ||
                        (e[31] = a(
                          'h3',
                          {
                            class: 'text-xs font-black text-teal-700 uppercase tracking-wide mb-3'
                          },
                          [a('i', { class: 'fas fa-user-graduate mr-1' }), r('Data Calon Santri ')],
                          -1
                        )),
                      a('div', X, [
                        a('div', Z, [
                          e[24] ||
                            (e[24] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Nama Lengkap Calon Santri *',
                              -1
                            )),
                          u(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue': e[0] || (e[0] = (t) => (l.value.nama = t)),
                                type: 'text',
                                required: '',
                                placeholder: 'Nama sesuai akta lahir',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.nama]]
                          )
                        ]),
                        a('div', null, [
                          e[26] ||
                            (e[26] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Jenis Kelamin *',
                              -1
                            )),
                          u(
                            a(
                              'select',
                              {
                                'onUpdate:modelValue': e[1] || (e[1] = (t) => (l.value.jk = t)),
                                required: '',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none'
                              },
                              [
                                ...(e[25] ||
                                  (e[25] = [
                                    a('option', { value: '' }, '-- Pilih --', -1),
                                    a('option', { value: 'L' }, 'Laki-laki', -1),
                                    a('option', { value: 'P' }, 'Perempuan', -1)
                                  ]))
                              ],
                              512
                            ),
                            [[P, l.value.jk]]
                          )
                        ]),
                        a('div', null, [
                          e[27] ||
                            (e[27] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Tanggal Lahir *',
                              -1
                            )),
                          u(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[2] || (e[2] = (t) => (l.value.tgl_lahir = t)),
                                type: 'date',
                                required: '',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.tgl_lahir]]
                          )
                        ]),
                        a('div', null, [
                          e[28] ||
                            (e[28] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Tempat Lahir',
                              -1
                            )),
                          u(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[3] || (e[3] = (t) => (l.value.tempat_lahir = t)),
                                type: 'text',
                                placeholder: 'cth: Probolinggo',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.tempat_lahir]]
                          )
                        ]),
                        a('div', null, [
                          e[29] ||
                            (e[29] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Asal Sekolah',
                              -1
                            )),
                          u(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[4] || (e[4] = (t) => (l.value.asal_sekolah = t)),
                                type: 'text',
                                placeholder: 'cth: SDN ..., MI ...',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.asal_sekolah]]
                          )
                        ]),
                        a('div', ee, [
                          e[30] ||
                            (e[30] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Alamat Rumah',
                              -1
                            )),
                          u(
                            a(
                              'textarea',
                              {
                                'onUpdate:modelValue': e[5] || (e[5] = (t) => (l.value.alamat = t)),
                                rows: '2',
                                placeholder: 'Alamat lengkap...',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none resize-none'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.alamat]]
                          )
                        ])
                      ])
                    ]),
                    a('div', ae, [
                      e[35] ||
                        (e[35] = a(
                          'h3',
                          {
                            class: 'text-xs font-black text-purple-700 uppercase tracking-wide mb-3'
                          },
                          [
                            a('i', { class: 'fas fa-user-friends mr-1' }),
                            r('Data Wali / Orangtua ')
                          ],
                          -1
                        )),
                      a('div', te, [
                        a('div', null, [
                          e[32] ||
                            (e[32] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Nama Wali *',
                              -1
                            )),
                          u(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[6] || (e[6] = (t) => (l.value.nama_wali = t)),
                                type: 'text',
                                required: '',
                                placeholder: 'Nama ayah/ibu/wali',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.nama_wali]]
                          )
                        ]),
                        a('div', null, [
                          e[33] ||
                            (e[33] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'No. WhatsApp Wali *',
                              -1
                            )),
                          u(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[7] || (e[7] = (t) => (l.value.wa_wali = t)),
                                type: 'tel',
                                required: '',
                                placeholder: '08...',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.wa_wali]]
                          )
                        ]),
                        a('div', le, [
                          e[34] ||
                            (e[34] = a(
                              'label',
                              { class: 'block text-xs font-bold text-slate-500 mb-1 uppercase' },
                              'Pekerjaan Wali',
                              -1
                            )),
                          u(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[8] || (e[8] = (t) => (l.value.pekerjaan_wali = t)),
                                type: 'text',
                                placeholder: 'cth: Petani, Pedagang, PNS...',
                                class:
                                  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none'
                              },
                              null,
                              512
                            ),
                            [[m, l.value.pekerjaan_wali]]
                          )
                        ])
                      ])
                    ]),
                    a('div', se, [
                      e[36] ||
                        (e[36] = a(
                          'h3',
                          {
                            class: 'text-xs font-black text-cyan-800 uppercase tracking-wide mb-3'
                          },
                          [a('i', { class: 'fas fa-stream mr-1' }), r('1. Tipe Santri * ')],
                          -1
                        )),
                      a('div', oe, [
                        (o(),
                        s(
                          c,
                          null,
                          y(M, (t) =>
                            a(
                              'button',
                              {
                                type: 'button',
                                key: t.value,
                                onClick: (n) => (l.value.tipe_santri = t.value),
                                class: T([
                                  'p-3 rounded-xl border-2 text-left transition',
                                  l.value.tipe_santri === t.value
                                    ? 'bg-cyan-600 text-white border-cyan-700'
                                    : 'bg-white text-slate-700 border-cyan-200 hover:border-cyan-400'
                                ])
                              },
                              [
                                a('i', { class: T(['fas', t.icon, 'mr-1']) }, null, 2),
                                a('span', re, i(t.label), 1),
                                a('p', ie, i(t.desc), 1)
                              ],
                              10,
                              ne
                            )
                          ),
                          64
                        ))
                      ])
                    ]),
                    l.value.tipe_santri
                      ? (o(),
                        s('div', ue, [
                          e[44] ||
                            (e[44] = a(
                              'h3',
                              {
                                class:
                                  'text-xs font-black text-teal-800 uppercase tracking-wide mb-3'
                              },
                              [a('i', { class: 'fas fa-school mr-1' }), r('2. Pilihan Lembaga * ')],
                              -1
                            )),
                          a('div', de, [
                            a('div', null, [
                              e[38] ||
                                (e[38] = a(
                                  'label',
                                  { class: 'block text-xs font-bold text-teal-700 mb-1 uppercase' },
                                  'Lembaga Qiraati *',
                                  -1
                                )),
                              u(
                                a(
                                  'select',
                                  {
                                    'onUpdate:modelValue':
                                      e[9] || (e[9] = (t) => (l.value.lembaga_qiraati = t)),
                                    required: '',
                                    class:
                                      'w-full px-3 py-2.5 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none'
                                  },
                                  [
                                    e[37] ||
                                      (e[37] = a(
                                        'option',
                                        { value: '' },
                                        '-- Pilih lembaga Qiraati --',
                                        -1
                                      )),
                                    (o(),
                                    s(
                                      c,
                                      null,
                                      y(N, (t) => a('option', { key: t, value: t }, i(t), 9, me)),
                                      64
                                    ))
                                  ],
                                  512
                                ),
                                [[P, l.value.lembaga_qiraati]]
                              )
                            ]),
                            F.value
                              ? (o(),
                                s('div', pe, [
                                  e[40] ||
                                    (e[40] = a(
                                      'label',
                                      {
                                        class:
                                          'block text-xs font-bold text-teal-700 mb-1 uppercase'
                                      },
                                      'Lembaga Sekolah',
                                      -1
                                    )),
                                  u(
                                    a(
                                      'select',
                                      {
                                        'onUpdate:modelValue':
                                          e[10] || (e[10] = (t) => (l.value.lembaga_sekolah = t)),
                                        class:
                                          'w-full px-3 py-2.5 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none'
                                      },
                                      [
                                        e[39] ||
                                          (e[39] = a(
                                            'option',
                                            { value: '' },
                                            '-- Pilih lembaga sekolah --',
                                            -1
                                          )),
                                        (o(),
                                        s(
                                          c,
                                          null,
                                          y(D, (t) =>
                                            a('option', { key: t, value: t }, i(t), 9, be)
                                          ),
                                          64
                                        ))
                                      ],
                                      512
                                    ),
                                    [[P, l.value.lembaga_sekolah]]
                                  )
                                ]))
                              : b('', !0),
                            a('div', xe, [
                              e[41] ||
                                (e[41] = a(
                                  'label',
                                  { class: 'block text-xs font-bold text-teal-700 mb-1 uppercase' },
                                  'Catatan Tambahan',
                                  -1
                                )),
                              u(
                                a(
                                  'textarea',
                                  {
                                    'onUpdate:modelValue':
                                      e[11] || (e[11] = (t) => (l.value.catatan = t)),
                                    rows: '2',
                                    placeholder: 'Info kesehatan, alergi, atau hal lain...',
                                    class:
                                      'w-full px-3 py-2.5 text-sm rounded-xl border-2 border-teal-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none resize-none'
                                  },
                                  null,
                                  512
                                ),
                                [[m, l.value.catatan]]
                              )
                            ])
                          ]),
                          l.value.lembaga_qiraati
                            ? (o(),
                              s('div', ge, [
                                a(
                                  'button',
                                  {
                                    type: 'button',
                                    onClick: e[12] || (e[12] = (t) => (w.value = !0)),
                                    class:
                                      'px-3 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-white inline-flex items-center gap-1'
                                  },
                                  [
                                    ...(e[42] ||
                                      (e[42] = [
                                        a('i', { class: 'fas fa-eye' }, null, -1),
                                        r('Syarat & Ketentuan ', -1)
                                      ]))
                                  ]
                                ),
                                a(
                                  'button',
                                  {
                                    type: 'button',
                                    onClick: e[13] || (e[13] = (t) => (h.value = !0)),
                                    class:
                                      'px-3 py-2 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-700 text-white inline-flex items-center gap-1'
                                  },
                                  [
                                    ...(e[43] ||
                                      (e[43] = [
                                        a('i', { class: 'fas fa-eye' }, null, -1),
                                        r('Informasi Pembayaran ', -1)
                                      ]))
                                  ]
                                )
                              ]))
                            : b('', !0)
                        ]))
                      : b('', !0),
                    l.value.lembaga_qiraati && V.value.length > 0
                      ? (o(),
                        s('div', ve, [
                          a('h3', fe, [
                            e[45] || (e[45] = a('i', { class: 'fas fa-list-alt mr-1' }, null, -1)),
                            r('3. Data Tambahan (' + i(l.value.lembaga_qiraati) + ') ', 1)
                          ]),
                          a('div', ce, [
                            (o(!0),
                            s(
                              c,
                              null,
                              y(
                                V.value,
                                (t) => (
                                  o(),
                                  s(
                                    'div',
                                    { key: t.id, class: T(t.cols === 2 ? 'md:col-span-2' : '') },
                                    [
                                      a('label', ye, i(t.label) + i(t.required ? ' *' : ''), 1),
                                      t.type === 'text' || !t.type
                                        ? u(
                                            (o(),
                                            s(
                                              'input',
                                              {
                                                key: 0,
                                                'onUpdate:modelValue': (n) =>
                                                  (l.value.custom_fields[t.id] = n),
                                                type: t.type || 'text',
                                                required: t.required,
                                                class:
                                                  'w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white'
                                              },
                                              null,
                                              8,
                                              ke
                                            )),
                                            [[Q, l.value.custom_fields[t.id]]]
                                          )
                                        : t.type === 'textarea'
                                          ? u(
                                              (o(),
                                              s(
                                                'textarea',
                                                {
                                                  key: 1,
                                                  'onUpdate:modelValue': (n) =>
                                                    (l.value.custom_fields[t.id] = n),
                                                  required: t.required,
                                                  rows: '2',
                                                  class:
                                                    'w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white'
                                                },
                                                null,
                                                8,
                                                we
                                              )),
                                              [[m, l.value.custom_fields[t.id]]]
                                            )
                                          : t.type === 'select'
                                            ? u(
                                                (o(),
                                                s(
                                                  'select',
                                                  {
                                                    key: 2,
                                                    'onUpdate:modelValue': (n) =>
                                                      (l.value.custom_fields[t.id] = n),
                                                    required: t.required,
                                                    class:
                                                      'w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white'
                                                  },
                                                  [
                                                    e[46] ||
                                                      (e[46] = a(
                                                        'option',
                                                        { value: '' },
                                                        '-- pilih --',
                                                        -1
                                                      )),
                                                    (o(!0),
                                                    s(
                                                      c,
                                                      null,
                                                      y(
                                                        t.options || [],
                                                        (n) => (
                                                          o(),
                                                          s(
                                                            'option',
                                                            { key: n, value: n },
                                                            i(n),
                                                            9,
                                                            _e
                                                          )
                                                        )
                                                      ),
                                                      128
                                                    ))
                                                  ],
                                                  8,
                                                  he
                                                )),
                                                [[P, l.value.custom_fields[t.id]]]
                                              )
                                            : b('', !0)
                                    ],
                                    2
                                  )
                                )
                              ),
                              128
                            ))
                          ])
                        ]))
                      : b('', !0),
                    w.value
                      ? (o(),
                        s(
                          'div',
                          {
                            key: 2,
                            class:
                              'fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4',
                            onClick: e[15] || (e[15] = A((t) => (w.value = !1), ['self']))
                          },
                          [
                            a('div', Pe, [
                              a('h3', qe, [
                                e[47] ||
                                  (e[47] = a('i', { class: 'fas fa-file-alt mr-1' }, null, -1)),
                                r('Syarat & Ketentuan — ' + i(l.value.lembaga_qiraati), 1)
                              ]),
                              g.value
                                ? (o(),
                                  s('div', Se, [
                                    g.value.startsWith('data:image') ||
                                    /\.(jpe?g|png|gif|webp)$/i.test(g.value)
                                      ? (o(),
                                        s(
                                          'img',
                                          {
                                            key: 0,
                                            src: g.value,
                                            alt: 'Syarat',
                                            class: 'max-w-full rounded'
                                          },
                                          null,
                                          8,
                                          Ae
                                        ))
                                      : (o(),
                                        s(
                                          'a',
                                          {
                                            key: 1,
                                            href: g.value,
                                            target: '_blank',
                                            class: 'text-blue-600 underline text-sm'
                                          },
                                          i(g.value),
                                          9,
                                          Te
                                        ))
                                  ]))
                                : (o(),
                                  s(
                                    'p',
                                    Ve,
                                    'Admin belum upload syarat & ketentuan untuk lembaga ini.'
                                  )),
                              a('div', Ue, [
                                a(
                                  'button',
                                  {
                                    onClick: e[14] || (e[14] = (t) => (w.value = !1)),
                                    class:
                                      'px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold'
                                  },
                                  'Tutup'
                                )
                              ])
                            ])
                          ]
                        ))
                      : b('', !0),
                    h.value
                      ? (o(),
                        s(
                          'div',
                          {
                            key: 3,
                            class:
                              'fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4',
                            onClick: e[17] || (e[17] = A((t) => (h.value = !1), ['self']))
                          },
                          [
                            a('div', je, [
                              a('h3', Ce, [
                                e[48] ||
                                  (e[48] = a('i', { class: 'fas fa-money-check mr-1' }, null, -1)),
                                r('Informasi Pembayaran — ' + i(l.value.lembaga_qiraati), 1)
                              ]),
                              v.value
                                ? (o(),
                                  s('div', Le, [
                                    v.value.startsWith('data:image') ||
                                    /\.(jpe?g|png|gif|webp)$/i.test(v.value)
                                      ? (o(),
                                        s(
                                          'img',
                                          {
                                            key: 0,
                                            src: v.value,
                                            alt: 'Pembayaran',
                                            class: 'max-w-full rounded'
                                          },
                                          null,
                                          8,
                                          Me
                                        ))
                                      : (o(),
                                        s(
                                          'a',
                                          {
                                            key: 1,
                                            href: v.value,
                                            target: '_blank',
                                            class: 'text-blue-600 underline text-sm'
                                          },
                                          i(v.value),
                                          9,
                                          Ne
                                        ))
                                  ]))
                                : (o(),
                                  s(
                                    'p',
                                    De,
                                    'Admin belum upload info pembayaran untuk lembaga ini.'
                                  )),
                              a('div', Fe, [
                                a(
                                  'button',
                                  {
                                    onClick: e[16] || (e[16] = (t) => (h.value = !1)),
                                    class:
                                      'px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold'
                                  },
                                  'Tutup'
                                )
                              ])
                            ])
                          ]
                        ))
                      : b('', !0),
                    a('div', Ie, [
                      a(
                        'button',
                        {
                          type: 'button',
                          onClick: L,
                          class:
                            'flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition'
                        },
                        [
                          ...(e[49] ||
                            (e[49] = [
                              a('i', { class: 'fas fa-undo mr-1' }, null, -1),
                              r('Reset Form ', -1)
                            ]))
                        ]
                      ),
                      a(
                        'button',
                        {
                          type: 'submit',
                          disabled: _.value,
                          class:
                            'flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition'
                        },
                        [
                          e[50] || (e[50] = a('i', { class: 'fas fa-paper-plane mr-1' }, null, -1)),
                          r(i(_.value ? 'Mengirim...' : 'KIRIM PENDAFTARAN'), 1)
                        ],
                        8,
                        Be
                      )
                    ])
                  ],
                  32
                )),
            e[52] ||
              (e[52] = a(
                'p',
                { class: 'text-center text-[10px] text-slate-500 pt-2' },
                [
                  a('i', { class: 'fas fa-info-circle mr-1' }),
                  r(
                    'Data Anda akan tersimpan aman + admin akan menghubungi via WA · Vue 3 · Phase 5.20 '
                  )
                ],
                -1
              ))
          ])
        ])
      )
    }
  }
export { Ke as default }
