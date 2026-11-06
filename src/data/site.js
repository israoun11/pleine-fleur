// Site-wide content. Edit here: campaign images, social links, footer pages,
// delivery fee. Campaign images live in public/img/campaign/ — replace a file
// with your own photograph of the same name to update the section.

export const CAMPAIGN = {
  hero: 'img/campaign/hero.webp',
  discover: 'img/campaign/discover.webp',
  magazine: 'img/campaign/magazine.webp',
  portrait: 'img/campaign/portrait.webp',
  tileFlowers: 'img/campaign/tile-flowers.webp',
  tileWoman: 'img/campaign/tile-woman.webp',
  tileSeated: 'img/campaign/tile-seated.webp',
  // Homepage collection entry cards
  entryCollection: 'img/campaign/entry-collection.webp', // three studio images side by side
  entryElegance: 'img/campaign/entry-elegance.webp', // crop of portrait.webp
};

// Replace each url with the brand's own profile link.
export const SOCIAL = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
  { id: 'pinterest', label: 'Pinterest', url: 'https://www.pinterest.com/' },
  { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/' },
];

// Delivery fee in TND. null = not set yet: checkout shows "À confirmer"
// and the total excludes delivery.
export const DELIVERY_FEE = null;

export const COUNTRIES = ['Tunisie', 'Algérie', 'Maroc', 'France', 'Belgique', 'Suisse', 'Canada', 'Autre'];

// Footer pages. Text is a placeholder until the client provides it.
export const INFO_PAGES = {
  'service-client': { title: 'Customer Care', lead: 'Service client' },
  livraison: { title: 'Shipping & Returns', lead: 'Livraison et retours' },
  contact: { title: 'Contact', lead: 'Nous contacter' },
  confidentialite: { title: 'Privacy Policy', lead: 'Politique de confidentialité' },
  conditions: { title: 'Terms and Conditions', lead: 'Conditions générales de vente' },
};
