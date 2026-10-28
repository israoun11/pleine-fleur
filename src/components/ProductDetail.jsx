import { useEffect, useState } from 'react';
import { CATEGORIES, PRODUCTS, img } from '../data/products.js';
import { useBag } from '../context/BagContext.jsx';
import Overlay from './Overlay.jsx';
import Swatches from './Swatches.jsx';
import { ChevronIcon, CloseIcon } from './Icons.jsx';

export default function ProductDetail({ product, startVariant = 0, onClose, onOpen }) {
  const bag = useBag();
  const [sel, setSel] = useState(startVariant);
  const [shot, setShot] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSel(startVariant);
    setShot(0);
    setAdded(false);
    document.querySelector('.overlay--full .overlay__panel')?.scrollTo(0, 0);
  }, [product?.id, startVariant]);

  if (!product) return null;
  const variant = product.variants[sel];
  // Gallery for the selected colour: studio view, original photograph(s).
  const shots = [
    { src: img.studio(variant.photo), alt: `${product.name} in ${variant.name}, studio view`, kind: 'studio' },
    { src: img.life(variant.photo), alt: `${product.name} in ${variant.name}, as photographed`, kind: 'life' },
    ...variant.extra.flatMap((x) => [
      { src: img.studio(x), alt: `${product.name} in ${variant.name}, second angle`, kind: 'studio' },
      { src: img.life(x), alt: `${product.name} in ${variant.name}, second photograph`, kind: 'life' },
    ]),
  ];
  const current = shots[Math.min(shot, shots.length - 1)];
  const cat = CATEGORIES.find((c) => c.id === product.category)?.label;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const pick = (i) => {
    setSel(i);
    setShot(0);
    setAdded(false);
  };

  return (
    <Overlay open onClose={onClose} label={product.name} variant="full">
      <div className="pdp">
        <button type="button" className="icon-btn pdp__close" onClick={onClose} aria-label="Close product view" data-autofocus>
          <CloseIcon />
          <span className="icon-btn__label">Close</span>
        </button>

        <div className="pdp__gallery">
          <div className={`pdp__frame pdp__frame--${current.kind}`}>
            <img key={current.src} src={current.src} alt={current.alt} className="pdp__img" />
            {shots.length > 1 && (
              <div className="pdp__arrows">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Previous image"
                  onClick={() => setShot((s) => (s - 1 + shots.length) % shots.length)}
                >
                  <ChevronIcon dir="left" />
                </button>
                <span className="pdp__pos">
                  {shot + 1} / {shots.length}
                </span>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Next image"
                  onClick={() => setShot((s) => (s + 1) % shots.length)}
                >
                  <ChevronIcon />
                </button>
              </div>
            )}
          </div>
          <div className="pdp__thumbs" role="group" aria-label="Images">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={`pdp__thumb pdp__thumb--${s.kind}`}
                aria-pressed={i === shot}
                aria-label={s.alt}
                onClick={() => setShot(i)}
              >
                <img src={s.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          <p className="pdp__cat">{cat}</p>
          <h2 className="pdp__name">{product.name}</h2>
          <p className="pdp__price">Price on request</p>

          <div className="pdp__colour">
            <p>
              Colour <strong>{variant.name}</strong>
            </p>
            <Swatches variants={product.variants} selected={sel} onSelect={pick} size="lg" />
          </div>

          <p className="pdp__note">{product.note}</p>

          <div className="pdp__buy">
            <button
              type="button"
              className="btn btn--solid btn--wide"
              onClick={() => {
                bag.add(product.id, variant.name);
                setAdded(true);
              }}
            >
              Add to bag
            </button>
            <p className="pdp__added" aria-live="polite">
              {added && (
                <>
                  Added in {variant.name.toLowerCase()}.{' '}
                  <button
                    type="button"
                    className="textlink"
                    onClick={() => {
                      onClose();
                      bag.setOpen(true);
                    }}
                  >
                    View bag
                  </button>
                </>
              )}
            </p>
          </div>

          <dl className="pdp__facts">
            <div>
              <dt>Colours</dt>
              <dd>{product.variants.map((x) => x.name).join(', ')}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{cat}</dd>
            </div>
            <div>
              <dt>Materials and size</dt>
              <dd className="placeholder">To be confirmed by the atelier</dd>
            </div>
          </dl>

          {related.length > 0 && (
            <div className="pdp__related">
              <p>Also in {cat.toLowerCase()}</p>
              <ul>
                {related.map((r) => (
                  <li key={r.id}>
                    <button type="button" onClick={() => onOpen(r.id, 0)}>
                      <img src={img.studioSm(r.variants[0].photo)} alt="" loading="lazy" />
                      <span>{r.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
}
