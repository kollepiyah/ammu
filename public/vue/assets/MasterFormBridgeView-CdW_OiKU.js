import { _ as a } from './_plugin-vue_export-helper-DlAUqK2U.js'
import { h as s, e as t, k as o, aq as n, W as l, L as m, j as d } from './index-DlQzz-jb.js'
const i = {},
  x = { class: 'p-3 md:p-5 max-w-3xl mx-auto' },
  b = { class: 'bg-amber-50 rounded-2xl p-6 border-2 border-amber-300 text-center' }
function c(f, e) {
  const r = l('router-link')
  return (
    m(),
    s('div', x, [
      t('div', b, [
        e[1] ||
          (e[1] = t('i', { class: 'fas fa-info-circle text-amber-500 text-4xl mb-3' }, null, -1)),
        e[2] ||
          (e[2] = t(
            'h2',
            { class: 'text-lg font-black text-amber-700 mb-2' },
            'Master Form Bridge',
            -1
          )),
        e[3] ||
          (e[3] = t(
            'p',
            { class: 'text-sm text-slate-700 mb-3' },
            'Form CRUD master data sudah pindah ke menu Master Data.',
            -1
          )),
        o(
          r,
          {
            to: '/master-data',
            class:
              'inline-block px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm'
          },
          {
            default: n(() => [
              ...(e[0] ||
                (e[0] = [
                  t('i', { class: 'fas fa-arrow-right mr-1' }, null, -1),
                  d('Buka Master Data', -1)
                ]))
            ]),
            _: 1
          }
        )
      ])
    ])
  )
}
const k = a(i, [['render', c]])
export { k as default }
