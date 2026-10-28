import { useCallback, useEffect, useState } from 'react';
import { BagProvider } from './context/BagContext.jsx';
import { CATEGORIES, PRODUCTS, findProduct, img } from './data/products.js';
import Header, { NAV } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Collection from './components/Collection.jsx';
import Editorial from './components/Editorial.jsx';
import SummerEdit from './components/SummerEdit.jsx';
import Discover from './components/Discover.jsx';
import Footer from './components/Footer.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import BagDrawer from './components/BagDrawer.jsx';
import SearchPanel from './components/SearchPanel.jsx';
import Overlay from './components/Overlay.jsx';
import { CloseIcon } from './components/Icons.jsx';

// Product pages are addressable as #bag-<product-id> so a link to one
// bag can be shared; section anchors keep working as normal.
const PREFIX = 'bag-';
const readHash = () => {
  const h = decodeURIComponent(location.hash.slice(1));
  return h.startsWith(PREFIX) && findProduct(h.slice(PREFIX.length)) ? h.slice(PREFIX.length) : null;
};

function Store() {
  const [filter, setFilter] = useState('all');
  const [detail, setDetail] = useState(() => {
    const id = readHash();
    return id ? { id, v: 0 } : null;
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openProduct = useCallback((id, v = 0) => {
    setDetail({ id, v });
    if (location.hash !== `#${PREFIX}${id}`) history.replaceState(null, '', `#${PREFIX}${id}`);
  }, []);

  const closeProduct = useCallback(() => {
    setDetail(null);
    if (location.hash.startsWith(`#${PREFIX}`)) history.replaceState(null, '', location.pathname + location.search);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const id = readHash();
      if (id) setDetail((d) => (d?.id === id ? d : { id, v: 0 }));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const filterAndGo = useCallback((id) => {
    setFilter(id);
    requestAnimationFrame(() =>
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  }, []);

  return (
    <>
      <a href="#collection" className="skip">Skip to the collection</a>
      <Header onSearch={() => setSearchOpen(true)} onMenu={() => setMenuOpen(true)} />

      <main>
        <Hero onOpen={openProduct} />

        <section className="intro" id="house" aria-labelledby="intro-title">
          <div className="wrap intro__grid">
            <h2 id="intro-title" className="intro__title">
              Pleine fleur
            </h2>
            <div className="intro__body">
              <p className="intro__lead">
                In French leatherwork, <em>pleine fleur</em> names the outer face of the hide, kept whole
                rather than sanded away.
              </p>
              <p>
                The house borrows the name for a simple idea: shapes left uncomplicated, colour chosen with
                care, and a few signatures you learn to recognise. Below are {PRODUCTS.length} designs, most of them in
                several colours. Pick a colour on any bag to see it.
              </p>
            </div>
            <figure className="intro__figure">
              <img src={img.cut('i3_21')} alt="Slouch Hobo in burgundy" loading="lazy" />
            </figure>
          </div>
        </section>

        <Collection filter={filter} setFilter={setFilter} onOpen={openProduct} />
        <Editorial onOpen={openProduct} onFilter={filterAndGo} />
        <SummerEdit onOpen={openProduct} />
        <Discover onFilter={filterAndGo} />
      </main>

      <Footer onFilter={setFilter} />

      {detail && (
        <ProductDetail
          product={findProduct(detail.id)}
          startVariant={detail.v}
          onClose={closeProduct}
          onOpen={openProduct}
        />
      )}
      <BagDrawer />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} onOpen={openProduct} />

      <Overlay open={menuOpen} onClose={() => setMenuOpen(false)} label="Menu" variant="left">
        <div className="mmenu">
          <div className="drawer__head">
            <p className="wordmark wordmark--menu">Pleine Fleur</p>
            <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu" data-autofocus>
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="mmenu__link" onClick={() => setMenuOpen(false)}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="mmenu__h">Shop by category</p>
          <div className="mmenu__cats">
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => filterAndGo(c.id), 60);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </Overlay>
    </>
  );
}

export default function App() {
  return (
    <BagProvider>
      <Store />
    </BagProvider>
  );
}
