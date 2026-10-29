// =============================================================================
// Quick Compare — Live QuickCommerce Platform Adapter
// Implements PlatformAdapter backed by live QuickCommerceAPI.com
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
  isLiveApiConfigured,
  searchQuickCommercePlatform,
  QuickCommerceApiProduct,
} from './quickcommerce-client';
import { toNumber } from '@/lib/utils';

export class LiveQuickCommerceAdapter implements PlatformAdapter {
  readonly platformId: PlatformId;

  constructor(platformId: PlatformId) {
    this.platformId = platformId;
  }

  async isAvailable(location?: UserLocation): Promise<boolean> {
    return true;
  }

  async getDeliveryEstimate(location?: UserLocation): Promise<string | null> {
    return this.platformId === 'bigbasket' ? '25-35 mins' : '10-15 mins';
  }

  /**
   * Search products on this platform using live API.
   * If the API fails, propagates error instead of silently returning mock data.
   */
  async searchProducts(params: SearchParams): Promise<Product[]> {
    if (!isLiveApiConfigured()) {
      throw new Error('QuickCommerce API is unconfigured in live mode.');
    }
    if (!params.query) {
      return [];
    }

    const liveItems = await searchQuickCommercePlatform(
      this.platformId,
      params.query,
      params.location,
    );

    return liveItems.map((item) => this.mapApiProductToProduct(item));
  }

  /**
   * Get listing details for a product from the live platform API.
   */
  async getProductListing(
    productId: string,
    location?: UserLocation,
  ): Promise<PlatformListing | null> {
    if (!isLiveApiConfigured()) {
      throw new Error('QuickCommerce API is unconfigured in live mode.');
    }

    const liveItems = await searchQuickCommercePlatform(
      this.platformId,
      productId,
      location,
    );

    if (!liveItems || liveItems.length === 0) {
      return null;
    }

    // Best matching logic
    const queryLower = productId.toLowerCase().trim();
    const match =
      liveItems.find((i) => i.id === productId) ||
      liveItems.find((i) => i.name.toLowerCase().includes(queryLower)) ||
      liveItems[0];

    return this.mapApiProductToListing(match, productId);
  }

  async getProductListings(
    productIds: string[],
    location?: UserLocation,
  ): Promise<PlatformListing[]> {
    const listings = await Promise.all(
      productIds.map((id) => this.getProductListing(id, location).catch(() => null)),
    );
    return listings.filter((l): l is PlatformListing => l !== null);
  }

  public mapApiProductToProduct(item: QuickCommerceApiProduct): Product {
    const cleanId = String(item.id || item.name.replace(/\s+/g, '-').toLowerCase());
    return {
      id: cleanId,
      name: item.name,
      brand: item.brand || 'Brand',
      category: 'groceries',
      description: `${item.name} (${item.quantity || 'Standard pack'}). Delivered by ${item.platform?.name || this.platformId}.`,
      imageUrl: item.images?.[0] || '',
      unit: item.quantity || '1 unit',
      tags: [this.platformId, 'live'],
    };
  }

  public mapApiProductToListing(
    item: QuickCommerceApiProduct,
    productId: string,
  ): PlatformListing {
    const offerPrice = Math.max(0, toNumber(item.offer_price, 0));
    const mrp = Math.max(offerPrice, toNumber(item.mrp, offerPrice));
    const deliveryMinutes = this.parseSlaToMinutes(item.platform?.sla);
    const deliveryFee = this.calculateDeliveryFee(offerPrice);
    const platformFee = 4; // standard platform handling fee in INR

    return {
      productId,
      platformId: this.platformId,
      price: offerPrice,
      mrp: mrp,
      discount: mrp > offerPrice ? mrp - offerPrice : 0,
      discountLabel:
        mrp > offerPrice ? `${Math.round(((mrp - offerPrice) / mrp) * 100)}% off` : undefined,
      availability: item.available ? 'in-stock' : 'out-of-stock',
      deliveryEstimate: item.platform?.sla || `${deliveryMinutes} mins`,
      deliveryMinutes,
      deliveryFee,
      platformFee,
      productUrl: item.deeplink,
      lastUpdated: new Date().toISOString(),
      dataSource: 'live',
    };
  }

  private parseSlaToMinutes(sla?: string): number {
    if (!sla) return 15;
    const match = sla.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 15;
  }

  private calculateDeliveryFee(price: number): number {
    if (price >= 249) return 0;
    return this.platformId === 'zepto' ? 15 : 20;
  }
}
