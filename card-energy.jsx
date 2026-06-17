// Fuel usage card (Marfle) with animated chart
const ENERGY_DATA = {
  'I dag': {
    points: [9,10,8,11,12,14,11,12,15,16,13,12,10,12,15,14,12,10,9,8,9,11,10,9],
    total: '512', perNm: '11,9', avg: '12', range: '320',
    axis: ['00:00', '06:00', '12:00', '18:00', '24:00']
  },
  '7 dager': {
    points: [520, 612, 498, 705, 540, 660, 480],
    total: '3 580', perNm: '11,7', avg: '12', range: '335',
    axis: ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn']
  },
  '30 dager': {
    points: [430,610,250,360,860,800,470,560,990,1190,40,840,490,290,820,640,530,40,510,30,100,100,110,720,420,1100,730,30,1330,170],
    total: '15 889', perNm: '11,9', avg: '12', range: '328',
    axis: ['Uke 18', 'Uke 19', 'Uke 20', 'Uke 21', 'Uke 22']
  }
};

function EnergyChart({ points }) {
  const W = 800, H = 168, P = 8;
  const max = Math.max(...points) * 1.15;
  const min = 0;
  const stepX = (W - P*2) / (points.length - 1);
  const yFor = (v) => P + (H - P*2) * (1 - (v - min) / (max - min));
  const path = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${P + i*stepX} ${yFor(v)}`).join(' ');
  const fill = `${path} L ${P + (points.length-1)*stepX} ${H - P} L ${P} ${H - P} Z`;
  const [drawn, setDrawn] = React.useState(0);
  const lineRef = React.useRef(null);
  React.useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    requestAnimationFrame(() => {
      el.style.transition = 'stroke-dashoffset 1100ms cubic-bezier(.4,0,.2,1)';
      el.style.strokeDashoffset = 0;
    });
    setDrawn(d => d + 1);
  }, [points]);

  // Y gridlines
  const grids = [0.25, 0.5, 0.75].map(p => P + (H - P*2) * p);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="enFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#002546" stopOpacity="0.16"/>
          <stop offset="1" stopColor="#002546" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {grids.map((y, i) => (
        <line key={i} x1={P} x2={W-P} y1={y} y2={y} stroke="rgba(0,37,70,0.07)" strokeDasharray="3 4"/>
      ))}
      <path d={fill} fill="url(#enFill)" />
      <path
        ref={lineRef}
        d={path}
        fill="none"
        stroke="#002546"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {points.map((v, i) => {
        if (i % Math.ceil(points.length/8) !== 0) return null;
        return <circle key={i} cx={P + i*stepX} cy={yFor(v)} r="2.5" fill="#FFFFFF" stroke="#002546" strokeWidth="1.5"/>;
      })}
    </svg>
  );
}

function EnergyCard() {
  const [tab, setTab] = React.useState('I dag');
  const [open, setOpen] = React.useState(false);
  const d = ENERGY_DATA[tab];
  const live = window.useLive ? window.useLive() : null;

  // Live-update "Totalt forbruk" only on the "I dag" tab.
  const baseTotal = React.useMemo(() => {
    return parseInt(d.total.replace(/\s/g, ''), 10);
  }, [d.total]);
  const liveTotal = (tab === 'I dag' && live)
    ? baseTotal + Math.floor((Date.now() / 1000) % 60) // small drift up to ~+60 l
    : baseTotal;
  const totalDisplay = liveTotal.toLocaleString('no-NO').replace(/,/g, ' ');

  const [bump, setBump] = React.useState(0);
  React.useEffect(() => {
    if (tab !== 'I dag') return;
    setBump(b => b + 1);
  }, [liveTotal, tab]);

  return (
    <section className="card col-4">
      <div className="card-head">
        <h3>{L('Drivstofforbruk', 'Fuel consumption')}</h3>
      </div>
      <div className="tab-row">
        {Object.keys(ENERGY_DATA).map(t => (
          <button key={t} className={`tab-btn ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{tr(t)}</button>
        ))}
      </div>
      <div className="kpi-row">
        <div className="kpi">
          <div className="label">{L('Totalt forbruk', 'Total consumption')}</div>
          <div className="val" key={bump} style={{ animation: tab === 'I dag' ? 'flashVal 600ms ease-out' : 'none' }}>
            {fmtNum(tab === 'I dag' ? totalDisplay : d.total)}<span className="unit">l</span>
          </div>
        </div>
        <div className="kpi">
          <div className="label">{L('Per nm', 'Per nm')}</div>
          <div className="val">{fmtNum(d.perNm)}<span className="unit">l/nm</span></div>
        </div>
        <div className="kpi">
          <div className="label">{L('Snitt', 'Average')}</div>
          <div className="val">{fmtNum(d.avg)}<span className="unit">l/t</span></div>
        </div>
      </div>
      <div className="chart-wrap" key={tab}>
        <EnergyChart points={d.points} />
      </div>
      <div className="chart-axis">
        {d.axis.map(l => <span key={l}>{trDate(l)}</span>)}
      </div>
      <button className="panel-btn" onClick={() => setOpen(true)}>
        <I.info size={16}/>
        <span>{L('Se detaljer om drivstofforbruk', 'See fuel consumption details')}</span>
      </button>
      {open && <EnergyDetailsModal onClose={() => setOpen(false)} />}
    </section>
  );
}
window.EnergyCard = EnergyCard;
