import { useEffect, useState } from 'react';
import { findProduct, findCategory } from './data/products.js';
import { INFO_PAGES } from './data/site.js';

// Hash routing (works on any static host and keeps the browser back button).
//   #                      home
//   #collection, #magazine, #maison, #campagne   home, scrolled to a section
//   #boutique              collection browser: categories
//   #boutique-<cat>        collection browser: one category (#boutique-<cat>--p2 = page 2)
//   #produit-<id>          product popup (#produit-<id>--c2 opens colour 3)
//   #panier #commande #confirmation #recherche #compte
//   #info-<slug>           footer pages
//
// The collection browser and the product popup are layers over the page the
// visitor came from. They open with history.pushState; each entry records the
// trail of hashes before it, so Retour, the close icon, Escape and the browser
// back button all step back to the right layer with its state untouched.
export const HOME_SECTIONS = ['top', 'collection', 'campagne', 'magazine', 'maison', 'editorial'];
const PAGES = ['panier', 'commande', 'confirmation', 'recherche', 'compte'];

export function parse(hash) {
  const h = decodeURIComponent((hash || '').replace(/^#/, ''));
  if (!h || HOME_SECTIONS.includes(h)) return { page: 'home', section: h || null };
  if (h === 'boutique') return { page: 'boutique', cat: null, pg: 1 };
  if (h.startsWith('boutique-')) {
    const [cat, p] = h.slice(9).split('--p');
    if (!findCategory(cat)) return { page: 'notfound' };
    return { page: 'boutique', cat, pg: Math.max(1, parseInt(p, 10) || 1) };
  }
  if (h.startsWith('produit-')) {
    const [id, c] = h.slice(8).split('--c');
    const p = findProduct(id);
    if (!p) return { page: 'notfound' };
    const colour = Math.min(Math.max(parseInt(c, 10) || 0, 0), p.variants.length - 1);
    return { page: 'product', id, colour };
  }
  if (h.startsWith('info-')) {
    const slug = h.slice(5);
    return INFO_PAGES[slug] ? { page: 'info', slug } : { page: 'notfound' };
  }
  if (PAGES.includes(h)) return { page: h };
  return { page: 'notfound' };
}

export const href = {
  home: '#',
  section: (s) => `#${s}`,
  boutique: (cat, pg = 1) => (cat ? `#boutique-${cat}${pg > 1 ? `--p${pg}` : ''}` : '#boutique'),
  product: (id, colour = 0) => (colour > 0 ? `#produit-${id}--c${colour}` : `#produit-${id}`),
  bag: '#panier',
  checkout: '#commande',
  confirmation: '#confirmation',
  search: '#recherche',
  account: '#compte',
  info: (slug) => `#info-${slug}`,
};

const EVT = 'pf-route';
const notify = () => window.dispatchEvent(new Event(EVT));
const trail = () => (Array.isArray(history.state?.pfTrail) ? history.state.pfTrail : []);
const isHome = (h) => parse(h).page === 'home';

export const go = (h) => {
  if (location.hash === h || (h === '#' && !location.hash)) notify();
  else location.hash = h;
};

// Open a layer (collection browser, category, product) over the current view.
export const push = (h) => {
  if (location.hash === h) return;
  history.pushState({ pfTrail: [...trail(), location.hash] }, '', h);
  notify();
};

// Change the current view without a new history entry (pagination).
export const replace = (h) => {
  history.replaceState(history.state, '', h);
  notify();
};

// Return to `target`: step back through history when it is where the visitor
// came from (so the view beneath is exactly as they left it); otherwise
// (e.g. the link was opened directly) replace the current entry.
export const backTo = (target) => {
  const t = trail();
  for (let i = t.length - 1; i >= 0; i--) {
    if (t[i] === target || (isHome(target) && isHome(t[i]))) {
      history.go(i - t.length);
      return;
    }
  }
  history.replaceState(null, '', target && target !== '#' ? target : location.pathname + location.search);
  notify();
};

export const openProduct = push;
export const closeProduct = backTo;

export function useRoute() {
  const [route, setRoute] = useState(() => parse(location.hash));
  useEffect(() => {
    const on = () => setRoute(parse(location.hash));
    // Product and collection-browser links open as layers.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href^="#produit-"], a[href^="#boutique"]');
      if (!a) return;
      e.preventDefault();
      const h = a.getAttribute('href');
      if (a.dataset.replace !== undefined) replace(h);
      else push(h);
    };
    window.addEventListener('hashchange', on);
    window.addEventListener('popstate', on);
    window.addEventListener(EVT, on);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', on);
      window.removeEventListener('popstate', on);
      window.removeEventListener(EVT, on);
      document.removeEventListener('click', onClick);
    };
  }, []);
  return route;
}
