import { useState } from 'react';
import { useBag } from '../context/BagContext.jsx';
import { COUNTRIES } from '../data/site.js';
import { go, href } from '../router.js';
import OrderSummary, { totals } from '../components/OrderSummary.jsx';

const FIELDS = [
  { id: 'name', label: 'Nom complet', auto: 'name', group: 'client' },
  { id: 'email', label: 'E-mail', type: 'email', auto: 'email', group: 'client' },
  { id: 'phone', label: 'Téléphone', type: 'tel', auto: 'tel', group: 'client' },
  { id: 'country', label: 'Pays', group: 'delivery', select: true },
  { id: 'city', label: 'Ville', auto: 'address-level2', group: 'delivery' },
  { id: 'address', label: 'Adresse', auto: 'street-address', group: 'delivery', wide: true },
  { id: 'postal', label: 'Code postal', auto: 'postal-code', group: 'delivery' },
];

export function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Indiquez votre nom complet.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Saisissez une adresse e-mail valide.';
  if (v.phone.replace(/\D/g, '').length < 8) e.phone = 'Saisissez un numéro d’au moins 8 chiffres.';
  if (!v.country) e.country = 'Choisissez un pays.';
  if (v.city.trim().length < 2) e.city = 'Indiquez votre ville.';
  if (v.address.trim().length < 5) e.address = 'Indiquez votre adresse de livraison.';
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(v.postal.trim())) e.postal = 'Saisissez un code postal valide (3 à 10 caractères).';
  return e;
}

export default function CheckoutPage({ onConfirmed }) {
  const bag = useBag();
  const [v, setV] = useState({ name: '', email: '', phone: '', country: 'Tunisie', city: '', address: '', postal: '' });
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false);

  if (bag.lines.length === 0) {
    return (
      <div className="wrap page">
        <h1 className="display display--lg page__title">Commande</h1>
        <div className="empty">
          <p className="empty__big">Votre panier est vide.</p>
          <p>Ajoutez une pièce à votre panier avant de passer commande.</p>
          <a href={href.section('collection')} className="btn btn--line">
            Découvrir la collection
          </a>
        </div>
      </div>
    );
  }

  const set = (k) => (e) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (tried) setErrors(validate(next));
  };

  const submit = (e) => {
    e.preventDefault();
    setTried(true);
    const errs = validate(v);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    const t = totals(bag.subtotal);
    onConfirmed({
      ref: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      customer: { ...v },
      lines: bag.lines.map(({ productId, variant, qty, unit, total, product, colour }) => ({ productId, variant, qty, unit, total, product, colour })),
      ...t,
    });
    bag.clear();
    go(href.confirmation);
  };

  const field = (f) => (
    <div className={`field ${f.wide ? 'field--wide' : ''}`} key={f.id}>
      <label htmlFor={`co-${f.id}`}>{f.label}</label>
      {f.select ? (
        <select id={`co-${f.id}`} value={v[f.id]} onChange={set(f.id)} aria-invalid={!!errors[f.id]}>
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      ) : (
        <input
          id={`co-${f.id}`}
          type={f.type || 'text'}
          value={v[f.id]}
          onChange={set(f.id)}
          autoComplete={f.auto}
          aria-invalid={!!errors[f.id]}
          aria-describedby={errors[f.id] ? `co-${f.id}-err` : undefined}
        />
      )}
      {errors[f.id] && (
        <p className="field-error" id={`co-${f.id}-err`}>
          {errors[f.id]}
        </p>
      )}
    </div>
  );

  return (
    <div className="wrap page">
      <h1 className="display display--lg page__title">Commande</h1>
      <p className="demo-note">
        Boutique de démonstration : aucune commande n’est transmise et aucun paiement n’est effectué.
      </p>
      <div className="checkout">
        <form className="checkout__form" noValidate onSubmit={submit}>
          <fieldset>
            <legend>Vos coordonnées</legend>
            <div className="fields">{FIELDS.filter((f) => f.group === 'client').map(field)}</div>
          </fieldset>
          <fieldset>
            <legend>Livraison</legend>
            <div className="fields">{FIELDS.filter((f) => f.group === 'delivery').map(field)}</div>
          </fieldset>
          {tried && Object.keys(errors).length > 0 && (
            <p className="form-error" role="alert">
              Vérifiez les champs signalés ci-dessus.
            </p>
          )}
          <button type="submit" className="btn btn--solid btn--wide">
            Confirmer la commande
          </button>
          <a href={href.bag} className="textlink checkout__back">
            Retour au panier
          </a>
        </form>
        <aside className="checkout__summary">
          <OrderSummary lines={bag.lines} subtotal={bag.subtotal} />
        </aside>
      </div>
    </div>
  );
}
