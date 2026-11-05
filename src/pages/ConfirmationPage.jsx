import { href } from '../router.js';
import OrderSummary from '../components/OrderSummary.jsx';

export default function ConfirmationPage({ order }) {
  if (!order) {
    return (
      <div className="wrap page">
        <div className="empty">
          <p className="empty__big">Aucune commande récente.</p>
          <p>La confirmation s’affiche juste après la validation d’une commande.</p>
          <a href={href.section('collection')} className="btn btn--line">
            Découvrir la collection
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="wrap page confirm">
      <div className="confirm__head">
        <p className="eyebrow">Commande de démonstration</p>
        <h1 className="display display--lg">Merci, {order.customer.name.split(' ')[0]}</h1>
        <p className="confirm__text">
          Votre commande de démonstration est enregistrée sur cette page sous la référence <strong>{order.ref}</strong>.
          Aucune commande n’a été transmise et aucun paiement n’a été effectué.
        </p>
        <p className="confirm__text">
          Livraison prévue : {order.customer.address}, {order.customer.postal} {order.customer.city}, {order.customer.country}.
        </p>
      </div>
      <div className="confirm__summary">
        <OrderSummary lines={order.lines} subtotal={order.subtotal} title="Votre sélection" />
      </div>
      <a href={href.home} className="btn btn--line">
        Retour à l’accueil
      </a>
    </div>
  );
}
