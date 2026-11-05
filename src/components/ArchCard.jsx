import { useState } from 'react';
import { formatPrice, img, isStudio } from '../data/products.js';
import { FOCUS } from '../data/focus.js';
import { href } from '../router.js';
import Swatches from './Swatches.jsx';

// Original photo placed so the bag fills a frame (see data/focus.js).
export const framed = (id) => {
  const f = FOCUS[id];
  return f ? { width: `${f.w}%`, left: `${f.l}%`, top: `${f.t}%` } : undefined;
};

// One photo of a bag in a fixed 4:5 box. A studio image already contains the
// arch and plinth; an original photo is shown inside a drawn arch instead.
export function BagImage({ photo, alt = '', className = '', eager = false }) {
  if (isStudio(photo)) {
    return <img className={`bagimg bagimg--studio ${className}`} src={img.view(photo)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  }
  return (
    <span className={`bagimg bagimg--orig ${className}`} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      <span className="bagimg__window">
        <img src={img.original(photo)} style={framed(photo)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </span>
      <span className="bagimg__plinth" aria-hidden="true" />
    </span>
  );
}

// Product tile: image, serif name, price, colour swatches. All colour photos
// are stacked in the same box, so switching colour never moves the layout.
// `studioOnly` limits the tile to colours that have a studio image
// (homepage collection); every colour stays on the product page.
export default function ArchCard({ product, size = 'md', studioOnly = false, showPrice = true }) {
  const variants = studioOnly ? product.variants.filter((v) => isStudio(v.photo)) : product.variants;
  const [sel, setSel] = useState(0);
  const variant = variants[sel];
  const vi = product.variants.indexOf(variant);
  return (
    <article className={`tile tile--${size}`} data-reveal>
      <a href={href.product(product.id, vi)} className="tile__media" aria-label={`${product.name}, ${variant.name}`}>
        {variants.map((v, i) => (
          <span key={v.photo} className={`tile__layer ${i === sel ? 'is-on' : ''}`}>
            <BagImage photo={v.photo} />
          </span>
        ))}
      </a>
      <div className="tile__info">
        <h3 className="tile__name">
          <a href={href.product(product.id, vi)}>{product.name}</a>
        </h3>
        {showPrice && <p className="tile__price">{formatPrice(product.price)}</p>}
        <Swatches variants={variants} selected={sel} onSelect={setSel} showSingle />
      </div>
    </article>
  );
}
