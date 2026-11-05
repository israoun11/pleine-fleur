import { CAMPAIGN } from '../data/site.js';

// Full-width campaign hero. The photograph is positioned so the model sits
// to the left of the centred wordmark and the bag stays fully visible; the
// headline sits on the open wall to the right (below the photo on phones).
export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__frame">
        <img
          className="hero__media"
          src={CAMPAIGN.hero}
          alt="A woman in ivory carrying a burgundy Pleine Fleur bag beside flowers"
          fetchpriority="high"
        />
        <div className="hero__shade" aria-hidden="true" />
      </div>
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          Elegance in
          <br />
          Every Detail
        </h1>
      </div>
    </section>
  );
}
