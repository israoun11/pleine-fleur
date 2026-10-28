const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export const SearchIcon = () => (
  <svg {...base}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 21 21" />
  </svg>
);

export const BagIcon = () => (
  <svg {...base}>
    <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8Z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </svg>
);

export const MenuIcon = () => (
  <svg {...base}>
    <path d="M3 7h18M3 12h18M3 17h12" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...base}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const ChevronIcon = ({ dir = 'right' }) => (
  <svg {...base} style={{ transform: dir === 'left' ? 'scaleX(-1)' : undefined }}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);
