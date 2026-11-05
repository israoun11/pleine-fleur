import { useEffect, useLayoutEffect, useState } from 'react';
import { BagProvider } from './context/BagContext.jsx';
import { closeProduct, useRoute } from './router.js';
import { findProduct } from './data/products.js';
import Nav from './components/Nav.jsx';
import MenuPanel from './components/MenuPanel.jsx';
import Hero from './components/Hero.jsx';
import { DiscoverCampaign, EditorialCampaign, Gallery, Magazine, Maison } from './components/HomeSections.jsx';
import Footer from './components/Footer.jsx';
import ProductOverlay from './pages/ProductOverlay.jsx';
import Overlay from './components/Overlay.jsx';
import BagPage from './pages/BagPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import { AccountPage, InfoPage, NotFound, SearchPage } from './pages/OtherPages.jsx';

const ORDER_KEY = 'pleine-fleur-last-order';
const loadOrder = () => {
  try {
    return JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null');
  } catch {
    return null;
  }
};

const TITLES = {
  home: 'Pleine Fleur',
  panier: 'Panier — Pleine Fleur',
  commande: 'Commande — Pleine Fleur',
  confirmation: 'Confirmation — Pleine Fleur',
  recherche: 'Recherche — Pleine Fleur',
  compte: 'Mon compte — Pleine Fleur',
};

function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <DiscoverCampaign />
      <Magazine />
      <Maison />
      <EditorialCampaign />
    </>
  );
}

// Gentle scroll reveals. Content is visible by default; only elements still
// below the fold are held back until they scroll into view.
function useReveal(key) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = [...document.querySelectorAll('[data-reveal]')].filter((el) => el.getBoundingClientRect().top > innerHeight * 0.95);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [key]);
}

function Store() {
  const route = useRoute();
  const [menu, setMenu] = useState(false);
  const [order, setOrder] = useState(loadOrder);

  // The page beneath a product overlay: the last non-product route
  // (home when a product link is opened directly).
  const isProduct = route.page === 'product';
  const [base, setBase] = useState(() => (isProduct ? { route: { page: 'home', section: null }, hash: '' } : { route, hash: location.hash }));
  useEffect(() => {
    if (!isProduct) setBase({ route, hash: location.hash });
  }, [route]);
  const page0 = isProduct ? base.route : route;
  const key = `${page0.page}:${page0.id || page0.slug || ''}`;

  // New page: start at the top. Home section links: scroll to the section.
  // Opening or closing a product overlay never moves the page beneath.
  useLayoutEffect(() => {
    if (isProduct) return;
    if (page0.page === 'home' && page0.section && page0.section !== 'top') {
      requestAnimationFrame(() => document.getElementById(page0.section)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [key, page0.section]);

  useEffect(() => {
    const p = isProduct ? findProduct(route.id) : null;
    document.title = p ? `${p.name} — Pleine Fleur` : TITLES[page0.page] || 'Pleine Fleur';
  }, [route, key]);

  useReveal(key);

  const confirm = (o) => {
    setOrder(o);
    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(o));
    } catch {
      /* the confirmation still shows for this visit */
    }
  };

  let page;
  switch (page0.page) {
    case 'home':
      page = <Home />;
      break;
    case 'panier':
      page = <BagPage />;
      break;
    case 'commande':
      page = <CheckoutPage onConfirmed={confirm} />;
      break;
    case 'confirmation':
      page = <ConfirmationPage order={order} />;
      break;
    case 'recherche':
      page = <SearchPage />;
      break;
    case 'compte':
      page = <AccountPage />;
      break;
    case 'info':
      page = <InfoPage slug={page0.slug} />;
      break;
    default:
      page = <NotFound />;
  }

  const back = () => closeProduct(base.hash);

  return (
    <div className={`site site--${page0.page}`}>
      <a href="#collection" className="skip">
        Aller à la collection
      </a>
      <Nav light={page0.page === 'home'} onMenu={() => setMenu(true)} />
      <main className="page-fade" key={key}>
        {page}
      </main>
      <Footer />
      <MenuPanel open={menu} onClose={() => setMenu(false)} />
      <Overlay open={isProduct} onClose={back} label={isProduct ? findProduct(route.id).name : 'Produit'} variant="product">
        {isProduct && <ProductOverlay id={route.id} colour={route.colour} onBack={back} />}
      </Overlay>
    </div>
  );
}

export default function App() {
  return (
    <BagProvider>
      <Store />
    </BagProvider>
  );
}
