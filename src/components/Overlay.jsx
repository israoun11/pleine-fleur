import { useEffect, useRef } from 'react';

// Shared shell for the product view, bag, search and mobile menu:
// locks page scroll, closes on Escape, keeps Tab focus inside and
// returns focus to whatever opened it.
export default function Overlay({ open, onClose, label, variant = 'right', children }) {
  const panel = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const y = window.scrollY;
    html.style.overflow = 'hidden';
    const t = setTimeout(() => {
      const first = panel.current?.querySelector('[data-autofocus]') || panel.current;
      first?.focus({ preventScroll: true });
    }, 30);

    const onKey = (e) => {
      // only the topmost layer reacts
      const layers = document.querySelectorAll('.overlay');
      if (panel.current && layers[layers.length - 1] !== panel.current.closest('.overlay')) return;
      if (e.key === 'Escape') closeRef.current();
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll(
          'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevOverflow;
      // Back exactly where the visitor was, without a smooth-scroll animation.
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, behavior: 'instant' });
      prev?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className={`overlay overlay--${variant}`}>
      <div className="overlay__scrim" onClick={onClose} aria-hidden="true" />
      <div className="overlay__panel" role="dialog" aria-modal="true" aria-label={label} ref={panel} tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}
