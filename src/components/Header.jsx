import { useBag } from '../context/BagContext.jsx';
import { BagIcon, MenuIcon, SearchIcon } from './Icons.jsx';

export const NAV = [
  { label: 'Collection', href: '#collection' },
  { label: 'The Serpent', href: '#serpent' },
  { label: 'Summer weaves', href: '#summer' },
];

export default function Header({ onSearch, onMenu }) {
  const bag = useBag();
  return (
    <>
      <header className="header">
        <div className="header__inner">
          <button type="button" className="icon-btn header__menu" onClick={onMenu} aria-label="Open menu">
            <MenuIcon />
          </button>

          <a href="#top" className="wordmark" aria-label="Pleine Fleur, back to top">
            Pleine Fleur
          </a>

          <nav className="header__nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="navlink">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="header__tools">
            <button type="button" className="icon-btn" onClick={onSearch} aria-label="Search the collection">
              <SearchIcon />
              <span className="icon-btn__label">Search</span>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => bag.setOpen(true)}
              aria-label={`Open your bag, ${bag.count} ${bag.count === 1 ? 'item' : 'items'}`}
            >
              <BagIcon />
              <span className="icon-btn__label">Bag</span>
              <span className={`bag-count ${bag.count ? 'has' : ''}`}>{bag.count}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
