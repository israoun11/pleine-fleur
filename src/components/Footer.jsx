import { useState } from 'react';
import { INFO_PAGES, SOCIAL } from '../data/site.js';
import { href } from '../router.js';
import { ArrowIcon, SocialIcon } from './Icons.jsx';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | error | done

  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <a href={href.home} className="wordmark footer__mark">
          Pleine Fleur
        </a>

        <form
          className="footer__news"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setState(EMAIL.test(email.trim()) ? 'done' : 'error');
          }}
        >
          <label htmlFor="news-email">Join our newsletter</label>
          {state === 'done' ? (
            <p className="footer__note" role="status">
              Merci. Démonstration : votre adresse n'est ni enregistrée ni envoyée.
            </p>
          ) : (
            <>
              <div className="footer__field">
                <input
                  id="news-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === 'error') setState('idle');
                  }}
                  placeholder="Votre adresse e-mail"
                  autoComplete="email"
                  aria-invalid={state === 'error'}
                  aria-describedby={state === 'error' ? 'news-error' : undefined}
                />
                <button type="submit" aria-label="S'inscrire à la newsletter">
                  <ArrowIcon />
                </button>
              </div>
              {state === 'error' && (
                <p id="news-error" className="field-error">
                  Saisissez une adresse e-mail valide, par exemple nom@exemple.com.
                </p>
              )}
            </>
          )}
        </form>

        <ul className="footer__social" aria-label="Réseaux sociaux">
          {SOCIAL.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <SocialIcon id={s.id} />
              </a>
            </li>
          ))}
        </ul>

        <nav className="footer__links" aria-label="Informations">
          {Object.entries(INFO_PAGES).map(([slug, p]) => (
            <a key={slug} href={href.info(slug)}>
              {p.title}
            </a>
          ))}
        </nav>
      </div>
      <p className="wrap footer__base">© {new Date().getFullYear()} Pleine Fleur. Boutique de démonstration.</p>
    </footer>
  );
}
