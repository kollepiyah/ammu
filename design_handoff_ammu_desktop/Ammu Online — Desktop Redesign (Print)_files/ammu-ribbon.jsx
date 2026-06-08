/* Ammu Online — Ribbon (tabs + groups + embedded widgets) */
(function () {
  const { useState, useEffect } = React;
  const Icon = window.Icon;

  // Arabic-Indic numerals for hijri display
  function toArabicNum(s) {
    const map = { "0": "٠", "1": "١", "2": "٢", "3": "٣", "4": "٤", "5": "٥", "6": "٦", "7": "٧", "8": "٨", "9": "٩" };
    return String(s).replace(/[0-9]/g, (d) => map[d]);
  }

  function useClock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
      const t = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(t);
    }, []);
    return now;
  }

  function ClockWidget() {
    const now = useClock();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return (
      <div className="rw-clock">
        <span className="ic"><Icon name="clock" size={26} stroke={1.5} /></span>
        <div className="rw-clock-main">
          <div className="day">SENIN · WIB</div>
          <div className="time">{hh}:{mm}<span style={{ fontSize: ".5em", opacity: .8 }}>:{ss}</span></div>
        </div>
        <div className="rw-clock-sep" />
        <div className="rw-clock-date">
          <div className="ar">{toArabicNum("٢٢ ذو الحجة ١٤٤٧")}</div>
          <div className="dm">8 Juni 2026</div>
        </div>
      </div>
    );
  }

  function GreetingWidget({ user }) {
    return (
      <div className="rw-greet">
        <img src={user.avatar} alt="" />
        <div>
          <div className="g1">Ahlan, {user.name}!</div>
          <div className="g2">Masuk sebagai <span className="badge-admin">{user.role}</span></div>
        </div>
      </div>
    );
  }

  function RibbonItem({ item, onAction, tweaks }) {
    if (item.type === "clock") return <ClockWidget />;
    if (item.type === "greeting") return <GreetingWidget user={window.AMMU.user} />;

    if (item.type === "toggle") {
      const on =
        item.action === "theme" ? tweaks.theme === "dark"
        : item.action === "ribbon" ? tweaks.ribbon === "simple"
        : false;
      return (
        <button className="rtoggle" data-on={on} onClick={() => onAction(item)}>
          <span className="ic"><Icon name={item.icon} size={16} /></span>
          <span className="lab">{item.label}</span>
          <span className="sw" />
        </button>
      );
    }

    if (item.type === "large") {
      return (
        <button
          className={"rbtn-lg" + (item.accent ? " accent" : "")}
          onClick={() => onAction(item)}
          title={item.label.replace("\n", " ")}
        >
          <span className="ic"><Icon name={item.icon} size={item.accent ? 22 : 26} stroke={1.6} /></span>
          <span className="lab">{item.label}</span>
        </button>
      );
    }

    // small
    return (
      <button className="rbtn-sm" onClick={() => onAction(item)} title={item.label}>
        <span className="ic"><Icon name={item.icon} size={16} /></span>
        <span className="lab">{item.label}</span>
      </button>
    );
  }

  function RibbonGroup({ group, onAction, tweaks }) {
    // split items into large/widgets vs small (small ones stack in columns of 3)
    const bigs = group.items.filter((i) => ["large", "clock", "greeting"].includes(i.type));
    const smalls = group.items.filter((i) => ["small", "toggle"].includes(i.type));
    const stacks = [];
    for (let i = 0; i < smalls.length; i += 3) stacks.push(smalls.slice(i, i + 3));

    return (
      <div className="rgroup">
        <div className="rgroup-items">
          {bigs.map((it, i) => (
            <RibbonItem key={"b" + i} item={it} onAction={onAction} tweaks={tweaks} />
          ))}
          {stacks.map((st, i) => (
            <div className="rgroup-stack" key={"s" + i}>
              {st.map((it, j) => (
                <RibbonItem key={j} item={it} onAction={onAction} tweaks={tweaks} />
              ))}
            </div>
          ))}
        </div>
        <div className="rgroup-label">{group.label}</div>
      </div>
    );
  }

  function Ribbon({ tab, onAction, tweaks }) {
    if (!tab) return null;
    return (
      <div className="ribbon fade" key={tab.id}>
        {tab.groups.map((g, i) => (
          <RibbonGroup key={i} group={g} onAction={onAction} tweaks={tweaks} />
        ))}
      </div>
    );
  }

  Object.assign(window, { Ribbon, toArabicNum });
})();
