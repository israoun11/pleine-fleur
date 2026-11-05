import Overlay from './Overlay.jsx';
import { CloseIcon } from './Icons.jsx';
import { FEATURED } from '../data/products.js';
import { INFO_PAGES } from '../data/site.js';
import { href } from '../router.js';

export default function MenuPanel({ open, onClose }) {
  const main = [
    { label: 'The Collection', to: href.section('collection') },
    { label: 'The Art of Elegance', to: href.section('magazine') },
    { label: 'La Maison', to: href.section('maison') },
    { label: 'Rechercher', to: href.search },
    { label: 'Mon compte', to: href.account },
    { label: 'Panier', to: href.bag },
  ];
  return (
    <Overlay open={open} onClose={onClose} label="Menu" variant="left">
      <div className="menu">
        <div className="menu__head">
          <span className="wordmark wordmark--sm">Pleine Fleur</span>
          <button type="button" className="nav__icon" onClick={onClose} aria-label="Fermer le menu" data-autofocus>
            <CloseIcon />
          </button>
        </div>
        <nav className="menu__main" aria-label="Menu principal">
          {main.map((m) => (
            <a key={m.to} href={m.to} onClick={onClose}>
              {m.label}
            </a>
          ))}
        </nav>
        <p className="menu__h">Les sacs</p>
        <ul className="menu__bags">
          {FEATURED.map((p) => (
            <li key={p.id}>
              <a href={href.product(p.id)} onClick={onClose}>
                {p.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="menu__h">Service</p>
        <ul className="menu__small">
          {Object.entries(INFO_PAGES).map(([slug, pg]) => (
            <li key={slug}>
              <a href={href.info(slug)} onClick={onClose}>
                {pg.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Overlay>
  );
}
