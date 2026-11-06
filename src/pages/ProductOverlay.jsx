import { useEffect, useState } from 'react';
import { categoryLabel, findProduct, formatPrice, img, isStudio, photosOf } from '../data/products.js';
import { useBag } from '../context/BagContext.jsx';
import { href } from '../router.js';
import Swatches from '../components/Swatches.jsx';
import QtyStepper from '../components/QtyStepper.jsx';
import { ChevronIcon, CloseIcon } from '../components/Icons.jsx';

function Accordion({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="pop__acc">
      {items.map((it, i) => {
        const id = `pop-acc-${i}`;
        const isOpen = open === i;
        return (
          <div className={`pop__acc-item ${isOpen ? 'is-open' : ''}`} key={it.title}>
            <h2>
              <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{it.title}</span>
                <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </h2>
            <div id={id} hidden={!isOpen}>
              <p className={it.pending ? 'placeholder' : undefined}>{it.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Product popup after the reference: photograph with Retour and thumbnails
// on the left, the buying information on the right. It always fits the
// viewport; nothing inside it scrolls.
export default function ProductOverlay({ id, colour = 0, onBack }) {
  const p = findProduct(id);
  const bag = useBag();
  const shots = photosOf(p);
  const firstShot = (vi) => Math.max(0, shots.findIndex((s) => s.vi === vi));
  const [shot, setShot] = useState(() => firstShot(colour));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(null);

  useEffect(() => {
    setShot(firstShot(colour));
    setQty(1);
    setAdded(null);
  }, [id, colour]);

  const current = shots[shot];
  const sel = current.vi;
  const variant = p.variants[sel];
  const step = (d) => {
    setShot((s) => (s + d + shots.length) % shots.length);
    setAdded(null);
  };

  // Product details come only from the catalogue data.
  const facts = [`Catégorie : ${categoryLabel(p.category)}.`, `Coloris : ${p.variants.map((v) => v.name).join(', ')}.`];
  if (p.dimensions) facts.push(`Dimensions : ${p.dimensions}.`);
  const details = [
    { title: 'Détails du produit', body: facts.join(' ') },
    p.materials && { title: 'Matières et finitions', body: p.materials },
    p.care && { title: 'Entretien', body: p.care },
    { title: 'Livraison et retours', body: 'Conditions de livraison et de retour à compléter par Pleine Fleur.', pending: true },
  ].filter(Boolean);

  return (
    <div className="pop">
      <div className="pop__media">
        <button type="button" className="pop__back" onClick={onBack} data-autofocus>
          <svg width="20" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M21 6H1.5M6 1 1 6l5 5" />
          </svg>
          Retour
        </button>
        <figure className="pop__stage">
          <img
            key={current.photo}
            src={img.view(current.photo)}
            alt={`${p.name} en ${variant.name}`}
            className={isStudio(current.photo) ? 'pop__img pop__img--studio' : 'pop__img pop__img--orig'}
          />
        </figure>
        {shots.length > 1 && (
          <div className="pop__strip">
            <button type="button" className="pop__arrow" aria-label="Photo précédente" onClick={() => step(-1)}>
              <ChevronIcon dir="left" />
            </button>
            <div className="pop__thumbs" role="group" aria-label="Photographies du produit">
              {shots.map((s, i) => (
                <button
                  key={s.photo}
                  type="button"
                  className="pop__thumb"
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
            <button type="button" className="pop__arrow" aria-label="Photo suivante" onClick={() => step(1)}>
              <ChevronIcon dir="right" />
            </button>
          </div>
        )}
      </div>

      <div className="pop__info">
        <h1 className="pop__name">{p.name}</h1>
        <p className="pop__price">{formatPrice(p.price)}</p>
        <p className="pop__desc">{p.note}</p>

        <p className="pop__label">
          Couleur : <strong>{variant.name}</strong>
        </p>
        <Swatches variants={p.variants} selected={sel} onSelect={(vi) => { setShot(firstShot(vi)); setAdded(null); }} size="lg" label="Choisir une couleur" showSingle />

        {p.stock && <p className="pop__stock">{p.stock}</p>}

        <div className="pop__buy">
          <QtyStepper value={qty} onChange={setQty} max={bag.maxQty} label="Quantité" />
          <button
            type="button"
            className="pop__add"
            onClick={() => {
              bag.add(p.id, variant.name, qty);
              setAdded({ qty, colour: variant.name });
            }}
          >
            Ajouter au panier
          </button>
        </div>
        <p className="pop__added" role="status">
          {added && (
            <>
              {added.qty} × {added.colour.toLowerCase()} ajouté au panier ·{' '}
              <a href={href.bag} className="textlink">
                Voir le panier
              </a>
            </>
          )}
        </p>

        <Accordion items={details} />
      </div>

      <button type="button" className="pop__close" onClick={onBack} aria-label="Fermer">
        <CloseIcon />
      </button>
    </div>
  );
}
