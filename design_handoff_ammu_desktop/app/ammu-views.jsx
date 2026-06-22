/* Ammu Online — content views */
(function () {
  const Icon = window.Icon;
  const A = window.AMMU;

  // ---------- charts ----------
  function Donut({ data, size = 170 }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    const r = size / 2 - 18;
    const C = 2 * Math.PI * r;
    let off = 0;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2},${size / 2}) rotate(-90)`}>
          <circle r={r} fill="none" stroke="var(--divider)" strokeWidth="18" />
          {data.map((d, i) => {
            const len = (d.value / total) * C;
            const seg = (
              <circle
                key={i}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth="18"
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-off}
                strokeLinecap="butt"
              />
            );
            off += len;
            return seg;
          })}
        </g>
        <text x="50%" y="47%" textAnchor="middle" fontSize="26" fontWeight="800" fill="var(--text)">{total}%</text>
        <text x="50%" y="59%" textAnchor="middle" fontSize="11" fill="var(--text-dim)">Program</text>
      </svg>
    );
  }

  function LineChart({ data, w = 560, h = 180 }) {
    const pad = { l: 34, r: 12, t: 14, b: 26 };
    const max = Math.max(...data.map((d) => d.value)) * 1.12;
    const min = 0;
    const xs = (i) => pad.l + (i / (data.length - 1)) * (w - pad.l - pad.r);
    const ys = (v) => pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b);
    const pts = data.map((d, i) => [xs(i), ys(d.value)]);
    const path = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    const area = path + ` L ${xs(data.length - 1)} ${h - pad.b} L ${pad.l} ${h - pad.b} Z`;
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
          <line key={i} x1={pad.l} x2={w - pad.r} y1={pad.t + g * (h - pad.t - pad.b)} y2={pad.t + g * (h - pad.t - pad.b)} stroke="var(--divider)" strokeWidth="1" />
        ))}
        <path d={area} fill="url(#lg)" />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="4" fill="var(--card)" stroke="var(--accent)" strokeWidth="2.5" />
            <text x={p[0]} y={h - 8} textAnchor="middle" fontSize="10.5" fill="var(--text-dim)">{data[i].year}</text>
          </g>
        ))}
      </svg>
    );
  }

  // ---------- shared ----------
  function PageHead({ icon, title, sub, actions }) {
    return (
      <div className="page-head">
        <div>
          <div className="page-title"><span className="ic"><Icon name={icon} size={22} /></span>{title}</div>
          {sub && <div className="page-sub" style={{ marginTop: 4, marginLeft: 32 }}>{sub}</div>}
        </div>
        {actions}
      </div>
    );
  }

  const kindIcon = { post: "post", photo: "image", audio: "audio", book: "book", doc: "doc" };
  const kindLabel = { post: "Postingan", photo: "Foto", audio: "Audio", book: "Kajian", doc: "Dokumen" };

  function PostRow({ p, onOpen }) {
    return (
      <div className="post" onClick={onOpen}>
        <div className="post-thumb" style={{ background: p.thumb }}>
          <Icon name={kindIcon[p.kind] || "post"} size={26} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4>{p.title}</h4>
          <div className="pe">{p.excerpt}</div>
          <div className="meta">
            <span className="chip">{kindLabel[p.kind]}</span>
            <span><Icon name="user" size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />{p.author}</span>
            <span><Icon name="clock" size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />{p.date}</span>
          </div>
        </div>
      </div>
    );
  }

  // ---------- BERANDA (statistik pendidikan + keuangan) ----------
  function Section({ icon, title, note }) {
    return (
      <div className="section-title">
        <span className="ic"><Icon name={icon} size={19} /></span>
        <span className="st">{title}</span>
        {note && <span className="note">{note}</span>}
      </div>
    );
  }

  function BarChart({ months, a, b, w = 600, h = 220 }) {
    const pad = { l: 40, r: 8, t: 12, b: 34 };
    const max = Math.max(...a, ...b) * 1.15;
    const gw = (w - pad.l - pad.r) / months.length;
    const bw = Math.min(12, gw * 0.3);
    const base = h - pad.b;
    const ys = (v) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
    const ticks = [0, 0.25, 0.5, 0.75, 1];
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
        {ticks.map((g, i) => {
          const y = pad.t + g * (h - pad.t - pad.b);
          return (
            <g key={i}>
              <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="var(--divider)" strokeDasharray="2 3" />
              <text x={pad.l - 6} y={y + 3} textAnchor="end" fontSize="9" fill="var(--text-dim)">Rp {Math.round(max * (1 - g))}jt</text>
            </g>
          );
        })}
        {months.map((m, i) => {
          const cx = pad.l + gw * i + gw / 2;
          return (
            <g key={i}>
              <rect x={cx - bw - 1} y={ys(a[i])} width={bw} height={base - ys(a[i])} rx="2.5" fill="var(--accent)" />
              <rect x={cx + 1} y={ys(b[i])} width={bw} height={base - ys(b[i])} rx="2.5" fill="#ef4d5a" />
              <text x={cx} y={base + 15} textAnchor="middle" fontSize="8.5" fill="var(--text-dim)">{m.split("'")[0]}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  function Beranda({ go }) {
    const edu = A.education, fin = A.finance;
    const toneColor = { red: "#e11d48", teal: "var(--accent)", blue: "#0ea5e9", amber: "#d98706" };
    // running saldo (jt), starting balance 1500
    let bal = 1500;
    const saldo = fin.pemasukan.map((p, i) => { bal += p - fin.pengeluaran[i]; return { year: fin.months[i].split("'")[0], value: bal }; });

    return (
      <div className="page fade">
        {/* ===== PENDIDIKAN ===== */}
        <Section icon="chart-pie" title="Dasbor Statistik Pendidikan" note="Tahun ajaran 2025 / 2026" />
        <div className="kpi-row">
          {edu.kpi.map((c, i) => (
            <div className="kpi" key={i}>
              <span className="kpi-ic"><Icon name={c.icon} size={22} /></span>
              <div className="kpi-v">{c.value}</div>
              <div className="kpi-l">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-h"><h3>Statistik Lembaga</h3><span className="muted" style={{ fontSize: 12 }}>8 lembaga</span></div>
          <div className="lembaga-grid">
            {edu.lembaga.map((l, i) => (
              <div className="lembaga" key={i}>
                <div className="lembaga-nm">{l.nama}</div>
                <div className="lembaga-cells">
                  <div className="lc"><span>KELAS</span><b>{l.kelas}</b></div>
                  <div className="lc"><span>SANTRI</span><b>{l.santri}</b></div>
                  <div className="lc"><span>GURU</span><b>{l.guru}</b></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== KEUANGAN ===== */}
        <Section icon="chart-line" title="Dasbor Statistik Keuangan" note="Per Juni 2026" />
        <div className="fin-row">
          {fin.summary.map((f, i) => (
            <div className="fin-card" key={i}>
              <div className="fin-top"><span className="fin-l">{f.label}</span><span className="fin-ic" style={{ color: toneColor[f.tone] }}><Icon name={f.icon} size={18} /></span></div>
              <div className="fin-v" style={{ color: toneColor[f.tone] }}>{f.count}</div>
              <div className="fin-sub">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
          <div className="card">
            <div className="card-h">
              <h3>Pemasukan vs Pengeluaran</h3>
              <div className="chart-legend">
                <span><i style={{ background: "var(--accent)" }} />Pemasukan</span>
                <span><i style={{ background: "#ef4d5a" }} />Pengeluaran</span>
              </div>
            </div>
            <BarChart months={fin.months} a={fin.pemasukan} b={fin.pengeluaran} />
          </div>
          <div className="card">
            <div className="card-h"><h3>Saldo Berjalan Bulanan</h3><span className="muted" style={{ fontSize: 12 }}>12 bulan terakhir</span></div>
            <LineChart data={saldo} />
          </div>
        </div>
      </div>
    );
  }

  function Live() {
    const [t, setT] = React.useState(new Date());
    React.useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
    return <span>{String(t.getHours()).padStart(2, "0")}:{String(t.getMinutes()).padStart(2, "0")}<span style={{ fontSize: 18, opacity: .8 }}>:{String(t.getSeconds()).padStart(2, "0")}</span></span>;
  }

  // ---------- STATISTIK ----------
  function Statistik() {
    const s = A.stats;
    const cards = [
      { icon: "user", v: s.totalGuru, l: "Total Guru" },
      { icon: "users", v: s.totalSantri.toLocaleString("id-ID"), l: "Total Santri" },
      { icon: "clipboard", v: s.totalStaf, l: "Total Staf" },
    ];
    return (
      <div className="page fade">
        <PageHead icon="chart-pie" title="Dasbor Statistik" sub="Ringkasan data pesantren tahun ajaran 2025/2026"
          actions={<button className="btn-ghost"><Icon name="download" size={16} /> Ekspor</button>} />
        <div className="stat-cards" style={{ marginBottom: 16 }}>
          {cards.map((c, i) => (
            <div className="stat" key={i}>
              <div className="si"><Icon name={c.icon} size={22} /></div>
              <div><div className="sv">{c.v}</div><div className="sl">{c.l}</div></div>
            </div>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
          <div className="card">
            <div className="card-h"><h3>Distribusi Program</h3></div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Donut data={s.donut} />
              <div className="legend" style={{ flex: 1 }}>
                {s.donut.map((d, i) => (
                  <div className="li" key={i}><span className="dot" style={{ background: d.color }} />{d.label}<span className="lv">{d.value}%</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Tren Pendaftaran Santri</h3><span className="muted" style={{ fontSize: 12 }}>2021 – 2026</span></div>
            <LineChart data={s.trend} />
          </div>
        </div>
      </div>
    );
  }

  // ---------- KEUANGAN ----------
  function Keuangan() {
    const fin = A.finance;
    const toneColor = { red: "#e11d48", teal: "var(--accent)", blue: "#0ea5e9", amber: "#d98706" };
    let bal = 1500;
    const saldo = fin.pemasukan.map((p, i) => { bal += p - fin.pengeluaran[i]; return { year: fin.months[i].split("'")[0], value: bal }; });
    return (
      <div className="page fade">
        <PageHead icon="wallet" title="Keuangan" sub="Tagihan, tabungan, bisyaroh, dan laporan kas pesantren"
          actions={<div style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost"><Icon name="download" size={16} /> Ekspor</button>
            <button className="btn-primary" style={{ width: "auto", padding: "9px 14px" }}><Icon name="plus" size={16} /> Transaksi Baru</button>
          </div>} />

        <div className="fin-row">
          {fin.summary.map((f, i) => (
            <div className="fin-card" key={i}>
              <div className="fin-top"><span className="fin-l">{f.label}</span><span className="fin-ic" style={{ color: toneColor[f.tone] }}><Icon name={f.icon} size={18} /></span></div>
              <div className="fin-v" style={{ color: toneColor[f.tone] }}>{f.count}</div>
              <div className="fin-sub">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
          <div className="card">
            <div className="card-h">
              <h3>Pemasukan vs Pengeluaran</h3>
              <div className="chart-legend">
                <span><i style={{ background: "var(--accent)" }} />Pemasukan</span>
                <span><i style={{ background: "#ef4d5a" }} />Pengeluaran</span>
              </div>
            </div>
            <BarChart months={fin.months} a={fin.pemasukan} b={fin.pengeluaran} />
          </div>
          <div className="card">
            <div className="card-h"><h3>Saldo Berjalan Bulanan</h3><span className="muted" style={{ fontSize: 12 }}>12 bulan terakhir</span></div>
            <LineChart data={saldo} />
          </div>
        </div>

        <div className="card" style={{ marginTop: 16, padding: 6 }}>
          <div className="card-h" style={{ padding: "12px 12px 6px" }}><h3>Transaksi Terakhir</h3><span className="link">Lihat buku kas →</span></div>
          <table className="table">
            <thead><tr><th>Tanggal</th><th>Keterangan</th><th>Jenis</th><th style={{ textAlign: "right" }}>Nominal</th></tr></thead>
            <tbody>
              {fin.transaksi.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--text-dim)", whiteSpace: "nowrap" }}>{r.tgl}</td>
                  <td style={{ fontWeight: 600 }}>{r.ket}</td>
                  <td><span className={"pill " + (r.jenis === "Masuk" ? "masuk" : "keluar")}>{r.jenis}</span></td>
                  <td style={{ textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: r.jenis === "Masuk" ? "#15803d" : "#dc2626" }}>
                    {r.jenis === "Masuk" ? "+" : "−"} {r.nominal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ---------- KALENDER ----------
  function Kalender() {
    return (
      <div className="page fade">
        <PageHead icon="calendar-days" title="Kalender Pendidikan" sub="Agenda & hari penting tahun ajaran berjalan"
          actions={<button className="btn-ghost"><Icon name="plus" size={16} /> Tambah Agenda</button>} />
        <div className="card">
          {A.events.map((e, i) => (
            <div className="ev" key={i} style={{ padding: "16px 6px" }}>
              <div className={"ev-date ev-" + e.tone} style={{ width: 58, height: 58 }}><div className="mon">{e.mon}</div><div className="d">{e.d}</div></div>
              <div className="ev-info" style={{ flex: 1 }}><div className="t" style={{ fontSize: 15 }}>{e.title}</div><div className="s">{e.date}</div></div>
              <button className="btn-ghost" style={{ padding: "7px 10px" }}><Icon name="bell" size={15} /></button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- SALURAN ----------
  function Saluran({ go }) {
    return (
      <div className="page fade">
        <PageHead icon="broadcast" title="Al Manshur Channel" sub="Kelola postingan & kanal informasi pesantren"
          actions={<button className="btn-primary" style={{ width: "auto", padding: "11px 16px" }} onClick={() => go("buat")}><Icon name="edit" size={16} /> Buat Postingan</button>} />
        <div className="card">
          {A.posts.map((p, i) => <PostRow key={i} p={p} onOpen={() => {}} />)}
        </div>
      </div>
    );
  }

  // ---------- BUAT POSTINGAN (compose) ----------
  function Buat() {
    const tools = ["save", "undo", "redo", "sep", "book", "image", "audio", "file", "sep", "megaphone", "send"];
    return (
      <div className="page fade">
        <PageHead icon="edit" title="Buat Postingan" sub="Tulis pengumuman, dokumentasi, atau kajian untuk kanal" />
        <div className="compose">
          <div className="compose-toolbar">
            {tools.map((t, i) => t === "sep" ? <div className="ct-sep" key={i} /> : (
              <button className="ct-btn" key={i} title={t}><Icon name={t} size={17} /></button>
            ))}
          </div>
          <div className="compose-field">
            <input className="title" defaultValue="" placeholder="Judul postingan…" />
          </div>
          <div className="compose-body" contentEditable suppressContentEditableWarning data-ph="Tulis isi postingan di sini…"></div>
          <div className="compose-foot">
            <div className="muted" style={{ fontSize: 12, display: "flex", gap: 8, alignItems: "center" }}>
              <Icon name="broadcast" size={15} /> Kanal: <b style={{ color: "var(--text)" }}>Al Manshur Channel</b>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-ghost">Simpan Draf</button>
              <button className="btn-primary" style={{ width: "auto", padding: "10px 18px" }}><Icon name="send" size={16} /> Publikasikan</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- SANTRI ----------
  function Santri() {
    return (
      <div className="page fade">
        <PageHead icon="users" title="Data Santri" sub="2.500 santri terdaftar · menampilkan 8 teratas"
          actions={<div style={{ display: "flex", gap: 8 }}><button className="btn-ghost"><Icon name="download" size={16} /> Ekspor</button><button className="btn-primary" style={{ width: "auto", padding: "9px 14px" }}><Icon name="plus" size={16} /> Tambah</button></div>} />
        <div className="card" style={{ padding: 6 }}>
          <table className="table">
            <thead><tr><th>NIS</th><th>Nama</th><th>Kelas</th><th>Program</th><th>Asrama</th><th>Status</th></tr></thead>
            <tbody>
              {A.santri.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontVariantNumeric: "tabular-nums", color: "var(--text-dim)" }}>{r.nis}</td>
                  <td style={{ fontWeight: 600 }}>{r.nama}</td>
                  <td>{r.kelas}</td><td>{r.program}</td><td>{r.asrama}</td>
                  <td><span className={"pill " + r.status.toLowerCase()}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ---------- SUPERVISI ----------
  function Supervisi() {
    return (
      <div className="page fade">
        <PageHead icon="clipboard" title="Data Supervisi" sub="Hasil supervisi & evaluasi pembelajaran pekan ini"
          actions={<button className="btn-primary" style={{ width: "auto", padding: "9px 14px" }}><Icon name="edit" size={16} /> Buat Laporan</button>} />
        <div className="card" style={{ padding: 6 }}>
          <table className="table">
            <thead><tr><th>Tanggal</th><th>Guru</th><th>Mata Pelajaran</th><th>Kelas</th><th>Nilai</th><th>Catatan</th></tr></thead>
            <tbody>
              {A.supervisi.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--text-dim)" }}>{r.tgl}</td>
                  <td style={{ fontWeight: 600 }}>{r.guru}</td>
                  <td>{r.mapel}</td><td>{r.kelas}</td>
                  <td><span className="grade">{r.nilai}</span></td>
                  <td className="muted">{r.catatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ---------- PERSONAL ----------
  function Personal() {
    const rows = [
      ["Nama Lengkap", A.user.name], ["Peran", "Administrator"], ["Email", "rahman.fanani@mambaululum.sch.id"],
      ["No. HP", "+62 812-3456-7890"], ["Unit", "Tata Usaha & IT"], ["Bergabung", "12 Juli 2021"],
    ];
    return (
      <div className="page fade">
        <PageHead icon="user" title="Profil Saya" sub="Kelola informasi akun dan preferensi"
          actions={<button className="btn-ghost"><Icon name="edit" size={16} /> Edit Profil</button>} />
        <div className="grid" style={{ gridTemplateColumns: "300px 1fr" }}>
          <div className="card" style={{ textAlign: "center" }}>
            <img src={A.user.avatar} alt="" style={{ width: 96, height: 96, borderRadius: 24, margin: "6px auto 14px" }} />
            <div style={{ fontSize: 18, fontWeight: 700 }}>{A.user.name}</div>
            <div className="badge-admin" style={{ display: "inline-block", marginTop: 8 }}>{A.user.role}</div>
            <button className="btn-primary" style={{ marginTop: 18 }}><Icon name="lock" size={16} /> Ganti Kata Sandi</button>
          </div>
          <div className="card">
            <div className="card-h"><h3>Informasi Akun</h3></div>
            <div className="bs-info">
              {rows.map((r, i) => <div className="row" key={i}><b>{r[0]}</b><span>{r[1]}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- BANTUAN ----------
  function Bantuan() {
    const cards = [
      { icon: "book", t: "Panduan Pengguna", p: "Langkah demi langkah memakai setiap fitur Ammu Online." },
      { icon: "broadcast", t: "Mengelola Saluran", p: "Cara membuat postingan, kanal, dan moderasi konten." },
      { icon: "users", t: "Data Akademik", p: "Mengelola data santri, guru, kelas, dan rapor." },
      { icon: "comment", t: "Hubungi Admin", p: "Butuh bantuan langsung? Kirim pesan ke tim teknis." },
      { icon: "info", t: "Tentang Aplikasi", p: "Ammu Online v.96.0626 · Pondok Pesantren Mambaul Ulum." },
      { icon: "refresh", t: "Cek Pembaruan", p: "Aplikasi Anda sudah versi terbaru. Terakhir cek hari ini." },
    ];
    return (
      <div className="page fade">
        <PageHead icon="help" title="Pusat Bantuan" sub="Panduan, informasi, dan dukungan Ammu Online" />
        <div className="help-grid">
          {cards.map((c, i) => (
            <div className="help-card" key={i}>
              <div className="hi"><Icon name={c.icon} size={22} /></div>
              <h4>{c.t}</h4><p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- PLACEHOLDER ----------
  function Placeholder({ label }) {
    return (
      <div className="page fade">
        <div className="placeholder">
          <div>
            <div className="pic"><Icon name="layers" size={42} stroke={1.4} /></div>
            <h2>{label}</h2>
            <p>Modul ini bagian dari prototipe redesign. Tata letak ribbon &amp; navigasinya sudah aktif — konten detailnya menyusul.</p>
          </div>
        </div>
      </div>
    );
  }

  function View({ id, go }) {
    if (id.startsWith("placeholder:")) return <Placeholder label={id.split(":")[1]} />;
    switch (id) {
      case "beranda": return <Beranda go={go} />;
      case "statistik": return <Statistik />;
      case "keuangan": return <Keuangan />;
      case "kalender": return <Kalender />;
      case "saluran": return <Saluran go={go} />;
      case "buat": return <Buat />;
      case "santri": return <Santri />;
      case "supervisi": return <Supervisi />;
      case "personal": return <Personal />;
      case "bantuan": return <Bantuan />;
      default: return <Beranda go={go} />;
    }
  }

  window.AmmuView = View;
})();
