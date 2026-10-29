// =============================================================================
// Quick Compare — Comparison Service
// =============================================================================

import type {
  ComparisonResult,
  PlatformListing,
  Product,
  UserLocation,
} from '@/types';
import { getAllAdapters, isLiveMode } from '@/lib/adapters';
import { getProductById } from '@/lib/mock-data';
import { rankComparison } from './ranking-service';
import {
  searchQuickCommercePlatform,
  findCachedProductById,
} from '@/lib/adapters/quickcommerce-client';
import { LiveQuickCommerceAdapter } from '@/lib/adapters/live-adapter';
import { productRegistry } from './search-service';

export class ComparisonService {
  /**
   * Compare a single product across all quick-commerce platforms for a given location.
   * If live mode is active, queries live platforms directly.
   * If in mock mode or product is a standard mock ID, retrieves known product data.
   */
  async compareProduct(
    productId: string,
    location?: UserLocation,
    nameHint?: string,
  ): Promise<ComparisonResult | null> {
    // 1. Check if product already exists in memory registry
    const registered = productRegistry.get(productId);
    if (registered && registered.listings.length > 0) {
      return rankComparison(registered.product, registered.listings);
    }

    const live = isLiveMode();

    if (live) {
      return this.compareLiveProduct(productId, location, nameHint);
    }

    return this.compareMockProduct(productId, location);
  }

  private async compareLiveProduct(
    productId: string,
    location?: UserLocation,
    nameHint?: string,
  ): Promise<ComparisonResult | null> {
    const mockProduct = getProductById(productId);
    const cachedApiProduct = findCachedProductById(productId);

    // Determine the best query name for platform search
    const searchQuery =
      nameHint ||
      (cachedApiProduct
        ? `${cachedApiProduct.brand || ''} ${cachedApiProduct.name}`.trim()
        : '') ||
      (mockProduct ? `${mockProduct.brand} ${mockProduct.name}` : '') ||
      productId;

    const adapters = getAllAdapters();
    const liveAdapter = new LiveQuickCommerceAdapter('blinkit');

    const fetches = adapters.map(async (adapter) => {
      try {
        const items = await searchQuickCommercePlatform(
          adapter.platformId,
          searchQuery,
          location,
        );
        if (!items || items.length === 0) return null;

        // Match the closest item
        const queryLower = searchQuery.toLowerCase();
        const bestMatch =
          items.find((i) => String(i.id) === String(productId)) ||
          items.find((i) => i.name.toLowerCase().includes(queryLower)) ||
          items[0];

        if (!bestMatch) return null;
        return liveAdapter.mapApiProductToListing(bestMatch, productId);
      } catch (err) {
        console.warn(`Live listing lookup failed for ${adapter.platformId}:`, err);
        return null;
      }
    });

    const listings = (await Promise.all(fetches)).filter(
      (l): l is PlatformListing => l !== null,
    );

    // If multi-platform lookup didn't return listings, but we have cached product from search
    if (listings.length === 0 && cachedApiProduct) {
      const fallbackListing = liveAdapter.mapApiProductToListing(cachedApiProduct, productId);
      listings.push(fallbackListing);
    }

    if (listings.length === 0) {
      if (mockProduct) {
        return this.compareMockProduct(productId, location);
      }
      return null;
    }

    // Build or use synthesized product header
    const primaryProduct: Product =
      mockProduct ||
      (cachedApiProduct
        ? liveAdapter.mapApiProductToProduct(cachedApiProduct)
        : {
            id: productId,
            name: searchQuery,
            brand: 'Product',
            category: 'groceries',
            description: `Live price comparison for ${searchQuery} across quick-commerce apps.`,
            imageUrl: '',
            unit: '1 unit',
          });

    return rankComparison(primaryProduct, listings);
  }

  private async compareMockProduct(
    productId: string,
    location?: UserLocation,
  ): Promise<ComparisonResult | null> {
    const product = getProductById(productId);
    if (!product) return null;

    const adapters = getAllAdapters();
    const listingPromises = adapters.map((adapter) =>
      adapter.getProductListing(productId, location).catch((err) => {
        console.error(`Adapter error for platform ${adapter.platformId}:`, err);
        return null;
      }),
    );

    const rawListings = await Promise.all(listingPromises);
    const listings = rawListings.filter((l): l is PlatformListing => l !== null);

    return rankComparison(product, listings);
  }

  /**
   * Compare multiple products (shopping cart basket comparison)
   */
  async compareBasket(
    productIds: string[],
    location?: UserLocation,
  ): Promise<{
    items: ComparisonResult[];
    platformTotals: Record<
      string,
      {
        totalProductCost: number;
        deliveryFee: number;
        platformFee: number;
        estimatedTotal: number;
        availableItemsCount: number;
        missingItemsCount: number;
      }
    >;
  }> {
    const comparisons = await Promise.all(
      productIds.map((id) => this.compareProduct(id, location)),
    );

    const validComparisons = comparisons.filter(
      (c): c is ComparisonResult => c !== null,
    );

    const platformTotals: Record<
      string,
      {
        totalProductCost: number;
        deliveryFee: number;
        platformFee: number;
        estimatedTotal: number;
        availableItemsCount: number;
        missingItemsCount: number;
      }
    > = {};

    for (const comp of validComparisons) {
      for (const listing of comp.listings) {
        if (!platformTotals[listing.platformId]) {
          platformTotals[listing.platformId] = {
            totalProductCost: 0,
            deliveryFee: listing.deliveryFee,
            platformFee: listing.platformFee ?? 0,
            estimatedTotal: 0,
            availableItemsCount: 0,
            missingItemsCount: 0,
          };
        }

        const bucket = platformTotals[listing.platformId];
        if (
          listing.availability === 'in-stock' ||
          listing.availability === 'limited'
        ) {
          bucket.totalProductCost += listing.price;
          bucket.availableItemsCount += 1;
        } else {
          bucket.missingItemsCount += 1;
        }
      }
    }

    // Finalize totals using strict numeric calculation
    for (const pid in platformTotals) {
      const b = platformTotals[pid];
      b.estimatedTotal = b.totalProductCost + b.deliveryFee + b.platformFee;
    }

    return {
      items: validComparisons,
      platformTotals,
    };
  }
}

export const comparisonService = new ComparisonService();
