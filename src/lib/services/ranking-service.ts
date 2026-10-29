// =============================================================================
// Quick Compare — Ranking & Recommendation Service
// =============================================================================

import type { ComparisonResult, PlatformListing, Product } from '@/types';
import { calculateTotalCost } from '@/lib/utils';

/**
 * Filter to available/in-stock listings only
 */
export function getAvailableListings(listings: PlatformListing[]): PlatformListing[] {
  return listings.filter(
    (l) => l.availability === 'in-stock' || l.availability === 'limited',
  );
}

/**
 * 1. Cheapest product price (among currently available items)
 */
export function findCheapestListing(
  listings: PlatformListing[],
): PlatformListing | undefined {
  const available = getAvailableListings(listings);
  const pool = available.length > 0 ? available : listings;
  if (pool.length === 0) return undefined;

  return pool.reduce((min, curr) => (curr.price < min.price ? curr : min), pool[0]);
}

/**
 * 2. Fastest estimated delivery time (among currently available items)
 */
export function findFastestListing(
  listings: PlatformListing[],
): PlatformListing | undefined {
  const available = getAvailableListings(listings);
  const pool = available.length > 0 ? available : listings;
  const withDelivery = pool.filter((l) => (l.deliveryMinutes ?? Infinity) > 0);
  if (withDelivery.length === 0) return undefined;

  return withDelivery.reduce((fastest, curr) => {
    const currTime = curr.deliveryMinutes ?? Infinity;
    const fastestTime = fastest.deliveryMinutes ?? Infinity;
    return currTime < fastestTime ? curr : fastest;
  }, withDelivery[0]);
}

/**
 * 3. Lowest estimated total checkout cost (Price + Delivery fee + Platform fee - Discount)
 */
export function findBestValueListing(
  listings: PlatformListing[],
): PlatformListing | undefined {
  const available = getAvailableListings(listings);
  const pool = available.length > 0 ? available : listings;
  if (pool.length === 0) return undefined;

  return pool.reduce((best, curr) => {
    const currTotal = calculateTotalCost(curr).estimatedTotal;
    const bestTotal = calculateTotalCost(best).estimatedTotal;
    return currTotal < bestTotal ? curr : best;
  }, pool[0]);
}

/**
 * Rank and annotate a comparison result with the 3 key recommendations
 */
export function rankComparison(
  product: Product,
  listings: PlatformListing[],
): ComparisonResult {
  const cheapest = findCheapestListing(listings);
  const fastest = findFastestListing(listings);
  const bestValue = findBestValueListing(listings);

  return {
    product,
    listings,
    cheapestListing: cheapest,
    fastestListing: fastest,
    bestValueListing: bestValue,
    lastUpdated: new Date().toISOString(),
  };
}
