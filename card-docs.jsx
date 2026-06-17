// Documentation pane — certifications, documents and checklists for the vessel/operation.
// Reuses the fuel-consumption tab design (.tab-row / .tab-btn).

// Reference "today" used across the dashboard demo
const DOC_TODAY = new Date(2026, 5, 16);

const DOC_CERTS = [
  { name: 'ISO 9001:2015',         desc: ['Kvalitetsledelse', 'Quality management'],     by: 'DNV',          valid: '2027-03-14', icon: 'shield' },
  { name: 'ISO 14001:2015',        desc: ['Miljøledelse', 'Environmental management'],   by: 'DNV',          valid: '2027-03-14', icon: 'shield' },
  { name: 'ISO 22000:2018',        desc: ['Mattrygghet', 'Food safety'],                 by: 'DNV',          valid: '2026-12-01', icon: 'shield' },
  { name: 'GLOBALG.A.P.',          desc: ['Akvakultur', 'Aquaculture'],                  by: 'SGS',          valid: '2026-09-20', icon: 'award' },
  { name: 'Klassesertifikat',      desc: ['Fartøysklasse', 'Vessel class'],              by: 'DNV',          valid: '2027-04-30', icon: 'ship' },
  { name: 'Sikkerhetssertifikat',  desc: ['Fartøy', 'Vessel safety'],                    by: 'Sjøfartsdir.', valid: '2026-11-15', icon: 'shield' },
  { name: 'ISM-sertifikat (SMC)',  desc: ['Sikkerhetsstyring', 'Safety management'],     by: 'DNV',          valid: '2027-02-10', icon: 'doc' },
  { name: 'Radiosertifikat',       desc: ['GMDSS', 'GMDSS'],                              by: 'Telenor',      valid: '2027-08-01', icon: 'sensor' },
];

const DOC_FILES = [
  { name: ['SJA – Fortøyningsinspeksjon', 'JSA – Mooring inspection'], type: 'PDF', date: '12.06.2026', size: '240 kB' },
  { name: ['Arbeidsordre AQS-2026-0481', 'Work order AQS-2026-0481'],  type: 'PDF', date: '09.06.2026', size: '88 kB' },
  { name: ['Risikovurdering ROV-operasjon', 'Risk assessment ROV op.'], type: 'PDF', date: '08.06.2026', size: '1,2 MB' },
  { name: ['Fartøysmanual AQS Rørvik', 'Vessel manual AQS Rørvik'],    type: 'PDF', date: '03.2024',     size: '6,4 MB' },
  { name: ['Forsikringsbevis Gard P&I', 'Insurance certificate Gard P&I'], type: 'PDF', date: '01.2026', size: '320 kB' },
  { name: ['Inspeksjonsrapport – uke 23', 'Inspection report – week 23'], type: 'PDF', date: '11.06.2026', size: '2,1 MB' },
  { name: ['Fotodokumentasjon – Marøya', 'Photo documentation – Marøya'], type: 'ZIP', date: '12.06.2026', size: '18 MB' },
];

const DOC_LISTS = [
  {
    name: ['Pre-operasjon', 'Pre-operation'], done: 8, total: 8,
    items: [
      [['Værvindu kontrollert', 'Weather window checked'], true],
      [['SJA gjennomgått med mannskap', 'JSA reviewed with crew'], true],
      [['Fortøyning og dekk klart', 'Mooring and deck ready'], true],
      [['Kommunikasjon testet', 'Communication tested'], true],
    ],
  },
  {
    name: ['HMS / sikkerhet om bord', 'HSE / safety on board'], done: 6, total: 7,
    items: [
      [['Redningsvester kontrollert', 'Life vests checked'], true],
      [['Førstehjelpsutstyr verifisert', 'First-aid equipment verified'], true],
      [['Brannslukkere inspisert', 'Fire extinguishers inspected'], true],
      [['Mann-over-bord-drill loggført', 'Man-overboard drill logged'], false],
    ],
  },
  {
    name: ['ROV-klargjøring', 'ROV preparation'], done: 5, total: 5,
    items: [
      [['Thrustere testet', 'Thrusters tested'], true],
      [['Kamera og lys OK', 'Camera and lights OK'], true],
      [['Umbilical inspisert', 'Umbilical inspected'], true],
    ],
  },
  {
    name: ['Demobilisering', 'Demobilisation'], done: 0, total: 6,
    items: [
      [['Utstyr sikret', 'Equipment secured'], false],
      [['Dekk ryddet', 'Deck cleared'], false],
      [['Sluttrapport sendt', 'Final report submitted'], false],
    ],
  },
];

function certStatus(validISO) {
  const d = new Date(validISO);
  const months = (d - DOC_TODAY) / (1000 * 60 * 60 * 24 * 30.4);
  if (months < 0) return { cls: 'tag-bad', label: ['Utløpt', 'Expired'] };
  if (months <= 4) return { cls: 'tag-warn', label: ['Utløper snart', 'Expiring soon'] };
  return { cls: '', label: ['Gyldig', 'Valid'] };
}

function fmtValid(validISO) {
  const [y, m] = validISO.split('-');
  return `${m}.${y}`;
}

function DocCerts() {
  return (
    <div className="doc-grid three">
      {DOC_CERTS.map(c => {
        const st = certStatus(c.valid);
        const Ic = I[c.icon] || I.shield;
        return (
          <div className="doc-cert" key={c.name}>
            <span className="doc-cert-ic"><Ic size={18}/></span>
            <div className="doc-cert-body">
              <div className="doc-cert-name">{c.name}</div>
              <div className="doc-cert-desc">{L(c.desc[0], c.desc[1])} · {c.by}</div>
            </div>
            <div className="doc-cert-meta">
              <span className={`tag ${st.cls}`}>{L(st.label[0], st.label[1])}</span>
              <span className="doc-cert-valid">{fmtValid(c.valid)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DocFiles() {
  return (
    <div className="doc-files">
      {DOC_FILES.map(f => (
        <div className="doc-file" key={f.name[0]}>
          <span className={`doc-file-ic ${f.type === 'ZIP' ? 'zip' : 'pdf'}`}>{f.type}</span>
          <div className="doc-file-body">
            <div className="doc-file-name">{L(f.name[0], f.name[1])}</div>
            <div className="doc-file-meta">{f.date} · {f.size}</div>
          </div>
          <button className="doc-file-dl" type="button" aria-label={L('Last ned', 'Download')}>
            <I.arrowRight size={15} style={{ transform: 'rotate(90deg)' }}/>
          </button>
        </div>
      ))}
    </div>
  );
}

function DocChecklists() {
  return (
    <div className="doc-grid two">
      {DOC_LISTS.map(list => {
        const pct = Math.round((list.done / list.total) * 100);
        const complete = list.done === list.total;
        const notStarted = list.done === 0;
        return (
          <div className="doc-check" key={list.name[0]}>
            <div className="doc-check-head">
              <span className="doc-check-name">{L(list.name[0], list.name[1])}</span>
              <span className={`tag ${complete ? '' : notStarted ? 'tag-muted' : 'tag-warn'}`}>
                {list.done}/{list.total}
              </span>
            </div>
            <div className="doc-check-bar">
              <div className="fill" style={{ width: `${pct}%`, background: complete ? 'var(--green-bright)' : notStarted ? 'var(--text-3)' : 'var(--blue)' }}/>
            </div>
            <ul className="doc-check-items">
              {list.items.map(([txt, ok]) => (
                <li key={txt[0]} className={ok ? 'ok' : ''}>
                  <span className="ck">{ok ? <I.check size={12}/> : null}</span>
                  {L(txt[0], txt[1])}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function DocumentationCard() {
  const TABS = [
    { id: 'certs', label: ['Sertifikater', 'Certifications'] },
    { id: 'docs',  label: ['Dokumenter', 'Documents'] },
    { id: 'lists', label: ['Sjekklister', 'Checklists'] },
  ];
  const [tab, setTab] = React.useState('certs');

  return (
    <section className="card col-12">
      <div className="card-head">
        <h3>{L('Dokumentasjon', 'Documentation')}</h3>
        <div className="grow" />
        <span className="doc-sub">AQS Rørvik</span>
      </div>
      <div className="doc-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`doc-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {L(t.label[0], t.label[1])}
          </button>
        ))}
      </div>
      <div className="doc-pane">
        {tab === 'certs' && <DocCerts/>}
        {tab === 'docs'  && <DocFiles/>}
        {tab === 'lists' && <DocChecklists/>}
      </div>
    </section>
  );
}

window.DocumentationCard = DocumentationCard;
