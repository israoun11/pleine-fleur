# Pleine Fleur — storefront demo

React + Vite frontend demo. No backend.

    npm install
    npm run dev      # local preview
    npm run build    # production build in dist/

- Catalogue: `src/data/products.js` (models, colour variants, swatch hex, photo ids)
- Images: `public/img/original` — the client's photos exactly as supplied (cut from the original collages, no edits)
- Product names are working descriptions; prices, materials and sizes are not set ("Price on request").
- Checkout is a demo: "Request availability" sends nothing.
