import { formatPrice, img } from '../data/products.js';
import { DELIVERY_FEE } from '../data/site.js';

export const totals = (subtotal) => ({
  subtotal,
  delivery: DELIVERY_FEE,
  total: subtotal + (DELIVERY_FEE ?? 0),
});

export default function OrderSummary({ lines, subtotal, title = 'Récapitulatif' }) {
  const t = totals(subtotal);
  return (
    <div className="summary">
      <h2 className="summary__title">{title}</h2>
      <ul className="summary__lines">
        {lines.map((l) => (
          <li key={`${l.productId}-${l.variant}`}>
            <span className="summary__img">
              <img src={img.view(l.colour.photo)} alt="" />
              <span className="summary__qty">{l.qty}</span>
            </span>
            <span className="summary__name">
              {l.product.name}
              <em>
                {l.variant} · {l.qty} × {formatPrice(l.unit)}
              </em>
            </span>
            <span>{formatPrice(l.total)}</span>
          </li>
        ))}
      </ul>
      <p className="summary__row">
        <span>Sous-total</span>
        <span>{formatPrice(t.subtotal)}</span>
      </p>
      <p className="summary__row">
        <span>Livraison</span>
        <span>{t.delivery === null ? 'À confirmer' : formatPrice(t.delivery)}</span>
      </p>
      <p className="summary__row summary__row--total">
        <span>Total{t.delivery === null ? ' (hors livraison)' : ''}</span>
        <span>{formatPrice(t.total)}</span>
      </p>
    </div>
  );
}
