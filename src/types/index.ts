// =============================================================================
// Quick Compare — Core Type Definitions
// =============================================================================

/** Supported quick-commerce platforms */
export type PlatformId = 'blinkit' | 'zepto' | 'swiggy-instamart' | 'bigbasket';

/** Platform metadata */
export interface Platform {
  id: PlatformId;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  logoUrl: string;
  websiteUrl: string;
}

/** Product category */
export type ProductCategory =
  | 'groceries'
  | 'dairy'
  | 'snacks'
  | 'beverages'
  | 'personal-care'
  | 'household'
  | 'fruits-vegetables'
  | 'meat-fish'
  | 'bakery'
  | 'baby-care'
  | 'pet-care'
  | 'other';

/** A normalized product */
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  imageUrl: string;
  unit: string; // e.g., "1 kg", "500 ml", "6 pack"
  variants?: ProductVariant[];
  tags?: string[];
}

/** Product variant (different sizes/packs) */
export interface ProductVariant {
  id: string;
  name: string;
  unit: string;
  productId: string;
}

/** Availability status */
export type AvailabilityStatus = 'in-stock' | 'out-of-stock' | 'limited' | 'unknown';

/** Data source type */
export type DataSource = 'live' | 'mock' | 'cached';

/** A platform-specific listing for a product */
export interface PlatformListing {
  productId: string;
  variantId?: string;
  platformId: PlatformId;
  price: number;
  mrp: number;
  discount?: number;
  discountLabel?: string;
  availability: AvailabilityStatus;
  deliveryEstimate?: string; // e.g., "10 mins", "15-20 mins"
  deliveryMinutes?: number; // numeric for sorting
  deliveryFee: number;
  minimumOrderAmount?: number;
  platformFee?: number;
  productUrl?: string;
  lastUpdated: string; // ISO timestamp
  dataSource: DataSource;
}

/** Comparison result for a single product */
export interface ComparisonResult {
  product: Product;
  listings: PlatformListing[];
  cheapestListing?: PlatformListing;
  fastestListing?: PlatformListing;
  bestValueListing?: PlatformListing; // lowest total cost
  lastUpdated: string;
}

/** Total cost breakdown */
export interface CostBreakdown {
  productPrice: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  estimatedTotal: number;
  isComplete: boolean; // false if some charges unknown
}

/** User location */
export interface UserLocation {
  pincode: string;
  city?: string;
  area?: string;
  state?: string;
  lat?: number;
  lng?: number;
}

/** Search params */
export interface SearchParams {
  query: string;
  category?: ProductCategory;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  availability?: AvailabilityStatus;
  sortBy?: 'price-asc' | 'price-desc' | 'delivery-time' | 'value' | 'relevance';
  location?: UserLocation;
  page?: number;
  limit?: number;
}

/** Search result */
export interface SearchResult {
  products: Product[];
  totalCount: number;
  page: number;
  limit: number;
  suggestions?: string[];
  appliedFilters: Partial<SearchParams>;
  listingsMap?: Record<string, PlatformListing[]>;
}

/** Price history entry */
export interface PriceHistoryEntry {
  productId: string;
  platformId: PlatformId;
  price: number;
  mrp: number;
  timestamp: string;
}

/** Filter options for the UI */
export interface FilterOptions {
  categories: { value: ProductCategory; label: string; count: number }[];
  brands: { value: string; label: string; count: number }[];
  priceRange: { min: number; max: number };
  platforms: { value: PlatformId; label: string; count: number }[];
}

/** API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    timestamp: string;
    dataSource: DataSource;
    cached: boolean;
  };
}

/** Autocomplete suggestion */
export interface SearchSuggestion {
  text: string;
  type: 'product' | 'brand' | 'category';
  productId?: string;
  category?: ProductCategory;
  brand?: string;
  imageUrl?: string;
  unit?: string;
}
