// Sidebar + Topbar chrome.

const NAV_ALL = [
  { id: 'oversikt', label: 'Oppdrag', en: 'Operations', icon: 'grid' },
  { id: 'flate', label: 'Flåte', en: 'Fleet', icon: 'ship' },
  { id: 'rapporter', label: 'Rapporter', en: 'Reports', icon: 'doc' },
  { id: 'varsler', label: 'Varsler', en: 'Alerts', icon: 'bell', badge: 3 },
];

// Customer can see their assigned oppdrag and the fleet timeline (to book vessels).
const NAV_KUNDE = [
  { id: 'oversikt', label: 'Oppdrag', en: 'Operations', icon: 'grid' },
  { id: 'flate', label: 'Book fartøy', en: 'Book vessel', icon: 'ship' },
];

function navForRole(role) {
  return role === 'kunde' ? NAV_KUNDE : NAV_ALL;
}

function Sidebar({ active, onNavigate, collapsed, onToggleCollapse, navItems }) {
  const items = navItems || NAV_ALL;
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="assets/logo-aqs.png" alt="AQS" style={{ width: 90, height: 'auto' }}/>
        {!collapsed && <div className="sub">{L('Kontroll', 'Control')}</div>}
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(item => {
          const Ic = I[item.icon];
          return (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon"><Ic size={20}/></span>
              <span className="label">{L(item.label, item.en)}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div className="sidebar-wave" aria-hidden="true">
        <img src="assets/sidebar_gfx.svg" alt=""/>
      </div>
      <div className="sidebar-footer">
        <button className="collapse-btn" onClick={onToggleCollapse}>
          <I.chevLeft size={14} style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }} />
          {!collapsed && <span>{L('Kollaps meny', 'Collapse menu')}</span>}
        </button>
      </div>
    </aside>
  );
}

function UserMenu({ user, onSwitchUser, onLogout }) {
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

  const roleLabel = user.role === 'kunde' ? L('Kunde', 'Customer') : L('AQS-bruker', 'AQS user');

  return (
    <div className="usermenu" ref={ref}>
      <button className="demo-btn" onClick={() => setOpen(o => !o)} aria-haspopup="true" aria-expanded={open}>
        <span className="pic"><I.user size={16}/></span>
        <span className="demo-name">{user.display}</span>
        <I.chevronDown size={14} className="chev" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 140ms ease' }}/>
      </button>
      {open && (
        <div className="usermenu-pop" role="menu">
          <div className="usermenu-id">
            <div className="usermenu-avatar">{user.role === 'kunde' ? <I.user size={18}/> : <I.users size={18}/>}</div>
            <div style={{ minWidth: 0 }}>
              <div className="usermenu-name">{tr(user.name)}</div>
              <div className="usermenu-mail">{user.email}</div>
            </div>
          </div>
          <div className="usermenu-role"><span className="usermenu-role-dot"/>{roleLabel}</div>
          <div className="usermenu-sep"/>
          <button className="usermenu-item" role="menuitem" onClick={() => { setOpen(false); onSwitchUser(); }}>
            <I.swap size={17}/><span>{L('Bytt bruker', 'Switch user')}</span>
          </button>
          <button className="usermenu-item" role="menuitem" onClick={() => { setOpen(false); onLogout(); }}>
            <I.logout size={17}/><span>{L('Logg ut', 'Log out')}</span>
          </button>
        </div>
      )}
    </div>
  );
}

const LANGS = [
  { code: 'no', flag: '🇳🇴', label: 'Norsk' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
];

function LangSwitch({ lang, onLang }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const current = LANGS.find(l => l.code === lang) || LANGS[0];

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onEsc); };
  }, [open]);

  return (
    <div className="lang-drop" ref={ref}>
      <button
        type="button"
        className="lang-drop-btn"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={L('Velg språk', 'Select language')}
      >
        <span className="lang-flag">{current.flag}</span>
        <span className="lang-code">{current.code.toUpperCase()}</span>
        <I.chevronDown size={12} style={{ color: 'var(--text-3)', transition: 'transform 140ms ease', transform: open ? 'rotate(180deg)' : 'none' }}/>
      </button>
      {open && (
        <div className="lang-drop-pop" role="listbox" aria-label={L('Språk', 'Language')}>
          {LANGS.map(l => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === lang}
              className={`lang-drop-item ${l.code === lang ? 'active' : ''}`}
              onClick={() => { onLang(l.code); setOpen(false); }}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-drop-label">{l.label}</span>
              {l.code === lang && <I.check size={13} style={{ marginLeft: 'auto', color: 'var(--primary-text)' }}/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Topbar({ title, onBack, user, onSwitchUser, onLogout, lang, onLang }) {
  return (
    <header className="topbar">
      <div className="crumb">
        {onBack && (
          <button className="back" onClick={onBack} aria-label={L('Tilbake til', 'Back to') + ' ' + title}>
            <I.arrowLeft size={20}/>
            <span>{title}</span>
          </button>
        )}
      </div>
      <div className="spacer" />
      {onLang && <LangSwitch lang={lang} onLang={onLang} />}
      {user && <UserMenu user={user} onSwitchUser={onSwitchUser} onLogout={onLogout}/>}
    </header>
  );
}

Object.assign(window, { Sidebar, Topbar, UserMenu, LangSwitch, navForRole });
