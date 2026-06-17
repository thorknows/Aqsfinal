// Lightweight inline icons. Stroke-based, neutral, original.
const Icon = ({ d, size = 18, fill = 'none', stroke = 'currentColor', sw = 1.6, children, vb = '0 0 24 24' }) => (
  <svg viewBox={vb} width={size} height={size} fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

const I = {
  grid: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></Icon>,
  briefcase: (p) => <Icon {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></Icon>,
  ship: (p) => <Icon {...p}><path d="M3 17c2 2 4 2 6 0s4-2 6 0 4 2 6 0"/><path d="M5 14V9l7-3 7 3v5"/><path d="M12 6V3"/></Icon>,
  doc: (p) => <Icon {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></Icon>,
  bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 4 2 5 2 7H4c0-2 2-3 2-7z"/><path d="M10 21a2 2 0 0 0 4 0"/></Icon>,
  folder: (p) => <Icon {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Icon>,
  cog: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a7.97 7.97 0 0 0 0-6l2-1.5-2-3.5-2.4 1a8 8 0 0 0-5.2-3l-.4-2.5h-3l-.4 2.5a8 8 0 0 0-5.2 3l-2.4-1-2 3.5L1 9a7.97 7.97 0 0 0 0 6l-2 1.5"/></Icon>,
  arrowLeft: (p) => <Icon {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></Icon>,
  arrowRight: (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  arrowDown: (p) => <Icon {...p}><path d="M12 5v14M6 13l6 6 6-6"/></Icon>,
  chevronDown: (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>,
  help: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .5-1.5 1-1.5 2"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></Icon>,
  info: (p) => <Icon {...p} sw={1.4}><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".6" fill="currentColor"/></Icon>,
  check: (p) => <Icon {...p}><path d="M5 12l5 5L20 7"/></Icon>,
  award: (p) => <Icon {...p}><circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5"/></Icon>,
  shield: (p) => <Icon {...p}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></Icon>,
  ruler: (p) => <Icon {...p}><rect x="2" y="9" width="20" height="6" rx="1.5"/><path d="M6 9v3M9 9v3M12 9v3M15 9v3M18 9v3"/></Icon>,
  width: (p) => <Icon {...p}><path d="M3 12h18M5 9l-2 3 2 3M19 9l2 3-2 3"/></Icon>,
  depth: (p) => <Icon {...p}><path d="M12 3v18M9 6l3-3 3 3M9 18l3 3 3-3"/></Icon>,
  weight: (p) => <Icon {...p}><path d="M6 7h12l-1 13H7z"/><path d="M9 7a3 3 0 0 1 6 0"/></Icon>,
  scale: (p) => <Icon {...p}><path d="M12 4v16M5 8h14M3 14l3-6 3 6M15 14l3-6 3 6"/></Icon>,
  users: (p) => <Icon {...p}><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M14 17a4.5 4.5 0 0 1 7 3"/></Icon>,
  cloud: (p) => <Icon {...p}><path d="M7 18a4 4 0 0 1-1-7.9A6 6 0 0 1 18 10a3.5 3.5 0 0 1 0 8z"/></Icon>,
  sensor: (p) => <Icon {...p}><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5"/></Icon>,
  pin: (p) => <Icon {...p}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></Icon>,
  status: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></Icon>,
  image: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-9 9"/></Icon>,
  calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Icon>,
  filter: (p) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></Icon>,
  search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></Icon>,
  chevLeft: (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>,
  user: (p) => <Icon {...p}><circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/></Icon>,
  sort: (p) => <Icon {...p} sw={1.8}><path d="M8 9l4-4 4 4M8 15l4 4 4-4"/></Icon>,
  logout: (p) => <Icon {...p}><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M9 12h11M16 8l4 4-4 4"/></Icon>,
  swap: (p) => <Icon {...p}><path d="M7 10H4l4-4 4 4H8M17 14h3l-4 4-4-4h4"/><path d="M8 6v8M16 10v8"/></Icon>,
  mail: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></Icon>,
  lock: (p) => <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></Icon>,
};

window.I = I;
