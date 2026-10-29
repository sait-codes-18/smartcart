// =============================================================================
// Quick Compare — QuickCommerceAPI Integration Client
// Direct authorized integration for live BlinkIt, Zepto, Swiggy, BigBasket data
// =============================================================================

import type { PlatformId, UserLocation } from '@/types';
import { toNumber } from '@/lib/utils';

const API_BASE_URL =
  process.env.QUICKCOMMERCE_API_BASE_URL || 'https://api.quickcommerceapi.com';
const API_KEY = process.env.QUICKCOMMERCE_API_KEY || '';

/**
 * Mapping of internal platform IDs to QuickCommerceAPI platform names
 */
export const PLATFORM_API_NAMES: Record<PlatformId, string> = {
  blinkit: 'BlinkIt',
  zepto: 'Zepto',
  'swiggy-instamart': 'Swiggy',
  bigbasket: 'BigBasket',
};

export const REVERSE_PLATFORM_MAP: Record<string, PlatformId> = {
  BlinkIt: 'blinkit',
  blinkit: 'blinkit',
  Zepto: 'zepto',
  zepto: 'zepto',
  Swiggy: 'swiggy-instamart',
  swiggy: 'swiggy-instamart',
  BigBasket: 'bigbasket',
  bigbasket: 'bigbasket',
};

/**
 * Pincode to Lat/Lon fallback coordinates for Indian metros
 */
export const PINCODE_COORDINATES: Record<string, { lat: number; lon: number }> = {
  // Bengaluru
  '560001': { lat: 12.9716, lon: 77.5946 },
  '560008': { lat: 12.9800, lon: 77.6050 },
  '560034': { lat: 12.9352, lon: 77.6245 },
  '560038': { lat: 12.9784, lon: 77.6408 },
  '560066': { lat: 12.9698, lon: 77.7499 },
  '560095': { lat: 12.9121, lon: 77.6446 },
  '560102': { lat: 12.8399, lon: 77.6770 },
  // Delhi NCR
  '110001': { lat: 28.6315, lon: 77.2167 },
  '110016': { lat: 28.5494, lon: 77.2001 },
  '110017': { lat: 28.5284, lon: 77.2066 },
  '110019': { lat: 28.5385, lon: 77.2588 },
  '122001': { lat: 28.4595, lon: 77.0266 }, // Gurugram
  '201301': { lat: 28.5700, lon: 77.3200 }, // Noida
  // Mumbai
  '400001': { lat: 18.9322, lon: 72.8347 },
  '400050': { lat: 19.0596, lon: 72.8295 },
  '400053': { lat: 19.1363, lon: 72.8277 },
  '400076': { lat: 19.1176, lon: 72.9060 },
  // Hyderabad
  '500001': { lat: 17.3916, lon: 78.4746 },
  '500032': { lat: 17.4325, lon: 78.4071 },
  '500081': { lat: 17.4401, lon: 78.3489 },
  // Pune
  '411001': { lat: 18.5314, lon: 73.8446 },
  '411014': { lat: 18.5089, lon: 73.9260 },
  '411045': { lat: 18.5913, lon: 73.7389 },
  // Chennai
  '600001': { lat: 13.0878, lon: 80.2785 },
  '600017': { lat: 13.0418, lon: 80.2341 },
  // Kolkata
  '700001': { lat: 22.5726, lon: 88.3639 },
  // Ahmedabad
  '380001': { lat: 23.0225, lon: 72.5714 },
};

export const DEFAULT_COORDS = { lat: 12.9716, lon: 77.5946 }; // Bengaluru default

export function getCoordinatesForLocation(location?: UserLocation): { lat: number; lon: number } {
  if (location?.lat && location?.lng) {
    return { lat: location.lat, lon: location.lng };
  }
  if (location?.pincode && PINCODE_COORDINATES[location.pincode]) {
    return PINCODE_COORDINATES[location.pincode];
  }
  return DEFAULT_COORDS;
}

export interface QuickCommerceApiProduct {
  id: string;
  name: string;
  brand?: string;
  available: boolean;
  images?: string[];
  mrp: number;
  offer_price: number;
  quantity?: string;
  deeplink?: string;
  rating?: number;
  rating_count?: number;
  inventory?: number;
  is_ad?: boolean;
  rank?: number;
  currency?: string;
  platform: {
    name: string;
    sla?: string;
    open: boolean;
    icon?: string;
  };
  store_id?: number | string;
}

export interface QuickCommerceApiResponse {
  status: string;
  request_id: string;
  credits_remaining?: number;
  data?: {
    query: string;
    platform: string;
    lat: number;
    lon: number;
    total_results: number;
    products: QuickCommerceApiProduct[];
  };
  detail?: any;
}

/** In-memory cache for live API responses to avoid burning credits on repeated queries */
interface CacheEntry {
  timestamp: number;
  data: QuickCommerceApiProduct[];
}
const apiCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache to protect credit quota

/** Find a product by its raw API ID across all recent searches in memory */
export function findCachedProductById(id: string): QuickCommerceApiProduct | undefined {
  const targetId = String(id).trim();
  for (const entry of apiCache.values()) {
    const found = entry.data.find((p) => String(p.id) === targetId);
    if (found) return found;
  }
  return undefined;
}

export function isLiveApiConfigured(): boolean {
  return Boolean(API_KEY && API_KEY.length > 10);
}

/**
 * Perform live query to QuickCommerceAPI for a specific platform and location.
 * Throws structured errors on HTTP failure, credit exhaustion, or validation errors
 * instead of silently swallowing issues.
 */
export async function searchQuickCommercePlatform(
  platformId: PlatformId,
  query: string,
  location?: UserLocation,
): Promise<QuickCommerceApiProduct[]> {
  if (!isLiveApiConfigured()) {
    throw new Error('QuickCommerce API key is not configured in server environment.');
  }

  const apiPlatform = PLATFORM_API_NAMES[platformId];
  if (!apiPlatform) {
    throw new Error(`Unsupported platform '${platformId}'.`);
  }

  const coords = getCoordinatesForLocation(location);
  const cacheKey = `${platformId}:${query.toLowerCase().trim()}:${coords.lat.toFixed(2)},${coords.lon.toFixed(2)}`;

  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const url = new URL(`${API_BASE_URL}/v1/search`);
  url.searchParams.set('q', query.trim());
  url.searchParams.set('lat', coords.lat.toString());
  url.searchParams.set('lon', coords.lon.toString());
  url.searchParams.set('platform', apiPlatform);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });
  } catch (netErr: any) {
    throw new Error(`QuickCommerceAPI network failure for ${platformId}: ${netErr?.message || netErr}`);
  }

  if (!res.ok) {
    let errDetail = '';
    try {
      const errJson = await res.json();
      errDetail = errJson?.detail?.message || JSON.stringify(errJson?.detail) || '';
    } catch {
      errDetail = await res.text();
    }

    if (res.status === 401 || res.status === 403) {
      throw new Error(`QuickCommerceAPI authentication failed (HTTP ${res.status}): ${errDetail || 'Invalid API Key'}`);
    }
    if (res.status === 429) {
      throw new Error(`QuickCommerceAPI credit quota exhausted or rate limit reached (HTTP 429).`);
    }
    throw new Error(`QuickCommerceAPI error for ${platformId} (HTTP ${res.status}): ${errDetail}`);
  }

  let json: QuickCommerceApiResponse;
  try {
    json = await res.json();
  } catch (parseErr) {
    throw new Error(`QuickCommerceAPI returned invalid JSON response for ${platformId}`);
  }

  const rawProducts = json?.data?.products || [];

  // Sanitize and validate every product record from API
  const validProducts: QuickCommerceApiProduct[] = rawProducts
    .filter((p) => p && typeof p.name === 'string' && p.name.trim().length > 0)
    .map((p) => ({
      ...p,
      mrp: toNumber(p.mrp, 0),
      offer_price: toNumber(p.offer_price, toNumber(p.mrp, 0)),
      available: Boolean(p.available),
    }));

  apiCache.set(cacheKey, {
    timestamp: Date.now(),
    data: validProducts,
  });

  return validProducts;
}
