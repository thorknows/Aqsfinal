// Auth — login screen, role resolution, and a small media-query hook.
// Two demo roles, resolved from the email's local part:
//   aqs@epost.no    → AQS operations user (full access)
//   kunde@epost.no  → Customer user (only their own assigned oppdrag)

const USERS = {
  aqs: {
    role: 'aqs',
    email: 'aqs@epost.no',
    name: 'Operasjonssenter',
    display: 'AQS demo',
    customer: null,            // sees all oppdrag
  },
  kunde: {
    role: 'kunde',
    email: 'kunde@epost.no',
    name: 'Cermaq Norway AS',
    display: 'Cermaq Norway AS',
    customer: 'Cermaq Norway AS', // sees only this customer's oppdrag
  },
};

function resolveRole(email) {
  const e = (email || '').trim().toLowerCase();
  if (!e) return null;
  const local = e.split('@')[0];
  if (local === 'aqs' || local.startsWith('aqs')) return 'aqs';
  if (local === 'kunde' || local.startsWith('kunde')) return 'kunde';
  return null;
}

const AUTH_KEY = 'aqs.auth.user.v1';

function loadUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function saveUser(u) {
  try {
    if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    else localStorage.removeItem(AUTH_KEY);
  } catch (e) {}
}

// Small media-query hook (used to switch tables to stacked cards on mobile).
function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = React.useState(get);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    return () => mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
  }, [query]);
  return matches;
}

function LoginScreen({ onLogin, initialEmail, lang, onLang }) {
  const [email, setEmail] = React.useState(initialEmail || '');
  const [error, setError] = React.useState('');

  const submit = (e) => {
    e && e.preventDefault();
    const role = resolveRole(email);
    if (!role) {
      setError(L('Ukjent bruker. Bruk kunde@epost.no eller aqs@epost.no.', 'Unknown user. Use kunde@epost.no or aqs@epost.no.'));
      return;
    }
    setError('');
    onLogin(USERS[role]);
  };

  const quick = (role) => {
    setEmail(USERS[role].email);
    setError('');
    onLogin(USERS[role]);
  };

  return (
    <div className="login-split">
      <div className="login-panel">
        {onLang && (
          <div className="login-lang">
            <LangSwitch lang={lang} onLang={onLang} />
          </div>
        )}
        <div className="login-panel-inner">
          <div className="login-brand">
            <img src="assets/aqs-logo.png" alt="AQS" style={{ width: 96, height: 'auto', display: 'block' }}/>
            <div className="login-sub">{L('KONTROLL', 'CONTROL')}</div>
          </div>

          <form onSubmit={submit} className="login-form">
            <span className="login-label">{L('Logg inn med E-post', 'Sign in with email')}</span>
            <input
              className="login-input"
              type="email"
              inputMode="email"
              autoComplete="username"
              placeholder="Ola@norge.no"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              autoFocus
            />
            {error && <div className="login-error" role="alert">{error}</div>}
            <button type="submit" className="login-btn">{L('Logg inn', 'Sign in')}</button>

            <div className="login-demo">
              <span className="login-demo-head">{L('Demo — velg rolle', 'Demo — choose a role')}</span>
              <div className="login-demo-row">
                <button type="button" className="login-chip" onClick={() => quick('aqs')}>
                  <span className="login-chip-role"><I.users size={14}/> {L('AQS-bruker', 'AQS user')}</span>
                  <span className="login-chip-mail">aqs@epost.no</span>
                </button>
                <button type="button" className="login-chip" onClick={() => quick('kunde')}>
                  <span className="login-chip-role"><I.user size={14}/> {L('Kunde', 'Customer')}</span>
                  <span className="login-chip-mail">kunde@epost.no</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="login-panel-wave" aria-hidden="true">
          <img src="assets/login_bottom_gfx.svg" alt=""/>
        </div>
      </div>

      <div className="login-photo" role="img" aria-label={L('AQS servicefartøy', 'AQS service vessel')}/>
    </div>
  );
}

Object.assign(window, { USERS, resolveRole, loadUser, saveUser, useMediaQuery, LoginScreen });
