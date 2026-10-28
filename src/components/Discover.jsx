import { img } from '../data/products.js';

// Closing pair of campaign tiles: the "Discover the Serpent" and
// "Discover Summer weaves" buttons, each filtering the collection.
const TILES = [
  { photo: 'i1_10', alt: 'Serpent Top-Handle in chocolate, carried', label: 'Discover the Serpent', filter: 'top-handle' },
  { photo: 'i2_01', alt: 'Jacquard Mini Tote held in a wheat field', label: 'Discover Summer weaves', filter: 'summer' },
];

export default function Discover({ onFilter }) {
  return (
    <section className="discover" aria-label="Discover">
      <div className="wrap discover__grid">
        {TILES.map((t) => (
          <div className="discover__tile" key={t.label}>
            <img src={img.life(t.photo)} alt={t.alt} loading="lazy" />
            <button type="button" className="discover__btn" onClick={() => onFilter(t.filter)}>
              {t.label}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
