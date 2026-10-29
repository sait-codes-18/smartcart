// =============================================================================
// Quick Compare — Search Service
// Supports strictly separated Live API aggregation and Mock Catalogue modes
// =============================================================================

import type {
  FilterOptions,
  PlatformId,
  PlatformListing,
  Product,
  ProductCategory,
  SearchParams,
  SearchResult,
  SearchSuggestion,
} from '@/types';
import { MOCK_PRODUCTS, getListingsForProduct } from '@/lib/mock-data';
import { getAllAdapters, isLiveMode } from '@/lib/adapters';
import { CATEGORIES, PLATFORMS, getAuthenticProductPhoto } from '@/lib/constants';
import {
  isLiveApiConfigured,
  searchQuickCommercePlatform,
  QuickCommerceApiProduct,
} from '@/lib/adapters/quickcommerce-client';
import { LiveQuickCommerceAdapter } from '@/lib/adapters/live-adapter';
import { toNumber } from '@/lib/utils';

// Shared in-memory registry of all active products discovered in search
export const productRegistry = new Map<string, { product: Product; listings: PlatformListing[] }>();

export class SearchService {
  /**
   * Search products with filtering, sorting, pagination
   * In live mode: fetches real products from QuickCommerceAPI without silent mock fallback.
   * In mock mode: queries MOCK_PRODUCTS.
   */
  async search(params: SearchParams): Promise<SearchResult> {
    const live = isLiveMode();

    if (live && isLiveApiConfigured()) {
      return this.searchLive(params);
    }

    return this.searchMock(params);
  }

  /**
   * Live product search calling QuickCommerceAPI for supported platforms.
   * Normalizes products and groups cross-platform matches strictly by brand and pack size.
   */
  private async searchLive(params: SearchParams): Promise<SearchResult> {
    const query = (params.query || '').trim();
    if (!query) {
      return {
        products: [],
        totalCount: 0,
        page: params.page || 1,
        limit: params.limit || 20,
        appliedFilters: params,
      };
    }

    const adapters = getAllAdapters();
    // Query supported platforms in parallel (BlinkIt, Zepto, Swiggy, BigBasket)
    const platformFetches = adapters.map(async (adapter) => {
      try {
        const items = await searchQuickCommercePlatform(
          adapter.platformId,
          query,
          params.location,
        );
        return { platformId: adapter.platformId, items, error: null };
      } catch (err: any) {
        return { platformId: adapter.platformId, items: [], error: err?.message || String(err) };
      }
    });

    const results = await Promise.all(platformFetches);

    // If all platform requests errored out, propagate failure clearly
    const allFailed = results.every((r) => r.error !== null);
    if (allFailed && results.length > 0) {
      throw new Error(`Live search failed on all platforms: ${results[0].error}`);
    }

    // Process and normalize live products
    const liveAdapter = new LiveQuickCommerceAdapter('blinkit');
    const mergedProductsMap = new Map<
      string,
      {
        product: Product;
        lowestPrice: number;
        fastestDelivery: number;
      }
    >();
    const listingsMap: Record<string, PlatformListing[]> = {};

    for (const res of results) {
      const platformAdapter = new LiveQuickCommerceAdapter(res.platformId);
      for (const item of res.items) {
        if (!item || !item.name) continue;

        // Group key: strict brand + normalized pack size + normalized name
        const normalizedPack = (item.quantity || '1 unit').toLowerCase().replace(/\s+/g, '');
        const normalizedBrand = (item.brand || '').toLowerCase().trim();
        const normalizedTitle = item.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
        const groupKey = `${normalizedBrand}__${normalizedPack}__${normalizedTitle}`;

        const price = Math.max(0, toNumber(item.offer_price, 0));
        const slaMin = this.parseSlaToMinutes(item.platform?.sla);

        if (!mergedProductsMap.has(groupKey)) {
          const product = liveAdapter.mapApiProductToProduct(item);
          mergedProductsMap.set(groupKey, {
            product,
            lowestPrice: price,
            fastestDelivery: slaMin,
          });
          const listing = platformAdapter.mapApiProductToListing(item, product.id);
          listingsMap[product.id] = [listing];
        } else {
          const entry = mergedProductsMap.get(groupKey)!;
          if (price > 0 && (entry.lowestPrice === 0 || price < entry.lowestPrice)) {
            entry.lowestPrice = price;
          }
          if (slaMin < entry.fastestDelivery) {
            entry.fastestDelivery = slaMin;
          }
          const listing = platformAdapter.mapApiProductToListing(item, entry.product.id);
          if (!listingsMap[entry.product.id]) {
            listingsMap[entry.product.id] = [];
          }
          listingsMap[entry.product.id].push(listing);
        }
      }
    }

    let productList = Array.from(mergedProductsMap.values());

    // Apply category or brand filter if passed
    if (params.brands && params.brands.length > 0) {
      const allowedBrands = new Set(params.brands.map((b) => b.toLowerCase()));
      productList = productList.filter((p) => allowedBrands.has(p.product.brand.toLowerCase()));
    }

    // Sorting
    if (params.sortBy === 'price-asc') {
      productList.sort((a, b) => a.lowestPrice - b.lowestPrice);
    } else if (params.sortBy === 'price-desc') {
      productList.sort((a, b) => b.lowestPrice - a.lowestPrice);
    } else if (params.sortBy === 'delivery-time') {
      productList.sort((a, b) => a.fastestDelivery - b.fastestDelivery);
    }

    const totalCount = productList.length;
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginated = productList.slice(startIndex, startIndex + limit).map((p) => p.product);

    // Register into shared memory registry
    for (const item of productList) {
      productRegistry.set(item.product.id, {
        product: item.product,
        listings: listingsMap[item.product.id] || [],
      });
    }

    return {
      products: paginated,
      totalCount,
      page,
      limit,
      appliedFilters: params,
      listingsMap,
    };
  }

  /**
   * Search mock products
   */
  private async searchMock(params: SearchParams): Promise<SearchResult> {
    const query = (params.query || '').trim().toLowerCase();
    const page = params.page || 1;
    const limit = params.limit || 20;

    let filtered = MOCK_PRODUCTS.filter((product) => {
      if (query) {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesDesc = product.description.toLowerCase().includes(query);

        if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags && !matchesDesc) {
          return false;
        }
      }

      if (params.category && product.category !== params.category) {
        return false;
      }

      if (params.brands && params.brands.length > 0) {
        if (!params.brands.includes(product.brand)) {
          return false;
        }
      }

      return true;
    });

    if (params.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (params.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    const totalCount = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

    const listingsMap: Record<string, PlatformListing[]> = {};
    for (const p of paginatedProducts) {
      listingsMap[p.id] = getListingsForProduct(p.id);
    }

    return {
      products: paginatedProducts,
      totalCount,
      page,
      limit,
      appliedFilters: params,
      listingsMap,
    };
  }

  /**
   * Autocomplete suggestions for search input
   */
  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const suggestions: SearchSuggestion[] = [];

    // Category suggestions
    for (const [catKey, catVal] of Object.entries(CATEGORIES)) {
      if (catVal.label.toLowerCase().includes(q)) {
        suggestions.push({
          text: catVal.label,
          type: 'category',
          category: catKey as ProductCategory,
          imageUrl: getAuthenticProductPhoto(catVal.label),
        });
      }
    }

    // Brands & popular products
    const brands = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.brand)));
    for (const brand of brands) {
      if (brand.toLowerCase().includes(q)) {
        suggestions.push({
          text: brand,
          type: 'brand',
          imageUrl: getAuthenticProductPhoto(brand),
        });
      }
    }

    // Live registered products
    for (const [id, entry] of productRegistry.entries()) {
      const p = entry.product;
      if (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) {
        if (!suggestions.some((s) => s.text.toLowerCase() === p.name.toLowerCase())) {
          suggestions.push({
            text: p.name,
            type: 'product',
            productId: p.id,
            brand: p.brand,
            imageUrl: getAuthenticProductPhoto(p.name, p.imageUrl),
            unit: p.unit,
            category: p.category,
          });
        }
      }
      if (suggestions.length >= 8) break;
    }

    // Catalog products
    for (const product of MOCK_PRODUCTS) {
      if (
        product.name.toLowerCase().includes(q) ||
        (product.tags && product.tags.some((t) => t.toLowerCase().includes(q)))
      ) {
        if (!suggestions.some((s) => s.text.toLowerCase() === product.name.toLowerCase())) {
          suggestions.push({
            text: product.name,
            type: 'product',
            productId: product.id,
            brand: product.brand,
            imageUrl: getAuthenticProductPhoto(product.name, product.imageUrl),
            unit: product.unit,
            category: product.category,
          });
        }
        if (suggestions.length >= 8) break;
      }
    }

    return suggestions.slice(0, 8);
  }

  /**
   * Dynamic filter options
   */
  async getFilterOptions(category?: ProductCategory): Promise<FilterOptions> {
    const pool = category
      ? MOCK_PRODUCTS.filter((p) => p.category === category)
      : MOCK_PRODUCTS;

    const brandCounts: Record<string, number> = {};
    for (const p of pool) {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    }
    const brands = Object.entries(brandCounts)
      .map(([value, count]) => ({ value, label: value, count }))
      .sort((a, b) => b.count - a.count);

    const catCounts: Record<ProductCategory, number> = {} as any;
    for (const p of MOCK_PRODUCTS) {
      catCounts[p.category] = (catCounts[p.category] || 0) + 1;
    }
    const categories = Object.entries(CATEGORIES).map(([key, item]) => ({
      value: key as ProductCategory,
      label: item.label,
      count: catCounts[key as ProductCategory] || 0,
    }));

    return {
      categories,
      brands,
      priceRange: { min: 10, max: 2000 },
      platforms: [
        { value: 'blinkit', label: 'Blinkit', count: pool.length },
        { value: 'zepto', label: 'Zepto', count: pool.length },
        { value: 'swiggy-instamart', label: 'Swiggy Instamart', count: pool.length },
        { value: 'bigbasket', label: 'BigBasket', count: pool.length },
      ],
    };
  }

  private parseSlaToMinutes(sla?: string): number {
    if (!sla) return 15;
    const match = sla.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 15;
  }
}

export const searchService = new SearchService();
