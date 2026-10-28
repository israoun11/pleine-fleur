import { img } from '../data/products.js';

// Campaign-style feature built from the client's own lifestyle photographs.
export default function Editorial({ onOpen, onFilter }) {
  return (
    <section className="editorial" id="serpent" aria-labelledby="serpent-title">
      <div className="wrap editorial__grid">
        <figure className="editorial__main">
          <button type="button" onClick={() => onOpen('serpent-top-handle', 2)} aria-label="View the Serpent Top-Handle in chocolate">
            <img src={img.life('i1_10')} alt="The Serpent Top-Handle in chocolate, carried by hand" loading="lazy" />
          </button>
        </figure>

        <div className="editorial__text">
          <h2 id="serpent-title" className="section-title section-title--xl">
            The serpent clasp
          </h2>
          <p>
            A coiled serpent closes the flap on our structured bags. It sits at the point of a scalloped
            tab and returns across the collection: on smooth colours, on houndstooth, and on a pale textured
            edition.
          </p>
          <div className="editorial__actions">
            <button type="button" className="btn btn--line" onClick={() => onFilter('top-handle')}>
              Shop top-handle bags
            </button>
          </div>
        </div>

        <div className="editorial__side">
          <figure>
            <button type="button" onClick={() => onOpen('serpent-textured', 0)} aria-label="View the Serpent Textured in ice blue">
              <img src={img.life('i6_11')} alt="The Serpent Textured in ice blue, carried by hand" loading="lazy" />
            </button>
            <figcaption>Serpent Textured, ice blue</figcaption>
          </figure>
          <figure>
            <button type="button" onClick={() => onOpen('serpent-houndstooth', 0)} aria-label="View the Serpent Houndstooth">
              <img src={img.life('i1_00')} alt="The Serpent Houndstooth on a desk" loading="lazy" />
            </button>
            <figcaption>Serpent Houndstooth</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
