/* Ammu Online — Backstage (File menu, full-screen Office style) */
(function () {
  const { useState } = React;
  const Icon = window.Icon;
  const A = window.AMMU;

  function Backstage({ onClose, go }) {
    const [active, setActive] = useState("beranda");

    const newTiles = [
      { icon: "edit", t: "Postingan Kosong", p: "Mulai dari halaman kosong" },
      { icon: "megaphone", t: "Pengumuman", p: "Template pengumuman resmi" },
      { icon: "image", t: "Dokumentasi", p: "Galeri foto kegiatan" },
      { icon: "book", t: "Kajian", p: "Catatan kajian kitab" },
      { icon: "file", t: "Surat / Dokumen", p: "Format dokumen administrasi" },
      { icon: "calendar", t: "Agenda", p: "Tambah agenda kalender" },
    ];

    function Main() {
      if (active === "info") {
        const rows = [
          ["Aplikasi", "Ammu Online — Desktop"], ["Lembaga", "Pondok Pesantren Mambaul Ulum"],
          ["Pengguna", A.user.name + " (Administrator)"], ["Versi", "v.96.0626 (Electron)"],
          ["Hijriah", "Dzulhijjah 1447 H"], ["Terakhir Sinkron", "8 Juni 2026, 14.15 WIB"],
          ["Status", "Tersambung"],
        ];
        return (
          <div className="bs-main">
            <h1>Info</h1>
            <div className="bs-info">{rows.map((r, i) => <div className="row" key={i}><b>{r[0]}</b><span>{r[1]}</span></div>)}</div>
          </div>
        );
      }
      if (active === "buka") {
        return (
          <div className="bs-main">
            <h1>Buka Arsip</h1>
            <div className="bs-cards">
              {A.posts.slice(0, 6).map((p, i) => (
                <div className="bs-tile" key={i} onClick={() => { onClose(); go("saluran"); }}>
                  <div className="ti" style={{ background: "color-mix(in srgb," + p.thumb + " 16%,transparent)", color: p.thumb }}><Icon name="file" size={22} /></div>
                  <h4 style={{ fontSize: 14 }}>{p.title}</h4><p>{p.date}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      if (active === "akun") {
        return (
          <div className="bs-main">
            <h1>Akun</h1>
            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 28 }}>
              <img src={A.user.avatar} alt="" style={{ width: 84, height: 84, borderRadius: 22 }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>{A.user.name}</div>
                <div className="muted">rahman.fanani@mambaululum.sch.id</div>
                <div className="badge-admin" style={{ display: "inline-block", marginTop: 8 }}>{A.user.role}</div>
              </div>
            </div>
            <div className="bs-cards">
              {[["lock", "Privasi & Keamanan"], ["bell", "Notifikasi"], ["language", "Bahasa & Wilayah"], ["logout", "Keluar dari Akun"]].map((x, i) => (
                <div className="bs-tile" key={i}><div className="ti"><Icon name={x[0]} size={22} /></div><h4 style={{ fontSize: 14 }}>{x[1]}</h4></div>
              ))}
            </div>
          </div>
        );
      }
      if (active === "tentang") {
        return (
          <div className="bs-main">
            <h1>Tentang</h1>
            <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 20 }}>
              <img src={A.LOGO} alt="" style={{ width: 72, height: 72, borderRadius: 16, background: "#fff", padding: 6 }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>Ammu Online</div>
                <div className="muted">Sistem Manajemen Pondok Pesantren Mambaul Ulum</div>
              </div>
            </div>
            <p className="muted" style={{ maxWidth: 560, lineHeight: 1.7 }}>
              Versi desktop (Electron) dengan antarmuka ribbon ala perkantoran modern — akses cepat ke data santri,
              guru, rapor, keuangan, jadwal, dan kanal informasi dalam satu jendela.
            </p>
            <div className="bs-info" style={{ marginTop: 18, maxWidth: 420 }}>
              <div className="row"><b>Versi</b><span>v.96.0626</span></div>
              <div className="row"><b>Hak Cipta</b><span>© 2026 Mambaul Ulum</span></div>
            </div>
          </div>
        );
      }
      // default: New / Beranda
      return (
        <div className="bs-main">
          <h1>{active === "baru" ? "Postingan Baru" : "Selamat datang"}</h1>
          <div className="bs-cards">
            {newTiles.map((t, i) => (
              <div className="bs-tile" key={i} onClick={() => { onClose(); go("buat"); }}>
                <div className="ti"><Icon name={t.icon} size={22} /></div>
                <h4 style={{ fontSize: 14 }}>{t.t}</h4><p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    function railClick(it) {
      if (it.id === "beranda") { onClose(); go("beranda"); return; }
      if (it.id === "keluar") { onClose(); return; }
      if (it.id === "pengaturan") { onClose(); go("personal"); return; }
      setActive(it.id);
    }

    return (
      <div className="backstage">
        <div className="bs-rail">
          <div className="bs-back" onClick={onClose}><Icon name="undo" size={20} /> Kembali</div>
          {A.backstage.map((it, i) => it.sep
            ? <div className="bs-sep" key={i} />
            : <div className={"bs-item" + (active === it.id ? " active" : "")} key={i} onClick={() => railClick(it)}>
                <Icon name={it.icon} size={18} /> {it.label}
              </div>
          )}
        </div>
        <Main />
      </div>
    );
  }

  window.Backstage = Backstage;
})();
