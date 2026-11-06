# Pleine Fleur — storefront demo

React + Vite frontend demo. No backend.

    npm install
    npm run dev      # local preview
    npm run build    # production build in dist/

- Product images: `public/img/original` (client photos, unedited); studio versions in `public/img/studio` (the real bag cut out and placed in the beige arch studio), listed in `STUDIO` in `src/data/products.js`. `tools-studio.py` is the script that renders the studio scene.
- Campaign images: `public/img/campaign` (replace a file with the same name to update hero, campaign, magazine, tiles)
- Products: `src/data/products.js` (`featured: true` = shown in the homepage arches)
- Site content: `src/data/site.js` (campaign, social links, delivery fee, footer pages)
- Routes: `#produit-<id>`, `#panier`, `#commande`, `#confirmation`, `#recherche`, `#compte`, `#info-<slug>`
- Checkout, account and newsletter are demo flows: nothing is sent or stored on a server.

## Refinement (November 2026)
- Product details open as a full-screen overlay (`src/pages/ProductOverlay.jsx`) above the page the visitor came from. Retour, Escape and the browser back button close it and return to the same scroll position (`openProduct` / `closeProduct` in `src/router.js`).
- Homepage collection: `COLLECTION` in `src/data/products.js` (six studio images, each tied to its product and colour).
- Hero headline font: Cormorant Garamond (Google Fonts), token `--hero-serif`.

## Collection experience (November 2026)
- Homepage collection = two entry cards (`Gallery` in `src/components/HomeSections.jsx`): The Collection opens the collection browser, The Art of Elegance scrolls to the magazine section.
- Collection browser: `src/pages/Boutique.jsx` (routes `#boutique`, `#boutique-<category>`, `--p2` for page 2). Grids are sized to the screen and paginated, so nothing scrolls. Categories and their cover photos: `SHOP_CATEGORIES` in `src/data/products.js`.
- Product popup: `src/pages/ProductOverlay.jsx`, always fits the viewport. Retour, the close icon, Escape and the browser back button return to the exact previous view (`push` / `backTo` in `src/router.js`).
- Card images: `public/img/campaign/entry-collection.webp` (three studio images side by side) and `entry-elegance.webp` (crop of `portrait.webp`).
