import { useBag } from '../context/BagContext.jsx';
import { formatPrice, img } from '../data/products.js';
import { href } from '../router.js';
import QtyStepper from '../components/QtyStepper.jsx';

export default function BagPage() {
  const bag = useBag();
  return (
    <div className="wrap page">
      <h1 className="display display--lg page__title">Votre panier</h1>
      {bag.lines.length === 0 ? (
        <div className="empty">
          <p className="empty__big">Votre panier est vide.</p>
          <p>Choisissez une couleur sur une pièce de la collection, puis ajoutez-la ici.</p>
          <a href={href.section('collection')} className="btn btn--line">
            Découvrir la collection
          </a>
        </div>
      ) : (
        <div className="bag">
          <ul className="bag__lines">
            {bag.lines.map((l) => (
              <li key={`${l.productId}-${l.variant}`} className="line">
                <a href={href.product(l.productId)} className="line__img">
                  <img src={img.view(l.colour.photo)} alt={`${l.product.name} en ${l.variant}`} />
                </a>
                <div className="line__info">
                  <a href={href.product(l.productId)} className="line__name">
                    {l.product.name}
                  </a>
                  <p className="line__meta">Couleur : {l.variant}</p>
                  <p className="line__meta">Prix unitaire : {formatPrice(l.unit)}</p>
                  <div className="line__controls">
                    <QtyStepper
                      value={l.qty}
                      onChange={(q) => bag.setQty(l.productId, l.variant, q)}
                      max={bag.maxQty}
                      label={`Quantité de ${l.product.name}`}
                    />
                    <button type="button" className="textlink line__remove" onClick={() => bag.remove(l.productId, l.variant)}>
                      Retirer
                    </button>
                  </div>
                </div>
                <p className="line__total">{formatPrice(l.total)}</p>
              </li>
            ))}
          </ul>
          <aside className="bag__summary" aria-label="Récapitulatif">
            <p className="summary__row">
              <span>
                Sous-total ({bag.count} article{bag.count > 1 ? 's' : ''})
              </span>
              <span>{formatPrice(bag.subtotal)}</span>
            </p>
            <p className="summary__hint">Livraison calculée à l'étape suivante.</p>
            <a href={href.checkout} className="btn btn--solid btn--wide">
              Passer la commande
            </a>
            <a href={href.section('collection')} className="btn btn--line btn--wide">
              Continuer mes achats
            </a>
          </aside>
        </div>
      )}
    </div>
  );
}
