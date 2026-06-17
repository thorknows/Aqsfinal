// Marfle — live position, speed, fuel rate + engine telemetry
function EngineRow({ label, rpm, coolant, load }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr 1fr 1fr', gap: 10, alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
      <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{rpm}<span style={{ color: 'var(--text-2)', fontWeight: 400, fontSize: 11 }}> {L('o/min', 'rpm')}</span></div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{coolant}<span style={{ color: 'var(--text-2)', fontWeight: 400, fontSize: 11 }}> °C</span></div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{load}<span style={{ color: 'var(--text-2)', fontWeight: 400, fontSize: 11 }}> %</span></div>
    </div>
  );
}

function AisCard() {
  const [open, setOpen] = React.useState(false);
  const live = window.useLive ? window.useLive() : null;

  const toDM = (dd, posChar, negChar) => {
    const sign = dd >= 0 ? posChar : negChar;
    const abs = Math.abs(dd);
    const deg = Math.floor(abs);
    const min = (abs - deg) * 60;
    return `${deg}°${min.toFixed(3)} ${sign}`;
  };

  const lat = live ? live.lat : 70.0339;
  const lon = live ? live.lon : 20.9560;
  const speed = live ? live.speed.toFixed(1).replace('.', ',') : '0,0';
  const fuelRate = live ? live.fuelRate.toFixed(1).replace('.', ',') : '11,9';
  const lastTs = live ? live.timeStr : '13:42:00';
  const eng = live || { portRpm: 700, stbdRpm: 701, portCoolant: 56, stbdCoolant: 64, portLoad: 32, stbdLoad: 9 };

  const mapSrcRef = React.useRef(`https://www.google.com/maps?q=${lat},${lon}&z=11&t=m&output=embed`);
  const mapSrc = mapSrcRef.current;

  return (
    <section className="card col-4">
      <div className="card-head">
        <h3>Marfle · Live</h3>
      </div>
      <div className="map-wrap" style={{ height: 200, position: 'relative' }}>
        <iframe
          src={mapSrc}
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Marfle posisjon"
        />
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid var(--primary-line)',
          borderRadius: 8,
          padding: '6px 10px',
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
          color: 'var(--primary-text)',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,37,70,0.18)',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'none'
        }}>
          ▲ AQS RØRVIK · {speed} kn
        </div>
      </div>
      <div className="ais-info-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="ais-cell">
          <span className="label">{L('Posisjon', 'Position')}</span>
          <div className="value small">Uløybukt</div>
          <div className="value mono" style={{ marginTop: 4 }}>{toDM(lat, 'N', 'S')}<br/>{toDM(lon, 'E', 'W')}</div>
        </div>
        <div className="ais-cell">
          <span className="label">{L('Fart', 'Speed')}</span>
          <div className="value">{speed} <span className="unit">kn</span></div>
          <div className="value small" style={{ marginTop: 10, color: 'var(--text-2)' }}>At Sea</div>
        </div>
        <div className="ais-cell">
          <span className="label">{L('Forbruk', 'Consumption')}</span>
          <div className="value">{fuelRate} <span className="unit">l/t</span></div>
          <div className="value mono" style={{ marginTop: 10, color: 'var(--text-2)', fontSize: 11 }}>{lastTs}</div>
        </div>
      </div>
      <div className="section-label" style={{ marginBottom: 2 }}>{L('Motordata', 'Engine data')}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr 1fr 1fr', gap: 10, padding: '6px 0', fontSize: 12, color: 'var(--text-3)', borderBottom: '1px solid var(--line)' }}>
        <span></span><span>RPM</span><span>{L('Kjøling', 'Cooling')}</span><span>{L('Last', 'Load')}</span>
      </div>
      <EngineRow label={L('Babord', 'Port')}   rpm={eng.portRpm} coolant={eng.portCoolant} load={eng.portLoad}/>
      <EngineRow label={L('Styrbord', 'Starboard')} rpm={eng.stbdRpm} coolant={eng.stbdCoolant} load={eng.stbdLoad}/>
      <button className="card-foot-link" onClick={() => setOpen(true)}>
        <I.info size={16}/>
        <span>{L('Gå til Marfle', 'Go to Marfle')}</span>
      </button>
      {open && <AisDetailsModal onClose={() => setOpen(false)} />}
    </section>
  );
}

// OP-logg — live-updating operational event log (Handling + Status)
function LogStatus({ status }) {
  const registered = status === 'Registrert';
  return <span className={`tag ${registered ? 'tag-muted' : ''}`}>{tr(status)}</span>;
}

function OpLogCard() {
  const live = window.useLive ? window.useLive() : { logRows: [] };
  const rows = live.logRows;
  return (
    <section className="card col-4">
      <div className="card-head">
        <h3>{L('OP-logg', 'OP log')}</h3>
        <div className="grow" />
        <button className="row-link">{L('Se alle', 'See all')} <I.arrowRight size={11}/></button>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 10 }}>{L('Siste hendelser', 'Latest events')} · AQS Rørvik</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map((r, i) => {
          const done = r.status === 'Utført';
          return (
            <div key={r.time + r.event} style={{
              display: 'grid', gridTemplateColumns: '58px 1fr auto', gap: 12, alignItems: 'center',
              padding: '12px 2px', borderBottom: i === rows.length - 1 ? 0 : '1px solid var(--line)',
              animation: i === 0 ? 'rowIn 600ms ease-out' : undefined,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', flex: '0 0 7px',
                  background: done ? 'var(--graph)' : 'var(--text-3)',
                  boxShadow: done ? '0 0 0 3px var(--primary-soft)' : 'none' }}/>
                {r.time}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{tr(r.event)}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.desc ? `${tr(r.desc)} · ` : ''}{r.user}
                </div>
              </div>
              <LogStatus status={r.status}/>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Marfle — operasjonsfaser (Summary report, mai 2026)
const PHASES = [
  { name: 'Transit mellom lok.', dist: 736, fuel: 9007, speed: 4.5,  rate: 12.3 },
  { name: 'Transit fra lok.',    dist: 278, fuel: 3376, speed: 14.9, rate: 12.2 },
  { name: 'Transit til lok.',    dist: 213, fuel: 2654, speed: 18.5, rate: 12.5 },
  { name: 'Operasjon på lok.',   dist: 101, fuel: 652,  speed: 0.2,  rate: 6.8  },
  { name: 'Havneoperasjoner',    dist: 12,  fuel: 116,  speed: 1.2,  rate: 9.5  },
  { name: 'Transit, annet',      dist: 9,   fuel: 83,   speed: 13.0, rate: 9.7  },
];
const PHASE_TOTAL = { dist: 1348, fuel: 15889, rate: 11.9 };
const no = (n) => n.toLocaleString('no-NO').replace(/,/g, ' ');

function SeaqloudCard() {
  const maxFuel = PHASES[0].fuel;
  return (
    <section className="card col-4">
      <div className="card-head">
        <h3>{L('Operasjonsfaser', 'Operation phases')}</h3>
        <div className="grow" />
        <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{L('mai 2026', 'May 2026')}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{L('Distanse', 'Distance')}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginTop: 4 }}>{no(PHASE_TOTAL.dist)}<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-2)', marginLeft: 3 }}>nm</span></div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{L('Drivstoff', 'Fuel')}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginTop: 4 }}>{no(PHASE_TOTAL.fuel)}<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-2)', marginLeft: 3 }}>l</span></div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{L('Snitt', 'Average')}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginTop: 4 }}>11,9<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-2)', marginLeft: 3 }}>l/nm</span></div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PHASES.map((p) => (
          <div key={p.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5, gap: 10 }}>
              <span style={{ fontSize: 13.5, color: 'var(--text-0)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tr(p.name)}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-1)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
                {no(p.fuel)} l · {String(p.rate).replace('.', ',')} l/nm
              </span>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: 'var(--surface-2)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(p.fuel / maxFuel) * 100}%`, background: 'var(--navy)', borderRadius: 999 }}/>
            </div>
          </div>
        ))}
      </div>
      <button className="card-foot-link">
        <I.info size={16}/>
        <span>{L('Gå til Marfle-rapport', 'Go to Marfle report')}</span>
      </button>
    </section>
  );
}

// Mission progression
function ProgressCard() {
  const live = window.useLive ? window.useLive() : null;
  const progress = live ? live.progress : 65;
  const steps = [
    { label: 'Planlegging', when: '06. jun', state: 'done' },
    { label: 'Mobilisering', when: '09. jun', state: 'done' },
    { label: 'Transitt til lokalitet', when: '10. jun', state: 'done' },
    { label: 'Utførelse', when: '—', state: 'current' },
    { label: 'Demobilisering', when: '—', state: 'pending' },
  ];  return (
    <section className="card col-4">
      <div className="card-head">
        <h3>{L('Oppdragsprogresjon', 'Mission progress')}</h3>
        <I.info size={14} />
      </div>
      <div className="prog-head">
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{L('Oppdrag', 'Operation')}</div>
          <div className="name">{tr('Fortøyningsinspeksjon')}</div>
        </div>
        <button className="row-link">{L('Se oppdrag', 'See operation')} <I.arrowRight size={11}/></button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
        <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{L('Fremdrift', 'Progress')}</span>
        <span className="prog-pct">{progress}%</span>
      </div>
      <div className="prog-bar">
        <div className="fill" style={{ width: `${progress}%`, transition: 'width 800ms ease' }}></div>
      </div>
      <div className="steps">
        {steps.map((s, i) => (
          <div key={i} className={`step ${s.state}`}>
            <div className="ic">
              {s.state === 'done' ? <I.check size={12} sw={2.4}/> : null}
            </div>
            <div className="label">{tr(s.label)}</div>
            <div className="when">{trDate(s.when)}</div>
          </div>
        ))}
      </div>
      <div className="eta">
        <div className="ic"><I.calendar size={18}/></div>
        <div>
          <div className="label">{L('Forventet ferdig', 'Estimated completion')}</div>
          <div className="val">{trDate('14. jun 2026')}</div>
        </div>
      </div>
    </section>
  );
}

window.AisCard = AisCard;
window.OpLogCard = OpLogCard;
window.SeaqloudCard = SeaqloudCard;
window.ProgressCard = ProgressCard;
