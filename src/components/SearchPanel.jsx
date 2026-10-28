import { useState } from 'react';
import { CATEGORIES, PRODUCTS, img } from '../data/products.js';
import Overlay from './Overlay.jsx';
import { CloseIcon } from './Icons.jsx';

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function SearchPanel({ open, onClose, onOpen }) {
  const [q, setQ] = useState('');
  const term = norm(q.trim());
  const results = term
    ? PRODUCTS.flatMap((p) => {
        const cat = CATEGORIES.find((c) => c.id === p.category)?.label || '';
        const hay = norm(`${p.name} ${cat} ${p.note}`);
        const colourHit = p.variants.findIndex((v) => norm(v.name).includes(term));
        if (colourHit >= 0) return [{ p, i: colourHit }];
        return hay.includes(term) ? [{ p, i: 0 }] : [];
      })
    : [];

  return (
    <Overlay open={open} onClose={onClose} label="Search" variant="top">
      <div className="search">
        <div className="search__bar">
          <label htmlFor="search-input" className="visually-hidden">
            Search by name, colour or category
          </label>
          <input
            id="search-input"
            data-autofocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, colour or category"
            autoComplete="off"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
            <CloseIcon />
          </button>
        </div>
        {!term && (
          <div className="search__hints">
            <span>Try</span>
            {['Serpent', 'Tote', 'Black', 'Cognac', 'Bucket'].map((h) => (
              <button key={h} type="button" className="chip" onClick={() => setQ(h)}>
                {h}
              </button>
            ))}
          </div>
        )}
        {term && (
          <p className="search__count" aria-live="polite">
            {results.length ? `${results.length} ${results.length === 1 ? 'result' : 'results'}` : `Nothing matches “${q}”. Try a colour such as black or cognac.`}
          </p>
        )}
        <ul className="search__results">
          {results.map(({ p, i }) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpen(p.id, i);
                }}
              >
                <img src={img.studioSm(p.variants[i].photo)} alt="" />
                <span>
                  <strong>{p.name}</strong>
                  <em>{p.variants.length > 1 ? `${p.variants[i].name}, ${p.variants.length} colours` : p.variants[0].name}</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Overlay>
  );
}
