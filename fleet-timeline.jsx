// Fleet availability timeline (Gantt) + booking inquiry.
// Vessels as rows, days as columns. Booked operations render as bars;
// the empty space between them is free capacity a customer can click to
// request a booking (or an AQS user to plan a new operation).

const { useState, useMemo } = React;

const FT_MON_NO = { jan:0, feb:1, mar:2, apr:3, mai:4, jun:5, jul:6, aug:7, sep:8, okt:9, nov:10, des:11 };
const FT_ABBR_NO = ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'];
const FT_ABBR_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const FT_FULL_NO = ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'];
const FT_FULL_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const FT_DOW_NO = ['søn','man','tir','ons','tor','fre','lør'];
const FT_DOW_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const FT_TODAY = new Date(2026, 5, 16, 10, 15);
const FT_DAY = 86400000;

const BOOK_TYPES = ['Fortøyningsinspeksjon', 'Notvask m/ notinspeksjon', 'Serviceoppdrag', 'Støttefartøy', 'Slep', 'ROV-inspeksjon'];

const FT_ZOOMS = {
  week:     { days: 7,  dayW: 170, label: ['Uke', 'Week'] },
  twoweeks: { days: 14, dayW: 106, label: ['2 uker', '2 weeks'] },
  month:    { days: 28, dayW: 54,  label: ['Måned', 'Month'] },
};

const LABEL_W = 176;

function ftParse(s) {
  if (!s) return null;
  const m = String(s).match(/(\d+)\.\s*([a-zæøå]+)\s+(\d+):(\d+)/i);
  if (!m) return null;
  const mon = FT_MON_NO[m[2].toLowerCase()];
  if (mon == null) return null;
  return new Date(2026, mon, +m[1], +m[3], +m[4]);
}
function ftStartOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function ftStartOfWeek(d) { const x = ftStartOfDay(d); const w = (x.getDay() + 6) % 7; x.setDate(x.getDate() - w); return x; }
function ftAddDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function ftISO(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function ftFromISO(s) { const [y, m, dd] = s.split('-').map(Number); return new Date(y, m - 1, dd); }
function ftDM(d) {
  const ab = window.LANG === 'en' ? FT_ABBR_EN[d.getMonth()] : FT_ABBR_NO[d.getMonth()];
  return window.LANG === 'en' ? `${d.getDate()} ${ab}` : `${d.getDate()}. ${ab}`;
}
function ftMonthName(m) { return window.LANG === 'en' ? FT_FULL_EN[m] : FT_FULL_NO[m]; }
function ftDow(dow) { return window.LANG === 'en' ? FT_DOW_EN[dow] : FT_DOW_NO[dow]; }

function FleetTimeline({ user }) {
  const isCustomer = user && user.role === 'kunde';
  const ownCustomer = user && user.customer;

  const [zoom, setZoom] = useState('twoweeks');
  const [winStart, setWinStart] = useState(() => ftStartOfWeek(FT_TODAY));
  const [booking, setBooking] = useState(null);

  const Z = FT_ZOOMS[zoom];
  const days = Z.days, dayW = Z.dayW, totalW = days * dayW;
  const winEnd = ftAddDays(winStart, days);

  const vessels = window.FLEET || [];
  const jobs = window.JOBS || [];

  const dayList = useMemo(() => {
    const arr = [];
    for (let i = 0; i < days; i++) {
      const d = ftAddDays(winStart, i);
      const dow = d.getDay();
      arr.push({
        date: d, dow,
        weekend: dow === 0 || dow === 6,
        isToday: ftStartOfDay(d).getTime() === ftStartOfDay(FT_TODAY).getTime(),
      });
    }
    return arr;
  }, [winStart, days]);

  const monthGroups = useMemo(() => {
    const g = [];
    dayList.forEach(d => {
      const m = d.date.getMonth();
      const last = g[g.length - 1];
      if (last && last.m === m) last.count++;
      else g.push({ m, count: 1 });
    });
    return g;
  }, [dayList]);

  const xFor = (d) => ((d.getTime() - winStart.getTime()) / FT_DAY) * dayW;
  const todayX = xFor(FT_TODAY);
  const showToday = todayX >= 0 && todayX <= totalW;

  const parsedJobs = useMemo(() => jobs.map(j => ({ ...j, _s: ftParse(j.start), _e: ftParse(j.eta) })).filter(j => j._s && j._e), [jobs]);

  const openBooking = (vessel, gap) => {
    let start = ftStartOfDay(new Date(winStart.getTime() + (gap.l / dayW) * FT_DAY));
    if (start < ftStartOfDay(FT_TODAY)) start = ftStartOfDay(FT_TODAY);
    let end = ftStartOfDay(new Date(winStart.getTime() + (gap.r / dayW) * FT_DAY));
    // suggest a sensible default span (≤ 3 working days), still inside the gap
    const capped = ftAddDays(start, 3);
    if (end > capped) end = capped;
    if (end <= start) end = ftAddDays(start, 2);
    setBooking({ vessel, start, end });
  };

  const rangeLabel = `${ftDM(winStart)} – ${ftDM(ftAddDays(winStart, days - 1))} 2026`;

  return (
    <div className="gantt-wrap">
      {isCustomer && (
        <div className="gantt-hint">
          <span className="gantt-hint-ic"><I.calendar size={18} /></span>
          <div>
            <strong>{L('Finn ledig fartøy', 'Find an available vessel')}</strong>
            <span>{L('Klikk på et ledig felt i tidslinjen for å sende en uforpliktende booking­forespørsel.', 'Click an open slot in the timeline to send a no-obligation booking request.')}</span>
          </div>
        </div>
      )}

      <div className="gantt card">
        <div className="gantt-toolbar">
          <div className="gantt-nav">
            <button className="gantt-today-btn" onClick={() => setWinStart(ftStartOfWeek(FT_TODAY))}>{L('I dag', 'Today')}</button>
            <button className="gantt-step" onClick={() => setWinStart(ftAddDays(winStart, -days))} aria-label={L('Forrige', 'Previous')}><I.chevLeft size={16} /></button>
            <button className="gantt-step" onClick={() => setWinStart(ftAddDays(winStart, days))} aria-label={L('Neste', 'Next')}><I.chevLeft size={16} style={{ transform: 'rotate(180deg)' }} /></button>
            <span className="gantt-range">{rangeLabel}</span>
          </div>
          <div className="gantt-zoom">
            {Object.keys(FT_ZOOMS).map(k => (
              <button key={k} className={zoom === k ? 'active' : ''} onClick={() => setZoom(k)}>{L(FT_ZOOMS[k].label[0], FT_ZOOMS[k].label[1])}</button>
            ))}
          </div>
        </div>

        <div className="gantt-scroll">
          <div className="gantt-inner" style={{ width: LABEL_W + totalW }}>
            {/* header */}
            <div className="gantt-headrow">
              <div className="gantt-corner">{L('Fartøy', 'Vessel')}</div>
              <div className="gantt-headdays" style={{ width: totalW }}>
                <div className="gantt-months">
                  {monthGroups.map((g, i) => (
                    <div key={i} style={{ width: g.count * dayW }}>{ftMonthName(g.m)}</div>
                  ))}
                </div>
                <div className="gantt-daynums">
                  {dayList.map((d, i) => (
                    <div key={i} className={`gday${d.weekend ? ' weekend' : ''}${d.isToday ? ' today' : ''}`} style={{ width: dayW }}>
                      {dayW >= 90 && <span className="dow">{ftDow(d.dow)}</span>}
                      <span className="dn">{d.date.getDate()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* rows */}
            <div className="gantt-body">
              {vessels.map(v => (
                <GanttRow
                  key={v.name}
                  v={v}
                  jobs={parsedJobs}
                  dayList={dayList}
                  dayW={dayW}
                  totalW={totalW}
                  xFor={xFor}
                  todayX={todayX}
                  showToday={showToday}
                  isCustomer={isCustomer}
                  ownCustomer={ownCustomer}
                  onBook={openBooking}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="gantt-legend">
          {isCustomer ? (
            <>
              <span className="lg"><i className="sw own" />{L('Dine oppdrag', 'Your operations')}</span>
              <span className="lg"><i className="sw busy" />{L('Opptatt', 'Booked')}</span>
              <span className="lg"><i className="sw gap" />{L('Ledig — klikk for å booke', 'Available — click to book')}</span>
              <span className="lg"><i className="sw maint" />{L('Vedlikehold', 'Maintenance')}</span>
            </>
          ) : (
            <>
              <span className="lg"><i className="sw active" />{L('Aktivt oppdrag', 'Active operation')}</span>
              <span className="lg"><i className="sw planned" />{L('Planlagt', 'Planned')}</span>
              <span className="lg"><i className="sw gap" />{L('Ledig kapasitet', 'Available capacity')}</span>
              <span className="lg"><i className="sw maint" />{L('Vedlikehold', 'Maintenance')}</span>
            </>
          )}
        </div>
      </div>

      {booking && (
        <BookingModal
          booking={booking}
          isCustomer={isCustomer}
          user={user}
          onClose={() => setBooking(null)}
        />
      )}
    </div>
  );
}

function GanttRow({ v, jobs, dayList, dayW, totalW, xFor, todayX, showToday, isCustomer, ownCustomer, onBook }) {
  const maint = v.status === 'Vedlikehold';
  const vj = jobs.filter(j => j.vessel === v.name);

  const bars = vj.map(j => {
    let l = xFor(j._s), r = xFor(j._e);
    const clipL = l < 0, clipR = r > totalW;
    l = Math.max(0, Math.min(l, totalW));
    r = Math.max(0, Math.min(r, totalW));
    if (r - l <= 0.5) return null;
    return { j, l, w: r - l, clipL, clipR };
  }).filter(Boolean);

  // merged busy intervals → free gaps (future only, bookable)
  const gaps = [];
  if (!maint) {
    const merged = [];
    bars.map(b => ({ l: b.l, r: b.l + b.w })).sort((a, b) => a.l - b.l).forEach(b => {
      const last = merged[merged.length - 1];
      if (last && b.l <= last.r + 0.5) last.r = Math.max(last.r, b.r);
      else merged.push({ ...b });
    });
    let cur = Math.max(0, todayX);
    merged.forEach(m => {
      if (m.l > cur + 20) gaps.push({ l: cur, r: m.l });
      cur = Math.max(cur, m.r);
    });
    if (totalW > cur + 20) gaps.push({ l: cur, r: totalW });
  }

  const statusStyle = (window.STATUS_STYLE || {})[v.status];

  return (
    <div className="gantt-row">
      <div className="gantt-vlabel">
        <span className="vname">{v.name}</span>
        <span className="vclass">{tr(v.class)}</span>
      </div>
      <div className="gantt-track" style={{ width: totalW }}>
        <div className="gantt-gridlines">
          {dayList.map((d, i) => (
            <div key={i} className={`gcell${d.weekend ? ' weekend' : ''}`} style={{ width: dayW }} />
          ))}
        </div>

        {maint && (
          <div className="gmaint" style={{ left: 0, width: totalW }}>
            <span>{L('Vedlikehold', 'Maintenance')}</span>
          </div>
        )}

        {!maint && gaps.map((g, i) => (
          <button
            key={'g' + i}
            className="ggap"
            style={{ left: g.l, width: g.r - g.l }}
            onClick={() => onBook(v, g)}
            title={L('Ledig — klikk for å sende booking­forespørsel', 'Available — click to send a booking request')}
          >
            <span className="ggap-label">
              <span className="ggap-plus">+</span>
              {(g.r - g.l) >= 78 && (isCustomer ? L('Be om booking', 'Request booking') : L('Ledig', 'Available'))}
            </span>
          </button>
        ))}

        {showToday && <div className="gantt-today" style={{ left: todayX }} />}

        {bars.map(b => {
          const j = b.j;
          const own = ownCustomer && j.customer === ownCustomer;
          let variant;
          if (j.status === 'done') variant = 'done';
          else if (isCustomer) variant = own ? 'own' : 'busy';
          else variant = j.status === 'upcoming' ? 'planned' : 'active';

          let label;
          if (variant === 'busy') label = L('Opptatt', 'Booked');
          else if (isCustomer) label = `${tr(j.type)} · ${j.loc}`;
          else label = `${j.customer} · ${tr(j.type)}`;

          const title = variant === 'busy'
            ? L('Opptatt', 'Booked')
            : `${j.id} · ${j.customer}\n${tr(j.type)} · ${j.loc}\n${trDate(j.start)} → ${trDate(j.eta)}`;

          return (
            <div key={j.id} className={`gbar ${variant}`} style={{ left: b.l, width: b.w }} title={title}>
              {b.clipL && <span className="gbar-clip">‹</span>}
              <span className="gbar-label">{label}</span>
              {b.clipR && <span className="gbar-clip">›</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BookingModal({ booking, isCustomer, user, onClose }) {
  const v = booking.vessel;
  const [form, setForm] = useState({
    from: ftISO(booking.start),
    to: ftISO(booking.end),
    type: BOOK_TYPES[2],
    loc: '',
    notes: '',
    contact: (user && user.email) || '',
  });
  const [sent, setSent] = useState(false);
  const set = (k, val) => setForm(f => ({ ...f, [k]: val }));

  const title = isCustomer ? L('Forespør booking', 'Request booking') : L('Planlegg oppdrag', 'Plan operation');
  const subtitle = isCustomer
    ? L('Send en uforpliktende forespørsel til AQS', 'Send a no-obligation request to AQS')
    : L('Reserver fartøyet for et nytt oppdrag', 'Reserve the vessel for a new operation');

  const submit = (e) => { e.preventDefault(); setSent(true); };

  const periodStr = `${ftDM(ftFromISO(form.from))} – ${ftDM(ftFromISO(form.to))}`;

  return (
    <Modal title={sent ? L('Forespørsel sendt', 'Request sent') : title} subtitle={sent ? null : subtitle} onClose={onClose}>
      {sent ? (
        <div className="bk-success">
          <span className="ico"><I.check size={34} /></span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>
              {isCustomer
                ? L('Takk! Forespørselen er sendt.', 'Thank you! Your request has been sent.')
                : L('Oppdraget er foreløpig reservert.', 'The operation has been provisionally reserved.')}
            </div>
            <p style={{ color: 'var(--text-2)', margin: '8px 0 0', maxWidth: 420 }}>
              {isCustomer
                ? L('AQS tar kontakt for å bekrefte tilgjengelighet og pris.', 'AQS will get in touch to confirm availability and price.')
                : L('Reservasjonen vises i Oppdragsplanleggeren som planlagt.', 'The reservation now appears in the mission planner as planned.')}
            </p>
          </div>
          <div className="bk-summary">
            <div><span className="k">{L('Fartøy', 'Vessel')}</span><span>{v.name}</span></div>
            <div><span className="k">{L('Periode', 'Period')}</span><span>{periodStr}</span></div>
            <div><span className="k">{L('Oppdragstype', 'Operation type')}</span><span>{tr(form.type)}</span></div>
            {form.loc && <div><span className="k">{L('Lokalitet', 'Site')}</span><span>{form.loc}</span></div>}
          </div>
          <button className="bk-submit" onClick={onClose}>{L('Lukk', 'Close')}</button>
        </div>
      ) : (
        <form className="bk-form" onSubmit={submit}>
          <div className="bk-vessel">
            <span className="bk-vessel-ic"><I.ship size={22} /></span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>{v.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{tr(v.class)} · {v.loc}</div>
            </div>
            <span className="bk-vessel-tag">{L('Ledig', 'Available')}</span>
          </div>

          <div className="bk-grid">
            <div className="bk-field">
              <label>{L('Fra dato', 'From date')}</label>
              <input type="date" value={form.from} onChange={e => set('from', e.target.value)} required />
            </div>
            <div className="bk-field">
              <label>{L('Til dato', 'To date')}</label>
              <input type="date" value={form.to} min={form.from} onChange={e => set('to', e.target.value)} required />
            </div>
          </div>

          <div className="bk-grid">
            <div className="bk-field">
              <label>{L('Oppdragstype', 'Operation type')}</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}>
                {BOOK_TYPES.map(t => <option key={t} value={t}>{tr(t)}</option>)}
              </select>
            </div>
            <div className="bk-field">
              <label>{L('Lokalitet', 'Site')}</label>
              <input type="text" value={form.loc} placeholder={L('f.eks. Marøya', 'e.g. Marøya')} onChange={e => set('loc', e.target.value)} />
            </div>
          </div>

          <div className="bk-field">
            <label>{L('Kontakt-e-post', 'Contact email')}</label>
            <input type="email" value={form.contact} onChange={e => set('contact', e.target.value)} required />
          </div>

          <div className="bk-field">
            <label>{L('Merknad', 'Notes')}</label>
            <textarea value={form.notes} placeholder={L('Beskriv oppdraget kort …', 'Briefly describe the operation …')} onChange={e => set('notes', e.target.value)} />
          </div>

          <div className="bk-actions">
            <button type="button" className="bk-cancel" onClick={onClose}>{L('Avbryt', 'Cancel')}</button>
            <button type="submit" className="bk-submit">{isCustomer ? L('Send forespørsel', 'Send request') : L('Reserver', 'Reserve')}</button>
          </div>
        </form>
      )}
    </Modal>
  );
}

Object.assign(window, { FleetTimeline, GanttRow, BookingModal });
