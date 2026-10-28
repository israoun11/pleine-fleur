import { useState } from 'react';
import { formatPrice, img } from '../data/products.js';
import Swatches from './Swatches.jsx';

export default function ProductCard({ product, onOpen, eager = false }) {
  const [sel, setSel] = useState(0);
  const variant = product.variants[sel];
  const many = product.variants.length > 1;

  return (
    <article className="card">
      <button
        type="button"
        className="card__media"
        onClick={() => onOpen(product.id, sel)}
        aria-label={`${product.name}, ${variant.name}. View details`}
      >
        {/* Every colour is stacked in the same fixed 4:5 frame; only opacity
            changes, so selecting a colour never moves the grid. */}
        {product.variants.map((v, i) => (
          <img
            key={v.photo}
            className={`card__img ${i === sel ? 'is-on' : ''}`}
            src={img.studioSm(v.photo)}
            alt=""
            width="560"
            height="700"
            loading={eager && i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </button>

      <div className="card__info">
        <div className="card__title">
          <h3 className="card__name">
            <button type="button" onClick={() => onOpen(product.id, sel)}>
              {product.name}
            </button>
          </h3>
          <p className="card__price">{formatPrice(product.price)}</p>
        </div>
        <p className="card__meta">
          <span className="card__colour">{variant.name}</span>
          {many && <span className="card__count">{product.variants.length} colours</span>}
        </p>
        <Swatches variants={product.variants} selected={sel} onSelect={setSel} />
      </div>
    </article>
  );
}
