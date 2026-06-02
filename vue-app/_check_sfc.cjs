const { parse, compileScript, compileTemplate } = require('@vue/compiler-sfc')
const fs = require('fs')
const files = [
  'src/components/layout/BottomNav.vue',
  'src/components/layout/GlobalSearch.vue',
  'src/components/layout/AppHeader.vue',
  'src/components/layout/AppLayout.vue',
]
let bad = 0
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const { descriptor, errors } = parse(src, { filename: f })
  if (errors && errors.length) { console.log('PARSE ERR', f, errors.map(e=>e.message)); bad++; continue }
  const id = 'x'+Math.random().toString(36).slice(2,8)
  try {
    if (descriptor.scriptSetup || descriptor.script) compileScript(descriptor, { id })
    if (descriptor.template) {
      const r = compileTemplate({ source: descriptor.template.content, filename: f, id })
      if (r.errors && r.errors.length) { console.log('TPL ERR', f, r.errors); bad++; continue }
    }
    console.log('OK   ', f)
  } catch (e) { console.log('COMPILE ERR', f, e.message); bad++ }
}
process.exit(bad ? 1 : 0)
