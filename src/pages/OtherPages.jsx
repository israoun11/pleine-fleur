import { useState } from 'react';
import { PRODUCTS_FULL } from '../data/products.js';
import { INFO_PAGES } from '../data/site.js';
import { href } from '../router.js';
import ArchCard from '../components/ArchCard.jsx';

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function SearchPage() {
  const [q, setQ] = useState('');
  const term = norm(q.trim());
  const results = term ? PRODUCTS_FULL.filter((p) => norm(p.name).includes(term)) : [];
  return (
    <div className="wrap page search">
      <h1 className="visually-hidden">Rechercher</h1>
      <div className="search__bar">
        <label htmlFor="search-q" className="visually-hidden">
          Rechercher un sac par son nom
        </label>
        <input
          id="search-q"
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un sac"
          autoComplete="off"
        />
      </div>
      {!term && (
        <div className="search__hints">
          <span>Suggestions</span>
          {['Serpent', 'Tote', 'Bucket', 'Satchel'].map((h) => (
            <button key={h} type="button" className="chip" onClick={() => setQ(h)}>
              {h}
            </button>
          ))}
        </div>
      )}
      {term && results.length === 0 && (
        <div className="empty empty--search">
          <p className="empty__big">Aucun sac ne correspond à « {q.trim()} ».</p>
          <p>Essayez un autre nom, par exemple Serpent ou Tote.</p>
        </div>
      )}
      {results.length > 0 && (
        <>
          <p className="search__count" aria-live="polite">
            {results.length} résultat{results.length > 1 ? 's' : ''}
          </p>
          <div className="search__grid">
            {results.map((p) => (
              <ArchCard key={p.id} product={p} size="sm" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function AccountPage() {
  const [mode, setMode] = useState('login');
  const [v, setV] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const isNew = mode === 'register';

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (isNew && v.name.trim().length < 2) er.name = 'Indiquez votre nom.';
    if (!EMAIL.test(v.email.trim())) er.email = 'Saisissez une adresse e-mail valide.';
    if (v.password.length < 8) er.password = 'Le mot de passe doit contenir au moins 8 caractères.';
    setErrors(er);
    if (Object.keys(er).length) return;
    setDone(true);
  };
  const switchTo = (m) => {
    setMode(m);
    setErrors({});
    setDone(false);
  };
  const input = (id, label, type, auto) => (
    <div className="field field--wide">
      <label htmlFor={`acc-${id}`}>{label}</label>
      <input
        id={`acc-${id}`}
        type={type}
        value={v[id]}
        autoComplete={auto}
        onChange={(e) => setV({ ...v, [id]: e.target.value })}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `acc-${id}-err` : undefined}
      />
      {errors[id] && (
        <p className="field-error" id={`acc-${id}-err`}>
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <div className="wrap page account">
      <div className="account__card">
        <h1 className="display display--md">Mon compte</h1>
        <div className="tabs" role="tablist" aria-label="Compte">
          <button type="button" role="tab" aria-selected={!isNew} onClick={() => switchTo('login')}>
            Se connecter
          </button>
          <button type="button" role="tab" aria-selected={isNew} onClick={() => switchTo('register')}>
            Créer un compte
          </button>
        </div>
        {done ? (
          <div className="account__done" role="status">
            <p className="empty__big">{isNew ? 'Compte de démonstration' : 'Connexion de démonstration'}</p>
            <p>
              Démonstration : {isNew ? 'aucun compte n’est créé' : 'aucune connexion n’est effectuée'} et aucune donnée
              n’est enregistrée. Les comptes clients seront reliés lors de la mise en ligne.
            </p>
            <a href={href.section('collection')} className="btn btn--line">
              Découvrir la collection
            </a>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="account__form">
            {isNew && input('name', 'Nom complet', 'text', 'name')}
            {input('email', 'E-mail', 'email', 'email')}
            {input('password', 'Mot de passe', 'password', isNew ? 'new-password' : 'current-password')}
            <button type="submit" className="btn btn--solid btn--wide">
              {isNew ? 'Créer mon compte' : 'Se connecter'}
            </button>
            <p className="demo-note">Fonction de démonstration : aucun compte réel n’est utilisé.</p>
          </form>
        )}
      </div>
    </div>
  );
}

export function InfoPage({ slug }) {
  const p = INFO_PAGES[slug];
  return (
    <div className="wrap page info">
      <p className="eyebrow">{p.lead}</p>
      <h1 className="display display--lg">{p.title}</h1>
      <p className="placeholder">Contenu à fournir par Pleine Fleur. Cette page est prête à recevoir le texte définitif.</p>
      <a href={href.home} className="btn btn--line">
        Retour à l’accueil
      </a>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="wrap page">
      <div className="empty">
        <p className="empty__big">Cette page n’existe pas.</p>
        <p>Le lien est peut-être incomplet. Retrouvez toutes les pièces dans la collection.</p>
        <a href={href.section('collection')} className="btn btn--line">
          Découvrir la collection
        </a>
      </div>
    </div>
  );
}
