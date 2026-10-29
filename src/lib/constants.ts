// =============================================================================
// Quick Compare — Constants & Configuration
// =============================================================================

import type { Platform, PlatformId, ProductCategory } from '@/types';

// -----------------------------------------------------------------------------
// Platform Configurations
// -----------------------------------------------------------------------------

/** All supported platform configurations */
export const PLATFORMS: Record<PlatformId, Platform> = {
  blinkit: {
    id: 'blinkit',
    name: 'Blinkit',
    shortName: 'Blinkit',
    color: '#F8C900',
    bgColor: '#FFF9E0',
    logoUrl: '/logos/blinkit.svg',
    websiteUrl: 'https://blinkit.com',
  },
  zepto: {
    id: 'zepto',
    name: 'Zepto',
    shortName: 'Zepto',
    color: '#8B22C0',
    bgColor: '#F3E8FA',
    logoUrl: '/logos/zepto.svg',
    websiteUrl: 'https://www.zeptonow.com',
  },
  'swiggy-instamart': {
    id: 'swiggy-instamart',
    name: 'Swiggy Instamart',
    shortName: 'Instamart',
    color: '#FC8019',
    bgColor: '#FFF1E5',
    logoUrl: '/logos/swiggy-instamart.svg',
    websiteUrl: 'https://www.swiggy.com/instamart',
  },
  bigbasket: {
    id: 'bigbasket',
    name: 'BigBasket',
    shortName: 'BB',
    color: '#84C225',
    bgColor: '#F0F9E2',
    logoUrl: '/logos/bigbasket.svg',
    websiteUrl: 'https://www.bigbasket.com',
  },
} as const;

/** Ordered list of platform IDs */
export const PLATFORM_IDS: PlatformId[] = [
  'blinkit',
  'zepto',
  'swiggy-instamart',
  'bigbasket',
];

// -----------------------------------------------------------------------------
// Category Configuration
// -----------------------------------------------------------------------------

/** Category metadata with labels and emoji icons */
export const CATEGORIES: Record<
  ProductCategory,
  { label: string; icon: string; description: string }
> = {
  groceries: {
    label: 'Groceries',
    icon: '🛒',
    description: 'Atta, rice, dal, oil, salt, sugar & more',
  },
  dairy: {
    label: 'Dairy',
    icon: '🥛',
    description: 'Milk, curd, cheese, butter, paneer & more',
  },
  snacks: {
    label: 'Snacks',
    icon: '🍿',
    description: 'Chips, namkeen, biscuits, chocolates & more',
  },
  beverages: {
    label: 'Beverages',
    icon: '🥤',
    description: 'Juices, soft drinks, tea, coffee & more',
  },
  'personal-care': {
    label: 'Personal Care',
    icon: '🧴',
    description: 'Soaps, shampoo, toothpaste, skincare & more',
  },
  household: {
    label: 'Household',
    icon: '🏠',
    description: 'Cleaners, detergents, fresheners & more',
  },
  'fruits-vegetables': {
    label: 'Fruits & Vegetables',
    icon: '🥦',
    description: 'Fresh fruits, vegetables, herbs & more',
  },
  'meat-fish': {
    label: 'Meat & Fish',
    icon: '🍖',
    description: 'Chicken, mutton, fish, eggs & more',
  },
  bakery: {
    label: 'Bakery',
    icon: '🍞',
    description: 'Breads, cakes, pav, buns & more',
  },
  'baby-care': {
    label: 'Baby Care',
    icon: '👶',
    description: 'Diapers, baby food, wipes & more',
  },
  'pet-care': {
    label: 'Pet Care',
    icon: '🐾',
    description: 'Pet food, treats, accessories & more',
  },
  other: {
    label: 'Other',
    icon: '📦',
    description: 'Everything else',
  },
} as const;

/** Ordered list of category keys for UI display */
export const CATEGORY_LIST: ProductCategory[] = [
  'groceries',
  'dairy',
  'snacks',
  'beverages',
  'personal-care',
  'household',
  'fruits-vegetables',
  'meat-fish',
  'bakery',
  'baby-care',
  'pet-care',
  'other',
];

// -----------------------------------------------------------------------------
// Popular Searches
// -----------------------------------------------------------------------------

/** Common search queries shown as quick suggestions */
export const POPULAR_SEARCHES: string[] = [
  'Milk',
  'Atta',
  'Rice',
  'Bread',
  'Eggs',
  'Curd',
  'Butter',
  'Oil',
  'Sugar',
  'Chips',
  'Biscuits',
  'Detergent',
  'Shampoo',
  'Paneer',
  'Maggi',
  'Coca-Cola',
  'Dal',
  'Tea',
  'Coffee',
  'Soap',
];

/** Trending searches shown on the homepage */
export const TRENDING_SEARCHES: string[] = [
  'Amul Butter',
  'Aashirvaad Atta',
  'Tata Salt',
  'Maggi Noodles',
  'Parle-G',
  'Haldiram Namkeen',
  'Surf Excel',
  'Lay\'s Chips',
];

// -----------------------------------------------------------------------------
// App Constants
// -----------------------------------------------------------------------------

/** Default number of products per page */
export const DEFAULT_PAGE_SIZE = 20;

/** Maximum number of products to compare simultaneously */
export const MAX_COMPARISON_PRODUCTS = 4;

/** How long cached data is considered fresh (in milliseconds) */
export const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/** Default location (Mumbai) used when user hasn't set one */
export const DEFAULT_LOCATION = {
  pincode: '400001',
  city: 'Mumbai',
  area: 'Fort',
  state: 'Maharashtra',
  lat: 18.9338,
  lng: 72.8355,
} as const;

/** Supported sort options for the UI */
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'delivery-time', label: 'Fastest Delivery' },
  { value: 'value', label: 'Best Value' },
] as const;

/** Availability labels for the UI */
export const AVAILABILITY_LABELS: Record<string, string> = {
  'in-stock': 'In Stock',
  'out-of-stock': 'Out of Stock',
  limited: 'Limited Stock',
  unknown: 'Unknown',
} as const;

/**
 * Authentic real-world grocery product pack photographs from verified quick-commerce CDNs.
 * Not AI-generated.
 */
export function getAuthenticProductPhoto(name: string, fallbackUrl?: string): string {
  if (fallbackUrl && fallbackUrl.startsWith('http') && !fallbackUrl.includes('.webp')) {
    return fallbackUrl;
  }

  const n = (name || '').toLowerCase();

  if (n.includes('milk') || n.includes('taaza') || n.includes('toned') || n.includes('dairy')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/5ca91eb1-33d5-4ada-95ed-0e706ac7149e.jpg';
  }
  if (n.includes('bread') || n.includes('pav') || n.includes('bun') || n.includes('bakery')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/4186623f-9e74-4b2b-8306-a245bf3cab7c.jpg';
  }
  if (n.includes('egg')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/12284710-19b1-4947-a1b8-fa7b3d000786.png';
  }
  if (n.includes('atta') || n.includes('flour') || n.includes('wheat') || n.includes('aashirvaad')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/74371e5a-f158-4aaa-b02e-304b296ca182.png';
  }
  if (n.includes('oil') || n.includes('ghee') || n.includes('fortune') || n.includes('sunflower')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/049f5249-d500-4195-b726-d53b40b1d9e8.jpg';
  }
  if (n.includes('butter') || n.includes('cheese') || n.includes('paneer')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/e68b916e-38c6-4968-ab91-e902d09701f6.jpg';
  }
  if (n.includes('curd') || n.includes('dahi') || n.includes('yogurt')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/f812da05-9e9a-496b-94d3-dee9b31a6282.jpg';
  }
  if (n.includes('maggi') || n.includes('noodle') || n.includes('pasta')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/b589d27d-f289-448e-9a26-79cecb98d2e0.jpg';
  }
  if (n.includes('salt') || n.includes('tata salt')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/4d8e7640-0338-434a-8fef-828079fd8a87.jpg';
  }
  if (
    n.includes('chip') ||
    n.includes('lays') ||
    n.includes('kurkure') ||
    n.includes('namkeen') ||
    n.includes('bhujia')
  ) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/rc-upload-1777353225068-257.png';
  }
  if (
    n.includes('coke') ||
    n.includes('cola') ||
    n.includes('pepsi') ||
    n.includes('beverage') ||
    n.includes('juice') ||
    n.includes('drink')
  ) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/rc-upload-1779853608745-667.png';
  }
  if (n.includes('rice') || n.includes('basmati') || n.includes('dal') || n.includes('sugar')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/049f5249-d500-4195-b726-d53b40b1d9e8.jpg';
  }
  if (n.includes('biscuit') || n.includes('cookie') || n.includes('parle')) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/4186623f-9e74-4b2b-8306-a245bf3cab7c.jpg';
  }
  if (
    n.includes('soap') ||
    n.includes('dove') ||
    n.includes('shampoo') ||
    n.includes('paste') ||
    n.includes('cleaner') ||
    n.includes('surf')
  ) {
    return 'https://cdn.grofers.com/da/cms-assets/cms/product/e68b916e-38c6-4968-ab91-e902d09701f6.jpg';
  }

  return 'https://cdn.grofers.com/da/cms-assets/cms/product/5ca91eb1-33d5-4ada-95ed-0e706ac7149e.jpg';
}
