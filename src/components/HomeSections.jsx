import { COLLECTION } from '../data/products.js';
import { CAMPAIGN } from '../data/site.js';
import { href } from '../router.js';
import { BagImage } from './ArchCard.jsx';

// The collection, laid out like an editorial spread: large two-up studio
// images edge to edge, no names or prices beneath. Each image opens its own
// real product in the selected colour; the product overlay holds the details.
export function Gallery() {
  return (
    <section className="gallery" id="collection" aria-label="La collection">
      <h2 className="visually-hidden">La collection</h2>
      <div className="gallery__grid">
        {COLLECTION.map(({ product, vi, photo }, i) => (
          <a
            key={photo}
            href={href.product(product.id, vi)}
            className="gallery__item"
            aria-label={`${product.name}, ${product.variants[vi].name}`}
            data-reveal
          >
            <BagImage photo={photo} eager={i < 2} />
            <span className="gallery__label" aria-hidden="true">
              {product.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

// "Discover Pleine Fleur": campaign photograph with the title on the wall.
export function DiscoverCampaign() {
  return (
    <section className="campaign" id="campagne" aria-labelledby="campaign-title">
      <img className="campaign__media" src={CAMPAIGN.discover} alt="A woman in burgundy holding an ivory Pleine Fleur bag beside flowers" loading="lazy" />
      <div className="campaign__copy" data-reveal>
        <h2 id="campaign-title" className="display display--lg">
          Discover
          <br />
          Pleine Fleur
        </h2>
      </div>
    </section>
  );
}

// An open fashion magazine: title page on the left, photograph on the right.
export function Magazine() {
  return (
    <section className="magazine" id="magazine" aria-labelledby="magazine-title">
      <div className="wrap">
        <div className="book" data-reveal>
          <div className="book__page book__page--left">
            <p className="book__folio">Pleine Fleur — Édition n° 1</p>
            <h2 id="magazine-title" className="book__title">
              The Art
              <br />
              of Elegance
            </h2>
            <p className="book__text">
              A silhouette, a colour, a clasp that catches the light. Pieces chosen to be carried for years.
            </p>
            <p className="book__num">12</p>
          </div>
          <div className="book__page book__page--right">
            <figure className="book__figure">
              <img src={CAMPAIGN.magazine} alt="An ivory serpent-clasp handbag on a stone plinth, titled Serpentine Elegance" loading="lazy" />
            </figure>
            <p className="book__num book__num--r">13</p>
          </div>
          <span className="book__spine" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

// Three large editorial cards, each title set over its photograph.
export function Maison() {
  const tiles = [
    { src: CAMPAIGN.tileFlowers, alt: 'Three suede handbags with tassels stacked on a stone ledge', label: 'The Collection', to: href.section('collection') },
    { src: CAMPAIGN.tileWoman, alt: 'A navy serpent-clasp handbag on a stone plinth', label: 'The Art of Elegance', to: href.section('magazine') },
    { src: CAMPAIGN.tileSeated, alt: 'A teal handbag with a chain strap resting on an armchair', label: 'Customer Care', to: href.info('service-client') },
  ];
  return (
    <section className="maison" id="maison" aria-labelledby="maison-title">
      <div className="wrap">
        <header className="section-head section-head--center" data-reveal>
          <h2 id="maison-title" className="display display--md">
            La Maison Pleine Fleur
          </h2>
        </header>
        <div className="maison__grid">
          {tiles.map((t) => (
            <a key={t.label} href={t.to} className="maison__card" data-reveal>
              <img src={t.src} alt={t.alt} loading="lazy" />
              <span className="maison__shade" aria-hidden="true" />
              <span className="maison__title">{t.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Editorial: the photograph first, then the title, then one short line.
export function EditorialCampaign() {
  return (
    <section className="editorial" id="editorial" aria-labelledby="editorial-title">
      <div className="wrap">
        <figure className="editorial__photo" data-reveal>
          <img src={CAMPAIGN.portrait} alt="A woman in an ivory dress beside a red quilted handbag with a chain strap" loading="lazy" />
        </figure>
        <div className="editorial__copy" data-reveal>
          <h2 id="editorial-title" className="editorial__title">
            Carried in the afternoon light
          </h2>
          <p className="editorial__text">Ivory silk, warm stone, and a colour chosen to be worn for many seasons.</p>
        </div>
      </div>
    </section>
  );
}
