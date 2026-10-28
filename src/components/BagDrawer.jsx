import { useState } from 'react';
import { findProduct, img } from '../data/products.js';
import { useBag } from '../context/BagContext.jsx';
import Overlay from './Overlay.jsx';
import { CloseIcon } from './Icons.jsx';

export default function BagDrawer() {
  const bag = useBag();
  const [requested, setRequested] = useState(false);
  const close = () => {
    bag.setOpen(false);
    setRequested(false);
  };

  return (
    <Overlay open={bag.open} onClose={close} label="Your bag">
      <div className="drawer">
        <div className="drawer__head">
          <h2>Your bag</h2>
          <button type="button" className="icon-btn" onClick={close} aria-label="Close bag" data-autofocus>
            <CloseIcon />
          </button>
        </div>

        {requested ? (
          <div className="drawer__empty">
            <p className="drawer__big">Request prepared</p>
            <p>
              This is a demonstration store, so nothing has been sent and no payment was taken. In the live
              site, this step would pass your selection to the boutique to confirm price and availability.
            </p>
            <button
              type="button"
              className="btn btn--line"
              onClick={() => {
                bag.clear();
                close();
              }}
            >
              Clear bag and continue
            </button>
          </div>
        ) : bag.items.length === 0 ? (
          <div className="drawer__empty">
            <p className="drawer__big">Your bag is empty</p>
            <p>Choose a colour on any bag, then add it here.</p>
            <a href="#collection" className="btn btn--line" onClick={close}>
              Browse the collection
            </a>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {bag.items.map((it) => {
                const p = findProduct(it.productId);
                const v = p?.variants.find((x) => x.name === it.variant);
                if (!p || !v) return null;
                return (
                  <li key={`${it.productId}-${it.variant}`} className="line">
                    <img src={img.studioSm(v.photo)} alt="" className="line__img" />
                    <div className="line__info">
                      <p className="line__name">{p.name}</p>
                      <p className="line__colour">{v.name}</p>
                      <div className="qty" role="group" aria-label={`Quantity of ${p.name}`}>
                        <button
                          type="button"
                          aria-label="Remove one"
                          onClick={() => bag.setQty(it.productId, it.variant, it.qty - 1)}
                        >
                          −
                        </button>
                        <span aria-live="polite">{it.qty}</span>
                        <button type="button" aria-label="Add one" onClick={() => bag.setQty(it.productId, it.variant, it.qty + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="textlink line__remove"
                      onClick={() => bag.setQty(it.productId, it.variant, 0)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="drawer__foot">
              <p className="drawer__total">
                <span>{bag.count} {bag.count === 1 ? 'piece' : 'pieces'}</span>
                <span>Price on request</span>
              </p>
              <button type="button" className="btn btn--solid btn--wide" onClick={() => setRequested(true)}>
                Request availability
              </button>
              <p className="drawer__fine">Demo checkout. No order is placed and no payment is taken.</p>
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
}
