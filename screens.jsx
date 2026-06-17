// Secondary screens — short, plausible, interactive enough.

function OppdragScreen({ embedded }) {
  const [filter, setFilter] = React.useState('Aktive');
  const items = [
    { id: 'OP-2401', name: 'Subsea inspeksjon', vessel: 'AQS Odin', status: 'Pågår', progress: 65, due: '15. mai' },
    { id: 'OP-2402', name: 'Notvask Lok. 12', vessel: 'AQS Frøya', status: 'Pågår', progress: 30, due: '17. mai' },
    { id: 'OP-2403', name: 'Forflytning bur', vessel: 'AQS Loke', status: 'Planlagt', progress: 0, due: '20. mai' },
    { id: 'OP-2398', name: 'ROV-inspeksjon', vessel: 'AQS Odin', status: 'Fullført', progress: 100, due: '08. mai' },
    { id: 'OP-2397', name: 'Fortøyningsservice', vessel: 'AQS Tor', status: 'Fullført', progress: 100, due: '06. mai' },
  ];
  const visible = items.filter(it => {
    if (filter === 'Aktive') return it.status === 'Pågår';
    if (filter === 'Planlagt') return it.status === 'Planlagt';
    if (filter === 'Fullført') return it.status === 'Fullført';
    return true;
  });
  return (
    <div className="page-wrap">
      <div className="page-head" style={{ padding: '20px 0 16px' }}>
        <div>
          <h1>{embedded ? 'Andre oppdrag' : 'Oppdrag'}</h1>
          <p>{embedded ? 'Andre pågående og planlagte oppdrag i flåten.' : 'Oversikt over alle pågående og planlagte oppdrag i flåten.'}</p>
        </div>
        {!embedded && (
          <div className="head-meta">
            <span className="live-pill"><span className="pulse"/> Live</span>
          </div>
        )}
      </div>
      <div className="tab-row" style={{ marginBottom: 18 }}>
        {['Alle', 'Aktive', 'Planlagt', 'Fullført'].map(f => (
          <button key={f} className={`tab-btn ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '110px 1.5fr 1fr 1fr 1fr 100px', gap: 16, padding: '14px 22px', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)', borderBottom: '1px solid var(--line)' }}>
          <span>ID</span><span>Oppdrag</span><span>Fartøy</span><span>Status</span><span>Fremdrift</span><span>Frist</span>
        </div>
        {visible.map(it => (
          <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '110px 1.5fr 1fr 1fr 1fr 100px', gap: 16, padding: '16px 22px', alignItems: 'center', fontSize: 13, borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-2)', fontSize: 12 }}>{it.id}</span>
            <span style={{ fontWeight: 500 }}>{it.name}</span>
            <span style={{ color: 'var(--text-1)' }}>{it.vessel}</span>
            <span>
              <span style={{
                fontSize: 12, padding: '4px 10px', borderRadius: 999,
                background: it.status === 'Pågår' ? 'var(--primary-soft)' : it.status === 'Fullført' ? 'rgba(0,37,70,0.05)' : 'rgba(245,180,80,0.12)',
                color: it.status === 'Pågår' ? 'var(--primary)' : it.status === 'Fullført' ? 'var(--text-2)' : 'var(--warn)',
                border: `1px solid ${it.status === 'Pågår' ? 'var(--primary-line)' : it.status === 'Fullført' ? 'var(--line)' : 'rgba(245,180,80,0.3)'}`,
                letterSpacing: '0.04em'
              }}>{it.status}</span>
            </span>
            <span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'rgba(0,37,70,0.07)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${it.progress}%`, background: 'var(--primary)' }}/>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'var(--font-mono)', minWidth: 32 }}>{it.progress}%</span>
              </div>
            </span>
            <span style={{ color: 'var(--text-2)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{it.due}</span>
          </div>
        ))}
        {visible.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>Ingen oppdrag i denne kategorien.</div>}
      </div>
    </div>
  );
}

// Real AQS fleet (from aqs.no/fartoy/) — categorized by vessel class.
const FLEET = [
  // Store fartøy (large vessels)
  { name: 'AQS Heimdal', class: 'Store fartøy',     status: 'På oppdrag',   loc: 'Frøya',         fuel: 72, job: 'OP-2401' },
  { name: 'AQS Saga',    class: 'Store fartøy',     status: 'På oppdrag',   loc: 'Hitra',         fuel: 58, job: 'OP-2402' },
  { name: 'AQS Trym',    class: 'Store fartøy',     status: 'I havn',       loc: 'Rørvik',        fuel: 91 },
  { name: 'AQS Merlin',  class: 'Store fartøy',     status: 'På oppdrag',   loc: 'Halsafjorden',  fuel: 44, job: 'OP-2405' },
  { name: 'AQS Njord',   class: 'Store fartøy',     status: 'På oppdrag',   loc: 'Smøla',         fuel: 67, job: 'OP-2406' },
  { name: 'AQS Odin',    class: 'Store fartøy',     status: 'På oppdrag',   loc: 'Sandstad',      fuel: 81, job: 'OP-2404' },
  { name: 'AQS Loke',    class: 'Store fartøy',     status: 'Tilgjengelig', loc: 'Trondheim',     fuel: 95 },
  { name: 'AQS Brage',   class: 'Store fartøy',     status: 'Tilgjengelig', loc: 'Rørvik',        fuel: 90 },
  { name: 'AQS Namdal',  class: 'Store fartøy',     status: 'Vedlikehold',  loc: 'Flatanger',     fuel: 0  },

  // Servicekatamaran
  { name: 'AQS Tor',     class: 'Servicekatamaran', status: 'Tilgjengelig', loc: 'Kristiansund',  fuel: 88 },
  { name: 'AQS Troll',   class: 'Servicekatamaran', status: 'Tilgjengelig', loc: 'Bergen',        fuel: 76 },
  { name: 'AQS Marine',  class: 'Servicekatamaran', status: 'På oppdrag',   loc: 'Vikna',         fuel: 52 },
  { name: 'AQS Rørvik',  class: 'Servicekatamaran', status: 'I havn',       loc: 'Rørvik',        fuel: 84 },
  { name: 'AQS Nordland',class: 'Servicekatamaran', status: 'På oppdrag',   loc: 'Bodø',          fuel: 39 },

  // Dykker/hurtiggående
  { name: 'AQS Tyr',     class: 'Dykker/hurtiggående', status: 'På oppdrag',   loc: 'Frøya',     fuel: 61 },
  { name: 'AQS Hermod',  class: 'Dykker/hurtiggående', status: 'Tilgjengelig', loc: 'Flatanger', fuel: 92 },
  { name: 'AQS Ravn',    class: 'Dykker/hurtiggående', status: 'Vedlikehold',  loc: 'Verft',     fuel: 0  },
  { name: 'AQS Siv',     class: 'Dykker/hurtiggående', status: 'Tilgjengelig', loc: 'Trondheim', fuel: 78 },
];

const STATUS_PRIORITY = { 'På oppdrag': 0, 'Tilgjengelig': 1, 'I havn': 2, 'Vedlikehold': 3 };

const STATUS_STYLE = {
  'På oppdrag':   { bg: 'var(--primary-soft)',          fg: 'var(--primary-text)', bd: 'var(--primary-line)' },
  'Tilgjengelig': { bg: 'rgba(0,143,213,0.12)',         fg: '#006FA6',             bd: 'rgba(0,143,213,0.30)' },
  'I havn':       { bg: 'rgba(0,37,70,0.05)',           fg: 'var(--text-2)',       bd: 'var(--line)' },
  'Vedlikehold':  { bg: 'rgba(181,103,12,0.12)',        fg: 'var(--warn)',         bd: 'rgba(181,103,12,0.30)' },
};

function VesselCard({ b }) {
  const s = STATUS_STYLE[b.status];
  const dim = b.status === 'Vedlikehold';
  return (
    <div className="card col-4" style={{ opacity: dim ? 0.78 : 1 }}>
      <div className="card-head">
        <h3>{b.name}</h3>
        <div className="grow"/>
        <span className="pill" style={{ background: s.bg, color: s.fg, borderColor: s.bd }}>{tr(b.status)}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{tr(b.class)}</div>
      <div style={{ display: 'flex', gap: 18, marginTop: 18 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{L('Lokasjon', 'Location')}</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{b.loc}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{L('Drivstoff', 'Fuel')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <div style={{ flex: 1, height: 6, background: 'rgba(0,37,70,0.07)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${b.fuel}%`, height: '100%', background: b.fuel < 30 ? 'var(--warn)' : 'var(--graph)' }}/>
            </div>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>{b.fuel}%</span>
          </div>
        </div>
      </div>
      {b.job && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--text-3)', letterSpacing: '0.04em' }}>
          {L('Aktivt oppdrag', 'Active operation')} · <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>{b.job}</span>
        </div>
      )}
    </div>
  );
}

function FlateScreen({ user }) {
  const isCustomer = user && user.role === 'kunde';
  const [view, setView] = React.useState('timeline');
  const [filter, setFilter] = React.useState('Alle');

  const sorted = [...FLEET].sort((a, b) => STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status]);
  const visible = filter === 'Alle' ? sorted : sorted.filter(b => b.class === filter);

  const groups = visible.reduce((acc, b) => {
    (acc[b.status] = acc[b.status] || []).push(b);
    return acc;
  }, {});
  const statusOrder = ['På oppdrag', 'Tilgjengelig', 'I havn', 'Vedlikehold'];

  const counts = {
    'På oppdrag':   FLEET.filter(b => b.status === 'På oppdrag').length,
    'Tilgjengelig': FLEET.filter(b => b.status === 'Tilgjengelig').length,
    'I havn':       FLEET.filter(b => b.status === 'I havn').length,
    'Vedlikehold':  FLEET.filter(b => b.status === 'Vedlikehold').length,
  };

  const filters = ['Alle', 'Store fartøy', 'Servicekatamaran', 'Dykker/hurtiggående'];

  return (
    <div className="page-wrap" data-screen-label="Flåte">
      <div className="page-head" style={{ padding: '20px 0 16px' }}>
        <div>
          <h1>{L('Flåte', 'Fleet')}</h1>
          <p>{isCustomer
            ? L('Se ledig kapasitet i AQS-flåten og send en bookingforespørsel.', 'See available capacity in the AQS fleet and send a booking request.')
            : L(`Sanntidsstatus og tilgjengelighet for ${FLEET.length} fartøyer i AQS-flåten.`, `Live status and availability for ${FLEET.length} vessels in the AQS fleet.`)}</p>
        </div>
      </div>

      <div className="seg-toggle" style={{ marginBottom: 20 }}>
        <button className={view === 'timeline' ? 'active' : ''} onClick={() => setView('timeline')}>
          <I.calendar size={15} /> {L('Tidslinje', 'Timeline')}
        </button>
        <button className={view === 'cards' ? 'active' : ''} onClick={() => setView('cards')}>
          <I.grid size={15} /> {L('Kort', 'Cards')}
        </button>
      </div>

      {view === 'timeline' && <FleetTimeline user={user} />}

      {view === 'cards' && (
        <>
          <div className="grid" style={{ padding: 0, gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 22 }}>
            {statusOrder.map(s => (
              <div key={s} className="card" style={{ padding: '18px 22px' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{tr(s)}</div>
                <div style={{ fontSize: 30, fontWeight: 600, marginTop: 8, color: STATUS_STYLE[s].fg }}>{counts[s]}</div>
              </div>
            ))}
          </div>

          <div className="tab-row" style={{ marginBottom: 18 }}>
            {filters.map(f => (
              <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'Alle' ? L('Alle', 'All') : tr(f)}
              </button>
            ))}
          </div>

          {statusOrder.map(s => {
            const list = groups[s];
            if (!list || list.length === 0) return null;
            return (
              <div key={s} style={{ marginBottom: 28 }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 12,
                  fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--text-3)', margin: '6px 4px 14px', whiteSpace: 'nowrap'
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: STATUS_STYLE[s].fg, display: 'inline-block' }}/>
                  <span style={{ color: STATUS_STYLE[s].fg, fontWeight: 600 }}>{tr(s)}</span>
                  <span>· {list.length}</span>
                </div>
                <div className="grid" style={{ padding: 0 }}>
                  {list.map(b => <VesselCard key={b.name} b={b}/>)}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

function VarslerScreen() {
  const alerts = [
    { sev: 'high', title: 'Lavt drivstoff — AQS Frøya', detail: '42% gjenværende. Anbefalt påfyll innen 4 timer.', time: 'For 12 min siden' },
    { sev: 'med', title: 'Sensor offline — AQS Loke', detail: 'Posisjonssensor svarer ikke siden 09:32.', time: 'For 1 t siden' },
    { sev: 'low', title: 'Vedlikehold planlagt — AQS Njord', detail: 'Verftsopphold 14.–18. mai.', time: 'I dag, 07:15' },
  ];
  const sevColor = { high: 'var(--bad)', med: 'var(--warn)', low: 'var(--text-2)' };
  return (
    <div className="page-wrap">
      <div className="page-head" style={{ padding: '20px 0 16px' }}>
        <div>
          <h1>Varsler</h1>
          <p>3 aktive varsler krever oppmerksomhet.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 0 }}>
        {alerts.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '20px 24px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ width: 4, borderRadius: 4, background: sevColor[a.sev], alignSelf: 'stretch' }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
              <div style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 4 }}>{a.detail}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericScreen({ title, blurb, items }) {
  return (
    <div className="placeholder">
      <h1>{title}</h1>
      <p>{blurb}</p>
      <div className="stub-grid">
        {items.map((it, i) => (
          <div key={i} className="stub">
            <h4>{it.h}</h4>
            <p>{it.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

window.OppdragScreen = OppdragScreen;
window.FlateScreen = FlateScreen;
window.VarslerScreen = VarslerScreen;
window.GenericScreen = GenericScreen;
window.FLEET = FLEET;
window.STATUS_STYLE = STATUS_STYLE;
window.STATUS_PRIORITY = STATUS_PRIORITY;
