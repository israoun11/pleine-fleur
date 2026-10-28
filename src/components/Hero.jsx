import { useEffect, useState } from 'react';
import { findProduct, img } from '../data/products.js';

// The hero stages the signature Serpent bag inside a lime-washed arch and
// cycles slowly through its real colour variants. The original photograph
// fills the arch (shown at its true proportions; only the rounded top of the
// arch masks the photo's background corners). The dots on the plinth are the
// same swatches used in the shop.
const serpent = findProduct('serpent-top-handle');
// Periwinkle and mauve are the two cleanest photographs for full-screen use.
const STAGE = [0, 1].map((i) => serpent.variants[i]);

export default function Hero({ onOpen }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || paused) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % STAGE.length), 4800);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__kicker">The Serpent</p>
        <h1 id="hero-title" className="hero__title">
          A clasp you{' '}
          <br />
          recognise across{' '}
          <br />
          the room
        </h1>
        <p className="hero__lede">
          Our structured top-handle bag, closed with a coiled serpent. Shown in periwinkle and mauve, and
          also made in chocolate and taupe.
        </p>
        <div className="hero__actions">
          <a href="#collection" className="btn btn--solid">
            Discover the collection
          </a>
          <button type="button" className="textlink" onClick={() => onOpen(serpent.id, i)}>
            View the Serpent in {STAGE[i].name.toLowerCase()}
          </button>
        </div>
      </div>

      <div
        className="hero__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="arch">
          <div className="arch__inner">
            {STAGE.map((v, n) => (
              <img
                key={v.photo}
                src={img.life(v.photo)}
                alt={n === i ? `Serpent Top-Handle in ${v.name}` : ''}
                className={`hero__bag ${n === i ? 'is-on' : ''}`}
                fetchpriority={n === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            ))}
          </div>
        </div>
        <div className="plinth">
          <div className="hero__dots" role="group" aria-label="Serpent colours">
            {STAGE.map((v, n) => (
              <button
                key={v.name}
                type="button"
                className="swatch swatch--hero"
                aria-label={v.name}
                aria-pressed={n === i}
                onClick={() => {
                  setI(n);
                  setPaused(true);
                }}
              >
                <span style={{ background: v.hex }} />
              </button>
            ))}
            <span className="hero__dotlabel" aria-live="polite">
              {STAGE[i].name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
