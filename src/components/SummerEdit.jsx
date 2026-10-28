import { PRODUCTS, img } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

const SUMMER = PRODUCTS.filter((p) => p.category === 'summer');

export default function SummerEdit({ onOpen }) {
  return (
    <section className="summer" id="summer" aria-labelledby="summer-title">
      <div className="wrap summer__grid">
        <div className="summer__lead">
          <h2 id="summer-title" className="section-title section-title--xl">
            Summer weaves
          </h2>
          <p>Straw, woven jacquard and a clear overlay tote for the warm months.</p>
          <img className="summer__photo" src={img.life('i2_01')} alt="The Jacquard Mini Tote, held up in a wheat field" loading="lazy" />
        </div>
        <div className="summer__cards">
          {SUMMER.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
