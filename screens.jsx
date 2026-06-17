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

const ALERTS = [
  {
    sev: 'high',
    title:  ['Kritisk motortemperatur — AQS Rørvik',       'Critical engine temp — AQS Rørvik'],
    detail: ['Kjølevæsketemperatur 98 °C (grense 95 °C). Sjekk kjølesystem umiddelbart.', 'Coolant temperature 98 °C (limit 95 °C). Check cooling system immediately.'],
    time:   ['For 4 min siden', '4 min ago'],
  },
  {
    sev: 'high',
    title:  ['Lavt drivstoff — AQS Nordland',              'Low fuel — AQS Nordland'],
    detail: ['18 % gjenværende. Anbefalt påfyll innen 2 timer ved gjeldende forbruk.', '18 % remaining. Recommended refuel within 2 hours at current consumption.'],
    time:   ['For 12 min siden', '12 min ago'],
  },
  {
    sev: 'high',
    title:  ['AIS-tap — AQS Merlin',                       'AIS loss — AQS Merlin'],
    detail: ['Fartøyet har ikke sendt AIS-posisjon på 22 minutter.', 'Vessel has not transmitted AIS position for 22 minutes.'],
    time:   ['For 22 min siden', '22 min ago'],
  },
  {
    sev: 'med',
    title:  ['ROV-kommunikasjon degradert — AQS Heimdal',  'ROV comms degraded — AQS Heimdal'],
    detail: ['Pakketap 14 %. Fiberoptisk kabel bør inspiseres ved neste overflatepause.', 'Packet loss 14 %. Fiber-optic cable should be inspected at next surface break.'],
    time:   ['For 1 t siden', '1 h ago'],
  },
  {
    sev: 'med',
    title:  ['Sensor offline — AQS Loke',                  'Sensor offline — AQS Loke'],
    detail: ['Posisjonssensor svarer ikke siden 09:32. Siste kjente posisjon: Trondheim.', 'Position sensor not responding since 09:32. Last known position: Trondheim.'],
    time:   ['For 1 t siden', '1 h ago'],
  },
  {
    sev: 'med',
    title:  ['Kulingvarsel — Uløybukt',                    'Gale warning — Uløybukt'],
    detail: ['Yr.no melder sterk kuling (20–24 m/s) fra kl. 18:00. ROV-operasjon bør vurderes avsluttet.', 'Yr.no reports near-gale (20–24 m/s) from 18:00. ROV operation should be considered for suspension.'],
    time:   ['I dag, 10:05', 'Today, 10:05'],
  },
  {
    sev: 'med',
    title:  ['Sertifikat utløper snart — AQS Namdal',      'Certificate expiring — AQS Namdal'],
    detail: ['Fribordssertifikat utløper 30. juni 2026. Kontakt klasse for fornyelse.', 'Freeboard certificate expires 30 June 2026. Contact class surveyor for renewal.'],
    time:   ['I dag, 08:40', 'Today, 08:40'],
  },
  {
    sev: 'low',
    title:  ['Planlagt vedlikehold — AQS Njord',           'Planned maintenance — AQS Njord'],
    detail: ['Verftsopphold 14.–18. jun. Fartøyet er utilgjengelig i denne perioden.', 'Dockyard stay 14–18 Jun. Vessel unavailable during this period.'],
    time:   ['I dag, 07:15', 'Today, 07:15'],
  },
  {
    sev: 'low',
    title:  ['Nytt oppdrag tildelt — AQS Brage',           'New operation assigned — AQS Brage'],
    detail: ['Serviceoppdrag Larstangen (Salmar Farming AS) starter 17. jun kl. 06:00.', 'Service operation Larstangen (Salmar Farming AS) starts 17 Jun at 06:00.'],
    time:   ['I går, 16:30', 'Yesterday, 16:30'],
  },
  {
    sev: 'low',
    title:  ['Bunkerslogg mangler — AQS Marine',           'Bunker log missing — AQS Marine'],
    detail: ['Drivstoffylling 10. jun er ikke bekreftet i systemet. Loggfør manuelt.', 'Fuel fill on 10 Jun has not been confirmed in the system. Log manually.'],
    time:   ['I går, 14:52', 'Yesterday, 14:52'],
  },
];

const SEV_META = {
  high: { color: 'var(--bad)',    label: ['Kritisk', 'Critical'] },
  med:  { color: 'var(--warn)',   label: ['Advarsel', 'Warning'] },
  low:  { color: 'var(--text-2)', label: ['Info', 'Info'] },
};

function VarslerScreen() {
  const [filter, setFilter] = React.useState('all');
  const visible = filter === 'all' ? ALERTS : ALERTS.filter(a => a.sev === filter);
  const highCount = ALERTS.filter(a => a.sev === 'high').length;
  const medCount  = ALERTS.filter(a => a.sev === 'med').length;
  return (
    <div className="page-wrap">
      <div className="page-head" style={{ padding: '20px 0 16px' }}>
        <div>
          <h1>{L('Varsler', 'Alerts')}</h1>
          <p>{L(
            `${highCount} kritiske og ${medCount} advarsler krever oppmerksomhet.`,
            `${highCount} critical and ${medCount} warnings require attention.`
          )}</p>
        </div>
      </div>
      <div className="tab-row" style={{ marginBottom: 18 }}>
        {[
          { key: 'all',  label: L('Alle', 'All') },
          { key: 'high', label: L('Kritiske', 'Critical') },
          { key: 'med',  label: L('Advarsler', 'Warnings') },
          { key: 'low',  label: L('Info', 'Info') },
        ].map(f => (
          <button key={f.key} className={`tab-btn ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        {visible.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '18px 24px', borderBottom: i === visible.length - 1 ? 'none' : '1px solid var(--line)' }}>
            <div style={{ width: 4, borderRadius: 4, background: SEV_META[a.sev].color, alignSelf: 'stretch', flexShrink: 0 }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: SEV_META[a.sev].color, flexShrink: 0,
                }}>{L(SEV_META[a.sev].label[0], SEV_META[a.sev].label[1])}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{L(a.title[0], a.title[1])}</span>
              </div>
              <div style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 5 }}>{L(a.detail[0], a.detail[1])}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}>{L(a.time[0], a.time[1])}</div>
          </div>
        ))}
        {visible.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>
            {L('Ingen varsler i denne kategorien.', 'No alerts in this category.')}
          </div>
        )}
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

const REPORTS = [
  {
    icon: 'doc',   color: 'var(--navy)',
    title: ['Driftsrapport mai 2026', 'Operations report May 2026'],
    desc:  ['Sammendrag av timer, transitt og bunkers for alle fartøyer.', 'Summary of hours, transit and bunkers across all vessels.'],
    date: '01.06.2026', type: 'PDF', size: '1.8 MB',
  },
  {
    icon: 'sensor', color: 'var(--blue)',
    title: ['Energianalyse Q2 2026', 'Energy analysis Q2 2026'],
    desc:  ['Forbruk per nm fordelt på fartøy og oppdragstype.', 'Fuel consumption per nm by vessel and operation type.'],
    date: '01.06.2026', type: 'PDF', size: '3.2 MB',
  },
  {
    icon: 'shield', color: '#4E8C2A',
    title: ['HMS-statistikk mai 2026', 'HSE statistics May 2026'],
    desc:  ['Hendelser, øvelser, avvik og korrigerende tiltak.', 'Incidents, drills, deviations and corrective actions.'],
    date: '31.05.2026', type: 'PDF', size: '0.9 MB',
  },
  {
    icon: 'ship',  color: 'var(--navy)',
    title: ['Oppdragsrapport · AQS Rørvik', 'Mission report · AQS Rørvik'],
    desc:  ['Fortøyningsinspeksjon Uløybukt — detaljert logg og funn.', 'Mooring inspection Uløybukt — detailed log and findings.'],
    date: '14.05.2026', type: 'PDF', size: '2.4 MB',
  },
  {
    icon: 'sensor', color: 'var(--blue)',
    title: ['Sensorlogg · AQS Heimdal juni', 'Sensor log · AQS Heimdal June'],
    desc:  ['Motor-, temperatur- og posisjonsdata fra Jakobsteinsvika-oppdraget.', 'Engine, temperature and position data from Jakobsteinsvika operation.'],
    date: '16.06.2026', type: 'CSV', size: '11.4 MB',
  },
  {
    icon: 'calendar', color: '#8A5200',
    title: ['Årsrapport 2025', 'Annual report 2025'],
    desc:  ['Totalsammendrag av drift, økonomi og bærekraft for 2025.', 'Full summary of operations, finance and sustainability for 2025.'],
    date: '15.01.2026', type: 'PDF', size: '6.7 MB',
  },
  {
    icon: 'doc',   color: 'var(--navy)',
    title: ['Bunkerslogg Q2 2026', 'Bunkers log Q2 2026'],
    desc:  ['Registrerte drivstoffyllingjer per fartøy og lokalitet.', 'Recorded fuel fills per vessel and location.'],
    date: '01.06.2026', type: 'XLSX', size: '0.4 MB',
  },
  {
    icon: 'cloud', color: '#4E8C2A',
    title: ['CO₂-rapport Q1 2026', 'CO₂ report Q1 2026'],
    desc:  ['Utslippsberegning per oppdrag i henhold til EU-krav.', 'Emissions calculation per operation per EU requirements.'],
    date: '05.04.2026', type: 'PDF', size: '1.1 MB',
  },
];

function ReportsScreen() {
  return (
    <div className="page-wrap">
      <div className="page-head" style={{ padding: '20px 0 16px' }}>
        <div>
          <h1>{L('Rapporter', 'Reports')}</h1>
          <p style={{ margin: '6px 0 0', color: 'var(--text-2)', fontSize: 15 }}>
            {L('Genererte rapporter fra oppdrag, energiforbruk, sensorlogger og driftstid.', 'Generated reports from operations, fuel consumption, sensor logs and operating time.')}
          </p>
        </div>
      </div>
      <div className="reports-grid">
        {REPORTS.map((r, i) => (
          <div key={i} className="report-card">
            <div className="report-card-icon" style={{ color: r.color }}>
              {I[r.icon] ? I[r.icon]({ size: 22 }) : <I.doc size={22}/>}
            </div>
            <div className="report-card-body">
              <div className="report-card-title">{L(r.title[0], r.title[1])}</div>
              <div className="report-card-desc">{L(r.desc[0], r.desc[1])}</div>
              <div className="report-card-meta">{r.date} · {r.type} · {r.size}</div>
            </div>
            <button className="report-dl-btn" aria-label={L('Last ned', 'Download') + ' ' + L(r.title[0], r.title[1])}>
              <I.arrowDown size={15}/>
              <span>{L('Last ned', 'Download')}</span>
            </button>
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
window.ReportsScreen = ReportsScreen;
window.FLEET = FLEET;
window.STATUS_STYLE = STATUS_STYLE;
window.STATUS_PRIORITY = STATUS_PRIORITY;
