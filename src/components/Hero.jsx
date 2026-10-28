import { img } from '../data/products.js';

// One large campaign photograph, edge to edge, with a white label button,
// as on the reference homepage.
export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Pleine Fleur collection">
      <img
        src={img.life('i2_20')}
        alt="Serpent Top-Handle in periwinkle"
        className="hero__photo"
        fetchpriority="high"
      />
      <h1 className="visually-hidden">Pleine Fleur handbags</h1>
      <a href="#collection" className="label-btn hero__cta">
        Discover the collection
      </a>
    </section>
  );
}
