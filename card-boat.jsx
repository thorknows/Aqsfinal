// Boat info card
function BoatCard() {
  const [open, setOpen] = React.useState(false);
  const [crew, setCrew] = React.useState(false);
  return (
    <section className="card col-4">
      <div className="card-head">
        <h3>{L('Båtinformasjon', 'Vessel information')}</h3>
        <I.info size={14} />
      </div>
      <div className="boat-top">
        <div className="boat-photo">
          <img src="assets/boat.webp" alt="AQS Rørvik" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
        </div>
        <div className="boat-meta">
          <div className="name">AQS Rørvik</div>
          <dl>
            <dt>IMO</dt><dd>123456789</dd>
            <dt>{L('Kallesignal', 'Call sign')}</dt><dd>LF1234</dd>
            <dt>MMSI</dt><dd>257123456</dd>
            <dt>{L('Byggeår', 'Year built')}</dt><dd>2018</dd>
            <dt>{L('Flagg', 'Flag')}</dt><dd>{L('Norge', 'Norway')}</dd>
            <dt>{L('Type', 'Type')}</dt><dd>{L('Servicefartøy', 'Service vessel')}</dd>
          </dl>
        </div>
      </div>
      <div className="boat-spec-grid">
        <div className="spec">
          <div className="label"><I.width size={12}/> {L('Lengde', 'Length')}</div>
          <div className="val">{fmtNum('24,9')}<span className="unit">m</span></div>
        </div>
        <div className="spec">
          <div className="label"><I.ruler size={12}/> {L('Bredde', 'Beam')}</div>
          <div className="val">{fmtNum('8,6')}<span className="unit">m</span></div>
        </div>
        <div className="spec">
          <div className="label"><I.depth size={12}/> {L('Dypg.', 'Draught')}</div>
          <div className="val">{fmtNum('3,2')}<span className="unit">m</span></div>
        </div>
        <div className="spec">
          <div className="label"><I.weight size={12}/> {L('Brutto', 'Gross')}</div>
          <div className="val">99<span className="unit">t</span></div>
        </div>
        <div className="spec">
          <div className="label"><I.scale size={12}/> {L('Netto', 'Net')}</div>
          <div className="val">49<span className="unit">t</span></div>
        </div>
        <div className="spec">
          <div className="label"><I.users size={12}/> {L('Kapasitet', 'Capacity')}</div>
          <div className="val">12<span className="unit">{L('pers', 'pax')}</span></div>
        </div>
      </div>
      <div className="boat-certs">
        <div className="boat-certs-head">{L('Sertifiseringer', 'Certifications')}</div>
        <div className="boat-certs-list">
          <span className="tag"><I.shield size={13}/> ISO 9001</span>
          <span className="tag"><I.shield size={13}/> ISO 14001</span>
          <span className="tag"><I.shield size={13}/> ISO 22000</span>
          <span className="tag"><I.award size={13}/> GLOBALG.A.P.</span>
        </div>
      </div>
      <div className="boat-actions">
        <button className="panel-btn" onClick={() => setOpen(true)}>
          <I.info size={16}/>
          <span>{L('Se fullstendig båtinformasjon', 'See full vessel information')}</span>
        </button>
        <button className="panel-btn" onClick={() => setCrew(true)}>
          <I.info size={16}/>
          <span>{L('Mannskap', 'Crew')}</span>
        </button>
      </div>
      {open && <BoatDetailsModal onClose={() => setOpen(false)} />}
      {crew && <CrewModal onClose={() => setCrew(false)} />}
    </section>
  );
}
window.BoatCard = BoatCard;
