import { useState } from 'react';
import { CATEGORIES } from '../data/products.js';

export default function Footer({ onFilter }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <p className="wordmark wordmark--footer">Pleine Fleur</p>
          <form
            className="newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes('@')) setSent(true);
            }}
          >
            <label htmlFor="newsletter-email">Hear about new colours first</label>
            {sent ? (
              <p className="newsletter__done" role="status">
                Thank you. In this demo your address is not stored or sent.
              </p>
            ) : (
              <div className="newsletter__row">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                />
                <button type="submit" className="btn btn--solid">
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>

        <nav className="footer__col" aria-label="Shop">
          <p className="footer__h">Shop</p>
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href="#collection"
              onClick={() => onFilter(c.id)}
              className="footer__link"
            >
              {c.label}
            </a>
          ))}
        </nav>

        <nav className="footer__col" aria-label="The house">
          <p className="footer__h">The house</p>
          <a href="#serpent" className="footer__link">The serpent clasp</a>
          <a href="#summer" className="footer__link">Summer weaves</a>
        </nav>

        <div className="footer__col">
          <p className="footer__h">Contact</p>
          <p className="footer__placeholder">Boutique address, phone and opening hours will appear here.</p>
          <p className="footer__placeholder">Instagram and WhatsApp links to be added.</p>
        </div>
      </div>
      <div className="wrap footer__base">
        <p>© {new Date().getFullYear()} Pleine Fleur</p>
        <p>Demonstration storefront. Product details, prices and availability to be confirmed.</p>
      </div>
    </footer>
  );
}
