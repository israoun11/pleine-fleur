import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { findProduct } from '../data/products.js';

// Shopping bag, persisted in localStorage. One line per product + colour:
// adding the same product in the same colour raises its quantity.
const BagContext = createContext(null);
const KEY = 'pleine-fleur-bag';
const MAX_QTY = 10;

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(data) ? data.filter((it) => findProduct(it.productId)) : [];
  } catch {
    return [];
  }
}

const same = (a, productId, variant) => a.productId === productId && a.variant === variant;

export function BagProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: the bag still works for this visit */
    }
  }, [items]);

  const api = useMemo(() => {
    const lines = items
      .map((it) => {
        const p = findProduct(it.productId);
        const v = p?.variants.find((x) => x.name === it.variant);
        return p && v ? { ...it, product: p, colour: v, unit: p.price, total: p.price * it.qty } : null;
      })
      .filter(Boolean);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.total, 0),
      maxQty: MAX_QTY,
      add(productId, variant, qty = 1) {
        setItems((prev) => {
          const found = prev.find((it) => same(it, productId, variant));
          if (found) return prev.map((it) => (it === found ? { ...it, qty: Math.min(MAX_QTY, it.qty + qty) } : it));
          return [...prev, { productId, variant, qty: Math.min(MAX_QTY, qty) }];
        });
      },
      setQty(productId, variant, qty) {
        setItems((prev) =>
          prev
            .map((it) => (same(it, productId, variant) ? { ...it, qty: Math.min(MAX_QTY, qty) } : it))
            .filter((it) => it.qty > 0)
        );
      },
      remove(productId, variant) {
        setItems((prev) => prev.filter((it) => !same(it, productId, variant)));
      },
      clear() {
        setItems([]);
      },
    };
  }, [items]);

  return <BagContext.Provider value={api}>{children}</BagContext.Provider>;
}

export const useBag = () => useContext(BagContext);
