/* Ammu Online — main app shell */
(function () {
  const { useState } = React;
  const Icon = window.Icon;
  const A = window.AMMU;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "ribbon": "classic",
    "accent": "#0f766e"
  }/*EDITMODE-END*/;

  const DEFAULT_VIEW = {
    home: "beranda", pendidikan: "santri", keuangan: "keuangan", saluran: "saluran",
    personal: "personal", supervisi: "supervisi", bantuan: "bantuan",
  };

  function App() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    const [tabId, setTabId] = useState("home");
    const [view, setView] = useState("beranda");
    const [maximized, setMaximized] = useState(false);
    const [backstage, setBackstage] = useState(false);
    const [bump, setBump] = useState(0);

    const tab = A.tabs.find((x) => x.id === tabId);

    function go(v) { setView(v); }
    function selectTab(id) { setTabId(id); setView(DEFAULT_VIEW[id] || "beranda"); }

    function onAction(item) {
      if (item.action === "theme") return setTweak("theme", t.theme === "dark" ? "light" : "dark");
      if (item.action === "ribbon") return setTweak("ribbon", t.ribbon === "simple" ? "classic" : "simple");
      if (item.action === "refresh") return setBump((b) => b + 1);
      if (item.view) go(item.view);
    }

    return (
      <div className="app" data-theme={t.theme} data-ribbon={t.ribbon} data-maximized={maximized}
           style={{ "--accent": t.accent, ...(maximized ? { width: "100vw", height: "100vh", borderRadius: 0 } : {}) }}>

        {/* ---------- TITLE BAR ---------- */}
        <div className="titlebar">
          <img className="tb-appicon" src={A.LOGO} alt="" />
          <div className="tb-qat">
            <button className="qat-btn" title="Simpan"><Icon name="save" size={15} /></button>
            <button className="qat-btn" title="Urungkan"><Icon name="undo" size={15} /></button>
            <button className="qat-btn" title="Ulangi"><Icon name="redo" size={15} /></button>
            <button className="qat-btn" title="Sesuaikan"><Icon name="chevron-down" size={13} /></button>
            <span className="qat-sep" />
          </div>
          <div className="tb-title">
            <div className="tb-search" onClick={(e) => e.currentTarget.querySelector("input").focus()}>
              <Icon name="search" size={15} />
              <input placeholder="Cari santri, guru, atau perintah…" />
            </div>
          </div>
          <div className="tb-right">
            <button className="tb-iconbtn" title="Ganti tema" onClick={() => setTweak("theme", t.theme === "dark" ? "light" : "dark")}>
              <Icon name={t.theme === "dark" ? "sun" : "moon"} size={17} />
            </button>
            <button className="tb-iconbtn" title="Notifikasi">
              <Icon name="bell" size={17} /><span className="tb-badge">1</span>
            </button>
            <div className="tb-user">
              <img src={A.user.avatar} alt="" />
              <div className="nm"><b>{A.user.name}</b><span>{A.user.role}</span></div>
            </div>
            <div className="win-controls">
              <button className="win-btn" title="Minimalkan"><Icon name="minimize" size={15} /></button>
              <button className="win-btn" title="Maksimalkan" onClick={() => setMaximized((m) => !m)}><Icon name="maximize" size={13} /></button>
              <button className="win-btn close" title="Tutup"><Icon name="close" size={15} /></button>
            </div>
          </div>
        </div>

        {/* ---------- TAB BAR ---------- */}
        <div className="tabbar">
          <button className="tab-file" onClick={() => setBackstage(true)}>File</button>
          {A.tabs.map((x) => (
            <button key={x.id} className={"tab" + (x.id === tabId ? " active" : "")} onClick={() => selectTab(x.id)}>
              {x.name}
            </button>
          ))}
          <div className="tabbar-spacer" />
          <div className="tab-extra">
            <button className="tab-share"><Icon name="users" size={15} /> Bagikan</button>
          </div>
        </div>

        {/* ---------- RIBBON ---------- */}
        <window.Ribbon tab={tab} onAction={onAction} tweaks={t} />

        {/* ---------- CONTENT ---------- */}
        <div className="content" key={tabId + view + bump}>
          <window.AmmuView id={view} go={go} />
        </div>

        {/* ---------- STATUS BAR ---------- */}
        <div className="statusbar">
          <span className="dot-online" />
          <span>Tersambung · Mambaul Ulum</span>
          <span style={{ opacity: .7 }}>Dzulhijjah 1447 H</span>
          <div className="sb-r">
            <span style={{ opacity: .8 }}>{A.stats.totalSantri.toLocaleString("id-ID")} santri · {A.stats.totalGuru} guru</span>
            <span style={{ opacity: .7 }}>v.96.0626</span>
            <span className="zoom"><Icon name="search" size={13} /> 100%</span>
          </div>
        </div>

        {/* ---------- BACKSTAGE ---------- */}
        {backstage && <window.Backstage onClose={() => setBackstage(false)} go={go} />}

        {/* ---------- TWEAKS ---------- */}
        <window.TweaksPanel>
          <window.TweakSection label="Tampilan" />
          <window.TweakRadio label="Tema" value={t.theme} options={["light", "dark"]} onChange={(v) => setTweak("theme", v)} />
          <window.TweakRadio label="Gaya Ribbon" value={t.ribbon} options={["classic", "simple"]} onChange={(v) => setTweak("ribbon", v)} />
          <window.TweakSection label="Warna Aksen" />
          <window.TweakColor label="Aksen" value={t.accent}
            options={["#0f766e", "#15803d", "#2563eb", "#4f46e5", "#b45309"]}
            onChange={(v) => setTweak("accent", v)} />
        </window.TweaksPanel>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
