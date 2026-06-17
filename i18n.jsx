// ── Lightweight i18n for the AQS dashboard ───────────────────────────
// window.LANG is the source of truth (set by <App> on every render from its
// state). L(no, en) picks a UI string; tr() translates repeated domain terms
// from the Norwegian canonical data; trDate()/fmtNum()/dec() localise formats.

(function () {
  const KEY = 'aqs_lang';
  let initial = 'no';
  try { initial = localStorage.getItem(KEY) || 'no'; } catch (e) {}
  window.LANG = initial;

  window.getLang = function () { return window.LANG; };
  window.persistLang = function (l) {
    window.LANG = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    try { document.documentElement.lang = l; } catch (e) {}
  };

  // UI string picker
  window.L = function (no, en) { return window.LANG === 'en' ? en : no; };

  // Domain dictionary (Norwegian canonical → English)
  const DICT = {
    // Job / operation types
    'Fortøyningsinspeksjon': 'Mooring inspection',
    'Notvask m/ notinspeksjon': 'Net cleaning w/ inspection',
    'Serviceoppdrag': 'Service operation',
    'Støttefartøy': 'Support vessel',
    'Slep': 'Towing',
    'ROV-inspeksjon': 'ROV inspection',
    'Subsea inspeksjon': 'Subsea inspection',
    'Notvask Lok. 12': 'Net wash Site 12',
    'Forflytning bur': 'Cage relocation',
    'Fortøyningsservice': 'Mooring service',
    // Fleet status
    'På oppdrag': 'On assignment',
    'Tilgjengelig': 'Available',
    'I havn': 'In port',
    'Vedlikehold': 'Maintenance',
    // Vessel class
    'Store fartøy': 'Large vessels',
    'Servicekatamaran': 'Service catamaran',
    'Dykker/hurtiggående': 'Diver / high-speed',
    // Boat type
    'Servicefartøy': 'Service vessel',
    // OP-logg events
    'ROV slutt': 'ROV end',
    'Fra lokalitet': 'From site',
    'Oppsummering av punkt': 'Point summary',
    'ROV start': 'ROV start',
    'Til lokalitet': 'To site',
    'Dag start': 'Day start',
    'Hendelse, info. kunde': 'Event, customer info',
    'Diesel fyll': 'Diesel refuelling',
    'Bilde lastet opp': 'Image uploaded',
    // OP-logg descriptions
    'Ferdig inspisert. Ingen avvik.': 'Inspection complete. No deviations.',
    'Fortøyningspunkt 4–6 OK': 'Mooring points 4–6 OK',
    'Inspeksjon fortøyning': 'Mooring inspection',
    'Fortøyningspunkt registrert': 'Mooring point registered',
    'Vaktbytte': 'Shift change',
    'Fakt. mottatt fra Bunker': 'Invoice received from Bunker',
    'Ferdig inspisert': 'Inspection complete',
    // Log status
    'Utført': 'Completed',
    'Registrert': 'Registered',
    // Operation phases
    'Transit mellom lok.': 'Transit between sites',
    'Transit fra lok.': 'Transit from site',
    'Transit til lok.': 'Transit to site',
    'Operasjon på lok.': 'Operation on site',
    'Havneoperasjoner': 'Port operations',
    'Transit, annet': 'Transit, other',
    // Progress steps
    'Planlegging': 'Planning',
    'Mobilisering': 'Mobilisation',
    'Transitt til lokalitet': 'Transit to site',
    'Utførelse': 'Execution',
    'Demobilisering': 'Demobilisation',
    // Statuses (OppdragScreen)
    'Pågår': 'In progress',
    'Planlagt': 'Planned',
    'Fullført': 'Completed',
    // People / org
    'Operasjonssenter': 'Operations centre',
    'Norge': 'Norway',
    // Energy range tabs
    'I dag': 'Today',
    '7 dager': '7 days',
    '30 dager': '30 days',
  };
  window.tr = function (s) {
    return (window.LANG === 'en' && DICT[s]) ? DICT[s] : s;
  };

  // Dates: translate Norwegian month + weekday + "Uke" tokens
  const MONTHS = { jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', mai: 'May', jun: 'Jun', jul: 'Jul', aug: 'Aug', sep: 'Sep', okt: 'Oct', nov: 'Nov', des: 'Dec' };
  const DAYS = { Man: 'Mon', Tir: 'Tue', Ons: 'Wed', Tor: 'Thu', Fre: 'Fri', Lør: 'Sat', Søn: 'Sun' };
  window.trDate = function (s) {
    if (window.LANG !== 'en') return s;
    let out = String(s).replace(/\b(jan|feb|mar|apr|mai|jun|jul|aug|sep|okt|nov|des)\b/gi,
      (m) => MONTHS[m.toLowerCase()] || m);
    out = out.replace(/\b(Man|Tir|Ons|Tor|Fre|Lør|Søn)\b/g, (m) => DAYS[m] || m);
    out = out.replace(/\bUke\b/g, 'Week');
    return out;
  };

  // Numbers: Norwegian (space thousands, comma decimal) → English on a BARE token
  window.fmtNum = function (s) {
    if (window.LANG !== 'en') return s;
    return String(s).replace(',', '§').replace(/ /g, ',').replace('§', '.');
  };
  // Format a numeric value to `d` decimals in the active locale
  window.dec = function (n, d) {
    if (d === undefined) d = 1;
    const f = Number(n).toFixed(d);
    return window.LANG === 'en' ? f : f.replace('.', ',');
  };
  // Group thousands for an integer in the active locale
  window.grp = function (n) {
    const s = Math.round(Number(n)).toLocaleString('en-US'); // 15,889
    return window.LANG === 'en' ? s : s.replace(/,/g, ' ');   // 15 889
  };
})();
