import { img } from '../data/products.js';

// Two-up campaign tiles with a white label button, as on the reference.
export default function Editorial({ onFilter }) {
  const tiles = [
    { id: 'serpent', photo: 'i1_10', alt: 'Serpent Top-Handle in chocolate, carried', label: 'Discover the Serpent', filter: 'top-handle' },
    { id: 'summer', photo: 'i2_01', alt: 'Jacquard Mini Tote held in a wheat field', label: 'Discover Summer weaves', filter: 'summer' },
  ];
  return (
    <section className="editorial" aria-label="Featured lines">
      {tiles.map((t) => (
        <div className="editorial__tile" id={t.id} key={t.id}>
          <img src={img.life(t.photo)} alt={t.alt} loading="lazy" />
          <button type="button" className="label-btn" onClick={() => onFilter(t.filter)}>
            {t.label}
          </button>
        </div>
      ))}
    </section>
  );
}
