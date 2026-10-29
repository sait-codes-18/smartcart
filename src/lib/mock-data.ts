// =============================================================================
// Quick Compare — Mock Product & Listing Data
// =============================================================================

import type {
  AvailabilityStatus,
  DataSource,
  PlatformId,
  PlatformListing,
  Product,
} from '@/types';

// -----------------------------------------------------------------------------
// Products (30+ realistic Indian grocery products)
// -----------------------------------------------------------------------------

/** Complete catalogue of mock products */
export const MOCK_PRODUCTS: Product[] = [
  // ── Dairy ──────────────────────────────────────────────────────────────────
  {
    id: 'prod-001',
    name: 'Amul Taza Toned Fresh Milk',
    brand: 'Amul',
    category: 'dairy',
    description: 'Taza toned fresh milk, pasteurised and homogenised. Rich in calcium and protein.',
    imageUrl: '/images/products/amul-taza-milk.webp',
    unit: '1 L',
    tags: ['milk', 'toned', 'fresh', 'daily-essentials'],
  },
  {
    id: 'prod-002',
    name: 'Amul Butter',
    brand: 'Amul',
    category: 'dairy',
    description: 'Pasteurised butter made from fresh cream. The taste of India.',
    imageUrl: '/images/products/amul-butter.webp',
    unit: '500 g',
    tags: ['butter', 'spread', 'daily-essentials'],
  },
  {
    id: 'prod-003',
    name: 'Mother Dairy Classic Curd',
    brand: 'Mother Dairy',
    category: 'dairy',
    description: 'Fresh, thick curd made from toned milk. Smooth and creamy.',
    imageUrl: '/images/products/mother-dairy-curd.webp',
    unit: '400 g',
    tags: ['curd', 'yogurt', 'probiotic', 'daily-essentials'],
  },
  {
    id: 'prod-004',
    name: 'Amul Taaza Paneer',
    brand: 'Amul',
    category: 'dairy',
    description: 'Fresh paneer block, made from pure cow milk. Soft and smooth.',
    imageUrl: '/images/products/amul-paneer.webp',
    unit: '200 g',
    tags: ['paneer', 'cottage-cheese', 'protein'],
  },

  // ── Groceries ──────────────────────────────────────────────────────────────
  {
    id: 'prod-005',
    name: 'Aashirvaad Superior MP Atta',
    brand: 'Aashirvaad',
    category: 'groceries',
    description: '100% whole wheat atta from the finest MP wheat. Soft rotis guaranteed.',
    imageUrl: '/images/products/aashirvaad-atta.webp',
    unit: '5 kg',
    tags: ['atta', 'flour', 'wheat', 'staples'],
  },
  {
    id: 'prod-006',
    name: 'India Gate Basmati Rice — Feast Rozzana',
    brand: 'India Gate',
    category: 'groceries',
    description: 'Premium everyday basmati rice. Long grain, aromatic.',
    imageUrl: '/images/products/india-gate-rice.webp',
    unit: '5 kg',
    tags: ['rice', 'basmati', 'staples'],
  },
  {
    id: 'prod-007',
    name: 'Tata Salt',
    brand: 'Tata',
    category: 'groceries',
    description: 'Vacuum evaporated iodised salt. Desh ka namak.',
    imageUrl: '/images/products/tata-salt.webp',
    unit: '1 kg',
    tags: ['salt', 'iodised', 'staples'],
  },
  {
    id: 'prod-008',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    brand: 'Fortune',
    category: 'groceries',
    description: 'Light and healthy refined sunflower oil. Rich in Vitamin E.',
    imageUrl: '/images/products/fortune-oil.webp',
    unit: '1 L',
    tags: ['oil', 'cooking-oil', 'sunflower', 'staples'],
  },
  {
    id: 'prod-009',
    name: 'Tata Sampann Toor Dal',
    brand: 'Tata',
    category: 'groceries',
    description: 'Unpolished toor dal, rich in protein. Cooks faster.',
    imageUrl: '/images/products/tata-toor-dal.webp',
    unit: '1 kg',
    tags: ['dal', 'pulses', 'lentils', 'staples'],
  },
  {
    id: 'prod-010',
    name: 'Madhur Sugar',
    brand: 'Madhur',
    category: 'groceries',
    description: 'Pure and hygienic sulphur-free refined sugar.',
    imageUrl: '/images/products/madhur-sugar.webp',
    unit: '1 kg',
    tags: ['sugar', 'staples'],
  },

  // ── Snacks ─────────────────────────────────────────────────────────────────
  {
    id: 'prod-011',
    name: 'Lay\'s Classic Salted Potato Chips',
    brand: 'Lay\'s',
    category: 'snacks',
    description: 'Crispy, classic salted potato chips. Irresistibly delicious.',
    imageUrl: '/images/products/lays-classic.webp',
    unit: '52 g',
    tags: ['chips', 'potato', 'classic'],
  },
  {
    id: 'prod-012',
    name: 'Haldiram\'s Aloo Bhujia',
    brand: 'Haldiram\'s',
    category: 'snacks',
    description: 'Traditional Rajasthani aloo bhujia namkeen. Spicy and crunchy.',
    imageUrl: '/images/products/haldirams-bhujia.webp',
    unit: '400 g',
    tags: ['namkeen', 'bhujia', 'traditional'],
  },
  {
    id: 'prod-013',
    name: 'Parle-G Gold Biscuits',
    brand: 'Parle',
    category: 'snacks',
    description: 'India\'s favourite glucose biscuits. Now with extra butter.',
    imageUrl: '/images/products/parle-g.webp',
    unit: '1 kg',
    tags: ['biscuits', 'glucose', 'tea-time'],
  },
  {
    id: 'prod-014',
    name: 'Cadbury Dairy Milk Silk',
    brand: 'Cadbury',
    category: 'snacks',
    subcategory: 'chocolates',
    description: 'Smooth and silky milk chocolate. Pure indulgence.',
    imageUrl: '/images/products/dairy-milk-silk.webp',
    unit: '150 g',
    tags: ['chocolate', 'cadbury', 'silk'],
  },
  {
    id: 'prod-015',
    name: 'Maggi 2-Minute Masala Noodles',
    brand: 'Maggi',
    category: 'snacks',
    description: 'India\'s favourite instant noodles. Ready in 2 minutes.',
    imageUrl: '/images/products/maggi-noodles.webp',
    unit: '280 g (4 pack)',
    tags: ['noodles', 'instant', 'maggi'],
  },

  // ── Beverages ──────────────────────────────────────────────────────────────
  {
    id: 'prod-016',
    name: 'Coca-Cola Original Taste',
    brand: 'Coca-Cola',
    category: 'beverages',
    description: 'Iconic cola beverage. Refreshing and fizzy.',
    imageUrl: '/images/products/coca-cola.webp',
    unit: '750 ml',
    tags: ['cola', 'soft-drink', 'carbonated'],
  },
  {
    id: 'prod-017',
    name: 'Paper Boat Aam Panna',
    brand: 'Paper Boat',
    category: 'beverages',
    description: 'Traditional aam panna drink. Made with raw mangoes and spices.',
    imageUrl: '/images/products/paper-boat-aam-panna.webp',
    unit: '200 ml',
    tags: ['juice', 'mango', 'traditional', 'desi'],
  },
  {
    id: 'prod-018',
    name: 'Tropicana 100% Orange Juice',
    brand: 'Tropicana',
    category: 'beverages',
    description: 'Pure orange juice with no added sugar. Rich in Vitamin C.',
    imageUrl: '/images/products/tropicana-orange.webp',
    unit: '1 L',
    tags: ['juice', 'orange', 'no-sugar'],
  },
  {
    id: 'prod-019',
    name: 'Tata Tea Gold',
    brand: 'Tata',
    category: 'beverages',
    description: '15% long leaf tea for rich, aromatic chai. Trusted quality.',
    imageUrl: '/images/products/tata-tea-gold.webp',
    unit: '500 g',
    tags: ['tea', 'chai', 'gold'],
  },
  {
    id: 'prod-020',
    name: 'Nescafé Classic Instant Coffee',
    brand: 'Nescafé',
    category: 'beverages',
    description: '100% pure instant coffee. Rich aroma and smooth taste.',
    imageUrl: '/images/products/nescafe-classic.webp',
    unit: '200 g',
    tags: ['coffee', 'instant', 'nescafe'],
  },

  // ── Personal Care ──────────────────────────────────────────────────────────
  {
    id: 'prod-021',
    name: 'Dove Cream Beauty Bathing Bar',
    brand: 'Dove',
    category: 'personal-care',
    description: 'Moisturising beauty bar with ¼ moisturising cream.',
    imageUrl: '/images/products/dove-soap.webp',
    unit: '100 g',
    tags: ['soap', 'bathing', 'moisturising'],
  },
  {
    id: 'prod-022',
    name: 'Colgate MaxFresh Toothpaste',
    brand: 'Colgate',
    category: 'personal-care',
    description: 'Cooling crystal toothpaste for a burst of freshness.',
    imageUrl: '/images/products/colgate-maxfresh.webp',
    unit: '150 g',
    tags: ['toothpaste', 'oral-care', 'mint'],
  },
  {
    id: 'prod-023',
    name: 'Head & Shoulders Anti-Dandruff Shampoo',
    brand: 'Head & Shoulders',
    category: 'personal-care',
    description: 'Cool menthol anti-dandruff shampoo. Up to 100% dandruff-free.',
    imageUrl: '/images/products/head-shoulders.webp',
    unit: '340 ml',
    tags: ['shampoo', 'anti-dandruff', 'hair-care'],
  },
  {
    id: 'prod-024',
    name: 'Nivea Men Body Deodorizer — Fresh Active',
    brand: 'Nivea',
    category: 'personal-care',
    description: 'Gas-free body deodorizer for long-lasting freshness.',
    imageUrl: '/images/products/nivea-deo.webp',
    unit: '120 ml',
    tags: ['deodorant', 'men', 'freshness'],
  },

  // ── Household ──────────────────────────────────────────────────────────────
  {
    id: 'prod-025',
    name: 'Harpic Powerplus Toilet Cleaner',
    brand: 'Harpic',
    category: 'household',
    description: '10x better cleaning and germ protection. Original fragrance.',
    imageUrl: '/images/products/harpic.webp',
    unit: '500 ml',
    tags: ['toilet-cleaner', 'disinfectant', 'cleaning'],
  },
  {
    id: 'prod-026',
    name: 'Vim Dishwash Gel — Lemon',
    brand: 'Vim',
    category: 'household',
    description: 'Concentrated dishwash gel with real lemon juice. Tough on grease.',
    imageUrl: '/images/products/vim-gel.webp',
    unit: '500 ml',
    tags: ['dishwash', 'gel', 'lemon', 'cleaning'],
  },
  {
    id: 'prod-027',
    name: 'Surf Excel Matic Top Load Detergent',
    brand: 'Surf Excel',
    category: 'household',
    description: 'Specially designed for top-load washing machines. Removes tough stains.',
    imageUrl: '/images/products/surf-excel.webp',
    unit: '2 kg',
    tags: ['detergent', 'washing', 'laundry', 'matic'],
  },

  // ── Fruits & Vegetables ────────────────────────────────────────────────────
  {
    id: 'prod-028',
    name: 'Fresh Bananas (Robusta)',
    brand: 'Farm Fresh',
    category: 'fruits-vegetables',
    description: 'Naturally ripened robusta bananas. Rich in potassium.',
    imageUrl: '/images/products/bananas.webp',
    unit: '1 dozen',
    tags: ['banana', 'fruit', 'fresh'],
  },
  {
    id: 'prod-029',
    name: 'Onion',
    brand: 'Farm Fresh',
    category: 'fruits-vegetables',
    description: 'Fresh onions, sorted and graded. Essential for every kitchen.',
    imageUrl: '/images/products/onion.webp',
    unit: '1 kg',
    tags: ['onion', 'vegetable', 'staples'],
  },
  {
    id: 'prod-030',
    name: 'Tomato (Hybrid)',
    brand: 'Farm Fresh',
    category: 'fruits-vegetables',
    description: 'Fresh, firm hybrid tomatoes. Great for cooking and salads.',
    imageUrl: '/images/products/tomato.webp',
    unit: '500 g',
    tags: ['tomato', 'vegetable', 'fresh'],
  },

  // ── Bakery ─────────────────────────────────────────────────────────────────
  {
    id: 'prod-031',
    name: 'Britannia Whole Wheat Bread',
    brand: 'Britannia',
    category: 'bakery',
    description: '100% whole wheat bread. No added maida. Soft and fresh.',
    imageUrl: '/images/products/britannia-bread.webp',
    unit: '400 g',
    tags: ['bread', 'whole-wheat', 'healthy'],
  },

  // ── Baby Care ──────────────────────────────────────────────────────────────
  {
    id: 'prod-032',
    name: 'Pampers All Round Protection Diapers',
    brand: 'Pampers',
    category: 'baby-care',
    description: 'Up to 12 hours of dryness. Lotion with aloe vera.',
    imageUrl: '/images/products/pampers.webp',
    unit: 'Medium — 76 count',
    tags: ['diapers', 'baby', 'pampers'],
  },

  // ── Pet Care ───────────────────────────────────────────────────────────────
  {
    id: 'prod-033',
    name: 'Pedigree Adult Dry Dog Food — Chicken & Vegetables',
    brand: 'Pedigree',
    category: 'pet-care',
    description: 'Complete and balanced nutrition for adult dogs. With real chicken.',
    imageUrl: '/images/products/pedigree.webp',
    unit: '3 kg',
    tags: ['dog-food', 'pet', 'chicken'],
  },

  // ── More Groceries ─────────────────────────────────────────────────────────
  {
    id: 'prod-034',
    name: 'Saffola Gold Blended Edible Oil',
    brand: 'Saffola',
    category: 'groceries',
    description: 'Blend of rice bran and sunflower oil. Good for heart health.',
    imageUrl: '/images/products/saffola-gold.webp',
    unit: '1 L',
    tags: ['oil', 'cooking-oil', 'blended', 'healthy'],
  },
  {
    id: 'prod-035',
    name: 'Daawat Rozana Basmati Rice',
    brand: 'Daawat',
    category: 'groceries',
    description: 'Super everyday basmati rice. Long grain and aromatic.',
    imageUrl: '/images/products/daawat-rice.webp',
    unit: '5 kg',
    tags: ['rice', 'basmati', 'staples'],
  },
];

// -----------------------------------------------------------------------------
// Mock Listings — realistic per-platform pricing
// -----------------------------------------------------------------------------

/**
 * Generate a deterministic but varied ISO timestamp string.
 * Uses the product/platform combo as a seed so listings are stable.
 */
function mockTimestamp(productId: string, platformId: string): string {
  const hash =
    (productId.charCodeAt(productId.length - 1) * 31 +
      platformId.charCodeAt(0) * 17) %
    60;
  const now = new Date();
  now.setMinutes(now.getMinutes() - hash);
  return now.toISOString();
}

/** Type for the raw listing definition used in the seed table below */
interface ListingSeed {
  productId: string;
  platformId: PlatformId;
  price: number;
  mrp: number;
  discount?: number;
  discountLabel?: string;
  availability: AvailabilityStatus;
  deliveryMinutes: number;
  deliveryFee: number;
  platformFee?: number;
  minimumOrderAmount?: number;
}

/**
 * Raw listing seeds — hand-crafted realistic Indian market pricing.
 * Each product has listings on 3–4 platforms with slight price variation.
 */
const LISTING_SEEDS: ListingSeed[] = [
  // ── prod-001: Amul Taza Milk 1L ────────────────────────────────────────────
  { productId: 'prod-001', platformId: 'blinkit',          price: 27,  mrp: 27,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-001', platformId: 'zepto',            price: 27,  mrp: 27,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-001', platformId: 'swiggy-instamart', price: 28,  mrp: 28,  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-001', platformId: 'bigbasket',        price: 27,  mrp: 27,  availability: 'in-stock', deliveryMinutes: 25, deliveryFee: 0,  platformFee: 0 },

  // ── prod-002: Amul Butter 500g ─────────────────────────────────────────────
  { productId: 'prod-002', platformId: 'blinkit',          price: 275, mrp: 290, discount: 15, discountLabel: '5% OFF', availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-002', platformId: 'zepto',            price: 280, mrp: 290, discount: 10, discountLabel: '3% OFF', availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-002', platformId: 'swiggy-instamart', price: 282, mrp: 290, discount: 8,  discountLabel: '3% OFF', availability: 'in-stock', deliveryMinutes: 15, deliveryFee: 5,  platformFee: 2 },
  { productId: 'prod-002', platformId: 'bigbasket',        price: 270, mrp: 290, discount: 20, discountLabel: '7% OFF', availability: 'in-stock', deliveryMinutes: 28, deliveryFee: 0,  platformFee: 0 },

  // ── prod-003: Mother Dairy Curd 400g ───────────────────────────────────────
  { productId: 'prod-003', platformId: 'blinkit',          price: 35,  mrp: 35,  availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-003', platformId: 'zepto',            price: 35,  mrp: 35,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-003', platformId: 'swiggy-instamart', price: 36,  mrp: 36,  availability: 'limited',  deliveryMinutes: 14, deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-003', platformId: 'bigbasket',        price: 34,  mrp: 35,  discount: 1,  availability: 'in-stock', deliveryMinutes: 25, deliveryFee: 0,  platformFee: 0 },

  // ── prod-004: Amul Paneer 200g ─────────────────────────────────────────────
  { productId: 'prod-004', platformId: 'blinkit',          price: 90,  mrp: 95,  discount: 5,  availability: 'in-stock',     deliveryMinutes: 8,  deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-004', platformId: 'zepto',            price: 92,  mrp: 95,  discount: 3,  availability: 'in-stock',     deliveryMinutes: 10, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-004', platformId: 'swiggy-instamart', price: 89,  mrp: 95,  discount: 6,  availability: 'out-of-stock', deliveryMinutes: 15, deliveryFee: 0,  platformFee: 2 },

  // ── prod-005: Aashirvaad Atta 5kg ──────────────────────────────────────────
  { productId: 'prod-005', platformId: 'blinkit',          price: 339, mrp: 365, discount: 26, discountLabel: '7% OFF',  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 2, minimumOrderAmount: 99 },
  { productId: 'prod-005', platformId: 'zepto',            price: 345, mrp: 365, discount: 20, discountLabel: '5% OFF',  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0,  platformFee: 3, minimumOrderAmount: 99 },
  { productId: 'prod-005', platformId: 'swiggy-instamart', price: 349, mrp: 365, discount: 16, discountLabel: '4% OFF',  availability: 'in-stock', deliveryMinutes: 18, deliveryFee: 10, platformFee: 2, minimumOrderAmount: 149 },
  { productId: 'prod-005', platformId: 'bigbasket',        price: 335, mrp: 365, discount: 30, discountLabel: '8% OFF',  availability: 'in-stock', deliveryMinutes: 30, deliveryFee: 0,  platformFee: 0, minimumOrderAmount: 200 },

  // ── prod-006: India Gate Basmati Rice 5kg ──────────────────────────────────
  { productId: 'prod-006', platformId: 'blinkit',          price: 420, mrp: 460, discount: 40, discountLabel: '9% OFF', availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-006', platformId: 'zepto',            price: 435, mrp: 460, discount: 25, discountLabel: '5% OFF', availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-006', platformId: 'swiggy-instamart', price: 440, mrp: 460, discount: 20, discountLabel: '4% OFF', availability: 'limited',  deliveryMinutes: 18, deliveryFee: 15, platformFee: 2 },
  { productId: 'prod-006', platformId: 'bigbasket',        price: 415, mrp: 460, discount: 45, discountLabel: '10% OFF', availability: 'in-stock', deliveryMinutes: 30, deliveryFee: 0,  platformFee: 0 },

  // ── prod-007: Tata Salt 1kg ────────────────────────────────────────────────
  { productId: 'prod-007', platformId: 'blinkit',          price: 28,  mrp: 28,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-007', platformId: 'zepto',            price: 28,  mrp: 28,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-007', platformId: 'swiggy-instamart', price: 28,  mrp: 28,  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-007', platformId: 'bigbasket',        price: 28,  mrp: 28,  availability: 'in-stock', deliveryMinutes: 22, deliveryFee: 0, platformFee: 0 },

  // ── prod-008: Fortune Sunflower Oil 1L ─────────────────────────────────────
  { productId: 'prod-008', platformId: 'blinkit',          price: 135, mrp: 145, discount: 10, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-008', platformId: 'zepto',            price: 138, mrp: 145, discount: 7,  availability: 'in-stock', deliveryMinutes: 11, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-008', platformId: 'swiggy-instamart', price: 140, mrp: 145, discount: 5,  availability: 'in-stock', deliveryMinutes: 15, deliveryFee: 5, platformFee: 2 },
  { productId: 'prod-008', platformId: 'bigbasket',        price: 130, mrp: 145, discount: 15, availability: 'in-stock', deliveryMinutes: 25, deliveryFee: 0, platformFee: 0 },

  // ── prod-009: Tata Toor Dal 1kg ────────────────────────────────────────────
  { productId: 'prod-009', platformId: 'blinkit',          price: 165, mrp: 180, discount: 15, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-009', platformId: 'zepto',            price: 170, mrp: 180, discount: 10, availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-009', platformId: 'swiggy-instamart', price: 168, mrp: 180, discount: 12, availability: 'in-stock', deliveryMinutes: 16, deliveryFee: 0, platformFee: 2 },

  // ── prod-010: Madhur Sugar 1kg ─────────────────────────────────────────────
  { productId: 'prod-010', platformId: 'blinkit',          price: 48,  mrp: 50,  discount: 2,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-010', platformId: 'zepto',            price: 49,  mrp: 50,  discount: 1,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-010', platformId: 'swiggy-instamart', price: 50,  mrp: 50,  availability: 'in-stock', deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-010', platformId: 'bigbasket',        price: 46,  mrp: 50,  discount: 4,  availability: 'in-stock', deliveryMinutes: 24, deliveryFee: 0, platformFee: 0 },

  // ── prod-011: Lay's Classic Salted 52g ─────────────────────────────────────
  { productId: 'prod-011', platformId: 'blinkit',          price: 20,  mrp: 20,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-011', platformId: 'zepto',            price: 20,  mrp: 20,  availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-011', platformId: 'swiggy-instamart', price: 20,  mrp: 20,  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-011', platformId: 'bigbasket',        price: 20,  mrp: 20,  availability: 'in-stock', deliveryMinutes: 20, deliveryFee: 0, platformFee: 0 },

  // ── prod-012: Haldiram's Aloo Bhujia 400g ──────────────────────────────────
  { productId: 'prod-012', platformId: 'blinkit',          price: 148, mrp: 160, discount: 12, availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-012', platformId: 'zepto',            price: 155, mrp: 160, discount: 5,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-012', platformId: 'swiggy-instamart', price: 150, mrp: 160, discount: 10, availability: 'in-stock', deliveryMinutes: 14, deliveryFee: 5,  platformFee: 2 },
  { productId: 'prod-012', platformId: 'bigbasket',        price: 145, mrp: 160, discount: 15, availability: 'in-stock', deliveryMinutes: 26, deliveryFee: 0,  platformFee: 0 },

  // ── prod-013: Parle-G Gold 1kg ─────────────────────────────────────────────
  { productId: 'prod-013', platformId: 'blinkit',          price: 110, mrp: 120, discount: 10, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-013', platformId: 'zepto',            price: 115, mrp: 120, discount: 5,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-013', platformId: 'swiggy-instamart', price: 112, mrp: 120, discount: 8,  availability: 'in-stock', deliveryMinutes: 15, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-013', platformId: 'bigbasket',        price: 108, mrp: 120, discount: 12, availability: 'in-stock', deliveryMinutes: 25, deliveryFee: 0, platformFee: 0 },

  // ── prod-014: Dairy Milk Silk 150g ─────────────────────────────────────────
  { productId: 'prod-014', platformId: 'blinkit',          price: 175, mrp: 180, discount: 5,  availability: 'in-stock',     deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-014', platformId: 'zepto',            price: 178, mrp: 180, discount: 2,  availability: 'in-stock',     deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-014', platformId: 'swiggy-instamart', price: 180, mrp: 180, availability: 'out-of-stock', deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-014', platformId: 'bigbasket',        price: 170, mrp: 180, discount: 10, availability: 'in-stock',     deliveryMinutes: 24, deliveryFee: 0, platformFee: 0 },

  // ── prod-015: Maggi Noodles 280g (4 pack) ──────────────────────────────────
  { productId: 'prod-015', platformId: 'blinkit',          price: 56,  mrp: 56,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-015', platformId: 'zepto',            price: 56,  mrp: 56,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-015', platformId: 'swiggy-instamart', price: 58,  mrp: 58,  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-015', platformId: 'bigbasket',        price: 55,  mrp: 56,  discount: 1,  availability: 'in-stock', deliveryMinutes: 22, deliveryFee: 0, platformFee: 0 },

  // ── prod-016: Coca-Cola 750ml ──────────────────────────────────────────────
  { productId: 'prod-016', platformId: 'blinkit',          price: 38,  mrp: 40,  discount: 2, availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-016', platformId: 'zepto',            price: 40,  mrp: 40,  availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-016', platformId: 'swiggy-instamart', price: 40,  mrp: 40,  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-016', platformId: 'bigbasket',        price: 37,  mrp: 40,  discount: 3, availability: 'in-stock', deliveryMinutes: 22, deliveryFee: 0, platformFee: 0 },

  // ── prod-017: Paper Boat Aam Panna 200ml ───────────────────────────────────
  { productId: 'prod-017', platformId: 'blinkit',          price: 30,  mrp: 30,  availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-017', platformId: 'zepto',            price: 30,  mrp: 30,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-017', platformId: 'swiggy-instamart', price: 30,  mrp: 30,  availability: 'limited',  deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },

  // ── prod-018: Tropicana Orange 1L ──────────────────────────────────────────
  { productId: 'prod-018', platformId: 'blinkit',          price: 110, mrp: 120, discount: 10, availability: 'in-stock',     deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-018', platformId: 'zepto',            price: 115, mrp: 120, discount: 5,  availability: 'in-stock',     deliveryMinutes: 11, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-018', platformId: 'swiggy-instamart', price: 118, mrp: 120, discount: 2,  availability: 'in-stock',     deliveryMinutes: 15, deliveryFee: 5, platformFee: 2 },
  { productId: 'prod-018', platformId: 'bigbasket',        price: 105, mrp: 120, discount: 15, availability: 'in-stock',     deliveryMinutes: 28, deliveryFee: 0, platformFee: 0 },

  // ── prod-019: Tata Tea Gold 500g ───────────────────────────────────────────
  { productId: 'prod-019', platformId: 'blinkit',          price: 289, mrp: 310, discount: 21, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-019', platformId: 'zepto',            price: 295, mrp: 310, discount: 15, availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-019', platformId: 'swiggy-instamart', price: 299, mrp: 310, discount: 11, availability: 'in-stock', deliveryMinutes: 16, deliveryFee: 5, platformFee: 2 },
  { productId: 'prod-019', platformId: 'bigbasket',        price: 285, mrp: 310, discount: 25, availability: 'in-stock', deliveryMinutes: 26, deliveryFee: 0, platformFee: 0 },

  // ── prod-020: Nescafé Classic 200g ─────────────────────────────────────────
  { productId: 'prod-020', platformId: 'blinkit',          price: 495, mrp: 530, discount: 35, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-020', platformId: 'zepto',            price: 510, mrp: 530, discount: 20, availability: 'in-stock', deliveryMinutes: 11, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-020', platformId: 'swiggy-instamart', price: 515, mrp: 530, discount: 15, availability: 'limited',  deliveryMinutes: 15, deliveryFee: 10, platformFee: 2 },
  { productId: 'prod-020', platformId: 'bigbasket',        price: 485, mrp: 530, discount: 45, availability: 'in-stock', deliveryMinutes: 28, deliveryFee: 0, platformFee: 0 },

  // ── prod-021: Dove Soap 100g ───────────────────────────────────────────────
  { productId: 'prod-021', platformId: 'blinkit',          price: 55,  mrp: 60,  discount: 5,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-021', platformId: 'zepto',            price: 58,  mrp: 60,  discount: 2,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-021', platformId: 'swiggy-instamart', price: 57,  mrp: 60,  discount: 3,  availability: 'in-stock', deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-021', platformId: 'bigbasket',        price: 52,  mrp: 60,  discount: 8,  availability: 'in-stock', deliveryMinutes: 22, deliveryFee: 0, platformFee: 0 },

  // ── prod-022: Colgate MaxFresh 150g ────────────────────────────────────────
  { productId: 'prod-022', platformId: 'blinkit',          price: 115, mrp: 125, discount: 10, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-022', platformId: 'zepto',            price: 118, mrp: 125, discount: 7,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-022', platformId: 'swiggy-instamart', price: 120, mrp: 125, discount: 5,  availability: 'in-stock', deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-022', platformId: 'bigbasket',        price: 110, mrp: 125, discount: 15, availability: 'in-stock', deliveryMinutes: 24, deliveryFee: 0, platformFee: 0 },

  // ── prod-023: Head & Shoulders 340ml ───────────────────────────────────────
  { productId: 'prod-023', platformId: 'blinkit',          price: 395, mrp: 420, discount: 25, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-023', platformId: 'zepto',            price: 405, mrp: 420, discount: 15, availability: 'in-stock', deliveryMinutes: 11, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-023', platformId: 'swiggy-instamart', price: 410, mrp: 420, discount: 10, availability: 'out-of-stock', deliveryMinutes: 15, deliveryFee: 5, platformFee: 2 },
  { productId: 'prod-023', platformId: 'bigbasket',        price: 385, mrp: 420, discount: 35, availability: 'in-stock', deliveryMinutes: 26, deliveryFee: 0, platformFee: 0 },

  // ── prod-024: Nivea Deo 120ml ──────────────────────────────────────────────
  { productId: 'prod-024', platformId: 'blinkit',          price: 199, mrp: 220, discount: 21, availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-024', platformId: 'zepto',            price: 210, mrp: 220, discount: 10, availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-024', platformId: 'swiggy-instamart', price: 205, mrp: 220, discount: 15, availability: 'in-stock', deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },

  // ── prod-025: Harpic 500ml ─────────────────────────────────────────────────
  { productId: 'prod-025', platformId: 'blinkit',          price: 99,  mrp: 109, discount: 10, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-025', platformId: 'zepto',            price: 102, mrp: 109, discount: 7,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-025', platformId: 'swiggy-instamart', price: 105, mrp: 109, discount: 4,  availability: 'in-stock', deliveryMinutes: 15, deliveryFee: 5, platformFee: 2 },
  { productId: 'prod-025', platformId: 'bigbasket',        price: 95,  mrp: 109, discount: 14, availability: 'in-stock', deliveryMinutes: 25, deliveryFee: 0, platformFee: 0 },

  // ── prod-026: Vim Gel 500ml ────────────────────────────────────────────────
  { productId: 'prod-026', platformId: 'blinkit',          price: 120, mrp: 135, discount: 15, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-026', platformId: 'zepto',            price: 125, mrp: 135, discount: 10, availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-026', platformId: 'swiggy-instamart', price: 128, mrp: 135, discount: 7,  availability: 'in-stock', deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-026', platformId: 'bigbasket',        price: 115, mrp: 135, discount: 20, availability: 'in-stock', deliveryMinutes: 24, deliveryFee: 0, platformFee: 0 },

  // ── prod-027: Surf Excel Matic 2kg ─────────────────────────────────────────
  { productId: 'prod-027', platformId: 'blinkit',          price: 459, mrp: 500, discount: 41, discountLabel: '8% OFF', availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-027', platformId: 'zepto',            price: 475, mrp: 500, discount: 25, discountLabel: '5% OFF', availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-027', platformId: 'swiggy-instamart', price: 480, mrp: 500, discount: 20, discountLabel: '4% OFF', availability: 'in-stock', deliveryMinutes: 18, deliveryFee: 15, platformFee: 2 },
  { productId: 'prod-027', platformId: 'bigbasket',        price: 449, mrp: 500, discount: 51, discountLabel: '10% OFF', availability: 'in-stock', deliveryMinutes: 30, deliveryFee: 0,  platformFee: 0 },

  // ── prod-028: Bananas 1 dozen ──────────────────────────────────────────────
  { productId: 'prod-028', platformId: 'blinkit',          price: 45,  mrp: 50,  discount: 5,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-028', platformId: 'zepto',            price: 49,  mrp: 50,  discount: 1,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-028', platformId: 'swiggy-instamart', price: 47,  mrp: 50,  discount: 3,  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-028', platformId: 'bigbasket',        price: 42,  mrp: 50,  discount: 8,  availability: 'in-stock', deliveryMinutes: 22, deliveryFee: 0, platformFee: 0 },

  // ── prod-029: Onion 1kg ────────────────────────────────────────────────────
  { productId: 'prod-029', platformId: 'blinkit',          price: 35,  mrp: 40,  discount: 5,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-029', platformId: 'zepto',            price: 38,  mrp: 40,  discount: 2,  availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-029', platformId: 'swiggy-instamart', price: 36,  mrp: 40,  discount: 4,  availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-029', platformId: 'bigbasket',        price: 32,  mrp: 40,  discount: 8,  availability: 'in-stock', deliveryMinutes: 20, deliveryFee: 0, platformFee: 0 },

  // ── prod-030: Tomato 500g ──────────────────────────────────────────────────
  { productId: 'prod-030', platformId: 'blinkit',          price: 22,  mrp: 25,  discount: 3,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-030', platformId: 'zepto',            price: 24,  mrp: 25,  discount: 1,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-030', platformId: 'swiggy-instamart', price: 25,  mrp: 25,  availability: 'in-stock', deliveryMinutes: 14, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-030', platformId: 'bigbasket',        price: 20,  mrp: 25,  discount: 5,  availability: 'limited',  deliveryMinutes: 22, deliveryFee: 0, platformFee: 0 },

  // ── prod-031: Britannia Bread 400g ─────────────────────────────────────────
  { productId: 'prod-031', platformId: 'blinkit',          price: 50,  mrp: 55,  discount: 5,  availability: 'in-stock', deliveryMinutes: 8,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-031', platformId: 'zepto',            price: 52,  mrp: 55,  discount: 3,  availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-031', platformId: 'swiggy-instamart', price: 53,  mrp: 55,  discount: 2,  availability: 'in-stock', deliveryMinutes: 13, deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-031', platformId: 'bigbasket',        price: 48,  mrp: 55,  discount: 7,  availability: 'in-stock', deliveryMinutes: 24, deliveryFee: 0, platformFee: 0 },

  // ── prod-032: Pampers Diapers M-76 ─────────────────────────────────────────
  { productId: 'prod-032', platformId: 'blinkit',          price: 1099, mrp: 1199, discount: 100, discountLabel: '8% OFF', availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-032', platformId: 'zepto',            price: 1120, mrp: 1199, discount: 79,  discountLabel: '7% OFF', availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-032', platformId: 'swiggy-instamart', price: 1149, mrp: 1199, discount: 50,  discountLabel: '4% OFF', availability: 'limited',  deliveryMinutes: 18, deliveryFee: 20, platformFee: 2 },
  { productId: 'prod-032', platformId: 'bigbasket',        price: 1049, mrp: 1199, discount: 150, discountLabel: '13% OFF', availability: 'in-stock', deliveryMinutes: 30, deliveryFee: 0,  platformFee: 0 },

  // ── prod-033: Pedigree Dog Food 3kg ────────────────────────────────────────
  { productId: 'prod-033', platformId: 'blinkit',          price: 599, mrp: 650, discount: 51, availability: 'in-stock',     deliveryMinutes: 10, deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-033', platformId: 'zepto',            price: 620, mrp: 650, discount: 30, availability: 'out-of-stock', deliveryMinutes: 12, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-033', platformId: 'bigbasket',        price: 575, mrp: 650, discount: 75, availability: 'in-stock',     deliveryMinutes: 28, deliveryFee: 0,  platformFee: 0 },

  // ── prod-034: Saffola Gold 1L ──────────────────────────────────────────────
  { productId: 'prod-034', platformId: 'blinkit',          price: 189, mrp: 210, discount: 21, availability: 'in-stock', deliveryMinutes: 9,  deliveryFee: 0, platformFee: 2 },
  { productId: 'prod-034', platformId: 'zepto',            price: 195, mrp: 210, discount: 15, availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0, platformFee: 3 },
  { productId: 'prod-034', platformId: 'swiggy-instamart', price: 198, mrp: 210, discount: 12, availability: 'in-stock', deliveryMinutes: 15, deliveryFee: 5, platformFee: 2 },
  { productId: 'prod-034', platformId: 'bigbasket',        price: 185, mrp: 210, discount: 25, availability: 'in-stock', deliveryMinutes: 25, deliveryFee: 0, platformFee: 0 },

  // ── prod-035: Daawat Rice 5kg ──────────────────────────────────────────────
  { productId: 'prod-035', platformId: 'blinkit',          price: 389, mrp: 425, discount: 36, availability: 'in-stock', deliveryMinutes: 10, deliveryFee: 0,  platformFee: 2 },
  { productId: 'prod-035', platformId: 'zepto',            price: 399, mrp: 425, discount: 26, availability: 'in-stock', deliveryMinutes: 12, deliveryFee: 0,  platformFee: 3 },
  { productId: 'prod-035', platformId: 'swiggy-instamart', price: 405, mrp: 425, discount: 20, availability: 'limited',  deliveryMinutes: 18, deliveryFee: 15, platformFee: 2 },
  { productId: 'prod-035', platformId: 'bigbasket',        price: 379, mrp: 425, discount: 46, availability: 'in-stock', deliveryMinutes: 28, deliveryFee: 0,  platformFee: 0 },
];

// -----------------------------------------------------------------------------
// Exported helpers
// -----------------------------------------------------------------------------

/**
 * Build a full `PlatformListing` from a seed, adding timestamp and data source.
 */
function buildListing(seed: ListingSeed): PlatformListing {
  return {
    productId: seed.productId,
    platformId: seed.platformId,
    price: seed.price,
    mrp: seed.mrp,
    discount: seed.discount,
    discountLabel: seed.discountLabel,
    availability: seed.availability,
    deliveryEstimate: `${seed.deliveryMinutes} mins`,
    deliveryMinutes: seed.deliveryMinutes,
    deliveryFee: seed.deliveryFee,
    minimumOrderAmount: seed.minimumOrderAmount,
    platformFee: seed.platformFee,
    lastUpdated: mockTimestamp(seed.productId, seed.platformId),
    dataSource: 'mock' as DataSource,
  };
}

/** All mock listings built from the seed table */
export const MOCK_LISTINGS: PlatformListing[] = LISTING_SEEDS.map(buildListing);

/**
 * Get all listings for a specific product.
 */
export function getListingsForProduct(productId: string): PlatformListing[] {
  return MOCK_LISTINGS.filter((l) => l.productId === productId);
}

/**
 * Get all listings for a specific platform.
 */
export function getListingsForPlatform(platformId: PlatformId): PlatformListing[] {
  return MOCK_LISTINGS.filter((l) => l.platformId === platformId);
}

/**
 * Get a single listing by product + platform.
 */
export function getListing(
  productId: string,
  platformId: PlatformId,
): PlatformListing | undefined {
  return MOCK_LISTINGS.find(
    (l) => l.productId === productId && l.platformId === platformId,
  );
}

/**
 * Get a product by its ID.
 */
export function getProductById(productId: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === productId);
}

/**
 * Get products by category.
 */
export function getProductsByCategory(category: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

/**
 * Build a lookup map of productId → Product for fast access.
 */
export const PRODUCT_MAP: ReadonlyMap<string, Product> = new Map(
  MOCK_PRODUCTS.map((p) => [p.id, p]),
);
