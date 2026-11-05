import { useEffect, useState } from 'react';
import { findProduct } from './data/products.js';
import { INFO_PAGES } from './data/site.js';

// Hash routing (works on any static host and keeps the browser back button).
//   #                      home
//   #collection, #magazine, #maison, #campagne   home, scrolled to a section
//   #produit-<id>          product overlay (#produit-<id>--c2 opens colour 3)
//   #panier #commande #confirmation #recherche #compte
//   #info-<slug>           footer pages
//
// Product links are opened with history.pushState and a depth counter, so
// the overlay sits on top of the page the visitor came from. Retour, Escape
// and the browser back button all step back to that page, with its scroll
// position and state untouched.
export const HOME_SECTIONS = ['top', 'collection', 'campagne', 'magazine', 'maison', 'editorial'];
const PAGES = ['panier', 'commande', 'confirmation', 'recherche', 'compte'];

export function parse(hash) {
  const h = decodeURIComponent((hash || '').replace(/^#/, ''));
  if (!h || HOME_SECTIONS.includes(h)) return { page: 'home', section: h || null };
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
  product: (id, colour = 0) => (colour > 0 ? `#produit-${id}--c${colour}` : `#produit-${id}`),
  bag: '#panier',
  checkout: '#commande',
  confirmation: '#confirmation',
  search: '#recherche',
  account: '#compte',
  info: (slug) => `#info-${slug}`,
};

const EVT = 'pf-route';
const depth = () => history.state?.pfDepth || 0;
const notify = () => window.dispatchEvent(new Event(EVT));

export const go = (h) => {
  if (location.hash === h || (h === '#' && !location.hash)) notify();
  else location.hash = h;
};

// Open a product over the current page.
export const openProduct = (h) => {
  if (location.hash === h) return;
  history.pushState({ pfDepth: depth() + 1 }, '', h);
  notify();
};

// Close the product overlay and return to the page beneath it.
export const closeProduct = (baseHash) => {
  const d = depth();
  if (d > 0) history.go(-d);
  else {
    history.replaceState(null, '', baseHash || location.pathname + location.search);
    notify();
  }
};

export function useRoute() {
  const [route, setRoute] = useState(() => parse(location.hash));
  useEffect(() => {
    const on = () => setRoute(parse(location.hash));
    // Every same-page product link opens through openProduct.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href^="#produit-"]');
      if (!a) return;
      e.preventDefault();
      openProduct(a.getAttribute('href'));
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
