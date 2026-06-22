const o = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
  c = [
    'ٱلمحرم',
    'صفر',
    'ربيع ٱلأول',
    'ربيع ٱلثاني',
    'جمادى ٱلأولى',
    'جمادى ٱلثانية',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو ٱلقعدة',
    'ذو ٱلحجة'
  ]
function u(a) {
  try {
    return parseInt((a == null ? void 0 : a.kalibrasiHijri) || 0) || 0
  } catch {
    return 0
  }
}
function i(a) {
  return String(a ?? '').replace(/\d/g, (r) => o[parseInt(r, 10)] || r)
}
function m(a, r = 0) {
  const t = new Date(a)
  t.setDate(t.getDate() + r)
  try {
    const e = new Intl.DateTimeFormat('en-u-ca-islamic', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).formatToParts(t)
    return {
      day: parseInt(e.find((n) => n.type === 'day').value),
      month: parseInt(e.find((n) => n.type === 'month').value),
      year: parseInt(e.find((n) => n.type === 'year').value)
    }
  } catch {
    return { day: 0, month: 0, year: 0 }
  }
}
function y(a = new Date(), r = 0) {
  try {
    const t = m(a, r)
    if (!t.day || !t.month || !t.year) return ''
    const e = c[t.month - 1] || ''
    return `${i(t.day)} ${e} ${i(t.year)}`
  } catch {
    return ''
  }
}
function s(a = new Date()) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(a)
}
function f(a = new Date()) {
  return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(a).toUpperCase()
}
export { y as a, s as b, f, u as g, m, i as t }
