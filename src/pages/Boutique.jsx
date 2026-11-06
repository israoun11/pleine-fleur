import { useLayoutEffect, useRef, useState } from 'react';
import { SHOP_CATEGORIES, coverOf, findCategory, formatPrice } from '../data/products.js';
import { href, replace } from '../router.js';
import { BagImage } from '../components/ArchCard.jsx';
import { useBag } from '../context/BagContext.jsx';
import { BagIcon, ChevronIcon, CloseIcon } from '../components/Icons.jsx';

const GAP = 18;

// Size a grid so `count` cards fit the measured area without scrolling.
// Returns columns, rows per page and card width (cards are 4:5 images
// with a caption of `label` px).
function useFit(ref, count, kind) {
  const [fit, setFit] = useState({ cols: 1, rows: 1, cw: 200 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const cs = getComputedStyle(el);
      const w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const h = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const label = kind === 'products' ? 52 : 44;
      let cols;
      if (kind === 'categories') cols = w >= 700 ? 3 : 2;
      else cols = w >= 1000 ? 4 : w >= 640 ? 3 : 2;
      let rows = kind === 'categories' ? Math.ceil(SHOP_CATEGORIES.length / cols) : 2;
      // fewer rows if two would make the cards too small
      const cardH = (r) => (h - GAP * (r - 1)) / r - label;
      if (kind === 'products' && cardH(2) < 190) rows = 1;
      cols = Math.min(cols, Math.max(1, count));
      const usedRows = Math.min(rows, Math.ceil(count / cols));
      const maxW = kind === 'products' ? 300 : 330;
      const cw = Math.floor(Math.max(110, Math.min((w - GAP * (cols - 1)) / cols, cardH(usedRows) * 0.8, maxW)));
      setFit({ cols, rows, cw });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, count, kind]);
  return fit;
}

function Pager({ page, pages, cat }) {
  if (pages < 2) return <div className="shop__pager" aria-hidden="true" />;
  const to = (p) => href.boutique(cat, p);
  return (
    <nav className="shop__pager" aria-label="Pages">
      <a href={to(Math.max(1, page - 1))} data-replace className="shop__step" aria-label="Page précédente" aria-disabled={page === 1}>
        <ChevronIcon dir="left" />
      </a>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <a key={p} href={to(p)} data-replace className="shop__num" aria-current={p === page ? 'page' : undefined} aria-label={`Page ${p}`}>
          {p}
        </a>
      ))}
      <a href={to(Math.min(pages, page + 1))} data-replace className="shop__step" aria-label="Page suivante" aria-disabled={page === pages}>
        <ChevronIcon dir="right" />
      </a>
    </nav>
  );
}

// Full-screen collection browser: categories, then the handbags of one
// category, paginated so every view fits the screen.
export default function Boutique({ route, onBack, onClose }) {
  const bag = useBag();
  const area = useRef(null);
  const cat = route.cat ? findCategory(route.cat) : null;
  const items = cat ? cat.products : SHOP_CATEGORIES;
  const fit = useFit(area, cat ? items.length : SHOP_CATEGORIES.length, cat ? 'products' : 'categories');
  const perPage = cat ? fit.cols * fit.rows : items.length;
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const page = Math.min(route.pg || 1, pages);
  const shown = cat ? items.slice((page - 1) * perPage, page * perPage) : items;

  // keep the URL on a valid page after a resize
  useLayoutEffect(() => {
    if (cat && route.pg !== page && route.pg > pages) replace(href.boutique(cat.id, page));
  }, [cat, route.pg, page, pages]);

  return (
    <div className="shop" style={{ '--cw': `${fit.cw}px`, '--cols': fit.cols }}>
      <header className="shop__bar">
        <button type="button" className="pov__back" onClick={onBack} data-autofocus>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
            <path d="M21 6H1.5M6 1 1 6l5 5" />
          </svg>
          Retour
        </button>
        <span className="wordmark shop__mark" aria-hidden="true">
          Pleine Fleur
        </span>
        <div className="shop__tools">
          <a href={href.bag} className="pov__bag" aria-label={`Panier, ${bag.count} article${bag.count > 1 ? 's' : ''}`}>
            <BagIcon />
            {bag.count > 0 && <span className="nav__count">{bag.count}</span>}
          </a>
          <button type="button" className="shop__close" onClick={onClose} aria-label="Fermer la collection">
            <CloseIcon />
          </button>
        </div>
      </header>

      <div className="shop__head">
        <h1 className="shop__title">{cat ? cat.name : 'The Collection'}</h1>
        {cat && (
          <p className="shop__meta">
            {items.length} modèle{items.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="shop__area" ref={area}>
        <ul className={`shop__grid ${cat ? 'shop__grid--products' : 'shop__grid--cats'}`} key={`${route.cat}-${page}`}>
          {cat
            ? shown.map((p) => {
                const { vi, photo } = coverOf(p);
                return (
                  <li key={p.id}>
                    <a href={href.product(p.id, vi)} className="shop__card" aria-label={`${p.name}, ${formatPrice(p.price)}`}>
                      <span className="shop__img">
                        <BagImage photo={photo} />
                      </span>
                      <span className="shop__name">{p.name}</span>
                      <span className="shop__price">{formatPrice(p.price)}</span>
                    </a>
                  </li>
                );
              })
            : shown.map((c) => (
                <li key={c.id}>
                  <a href={href.boutique(c.id)} className="shop__card shop__card--cat">
                    <span className="shop__img">
                      <BagImage photo={c.cover} />
                    </span>
                    <span className="shop__cat">{c.name}</span>
                  </a>
                </li>
              ))}
        </ul>
      </div>

      {cat ? <Pager page={page} pages={pages} cat={cat.id} /> : <div className="shop__pager" aria-hidden="true" />}
    </div>
  );
}
