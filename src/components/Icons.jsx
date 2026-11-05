const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export const MenuIcon = () => (
  <svg {...base}>
    <path d="M3 7h18M3 12h18M3 17h13" />
  </svg>
);
export const SearchIcon = () => (
  <svg {...base}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 21 21" />
  </svg>
);
export const AccountIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.2-4 4.4-6 8-6s6.8 2 8 6" />
  </svg>
);
export const BagIcon = () => (
  <svg {...base}>
    <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8Z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </svg>
);
export const CloseIcon = () => (
  <svg {...base}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);
export const ArrowIcon = () => (
  <svg width="34" height="12" viewBox="0 0 34 12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
    <path d="M0 6h32M27 1l5 5-5 5" />
  </svg>
);
export const ChevronIcon = ({ dir = 'down' }) => (
  <svg {...base} width="16" height="16" style={{ transform: dir === 'up' ? 'rotate(180deg)' : dir === 'left' ? 'rotate(90deg)' : dir === 'right' ? 'rotate(-90deg)' : undefined }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const s = { ...base, width: 18, height: 18 };
export const SocialIcon = ({ id }) => {
  if (id === 'instagram')
    return (
      <svg {...s}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    );
  if (id === 'pinterest')
    return (
      <svg {...s}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10.5 20l1.6-7m0 0c-.6-1.8.2-4 2-4 1.6 0 2.2 1.2 2 2.6-.3 2-1.6 3.4-3 3.2-.9-.1-1.2-.8-1-1.8" />
      </svg>
    );
  if (id === 'tiktok')
    return (
      <svg {...s}>
        <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 3c.4 2.6 2.1 4.2 5 4.5" />
      </svg>
    );
  return (
    <svg {...s}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="m10 9.2 5 2.8-5 2.8Z" fill="currentColor" />
    </svg>
  );
};
