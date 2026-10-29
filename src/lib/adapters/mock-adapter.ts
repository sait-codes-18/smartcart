// =============================================================================
// Quick Compare — Mock Platform Adapter
// =============================================================================

import type { PlatformAdapter } from './types';
import type {
  PlatformId,
  PlatformListing,
  Product,
  SearchParams,
  UserLocation,
} from '@/types';
import {
  MOCK_PRODUCTS,
  getListing,
  getListingsForPlatform,
  getProductById,
} from '@/lib/mock-data';

/**
 * Serviceable pincode prefixes for quick commerce in India (metro / tier-1)
 */
const METRO_PINCODE_PREFIXES = ['110', '122', '201', '400', '411', '500', '560', '600', '700', '380', '226', '302'];

export class MockPlatformAdapter implements PlatformAdapter {
  readonly platformId: PlatformId;

  constructor(platformId: PlatformId) {
    this.platformId = platformId;
  }

  async isAvailable(location?: UserLocation): Promise<boolean> {
    if (!location || !location.pincode) return true;
    const prefix = location.pincode.substring(0, 3);
    // Platform-specific availability differences for realism
    if (this.platformId === 'bigbasket') return true; // wide coverage
    if (this.platformId === 'zepto') {
      return METRO_PINCODE_PREFIXES.slice(0, 8).includes(prefix);
    }
    return METRO_PINCODE_PREFIXES.includes(prefix);
  }

  async getDeliveryEstimate(location?: UserLocation): Promise<string | null> {
    const available = await this.isAvailable(location);
    if (!available) return null;

    switch (this.platformId) {
      case 'zepto':
        return '10 mins';
      case 'blinkit':
        return '12 mins';
      case 'swiggy-instamart':
        return '15 mins';
      case 'bigbasket':
        return '25-30 mins';
      default:
        return '15 mins';
    }
  }

  async getProductListing(
    productId: string,
    location?: UserLocation,
  ): Promise<PlatformListing | null> {
    const baseListing = getListing(productId, this.platformId);
    if (!baseListing) return null;

    const available = await this.isAvailable(location);
    if (!available) {
      return {
        ...baseListing,
        availability: 'out-of-stock',
        deliveryEstimate: undefined,
        deliveryMinutes: undefined,
      };
    }

    // Slight location adjustment simulation if location provided
    let deliveryMinutes = baseListing.deliveryMinutes;
    let deliveryEstimate = baseListing.deliveryEstimate;
    let deliveryFee = baseListing.deliveryFee;

    if (location && location.pincode) {
      const pinNum = parseInt(location.pincode, 10);
      const jitter = (pinNum % 5) - 2; // -2 to +2 mins
      if (deliveryMinutes) {
        deliveryMinutes = Math.max(8, deliveryMinutes + jitter);
        deliveryEstimate = `${deliveryMinutes} mins`;
      }
    }

    return {
      ...baseListing,
      deliveryMinutes,
      deliveryEstimate,
      deliveryFee,
      lastUpdated: new Date().toISOString(),
    };
  }

  async getProductListings(
    productIds: string[],
    location?: UserLocation,
  ): Promise<PlatformListing[]> {
    const listings = await Promise.all(
      productIds.map((id) => this.getProductListing(id, location)),
    );
    return listings.filter((l): l is PlatformListing => l !== null);
  }

  async searchProducts(params: SearchParams): Promise<Product[]> {
    const query = (params.query || '').toLowerCase().trim();
    const platformListings = getListingsForPlatform(this.platformId);
    const platformProductIds = new Set(platformListings.map((l) => l.productId));

    return MOCK_PRODUCTS.filter((product) => {
      if (!platformProductIds.has(product.id)) return false;

      if (params.category && product.category !== params.category) {
        return false;
      }

      if (params.brands && params.brands.length > 0 && !params.brands.includes(product.brand)) {
        return false;
      }

      if (!query) return true;

      const nameMatch = product.name.toLowerCase().includes(query);
      const brandMatch = product.brand.toLowerCase().includes(query);
      const tagMatch = product.tags?.some((t) => t.toLowerCase().includes(query));
      const descMatch = product.description.toLowerCase().includes(query);

      return nameMatch || brandMatch || tagMatch || descMatch;
    });
  }
}
