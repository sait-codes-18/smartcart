// =============================================================================
// Quick Compare — Platform Adapter Interface
// =============================================================================

import type { PlatformId, PlatformListing, Product, SearchParams, UserLocation } from '@/types';

/**
 * Interface that all platform adapters must implement.
 *
 * Each adapter encapsulates the logic for fetching product and pricing data
 * from a specific quick-commerce platform (Blinkit, Zepto, etc.).
 */
export interface PlatformAdapter {
  /** The platform this adapter connects to */
  readonly platformId: PlatformId;

  /** Search for products on this platform */
  searchProducts(params: SearchParams): Promise<Product[]>;

  /** Get listing details for a specific product */
  getProductListing(
    productId: string,
    location?: UserLocation,
  ): Promise<PlatformListing | null>;

  /** Get listings for multiple products */
  getProductListings(
    productIds: string[],
    location?: UserLocation,
  ): Promise<PlatformListing[]>;

  /** Check if this platform serves the given location */
  isAvailable(location: UserLocation): Promise<boolean>;

  /** Get delivery estimate for a location */
  getDeliveryEstimate(location: UserLocation): Promise<string | null>;
}
