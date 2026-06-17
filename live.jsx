// Live data simulator — shared across cards via context-like global hook.
// OP-logg actions (Handling) carry a status: 'Utført' or 'Registrert'.

const INITIAL_LOG = [
  { id: 1, time: '13:41', event: 'ROV slutt',            desc: 'Ferdig inspisert. Ingen avvik.', user: 'Per H.',  status: 'Utført' },
  { id: 2, time: '13:18', event: 'Fra lokalitet',        desc: 'ULØYBUKT',                        user: 'Per H.',  status: 'Utført' },
  { id: 3, time: '12:46', event: 'Oppsummering av punkt', desc: 'Fortøyningspunkt 4–6 OK',         user: 'Lars M.', status: 'Registrert' },
  { id: 4, time: '11:30', event: 'ROV start',            desc: 'Inspeksjon fortøyning',           user: 'Per H.',  status: 'Utført' },
  { id: 5, time: '09:15', event: 'Til lokalitet',        desc: 'ULØYBUKT',                        user: 'Ola N.',  status: 'Utført' },
  { id: 6, time: '07:30', event: 'Dag start',            desc: '',                                user: 'Ola N.',  status: 'Utført' },
];

const POOL_EVENTS = [
  { event: 'Oppsummering av punkt', desc: 'Fortøyningspunkt registrert', user: 'Lars M.', status: 'Registrert' },
  { event: 'Hendelse, info. kunde', desc: 'Vaktbytte',                   user: 'Ola N.',  status: 'Utført' },
  { event: 'Diesel fyll',           desc: 'Fakt. mottatt fra Bunker',    user: 'Ola N.',  status: 'Registrert' },
  { event: 'ROV start',             desc: 'Inspeksjon fortøyning',       user: 'Per H.',  status: 'Utført' },
  { event: 'ROV slutt',             desc: 'Ferdig inspisert',            user: 'Per H.',  status: 'Utført' },
  { event: 'Bilde lastet opp',      desc: 'Marfle / Seaqloud',           user: 'System',  status: 'Registrert' },
];

const LiveContext = React.createContext(null);

function pad(n) { return String(n).padStart(2, '0'); }

function LiveProvider({ children }) {
  const [tick, setTick] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [state, setState] = React.useState(() => {
    const now = new Date();
    return {
      lat: 70.0339,
      lon: 20.9560,
      speed: 0.0,
      course: 312,
      progress: 65,
      fuelRate: 11.9,            // l/h (Marfle live)
      portRpm: 700, stbdRpm: 701,
      portCoolant: 56, stbdCoolant: 64,
      portLoad: 32, stbdLoad: 9,
      logRows: INITIAL_LOG,
      lastSync: now,
      lastImage: new Date(now.getTime() - 5*60*1000),
    };
  });

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setState(prev => {
        // Vessel is on station at Uløybukt — small drift around 0 kn.
        const speed = Math.max(0, Math.min(2.5, prev.speed + (Math.random() - 0.45) * 0.4));
        const course = (prev.course + Math.round((Math.random() - 0.5) * 4) + 360) % 360;
        const courseRad = (course * Math.PI) / 180;
        const dt = 4 / 3600; // hours
        const dist = (speed * dt) / 60; // approx degrees
        const lat = +(prev.lat + Math.cos(courseRad) * dist).toFixed(4);
        const lon = +(prev.lon + Math.sin(courseRad) * dist * 1.6).toFixed(4);
        const progress = Math.min(99, +(prev.progress + Math.random() * 0.2).toFixed(1));
        // Engine telemetry drift (Port/Starboard)
        const jit = (v, lo, hi, amp) => Math.max(lo, Math.min(hi, Math.round(v + (Math.random() - 0.5) * amp)));
        const portRpm = jit(prev.portRpm, 680, 740, 8);
        const stbdRpm = jit(prev.stbdRpm, 680, 740, 8);
        const portLoad = jit(prev.portLoad, 8, 45, 4);
        const stbdLoad = jit(prev.stbdLoad, 5, 40, 4);
        const portCoolant = jit(prev.portCoolant, 52, 70, 2);
        const stbdCoolant = jit(prev.stbdCoolant, 56, 74, 2);
        const fuelRate = +Math.max(8, Math.min(16, prev.fuelRate + (Math.random() - 0.5) * 0.8)).toFixed(1);
        return { ...prev, speed, course, lat, lon, progress, portRpm, stbdRpm, portLoad, stbdLoad, portCoolant, stbdCoolant, fuelRate, lastSync: new Date() };
      });
      setTick(t => t + 1);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  // Add a new log row every ~18s
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setState(prev => {
        const now = new Date();
        const ev = POOL_EVENTS[Math.floor(Math.random() * POOL_EVENTS.length)];
        const newRow = { id: now.getTime(), time: `${pad(now.getHours())}:${pad(now.getMinutes())}`, ...ev };
        return { ...prev, logRows: [newRow, ...prev.logRows].slice(0, 10), lastImage: now };
      });
    }, 18000);
    return () => clearInterval(id);
  }, [paused]);

  const now = state.lastSync;
  const value = {
    ...state,
    paused,
    togglePause: () => setPaused(p => !p),
    timeStr: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    tsImage: `${pad(state.lastImage.getHours())}:${pad(state.lastImage.getMinutes())}`,
  };
  return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>;
}

// Accessible live-status pill that doubles as a pause/resume control (WCAG 2.2.2).
function LivePill() {
  const live = useLive();
  if (!live) return null;
  const { paused, togglePause, timeStr } = live;
  return (
    <button
      type="button"
      className={`live-pill${paused ? ' paused' : ''}`}
      onClick={togglePause}
      aria-pressed={paused}
      title={paused ? 'Gjenoppta sanntidsoppdatering' : 'Sett sanntidsoppdatering på pause'}
    >
      <span className="pulse" aria-hidden="true"></span>
      {paused
        ? <span>Pauset · trykk for å gjenoppta</span>
        : <span>Live · sist oppdatert {timeStr.slice(0,5)}</span>}
      <span className="live-ctrl" aria-hidden="true">{paused ? '▶' : 'II'}</span>
    </button>
  );
}

function useLive() {
  return React.useContext(LiveContext);
}

window.LiveProvider = LiveProvider;
window.LivePill = LivePill;
window.useLive = useLive;
