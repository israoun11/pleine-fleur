import { useEffect, useRef, useState } from 'react';
import { PRODUCTS_FULL, categoryLabel, findProduct, formatPrice, img, isStudio, photosOf } from '../data/products.js';
import { useBag } from '../context/BagContext.jsx';
import { href } from '../router.js';
import ArchCard from '../components/ArchCard.jsx';
import Swatches from '../components/Swatches.jsx';
import QtyStepper from '../components/QtyStepper.jsx';
import { BagIcon, ChevronIcon } from '../components/Icons.jsx';

const PENDING = 'Information à compléter par Pleine Fleur.';

function Accordion({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const id = `pov-acc-${i}`;
        const isOpen = open === i;
        return (
          <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={it.title}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{it.title}</span>
                <span className="accordion__sign" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div id={id} className="accordion__body" hidden={!isOpen}>
              <p className={it.pending ? 'placeholder' : undefined}>{it.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Photo({ photo, alt, className = '' }) {
  return (
    <img
      key={photo}
      src={img.view(photo)}
      alt={alt}
      className={`pov__photo ${isStudio(photo) ? 'pov__photo--studio' : 'pov__photo--orig'} ${className}`}
    />
  );
}

// Full-screen product detail, laid out after Reference 2: thumbnails, large
// image with arrows, then name, colour, description, price, swatches and
// the add-to-bag action; details and further photographs below.
export default function ProductOverlay({ id, colour = 0, onBack }) {
  const p = findProduct(id);
  const bag = useBag();
  const sheet = useRef(null);
  const shots = photosOf(p);
  const firstShot = (vi) => Math.max(0, shots.findIndex((s) => s.vi === vi));
  const [shot, setShot] = useState(() => firstShot(colour));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(null);

  useEffect(() => {
    setShot(firstShot(colour));
    setQty(1);
    setAdded(null);
    sheet.current?.closest('.overlay__panel')?.scrollTo(0, 0);
  }, [id, colour]);

  const current = shots[shot];
  const sel = current.vi;
  const variant = p.variants[sel];
  const step = (d) => {
    setShot((s) => (s + d + shots.length) % shots.length);
    setAdded(null);
  };
  const pickColour = (vi) => {
    setShot(firstShot(vi));
    setAdded(null);
  };

  // Lower section: the original photograph of this colour (its setting),
  // and a photograph of another colour when there is one.
  const lifestyle = isStudio(variant.photo) ? variant.photo : null;
  const other = p.variants.find((v, i) => i !== sel);
  const related = PRODUCTS_FULL.filter((x) => x.id !== p.id)
    .sort((a, b) => (b.category === p.category) - (a.category === p.category))
    .slice(0, 3);

  const details = [
    { title: 'Description', body: p.note },
    p.materials && { title: 'Matières et finitions', body: p.materials },
    p.dimensions && { title: 'Dimensions', body: p.dimensions },
    p.care && { title: 'Entretien', body: p.care },
    { title: 'Livraison et retours', body: `Conditions de livraison et de retour : ${PENDING.toLowerCase()}`, pending: true },
  ].filter(Boolean);

  return (
    <div className="pov" ref={sheet}>
      <header className="pov__bar">
        <button type="button" className="pov__back" onClick={onBack} data-autofocus>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
            <path d="M21 6H1.5M6 1 1 6l5 5" />
          </svg>
          Retour
        </button>
        <span className="wordmark pov__mark" aria-hidden="true">
          Pleine Fleur
        </span>
        <a href={href.bag} className="pov__bag" aria-label={`Panier, ${bag.count} article${bag.count > 1 ? 's' : ''}`}>
          <BagIcon />
          {bag.count > 0 && <span className="nav__count">{bag.count}</span>}
        </a>
      </header>

      <div className="pov__main">
        <div className="pov__gallery">
          {shots.length > 1 && (
            <div className="pov__thumbs" role="group" aria-label="Photographies du produit">
              {shots.map((s, i) => (
                <button
                  key={s.photo}
                  type="button"
                  className="pov__thumb"
                  aria-pressed={i === shot}
                  aria-label={`Photo ${i + 1} sur ${shots.length} : ${s.colour}`}
                  onClick={() => {
                    setShot(i);
                    setAdded(null);
                  }}
                >
                  <img src={img.view(s.photo)} alt="" />
                </button>
              ))}
            </div>
          )}
          <figure className="pov__stage">
            <Photo photo={current.photo} alt={`${p.name} en ${variant.name}`} />
            {shots.length > 1 && (
              <>
                <button type="button" className="pov__arrow pov__arrow--prev" aria-label="Photo précédente" onClick={() => step(-1)}>
                  <ChevronIcon dir="left" />
                </button>
                <button type="button" className="pov__arrow pov__arrow--next" aria-label="Photo suivante" onClick={() => step(1)}>
                  <ChevronIcon dir="right" />
                </button>
                <span className="pov__count" aria-hidden="true">
                  {shot + 1} / {shots.length}
                </span>
              </>
            )}
          </figure>
        </div>

        <div className="pov__info">
          <p className="pov__eyebrow">{categoryLabel(p.category)}</p>
          <h1 className="pov__name">{p.name}</h1>
          <p className="pov__colour">{variant.name}</p>
          <p className="pov__desc">{p.note}</p>
          <p className="pov__price">{formatPrice(p.price)}</p>

          <p className="pov__label">
            Couleur : <span>{variant.name}</span>
          </p>
          <Swatches variants={p.variants} selected={sel} onSelect={pickColour} size="lg" label="Choisir une couleur" showSingle />

          {p.stock && <p className="pov__stock">{p.stock}</p>}

          <div className="pov__buy">
            <div>
              <p className="pov__label" id="pov-qty">
                Quantité
              </p>
              <QtyStepper value={qty} onChange={setQty} max={bag.maxQty} labelledBy="pov-qty" />
            </div>
            <button
              type="button"
              className="btn btn--solid pov__add"
              onClick={() => {
                bag.add(p.id, variant.name, qty);
                setAdded({ qty, colour: variant.name });
              }}
            >
              Ajouter au panier
            </button>
          </div>
          <p className="pov__added" role="status">
            {added && (
              <>
                {added.qty} × {p.name} ({added.colour.toLowerCase()}) ajouté au panier.{' '}
                <a href={href.bag} className="textlink">
                  Voir le panier
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="pov__more">
        <div className="pov__lower">
          <figure className="pov__life">
            {lifestyle ? (
              <img src={img.original(lifestyle)} alt={`${p.name} en ${variant.name}, photographié en situation`} loading="lazy" />
            ) : other ? (
              <Photo photo={other.photo} alt={`${p.name} en ${other.name}`} />
            ) : (
              <Photo photo={variant.photo} alt={`${p.name} en ${variant.name}`} />
            )}
          </figure>
          <section className="pov__details" aria-labelledby="pov-details">
            <h2 id="pov-details" className="pov__h2">
              Détails du produit
            </h2>
            <span className="pov__rule" aria-hidden="true" />
            <Accordion items={details} />
            {lifestyle && other && (
              <figure className="pov__second">
                <Photo photo={other.photo} alt={`${p.name} en ${other.name}`} />
                <figcaption>Également en {other.name.toLowerCase()}</figcaption>
              </figure>
            )}
          </section>
        </div>

        <section className="pov__related" aria-labelledby="pov-related">
          <h2 id="pov-related" className="pov__h2">
            Vous aimerez aussi
          </h2>
          <div className="related__grid">
            {related.map((r) => (
              <ArchCard key={r.id} product={r} size="sm" />
            ))}
          </div>
        </section>
      </div>

      <div className="pov__sticky">
        <span>{formatPrice(p.price)}</span>
        <button
          type="button"
          className="btn btn--solid"
          onClick={() => {
            bag.add(p.id, variant.name, qty);
            setAdded({ qty, colour: variant.name });
          }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
