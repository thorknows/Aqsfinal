// Generic modal + content for the three "Se detaljer / Se fullstendig" links.

function Modal({ title, subtitle, onClose, children }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="modal-head">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="modal-x" onClick={onClose} aria-label="Lukk">✕</button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function CrewModal({ onClose }) {
  const CREW = [
    {
      name: 'Lars Eide', initials: 'LE',
      role: ['Skipper', 'Captain'],
      certs: ['STCW II/2', 'Dekksoffiser klasse 3', 'ROC VHF', 'IMO 1.13 Krisehåndtering', 'Førstehjelp (DMC)', 'Sikkerhetskurs IMO 60'],
    },
    {
      name: 'Marius Sund', initials: 'MS',
      role: ['Styrmann', 'First mate'],
      certs: ['STCW II/1', 'Dekksoffiser klasse 4', 'GOC GMDSS', 'Hurtigbåtsertifikat', 'Sjøredning IMO 1.19'],
    },
    {
      name: 'Ola Nyborg', initials: 'ON',
      role: ['Maskinist', 'Engineer'],
      certs: ['STCW III/1', 'Maskinoffiser klasse 4', 'Varmt arbeid', 'ADV brannvern IMO 2.03', 'Kran G8 / G11'],
    },
    {
      name: 'Henrik Vik', initials: 'HV',
      role: ['ROV-pilot', 'ROV pilot'],
      certs: ['ROV Pilot Tech II', 'STCW Basic Safety', 'Førstehjelp', 'Truckførerbevis T4'],
    },
    {
      name: 'Stian Aune', initials: 'SA',
      role: ['Matros', 'Deckhand'],
      certs: ['STCW II/4', 'Sikkerhetskurs IMO 60', 'Fallsikring', 'Kran G5 stropp/anhuker'],
    },
    {
      name: 'Ingrid Moe', initials: 'IM',
      role: ['Lettmatros', 'Ordinary seaman'],
      certs: ['STCW Basic Safety', 'Førstehjelp (DMC)', 'HMS grunnkurs'],
    },
  ];

  return (
    <Modal
      title={L('Mannskap — AQS Rørvik', 'Crew — AQS Rørvik')}
      subtitle={L('6 om bord · sertifikater og gjennomførte kurs', '6 aboard · certificates and completed courses')}
      onClose={onClose}
    >
      <div className="crew-list">
        {CREW.map(c => (
          <div className="crew-card" key={c.name}>
            <div className="crew-avatar">{c.initials}</div>
            <div className="crew-info">
              <div className="crew-name-row">
                <span className="crew-name">{c.name}</span>
                <span className="crew-role">{L(c.role[0], c.role[1])}</span>
              </div>
              <div className="crew-creds">
                {c.certs.map(cert => (
                  <span className="crew-cred" key={cert}><I.check size={11}/> {tr(cert)}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function BoatDetailsModal({ onClose }) {
  return (
    <Modal title="AQS Odin — Fullstendig båtinformasjon" subtitle="IMO 123456789 · MMSI 257123456 · LF1234" onClose={onClose}>
      <div className="modal-grid two">
        <section className="modal-sect">
          <h4>Spesifikasjoner</h4>
          <dl className="modal-dl">
            <dt>Lengde over alt</dt><dd>24,9 m</dd>
            <dt>Bredde</dt><dd>8,6 m</dd>
            <dt>Dypgående</dt><dd>3,2 m</dd>
            <dt>Bruttotonnasje</dt><dd>99 t</dd>
            <dt>Nettotonnasje</dt><dd>49 t</dd>
            <dt>Kapasitet</dt><dd>12 personer</dd>
            <dt>Byggeår</dt><dd>2018</dd>
            <dt>Verft</dt><dd>Moen Marin AS</dd>
            <dt>Skipstype</dt><dd>Servicefartøy</dd>
            <dt>Flagg</dt><dd>Norge</dd>
          </dl>
        </section>
        <section className="modal-sect">
          <h4>Maskineri & utstyr</h4>
          <dl className="modal-dl">
            <dt>Hovedmotor</dt><dd>2 × 478 kW</dd>
            <dt>Generator</dt><dd>2 × 90 kVA</dd>
            <dt>Marsjfart</dt><dd>11 kn</dd>
            <dt>Toppfart</dt><dd>14,2 kn</dd>
            <dt>Drivstoff</dt><dd>Diesel · 18 000 L</dd>
            <dt>Kran</dt><dd>HMF 5020-K3 · 5 t</dd>
            <dt>Vinsj</dt><dd>10 t hydraulisk</dd>
            <dt>ROV-launch</dt><dd>Ja, akterdekk</dd>
          </dl>
        </section>
        <section className="modal-sect">
          <h4>Sertifikater</h4>
          <ul className="modal-list">
            <li><span>ISO 9001 — Kvalitetsledelse</span><em>gyldig til 2027-03</em></li>
            <li><span>ISO 14001 — Miljøledelse</span><em>gyldig til 2027-03</em></li>
            <li><span>ISO 22000 — Mattrygghet</span><em>gyldig til 2026-12</em></li>
            <li><span>GLOBALG.A.P.</span><em>gyldig til 2026-09</em></li>
            <li><span>Klassesertifikat (DNV)</span><em>gyldig til 2027-04</em></li>
            <li><span>Sikkerhetssertifikat</span><em>gyldig til 2026-11</em></li>
            <li><span>ISM-håndbok v4.2</span><em>godkjent</em></li>
            <li><span>Radiosertifikat</span><em>gyldig til 2027-08</em></li>
          </ul>
        </section>
        <section className="modal-sect">
          <h4>Forsikring & eierskap</h4>
          <dl className="modal-dl">
            <dt>Eier</dt><dd>AQS AS</dd>
            <dt>Forsikrer</dt><dd>Gard P&I</dd>
            <dt>Polise</dt><dd>NO-2026-00481</dd>
            <dt>Hjemmehavn</dt><dd>Trondheim</dd>
          </dl>
        </section>
      </div>
    </Modal>
  );
}

function EnergyDetailsModal({ onClose }) {
  return (
    <Modal title="Energiforbruk — AQS Odin" subtitle="Detaljert oversikt for siste 24 timer" onClose={onClose}>
      <div className="modal-kpi-row">
        <div className="modal-kpi"><span>Totalt forbruk</span><b>1 248 kWh</b></div>
        <div className="modal-kpi"><span>Per nautisk mil</span><b>15,2 kWh/nm</b></div>
        <div className="modal-kpi"><span>Snittlast</span><b>52 kW</b></div>
        <div className="modal-kpi"><span>Topplast</span><b>118 kW</b></div>
        <div className="modal-kpi"><span>CO₂ ekvivalent</span><b>312 kg</b></div>
        <div className="modal-kpi"><span>Estimert rekkevidde</span><b>320 nm</b></div>
      </div>
      <div className="modal-grid two">
        <section className="modal-sect">
          <h4>Fordeling per system</h4>
          <ul className="modal-bars">
            <li><span>Fremdrift</span><div className="bar"><div style={{ width: '64%' }}/></div><em>798 kWh · 64%</em></li>
            <li><span>Hotellforbruk</span><div className="bar"><div style={{ width: '14%' }}/></div><em>175 kWh · 14%</em></li>
            <li><span>Kran &amp; vinsj</span><div className="bar"><div style={{ width: '11%' }}/></div><em>137 kWh · 11%</em></li>
            <li><span>HVAC</span><div className="bar"><div style={{ width: '7%' }}/></div><em>87 kWh · 7%</em></li>
            <li><span>Annet</span><div className="bar"><div style={{ width: '4%' }}/></div><em>51 kWh · 4%</em></li>
          </ul>
        </section>
        <section className="modal-sect">
          <h4>Driftsmoduser</h4>
          <ul className="modal-list">
            <li><span>Transitt</span><em>6 t 12 min · 720 kWh</em></li>
            <li><span>Dynamisk posisjonering</span><em>3 t 40 min · 312 kWh</em></li>
            <li><span>Stand-by</span><em>2 t 04 min · 92 kWh</em></li>
            <li><span>Til kai</span><em>1 t 05 min · 24 kWh</em></li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}

function AisDetailsModal({ onClose }) {
  return (
    <Modal title="AIS-informasjon — AQS Odin" subtitle="Sanntidsdata fra AIS-mottaker" onClose={onClose}>
      <div className="modal-grid two">
        <section className="modal-sect">
          <h4>Identifikasjon</h4>
          <dl className="modal-dl">
            <dt>MMSI</dt><dd>257123456</dd>
            <dt>IMO</dt><dd>123456789</dd>
            <dt>Kallesignal</dt><dd>LF1234</dd>
            <dt>Skipsnavn</dt><dd>AQS Odin</dd>
            <dt>Fartøystype</dt><dd>Servicefartøy (52)</dd>
            <dt>Flagg</dt><dd>Norge</dd>
          </dl>
        </section>
        <section className="modal-sect">
          <h4>Reise</h4>
          <dl className="modal-dl">
            <dt>Avgang</dt><dd>Trondheim · 08:15</dd>
            <dt>Destinasjon</dt><dd>Lokasjon 12 · Frøya</dd>
            <dt>ETA</dt><dd>15. mai 14:30</dd>
            <dt>Navigasjonsstatus</dt><dd>Under way using engine</dd>
            <dt>Rapporteringsintervall</dt><dd>10 sek</dd>
            <dt>Kvalitet</dt><dd>God (HDOP 0,9)</dd>
          </dl>
        </section>
        <section className="modal-sect">
          <h4>Bevegelse</h4>
          <dl className="modal-dl">
            <dt>Posisjon</dt><dd>62°22.123 N · 06°11.456 E</dd>
            <dt>Fart over grunn (SOG)</dt><dd>12,4 kn</dd>
            <dt>Kurs over grunn (COG)</dt><dd>245°</dd>
            <dt>Sann kurs (HDG)</dt><dd>247°</dd>
            <dt>Svingrate</dt><dd>0,3°/s</dd>
            <dt>Dypgang</dt><dd>3,2 m</dd>
          </dl>
        </section>
        <section className="modal-sect">
          <h4>Nærliggende fartøy</h4>
          <ul className="modal-list">
            <li><span>MS Frøyhav</span><em>2,4 nm · 075°</em></li>
            <li><span>AQS Frøya</span><em>5,1 nm · 192°</em></li>
            <li><span>Hitra Express</span><em>7,8 nm · 304°</em></li>
            <li><span>Bjørnsund</span><em>9,2 nm · 018°</em></li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}

window.Modal = Modal;
window.BoatDetailsModal = BoatDetailsModal;
window.CrewModal = CrewModal;
window.EnergyDetailsModal = EnergyDetailsModal;
window.AisDetailsModal = AisDetailsModal;
