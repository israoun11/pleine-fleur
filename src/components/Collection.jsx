import { CATEGORIES, PRODUCTS } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

export default function Collection({ filter, setFilter, onOpen }) {
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  const label = CATEGORIES.find((c) => c.id === filter)?.label;

  return (
    <section className="collection" id="collection" aria-labelledby="collection-title">
      <div className="wrap">
        <div className="collection__head">
          <h2 id="collection-title" className="section-title">
            The collection
          </h2>
          <p className="collection__count" aria-live="polite">
            {list.length} {list.length === 1 ? 'design' : 'designs'}
            {filter !== 'all' ? ` in ${label.toLowerCase()}` : ''}
          </p>
        </div>

        <div className="filters" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((c) => {
            const n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={filter === c.id}
                className="filter"
                onClick={() => setFilter(c.id)}
              >
                {c.label}
                <sup>{n}</sup>
              </button>
            );
          })}
        </div>

        <div className="grid" key={filter}>
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} eager={i < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
