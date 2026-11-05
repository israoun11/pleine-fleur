import { useBag } from '../context/BagContext.jsx';
import { href } from '../router.js';
import { AccountIcon, BagIcon, MenuIcon, SearchIcon } from './Icons.jsx';

// Minimal transparent navigation: menu and search on the left, wordmark in
// the centre, account and bag on the right. It sits over the page (never a
// solid bar) and scrolls away with it. `light` = white over the hero photo.
export default function Nav({ light, onMenu }) {
  const bag = useBag();
  return (
    <header className={`nav ${light ? 'nav--light' : ''}`}>
      <div className="nav__side">
        <button type="button" className="nav__icon" onClick={onMenu} aria-label="Ouvrir le menu">
          <MenuIcon />
        </button>
        <a href={href.search} className="nav__icon" aria-label="Rechercher">
          <SearchIcon />
        </a>
      </div>
      <a href={href.home} className="wordmark nav__mark" aria-label="Pleine Fleur, accueil">
        Pleine Fleur
      </a>
      <div className="nav__side nav__side--end">
        <a href={href.account} className="nav__icon" aria-label="Mon compte">
          <AccountIcon />
        </a>
        <a href={href.bag} className="nav__icon nav__bag" aria-label={`Panier, ${bag.count} article${bag.count > 1 ? 's' : ''}`}>
          <BagIcon />
          {bag.count > 0 && <span className="nav__count">{bag.count}</span>}
        </a>
      </div>
    </header>
  );
}
