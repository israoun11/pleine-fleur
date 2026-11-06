// Pleine Fleur catalogue (demo).
// Every image is one of the client's own photographs, exactly as supplied
// (each cut out of the original WhatsApp collage, no edits): img/original/<id>.png
//
// Each product supports: id, name, price (TND), category, note (short
// description), variants (colour name, swatch hex, photo id, extra photos),
// featured (shown in the homepage arches), stock, materials, dimensions, care.
// Names are working descriptions. Materials, dimensions, care and stock were
// not supplied: they stay null and the product page shows an editable
// placeholder until the client provides them.

export const CATEGORIES = [
  { id: 'all', label: 'All bags' },
  { id: 'top-handle', label: 'Top handle' },
  { id: 'tote', label: 'Totes' },
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'crossbody', label: 'Crossbody' },
  { id: 'bucket', label: 'Bucket' },
  { id: 'summer', label: 'Summer weaves' },
];

const v = (name, hex, photo, extra = []) => ({ name, hex, photo, extra });
// Details the client still has to supply (null = show placeholder).
const PENDING = { stock: null, materials: null, dimensions: null, care: null };

export const PRODUCTS = [
  // (each entry gets the PENDING fields below)
  {
    id: 'serpent-top-handle',
    price: 590, // TND, same for every colour
    name: 'Serpent Top-Handle',
    category: 'top-handle',
    note: 'Structured trapeze body with a scalloped flap and the serpent clasp.',
    variants: [
      v('Periwinkle', '#8792b8', 'i2_20'),
      v('Mauve', '#a88686', 'i2_11'),
      v('Chocolate', '#6e4335', 'i1_10'),
      v('Taupe', '#a99c90', 'i1_11'),
    ],
  },
  {
    id: 'chain-pocket-tote',
    price: 545, // TND, same for every colour
    name: 'Chain Pocket Tote',
    category: 'tote',
    note: 'Twin handles, a zipped front pocket and a draped chain with studded tab.',
    variants: [
      v('Pearl grey', '#c3c5c8', 'i3_00'),
      v('Slate', '#6f727a', 'i3_01'),
      v('Black', '#1b1e1f', 'i2_21'),
    ],
  },
  {
    id: 'drawstring-bucket',
    price: 560, // TND, same for every colour
    name: 'Drawstring Bucket',
    category: 'bucket',
    note: 'Tall bucket with a gathered inner drawstring pouch and long shoulder strap.',
    variants: [
      v('Cognac', '#a8662f', 'i6_00'),
      v('Teal', '#2a6a80', 'i6_01'),
      v('Coral', '#c96a70', 'i6_10'),
    ],
  },
  {
    id: 'pocket-satchel',
    price: 575, // TND, same for every colour
    name: 'Pocket Satchel',
    category: 'top-handle',
    note: 'Flap-front satchel with side pockets, short handle and detachable strap.',
    variants: [
      v('Red', '#c33a35', 'i4_10'),
      v('Cognac', '#6b3324', 'i4_20'),
      v('White', '#e6e6e8', 'i4_21'),
    ],
  },
  {
    id: 'clear-tote',
    price: 520, // TND, same for every colour
    name: 'Clear Overlay Tote',
    category: 'summer',
    note: 'Transparent shell over a coloured inner bag with a turn-lock flap.',
    variants: [
      v('Mustard', '#c49340', 'i5_11'),
      v('Cream', '#ddd0c3', 'i5_20'),
      v('Black', '#2a2b28', 'i5_21'),
    ],
  },
  {
    id: 'slouch-hobo',
    featured: true,
    price: 535, // TND, same for every colour
    name: 'Slouch Hobo',
    category: 'shoulder',
    note: 'Soft gathered body on a single shoulder strap.',
    variants: [
      v('Burgundy', '#5a2526', 'i3_21'),
      v('Red', '#9a2e36', 'i4_01'),
      v('Black', '#1b1f20', 'i4_00'),
    ],
  },
  {
    id: 'camera-crossbody',
    price: 510, // TND, same for every colour
    name: 'Camera Crossbody',
    category: 'crossbody',
    note: 'Compact zip-around crossbody with a front slip pocket.',
    variants: [
      v('Orange', '#e07450', 'i3_11'),
      v('Pink', '#ea8aa6', 'i3_20'),
    ],
  },
  {
    id: 'zip-pocket-satchel',
    price: 555, // TND, same for every colour
    name: 'Zip-Pocket Satchel',
    category: 'top-handle',
    note: 'Top-handle satchel with a zipped front pocket, tassel pulls and side pockets.',
    variants: [
      v('Navy', '#1d2a33', 'i4_11'),
      v('Fuchsia', '#c24f7a', 'i5_00'),
    ],
  },
  {
    id: 'push-lock-tote',
    featured: true,
    price: 580, // TND, same for every colour
    name: 'Push-Lock Tote',
    category: 'tote',
    note: 'Upright tote with a croc-effect finish, gold push-lock and long handles.',
    variants: [v('Ice white', '#d6d9e0', 'i5_10', ['i5_01'])],
  },
  {
    id: 'serpent-houndstooth',
    price: 595, // TND, same for every colour
    name: 'Serpent Houndstooth',
    category: 'top-handle',
    note: 'The serpent clasp on a bold houndstooth body with matching handle.',
    variants: [v('Black and ecru', '#2a2119', 'i1_00')],
  },
  {
    id: 'serpent-textured',
    price: 585, // TND, same for every colour
    name: 'Serpent Textured',
    category: 'top-handle',
    note: 'Serpent flap bag in a pale blue reptile-effect finish with a printed handle.',
    variants: [v('Ice blue', '#a9cbe5', 'i6_11')],
  },
  {
    id: 'quilted-tassel',
    price: 540, // TND, same for every colour
    name: 'Quilted Tassel Bag',
    category: 'top-handle',
    note: 'Diamond-quilted body with twin handles and tassels at each side.',
    variants: [v('Emerald', '#35602a', 'i1_20')],
  },
  {
    id: 'bow-satchel',
    price: 525, // TND, same for every colour
    name: 'Bow Satchel',
    category: 'top-handle',
    note: 'Contrast-stitched satchel closed with a small gold bow.',
    variants: [v('Black', '#191b1a', 'i3_10')],
  },
  {
    id: 'buckle-tote',
    price: 565, // TND, same for every colour
    name: 'Buckle Tote',
    category: 'tote',
    note: 'Wide open tote with buckled side straps and long handles.',
    variants: [v('Cognac', '#a55a2a', 'i1_01')],
  },
  {
    id: 'python-tote',
    price: 570, // TND, same for every colour
    name: 'Python-Print Tote',
    category: 'tote',
    note: 'Shoulder tote in a python print with twin zipped side panels.',
    variants: [v('Python', '#a4b1b5', 'i2_10')],
  },
  {
    id: 'straw-frame-tote',
    price: 530, // TND, same for every colour
    name: 'Straw Frame Tote',
    category: 'summer',
    note: 'Straw panel framed in tan with rounded handle tabs.',
    variants: [v('Natural', '#d8c39d', 'i1_21')],
  },
  {
    id: 'woven-basket',
    featured: true,
    price: 505, // TND, same for every colour
    name: 'Woven Basket',
    category: 'summer',
    note: 'Open woven basket bag piped in black with a name plate.',
    variants: [v('Natural', '#8a5a30', 'i2_00')],
  },
  {
    id: 'jacquard-tote',
    price: 515, // TND, same for every colour
    name: 'Jacquard Mini Tote',
    category: 'summer',
    note: 'Small tote in a black and ecru zigzag weave with black trims.',
    variants: [v('Black and ecru', '#5c442e', 'i2_01')],
  },
];

export const PRODUCTS_FULL = PRODUCTS.map((p) => ({ ...PENDING, ...p }));

// Original photographs, unedited: img/original/<id>.png
// Studio versions (the real bag cut out and placed in the beige arch studio)
// exist only where the cut-out is complete and accurate: img/studio/<id>.webp.
// Every other photo is shown as the original.
export const STUDIO = new Set(['i3_21', 'i4_00', 'i4_01', 'i5_10', 'i5_01', 'i2_00']);
const original = (id) => `img/original/${id}.png`;
export const isStudio = (id) => STUDIO.has(id);
export const img = {
  original,
  view: (id) => (STUDIO.has(id) ? `img/studio/${id}.webp` : original(id)),
  // kept for older call sites
  studio: original,
  studioSm: original,
  life: original,
  cut: original,
};

export const formatPrice = (n) => `${Number(n).toLocaleString('fr-FR')} TND`;

export const findProduct = (id) => PRODUCTS_FULL.find((p) => p.id === id);
const FEATURED_ORDER = ['slouch-hobo', 'push-lock-tote', 'woven-basket'];
export const FEATURED = FEATURED_ORDER.map((id) => PRODUCTS_FULL.find((p) => p.id === id)).filter(Boolean);
// Homepage collection: the six studio images, each tied to its real
// product and colour (vi = colour index on that product).
const COLLECTION_PHOTOS = ['i3_21', 'i5_10', 'i2_00', 'i4_00', 'i4_01', 'i5_01'];
export const COLLECTION = COLLECTION_PHOTOS.map((photo) => {
  const product = PRODUCTS_FULL.find((p) => p.variants.some((v) => v.photo === photo || v.extra.includes(photo)));
  const vi = product.variants.findIndex((v) => v.photo === photo || v.extra.includes(photo));
  return { product, vi, photo };
});
// First photo of a product that has a studio version (homepage cover).
export const studioCover = (p) => p.variants.findIndex((v) => STUDIO.has(v.photo));
export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || '';
// All photographs of a product, one per colour plus any extra angles.
export const photosOf = (p) =>
  p.variants.flatMap((v, vi) => [v.photo, ...v.extra].map((photo) => ({ photo, vi, colour: v.name })));

// ---- Collection browser -------------------------------------------------
// Categories shown in the collection interface (every category that has
// products), with the photograph used for each category card.
const CATEGORY_NAMES = {
  'top-handle': 'Top Handle Bags',
  tote: 'Tote Bags',
  shoulder: 'Shoulder Bags',
  crossbody: 'Crossbody Bags',
  bucket: 'Bucket Bags',
  summer: 'Summer Weaves',
};
const CATEGORY_COVER = { 'top-handle': 'i2_20', tote: 'i5_10', shoulder: 'i3_21', crossbody: 'i3_11', bucket: 'i6_01', summer: 'i2_00' };
export const SHOP_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'all')
  .map((c) => ({ id: c.id, name: CATEGORY_NAMES[c.id] || c.label, cover: CATEGORY_COVER[c.id], products: PRODUCTS_FULL.filter((p) => p.category === c.id) }))
  .filter((c) => c.products.length > 0);
export const findCategory = (id) => SHOP_CATEGORIES.find((c) => c.id === id);
// Photo used for a product in grids: its first studio colour, else colour 1.
export const coverOf = (p) => {
  const vi = Math.max(0, studioCover(p));
  return { vi, photo: p.variants[vi].photo };
};
