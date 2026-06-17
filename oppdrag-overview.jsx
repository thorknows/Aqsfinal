// Oppdrag overview — fed by Oppdragsplanlegger (mission planner).

const JOB_TYPES = [
  'Fortøyningsinspeksjon',
  'Notvask m/ notinspeksjon',
  'Serviceoppdrag',
  'Støttefartøy',
  'Slep',
  'ROV-inspeksjon',
];

const JOBS = [
  // ACTIVE — from Oppdragsplanlegger (uke 10.–16. juni 2026)
  { id: '20260520', customer: 'Arnøy Laks AS',              loc: 'Uløybukt',       type: 'Fortøyningsinspeksjon',     vessel: 'AQS Rørvik',   status: 'active', progress: 65, start: '10. jun 06:30', eta: '14. jun 18:00' },
  { id: '20260522', customer: 'Mowi ASA / Region Nord',     loc: 'Jakobsteinsvika', type: 'Støttefartøy',             vessel: 'AQS Heimdal',  status: 'active', progress: 40, start: '10. jun 05:00', eta: '16. jun 20:00' },
  { id: '20260526', customer: 'Cermaq Norway AS',           loc: 'Marøya',         type: 'Notvask m/ notinspeksjon',  vessel: 'AQS Marine',   status: 'active', progress: 78, start: '10. jun 07:15', eta: '12. jun 16:00' },
  { id: '20260527', customer: 'Cermaq Norway AS',           loc: 'Vassvika',       type: 'Notvask m/ notinspeksjon',  vessel: 'AQS Marine',   status: 'active', progress: 22, start: '10. jun 07:45', eta: '12. jun 22:00' },
  { id: '20260510', customer: 'Salmar Farming AS',          loc: 'Larstangen',     type: 'Slep',                      vessel: 'AQS Merlin',   status: 'active', progress: 55, start: '09. jun 04:30', eta: '16. jun 12:00' },
  { id: '20260525', customer: 'Lerøy Aurora AS',            loc: 'Solheim',        type: 'Serviceoppdrag',            vessel: 'AQS Nordland', status: 'active', progress: 88, start: '10. jun 06:00', eta: '15. jun 18:00' },
  { id: '20260490', customer: 'Grieg Seafood Rogaland AS',  loc: 'Nordeimsøyna',   type: 'Serviceoppdrag',            vessel: 'AQS Loke',     status: 'active', progress: 34, start: '08. jun 08:00', eta: '14. jun 14:00' },
  { id: '20260523', customer: 'Bjørøya Drift AS',           loc: 'Kvenndalen',     type: 'Serviceoppdrag',            vessel: 'AQS Ravn',     status: 'active', progress: 12, start: '10. jun 09:00', eta: '11. jun 17:00' },

  // PLANLAGTE
  { id: '20260530', customer: 'Salmar Farming AS',          loc: 'Larstangen',     type: 'Serviceoppdrag',            vessel: 'AQS Brage',    status: 'upcoming', progress: 0, start: '17. jun 06:00', eta: '19. jun 18:00' },
  { id: '20260531', customer: 'Mowi ASA / Region Nord',     loc: 'Jakobsteinsvika', type: 'Notvask m/ notinspeksjon', vessel: 'AQS Njord',    status: 'upcoming', progress: 0, start: '18. jun 05:30', eta: '21. jun 20:00' },
  { id: '20260532', customer: 'Lerøy Aurora AS',            loc: 'Solheim',        type: 'Fortøyningsinspeksjon',     vessel: 'AQS Odin',     status: 'upcoming', progress: 0, start: '20. jun 07:00', eta: '22. jun 16:00' },

  // FULLFØRTE
  { id: '20260518', customer: 'Mowi ASA / Region Nord',     loc: 'Skinnstakkvika', type: 'Serviceoppdrag',            vessel: 'AQS Siv',      status: 'done', progress: 100, start: '04. jun 06:00', eta: '07. jun 18:00', completed: '07. jun 16:42' },
  { id: '20260515', customer: 'Arnøy Laks AS',              loc: 'Kraken',         type: 'Notvask m/ notinspeksjon',  vessel: 'AQS Siv',      status: 'done', progress: 100, start: '02. jun 05:30', eta: '04. jun 22:00', completed: '04. jun 21:18' },
  { id: '20260512', customer: 'Nordlaks AS',                loc: 'Skjervøy',       type: 'Slep',                      vessel: 'AQS Namdal',   status: 'done', progress: 100, start: '30. mai 07:00', eta: '02. jun 16:00', completed: '02. jun 14:05' },
  { id: '20260508', customer: 'Cermaq Norway AS',           loc: 'Marøya',         type: 'Fortøyningsinspeksjon',     vessel: 'AQS Marine',   status: 'done', progress: 100, start: '27. mai 06:00', eta: '29. mai 18:00', completed: '29. mai 17:24' },
  { id: '20260505', customer: 'Lerøy Aurora AS',            loc: 'Solheim',        type: 'ROV-inspeksjon',            vessel: 'AQS Nordland', status: 'done', progress: 100, start: '24. mai 06:30', eta: '27. mai 14:00', completed: '27. mai 13:02' },
  // Cermaq-historikk (kundens tidligere oppdrag)
  { id: '20260496', customer: 'Cermaq Norway AS',           loc: 'Vassvika',       type: 'Notvask m/ notinspeksjon',  vessel: 'AQS Marine',   status: 'done', progress: 100, start: '19. mai 05:45', eta: '21. mai 18:00', completed: '21. mai 16:30' },
  { id: '20260489', customer: 'Cermaq Norway AS',           loc: 'Marøya',         type: 'ROV-inspeksjon',            vessel: 'AQS Ravn',     status: 'done', progress: 100, start: '13. mai 07:00', eta: '15. mai 16:00', completed: '15. mai 14:48' },
  { id: '20260481', customer: 'Cermaq Norway AS',           loc: 'Vassvika',       type: 'Serviceoppdrag',            vessel: 'AQS Loke',     status: 'done', progress: 100, start: '06. mai 06:15', eta: '08. mai 20:00', completed: '08. mai 19:05' },
  { id: '20260474', customer: 'Cermaq Norway AS',           loc: 'Marøya',         type: 'Slep',                      vessel: 'AQS Namdal',   status: 'done', progress: 100, start: '30. apr 07:30', eta: '02. mai 16:00', completed: '02. mai 15:12' },
];

function ColHead({ label, sortable, align }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      fontSize: 14, fontWeight: 700, color: 'var(--navy)', letterSpacing: 0,
    }}>
      {label}
      {sortable && <span style={{ color: 'var(--navy)', display: 'grid', placeItems: 'center', opacity: 0.7 }}><I.sort size={14}/></span>}
    </span>
  );
}

function JobRow({ job, onOpen, columns, done }) {
  const clickable = job.status === 'active';
  return (
    <div
      className={clickable ? 'job-row clickable' : 'job-row'}
      onClick={() => clickable && onOpen(job)}
      style={{
        display: 'grid', gridTemplateColumns: columns, gap: 20,
        padding: '20px 28px', alignItems: 'center', fontSize: 14,
        borderBottom: '1px solid var(--line)',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'background 140ms ease',
      }}
    >
      <div>
        <div style={{
          fontWeight: 500, fontSize: 16, marginBottom: 6,
          color: 'var(--blue)', textDecoration: 'underline',
          textUnderlineOffset: 3, textDecorationThickness: '1px',
        }}>{job.customer}</div>
        <div style={{ fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
          {job.id} · {tr(job.type)}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 500, fontSize: 16, color: '#000', marginBottom: 6 }}>{job.vessel}</div>
        <div style={{ fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--green)', display: 'grid', placeItems: 'center' }}><I.pin size={14}/></span>
          {job.loc}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--green-track)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${job.progress}%`, background: 'var(--green-bright)', borderRadius: 999, transition: 'width 600ms ease' }}/>
        </div>
        <span style={{ fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--font-mono)', minWidth: 40, textAlign: 'right' }}>{job.progress}%</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink)' }}>{job.start}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink)' }}>
        {done ? job.completed : job.eta}
      </div>
    </div>
  );
}

function JobCardMobile({ job, onOpen, done }) {
  const clickable = job.status === 'active';
  return (
    <div
      className={clickable ? 'job-card clickable' : 'job-card'}
      onClick={() => clickable && onOpen(job)}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
      <div className="job-card-top">
        <div style={{ minWidth: 0 }}>
          <div className="job-card-customer">{job.customer}</div>
          <div className="job-card-meta">{job.id} · {tr(job.type)}</div>
        </div>
      </div>
      <div className="job-card-vessel">
        <span style={{ fontWeight: 600, color: '#000' }}>{job.vessel}</span>
        <span className="job-card-loc"><I.pin size={13}/> {job.loc}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 2px' }}>
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--green-track)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${job.progress}%`, background: 'var(--green-bright)', borderRadius: 999 }}/>
        </div>
        <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--ink)', minWidth: 38, textAlign: 'right' }}>{job.progress}%</span>
      </div>
      <div className="job-card-dates">
        <span><span className="k">Start</span> {job.start}</span>
        <span><span className="k">{done ? L('Fullført', 'Completed') : L('Est. ferdig', 'Est. complete')}</span> {done ? job.completed : job.eta}</span>
      </div>
    </div>
  );
}

function JobTable({ jobs, onOpenJob, done, mobile }) {
  if (mobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {jobs.map(j => <JobCardMobile key={j.id} job={j} onOpen={onOpenJob} done={done}/>)}
      </div>
    );
  }
  const columns = '2.1fr 1.3fr 1.3fr 1fr 1fr';
  return (
    <div className="card" style={{ padding: 0, marginBottom: 36 }}>
      <div style={{
        display: 'grid', gridTemplateColumns: columns, gap: 20,
        padding: '18px 28px', borderBottom: '1px solid var(--line-strong)',
      }}>
        <ColHead label={L('Oppdrag', 'Operation')}/>
        <ColHead label={L('Fartøy / Lokasjon', 'Vessel / Location')}/>
        <ColHead label={L('Fremdrift', 'Progress')} sortable/>
        <ColHead label="Start" sortable/>
        <ColHead label={done ? L('Fullført', 'Completed') : L('Estimert Ferdig', 'Est. Completion')} sortable/>
      </div>
      {jobs.map(j => (
        <JobRow key={j.id} job={j} onOpen={onOpenJob} columns={columns} done={done}/>
      ))}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="card" style={{ padding: '24px', gap: 18, border: '1px solid var(--stat-line)', borderRadius: 1 }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color }}>{value}</div>
    </div>
  );
}

function CustomerFilter({ options, selected, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onEsc); };
  }, [open]);

  const toggle = (name) => {
    onChange(selected.includes(name) ? selected.filter(n => n !== name) : [...selected, name]);
  };

  const label = selected.length === 0
    ? L('Alle kunder', 'All customers')
    : selected.length === 1
      ? selected[0]
      : L(`${selected.length} kunder valgt`, `${selected.length} customers selected`);

  return (
    <div className="ms-drop" ref={ref}>
      <button type="button" className={`ms-btn ${selected.length ? 'active' : ''}`} onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="ms-btn-ic"><I.filter size={15}/></span>
        <span className="ms-btn-label">{label}</span>
        {selected.length > 0 && <span className="ms-count">{selected.length}</span>}
        <I.chevronDown size={13} style={{ color: 'var(--text-3)', transition: 'transform 140ms ease', transform: open ? 'rotate(180deg)' : 'none' }}/>
      </button>
      {open && (
        <div className="ms-pop" role="listbox" aria-multiselectable="true">
          <div className="ms-pop-head">
            <span>{L('Filtrer på kunde', 'Filter by customer')}</span>
            {selected.length > 0 && (
              <button type="button" className="ms-clear" onClick={() => onChange([])}>{L('Nullstill', 'Clear')}</button>
            )}
          </div>
          <div className="ms-list">
            {options.map(name => {
              const on = selected.includes(name);
              return (
                <button key={name} type="button" role="option" aria-selected={on} className={`ms-item ${on ? 'on' : ''}`} onClick={() => toggle(name)}>
                  <span className="ms-check">{on ? <I.check size={12}/> : null}</span>
                  <span className="ms-item-label">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function OppdragOverviewScreen({ onOpenJob, user }) {
  const mobile = useMediaQuery('(max-width: 768px)');
  const customer = user && user.customer;
  const scoped = customer ? JOBS.filter(j => j.customer === customer) : JOBS;

  // Customer multiselect filter (AQS staff only; customers are already scoped to their own).
  const [selectedCustomers, setSelectedCustomers] = React.useState([]);
  const customerOptions = React.useMemo(
    () => [...new Set(JOBS.map(j => j.customer))].sort((a, b) => a.localeCompare(b, 'nb')),
    []
  );
  const filtered = (!customer && selectedCustomers.length)
    ? scoped.filter(j => selectedCustomers.includes(j.customer))
    : scoped;

  const active = filtered.filter(j => j.status === 'active');
  const upcoming = filtered.filter(j => j.status === 'upcoming');
  const done = filtered.filter(j => j.status === 'done');

  const subtitle = customer
    ? L(`Oversikt over alle oppdrag utført for ${customer}`, `Overview of all operations for ${customer}`)
    : L('Oversikt over alle oppdrag i AQS-flåten', 'Overview of all operations in the AQS fleet');

  return (
    <div style={{ padding: '8px 36px 48px' }} data-screen-label="01 Oppdrag">
      <div className="page-head" style={{ padding: '24px 0 26px' }}>
        <div>
          <h2>{L('Oppdrag', 'Operations')}</h2>
          <p>{subtitle}</p>
        </div>
        {!customer && (
          <CustomerFilter options={customerOptions} selected={selectedCustomers} onChange={setSelectedCustomers}/>
        )}
      </div>

      <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }}>
        <StatCard label={L('Aktive oppdrag', 'Active operations')}    value={active.length}   color="var(--navy)"/>
        <StatCard label={L('Planlagte', 'Planned')}                   value={upcoming.length} color="var(--navy)"/>
        <StatCard label={L('Fullførte oppdrag', 'Completed operations')} value={done.length}  color="var(--navy)"/>
      </div>

      <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: '0 0 18px' }}>{L('Aktive oppdrag', 'Active operations')}</h3>
      {active.length
        ? <JobTable jobs={active} onOpenJob={onOpenJob} mobile={mobile}/>
        : <div className="empty-note">{L('Ingen aktive oppdrag akkurat nå.', 'No active operations right now.')}</div>}

      {upcoming.length > 0 && <>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: '0 0 18px' }}>{L('Planlagte oppdrag', 'Planned operations')}</h3>
        <JobTable jobs={upcoming} onOpenJob={onOpenJob} mobile={mobile}/>
      </>}

      <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', margin: '0 0 18px' }}>{L('Fullførte oppdrag', 'Completed operations')}</h3>
      {done.length
        ? <JobTable jobs={done} onOpenJob={onOpenJob} done mobile={mobile}/>
        : <div className="empty-note">{L('Ingen fullførte oppdrag ennå.', 'No completed operations yet.')}</div>}
    </div>
  );
}

window.OppdragOverviewScreen = OppdragOverviewScreen;
window.JOBS = JOBS;
