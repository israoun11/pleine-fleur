import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const BagContext = createContext(null);
const KEY = 'pleine-fleur-bag';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function BagProvider({ children }) {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: the bag still works for this visit */
    }
  }, [items]);

  const api = useMemo(() => {
    const keyOf = (productId, variant) => `${productId}::${variant}`;
    return {
      items,
      open,
      setOpen,
      count: items.reduce((n, it) => n + it.qty, 0),
      add(productId, variant) {
        setItems((prev) => {
          const k = keyOf(productId, variant);
          const found = prev.find((it) => keyOf(it.productId, it.variant) === k);
          if (found) return prev.map((it) => (it === found ? { ...it, qty: it.qty + 1 } : it));
          return [...prev, { productId, variant, qty: 1 }];
        });
      },
      setQty(productId, variant, qty) {
        setItems((prev) =>
          prev
            .map((it) => (keyOf(it.productId, it.variant) === keyOf(productId, variant) ? { ...it, qty } : it))
            .filter((it) => it.qty > 0)
        );
      },
      clear() {
        setItems([]);
      },
    };
  }, [items, open]);

  return <BagContext.Provider value={api}>{children}</BagContext.Provider>;
}

export const useBag = () => useContext(BagContext);
